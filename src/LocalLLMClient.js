import './fetch-polyfill.js';
import crypto from 'crypto';
import Keyv from 'keyv';
import { fetchEventSource } from '@waylaidwanderer/fetch-event-source';
import { Agent } from 'undici';

export default class LocalLLMClient {
    constructor(
        options = {},
        cacheOptions = {},
    ) {
        cacheOptions.namespace = cacheOptions.namespace || 'localLLM';
        this.conversationsCache = new Keyv(cacheOptions);

        this.#setOptions(options);
    }

    /**
     * Sets or augments the current options by the supplied options.
     * @param {Object} options Object containing all options or partial options that should override the current options.
     */
    #setOptions(options) {
        if (!this.options) {
            this.options = {
                host: options.host || 'localhost',
                port: options.port || '3002',
                systemMessage: options.systemMessage || 'You are an AI assistant. Write the AI\'s next reply in a chat between the user and the AI. Write a single reply only.',
                context_tokens: options.context_tokens || 4096,
                startToken: options.startToken || '### Instruction: ',
                endToken: options.endToken || '### Response: ',
                modelOptions: {
                    messages: [],
                    stream: options.stream || true,
                    temperature: options.temperature || 0.8,
                    top_p: options.top_p,
                    presence_penalty: options.presence_penalty || 1.18,
                    frequency_penalty: options.frequency_penalty,
                    max_tokens: options.max_tokens || 500,
                    stop: options.stop || ['### Instruction: '],
                },
            };
        } else {
            let mergedOptions = {};
            mergedOptions = { ...mergedOptions, ...this.options };
            mergedOptions = { ...mergedOptions, ...options };
            mergedOptions.modelOptions = { ...this.options.modelOptions, ...options.modelOptions };
            this.options = mergedOptions;
        }
        const portString = this.options.port !== '' ? `:${this.options.port}` : '';
        this.completionsUrl = `http://${this.options.host}${portString}/v1/chat/completions`;
    }

    /**
     * Sends a message to the server and deals with the reply.
     * @param {String} message
     * Message sent by the user.
     * @param {Object} messageOptions Different kind of options sent by the caller.
     * @returns {Object} The reply by the AI.
     */
    async sendMessage(
        message,
        messageOptions = {},
    ) {
        if (messageOptions.clientOptions && typeof messageOptions.clientOptions === 'object') {
            this.#setOptions(messageOptions.clientOptions);
        }
        const conversationId = messageOptions.conversationId || crypto.randomUUID();
        const parentMessageId = messageOptions.parentMessageId || crypto.randomUUID();

        let conversation = typeof messageOptions.conversation === 'object'
            ? messageOptions.conversation
            : await this.conversationsCache.get(conversationId);
        if (!conversation) {
            conversation = {
                messages: [{
                    id: parentMessageId,
                    parentMessageId: null,
                    role: 'system',
                    message: this.options.systemMessage,
                }],
                createdAt: Date.now(),
            };
            this.options.modelOptions.messages.push({
                role: 'system',
                content: this.options.systemMessage,
            });
        }

        const userMessage = {
            id: crypto.randomUUID(),
            parentMessageId,
            role: 'user',
            message,
        };
        conversation.messages.push(userMessage);
        this.options.modelOptions.messages = await this.#buildPrompt(conversation.messages, userMessage);
        let reply = '';
        let result = null;
        if (typeof messageOptions.onProgress === 'function') {
            await this.#getCompletion(
                (progressMessage) => {
                    if (progressMessage === '[DONE]') {
                        return;
                    }
                    const token = progressMessage.choices[0].delta.content;
                    // first event's delta content is always undefined
                    if (!token) {
                        return;
                    }
                    if (this.options.debug) {
                        console.debug(token);
                    }
                    messageOptions.onProgress(token);
                    reply += token;
                },
                messageOptions.abortController || new AbortController(),
            );
        } else {
            result = await this.#getCompletion(
                null,
                messageOptions.abortController || new AbortController(),
            );
            if (this.options.debug) {
                console.debug(JSON.stringify(result));
            }
            reply = result.choices[0].message.content;
        }

        reply = reply.trim();

        const replyMessage = {
            id: crypto.randomUUID(),
            parentMessageId: userMessage.id,
            role: 'assistant',
            message: reply,
        };
        conversation.messages.push(replyMessage);
        this.options.modelOptions.messages.push({
            role: replyMessage.role,
            content: replyMessage.message,
        });

        const returnData = {
            response: replyMessage.message,
            conversationId,
            parentMessageId: replyMessage.parentMessageId,
            messageId: replyMessage.id,
            details: result || {},
        };

        await this.conversationsCache.set(conversationId, conversation);

        return returnData;
    }

    /**
     * Refreshes the messages in the modelOptions to contain all previous messages and the userMessage.
     * @param {Array.{id: String, parentMessageId: String, role: String, message: String}} messages
     * Array containing all messages up to this point.
     * @param {{id: String, parentMessageId: String, role: String, message: String}} userMessage
     * Single message sent by the user.
     * @returns {Array.{id: String, parentMessageId: String, role: String, message: String}}
     * New message array to replace the current one in the modelOptions with.
     */
    async #buildPrompt(messages, userMessage) {
        let orderedMessages = LocalLLMClient.#getMessagesForConversation(messages, userMessage.id);
        // Case for when the first message gets regenerated.
        if (orderedMessages.length === 1) {
            const systemMessageId = crypto.randomUUID();
            orderedMessages.unshift({
                id: systemMessageId,
                parentMessageId: null,
                role: 'system',
                message: this.options.systemMessage,
            });
            orderedMessages[1].parentMessageId = systemMessageId;
        }
        messages = orderedMessages;

        orderedMessages = orderedMessages.map(message => ({
            role: message.role,
            content: message.message,
        }));

        return orderedMessages;
    }

    /**
     * Iterate through messages, building an array based on the parentMessageId.
     * Each message has an id and a parentMessageId. The parentMessageId is the id of the message that this message is a reply to.
     * @param messages
     * @param parentMessageId
     * @returns {*[]} An array containing the messages in the order they should be displayed, starting with the root message.
     */
    static #getMessagesForConversation(messages, parentMessageId) {
        const orderedMessages = [];
        let currentMessageId = parentMessageId;
        while (currentMessageId) {
            // eslint-disable-next-line no-loop-func
            const message = messages.find(m => m.id === currentMessageId);
            if (!message) {
                break;
            }
            orderedMessages.unshift(message);
            currentMessageId = message.parentMessageId;
        }

        return orderedMessages;
    }

    /**
     * Sends a post request to the local LLM server using the modelOptions as the body.
     * @param {Function || undefined} onProgress Function that takes a token and does something with it. (optional)
     * @param {AbortController} abortController It aborts.
     * @returns {Promise<any> || undefined} The JSON of the response or nothing if streaming is enabled.
     */
    async #getCompletion(onProgress, abortController = null) {
        if (!abortController) {
            abortController = new AbortController();
        }
        this.options.modelOptions.stream = this.options.modelOptions.stream && typeof onProgress === 'function';
        const { debug } = this.options;
        const url = this.completionsUrl;
        if (debug) {
            console.debug();
            console.debug(url);
            console.debug(this.options.modelOptions);
            console.debug();
        }
        const messageOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.options.modelOptions),
            dispatcher: new Agent({
                bodyTimeout: 0,
                headersTimeout: 0,
            }),
        };

        if (this.options.headers) {
            messageOptions.headers = { ...messageOptions.headers, ...this.options.headers };
        }
        if (this.options.modelOptions.stream) {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve, reject) => {
                try {
                    let done = false;
                    await fetchEventSource(url, {
                        ...messageOptions,
                        signal: abortController.signal,
                        async onopen(response) {
                            if (response.status === 200) {
                                return;
                            }
                            if (debug) {
                                console.debug(response);
                            }
                            let error;
                            try {
                                const body = await response.text();
                                error = new Error(`Failed to send message. HTTP ${response.status} - ${body}`);
                                error.status = response.status;
                                error.json = JSON.parse(body);
                            } catch {
                                error = error || new Error(`Failed to send message. HTTP ${response.status}`);
                            }
                            throw error;
                        },
                        onclose() {
                            if (debug) {
                                console.debug('Server closed the connection unexpectedly, returning...');
                            }
                            // workaround for private API not sending [DONE] event
                            if (!done) {
                                onProgress('[DONE]');
                                abortController.abort();
                                resolve();
                            }
                        },
                        onerror(err) {
                            if (debug) {
                                console.debug(err);
                            }
                            // rethrow to stop the operation
                            throw err;
                        },
                        onmessage(message) {
                            if (debug) {
                                console.debug(message);
                            }
                            if (!message.data || message.event === 'ping') {
                                return;
                            }
                            if (message.data === '[DONE]') {
                                onProgress('[DONE]');
                                abortController.abort();
                                resolve();
                                done = true;
                                return;
                            }
                            onProgress(JSON.parse(message.data));
                        },
                    });
                } catch (err) {
                    reject(err);
                }
            });
        }
        const response = await fetch(
            url,
            {
                ...messageOptions,
                signal: abortController.signal,
            },
        );
        if (response.status !== 200) {
            const body = await response.text();
            const error = new Error(`Failed to send message. HTTP ${response.status} - ${body}`);
            error.status = response.status;
            try {
                error.json = JSON.parse(body);
            } catch {
                error.body = body;
            }
            throw error;
        }
        return response.json();
    }
}