// ==UserScript==
// @name          Bing2Google
// @version       0.0.1
// @namespace     https://danamw.github.io/jscripts/scripts/Bing2Google.user.js
// @updateURL     https://raw.githubusercontent.com/danamw/danamw.github.io/master/jscripts/scripts/Bing2Google.user.js
// @icon          https://danamw.github.io/img/eyeball128.png
// @description   Go to Google.
// @author        Dana Meli
// @match         *://*/*
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
/* jshint esversion: 6 */
/* require-jsdoc  */

// match pattern for the URLs to redirect
let searchTerms = "";
let pattern = "https://www.bing.com/*";

// redirect function returns a Promise
// which is resolved with the redirect URL when a timer expires
function redirectAsync(requestDetails) {
  let regex = "q=(.*?)(&|$)";
  let redirectUrl = "https://google.com";
  
  if (requestDetails.url.match(regex)) {
	  searchTerms = requestDetails.url.match(regex);
	  searchTerms = searchTerms[1];
	  redirectUrl = redirectUrl + "/search?q=" + searchTerms;
  }

  let asyncCancel = new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve({redirectUrl});
    }, 10);
  });
    
  console.log(asyncCancel);
  return asyncCancel;
}

// add the listener,
// passing the filter argument and "blocking"
browser.webRequest.onBeforeRequest.addListener(
  redirectAsync,
  {urls: [pattern], types: ["main_frame"]}, 
  ["blocking"]
);