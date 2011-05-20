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


