(function(){"use strict";var t={9274:function(t,n,e){var r=e(9242),o=e(3396),a=e(7139);const i=(0,o._)("div",{class:"lds-dual-ring"},null,-1),s=[i],u={class:"section"};function c(t,n,e,r,i,c){const l=(0,o.up)("Navbar"),d=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(l),(0,o._)("div",{class:(0,a.C_)(["is-loading-bar has-text-centered",{"is-loading":t.$store.state.isLoading}])},s,2),(0,o._)("section",u,[(0,o.Wm)(d)])])}e(7658);var l=e(4311);const d={class:"navbar is-dark"},f={class:"navbar-brand"},v=(0,o._)("strong",null,"Votes",-1),m={class:"navbar-menu"},b={class:"navbar-end"},h={class:"navbar-item"},p={class:"buttons"},g=(0,o._)("strong",null,"Sign up",-1);function _(t,n,e,r,a,i){const s=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("nav",d,[(0,o._)("div",f,[(0,o.Wm)(s,{to:"/crm/",class:"navbar-item"},{default:(0,o.w5)((()=>[v])),_:1})]),(0,o._)("div",m,[(0,o._)("div",b,[t.$store.state.isAuthenticated?((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o.Wm)(s,{to:"/crm/dashboard/leads",class:"navbar-item"},{default:(0,o.w5)((()=>[(0,o.Uk)("Leads")])),_:1}),(0,o.Wm)(s,{to:"/crm/dashboard/clients",class:"navbar-item"},{default:(0,o.w5)((()=>[(0,o.Uk)("Clients")])),_:1}),(0,o.Wm)(s,{to:"/crm/dashboard/team",class:"navbar-item"},{default:(0,o.w5)((()=>[(0,o.Uk)("Team")])),_:1})],64)):(0,o.kq)("",!0),(0,o._)("div",h,[(0,o._)("div",p,[t.$store.state.isAuthenticated?((0,o.wg)(),(0,o.j4)(s,{key:1,to:"/crm/dashboard/my-account",class:"button is-info"},{default:(0,o.w5)((()=>[(0,o.Uk)("My account")])),_:1})):((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o.Wm)(s,{to:"/crm/sign-up",class:"button is-success"},{default:(0,o.w5)((()=>[g])),_:1}),(0,o.Wm)(s,{to:"/crm/log-in",class:"button is-light"},{default:(0,o.w5)((()=>[(0,o.Uk)("Log in")])),_:1})],64))])])])])])}var w={name:"Navbar"},k=e(89);const y=(0,k.Z)(w,[["render",_]]);var O=y,j={name:"App",components:{Navbar:O},beforeCreate(){this.$store.commit("initializeStore"),this.$store.state.token?l.Z.defaults.headers.common.Authorization="Token "+this.$store.state.token:l.Z.defaults.headers.common.Authorization="",this.$store.state.team.id&&"undefined"!=this.$store.state.team.id||this.$router.push("/crm/dashboard/add-team")}};const $=(0,k.Z)(j,[["render",c]]);var W=$,Z=e(3945),S=e(4239);l.Z.defaults.baseURL="http://127.0.0.1:8000",(0,r.ri)(W).use(S.Z).use(Z.Z,l.Z).mount("#app")}},n={};function e(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={id:r,loaded:!1,exports:{}};return t[r].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}e.m=t,function(){var t=[];e.O=function(n,r,o,a){if(!r){var i=1/0;for(l=0;l<t.length;l++){r=t[l][0],o=t[l][1],a=t[l][2];for(var s=!0,u=0;u<r.length;u++)(!1&a||i>=a)&&Object.keys(e.O).every((function(t){return e.O[t](r[u])}))?r.splice(u--,1):(s=!1,a<i&&(i=a));if(s){t.splice(l--,1);var c=o();void 0!==c&&(n=c)}}return n}a=a||0;for(var l=t.length;l>0&&t[l-1][2]>a;l--)t[l]=t[l-1];t[l]=[r,o,a]}}(),function(){e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,{a:n}),n}}(),function(){e.d=function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}}(),function(){e.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){e.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){e.j=877}(),function(){var t={877:0};e.O.j=function(n){return 0===t[n]};var n=function(n,r){var o,a,i=r[0],s=r[1],u=r[2],c=0;if(i.some((function(n){return 0!==t[n]}))){for(o in s)e.o(s,o)&&(e.m[o]=s[o]);if(u)var l=u(e)}for(n&&n(r);c<i.length;c++)a=i[c],e.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return e.O(l)},r=self["webpackChunkvotes_vue"]=self["webpackChunkvotes_vue"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=e.O(void 0,[998,64],(function(){return e(9274)}));r=e.O(r)})();
//# sourceMappingURL=crm.1ac39246.js.map