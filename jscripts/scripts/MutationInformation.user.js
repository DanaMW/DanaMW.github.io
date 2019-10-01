// ==UserScript==
// @name          MutationInformation
// @namespace     https://danamw.github.io/jscripts/scripts/MutationInformation.user.js
// @updateURL     https://raw.githubusercontent.com/danamw/danamw.github.io/master/jscripts/scripts/MutationInformation.user.js
// @icon          https://danamw.github.io/img/eyeball128.png
// @version       0.0.4
// @description   Mutation Information Script
// @author        Dana Meli
// @include       /https?://discordapp\.com/channels/*/
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant         none
// ==/UserScript==

var foo = document.getElementById('code');

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        console.log('mutation.type = ' + mutation.type);
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            console.log('  "' + mutation.addedNodes[i].textContent + '" added');
        }
        for (var i = 0; i < mutation.removedNodes.length; i++) {
            console.log('  "' + mutation.removedNodes[i].textContent + '" removed');
        }
    });
});

observer.observe(foo, {
    childList: true
});

var bar = document.createElement('div');
bar.textContent = 'bar';
console.log('before append');
foo.appendChild(bar);
foo.removeChild(bar);
console.log('after remove');