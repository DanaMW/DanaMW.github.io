// ==UserScript==
// @name          RedirectSearchesToGoogle
// @version       0.0.4
// @namespace     https://danamw.github.io/jscripts/scripts/RedirectSearchesToGoogle.user.js
// @updateURL     https://raw.githubusercontent.com/danamw/danamw.github.io/master/jscripts/scripts/RedirectSearchesToGoogle.user.js
// @icon          https://danamw.github.io/img/eyeball128.png
// @description   Go to Google.
// @author        Dana Meli
// @match         *://*/*
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require       https://raw.githubusercontent.com/uzairfarooq/arrive/master/minified/arrive.min.js
// ==/UserScript==
/* jshint esversion: 6 */
/* require-jsdoc  */

(function() {
    'use strict';

    function convertURL(url) {
        var querystringparams = getUrlVars(url);
        var source = getKeyValue(querystringparams, 'form');
        url = url.replace(/%20/g, '+');
        var uri = /\?q\=([0-9a-zA-Z-._~:\/?#[\]@!$'()*+,;=%]*)($|(\&))/.exec(url)[1];
        return 'https://www.google.com/search?q=' + uri;
    }

    function getUrlVars(url) {
        var vars = [],
            hash;
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function getKeyValue(dictionary, key) {
        if (key in dictionary) {
            return dictionary[key];
        }
        return '';
    }
    chrome.storage.onChanged.addListener(function(changes /*, namespace*/ ) {
        chrome.webRequest.onBeforeRequest.addListener(function(details) {
            var newurl = convertURL(details.url);
            if (newurl !== details.url) {
                return {
                    redirectUrl: convertURL(details.url)
                };
            }
        }, {
            urls: ['*://*.bing.com/search*']
        }, ['blocking']);
        // Fallback when Chrome is not already running
        chrome.runtime.onMessage.addListener(onMessage);

        function onMessage(request, sender, callback) {
            if (request.action === 'convertURL') {
                callback(convertURL(request.url));
            }
            return true;
        }
    });
});