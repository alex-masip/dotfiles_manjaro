// Generated by CoffeeScript 1.12.7

/**
@license Copyright (C) 2012 Observepoint LLC. All rights reserved.
 */
var connMap, connections, getWindow, handleAnalytics, handleDataLayer, http, netListener, numConnections, sendAnalyticsRequest, tabMap, tabUpdateListener;

http = new HttpClient;


/**
 * Handle the dataLayer message from `js/inject.s`
 * Check connection and send addTag or updateTag message to the UI
 *
 * @param  {type} message The message from `js/inject.s`
 * @param  {type} sender The message source: Tab
 */

handleDataLayer = function(message, sender) {
  var connection, data, request;
  if (message.type && message.type === 'dataLayer') {
    connection = connMap[sender.tab.id];
    if (connection) {
      data = JSON.parse(message.data);
      data.tabId = sender.tab.id;
      data.id = data.tag;
      request = new NetRequest(data);
      request.setTagData(data);
      netListener.addRequest(request);
      request.onCompleted(data);
      request.requestSize = data.requestSize;
      connection.postMessage({
        action: message.action.concat('Tag'),
        data: request
      });
    }
  }
};

chrome.extension.onConnect.addListener(function(connection) {
  var conn_id, conn_parts, conn_source;
  conn_parts = connection.name.split('-');
  conn_source = conn_parts[0];
  if (conn_parts.length < 2 || conn_source !== 'observepoint') {
    return;
  }
  conn_id = conn_parts[1];
  console.log('connection established', conn_source, conn_id);
  numConnections++;
  connections[conn_id] = connection;
  netListener.start();
  connection.onDisconnect.addListener(function(conn) {
    console.log('disconnect detected');
    netListener.unwatchTab(tabMap[conn_id]);
    delete connections[conn_id];
    delete connMap[tabMap[conn_id]];
    delete tabMap[conn_id];
    numConnections--;
    if (numConnections <= 0) {
      return netListener.stop();
    }
  });
  return connection.onMessage.addListener(function(msg) {
    var error, i, len, ref, request, tabId, tag, tagData;
    if (msg.action === 'setTabMap') {
      console.log('setTabMap: TabId=' + msg.tabId + ', connection port=' + conn_id);
      tabMap[conn_id] = msg.tabId;
      connMap[msg.tabId] = connection;
      netListener.watchTab(msg.tabId);
    }
    if (msg.action === 'getTagVariables') {
      try {
        tabId = tabMap[conn_id];
        request = netListener.getRequest(tabId, msg.id);
        connection.postMessage({
          action: 'addVariables',
          data: request.variables
        });
      } catch (error1) {
        error = error1;
        connection.postMessage({
          action: 'addVariables',
          data: null
        });
      }
    }
    if (msg.action === 'download') {
      tagData = [];
      try {
        tabId = tabMap[conn_id];
        console.log('download: tabId=' + tabId + ', connection port=' + conn_id);
        ref = msg.tagData;
        for (i = 0, len = ref.length; i < len; i++) {
          tag = ref[i];
          request = netListener.getRequest(tabId, tag.uniqueId);
          tagData.push({
            variableData: request.variables,
            tagData: tag
          });
        }
        connection.postMessage({
          action: 'downloadFile',
          data: tagData
        });
      } catch (error1) {
        error = error1;
        connection.postMessage({
          action: 'downloadFile',
          data: ["the error is " + error]
        });
      }
    }
    if (msg.action === 'realDownload') {
      handleAnalytics(msg.tabId, null, 'export');
      chrome.downloads.download({
        url: msg.url,
        saveAs: true,
        filename: "observepoint-filename"
      }, downloadCallback);
    }
    if (msg.action === 'clearRequests') {
      tabId = tabMap[conn_id];
      netListener.clearRequests(tabId, msg.tags);
    }
    if (msg.action === 'analytics') {
      handleAnalytics(msg.tabId, msg.url, msg.actionName);
    }
    if (msg.action === 'startDataLayerHandler') {
      chrome.tabs.onUpdated.addListener(tabUpdateListener);
      chrome.runtime.onMessage.addListener(handleDataLayer);
    }
    if (msg.action === 'stopDataLayerHandler') {
      chrome.tabs.onUpdated.removeListener(tabUpdateListener);
      chrome.runtime.onMessage.removeListener(handleDataLayer);
    }
    return false;
  });
});

chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
  if (item.byExtensionName === "ObservePoint Tag Debugger") {
    return suggest({
      filename: "observepoint-tag-data.tab"
    });
  }
});

numConnections = 0;

connections = {};

tabMap = {};

connMap = {};

netListener = new NetListener;

this.downloadCallback = function(id) {
  console.log("downloaded");
  return false;
};

handleAnalytics = function(tabId, url, action) {
  return chrome.tabs.query({}, function(tabs) {
    var currentTab, filteredTabs, windowId;
    filteredTabs = tabs.filter(function(tab) {
      return tab.id === tabId;
    });
    currentTab = filteredTabs[0];
    windowId = currentTab ? currentTab.windowId : null;
    return getWindow(windowId, function(currentWindow) {
      var actionText, obj;
      actionText = action != null ? action : (
        obj = {},
        obj["ce:" + action] = null,
        obj
      );
      if (!url) {
        url = currentTab.url;
      }
      return sendAnalyticsRequest(new OPAnalyticsData(url, currentWindow.width, currentWindow.height, actionText));
    });
  });
};

getWindow = function(windowId, callback) {
  if (!windowId) {
    return chrome.windows.getCurrent({}, callback);
  } else {
    return chrome.windows.get(windowId, {}, callback);
  }
};

sendAnalyticsRequest = function(data) {
  var analyticsUrl, queryParams;
  if (!navigator.onLine) {
    return;
  }
  analyticsUrl = "https://ssuperstats.observepoint.com/b/ss/op-chrome-extension/0?";
  queryParams = "D=D=&gn=ce:" + data.domain + "&g=chromeextension://&c14=D=v14&v14=" + data.url + "&c20=D=v20&v20=Hard Coded&c21=D=v21&v21=" + data.userAgent + "&s=" + data.screenSize + "&bw=" + data.browserWidth + "&bh=" + data.browserHeight + "&AQE=1&c10=D=v10&c12=D=v12";
  if (data.action) {
    queryParams = queryParams + ("&pe=lnk_o&pev2=" + data.action + "&c5=D=v5&v5=D=pev2");
  }
  return http.get(analyticsUrl + encodeURI(queryParams));
};


/**
 * Inject `js/inject.js` script every time the tab is reloaded
 * And the extension is connected to that tab
 */

tabUpdateListener = function(tabId, changeInfo, tab) {
  var connection;
  if (changeInfo.status === 'complete' && tab.status === 'complete' && tab.url !== void 0) {
    connection = connMap[tabId];
    if (connection) {
      chrome.tabs.executeScript(tabId, {
        file: 'js/inject.js',
        runAt: 'document_idle'
      });
    }
  }
};
