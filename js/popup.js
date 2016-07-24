var currentBP = null;

var closeTimeout = null;
var delayToClose = 2000;

document.addEventListener('DOMContentLoaded', function() {
    updateButton();

    $('.resizer a[data-size="xs"]').click(function(){
        changeWindowSize(resizeWidth.xs);
        closeDelay();
    });
    $('.resizer a[data-size="sm"]').click(function(){
        changeWindowSize(resizeWidth.sm);
        closeDelay();
    });
    $('.resizer a[data-size="md"]').click(function(){
        changeWindowSize(resizeWidth.md);
        closeDelay();
    });
    $('.resizer a[data-size="lg"]').click(function(){
        changeWindowSize(resizeWidth.lg);
        closeDelay();
    });
    $('.resizer a[data-size="xl"]').click(function(){
        changeWindowSize(resizeWidth.xl);
        closeDelay();
    });
    $('#btn-duplicate').click(function(){
        duplicateWindowsInSizes();
        closeDelay();
    });
    $('#btn-reload-duplicates').click(function(){
        reloadTabsFromActive();
        closeDelay();
    });
    $('#btn-options').click(function(){
        if (chrome.runtime.openOptionsPage) {
            // New way to open options pages, if supported (Chrome 42+).
            chrome.runtime.openOptionsPage();
        } else {
            // Reasonable fallback.
            window.open(chrome.runtime.getURL('options.html'));
        }
    });

    initScrollBarWidth();
});


function closeDelay() {
    if (closeTimeout != null) {
        clearTimeout(closeTimeout);
    }
    closeTimeout = setTimeout(function(){
        close();
    }, delayToClose);
}



/**
 * To change Window size
 * @param size
 */
function changeWindowSize(size) {

    chrome.windows.getCurrent(function(window){
        console.log(window);

        chrome.windows.update(window.id, {"width":size + getScrollBarWidth()});

        updateButton();
    });
}

function updateBadge() {
    chrome.windows.getCurrent(function(window){

        var bp = getWindowBreakpoint(window);

        if (bp != undefined) {
            badgeText = " "+ bp + " ";
        } else {
            badgeText = "?";
        }

        chrome.browserAction.setBadgeText({"text": badgeText});
        chrome.browserAction.setBadgeBackgroundColor({"color":[0,0, 0, 0]});
    });
}

function updateButton() {
    chrome.windows.getCurrent({populate:true}, function(window){
        var width = window.width;
        console.log(window);

        $('.resizer a').removeClass('active');



        if (width - getScrollBarWidth() >= breakpoints.xl) {
            $('.resizer a[data-size="xl"]').addClass('active');
            // TODO If Bootstrap is used by current website
            //changeIconTo('lg', 'current');
        }
        else if (width - getScrollBarWidth() >= breakpoints.lg) {
            $('.resizer a[data-size="lg"]').addClass('active');
            // TODO If Bootstrap is used by current website
            //changeIconTo('lg', 'current');
        }
        else if (width - getScrollBarWidth() >= breakpoints.md) {
            $('.resizer a[data-size="md"]').addClass('active');
            //changeIconTo('md', 'current');
        }
        else if (width - getScrollBarWidth() >= breakpoints.sm) {
            $('.resizer a[data-size="sm"]').addClass('active');
            //changeIconTo('sm', 'current');
        }
        else if (width - getScrollBarWidth() > breakpoints.xs) {
            $('.resizer a[data-size="xs"]').addClass('active');
            //changeIconTo('xs', 'current');
        }

    });
}
