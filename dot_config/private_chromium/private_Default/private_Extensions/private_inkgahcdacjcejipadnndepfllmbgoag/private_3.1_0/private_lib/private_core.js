/*Default options values*/
$appData = {
	'tabswitch': 30,
	'tabswitch-state': 0
};

/*
	Allow read from localStorage
	read(function(settings) { .. });

	@args		callback (function)
				[, "propertyName" (string) //default "appData"]
*/
function read(prop, callback) {
	var callback	= $.isFunction(callback) ? callback : prop,
		prop		= $.type(prop) == 'string' ? prop : 'appData';

	/*Read data*/
	chrome.extension.sendMessage({type: 'readProperty', property: prop}, function(settings) {
		if ($.isFunction(callback)) callback($.extend(true, {}, (prop == 'appData' ? $appData : window['$'+prop]), JSON.parse($.type(settings) == 'string' ? settings : null)));
	});
}

/*
	Allow write to localStorage
	write({'a': 1, 'b': 2}, {...}, function(data) { .. });

	@args		{} (object)
				[, {Object N} (object), callback (function), "propertyName" (string), true //Merge with appData]
*/
function write() {
	/*Save data*/
	var obj			= $.extend.apply({}, Array.prototype.filter.call(arguments, function(f) { return $.type(f) == 'object' })),	/*Data to save*/
		merge		= $.grep(arguments, function(n) {return $.type(n) == 'boolean'})[0],										/*Flag to merge with $appData*/
		prop		= $.grep(arguments, function(n) {return $.type(n) == 'string'})[0],											/*localStorage property name*/
		callback	= $.grep(arguments, function(f) {return $.isFunction(f)})[0];												/*callback function*/

	read(function(data) {
		data = $.extend((!merge ? data : {}), obj);
		chrome.extension.sendMessage({type: 'saveProperty', property: (prop || 'appData'), value: JSON.stringify(data)}, function() {
			if ($.isFunction(callback)) callback(data, obj);
		});
	});
}