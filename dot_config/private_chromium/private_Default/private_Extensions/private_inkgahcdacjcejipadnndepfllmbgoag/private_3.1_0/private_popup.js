jQuery(function($) {
	var data = {}, info = {}, port = chrome.runtime.connect();

	/*Initialize main functionality*/
	function init(i, s) {
		$.material.init();

		data = s;
		info = $.extend(true, {
			data: {
				'refresh': 0,
				'refresh-state': 0,
				'paginate': 0,
				'paginate-state': 0
			}
		}, i);

		function disableCtrl() {
			var ctrl = $('#refresh-state')[0];
			$('#paginate, #tabswitch').prop('disabled', !ctrl.checked ? 1 : 0).trigger('input');
			$('#paginate-state, #tabswitch-state').prop('disabled', !ctrl.checked ? 1 : 0).each(function (i, o) {
				if (!ctrl.checked) $(o).prop('checked', 0);
			}).trigger('change');
		}

		$('.togglebutton input').each(function () {
			$(this).prop('checked', (data.hasOwnProperty(this.id) ? data : info.data)[this.id]);
		}).on('change', function() {
			(data.hasOwnProperty(this.id) ? data : info.data)[this.id] = Number(this.checked);
			save();
		});

		$('#refresh-state').on('change', disableCtrl);

		$('.value').each(function() {
			this.value = (data.hasOwnProperty(this.id) ? data : info.data)[this.id];
		}).on('input', function() {
			(data.hasOwnProperty(this.id) ? data : info.data)[this.id] = Number(this.value);
			save();
		});

		disableCtrl();
	}

	function save() {
		write(data, function () {
			write(info.dsID, info.data, true, function(d) {
				chrome.extension.sendMessage({
					type:		'sendActiveTabMsg',
					action:		'setData',
					info:		info.data
				});
			}, function () {
				chrome.extension.sendMessage({
					type: 'sendTabMsg',
					action: 'setData'
				});
			});
		})
	}

	$(function() {
		/*Get data from content window*/
		chrome.extension.sendMessage({
			type:		'sendActiveTabMsg',
			action:		'getPageInfo'
		}, function(i) {
			$('.form-info')[!i.dsID ? 'show' : 'hide']();
			$('.form-settings')[i.dsID ? 'show': 'hide']();

			read(function (s) {
				init(i, s);
			});
		});
	});
});