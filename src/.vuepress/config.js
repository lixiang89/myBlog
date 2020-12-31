module.exports = {
    // base: '/',
    title: '伊水河的博客',
    dest: './docs',
    description: 'SO FAR SO GOOD',
    locales: {
        '/':{
            lang:'zh-CN'
        }
    },
    theme: 'reco',
    head: [
        [
            'meta',
            {
                name:'viewport',
                content:'width=device-width,initial-scale=1,user-scalable=no'
            }
        ],
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    themeConfig: {
        sidebar: {
            '/note/professionalJavascript4/':[
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
            ],
        },
        sidebarDepth: 2,
        type: 'blog',
        subSidebar: 'auto',
        authorAvatar: '/b.jpg',
        nav: [
            // { text: '前端', link: '/categories/前端/', icon: 'reco-blog' },
            // { text: '力扣', link: '/categories/力扣/', icon: 'reco-coding' },
            // { text: '笔记', link: '/note/', icon: 'reco-suggestion' },
            // { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
            { text: 'TODO', link: '/todo/', icon: 'reco-document' },
            { 
                text: '关于', 
                icon: 'reco-account',
                items: [
                    { text: '掘金', link: 'https://juejin.cn/user/571401777456621', icon: 'reco-juejin' },
                    { text: '码云', link: 'https://yishuihe.gitee.io', icon: 'reco-mayun' },
                    // { text: 'github', link: 'https://github.com/lixiang89', icon: 'reco-github' },
                ] 
            },
        ],
        author: '伊水河',
        blogConfig: {
            category: {
              location: 2,     // 在导航栏菜单中所占的位置，默认2
            //   text: 'Category' // 默认文案 “分类”
            },
            tag: {
            //   location: 3,     // 在导航栏菜单中所占的位置，默认3
            //   text: 'Tag'      // 默认文案 “标签”
            }
        },
    },
    plugins: [
        ["vuepress-plugin-nuggets-style-copy", {
            copyText: "代码复制",
            tip: {
                content: "复制成功!"
            }
        }],
        ['meting',{
            meting: {
                server: 'tencent',
                type: 'playlist',
                mid: '3237902067',
            },
            aplayer: {
                order: 'random',
                lrcType: 3,
                listFolded: true
            },
            mobile:{
                cover:false,
                lrc:false
            }
        }],
        // ["@vuepress-reco/vuepress-plugin-bgm-player", {
        //     audios: [
        //         {
        //           name: '好久不见',
        //           artist: '伊水河',
        //           url: 'http://tx.stream.kg.qq.com/szkge-btfs/52be4a8730ec3ce0426b716caa9fad87a4165e47?ftnrkey=eea0deeaaa42bc16a69ddf7d1f0e819dfc930fe84129385cabc286c87322d34bc7bd1e454c08883cbc33a574c3ae513aab2de05d6fd694ba6393f346ce199863&vkey=4B63FED1CCEDB0274AC45C0A9FB5FEE392A4B3407578ABF62E173035F544DED87839F1CD6A43A3FD87AED1C0B5ADAC44CE7B50C631772C9AF6C0C679A51030794170CF781D51E07F4B35D79152ED313BB8DC6596EBE36C48&fname=1021_6c7073ead63ec592547e47ef80f982fc728122ac.0.m4a',
        //           cover: '/music/好久不见.jpg'
        //         },
        //         {
        //           name: '像我这样的人',
        //           artist: '伊水河',
        //           url: 'http://ws.stream.kg.qq.com/szkge-btfs/a80813327a7f5ae54fda9b38f2e807803d123435?ftnrkey=333fe01a8756a228d0a71030bdd84aeea5fffe5f2d33a08e9f384ca5b3677684aa6e8907c9338d7d324a34b611a21eae7e01f0aae5fd1d1fb62cb796878516c4&vkey=41831D944F04EC8C102274853C306370480862B12EEFC9F710001E4083B20AFF8BD90AF83E9CF44ACF9A67E05231D5E8443E770EAB43AA912BE94BF971F10449D14D372CC615E3CC035BF33C568628EF0D91E1AC1F005716&fname=1021_28dc41ead63ec592547e47ef80f9b0fc4681e7ad.0.m4a',
        //         //   cover: '/music/好久不见.jpg'
        //         },
        //         {
        //           name: '虫儿飞',
        //           artist: '伊水河',
        //           url: 'https://ws.stream.kg.qq.com/szkge-btfs/e606f85fa4fc65600a1f5482fc5ce32c7fd9c053?ftnrkey=fe5c3177a2ab1b51f2fd570b8b855c932e95e6980b8129a6979640129f549fcba8be3998f5dffde90576b94983d226f1a8efbf9f690e5b4b2a0dec5cd612390d&vkey=ECE52961B4654971544C61E86C030C7124F051A960DAC1D07338957239C3B8C905F88BB034DF0E7ACEE7BC727830233C04336FBD1B9A631E5795E6A5CDD33F627DA5C1281D06E0BD4BF3DF33AF7D95FAFA3BD01F8C22AF53&fname=1021_dca810ead63ec592547e47ef80f983fc4481baad.0.m4a',
        //         //   cover: '/music/好久不见.jpg'
        //         },
        //     ]
        // }],
        // ["./auto.js", {
        //     a:1
        // }],
    ]
}