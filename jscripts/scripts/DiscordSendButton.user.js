// ==UserScript==
// @name         DiscordSendButton
// @namespace    https://raw.githubusercontent.com/danamw/discordweb/master/DiscordSendButton.user.js
// @updateURL    https://raw.githubusercontent.com/danamw/discordweb/master/DiscordSendButton.user.js
// @description  Adds a Send button in the Web discord.
// @version      0.0.18
// @icon         https://danamw.github.io/img/eyeball128.png
// @author       Dana Meli
// @author       zerebos
// @include      /https?://discordapp\.com/channels/*/
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://raw.githubusercontent.com/uzairfarooq/arrive/master/minified/arrive.min.js
// ==/UserScript==
/* jshint esversion: 6 */
/* require-jsdoc  */

$(document).on('click', '#clear-text', (function() {
    $('div[class^="channelTextArea"] textarea').val('').text('');
    $(document).on('keydown.preventSend', function(e) {
        var isFocused = $('div[class^="channelTextArea"] textarea').is(':focus');
        var isCleared = $('div[class^="channelTextArea"] textarea').val() == '';
        if (isFocused) {
            if (e.keyCode == 13) {
                if (isCleared) {
                    e.preventDefault();
                    return false;
                } else {
                    $(document).off('keydown.preventSend');
                }
            }
        }
    });
}));

$(document).on('click', '#submit-text', (function(event) {
    if ($('textarea').val() === '') {
        return;
    }
    event.preventDefault();
    var textarea = $(this).siblings('textarea');
    const press = new KeyboardEvent("keypress", {
        key: "Enter",
        code: "Enter",
        which: 13,
        keyCode: 13,
        bubbles: true
    });
    Object.defineProperties(press, {
        keyCode: {
            value: 13
        },
        which: {
            value: 13
        }
    });
    textarea[0].dispatchEvent(press);
}));

$(document).arrive('div[class^=channelTextArea] textarea', function() {
    var noBtn1 = $('#submit-text').length == 0;
    if (noBtn1) {
        $('div[class^=channelTextArea] textarea', function() {
            $('<div>', {
                id: 'submit-text',
                class: 'submit-text',
                title: 'Sends your text as if you hit enter.',
                style: 'position: absolute; right:100px; top: 12px; height:22px; width: 22px; text-align: center; background: url("data:image/png;base64,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")',
            }).insertAfter('div[class^=channelTextArea] textarea');
        });
    }
    var noBtn2 = $('#clear-text').length == 0;
    if (noBtn2) {
        $('div[class^=channelTextArea] textarea', function() {
            $('<div>', {
                id: 'clear-text',
                class: 'clear-text',
                title: 'Clears the text area.',
                style: 'position: absolute; right:130px; top: 12px; height:22px; width: 22px; text-align: center; background: url("data:image/png;base64,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AAAAAAgLCCEICP//CH8IDAhr//8HDwcHBwf//wYeBgYGJ///BXUFRQVO//8FewUFBWv//wQEBAgEBP//BEQEQwQE//8DAwNlGBj//25uh4e40f//5P/cUtvb///W3cEnsxv//7oDx8fV3f//1dXV58fH//+rq3rmQkL//3qqAwMEBP//BgYGNAYx//8HBwdpBwf//wgqCAgICP//CAgICAgI//8JfwkJCQn//xAQEBwQbv//AAcHBwcHB///BgYGBgYG//8GBgYGBgb//wUMBUAFBf//BAQEBAQE//8EBARRBAT//wMDAwMDA///AwMDAwMD//8DAwMDA0P//wIQAgICAv//UVEBSSOX///s7D9yPz///+X5MXwjI///z88AOgAK///v7wBEAGL//8DyAgIDN///BQUFBQUH//8GBgYGBlT//wYGBgYGN///B1QHJAdu//8ICAh8CAj//xAQEBAQdP//AAUFBXwFBf//BCQEBAQE//8EBAREBAT//wQaBAQEg///AxQDAwMw//8DAwMDA1r//wICAgICcP//AgICGgIT//8CagJUAoH//wInAlwCd///AgICJwIC//8CAgICAQH//zlMAQEBN///SWABAQEg//8DKQMEAwP//wN+AyQDJf//BAQEegRE//8EBAQEBF3//wQEBAQEBP//BQUFZwUu//8FUgUFBQX//xAQEBAQEP//AAxoDAwMGf//CwsLZQsL//8KCgoKCgr//wk/CQkJCf//CA4ICAhW//8GBgZ+Bgb//wUFBQUFBf//BAQEBAQE//8DTwMDAwP//wN/A3sDA///AxYDAwMr//8DAwMOAzL//wQEBFUEHP//BQUFBQVi//8GOAYGBgr//wgICAgICP//CXgJXglI//8KCgooCnb//wsLCwsLDv//DE8MXwwM//8ODg4ODkz//xAxEBAQEP//ARQUFGYUJf///mn+1v7uAAD+Dv7U/jUAAP6a/ib+LAAA/hf+JP6YAAD+Hv6w/v4AAP7v/v7+SQAA/r3+/v6zAAD+/v4P/mwAAP8G/xn/0gAAAGkA1QAVAAABkQF3AQAAAAICAr8CrQAAAh0C4QI5AAACDAIHAssAAALdAiICAgAAAgIC9QICAAACAgIvAgIAAAICAvECAgAAAgICEQIWAAACWQIPAlIAAPqj+pj6pwAABAgICPgIaAAA/Zz93f3+AAD9/f0G/a0AAP0Z/d39nwAA/dT9Q/0OAAD+GP4E/vQAAP3C/Vj9uAAAAAIAogACAAD/Nf/w/5MAAP/I/+7//gAAAPIAAAAjAAABXwGLAd8AAAKlAhQCWQAAA+gD8gP1AAADAwNcA18AAAIEAqkC5QAAAwMDAwPFAAADAwPeAwMAAAMDA1oDHQAAAx0DBQPpAAAC+AKmAg8AAPs4+wH78AAAAxZ+FvUW3oCAAs4CAgLJAAACAgICAvsAAAHzAQEBSAAAAQEBzAEnAAAAQwABANcAAAAbANIAAAAA/9j/av9+AAD/Jv/J/78AAP/e////JgAAABkAAABBAAACrgIQAiQAAAOBA/QD7gAABOkEBAQzAAADSwPXA5wAAAXeBQUF5gAABQIFMQUFAAAGLQZcBgYAAAVfBaQFRgAABusGLAb6AAAH0Af8B/YAAPfb9yz3LwAA5eOd9udvwEMAAAAASUVORK5CYII=")',
            }).insertAfter('div[class^=channelTextArea] textarea');
        });
    }
    $('<style>')
        .prop('type', 'text/css')
        .html('.submit-text:hover { background-image: url("data:image/png;base64,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") !important; } .clear-text:hover { background-image: url("data:image/png;base64,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") !important;} button [class*="buttonWrapper"][class*="button"][class*="lookBlank"][class*="colorBrand"][class*="grow"] { display: none !important;}').appendTo('head');
});