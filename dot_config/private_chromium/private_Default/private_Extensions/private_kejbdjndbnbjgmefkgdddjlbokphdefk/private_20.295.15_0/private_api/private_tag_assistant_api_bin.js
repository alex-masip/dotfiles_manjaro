(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';const d=window;
d.__TAG_ASSISTANT_API=new class{constructor(c,e){this.a=c;this.c=e;this.b=[];this.a.document.addEventListener("__TAG_ASSISTANT_API_MESSAGE",a=>{a=a.detail;a:{var b=null===a||void 0===a?void 0:a.type;if("string"!==typeof b)b=!1;else switch(b){case "PIPE_MESSAGE":case "DISCONNECT":b=!0;break a;default:b=!1}}if(b)a:if(b=null===a||void 0===a?void 0:a.source,"string"!==typeof b)b=!1;else switch(b){case "PAGE":case "EXTENSION":b=!0;break a;default:b=!1}b&&"PIPE_MESSAGE"===a.type&&"EXTENSION"===a.source&&
(this.receiver?this.receiver(a.data,a.origin):this.b.push(a))})}setReceiver(c){for(this.receiver=c;0<this.b.length;)c=this.b.shift(),this.receiver(c.data,c.origin)}sendMessage(c){this.a.document.dispatchEvent(new CustomEvent("__TAG_ASSISTANT_API_MESSAGE",{detail:{type:"PIPE_MESSAGE",source:"PAGE",data:c,origin:this.a.origin}}))}disconnect(){this.a.document.dispatchEvent(new CustomEvent("__TAG_ASSISTANT_API_MESSAGE",{detail:{type:"DISCONNECT",source:"PAGE"}}));this.c()}}(d,()=>{d.__TAG_ASSISTANT_API=
void 0});}).call(this);
