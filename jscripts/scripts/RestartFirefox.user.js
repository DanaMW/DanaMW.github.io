// ==UserScript==
// @name          RestartFirefox
// @namespace     https://danamw.github.io/jscripts/scripts/RestartFirefox.user.js
// @updateURL     https://raw.githubusercontent.com/danamw/danamw.github.io/master/jscripts/scripts/RestartFirefox.user.js
// @icon          https://danamw.github.io/img/eyeball128.png
// @version       0.0.6
// @description   Some Damn UserScript
// @author        Dana Meli-Wischman
// @match         *://*/*
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant         none
// ==/UserScript==


(function() {
    try {
        CustomizableUI.createWidget({
            id: 'restart-button',
            type: 'custom',
            defaultArea: CustomizableUI.AREA_NAVBAR,
            onBuild: function(aDocument) {
                var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                toolbaritem.onclick = event => onClick(event);
                var props = {
                    id: 'restart-button',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: 'Restart',
                    tooltiptext: 'Restart (with middle click userChrome.js cache is emptied)',
                    style: 'list-style-image: url(chrome://browser/skin/sync.svg)'
                };
                for (var p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
    } catch (e) {};

    function onClick(event) {
        if (event.button == 1)
            Services.appinfo.invalidateCachesOnRestart();
        else if (event.button == 2)
            return;
        let cancelQuit = Cc["@mozilla.org/supports-PRBool;1"].createInstance(Ci.nsISupportsPRBool);
        Services.obs.notifyObservers(cancelQuit, "quit-application-requested", "restart");
        if (!cancelQuit.data)
            Services.startup.quit(Services.startup.eAttemptQuit | Services.startup.eRestart);
    }
})();

// $(document).on('click', 'restart', (function() {
//    Services.obs.notifyObservers(cancelQuit, "quit-application-requested", "restart");
//    let flags = Ci.nsIAppStartup.eAttemptQuit | Ci.nsIAppStartup.eRestartNotSameProfile;
//    Services.startup.quit(false);
// }));