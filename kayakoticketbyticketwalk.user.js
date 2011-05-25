// ==UserScript==
// @name           KayakoTicketByTicketWalker
// @namespace      http://yperevoznikov.com
// @include        http://*.kayako.com/staff/*
// ==/UserScript==

if (typeof($)==="undefined") {
	jQuery=$=unsafeWindow.$;	
}

$(".ticketworkflowitem:contains('Close Ticket')").live('click', function(event){
	unsafeWindow.justClosed = 1;
});

unsafeWindow.justClosed = 0;

$('*').keydown(function(e){
	if (78 == e.keyCode) { // n
		var focusedElementId = $("*:focus").attr("id");

		if (undefined == focusedElementId) {
			$(".ticketworkflowitem:contains('Close Ticket')").click();
		}
		e.stopPropagation();
	}
});

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
		$('html,body').scrollTop(targetOffset);
	});
};