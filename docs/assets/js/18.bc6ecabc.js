(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{512:function(t,s,a){"use strict";a.r(s);var n=a(4),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"html中的-script-标签"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#html中的-script-标签"}},[t._v("#")]),t._v(" HTML中的"),a("code",[t._v("<script>")]),t._v("标签")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行，只对外部脚本文件有效。\nHTML5规范要求脚本应该按照他们出现的顺序执行，因此第一个推迟的脚本会在第二个推迟的脚本之前执行，且两者都会在DOMContentLoaded事件之前执行。不过在实际当中，推迟执行的脚本不一定总会符合上述标准，因此最好只包含一个这样的脚本。")])]),t._v(" "),a("li",[a("p",[t._v("async：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本开发。\n与defer不同的是，标记为async的脚本并不保证能按照他们出现的次序执行。给脚本添加async属性的目的是告诉浏览器，不必等脚本下载和执行完成后再加载页面，同样也不必等到该脚本下载和制售再加载其他脚本。正因如此，异步脚本不应该在加载期间修改DOM。异步脚本保证会在页面的load事件前执行，但可能会在DOMContentLoaded之前或之后。")])])]),t._v(" "),a("h2",{attrs:{id:"动态脚本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#动态脚本"}},[t._v("#")]),t._v(" 动态脚本")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'script'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nscript"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'abc.js'")]),t._v("\nscript"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("async"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//不写默认为true，异步，写了同步")]),t._v("\ndocument"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("head"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("appendChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("以这种方式获取的资源（"),a("code",[t._v("false")]),t._v("）对浏览器预加载器是不可见的。这回严重影响它们在资源获取队列中的优先级。根据应用程序的工作方式以及怎么使用，这用方式可能会严重影响性能。要想让预加载器知道这些动态请求文件的存在，可以在文档头部显式声明："),a("code",[t._v("<link href='abc.js'>")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("自备")]),t._v("：jsonp常用此法——不写async")])])])}),[],!1,null,null,null);s.default=e.exports}}]);