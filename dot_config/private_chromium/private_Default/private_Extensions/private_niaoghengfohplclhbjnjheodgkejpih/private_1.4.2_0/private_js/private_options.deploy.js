$(document).ready(function(){ga("send","pageview",{page:"/options.html",title:"Options"}),$("#version").append(chrome.runtime.getManifest().version),$("#rateWASP").click(function(e){var t="https://chrome.google.com/webstore/detail/wasp-web-analytics-soluti/niaoghengfohplclhbjnjheodgkejpih/reviews";ga("send","social","chromeextension","rate",t),window.open(t,"_blank")}),$("[name=userType],[name=optOut]").change(function(e){$("#alertArea").html('<div class="alert-message alert-success fade in"><p><span class="ui-icon ui-icon-info"></span> Tweaks saved and ready for use.</p></div>');var t=("radio"==$(this).attr("type")?$(this).val():$(this).is(":checked"))+"";return ga("send","event",$(this).attr("name"),"click",t),localStorage[$(this).attr("name")]=t,$(".alert-message").delay(2e3).fadeOut("slow",function(){$("#alertArea").html(" ")}),!1});var e=localStorage.userType;e||(e="Implementer"),$('[name="userType"]').filter('[value="'+e+'"]').attr("checked",!0),$('[name="optOut"]').attr("checked",!1),(optOut=localStorage.optOut)&&$('[name="optOut"]').attr("checked","true"==optOut),$('label[for="userType"]').popover({trigger:"hover",placement:"right",title:"User Type",content:"Sets most appropriate parameters to cover typical user roles. This will impact visualization and detail levels."}),$('label[for="optOut"]').popover({trigger:"hover",placement:"left",title:"Tracking Opt Out",content:'Send anonymous information about how you use the extension so we can improve it in the future, as well as "which site is using which tool" so we can tailor advanced features. We are NOT tracking any actual browsing habits or personal information.'})});