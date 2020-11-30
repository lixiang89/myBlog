module.exports = {
    base: '/myBlog/',
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
        // sidebar: 'auto',
        sidebarDepth: 2,
        type: 'blog',
        subSidebar: 'auto',
        authorAvatar: '/b.jpg',
        nav: [
            { 
                text: '切换', 
                icon: 'reco-blog',
                ariaLabel: 'Language Menu',
                items: [
                    { text: '码云', link: 'https://yishuihe.gitee.io/myblog', target:'_self', icon: 'reco-mayun' },
                    { text: 'github', link: 'https://lixiang89.github.io/myBlog/', target:'_self', icon: 'reco-github' },
                ] 
            },
            { text: '前端', link: '/categories/前端/', icon: 'reco-api' },
            { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
            { text: 'TODO', link: '/todo/', icon: 'reco-suggestion' },
            { 
                text: '关于', 
                icon: 'reco-account',
                items: [
                    { text: '掘金', link: 'https://juejin.cn/user/571401777456621', icon: 'reco-juejin' },
                    { text: 'github', link: 'https://github.com/lixiang89', icon: 'reco-github' },
                ] 
            },
        ],
        author: '伊水河',
        blogConfig: {
            // category: {
            //   location: 2,     // 在导航栏菜单中所占的位置，默认2
            // //   text: 'Category' // 默认文案 “分类”
            // },
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
        }]
          
    ]
}