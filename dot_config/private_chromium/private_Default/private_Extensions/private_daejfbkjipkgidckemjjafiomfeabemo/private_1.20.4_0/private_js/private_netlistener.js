// Generated by CoffeeScript 1.12.7

/**
@license Copyright (C) 2012 Observepoint LLC. All rights reserved.
 */
var NetListener;

String.prototype.hashCode = function() {
  var char_, hash, i, index, len, ref;
  hash = 0;
  if (this.length === 0) {
    return hash;
  }
  ref = this.split('');
  for (index = i = 0, len = ref.length; i < len; index = ++i) {
    char_ = ref[index];
    char_ = this.charCodeAt(index);
    hash = ((hash << 5) - hash) + char_;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

NetListener = (function() {
  var onAuthRequired, onBeforeRedirect, onBeforeRequest, onCompleted, onHeadersReceived, onResponseStarted, onSendHeaders;

  function NetListener() {
    this.requests = {};
    this.tabs = [];
    this.active = false;
    this.tag_matcher = null;
    this.bound_onBeforeRequest = onBeforeRequest.bind(this);
  }

  NetListener.prototype.start = function() {
    var error;
    if (!this.active && Module) {
      this.active = true;
      this.tag_matcher = new Module.TagMatcher();
      try {
        chrome.webRequest.onBeforeRequest.addListener(this.bound_onBeforeRequest, {
          urls: ["*://*/*"]
        }, ['requestBody']);
      } catch (error1) {
        error = error1;
        chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, {
          urls: ["*://*/*"]
        }, []);
      }
      chrome.webRequest.onSendHeaders.addListener(onSendHeaders, {
        urls: ["*://*/*"]
      }, ['requestHeaders']);
      chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, {
        urls: ["*://*/*"]
      }, []);
      chrome.webRequest.onAuthRequired.addListener(onAuthRequired, {
        urls: ["*://*/*"]
      }, []);
      chrome.webRequest.onBeforeRedirect.addListener(onBeforeRedirect, {
        urls: ["*://*/*"]
      }, ['responseHeaders']);
      chrome.webRequest.onResponseStarted.addListener(onResponseStarted, {
        urls: ["*://*/*"]
      }, ['responseHeaders']);
      return chrome.webRequest.onCompleted.addListener(onCompleted, {
        urls: ["*://*/*"]
      }, ['responseHeaders']);
    } else if (!Module) {
      return console.error('Tag Matcher Module was not loaded');
    }
  };

  NetListener.prototype.stop = function() {
    if (this.active) {
      this.active = false;
      this.requests = {};
      this.tag_matcher = null;
      chrome.webRequest.onBeforeRequest.removeListener(this.bound_onBeforeRequest);
      chrome.webRequest.onSendHeaders.removeListener(onSendHeaders);
      chrome.webRequest.onHeadersReceived.removeListener(onHeadersReceived);
      chrome.webRequest.onAuthRequired.removeListener(onAuthRequired);
      chrome.webRequest.onBeforeRedirect.removeListener(onBeforeRedirect);
      chrome.webRequest.onResponseStarted.removeListener(onResponseStarted);
      chrome.webRequest.onCompleted.removeListener(onCompleted);
      return true;
    }
  };

  NetListener.prototype.watchTab = function(tabId) {
    var base;
    this.tabs.push(tabId);
    return (base = this.requests)[tabId] || (base[tabId] = {});
  };

  NetListener.prototype.unwatchTab = function(tabId) {
    while (this.tabs.indexOf(tabId) !== -1) {
      this.tabs.splice(this.tabs.indexOf(tabId), 1);
    }
    return delete this.requests[tabId];
  };

  NetListener.prototype.watchingTab = function(tabId) {
    return this.tabs.indexOf(tabId) !== -1;
  };

  onBeforeRequest = function(details) {
    var connection, request, requestMatchableDetails, tagData;
    if (!netListener.watchingTab(details.tabId)) {
      return;
    }
    request = new NetRequest(details);
    requestMatchableDetails = JSON.stringify({
      url: request.url,
      requestBody: request.requestBody
    });
    tagData = JSON.parse(this.tag_matcher.parseTag(requestMatchableDetails));
    if (!tagData.isTag) {
      return;
    }
    netListener.addRequest(request);
    request.setTagData(tagData);
    connection = connMap[request.tabId];
    if (connection) {
      return connection.postMessage({
        action: 'addTag',
        data: request
      });
    }
  };

  onSendHeaders = function(details) {
    var id, request;
    if (netListener.watchingTab(details.tabId)) {
      id = NetRequest.getId(details.requestId, details.url);
      request = netListener.getRequest(details.tabId, id);
      if (request) {
        return request.onSendHeaders(details);
      }
    }
  };

  onHeadersReceived = function(details) {
    var connection, id, request;
    if (netListener.watchingTab(details.tabId)) {
      id = NetRequest.getId(details.requestId, details.url);
      request = netListener.getRequest(details.tabId, id);
      if (request) {
        request.onHeadersReceived(details);
        if (request.tag_id !== 0) {
          connection = connMap[request.tabId];
          if (connection) {
            return connMap[request.tabId].postMessage({
              action: 'updateTag',
              data: request
            });
          }
        }
      }
    }
  };

  onAuthRequired = function(details) {
    var connection, id, request;
    if (netListener.watchingTab(details.tabId)) {
      id = NetRequest.getId(details.requestId, details.url);
      request = netListener.getRequest(details.tabId, id);
      if (request) {
        request.onAuthRequired(details);
        if (request.tag_id !== 0) {
          connection = connMap[request.tabId];
          if (connection) {
            connection.postMessage({
              action: 'updateTag',
              data: request
            });
            return connection.postMessage({
              action: 'updateAverageLoadTime'
            });
          }
        }
      }
    }
  };

  onBeforeRedirect = function(details) {
    var connection, id, request;
    if (netListener.watchingTab(details.tabId)) {
      id = NetRequest.getId(details.requestId, details.url);
      request = netListener.getRequest(details.tabId, id);
      if (request) {
        request.onBeforeRedirect(details);
        if (request.tag_id !== 0) {
          connection = connMap[request.tabId];
          if (connection) {
            connection.postMessage({
              action: 'updateTag',
              data: request
            });
            return connection.postMessage({
              action: 'updateAverageLoadTime'
            });
          }
        }
      }
    }
  };

  onResponseStarted = function(details) {
    var id, request;
    if (netListener.watchingTab(details.tabId)) {
      id = NetRequest.getId(details.requestId, details.url);
      request = netListener.getRequest(details.tabId, id);
      if (request) {
        return request.onResponseStarted(details);
      }
    }
  };

  onCompleted = function(details) {
    var connection, id, request;
    if (netListener.watchingTab(details.tabId)) {
      id = NetRequest.getId(details.requestId, details.url);
      request = netListener.getRequest(details.tabId, id);
      if (request) {
        request.onCompleted(details);
        if (request.tag_id !== 0) {
          connection = connMap[request.tabId];
          if (connection) {
            connection.postMessage({
              action: 'updateTag',
              data: request
            });
            return connection.postMessage({
              action: 'updateAverageLoadTime'
            });
          }
        }
      }
    }
  };

  NetListener.prototype.getRequest = function(tabId, id) {
    var base, name;
    (base = this.requests)[name = parseInt(tabId)] || (base[name] = {});
    return this.requests[parseInt(tabId)][id];
  };

  NetListener.prototype.addRequest = function(request) {
    var base, name;
    (base = this.requests)[name = parseInt(request.tabId)] || (base[name] = {});
    return this.requests[parseInt(request.tabId)][request.uniqueId] = request;
  };

  NetListener.prototype.clearRequests = function(tabId, tags) {
    var id, ref, request, results;
    if (tags === true) {
      return this.requests[parseInt(tabId)] = {};
    } else {
      ref = this.requests[parseInt(tabId)];
      results = [];
      for (id in ref) {
        request = ref[id];
        if (request.tag_id === 0) {
          results.push(delete this.requests[parseInt(tabId)][id]);
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  };

  return NetListener;

})();