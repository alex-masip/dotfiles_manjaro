var adfheaders = [];

chrome.tabs.onActivated.addListener(
    function (tab) {
		adfheaders=[];
    }
);

chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo) {
		if(changeInfo.status == 'loading'){
			adfheaders=[];
		}
	}
);

chrome.webRequest.onCompleted.addListener(
    function (details) {
		if(details.statusCode == '200' || details.statusCode == '302'){
			adfheaders.push(details.url+";**"+details.type);
		}
    }, {
        urls: [
            "*://*.adform.net/Serving/TrackPoint/*",
            "*://*.adform.net/serving/scripts/trackpoint/*",
            "*://*.adform.net/banners/scripts/st/trackpoint-*"
        ],
        types: ["image", "script", "sub_frame", "other"]
    }, ["responseHeaders"]
);