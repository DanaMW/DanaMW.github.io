// ==UserScript==
// @name          AutoRefreshTwitter
// @version       0.0.5
// @namespace     https://danamw.github.io/jscripts/scripts/AutoRefreshTwitter.user.js
// @updateURL     https://raw.githubusercontent.com/danamw/danamw.github.io/master/jscripts/scripts/AutoRefreshTwitter.user.js
// @icon          https://danamw.github.io/img/eyeball128.png
// @description   It makes Twitter auto refresh.
// @author        Dana Meli-Wischman
// @include       https://*.twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

setTimeout(function() {
    location.reload();
}, 60000);

// var meta = document.createElement('meta');
// meta.httpEquiv = "refresh";
// meta.content = "15;url=https://twitter.com/";
// document.getElementsByTagName('head')[0].appendChild(meta);


// Working SAVE
// var meta = document.createElement('meta');
// meta.httpEquiv = "X-UA-Compatible";
// meta.content = "15;url=https://twitter.com/";
// document.getElementsByTagName('head')[0].appendChild(meta);