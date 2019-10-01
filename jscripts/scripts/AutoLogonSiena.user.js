// ==UserScript==
// @name          AutoLogonSiena
// @namespace     http://192.168.0.3/jscripts/scripts/AutoLogonSiena.user.js
// @updateURL     http://192.168.0.3/jscripts/scripts/AutoLogonSiena.user.js
// @version       0.0.4
// @description   Our Open Router Auto logon Script
// @author        Dana Meli
// @icon          http://192.168.0.3/image/eyeball128.png
// @include       http://204.98.64.46:1111*
// @include       http://*sienasuiteshotel.com*
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant         GM_addStyle
// @grant         window.close
// ==/UserScript==

var given = location.href;
var expect = 'http://www.sienasuiteshotel.com/';
if (given == expect) {
    console.log('DEBUG: Setting windows close on page not there');
    setTimeout(window.close, 1000);
}

var still = 'Error Message';
var good = document.title;
if (still == good) {
    console.log('DEBUG: Setting windows close on still good');
    setTimeout(window.close, 1000);
}

// Here is where I am trying to Auto Login
$(document).ready(function() {
    var maybe = 'Login';
    var ihope = document.title;
    if (maybe == ihope) {
        $('input[type="submit"]').trigger('focus');
        $('input[type="submit"]').focus();
        var isFocused = $('input[type="submit"]').is(':focus');
        if (isFocused) {
            console.log('DEBUG: Got is focused');
            var e = jQuery.Event('keydown', {
                keyCode: 13
            });
            jQuery('input[type="submit"]').trigger(e);
        }
        console.log('DEBUG: Trying to Log in');
    }
});