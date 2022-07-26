// ==UserScript==
// @name          BrowserScrollbars
// @namespace     https://danamw.github.io/jscripts/scripts/BrowserScrollbars.user.js
// @updateURL     https://raw.githubusercontent.com/danamw/danamw.github.io/master/jscripts/scripts/BrowserScrollbars.user.js
// @icon          https://danamw.github.io/img/eyeball128.png
// @version       0.0.4
// @description   Some Damn BrowserScrollbars
// @author        Dana Meli-Wischman
// @match         *://*/*
// @grant         none
// ==/UserScript==

// @-moz-document regexp("https?://.*") {
var injCSS = `
/* Codemirror */
.CodeMirror-vscrollbar,
.CodeMirror-hscrollbar,
.CodeMirror-scrollbar-filler {
    background: hsl(0, 0%, 6%)!important;
}
.resize-grip {
	background: inherit!important;
}
/* Browser */
::-webkit-scrollbar {
	background: hsl(0, 0%, 6%)!important;
	border: thin solid hsl(0, 0%, 20%)!important;
	display: initial!important;
	height: 13px!important;
	max-height: 13px!important;
	max-width: 13px!important;
	min-height: 13px!important;
	min-width: 13px!important;
	padding: 0!important;
	width: 13px!important;
}
::-webkit-scrollbar-button {
	display: none!important;
}
::-webkit-scrollbar-button:single-button {
	border: thin solid hsl(0, 0%, 20%)!important;
	display: block!important;
	height: 13px!important;
	margin: 0!important;
	max-height: 13px!important;
	max-width: 13px!important;
	min-height: 13px!important;
	min-width: 13px!important;
	width: 13px!important;
}
::-webkit-scrollbar-button:horizontal {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgFDhoaUbP33wAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAdElEQVQoz83SsQ1BARQF0BudsILeBDoxiTns8EtT2OLHBDoVDZFI9BqRo1AQUbxfcet3invzkr8Ihph2AWM02FTBHGtccKiAJbaeuWNXQSevXLH/vOl9cU2SNsktST+JaqcZVjjj2GW9ERbl9d7gAJPffcoD60Zo/GBzO+QAAAAASUVORK5CYII=)!important;
	background-size: cover!important;
	background-repeat: no-repeat!important;
	background-color: hsl(0, 0%, 6%)!important;
	border-bottom-right-radius: 3px!important;
	border-top-right-radius: 3px!important;
}
::-webkit-scrollbar-button:horizontal:active {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgFDhs56s+37AAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAd0lEQVQoz83SsQnCUBQF0AMWFskI2meCdJJJnCM7WGYK13CCdKlikyAIgqVdSJpvIwH/r/Q2r3mHB5fHvyTHIQUUOKGNBUdc8MAQAxp0mDGhj0G3AGa8cP1c2KygCVvswnyG619T4Yw7xpT29qhT2nsnQ/m7N1kACdwUrJ0jQzwAAAAASUVORK5CYII=)!important;
	background-color: hsl(0, 0%, 40%)!important;
}
::-webkit-scrollbar-button:horizontal:decrement:not(:active):hover {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgFDhs56s+37AAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAd0lEQVQoz83SsQnCUBQF0AMWFskI2meCdJJJnCM7WGYK13CCdKlikyAIgqVdSJpvIwH/r/Q2r3mHB5fHvyTHIQUUOKGNBUdc8MAQAxp0mDGhj0G3AGa8cP1c2KygCVvswnyG619T4Yw7xpT29qhT2nsnQ/m7N1kACdwUrJ0jQzwAAAAASUVORK5CYII=)!important;
	background-color: hsl(0, 0%, 60%)!important;
}
::-webkit-scrollbar-button:horizontal:increment {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgFDhMBChSFegAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAdElEQVQoz83QIQoCUQCE4QmCQa9g9wQ28SSeYaN38CQeYlnwBEaLFmVBsBssn0FBEMN7Sf80YX4GJvkZmGFUK+2wwqRGOuOCDRal0sGTOzo0JdIRN2/6z87gm5dk+Mr7JG3J0glXbLGseW+Nac17c4zzFzwANftoDW4riZUAAAAASUVORK5CYII=)!important;
	background-size: cover!important;
	background-repeat: no-repeat!important;
	background-color: hsl(0, 0%, 6%)!important;
	border-bottom-left-radius: 3px!important;
	border-top-left-radius: 3px!important;
}
::-webkit-scrollbar-button:horizontal:increment:active {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgFDhUjiS5jGAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAeUlEQVQoz83RsQnCcBTE4Q8UBHWQTGAnTpIZ3COTOEDKEMgEljbaJAQEOwsLm3+aVBLCs9KrHsf9OI7HL7XDZi6wmPBKrNHiGW3qcMcJhyh0RcIbNY4R6IbXCCb0n4HlBJSwGu8LqkhTiwca5NFNZxTIvvnTHlt/oQHnWRWTSdNqYQAAAABJRU5ErkJggg==)!important;
	background-color: hsl(0, 0%, 40%)!important;
}
::-webkit-scrollbar-button:horizontal:increment:not(:active):hover {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgFDhUjiS5jGAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAeUlEQVQoz83RsQnCcBTE4Q8UBHWQTGAnTpIZ3COTOEDKEMgEljbaJAQEOwsLm3+aVBLCs9KrHsf9OI7HL7XDZi6wmPBKrNHiGW3qcMcJhyh0RcIbNY4R6IbXCCb0n4HlBJSwGu8LqkhTiwca5NFNZxTIvvnTHlt/oQHnWRWTSdNqYQAAAABJRU5ErkJggg==)!important;
	background-color: hsl(0, 0%, 60%)!important;
}
::-webkit-scrollbar-button:vertical:decrement {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgFDgonQxmpnwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAc0lEQVQoz+XRMUoCAACF4Q/BSa/gHjl1Alu8QwguXcC7eApPIXQJt2iKjhAk+DcoJDjonP/8vulxJ1Wr6rNa3wpm1bZju2p5DUyqTfXTX2/Vw/lucAZGWOAZQ3zjgEe8VuMLhClesMc7vvBxwnM8/ecffwFSoEVS/hyFWgAAAABJRU5ErkJggg==)!important;
	background-size: cover!important;
	background-repeat: no-repeat!important;
	background-color: hsl(0, 0%, 6%)!important;
	border-bottom-left-radius: 3px!important;
	border-bottom-right-radius: 3px!important;
}
::-webkit-scrollbar-button:vertical:decrement:active {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgFDgo6IB/FRgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAc0lEQVQoz+XRoQ2DYBiE4YfUkEDqEfW1TNA5EFUdAM0aTNEpSKqwKAZogkJgmpDUgPkFqFa3py757r1PHP+jEgPqb4ELGizocf0EnHDHO0ALHjhvQ4eNT3BDgSPmcE8RoQ1lOyhHhRgjXpjCtwwdnr864go2lhOp4XYeZgAAAABJRU5ErkJggg==)!important;
	background-color: hsl(0, 0%, 40%)!important;
}
::-webkit-scrollbar-button:vertical:decrement:not(:active):hover {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgFDgo6IB/FRgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAc0lEQVQoz+XRoQ2DYBiE4YfUkEDqEfW1TNA5EFUdAM0aTNEpSKqwKAZogkJgmpDUgPkFqFa3py757r1PHP+jEgPqb4ELGizocf0EnHDHO0ALHjhvQ4eNT3BDgSPmcE8RoQ1lOyhHhRgjXpjCtwwdnr864go2lhOp4XYeZgAAAABJRU5ErkJggg==)!important;
	background-color: hsl(0, 0%, 60%)!important;
}
::-webkit-scrollbar-button:vertical:increment {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgFDTUIslAAowAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAdUlEQVQoz+XPIQoCUQCE4XnJ4Daz3UuIJ9lsNHoH457CUwhWD+ANBEGzYUG+Da6IsIhZ/zQwDDOT/B7lKTBP0iSZJGl7T5JRkmuSZSnl8JZGhQ0uuOPmwRlrjAdrMcPeixZbTD/uRY1jH9ph8dVRNDhhlT+hA0tUX1KVJjAXAAAAAElFTkSuQmCC)!important;
	background-size: cover!important;
	background-repeat: no-repeat!important;
	background-color: hsl(0, 0%, 6%)!important;
	border-top-left-radius: 3px!important;
	border-top-right-radius: 3px!important;
}
::-webkit-scrollbar-button:vertical:increment:active {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgFDgUlKo/UfAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAaUlEQVQoz+XPsQmDUAAE0NfHFdI7gZ1kEmdI6Q6WTuEUQiZIl8o0CYGAvYUg3+aXitZ6zcFxx91xbOR44oMO78jfqGdLoQQVekwYEPBHictaW4pHNAeMaHDdmlngFUMtbnv/1fjh7iSYAfRHFgTlUa3mAAAAAElFTkSuQmCC)!important;
	background-color: hsl(0, 0%, 40%)!important;
}
::-webkit-scrollbar-button:vertical:increment:not(:active):hover {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgFDgUlKo/UfAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAaUlEQVQoz+XPsQmDUAAE0NfHFdI7gZ1kEmdI6Q6WTuEUQiZIl8o0CYGAvYUg3+aXitZ6zcFxx91xbOR44oMO78jfqGdLoQQVekwYEPBHictaW4pHNAeMaHDdmlngFUMtbnv/1fjh7iSYAfRHFgTlUa3mAAAAAElFTkSuQmCC)!important;
	background-color: hsl(0, 0%, 60%)!important;
}
::-webkit-scrollbar-corner {
	background: hsl(0, 0%, 6%)!important;
	border: 0!important;
}
::-webkit-scrollbar-thumb {
	background: hsl(0, 0%, 22%)!important;
	background-clip: content-box!important;
	border: solid transparent!important;
	border-radius: 3px!important;
	box-shadow: inset 0 0 0 1px hsl(0, 0%, 42%)!important;
}
::-webkit-scrollbar-thumb:active {
	background: hsl(0, 0%, 38%)!important;
	background-clip: content-box!important;
	box-shadow: inset 0 0 0 1px hsl(0, 0%, 58%)!important;
	transition: none!important;
}
::-webkit-scrollbar-thumb:horizontal {
	border-width: 2px 0!important;
}
::-webkit-scrollbar-thumb:not(:active):hover {
	background: hsl(0, 0%, 30%)!important;
	background-clip: content-box!important;
	box-shadow: inset 0 0 0 1px hsl(0, 0%, 50%)!important;
}
::-webkit-scrollbar:disabled,
::-webkit-scrollbar-thumb:vertical {
	border-width: 0 2px!important;
}
::-webkit-scrollbar:disabled,
::-webkit-scrollbar-button:single-button:disabled,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
	visibility: hidden!important;
}
/* Resize for zoom up to 150% */
@media (min-resolution: 1.1dppx) {
    ::-webkit-scrollbar, ::-webkit-scrollbar-button:single-button, ::-webkit-scrollbar-corner {
		zoom: .95;
	}
}
@media (min-resolution: 1.15dppx) {
	::-webkit-scrollbar, ::-webkit-scrollbar-button:single-button, ::-webkit-scrollbar-corner {
		zoom: .9;
	}
}
@media (min-resolution: 1.2dppx) {
	::-webkit-scrollbar, ::-webkit-scrollbar-button:single-button, ::-webkit-scrollbar-corner {
		zoom: .85;
	}
}
@media (min-resolution: 1.25dppx) {
	::-webkit-scrollbar, ::-webkit-scrollbar-button:single-button, ::-webkit-scrollbar-corner {
		zoom: .8;
	}
    ::-webkit-scrollbar:disabled,
	::-webkit-scrollbar-thumb:vertical {
		border-width: 0 1.6px!important;
		box-shadow: inset 0 0 0 .8px hsl(0, 0%, 50%)!important;
	}
	::-webkit-scrollbar:disabled,
	::-webkit-scrollbar-thumb:horizontal {
		border-width: 1.6px 0!important;
		box-shadow: inset 0 0 0 .8px hsl(0, 0%, 50%)!important;
	}
}
@media (min-resolution: 1.35dppx) {
	::-webkit-scrollbar,
	::-webkit-scrollbar-button:single-button,
	::-webkit-scrollbar-corner {
		zoom: .75;
	}
}
@media (min-resolution: 1.45dppx) {
	::-webkit-scrollbar,
	::-webkit-scrollbar-button:single-button,
	::-webkit-scrollbar-corner {
		zoom: .7;
	}
	::-webkit-scrollbar:disabled,
	::-webkit-scrollbar-thumb:vertical {
		border-width: 0 1.4px!important;
		box-shadow: inset 0 0 0 .7px hsl(0, 0%, 50%)!important;
	}
	::-webkit-scrollbar:disabled,
	::-webkit-scrollbar-thumb:horizontal {
		border-width: 1.4px 0!important;
		box-shadow: inset 0 0 0 .7px hsl(0, 0%, 50%)!important;
	}
}
`;
// }