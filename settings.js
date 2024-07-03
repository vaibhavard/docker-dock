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
        cookies : '_C_Auth=; _C_Auth=; MSPTC=MdJUq-saPu0Ljl8TovY0p4H8wDkVu3UJT1iD4YypvII; _EDGE_V=1; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=0188E7D829974E2382A94203F9695943&dmnchg=1; ANON=A=6537DECCF7A2E7DA8892B66EFFFFFFFF&E=1d14&W=1; NAP=V=1.9&E=1cba&C=dpy-KPedw16QGiux60r3l68hYTKtZNh9SOBe62SWPScgkZ_pTBpNlA&W=1; PPLState=1; KievRPSSecAuth=FACCBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACLGdVxfup67iQARh7idj+5/ce/VAL5fL05Vo9PiVyQ28X6ZUqPFRB3SjOlqrNz8/NKfTSVSRV7nheFgeX7h5dHNNRU6N64qy6S7qKduCOl7h72w8acbQfOiEHZV3rxDacSRVYMQ8vVgky84v7VPWQrmfVyE0ar4ojSiadh2xPrLvU/bTRi1y9Ny5OkgEzCane8RNnwmyGuskMpxYCgTvm9ZHpyw+ZevZn3MLvHjUqbWAwQiEDqLJnQK0lRxUzYmq7dZFdM0jB6GXHFZAWIrO9wVQIhjYzBsVqFQpiluXJSr27IRmIsaKDCXGTRWEL7eOuNNVNN3ujZarQpmQRUWevjdDqGhWajMDx9+dQridY2pBgy/3KQytYlCTr2uxfTOOxPcE4r/x1+rQ+yJKjDNLXGo/6AD6DQzeFcBFDnkOH+1D82zgqKgv8bwVdnQgo4MF8v9siEuU4MbQVtNyDGgh91MBFEaj0YvymUZXozrRuHoHohYwJtGGwVtmTPDRkRjwVGIYFtGpKqOuoSRXlGwf3/VHJIMBp6BLLLo9AcO+z6f3vEHDz/v4QLPlO+j2IBXGnisFgsnTOP+t3q5GcrNW/1UYcQlAE06IrTsgYdZJ0D2PZesAm0IGNd50hQHZiLq34/Q3892/SZFP9WxKGD3LCnrwQg6F3tWQGzybR2E1efz4Ww3GIYLmteqBr17sjnLQYvBaAlNPbUcPuCTOv5u/Zu/qkIvXnhpDDhnPHcgDZZ1lIYWj7oO4fmBJRloP2z5DxiLBekrHj5ipksWX9e1B63nwJbQfrDwTcdq4T4KqMMJpGCdXVowkTZoHlC+0LDPhsXUjo0rNTA7zl/tAR4f1zJ4cXWrqr8ljE0Bb+ONjzPpYQVRelSu9Bovh4dYYsjn+tUVVBsuTqaufWUrtB+9JVpg9CaGB2V295tjKflcAQU2XVwgGCBk7t5FFJB4ZetfbPp52/gi9BXIhL3dmnnEBIfD0InpWaoAG1LKzLwH+Ul4PW7RdhnB7yFa2ZW61HFXh8cEq1+O8efsAVXnSxOpPfzekWCm2Ztn+2M1y9GSlWw8Vaif7/wYkkYBhkPit1ZZE4Hg9fjzjVaXrux5a1cOuxgproSBrARu14gfEJh9gP1YiYhRx5Kxp3jzcJfQTDkrkXaUrNPc35n/fbUHNDCqem6B83vogz7503D93wsdagk6Akpg6tLpGLn2LQBgM+3+CN107nFYGF586tLonDN2CgEh/pjD2LdfAJwpl+5CcWuOGnrxmOnZ7MuPMJDhS3mlklgrvSf4+lhtI2g7ZZJg5MhHwmRxZc99U/JmROAucKfAKu11bdnltIpFnUU2AnxPN/atoC/Sy5usF2LY7IurbYSFWLBJJsMc1gn/sbWrrAoZMVlIThL6ejrRGnxzYcdEVrVzq5+VXlqT3HyAKGMOxSS0Ss+898CsmJ3/bnm1Gb0b4ladrnzellxd6lxQAxw56UYs8gboqXOXTpbTVY8kt3mM=; MUID=1D48B1F6352169DC2B03A32E342768C6; MUIDB=1D48B1F6352169DC2B03A32E342768C6; BFBUSR=CMUID=1D48B1F6352169DC2B03A32E342768C6; MMCASM=ID=B2A6F0309AA84F79BBE57A8C7E4B692E; _UR=cdxcls=0&QS=0&TQS=0; MicrosoftApplicationsTelemetryDeviceId=47997cea-71c5-4e85-98ad-c4ada62b73cc; _HPVN=CS=eyJQbiI6eyJDbiI6MywiU3QiOjAsIlFzIjowLCJQcm9kIjoiUCJ9LCJTYyI6eyJDbiI6MywiU3QiOjAsIlFzIjowLCJQcm9kIjoiSCJ9LCJReiI6eyJDbiI6MywiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyNC0wMi0xMFQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIlRucyI6MCwiRGZ0IjpudWxsLCJNdnMiOjAsIkZsdCI6MCwiSW1wIjo3LCJUb2JuIjowfQ==; mapc=rm=0; USRLOC=HS=1&ELOC=LAT=28.709861755371094|LON=77.1240234375|N=Alipur%2C%20Delhi|ELT=4|&BID=MjQwNzAzMTY1OTE1XzAwODRmYTM3MTE2NDQwYzA5ZGFlMzY3YTkzMWJjNTQ0ZTRiMTgxNTMzMmUyMmU3NDcyZTVmYWVkMTNlMWNjZGQ=; _clck=dqv8zj%7C2%7Cfmt%7C0%7C1486; EDGSRCHHPGUSR=CIBV=1.1785.0&udstone=Creative&udstoneopts=h3imaginative,flxegctxv3,egctxcplt,clgalileonsr,dlbmtc,dlbpc4575,dlbrngnp,dlbtc,dlbuc07,dlbuf03,preclsngnp; _EDGE_S=SID=11205444E35F66533CA540F5E2596710; WLS=C=2834a3cabd8ccc3e&N=vaibhav; _U=1wujjfyptH4zuj4xpOJ0GiejWA79kl72YxSE0WxRBEOSHPuHQWwKm6IxUhGWLkPpuTe1FsVRRVWIJmim81J5U37rM8unAh2GtpNAnU9fkoLvcf9TfsRwA-fvf4axCipR6vUlU9dk2Z9ndOItQS09Ynb9P_GuU6hQWOZlBLn2E467SivOWmAZqOuESC12dIfOYezZo4Fz8E4cI6kZoy9gGPw4nWhf1V5jXYIGIXNHfMEE; SRCHUSR=DOB=20240222&T=1720016706000; _RwBf=r=0&ilt=0&ihpd=0&ispd=0&rc=436&rb=436&gb=0&rg=0&pc=436&mtu=0&rbb=0.0&g=0&cid=&clo=0&v=1&l=2024-07-03T07:00:00.0000000Z&lft=0001-01-01T00:00:00.0000000&aof=0&ard=0001-01-01T00:00:00.0000000&rwdbt=0001-01-01T16:00:00.0000000-08:00&rwflt=2024-01-19T02:24:37.6923043-08:00&o=0&p=bingcopilotwaitlist&c=MY00IA&t=5413&s=2023-03-18T06:28:06.0542526+00:00&ts=2024-07-03T14:25:07.7038543+00:00&rwred=0&wls=2&wlb=0&wle=0&ccp=0&lka=0&lkt=0&aad=0&TH=&mta=0&e=GxLIZTPNOyZpEhTmmgAKIE-0jbtrUAmR-7pMTiSu2tW3AllEt3LppM6rA-6mgzgKZ-z1G3n6xwSLo4quYyMrzw&A=&cpt=0; _Rwho=u=d&ts=2024-07-03; _SS=SID=11205444E35F66533CA540F5E2596710&R=436&RB=436&GB=0&RG=0&RP=436; _C_ETH=1; GC=lF_FlOTeDKNt1VaeOIk2g5xTe-plm1fOUhEIzL6uBhJpQVUlZ7xNf42q-1-irGlASv8IffNzQkceYH8IsNfQYQ; ak_bmsc=6153A9369AD452B61A1212E26B4AD92F~000000000000000000000000000000~YAAQnQVaaFh7qluQAQAADSP8eBiiwWj2yhnK/jn1g9f/VpkeGtyjjAoAfMNWQJgtQYsLyodra9DL5fGkpytqPZlj201xogS9Ne69FnCil0Em7X7ef2lmK80RZskNLUxw2XTBlDib5On0clQzJqmpryKeH18cq4HnoERtCKwV6Gw+7PQ2N8ytPmjIOmJlu2YAvv1TGAdJHAxrVZcg1sMLZQmlXFAEqV/q7D100Xk7XySW+sNaYqfl6X6opS1Z+H++jvbeMiFZ1mRaJWuYbRIOriO/n6Q3f4m6yKuxIRQ9ypIgCfPuAJB+EYf0dAjO58QLfCtcS9MEizUzmDiKoeiNXiOt9DyhQyK+t3Siv0xZ2peHUaJ2ZyDD3wR5S5RTWKu734fhlg==; SRCHHPGUSR=SRCHLANG=en&DM=0&PV=14.0.0&CIBV=1.1785.0&BRW=NOTP&BRH=M&CW=662&CH=739&SCW=662&SCH=225&DPR=1.3&UTC=330&HV=1720016705&PRVCW=370&PRVCH=787&IG=53FB9C438C0A40EFBAAA5B8295D3D611&EXLTT=6&cdxtone=Creative&cdxtoneopts=,clgalileo,clgalileonsr,dlbmtc,dlbpc4575,dlbrngnp,dlbtc,dlbuc07,dlbuf03,preclsngnp; ipv6=hit=1720020310078',
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
