var GADebugger = (function() {

    var UI = {};

    var GACore = (function() {


        /* global Utils, UaBeacon, UtmBeacon */
        /* exported GACoreAPI */
        var GACoreAPI = (function() {
        
            'use strict';
        
            var HOSTS = [
                'www.google-analytics.com',
                'ssl.google-analytics.com',
                'stats.g.doubleclick.net'
            ];
        
            function isBeaconUrl(url) {
                var uri = Utils.parseUri(url);
                return uri && HOSTS.indexOf(uri.hostname) > -1 &&
                    (uri.path === '/collect' || uri.path === '/__utm.gif');
            }
        
            function parseBeacon(url) {
                var uri = Utils.parseUri(url),
                    beacon;
        
                if (uri && HOSTS.indexOf(uri.hostname) > -1) {
                    if (uri.path === '/collect') {
                        beacon = new UaBeacon(url);
                    } else if (uri.path === '/__utm.gif') {
                        beacon = new UtmBeacon(url);
                    }
                }
        
                return beacon;
            }
        
            function createBeaconHint(beacon) {
                var hint;
        
                if (beacon.type === 'transaction') {
                    hint = beacon.transaction.revenue.toString();
                    if (beacon.transaction.currency) {
                        hint += ' ' + beacon.transaction.currency;
                    }
                } else if (beacon.type === 'item') {
                    hint = beacon.transactionItem.name + ' (x' + beacon.transactionItem.quantity + ')';
                } else if (beacon.type === 'social') {
                    hint = beacon.social.network + ' / ' + beacon.social.action;
                } else if (beacon.type === 'event') {
                    hint = beacon.event.category;
                    if (beacon.event.action) {
                        hint += ' / ' + beacon.event.action;
                    }
                    if (beacon.event.label) {
                        hint += ' / ' + beacon.event.label;
                    }
                    if (beacon.event.value) {
                        hint += ' / ' + beacon.event.value;
                    }
                } else if (beacon.type === 'pageview') {
                    hint = beacon.documentPath;
                } else if (beacon.type === 'timing') {
                    hint = beacon.userTimings.category + ' / ' + beacon.userTimings.variable + ' / ' + beacon.userTimings.value + 'ms';
                    if (beacon.userTimings.label) {
                        hint += ' / ' + beacon.userTimings.label;
                    }
                }
                return hint;
            }
        
            return {
                isBeaconUrl: function(url) {
                    return isBeaconUrl(url);
                },
                parseBeacon: function(url) {
                    return parseBeacon(url);
                },
                createBeaconHint: createBeaconHint
            };
        }());
        

        /* exported Utils */
        
        var Utils = (function() {
        
            'use strict';
        
            var RE_URI = /^(?:(https?):)?(?:\/\/([^\/?#]+))?(\/[^?#]*)?(\?[^#]*)?(#.*)?$/;
        
            function parseUri(uri) {
                var fragments = RE_URI.exec(uri);
                if (fragments) {
                    return {
                        protocol: fragments[1],
                        hostname: fragments[2],
                        path: fragments[3],
                        query: fragments[4],
                        hash: fragments[5]
                    };
                }
            }
        
            function parseDataToObject(re, data) {
                var keyValue, obj = {};
                while ((keyValue = re.exec(data))) {
                    obj[keyValue[1]] = decodeURIComponent(keyValue[2]);
                }
                return obj;
            }
        
            function parseDimensions(data) {
                var dimensions = data.split('x');
                return new Dimension(dimensions[0], dimensions[1]);
                /*return {
                    width: dimensions[0] | 0,
                    height: dimensions[1] | 0
                };*/
            }
        
            function Dimension(width, height) {
                this.width = width | 0;
                this.height = height | 0;
            }
        
            Dimension.prototype.toString = function() {
                return this.width + 'x' + this.height;
            };
        
            return {
                parseUri: parseUri,
                parseDataToObject: parseDataToObject,
                parseDimensions: parseDimensions
            };
        
        }());

        /* global Utils */
        /* exported UaBeacon */
        
        var UaBeacon = (function() {
        
            'use strict';
        
            var RE_PIXEL_PARAMS = /[?&]([a-z][a-z0-9]*)=([^&]*)/g;                  // __utm.gif?utmXXX=YYY...
        
            function UaBeacon (url) {
                this.params = Utils.parseDataToObject(RE_PIXEL_PARAMS, url);
            }
        
            Object.defineProperties(UaBeacon.prototype, {
                trackingMethod: {
                    get: function() {
                        return 'Universal Analytics';
                    }
                },
                version: {
                    get: function() {
                        return this.params.v;
                    }
                },
                clientId: {
                    get: function() {
                        return this.params.cid;
                    }
                },
                type: {
                    get: function() {
                        return this.params.t;
                    }
                },
                documentUrl: {
                    get: function() {
                        return this.params.dl;
                    }
                },
                documentTitle: {
                    get: function() {
                        return this.params.dt;
                    }
                },
                documentHostname: {
                    get: function() {
                        return this.params.dh || Utils.parseUri(this.params.dl).hostname;
                    }
                },
                documentPath: {
                    get: function() {
                        var url;
                        if (this.params.dp) {
                            return this.params.dp;
                        }
                        url = Utils.parseUri(this.params.dl);
                        return url.path + (url.query || '') + (url.hash || '');
                    }
                },
                screenName: {
                    get: function() {
                        return this.params.cd;
                    }
                },
                path: {
                    get: function() {
                        return Utils.parseUri(this.params.dp || this.params.dl).path;
                    }
                },
                customPath: {
                    get: function() {
                        return this.params.dp;
                    }
                },
                referrer: {
                    get: function() {
                        return this.params.dr;
                    }
                },
                charset: {
                    get: function() {
                        return this.params.de;
                    }
                },
                flashVersion: {
                    get: function() {
                        return this.params.fl;
                    }
                },
                javaEnabled: {
                    get: function() {
                        return this.params.je === '1';
                    }
                },
                language: {
                    get: function() {
                        return this.params.ul;
                    }
                },
                account: {
                    get: function() {
                        return this.params.tid;
                    }
                },
                viewport: {
                    get: function() {
                        if (this.params.vp) {
                            return Utils.parseDimensions(this.params.vp);
                        }
                    }
                },
                screen: {
                    get: function() {
                        if (this.params.sr) {
                            return Utils.parseDimensions(this.params.sr);
                        }
                    }
                },
                colorDepth: {
                    get: function() {
                        return this.params.sd;
                    }
                },
                event: {
                    get: function() {
                        var value;
                        if (this.type === 'event') {
                            value = parseFloat(this.params.ev);
                            if (isNaN(value)) {
                                value = undefined;
                            }
                            return {
                                category: this.params.ec,
                                action: this.params.ea,
                                label: this.params.el,
                                value: value,   // TODO: check int or float
                                nonInteractive: this.params.ni === '1'
                            };
                        }
                    }
                },
                campaignData: {
                    get: function() {
                        if (this.params.cn || this.params.cs || this.params.cm) {
                            return {
                                name: this.params.cn,
                                source: this.params.cs,
                                medium: this.params.cm,
                                content: this.params.cc,
                                term: this.params.ck
                            };
                        }
                    }
                },
                social: {
                    get: function() {
                        if (this.type === 'social') {
                            return {
                                network: this.params.sn,
                                action: this.params.sa,
                                target: this.params.st
                                //path: this.path // TODO: check this
                            };
                        }
                    }
                },
                transaction: {
                    get: function() {
                        if (this.type === 'transaction') {
                            return {
                                id: parseInt(this.params.ti, 10),
                                affiliation: this.params.ta,
                                revenue: parseFloat(this.params.tr) || 0,
                                shipping: parseFloat(this.params.ts) || 0,
                                tax: parseFloat(this.params.tt) || 0,
                                currency: this.params.cu
                            };
                        }
                    }
                },
                transactionItem: {
                    get: function() {
                        if (this.type === 'item') {
                            return {
                                transactionId: parseInt(this.params.ti, 10),
                                sku: this.params.ic,
                                name: this.params.in,
                                category: this.params.iv,
                                price: parseFloat(this.params.ip),
                                quantity: parseInt(this.params.iq, 10),
                                currency: this.params.cu
                            };
                        }
                    }
                },
                userTimings: {
                    get: function() {
                        if (this.type === 'timing') {
                            return {
                                category: this.params.utc,
                                variable: this.params.utv,
                                value: parseInt(this.params.utt, 10),
                                label: this.params.utl
                            };
                        }
                    }
                },
                customMetrics: {
                    get: function() {
                        var data = {}, value, c;
                        for (c = 1; c <= 200; c++) {
                            value = this.params['cm' + c];
                            if (value !== undefined) {
                                data[c] = parseInt(value, 10);
                            }
                        }
                        return data;
                    }
                },
                customDimensions: {
                    get: function() {
                        var data = {}, value, c;
                        for (c = 1; c <= 200; c++) {
                            value = this.params['cd' + c];
                            if (value !== undefined) {
                                data[c] = value;
                            }
                        }
                        return data;
                    }
                },
                contentGroups: {
                    get: function() {
                        var data = {}, value, c;
                        for (c = 1; c <= 5; c++) {
                            value = this.params['cg' + c];
                            if (value !== undefined) {
                                data[c] = value;
                            }
                        }
                        return data;
                    }
                }
            });
        
            return UaBeacon;
        
        }());

        /* global Utils */
        /* exported UtmBeacon */
        
        var UtmBeacon = (function() {
        
            'use strict';
        
            var RE_PIXEL_PARAMS = /[?&](utm[a-z]+)=([^&]*)/g,                   // __utm.gif?utmXXX=YYY...
                RE_COOKIE_PARAMS = /(?:^|;)\+?__(utm[a-z]+)=([^;]*)/g,          // __utma=XXX;__umtz=YYY;...
                RE_COOKIE_DATA = /(?:^|\|)(utm[a-z]+)=([^|]*)/g,                // utmccn=XXX|utmcmd=YYY...
                RE_EXTENSIBLE_DATA = /(\d+)\((.*?)\)(?=\d|$)/g,
                RE_CONTENT_GROUP = /(\d):([^,]+)/g;
        
            function parseVariableData(data, slots, property, convertor) {
                var slot = 0;
                data.split('*').forEach(function (key) {
                    var parts = key.split('!');
                    var value = parts.pop();
                    if (parts.length) {
                        slot = parts.pop() | 0;
                    } else {
                        slot++;
                    }
                    if (!slots[slot]) {
                        slots[slot] = {
                            slot: slot,
                            scope: 3 // Default scope is page level (3)
                        };
                    }
                    if (convertor) {
                        value = convertor.call(null, value);
                    }
                    slots[slot][property] = value;
                });
            }
        
            function unescapeValue(val) {
                return val.replace(/'([0-3])/, function (m, i) {
                    return '\')*!'.charAt(i | 0);
                });
            }
        
            function CustomVar(slot, key, value, scope) {
                this.slot = slot;
                this.key = key;
                this.value = value;
                this.scope = scope;
            }
        
            CustomVar.prototype.toString = function() {
                return this.key + '=' + this.value;
            };
        
        
            function UtmBeacon(url) {
                this.params = Utils.parseDataToObject(RE_PIXEL_PARAMS, url);
            }
        
        
            Object.defineProperties(UtmBeacon.prototype, {
                trackingMethod: {
                    get: function() {
                        return 'Traditional Analytics';
                    }
                },
                version: {
                    get: function() {
                        return this.params.utmwv;
                    }
                },
                visitorId: {
                    get: function() {
                        var data = Utils.parseDataToObject(RE_COOKIE_PARAMS, this.params.utmcc);
                        if (data && data.utma) {
                            return data.utma;
                        }
                    }
                },
                sessionId: {
                    get: function() {
                        var data = Utils.parseDataToObject(RE_COOKIE_PARAMS, this.params.utmcc);
                        if (data && data.utmb) {
                            return data.utmb;
                        }
                    }
                },
                type: {
                    get: function() {
                        if (this.params.utmt === 'event') {
                            if (Utils.parseDataToObject(RE_EXTENSIBLE_DATA, this.params.utme)[14]) {
                                return 'timing';
                            }
                        }
                        if (this.params.utmt === 'tran') {
                            return 'transaction';
                        }
                        return this.params.utmt || 'pageview';
                    }
                },
                documentTitle: {
                    get: function() {
                        return this.params.utmdt;
                    }
                },
                documentUrl: {
                    get: function() {
                        return 'http://' + this.params.utmhn + this.params.utmp;
                    }
                },
                documentHostname: {
                    get: function() {
                        return this.params.utmhn;
                    }
                },
                documentPath: {
                    get: function() {
                        return this.params.utmp;
                    }
                },
                referrer: {
                    get: function() {
                        return this.params.utmr;
                    }
                },
                charset: {
                    get: function() {
                        return this.params.utmcs;
                    }
                },
                flashVersion: {
                    get: function() {
                        return this.params.utmfl;
                    }
                },
                javaEnabled: {
                    get: function() {
                        return this.params.utmje === '1';
                    }
                },
                language: {
                    get: function() {
                        return this.params.utmul;
                    }
                },
                account: {
                    get: function() {
                        return this.params.utmac;
                    }
                },
                viewport: {
                    get: function() {
                        if (this.params.utmvp) {
                            return Utils.parseDimensions(this.params.utmvp);
                        }
                    }
                },
                screen: {
                    get: function() {
                        if (this.params.utmsr) {
                            return Utils.parseDimensions(this.params.utmsr);
                        }
                    }
                },
                colorDepth: {
                    get: function() {
                        return this.params.utmsc;
                    }
                },
                event: {
                    get: function() {
                        var data, value;
                        if (this.type === 'event') {
                            data = Utils.parseDataToObject(RE_EXTENSIBLE_DATA, this.params.utme)[5];
                            if (data) {
                                data = data.split(/\*|\)\(/).map(unescapeValue);
                                value = parseFloat(data[3]);
                                if (isNaN(value)) {
                                    value = undefined;
                                }
                                return {
                                    category: data[0],
                                    action: data[1],
                                    label: data[2],
                                    value: value,
                                    nonInteractive: this.params.utmni === '1'
                                };
                            }
                        }
                    }
                },
                campaignData: {
                    get: function() {
                        var data = Utils.parseDataToObject(RE_COOKIE_PARAMS, this.params.utmcc);
                        if (data && data.utmz) {
                            data = data.utmz.match(/(^[\d.]+)\.(.*)$/);
                            if (data) {
                                data = Utils.parseDataToObject(RE_COOKIE_DATA, data[2]);
                                return {
                                    name: data.utmccn,
                                    source: data.utmcsr,
                                    medium: data.utmcmd,
                                    content: data.utmcct,
                                    term: data.utmctr
                                };
                            }
                        }
                    }
                },
                customVars: {
                    get: function() {
                        var data = Utils.parseDataToObject(RE_EXTENSIBLE_DATA, this.params.utme),
                            keys = data[8],
                            values = data[9],
                            scopes = data[11],
                            slots = {};
        
                        if (keys && values) {
                            parseVariableData(keys, slots, 'key', unescapeValue);
                            parseVariableData(values, slots, 'value', unescapeValue);
                            if (scopes) {
                                parseVariableData(scopes, slots, 'scope', parseInt);
                            }
                            return Object.keys(slots).map(function (slot) {
                                return new CustomVar(parseInt(slot), slots[slot].key, slots[slot].value, slots[slot].scope);
                                //return slots[slot];
                            });
                        }
                    }
                },
                social: {
                    get: function() {
                        if (this.type === 'social') {
                            return {
                                network: this.params.utmsn,
                                action: this.params.utmsa,
                                target: this.params.utmsid,
                                path: this.path // TODO: check this
                            };
                        }
                    }
                },
                transaction: {
                    get: function() {
                        if (this.type === 'transaction') {
                            return {
                                id: parseInt(this.params.utmtid, 10),
                                revenue: parseFloat(this.params.utmtto) || 0,
                                tax: parseFloat(this.params.utmttx) || 0,
                                shipping: parseFloat(this.params.utmtsp) || 0,
                                affiliation: this.params.utmtst,
                                city: this.params.utmtci,
                                country: this.params.utmtco,
                                region: this.params.utmtrg
                            };
                        }
                    }
                },
                transactionItem: {
                    get: function() {
                        if (this.type === 'item') {
                            return {
                                transactionId: parseInt(this.params.utmtid, 10),
                                sku: this.params.utmipc,
                                name: this.params.utmipn,
                                category: this.params.utmiva,
                                price: parseFloat(this.params.utmipr),
                                quantity: parseInt(this.params.utmiqt, 10)
                            };
                        }
                    }
                },
                userTimings: {
                    get: function() {
                        var data, obj = {};
                        if (this.type === 'timing') {
                            data = Utils.parseDataToObject(RE_EXTENSIBLE_DATA, this.params.utme)[14];
                            if (data) {
                                data = data.split(/[!|\*|\)\(]/).map(unescapeValue);
                                obj.variable = data[1];
                                obj.category = data[2];
        
                                if (data.length === 8) {
                                    // timing has a label
                                    obj.label = data[4];
                                    obj.value = parseInt(data[7], 10);
                                } else {
                                    // timing doesn't have a label
                                    obj.value = parseInt(data[6], 10);
                                }
                                return obj;
                            }
                        }
                    }
                },
                contentGroups: {
                    get: function() {
                        return Utils.parseDataToObject(RE_CONTENT_GROUP, this.params.utmpg);
                    }
                }
            });
        
            return UtmBeacon;
        
        }());
        
        return GACoreAPI;
    
    }());

    /* global GACore, UI, chrome */
    /* exported GADebuggerAPI */

    var GADebuggerAPI = (function() {

        'use strict';

        var trackerObjects = [],
            capturing = false,
            elements = {
                beaconPanel: '#tracker-data',
                propsPanel: '#beacon-props',
                trackerList: '#tracker-list > ul',
                trackerBeaconList: '#tracker-data > ul',
                trackerProps: '#tracker-properties',
                clientProps: '#client-properties',
                documentProps: '#document-properties',
                eventProps: '#event-properties',
                customVarProps: '#custom-var-properties',
                customDimensionsProps: '#custom-dimensions-properties',
                customMetricsProps: '#custom-metrics-properties',
                campaignProps: '#campaign-properties',
                timingProps: '#timing-properties',
                transactionProps: '#transaction-properties',
                transactionItemProps: '#transaction-item-properties',
                socialProps: '#social-properties',
                contentGroupProps: '#content-group-properties',
                captureButton: '#capture-button',
                clearButton: '#clear-button',
                preserveLog: '#preserve-log',
            };

        Object.keys(elements).forEach(function (element) {
            elements[element] = document.querySelector(elements[element]);
        });

        elements.beaconPanel.removeChild(elements.trackerBeaconList);
        elements.propsPanel.style.display = 'none';

        elements.clearButton.addEventListener('click', clearTrackers);

        elements.captureButton.addEventListener('toggle', function (e) {
            capturing = e.detail;
            if (capturing) {
                chrome.devtools.network.onRequestFinished.addListener(requestHandler);
            } else {
                chrome.devtools.network.onRequestFinished.removeListener(requestHandler);
            }
        });

        chrome.devtools.network.onNavigated.addListener(function() {
            if (!elements.preserveLog.checked) {
                clearTrackers();
            }
        });

        function requestHandler(request) {
            if (request.response.status === 200) {
                process(request.request);
            }
        }

        document.addEventListener('change', function (e) {
            var selectedTracker, tracker, beacon, beaconPanel;

            if (e.target.dataset.uiType !== 'item-list') {
                return;
            }

            selectedTracker = UI.ItemList.getSelectionValue(elements.trackerList);
            beaconPanel = elements.beaconPanel;

            if (selectedTracker) {
                tracker = getTrackerByAccount(selectedTracker);
                if (tracker) {
                    // did the user change the active tracker?
                    if (e.target === elements.trackerList) {
                        while (beaconPanel.hasChildNodes()) {
                            beaconPanel.removeChild(beaconPanel.firstChild);
                        }
                        beaconPanel.appendChild(tracker.list);
                    }
                    beacon = UI.ItemList.getSelectionValue(tracker.list);
                }
            }
            if (beacon) {
                updatePropertiesView(GACore.parseBeacon(beacon));
                elements.propsPanel.style.display = '';
            } else {
                elements.propsPanel.style.display = 'none';
            }
        });


        function clearTrackers() {
            trackerObjects = [];
            while (elements.beaconPanel.hasChildNodes()) {
                elements.beaconPanel.removeChild(elements.beaconPanel.firstChild);
            }
            UI.ItemList.clear(elements.trackerList);
        }


        function getTrackerByAccount(account) {
            return trackerObjects.filter(function (tracker) {
                return tracker.account === account;
            })[0];
        }


        function process(request) {
            var url = request.url,
                beacon, tracker, item, refNode;

            if (GACore.isBeaconUrl(url)) {

                if (request.method === 'POST') {
                    url += request.queryString.length ? '&' : '?';
                    url += request.postData.text;
                }

                beacon = GACore.parseBeacon(url);

                if (beacon) {
                    tracker = getTrackerByAccount(beacon.account);

                    // create a tracker list item for this beacon
                    if (!tracker) {
                        tracker = {
                            account: beacon.account,
                            list: elements.trackerBeaconList.cloneNode(true)
                        };
                        UI.ItemList.addItem(
                            elements.trackerList,
                            tracker.account + '<i>' + beacon.documentHostname + '</i>',
                            tracker.account,
                            true
                        );
                        trackerObjects.push(tracker);
                    }

                    // add the beacon to the trackers beacon list
                    item = UI.ItemList.addItem(
                        tracker.list,
                        beacon.type + ' - ' + GACore.createBeaconHint(beacon),
                        url
                    );

                    item.className = 'beacon beacon--' + beacon.type;

                    // ensure transaction items are grouped
                    if (beacon.type === 'item') {
                        refNode = tracker.list.querySelector('[tid="' + beacon.transactionItem.transactionId + '"]');
                        if (refNode) {
                            refNode = refNode.nextElementSibling;
                        }
                        tracker.list.insertBefore(item, refNode);
                        item.setAttribute('tid', beacon.transactionItem.transactionId);
                    }

                    // ensure the transaction header is above any transaction items
                    if (beacon.type === 'transaction') {
                        tracker.list.insertBefore(item, tracker.list.querySelector('[tid="' + beacon.transaction.id + '"]'));
                    }
                }
            }
        }

        function setProperties(propertyList, props) {
            var group = propertyList.parentNode.parentNode;

            var hasProps = props && !Object.keys(props).every(function (prop) {
                return props[prop] === undefined;
            });

            if (!hasProps) {
                group.setAttribute('hidden', 'hidden');
            } else {
                group.removeAttribute('hidden');
            }

            UI.PropertyList.setProperties(propertyList, props);
        }


        function updatePropertiesView(beacon) {
            var customVars = {};

            setProperties(elements.trackerProps, {
                'Type': beacon.trackingMethod,
                'Version': beacon.version,
                'Account': beacon.account,
                'Client ID': beacon.clientId,
                'Visitor ID': beacon.visitorId,
                'Session ID': beacon.sessionId
            });

            setProperties(elements.clientProps, {
                'Screen size': beacon.screen,
                'Viewport size': beacon.viewport,
                'Colors': beacon.colorDepth,
                'Flash version': beacon.flashVersion,
                'Java enabled': beacon.javaEnabled
            });

            setProperties(elements.documentProps, {
                'Title': beacon.documentTitle,
                'Url': beacon.documentUrl,
                'Path': beacon.documentPath,
                'Referrer': beacon.referrer,
                'Character set': beacon.charset,
                'Language': beacon.language,
                'Screen name': beacon.screenName
            });

            setProperties(elements.eventProps, beacon.event && {
                'Category': beacon.event.category,
                'Action': beacon.event.action,
                'Label': beacon.event.label,
                'Value': beacon.event.value,
                'Non-interactive': beacon.event.nonInteractive
            });

            setProperties(elements.timingProps, beacon.userTimings && {
                'Category': beacon.userTimings.category,
                'Variable': beacon.userTimings.variable,
                'Value': beacon.userTimings.value,
                'Label': beacon.userTimings.label
            });

            setProperties(elements.transactionProps, beacon.transaction && {
                'Order ID': beacon.transaction.id,
                'Affiliation': beacon.transaction.affiliation,
                'Revenue': beacon.transaction.revenue,
                'Shipping': beacon.transaction.shipping,
                'Tax': beacon.transaction.tax,
                'Currency': beacon.transaction.currency
            });

            setProperties(elements.transactionItemProps, beacon.transactionItem && {
                'Order ID': beacon.transactionItem.transactionId,
                'SKU': beacon.transactionItem.sku,
                'Product name': beacon.transactionItem.name,
                'Category': beacon.transactionItem.category,
                'Price': beacon.transactionItem.price,
                'Quantity': beacon.transactionItem.quantity,
                'Currency': beacon.transactionItem.currency
            });

            setProperties(elements.socialProps, beacon.social && {
                'Network': beacon.social.network,
                'Action': beacon.social.action,
                'Target': beacon.social.target
            });

            if (beacon.customVars) {
                beacon.customVars.forEach(function (customVar) {
                    customVars['Slot ' + customVar.slot] = customVar;
                });
                setProperties(elements.customVarProps, customVars);
            } else {
                setProperties(elements.customVarProps, null);
            }

            setProperties(elements.customDimensionsProps, beacon.customDimensions);
            setProperties(elements.customMetricsProps, beacon.customMetrics);
            setProperties(elements.contentGroupProps, beacon.contentGroups);
            setProperties(elements.campaignProps, beacon.campaignData);
        }

        return {
            process: function(url) {
                return process(url);
            },
            clear: function() {
                return clearTrackers();
            }
        };
    }());
    

    /* global UI */
    
    UI.Utils = (function() {
    
        'use strict';
    
        function createElem(props) {
            var elem = document.createElement(props.tag);
    
            if (props.attrs) {
                Object.keys(props.attrs).forEach(function (key) {
                    elem.setAttribute(key, props.attrs[key]);
                });
            }
            if (props.html) {
                elem.innerHTML = props.html;
            }
            if (props.text) {
                elem.textContent = props.text;
            }
            if (props.children) {
                props.children.forEach(function (child) {
                    elem.appendChild(createElem(child));
                });
            }
            return elem;
        }
    
        function emptyElem(elem) {
            while (elem.hasChildNodes()) {
                elem.removeChild(elem.firstChild);
            }
        }
    
        function htmlEncode(str) {
            return str.replace(/[<&>]/g, function (chr) {
                return '&#' + chr.charCodeAt() + ';';
            });
        }
    
        function findControl(elem, type) {
            while (elem && elem.dataset.uiType !== type) {
                elem = elem.parentElement;
            }
            return elem;
        }
    
        return {
            createElem: createElem,
            emptyElem: emptyElem,
            htmlEncode: htmlEncode,
            findControl: findControl
        };
    
    }());

    /* global UI, chrome */

    UI.Window = (function(){

        'use strict';

        document.querySelector('body').classList.add(
            'dev-tools-theme-' + chrome.devtools.panels.themeName
        );

        window.addEventListener('focus', function() {
            document.body.classList.remove('state--inactive');
        });

        window.addEventListener('blur', function() {
            document.body.classList.add('state--inactive');
        });
    }());
    

    /* global UI */
    
    UI.ItemList = (function() {
    
        'use strict';
    
        /**
         * Returns the currently selected element for the given list
         */
        function getSelection(list) {
            return list.querySelector('[data-ui-type="item-list-item"].state--selected');
        }
    
        /**
         * Returns the value of the currently selected element for the given list
         */
        function getSelectionValue(list) {
            var selection = getSelection(list);
            if (selection) {
                return selection.dataset.value;
            } else {
                return null;
            }
        }
    
        /**
         * Sets the current selection for the given list
         */
        function setSelection(list, item) {
            var lastItem = getSelection(list),
                value = null;
    
            if (item !== lastItem) {
                if (lastItem) {
                    lastItem.classList.remove('state--selected');
                }
                if (item) {
                    item.classList.add('state--selected');
                    value = item.dataset.value;
                }
                list.dispatchEvent(new CustomEvent('change', {
                    detail: value,
                    bubbles: true
                }));
            }
        }
    
    
        // Capture user interactions and update list selection
        document.addEventListener('click', function(e) {
            var item, list;
    
            item = UI.Utils.findControl(e.target, 'item-list-item');
            if (item) {
                list = UI.Utils.findControl(item, 'item-list');
                if (list) {
                    setSelection(list, item);
                }
            }
        });
    
        // The public API
        return {
            addItem: function (list, label, value, htmlContent) {
                var elem;
                if (!htmlContent) {
                    label = UI.Utils.htmlEncode(label);
                }
                elem = UI.Utils.createElem({
                    tag: 'li',
                    attrs: {
                        'data-ui-type': 'item-list-item',
                        'data-value': value
                    },
                    html: label
                });
                list.appendChild(elem);
                return elem;
            },
            clear: function (list) {
                setSelection(list, null);
                UI.Utils.emptyElem(list);
            },
            getSelection: getSelection,
            getSelectionValue: getSelectionValue
        };
    }());
    

    /* global UI */
    
    UI.PropertyList = (function() {
    
        'use strict';
    
        var RE_ALPHA_CHARS = /[^a-z]/gi,
            RE_NUMBERIC_CHARS = /[^0-9.]/g;
    
        /**
         * Creates a DOM tree for a property element
         */
        function createProperty(name) {
            return UI.Utils.createElem({
                tag: 'li',
                attrs: {
                    'data-key': name,
                    'class': 'property property--collapsed'
                },
                children: [
                    {
                        tag: 'span',
                        text: name,
                        attrs: {
                            'class': 'property__name'
                        }
                    },
                    {
                        tag: 'span',
                        attrs: {
                            'class': 'property__value'
                        }
                    }
                ]
            });
        }
    
        /**
         * Creates a DOM tree for a opener element
         */
        function createOpener() {
            return UI.Utils.createElem({
                tag: 'span',
                attrs: {
                    'class': 'property__opener'
                }
            });
        }
    
        /**
         * Creates a DOM tree for complex property values
         */
        function createChildren() {
            return UI.Utils.createElem({
                tag: 'ul',
                attrs: {
                    'class': 'property-list property'
                }
            });
        }
    
        /**
         * Compares two alphanumeric values 
         *
         * returns:
         *   0   if they are identical
         *   1   if a is greater than b 
         *   -1  if a is less than b
         */
        function alphaNumericSort(a, b) {
            var aKey, bKey;
    
            a = a.toString();
            b = b.toString();    
            aKey = a.replace(RE_ALPHA_CHARS, '');
            bKey = b.replace(RE_ALPHA_CHARS, '');
            if (aKey === bKey) {
                aKey = parseFloat(a.replace(RE_NUMBERIC_CHARS, ''));
                bKey = parseFloat(b.replace(RE_NUMBERIC_CHARS, ''));
            }
            return aKey === bKey ? 0 : aKey > bKey ? 1 : -1;
        }
    
        /**
         * Gather up DOM elements for a given property 
         */
        function getPropertyElements(propertyElement) {
            var nextElement = propertyElement.nextElementSibling,
                elements = {
                    property: propertyElement,
                    key: propertyElement.firstChild,
                    value: propertyElement.lastChild
                };
    
            if (nextElement && nextElement.tagName === 'UL') {
                elements.children = nextElement;
                elements.opener = propertyElement.children[1];
            }
            return elements;
        }
    
        /**
         * Find a property by its key name in the given context
         */
        function getPropertyByName(context, key) {
            var children = context.children,
                c;
    
            for (c=0; c<children.length; c++) {
                if (children[c].dataset.key === key) {
                    return children[c];
                }
            }
        }
    
        /**
         * Select all property elements for a given context
         */
        function getPropertyNames(context) {
            var props = [],
                children = context.children,
                c;
    
            for (c=0; c<children.length; c++) {
                if (children[c].dataset.key) {
                    props.push(children[c].dataset.key);
                }
            }
            return props;
        }
    
        /**
         * Sets one or more properties for a given context.
         *
         * Existing properties that don't appear in the new state
         * are hidden rather than being destroyed so their state is
         * preserved if they are added again later.
         */
        function setProperties(context, properties) {
            var oldProps = getPropertyNames(context),
                newProps = [];
    
            if (properties) {
                newProps = Object.keys(properties);
            }
    
            // Remove existing properties
            oldProps.forEach(function (prop) {
                if (newProps.indexOf(prop) === -1) {
                    getPropertyByName(context, prop).setAttribute('hidden', 'hidden');
                }
            });
    
            if (properties) {
                Object.keys(properties).forEach(function (key) {
                    setProperty(context, key, properties[key]);
                });
            }
        }
    
        /**
         * Sets a single property in the given context.
         */
        function setProperty(context, key, value) {
            var elements, property, propertyClassName, refNode, c;
    
            property = getPropertyByName(context, key);
    
            if (!property) {
                property = createProperty(key);
    
                // Insert this property in alpha-numeric order
                for (c = 0; c < context.children.length; c++) {
                    if (!context.children[c].dataset.key) {
                        continue;
                    }
                    if (alphaNumericSort(key, context.children[c].dataset.key) <= 0) {
                        refNode = context.children[c];
                        break;
                    }
                }
                context.insertBefore(property, refNode);
            }
    
            elements = getPropertyElements(property);
    
            // Is the new value a complex object (array or object)?
            if (value && typeof value === 'object') {
                if (!elements.children) {
                    elements.children = createChildren();
                    elements.opener = createOpener();
                    context.insertBefore(elements.children, property.nextElementSibling);
                    elements.property.insertBefore(elements.opener, elements.key);
                }
                setProperties(elements.children, value);
            }
    
            if (elements.property.hasAttribute('hidden')) {
                elements.property.removeAttribute('hidden');
            }
    
            propertyClassName = 'property property--' + typeof value;
    
            if (elements.property.classList.contains('property--collapsed')) {
                propertyClassName += ' property--collapsed';
            }
    
            elements.property.className = propertyClassName;
    
            // convert the value to a string
            if (value !== null && value !== undefined) {
                value = value.toString();
            } else {
                value = typeof value;
            }
    
            // update the value if it changed
            if (elements.value.textContent !== value) {
                elements.value.textContent = value;
            }
        }
    
        // Event handling
        document.addEventListener('click', function (e) {
            var t = e.target,
                c = t.classList;
    
            if (c.contains('property__opener')) {
                c = e.target.parentNode.classList;
                c.toggle('property--collapsed');
                e.preventDefault();
            }
        });
    
        // The public API
        return {
            setProperty: function(list, key, value) {
                setProperty(list, key, value);
            },
            setProperties: function(list, properties) {
                setProperties(list, properties);
            }
        };
    }());

    /* global UI */
    
    UI.SplitView = (function() {
    
        'use strict';
    
        var splitters = document.querySelectorAll('.splitview__splitter'),
            originX, prevPanel, nextPanel,
            prevPanelWidth, nextPanelWidth;
    
        function startDrag(e) {
            originX = e.pageX;
            prevPanel = e.target.previousElementSibling;
            nextPanel = e.target.nextElementSibling;
            prevPanelWidth = prevPanel.offsetWidth;
            nextPanelWidth = nextPanel.offsetWidth;
            document.addEventListener('mousemove', doDrag);
            document.addEventListener('mouseup', endDrag);
            e.preventDefault();
        }
    
        function doDrag(e) {
            var delta = originX - e.pageX;
            if (prevPanel.style.width !== 'auto') {
                prevPanel.style.width = (prevPanelWidth - delta) + 'px';
            }
            if (nextPanel.style.width !== 'auto') {
                nextPanel.style.width = (nextPanelWidth + delta) + 'px';
            }
        }
    
        function endDrag() {
            document.removeEventListener('mousemove', doDrag);
            document.removeEventListener('mouseup', endDrag);
        }
    
        for (var c = 0; c < splitters.length; c++) {
            splitters[c].addEventListener('mousedown', startDrag);
        }
    
    }());

    /* global UI */
    
    UI.Group = (function() {
    
        'use strict';
    
        document.addEventListener('click', function(e) {
            var elem = e.target;
            if (elem.classList.contains('group__header')) {
                elem.parentNode.classList.toggle('group--collapsed');
            }
        });
    
    }());

    /* global UI */
    
    UI.Toolbar = (function() {
    
        'use strict';
    
        var toolbars = document.querySelectorAll('[data-ui-type="toolbar"]');
    
        for (var c=0; c<toolbars.length; c++) {
            initToolbar(toolbars[c]);
        }
    
        function dispatchEvent(elem, name, detail) {
            var event = new CustomEvent(name, {
                detail: detail,
                bubbles: true
            });
            return elem.dispatchEvent(event);
        }
    
        function isToolbarButton(elem) {
            return elem.classList.contains('toolbar__button');
        }
    
        function initToolbar(toolbar) {
            toolbar.addEventListener('click', function (e) {
                var elem = e.target,
                    button;
    
                while (elem && elem !== toolbar) {
                    if (isToolbarButton(elem)) {
                        button = elem;
                    }
                    elem = elem.parentNode;
                }
    
                if (button) {
                    toggleButton(button);
                }
            });
        }
    
        function toggleButton(button) {
            if (button.classList.contains('toolbar__button--toggled-off')) {
                if (dispatchEvent(button, 'toggle', true)) {
                    button.classList.remove('toolbar__button--toggled-off');
                    button.classList.add('toolbar__button--toggled-on');
                }
            } else if (button.classList.contains('toolbar__button--toggled-on')) {
                if (dispatchEvent(button, 'toggle', false)) {
                    button.classList.remove('toolbar__button--toggled-on');
                    button.classList.add('toolbar__button--toggled-off');
                }
            }
        }
    
    }());
    
    return GADebuggerAPI;

}());