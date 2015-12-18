var fetchMetadata = function(id) {
    chrome.tabs.executeScript(id, { file: 'fetcher.js' });
};

var connection;

chrome.runtime.onConnect.addListener(function (port) {
    connection = port;
});

var onMessage = function(message, sender, sendResponse) {
    if(message.name == 'init') {
        fetchMetadata(message.tabId);
        chrome.webNavigation.onCompleted.addListener(function(e){
            if(e.tabId == message.tabId) {
                fetchMetadata(message.tabId);
            }
        });
    }

    if(message.name == 'metadata') {
        if(connection) {
            connection.postMessage(message);
        }
    }
}

chrome.runtime.onMessage.addListener(onMessage);