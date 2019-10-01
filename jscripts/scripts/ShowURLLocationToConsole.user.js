// ==UserScript==
// @name          ShowURLLocationToConsole
// @namespace     https://danamw.github.io/jscripts/scripts/ShowURLLocationToConsole.user.js
// @updateURL     https://raw.githubusercontent.com/danamw/danamw.github.io/master/jscripts/scripts/ShowURLLocationToConsole.user.js
// @icon          https://danamw.github.io/img/eyeball128.png
// @version       0.0.6
// @description   Some Damn UserScript
// @author        Dana Meli
// @match         *://*/*
// @grant         none
// ==/UserScript==

console.log('-=-=-=-=-=-=-=[Loading From Location]->: ' + location.href);

// javascript:void(document.oncontextmenu=null);
// window.oncontextmenu = null;
// var elements = document.getElementsByTagName("*");
// for(var id = 0; id < elements.length; ++id) { elements[id].oncontextmenu = null; }

// Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0
// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3510.2 Safari/537.36