(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['tag_row.tmpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += " ";
  buffer += "\n <tr class=\"revealed observepoint-analytics-tag\" id=\"";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.uniqueId;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "-tag-row\">\n  <td class=\"name-column\">\n    <div title=\"";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.url;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"tag-url\">\n      <div class=\"icon\">\n        <img class=\"sprite tag-";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.tag_id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" align=\"left\">\n      </div>\n      <span class=\"tag-name\">";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span>\n      <div class=\"network-cell-subtitle\">";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trimmedUrl;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " </div>\n    </div>\n  </td>\n  <td class=\"type-column\">\n    <div title=\"";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.account;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"tag-account\">";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.account;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</div>\n  </td>\n  <td class=\"method-column\">\n    <div title=\"";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.category;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"tag-category\">";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.category;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</div>\n  </td>\n  <td class=\"status-column\">\n    <div title=\"";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.statusCode;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.statusText;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"status-code\"><span>";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.statusCode;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span><div class=\"network-cell-subtitle status-text\">";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.statusText;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</div></div>\n  </td>\n  <td class=\"size-column\">\n    <div title=\"";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.requestSize;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"><span class=\"request-size\">";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.requestSize;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span><div class=\"network-cell-subtitle content-size\">";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.contentSize;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</div></div>\n  </td>\n  <td class=\"time-column\">\n    <div title=\"";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.time;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"time\"><span class=\"timevalue\">";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.time;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span><div class=\"latency network-cell-subtitle\">20";
  stack1 = depth0.tag;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.latency;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</div></div>\n  </td>\n</tr>\n";
  return buffer;});
})();