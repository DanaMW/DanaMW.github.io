// ==UserScript==
// @name          AutoRefreshTwitter
// @version       0.0.3
// @namespace     http://192.168.0.13/jscript/scripts/AutoRefreshTwitter.user.js
// @updateURL     http://192.168.0.13/jscript/scripts/AutoRefreshTwitter.user.js
// @description   It makes Twitter auto refresh.
// @icon          http://192.168.0.3/image/eyeball128.png
// @author        Dana Meli
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