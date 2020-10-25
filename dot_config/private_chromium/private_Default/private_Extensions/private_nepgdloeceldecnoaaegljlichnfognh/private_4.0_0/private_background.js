chrome.tabs.onUpdated.addListener(checkForValidUrl);

var showKeywords = true;
var showFunctions = true;
var showComments = true;

//bigquery.cloud.google.com
//console.cloud.google.com

function checkForValidUrl(tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {    
        if (tab.url.indexOf('bigquery.cloud.google.com') > -1) {
            //chrome.pageAction.show(tabId);

            chrome.tabs.executeScript(
                tabId, 
                {
                    file: "myscript.js",
                    runAt: "document_end"
                }
            );
        };
        if (tab.url.indexOf('console.cloud.google.com/bigquery') > -1) {
            //chrome.pageAction.show(tabId);

            chrome.tabs.executeScript(
                tabId, 
                {
                    file: "myscript2.js",
                    runAt: "document_end"
                }
            );
        };
    };
};
var menuid = chrome.contextMenus.create({
    "title": "BQ Mate",
    "contexts": ["all"],
    "documentUrlPatterns": ["*://bigquery.cloud.google.com/*", "*://console.cloud.google.com/bigquery*"]
});
chrome.contextMenus.create({
    "parentId": menuid,
    "title": "Help for \"%s\"",
    "contexts": ["selection"],
    "onclick": onClickHandler,
    "documentUrlPatterns": ["*://bigquery.cloud.google.com/*", "*://console.cloud.google.com/bigquery*"]
});
chrome.contextMenus.create({
    "parentId": menuid,
    "title": "Preserve Format",
    "contexts": ["all"],
    "onclick": PreserveFormatHandler,
    "documentUrlPatterns": ["*://bigquery.cloud.google.com/*"]
});
chrome.contextMenus.create({
    "parentId": menuid,
    "title": "SubMenu2",
    "contexts": ["all"],
    "enabled": true,
    "type": "separator",
    "documentUrlPatterns": ["*://bigquery.cloud.google.com/*"]
});
chrome.contextMenus.create({
    "parentId": menuid,
    "title": "Show Query Outline",
    "contexts": ["all"],
    "onclick": ShowOutlineHandler,
    "documentUrlPatterns": ["*://bigquery.cloud.google.com/*"]
});

var menuid_keywords = chrome.contextMenus.create({
    "parentId": menuid,
    "title": "Keywords",
    "contexts": ["all"],
    "type": "checkbox",
    "checked": true,
    "enabled": false,
    "documentUrlPatterns": ["*://bigquery.cloud.google.com/*"]
});
var menuid_functions = chrome.contextMenus.create({
    "parentId": menuid,
    "title": "Functions",
    "contexts": ["all"],
    "type": "checkbox",
    "checked": true,
    "enabled": false,
    "documentUrlPatterns": ["*://bigquery.cloud.google.com/*"]
});
var menuid_Comments = chrome.contextMenus.create({
    "parentId": menuid,
    "title": "Comments",
    "contexts": ["all"],
    "type": "checkbox",
    "checked": true,
    "enabled": false,
    "documentUrlPatterns": ["*://bigquery.cloud.google.com/*"]
});

function PreserveFormatHandler(info) {
    if ( info.pageUrl.indexOf("bigquery.cloud.google.com/") > -1 ) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
            tabs.forEach(function(tab){
                var tabId = tab.id;
                chrome.tabs.sendMessage(tabId, {action: "preserve-format"}, function(result) {});           
            })
        });     
    };
};

function ShowOutlineHandler(info) {
    if ( info.pageUrl.indexOf("bigquery.cloud.google.com/") > -1 ) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
            tabs.forEach(function(tab){
                var tabId = tab.id;
                chrome.tabs.sendMessage(tabId, {action: "show-outline"}, function(result) {});           
            })
        });     
    };
};

function onClickHandler(info) {
    if ( info.pageUrl.indexOf("bigquery.cloud.google.com/") > -1 || info.pageUrl.indexOf("console.cloud.google.com/bigquery") > -1 ) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
            tabs.forEach(function(tab){
                var tabId = tab.id;
                chrome.tabs.sendMessage(tabId, {action: "show-help", item: info.selectionText}, function(result) {
                    if (result && result != '') {
                        chrome.windows.create({ url: result.toLowerCase(), type: "detached_panel", width: 560, height: 600 }, function(win) {
                        });  
                    }                  
                });                           
            })
        });     
    };        
}