// ==UserScript==
// @name           Kayako Next And Previous Ticket Walker
// @namespace      http://yperevoznikov.com
// @include        http://*.kayako.com/staff/*
// ==/UserScript==

if (typeof($)==="undefined") $=unsafeWindow.$;

$('*').keydown(function(e){
	if (89 == e.keyCode) { // y - previous
		$(".gridnavpage a:contains('Previous Ticket')").eq(0).click();
	}
	if (88 == e.keyCode) { // x - next
		$(".gridnavpage a:contains('Next Ticket')").eq(0).click();
	}
});

// this code is from "kayako ticket by ticket" userscript to make scroll only for this one
unsafeWindow.loadViewportData = function(_url, _argumentIndexCounter, _prefixBaseName) {
    unsafeWindow._isViewportRequestActive = true;
    unsafeWindow._incomingRequestHistoryChunk = "";

    if (undefined != unsafeWindow._viewportAjaxRequest && unsafeWindow._viewportAjaxRequest != false) {
        unsafeWindow._viewportAjaxRequest.abort();
    }
    var _finalURL = unsafeWindow.HandleBeforeAJAXDispatch(_url, _argumentIndexCounter, _prefixBaseName);
    unsafeWindow._lastUsedURL = _finalURL;
    unsafeWindow.HideHeaderURL();
    window._viewportAjaxRequest = $.get(_finalURL, function (responseText) {
		$("#cpmenu").html(responseText);
		unsafeWindow.reParseDoc();
		if (1 == unsafeWindow.justClosed) { // we are in just closed ticket
			$("#cpmenu").css('visibility', 'hidden');
			$("li.collapsable b").parents('li.collapsable').find('ul li:first a').click();
			unsafeWindow.justClosed = 2;
		} else if (2 == unsafeWindow.justClosed) { // we are in inbox page	
			if ($('.gridlayoutborder table tr td[align=left] a:first').size()) {
				$("#cpmenu").css('visibility', 'hidden');
			} else {
				$("#cpmenu").css('visibility', 'visible');
			}
			$('.gridlayoutborder table tr td[align=left] a:first').click();
			unsafeWindow.justClosed = 0;
		} else {
			$("#cpmenu").css('visibility', 'visible');
		}
		var targetOffset = $('.ticketgeneralcontainer').offset().top;
		if ($('.ticketgeneralcontainer').size() && targetOffset > 10) {
			$('html,body').animate({scrollTop: targetOffset}, 1000);
		}
	});
};