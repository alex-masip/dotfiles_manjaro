/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var m=this||self,n=function(){},aa=function(a){var b=typeof a;return"object"!=b?b:a?Array.isArray(a)?"array":b:"null"},p=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},q=function(a,b){function c(){}c.prototype=b.prototype;a.N=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.aa=function(d,e,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[e].apply(d,h)}},u=function(a){return a};var w={},x=(w.galaxy_s8={f:360,b:740,c:3,g:"Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36",j:"Mobile",i:"Galaxy S8",h:"opt_device_mobile_blk"},w.galaxy_note8={f:412,b:846,c:3.5,g:"Mozilla/5.0 (Linux; Android 7.1.1; SAMSUNG SM-N950U Build/NMF26X) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/6.2 Chrome/56.0.2924.87 Mobile Safari/537.36",j:"Mobile",i:"Galaxy Note 8",h:"opt_device_mobile_blk"},w.galaxy_tab=
{f:768,b:1024,c:2,g:"Mozilla/5.0 (Linux; Android 7.0; SM-T827V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.83 Safari/537.36",j:"Tablet",i:"Galaxy Tab",h:"opt_device_tablet_blk"},w.iphone_7={f:375,b:667,c:2,g:"Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/11.0 Mobile/14E304 Safari/604.1",j:"Mobile",i:"iPhone 7",h:"opt_device_mobile_blk"},w.iphone_7_plus={f:414,b:736,c:3,g:"Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_1 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 Mobile/15B150 Safari/604.1",
j:"Mobile",i:"iPhone 7 plus",h:"opt_device_mobile_blk"},w.iphone_x={f:375,b:812,c:3,g:"Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",j:"Mobile",i:"iPhone X",h:"opt_device_mobile_blk"},w.ipad={f:768,b:1024,c:2,g:"Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",j:"Tablet",i:"iPad",h:"opt_device_tablet_blk"},w.responsive={f:768,b:474,
c:1,g:"",j:"Responsive",i:"Responsive",h:"opt_device_web_blk"},w);x.mobile=x.iphone_7;x.tablet=x.ipad;var y={A:0,P:1,O:2,$:3,0:"ACTIVE",1:"NO_SNIPPET",2:"INACTIVE",3:"NO_PREVIEW"};var ba=function(a,b,c){if(a.runtime.lastError)alert(a.i18n.getMessage("emulation_failure",[a.runtime.lastError.message]));else{var d={tabId:b},e=x[c];a.l.attach(d,"1.1",function(){a.l.sendCommand(d,"Network.enable");a.l.sendCommand(d,"Page.enable");a.l.sendCommand(d,"Page.setTouchEmulationEnabled",{enabled:!0});a.l.sendCommand(d,"Page.setDeviceMetricsOverride",{width:e.f,height:e.b,deviceScaleFactor:e.c,mobile:!0,fitWindow:!0});a.l.sendCommand(d,"Network.setUserAgentOverride",{userAgent:e.g});a.l.sendCommand(d,
"Page.reload",{})})}};function z(a){if(Error.captureStackTrace)Error.captureStackTrace(this,z);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}q(z,Error);z.prototype.name="CustomError";var A=function(a,b){a=a.split("%s");for(var c="",d=a.length-1,e=0;e<d;e++)c+=a[e]+(e<b.length?b[e]:"%s");z.call(this,c+a[d])};q(A,z);A.prototype.name="AssertionError";
var ca=function(a,b,c,d){var e="Assertion failed";if(c){e+=": "+c;var f=d}else a&&(e+=": "+a,f=b);throw new A(""+e,f||[]);},B=function(a,b,c){a||ca("",null,b,Array.prototype.slice.call(arguments,2));return a},C=function(a,b){throw new A("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},da=function(a,b,c){"string"!==typeof a&&ca("Expected string but got %s: %s.",[aa(a),a],b,Array.prototype.slice.call(arguments,2))};var ea=Array.prototype.indexOf?function(a,b){B(null!=a.length);return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};var fa=function(a,b){for(var c in a)if(b.call(void 0,a[c],c,a))return!0;return!1};var ha;var D=function(a,b){this.J=a===ia&&b||"";this.R=ja};D.prototype.M=!0;D.prototype.L=function(){return this.J};D.prototype.toString=function(){return"Const{"+this.J+"}"};var ka=function(a){if(a instanceof D&&a.constructor===D&&a.R===ja)return a.J;C("expected object of type Const, got '"+a+"'");return"type_error:Const"},ja={},ia={};var la=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]},ta=function(a,b){if(b)a=a.replace(ma,"&amp;").replace(na,"&lt;").replace(oa,"&gt;").replace(pa,"&quot;").replace(qa,"&#39;").replace(ra,"&#0;");else{if(!sa.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(ma,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(na,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(oa,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(pa,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(qa,
"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(ra,"&#0;"))}return a},ma=/&/g,na=/</g,oa=/>/g,pa=/"/g,qa=/'/g,ra=/\x00/g,sa=/[\x00&<>"']/,ua=function(a,b){return a<b?-1:a>b?1:0};var E;a:{var va=m.navigator;if(va){var wa=va.userAgent;if(wa){E=wa;break a}}E=""};var F=function(a,b,c){this.G=c===xa?a:"";this.K=b};F.prototype.T=!0;F.prototype.M=!0;F.prototype.L=function(){return this.G.toString()};F.prototype.toString=function(){return"SafeHtml{"+this.G+"}"};
var ya=function(a){if(a instanceof F&&a.constructor===F)return a.G;C("expected object of type SafeHtml, got '"+a+"' of type "+aa(a));return"type_error:SafeHtml"},Aa=function(a){if(a instanceof F)return a;var b="object"==typeof a,c=null;b&&a.T&&(c=a.K);return za(ta(b&&a.M?a.L():String(a)),c)},xa={},za=function(a,b){if(void 0===ha){var c=null;var d=m.trustedTypes;if(d&&d.createPolicy)try{c=d.createPolicy("goog#html",{createHTML:u,createScript:u,createScriptURL:u})}catch(e){m.console&&m.console.error(e.message)}ha=
c}a=(c=ha)?c.createHTML(a):a;return new F(a,b,xa)},Ba=new F(m.trustedTypes&&m.trustedTypes.emptyHTML||"",0,xa);var Ca=function(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}(function(){if("undefined"===typeof document)return!1;var a=document.createElement("div"),b=document.createElement("div");b.appendChild(document.createElement("div"));a.appendChild(b);if(!a.firstChild)return!1;b=a.firstChild.firstChild;a.innerHTML=ya(Ba);return!b.parentElement});var Da={ca:!0},H=function(){throw Error("Do not instantiate directly");};H.prototype.C=null;H.prototype.getContent=function(){return this.content};H.prototype.toString=function(){return this.content};var I=function(){H.call(this)};q(I,H);I.prototype.o=Da;var Ea=function(a){Ea[" "](a);return a};Ea[" "]=n;var Fa=-1!=E.indexOf("Opera"),J=-1!=E.indexOf("Trident")||-1!=E.indexOf("MSIE"),Ga=-1!=E.indexOf("Edge"),Ha=-1!=E.indexOf("Gecko")&&!(-1!=E.toLowerCase().indexOf("webkit")&&-1==E.indexOf("Edge"))&&!(-1!=E.indexOf("Trident")||-1!=E.indexOf("MSIE"))&&-1==E.indexOf("Edge"),Ia=-1!=E.toLowerCase().indexOf("webkit")&&-1==E.indexOf("Edge"),Ja=function(){var a=m.document;return a?a.documentMode:void 0},Ka;
a:{var La="",Ma=function(){var a=E;if(Ha)return/rv:([^\);]+)(\)|;)/.exec(a);if(Ga)return/Edge\/([\d\.]+)/.exec(a);if(J)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Ia)return/WebKit\/(\S+)/.exec(a);if(Fa)return/(?:Version)[ \/]?(\S+)/.exec(a)}();Ma&&(La=Ma?Ma[1]:"");if(J){var Na=Ja();if(null!=Na&&Na>parseFloat(La)){Ka=String(Na);break a}}Ka=La}var Oa=Ka,Pa={},Qa;if(m.document&&J){var Ra=Ja();Qa=Ra?Ra:parseInt(Oa,10)||void 0}else Qa=void 0;var Sa=Qa;var Ta=Object.freeze||function(a){return a};var Ua=function(a){if(null!=a)switch(a.C){case 1:return 1;case -1:return-1;case 0:return 0}return null},L=function(a){var b=null!=a&&a.o===Da;b&&B(a.constructor===I);if(!b)if(a instanceof F)a=K(ya(a).toString(),a.K);else{b=K;var c=String(String(a));c=ta(c,void 0);a=b(c,Ua(a))}return a},K=function(a){function b(c){this.content=c}b.prototype=a.prototype;return function(c,d){c=new b(String(c));void 0!==d&&(c.C=d);return c}}(I),M=function(a,b,c,d){a||C("expected param "+b+" of type "+d+(", but got "+
(c instanceof Function?c.displayName||c.name||"unknown type name":c instanceof Object?c.constructor.displayName||c.constructor.name||Object.prototype.toString.call(c):null===c?"null":typeof c))+".");return c};var N=function(a,b,c){c=b(c||Va,void 0);if(p(c))if(c instanceof H){if(c.o!==Da)throw Error("Sanitized content was not of kind HTML.");b=c.toString();c=c.C;var d=new D(ia,"Soy SanitizedContent of kind HTML produces SafeHtml-contract-compliant value.");da(ka(d),"must provide justification");B(!/^[\s\xa0]*$/.test(ka(d)),"must provide non-empty justification");b=za(b,c||null)}else C("Soy template output is unsafe for use as HTML: "+c),b=Aa("zSoyz");else b=Aa(String(c));a=B(a);if(Ca())for(;a.lastChild;)a.removeChild(a.lastChild);
a.innerHTML=ya(b)},Va={};var Wa=function(a){var b=M("boolean"===typeof a.isInPreview,"isInPreview",a.isInPreview,"boolean"),c=M(null==a.previewStatus||"number"===typeof a.previewStatus,"previewStatus",a.previewStatus,"null|number|undefined"),d=M(null==a.containerName||"string"===typeof a.containerName,"containerName",a.containerName,"null|string|undefined"),e=M(null==a.experimentName||"string"===typeof a.experimentName,"experimentName",a.experimentName,"null|string|undefined"),f=M(null==a.variationName||"string"===typeof a.variationName,
"variationName",a.variationName,"null|string|undefined"),h=M(null==a.v||"string"===typeof a.v,"previewDisplay",a.v,"null|string|undefined"),k=M(p(a.m),"previewStatuses",a.m,"{ACTIVE: number,}"),l=M("string"===typeof a.H,"productName",a.H,"string");a=K;b?(b='<div id="container-name">'+L(d)+"</div>"+(e?'<div id="experiment-name">'+L(e)+"</div>":"")+'<div id="variation-preview">'+(f?'<div id="variation-name">'+L(f)+"</div>":""),k=k.A,c=b+((c&&k&&c.U&&k.U?c.o!==k.o?0:c.toString()===k.toString():c instanceof
H&&k instanceof H?c.o!=k.o?0:c.toString()==k.toString():c==k)?'<div id="preview-status" class="goog-primary">':'<div id="preview-status" class="goog-accent">')+L(h)+"</div></div>"):c='<h1 id="header-logo"><span class="lockup-logo"></span> '+L(l)+"</h1>";return a(c)},Xa=function(a){var b=M(Array.isArray(a.details),"details",a.details,"!Array<string>"),c=M("number"===typeof a.previewStatus,"previewStatus",a.previewStatus,"number"),d=M(p(a.m),"previewStatuses",a.m,"{ACTIVE: number, INACTIVE: number, NO_SNIPPET: number,}"),
e=M("boolean"===typeof a.debugMode,"debugMode",a.debugMode,"boolean"),f=M("boolean"===typeof a.livePreview,"livePreview",a.livePreview,"boolean");a=M(p(a.F),"i18nMessages",a.F,"{web: string, tablet: string, mobile: string, turnOff: string, turnOffDebug: string, turnOffLive: string, reload: string, help: string, open: string,}");for(var h="",k=b.length,l=0;l<k;l++)h+='<p class="detail">'+L(b[l])+"</p>";b=c==d.A?f?'<button class="button" id="turnOffPreview">'+L(a.Y)+"</button>":e?'<button class="button" id="turnOffPreview">'+
L(a.X)+"</button>":'<button class="button" id="turnOffPreview">'+L(a.W)+"</button>":c==d.O?'<button class="button" id="reload">'+L(a.reload)+"</button>":c==d.P?'<a href="#" class="link goog-blue" id="help">'+L(a.S)+"</a>":'<a href="#" class="link goog-blue" id="opt-home">'+L(a.open)+"</a>";h+=((d instanceof H?d.getContent():d)&&c==d.A&&!e?'<div id="device-list"><a class="device-row link" href="#" id="web"><div class="device-row-content"><div class="icon-container"><img class="device-icon" src="web.svg"></div><span class="icon-type">'+
L(a.Z)+'</span></div></a><a class="device-row link" href="#" id="tablet"><div class="device-row-content"><div class="icon-container"><img class="device-icon" src="tablet.svg"></div><span class="icon-type">'+L(a.V)+'</span></div></a><a class="device-row link" href="#" id="mobile"><div class="device-row-content"><div class="icon-container"><img class="device-icon" src="mobile.svg"></div><span class="icon-type">'+L(a.mobile)+"</span></div></a></div>":"")+b;return K(h)};var Ya;(Ya=!J)||(Ya=9<=Number(Sa));var Za=Ya,$a;
if($a=J){var ab;if(Object.prototype.hasOwnProperty.call(Pa,"9"))ab=Pa["9"];else{for(var O=0,bb=la(String(Oa)).split("."),cb=la("9").split("."),db=Math.max(bb.length,cb.length),P=0;0==O&&P<db;P++){var eb=bb[P]||"",fb=cb[P]||"";do{var Q=/(\d*)(\D*)(.*)/.exec(eb)||["","","",""],R=/(\d*)(\D*)(.*)/.exec(fb)||["","","",""];if(0==Q[0].length&&0==R[0].length)break;O=ua(0==Q[1].length?0:parseInt(Q[1],10),0==R[1].length?0:parseInt(R[1],10))||ua(0==Q[2].length,0==R[2].length)||ua(Q[2],R[2]);eb=Q[3];fb=R[3]}while(0==
O)}ab=Pa["9"]=0<=O}$a=!ab}var gb=$a,hb=function(){if(!m.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});try{m.addEventListener("test",n,b),m.removeEventListener("test",n,b)}catch(c){}return a}();var S=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.I=!1};S.prototype.stopPropagation=function(){this.I=!0};S.prototype.preventDefault=function(){this.defaultPrevented=!0};var T=function(a,b){S.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.s=null;if(a){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.currentTarget=
b;if(b=a.relatedTarget){if(Ha){a:{try{Ea(b.nodeName);var e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.offsetX=Ia||void 0!==a.offsetX?a.offsetX:a.layerX,this.offsetY=Ia||void 0!==a.offsetY?a.offsetY:a.layerY,this.clientX=void 0!==a.clientX?a.clientX:a.pageX,
this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType="string"===typeof a.pointerType?a.pointerType:ib[a.pointerType]||"";this.state=a.state;this.s=a;a.defaultPrevented&&this.preventDefault()}};
q(T,S);var ib=Ta({2:"touch",3:"pen",4:"mouse"});T.prototype.stopPropagation=function(){T.N.stopPropagation.call(this);this.s.stopPropagation?this.s.stopPropagation():this.s.cancelBubble=!0};T.prototype.preventDefault=function(){T.N.preventDefault.call(this);var a=this.s;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,gb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var jb="closure_listenable_"+(1E6*Math.random()|0),kb=0;var lb=function(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.D=e;this.key=++kb;this.removed=this.B=!1},U=function(a){a.removed=!0;a.listener=null;a.proxy=null;a.src=null;a.D=null};var Y=function(a){this.src=a;this.a={};this.u=0};Y.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.a[f];a||(a=this.a[f]=[],this.u++);var h=mb(a,b,d,e);-1<h?(b=a[h],c||(b.B=!1)):(b=new lb(b,this.src,f,!!d,e),b.B=c,a.push(b));return b};Y.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.a))return!1;var e=this.a[a];b=mb(e,b,c,d);return-1<b?(U(e[b]),B(null!=e.length),Array.prototype.splice.call(e,b,1),0==e.length&&(delete this.a[a],this.u--),!0):!1};
Y.prototype.removeAll=function(a){a=a&&a.toString();var b=0,c;for(c in this.a)if(!a||c==a){for(var d=this.a[c],e=0;e<d.length;e++)++b,U(d[e]);delete this.a[c];this.u--}return b};Y.prototype.hasListener=function(a,b){var c=void 0!==a,d=c?a.toString():"",e=void 0!==b;return fa(this.a,function(f){for(var h=0;h<f.length;++h)if(!(c&&f[h].type!=d||e&&f[h].capture!=b))return!0;return!1})};var mb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.removed&&f.listener==b&&f.capture==!!c&&f.D==d)return e}return-1};var nb="closure_lm_"+(1E6*Math.random()|0),ob={},pb=0,Z=function(a,b,c,d,e){if(d&&d.once)qb(a,b,c,d,e);else if(Array.isArray(b))for(var f=0;f<b.length;f++)Z(a,b[f],c,d,e);else c=rb(c),a&&a[jb]?a.listen(b,c,p(d)?!!d.capture:!!d,e):sb(a,b,c,!1,d,e)},sb=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var h=p(e)?!!e.capture:!!e,k=tb(a);k||(a[nb]=k=new Y(a));c=k.add(b,c,d,h,f);if(!c.proxy){d=ub();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)hb||(e=h),void 0===e&&(e=!1),a.addEventListener(b.toString(),
d,e);else if(a.attachEvent)a.attachEvent(vb(b.toString()),d);else if(a.addListener&&a.removeListener)B("change"===b,"MediaQueryList only has a change event"),a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");pb++}},ub=function(){var a=wb,b=Za?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},qb=function(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)qb(a,b[f],c,d,e);else c=rb(c),a&&a[jb]?
a.ba(b,c,p(d)?!!d.capture:!!d,e):sb(a,b,c,!0,d,e)},vb=function(a){return a in ob?ob[a]:ob[a]="on"+a},yb=function(a,b,c,d){var e=!0;if(a=tb(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.removed&&(f=xb(f,d),e=e&&!1!==f)}return e},xb=function(a,b){var c=a.listener,d=a.D||a.src;if(a.B&&"number"!==typeof a&&a&&!a.removed){var e=a.src;if(e&&e[jb])e.da(a);else{var f=a.type,h=a.proxy;e.removeEventListener?e.removeEventListener(f,h,a.capture):e.detachEvent?e.detachEvent(vb(f),
h):e.addListener&&e.removeListener&&e.removeListener(h);pb--;if(f=tb(e)){h=a.type;var k;if(k=h in f.a){k=f.a[h];var l=ea(k,a),g;if(g=0<=l)B(null!=k.length),Array.prototype.splice.call(k,l,1);k=g}k&&(U(a),0==f.a[h].length&&(delete f.a[h],f.u--));0==f.u&&(f.src=null,e[nb]=null)}else U(a)}}return c.call(d,b)},wb=function(a,b){if(a.removed)return!0;if(!Za){if(!b)a:{b=["window","event"];for(var c=m,d=0;d<b.length;d++)if(c=c[b[d]],null==c){b=null;break a}b=c}d=b;b=new T(d,this);c=!0;if(!(0>d.keyCode||void 0!=
d.returnValue)){a:{var e=!1;if(0==d.keyCode)try{d.keyCode=-1;break a}catch(h){e=!0}if(e||void 0==d.returnValue)d.returnValue=!0}d=[];for(e=b.currentTarget;e;e=e.parentNode)d.push(e);a=a.type;for(e=d.length-1;!b.I&&0<=e;e--){b.currentTarget=d[e];var f=yb(d[e],a,!0,b);c=c&&f}for(e=0;!b.I&&e<d.length;e++)b.currentTarget=d[e],f=yb(d[e],a,!1,b),c=c&&f}return c}return xb(a,new T(b,this))},tb=function(a){a=a[nb];return a instanceof Y?a:null},zb="__closure_events_fn_"+(1E9*Math.random()>>>0),rb=function(a){B(a,
"Listener can not be null.");if("function"===typeof a)return a;B(a.handleEvent,"An object listener must have handleEvent method.");a[zb]||(a[zb]=function(b){return a.handleEvent(b)});return a[zb]};(function(a,b,c,d){function e(g){window.setTimeout(function(){var r=g&&g.isInPreview,V=document.getElementById("header"),W=document.getElementById("content"),v=[],t=3,G={Z:c.getMessage("web"),V:c.getMessage("tablet"),mobile:c.getMessage("mobile"),W:c.getMessage("turn_off"),X:c.getMessage("turn_off_debug"),Y:c.getMessage("turn_off_live"),reload:c.getMessage("reload"),S:c.getMessage("help"),open:c.getMessage("open_optimize")};r?(t=g.previewStatus,r={isInPreview:r,previewStatus:t,containerName:g.containerName,
experimentName:g.experimentName,variationName:g.variationName,v:f(g),m:y,H:c.getMessage("product_name")},N(V,Wa,r),2===t?v.push(c.getMessage("not_active_review_page")):1===t&&v.push(c.getMessage("no_optimize_snippet")),N(W,Xa,{details:v,previewStatus:t,m:y,F:G,debugMode:g.debugMode,livePreview:g.livePreview}),0!==t&&2!==t||k()):(v={isInPreview:!1,v:c.getMessage("no_preview_status"),m:y,H:c.getMessage("product_name")},N(V,Wa,v),v=[c.getMessage("not_experiment_page_1"),c.getMessage("not_experiment_page_2")],
N(W,Xa,{details:v,previewStatus:t,m:y,F:G,debugMode:!1,livePreview:!1}));h(t)},150)}function f(g){switch(g.previewStatus){case 0:return g.livePreview?c.getMessage("active_live_debug_status"):g.debugMode?c.getMessage("active_debug_status"):c.getMessage("active_preview_status");case 1:return c.getMessage("no_snippet_status");case 2:return c.getMessage("inactive_preview_status");default:return""}}function h(g){0===g?(g=document.getElementById("turnOffPreview"))&&Z(g,"click",function(){b.sendMessage(l,
{command:"endPreview"},function(r){r&&r.endPreviewUrl?(d.detach({tabId:l}),b.update({url:r.endPreviewUrl}),window.close()):alert("Unable to end preview. Please try to reload the page.")})}):2===g?(g=document.getElementById("reload"))&&Z(g,"click",function(){b.reload();window.close()}):1===g?(g=document.getElementById("help"))&&Z(g,"click",function(){b.create({url:"https://support.google.com/360suite/optimize/answer/6262084?ref_topic=6197443"});window.close()}):3===g&&(g=document.getElementById("opt-home"))&&
Z(g,"click",function(){b.create({url:"https://optimize.google.com"});window.close()})}function k(){for(var g=document.getElementsByClassName("device-row"),r=0;r<g.length;r++)Z(g[r],"click",function(V){var W={tabId:l},v=V.currentTarget.id,t=!1;d.getTargets(function(G){for(var X=0;X<G.length;X++)if(G[X].tabId===l){t=G[X].attached;break}"web"===v?t&&(d.detach(W),b.reload()):ba(a,l,v)})})}var l;b.query({active:!0,currentWindow:!0},function(g){l=g[0].id;b.sendMessage(l,{command:"checkForPreview"},e)})})(new function(){var a=
chrome.i18n,b=chrome.webRequest,c=chrome.debugger;this.runtime=chrome.runtime;this.i18n=a;this.webRequest=b;this.l=c},chrome.tabs,chrome.i18n,chrome.debugger);