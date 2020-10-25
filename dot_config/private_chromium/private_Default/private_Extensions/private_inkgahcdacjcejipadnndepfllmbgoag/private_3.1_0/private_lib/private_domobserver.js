;!function($) {
	/*
		Watches for attr or contents changes on DOM node
		$('form').DOMObserver({}, function(m) { .. });	// $('form')

		@args		data (object)
		@return		given (HTMLDomObject)
	*/
	if (typeof $ == 'undefined') return;

	$.fn.DOMObserver = function(data, callback) {
		return this.each(function() {
			if (data && !this.$DOMObserver) {
				var $this = this;
				
				this.$DOMObserver = {
					data: $.extend({
						/** Observer settings **/
						characterData:				false,
						/*characterDataOldValue:	false,*/	/* Only when characterData enabled */
						attributes:					true,
						/*attributeFilter:			[],*/		/* Only when attributes enabled */
						childList:					false,
						subtree:					false,
						attributeOldValue:			false,
						/** Plugin settings **/
						eachMutation:				true,
						callback:					function() {}
					}, data)
				}

				this.$DOMObserver.callback = callback || this.$DOMObserver.data.callback;
				this.$DOMObserver.listener = new MutationObserver(function(mutations) {
					if ($this.$DOMObserver.data.eachMutation) mutations.forEach($this.$DOMObserver.callback);
					else $this.$DOMObserver.callback.call($this, mutations);
				});
				this.$DOMObserver.listener.observe(this, this.$DOMObserver.data);
			} else if (this.$DOMObserver) {
				this.$DOMObserver.listener.disconnect();
				this.$DOMObserver = null;
			}
		});
	}
}(window.jQuery || window.Zepto);