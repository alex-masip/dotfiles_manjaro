var Extension = (function($) {
    'use strict';

    /*
        Extension module
    */

    function Extension() {
        if (!(this instanceof Extension)) {
            return new Extension();
        }

        var $this = this;

        return this.load();
    }

    Extension.prototype = {
        load: function(cb) {
            var $this = this;

            this.dsID = (location.href.match(/datastudio\.google\.com.*?\/reporting\/(.*?)\//) || [])[1];

            /*Get data from localstorage*/
            read(function (d) {
                $this.data = d;

                read($this.dsID, function(i) {
                    $this.info = i;

                    if (!$this.loaded) {
                        $this.loaded = true;
                        $this.init.call($this);
                    }

                    if (cb) cb.call($this);
                });
            });

            return this;
        },
        init: function() {
            var $this = this;

            $(function() {
                chrome.extension.sendMessage({type: 'setIcon', path: {16: 'img/favicon_16.png', 32: 'img/favicon_32.png', 64: 'img/favicon_64.png', 128: 'img/favicon_full.png'}});

                if ($this.dsID) {
                    $this.setData.call($this, $this); /*Re-initialize after refresh*/
                }

                /*Observe to realtime catch DOM changes in a page*/
                $('body').DOMObserver({subtree: true, eachMutation: false}, function(e) {
                    if (e && e.target && $(e.target).hasClass('page-name') && !e.target.catched) {
                        /*Get data for new dataset*/
                        $this.load.call($this, function() {
                            $this.setData.call($this, $this); /*Re-initialize after ajax*/
                        });

                        e.target.catched = true;
                        setTimeout(function() {
                            e.target.catched = false;
                        }, 1000);
                    }
                });

                /*Launch tab switcher*/
                chrome.extension.sendMessage({
                    type: 'tabSwitch',
                    data: $this.data
                });
            });
        },
        setData: function(r) {
            var $this = this;
            this.info = r.info;

            /*Check if background.js still available*/
            function checkAvailability() {
                try {
                    chrome.extension.sendMessage({type: 'getTabData'});
                } catch (e) {
                    clearInterval($this.refreshIntensity);
                    clearInterval($this.paginateIntensity);
                }
            }

            if (r && r.info['refresh-state'] > 0) {
                if (r.info.refresh !== undefined) {
                    clearInterval($this.refreshIntensity);

                    if (r.info.refresh > 0) {
                        $this.refreshIntensity = setInterval(function() {
                            checkAvailability();

                            try {
                                $('refresh-button button')[0].click();
                            } catch (e) {}

                            /*Hide header*/
                            setTimeout(function() {
                                $('header-zone').removeClass('showing hover');
                            }, 1000);
                            
                        }, r.info.refresh * 60000);
                    }

                    this.refresh = r.info.refresh;
                }

                if (r && r.info['paginate-state'] > 0) {
                    if (r.info.paginate !== undefined) {
                        clearInterval($this.paginateIntensity);

                        if (r.info.paginate > 0) {
                            $this.paginateIntensity = setInterval($.proxy(function() {
                                checkAvailability();

                                this.pages = (($('.show-page-list span')[1] || []).innerText || '').match(/(\d+).*?(\d+)/);
                                this.pages[1] = Number(this.pages[1]); this.pages[2] = Number(this.pages[2]);

                                this.direction = (function() {
                                    if (this.direction > -1 && this.pages[1] > 1 && this.pages[1] < this.pages[2]) {
                                        return this.direction;
                                    } else {
                                        return this.pages[1] > 0 && this.pages[1] < this.pages[2] ? 1 : 0;
                                    }
                                }).call(this);

                                /*Switch*/
                                $('.navBtn.'+(this.direction > 0 ? 'next' : 'pre')+'Btn')[0].click();

                                /*Hide header*/
                                setTimeout(function() {
                                    $('header-zone').removeClass('showing hover');
                                }, 1000);

                            }, this), r.info.paginate * 1000);
                        }

                        this.paginate = r.info.paginate;
                    }
                }
            } else {
                clearInterval($this.refreshIntensity);
                clearInterval($this.paginateIntensity);
            }
        },
        getPageInfo: function (r, s, cb) {
            this.load(function() {
                cb({
                    href: location.href,
                    dsID: this.dsID,
                    data: this.info
                });
            });
        }
    };
    
    return Extension;
})(window.jQuery || window.Zepto);

/*Init Extension Class*/
window.extension = Extension();

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (window.extension && $.isFunction(window.extension[request.type])) {
        var response = window.extension[request.type].apply(window.extension, arguments);
        if (response !== window.extension && response !== undefined) callback(response);
    }

    return true;
});