var sidebar = null;

chrome.devtools.panels.elements.createSidebarPane("Meta", function(panel) {
	sidebar = panel;
});

var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page"
});

var parseData = function(data) {
	var view = {
		title: data.title,
		canonical: data.canonical,
		others: []
	};

	for(var i = 0; i < data.meta.length; i++) {
		var entry = data.meta[i];
		if(entry.name && entry.content) {
			view[entry.name] = entry.content;
		} else if (entry.property && entry.content)	{
			view[entry.property] = entry.content;
		} else {
			view.others.push(entry);
		}
	};

	return view;
};

backgroundPageConnection.onMessage.addListener(function (message) {
	var view = parseData(message.data);
  sidebar.setObject(view);
});

// Relay the tab ID to the background page
chrome.runtime.sendMessage({tabId: chrome.devtools.inspectedWindow.tabId, name: 'init'});