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
        cookies: 'MUID=1D48B1F6352169DC2B03A32E342768C6; SRCHD=AF=SHORUN; SRCHUID=V=2&GUID=B18766F5F37843F0B2F24AE09F770DBA&dmnchg=1; MMCASM=ID=5C1F284B449F4F6491552B9B62428975; EDGSRVCUSR=udscdxtone=Creative; ABDEF=V=13&ABDV=13&MRNB=1686574434381&MRB=0; ANON=A=6537DECCF7A2E7DA8892B66EFFFFFFFF&E=1c9f&W=1; PPLState=1; KievRPSSecAuth=FACCBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACPBgWAwDYiliQAR0a+dKSXQl9R2SfI/HoWgZ1iURm9p7TV3SUadMZEc72IUY2qtrMM0uIm2coaZ4Ib8NPbZjPWwtvindvRgiZcCsj5brABoqSO0CkWDdg/15bMW26ioe80B+g87/DJWOlhwa09qRGbV6rfLcV7K80ebGWZx8+M12dWtr8tVkG3OgDG31lzphW1bgZh2A66zDgE6KToMwWtj0qeiFBioNhWjDiust43lQi650h40491KkZ6T2glhLAAEXCZN2FIGq3DdXlA3PIFbh/VVFSezIESJnTrs/zsYfadKfZkn6pL8hYrtpwgjzgg6ENjx6HYoO/6iiIoPoJKDtQ0QjnK7f3HrV6kL35xOXbgs3VsqGEM/GRDFZSDikp6mcymBPfznUtnDjG781KOC+zx3iFb6i4dq1LcQawUhU1Lqr1i3iSIhy8i+3M2E6s2aqoMiU0RInMAEghFN5pqTjTpF/voeUF3tGQ4lU2ZR3UIRMMmAjj7KbOjTnC30COYGdzabTKZvzjW1bAmbGeBlcWzZ5z9IE9Fa+inXZyE1D3F4xDU5j/eA6WFV0DQ7phNoiKKPyjjMtnAv/4H7Omj/feK/Ws2MSWiGRdga7OlHQbaTunNITLeU9eJ2CKVNJzg/MS2d/XusjRdvbtzXPJBbhfKJb2yB7gptmwQFqDQX78X5smOrnc1LkSHdBBrnzssmJwUk2xr/7GJ7WifoHbc6SKB3IkhbphiY0riJy5izzDx74n/2zH5ngtM83MZiXRKu1TzCHkpXPsP+O3DSIXfdBor5if4Wqhj/gkJS1aq/l88p882K2eJZuaeqaJQyhlfkyoOZuSGC3MTf3HX6Oq3h6yyWkQKzzoxbzuHd7SEH9PHAkm+67FxZJvIA8TFbKzeR+aaqpZbtutPw5a8/mljKqHTKTUbIYSq9kEbP5zMyCGwriqcl3gg0yS24M5+9wWDWgOeL5Dz6LHDN2xZNczwyOgIFpYIQkHWmQmHn8eMepf2+HWX1tSEHhbSkwxZRCp4S5PGUZrvWMgrgRmJbBWtgX9gWbN0dXEzxFnX23NomM+JOc0rGhR3dUO3/0BlUUnz4GTnj/0Q0pUmPfNC4MlhDDp1WVD9arPupGhW+Zv8lZfqYG3pA6q2Gn0cxGIKzeM3GNCYrEIEV/zkcw6luhwZuLVryee1qxKXt40N8o0SoERQgb//4/P7IQuP0LoUb0GMXluPtA5wgL/XY10Vm3Dc5DyaofS4pszxMWP5aLBvz7iiPTURaJN50y6GlRhCZp/YK95TdDAl8uuAXIMmYsdr503iWkRjl44g7BuDtmRzlUlsfVtD5hBdKhZjNu4sn/9denIV6iPrWygkrgbXF+k04kqsLEkXLDQHJqeu3bryGOatIp0/dZZfow+t2QKHNHLmPYMweatGQGWWroPoV6oU0+nknoMdAPHAtw25dlDIlGg9GgwmztHla/zxQAUuPVD0JUVkPqvXZZzzSvmyagMz8=; EDGSRCHHPGUSR=udstone=Creative&udstoneopts=h3imaginative,gencontentv3,flxegctxv2; _clck=13lu0jd|2|fev|0|1230; _UR=QS=0&TQS=0&cdxcls=0; _EDGE_S=SID=150719BAD5DB666B0E880A2ED4E06795; WLS=C=2834a3cabd8ccc3e&N=vaibhav; _Rwho=u=d; _SS=SID=150719BAD5DB666B0E880A2ED4E06795&R=320&RB=320&GB=0&RG=0&RP=320; SUID=A; ipv6=hit=1695479860463&t=4; GC=lF_FlOTeDKNt1VaeOIk2g5xTe-plm1fOUhEIzL6uBhJeq-1IRfaCRKDwSKzjOdfRDY-9ftF94MpMg38dcu8RaQ; _U=1n9ONx9P4frMPchGMsEUQQj7J-F7kFatnohKgLht38fGh02fUx-7Dro700TSlrQLz2Zr1stleK93ELlFslHB8qQ6ilpqbrOkVAO0qr8sjDjG53RYo_Id7beM1j89ZvjFWpKRWGT2SG1p0mRNCGUrofLZHx9Z8R2_rt9MISv2KYWlcpCQqDLKijwRi7cZlHtoebKLCttEdWthEcS44hClKBtB6Y2wRKkdvQekLSkrxfXE; _HPVN=CS=eyJQbiI6eyJDbiI6NjIsIlN0IjoyLCJRcyI6MCwiUHJvZCI6IlAifSwiU2MiOnsiQ24iOjYyLCJTdCI6MCwiUXMiOjAsIlByb2QiOiJIIn0sIlF6Ijp7IkNuIjo2MiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyMy0wOS0yM1QwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIkRmdCI6bnVsbCwiTXZzIjowLCJGbHQiOjAsIkltcCI6MjQ0fQ==; SRCHHPGUSR=SRCHLANG=en&IG=C9B8FEFE54F243C692556E715B600BB5&DM=0&CW=645&CH=871&SCW=645&SCH=796&BRW=NOTP&BRH=M&DPR=1.1&UTC=330&HV=1695479219&PRVCW=645&PRVCH=871&PV=14.0.0&EXLTT=31&cdxtone=Creative&cdxtoneopts=h3imaginative,clgalileo,gencontentv3&BZA=0; USRLOC=HS=1&ELOC=LAT=28.709768295288086|LON=77.42656707763672|N=Ghaziabad%2C%20Uttar%20Pradesh|ELT=4|; SRCHUSR=DOB=20230318&T=1695479929000; _RwBf=ilt=1&ihpd=0&ispd=1&rc=320&rb=320&gb=0&rg=0&pc=320&mtu=0&rbb=0.0&g=0&cid=&clo=0&v=7&l=2023-09-23T07:00:00.0000000Z&lft=0001-01-01T00:00:00.0000000&aof=0&o=0&p=bingcopilotwaitlist&c=MY00IA&t=5413&s=2023-03-18T06:28:06.0542526+00:00&ts=2023-09-23T14:38:54.0190629+00:00&rwred=0&wls=2&lka=0&lkt=0&TH=&mta=0&e=GxLIZTPNOyZpEhTmmgAKIE-0jbtrUAmR-7pMTiSu2tW3AllEt3LppM6rA-6mgzgKZ-z1G3n6xwSLo4quYyMrzw&A=&mte=0&dci=0&wlb=0; dsc=order=ShopOrderNewsOverShop',
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
