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
        cookies : 'MUID=28BB62251AAD65FB3898762E1BAB6410; MUIDB=28BB62251AAD65FB3898762E1BAB6410; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=7E912D349C3E41D29112E4051DDA313F&dmnchg=1; ANON=A=2070CB499C662FF1C9710BF3FFFFFFFF&E=1d4f&W=1; PPLState=1; KievRPSSecAuth=FABaBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACDbs0HirON0nGASdYamdvQDASTtKN6dGy7uQRANoss1/Nwq7JA90FMjenjZAx+cyPJUz/D38pPneb/cNpSXfGc1ngysNxs0btLzrsRrNzMKJg+1m1b5ZFgR97OMIGsCNfli4j6WF+lzEq4Y87jZMclENWnwXqzVHWoisPyFOStTSEY3b/KqJipjgeuZfZpvlhEms0QaNQyWkEPYUm0HzSXusIDKKsvFWZfqFTq+3fgzWN10TCaoWij63l5EI+NjxnYAWMy+KE7PkAolp0gLRsdetjZbH2OLDSsDL3OorjdwI4xNWzw3Drd2u6lnS5h7rOIISeSUBBJYYxwsoLrCewj0lXYICIGdX/Y41eN84NDmTXdTmeZVoXIbXFGgQQTFFjxlDFNqH68h+FRe2+oRB7nR6GXg1AzrFg0EWywz1MAfydwBdrULUKyhcageUmflSmh3iV6kSlgnvC/u3vVmrxAkS6htqAfXogs93lxPxLb/wCzLbHJnTk/6yy08bvYhovvQqjlgTGK9l6on8NPJEo1lprFRwSBpWA7b7bzWbyc2CtO6qjSmQ9E9Thi4oORAGAj6eVY0TpfonW88iPm7CaZD3bSlMB+7QVvuBQED0KNMJDKa0fv13DKcFU7eV4qHGiBlQ95Z0uG2buXZ54HJjmKd/GkrLwtshNJkttlNffmoDLHE6n3WYzjcBgJ2NoW2aXd8W+E0zS6AxilVAJ+rRwbVu6w0xv08J5TikyBT+ZSuCchI6jMC9EBd9KfdSe8waZ7NKVcGPz0hOLRbMFtKVlV4max1RPJ9MzaGzEr8bRjxWeUHcZ3BgFQibYkJam8yjw+hkzNMBHIxRLjGjZRnGklVE+oqMCuV/MTukI9fKsXoPvfe/EGE4BOuoVIQH1ndAtOsU+FfUUcAjqY5OGQJOB+pUOPnRwQZsBEtIrFNgohamTcpfC16Lb0HiK524lV9In45iqBw5K0jE73a/SqJoOOwFEqZjwrky2G2U/yiCnPvzBKX+ZN3t0yHCFKMCzQnvR2QlPO39PS8LZ5SjOz3Lm7inRpsD9aMZhlwzxW99+5iGpY96U22YAEMLvLKr7N9tPUWv+7pyswSmZqPWg5aMi9s9qCRWU+DM/8I3HQx4EmrFswm1S6pr0OgxDucdEbbL7f2zqef9bImnQe/8PqIeJpkjCyCAcPYmw9A1zhMuBsp0m43japaUfViUBY8gVkHiGDXhtggDl9zd7pko5AxWJaU3WMi3RqiljL21GjODf/qYD3sxh3v/WzsQZbMwDSCGXD0tDBmnEGhGeo9kA8smNQlspLixZhN0hS6KRSWK/D69DGj9mog3ATGWrdXF9qCYw8Hw3P3jsKRZTqILLcxKibbzSYGhRxj2/+4Hjs3QjEzRn42GckpU5vo6HAj91RrNoWy9FADox02yGGJB227LoLYjdeu6a5/Dlg==; MSPTC=0hjR1jspdaogOtuFPv8F8-jkztLls9etMvFyj7tL_8U; USRLOC=HS=1&ELOC=LAT=28.566577911376953|LON=77.20722961425781|N=New%20Delhi%2C%20Delhi|ELT=1|; _EDGE_S=SID=305C6D5E758763A30A15791274756293; WLS=C=4e74a2b8ce0a8030&N=; _U=1uzp8-_XCyK9jhBne9_8QCZPR0Jxiso-Ls6hqTTzFuc4S90r0wfQWnpuFx6ip6_h7ays4sWfXgPCE-2XN8mjblEoXPb23eNGc3ybkHh9_DLGnVhKXE-wPGZ-08aRDbzYz4oLE76bdDSvj7ssAj5rTe5Q5iaXeDIl5ZUDp-SZ-FkGzRNNzdcwnhcrALAtOxvdGgaAwSzNVxQGoopVwexhLag; SRCHUSR=DOB=20240119&T=1711292582000; _RwBf=mta=0&rc=209&rb=209&gb=0&rg=12000&pc=209&mtu=0&rbb=0.0&g=0&cid=&clo=0&v=1&l=2024-03-24T07:00:00.0000000Z&lft=0001-01-01T00:00:00.0000000&aof=0&ard=0001-01-01T00:00:00.0000000&rwdbt=0001-01-01T16:00:00.0000000-08:00&o=0&p=MSAAUTOENROLL&c=MR000T&t=6808&s=2024-01-18T15:08:37.5782027+00:00&ts=2024-03-24T15:03:03.6964027+00:00&rwred=0&wls=2&wlb=0&wle=0&ccp=0&lka=0&lkt=0&aad=0&TH=&e=hWxwdvoe-1D8BSmK_kg_KL9_5hFQlhzIMf3ojKDdDBCvFiM2XljtE22NEZr8wuh8Vtk6Irb3HplAevf5OlvYzA&A=&rwflt=2024-01-19T02:25:57.1878849-08:00; _Rwho=u=d; _SS=SID=305C6D5E758763A30A15791274756293&R=209&RB=209&GB=0&RG=12000&RP=209; ipv6=hit=1711296184424&t=4; _clck=1fv0piz%7C2%7Cfkc%7C0%7C1544; SRCHHPGUSR=SRCHLANG=en&IG=9EB9B9BF861844F686E749FA51BABAA0&PV=14.0.0&BRW=HTP&BRH=M&CW=984&CH=881&SCW=984&SCH=112&DPR=1.0&UTC=330&DM=0&CIBV=1.1648.1&EXLTT=4&HV=1711292583&WTS=63841257841&PRVCW=984&PRVCH=958&cdxupdttm=638412290489942574; _clsk=18mr26l%7C1711292588088%7C1%7C1%7Ce.clarity.ms%2Fcollect; GC=krP7lco3n1hWDW8Vewa8_L-nVWIKVFceP2BEtq_M075ARqIazKFks2ifk2R9K_Zp1QOx8InVXVPvQ_t79r_68g; _C_ETH=1',
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
