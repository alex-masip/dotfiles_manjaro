(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['blank_tag_row.tmpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += " ";
  buffer += "\n <tr class=\"revealed blank-tag-row\"  id=\"\">\n  <td class=\"name-column\" colspan=\"6\">\n    <div title=\"\" class=\"tag-url\">\n      <div class=\"icon\">\n        <img class=\"sprite\" align=\"left\">\n      </div>\n      <div class=\"network-cell-subtitle\" style=\"font-weight:bold;font-size:14px;\">&uarr; <span class=\"blank-row-url\">";
  foundHelper = helpers.url;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div>\n    </div>\n  </td>\n</tr>";
  return buffer;});
})();