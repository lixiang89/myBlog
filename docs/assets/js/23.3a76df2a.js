(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{517:function(t,a,s){"use strict";s.r(a);var n=s(3),r=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[s("a",{attrs:{href:"https://leetcode-cn.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers/",target:"_blank",rel:"noopener noreferrer"}},[t._v("十-二进制数的最少数目"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("消耗：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/images/leetcode/1689.png",alt:"消耗"}})]),t._v(" "),s("p",[t._v("脑筋急转弯，真的是。。。")]),t._v(" "),s("p",[t._v("拆解示例：")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("32")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("11")])]),t._v(" "),s("tr",[s("td",[t._v("11")])]),t._v(" "),s("tr",[s("td",[t._v("10")])])])]),t._v(" "),s("hr"),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("82734")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("11111")])]),t._v(" "),s("tr",[s("td",[t._v("11111")])]),t._v(" "),s("tr",[s("td",[t._v("10111")])]),t._v(" "),s("tr",[s("td",[t._v("10101")])]),t._v(" "),s("tr",[s("td",[t._v("10100")])]),t._v(" "),s("tr",[s("td",[t._v("10100")])]),t._v(" "),s("tr",[s("td",[t._v("10100")])]),t._v(" "),s("tr",[s("td",[t._v("10000")])])])]),t._v(" "),s("p",[t._v("....")]),t._v(" "),s("p",[t._v("所以其实就是找数字字符串中的最大数字。")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @param {string} n\n * @return {number}\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("minPartitions")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("n")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" max"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("9")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("9")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("max"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            max"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("t\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" max\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);