$(function(){var a=decodeURIComponent(b("data").replace(/%/g,""));d(JSON.parse(a));$("#csv").bind("change",function(f){var g= new FileReader();g.onload= function(h){try{d(h.target.result);$("#csv").attr("title",f.target.files[0].name)}catch(e){return}};g.readAsText(f.target.files[0]);$("#csv").blur()});function c(j){$.getJSON(j,function(k){var l=$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers);$("#output").pivotUI(k,{renderers:l,unusedAttrsVertical:true},true)})}function d(m){var l=$.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers);if(m.trim().substring(0,1)== "["){$("#output").pivotUI(JSON.parse(m),{renderers:l,unusedAttrsVertical:true},true)}else {m= "[ "+ m+ " ]";try{$("#output").pivotUI(JSON.parse(m),{renderers:l,unusedAttrsVertical:true},true)}catch(e){m= m.replace(/}\s*{/g,"},{");$("#output").pivotUI(JSON.parse(m),{renderers:l,unusedAttrsVertical:true},true);return}}}function b(i){return decodeURIComponent(( new RegExp("[?|&]"+ i+ "="+ "([^&;]+?)(&|#|;|$)").exec(location.search)|| [,""])[1].replace(/\+/g,"%20"))|| null}})