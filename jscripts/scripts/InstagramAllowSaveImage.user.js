// ==UserScript==
// @name          InstagramAllowSaveImage
// @namespace     https://danamw.github.io/jscripts/scripts/InstagramAllowSaveImage.user.js
// @updateURL     https://raw.githubusercontent.com/danamw/danamw.github.io/master/jscripts/scripts/InstagramAllowSaveImage.user.js
// @icon          https://danamw.github.io/img/eyeball128.png
// @include       https://www.instagram.com/*
// @version       1.16
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant         none
// @run-at        document-end
// @description Allow "Save image as..." on context menu of Instagram.
// @description KNOWN ISSUE: can't save videos.
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

//console.log("instagram_allow_saveimage start");

function main() {
    $("img").each(function() {
        $(this).removeAttr("srcset");
        $(this).removeAttr("sizes");
        var $parent = $(this).parent("div");
        //console.log("$parent="+$parent);
        if ($parent === null || $parent === undefined) {
            return;
        }
        var $next = $parent.next("div");
        //console.log("$next="+$next);
        if ($next === null || $next === undefined) {
            return;
        }
        var $next2 = $next.next("div");
        //console.log("$next2="+$next2);
        if ($next2 !== null || $next2 !== undefined) {
            var next2_classname = $next2.attr("class");
            if (next2_classname !== undefined) {
                //console.log("next2_classname="+next2_classname);
                return;
            }
        }
        var classname = $next.attr("class");
        //console.log("classname="+classname);
        /*
        var parent_classname = $parent.attr("class");
        //console.log("parent_classname="+parent_classname);
        if ( classname === "_b0xvl" ) {
        	return;
        }
        */
        var kids = $next.children();
        //console.log("len="+kids.length);
        if (kids.length === 0) {
            //console.log("hide: classname="+classname);
            $next.hide();
        } else {
            //console.log("show: classname="+classname);
            $next.show();
        }
    });

}
var observer = new MutationObserver(function(mutations) {
    observer.disconnect();
    main();
    observer.observe(document, config);
});
var config = {
    attributes: true,
    childList: true,
    characterData: false,
    subtree: true
};
observer.observe(document, config);