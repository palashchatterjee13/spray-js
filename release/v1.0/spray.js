const Spray = function (select, source, style) {
	if (window.$ === undefined) {
		console.error(`[SprayJS] Dependency error: jQuery was not found, try adding the latest version of jQuery or add this line in your head tag: \n\n<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>`);
		return;
	}
	var root = $(`body`);
	select = $(select);
	var maskID = function () {
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
	}
	var actions = {
		sourceAndstyle: function (source, style) {
			var ID = maskID();
			select.css({
				"mask": `url(mask${ID})`,
				"-webkit-mask-box-image": `url(${source})`,
				"background": style
			});
			root.append(`<svg height="0" width="0"><mask id="mask${ID}"> <image id="img" xlink:href="${source}" x="0" y="0"/></mask></svg>`);
			return actions;
		},
		style: function (style) {
			if (style == undefined) {
				return false;
			}
			select.css({
				"background": style
			});
			return actions;
		},
		source: function (source) {
			var ID = maskID();
			if (source == undefined) {
				return false;
			}
			select.css({
				"mask": `url(mask${ID})`,
				"-webkit-mask-box-image": `url(${source})`,
			});
			root.append(`<svg height="0" width="0"><mask id="mask${ID}"> <image id="img" xlink:href="${source}" x="0" y="0"/></mask></svg>`);
			return actions;
		},
		size: function (size) {
			if (size == undefined) {
				return false;
			}
			select.css({
				"background-size": size
			});
			return actions;
		},
	}
	if (source != undefined) {
		actions.source(source);
	}
	if (style != undefined) {
		actions.style(style);
	}
	return actions;
}