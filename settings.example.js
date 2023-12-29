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
        cookies : 'MUID=1D48B1F6352169DC2B03A32E342768C6; SRCHD=AF=SHORUN; SRCHUID=V=2&GUID=B18766F5F37843F0B2F24AE09F770DBA&dmnchg=1; MUIDB=1D48B1F6352169DC2B03A32E342768C6; MicrosoftApplicationsTelemetryDeviceId=3e6a222f-e16a-455a-87fc-65cab79bcc42; MMCASM=ID=5C1F284B449F4F6491552B9B62428975; EDGSRVCUSR=udscdxtone=Creative; PPLState=1; _UR=QS=0&TQS=0&cdxcls=0; ABDEF=V=13&ABDV=13&MRNB=0&MRB=1696837212349; ANON=A=6537DECCF7A2E7DA8892B66EFFFFFFFF&E=1d14&W=1; NAP=V=1.9&E=1cba&C=dpy-KPedw16QGiux60r3l68hYTKtZNh9SOBe62SWPScgkZ_pTBpNlA&W=1; KievRPSSecAuth=FACCBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACMSj7WUj3TZUQATzOqCYiO4VddyhbXswBw0EjL6pNxfovul7teTV5ZoBUSMONiAHju9+8J9c7SagtqTh18JijWNR+0f+eOb291jcn9AZrYSJd+vgSfjiJ6LvkHIo57BvukPfTsmytK7u/wgNdS0zcVqGBpb1HpmiwlsvZ0m3XWfS2Xj+dt26Ffvq7eZhsUs9QRBEFdu2bJl8BNXS6mmhVe8f/C8SNNHOtuA7QVmdjTelpsdmiYmkyA/NCXWAmE7fLGygKkhgfQeeeLrYSTsA4hq4YmX0szlw1h634hBN5c05J7r06NJ4HoBLotD51JvSoXTUJ9aXdwhVcOXbjIshfuom3CR9OlKE/CkEj6oUriBosuo6zaPkgU55DSu1/YQzGEudpSTntC1F7YWSzJgQr2xPNh21ZZMCIMUtQnfCu80+BMiSIZWM8175RLVEWPSVSFxTLBbbfDoEejfG0KI49f8XtnXjn/7x0CwN1bx8TB/7OSwAoGBv0ZmvoeFgeJmUu0kHMjIx97E6MmBVVrH5AXym/0PwZxYF5yyMgSo3ezQIpbQbJQrLuvQeOVV+84KMiTBtMYntj8lLOhL31YbU8zQPKF+i/wriNgM3IGNMn+rf0QQkI5UJHOxvemrh73D1leMKbDyhbkrdMp3vmYJhWxBybCob0BYhgRwVCxT1pjJ9pIOo6JS3H3uGFmyrirYDk39bMXDc648oXswTEMlmMaJiLrGYv2FlXtqfajkJCkCgodfHdJTnfij10O2R5FB/8m2LsAKaSAgGDnNtf29zKgwPnYEeig/Vf5d/dMpI3KZzCtQxXxr3O7zIkbX/KzjS2a+R5XJsF0sccZ3SMK+5DIUmrEFtqU1S0Xn7d5EeZxf4lCw3gHPFMcPRvrtT3QCGGbdjEez1MdsALe5yHJjThyWFr4G229ivsvhu8Z+JLcoISt7TwRATktCIKvBuzFyeacrV3L07omRQ+/J4SYGLS9T3anpGW341/lnERuQsnHRxBruVR6BxjjrbGrFyLLdNj7ETGaKyIqmp0j2PLGJb6iZCQFapfF+2kjSnG6oYTgRNx6H3dVJgRBBcPprqAHKyDB3EFfvRPs9OIn+gHL40+YfSjT8o0pOgguUb2V/xy2j2AJ4MnzMAX5TOx98CT93ecewQojupbb01ynQdCMGQVQPwcUI+dUea5KhZY9DgG1uX5rJiFyVnwiYoHpBEQzwMXoaeoMPkldIxW4J6kaiLwSXF0RJZGUK3CuK9Kj1mVmy6D/EPzR1601cx+CS5ffuabuOLH9fIPnnT3nzewhcl2XOFYjDkwQPPDiTVaF5zQcBzpHp9gD+ybEb37BABFpXO8du2bQerq0ZG53Gom4wPeiRRMwhk0236BYwOXIEFdkXbVEPjQcGjRkakhMto7t7KovsWFWdV85RygrAnnXclpSmf3tfZ1EvORayPoPLluaH2lhdAJIjaZVsCGRQAOGiMjrFJSiYG9FikGMwEbWw7eb0=; ANIMIA=FRE=1; HPHOL=0; fdfre=o=1; BFBUSR=CMUID=1D48B1F6352169DC2B03A32E342768C6; _clck=13lu0jd%7C2%7Cfhl%7C0%7C1230; EDGSRCHHPGUSR=udstone=Creative&udstoneopts=h3imaginative,gencontentv3,flxegctxv2&CIBV=1.1381.12; _HPVN=CS=eyJQbiI6eyJDbiI6NjksIlN0IjoyLCJRcyI6MCwiUHJvZCI6IlAifSwiU2MiOnsiQ24iOjY5LCJTdCI6MCwiUXMiOjAsIlByb2QiOiJIIn0sIlF6Ijp7IkNuIjo2OSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyMy0xMi0yMFQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIlRucyI6MCwiRGZ0IjpudWxsLCJNdnMiOjAsIkZsdCI6MCwiSW1wIjoyNjksIlRvYm4iOjB9; USRLOC=HS=1&ELOC=LAT=28.65484619140625|LON=77.1871109008789|N=New%20Delhi%2C%20Delhi|ELT=1|; MSPTC=MdJUq-saPu0Ljl8TovY0p4H8wDkVu3UJT1iD4YypvII; _EDGE_S=SID=14CACE69B53C67200000DD9AB4CE6645; WLS=C=2834a3cabd8ccc3e&N=vaibhav; _U=1_4zBRoaaRYL2-ngq-eJgAMS5oVTqWJAdr6UaFGaETTwaZFD-N5XoDX6ZHovMODt4_I5yKHG0YG3K0rK4cfh133jrRQR6gDes1qknR123sDt3EhsfUJ65Nsjosfjr89EKGjyVlYkzbPJuOR3LZbxDEd3avgaODFP6iY-Z-ffVxJEs-WqATbC2QvVHSMcZShVwa7qH5peGY-jDyckgIg_Y_8X06xJtjBgjrlS6BT31NzI; SRCHUSR=DOB=20230318&T=1703578614000; _Rwho=u=d; _SS=SID=14CACE69B53C67200000DD9AB4CE6645&R=397&RB=397&GB=0&RG=0&RP=397; ipv6=hit=1703582217089&t=4; _RwBf=ilt=1&ihpd=0&ispd=1&rc=397&rb=397&gb=0&rg=0&pc=397&mtu=0&rbb=0.0&g=0&cid=&clo=0&v=2&l=2023-12-26T08:00:00.0000000Z&lft=0001-01-01T00:00:00.0000000&aof=0&o=0&p=bingcopilotwaitlist&c=MY00IA&t=5413&s=2023-03-18T06:28:06.0542526+00:00&ts=2023-12-26T08:17:35.8467759+00:00&rwred=0&wls=2&lka=0&lkt=0&TH=&mta=0&e=GxLIZTPNOyZpEhTmmgAKIE-0jbtrUAmR-7pMTiSu2tW3AllEt3LppM6rA-6mgzgKZ-z1G3n6xwSLo4quYyMrzw&A=&mte=0&dci=0&wlb=0&aad=0&ccp=0&wle=0&ard=0001-01-01T00:00:00.0000000; dsc=order=News; GC=lF_FlOTeDKNt1VaeOIk2g5xTe-plm1fOUhEIzL6uBhKkJjP_Lc64mMCXzI1_J-iWaa6PxELS5rotgncnHJ1KjQ; SRCHHPGUSR=SRCHLANG=en&IG=E9DAE571D9BB422889644FF7AAADECCD&DM=0&CW=815&CH=871&SCW=815&SCH=796&BRW=NOTP&BRH=M&DPR=1.1&UTC=330&HV=1703578656&PRVCW=1738&PRVCH=871&PV=14.0.0&EXLTT=31&cdxtone=Creative&cdxtoneopts=h3imaginative,clgalileo,gencontentv3&BZA=0&CIBV=1.1381.12&CMUID=1D48B1F6352169DC2B03A32E342768C6',
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
        debug: false,
        // Set to true to let AI only generate text in base64
        useBase64: process.env.USE_BASE64 === 'false',
        // Set to false to disable suggestions
        showSuggestions: process.env.SHOW_SUGGESTIONS !== 'false',
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
        port: process.env.PORT || 3001,
        host: process.env.API_HOST || '127.0.0.1',
        // (Optional) Set to true to enable `console.debug()` logging
        debug: false,
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
            validClientsToUse: ['bing', 'chatgpt', 'chatgpt-browser', 'localLLM'], // values from possible `clientToUse` options above
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
        // clientToUse: 'bing',
    },
};