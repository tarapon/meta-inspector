var text = function(el) {
	if (el) {
		return el.innerText;
	} else {
		return null;
	}
};

var attr = function(el, name) {
	if (el) {
		return el.getAttribute(name);
	} else {
		return null;
	}
};

var headTag = document.querySelector('head');
var titleTag = headTag.querySelector('title');
var canonicalTag = headTag.querySelector('link[rel="canonical"]');
var metaTags = headTag.getElementsByTagName('meta');

var meta = [];

for(var i = 0; i < metaTags.length; i++) {
	var el = metaTags[i];
	var submeta = {};
	for(var j = 0; j < el.attributes.length; j++) {
		var attribute = el.attributes[j];
		submeta[attribute.nodeName] = attribute.nodeValue;
	}
	meta.push(submeta);
}

var data = {
	title: text(titleTag),
	canonical: attr(canonicalTag, 'href'),
	meta: meta
};

chrome.runtime.sendMessage({data: data, name: 'metadata'});




