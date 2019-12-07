// ==UserScript==
// @name         Discord FormatText
// @namespace    file:///D:/Development/_JS Scripting/Discord FormatText.user.js
// @version      0.0.3
// @description  Some Damn UserScript
// @author       Dana Meli
// @icon         https://danamw.github.io/img/eyeball128.png
// @include      /https?://discordapp\.com/channels/*/
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        GM_addStyle
// ==/UserScript==
/* jshint esversion: 6 */
/* require-jsdoc  */


class BetterDiscordFormat {
    getName() {
        return 'Discord FormatText';
    }
    getShortName() {
        return 'DFormatText';
    }
    getDescription() {
        return 'Enables different types of formatting in Web Discord chat.';
    }
    getVersion() {
        return '0.0.1';
    }
    getAuthor() {
        return 'Dana Meli';
    }
    this.isOpen = true;
    this.initialized = true;
    this.replaceList = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}";
    this.smallCapsList = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ{|}";
    this.superscriptList = " !\"#$%&'⁽⁾*⁺,⁻./⁰¹²³⁴⁵⁶⁷⁸⁹:;<⁼>?@ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁνᵂˣʸᶻ[\\]^_`ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ{|}";
    this.upsideDownList = " ¡\"#$%℘,)(*+'-˙/0ƖᄅƐㄣϛ9ㄥ86:;>=<¿@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMXλZ]\\[^‾,ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz}|{";
    this.fullwidthList = "　！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝";
    this.leetList = " !\"#$%&'()*+,-./0123456789:;<=>?@48CD3FG#IJK1MN0PQЯ57UVWXY2[\\]^_`48cd3fg#ijk1mn0pqЯ57uvwxy2{|}";
    this.thiccList = "　!\"#$%&'()*+,-./0123456789:;<=>?@卂乃匚刀乇下厶卄工丁长乚从ん口尸㔿尺丂丅凵リ山乂丫乙[\\]^_`卂乃匚刀乇下厶卄工丁长乚从ん口尸㔿尺丂丅凵リ山乂丫乙{|}";
    this.toolbarString = `<div id="dfformat" class='df-toolbar'><div class='df-arrow'></div></div>`;
    this.discordWrappers = {
        bold: '**',
        italic: '*',
        underline: '__',
        strikethrough: '~~',
        code: '`',
        codeblock: '```'
    };
    this.defaultSettings = {
        toolbar: {
            bold: {
                enabled: true,
                order: 0
            },
            italic: {
                enabled: true,
                order: 1
            },
            underline: {
                enabled: true,
                order: 2
            },
            strikethrough: {
                enabled: true,
                order: 3
            },
            code: {
                enabled: true,
                order: 4
            },
            codeblock: {
                enabled: true,
                order: 5
            },
            superscript: {
                enabled: true,
                order: 6
            },
            smallcaps: {
                enabled: true,
                order: 7
            },
            fullwidth: {
                enabled: true,
                order: 8
            },
            upsidedown: {
                enabled: true,
                order: 9
            },
            varied: {
                enabled: true,
                order: 10
            },
            leet: {
                enabled: false,
                order: 11
            },
            thicc: {
                enabled: false,
                order: 12
            }
        },
        formats: {
            superscript: true,
            smallcaps: true,
            fullwidth: true,
            upsidedown: true,
            varied: true,
            leet: false,
            thicc: false
        },
        wrappers: {
            superscript: '^^',
            smallcaps: '%%',
            fullwidth: '##',
            upsidedown: '&&',
            varied: '||',
            leet: '++',
            thicc: '$$'
        },
        formatting: {
            fullWidthMap: true,
            reorderUpsidedown: true,
            startCaps: true
        },
        plugin: {
            hoverOpen: true,
            closeOnSend: true,
            chainFormats: true,
            icons: true
        },
        style: {
            rightSide: true,
            opacity: 1,
            fontSize: '85%'
        }
    };
    this.settings = this.defaultSettings;
    this.customWrappers = Object.keys(this.defaultSettings.wrappers);
    this.toolbarData = {
        bold: {
            type: 'native-format',
            name: 'Bold',
            displayName: '<b>Bold</b>',
            icon: "<img src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTE1LjYgMTAuNzljLjk3LS42NyAxLjY1LTEuNzcgMS42NS0yLjc5IDAtMi4yNi0xLjc1LTQtNC00SDd2MTRoNy4wNGMyLjA5IDAgMy43MS0xLjcgMy43MS0zLjc5IDAtMS41Mi0uODYtMi44Mi0yLjE1LTMuNDJ6TTEwIDYuNWgzYy44MyAwIDEuNS42NyAxLjUgMS41cy0uNjcgMS41LTEuNSAxLjVoLTN2LTN6bTMuNSA5SDEwdi0zaDMuNWMuODMgMCAxLjUuNjcgMS41IDEuNXMtLjY3IDEuNS0xLjUgMS41eiIvPiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+'>"
        },
        italic: {
            type: 'native-format',
            name: 'Italic',
            displayName: '<i>Italic</i>',
            icon: "<img src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTAgNHYzaDIuMjFsLTMuNDIgOEg2djNoOHYtM2gtMi4yMWwzLjQyLThIMThWNHoiLz48L3N2Zz4='>"
        },
        underline: {
            type: 'native-format',
            name: 'Underline',
            displayName: '<u>Underline</u>',
            icon: "<img src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTIgMTdjMy4zMSAwIDYtMi42OSA2LTZWM2gtMi41djhjMCAxLjkzLTEuNTcgMy41LTMuNSAzLjVTOC41IDEyLjkzIDguNSAxMVYzSDZ2OGMwIDMuMzEgMi42OSA2IDYgNnptLTcgMnYyaDE0di0ySDV6Ii8+PC9zdmc+'>"
        },
        strikethrough: {
            type: 'native-format',
            name: 'Strikethrough',
            displayName: '<s>Strikethrough</s>',
            icon: "<img src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTAgMTloNHYtM2gtNHYzek01IDR2M2g1djNoNFY3aDVWNEg1ek0zIDE0aDE4di0ySDN2MnoiLz48L3N2Zz4='>"
        },
        code: {
            type: 'native-format',
            name: 'Code',
            displayName: '<span style="font-family: monospace;">Code</span>',
            icon: "<img src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+ICAgIDxwYXRoIGQ9Ik05LjQgMTYuNkw0LjggMTJsNC42LTQuNkw4IDZsLTYgNiA2IDYgMS40LTEuNHptNS4yIDBsNC42LTQuNi00LjYtNC42TDE2IDZsNiA2LTYgNi0xLjQtMS40eiIvPjwvc3ZnPg=='>"
        },
        codeblock: {
            type: 'native-format',
            name: 'Codeblock',
            displayName: '<span style="font-family: monospace;text-decoration: underline overline;">|Codeblock|</span>',
            icon: "<img src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNNy43NyA2Ljc2TDYuMjMgNS40OC44MiAxMmw1LjQxIDYuNTIgMS41NC0xLjI4TDMuNDIgMTJsNC4zNS01LjI0ek03IDEzaDJ2LTJIN3Yyem0xMC0yaC0ydjJoMnYtMnptLTYgMmgydi0yaC0ydjJ6bTYuNzctNy41MmwtMS41NCAxLjI4TDIwLjU4IDEybC00LjM1IDUuMjQgMS41NCAxLjI4TDIzLjE4IDEybC01LjQxLTYuNTJ6Ii8+PC9zdmc+'>"
        },
        superscript: {
            type: 'bfr-format',
            name: 'Superscript',
            displayName: 'ˢᵘᵖᵉʳˢᶜʳᶦᵖᵗ',
            icon: "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC9UlEQVR4nO2av08UQRTH+WFhDDFXUFhcYcKBFMRYWtgLgdLS4go7IHAJBYl2FJb8UOsrLC0sjJyGPwMTf5xWJFhYUFBcYfRjsUOczL1d9sfczuwyn+Sa2/fefWdu33ffwI2NBQKBQIUBFoBdoA+cA7+Ad8AO0HStb2QAN4Bt4JR4PgEd4KZrvVYBrgNvExZu8tq1ZqsATzMs/oIt17qtADSJel2nDzxS16aBJ0ReoDMAFlzrLwzwXFh8Q4hrAj+N2F0Xmq0C9IxFPU6IbRuxn8vUOhKAL8ai7iTE3jViT8vU6hzgvrEBZ641lQZwCzgxNuDIta5SIJoOzcUDrLjWNnKU8ZmPSYCdvAW7QrG2XdmiYwN0M+TfJjoDSLwBruUVNgUcGwXPsThUqFvW/NaOgakUuQ2i2WAgLPw3sO1UYIrauTaY6DywBZzFfOsnwIOi+vQPLHSLJtTtCnXbCfEN4BnDU55OD5guqq2w2BT1Mm8q8q2emrxaLz68BRwaNb8BizlqLapcnUOgdUleIfKv/r+AJaIDiM57YCZDjZbK0ekDSyly3W6AErEu1N7PkL8v5K+nzHW/AUrIgVH7L7CWIm9NxeocWBNWFsh+8JUEPwAeqhidS/veW8jgB8AMOfvea5D9YE+I2xPiUvW99zDsB3+AVe36qnpPp3p9HwcJ4ywjHKO9ImGhIz1IeUWMH9Sz7+MQ/KCefR8H8nwAVX7eZyFswFVugSttgsiPwT7Do3L9HoPIg9AAuKde5l9x6jUIxfR9R7veEa7Xww+Q+/4VMKnFTKr3TKrtB8jH4Y/AvBA7r67pVPc4jPy8/0HC/9+AFRWjU835ALnvN1PkbQp51fID5L5/CUykyJ1QsSbV8APkvv8AzGWoMadydPz3A+S+/w4s56i1rHJ1/PYD5L7fKFBvQ6jnpx8g9/0LYLxAzXFVw8QvP0Du+x4wa6H2LMM/ffPHD5D73qrAmA32ww+Q+976LRrTYn76QSAQCAQCgUAgEKg8/wD8huCrKK8/kQAAAABJRU5ErkJggg=='>"
        },
        smallcaps: {
            type: 'bfr-format',
            name: 'Smallcaps',
            displayName: 'SᴍᴀʟʟCᴀᴘs',
            icon: "<img src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgIDxkZWZzPiAgICAgICAgPHBhdGggZD0iTTI0IDI0SDBWMGgyNHYyNHoiIGlkPSJhIi8+ICAgIDwvZGVmcz4gICAgPGNsaXBQYXRoIGlkPSJiIj4gICAgICAgIDx1c2Ugb3ZlcmZsb3c9InZpc2libGUiIHhsaW5rOmhyZWY9IiNhIi8+ICAgIDwvY2xpcFBhdGg+ICAgIDxwYXRoIGNsaXAtcGF0aD0idXJsKCNiKSIgZD0iTTIuNSA0djNoNXYxMmgzVjdoNVY0aC0xM3ptMTkgNWgtOXYzaDN2N2gzdi03aDNWOXoiLz48L3N2Zz4='>"
        },
        fullwidth: {
            type: 'bfr-format',
            name: 'Fullwidth',
            displayName: 'Ｆｕｌｌｗｉｄｔｈ',
            icon: "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA80lEQVR4nO3XzQ2CMBxAcQ4MwcFFHIRBWIQF2MBBZBAGeV5ogkSj1JQife9s0n9/Uj6qyszMzMzMLCIyl3v/AghQOkBsp9lIbAIIIIAAAggggAACCCCAAAIIIIAAuefZPQEEEEAAAQQQQIDTAAA1MGz4fRQAMAB13JSJAhpg3OOfnL1GoEm91lcBLXDf61JeXDR3oE293qdhOmDa8yyvTs4EdKnXfDXEBejX5zgDQKgHLqnXDgNcgdubQXJ2A66pN/903g9Y2vsCpQPMCOUegQVCuTfB1TBlPgZXA5X7IhSi5FfhEBs/hn5Y53gfQ2ZmZv/ZAxEIe1ZZ+BlyAAAAAElFTkSuQmCC'>"
        },
        upsidedown: {
            type: 'bfr-format',
            name: 'Upsidedown',
            displayName: 'uʍopǝpᴉsd∩',
            icon: "<img src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTE2IDE3LjAxVjEwaC0ydjcuMDFoLTNMMTUgMjFsNC0zLjk5aC0zek05IDNMNSA2Ljk5aDNWMTRoMlY2Ljk5aDNMOSAzeiIvPiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+'>"
        },
        varied: {
            type: 'bfr-format',
            name: 'Varied',
            displayName: 'VaRiEd CaPs',
            icon: "<img src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTE4IDRsLTQgNGgzdjdjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yVjhjMC0yLjIxLTEuNzktNC00LTRTNSA1Ljc5IDUgOHY3SDJsNCA0IDQtNEg3VjhjMC0xLjEuOS0yIDItMnMyIC45IDIgMnY3YzAgMi4yMSAxLjc5IDQgNCA0czQtMS43OSA0LTRWOGgzbC00LTR6Ii8+ICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4='>"
        },
        leet: {
            type: 'bfr-format',
            name: 'Leet',
            displayName: '1337',
            icon: "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABnklEQVRoge2YL1MCQRiHCRf8EATCBZwhEPwARILR4DeQaDDeDIFgMPAhDAQDgaDdYDAQcMYZMThDNBgIBsJj2GXmXFdub937g/M+kfe3w+/ZeQ8YGg1BEITaAbSAa2BF9ayACRDnKb+utrOVNS4SqJuvK1MXgUXVLXfw4iLwDae9K5DcfUQgMCKQev3OnBXIrAiB81KqK86KEDgE3kooPweawQX0zPYl1wNGwDJnyQQ4sswuXfv4CPQsb9hJzbs7ZLal41S+Y2Q2pG4/uICePxuRgSXTtAg0LbmBkZnk7eMj0DciCyAyMolFYGhkIuAxNf8EWoUL6MzUiN0AMermE9QqmGyAoc7E+kyaxLePj0BL31gWc9we7iVwUJqAztnWZMsGONW5CBhnCPT/2sdHIOLnGmzLn1jyV7+UH4fo43VAS4xQq/IB3ALdHflj4F5nH4CLkH38DhSMCJTQMWyf/yDwZB6qEa8uAraPxrowcxGIqe8fW23XvWujfu+8V9sZUB1muJYX9p2sfai6XyZ7IxDi6axUTAREQBAEoQ58Aaheq+k8olaNAAAAAElFTkSuQmCC'>"
        },
        thicc: {
            type: 'bfr-format',
            name: 'Extra Thicc',
            displayName: '乇乂下尺卂 下卄工匚匚',
            icon: "<img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGRpc3BsYXk9Im5vbmUiIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xNS42LDEwLjc5YzAuOTcxLTAuNjcsMS42NS0xLjc3LDEuNjUtMi43OWMwLTIuMjYtMS43NS00LTQtNEg3djE0aDcuMDQNCgljMi4wOSwwLDMuNzEtMS43LDMuNzEtMy43OUMxNy43NSwxMi42ODksMTYuODkxLDExLjM5LDE1LjYsMTAuNzl6IE0xMCw2LjVoM2MwLjgzLDAsMS41LDAuNjcsMS41LDEuNVMxMy44Myw5LjUsMTMsOS41aC0zVjYuNXoNCgkgTTEzLjUsMTUuNUgxMHYtM2gzLjVjMC44MywwLDEuNSwwLjY3LDEuNSwxLjVTMTQuMzMsMTUuNSwxMy41LDE1LjV6Ii8+DQo8cGF0aCBmaWxsPSJub25lIiBkPSJNMCwwaDI0djI0SDBWMHoiLz4NCjx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgNS45MzU1IDE0Ljk5NzEpIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZm9udC1mYW1pbHk9IidLb3pHb1ByNk4tUmVndWxhci04M3B2LVJLU0otSCciIGZvbnQtc2l6ZT0iMTIuNTY0Ij7kuYc8L3RleHQ+DQo8L3N2Zz4NCg=='>"
        },
    };
    this.allLanguages = {
        C: {
            cpp: 'C++',
            csharp: 'C#',
            coffeescript: 'CoffeeScript',
            css: 'CSS'
        },
        H: {
            html: 'HTML/XML'
        },
        J: {
            java: 'Java',
            js: 'JavaScript',
            json: 'JSON'
        },
        M: {
            markdown: 'Markdown'
        },
        P: {
            perl: 'Perl',
            php: 'PHP',
            py: 'Python'
        },
        R: {
            ruby: 'Ruby'
        },
        S: {
            sql: 'SQL'
        },
        V: {
            vbnet: 'VB.NET',
            vhdl: 'VHDL'
        }
    };


    // CSS is a modified form of the CSS used in
    // Beard's Material Design Theme for BetterDiscord
    // Make sure to check it out!
    // http://www.beard-design.com/discord-material-theme
    this.mainCSS = `/* CSS STUFF */

.df-toolbar {
	user-select: none;
	white-space: nowrap;
	font-size:85%;
	display:block;
	position: absolute;
	color: rgba(255, 255, 255, .5);
	width:auto!important;
	right:0;
	bottom:auto;
	border-radius:3px;
	height:27px!important;
	top:0px;
	transform:translate(0,-100%);
	opacity:1;
	overflow: hidden!important;
	pointer-events: none;
	padding:10px 30px 15px 5px;
	margin: 0 5px 0 0;
}

.df-toolbar.df-visible,
.df-toolbar.df-hover:hover{
	pointer-events: initial;
}

.df-toolbar:before {
	content:'';
	display: block;
	width:100%;
	height:calc(100% - 15px);
	position: absolute;
	z-index: -1;
	background:#424549;
	pointer-events: initial;
	left:0px;
	top:5px;
	border-radius:3px;
	transform:translate(0,55px);
	transition:all 200ms ease;
}

.df-toolbar.df-visible:before,
.df-toolbar.df-hover:hover:before {
	transform:translate(0,0px);
	transition:all 200ms cubic-bezier(0,0,0,1);
}

.df-toolbar .format {
	display: inline;
	padding: 7px 5px;
	cursor: pointer;
	display : inline-flex;
	align-items : center;
	transform:translate(0,55px);
	transition:all 50ms,transform 200ms ease;
	position:relative;
	pointer-events: initial;
	border-radius:2px;
	max-height: 27px;
	box-sizing: border-box;
	vertical-align: middle;
}

.df-toolbar .format img {
	opacity: 0.6;
	vertical-align: middle;
	max-height: inherit;
}

.df-toolbar .format .format-border {
	border: 1px solid rgba(255, 255, 255, .5);
	border-radius: inherit;
}

.df-toolbar .format:hover{
	background:rgba(255,255,255,.1);
	color:rgba(255,255,255,.9);
}

.df-toolbar .format:active{
	background:rgba(0,0,0,.1)!important;
	transition:all 0ms,transform 200ms ease;
}

.df-toolbar.df-visible .format,
.df-toolbar.df-hover:hover .format{
	transform:translate(0,0);
	transition:all 50ms,transform 200ms cubic-bezier(0,0,0,1);
}

.df-toolbar .format.disabled {
	display: none;
}

.df-toolbar .format.ghost {
	color: transparent;
	background: rgba(0,0,0,.1);
}

.df-toolbar .format.ghost img {
	opacity: 0;
}

.df-toolbar .df-arrow {
	content:'';
	display:block;
	background:url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTcuNDEgMTUuNDFMMTIgMTAuODNsNC41OSA0LjU4TDE4IDE0bC02LTYtNiA2eiIvPiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+);
	height:30px;
	width:30px;
	right:5px;
	position: absolute;
	pointer-events: initial;
	bottom:0;
	background-repeat: no-repeat;
	background-position: 50%;
	transition:all 200ms ease;
	opacity: .3;
	cursor:pointer;
}
.df-toolbar.df-visible .df-arrow,
.df-toolbar.df-hover:hover .df-arrow {
	transform:translate(0,-14px)rotate(-90deg);
	transition:all 200ms cubic-bezier(0,0,0,1);
	opacity: .9;
}

.message-group .df-toolbar{
	padding: 10px 5px 15px 5px;
	animation:slide-up 300ms cubic-bezier(0,0,0,1), opacity 300ms ease
}
.upload-modal .df-toolbar {
	position: relative;
	transform: none;
	padding: 5px 0;
	margin-right: 0;
	border-radius: 2px;
	text-align: center;
	background: #424549;
}
.upload-modal .df-toolbar::before {
	display: none;
}
.upload-modal .df-toolbar .format:hover{
	background:rgba(255,255,255,.1);
}
.upload-modal .df-toolbar .format:active{
	background:rgba(0,0,0,.1);
}
.upload-modal .df-toolbar .format,
.upload-modal .df-toolbar:before,
.message-group .df-toolbar .format,
.message-group .df-toolbar:before{
	transform:translate(0,0);
}
.upload-modal .df-toolbar .df-arrow,
.message-group .df-toolbar .df-arrow{
	display: none;
}

.df-toolbar.df-left {
	left: 0!important;
	right: auto!important;
	margin-right: 0!important;
	margin-left: 5px!important;
	padding: 10px 10px 15px 30px!important;
}

.df-toolbar.df-left .df-arrow {
	left: 5px!important;
	right: auto!important;
}

.df-toolbar.df-left.df-hover:hover .df-arrow,.df-toolbar.df-left.df-visible .df-arrow {
	-webkit-transform: translate(0,-14px) rotate(90deg)!important;
	-ms-transform: translate(0,-14px) rotate(90deg)!important;
	transform: translate(0,-14px) rotate(90deg)!important;
}
.df-languages {
	display: block;
	position: fixed !important;
	transform: scale(1,0);
	transform-origin: 100% 100%!important;
	background: #424549;
	border-radius: 3px;
	color: rgba(255,255,255,.5);
	padding: 3px;
}
.df-languages.df-visible {
	height: auto;
	transition: 200ms cubic-bezier(.2,0,0,1);
	transform: scale(1,1);
	transform-origin: 100% 100%!important;
}

.df-languages div {
	display: block;
	cursor: pointer;
	padding: 5px 7px;
	border-radius: 2px;
}

.df-languages div:hover {
	background: rgba(255,255,255,.1);
	color: rgba(255,255,255,.9);
}
`;

}

loadSettings() {
    this.settings = PluginUtilities.loadSettings(this.getShortName(), this.defaultSettings);
}
saveSettings() {
    PluginUtilities.saveSettings(this.getShortName(), this.settings);
}

escape(s) {
    return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

checkForUpdate() {
    PluginUtilities.checkForUpdate(this.getName(), this.getVersion());
}

load() {}

unload() {}

start() {
    // let libraryScript = document.getElementById('zeresLibraryScript');
    // if (!libraryScript || (window.ZeresLibrary && window.ZeresLibrary.isOutdated)) {
    //     if (libraryScript) libraryScript.parentElement.removeChild(libraryScript);
    //     libraryScript = document.createElement('script');
    //     libraryScript.setAttribute('type', 'text/javascript');
    //     libraryScript.setAttribute('src', 'https://rauenzi.github.io/BetterDiscordAddons/Plugins/PluginLibrary.js');
    //     libraryScript.setAttribute('id', 'zeresLibraryScript');
    //     document.head.appendChild(libraryScript);
    // }
    // #endregion
    //       if (window.ZeresLibrary) this.initialize();
    // else libraryScript.addEventListener('load', () => {
    this.initialize();
    // });
}

initialize() {
    // var sortableScript = document.createElement('script');
    // sortableScript.setAttribute('type', 'text/javascript');
    // sortableScript.setAttribute('src', '//cdn.rawgit.com/rauenzi/BetterDiscordAddons/master/Plugins/Sortable.js');
    // sortableScript.setAttribute('id', 'sortableScript');
    // document.head.appendChild(sortableScript);

    // if (typeof window.Sortable !== 'undefined') {
    this.secondaryInitialize();
    // } else {
    //     sortableScript.addEventListener('load', () => {
    //         this.secondaryInitialize();
    //     });
    // }
}

secondaryInitialize() {
    this.initialized = true;
    this.loadSettings();
    $(this.getShortName() + '-style').css(this.mainCSS);
    this.sortableScriptLoaded = true;
    this.setupToolbar();
    //(this.getName() + ' ' + this.getVersion() + ' has started.');
}

stop() {
    return;
}
onSwitch() {}
observer(e) {
    if (!e.addedNodes.length || !(e.addedNodes[0] instanceof Element) || !this.initialized) return;
    var elem = e.addedNodes[0];
    var textarea = elem.querySelector('div[class="inner"]');
    if (textarea && this.initialized) {
        this.addToolbar($(textarea));
    }
}
getSettingsPanel() {
    // return panel[0];
    return;
}
updateStyle() {
    this.updateSide();
    this.updateOpacity();
    this.updateFontSize();
}
updateSide() {
    if (this.settings.style.rightSide) {
        $('.df-toolbar').removeClass('df-left');
    } else {
        $('.df-toolbar').addClass('df-left');
    }
}
updateOpacity() {
    $('.df-toolbar').css('opacity', this.settings.style.opacity);
}

updateFontSize() {
    $('.df-toolbar').css('font-size', this.settings.style.fontSize);
}

openClose() {
    this.isOpen = !this.isOpen;
    $('.df-toolbar').toggleClass('df-visible');
}

doFormat(text, wrapper, offset) {
    // If this is not a wrapper, return original
    if (text.substring(offset, offset + wrapper.length) != wrapper) return text;
    var returnText = text,
        len = text.length;
    var begin = text.indexOf(wrapper, offset);
    if (text[begin - 1] == '\\') return text; // If the wrapper is escaped, remove the backslash and return the text
    var end = text.indexOf(wrapper, begin + wrapper.length);
    if (end != -1) end += wrapper.length - 1;
    // Making it to this point means that we have found a full wrapper
    // This block performs inner chaining
    if (this.settings.plugin.chainFormats) {
        for (var w = 0; w < this.customWrappers.length; w++) {
            var newText = this.doFormat(returnText, this.settings.wrappers[this.customWrappers[w]], begin + wrapper.length);
            if (returnText != newText) {
                returnText = newText;
                end = end - this.settings.wrappers[this.customWrappers[w]].length * 2;
            }
        }
    }
    returnText = returnText.replace(new RegExp(`([^]{${begin}})${this.escape(wrapper)}([^]*)${this.escape(wrapper)}([^]{${len - end - 1}})`), (match, before, middle, after) => {
        var letterNum = 0;
        middle = middle.replace(/./g, letter => {
            var index = this.replaceList.indexOf(letter);
            letterNum += 1;
            if (wrapper == this.settings.wrappers.fullwidth) {
                if (this.settings.formatting.fullWidthMap) return index != -1 ? this.fullwidthList[index] : letter;
                else return index != -1 ? letterNum == middle.length ? letter.toUpperCase() : letter.toUpperCase() + ' ' : letter;
            } else if (wrapper == this.settings.wrappers.superscript) {
                return index != -1 ? this.superscriptList[index] : letter;
            } else if (wrapper == this.settings.wrappers.smallcaps) {
                return index != -1 ? this.smallCapsList[index] : letter;
            } else if (wrapper == this.settings.wrappers.upsidedown) {
                return index != -1 ? this.upsideDownList[index] : letter;
            } else if (wrapper == this.settings.wrappers.leet) {
                return index != -1 ? this.leetList[index] : letter;
            } else if (wrapper == this.settings.wrappers.thicc) {
                return index != -1 ? this.thiccList[index] : letter;
            } else if (wrapper == this.settings.wrappers.varied) {
                var compare = this.settings.formatting.startCaps ? 1 : 0;
                if (letter.toLowerCase() == letter.toUpperCase()) letterNum = letterNum - 1;
                return index != -1 ? letterNum % 2 == compare ? letter.toUpperCase() : letter.toLowerCase() : letter;
            } else {
                return letter;
            }
        });
        if (wrapper == this.settings.wrappers.upsidedown && this.settings.formatting.reorderUpsidedown) return before + middle.split('').reverse().join('') + after;
        else return before + middle + after;
    });
    return returnText;
}
format(e) {
    if (e.shiftKey || e.which != 13) return;
    var textarea = $(e.currentTarget);
    var text = textarea.val();
    for (var i = 0; i < text.length; i++) {
        if (text[i] == '`') {
            var next = text.indexOf('`', i + 1);
            if (next != -1)
                i = next;
        } else if (text[i] == '@') {
            var match = /@.*#[0-9]*/.exec(text.substring(i));
            if (match && match.index == 0) i += match[0].length - 1;
        } else {
            for (var w = 0; w < this.customWrappers.length; w++) {
                if (!this.settings.formats[this.customWrappers[w]]) continue;
                var newText = this.doFormat(text, this.settings.wrappers[this.customWrappers[w]], i);
                if (text != newText) {
                    text = newText;
                    i = i - this.settings.wrappers[this.customWrappers[w]].length * 2;
                }
            }
        }
    }
    var txt = textarea[0];
    txt.focus();
    txt.selectionStart = 0;
    txt.selectionEnd = txt.value.length;
    document.execCommand('insertText', false, text);
    if (this.settings.plugin.closeOnSend) $('.df-toolbar').removeClass('df-visible');
}
wrapSelection(textarea, wrapper, language) {
    var text = textarea.value;
    var start = textarea.selectionStart;
    var len = text.substring(textarea.selectionStart, textarea.selectionEnd).length;
    var lang = language ? language : '';
    var newline = wrapper === '```' ? '\n' : '';
    text = wrapper + lang + newline + text.substring(textarea.selectionStart, textarea.selectionEnd) + newline + wrapper;
    textarea.focus();
    document.execCommand('insertText', false, text);
    textarea.selectionEnd = (textarea.selectionStart = start + wrapper.length + lang.length + newline.length) + len;
}
getContextMenu(textarea) {
    var items = [];
    // items.push(new PluginContextMenu.SubMenuItem('Test', new PluginContextMenu.Menu(false).addItems(
    // 	new PluginContextMenu.TextItem('TESTY'),
    // 	new PluginContextMenu.TextItem('TESTY'),
    // 	new PluginContextMenu.SubMenuItem('Test', new PluginContextMenu.Menu(false).addItems(
    // 		new PluginContextMenu.TextItem('TESTY'),
    // 		new PluginContextMenu.TextItem('TESTY'),
    // 		new PluginContextMenu.TextItem('TESTY')
    // 	)),
    // 	new PluginContextMenu.TextItem('TESTY')
    // )));
    for (var letter in this.allLanguages) {
        var subItems = [];
        for (var language in this.allLanguages[letter]) {
            ((language) => {
                subItems.push(new PluginContextMenu.TextItem(this.allLanguages[letter][language], {
                    callback: () => {
                        this.wrapSelection(textarea[0], '```', language);
                    }
                }));
            })(language);
        }
        items.push(new PluginContextMenu.SubMenuItem(letter, new PluginContextMenu.Menu(true).addItems(...subItems)));
    }
    // items.push(new PluginContextMenu.SubMenuItem('Test', new PluginContextMenu.Menu(false).addItems(
    // 	new PluginContextMenu.TextItem('TESTY'),
    // 	new PluginContextMenu.TextItem('TESTY'),
    // 	new PluginContextMenu.SubMenuItem('Test', new PluginContextMenu.Menu(false).addItems(
    // 		new PluginContextMenu.TextItem('TESTY'),
    // 		new PluginContextMenu.TextItem('TESTY'),
    // 		new PluginContextMenu.TextItem('TESTY')
    // 	)),
    // 	new PluginContextMenu.TextItem('TESTY')
    // )));
    return new PluginContextMenu.Menu().addItems(...items);
}
buildToolbar(textarea) {
    var toolbar = $(this.toolbarString);
    if (typeof this.settings.toolbar.bold === 'boolean') {
        this.settings.toolbar = this.defaultSettings.toolbar;
        this.saveSettings();
    }
    var sorted = Object.keys(this.settings.toolbar).sort((a, b) => {
        return this.settings.toolbar[a].order - this.settings.toolbar[b].order;
    });
    for (var i = 0; i < sorted.length; i++) {
        var button = $('<div>');
        button.addClass('format');
        button.addClass(this.toolbarData[sorted[i]].type);
        new PluginTooltip.Tooltip(button, this.toolbarData[sorted[i]].name);
        if (!this.settings.toolbar[sorted[i]].enabled) button.addClass('disabled');
        if (sorted[i] === 'codeblock') {
            let contextMenu = this.getContextMenu(textarea);
            button.on('contextmenu', (e) => {
                contextMenu.show(e.clientX, e.clientY);
            });
        }
        button.attr('data-name', sorted[i]);
        if (this.settings.plugin.icons) button.html(this.toolbarData[sorted[i]].icon);
        else button.html(this.toolbarData[sorted[i]].displayName);
        toolbar.append(button);
    }
    window.Sortable.create(toolbar[0], {
        draggable: '.format', // css-selector of elements, which can be sorted
        ghostClass: 'ghost',
        onUpdate: () => {
            var buttons = toolbar.children('.format');
            for (var i = 0; i < buttons.length; i++) {
                this.settings.toolbar[$(buttons[i]).data('name')].order = i;
            }
            this.saveSettings();
        }
    });
    if (!this.settings.plugin.icons) {
        toolbar.on('mousemove.' + this.getShortName(), (e) => {
            var $this = $(e.currentTarget);
            var pos = e.pageX - $this.parent().offset().left;
            var diff = -$this.width();
            $this.children().each((index, elem) => {
                diff += $(elem).outerWidth();
            });
            $this.scrollLeft(pos / $this.width() * diff);
        });
    }

    return toolbar;
}
setupToolbar() {
    $('.df-toolbar').remove();
    $(`div[class^="channelTextArea"] textarea`).each((index, elem) => {
        this.addToolbar($(elem));
    });
}
addToolbar(textarea) {
    var toolbarElement = this.buildToolbar(textarea);
    if (this.settings.plugin.hoverOpen == true) toolbarElement.addClass('df-hover');
    if (this.isOpen) toolbarElement.addClass('df-visible');

    textarea.on('keypress.' + this.getShortName(), (e) => {
            this.format(e);
        })
        .parent().after(toolbarElement)
        .siblings('.df-toolbar')
        .on('click.' + this.getShortName(), 'div', e => {
            var button = $(e.currentTarget);
            if (button.hasClass('df-arrow')) {
                if (!this.settings.plugin.hoverOpen) this.openClose();
            } else {
                var wrapper = '';
                if (button.hasClass('native-format')) wrapper = this.discordWrappers[button.data('name')];
                else wrapper = this.settings.wrappers[button.data('name')];
                this.wrapSelection(textarea[0], wrapper);
            }
        });
    this.updateStyle();
}
generateSettings(panel) {
    return 1;
    // new PluginSettings.ControlGroup('Toolbar Buttons', () => {
    //    this.saveSettings();
    //    this.setupToolbar();
    // }).appendTo(panel).append(
    //      new PluginSettings.Checkbox('Bold', '', this.settings.toolbar.bold.enabled, (checked) => {
    //          this.settings.toolbar.bold.enabled = checked;
    //     }),
    // new PluginSettings.Checkbox('Italic', '', this.settings.toolbar.italic.enabled, (checked) => {
    // this.settings.toolbar.italic.enabled = checked;
    // }),
    // new PluginSettings.Checkbox('Underline', '', this.settings.toolbar.underline.enabled, (checked) => {
    // this.settings.toolbar.underline.enabled = checked;
    // }),
    // new PluginSettings.Checkbox('Strikethrough', '', this.settings.toolbar.strikethrough.enabled, (checked) => {
    // this.settings.toolbar.strikethrough.enabled = checked;
    // }),
    // new PluginSettings.Checkbox('Code', '', this.settings.toolbar.code.enabled, (checked) => {
    // this.settings.toolbar.code.enabled = checked;
    // }),
    // new PluginSettings.Checkbox('CodeBlock', '', this.settings.toolbar.codeblock.enabled, (checked) => {
    // this.settings.toolbar.codeblock.enabled = checked;
    // }),
    // new PluginSettings.Checkbox('Superscript', '', this.settings.toolbar.superscript.enabled, (checked) => {
    // this.settings.toolbar.superscript.enabled = checked;
    // }),
    // new PluginSettings.Checkbox('Smallcaps', '', this.settings.toolbar.smallcaps.enabled, (checked) => {
    // this.settings.toolbar.smallcaps.enabled = checked;
    // }),
    // new PluginSettings.Checkbox('Full Width', '', this.settings.toolbar.fullwidth.enabled, (checked) => {
    // this.settings.toolbar.fullwidth.enabled = checked;
    // }),
    // new PluginSettings.Checkbox('Upsidedown', '', this.settings.toolbar.upsidedown.enabled, (checked) => {
    // this.settings.toolbar.upsidedown.enabled = checked;
    // }),
    // new PluginSettings.Checkbox('Varied Caps', '', this.settings.toolbar.varied.enabled, (checked) => {
    // this.settings.toolbar.varied.enabled = checked;
    // }),
    // new PluginSettings.Checkbox('Leet (1337)', '', this.settings.toolbar.leet.enabled, (checked) => {
    // this.settings.toolbar.leet.enabled = checked;
    // }),
    // new PluginSettings.Checkbox('Extra Thicc', '', this.settings.toolbar.thicc.enabled, (checked) => {
    // this.settings.toolbar.thicc.enabled = checked;
    // })
    // );
    // new PluginSettings.ControlGroup('Active Formats', () => {
    // this.saveSettings();
    // }).appendTo(panel).append(
    // new PluginSettings.Checkbox('Superscript', '', this.settings.formats.superscript, (checked) => {
    // this.settings.formats.superscript = checked;
    // }),
    // new PluginSettings.Checkbox('Smallcaps', '', this.settings.formats.smallcaps, (checked) => {
    // this.settings.formats.smallcaps = checked;
    // }),
    // new PluginSettings.Checkbox('Full Width', '', this.settings.formats.fullwidth, (checked) => {
    // this.settings.formats.fullwidth = checked;
    // }),
    // new PluginSettings.Checkbox('Upsidedown', '', this.settings.formats.upsidedown, (checked) => {
    // this.settings.formats.upsidedown = checked;
    // }),
    // new PluginSettings.Checkbox('Varied Caps', '', this.settings.formats.varied, (checked) => {
    // this.settings.formats.varied = checked;
    // }),
    // new PluginSettings.Checkbox('Leet (1337)', '', this.settings.formats.leet, (checked) => {
    // this.settings.formats.leet = checked;
    // }),
    // new PluginSettings.Checkbox('Extra Thicc', '', this.settings.formats.thicc, (checked) => {
    // this.settings.formats.thicc = checked;
    // })
    // );
    // new PluginSettings.ControlGroup('Wrapper Options', () => {
    // this.saveSettings();
    // }).appendTo(panel).append(
    // new PluginSettings.Textbox('Superscript', 'The wrapper for superscripted text.', this.settings.wrappers.superscript, this.defaultSettings.wrappers.superscript,
    // (text) => {
    // this.settings.wrappers.superscript = text != '' ? text : this.defaultSettings.wrappers.superscript;
    // }),
    // new PluginSettings.Textbox('Smallcaps', 'The wrapper to make Smallcaps.', this.settings.wrappers.smallcaps, this.defaultSettings.wrappers.smallcaps,
    // (text) => {
    // this.settings.wrappers.smallcaps = text != '' ? text : this.defaultSettings.wrappers.smallcaps;
    // }),
    // new PluginSettings.Textbox('Full Width', 'The wrapper for E X P A N D E D  T E X T.', this.settings.wrappers.fullwidth, this.defaultSettings.wrappers.fullwidth,
    // (text) => {
    // this.settings.wrappers.fullwidth = text != '' ? text : this.defaultSettings.wrappers.fullwidth;
    // }),
    // new PluginSettings.Textbox('Upsidedown', 'The wrapper to flip the text upsidedown.', this.settings.wrappers.upsidedown, this.defaultSettings.wrappers.upsidedown,
    // (text) => {
    // this.settings.wrappers.upsidedown = text != '' ? text : this.defaultSettings.wrappers.upsidedown;
    // }),
    // new PluginSettings.Textbox('Varied Caps', 'The wrapper to VaRy the capitalization.', this.settings.wrappers.varied, this.defaultSettings.wrappers.varied,
    // (text) => {
    // this.settings.wrappers.varied = text != '' ? text : this.defaultSettings.wrappers.varied;
    // }),
    // new PluginSettings.Textbox('LeetSpeak', 'The wrapper to talk in 13375p34k.', this.settings.wrappers.leet, this.defaultSettings.wrappers.leet,
    // (text) => {
    // this.settings.wrappers.leet = text != '' ? text : this.defaultSettings.wrappers.leet;
    // }),
    // new PluginSettings.Textbox('Extra Thicc', 'The wrapper to get 乇乂下尺卂 下卄工匚匚.', this.settings.wrappers.thicc, this.defaultSettings.wrappers.thicc,
    // (text) => {
    // this.settings.wrappers.thicc = text != '' ? text : this.defaultSettings.wrappers.thicc;
    // })
    // );
    // new PluginSettings.ControlGroup('Formatting Options', () => {
    // this.saveSettings();
    // }).appendTo(panel).append(
    // new PluginSettings.PillButton('Fullwidth Style', 'Which style of fullwidth formatting should be used.', 'T H I S', 'ｔｈｉｓ',
    // this.settings.formatting.fullWidthMap, (checked) => {
    // this.settings.formatting.fullWidthMap = checked;
    // }),
    // new PluginSettings.Checkbox('Reorder Upsidedown Text', 'Having this enabled reorders the upside down text to make it in-order.',
    // this.settings.formatting.reorderUpsidedown, (checked) => {
    // this.settings.formatting.reorderUpsidedown = checked;
    // }),
    // new PluginSettings.Checkbox('Start VaRiEd Caps With Capital', 'Enabling this starts a varied text string with a capital.',
    // this.settings.formatting.startCaps, (checked) => {
    // this.settings.formatting.startCaps = checked;
    // })
    // );
    // new PluginSettings.ControlGroup('Plugin Options', () => {
    // this.saveSettings();
    // }).appendTo(panel).append(
    // new PluginSettings.PillButton('Toolbar Style', 'Switches between icons and text as the toolbar buttons.', 'Text', 'Icons',
    // this.settings.plugin.icons, (checked) => {
    // this.settings.plugin.icons = checked;
    // this.setupToolbar();
    // }),
    // new PluginSettings.Checkbox('Open On Hover', 'Enabling this makes you able to open the menu just by hovering the arrow instead of clicking it.', this.settings.plugin.hoverOpen,
    // (checked) => {
    // this.settings.plugin.hoverOpen = checked;
    // if (checked) {
    // $('.df-toolbar').removeClass('df-visible');
    // $('.df-toolbar').addClass('df-hover');
    // } else {
    // $('.df-toolbar').removeClass('df-hover');
    // }
    // }
    // ),
    // new PluginSettings.Checkbox('Close On Send', 'This option will close the toolbar when the message is sent when \'Open On Hover\' is disabled.',
    // this.settings.plugin.closeOnSend, (checked) => {
    // this.settings.plugin.closeOnSend = checked;
    // }),
    // new PluginSettings.PillButton('Format Chaining', 'Swaps priority of wrappers between inner first and outer first. Check the GitHub for more info.', 'Inner', 'Outer',
    // this.settings.plugin.chainFormats, (checked) => {
    // this.settings.plugin.chainFormats = checked;
    // })
    // );
    // new PluginSettings.ControlGroup('Style Options', () => {
    // this.saveSettings();
    // }).appendTo(panel).append(
    // new PluginSettings.PillButton('Toolbar Location', 'This option enables swapping toolbar from right side to left side.', 'Left', 'Right',
    // this.settings.style.rightSide, (checked) => {
    // this.settings.style.rightSide = checked;
    // this.updateSide();
    // }),
    // new PluginSettings.Slider('Opacity', 'This allows the toolbar to be partially seethrough.', 0, 1, 0.01, this.settings.style.opacity, (val) => {
    // this.settings.style.opacity = val;
    // this.updateOpacity();
    // }),
    // new PluginSettings.Slider('Font Size', 'Adjust the font size between 0 and 100%.', 0, 100, 1, this.settings.style.fontSize, (val) => {
    // this.settings.style.fontSize = val + '%';
    // this.updateFontSize();
    // }).setLabelUnit('%')
    // );
    // var resetButton = $('<button>');
    // resetButton.on('click', () => {
    // this.settings = this.defaultSettings;
    // this.saveSettings();
    // this.setupToolbar();
    //  panel.empty();
    // this.generateSettings(panel);
    // });
    // resetButton.text('Reset To Defaults');
    // resetButton.css('float', 'right');
    // resetButton.attr('type', 'button');
    // panel.append(resetButton);
    // }
}
}