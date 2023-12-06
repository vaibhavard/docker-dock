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
        //userToken: '1uFVhjgFz6R31c_RhYtkBfQm7KcXHHvOvhn_dzOxKNRtj2NQB5rSRNhfc-t26RrUZ45KZfVzMd3pJtUzNWAENXQJUS2hJsAtGOkqlZpGuFy7FlwfqDMpuCyuAP61vilS6VFoVH7My6JNY_8bv3VOFYWzIeL9Odi7a4oJ5W5yh7c_jYgiJS_0ZhbcZOTlYqEvOmvYeXhcaReN4AcJ4QDgBNS0kVUcQgyE9wKWVtUzqem4',
        // If the above doesn't work, provide all your cookies as a string instead
        cookies: 'MUID=1D48B1F6352169DC2B03A32E342768C6; SRCHD=AF=SHORUN; SRCHUID=V=2&GUID=B18766F5F37843F0B2F24AE09F770DBA&dmnchg=1; MUIDB=1D48B1F6352169DC2B03A32E342768C6; MicrosoftApplicationsTelemetryDeviceId=3e6a222f-e16a-455a-87fc-65cab79bcc42; MMCASM=ID=5C1F284B449F4F6491552B9B62428975; EDGSRVCUSR=udscdxtone=Creative; PPLState=1; _UR=QS=0&TQS=0&cdxcls=0; ABDEF=V=13&ABDV=13&MRNB=0&MRB=1696837212349; _clck=13lu0jd|2|fg1|0|1230; ANON=A=6537DECCF7A2E7DA8892B66EFFFFFFFF&E=1d14&W=1; NAP=V=1.9&E=1cba&C=dpy-KPedw16QGiux60r3l68hYTKtZNh9SOBe62SWPScgkZ_pTBpNlA&W=1; KievRPSSecAuth=FACCBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACMSj7WUj3TZUQATzOqCYiO4VddyhbXswBw0EjL6pNxfovul7teTV5ZoBUSMONiAHju9+8J9c7SagtqTh18JijWNR+0f+eOb291jcn9AZrYSJd+vgSfjiJ6LvkHIo57BvukPfTsmytK7u/wgNdS0zcVqGBpb1HpmiwlsvZ0m3XWfS2Xj+dt26Ffvq7eZhsUs9QRBEFdu2bJl8BNXS6mmhVe8f/C8SNNHOtuA7QVmdjTelpsdmiYmkyA/NCXWAmE7fLGygKkhgfQeeeLrYSTsA4hq4YmX0szlw1h634hBN5c05J7r06NJ4HoBLotD51JvSoXTUJ9aXdwhVcOXbjIshfuom3CR9OlKE/CkEj6oUriBosuo6zaPkgU55DSu1/YQzGEudpSTntC1F7YWSzJgQr2xPNh21ZZMCIMUtQnfCu80+BMiSIZWM8175RLVEWPSVSFxTLBbbfDoEejfG0KI49f8XtnXjn/7x0CwN1bx8TB/7OSwAoGBv0ZmvoeFgeJmUu0kHMjIx97E6MmBVVrH5AXym/0PwZxYF5yyMgSo3ezQIpbQbJQrLuvQeOVV+84KMiTBtMYntj8lLOhL31YbU8zQPKF+i/wriNgM3IGNMn+rf0QQkI5UJHOxvemrh73D1leMKbDyhbkrdMp3vmYJhWxBybCob0BYhgRwVCxT1pjJ9pIOo6JS3H3uGFmyrirYDk39bMXDc648oXswTEMlmMaJiLrGYv2FlXtqfajkJCkCgodfHdJTnfij10O2R5FB/8m2LsAKaSAgGDnNtf29zKgwPnYEeig/Vf5d/dMpI3KZzCtQxXxr3O7zIkbX/KzjS2a+R5XJsF0sccZ3SMK+5DIUmrEFtqU1S0Xn7d5EeZxf4lCw3gHPFMcPRvrtT3QCGGbdjEez1MdsALe5yHJjThyWFr4G229ivsvhu8Z+JLcoISt7TwRATktCIKvBuzFyeacrV3L07omRQ+/J4SYGLS9T3anpGW341/lnERuQsnHRxBruVR6BxjjrbGrFyLLdNj7ETGaKyIqmp0j2PLGJb6iZCQFapfF+2kjSnG6oYTgRNx6H3dVJgRBBcPprqAHKyDB3EFfvRPs9OIn+gHL40+YfSjT8o0pOgguUb2V/xy2j2AJ4MnzMAX5TOx98CT93ecewQojupbb01ynQdCMGQVQPwcUI+dUea5KhZY9DgG1uX5rJiFyVnwiYoHpBEQzwMXoaeoMPkldIxW4J6kaiLwSXF0RJZGUK3CuK9Kj1mVmy6D/EPzR1601cx+CS5ffuabuOLH9fIPnnT3nzewhcl2XOFYjDkwQPPDiTVaF5zQcBzpHp9gD+ybEb37BABFpXO8du2bQerq0ZG53Gom4wPeiRRMwhk0236BYwOXIEFdkXbVEPjQcGjRkakhMto7t7KovsWFWdV85RygrAnnXclpSmf3tfZ1EvORayPoPLluaH2lhdAJIjaZVsCGRQAOGiMjrFJSiYG9FikGMwEbWw7eb0=; ANIMIA=FRE=1; EDGSRCHHPGUSR=udstone=Creative&udstoneopts=h3imaginative,gencontentv3,flxegctxv2&CIBV=1.1366.5; HPHOL=0; _HPVN=CS=eyJQbiI6eyJDbiI6NjgsIlN0IjoyLCJRcyI6MCwiUHJvZCI6IlAifSwiU2MiOnsiQ24iOjY4LCJTdCI6MCwiUXMiOjAsIlByb2QiOiJIIn0sIlF6Ijp7IkNuIjo2OCwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyMy0xMi0wMlQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIlRucyI6MCwiRGZ0IjpudWxsLCJNdnMiOjAsIkZsdCI6MCwiSW1wIjoyNjYsIlRvYmJzIjowfQ==; fdfre=o=1; USRLOC=HS=1&ELOC=LAT=28.566577911376953|LON=77.20722961425781|N=New%20Delhi%2C%20Delhi|ELT=1|; _EDGE_S=SID=124625F2FE0A68713C8A362DFFF86941; WLS=C=2834a3cabd8ccc3e&N=vaibhav; _U=15KbfPu6oFxhtJYvPnvJ4zQD_tiJSTW8luY1hc6TqbssscADdoy-Iiqn3ORorHFZ3G2WXqw8JGcjNsC6w-FLrbHth30Bj9F8_84bq10eQPtuDVdNd5zHwgOTWM9bTYPjCqmWy3xIHZjEsDcvVkUMQ0RAISwP0P8RGJ6cm6-EP0X-3wNOSNVABoCUBssicxxfDIocZIBoH17ewagKzRDAusWcxvLtjq9ByQWYnGf5ezMk; SRCHUSR=DOB=20230318&T=1701870604000; _RwBf=ilt=1&ihpd=0&ispd=1&rc=397&rb=397&gb=0&rg=0&pc=397&mtu=0&rbb=0.0&g=0&cid=&clo=0&v=2&l=2023-12-06T08:00:00.0000000Z&lft=0001-01-01T00:00:00.0000000&aof=0&o=0&p=bingcopilotwaitlist&c=MY00IA&t=5413&s=2023-03-18T06:28:06.0542526+00:00&ts=2023-12-06T13:50:06.1171269+00:00&rwred=0&wls=2&lka=0&lkt=0&TH=&mta=0&e=GxLIZTPNOyZpEhTmmgAKIE-0jbtrUAmR-7pMTiSu2tW3AllEt3LppM6rA-6mgzgKZ-z1G3n6xwSLo4quYyMrzw&A=&mte=0&dci=0&wlb=0&aad=0&ccp=0; _Rwho=u=d; _SS=SID=124625F2FE0A68713C8A362DFFF86941&R=397&RB=397&GB=0&RG=0&RP=397; GC=lF_FlOTeDKNt1VaeOIk2g5xTe-plm1fOUhEIzL6uBhJfXeBzxSXOkdDFxeSrdNW3JJdnUlDnHeP-2ck4aJrLWg; dsc=order=ShopOrderNewsOverShop; SRCHHPGUSR=SRCHLANG=en&IG=18773E8BB4BB448E84A3E38725E430C3&DM=0&CW=815&CH=871&SCW=815&SCH=796&BRW=NOTP&BRH=M&DPR=1.1&UTC=330&HV=1701870569&PRVCW=1738&PRVCH=871&PV=14.0.0&EXLTT=31&cdxtone=Creative&cdxtoneopts=h3imaginative,clgalileo,gencontentv3&BZA=0&CIBV=1.1366.5; ipv6=hit=1701874172022&t=4',
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
        debug: true,
    },
    // Options for the API server
    apiOptions: {
        port: process.env.API_PORT || 3000,
        host: process.env.API_HOST || 'localhost',
        // (Optional) Set to true to enable `console.debug()` logging
        debug: true,
        // (Optional) Possible options: "chatgpt", "chatgpt-browser", "bing". (Default: "chatgpt")
        clientToUse: 'bing',
        // (Optional) Generate titles for each conversation for clients that support it (only ChatGPTClient for now).
        // This will be returned as a `title` property in the first response of the conversation.
        generateTitles: true,
        // (Optional) Set this to allow changing the client or client options in POST /conversation.
        // To disable, set to `null`.
        perMessageClientOptionsWhitelist: {
            // The ability to switch clients using `clientOptions.clientToUse` will be disabled if `validClientsToUse` is not set.
            // To allow switching clients per message, you must set `validClientsToUse` to a non-empty array.
            validClientsToUse: ['bing', 'chatgpt', 'chatgpt-browser'], // values from possible `clientToUse` options above
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

