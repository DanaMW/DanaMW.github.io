// ==UserScript==
// @name          ScrollTopBottom
// @version       0.0.4
// @namespace     https://danamw.github.io/jscripts/scripts/ScrollTopBottom.user.js
// @updateURL     https://raw.githubusercontent.com/danamw/danamw.github.io/master/jscripts/scripts/ScrollTopBottom.user.js
// @icon          https://danamw.github.io/img/eyeball128.png
// @description   It makes SomeScript Darker.
// @author        Dana Meli
// @include       *://*/*
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
/* jshint esversion: 6 */
/* require-jsdoc  */

$(document).on('click', '.upButton', (function() {
    topFunction();
}));

$(document).on('click', '.downButton', (function() {
    bottomFunction();
}));

$(document).ready(function() {
    var noBtn1 = document.getElementById('#upButton')
    if (!(noBtn1)) {
        $('<div>', {
            id: 'upButton',
            class: 'upButton',
            style: 'display: none;position: fixed;bottom: 0px;right: 0px;z-index: 2147483647;font-size: 18px;border: none;outline: none;background-color: red;color: white;cursor: pointer;padding: 15px;border-radius: 4px;',
        }).appendTo('body');
    }
    var noBtn2 = document.getElementById('#downButton')
    if (!(noBtn2)) {
        $('<div>', {
            id: 'downButton',
            class: 'downButton',
            style: 'display: none;position: fixed;top: 0px;right: 0px;z-index: 2147483647;font-size: 18px;border: none;outline: none;background-color: red;color: white;cursor: pointer;padding: 15px;border-radius: 4px;',
        }).appendTo('body');
    }
});

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    // var scrollingElement = (document.scrollingElement || document.body);
    var scrollingElement = document.documentElement;
    var maX = scrollingElement.scrollHeight - 20;
    console.log('Top: ' + scrollingElement.scrollTop);
    console.log('MAX: ' + maX);
    if (scrollingElement.scrollTop > 20) {
        $('#upButton').attr('style', 'display: block;position: fixed;bottom: 0px;right: 0px;z-index: 2147483647;font-size: 18px;border: none;outline: none;background-color: red;color: white;cursor: pointer;padding: 15px;border-radius: 4px;');
    } else {
        $('#upButton').attr('style', 'display: none;');
    }
    if (scrollingElement.scrollTop > maX) {
        $('#downButton').attr('style', 'display: none;');
    } else {
        $('#downButton').attr('style', 'display: block;position: fixed;top: 0px;right: 0px;z-index: 2147483647;font-size: 18px;border: none;outline: none;background-color: red;color: white;cursor: pointer;padding: 15px;border-radius: 4px;');
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function bottomFunction() {
    var scrollingElement = (document.scrollingElm || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
}