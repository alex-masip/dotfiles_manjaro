(function() {
	function parseMessage(req, src, cb) {
		switch(req.type) {
			case 'Hooks.enqueue': Hooks.enqueue(req.name, req.func, {req: req, src: src, cb: cb}); break;
			case 'Hooks.dequeue': Hooks.dequeue(req.name, {req: req, src: src, cb: cb}); break;
			default: {
				if ($.isFunction(Hooks.query[req.type])) {
					Hooks.query[req.type].call(this, req, src, cb);
				} else if ($.type(Hooks.query[req.type]) == 'string') {
					new Function('req, src, cb', Hooks.query[req.type]).apply(this, arguments);
				} else {
					function argsContext(args) {
						if(args) {
							return $.map(args, function(v, i) {
								var matches = typeof v === 'string' ? v.match(/{(.+)}/) : v;
								return matches[1] ? new Function('req, src', 'return '+matches[1]+';').call(this, req, src) : v;
							});
						} else return [];
					}

					var args = argsContext(req.args);
					if(req.callback === true) args.push(cb);
					chrome[req.action ? req.action : ''][req.func ? req.func : ''].apply(this, args);
				}
			}
		}

		return true;
	}

	chrome.extension.onMessage.addListener(function () {
		parseMessage.apply(this, arguments);
		return true;
	});
}());

var tabInterval, tabList = [], tabIndex = 0, tabStore = {}, Hooks = (function() {
	'use strict';

	var Hooks = {
		query: {},
		log: [],
		enqueue: function(name, func, msg) {
			function add(name, func) {
				if ($.type(name) == 'string' && $.type(func) !== 'undefined') {
					Hooks.query[name] = func;
					Hooks.log.push('`'+name+'` was added');
				} else {
					Hooks.log.push('`Wrong format for '+name+'` check name and func params');
				}
			}

			if (!Hooks.query[name]) {
				if ($.type(name) == 'string') add(name, func);
				else if ($.type(name) == 'object') $.each(name, add);
			}

			if (msg && msg.cb) msg.cb(Hooks.log);
		},
		dequeue: function(name, msg) {
			if (Hooks.query[name]) {
				delete Hooks.query[name];
				Hooks.log.push('`'+name+'` was removed');
			}

			if (msg && msg.cb) msg.cb(Hooks.log);
		}
	};

	return Hooks;
}());

Hooks.enqueue({
	script: function(req, src, cb) {
		if(src.tab && src.tab.title != 'Options') {
			if (req.file) chrome.tabs.executeScript(src.tab.id, {file: req.file}, cb);
			else if (req.code) chrome.tabs.executeScript(src.tab.id, {code: req.code}, cb);
		} else cb('failed');
	},
	readAllProps: function(req, src, cb) {
		var archive = {}, keys = Object.keys(localStorage), i = 0, key;
		for (; key = keys[i]; i++) archive[key] = localStorage.getItem(key);
		cb(archive);
	},
	readProperty: function(req, src, cb) {
		return cb(localStorage.getItem(req.property));
	},
	saveProperty: function(req, src, cb) {
		return cb(localStorage.setItem(req.property, req.value));
	},
	getActiveTabInfo: function(req, src, cb) {
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
			if(tabs[0]) cb(req.property ? tabs[0][!tabs[0].hasOwnProperty(req.property) ? 'url' : req.property] : tabs[0]);

			return true;
		});
	},
	sendTabMsg: function(req, src, cb) {
		req.type = req.action;
		delete req.action;

		chrome.tabs.query({}, function(tabs) {
			tabs.forEach(function(tab) {
				if(req.referrer && src.tab.id == tab.id || !req.referrer) {
					chrome.tabs.sendMessage(tab.id, $.extend({src: src}, req), function(response) {
						if(req.referrer && response || !req.referrer) cb(response);
					});
				}
			});

			return true;
		});
	},
	sendSelfMsg: function(req, src, cb) {
		req.type = req.action;
		delete req.action;

		chrome.tabs.sendMessage(src.tab.id, $.extend({src: src}, req), function(response) {
			if(src.tab && src.tab.url.indexOf('chrome://') < 0) cb(response);
		});
	},
	sendActiveTabMsg: function(req, src, cb) {
		req.type = req.action;
		delete req.action;

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, $.extend({src: $.extend({tab: tabs[0]}, src)}, req), cb);

			if(!tabs.length) {
				return parseMessage($.extend(req, {action: req.type, type: 'sendTabMsg'}), src, cb);
			}

			return true;
		});
	},
	getTabData: function(req, src, cb) {
		return cb(tabStore[src.tab.id]);
	},
	setTabData: function(req, src, cb) {
		var id = src.tab.id, data = tabStore[id];
			tabStore[id] = $.extend(true, {}, tabStore[id], req.data);

		return cb(tabStore[id]);
	},
	delTabData: function(req, src, cb) {
		delete tabStore[src.tab.id];
		cb(true);
	},
	setIcon: function(req, src, cb) {
		var action = (req && req.action ? req.action : 'pageAction');
			delete req.type;
			delete req.action;

		if(src.tab && src.tab.id && chrome[action]) {
			chrome[action].setIcon($.extend({tabId: src.tab.id}, req));
			chrome[action].show(src.tab.id);
		}
	},
	setTitle: function(req, src, cb) {
		var action = (req && req.action ? req.action : 'pageAction');
			delete req.type;
			delete req.action;

		if(src.tab && src.tab.id && chrome[action]) {
			chrome[action].setTitle($.extend({tabId: src.tab.id}, req));
		}
	},
	tabSwitch: function (req) {
		tabSwitch(req.data);
	}
});

function tabSwitch (data) {
	clearInterval(tabInterval);
	if (data && data['tabswitch-state'] > 0) {
		if (data.tabswitch > 0) {
			chrome.tabs.query({}, function(tabs) {
				tabs.forEach(function(tab) {
					if (tab.url.indexOf('datastudio.google.com') > -1) tabList.push(tab);
					chrome.tabs.update(tab.id, {active: false});
				});

				return true;
			});
			tabInterval = setInterval(function () {
				if (tabList.length && tabList[tabIndex]) {
					if (tabList[tabIndex].active) {
						chrome.tabs.update(tabList[tabIndex].id, {active: false});
						tabList[tabIndex].active = false;
						tabIndex++;
					}
					chrome.tabs.update(tabList[tabIndex].id, {active: true});
					tabList[tabIndex].active = true;
					if (tabIndex >= tabList.length-1) tabIndex = 0;
				}
			}, data.tabswitch * 1000);
		}
	}
}

chrome.runtime.onConnect.addListener(function (externalPort) {
		tabSwitch(); /*Stop tab switching*/
		externalPort.onDisconnect.addListener(function() {
			var ignoreError = chrome.runtime.lastError;
			Hooks.query.readProperty({property: 'appData'}, {}, function (s) {
				/*Continue tab switching*/
				tabSwitch(JSON.parse(s));
			});
		});
	}
);

/*Will trigger on Install or Update*/
chrome.runtime.onInstalled.addListener(function(details) {
	if(details.reason == 'install'){
		chrome.tabs.create({ url: "https://trafikant.pro/data-studio-auto-refresh-release-notes/?utm_source=DataStudioExt&utm_medium=install" });
	}
});

/*Will trigger on Uninstall*/
chrome.runtime.setUninstallURL('https://trafikant.pro/data-studio-auto-refresh-uninstall-survey/?utm_source=DataStudioExt&utm_medium=uninstall', function() {
	/*Hooks.query.sendTabMsg({action: 'setData', info: {'refresh-state': 0, 'paginate-state': 0}}, {}, function (s) {
		tabSwitch(); /!*Stop tab switching*!/
	});*/
});
