!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=53)}({0:function(t,e,r){"use strict";r.d(e,"d",function(){return c}),r.d(e,"p",function(){return u}),r.d(e,"j",function(){return s}),r.d(e,"B",function(){return l}),r.d(e,"f",function(){return f}),r.d(e,"z",function(){return E}),r.d(e,"w",function(){return m}),r.d(e,"a",function(){return _}),r.d(e,"I",function(){return d}),r.d(e,"C",function(){return T}),r.d(e,"n",function(){return w}),r.d(e,"g",function(){return C}),r.d(e,"m",function(){return S}),r.d(e,"E",function(){return g}),r.d(e,"H",function(){return N}),r.d(e,"D",function(){return O}),r.d(e,"i",function(){return h}),r.d(e,"F",function(){return I}),r.d(e,"u",function(){return p}),r.d(e,"x",function(){return A}),r.d(e,"l",function(){return R}),r.d(e,"k",function(){return L}),r.d(e,"c",function(){return y}),r.d(e,"b",function(){return v}),r.d(e,"s",function(){return b}),r.d(e,"h",function(){return P}),r.d(e,"A",function(){return D}),r.d(e,"G",function(){return M}),r.d(e,"y",function(){return G}),r.d(e,"r",function(){return k}),r.d(e,"q",function(){return x}),r.d(e,"v",function(){return W}),r.d(e,"t",function(){return U}),r.d(e,"e",function(){return F}),r.d(e,"o",function(){return V});var n,o,i=r(5),a=r.n(i),c={IFRAME_HEIGHT:"98%",IFRAME_WIDTH:"470px",OUTER_IFRAME_ID:"similarweb-outer-content",INNER_IFRAME_ID:"similarweb-inner-content",IFRAME_CONTENT_ID:"iframe-content",MAX_Z_INDEX:"2147483647",BODY_INTERVAL:100,STYLE_DATA_ID:"data-id",STYLE_DATA_ID_VALUE:"sw-animations",STYLE_DATA_PANEL:"data-panel",STYLE_DATA_PANEL_INSIDE:"sw-in",STYLE_DATA_PANEL_OUTSIDE:"sw-out",IFRAME_INIT_EVENT:"SW_iframeInitEvent",START_IFRAME_INIT:"SW_startIframeInit",CONTENT_REACT_READY:"SW_contentReactReady",TRIGGER_DISPATCH_FOR_SELF:"SW_triggerDispatchForSelf",EVENTS:{SIMILARWEB_TOGGLE_PANEL:"similarweb-toggle-panel",CLEAR_HOST_KEY:"similarweb-clear-host",OPEN_OPTIONS_PAGE:"similarweb-open-options-page"},SOURCES:{SIMILARWEB_TOGGLE_PANEL:"SIMILARWEB_TOGGLE_PANEL",SIMILARWEB_CLICK_OUTSIDE:"SIMILARWEB_CLICK_OUTSIDE"}},u={TOGGLE_POPUP:"togglePopup",GA_EVENT:"gaEvent",FETCH_DATA:"fetchData",OPEN_URL_IN_NEW_TAB:"openUrlInNewTab",UPDATE_KEY:"updateKey",UPDATE_ALL_PAGES:"updateAllPages",UPDATE_STORE:"updateStore",CLEAR_KEY:"clearKey",GET_DOMINANT_COLOR_OF_IMAGE_URL:"getDominantColorOfImageUrl",OPEN_OPTIONS_PAGE:"openOptionsPage",IS_INSTALLED:"isInstalled",OPT_IN:"enableAutoIcon",OPT_OUT:"disableAutoIcon",GET_REMOTE_CONFIG:"getRemoteConfig",TOGGLE_POPUP_FROM_IFRAME:"togglePopupFromIframe",TRACK_EVENT:"trackEvent"},s={CATEGORIES:{MAIN_KPIS:"Main KPIs",API:"API",PANEL:"Panel",POPUP:"Popup",SW_HOST_CHOOSING:"SW Host Choosing",HEADER:"Header",SHARE_MODAL:"Share Modal",RATE_MODAL:"Rate Modal"},ACTIONS:{INSTALL:"Install",UPDATE:"Update",EXTENSION_ICON_CLICK:"Extension Icon Click",TIME_TO_FETCH:"Time To Fetch",REQUEST:"Request",RESPONSE:"Response",POPUP_SHOWN:"Popup Shown",POPUP_CLOSED:"Popup Closed",ERROR_VIEW_SHOWN:"Error View Shown",GLOBAL_RANK_BUCKET:"Global Rank Bucket",MONTHLY_VISITS_BUCKET:"Monthly Visits Bucket",SHOW_PANEL:"Show Panel",HIDE_PANEL:"Hide Panel",OVERLAY_SHOWN:"Overlay Shown",OVERLAY_CLOSED:"Overlay Closed",OPTION_SELECTED:"Option Selected",LEARN_MORE:"Learn More",MENU_CLICKED:"Menu Clicked",MENU_ITEM_CLICKED:"Menu Item Clicked",SHARE_BUTTON_CLICKED:"Share Button Clicked",RATE_BUTTON_CLICKED:"Rate Button Clicked",DATA_VIEW_SHOWN:"Data View Shown",CLICK_ON_CONTENT:"Click On Content",CLICK_GO_TO_TRAFFIC_AND_ENGAGEMENT:"Click Go To Traffic And Engagement",CLICK_SEE_MORE_COUNTRIES:"Click See More Countries",CLICK_GO_TO_SIMILARWEB:"Click Go To SimilarWeb",NO_DATA_VIEW_SHOWN:"No Data View Shown",MORE_INSIGHTS_CLICK:"More Insights Click",CLICK_ON_WORLDWIDE:"Click On Worldwide",CLICK_ON_COUNTRY:"Click On Country",CLICK_ON_CATEGORY:"Click On Category",TIME_TO_CLICK:"Time to click since page load",TIME_TO_LOAD_PANEL:"Time to load panel since click on browserAction",TIME_TO_SHOW_DATA_IN_PANEL:"Time to show data in panel since click on browserAction",CLICK_ON_ZOOM_BUTTON:"Click On Map Zoom Buttons"},LABELS:{MILLISECONDS:"Milliseconds",SUCCESS:"Success",FAIL:"Fail",DATA_VIEW:"Data",ERROR_VIEW:"Error",OPEN:"Open",CLOSE:"Close",FEEDBACK:"Feedback",RATE:"Rate",SHARE:"Share",EMAIL:"Email",FACEBOOK:"Facebook",TWITTER:"Twitter",COPY_LINK:"Copy Link",OVERVIEW:"overview",TRAFFIC_AND_ENGAGEMENT:"traffic_and_engagement",GEOGRAPHY:"geography",TRAFFIC_SOURCES:"traffic_sources"},CUSTOM_DIMENSIONS:{TRUE:"TRUE",FALSE:"FALSE"}},E={WELCOME_URL:"https://www.similarweb.com/extension-welcome/",UNINSTALL_URL:"https://www.similarweb.com/extension-uninstall"},m="popup/popup.html",_=["chrome://","chrome-extension://","https://chrome.google.com/webstore/","about:","https://addons.mozilla.org","moz-extension://"],l={GA:{OVERRIDE_SAMPLING:"overrideSampling",INSTALLED_AT:"installedAt",AGE:"age",LAST_AGE:"lastAge",D1:"D1",D7:"D7",D14:"D14",D28:"D28",D90:"D90",USER_TYPE:"userType"},IS_PRO:"isPro",SHOW_SW_PLATFORM_PICK_OVERLAY:"showSWPlatformPickOverlay",OPEN_IN_BG:"openInBg",IS_OPTED_IN:"autoIcon",DATA_VIEWS_COUNT:"dataViewsCount",IS_RATED:"isRated",RATE_AUTO_SHOWS_COUNT:"rateAutoShowsCount"},f=(n={},a()(n,l.SHOW_SW_PLATFORM_PICK_OVERLAY,"1"),a()(n,l.OPEN_IN_BG,"0"),n),d={LOADING:"LoadingView",DATA:"DataView",ERROR:"ErrorView",NO_DATA:"NoDataView",CAPTCHA:"Captcha"},O={FIREFOX:"https://addons.mozilla.org/firefox/addon/similarweb-sites-recommendatio",CHROME:"https://chrome.google.com/webstore/detail/similarweb-traffic-rank-w/hoklmmgfnpapgjgcpechhaamimifchmp",OPERA:"https://addons.opera.com/en/extensions/details/similarweb/"},h=["https://docs.google.com/forms/d/e/1FAIpQLSfNQzbQREyApqSfR4jH-2um5-J8___zyGr93C215j65w0JbWg/viewform","https://docs.google.com/forms/d/e/1FAIpQLSdZCc2csocWoFeDmdKOQao-VV5jVIyEvVXBzBXIgZkOzxiyxQ/viewform"],I={Referrals:"#fc9f52",Direct:"#375675","Paid Referrals":"#308d9d",Mail:"#58c3b9",Social:"#e95f5f",Search:"#3dc4dc"},p={THRESHOLDS:{IN_OR_OUT_LABEL:8,MINIMUM_VALUE_FOR_LABEL:2},STYLES:{INSIDE_LABEL_COLOR:"#ffffff",OUTSIDE_LABEL_COLOR:"rgba(42, 62, 82, 0.8)",DISTANCE_OUTSIDE:30,DISTANCE_INSIDE:-30}},A={GlobalRank:"globalrank",CountryRank:"countryrank",CategoryRank:"categoryrank"},T={isPro:l.IS_PRO,isBackgroundLinks:l.OPEN_IN_BG,autoIcon:l.IS_OPTED_IN,dataViewsCount:l.DATA_VIEWS_COUNT,isRated:l.IS_RATED,rateAutoShowsCount:l.RATE_AUTO_SHOWS_COUNT},w={TEST:"test",MORE_INSIGHTS:"more insights",TRAFFIC_AND_ENGAGEMENT:"traffic and engagement",SEE_MORE_COUNTRIES:"see more countries",GO_TO_SIMILARWEB:"go to similarweb",OVERVIEW_WORLDWIDE:"overview worldwide",OVERVIEW_COUNTRY:"overview country",OVERVIEW_CATEGORY:"overview category"},C=(o={},a()(o,w.TEST,{GA:{CATEGORY:s.CATEGORIES.PANEL,ACTION:"test"},LITE:"https://www.LITE.com",PRO:"https://www.PRO.com"}),a()(o,w.MORE_INSIGHTS,{GA:{CATEGORY:s.CATEGORIES.HEADER,ACTION:s.ACTIONS.MORE_INSIGHTS_CLICK},LITE:"https://www.similarweb.com/website/$DOMAIN$?utm_source=addon&utm_medium=$browser&utm_content=header&utm_campaign=cta-button&from_ext=1",PRO:"https://pro.similarweb.com/#/website/worldwide-overview/$DOMAIN$/*/999/3m?utm_source=addon&utm_medium=$browser&utm_content=header&utm_campaign=cta-button&from_ext=1"}),a()(o,w.TRAFFIC_AND_ENGAGEMENT,{GA:{CATEGORY:s.CATEGORIES.PANEL,ACTION:s.ACTIONS.CLICK_GO_TO_TRAFFIC_AND_ENGAGEMENT},LITE:"https://www.similarweb.com/website/$DOMAIN$?utm_source=addon&utm_medium=$browser&utm_content=header&utm_campaign=cta-button&from_ext=1",PRO:"https://pro.similarweb.com/#/website/audience-overview/$DOMAIN$/*/999/3m?utm_source=addon&utm_medium=$browser&utm_content=overview&utm_campaign=see-more-traffic-engagement&from_ext=1"}),a()(o,w.SEE_MORE_COUNTRIES,{GA:{CATEGORY:s.CATEGORIES.PANEL,ACTION:s.ACTIONS.CLICK_SEE_MORE_COUNTRIES},LITE:"https://www.similarweb.com/website/$DOMAIN$?utm_source=addon&utm_medium=$browser&utm_content=header&utm_campaign=cta-button&from_ext=1#geo",PRO:"https://pro.similarweb.com/#/website/audience-geography/$DOMAIN$/*/999/3m?utm_source=addon&utm_medium=$browser&utm_content=geography&utm_campaign=see-more-countries&from_ext=1"}),a()(o,w.GO_TO_SIMILARWEB,{GA:{CATEGORY:s.CATEGORIES.PANEL,ACTION:s.ACTIONS.CLICK_GO_TO_SIMILARWEB},LITE:"https://www.similarweb.com/website/$DOMAIN$?utm_source=addon&utm_medium=$browser&utm_content=footer&utm_campaign=cta-button",PRO:"https://pro.similarweb.com/#/website/worldwide-overview/$DOMAIN$/*/999/3m?utm_source=addon&utm_medium=$browser&utm_content=footer&utm_campaign=cta-button&from_ext=1"}),a()(o,w.OVERVIEW_WORLDWIDE,{GA:{CATEGORY:s.CATEGORIES.PANEL,ACTION:s.ACTIONS.CLICK_ON_WORLDWIDE},LITE:"https://www.similarweb.com/top-websites/?utm_source=addon&utm_medium=$browser&utm_content=overview&utm_campaign=global-rank",PRO:"https://pro.similarweb.com/#/industry/topsites/All/999/3m?utm_source=addon&utm_medium=$browser&utm_content=overview&utm_campaign=global-rank&from_ext=1"}),a()(o,w.OVERVIEW_COUNTRY,{GA:{CATEGORY:s.CATEGORIES.PANEL,ACTION:s.ACTIONS.CLICK_ON_COUNTRY},LITE:"https://www.similarweb.com/top-websites/$COUNTRY_NAME$?utm_source=addon&utm_medium=$browser&utm_content=overview&utm_campaign=country-rank",PRO:"https://pro.similarweb.com/#/industry/topsites/All/$COUNTRY_CODE$/3m?utm_source=addon&utm_medium=$browser&utm_content=overview&utm_campaign=country-rank&from_ext=1"}),a()(o,w.OVERVIEW_CATEGORY,{GA:{CATEGORY:s.CATEGORIES.PANEL,ACTION:s.ACTIONS.CLICK_ON_CATEGORY},LITE:"https://www.similarweb.com/top-websites/category/$CATEGORY_NAME$?utm_source=addon&utm_medium=$browser&utm_content=overview&utm_campaign=category-rank",PRO:"https://pro.similarweb.com/#/industry/overview/$CATEGORY_NAME$/999/3m?utm_source=addon&utm_medium=$browser&utm_content=overview&utm_campaign=category-rank&from_ext=1"}),o),S="https://www.similarweb.com/pro?utm_campaign=addon&utm_keyword=get-more&utm_matchtype=chrome",g={PRO:"PRO",LITE:"LITE"},N={NEW:"New",OLD:"Old"},R={FAVICON_DOMINANT:{MAX_COLOR_VALUE:220}},L="https://www.google.com/s2/favicons",y={VISITS:"visits",GEO:"geo",MMX:"mmx"},v={FIREFOX:"firefox",CHROME:"chrome",OPERA:"opera"},b={MAC:"mac",WINDOWS:"windows",LINUX:"linux"},P={SIMILARSITES:"necpbmbhhdiplmfhmjicabdeighkndkn"},D={FACEBOOK:"ExtFB",TWITTER:"ExtTwitter",MAIL:"ExtEmail",COPY:"ExtCopy"},M={FIRST:1,SECOND:2},G="https://b2c-extensions.s3.amazonaws.com/similarweb/config-5.5.13.json",k="api.similarweb.com",x={SANDBOX:"2a36d6f836516f4677bde7726425a84d",PRODUCTION:"7ccb86f5c2939026a4b5de83b5971ed9"},W="4",U="PX53QNTki3",F=11,V=3},10:function(t,e){function r(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}t.exports=function(t){return function(){var e=this,n=arguments;return new Promise(function(o,i){var a=t.apply(e,n);function c(t){r(a,o,i,c,u,"next",t)}function u(t){r(a,o,i,c,u,"throw",t)}c(void 0)})}}},20:function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof O?e:O,i=Object.create(o.prototype),a=new L(n||[]);return i._invoke=function(t,e,r){var n=m;return function(o,i){if(n===l)throw new Error("Generator is already running");if(n===f){if("throw"===o)throw i;return v()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=g(a,r);if(c){if(c===d)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===m)throw n=f,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=l;var u=E(t,e,r);if("normal"===u.type){if(n=r.done?f:_,u.arg===d)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=f,r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function E(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var m="suspendedStart",_="suspendedYield",l="executing",f="completed",d={};function O(){}function h(){}function I(){}var p={};p[i]=function(){return this};var A=Object.getPrototypeOf,T=A&&A(A(y([])));T&&T!==r&&n.call(T,i)&&(p=T);var w=I.prototype=O.prototype=Object.create(p);function C(t){["next","throw","return"].forEach(function(e){u(t,e,function(t){return this._invoke(e,t)})})}function S(t,e){var r;this._invoke=function(o,i){function a(){return new e(function(r,a){!function r(o,i,a,c){var u=E(t[o],t,i);if("throw"!==u.type){var s=u.arg,m=s.value;return m&&"object"==typeof m&&n.call(m,"__await")?e.resolve(m.__await).then(function(t){r("next",t,a,c)},function(t){r("throw",t,a,c)}):e.resolve(m).then(function(t){s.value=t,a(s)},function(t){return r("throw",t,a,c)})}c(u.arg)}(o,i,r,a)})}return r=r?r.then(a,a):a()}}function g(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,g(t,r),"throw"===r.method))return d;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=E(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,d;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,d):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function R(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function y(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:v}}function v(){return{value:e,done:!0}}return h.prototype=w.constructor=I,I.constructor=h,h.displayName=u(I,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,I):(t.__proto__=I,u(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},C(S.prototype),S.prototype[a]=function(){return this},t.AsyncIterator=S,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new S(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then(function(t){return t.done?t.value:a.next()})},C(w),u(w,c,"Generator"),w[i]=function(){return this},w.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=y,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(R),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),R(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;R(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:y(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=n}catch(t){Function("r","regeneratorRuntime = r")(n)}},4:function(t,e,r){t.exports=r(20)},5:function(t,e){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}},53:function(t,e,r){"use strict";r.r(e);var n=r(4),o=r.n(n),i=r(10),a=r.n(i),c=r(0),u=r(9);document.addEventListener("DOMContentLoaded",a()(o.a.mark(function t(){var e,r,n,i,a,s,E,m,_;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.get(c.B.IS_PRO);case 2:return e=t.sent,t.next=5,u.a.get(c.B.OPEN_IN_BG);case 5:r=t.sent,n=document.getElementById("notPro"),i=document.getElementById("pro"),a=document.getElementById("proLink"),s=document.getElementById("openInBg"),E=document.getElementById("autoIcon"),m=function(){var t=document.getElementById("info");t.textContent="Settings saved",t.classList.add("options__info--active"),setTimeout(function(){t.classList.remove("options__info--active")},2e3)},_=function(){chrome.runtime.sendMessage({action:c.p.UPDATE_KEY,isOptions:!0,key:c.B.IS_PRO,value:i.checked},function(){chrome.runtime.lastError||m()}),chrome.runtime.sendMessage({action:c.p.TRACK_EVENT,data:{category:"extension options - host",action:"click",name:i.checked?"SimilarWeb PRO":"SimilarWeb.com"}})},"0"===e?n.checked=!0:i.checked=!0,s.checked="1"===r,[n,i].forEach(function(t){t.addEventListener("change",_)}),s.addEventListener("change",function(){chrome.runtime.sendMessage({action:c.p.UPDATE_KEY,isOptions:!0,key:c.B.OPEN_IN_BG,value:s.checked},function(){chrome.runtime.lastError||m()}),chrome.runtime.sendMessage({action:c.p.TRACK_EVENT,data:{category:"extension options - links",action:s.checked?"on":"off",name:"open links in background"}})}),chrome.runtime.sendMessage({action:"getAutoIconStatus"},function(t){chrome.runtime.lastError,E.checked=!!t,E.addEventListener("change",function(){chrome.runtime.sendMessage({action:E.checked?"enableAutoIcon":"disableAutoIcon"},function(){chrome.runtime.lastError||m()}),chrome.runtime.sendMessage({action:c.p.TRACK_EVENT,data:{category:"extension options - opt in",action:E.checked?"on":"off",name:"display rank"}})})}),a.addEventListener("click",function(){chrome.runtime.sendMessage({action:c.p.TRACK_EVENT,data:{category:"extension options - host",action:"click",name:"Requires Account"}})});case 19:case"end":return t.stop()}},t)})))},7:function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},8:function(t,e){function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}},9:function(t,e,r){"use strict";r.d(e,"a",function(){return s});var n=r(5),o=r.n(n),i=r(7),a=r.n(i),c=r(8),u=r.n(c),s=new(function(){function t(){a()(this,t)}return u()(t,[{key:"get",value:function(t,e){return new Promise(function(r,n){try{chrome.storage.sync.get(t,function(o){return chrome.runtime.lastError?n(chrome.runtime.lastError):r(e?o:o[t])})}catch(t){return n(t)}})}},{key:"set",value:function(t,e){return new Promise(function(r,n){try{chrome.storage.sync.set(o()({},t,e),function(){return chrome.runtime.lastError?n(chrome.runtime.lastError):r()})}catch(t){return n(t)}})}},{key:"remove",value:function(t){return new Promise(function(e,r){try{chrome.storage.sync.remove(t,function(){return chrome.runtime.lastError?r(chrome.runtime.lastError):e()})}catch(t){return r(t)}})}},{key:"setObj",value:function(t){return new Promise(function(e,r){try{chrome.storage.sync.set(t,function(){return chrome.runtime.lastError?r(chrome.runtime.lastError):e()})}catch(t){return r(t)}})}},{key:"asyncTabsQuery",value:function(t){return new Promise(function(e,r){chrome.tabs.query(t,function(t){if(chrome.runtime.lastError)return r(chrome.runtime.lastError);e(t)})})}},{key:"asyncSendMessage",value:function(t,e){return new Promise(function(r,n){chrome.tabs.sendMessage(t,e,function(t){if(chrome.runtime.lastError)return n(chrome.runtime.lastError);r(t)})})}},{key:"insertCSS",value:function(t,e){return new Promise(function(r,n){try{chrome.tabs.insertCSS(t,e,function(){chrome.runtime.lastError&&n(chrome.runtime.lastError),r()})}catch(t){n(t)}})}},{key:"executeScript",value:function(t,e){return new Promise(function(r,n){try{chrome.tabs.executeScript(t,e,function(){chrome.runtime.lastError&&n(chrome.runtime.lastError),r()})}catch(t){n(t)}})}},{key:"getAllTabs",value:function(){return new Promise(function(t,e){var r=[];chrome.windows.getAll({populate:!0},function(n){chrome.runtime.lastError&&e(chrome.runtime.lastError),n.forEach(function(t){t.tabs.forEach(function(t){r.push(t)})}),t(r)})})}}]),t}())}});