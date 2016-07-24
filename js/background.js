

function updateBadge() {
    chrome.windows.getCurrent(function(window){
        var width = window.width;
        var badgeText = "?";

        if (width-11 > breakpoints.xs) {
            badgeText = " xs ";
        }
        if (width-11 >= breakpoints.sm) {
            badgeText = " sm ";
        }
        if (width-11 >= breakpoints.md) {
            badgeText = " md ";
        }
        if (width-11 >= breakpoints.lg) {
            badgeText = " lg ";
        }
        if (width-11 >= breakpoints.xl) {
            badgeText = " lg ";
        }

        chrome.browserAction.setBadgeText({"text": badgeText});
        chrome.browserAction.setBadgeBackgroundColor({"color":[111, 84, 153, 255]});
    });

}


chrome.runtime.onStartup.addListener(function(activeInfo) {
    initLWCLocalStorage();
    initScrollBarWidth();
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action != null) {
        if (request.action === 'isBootstraped') {
            changeIconTo(
                (request.message)? getBreakpoint(sender.tab.width) : null,
                sender.tab.id
            );
        }
        else if (request.action === 'changeIcon') {
            changeIconTo(request.message, sender.tab.id);
        }
    }

    sendResponse('received');
});
chrome.windows.onRemoved.addListener(function (windowId) {
    removeWindow(windowId);
});

