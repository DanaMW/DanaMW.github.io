// ==UserScript==
// @name          YouTubeNoGuide
// @version       0.0.5
// @namespace     https://danamw.github.io/jscripts/scripts/YouTubeNoGuide.user.js
// @updateURL     https://raw.githubusercontent.com/danamw/danamw.github.io/master/jscripts/scripts/YouTubeNoGuide.user.js
// @icon          https://danamw.github.io/img/eyeball128.png
// @description   Bye Bye YT Guide.
// @author        Dana Meli-Wischman
// @grant         GM_registerMenuCommand
// @grant         GM_unregisterMenuCommand
// @grant         GM_getValue
// @grant         GM_setValue
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require       https://raw.githubusercontent.com/uzairfarooq/arrive/master/minified/arrive.min.js
// ==/UserScript==
/* jshint esversion: 6 */
/* eslint-disable require-jsdoc */

// json.stringify store json.parse retrieve

// $(document).arrive('app-drawer', function() {
$('*app-drawer[id="guide"]').removeProp('opened');
$('ytd-app', function() {
    var $newElem = $(this);
    var whatElem = $(this).text();
    $newElem.removeProp('guide-persistent-and-visible');
    console.log('It Arrived 0: ' + whatElem);
    // $newElem.removeAttr('opened');
    // $newElem.removeAttr('opened');
    // $newElem.removeAttr('hidden');
});

$('.style-scope.ytd-app', function() {
    var $newElem1 = $(this);
    var whatElem1 = $(this).text();
    $newElem1.removeProp('opened');
    console.log('It Arrived 1: ' + whatElem1);
    // $newElem1.removeAttr('opened');
    // $newElem1.removeAttr('hidden');
});

$('.style-scope.ytd-app', function() {
    var $newElem1 = $(this);
    var whatElem1 = $(this).text();
    $newElem1.removeProp('opened');
    console.log('It Arrived 1: ' + whatElem1);
    // $newElem1.removeAttr('opened');
    $newElem1.removeProp('hidden');
});

$('button[aria-label="Guide"]', function() {
    var $newElem2 = $(this);
    var whatElem2 = $(this).text();
    $newElem2.prop('aria-pressed', 'false');
    console.log('It Arrived 2: ' + whatElem2);
    $newElem2.removeProp('opened');
    $newElem2.removeProp('hidden');

});

// $(document).arrive('.style-scope.app-drawer', function() {
//    var $newElem = $(this);
//        console.log('It Arrived 2: ' +$newElem.text());
//        $newElem.removeAttr('opened');
// });
// $(document).arrive('.style-scope.ytd-app', function() {
//    var $newElem = $(this);
//        console.log('It Arrived 3: ' +$newElem.text());
//        $newElem.removeAttr('opened');
//        $newElem.removeAttr('hidden');
// });
// $(document).arrive('div[id="header"]', function() {
//    var $newElem = $(this);
//        console.log('It Arrived 4: ' +$newElem.text());
//        $newElem.removeAttr('opened');
//        $newElem.removeAttr('hidden');
// });