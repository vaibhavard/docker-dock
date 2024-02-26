import dotenv from 'dotenv';

dotenv.config('.env');

export default {
    // Options for the Keyv cache, see https://www.npmjs.com/package/keyv.
    // This is used for storing conversations, and supports additional drivers (conversations are stored in memory by default).
    // Only necessary when using `ChatGPTClient`, or `BingAIClient` in jailbreak mode.
    cacheOptions: {},
    // If set, `ChatGPTClient` and `BingAIClient` will use `keyv-file` to store conversations to this JSON file instead of in memory.
    // However, `cacheOptions.store` will override this if set
    storageFilePath: process.env.STORAGE_FILE_PATH || './cache.json',
    chatGptClient: {
        // Your OpenAI API key (for `ChatGPTClient`)
        openaiApiKey: process.env.OPENAI_API_KEY || '',
        // (Optional) Support for a reverse proxy for the completions endpoint (private API server).
        // Warning: This will expose your `openaiApiKey` to a third party. Consider the risks before using this.
        // reverseProxyUrl: 'https://chatgpt.hato.ai/completions',
        // (Optional) Parameters as described in https://platform.openai.com/docs/api-reference/completions
        modelOptions: {
            // You can override the model name and any other parameters here.
            // The default model is `gpt-3.5-turbo`.
            model: 'gpt-3.5-turbo',
            // Set max_tokens here to override the default max_tokens of 1000 for the completion.
            // max_tokens: 1000,
        },
        // (Optional) Davinci models have a max context length of 4097 tokens, but you may need to change this for other models.
        // maxContextTokens: 4097,
        // (Optional) You might want to lower this to save money if using a paid model like `text-davinci-003`.
        // Earlier messages will be dropped until the prompt is within the limit.
        // maxPromptTokens: 3097,
        // (Optional) Set custom instructions instead of "You are ChatGPT...".
        // (Optional) Set a custom name for the user
        // userLabel: 'User',
        // (Optional) Set a custom name for ChatGPT ("ChatGPT" by default)
        // chatGptLabel: 'Bob',
        // promptPrefix: 'You are Bob, a cowboy in Western times...',
        // A proxy string like "http://<ip>:<port>"
        proxy: '',
        // (Optional) Set to true to enable `console.debug()` logging
        debug: true,
    },
    // Options for the Bing client
    bingAiClient: {
        // Necessary for some people in different countries, e.g. China (https://cn.bing.com)
        host: '',
        // The "_U" cookie value from bing.com
        userToken: '',
        // If the above doesn't work, provide all your cookies as a string instead
        cookies : '_C_Auth=; _C_Auth=; MUID=38DB8E1F2C7C610937099DE32D7A60C3; _EDGE_V=1; MUIDB=38DB8E1F2C7C610937099DE32D7A60C3; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=F7AB1436E8E640F9ABE1190888B29B47&dmnchg=1; SRCHUSR=DOB=20240104&T=1708934080000&POEX=W; SRCHHPGUSR=SRCHLANG=en&IG=0E797AE4A6E441BBB9DB2C272DD0ABD7&BRW=XW&BRH=S&CW=1920&CH=669&SCW=1920&SCH=112&DPR=1.0&UTC=330&DM=0&CIBV=1.1600.0&EXLTT=13&HV=1708934076&WTS=63844530880&PRVCW=1920&PRVCH=919&CMUID=38DB8E1F2C7C610937099DE32D7A60C3&cdxupdttm=638412278976908297&cdxtone=Creat…4&R=209&RB=209&GB=0&RG=12000&RP=209; _Rwho=u=d; ipv6=hit=1708937670014&t=4; CSRFCookie=b96038d4-5f26-4d03-824f-430a1e1c7d87; _U=1iogABYDXBXMVJj0ZGJV6Lb2PvGasG53CX_DuamYgia7WCpK43VgsJUbTVjv5vUovY0N6Hi0tyR0bTjBHIyyi_xHFObf3s_FhnQyI9JfzMNxO7QJkbSTfrQlQAiGc3HLu5BbWgNPb8D1e_Qt_ykySDZPmiDzEZhCtdt8gmnLDhhMMcrpRk9rdWgVZNtM0OnHWy2pzqZdDGQy4Gm73LUCWkA; WLS=C=4e74a2b8ce0a8030&N=; WLID=3hO6ehfHDsVOqBFF2vdpLI9hFww9HYOz8vN5JPU1HurkewSbFYLZZ+3G26wLLBp7QbJVHq6EgOppOyXOJUP6g8qyL7poU0pRGgkIBVxbSVI=; dsc=order=News; _C_ETH=1',
        // A proxy string like "http://<ip>:<port>"
        proxy: '',
        // (Optional) Set 'x-forwarded-for' for the request. You can use a fixed IPv4 address or specify a range using CIDR notation,
        // and the program will randomly select an address within that range. The 'x-forwarded-for' is not used by default now.
        // xForwardedFor: '13.104.0.0/14',
        // (Optional) Set 'genImage' to true to enable bing to create images for you. It's disabled by default.
        features: {
            genImage: true,
        },
        // (Optional) Set to true to enable `console.debug()` logging
        debug: true,
        // Set to true to let AI only generate text in base64
        useBase64: 'false',
        // Set to false to disable suggestions
        showSuggestions: 'false',
    },
    chatGptBrowserClient: {
        // (Optional) Support for a reverse proxy for the conversation endpoint (private API server).
        // Warning: This will expose your access token to a third party. Consider the risks before using this.
        reverseProxyUrl: 'https://bypass.churchless.tech/api/conversation',
        // Access token from https://chat.openai.com/api/auth/session
        accessToken: '',
        // Cookies from chat.openai.com (likely not required if using reverse proxy server).
        cookies: '',
        // A proxy string like "http://<ip>:<port>"
        proxy: '',
        // (Optional) Set to true to enable `console.debug()` logging
        debug: false,
    },
    localLLMClient: {
        // The host url for the Local LLM. For example 'localhost', '192.168.X.XX' or 'myapihoster.com'
        host: process.env.LOCAL_LLM_API_HOST || 'localhost',
        // The port for the Local LLM API server.
        port: process.env.LOCAL_LLM_API_PORT || '3002',
        // The system message or prompt prefix that should be shown to the model as the first message.
        systemMessage: process.env.LOCAL_LLM_SYSTEM_MESSAGE || 'You are an AI assistant. Write the AI\'s next reply in a chat between the user and the AI. Write a single reply only.',
        // The maximum context tokens the model supports. See your model card or underlying model card as a reference.
        context_tokens: process.env.LOCAL_LLM_MAX_TOKENS || 4096,
        // The prefix a user message should have. See your model card or underlying model card as a reference.
        startToken: process.env.LOCAL_LLM_START_TOKEN || '### Instruction: ',
        // The suffix a user message should have. See your model card or underlying model card as a reference.
        endToken: process.env.LOCAL_LLM_END_TOKEN || '### Response: ',
        // Whether the reponse should be streamed, so being output token by token.
        stream: process.env.LOCAL_LLM_STREAM || true,
        // Determines the randomness of replies.
        temperature: process.env.LOCAL_LLM_TEMPERATURE || 0.8,
        // Determines the randomness of replies.
        top_p: process.env.LOCAL_LLM_TOP_P,
        // Makes model more or less likely to use similar tokens in the same conversation.
        presence_penalty: process.env.LOCAL_LLM_PRESENCE_PENALTY || 1.18,
        // Makes model more or less likely to use similar tokens in the same conversation.
        frequency_penalty: process.env.LOCAL_LLM_FREQUENCY_PENALTY,
        // The maximum tokens the model should generate per response.
        max_tokens: process.env.LOCAL_LLM_MAX_TOKENS || 500,
        // The token at which to stop generating. See your model card or underlying model card as a reference.
        stop: process.env.LOCAL_LLM_STOP_TOKEN || ['### Instruction: '],
        // (Optional) Set to true to enable `console.debug()` logging
        debug: false,
    },
    // Options for the API server
    apiOptions: {
        port: 3000,
        host: '0.0.0.0',
        // (Optional) Set to true to enable `console.debug()` logging
        debug: true,
        // (Optional) Possible options: "chatgpt", "chatgpt-browser", "bing", "localLLM". (Default: "chatgpt")
        clientToUse: 'bing',
        // (Optional) Generate titles for each conversation for clients that support it (only ChatGPTClient for now).
        // This will be returned as a `title` property in the first response of the conversation.
        generateTitles: false,
        // (Optional) Set this to allow changing the client or client options in POST /conversation.
        // To disable, set to `null`.
        perMessageClientOptionsWhitelist: {
            // The ability to switch clients using `clientOptions.clientToUse` will be disabled if `validClientsToUse` is not set.
            // To allow switching clients per message, you must set `validClientsToUse` to a non-empty array.
            validClientsToUse: ['bing'], // values from possible `clientToUse` options above
            // The Object key, e.g. "chatgpt", is a value from `validClientsToUse`.
            // If not set, ALL options will be ALLOWED to be changed. For example, `bing` is not defined in `perMessageClientOptionsWhitelist` above,
            // so all options for `bingAiClient` will be allowed to be changed.
            // If set, ONLY the options listed here will be allowed to be changed.
            // In this example, each array element is a string representing a property in `chatGptClient` above.
            chatgpt: [
                'promptPrefix',
                'userLabel',
                'chatGptLabel',
                // Setting `modelOptions.temperature` here will allow changing ONLY the temperature.
                // Other options like `modelOptions.model` will not be allowed to be changed.
                // If you want to allow changing all `modelOptions`, define `modelOptions` here instead of `modelOptions.temperature`.
                'modelOptions.temperature',
            ],
        },
    },
    // Options for the CLI app
    cliOptions: {
        // (Optional) Possible options: "chatgpt", "bing".
        clientToUse: 'bing',
    },
};
