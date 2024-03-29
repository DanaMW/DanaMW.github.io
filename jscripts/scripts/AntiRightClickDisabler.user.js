// ==UserScript==
// @name          AntiRightClickDisabler
// @namespace     https://danamw.github.io/jscripts/scripts/AntiRightClickDisabler.user.js
// @updateURL     https://raw.githubusercontent.com/danamw/danamw.github.io/master/jscripts/scripts/AntiRightClickDisabler.user.js
// @icon          https://danamw.github.io/img/eyeball128.png
// @description   restore context menus on sites that try to disable them
// @include       *://*/*
// @exclude       http://mail.google.com/*
// @exclude       https://mail.google.com/*
// @version       0.0.4
// ==/UserScript==

(function() {
    var e, i, all;
    document.onmouseup = null;
    document.onmousedown = null;
    document.oncontextmenu = null;
    all = document.getElementsByTagName("*");
    for (i = 0; i < all.length; i += 1) {
        e = all[i];
        e.onmouseup = null;
        e.onmousedown = null;
        e.oncontextmenu = null;
        e.onselectstart = null;
    }
})();

// 1 Paste this into the devtools to fix worst case
// document.removeEventListener("onmousedown",disableclick);
// document.oncontextmenu = function(){}
//
// This clears jquery binding.
// $(document).unbind();
//
// This is like mine above just base and also working
// var elements = document.getElementsByTagName("*");
// for(var id = 0; id < elements.length; ++id) { elements[id].oncontextmenu = null; }
//
// This is the BookMarkLet
// javascript:void(document.oncontextmenu=null);
// javascript:(function(){window.open('javascript:void(document.oncontextmenu=null);')})();