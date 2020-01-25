// ==UserScript==
// @name         GoogleImageView
// @version      0.0.8
// @namespace    https://raw.githubusercontent.com/danamw/GoogleImageView/master/GoogleImageView.user.js
// @updateURL    https://raw.githubusercontent.com/danamw/GoogleImageView/master/GoogleImageView.user.js
// @author       Dana Meli
// @author       (Original) narcknowitallinsomniacass (But no one likes a know it all ass)
// @icon         https://danamw.github.io/img/eyeball128.png
// @description  A new view image replacement used on Google Image Search
// @homepage	 https://github.com/DanaMW/Google-Direct-Image-Links-Redux-Observer
// @include      /^https?://www\.google\.com?(\.[a-z]{2})?/(imgres|search.*tbm=isch).*$/
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

function main() {
    $('#irc_cc > div[style*="translate3d(0px, 0px, 0px)"]:not([style*="visibility: hidden;"])').each(function() {
        var $this = $(this);
        var imgSrc = $this.find('.irc_mi').attr('src');
        var btnSib = $this.find('.irc_but_r tr > td:first-child > a:only-child');

        $('<a>', {
            class: 'img_btn',
            rel: 'noopener',
            referrerpolicy: 'origin',
            target: '_blank',
            html: '<span class="RL3J9c" style="display: inline-block!important;" ><svg xmlns="http://www.w3.org/2000/svg" class="RL3J9c" focusable="false" width="14" height="14" fill="currentColor" viewBox="0 0 2048 1792"><path d="M704 576q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1024 384v448h-1408v-192l320-320 160 160 512-512zm96-704h-1600q-13 0-22.5 9.5t-9.5 22.5v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5v-1216q0-13-9.5-22.5t-22.5-9.5zm160 32v1216q0 66-47 113t-113 47h-1600q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1600q66 0 113 47t47 113z"/></span><span class="Tl8XHc">Image</span>',
            style: 'text-decoration: none!important;'
        }).insertBefore(btnSib);
        $this.find('.img_btn').attr('href', imgSrc);
    });
}

var observer = new MutationObserver(function(mutations) {
    observer.disconnect();
    main();
    observer.observe(document, config);
});

var config = {
    attributes: true,
    subtree: true
};

observer.observe(document, config);