module.exports = {
    base: '/myBlog/',
    title: '伊水河的博客',
    dest: './docs',
    description: '随便记录点什么',
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
        ]
    ],
    themeConfig: {
        // sidebar: 'auto',
        sidebarDepth: 2,
        type: 'blog',
        subSidebar: 'auto',
        authorAvatar: '/b.jpg',
        nav: [
            { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
            { text: '前端', link: '/categories/前端/', icon: 'reco-api' },
        ],
        author: '伊水河',
        blogConfig: {
            // category: {
            //   location: 2,     // 在导航栏菜单中所占的位置，默认2
            // //   text: 'Category' // 默认文案 “分类”
            // },
            tag: {
              location: 3,     // 在导航栏菜单中所占的位置，默认3
            //   text: 'Tag'      // 默认文案 “标签”
            }
        }
    },
    plugins: [
        ['vuepress-plugin-code-copy',{
            successText: '复制成功！'
        }]
    ]
}