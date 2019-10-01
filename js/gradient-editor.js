/*!

 CSS Gradient Editor

 Written by Alex Sirota (alex @ iosart.com)

 Copyright (c) Alex Sirota 2010, All Rights Reserved

 Please do not use without permission.

 Portions include software under different licenses





*/
function $A(a) {
    if (!a) return [];
    if ("toArray" in Object(a)) return a.toArray();
    for (var b = a.length || 0, c = new Array(b); b--;) c[b] = a[b];
    return c
}

function $w(a) {
    return Object.isString(a) ? (a = a.strip(), a ? a.split(/\s+/) : []) : []
}

function $H(a) {
    return new Hash(a)
}

function $R(a, b, c) {
    return new ObjectRange(a, b, c)
}
var Prototype = {
    Version: "1.7.2",
    Browser: function() {
        var a = navigator.userAgent,
            b = "[object Opera]" == Object.prototype.toString.call(window.opera);
        return {
            IE: !!window.attachEvent && !b,
            Opera: b,
            WebKit: a.indexOf("AppleWebKit/") > -1,
            Gecko: a.indexOf("Gecko") > -1 && -1 === a.indexOf("KHTML"),
            MobileSafari: /Apple.*Mobile/.test(a)
        }
    }(),
    BrowserFeatures: {
        XPath: !!document.evaluate,
        SelectorsAPI: !!document.querySelector,
        ElementExtensions: function() {
            var a = window.Element || window.HTMLElement;
            return !(!a || !a.prototype)
        }(),
        SpecificElementExtensions: function() {
            if (void 0 !== window.HTMLDivElement) return !0;
            var a = document.createElement("div"),
                b = document.createElement("form"),
                c = !1;
            return a.__proto__ && a.__proto__ !== b.__proto__ && (c = !0), a = b = null, c
        }()
    },
    ScriptFragment: "<script[^>]*>([\\S\\s]*?)</script\\s*>",
    JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,
    emptyFunction: function() {},
    K: function(a) {
        return a
    }
};
Prototype.Browser.MobileSafari && (Prototype.BrowserFeatures.SpecificElementExtensions = !1);
var Class = function() {
    function a() {}

    function b() {
        function b() {
            this.initialize.apply(this, arguments)
        }
        var c = null,
            d = $A(arguments);
        Object.isFunction(d[0]) && (c = d.shift()), Object.extend(b, Class.Methods), b.superclass = c, b.subclasses = [], c && (a.prototype = c.prototype, b.prototype = new a, c.subclasses.push(b));
        for (var e = 0, f = d.length; e < f; e++) b.addMethods(d[e]);
        return b.prototype.initialize || (b.prototype.initialize = Prototype.emptyFunction), b.prototype.constructor = b, b
    }

    function c(a) {
        var b = this.superclass && this.superclass.prototype,
            c = Object.keys(a);
        d && (a.toString != Object.prototype.toString && c.push("toString"), a.valueOf != Object.prototype.valueOf && c.push("valueOf"));
        for (var e = 0, f = c.length; e < f; e++) {
            var g = c[e],
                h = a[g];
            if (b && Object.isFunction(h) && "$super" == h.argumentNames()[0]) {
                var i = h;
                h = function(a) {
                    return function() {
                        return b[a].apply(this, arguments)
                    }
                }(g).wrap(i), h.valueOf = function(a) {
                    return function() {
                        return a.valueOf.call(a)
                    }
                }(i), h.toString = function(a) {
                    return function() {
                        return a.toString.call(a)
                    }
                }(i)
            }
            this.prototype[g] = h
        }
        return this
    }
    var d = function() {
        for (var a in {
                toString: 1
            })
            if ("toString" === a) return !1;
        return !0
    }();
    return {
        create: b,
        Methods: {
            addMethods: c
        }
    }
}();
! function() {
    function a(a) {
        switch (a) {
            case null:
                return v;
            case void 0:
                return w
        }
        switch (typeof a) {
            case "boolean":
                return x;
            case "number":
                return y;
            case "string":
                return z
        }
        return A
    }

    function b(a, b) {
        for (var c in b) a[c] = b[c];
        return a
    }

    function c(a) {
        try {
            return s(a) ? "undefined" : null === a ? "null" : a.inspect ? a.inspect() : String(a)
        } catch (a) {
            if (a instanceof RangeError) return "...";
            throw a
        }
    }

    function d(a) {
        return e("", {
            "": a
        }, [])
    }

    function e(b, c, d) {
        var f = c[b];
        a(f) === A && "function" == typeof f.toJSON && (f = f.toJSON(b));
        var g = t.call(f);
        switch (g) {
            case D:
            case C:
            case E:
                f = f.valueOf()
        }
        switch (f) {
            case null:
                return "null";
            case !0:
                return "true";
            case !1:
                return "false"
        }
        switch (typeof f) {
            case "string":
                return f.inspect(!0);
            case "number":
                return isFinite(f) ? String(f) : "null";
            case "object":
                for (var h = 0, i = d.length; h < i; h++)
                    if (d[h] === f) throw new TypeError("Cyclic reference to '" + f + "' in object");
                d.push(f);
                var j = [];
                if (g === F) {
                    for (var h = 0, i = f.length; h < i; h++) {
                        var k = e(h, f, d);
                        j.push(void 0 === k ? "null" : k)
                    }
                    j = "[" + j.join(",") + "]"
                } else {
                    for (var l = Object.keys(f), h = 0, i = l.length; h < i; h++) {
                        var b = l[h],
                            k = e(b, f, d);
                        void 0 !== k && j.push(b.inspect(!0) + ":" + k)
                    }
                    j = "{" + j.join(",") + "}"
                }
                return d.pop(), j
        }
    }

    function f(a) {
        return JSON.stringify(a)
    }

    function g(a) {
        return $H(a).toQueryString()
    }

    function h(a) {
        return a && a.toHTML ? a.toHTML() : String.interpret(a)
    }

    function i(b) {
        if (a(b) !== A) throw new TypeError;
        var c = [];
        for (var d in b) u.call(b, d) && c.push(d);
        if (J)
            for (var e = 0; d = I[e]; e++) u.call(b, d) && c.push(d);
        return c
    }

    function j(a) {
        var b = [];
        for (var c in a) b.push(a[c]);
        return b
    }

    function k(a) {
        return b({}, a)
    }

    function l(a) {
        return !(!a || 1 != a.nodeType)
    }

    function m(a) {
        return t.call(a) === F
    }

    function n(a) {
        return a instanceof Hash
    }

    function o(a) {
        return t.call(a) === B
    }

    function p(a) {
        return t.call(a) === E
    }

    function q(a) {
        return t.call(a) === D
    }

    function r(a) {
        return t.call(a) === G
    }

    function s(a) {
        return void 0 === a
    }
    var t = Object.prototype.toString,
        u = Object.prototype.hasOwnProperty,
        v = "Null",
        w = "Undefined",
        x = "Boolean",
        y = "Number",
        z = "String",
        A = "Object",
        B = "[object Function]",
        C = "[object Boolean]",
        D = "[object Number]",
        E = "[object String]",
        F = "[object Array]",
        G = "[object Date]",
        H = window.JSON && "function" == typeof JSON.stringify && "0" === JSON.stringify(0) && void 0 === JSON.stringify(Prototype.K),
        I = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        J = function() {
            for (var a in {
                    toString: 1
                })
                if ("toString" === a) return !1;
            return !0
        }();
    "function" == typeof Array.isArray && Array.isArray([]) && !Array.isArray({}) && (m = Array.isArray), b(Object, {
        extend: b,
        inspect: c,
        toJSON: H ? f : d,
        toQueryString: g,
        toHTML: h,
        keys: Object.keys || i,
        values: j,
        clone: k,
        isElement: l,
        isArray: m,
        isHash: n,
        isFunction: o,
        isString: p,
        isNumber: q,
        isDate: r,
        isUndefined: s
    })
}(), Object.extend(Function.prototype, function() {
        function a(a, b) {
            for (var c = a.length, d = b.length; d--;) a[c + d] = b[d];
            return a
        }

        function b(b, c) {
            return b = k.call(b, 0), a(b, c)
        }

        function c() {
            var a = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, "").replace(/\s+/g, "").split(",");
            return 1 != a.length || a[0] ? a : []
        }

        function d(a) {
            if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
            if (!Object.isFunction(this)) throw new TypeError("The object is not callable.");
            var c = function() {},
                d = this,
                e = k.call(arguments, 1),
                f = function() {
                    var c = b(e, arguments),
                        g = this instanceof f ? this : a;
                    return d.apply(g, c)
                };
            return c.prototype = this.prototype, f.prototype = new c, f
        }

        function e(b) {
            var c = this,
                d = k.call(arguments, 1);
            return function(e) {
                var f = a([e || window.event], d);
                return c.apply(b, f)
            }
        }

        function f() {
            if (!arguments.length) return this;
            var a = this,
                c = k.call(arguments, 0);
            return function() {
                var d = b(c, arguments);
                return a.apply(this, d)
            }
        }

        function g(a) {
            var b = this,
                c = k.call(arguments, 1);
            return a *= 1e3, window.setTimeout(function() {
                return b.apply(b, c)
            }, a)
        }

        function h() {
            var b = a([.01], arguments);
            return this.delay.apply(this, b)
        }

        function i(b) {
            var c = this;
            return function() {
                var d = a([c.bind(this)], arguments);
                return b.apply(this, d)
            }
        }

        function j() {
            if (this._methodized) return this._methodized;
            var b = this;
            return this._methodized = function() {
                var c = a([this], arguments);
                return b.apply(null, c)
            }
        }
        var k = Array.prototype.slice,
            l = {
                argumentNames: c,
                bindAsEventListener: e,
                curry: f,
                delay: g,
                defer: h,
                wrap: i,
                methodize: j
            };
        return Function.prototype.bind || (l.bind = d), l
    }()),
    function(a) {
        function b() {
            return this.getUTCFullYear() + "-" + (this.getUTCMonth() + 1).toPaddedString(2) + "-" + this.getUTCDate().toPaddedString(2) + "T" + this.getUTCHours().toPaddedString(2) + ":" + this.getUTCMinutes().toPaddedString(2) + ":" + this.getUTCSeconds().toPaddedString(2) + "Z"
        }

        function c() {
            return this.toISOString()
        }
        a.toISOString || (a.toISOString = b), a.toJSON || (a.toJSON = c)
    }(Date.prototype), RegExp.prototype.match = RegExp.prototype.test, RegExp.escape = function(a) {
        return String(a).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
    };
var PeriodicalExecuter = Class.create({
    initialize: function(a, b) {
        this.callback = a, this.frequency = b, this.currentlyExecuting = !1, this.registerCallback()
    },
    registerCallback: function() {
        this.timer = setInterval(this.onTimerEvent.bind(this), 1e3 * this.frequency)
    },
    execute: function() {
        this.callback(this)
    },
    stop: function() {
        this.timer && (clearInterval(this.timer), this.timer = null)
    },
    onTimerEvent: function() {
        if (!this.currentlyExecuting) try {
            this.currentlyExecuting = !0, this.execute(), this.currentlyExecuting = !1
        } catch (a) {
            throw this.currentlyExecuting = !1, a
        }
    }
});
Object.extend(String, {
    interpret: function(a) {
        return null == a ? "" : String(a)
    },
    specialChar: {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        "\\": "\\\\"
    }
}), Object.extend(String.prototype, function() {
    function prepareReplacement(a) {
        if (Object.isFunction(a)) return a;
        var b = new Template(a);
        return function(a) {
            return b.evaluate(a)
        }
    }

    function isNonEmptyRegExp(a) {
        return a.source && "(?:)" !== a.source
    }

    function gsub(a, b) {
        var c, d = "",
            e = this;
        if (b = prepareReplacement(b), Object.isString(a) && (a = RegExp.escape(a)), !a.length && !isNonEmptyRegExp(a)) return (b = b("")) + e.split("").join(b) + b;
        for (; e.length > 0;) c = e.match(a), c && c[0].length > 0 ? (d += e.slice(0, c.index), d += String.interpret(b(c)), e = e.slice(c.index + c[0].length)) : (d += e, e = "");
        return d
    }

    function sub(a, b, c) {
        return b = prepareReplacement(b), c = Object.isUndefined(c) ? 1 : c, this.gsub(a, function(a) {
            return --c < 0 ? a[0] : b(a)
        })
    }

    function scan(a, b) {
        return this.gsub(a, b), String(this)
    }

    function truncate(a, b) {
        return a = a || 30, b = Object.isUndefined(b) ? "..." : b, this.length > a ? this.slice(0, a - b.length) + b : String(this)
    }

    function strip() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    }

    function stripTags() {
        return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "")
    }

    function stripScripts() {
        return this.replace(new RegExp(Prototype.ScriptFragment, "img"), "")
    }

    function extractScripts() {
        var a = new RegExp(Prototype.ScriptFragment, "img"),
            b = new RegExp(Prototype.ScriptFragment, "im");
        return (this.match(a) || []).map(function(a) {
            return (a.match(b) || ["", ""])[1]
        })
    }

    function evalScripts() {
        return this.extractScripts().map(function(script) {
            return eval(script)
        })
    }

    function escapeHTML() {
        return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    function unescapeHTML() {
        return this.stripTags().replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    }

    function toQueryParams(a) {
        var b = this.strip().match(/([^?#]*)(#.*)?$/);
        return b ? b[1].split(a || "&").inject({}, function(a, b) {
            if ((b = b.split("="))[0]) {
                var c = decodeURIComponent(b.shift()),
                    d = b.length > 1 ? b.join("=") : b[0];
                void 0 != d && (d = d.gsub("+", " "), d = decodeURIComponent(d)), c in a ? (Object.isArray(a[c]) || (a[c] = [a[c]]), a[c].push(d)) : a[c] = d
            }
            return a
        }) : {}
    }

    function toArray() {
        return this.split("")
    }

    function succ() {
        return this.slice(0, this.length - 1) + String.fromCharCode(this.charCodeAt(this.length - 1) + 1)
    }

    function times(a) {
        return a < 1 ? "" : new Array(a + 1).join(this)
    }

    function camelize() {
        return this.replace(/-+(.)?/g, function(a, b) {
            return b ? b.toUpperCase() : ""
        })
    }

    function capitalize() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase()
    }

    function underscore() {
        return this.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/-/g, "_").toLowerCase()
    }

    function dasherize() {
        return this.replace(/_/g, "-")
    }

    function inspect(a) {
        var b = this.replace(/[\x00-\x1f\\]/g, function(a) {
            return a in String.specialChar ? String.specialChar[a] : "\\u00" + a.charCodeAt().toPaddedString(2, 16)
        });
        return a ? '"' + b.replace(/"/g, '\\"') + '"' : "'" + b.replace(/'/g, "\\'") + "'"
    }

    function unfilterJSON(a) {
        return this.replace(a || Prototype.JSONFilter, "$1")
    }

    function isJSON() {
        var a = this;
        return !a.blank() && (a = a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@"), a = a.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]"), a = a.replace(/(?:^|:|,)(?:\s*\[)+/g, ""), /^[\],:{}\s]*$/.test(a))
    }

    function evalJSON(sanitize) {
        var json = this.unfilterJSON(),
            cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        cx.test(json) && (json = json.replace(cx, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        try {
            if (!sanitize || json.isJSON()) return eval("(" + json + ")")
        } catch (a) {}
        throw new SyntaxError("Badly formed JSON string: " + this.inspect())
    }

    function parseJSON() {
        var a = this.unfilterJSON();
        return JSON.parse(a)
    }

    function include(a) {
        return this.indexOf(a) > -1
    }

    function startsWith(a, b) {
        return b = Object.isNumber(b) ? b : 0, this.lastIndexOf(a, b) === b
    }

    function endsWith(a, b) {
        a = String(a), b = Object.isNumber(b) ? b : this.length, b < 0 && (b = 0), b > this.length && (b = this.length);
        var c = b - a.length;
        return c >= 0 && this.indexOf(a, c) === c
    }

    function empty() {
        return "" == this
    }

    function blank() {
        return /^\s*$/.test(this)
    }

    function interpolate(a, b) {
        return new Template(this, b).evaluate(a)
    }
    var NATIVE_JSON_PARSE_SUPPORT = window.JSON && "function" == typeof JSON.parse && JSON.parse('{"test": true}').test;
    return {
        gsub: gsub,
        sub: sub,
        scan: scan,
        truncate: truncate,
        strip: String.prototype.trim || strip,
        stripTags: stripTags,
        stripScripts: stripScripts,
        extractScripts: extractScripts,
        evalScripts: evalScripts,
        escapeHTML: escapeHTML,
        unescapeHTML: unescapeHTML,
        toQueryParams: toQueryParams,
        parseQuery: toQueryParams,
        toArray: toArray,
        succ: succ,
        times: times,
        camelize: camelize,
        capitalize: capitalize,
        underscore: underscore,
        dasherize: dasherize,
        inspect: inspect,
        unfilterJSON: unfilterJSON,
        isJSON: isJSON,
        evalJSON: NATIVE_JSON_PARSE_SUPPORT ? parseJSON : evalJSON,
        include: include,
        startsWith: String.prototype.startsWith || startsWith,
        endsWith: String.prototype.endsWith || endsWith,
        empty: empty,
        blank: blank,
        interpolate: interpolate
    }
}());
var Template = Class.create({
    initialize: function(a, b) {
        this.template = a.toString(), this.pattern = b || Template.Pattern
    },
    evaluate: function(a) {
        return a && Object.isFunction(a.toTemplateReplacements) && (a = a.toTemplateReplacements()), this.template.gsub(this.pattern, function(b) {
            if (null == a) return b[1] + "";
            var c = b[1] || "";
            if ("\\" == c) return b[2];
            var d = a,
                e = b[3],
                f = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
            if (null == (b = f.exec(e))) return c;
            for (; null != b;) {
                if (null == (d = d[b[1].startsWith("[") ? b[2].replace(/\\\\]/g, "]") : b[1]]) || "" == b[3]) break;
                e = e.substring("[" == b[3] ? b[1].length : b[0].length), b = f.exec(e)
            }
            return c + String.interpret(d)
        })
    }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
var $break = {},
    Enumerable = function() {
        function a(a, b) {
            try {
                this._each(a, b)
            } catch (a) {
                if (a != $break) throw a
            }
            return this
        }

        function b(a, b, c) {
            var d = -a,
                e = [],
                f = this.toArray();
            if (a < 1) return f;
            for (;
                (d += a) < f.length;) e.push(f.slice(d, d + a));
            return e.collect(b, c)
        }

        function c(a, b) {
            a = a || Prototype.K;
            var c = !0;
            return this.each(function(d, e) {
                if (!(c = c && !!a.call(b, d, e, this))) throw $break
            }, this), c
        }

        function d(a, b) {
            a = a || Prototype.K;
            var c = !1;
            return this.each(function(d, e) {
                if (c = !!a.call(b, d, e, this)) throw $break
            }, this), c
        }

        function e(a, b) {
            a = a || Prototype.K;
            var c = [];
            return this.each(function(d, e) {
                c.push(a.call(b, d, e, this))
            }, this), c
        }

        function f(a, b) {
            var c;
            return this.each(function(d, e) {
                if (a.call(b, d, e, this)) throw c = d, $break
            }, this), c
        }

        function g(a, b) {
            var c = [];
            return this.each(function(d, e) {
                a.call(b, d, e, this) && c.push(d)
            }, this), c
        }

        function h(a, b, c) {
            b = b || Prototype.K;
            var d = [];
            return Object.isString(a) && (a = new RegExp(RegExp.escape(a))), this.each(function(e, f) {
                a.match(e) && d.push(b.call(c, e, f, this))
            }, this), d
        }

        function i(a) {
            if (Object.isFunction(this.indexOf) && -1 != this.indexOf(a)) return !0;
            var b = !1;
            return this.each(function(c) {
                if (c == a) throw b = !0, $break
            }), b
        }

        function j(a, b) {
            return b = Object.isUndefined(b) ? null : b, this.eachSlice(a, function(c) {
                for (; c.length < a;) c.push(b);
                return c
            })
        }

        function k(a, b, c) {
            return this.each(function(d, e) {
                a = b.call(c, a, d, e, this)
            }, this), a
        }

        function l(a) {
            var b = $A(arguments).slice(1);
            return this.map(function(c) {
                return c[a].apply(c, b)
            })
        }

        function m(a, b) {
            a = a || Prototype.K;
            var c;
            return this.each(function(d, e) {
                d = a.call(b, d, e, this), (null == c || d >= c) && (c = d)
            }, this), c
        }

        function n(a, b) {
            a = a || Prototype.K;
            var c;
            return this.each(function(d, e) {
                d = a.call(b, d, e, this), (null == c || d < c) && (c = d)
            }, this), c
        }

        function o(a, b) {
            a = a || Prototype.K;
            var c = [],
                d = [];
            return this.each(function(e, f) {
                (a.call(b, e, f, this) ? c : d).push(e)
            }, this), [c, d]
        }

        function p(a) {
            var b = [];
            return this.each(function(c) {
                b.push(c[a])
            }), b
        }

        function q(a, b) {
            var c = [];
            return this.each(function(d, e) {
                a.call(b, d, e, this) || c.push(d)
            }, this), c
        }

        function r(a, b) {
            return this.map(function(c, d) {
                return {
                    value: c,
                    criteria: a.call(b, c, d, this)
                }
            }, this).sort(function(a, b) {
                var c = a.criteria,
                    d = b.criteria;
                return c < d ? -1 : c > d ? 1 : 0
            }).pluck("value")
        }

        function s() {
            return this.map()
        }

        function t() {
            var a = Prototype.K,
                b = $A(arguments);
            Object.isFunction(b.last()) && (a = b.pop());
            var c = [this].concat(b).map($A);
            return this.map(function(b, d) {
                return a(c.pluck(d))
            })
        }

        function u() {
            return this.toArray().length
        }

        function v() {
            return "#<Enumerable:" + this.toArray().inspect() + ">"
        }
        return {
            each: a,
            eachSlice: b,
            all: c,
            every: c,
            any: d,
            some: d,
            collect: e,
            map: e,
            detect: f,
            findAll: g,
            select: g,
            filter: g,
            grep: h,
            include: i,
            member: i,
            inGroupsOf: j,
            inject: k,
            invoke: l,
            max: m,
            min: n,
            partition: o,
            pluck: p,
            reject: q,
            sortBy: r,
            toArray: s,
            entries: s,
            zip: t,
            size: u,
            inspect: v,
            find: f
        }
    }();
Array.from = $A,
    function() {
        function a(a, b) {
            for (var c = 0, d = this.length >>> 0; c < d; c++) c in this && a.call(b, this[c], c, this)
        }

        function b() {
            return this.length = 0, this
        }

        function c() {
            return this[0]
        }

        function d() {
            return this[this.length - 1]
        }

        function e() {
            return this.select(function(a) {
                return null != a
            })
        }

        function f() {
            return this.inject([], function(a, b) {
                return Object.isArray(b) ? a.concat(b.flatten()) : (a.push(b), a)
            })
        }

        function g() {
            var a = x.call(arguments, 0);
            return this.select(function(b) {
                return !a.include(b)
            })
        }

        function h(a) {
            return (!1 === a ? this.toArray() : this)._reverse()
        }

        function i(a) {
            return this.inject([], function(b, c, d) {
                return 0 != d && (a ? b.last() == c : b.include(c)) || b.push(c), b
            })
        }

        function j(a) {
            return this.uniq().findAll(function(b) {
                return -1 !== a.indexOf(b)
            })
        }

        function k() {
            return x.call(this, 0)
        }

        function l() {
            return this.length
        }

        function m() {
            return "[" + this.map(Object.inspect).join(", ") + "]"
        }

        function n(a, b) {
            if (null == this) throw new TypeError;
            var c = Object(this),
                d = c.length >>> 0;
            if (0 === d) return -1;
            if (b = Number(b), isNaN(b) ? b = 0 : 0 !== b && isFinite(b) && (b = (b > 0 ? 1 : -1) * Math.floor(Math.abs(b))), b > d) return -1;
            for (var e = b >= 0 ? b : Math.max(d - Math.abs(b), 0); e < d; e++)
                if (e in c && c[e] === a) return e;
            return -1
        }

        function o(a, b) {
            if (null == this) throw new TypeError;
            var c = Object(this),
                d = c.length >>> 0;
            if (0 === d) return -1;
            Object.isUndefined(b) ? b = d : (b = Number(b), isNaN(b) ? b = 0 : 0 !== b && isFinite(b) && (b = (b > 0 ? 1 : -1) * Math.floor(Math.abs(b))));
            for (var e = b >= 0 ? Math.min(b, d - 1) : d - Math.abs(b); e >= 0; e--)
                if (e in c && c[e] === a) return e;
            return -1
        }

        function p(a) {
            var b, c = [],
                d = x.call(arguments, 0),
                e = 0;
            d.unshift(this);
            for (var f = 0, g = d.length; f < g; f++)
                if (b = d[f], !Object.isArray(b) || "callee" in b) c[e++] = b;
                else
                    for (var h = 0, i = b.length; h < i; h++) h in b && (c[e] = b[h]), e++;
            return c.length = e, c
        }

        function q(a) {
            return function() {
                if (0 === arguments.length) return a.call(this, Prototype.K);
                if (void 0 === arguments[0]) {
                    var b = x.call(arguments, 1);
                    return b.unshift(Prototype.K), a.apply(this, b)
                }
                return a.apply(this, arguments)
            }
        }

        function r(a) {
            if (null == this) throw new TypeError;
            a = a || Prototype.K;
            for (var b = Object(this), c = [], d = arguments[1], e = 0, f = 0, g = b.length >>> 0; f < g; f++) f in b && (c[e] = a.call(d, b[f], f, b)), e++;
            return c.length = e, c
        }

        function s(a) {
            if (null == this || !Object.isFunction(a)) throw new TypeError;
            for (var b, c = Object(this), d = [], e = arguments[1], f = 0, g = c.length >>> 0; f < g; f++) f in c && (b = c[f], a.call(e, b, f, c) && d.push(b));
            return d
        }

        function t(a) {
            if (null == this) throw new TypeError;
            a = a || Prototype.K;
            for (var b = arguments[1], c = Object(this), d = 0, e = c.length >>> 0; d < e; d++)
                if (d in c && a.call(b, c[d], d, c)) return !0;
            return !1
        }

        function u(a) {
            if (null == this) throw new TypeError;
            a = a || Prototype.K;
            for (var b = arguments[1], c = Object(this), d = 0, e = c.length >>> 0; d < e; d++)
                if (d in c && !a.call(b, c[d], d, c)) return !1;
            return !0
        }

        function v(a, b) {
            b = b || Prototype.K;
            var c = arguments[2];
            return z.call(this, b.bind(c), a)
        }
        var w = Array.prototype,
            x = w.slice,
            y = w.forEach;
        if (y || (y = a), w.map && (r = q(Array.prototype.map)), w.filter && (s = Array.prototype.filter), w.some) var t = q(Array.prototype.some);
        if (w.every) var u = q(Array.prototype.every);
        var z = w.reduce;
        if (!w.reduce) var v = Enumerable.inject;
        Object.extend(w, Enumerable), w._reverse || (w._reverse = w.reverse), Object.extend(w, {
                _each: y,
                map: r,
                collect: r,
                select: s,
                filter: s,
                findAll: s,
                some: t,
                any: t,
                every: u,
                all: u,
                inject: v,
                clear: b,
                first: c,
                last: d,
                compact: e,
                flatten: f,
                without: g,
                reverse: h,
                uniq: i,
                intersect: j,
                clone: k,
                toArray: k,
                size: l,
                inspect: m
            }),
            function() {
                return 1 !== [].concat(arguments)[0][0]
            }(1, 2) && (w.concat = p), w.indexOf || (w.indexOf = n), w.lastIndexOf || (w.lastIndexOf = o)
    }();
var Hash = Class.create(Enumerable, function() {
    function a(a) {
        this._object = Object.isHash(a) ? a.toObject() : Object.clone(a)
    }

    function b(a, b) {
        var c = 0;
        for (var d in this._object) {
            var e = this._object[d],
                f = [d, e];
            f.key = d, f.value = e, a.call(b, f, c), c++
        }
    }

    function c(a, b) {
        return this._object[a] = b
    }

    function d(a) {
        if (this._object[a] !== Object.prototype[a]) return this._object[a]
    }

    function e(a) {
        var b = this._object[a];
        return delete this._object[a], b
    }

    function f() {
        return Object.clone(this._object)
    }

    function g() {
        return this.pluck("key")
    }

    function h() {
        return this.pluck("value")
    }

    function i(a) {
        var b = this.detect(function(b) {
            return b.value === a
        });
        return b && b.key
    }

    function j(a) {
        return this.clone().update(a)
    }

    function k(a) {
        return new Hash(a).inject(this, function(a, b) {
            return a.set(b.key, b.value), a
        })
    }

    function l(a, b) {
        return Object.isUndefined(b) ? a : (b = String.interpret(b), b = b.gsub(/(\r)?\n/, "\r\n"), b = encodeURIComponent(b), b = b.gsub(/%20/, "+"), a + "=" + b)
    }

    function m() {
        return this.inject([], function(a, b) {
            var c = encodeURIComponent(b.key),
                d = b.value;
            if (d && "object" == typeof d) {
                if (Object.isArray(d)) {
                    for (var e, f = [], g = 0, h = d.length; g < h; g++) e = d[g], f.push(l(c, e));
                    return a.concat(f)
                }
            } else a.push(l(c, d));
            return a
        }).join("&")
    }

    function n() {
        return "#<Hash:{" + this.map(function(a) {
            return a.map(Object.inspect).join(": ")
        }).join(", ") + "}>"
    }

    function o() {
        return new Hash(this)
    }
    return {
        initialize: a,
        _each: b,
        set: c,
        get: d,
        unset: e,
        toObject: f,
        toTemplateReplacements: f,
        keys: g,
        values: h,
        index: i,
        merge: j,
        update: k,
        toQueryString: m,
        inspect: n,
        toJSON: f,
        clone: o
    }
}());
Hash.from = $H, Object.extend(Number.prototype, function() {
    function a() {
        return this.toPaddedString(2, 16)
    }

    function b() {
        return this + 1
    }

    function c(a, b) {
        return $R(0, this, !0).each(a, b), this
    }

    function d(a, b) {
        var c = this.toString(b || 10);
        return "0".times(a - c.length) + c
    }

    function e() {
        return Math.abs(this)
    }

    function f() {
        return Math.round(this)
    }

    function g() {
        return Math.ceil(this)
    }

    function h() {
        return Math.floor(this)
    }
    return {
        toColorPart: a,
        succ: b,
        times: c,
        toPaddedString: d,
        abs: e,
        round: f,
        ceil: g,
        floor: h
    }
}());
var ObjectRange = Class.create(Enumerable, function() {
        function a(a, b, c) {
            this.start = a, this.end = b, this.exclusive = c
        }

        function b(a, b) {
            var c, d = this.start;
            for (c = 0; this.include(d); c++) a.call(b, d, c), d = d.succ()
        }

        function c(a) {
            return !(a < this.start) && (this.exclusive ? a < this.end : a <= this.end)
        }
        return {
            initialize: a,
            _each: b,
            include: c
        }
    }()),
    Abstract = {},
    Try = {
        these: function() {
            for (var a, b = 0, c = arguments.length; b < c; b++) {
                var d = arguments[b];
                try {
                    a = d();
                    break
                } catch (a) {}
            }
            return a
        }
    },
    Ajax = {
        getTransport: function() {
            return Try.these(function() {
                return new XMLHttpRequest
            }, function() {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }, function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }) || !1
        },
        activeRequestCount: 0
    };
Ajax.Responders = {
        responders: [],
        _each: function(a, b) {
            this.responders._each(a, b)
        },
        register: function(a) {
            this.include(a) || this.responders.push(a)
        },
        unregister: function(a) {
            this.responders = this.responders.without(a)
        },
        dispatch: function(a, b, c, d) {
            this.each(function(e) {
                if (Object.isFunction(e[a])) try {
                    e[a].apply(e, [b, c, d])
                } catch (a) {}
            })
        }
    }, Object.extend(Ajax.Responders, Enumerable), Ajax.Responders.register({
        onCreate: function() {
            Ajax.activeRequestCount++
        },
        onComplete: function() {
            Ajax.activeRequestCount--
        }
    }), Ajax.Base = Class.create({
        initialize: function(a) {
            this.options = {
                method: "post",
                asynchronous: !0,
                contentType: "application/x-www-form-urlencoded",
                encoding: "UTF-8",
                parameters: "",
                evalJSON: !0,
                evalJS: !0
            }, Object.extend(this.options, a || {}), this.options.method = this.options.method.toLowerCase(), Object.isHash(this.options.parameters) && (this.options.parameters = this.options.parameters.toObject())
        }
    }), Ajax.Request = Class.create(Ajax.Base, {
        _complete: !1,
        initialize: function(a, b, c) {
            a(c), this.transport = Ajax.getTransport(), this.request(b)
        },
        request: function(a) {
            this.url = a, this.method = this.options.method;
            var b = Object.isString(this.options.parameters) ? this.options.parameters : Object.toQueryString(this.options.parameters);
            ["get", "post"].include(this.method) || (b += (b ? "&" : "") + "_method=" + this.method, this.method = "post"), b && "get" === this.method && (this.url += (this.url.include("?") ? "&" : "?") + b), this.parameters = b.toQueryParams();
            try {
                var c = new Ajax.Response(this);
                this.options.onCreate && this.options.onCreate(c), Ajax.Responders.dispatch("onCreate", this, c), this.transport.open(this.method.toUpperCase(), this.url, this.options.asynchronous), this.options.asynchronous && this.respondToReadyState.bind(this).defer(1), this.transport.onreadystatechange = this.onStateChange.bind(this), this.setRequestHeaders(), this.body = "post" == this.method ? this.options.postBody || b : null, this.transport.send(this.body), !this.options.asynchronous && this.transport.overrideMimeType && this.onStateChange()
            } catch (a) {
                this.dispatchException(a)
            }
        },
        onStateChange: function() {
            var a = this.transport.readyState;
            a > 1 && (4 != a || !this._complete) && this.respondToReadyState(this.transport.readyState)
        },
        setRequestHeaders: function() {
            var a = {
                "X-Requested-With": "XMLHttpRequest",
                "X-Prototype-Version": Prototype.Version,
                Accept: "text/javascript, text/html, application/xml, text/xml, */*"
            };
            if ("post" == this.method && (a["Content-type"] = this.options.contentType + (this.options.encoding ? "; charset=" + this.options.encoding : ""), this.transport.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0, 2005])[1] < 2005 && (a.Connection = "close")), "object" == typeof this.options.requestHeaders) {
                var b = this.options.requestHeaders;
                if (Object.isFunction(b.push))
                    for (var c = 0, d = b.length; c < d; c += 2) a[b[c]] = b[c + 1];
                else $H(b).each(function(b) {
                    a[b.key] = b.value
                })
            }
            for (var e in a) null != a[e] && this.transport.setRequestHeader(e, a[e])
        },
        success: function() {
            var a = this.getStatus();
            return !a || a >= 200 && a < 300 || 304 == a
        },
        getStatus: function() {
            try {
                return 1223 === this.transport.status ? 204 : this.transport.status || 0
            } catch (a) {
                return 0
            }
        },
        respondToReadyState: function(a) {
            var b = Ajax.Request.Events[a],
                c = new Ajax.Response(this);
            if ("Complete" == b) {
                try {
                    this._complete = !0, (this.options["on" + c.status] || this.options["on" + (this.success() ? "Success" : "Failure")] || Prototype.emptyFunction)(c, c.headerJSON)
                } catch (a) {
                    this.dispatchException(a)
                }
                var d = c.getHeader("Content-type");
                ("force" == this.options.evalJS || this.options.evalJS && this.isSameOrigin() && d && d.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)) && this.evalResponse()
            }
            try {
                (this.options["on" + b] || Prototype.emptyFunction)(c, c.headerJSON), Ajax.Responders.dispatch("on" + b, this, c, c.headerJSON)
            } catch (a) {
                this.dispatchException(a)
            }
            "Complete" == b && (this.transport.onreadystatechange = Prototype.emptyFunction)
        },
        isSameOrigin: function() {
            var a = this.url.match(/^\s*https?:\/\/[^\/]*/);
            return !a || a[0] == "#{protocol}//#{domain}#{port}".interpolate({
                protocol: location.protocol,
                domain: document.domain,
                port: location.port ? ":" + location.port : ""
            })
        },
        getHeader: function(a) {
            try {
                return this.transport.getResponseHeader(a) || null
            } catch (a) {
                return null
            }
        },
        evalResponse: function() {
            try {
                return eval((this.transport.responseText || "").unfilterJSON())
            } catch (a) {
                this.dispatchException(a)
            }
        },
        dispatchException: function(a) {
            (this.options.onException || Prototype.emptyFunction)(this, a), Ajax.Responders.dispatch("onException", this, a)
        }
    }), Ajax.Request.Events = ["Uninitialized", "Loading", "Loaded", "Interactive", "Complete"], Ajax.Response = Class.create({
        initialize: function(a) {
            this.request = a;
            var b = this.transport = a.transport,
                c = this.readyState = b.readyState;
            if ((c > 2 && !Prototype.Browser.IE || 4 == c) && (this.status = this.getStatus(), this.statusText = this.getStatusText(), this.responseText = String.interpret(b.responseText), this.headerJSON = this._getHeaderJSON()), 4 == c) {
                var d = b.responseXML;
                this.responseXML = Object.isUndefined(d) ? null : d, this.responseJSON = this._getResponseJSON()
            }
        },
        status: 0,
        statusText: "",
        getStatus: Ajax.Request.prototype.getStatus,
        getStatusText: function() {
            try {
                return this.transport.statusText || ""
            } catch (a) {
                return ""
            }
        },
        getHeader: Ajax.Request.prototype.getHeader,
        getAllHeaders: function() {
            try {
                return this.getAllResponseHeaders()
            } catch (a) {
                return null
            }
        },
        getResponseHeader: function(a) {
            return this.transport.getResponseHeader(a)
        },
        getAllResponseHeaders: function() {
            return this.transport.getAllResponseHeaders()
        },
        _getHeaderJSON: function() {
            var a = this.getHeader("X-JSON");
            if (!a) return null;
            try {
                a = decodeURIComponent(escape(a))
            } catch (a) {}
            try {
                return a.evalJSON(this.request.options.sanitizeJSON || !this.request.isSameOrigin())
            } catch (a) {
                this.request.dispatchException(a)
            }
        },
        _getResponseJSON: function() {
            var a = this.request.options;
            if (!a.evalJSON || "force" != a.evalJSON && !(this.getHeader("Content-type") || "").include("application/json") || this.responseText.blank()) return null;
            try {
                return this.responseText.evalJSON(a.sanitizeJSON || !this.request.isSameOrigin())
            } catch (a) {
                this.request.dispatchException(a)
            }
        }
    }), Ajax.Updater = Class.create(Ajax.Request, {
        initialize: function(a, b, c, d) {
            this.container = {
                success: b.success || b,
                failure: b.failure || (b.success ? null : b)
            }, d = Object.clone(d);
            var e = d.onComplete;
            d.onComplete = function(a, b) {
                this.updateContent(a.responseText), Object.isFunction(e) && e(a, b)
            }.bind(this), a(c, d)
        },
        updateContent: function(a) {
            var b = this.container[this.success() ? "success" : "failure"],
                c = this.options;
            if (c.evalScripts || (a = a.stripScripts()), b = $(b))
                if (c.insertion)
                    if (Object.isString(c.insertion)) {
                        var d = {};
                        d[c.insertion] = a, b.insert(d)
                    } else c.insertion(b, a);
            else b.update(a)
        }
    }), Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
        initialize: function(a, b, c, d) {
            a(d), this.onComplete = this.options.onComplete, this.frequency = this.options.frequency || 2, this.decay = this.options.decay || 1, this.updater = {}, this.container = b, this.url = c, this.start()
        },
        start: function() {
            this.options.onComplete = this.updateComplete.bind(this), this.onTimerEvent()
        },
        stop: function() {
            this.updater.options.onComplete = void 0, clearTimeout(this.timer), (this.onComplete || Prototype.emptyFunction).apply(this, arguments)
        },
        updateComplete: function(a) {
            this.options.decay && (this.decay = a.responseText == this.lastText ? this.decay * this.options.decay : 1, this.lastText = a.responseText), this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency)
        },
        onTimerEvent: function() {
            this.updater = new Ajax.Updater(this.container, this.url, this.options)
        }
    }),
    function(a) {
        function b(a) {
            if (arguments.length > 1) {
                for (var c = 0, e = [], f = arguments.length; c < f; c++) e.push(b(arguments[c]));
                return e
            }
            return Object.isString(a) && (a = document.getElementById(a)), d.extend(a)
        }

        function c(a, b) {
            return "select" !== a && !("type" in b)
        }

        function d(a, b) {
            if (b = b || {}, a = a.toLowerCase(), La && b.name) return a = "<" + a + ' name="' + b.name + '">', delete b.name, d.writeAttribute(document.createElement(a), b);
            Ka[a] || (Ka[a] = d.extend(document.createElement(a)));
            var e = c(a, b) ? Ka[a].cloneNode(!1) : document.createElement(a);
            return d.writeAttribute(e, b)
        }

        function e(a) {
            a = b(a);
            var c, d, e = "<" + a.tagName.toLowerCase();
            for (var f in Oa) c = Oa[f], (d = (a[f] || "").toString()) && (e += " " + c + "=" + d.inspect(!0));
            return e + ">"
        }

        function f(a) {
            return "none" !== b(a).style.display
        }

        function g(a, c) {
            return a = b(a), Object.isUndefined(c) && (c = !d.visible(a)), d[c ? "show" : "hide"](a), a
        }

        function h(a) {
            return a = b(a), a.style.display = "none", a
        }

        function i(a) {
            return a = b(a), a.style.display = "", a
        }

        function j(a) {
            return a = b(a), a.parentNode.removeChild(a), a
        }

        function k(a, c) {
            a = b(a);
            for (var d = a.getElementsByTagName("*"), e = d.length; e--;) v(d[e]);
            if (c && c.toElement && (c = c.toElement()), Object.isElement(c)) return a.update().insert(c);
            c = Object.toHTML(c);
            var f = a.tagName.toUpperCase();
            if ("SCRIPT" === f && Ta) return a.text = c, a;
            if (Sa)
                if (f in Ua.tags) {
                    for (; a.firstChild;) a.removeChild(a.firstChild);
                    for (var g, h = t(f, c.stripScripts()), e = 0; g = h[e]; e++) a.appendChild(g)
                } else if (Ra && Object.isString(c) && c.indexOf("<link") > -1) {
                for (; a.firstChild;) a.removeChild(a.firstChild);
                for (var g, h = t(f, c.stripScripts(), !0), e = 0; g = h[e]; e++) a.appendChild(g)
            } else a.innerHTML = c.stripScripts();
            else a.innerHTML = c.stripScripts();
            return c.evalScripts.bind(c).defer(), a
        }

        function l(a, c) {
            if (a = b(a), c && c.toElement) c = c.toElement();
            else if (!Object.isElement(c)) {
                c = Object.toHTML(c);
                var d = a.ownerDocument.createRange();
                d.selectNode(a), c.evalScripts.bind(c).defer(), c = d.createContextualFragment(c.stripScripts())
            }
            return a.parentNode.replaceChild(c, a), a
        }

        function m(a, c) {
            if (a = b(a), c && c.toElement && (c = c.toElement()), Object.isElement(c)) return a.parentNode.replaceChild(c, a), a;
            c = Object.toHTML(c);
            var e = a.parentNode,
                f = e.tagName.toUpperCase();
            if (f in Ua.tags) {
                var g = d.next(a),
                    h = t(f, c.stripScripts());
                e.removeChild(a);
                var i;
                i = g ? function(a) {
                    e.insertBefore(a, g)
                } : function(a) {
                    e.appendChild(a)
                }, h.each(i)
            } else a.outerHTML = c.stripScripts();
            return c.evalScripts.bind(c).defer(), a
        }

        function n(a) {
            return !Object.isUndefined(a) && null !== a && (!(!Object.isString(a) && !Object.isNumber(a)) || (!!Object.isElement(a) || !(!a.toElement && !a.toHTML)))
        }

        function o(a, b, c) {
            c = c.toLowerCase();
            var d = Ua[c];
            if (b && b.toElement && (b = b.toElement()), Object.isElement(b)) return d(a, b), a;
            b = Object.toHTML(b);
            var e = ("before" === c || "after" === c ? a.parentNode : a).tagName.toUpperCase(),
                f = t(e, b.stripScripts());
            "top" !== c && "after" !== c || f.reverse();
            for (var g, h = 0; g = f[h]; h++) d(a, g);
            b.evalScripts.bind(b).defer()
        }

        function p(a, c) {
            a = b(a), n(c) && (c = {
                bottom: c
            });
            for (var d in c) o(a, c[d], d);
            return a
        }

        function q(a, c, e) {
            return a = b(a), Object.isElement(c) ? b(c).writeAttribute(e || {}) : c = Object.isString(c) ? new d(c, e) : new d("div", c), a.parentNode && a.parentNode.replaceChild(c, a), c.appendChild(a), c
        }

        function r(a) {
            a = b(a);
            for (var c = a.firstChild; c;) {
                var d = c.nextSibling;
                c.nodeType !== Node.TEXT_NODE || /\S/.test(c.nodeValue) || a.removeChild(c), c = d
            }
            return a
        }

        function s(a) {
            return b(a).innerHTML.blank()
        }

        function t(a, b, c) {
            var d = Ua.tags[a],
                e = Ja,
                f = !!d;
            if (!f && c && (f = !0, d = ["", "", 0]), f) {
                e.innerHTML = "&#160;" + d[0] + b + d[1], e.removeChild(e.firstChild);
                for (var g = d[2]; g--;) e = e.firstChild
            } else e.innerHTML = b;
            return $A(e.childNodes)
        }

        function u(a, c) {
            if (a = b(a)) {
                var e = a.cloneNode(c);
                if (!ib && (e._prototypeUID = Ha, c))
                    for (var f = d.select(e, "*"), g = f.length; g--;) f[g]._prototypeUID = Ha;
                return d.extend(e)
            }
        }

        function v(a) {
            var b = ra(a);
            b && (d.stopObserving(a), ib || (a._prototypeUID = Ha), delete d.Storage[b])
        }

        function w(a) {
            for (var b, c, e = a.length; e--;) b = a[e], c = ra(b), delete d.Storage[c], delete Event.cache[c]
        }

        function x(a) {
            if (a = b(a)) {
                v(a);
                for (var c = a.getElementsByTagName("*"), d = c.length; d--;) v(c[d]);
                return null
            }
        }

        function y(a, c, e) {
            a = b(a), e = e || -1;
            for (var f = [];
                (a = a[c]) && (a.nodeType === Node.ELEMENT_NODE && f.push(d.extend(a)), f.length !== e););
            return f
        }

        function z(a) {
            return y(a, "parentNode")
        }

        function A(a) {
            return d.select(a, "*")
        }

        function B(a) {
            for (a = b(a).firstChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.nextSibling;
            return b(a)
        }

        function C(a) {
            for (var c = [], e = b(a).firstChild; e;) e.nodeType === Node.ELEMENT_NODE && c.push(d.extend(e)), e = e.nextSibling;
            return c
        }

        function D(a) {
            return y(a, "previousSibling")
        }

        function E(a) {
            return y(a, "nextSibling")
        }

        function F(a) {
            a = b(a);
            var c = D(a),
                d = E(a);
            return c.reverse().concat(d)
        }

        function G(a, c) {
            return a = b(a), Object.isString(c) ? Prototype.Selector.match(a, c) : c.match(a)
        }

        function H(a, c, e, f) {
            for (a = b(a), e = e || 0, f = f || 0, Object.isNumber(e) && (f = e, e = null); a = a[c];)
                if (1 === a.nodeType && (!e || Prototype.Selector.match(a, e)) && !(--f >= 0)) return d.extend(a)
        }

        function I(a, c, d) {
            return a = b(a), 1 === arguments.length ? b(a.parentNode) : H(a, "parentNode", c, d)
        }

        function J(a, c, e) {
            if (1 === arguments.length) return B(a);
            a = b(a), c = c || 0, e = e || 0, Object.isNumber(c) && (e = c, c = "*");
            var f = Prototype.Selector.select(c, a)[e];
            return d.extend(f)
        }

        function K(a, b, c) {
            return H(a, "previousSibling", b, c)
        }

        function L(a, b, c) {
            return H(a, "nextSibling", b, c)
        }

        function M(a) {
            a = b(a);
            var c = Ia.call(arguments, 1).join(", ");
            return Prototype.Selector.select(c, a)
        }

        function N(a) {
            a = b(a);
            for (var c, e = Ia.call(arguments, 1).join(", "), f = d.siblings(a), g = [], h = 0; c = f[h]; h++) Prototype.Selector.match(c, e) && g.push(c);
            return g
        }

        function O(a, c) {
            for (a = b(a), c = b(c); a = a.parentNode;)
                if (a === c) return !0;
            return !1
        }

        function P(a, c) {
            return a = b(a), c = b(c), c.contains ? c.contains(a) && c !== a : O(a, c)
        }

        function Q(a, c) {
            return a = b(a), c = b(c), 8 == (8 & a.compareDocumentPosition(c))
        }

        function R(a) {
            a = b(a);
            var c = d.readAttribute(a, "id");
            if (c) return c;
            do {
                c = "anonymous_element_" + Xa++
            } while (b(c));
            return d.writeAttribute(a, "id", c), c
        }

        function S(a, c) {
            return b(a).getAttribute(c)
        }

        function T(a, c) {
            a = b(a);
            var d = $a.read;
            return d.values[c] ? d.values[c](a, c) : (d.names[c] && (c = d.names[c]), c.include(":") ? a.attributes && a.attributes[c] ? a.attributes[c].value : null : a.getAttribute(c))
        }

        function U(a, b) {
            return "title" === b ? a.title : a.getAttribute(b)
        }

        function V(a, c, d) {
            a = b(a);
            var e = {},
                f = $a.write;
            "object" == typeof c ? e = c : e[c] = !!Object.isUndefined(d) || d;
            for (var g in e) c = f.names[g] || g, d = e[g], f.values[g] && (c = f.values[g](a, d) || c), !1 === d || null === d ? a.removeAttribute(c) : !0 === d ? a.setAttribute(c, c) : a.setAttribute(c, d);
            return a
        }

        function W(a, c) {
            c = $a.has[c] || c;
            var d = b(a).getAttributeNode(c);
            return !(!d || !d.specified)
        }

        function X(a, b) {
            return "checked" === b ? a.checked : W(a, b)
        }

        function Y(a) {
            return new d.ClassNames(a)
        }

        function Z(a) {
            if (Za[a]) return Za[a];
            var b = new RegExp("(^|\\s+)" + a + "(\\s+|$)");
            return Za[a] = b, b
        }

        function $(a, c) {
            if (a = b(a)) {
                var d = a.className;
                return 0 !== d.length && (d === c || Z(c).test(d))
            }
        }

        function _(a, c) {
            if (a = b(a)) return $(a, c) || (a.className += (a.className ? " " : "") + c), a
        }

        function aa(a, c) {
            if (a = b(a)) return a.className = a.className.replace(Z(c), " ").strip(), a
        }

        function ba(a, c, e) {
            if (a = b(a)) {
                Object.isUndefined(e) && (e = !$(a, c));
                return (0, d[e ? "addClassName" : "removeClassName"])(a, c)
            }
        }

        function ca(a, b) {
            return a.getAttribute(b)
        }

        function da(a, b) {
            return a.getAttribute(b, 2)
        }

        function ea(a, b) {
            var c = a.getAttributeNode(b);
            return c ? c.value : ""
        }

        function fa(a, c) {
            return b(a).hasAttribute(c) ? c : null
        }

        function ga(a) {
            return "float" === a || "styleFloat" === a ? "cssFloat" : a.camelize()
        }

        function ha(a) {
            return "float" === a || "cssFloat" === a ? "styleFloat" : a.camelize()
        }

        function ia(a, c) {
            a = b(a);
            var e = a.style;
            if (Object.isString(c)) {
                if (e.cssText += ";" + c, c.include("opacity")) {
                    var f = c.match(/opacity:\s*(\d?\.?\d*)/)[1];
                    d.setOpacity(a, f)
                }
                return a
            }
            for (var g in c)
                if ("opacity" === g) d.setOpacity(a, c[g]);
                else {
                    var h = c[g];
                    "float" !== g && "cssFloat" !== g || (g = Object.isUndefined(e.styleFloat) ? "cssFloat" : "styleFloat"), e[g] = h
                }
            return a
        }

        function ja(a, c) {
            a = b(a), c = ga(c);
            var d = a.style[c];
            if (!d || "auto" === d) {
                var e = document.defaultView.getComputedStyle(a, null);
                d = e ? e[c] : null
            }
            return "opacity" === c ? d ? parseFloat(d) : 1 : "auto" === d ? null : d
        }

        function ka(a, c) {
            a = b(a), c = ha(c);
            var e = a.style[c];
            return !e && a.currentStyle && (e = a.currentStyle[c]), "opacity" !== c || hb ? "auto" === e ? "width" !== c && "height" !== c || !d.visible(a) ? null : d.measure(a, c) + "px" : e : qa(a)
        }

        function la(a) {
            return (a || "").replace(/alpha\([^\)]*\)/gi, "")
        }

        function ma(a) {
            return a.currentStyle && a.currentStyle.hasLayout || (a.style.zoom = 1), a
        }

        function na(a, c) {
            return a = b(a), 1 == c || "" === c ? c = "" : c < 1e-5 && (c = 0), a.style.opacity = c, a
        }

        function oa(a, c) {
            if (hb) return na(a, c);
            a = ma(b(a));
            var e = d.getStyle(a, "filter"),
                f = a.style;
            return 1 == c || "" === c ? (e = la(e), e ? f.filter = e : f.removeAttribute("filter"), a) : (c < 1e-5 && (c = 0), f.filter = la(e) + "alpha(opacity=" + 100 * c + ")", a)
        }

        function pa(a) {
            return d.getStyle(a, "opacity")
        }

        function qa(a) {
            if (hb) return pa(a);
            var b = d.getStyle(a, "filter");
            if (0 === b.length) return 1;
            var c = (b || "").match(/alpha\(opacity=(.*)\)/);
            return c && c[1] ? parseFloat(c[1]) / 100 : 1
        }

        function ra(a) {
            return a === window ? 0 : (void 0 === a._prototypeUID && (a._prototypeUID = d.Storage.UID++), a._prototypeUID)
        }

        function sa(a) {
            return a === window ? 0 : a == document ? 1 : a.uniqueID
        }

        function ta(a) {
            if (a = b(a)) {
                var c = ra(a);
                return d.Storage[c] || (d.Storage[c] = $H()), d.Storage[c]
            }
        }

        function ua(a, c, d) {
            if (a = b(a)) {
                var e = ta(a);
                return 2 === arguments.length ? e.update(c) : e.set(c, d), a
            }
        }

        function va(a, c, d) {
            if (a = b(a)) {
                var e = ta(a),
                    f = e.get(c);
                return Object.isUndefined(f) && (e.set(c, d), f = d), f
            }
        }

        function wa(a) {
            if (void 0 === window.Element) return !1;
            if (!La) return !1;
            var b = window.Element.prototype;
            if (b) {
                var c = "_" + (Math.random() + "").slice(2),
                    d = document.createElement(a);
                b[c] = "x";
                var e = "x" !== d[c];
                return delete b[c], d = null, e
            }
            return !1
        }

        function xa(a, b) {
            for (var c in b) {
                var d = b[c];
                !Object.isFunction(d) || c in a || (a[c] = d.methodize())
            }
        }

        function ya(a) {
            return ra(a) in nb
        }

        function za(a) {
            if (!a || ya(a)) return a;
            if (a.nodeType !== Node.ELEMENT_NODE || a == window) return a;
            var b = Object.clone(jb),
                c = a.tagName.toUpperCase();
            return kb[c] && Object.extend(b, kb[c]), xa(a, b), nb[ra(a)] = !0, a
        }

        function Aa(a) {
            if (!a || ya(a)) return a;
            var b = a.tagName;
            return b && /^(?:object|applet|embed)$/i.test(b) && (xa(a, d.Methods), xa(a, d.Methods.Simulated), xa(a, d.Methods.ByTag[b.toUpperCase()])), a
        }

        function Ba(a, b) {
            a = a.toUpperCase(), kb[a] || (kb[a] = {}), Object.extend(kb[a], b)
        }

        function Ca(a, b, c) {
            Object.isUndefined(c) && (c = !1);
            for (var d in b) {
                var e = b[d];
                Object.isFunction(e) && (c && d in a || (a[d] = e.methodize()))
            }
        }

        function Da(a) {
            var b, c = {
                OPTGROUP: "OptGroup",
                TEXTAREA: "TextArea",
                P: "Paragraph",
                FIELDSET: "FieldSet",
                UL: "UList",
                OL: "OList",
                DL: "DList",
                DIR: "Directory",
                H1: "Heading",
                H2: "Heading",
                H3: "Heading",
                H4: "Heading",
                H5: "Heading",
                H6: "Heading",
                Q: "Quote",
                INS: "Mod",
                DEL: "Mod",
                A: "Anchor",
                IMG: "Image",
                CAPTION: "TableCaption",
                COL: "TableCol",
                COLGROUP: "TableCol",
                THEAD: "TableSection",
                TFOOT: "TableSection",
                TBODY: "TableSection",
                TR: "TableRow",
                TH: "TableCell",
                TD: "TableCell",
                FRAMESET: "FrameSet",
                IFRAME: "IFrame"
            };
            if (c[a] && (b = "HTML" + c[a] + "Element"), window[b]) return window[b];
            if (b = "HTML" + a + "Element", window[b]) return window[b];
            if (b = "HTML" + a.capitalize() + "Element", window[b]) return window[b];
            var d = document.createElement(a),
                e = d.__proto__ || d.constructor.prototype;
            return d = null, e
        }

        function Ea(a) {
            if (0 === arguments.length && Fa(), 2 === arguments.length) {
                var b = a;
                a = arguments[1]
            }
            if (b)
                if (Object.isArray(b))
                    for (var c, e = 0; c = b[e]; e++) Ba(c, a);
                else Ba(b, a);
            else Object.extend(d.Methods, a || {});
            var f = window.HTMLElement ? HTMLElement.prototype : d.prototype;
            if (lb.ElementExtensions && (Ca(f, d.Methods), Ca(f, d.Methods.Simulated, !0)), lb.SpecificElementExtensions)
                for (var c in d.Methods.ByTag) {
                    var g = Da(c);
                    Object.isUndefined(g) || Ca(g.prototype, kb[c])
                }
            Object.extend(d, d.Methods), Object.extend(d, d.Methods.Simulated), delete d.ByTag, delete d.Simulated, d.extend.refresh(), Ka = {}
        }

        function Fa() {
            Object.extend(Form, Form.Methods), Object.extend(Form.Element, Form.Element.Methods), Object.extend(d.Methods.ByTag, {
                FORM: Object.clone(Form.Methods),
                INPUT: Object.clone(Form.Element.Methods),
                SELECT: Object.clone(Form.Element.Methods),
                TEXTAREA: Object.clone(Form.Element.Methods),
                BUTTON: Object.clone(Form.Element.Methods)
            })
        }

        function Ga() {
            Ja = null, Ka = null
        }
        var Ha, Ia = Array.prototype.slice,
            Ja = document.createElement("div");
        a.$ = b, a.Node || (a.Node = {}), a.Node.ELEMENT_NODE || Object.extend(a.Node, {
            ELEMENT_NODE: 1,
            ATTRIBUTE_NODE: 2,
            TEXT_NODE: 3,
            CDATA_SECTION_NODE: 4,
            ENTITY_REFERENCE_NODE: 5,
            ENTITY_NODE: 6,
            PROCESSING_INSTRUCTION_NODE: 7,
            COMMENT_NODE: 8,
            DOCUMENT_NODE: 9,
            DOCUMENT_TYPE_NODE: 10,
            DOCUMENT_FRAGMENT_NODE: 11,
            NOTATION_NODE: 12
        });
        var Ka = {},
            La = function() {
                try {
                    var a = document.createElement('<input name="x">');
                    return "input" === a.tagName.toLowerCase() && "x" === a.name
                } catch (a) {
                    return !1
                }
            }(),
            Ma = a.Element;
        a.Element = d, Object.extend(a.Element, Ma || {}), Ma && (a.Element.prototype = Ma.prototype), d.Methods = {
            ByTag: {},
            Simulated: {}
        };
        var Na = {},
            Oa = {
                id: "id",
                className: "class"
            };
        Na.inspect = e, Object.extend(Na, {
            visible: f,
            toggle: g,
            hide: h,
            show: i
        });
        var Pa = function() {
                var a = document.createElement("select"),
                    b = !0;
                return a.innerHTML = '<option value="test">test</option>', a.options && a.options[0] && (b = "OPTION" !== a.options[0].nodeName.toUpperCase()), a = null, b
            }(),
            Qa = function() {
                try {
                    var a = document.createElement("table");
                    if (a && a.tBodies) {
                        a.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
                        var b = void 0 === a.tBodies[0];
                        return a = null, b
                    }
                } catch (a) {
                    return !0
                }
            }(),
            Ra = function() {
                try {
                    var a = document.createElement("div");
                    a.innerHTML = "<link />";
                    var b = 0 === a.childNodes.length;
                    return a = null, b
                } catch (a) {
                    return !0
                }
            }(),
            Sa = Pa || Qa || Ra,
            Ta = function() {
                var a = document.createElement("script"),
                    b = !1;
                try {
                    a.appendChild(document.createTextNode("")), b = !a.firstChild || a.firstChild && 3 !== a.firstChild.nodeType
                } catch (a) {
                    b = !0
                }
                return a = null, b
            }(),
            Ua = {
                before: function(a, b) {
                    a.parentNode.insertBefore(b, a)
                },
                top: function(a, b) {
                    a.insertBefore(b, a.firstChild)
                },
                bottom: function(a, b) {
                    a.appendChild(b)
                },
                after: function(a, b) {
                    a.parentNode.insertBefore(b, a.nextSibling)
                },
                tags: {
                    TABLE: ["<table>", "</table>", 1],
                    TBODY: ["<table><tbody>", "</tbody></table>", 2],
                    TR: ["<table><tbody><tr>", "</tr></tbody></table>", 3],
                    TD: ["<table><tbody><tr><td>", "</td></tr></tbody></table>", 4],
                    SELECT: ["<select>", "</select>", 1]
                }
            },
            Va = Ua.tags;
        Object.extend(Va, {
            THEAD: Va.TBODY,
            TFOOT: Va.TBODY,
            TH: Va.TD
        }), "outerHTML" in document.documentElement && (l = m), Object.extend(Na, {
            remove: j,
            update: k,
            replace: l,
            insert: p,
            wrap: q,
            cleanWhitespace: r,
            empty: s,
            clone: u,
            purge: x
        });
        var Wa;
        Wa = Ja.compareDocumentPosition ? Q : Ja.contains ? P : O, Object.extend(Na, {
            recursivelyCollect: y,
            ancestors: z,
            descendants: A,
            firstDescendant: B,
            immediateDescendants: C,
            previousSiblings: D,
            nextSiblings: E,
            siblings: F,
            match: G,
            up: I,
            down: J,
            previous: K,
            next: L,
            select: M,
            adjacent: N,
            descendantOf: Wa,
            getElementsBySelector: M,
            childElements: C
        });
        var Xa = 1;
        ! function() {
            Ja.setAttribute("onclick", []);
            var a = Ja.getAttribute("onclick"),
                b = Object.isArray(a);
            return Ja.removeAttribute("onclick"), b
        }() ? Prototype.Browser.Opera && (S = U): S = T;
        var Ya = function() {
            if (!La) return !1;
            var a = document.createElement('<input type="checkbox">');
            a.checked = !0;
            var b = a.getAttributeNode("checked");
            return !b || !b.specified
        }();
        a.Element.Methods.Simulated.hasAttribute = Ya ? X : W;
        var Za = {},
            $a = {},
            _a = "className",
            ab = "for";
        Ja.setAttribute(_a, "x"), "x" !== Ja.className && (Ja.setAttribute("class", "x"), "x" === Ja.className && (_a = "class"));
        var bb = document.createElement("label");
        bb.setAttribute(ab, "x"), "x" !== bb.htmlFor && (bb.setAttribute("htmlFor", "x"), "x" === bb.htmlFor && (ab = "htmlFor")), bb = null, Ja.onclick = Prototype.emptyFunction;
        var cb, db = Ja.getAttribute("onclick");
        String(db).indexOf("{") > -1 ? cb = function(a, b) {
            var c = a.getAttribute(b);
            return c ? (c = c.toString(), c = c.split("{")[1], c = c.split("}")[0], c.strip()) : null
        } : "" === db && (cb = function(a, b) {
            var c = a.getAttribute(b);
            return c ? c.strip() : null
        }), $a.read = {
            names: {
                class: _a,
                className: _a,
                for: ab,
                htmlFor: ab
            },
            values: {
                style: function(a) {
                    return a.style.cssText.toLowerCase()
                },
                title: function(a) {
                    return a.title
                }
            }
        }, $a.write = {
            names: {
                className: "class",
                htmlFor: "for",
                cellpadding: "cellPadding",
                cellspacing: "cellSpacing"
            },
            values: {
                checked: function(a, b) {
                    a.checked = !!b
                },
                style: function(a, b) {
                    a.style.cssText = b || ""
                }
            }
        }, $a.has = {
            names: {}
        }, Object.extend($a.write.names, $a.read.names);
        for (var eb, fb = $w("colSpan rowSpan vAlign dateTime accessKey tabIndex encType maxLength readOnly longDesc frameBorder"), gb = 0; eb = fb[gb]; gb++) $a.write.names[eb.toLowerCase()] = eb, $a.has.names[eb.toLowerCase()] = eb;
        Object.extend($a.read.values, {
            href: da,
            src: da,
            type: ca,
            action: ea,
            disabled: fa,
            checked: fa,
            readonly: fa,
            multiple: fa,
            onload: cb,
            onunload: cb,
            onclick: cb,
            ondblclick: cb,
            onmousedown: cb,
            onmouseup: cb,
            onmouseover: cb,
            onmousemove: cb,
            onmouseout: cb,
            onfocus: cb,
            onblur: cb,
            onkeypress: cb,
            onkeydown: cb,
            onkeyup: cb,
            onsubmit: cb,
            onreset: cb,
            onselect: cb,
            onchange: cb
        }), Object.extend(Na, {
            identify: R,
            readAttribute: S,
            writeAttribute: V,
            classNames: Y,
            hasClassName: $,
            addClassName: _,
            removeClassName: aa,
            toggleClassName: ba
        });
        var hb = function() {
            return Ja.style.cssText = "opacity:.55", /^0.55/.test(Ja.style.opacity)
        }();
        Object.extend(Na, {
            setStyle: ia,
            getStyle: ja,
            setOpacity: na,
            getOpacity: pa
        }), "styleFloat" in Ja.style && (Na.getStyle = ka, Na.setOpacity = oa, Na.getOpacity = qa);
        a.Element.Storage = {
            UID: 1
        };
        var ib = "uniqueID" in Ja;
        ib && (ra = sa), Object.extend(Na, {
            getStorage: ta,
            store: ua,
            retrieve: va
        });
        var jb = {},
            kb = d.Methods.ByTag,
            lb = Prototype.BrowserFeatures;
        !lb.ElementExtensions && "__proto__" in Ja && (a.HTMLElement = {}, a.HTMLElement.prototype = Ja.__proto__, lb.ElementExtensions = !0);
        var mb = wa("object"),
            nb = {};
        lb.SpecificElementExtensions && (za = mb ? Aa : Prototype.K), Object.extend(a.Element, {
            extend: za,
            addMethods: Ea
        }), za === Prototype.K ? a.Element.extend.refresh = Prototype.emptyFunction : a.Element.extend.refresh = function() {
            Prototype.BrowserFeatures.ElementExtensions || (Object.extend(jb, d.Methods), Object.extend(jb, d.Methods.Simulated), nb = {})
        }, d.addMethods(Na), window.attachEvent && window.attachEvent("onunload", Ga)
    }(this),
    function() {
        function a(a) {
            var b = a.match(/^(\d+)%?$/i);
            return b ? Number(b[1]) / 100 : null
        }

        function b(a, b) {
            a = $(a);
            var c = a.style[b];
            if (!c || "auto" === c) {
                var d = document.defaultView.getComputedStyle(a, null);
                c = d ? d[b] : null
            }
            return "opacity" === b ? c ? parseFloat(c) : 1 : "auto" === c ? null : c
        }

        function c(a, b) {
            var c = a.style[b];
            return !c && a.currentStyle && (c = a.currentStyle[b]), c
        }

        function d(a, b) {
            return a.offsetWidth - (e(a, "borderLeftWidth", b) || 0) - (e(a, "borderRightWidth", b) || 0) - (e(a, "paddingLeft", b) || 0) - (e(a, "paddingRight", b) || 0)
        }

        function e(c, d, e) {
            var f = null;
            if (Object.isElement(c) && (f = c, c = b(f, d)), null === c || Object.isUndefined(c)) return null;
            if (/^(?:-)?\d+(\.\d+)?(px)?$/i.test(c)) return window.parseFloat(c);
            var g = c.include("%"),
                h = e === document.viewport;
            if (/\d/.test(c) && f && f.runtimeStyle && (!g || !h)) {
                var i = f.style.left,
                    j = f.runtimeStyle.left;
                return f.runtimeStyle.left = f.currentStyle.left, f.style.left = c || 0, c = f.style.pixelLeft, f.style.left = i, f.runtimeStyle.left = j, c
            }
            if (f && g) {
                e = e || f.parentNode;
                var k = a(c),
                    l = null,
                    m = d.include("left") || d.include("right") || d.include("width"),
                    n = d.include("top") || d.include("bottom") || d.include("height");
                return e === document.viewport ? m ? l = document.viewport.getWidth() : n && (l = document.viewport.getHeight()) : m ? l = $(e).measure("width") : n && (l = $(e).measure("height")), null === l ? 0 : l * k
            }
            return 0
        }

        function f(a) {
            for (; a && a.parentNode;) {
                if ("none" === a.getStyle("display")) return !1;
                a = $(a.parentNode)
            }
            return !0
        }

        function g(a) {
            return a.include("border") && (a += "-width"), a.camelize()
        }

        function h(a, b) {
            return new Element.Layout(a, b)
        }

        function i(a, b) {
            return $(a).getLayout().get(b)
        }

        function j(a) {
            return Element.getDimensions(a).height
        }

        function k(a) {
            return Element.getDimensions(a).width
        }

        function l(a) {
            a = $(a);
            var b = Element.getStyle(a, "display");
            if (b && "none" !== b) return {
                width: a.offsetWidth,
                height: a.offsetHeight
            };
            var c = a.style,
                d = {
                    visibility: c.visibility,
                    position: c.position,
                    display: c.display
                },
                e = {
                    visibility: "hidden",
                    display: "block"
                };
            "fixed" !== d.position && (e.position = "absolute"), Element.setStyle(a, e);
            var f = {
                width: a.offsetWidth,
                height: a.offsetHeight
            };
            return Element.setStyle(a, d), f
        }

        function m(a) {
            if (a = $(a), B(a) || C(a) || z(a) || A(a)) return $(document.body);
            if ("inline" !== Element.getStyle(a, "display") && a.offsetParent) return $(a.offsetParent);
            for (;
                (a = a.parentNode) && a !== document.body;)
                if ("static" !== Element.getStyle(a, "position")) return A(a) ? $(document.body) : $(a);
            return $(document.body)
        }

        function n(a) {
            a = $(a);
            var b = 0,
                c = 0;
            if (a.parentNode)
                do {
                    b += a.offsetTop || 0, c += a.offsetLeft || 0, a = a.offsetParent
                } while (a);
            return new Element.Offset(c, b)
        }

        function o(a) {
            a = $(a);
            var b = a.getLayout(),
                c = 0,
                d = 0;
            do {
                if (c += a.offsetTop || 0, d += a.offsetLeft || 0, a = a.offsetParent) {
                    if (z(a)) break;
                    var e = Element.getStyle(a, "position");
                    if ("static" !== e) break
                }
            } while (a);
            return d -= b.get("margin-top"), c -= b.get("margin-left"), new Element.Offset(d, c)
        }

        function p(a) {
            var b = 0,
                c = 0;
            do {
                if (a === document.body) {
                    var d = document.documentElement || document.body.parentNode || document.body;
                    b += Object.isUndefined(window.pageYOffset) ? d.scrollTop || 0 : window.pageYOffset, c += Object.isUndefined(window.pageXOffset) ? d.scrollLeft || 0 : window.pageXOffset;
                    break
                }
                b += a.scrollTop || 0, c += a.scrollLeft || 0, a = a.parentNode
            } while (a);
            return new Element.Offset(c, b)
        }

        function q(a) {
            var b = 0,
                c = 0,
                d = document.body;
            a = $(a);
            var e = a;
            do {
                if (b += e.offsetTop || 0, c += e.offsetLeft || 0, e.offsetParent == d && "absolute" == Element.getStyle(e, "position")) break
            } while (e = e.offsetParent);
            e = a;
            do {
                e != d && (b -= e.scrollTop || 0, c -= e.scrollLeft || 0)
            } while (e = e.parentNode);
            return new Element.Offset(c, b)
        }

        function r(a) {
            if (a = $(a), "absolute" === Element.getStyle(a, "position")) return a;
            var b = m(a),
                c = a.viewportOffset(),
                d = b.viewportOffset(),
                e = c.relativeTo(d),
                f = a.getLayout();
            return a.store("prototype_absolutize_original_styles", {
                position: a.getStyle("position"),
                left: a.getStyle("left"),
                top: a.getStyle("top"),
                width: a.getStyle("width"),
                height: a.getStyle("height")
            }), a.setStyle({
                position: "absolute",
                top: e.top + "px",
                left: e.left + "px",
                width: f.get("width") + "px",
                height: f.get("height") + "px"
            }), a
        }

        function s(a) {
            if (a = $(a), "relative" === Element.getStyle(a, "position")) return a;
            var b = a.retrieve("prototype_absolutize_original_styles");
            return b && a.setStyle(b), a
        }

        function t(a) {
            a = $(a);
            var b = Element.cumulativeOffset(a);
            return window.scrollTo(b.left, b.top), a
        }

        function u(a) {
            a = $(a);
            var b = Element.getStyle(a, "position"),
                c = {};
            return "static" !== b && b || (c.position = "relative", Prototype.Browser.Opera && (c.top = 0, c.left = 0), Element.setStyle(a, c), Element.store(a, "prototype_made_positioned", !0)), a
        }

        function v(a) {
            a = $(a);
            var b = Element.getStorage(a);
            return b.get("prototype_made_positioned") && (b.unset("prototype_made_positioned"), Element.setStyle(a, {
                position: "",
                top: "",
                bottom: "",
                left: "",
                right: ""
            })), a
        }

        function w(a) {
            a = $(a);
            var b = Element.getStorage(a),
                c = b.get("prototype_made_clipping");
            if (Object.isUndefined(c)) {
                var d = Element.getStyle(a, "overflow");
                b.set("prototype_made_clipping", d), "hidden" !== d && (a.style.overflow = "hidden")
            }
            return a
        }

        function x(a) {
            a = $(a);
            var b = Element.getStorage(a),
                c = b.get("prototype_made_clipping");
            return Object.isUndefined(c) || (b.unset("prototype_made_clipping"), a.style.overflow = c || ""), a
        }

        function y(a, b, c) {
            c = Object.extend({
                setLeft: !0,
                setTop: !0,
                setWidth: !0,
                setHeight: !0,
                offsetTop: 0,
                offsetLeft: 0
            }, c || {}), b = $(b), a = $(a);
            var d, e, f, g = {};
            if ((c.setLeft || c.setTop) && (d = Element.viewportOffset(b), e = [0, 0], "absolute" === Element.getStyle(a, "position"))) {
                var h = Element.getOffsetParent(a);
                h !== document.body && (e = Element.viewportOffset(h))
            }
            return (c.setWidth || c.setHeight) && (f = Element.getLayout(b)), c.setLeft && (g.left = d[0] - e[0] + c.offsetLeft + "px"), c.setTop && (g.top = d[1] - e[1] + c.offsetTop + "px"), c.setWidth && (g.width = f.get("border-box-width") + "px"), c.setHeight && (g.height = f.get("border-box-height") + "px"), Element.setStyle(a, g)
        }

        function z(a) {
            return "BODY" === a.nodeName.toUpperCase()
        }

        function A(a) {
            return "HTML" === a.nodeName.toUpperCase()
        }

        function B(a) {
            return a.nodeType === Node.DOCUMENT_NODE
        }

        function C(a) {
            return a !== document.body && !Element.descendantOf(a, document.body)
        }
        "currentStyle" in document.documentElement && (b = c);
        var D = Prototype.K;
        "currentStyle" in document.documentElement && (D = function(a) {
            return a.currentStyle.hasLayout || (a.style.zoom = 1), a
        }), Element.Layout = Class.create(Hash, {
            initialize: function(a, b, c) {
                a(), this.element = $(b), Element.Layout.PROPERTIES.each(function(a) {
                    this._set(a, null)
                }, this), c && (this._preComputing = !0, this._begin(), Element.Layout.PROPERTIES.each(this._compute, this), this._end(), this._preComputing = !1)
            },
            _set: function(a, b) {
                return Hash.prototype.set.call(this, a, b)
            },
            set: function(a, b) {
                throw "Properties of Element.Layout are read-only."
            },
            get: function(a, b) {
                var c = a(b);
                return null === c ? this._compute(b) : c
            },
            _begin: function() {
                if (!this._isPrepared()) {
                    var a = this.element;
                    if (f(a)) return void this._setPrepared(!0);
                    var c = {
                        position: a.style.position || "",
                        width: a.style.width || "",
                        visibility: a.style.visibility || "",
                        display: a.style.display || ""
                    };
                    a.store("prototype_original_styles", c);
                    var e = b(a, "position"),
                        g = a.offsetWidth;
                    0 !== g && null !== g || (a.style.display = "block", g = a.offsetWidth);
                    var h = "fixed" === e ? document.viewport : a.parentNode,
                        i = {
                            visibility: "hidden",
                            display: "block"
                        };
                    "fixed" !== e && (i.position = "absolute"), a.setStyle(i);
                    var j, k = a.offsetWidth;
                    if (g && k === g) j = d(a, h);
                    else if ("absolute" === e || "fixed" === e) j = d(a, h);
                    else {
                        var l = a.parentNode,
                            m = $(l).getLayout();
                        j = m.get("width") - this.get("margin-left") - this.get("border-left") - this.get("padding-left") - this.get("padding-right") - this.get("border-right") - this.get("margin-right")
                    }
                    a.setStyle({
                        width: j + "px"
                    }), this._setPrepared(!0)
                }
            },
            _end: function() {
                var a = this.element,
                    b = a.retrieve("prototype_original_styles");
                a.store("prototype_original_styles", null), a.setStyle(b), this._setPrepared(!1)
            },
            _compute: function(a) {
                var b = Element.Layout.COMPUTATIONS;
                if (!(a in b)) throw "Property not found.";
                return this._set(a, b[a].call(this, this.element))
            },
            _isPrepared: function() {
                return this.element.retrieve("prototype_element_layout_prepared", !1)
            },
            _setPrepared: function(a) {
                return this.element.store("prototype_element_layout_prepared", a)
            },
            toObject: function() {
                var a = $A(arguments),
                    b = 0 === a.length ? Element.Layout.PROPERTIES : a.join(" ").split(" "),
                    c = {};
                return b.each(function(a) {
                    if (Element.Layout.PROPERTIES.include(a)) {
                        var b = this.get(a);
                        null != b && (c[a] = b)
                    }
                }, this), c
            },
            toHash: function() {
                var a = this.toObject.apply(this, arguments);
                return new Hash(a)
            },
            toCSS: function() {
                var a = $A(arguments),
                    b = 0 === a.length ? Element.Layout.PROPERTIES : a.join(" ").split(" "),
                    c = {};
                return b.each(function(a) {
                    if (Element.Layout.PROPERTIES.include(a) && !Element.Layout.COMPOSITE_PROPERTIES.include(a)) {
                        var b = this.get(a);
                        null != b && (c[g(a)] = b + "px")
                    }
                }, this), c
            },
            inspect: function() {
                return "#<Element.Layout>"
            }
        }), Object.extend(Element.Layout, {
            PROPERTIES: $w("height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height"),
            COMPOSITE_PROPERTIES: $w("padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height"),
            COMPUTATIONS: {
                height: function(a) {
                    this._preComputing || this._begin();
                    var b = this.get("border-box-height");
                    if (b <= 0) return this._preComputing || this._end(), 0;
                    var c = this.get("border-top"),
                        d = this.get("border-bottom"),
                        e = this.get("padding-top"),
                        f = this.get("padding-bottom");
                    return this._preComputing || this._end(), b - c - d - e - f
                },
                width: function(a) {
                    this._preComputing || this._begin();
                    var b = this.get("border-box-width");
                    if (b <= 0) return this._preComputing || this._end(), 0;
                    var c = this.get("border-left"),
                        d = this.get("border-right"),
                        e = this.get("padding-left"),
                        f = this.get("padding-right");
                    return this._preComputing || this._end(), b - c - d - e - f
                },
                "padding-box-height": function(a) {
                    return this.get("height") + this.get("padding-top") + this.get("padding-bottom")
                },
                "padding-box-width": function(a) {
                    return this.get("width") + this.get("padding-left") + this.get("padding-right")
                },
                "border-box-height": function(a) {
                    this._preComputing || this._begin();
                    var b = a.offsetHeight;
                    return this._preComputing || this._end(), b
                },
                "border-box-width": function(a) {
                    this._preComputing || this._begin();
                    var b = a.offsetWidth;
                    return this._preComputing || this._end(), b
                },
                "margin-box-height": function(a) {
                    var b = this.get("border-box-height"),
                        c = this.get("margin-top"),
                        d = this.get("margin-bottom");
                    return b <= 0 ? 0 : b + c + d
                },
                "margin-box-width": function(a) {
                    var b = this.get("border-box-width"),
                        c = this.get("margin-left"),
                        d = this.get("margin-right");
                    return b <= 0 ? 0 : b + c + d
                },
                top: function(a) {
                    return a.positionedOffset().top
                },
                bottom: function(a) {
                    var b = a.positionedOffset();
                    return a.getOffsetParent().measure("height") - this.get("border-box-height") - b.top
                },
                left: function(a) {
                    return a.positionedOffset().left
                },
                right: function(a) {
                    var b = a.positionedOffset();
                    return a.getOffsetParent().measure("width") - this.get("border-box-width") - b.left
                },
                "padding-top": function(a) {
                    return e(a, "paddingTop")
                },
                "padding-bottom": function(a) {
                    return e(a, "paddingBottom")
                },
                "padding-left": function(a) {
                    return e(a, "paddingLeft")
                },
                "padding-right": function(a) {
                    return e(a, "paddingRight")
                },
                "border-top": function(a) {
                    return e(a, "borderTopWidth")
                },
                "border-bottom": function(a) {
                    return e(a, "borderBottomWidth")
                },
                "border-left": function(a) {
                    return e(a, "borderLeftWidth")
                },
                "border-right": function(a) {
                    return e(a, "borderRightWidth")
                },
                "margin-top": function(a) {
                    return e(a, "marginTop")
                },
                "margin-bottom": function(a) {
                    return e(a, "marginBottom")
                },
                "margin-left": function(a) {
                    return e(a, "marginLeft")
                },
                "margin-right": function(a) {
                    return e(a, "marginRight")
                }
            }
        }), "getBoundingClientRect" in document.documentElement && Object.extend(Element.Layout.COMPUTATIONS, {
            right: function(a) {
                var b = D(a.getOffsetParent()),
                    c = a.getBoundingClientRect();
                return (b.getBoundingClientRect().right - c.right).round()
            },
            bottom: function(a) {
                var b = D(a.getOffsetParent()),
                    c = a.getBoundingClientRect();
                return (b.getBoundingClientRect().bottom - c.bottom).round()
            }
        }), Element.Offset = Class.create({
            initialize: function(a, b) {
                this.left = a.round(), this.top = b.round(), this[0] = this.left, this[1] = this.top
            },
            relativeTo: function(a) {
                return new Element.Offset(this.left - a.left, this.top - a.top)
            },
            inspect: function() {
                return "#<Element.Offset left: #{left} top: #{top}>".interpolate(this)
            },
            toString: function() {
                return "[#{left}, #{top}]".interpolate(this)
            },
            toArray: function() {
                return [this.left, this.top]
            }
        }), Prototype.Browser.IE ? (m = m.wrap(function(a, b) {
            if (b = $(b), B(b) || C(b) || z(b) || A(b)) return $(document.body);
            var c = b.getStyle("position");
            if ("static" !== c) return a(b);
            b.setStyle({
                position: "relative"
            });
            var d = a(b);
            return b.setStyle({
                position: c
            }), d
        }), o = o.wrap(function(a, b) {
            if (b = $(b), !b.parentNode) return new Element.Offset(0, 0);
            var c = b.getStyle("position");
            if ("static" !== c) return a(b);
            var d = b.getOffsetParent();
            d && "fixed" === d.getStyle("position") && D(d), b.setStyle({
                position: "relative"
            });
            var e = a(b);
            return b.setStyle({
                position: c
            }), e
        })) : Prototype.Browser.Webkit && (n = function(a) {
            a = $(a);
            var b = 0,
                c = 0;
            do {
                if (b += a.offsetTop || 0, c += a.offsetLeft || 0, a.offsetParent == document.body && "absolute" == Element.getStyle(a, "position")) break;
                a = a.offsetParent
            } while (a);
            return new Element.Offset(c, b)
        }), Element.addMethods({
            getLayout: h,
            measure: i,
            getWidth: k,
            getHeight: j,
            getDimensions: l,
            getOffsetParent: m,
            cumulativeOffset: n,
            positionedOffset: o,
            cumulativeScrollOffset: p,
            viewportOffset: q,
            absolutize: r,
            relativize: s,
            scrollTo: t,
            makePositioned: u,
            undoPositioned: v,
            makeClipping: w,
            undoClipping: x,
            clonePosition: y
        }), "getBoundingClientRect" in document.documentElement && Element.addMethods({
            viewportOffset: function(a) {
                if (a = $(a), C(a)) return new Element.Offset(0, 0);
                var b = a.getBoundingClientRect(),
                    c = document.documentElement;
                return new Element.Offset(b.left - c.clientLeft, b.top - c.clientTop)
            }
        })
    }(),
    function() {
        function a() {
            return g || (g = f ? document.body : document.documentElement)
        }

        function b() {
            return {
                width: this.getWidth(),
                height: this.getHeight()
            }
        }

        function c() {
            return a().clientWidth
        }

        function d() {
            return a().clientHeight
        }

        function e() {
            var a = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                b = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            return new Element.Offset(a, b)
        }
        var f = Prototype.Browser.Opera && window.parseFloat(window.opera.version()) < 9.5,
            g = null;
        document.viewport = {
            getDimensions: b,
            getWidth: c,
            getHeight: d,
            getScrollOffsets: e
        }
    }(), window.$$ = function() {
        var a = $A(arguments).join(", ");
        return Prototype.Selector.select(a, document)
    }, Prototype.Selector = function() {
        function a() {
            throw new Error('Method "Prototype.Selector.select" must be defined.')
        }

        function b() {
            throw new Error('Method "Prototype.Selector.match" must be defined.')
        }

        function c(a, b, c) {
            c = c || 0;
            var d, e = Prototype.Selector.match,
                f = a.length,
                g = 0;
            for (d = 0; d < f; d++)
                if (e(a[d], b) && c == g++) return Element.extend(a[d])
        }

        function d(a) {
            for (var b = 0, c = a.length; b < c; b++) Element.extend(a[b]);
            return a
        }
        var e = Prototype.K;
        return {
            select: a,
            match: b,
            find: c,
            extendElements: Element.extend === e ? e : d,
            extendElement: Element.extend
        }
    }(), Prototype._original_property = window.Sizzle,
    /*!
     * Sizzle CSS Selector Engine v@VERSION
     * http://sizzlejs.com/
     *
     * Copyright 2013 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: @DATE
     */
    function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, o, p, q;
            if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a) return c;
            if (1 !== (h = b.nodeType) && 9 !== h) return [];
            if (I && !d) {
                if (e = sa.exec(a))
                    if (g = e[1]) {
                        if (9 === h) {
                            if (!(f = b.getElementById(g)) || !f.parentNode) return c;
                            if (f.id === g) return c.push(f), c
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
                    } else {
                        if (e[2]) return _.apply(c, b.getElementsByTagName(a)), c;
                        if ((g = e[3]) && w.getElementsByClassName && b.getElementsByClassName) return _.apply(c, b.getElementsByClassName(g)), c
                    }
                if (w.qsa && (!J || !J.test(a))) {
                    if (o = l = N, p = b, q = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = m(a), (l = b.getAttribute("id")) ? o = l.replace(ua, "\\$&") : b.setAttribute("id", o), o = "[id='" + o + "'] ", i = j.length; i--;) j[i] = o + n(j[i]);
                        p = ta.test(a) && k(b.parentNode) || b, q = j.join(",")
                    }
                    if (q) try {
                        return _.apply(c, p.querySelectorAll(q)), c
                    } catch (a) {} finally {
                        l || b.removeAttribute("id")
                    }
                }
            }
            return B(a.replace(ia, "$1"), b, c, d)
        }

        function c() {
            function a(c, d) {
                return b.push(c + " ") > x.cacheLength && delete a[b.shift()], a[c + " "] = d
            }
            var b = [];
            return a
        }

        function d(a) {
            return a[N] = !0, a
        }

        function e(a) {
            var b = G.createElement("div");
            try {
                return !!a(b)
            } catch (a) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function f(a, b) {
            for (var c = a.split("|"), d = a.length; d--;) x.attrHandle[c[d]] = b
        }

        function g(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || W) - (~a.sourceIndex || W);
            if (d) return d;
            if (c)
                for (; c = c.nextSibling;)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function h(a) {
            return function(b) {
                return "input" === b.nodeName.toLowerCase() && b.type === a
            }
        }

        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function j(a) {
            return d(function(b) {
                return b = +b, d(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function k(a) {
            return a && typeof a.getElementsByTagName !== V && a
        }

        function l() {}

        function m(a, c) {
            var d, e, f, g, h, i, j, k = S[a + " "];
            if (k) return c ? 0 : k.slice(0);
            for (h = a, i = [], j = x.preFilter; h;) {
                d && !(e = ja.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ka.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ia, " ")
                }), h = h.slice(d.length));
                for (g in x.filter) !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break
            }
            return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
        }

        function n(a) {
            for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
            return d
        }

        function o(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = Q++;
            return b.first ? function(b, c, f) {
                for (; b = b[d];)
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function(b, c, g) {
                var h, i, j = [P, f];
                if (g) {
                    for (; b = b[d];)
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                    for (; b = b[d];)
                        if (1 === b.nodeType || e) {
                            if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                            if (i[d] = j, j[2] = a(b, c, g)) return !0
                        }
            }
        }

        function p(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--;)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function q(a, c, d) {
            for (var e = 0, f = c.length; e < f; e++) b(a, c[e], d);
            return d
        }

        function r(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
            return g
        }

        function s(a, b, c, e, f, g) {
            return e && !e[N] && (e = s(e)), f && !f[N] && (f = s(f, g)), d(function(d, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    p = d || q(b || "*", h.nodeType ? [h] : h, []),
                    s = !a || !d && b ? p : r(p, m, a, h, i),
                    t = c ? f || (d ? a : o || e) ? [] : g : s;
                if (c && c(s, t, h, i), e)
                    for (j = r(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                            f(null, t = [], j, i)
                        }
                        for (k = t.length; k--;)(l = t[k]) && (j = f ? ba.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                    }
                } else t = r(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : _.apply(g, t)
            })
        }

        function t(a) {
            for (var b, c, d, e = a.length, f = x.relative[a[0].type], g = f || x.relative[" "], h = f ? 1 : 0, i = o(function(a) {
                    return a === b
                }, g, !0), j = o(function(a) {
                    return ba.call(b, a) > -1
                }, g, !0), k = [function(a, c, d) {
                    return !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
                }]; h < e; h++)
                if (c = x.relative[a[h].type]) k = [o(p(k), c)];
                else {
                    if (c = x.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                        for (d = ++h; d < e && !x.relative[a[d].type]; d++);
                        return s(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({
                            value: " " === a[h - 2].type ? "*" : ""
                        })).replace(ia, "$1"), c, h < d && t(a.slice(h, d)), d < e && t(a = a.slice(d)), d < e && n(a))
                    }
                    k.push(c)
                }
            return p(k)
        }

        function u(a, c) {
            var e = c.length > 0,
                f = a.length > 0,
                g = function(d, g, h, i, j) {
                    var k, l, m, n = 0,
                        o = "0",
                        p = d && [],
                        q = [],
                        s = C,
                        t = d || f && x.find.TAG("*", j),
                        u = P += null == s ? 1 : Math.random() || .1,
                        v = t.length;
                    for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                        if (f && k) {
                            for (l = 0; m = a[l++];)
                                if (m(k, g, h)) {
                                    i.push(k);
                                    break
                                }
                            j && (P = u)
                        }
                        e && ((k = !m && k) && n--, d && p.push(k))
                    }
                    if (n += o, e && o !== n) {
                        for (l = 0; m = c[l++];) m(p, q, g, h);
                        if (d) {
                            if (n > 0)
                                for (; o--;) p[o] || q[o] || (q[o] = Z.call(i));
                            q = r(q)
                        }
                        _.apply(i, q), j && !d && q.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                    }
                    return j && (P = u, C = s), p
                };
            return e ? d(g) : g
        }
        var v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date,
            O = a.document,
            P = 0,
            Q = 0,
            R = c(),
            S = c(),
            T = c(),
            U = function(a, b) {
                return a === b && (E = !0), 0
            },
            V = "undefined",
            W = 1 << 31,
            X = {}.hasOwnProperty,
            Y = [],
            Z = Y.pop,
            $ = Y.push,
            _ = Y.push,
            aa = Y.slice,
            ba = Y.indexOf || function(a) {
                for (var b = 0, c = this.length; b < c; b++)
                    if (this[b] === a) return b;
                return -1
            },
            ca = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            da = "[\\x20\\t\\r\\n\\f]",
            ea = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            fa = ea.replace("w", "w#"),
            ga = "\\[" + da + "*(" + ea + ")" + da + "*(?:([*^$|!~]?=)" + da + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + fa + ")|)|)" + da + "*\\]",
            ha = ":(" + ea + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ga.replace(3, 8) + ")*)|.*)\\)|)",
            ia = new RegExp("^" + da + "+|((?:^|[^\\\\])(?:\\\\.)*)" + da + "+$", "g"),
            ja = new RegExp("^" + da + "*," + da + "*"),
            ka = new RegExp("^" + da + "*([>+~]|" + da + ")" + da + "*"),
            la = new RegExp("=" + da + "*([^\\]'\"]*?)" + da + "*\\]", "g"),
            ma = new RegExp(ha),
            na = new RegExp("^" + fa + "$"),
            oa = {
                ID: new RegExp("^#(" + ea + ")"),
                CLASS: new RegExp("^\\.(" + ea + ")"),
                TAG: new RegExp("^(" + ea.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + ga),
                PSEUDO: new RegExp("^" + ha),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + da + "*(even|odd|(([+-]|)(\\d*)n|)" + da + "*(?:([+-]|)" + da + "*(\\d+)|))" + da + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + ca + ")$", "i"),
                needsContext: new RegExp("^" + da + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + da + "*((?:-\\d)?\\d*)" + da + "*\\)|)(?=[^-]|$)", "i")
            },
            pa = /^(?:input|select|textarea|button)$/i,
            qa = /^h\d$/i,
            ra = /^[^{]+\{\s*\[native \w/,
            sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ta = /[+~]/,
            ua = /'|\\/g,
            va = new RegExp("\\\\([\\da-f]{1,6}" + da + "?|(" + da + ")|.)", "ig"),
            wa = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            };
        try {
            _.apply(Y = aa.call(O.childNodes), O.childNodes), Y[O.childNodes.length].nodeType
        } catch (a) {
            _ = {
                apply: Y.length ? function(a, b) {
                    $.apply(a, aa.call(b))
                } : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++];);
                    a.length = c - 1
                }
            }
        }
        w = b.support = {}, z = b.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return !!b && "HTML" !== b.nodeName
        }, F = b.setDocument = function(a) {
            var b, c = a ? a.ownerDocument || a : O,
                d = c.defaultView;
            return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, H = c.documentElement, I = !z(c), d && d !== d.top && (d.addEventListener ? d.addEventListener("unload", function() {
                F()
            }, !1) : d.attachEvent && d.attachEvent("onunload", function() {
                F()
            })), w.attributes = e(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), w.getElementsByTagName = e(function(a) {
                return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
            }), w.getElementsByClassName = ra.test(c.getElementsByClassName) && e(function(a) {
                return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
            }), w.getById = e(function(a) {
                return H.appendChild(a).id = N, !c.getElementsByName || !c.getElementsByName(N).length
            }), w.getById ? (x.find.ID = function(a, b) {
                if (typeof b.getElementById !== V && I) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, x.filter.ID = function(a) {
                var b = a.replace(va, wa);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete x.find.ID, x.filter.ID = function(a) {
                var b = a.replace(va, wa);
                return function(a) {
                    var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), x.find.TAG = w.getElementsByTagName ? function(a, b) {
                if (typeof b.getElementsByTagName !== V) return b.getElementsByTagName(a)
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, x.find.CLASS = w.getElementsByClassName && function(a, b) {
                if (typeof b.getElementsByClassName !== V && I) return b.getElementsByClassName(a)
            }, K = [], J = [], (w.qsa = ra.test(c.querySelectorAll)) && (e(function(a) {
                a.innerHTML = "<select t=''><option selected=''></option></select>", a.querySelectorAll("[t^='']").length && J.push("[*^$]=" + da + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + da + "*(?:value|" + ca + ")"), a.querySelectorAll(":checked").length || J.push(":checked")
            }), e(function(a) {
                var b = c.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + da + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
            })), (w.matchesSelector = ra.test(L = H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                w.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", ha)
            }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = ra.test(H.compareDocumentPosition), M = b || ra.test(H.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    for (; b = b.parentNode;)
                        if (b === a) return !0;
                return !1
            }, U = b ? function(a, b) {
                if (a === b) return E = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d || (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !w.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === O && M(O, a) ? -1 : b === c || b.ownerDocument === O && M(O, b) ? 1 : D ? ba.call(D, a) - ba.call(D, b) : 0 : 4 & d ? -1 : 1)
            } : function(a, b) {
                if (a === b) return E = !0, 0;
                var d, e = 0,
                    f = a.parentNode,
                    h = b.parentNode,
                    i = [a],
                    j = [b];
                if (!f || !h) return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : D ? ba.call(D, a) - ba.call(D, b) : 0;
                if (f === h) return g(a, b);
                for (d = a; d = d.parentNode;) i.unshift(d);
                for (d = b; d = d.parentNode;) j.unshift(d);
                for (; i[e] === j[e];) e++;
                return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
            }, c) : G
        }, b.matches = function(a, c) {
            return b(a, null, null, c)
        }, b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== G && F(a), c = c.replace(la, "='$1']"), w.matchesSelector && I && (!K || !K.test(c)) && (!J || !J.test(c))) try {
                var d = L.call(a, c);
                if (d || w.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (a) {}
            return b(c, G, null, [a]).length > 0
        }, b.contains = function(a, b) {
            return (a.ownerDocument || a) !== G && F(a), M(a, b)
        }, b.attr = function(a, b) {
            (a.ownerDocument || a) !== G && F(a);
            var c = x.attrHandle[b.toLowerCase()],
                d = c && X.call(x.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
            return void 0 !== d ? d : w.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }, b.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, b.uniqueSort = function(a) {
            var b, c = [],
                d = 0,
                e = 0;
            if (E = !w.detectDuplicates, D = !w.sortStable && a.slice(0), a.sort(U), E) {
                for (; b = a[e++];) b === a[e] && (d = c.push(e));
                for (; d--;) a.splice(c[d], 1)
            }
            return D = null, a
        }, y = b.getText = function(a) {
            var b, c = "",
                d = 0,
                e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += y(a)
                } else if (3 === e || 4 === e) return a.nodeValue
            } else
                for (; b = a[d++];) c += y(b);
            return c
        }, x = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: oa,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(va, wa), a[3] = (a[4] || a[5] || "").replace(va, wa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c = !a[5] && a[2];
                    return oa.CHILD.test(a[0]) ? null : (a[3] && void 0 !== a[4] ? a[2] = a[4] : c && ma.test(c) && (b = m(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(va, wa).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = R[a + " "];
                    return b || (b = new RegExp("(^|" + da + ")" + a + "(" + da + "|$)")) && R(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                for (; p;) {
                                    for (l = b; l = l[p];)
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [P, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                            else
                                for (;
                                    (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                            return (m -= e) === d || m % d == 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, c) {
                    var e, f = x.pseudos[a] || x.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], x.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                        for (var d, e = f(a, c), g = e.length; g--;) d = ba.call(a, e[g]), a[d] = !(b[d] = e[g])
                    }) : function(a) {
                        return f(a, 0, e)
                    }) : f
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = [],
                        c = [],
                        e = A(a.replace(ia, "$1"));
                    return e[N] ? d(function(a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, d, f) {
                        return b[0] = a, e(b, null, f, c), !c.pop()
                    }
                }),
                has: d(function(a) {
                    return function(c) {
                        return b(a, c).length > 0
                    }
                }),
                contains: d(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || y(b)).indexOf(a) > -1
                    }
                }),
                lang: d(function(a) {
                    return na.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(va, wa).toLowerCase(),
                        function(b) {
                            var c;
                            do {
                                if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return (c = c.toLowerCase()) === a || 0 === c.indexOf(a + "-")
                            } while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === H
                },
                focus: function(a) {
                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return !1 === a.disabled
                },
                disabled: function(a) {
                    return !0 === a.disabled
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function(a) {
                    return !x.pseudos.empty(a)
                },
                header: function(a) {
                    return qa.test(a.nodeName)
                },
                input: function(a) {
                    return pa.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: j(function() {
                    return [0]
                }),
                last: j(function(a, b) {
                    return [b - 1]
                }),
                eq: j(function(a, b, c) {
                    return [c < 0 ? c + b : c]
                }),
                even: j(function(a, b) {
                    for (var c = 0; c < b; c += 2) a.push(c);
                    return a
                }),
                odd: j(function(a, b) {
                    for (var c = 1; c < b; c += 2) a.push(c);
                    return a
                }),
                lt: j(function(a, b, c) {
                    for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: j(function(a, b, c) {
                    for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, x.pseudos.nth = x.pseudos.eq;
        for (v in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) x.pseudos[v] = h(v);
        for (v in {
                submit: !0,
                reset: !0
            }) x.pseudos[v] = i(v);
        l.prototype = x.filters = x.pseudos, x.setFilters = new l, A = b.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = T[a + " "];
            if (!f) {
                for (b || (b = m(a)), c = b.length; c--;) f = t(b[c]), f[N] ? d.push(f) : e.push(f);
                f = T(a, u(e, d)), f.selector = a
            }
            return f
        }, B = b.select = function(a, b, c, d) {
            var e, f, g, h, i, j = "function" == typeof a && a,
                l = !d && m(a = j.selector || a);
            if (c = c || [], 1 === l.length) {
                if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && w.getById && 9 === b.nodeType && I && x.relative[f[1].type]) {
                    if (!(b = (x.find.ID(g.matches[0].replace(va, wa), b) || [])[0])) return c;
                    j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                }
                for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !x.relative[h = g.type]);)
                    if ((i = x.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
                        if (f.splice(e, 1), !(a = d.length && n(f))) return _.apply(c, d), c;
                        break
                    }
            }
            return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b), c
        }, w.sortStable = N.split("").sort(U).join("") === N, w.detectDuplicates = !!E, F(), w.sortDetached = e(function(a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"))
        }), e(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || f("type|href|height|width", function(a, b, c) {
            if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), w.attributes && e(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || f("value", function(a, b, c) {
            if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
        }), e(function(a) {
            return null == a.getAttribute("disabled")
        }) || f(ca, function(a, b, c) {
            var d;
            if (!c) return !0 === a[b] ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), "function" == typeof define && define.amd ? define(function() {
            return b
        }) : "undefined" != typeof module && module.exports ? module.exports = b : a.Sizzle = b
    }(window),
    function(a) {
        function b(b, c) {
            return d(a(b, c || document))
        }

        function c(b, c) {
            return 1 == a.matches(c, [b]).length
        }
        var d = Prototype.Selector.extendElements;
        Prototype.Selector.engine = a, Prototype.Selector.select = b, Prototype.Selector.match = c
    }(Sizzle), window.Sizzle = Prototype._original_property, delete Prototype._original_property;
var Form = {
    reset: function(a) {
        return a = $(a), a.reset(), a
    },
    serializeElements: function(a, b) {
        "object" != typeof b ? b = {
            hash: !!b
        } : Object.isUndefined(b.hash) && (b.hash = !0);
        var c, d, e, f, g = !1,
            h = b.submit;
        return b.hash ? (f = {}, e = function(a, b, c) {
            return b in a ? (Object.isArray(a[b]) || (a[b] = [a[b]]), a[b] = a[b].concat(c)) : a[b] = c, a
        }) : (f = "", e = function(a, b, c) {
            if (Object.isArray(c) || (c = [c]), !c.length) return a;
            var d = encodeURIComponent(b).gsub(/%20/, "+");
            return a + (a ? "&" : "") + c.map(function(a) {
                return a = a.gsub(/(\r)?\n/, "\r\n"), a = encodeURIComponent(a), a = a.gsub(/%20/, "+"), d + "=" + a
            }).join("&")
        }), a.inject(f, function(a, b) {
            return !b.disabled && b.name && (c = b.name, null == (d = $(b).getValue()) || "file" == b.type || "submit" == b.type && (g || !1 === h || h && c != h || !(g = !0)) || (a = e(a, c, d))), a
        })
    }
};
Form.Methods = {
    serialize: function(a, b) {
        return Form.serializeElements(Form.getElements(a), b)
    },
    getElements: function(a) {
        for (var b, c = $(a).getElementsByTagName("*"), d = [], e = Form.Element.Serializers, f = 0; b = c[f]; f++) e[b.tagName.toLowerCase()] && d.push(Element.extend(b));
        return d
    },
    getInputs: function(a, b, c) {
        a = $(a);
        var d = a.getElementsByTagName("input");
        if (!b && !c) return $A(d).map(Element.extend);
        for (var e = 0, f = [], g = d.length; e < g; e++) {
            var h = d[e];
            b && h.type != b || c && h.name != c || f.push(Element.extend(h))
        }
        return f
    },
    disable: function(a) {
        return a = $(a), Form.getElements(a).invoke("disable"), a
    },
    enable: function(a) {
        return a = $(a), Form.getElements(a).invoke("enable"), a
    },
    findFirstElement: function(a) {
        var b = $(a).getElements().findAll(function(a) {
                return "hidden" != a.type && !a.disabled
            }),
            c = b.findAll(function(a) {
                return a.hasAttribute("tabIndex") && a.tabIndex >= 0
            }).sortBy(function(a) {
                return a.tabIndex
            }).first();
        return c || b.find(function(a) {
            return /^(?:input|select|textarea)$/i.test(a.tagName)
        })
    },
    focusFirstElement: function(a) {
        a = $(a);
        var b = a.findFirstElement();
        return b && b.activate(), a
    },
    request: function(a, b) {
        a = $(a), b = Object.clone(b || {});
        var c = b.parameters,
            d = a.readAttribute("action") || "";
        return d.blank() && (d = window.location.href), b.parameters = a.serialize(!0), c && (Object.isString(c) && (c = c.toQueryParams()), Object.extend(b.parameters, c)), a.hasAttribute("method") && !b.method && (b.method = a.method), new Ajax.Request(d, b)
    }
}, Form.Element = {
    focus: function(a) {
        return $(a).focus(), a
    },
    select: function(a) {
        return $(a).select(), a
    }
}, Form.Element.Methods = {
    serialize: function(a) {
        if (a = $(a), !a.disabled && a.name) {
            var b = a.getValue();
            if (void 0 != b) {
                var c = {};
                return c[a.name] = b, Object.toQueryString(c)
            }
        }
        return ""
    },
    getValue: function(a) {
        a = $(a);
        var b = a.tagName.toLowerCase();
        return Form.Element.Serializers[b](a)
    },
    setValue: function(a, b) {
        a = $(a);
        var c = a.tagName.toLowerCase();
        return Form.Element.Serializers[c](a, b), a
    },
    clear: function(a) {
        return $(a).value = "", a
    },
    present: function(a) {
        return "" != $(a).value
    },
    activate: function(a) {
        a = $(a);
        try {
            a.focus(), !a.select || "input" == a.tagName.toLowerCase() && /^(?:button|reset|submit)$/i.test(a.type) || a.select()
        } catch (a) {}
        return a
    },
    disable: function(a) {
        return a = $(a), a.disabled = !0, a
    },
    enable: function(a) {
        return a = $(a), a.disabled = !1, a
    }
};
var Field = Form.Element,
    $F = Form.Element.Methods.getValue;
Form.Element.Serializers = function() {
        function a(a, d) {
            switch (a.type.toLowerCase()) {
                case "checkbox":
                case "radio":
                    return b(a, d);
                default:
                    return c(a, d)
            }
        }

        function b(a, b) {
            if (Object.isUndefined(b)) return a.checked ? a.value : null;
            a.checked = !!b
        }

        function c(a, b) {
            if (Object.isUndefined(b)) return a.value;
            a.value = b
        }

        function d(a, b) {
            if (Object.isUndefined(b)) return ("select-one" === a.type ? e : f)(a);
            for (var c, d, g = !Object.isArray(b), h = 0, i = a.length; h < i; h++)
                if (c = a.options[h], d = this.optionValue(c), g) {
                    if (d == b) return void(c.selected = !0)
                } else c.selected = b.include(d)
        }

        function e(a) {
            var b = a.selectedIndex;
            return b >= 0 ? g(a.options[b]) : null
        }

        function f(a) {
            var b, c = a.length;
            if (!c) return null;
            for (var d = 0, b = []; d < c; d++) {
                var e = a.options[d];
                e.selected && b.push(g(e))
            }
            return b
        }

        function g(a) {
            return Element.hasAttribute(a, "value") ? a.value : a.text
        }
        return {
            input: a,
            inputSelector: b,
            textarea: c,
            select: d,
            selectOne: e,
            selectMany: f,
            optionValue: g,
            button: c
        }
    }(), Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
        initialize: function(a, b, c, d) {
            a(d, c), this.element = $(b), this.lastValue = this.getValue()
        },
        execute: function() {
            var a = this.getValue();
            (Object.isString(this.lastValue) && Object.isString(a) ? this.lastValue != a : String(this.lastValue) != String(a)) && (this.callback(this.element, a), this.lastValue = a)
        }
    }), Form.Element.Observer = Class.create(Abstract.TimedObserver, {
        getValue: function() {
            return Form.Element.getValue(this.element)
        }
    }), Form.Observer = Class.create(Abstract.TimedObserver, {
        getValue: function() {
            return Form.serialize(this.element)
        }
    }), Abstract.EventObserver = Class.create({
        initialize: function(a, b) {
            this.element = $(a), this.callback = b, this.lastValue = this.getValue(), "form" == this.element.tagName.toLowerCase() ? this.registerFormCallbacks() : this.registerCallback(this.element)
        },
        onElementEvent: function() {
            var a = this.getValue();
            this.lastValue != a && (this.callback(this.element, a), this.lastValue = a)
        },
        registerFormCallbacks: function() {
            Form.getElements(this.element).each(this.registerCallback, this)
        },
        registerCallback: function(a) {
            if (a.type) switch (a.type.toLowerCase()) {
                case "checkbox":
                case "radio":
                    Event.observe(a, "click", this.onElementEvent.bind(this));
                    break;
                default:
                    Event.observe(a, "change", this.onElementEvent.bind(this))
            }
        }
    }), Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
        getValue: function() {
            return Form.Element.getValue(this.element)
        }
    }), Form.EventObserver = Class.create(Abstract.EventObserver, {
        getValue: function() {
            return Form.serialize(this.element)
        }
    }),
    function(a) {
        function b(a, b) {
            return a.which ? a.which === b + 1 : a.button === b
        }

        function c(a, b) {
            return a.button === S[b]
        }

        function d(a, b) {
            switch (b) {
                case 0:
                    return 1 == a.which && !a.metaKey;
                case 1:
                    return 2 == a.which || 1 == a.which && a.metaKey;
                case 2:
                    return 3 == a.which;
                default:
                    return !1
            }
        }

        function e(a) {
            return R(a, 0)
        }

        function f(a) {
            return R(a, 1)
        }

        function g(a) {
            return R(a, 2)
        }

        function h(a) {
            return Element.extend(i(a))
        }

        function i(a) {
            a = P.extend(a);
            var b = a.target,
                c = a.type,
                d = a.currentTarget;
            return d && d.tagName && ("load" === c || "error" === c || "click" === c && "input" === d.tagName.toLowerCase() && "radio" === d.type) && (b = d), b.nodeType == Node.TEXT_NODE ? b.parentNode : b
        }

        function j(a, b) {
            var c = i(a),
                d = Prototype.Selector;
            if (!b) return Element.extend(c);
            for (; c;) {
                if (Object.isElement(c) && d.match(c, b)) return Element.extend(c);
                c = c.parentNode
            }
        }

        function k(a) {
            return {
                x: l(a),
                y: m(a)
            }
        }

        function l(a) {
            var b = document.documentElement,
                c = document.body || {
                    scrollLeft: 0
                };
            return a.pageX || a.clientX + (b.scrollLeft || c.scrollLeft) - (b.clientLeft || 0)
        }

        function m(a) {
            var b = document.documentElement,
                c = document.body || {
                    scrollTop: 0
                };
            return a.pageY || a.clientY + (b.scrollTop || c.scrollTop) - (b.clientTop || 0)
        }

        function n(a) {
            P.extend(a), a.preventDefault(), a.stopPropagation(), a.stopped = !0
        }

        function o(a) {
            var b;
            switch (a.type) {
                case "mouseover":
                case "mouseenter":
                    b = a.fromElement;
                    break;
                case "mouseout":
                case "mouseleave":
                    b = a.toElement;
                    break;
                default:
                    return null
            }
            return Element.extend(b)
        }

        function p(a) {
            return V[a] || a
        }

        function q(a) {
            return a === window ? 0 : (void 0 === a._prototypeUID && (a._prototypeUID = Element.Storage.UID++), a._prototypeUID)
        }

        function r(a) {
            return a === window ? 0 : a == document ? 1 : a.uniqueID
        }

        function s(a) {
            return a.include(":")
        }

        function t(b, c) {
            var d = a.Event.cache;
            return Object.isUndefined(c) && (c = q(b)), d[c] || (d[c] = {
                element: b
            }), d[c]
        }

        function u(b, c) {
            Object.isUndefined(c) && (c = q(b)), delete a.Event.cache[c]
        }

        function v(b, c, d) {
            var e = t(b);
            e[c] || (e[c] = []);
            for (var f = e[c], g = f.length; g--;)
                if (f[g].handler === d) return null;
            var h = q(b),
                i = a.Event._createResponder(h, c, d),
                j = {
                    responder: i,
                    handler: d
                };
            return f.push(j), j
        }

        function w(a, b, c) {
            var d = t(a),
                e = d[b];
            if (e) {
                for (var f, g = e.length; g--;)
                    if (e[g].handler === c) {
                        f = e[g];
                        break
                    }
                if (f) {
                    var h = e.indexOf(f);
                    return e.splice(h, 1), f
                }
            }
        }

        function x(a, b, c) {
            a = $(a);
            var d = v(a, b, c);
            if (null === d) return a;
            var e = d.responder;
            return s(b) ? z(a, b, e) : y(a, b, e), a
        }

        function y(a, b, c) {
            var d = p(b);
            a.addEventListener ? a.addEventListener(d, c, !1) : a.attachEvent("on" + d, c)
        }

        function z(a, b, c) {
            a.addEventListener ? a.addEventListener("dataavailable", c, !1) : (a.attachEvent("ondataavailable", c), a.attachEvent("onlosecapture", c))
        }

        function A(a, b, c) {
            a = $(a);
            var d = !Object.isUndefined(c);
            if (Object.isUndefined(b) && !d) return D(a), a;
            if (!d) return E(a, b), a;
            var e = w(a, b, c);
            return e ? (F(a, b, e.responder), a) : a
        }

        function B(a, b, c) {
            var d = p(b);
            a.removeEventListener ? a.removeEventListener(d, c, !1) : a.detachEvent("on" + d, c)
        }

        function C(a, b, c) {
            a.removeEventListener ? a.removeEventListener("dataavailable", c, !1) : (a.detachEvent("ondataavailable", c), a.detachEvent("onlosecapture", c))
        }

        function D(b) {
            var c = q(b),
                d = a.Event.cache[c];
            if (d) {
                u(b, c);
                var e, f;
                for (var g in d)
                    if ("element" !== g)
                        for (e = d[g], f = e.length; f--;) F(b, g, e[f].responder)
            }
        }

        function E(a, b) {
            var c = t(a),
                d = c[b];
            if (d) {
                delete c[b];
                for (var e = d.length; e--;) F(a, b, d[e].responder)
            }
        }

        function F(a, b, c) {
            s(b) ? C(a, b, c) : B(a, b, c)
        }

        function G(a) {
            return a !== document ? a : document.createEvent && !a.dispatchEvent ? document.documentElement : a
        }

        function H(a, b, c, d) {
            a = G($(a)), Object.isUndefined(d) && (d = !0), c = c || {};
            var e = W(a, b, c, d);
            return P.extend(e)
        }

        function I(a, b, c, d) {
            var e = document.createEvent("HTMLEvents");
            return e.initEvent("dataavailable", d, !0), e.eventName = b, e.memo = c, a.dispatchEvent(e), e
        }

        function J(a, b, c, d) {
            var e = document.createEventObject();
            return e.eventType = d ? "ondataavailable" : "onlosecapture", e.eventName = b, e.memo = c, a.fireEvent(e.eventType, e), e
        }

        function K(a, b, c, d) {
            return a = $(a), Object.isFunction(c) && Object.isUndefined(d) && (d = c, c = null), new P.Handler(a, b, c, d).start()
        }

        function L() {
            a.Event.cache = null
        }
        var M = document.createElement("div"),
            N = document.documentElement,
            O = "onmouseenter" in N && "onmouseleave" in N,
            P = {
                KEY_BACKSPACE: 8,
                KEY_TAB: 9,
                KEY_RETURN: 13,
                KEY_ESC: 27,
                KEY_LEFT: 37,
                KEY_UP: 38,
                KEY_RIGHT: 39,
                KEY_DOWN: 40,
                KEY_DELETE: 46,
                KEY_HOME: 36,
                KEY_END: 35,
                KEY_PAGEUP: 33,
                KEY_PAGEDOWN: 34,
                KEY_INSERT: 45
            },
            Q = function(a) {
                return !1
            };
        window.attachEvent && (Q = window.addEventListener ? function(a) {
            return !(a instanceof window.Event)
        } : function(a) {
            return !0
        });
        var R, S = {
            0: 1,
            1: 4,
            2: 2
        };
        R = window.attachEvent ? window.addEventListener ? function(a, d) {
            return Q(a) ? c(a, d) : b(a, d)
        } : c : Prototype.Browser.WebKit ? d : b, P.Methods = {
            isLeftClick: e,
            isMiddleClick: f,
            isRightClick: g,
            element: h,
            findElement: j,
            pointer: k,
            pointerX: l,
            pointerY: m,
            stop: n
        };
        var T = Object.keys(P.Methods).inject({}, function(a, b) {
            return a[b] = P.Methods[b].methodize(), a
        });
        if (window.attachEvent) {
            var U = {
                stopPropagation: function() {
                    this.cancelBubble = !0
                },
                preventDefault: function() {
                    this.returnValue = !1
                },
                inspect: function() {
                    return "[object Event]"
                }
            };
            P.extend = function(a, b) {
                if (!a) return !1;
                if (!Q(a)) return a;
                if (a._extendedByPrototype) return a;
                a._extendedByPrototype = Prototype.emptyFunction;
                var c = P.pointer(a);
                return Object.extend(a, {
                    target: a.srcElement || b,
                    relatedTarget: o(a),
                    pageX: c.x,
                    pageY: c.y
                }), Object.extend(a, T), Object.extend(a, U), a
            }
        } else P.extend = Prototype.K;
        window.addEventListener && (P.prototype = window.Event.prototype || document.createEvent("HTMLEvents").__proto__, Object.extend(P.prototype, T));
        var V = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        O && (p = Prototype.K), "uniqueID" in M && (q = r), P._isCustomEvent = s;
        var W = document.createEvent ? I : J;
        P.Handler = Class.create({
            initialize: function(a, b, c, d) {
                this.element = $(a), this.eventName = b, this.selector = c, this.callback = d, this.handler = this.handleEvent.bind(this)
            },
            start: function() {
                return P.observe(this.element, this.eventName, this.handler), this
            },
            stop: function() {
                return P.stopObserving(this.element, this.eventName, this.handler), this
            },
            handleEvent: function(a) {
                var b = P.findElement(a, this.selector);
                b && this.callback.call(this.element, a, b)
            }
        }), Object.extend(P, P.Methods), Object.extend(P, {
            fire: H,
            observe: x,
            stopObserving: A,
            on: K
        }), Element.addMethods({
            fire: H,
            observe: x,
            stopObserving: A,
            on: K
        }), Object.extend(document, {
            fire: H.methodize(),
            observe: x.methodize(),
            stopObserving: A.methodize(),
            on: K.methodize(),
            loaded: !1
        }), a.Event ? Object.extend(window.Event, P) : a.Event = P, a.Event.cache = {}, window.attachEvent && window.attachEvent("onunload", L), M = null, N = null
    }(this),
    function(a) {
        function b(a) {
            return !g && ("mouseenter" === a || "mouseleave" === a)
        }

        function c(a, c, f) {
            return Event._isCustomEvent(c) ? d(a, c, f) : b(c) ? e(a, c, f) : function(b) {
                if (Event.cache) {
                    var c = Event.cache[a].element;
                    Event.extend(b, c), f.call(c, b)
                }
            }
        }

        function d(a, b, c) {
            return function(d) {
                var e = Event.cache[a].element;
                return !Object.isUndefined(d.eventName) && (d.eventName === b && (Event.extend(d, e), void c.call(e, d)))
            }
        }

        function e(a, b, c) {
            return function(b) {
                var d = Event.cache[a].element;
                Event.extend(b, d);
                for (var e = b.relatedTarget; e && e !== d;) try {
                    e = e.parentNode
                } catch (a) {
                    e = d
                }
                e !== d && c.call(d, b)
            }
        }
        var f = document.documentElement,
            g = "onmouseenter" in f && "onmouseleave" in f;
        a.Event._createResponder = c, f = null
    }(this),
    function(a) {
        function b() {
            document.loaded || (e && window.clearTimeout(e), document.loaded = !0, document.fire("dom:loaded"))
        }

        function c() {
            "complete" === document.readyState && (document.detachEvent("onreadystatechange", c), b())
        }

        function d() {
            try {
                document.documentElement.doScroll("left")
            } catch (a) {
                return void(e = d.defer())
            }
            b()
        }
        var e;
        if ("complete" === document.readyState) return void b();
        document.addEventListener ? document.addEventListener("DOMContentLoaded", b, !1) : (document.attachEvent("onreadystatechange", c), window == top && (e = d.defer())), Event.observe(window, "load", b)
    }(), Element.addMethods(), Hash.toQueryString = Object.toQueryString;
var Toggle = {
    display: Element.toggle
};
Element.Methods.childOf = Element.Methods.descendantOf;
var Insertion = {
        Before: function(a, b) {
            return Element.insert(a, {
                before: b
            })
        },
        Top: function(a, b) {
            return Element.insert(a, {
                top: b
            })
        },
        Bottom: function(a, b) {
            return Element.insert(a, {
                bottom: b
            })
        },
        After: function(a, b) {
            return Element.insert(a, {
                after: b
            })
        }
    },
    $continue = new Error('"throw $continue" is deprecated, use "return" instead'),
    Position = {
        includeScrollOffsets: !1,
        prepare: function() {
            this.deltaX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0, this.deltaY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        },
        within: function(a, b, c) {
            return this.includeScrollOffsets ? this.withinIncludingScrolloffsets(a, b, c) : (this.xcomp = b, this.ycomp = c, this.offset = Element.cumulativeOffset(a), c >= this.offset[1] && c < this.offset[1] + a.offsetHeight && b >= this.offset[0] && b < this.offset[0] + a.offsetWidth)
        },
        withinIncludingScrolloffsets: function(a, b, c) {
            var d = Element.cumulativeScrollOffset(a);
            return this.xcomp = b + d[0] - this.deltaX, this.ycomp = c + d[1] - this.deltaY, this.offset = Element.cumulativeOffset(a), this.ycomp >= this.offset[1] && this.ycomp < this.offset[1] + a.offsetHeight && this.xcomp >= this.offset[0] && this.xcomp < this.offset[0] + a.offsetWidth
        },
        overlap: function(a, b) {
            return a ? "vertical" == a ? (this.offset[1] + b.offsetHeight - this.ycomp) / b.offsetHeight : "horizontal" == a ? (this.offset[0] + b.offsetWidth - this.xcomp) / b.offsetWidth : void 0 : 0
        },
        cumulativeOffset: Element.Methods.cumulativeOffset,
        positionedOffset: Element.Methods.positionedOffset,
        absolutize: function(a) {
            return Position.prepare(), Element.absolutize(a)
        },
        relativize: function(a) {
            return Position.prepare(), Element.relativize(a)
        },
        realOffset: Element.Methods.cumulativeScrollOffset,
        offsetParent: Element.Methods.getOffsetParent,
        page: Element.Methods.viewportOffset,
        clone: function(a, b, c) {
            return c = c || {}, Element.clonePosition(b, a, c)
        }
    };
document.getElementsByClassName || (document.getElementsByClassName = function(a) {
        function b(a) {
            return a.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + a + " ')]"
        }
        return a.getElementsByClassName = Prototype.BrowserFeatures.XPath ? function(a, c) {
                c = c.toString().strip();
                var d = /\s/.test(c) ? $w(c).map(b).join("") : b(c);
                return d ? document._getElementsByXPath(".//*" + d, a) : []
            } : function(a, b) {
                b = b.toString().strip();
                var c = [],
                    d = /\s/.test(b) ? $w(b) : null;
                if (!d && !b) return c;
                var e = $(a).getElementsByTagName("*");
                b = " " + b + " ";
                for (var f, g, h = 0; f = e[h]; h++) f.className && (g = " " + f.className + " ") && (g.include(b) || d && d.all(function(a) {
                    return !a.toString().blank() && g.include(" " + a + " ")
                })) && c.push(Element.extend(f));
                return c
            },
            function(a, b) {
                return $(b || document.body).getElementsByClassName(a)
            }
    }(Element.Methods)), Element.ClassNames = Class.create(), Element.ClassNames.prototype = {
        initialize: function(a) {
            this.element = $(a)
        },
        _each: function(a, b) {
            this.element.className.split(/\s+/).select(function(a) {
                return a.length > 0
            })._each(a, b)
        },
        set: function(a) {
            this.element.className = a
        },
        add: function(a) {
            this.include(a) || this.set($A(this).concat(a).join(" "))
        },
        remove: function(a) {
            this.include(a) && this.set($A(this).without(a).join(" "))
        },
        toString: function() {
            return $A(this).join(" ")
        }
    }, Object.extend(Element.ClassNames.prototype, Enumerable),
    function() {
        window.Selector = Class.create({
            initialize: function(a) {
                this.expression = a.strip()
            },
            findElements: function(a) {
                return Prototype.Selector.select(this.expression, a)
            },
            match: function(a) {
                return Prototype.Selector.match(a, this.expression)
            },
            toString: function() {
                return this.expression
            },
            inspect: function() {
                return "#<Selector: " + this.expression + ">"
            }
        }), Object.extend(Selector, {
            matchElements: function(a, b) {
                for (var c = Prototype.Selector.match, d = [], e = 0, f = a.length; e < f; e++) {
                    var g = a[e];
                    c(g, b) && d.push(Element.extend(g))
                }
                return d
            },
            findElement: function(a, b, c) {
                c = c || 0;
                for (var d, e = 0, f = 0, g = a.length; f < g; f++)
                    if (d = a[f], Prototype.Selector.match(d, b) && c === e++) return Element.extend(d)
            },
            findChildElements: function(a, b) {
                var c = b.toArray().join(", ");
                return Prototype.Selector.select(c, a || document)
            }
        })
    }();
/*!
//
// Prototype Window Class
//
// Copyright (c) 2006 Sébastien Gruhier (http://xilinus.com, http://itseb.com)
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// VERSION 1.3
*/
var Window = Class.create();
Window.keepMultiModalWindow = !1, Window.hasEffectLib = "undefined" != typeof Effect, Window.resizeEffectDuration = .4, Window.prototype = {
    initialize: function() {
        var a, b = 0;
        if (arguments.length > 0 && ("string" == typeof arguments[0] ? (a = arguments[0], b = 1) : a = arguments[0] ? arguments[0].id : null), a || (a = "window_" + (new Date).getTime()), $(a) && alert("Window " + a + " is already registered in the DOM! Make sure you use setDestroyOnClose() or destroyOnClose: true in the constructor"), this.options = Object.extend({
                className: "dialog",
                blurClassName: null,
                minWidth: 100,
                minHeight: 20,
                resizable: !0,
                closable: !0,
                minimizable: !0,
                maximizable: !0,
                draggable: !0,
                userData: null,
                showEffect: Window.hasEffectLib ? Effect.Appear : Element.show,
                hideEffect: Window.hasEffectLib ? Effect.Fade : Element.hide,
                showEffectOptions: {},
                hideEffectOptions: {},
                effectOptions: null,
                parent: document.body,
                title: "&nbsp;",
                url: null,
                onload: Prototype.emptyFunction,
                width: 200,
                height: 300,
                opacity: 1,
                recenterAuto: !0,
                wiredDrag: !1,
                closeCallback: null,
                destroyOnClose: !1,
                gridX: 1,
                gridY: 1
            }, arguments[b] || {}), this.options.blurClassName && (this.options.focusClassName = this.options.className), void 0 === this.options.top && void 0 === this.options.bottom && (this.options.top = this._round(500 * Math.random(), this.options.gridY)), void 0 === this.options.left && void 0 === this.options.right && (this.options.left = this._round(500 * Math.random(), this.options.gridX)), this.options.effectOptions && (Object.extend(this.options.hideEffectOptions, this.options.effectOptions), Object.extend(this.options.showEffectOptions, this.options.effectOptions), this.options.showEffect == Element.Appear && (this.options.showEffectOptions.to = this.options.opacity)), Window.hasEffectLib && (this.options.showEffect == Effect.Appear && (this.options.showEffectOptions.to = this.options.opacity), this.options.hideEffect == Effect.Fade && (this.options.hideEffectOptions.from = this.options.opacity)), this.options.hideEffect == Element.hide && (this.options.hideEffect = function() {
                Element.hide(this.element), this.options.destroyOnClose && this.destroy()
            }.bind(this)), this.options.parent != document.body && (this.options.parent = $(this.options.parent)), this.element = this._createWindow(a), this.element.win = this, this.eventMouseDown = this._initDrag.bindAsEventListener(this), this.eventMouseUp = this._endDrag.bindAsEventListener(this), this.eventMouseMove = this._updateDrag.bindAsEventListener(this), this.eventOnLoad = this._getWindowBorderSize.bindAsEventListener(this), this.eventMouseDownContent = this.toFront.bindAsEventListener(this), this.eventResize = this._recenter.bindAsEventListener(this), this.topbar = $(this.element.id + "_top"), this.bottombar = $(this.element.id + "_bottom"), this.content = $(this.element.id + "_content"), Event.observe(this.topbar, "mousedown", this.eventMouseDown), Event.observe(this.bottombar, "mousedown", this.eventMouseDown), Event.observe(this.content, "mousedown", this.eventMouseDownContent), Event.observe(window, "load", this.eventOnLoad), Event.observe(window, "resize", this.eventResize), Event.observe(window, "scroll", this.eventResize), Event.observe(this.options.parent, "scroll", this.eventResize), this.options.draggable) {
            var c = this;
            [this.topbar, this.topbar.up().previous(), this.topbar.up().next()].each(function(a) {
                a.observe("mousedown", c.eventMouseDown), a.addClassName("top_draggable")
            }), [this.bottombar.up(), this.bottombar.up().previous(), this.bottombar.up().next()].each(function(a) {
                a.observe("mousedown", c.eventMouseDown), a.addClassName("bottom_draggable")
            })
        }
        this.options.resizable && (this.sizer = $(this.element.id + "_sizer"), Event.observe(this.sizer, "mousedown", this.eventMouseDown)), this.useLeft = null, this.useTop = null, void 0 !== this.options.left ? (this.element.setStyle({
            left: parseFloat(this.options.left) + "px"
        }), this.useLeft = !0) : (this.element.setStyle({
            right: parseFloat(this.options.right) + "px"
        }), this.useLeft = !1), void 0 !== this.options.top ? (this.element.setStyle({
            top: parseFloat(this.options.top) + "px"
        }), this.useTop = !0) : (this.element.setStyle({
            bottom: parseFloat(this.options.bottom) + "px"
        }), this.useTop = !1), this.storedLocation = null, this.setOpacity(this.options.opacity), this.options.zIndex && this.setZIndex(this.options.zIndex), this.options.destroyOnClose && this.setDestroyOnClose(!0), this._getWindowBorderSize(), this.width = this.options.width, this.height = this.options.height, this.visible = !1, this.constraint = !1, this.constraintPad = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }, this.width && this.height && this.setSize(this.options.width, this.options.height), this.setTitle(this.options.title), Windows.register(this)
    },
    destroy: function() {
        if (this._notify("onDestroy"), Event.stopObserving(this.topbar, "mousedown", this.eventMouseDown), Event.stopObserving(this.bottombar, "mousedown", this.eventMouseDown), Event.stopObserving(this.content, "mousedown", this.eventMouseDownContent), Event.stopObserving(window, "load", this.eventOnLoad), Event.stopObserving(window, "resize", this.eventResize), Event.stopObserving(window, "scroll", this.eventResize), Event.stopObserving(this.content, "load", this.options.onload), this._oldParent) {
            for (var a = this.getContent(), b = null, c = 0; c < a.childNodes.length && (b = a.childNodes[c], 1 != b.nodeType); c++) b = null;
            b && this._oldParent.appendChild(b), this._oldParent = null
        }
        this.sizer && Event.stopObserving(this.sizer, "mousedown", this.eventMouseDown), this.options.url && (this.content.src = null), this.iefix && Element.remove(this.iefix), Element.remove(this.element), Windows.unregister(this)
    },
    setCloseCallback: function(a) {
        this.options.closeCallback = a
    },
    getContent: function() {
        return this.content
    },
    setContent: function(a, b, c) {
        var d = $(a);
        if (null == d) throw "Unable to find element '" + a + "' in DOM";
        this._oldParent = d.parentNode;
        var e = null,
            f = null;
        b && (e = Element.getDimensions(d)), c && (f = Position.cumulativeOffset(d));
        var g = this.getContent();
        this.setHTMLContent(""), g = this.getContent(), g.appendChild(d), d.show(), b && this.setSize(e.width, e.height), c && this.setLocation(f[1] - this.heightN, f[0] - this.widthW)
    },
    setHTMLContent: function(a) {
        if (this.options.url) {
            this.content.src = null, this.options.url = null;
            var b = '<div id="' + this.getId() + '_content" class="' + this.options.className + '_content"> </div>';
            $(this.getId() + "_table_content").innerHTML = b, this.content = $(this.element.id + "_content")
        }
        this.getContent().innerHTML = a
    },
    setAjaxContent: function(a, b, c, d) {
        this.showFunction = c ? "showCenter" : "show", this.showModal = d || !1, b = b || {}, this.setHTMLContent(""), this.onComplete = b.onComplete, this._onCompleteHandler || (this._onCompleteHandler = this._setAjaxContent.bind(this)), b.onComplete = this._onCompleteHandler, new Ajax.Request(a, b), b.onComplete = this.onComplete
    },
    _setAjaxContent: function(a) {
        Element.update(this.getContent(), a.responseText), this.onComplete && this.onComplete(a), this.onComplete = null, this[this.showFunction](this.showModal)
    },
    setURL: function(a) {
        this.options.url && (this.content.src = null), this.options.url = a;
        var b = "<iframe frameborder='0' name='" + this.getId() + "_content'  id='" + this.getId() + "_content' src='" + a + "' width='" + this.width + "' height='" + this.height + "'> </iframe>";
        $(this.getId() + "_table_content").innerHTML = b, this.content = $(this.element.id + "_content")
    },
    getURL: function() {
        return this.options.url ? this.options.url : null
    },
    refresh: function() {
        this.options.url && ($(this.element.getAttribute("id") + "_content").src = this.options.url)
    },
    setCookie: function(a, b, c, d, e) {
        a = a || this.element.id, this.cookie = [a, b, c, d, e];
        var f = WindowUtilities.getCookie(a);
        if (f) {
            var g = f.split(","),
                h = g[0].split(":"),
                i = g[1].split(":"),
                j = parseFloat(g[2]),
                k = parseFloat(g[3]),
                l = g[4],
                m = g[5];
            this.setSize(j, k), "true" == l ? this.doMinimize = !0 : "true" == m && (this.doMaximize = !0), this.useLeft = "l" == h[0], this.useTop = "t" == i[0], this.element.setStyle(this.useLeft ? {
                left: h[1]
            } : {
                right: h[1]
            }), this.element.setStyle(this.useTop ? {
                top: i[1]
            } : {
                bottom: i[1]
            })
        }
    },
    getId: function() {
        return this.element.id
    },
    setDestroyOnClose: function() {
        this.options.destroyOnClose = !0
    },
    setConstraint: function(a, b) {
        this.constraint = a, this.constraintPad = Object.extend(this.constraintPad, b || {}), this.useTop && this.useLeft && this.setLocation(parseFloat(this.element.style.top), parseFloat(this.element.style.left))
    },
    _initDrag: function(a) {
        if (!(Event.element(a) == this.sizer && this.isMinimized() || Event.element(a) != this.sizer && this.isMaximized())) {
            if (Prototype.Browser.IE && 0 == this.heightN && this._getWindowBorderSize(), this.pointer = [this._round(Event.pointerX(a), this.options.gridX), this._round(Event.pointerY(a), this.options.gridY)], this.options.wiredDrag ? this.currentDrag = this._createWiredElement() : this.currentDrag = this.element, Event.element(a) == this.sizer) this.doResize = !0, this.widthOrg = this.width, this.heightOrg = this.height, this.bottomOrg = parseFloat(this.element.getStyle("bottom")), this.rightOrg = parseFloat(this.element.getStyle("right")), this._notify("onStartResize");
            else {
                this.doResize = !1;
                var b = $(this.getId() + "_close");
                if (b && Position.within(b, this.pointer[0], this.pointer[1])) return void(this.currentDrag = null);
                if (this.toFront(), !this.options.draggable) return;
                this._notify("onStartMove")
            }
            Event.observe(document, "mouseup", this.eventMouseUp, !1), Event.observe(document, "mousemove", this.eventMouseMove, !1), WindowUtilities.disableScreen("__invisible__", "__invisible__", this.overlayOpacity), document.body.ondrag = function() {
                return !1
            }, document.body.onselectstart = function() {
                return !1
            }, this.currentDrag.show(), Event.stop(a)
        }
    },
    _round: function(a, b) {
        return 1 == b ? a : a = Math.floor(a / b) * b
    },
    _updateDrag: function(a) {
        var b = [this._round(Event.pointerX(a), this.options.gridX), this._round(Event.pointerY(a), this.options.gridY)],
            c = b[0] - this.pointer[0],
            d = b[1] - this.pointer[1];
        if (this.doResize) {
            var e = this.widthOrg + c,
                f = this.heightOrg + d;
            c = this.width - this.widthOrg, d = this.height - this.heightOrg, this.useLeft ? e = this._updateWidthConstraint(e) : this.currentDrag.setStyle({
                right: this.rightOrg - c + "px"
            }), this.useTop ? f = this._updateHeightConstraint(f) : this.currentDrag.setStyle({
                bottom: this.bottomOrg - d + "px"
            }), this.setSize(e, f), this._notify("onResize")
        } else {
            if (this.pointer = b, this.useLeft) {
                var g = parseFloat(this.currentDrag.getStyle("left")) + c,
                    h = this._updateLeftConstraint(g);
                this.pointer[0] += h - g, this.currentDrag.setStyle({
                    left: h + "px"
                })
            } else this.currentDrag.setStyle({
                right: parseFloat(this.currentDrag.getStyle("right")) - c + "px"
            });
            if (this.useTop) {
                var i = parseFloat(this.currentDrag.getStyle("top")) + d,
                    j = this._updateTopConstraint(i);
                this.pointer[1] += j - i, this.currentDrag.setStyle({
                    top: j + "px"
                })
            } else this.currentDrag.setStyle({
                bottom: parseFloat(this.currentDrag.getStyle("bottom")) - d + "px"
            });
            this._notify("onMove")
        }
        this.iefix && this._fixIEOverlapping(), this._removeStoreLocation(), Event.stop(a)
    },
    _endDrag: function(a) {
        WindowUtilities.enableScreen("__invisible__"), this.doResize ? this._notify("onEndResize") : this._notify("onEndMove"), Event.stopObserving(document, "mouseup", this.eventMouseUp, !1), Event.stopObserving(document, "mousemove", this.eventMouseMove, !1), Event.stop(a), this._hideWiredElement(), this._saveCookie(), document.body.ondrag = null, document.body.onselectstart = null
    },
    _updateLeftConstraint: function(a) {
        if (this.constraint && this.useLeft && this.useTop) {
            var b = this.options.parent == document.body ? WindowUtilities.getPageSize().windowWidth : this.options.parent.getDimensions().width;
            a < this.constraintPad.left && (a = this.constraintPad.left), a + this.width + this.widthE + this.widthW > b - this.constraintPad.right && (a = b - this.constraintPad.right - this.width - this.widthE - this.widthW)
        }
        return a
    },
    _updateTopConstraint: function(a) {
        if (this.constraint && this.useLeft && this.useTop) {
            var b = this.options.parent == document.body ? WindowUtilities.getPageSize().windowHeight : this.options.parent.getDimensions().height,
                c = this.height + this.heightN + this.heightS;
            a < this.constraintPad.top && (a = this.constraintPad.top), a + c > b - this.constraintPad.bottom && (a = b - this.constraintPad.bottom - c)
        }
        return a
    },
    _updateWidthConstraint: function(a) {
        if (this.constraint && this.useLeft && this.useTop) {
            var b = this.options.parent == document.body ? WindowUtilities.getPageSize().windowWidth : this.options.parent.getDimensions().width,
                c = parseFloat(this.element.getStyle("left"));
            c + a + this.widthE + this.widthW > b - this.constraintPad.right && (a = b - this.constraintPad.right - c - this.widthE - this.widthW)
        }
        return a
    },
    _updateHeightConstraint: function(a) {
        if (this.constraint && this.useLeft && this.useTop) {
            var b = this.options.parent == document.body ? WindowUtilities.getPageSize().windowHeight : this.options.parent.getDimensions().height,
                c = parseFloat(this.element.getStyle("top"));
            c + a + this.heightN + this.heightS > b - this.constraintPad.bottom && (a = b - this.constraintPad.bottom - c - this.heightN - this.heightS)
        }
        return a
    },
    _createWindow: function(a) {
        var b = this.options.className,
            c = document.createElement("div");
        c.setAttribute("id", a), c.className = "dialog";
        var d;
        d = this.options.url ? '<iframe frameborder="0" name="' + a + '_content"  id="' + a + '_content" src="' + this.options.url + '"> </iframe>' : '<div id="' + a + '_content" class="' + b + '_content"> </div>';
        var e = this.options.closable ? "<div class='" + b + "_close' id='" + a + "_close' onclick='Windows.close(\"" + a + "\", event)'> </div>" : "",
            f = this.options.minimizable ? "<div class='" + b + "_minimize' id='" + a + "_minimize' onclick='Windows.minimize(\"" + a + "\", event)'> </div>" : "",
            g = this.options.maximizable ? "<div class='" + b + "_maximize' id='" + a + "_maximize' onclick='Windows.maximize(\"" + a + "\", event)'> </div>" : "",
            h = this.options.resizable ? "class='" + b + "_sizer' id='" + a + "_sizer'" : "class='" + b + "_se'";
        return c.innerHTML = e + f + g + "      <table id='" + a + "_row1' class=\"top table_window\">        <tr>          <td class='" + b + "_nw'></td>          <td class='" + b + "_n'><div id='" + a + "_top' class='" + b + "_title title_window'>" + this.options.title + "</div></td>          <td class='" + b + "_ne'></td>        </tr>      </table>      <table id='" + a + "_row2' class=\"mid table_window\">        <tr>          <td class='" + b + "_w'></td>            <td id='" + a + "_table_content' class='" + b + "_content' valign='top'>" + d + "</td>          <td class='" + b + "_e'></td>        </tr>      </table>        <table id='" + a + "_row3' class=\"bot table_window\">        <tr>          <td class='" + b + "_sw'></td>            <td class='" + b + "_s'><div id='" + a + "_bottom' class='status_bar'><span style='float:left; width:1px; height:1px'></span></div></td>            <td " + h + "></td>        </tr>      </table>    ", Element.hide(c), this.options.parent.insertBefore(c, this.options.parent.firstChild), Event.observe($(a + "_content"), "load", this.options.onload), c
    },
    changeClassName: function(a) {
        var b = this.options.className,
            c = this.getId();
        $A(["_close", "_minimize", "_maximize", "_sizer", "_content"]).each(function(d) {
            this._toggleClassName($(c + d), b + d, a + d)
        }.bind(this)), this._toggleClassName($(c + "_top"), b + "_title", a + "_title"), $$("#" + c + " td").each(function(c) {
            c.className = c.className.sub(b, a)
        }), this.options.className = a
    },
    _toggleClassName: function(a, b, c) {
        a && (a.removeClassName(b), a.addClassName(c))
    },
    setLocation: function(a, b) {
        a = this._updateTopConstraint(a), b = this._updateLeftConstraint(b);
        var c = this.currentDrag || this.element;
        c.setStyle({
            top: a + "px"
        }), c.setStyle({
            left: b + "px"
        }), this.useLeft = !0, this.useTop = !0
    },
    getLocation: function() {
        var a = {};
        return a = this.useTop ? Object.extend(a, {
            top: this.element.getStyle("top")
        }) : Object.extend(a, {
            bottom: this.element.getStyle("bottom")
        }), a = this.useLeft ? Object.extend(a, {
            left: this.element.getStyle("left")
        }) : Object.extend(a, {
            right: this.element.getStyle("right")
        })
    },
    getSize: function() {
        return {
            width: this.width,
            height: this.height
        }
    },
    setSize: function(a, b, c) {
        if (a = parseFloat(a), b = parseFloat(b), !this.minimized && a < this.options.minWidth && (a = this.options.minWidth), !this.minimized && b < this.options.minHeight && (b = this.options.minHeight), this.options.maxHeight && b > this.options.maxHeight && (b = this.options.maxHeight), this.options.maxWidth && a > this.options.maxWidth && (a = this.options.maxWidth), this.useTop && this.useLeft && Window.hasEffectLib && Effect.ResizeWindow && c) new Effect.ResizeWindow(this, null, null, a, b, {
            duration: Window.resizeEffectDuration
        });
        else {
            this.width = a, this.height = b;
            var d = this.currentDrag ? this.currentDrag : this.element;
            if (d.setStyle({
                    width: a + this.widthW + this.widthE + "px"
                }), d.setStyle({
                    height: b + this.heightN + this.heightS + "px"
                }), !this.currentDrag || this.currentDrag == this.element) {
                var e = $(this.element.id + "_content");
                e.setStyle({
                    height: b + "px"
                }), e.setStyle({
                    width: a + "px"
                })
            }
        }
    },
    updateHeight: function() {
        this.setSize(this.width, this.content.scrollHeight, !0)
    },
    updateWidth: function() {
        this.setSize(this.content.scrollWidth, this.height, !0)
    },
    toFront: function() {
        this.element.style.zIndex < Windows.maxZIndex && this.setZIndex(Windows.maxZIndex + 1), this.iefix && this._fixIEOverlapping()
    },
    getBounds: function(a) {
        this.width && this.height && this.visible || this.computeBounds();
        var b = this.width,
            c = this.height;
        return a || (b += this.widthW + this.widthE, c += this.heightN + this.heightS), Object.extend(this.getLocation(), {
            width: b + "px",
            height: c + "px"
        })
    },
    computeBounds: function() {
        if (!this.width || !this.height) {
            var a = WindowUtilities._computeSize(this.content.innerHTML, this.content.id, this.width, this.height, 0, this.options.className);
            this.height ? this.width = a + 5 : this.height = a + 5
        }
        this.setSize(this.width, this.height), this.centered && this._center(this.centerTop, this.centerLeft)
    },
    show: function(a) {
        if (this.visible = !0, a) {
            if (void 0 === this.overlayOpacity) {
                var b = this;
                return void setTimeout(function() {
                    b.show(a)
                }, 10)
            }
            Windows.addModalWindow(this), this.modal = !0, this.setZIndex(Windows.maxZIndex + 1), Windows.unsetOverflow(this)
        } else this.element.style.zIndex || this.setZIndex(Windows.maxZIndex + 1);
        this.oldStyle && this.getContent().setStyle({
            overflow: this.oldStyle
        }), this.computeBounds(), this._notify("onBeforeShow"), this.options.showEffect != Element.show && this.options.showEffectOptions ? this.options.showEffect(this.element, this.options.showEffectOptions) : this.options.showEffect(this.element), this._checkIEOverlapping(), WindowUtilities.focusedWindow = this, this._notify("onShow")
    },
    showCenter: function(a, b, c) {
        this.centered = !0, this.centerTop = b, this.centerLeft = c, this.show(a)
    },
    isVisible: function() {
        return this.visible
    },
    _center: function(a, b) {
        var c = WindowUtilities.getWindowScroll(this.options.parent),
            d = WindowUtilities.getPageSize(this.options.parent);
        void 0 === a && (a = (d.windowHeight - (this.height + this.heightN + this.heightS)) / 2), a += c.top, void 0 === b && (b = (d.windowWidth - (this.width + this.widthW + this.widthE)) / 2), b += c.left, this.setLocation(a, b), this.toFront()
    },
    _recenter: function(a) {
        if (this.centered) {
            var b = WindowUtilities.getPageSize(this.options.parent),
                c = WindowUtilities.getWindowScroll(this.options.parent);
            if (this.pageSize && this.pageSize.windowWidth == b.windowWidth && this.pageSize.windowHeight == b.windowHeight && this.windowScroll.left == c.left && this.windowScroll.top == c.top) return;
            this.pageSize = b, this.windowScroll = c, $("overlay_modal") && $("overlay_modal").setStyle({
                height: b.pageHeight + "px"
            }), this.options.recenterAuto && this._center(this.centerTop, this.centerLeft)
        }
    },
    hide: function() {
        this.visible = !1, this.modal && (Windows.removeModalWindow(this), Windows.resetOverflow()), this.oldStyle = this.getContent().getStyle("overflow") || "auto", this.getContent().setStyle({
            overflow: "hidden"
        }), this.options.hideEffect(this.element, this.options.hideEffectOptions), this.iefix && this.iefix.hide(), this.doNotNotifyHide || this._notify("onHide")
    },
    close: function() {
        if (this.visible) {
            if (this.options.closeCallback && !this.options.closeCallback(this)) return;
            if (this.options.destroyOnClose) {
                var a = this.destroy.bind(this);
                if (this.options.hideEffectOptions.afterFinish) {
                    var b = this.options.hideEffectOptions.afterFinish;
                    this.options.hideEffectOptions.afterFinish = function() {
                        b(), a()
                    }
                } else this.options.hideEffectOptions.afterFinish = function() {
                    a()
                }
            }
            Windows.updateFocusedWindow(), this.doNotNotifyHide = !0, this.hide(), this.doNotNotifyHide = !1, this._notify("onClose")
        }
    },
    minimize: function() {
        if (!this.resizing) {
            var a = $(this.getId() + "_row2");
            if (this.minimized) {
                this.minimized = !1;
                var b = this.r2Height;
                if (this.r2Height = null, this.useLeft && this.useTop && Window.hasEffectLib && Effect.ResizeWindow) new Effect.ResizeWindow(this, null, null, null, this.height + b, {
                    duration: Window.resizeEffectDuration
                });
                else {
                    var c = this.element.getHeight() + b;
                    this.height += b, this.element.setStyle({
                        height: c + "px"
                    }), a.show()
                }
                if (!this.useTop) {
                    var d = parseFloat(this.element.getStyle("bottom"));
                    this.element.setStyle({
                        bottom: d - b + "px"
                    })
                }
                this.toFront()
            } else {
                this.minimized = !0;
                var b = a.getDimensions().height;
                this.r2Height = b;
                var c = this.element.getHeight() - b;
                if (this.useLeft && this.useTop && Window.hasEffectLib && Effect.ResizeWindow ? new Effect.ResizeWindow(this, null, null, null, this.height - b, {
                        duration: Window.resizeEffectDuration
                    }) : (this.height -= b, this.element.setStyle({
                        height: c + "px"
                    }), a.hide()), !this.useTop) {
                    var d = parseFloat(this.element.getStyle("bottom"));
                    this.element.setStyle({
                        bottom: d + b + "px"
                    })
                }
            }
            this._notify("onMinimize"), this._saveCookie()
        }
    },
    maximize: function() {
        if (!this.isMinimized() && !this.resizing) {
            if (Prototype.Browser.IE && 0 == this.heightN && this._getWindowBorderSize(), null != this.storedLocation) this._restoreLocation(), this.iefix && this.iefix.hide();
            else {
                this._storeLocation(), Windows.unsetOverflow(this);
                var a = WindowUtilities.getWindowScroll(this.options.parent),
                    b = WindowUtilities.getPageSize(this.options.parent),
                    c = a.left,
                    d = a.top;
                if (this.options.parent != document.body) {
                    a = {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0
                    };
                    var e = this.options.parent.getDimensions();
                    b.windowWidth = e.width, b.windowHeight = e.height, d = 0, c = 0
                }
                this.constraint && (b.windowWidth -= Math.max(0, this.constraintPad.left) + Math.max(0, this.constraintPad.right), b.windowHeight -= Math.max(0, this.constraintPad.top) + Math.max(0, this.constraintPad.bottom), c += Math.max(0, this.constraintPad.left), d += Math.max(0, this.constraintPad.top));
                var f = b.windowWidth - this.widthW - this.widthE,
                    g = b.windowHeight - this.heightN - this.heightS;
                this.useLeft && this.useTop && Window.hasEffectLib && Effect.ResizeWindow ? new Effect.ResizeWindow(this, d, c, f, g, {
                    duration: Window.resizeEffectDuration
                }) : (this.setSize(f, g), this.element.setStyle(this.useLeft ? {
                    left: c
                } : {
                    right: c
                }), this.element.setStyle(this.useTop ? {
                    top: d
                } : {
                    bottom: d
                })), this.toFront(), this.iefix && this._fixIEOverlapping()
            }
            this._notify("onMaximize"), this._saveCookie()
        }
    },
    isMinimized: function() {
        return this.minimized
    },
    isMaximized: function() {
        return null != this.storedLocation
    },
    setOpacity: function(a) {
        Element.setOpacity && Element.setOpacity(this.element, a)
    },
    setZIndex: function(a) {
        this.element.setStyle({
            zIndex: a
        }), Windows.updateZindex(a, this)
    },
    setTitle: function(a) {
        a && "" != a || (a = "&nbsp;"), Element.update(this.element.id + "_top", a)
    },
    getTitle: function() {
        return $(this.element.id + "_top").innerHTML
    },
    setStatusBar: function(a) {
        $(this.getId() + "_bottom");
        "object" == typeof a ? this.bottombar.firstChild ? this.bottombar.replaceChild(a, this.bottombar.firstChild) : this.bottombar.appendChild(a) : this.bottombar.innerHTML = a
    },
    _checkIEOverlapping: function() {
        !this.iefix && navigator.appVersion.indexOf("MSIE") > 0 && navigator.userAgent.indexOf("Opera") < 0 && "absolute" == this.element.getStyle("position") && (new Insertion.After(this.element.id, '<iframe id="' + this.element.id + '_iefix" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" src="javascript:false;" frameborder="0" scrolling="no"></iframe>'), this.iefix = $(this.element.id + "_iefix")), this.iefix && setTimeout(this._fixIEOverlapping.bind(this), 50)
    },
    _fixIEOverlapping: function() {
        Position.clone(this.element, this.iefix), this.iefix.style.zIndex = this.element.style.zIndex - 1, this.iefix.show()
    },
    _getWindowBorderSize: function(a) {
        var b = this._createHiddenDiv(this.options.className + "_n");
        this.heightN = Element.getDimensions(b).height, b.parentNode.removeChild(b);
        var b = this._createHiddenDiv(this.options.className + "_s");
        this.heightS = Element.getDimensions(b).height, b.parentNode.removeChild(b);
        var b = this._createHiddenDiv(this.options.className + "_e");
        this.widthE = Element.getDimensions(b).width, b.parentNode.removeChild(b);
        var b = this._createHiddenDiv(this.options.className + "_w");
        this.widthW = Element.getDimensions(b).width, b.parentNode.removeChild(b);
        var b = document.createElement("div");
        b.className = "overlay_" + this.options.className, document.body.appendChild(b);
        var c = this;
        setTimeout(function() {
            c.overlayOpacity = $(b).getStyle("opacity"), b.parentNode.removeChild(b)
        }, 10), Prototype.Browser.IE && (this.heightS = $(this.getId() + "_row3").getDimensions().height, this.heightN = $(this.getId() + "_row1").getDimensions().height), Prototype.Browser.WebKit && Prototype.Browser.WebKitVersion < 420 && this.setSize(this.width, this.height), this.doMaximize && this.maximize(), this.doMinimize && this.minimize()
    },
    _createHiddenDiv: function(a) {
        var b = document.body,
            c = document.createElement("div");
        return c.setAttribute("id", this.element.id + "_tmp"), c.className = a, c.style.display = "none", c.innerHTML = "", b.insertBefore(c, b.firstChild), c
    },
    _storeLocation: function() {
        null == this.storedLocation && (this.storedLocation = {
            useTop: this.useTop,
            useLeft: this.useLeft,
            top: this.element.getStyle("top"),
            bottom: this.element.getStyle("bottom"),
            left: this.element.getStyle("left"),
            right: this.element.getStyle("right"),
            width: this.width,
            height: this.height
        })
    },
    _restoreLocation: function() {
        null != this.storedLocation && (this.useLeft = this.storedLocation.useLeft, this.useTop = this.storedLocation.useTop, this.useLeft && this.useTop && Window.hasEffectLib && Effect.ResizeWindow ? new Effect.ResizeWindow(this, this.storedLocation.top, this.storedLocation.left, this.storedLocation.width, this.storedLocation.height, {
            duration: Window.resizeEffectDuration
        }) : (this.element.setStyle(this.useLeft ? {
            left: this.storedLocation.left
        } : {
            right: this.storedLocation.right
        }), this.element.setStyle(this.useTop ? {
            top: this.storedLocation.top
        } : {
            bottom: this.storedLocation.bottom
        }), this.setSize(this.storedLocation.width, this.storedLocation.height)), Windows.resetOverflow(), this._removeStoreLocation())
    },
    _removeStoreLocation: function() {
        this.storedLocation = null
    },
    _saveCookie: function() {
        if (this.cookie) {
            var a = "";
            this.useLeft ? a += "l:" + (this.storedLocation ? this.storedLocation.left : this.element.getStyle("left")) : a += "r:" + (this.storedLocation ? this.storedLocation.right : this.element.getStyle("right")), this.useTop ? a += ",t:" + (this.storedLocation ? this.storedLocation.top : this.element.getStyle("top")) : a += ",b:" + (this.storedLocation ? this.storedLocation.bottom : this.element.getStyle("bottom")), a += "," + (this.storedLocation ? this.storedLocation.width : this.width), a += "," + (this.storedLocation ? this.storedLocation.height : this.height), a += "," + this.isMinimized(), a += "," + this.isMaximized(), WindowUtilities.setCookie(a, this.cookie)
        }
    },
    _createWiredElement: function() {
        if (!this.wiredElement) {
            Prototype.Browser.IE && this._getWindowBorderSize();
            var a = document.createElement("div");
            a.className = "wired_frame " + this.options.className + "_wired_frame", a.style.position = "absolute", this.options.parent.insertBefore(a, this.options.parent.firstChild), this.wiredElement = $(a)
        }
        this.useLeft ? this.wiredElement.setStyle({
            left: this.element.getStyle("left")
        }) : this.wiredElement.setStyle({
            right: this.element.getStyle("right")
        }), this.useTop ? this.wiredElement.setStyle({
            top: this.element.getStyle("top")
        }) : this.wiredElement.setStyle({
            bottom: this.element.getStyle("bottom")
        });
        var b = this.element.getDimensions();
        return this.wiredElement.setStyle({
            width: b.width + "px",
            height: b.height + "px"
        }), this.wiredElement.setStyle({
            zIndex: Windows.maxZIndex + 30
        }), this.wiredElement
    },
    _hideWiredElement: function() {
        this.wiredElement && this.currentDrag && (this.currentDrag == this.element ? this.currentDrag = null : (this.useLeft ? this.element.setStyle({
            left: this.currentDrag.getStyle("left")
        }) : this.element.setStyle({
            right: this.currentDrag.getStyle("right")
        }), this.useTop ? this.element.setStyle({
            top: this.currentDrag.getStyle("top")
        }) : this.element.setStyle({
            bottom: this.currentDrag.getStyle("bottom")
        }), this.currentDrag.hide(), this.currentDrag = null, this.doResize && this.setSize(this.width, this.height)))
    },
    _notify: function(a) {
        this.options[a] ? this.options[a](this) : Windows.notify(a, this)
    }
};
var Windows = {
        windows: [],
        modalWindows: [],
        observers: [],
        focusedWindow: null,
        maxZIndex: 0,
        overlayShowEffectOptions: {
            duration: .5
        },
        overlayHideEffectOptions: {
            duration: .5
        },
        addObserver: function(a) {
            this.removeObserver(a), this.observers.push(a)
        },
        removeObserver: function(a) {
            this.observers = this.observers.reject(function(b) {
                return b == a
            })
        },
        notify: function(a, b) {
            this.observers.each(function(c) {
                c[a] && c[a](a, b)
            })
        },
        getWindow: function(a) {
            return this.windows.detect(function(b) {
                return b.getId() == a
            })
        },
        getFocusedWindow: function() {
            return this.focusedWindow
        },
        updateFocusedWindow: function() {
            this.focusedWindow = this.windows.length >= 2 ? this.windows[this.windows.length - 2] : null
        },
        register: function(a) {
            this.windows.push(a)
        },
        addModalWindow: function(a) {
            0 == this.modalWindows.length ? WindowUtilities.disableScreen(a.options.className, "overlay_modal", a.overlayOpacity, a.getId(), a.options.parent) : (Window.keepMultiModalWindow ? ($("overlay_modal").style.zIndex = Windows.maxZIndex + 1, Windows.maxZIndex += 1, WindowUtilities._hideSelect(this.modalWindows.last().getId())) : this.modalWindows.last().element.hide(), WindowUtilities._showSelect(a.getId())), this.modalWindows.push(a)
        },
        removeModalWindow: function(a) {
            this.modalWindows.pop(), 0 == this.modalWindows.length ? WindowUtilities.enableScreen() : Window.keepMultiModalWindow ? (this.modalWindows.last().toFront(), WindowUtilities._showSelect(this.modalWindows.last().getId())) : this.modalWindows.last().element.show()
        },
        register: function(a) {
            this.windows.push(a)
        },
        unregister: function(a) {
            this.windows = this.windows.reject(function(b) {
                return b == a
            })
        },
        closeAll: function() {
            this.windows.each(function(a) {
                Windows.close(a.getId())
            })
        },
        closeAllModalWindows: function() {
            WindowUtilities.enableScreen(), this.modalWindows.each(function(a) {
                a && a.close()
            })
        },
        minimize: function(a, b) {
            var c = this.getWindow(a);
            c && c.visible && c.minimize(), Event.stop(b)
        },
        maximize: function(a, b) {
            var c = this.getWindow(a);
            c && c.visible && c.maximize(), Event.stop(b)
        },
        close: function(a, b) {
            var c = this.getWindow(a);
            c && c.close(), b && Event.stop(b)
        },
        blur: function(a) {
            var b = this.getWindow(a);
            b && (b.options.blurClassName && b.changeClassName(b.options.blurClassName), this.focusedWindow == b && (this.focusedWindow = null), b._notify("onBlur"))
        },
        focus: function(a) {
            var b = this.getWindow(a);
            b && (this.focusedWindow && this.blur(this.focusedWindow.getId()), b.options.focusClassName && b.changeClassName(b.options.focusClassName), this.focusedWindow = b, b._notify("onFocus"))
        },
        unsetOverflow: function(a) {
            this.windows.each(function(a) {
                a.oldOverflow = a.getContent().getStyle("overflow") || "auto", a.getContent().setStyle({
                    overflow: "hidden"
                })
            }), a && a.oldOverflow && a.getContent().setStyle({
                overflow: a.oldOverflow
            })
        },
        resetOverflow: function() {
            this.windows.each(function(a) {
                a.oldOverflow && a.getContent().setStyle({
                    overflow: a.oldOverflow
                })
            })
        },
        updateZindex: function(a, b) {
            a > this.maxZIndex && (this.maxZIndex = a, this.focusedWindow && this.blur(this.focusedWindow.getId())), this.focusedWindow = b, this.focusedWindow && this.focus(this.focusedWindow.getId())
        }
    },
    Dialog = {
        dialogId: null,
        onCompleteFunc: null,
        callFunc: null,
        parameters: null,
        confirm: function(a, b) {
            if (a && "string" != typeof a) return void Dialog._runAjaxRequest(a, b, Dialog.confirm);
            a = a || "", b = b || {};
            var c = b.okLabel ? b.okLabel : "Ok",
                d = b.cancelLabel ? b.cancelLabel : "Cancel";
            b = Object.extend(b, b.windowParameters || {}), b.windowParameters = b.windowParameters || {}, b.className = b.className || "alert";
            var e = "class ='" + (b.buttonClass ? b.buttonClass + " " : "") + " ok_button'",
                f = "class ='" + (b.buttonClass ? b.buttonClass + " " : "") + " cancel_button'",
                a = "      <div class='" + b.className + "_message'>" + a + "</div>        <div class='" + b.className + "_buttons'>          <input type='button' value='" + c + "' onclick='Dialog.okCallback()' " + e + "/>          <input type='button' value='" + d + "' onclick='Dialog.cancelCallback()' " + f + "/>        </div>    ";
            return this._openDialog(a, b)
        },
        alert: function(a, b) {
            if (a && "string" != typeof a) return void Dialog._runAjaxRequest(a, b, Dialog.alert);
            a = a || "", b = b || {};
            var c = b.okLabel ? b.okLabel : "Ok";
            b = Object.extend(b, b.windowParameters || {}), b.windowParameters = b.windowParameters || {}, b.className = b.className || "alert";
            var d = "class ='" + (b.buttonClass ? b.buttonClass + " " : "") + " ok_button'",
                a = "      <div class='" + b.className + "_message'>" + a + "</div>        <div class='" + b.className + "_buttons'>          <input type='button' value='" + c + "' onclick='Dialog.okCallback()' " + d + "/>        </div>";
            return this._openDialog(a, b)
        },
        info: function(a, b) {
            if (a && "string" != typeof a) return void Dialog._runAjaxRequest(a, b, Dialog.info);
            a = a || "", b = b || {}, b = Object.extend(b, b.windowParameters || {}), b.windowParameters = b.windowParameters || {}, b.className = b.className || "alert";
            var a = "<div id='modal_dialog_message' class='" + b.className + "_message'>" + a + "</div>";
            return b.showProgress && (a += "<div id='modal_dialog_progress' class='" + b.className + "_progress'>  </div>"), b.ok = null, b.cancel = null, this._openDialog(a, b)
        },
        setInfoMessage: function(a) {
            $("modal_dialog_message").update(a)
        },
        closeInfo: function() {
            Windows.close(this.dialogId)
        },
        _openDialog: function(a, b) {
            var c = b.className;
            if (b.height || b.width || (b.width = WindowUtilities.getPageSize(b.options.parent || document.body).pageWidth / 2), b.id) this.dialogId = b.id;
            else {
                var d = new Date;
                this.dialogId = "modal_dialog_" + d.getTime(), b.id = this.dialogId
            }
            if (!b.height || !b.width) {
                var e = WindowUtilities._computeSize(a, this.dialogId, b.width, b.height, 5, c);
                b.height ? b.width = e + 5 : b.height = e + 5
            }
            b.effectOptions = b.effectOptions, b.resizable = b.resizable || !1, b.minimizable = b.minimizable || !1, b.maximizable = b.maximizable || !1, b.draggable = b.draggable || !1, b.closable = b.closable || !1;
            var f = new Window(b);
            return f.getContent().innerHTML = a, f.showCenter(!0, b.top, b.left), f.setDestroyOnClose(), f.cancelCallback = b.onCancel || b.cancel, f.okCallback = b.onOk || b.ok, f
        },
        _getAjaxContent: function(a) {
            Dialog.callFunc(a.responseText, Dialog.parameters)
        },
        _runAjaxRequest: function(a, b, c) {
            null == a.options && (a.options = {}), Dialog.onCompleteFunc = a.options.onComplete, Dialog.parameters = b, Dialog.callFunc = c, a.options.onComplete = Dialog._getAjaxContent, new Ajax.Request(a.url, a.options)
        },
        okCallback: function() {
            var a = Windows.focusedWindow;
            a.okCallback && !a.okCallback(a) || ($$("#" + a.getId() + " input").each(function(a) {
                a.onclick = null
            }), a.close())
        },
        cancelCallback: function() {
            var a = Windows.focusedWindow;
            $$("#" + a.getId() + " input").each(function(a) {
                a.onclick = null
            }), a.close(), a.cancelCallback && a.cancelCallback(a)
        }
    };
if (Prototype.Browser.WebKit) {
    var array = navigator.userAgent.match(new RegExp(/AppleWebKit\/([\d\.\+]*)/));
    Prototype.Browser.WebKitVersion = parseFloat(array[1])
}
var WindowUtilities = {
    getWindowScroll: function(parent) {
        var T, L, W, H;
        if ((parent = parent || document.body) != document.body) T = parent.scrollTop, L = parent.scrollLeft, W = parent.scrollWidth, H = parent.scrollHeight;
        else {
            var w = window;
            with(w.document) w.document.documentElement && documentElement.scrollTop ? (T = documentElement.scrollTop, L = documentElement.scrollLeft) : w.document.body && (T = body.scrollTop, L = body.scrollLeft), w.innerWidth ? (W = w.innerWidth, H = w.innerHeight) : w.document.documentElement && documentElement.clientWidth ? (W = documentElement.clientWidth, H = documentElement.clientHeight) : (W = body.offsetWidth, H = body.offsetHeight)
        }
        return {
            top: T,
            left: L,
            width: W,
            height: H
        }
    },
    getPageSize: function(a) {
        a = a || document.body;
        var b, c, d, e;
        if (a != document.body) b = a.getWidth(), c = a.getHeight(), e = a.scrollWidth, d = a.scrollHeight;
        else {
            var f, g;
            window.innerHeight && window.scrollMaxY ? (f = document.body.scrollWidth, g = window.innerHeight + window.scrollMaxY) : document.body.scrollHeight > document.body.offsetHeight ? (f = document.body.scrollWidth, g = document.body.scrollHeight) : (f = document.body.offsetWidth, g = document.body.offsetHeight), self.innerHeight ? (b = self.innerWidth, c = self.innerHeight) : document.documentElement && document.documentElement.clientHeight ? (b = document.documentElement.clientWidth, c = document.documentElement.clientHeight) : document.body && (b = document.body.clientWidth, c = document.body.clientHeight), d = g < c ? c : g, e = f < b ? b : f
        }
        return {
            pageWidth: e,
            pageHeight: d,
            windowWidth: b,
            windowHeight: c
        }
    },
    disableScreen: function(a, b, c, d, e) {
        WindowUtilities.initLightbox(b, a, function() {
            this._disableScreen(a, b, c, d)
        }.bind(this), e || document.body)
    },
    _disableScreen: function(a, b, c, d) {
        var e = $(b),
            f = WindowUtilities.getPageSize(e.parentNode);
        d && Prototype.Browser.IE && (WindowUtilities._hideSelect(), WindowUtilities._showSelect(d)), e.style.height = f.pageHeight + "px", e.style.display = "none", "overlay_modal" == b && Window.hasEffectLib && Windows.overlayShowEffectOptions ? (e.overlayOpacity = c, new Effect.Appear(e, Object.extend({
            from: 0,
            to: c
        }, Windows.overlayShowEffectOptions))) : e.style.display = "block"
    },
    enableScreen: function(a) {
        a = a || "overlay_modal";
        var b = $(a);
        b && ("overlay_modal" == a && Window.hasEffectLib && Windows.overlayHideEffectOptions ? new Effect.Fade(b, Object.extend({
            from: b.overlayOpacity,
            to: 0
        }, Windows.overlayHideEffectOptions)) : (b.style.display = "none", b.parentNode.removeChild(b)), "__invisible__" != a && WindowUtilities._showSelect())
    },
    _hideSelect: function(a) {
        Prototype.Browser.IE && (a = null == a ? "" : "#" + a + " ", $$(a + "select").each(function(a) {
            WindowUtilities.isDefined(a.oldVisibility) || (a.oldVisibility = a.style.visibility ? a.style.visibility : "visible", a.style.visibility = "hidden")
        }))
    },
    _showSelect: function(a) {
        Prototype.Browser.IE && (a = null == a ? "" : "#" + a + " ", $$(a + "select").each(function(a) {
            if (WindowUtilities.isDefined(a.oldVisibility)) {
                try {
                    a.style.visibility = a.oldVisibility
                } catch (b) {
                    a.style.visibility = "visible"
                }
                a.oldVisibility = null
            } else a.style.visibility && (a.style.visibility = "visible")
        }))
    },
    isDefined: function(a) {
        return void 0 !== a && null != a
    },
    initLightbox: function(a, b, c, d) {
        if ($(a)) Element.setStyle(a, {
            zIndex: Windows.maxZIndex + 1
        }), Windows.maxZIndex++, c();
        else {
            var e = document.createElement("div");
            e.setAttribute("id", a), e.className = "overlay_" + b, e.style.display = "none", e.style.position = "absolute", e.style.top = "0", e.style.left = "0", e.style.zIndex = Windows.maxZIndex + 1, Windows.maxZIndex++, e.style.width = "100%", d.insertBefore(e, d.firstChild), Prototype.Browser.WebKit && "overlay_modal" == a ? setTimeout(function() {
                c()
            }, 10) : c()
        }
    },
    setCookie: function(a, b) {
        document.cookie = b[0] + "=" + escape(a) + (b[1] ? "; expires=" + b[1].toGMTString() : "") + (b[2] ? "; path=" + b[2] : "") + (b[3] ? "; domain=" + b[3] : "") + (b[4] ? "; secure" : "")
    },
    getCookie: function(a) {
        var b = document.cookie,
            c = a + "=",
            d = b.indexOf("; " + c);
        if (-1 == d) {
            if (0 != (d = b.indexOf(c))) return null
        } else d += 2;
        var e = document.cookie.indexOf(";", d);
        return -1 == e && (e = b.length), unescape(b.substring(d + c.length, e))
    },
    _computeSize: function(a, b, c, d, e, f) {
        var g = document.body,
            h = document.createElement("div");
        h.setAttribute("id", b), h.className = f + "_content", d ? h.style.height = d + "px" : h.style.width = c + "px", h.style.position = "absolute", h.style.top = "0", h.style.left = "0", h.style.display = "none", h.innerHTML = a, g.insertBefore(h, g.firstChild);
        var i;
        return i = d ? $(h).getDimensions().width + e : $(h).getDimensions().height + e, g.removeChild(h), i
    }
};
/*!
 * @description		prototype.js based context menu
 * @author        Juriy Zaytsev; kangax [at] gmail [dot] com; http://thinkweb2.com/projects/prototype/
 * @version       0.6
 * @date          12/03/07
 * @requires      prototype.js 1.6
 * @license:      MIT License
 */
if (Object.isUndefined(Proto)) var Proto = {};
/*!

 ColorZilla persistence library

 Copyright (c) Alex Sirota 2010, All Rights Reserved

 Please do not use without permission

*/
if (Proto.Menu = Class.create({
        initialize: function() {
            var a = Prototype.emptyFunction;
            this.ie = Prototype.Browser.IE, this.options = Object.extend({
                selector: ".contextmenu",
                className: "protoMenu",
                pageOffset: 25,
                fade: !1,
                zIndex: 100,
                beforeShow: a,
                beforeHide: a,
                beforeSelect: a
            }, arguments[0] || {}), this.shim = new Element("iframe", {
                style: "position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);display:none",
                src: "javascript:false;",
                frameborder: 0
            }), this.options.fade = this.options.fade && !Object.isUndefined(Effect), this.container = new Element("div", {
                className: this.options.className,
                style: "display:none"
            });
            var b = new Element("ul");
            this.options.menuItems.each(function(a) {
                b.insert(new Element("li", {
                    className: a.separator ? "separator" : ""
                }).insert(a.separator ? "" : Object.extend(new Element("a", {
                    href: "#",
                    title: a.name,
                    className: (a.className || "") + (a.disabled ? " disabled" : " enabled")
                }), {
                    _callback: a.callback
                }).observe("click", this.onClick.bind(this)).observe("contextmenu", Event.stop).update(a.name)))
            }.bind(this)), $(document.body).insert(this.container.insert(b).observe("contextmenu", Event.stop)), this.ie && $(document.body).insert(this.shim), document.observe("click", function(a) {
                this.container.visible() && !a.isRightClick() && (this.options.beforeHide(a), this.ie && this.shim.hide(), this.container.hide())
            }.bind(this)), document.observe(Prototype.Browser.Opera ? "click" : "contextmenu", function(a) {
                if (!Prototype.Browser.Opera || a.ctrlKey) {
                    var b = Event.element(a),
                        c = null;
                    c = Element.match(b, this.options.selector) ? b : Element.up(b, this.options.selector), c && (a.contextMenuElement = c, a.contextMenuContainerElement = this.container, this.show(a))
                }
            }.bind(this))
        },
        show: function(a) {
            a.stop(), this.options.beforeShow(a);
            var b = Event.pointer(a).x,
                c = Event.pointer(a).y,
                d = document.viewport.getDimensions(),
                e = document.viewport.getScrollOffsets(),
                f = this.container.getDimensions(),
                g = {
                    left: (b + f.width + this.options.pageOffset > d.width ? d.width - f.width - this.options.pageOffset : b) + "px",
                    top: (c - e.top + f.height > d.height && c - e.top > f.height ? c - f.height : c) + "px"
                };
            this.container.setStyle(g).setStyle({
                zIndex: this.options.zIndex
            }), this.ie && this.shim.setStyle(Object.extend(Object.extend(f, g), {
                zIndex: this.options.zIndex - 1
            })).show(), this.options.fade ? Effect.Appear(this.container, {
                duration: .25
            }) : this.container.show(), this.event = a
        },
        onClick: function(a) {
            a.stop(), a.target._callback && !a.target.hasClassName("disabled") && (this.options.beforeSelect(a), this.ie && this.shim.hide(), this.container.hide(), a.target._callback(this.event))
        }
    }), void 0 === ColorZilla) var ColorZilla = {};
/*!
 * CSS Gradient Editor Gradient Database
 */
if (ColorZilla.Cookie = {
        set: function(a, b, c, d, e) {
            void 0 === d && (d = ".colorzilla.com"), void 0 === e && (e = "/");
            var f = "";
            if (void 0 != c) {
                var g = new Date;
                g.setTime(g.getTime() + 864e5 * parseFloat(c)), f = "; expires=" + g.toGMTString()
            }
            return d = "; domain=" + d, e = "; path=" + e, document.cookie = escape(a) + "=" + escape(b || "") + f + d + e
        },
        get: function(a) {
            var b = document.cookie.match(new RegExp("(^|;)\\s*" + escape(a) + "=([^;\\s]*)"));
            return b ? unescape(b[2]) : null
        },
        remove: function(a) {
            var b = ColorZilla.Cookie.get(a) || !0;
            return ColorZilla.Cookie.set(a, "", -1), b
        }
    }, ColorZilla.Persist = {
        _cookieName: "persist",
        _dict: {},
        _fromCookie: function() {
            this._dict = {};
            var a = ColorZilla.Cookie.get(this._cookieName);
            if (!a) return {};
            for (var b = a.split("&"), c = 0; c < b.length; c++) {
                var d = b[c].split("=");
                if (2 == d.length) {
                    var e = unescape(d[0]),
                        a = unescape(d[1]);
                    this._dict[e] = a
                }
            }
            return this._dict
        },
        _toCookie: function() {
            var a = "";
            for (key in this._dict) "" != a && (a += "&"), a += escape(key) + "=" + escape(this._dict[key]);
            ColorZilla.Cookie.set(this._cookieName, a, 10950)
        },
        get: function(a, b) {
            return this._fromCookie(), void 0 === this._dict[a] ? b : this._dict[a]
        },
        set: function(a, b) {
            this._fromCookie(), this._dict[a] = b, this._toCookie()
        },
        remove: function(a, b) {
            this._fromCookie(), void 0 !== this._dict[a] && delete this._dict[a], this._toCookie()
        },
        setAndReload: function(a, b) {
            this.set(a, b), window.location.reload(!0)
        }
    }, ColorZilla.LocalStorage = {
        isSupported: function() {
            try {
                return "localStorage" in window && null !== window.localStorage
            } catch (a) {
                return !1
            }
        },
        get: function(a, b) {
            if (!this.isSupported()) return b;
            try {
                var c = localStorage.getItem(a);
                return null != c ? c : b
            } catch (a) {
                return b
            }
        },
        set: function(a, b) {
            if (!this.isSupported()) return !1;
            try {
                return localStorage.setItem(a, b), !0
            } catch (a) {
                return !1
            }
        },
        remove: function(a, b) {
            if (!this.isSupported()) return !1;
            try {
                return localStorage.removeItem(a, b), !0
            } catch (a) {
                return !1
            }
        }
    }, void 0 === Gradient) var Gradient = {};
/*!

 CSS Gradient Editor

 Written by Alex Sirota (alex @ iosart.com)

 Copyright (c) Alex Sirota 2010, All Rights Reserved

 Please do not use without permission

*/
if (Gradient.DB = {
        UltimateWeb2: {
            name: "Ultimate Web 2.0 Gradients",
            license: 'derived from <a target="_blank" href="http://www.dezinerfolio.com/2007/05/06/ultimate-web-20-layer-styles">deziner folio</a>, <a target="_blank" href="http://sglider12.blogspot.com/">SGlider12</a> <a target="_blank" href="http://creativecommons.org/licenses/by-sa/2.5/in/">(cc) by-sa</a>',
            gradients: [{
                name: "Blue Gloss Default",
                stops: [{
                    color: "#1E5799",
                    position: "0%"
                }, {
                    color: "#2989D8",
                    position: "50%"
                }, {
                    color: "#207cca",
                    position: "51%"
                }, {
                    color: "#7db9e8",
                    position: "100%"
                }]
            }, {
                name: "Black Gloss #1",
                stops: [{
                    color: "#4c4c4c",
                    position: "0%"
                }, {
                    color: "#595959",
                    position: "12%"
                }, {
                    color: "#666666",
                    position: "25%"
                }, {
                    color: "#474747",
                    position: "39%"
                }, {
                    color: "#2c2c2c",
                    position: "50%"
                }, {
                    color: "#000000",
                    position: "51%"
                }, {
                    color: "#111111",
                    position: "60%"
                }, {
                    color: "#2b2b2b",
                    position: "76%"
                }, {
                    color: "#1c1c1c",
                    position: "91%"
                }, {
                    color: "#131313",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D # 16",
                stops: [{
                    color: "#87e0fd",
                    position: "0%"
                }, {
                    color: "#53cbf1",
                    position: "40%"
                }, {
                    color: "#05abe0",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #13",
                stops: [{
                    color: "#f0f9ff",
                    position: "0%"
                }, {
                    color: "#cbebff",
                    position: "47%"
                }, {
                    color: "#a1dbff",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #14",
                stops: [{
                    color: "#7abcff",
                    position: "0%"
                }, {
                    color: "#60abf8",
                    position: "44%"
                }, {
                    color: "#4096ee",
                    position: "100%"
                }]
            }, {
                name: "Blue to Transparent",
                stops: [{
                    color: "#1E5799",
                    position: "0%"
                }, {
                    color: "#7db9e8",
                    position: "100%"
                }],
                opacityStops: [{
                    opacity: 1,
                    position: "0%"
                }, {
                    opacity: 0,
                    position: "100%"
                }]
            }, {
                name: "Blue to Transparent Sharp",
                stops: [{
                    color: "#1E5799",
                    position: "0%"
                }, {
                    color: "#7db9e8",
                    position: "100%"
                }],
                opacityStops: [{
                    opacity: 1,
                    position: "0%"
                }, {
                    opacity: 1,
                    position: "62%"
                }, {
                    opacity: .7,
                    position: "68%"
                }, {
                    opacity: 0,
                    position: "100%"
                }]
            }, {
                name: "Blue Two Sided Transparent",
                stops: [{
                    color: "#1E5799",
                    position: "20%"
                }, {
                    color: "#2989D8",
                    position: "50%"
                }, {
                    color: "#1E5799",
                    position: "80%"
                }],
                opacityStops: [{
                    opacity: 0,
                    position: "0%"
                }, {
                    opacity: .8,
                    position: "15%"
                }, {
                    opacity: 1,
                    position: "19%"
                }, {
                    opacity: 1,
                    position: "81%"
                }, {
                    opacity: .8,
                    position: "85%"
                }, {
                    opacity: 0,
                    position: "100%"
                }]
            }, {
                name: "Neutral Density",
                stops: [{
                    color: "#000000",
                    position: "0%"
                }, {
                    color: "#000000",
                    position: "100%"
                }],
                opacityStops: [{
                    opacity: "0.65",
                    position: "0%"
                }, {
                    opacity: "0",
                    position: "100%"
                }]
            }, {
                name: "White to Transparent",
                stops: [{
                    color: "#ffffff",
                    position: "0%"
                }, {
                    color: "#ffffff",
                    position: "100%"
                }],
                opacityStops: [{
                    opacity: "1",
                    position: "0%"
                }, {
                    opacity: "0",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #15",
                stops: [{
                    color: "#00b7ea",
                    position: "0%"
                }, {
                    color: "#009ec3",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #17",
                stops: [{
                    color: "#88bfe8",
                    position: "0%"
                }, {
                    color: "#70b0e0",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #18",
                stops: [{
                    color: "#feffff",
                    position: "0%"
                }, {
                    color: "#ddf1f9",
                    position: "35%"
                }, {
                    color: "#a0d8ef",
                    position: "100%"
                }]
            }, {
                name: "Blue Flat #1",
                stops: [{
                    color: "#258dc8",
                    position: "0%"
                }, {
                    color: "#258dc8",
                    position: "100%"
                }]
            }, {
                name: "Blue Flat #2",
                stops: [{
                    color: "#4096ee",
                    position: "0%"
                }, {
                    color: "#4096ee",
                    position: "100%"
                }]
            }, {
                name: "Blue Gloss #1",
                stops: [{
                    color: "#b8e1fc",
                    position: "0%"
                }, {
                    color: "#a9d2f3",
                    position: "10%"
                }, {
                    color: "#90bae4",
                    position: "25%"
                }, {
                    color: "#90bcea",
                    position: "37%"
                }, {
                    color: "#90bff0",
                    position: "50%"
                }, {
                    color: "#6ba8e5",
                    position: "51%"
                }, {
                    color: "#a2daf5",
                    position: "83%"
                }, {
                    color: "#bdf3fd",
                    position: "100%"
                }]
            }, {
                name: "Blue Gloss #2",
                stops: [{
                    color: "#3b679e",
                    position: "0%"
                }, {
                    color: "#2b88d9",
                    position: "50%"
                }, {
                    color: "#207cca",
                    position: "51%"
                }, {
                    color: "#7db9e8",
                    position: "100%"
                }]
            }, {
                name: "Blue Gloss #3",
                stops: [{
                    color: "#6db3f2",
                    position: "0%"
                }, {
                    color: "#54a3ee",
                    position: "50%"
                }, {
                    color: "#3690f0",
                    position: "51%"
                }, {
                    color: "#1e69de",
                    position: "100%"
                }]
            }, {
                name: "Blue Gloss #4",
                stops: [{
                    color: "#ebf1f6",
                    position: "0%"
                }, {
                    color: "#abd3ee",
                    position: "50%"
                }, {
                    color: "#89c3eb",
                    position: "51%"
                }, {
                    color: "#d5ebfb",
                    position: "100%"
                }]
            }, {
                name: "Blue Gloss #5",
                stops: [{
                    color: "#e4f5fc",
                    position: "0%"
                }, {
                    color: "#bfe8f9",
                    position: "50%"
                }, {
                    color: "#9fd8ef",
                    position: "51%"
                }, {
                    color: "#2ab0ed",
                    position: "100%"
                }]
            }, {
                name: "Blue Gloss",
                stops: [{
                    color: "#cedbe9",
                    position: "0%"
                }, {
                    color: "#aac5de",
                    position: "17%"
                }, {
                    color: "#6199c7",
                    position: "50%"
                }, {
                    color: "#3a84c3",
                    position: "51%"
                }, {
                    color: "#419ad6",
                    position: "59%"
                }, {
                    color: "#4bb8f0",
                    position: "71%"
                }, {
                    color: "#3a8bc2",
                    position: "84%"
                }, {
                    color: "#26558b",
                    position: "100%"
                }]
            }, {
                name: "Blue Grey 3D",
                stops: [{
                    color: "#a7c7dc",
                    position: "0%"
                }, {
                    color: "#85b2d3",
                    position: "100%"
                }]
            }, {
                name: "Blue Grey Flat",
                stops: [{
                    color: "#3f4c6b",
                    position: "0%"
                }, {
                    color: "#3f4c6b",
                    position: "100%"
                }]
            }, {
                name: "Blue Pipe #1",
                stops: [{
                    color: "#d0e4f7",
                    position: "0%"
                }, {
                    color: "#73b1e7",
                    position: "24%"
                }, {
                    color: "#0a77d5",
                    position: "50%"
                }, {
                    color: "#539fe1",
                    position: "79%"
                }, {
                    color: "#87bcea",
                    position: "100%"
                }]
            }, {
                name: "Blue Pipe #2",
                stops: [{
                    color: "#e1ffff",
                    position: "0%"
                }, {
                    color: "#e1ffff",
                    position: "7%"
                }, {
                    color: "#e1ffff",
                    position: "12%"
                }, {
                    color: "#fdffff",
                    position: "12%"
                }, {
                    color: "#e6f8fd",
                    position: "30%"
                }, {
                    color: "#c8eefb",
                    position: "54%"
                }, {
                    color: "#bee4f8",
                    position: "75%"
                }, {
                    color: "#b1d8f5",
                    position: "100%"
                }]
            }, {
                name: "Blue Pipe",
                stops: [{
                    color: "#b3dced",
                    position: "0%"
                }, {
                    color: "#29b8e5",
                    position: "50%"
                }, {
                    color: "#bce0ee",
                    position: "100%"
                }]
            }, {
                name: "Brown 3D",
                stops: [{
                    color: "#d5cea6",
                    position: "0%"
                }, {
                    color: "#c9c190",
                    position: "40%"
                }, {
                    color: "#b7ad70",
                    position: "100%"
                }]
            }, {
                name: "Brown Gloss",
                stops: [{
                    color: "#f0b7a1",
                    position: "0%"
                }, {
                    color: "#8c3310",
                    position: "50%"
                }, {
                    color: "#752201",
                    position: "51%"
                }, {
                    color: "#bf6e4e",
                    position: "100%"
                }]
            }, {
                name: "Brown Red 3D",
                stops: [{
                    color: "#a90329",
                    position: "0%"
                }, {
                    color: "#8f0222",
                    position: "44%"
                }, {
                    color: "#6d0019",
                    position: "100%"
                }]
            }, {
                name: "Gold 3D",
                stops: [{
                    color: "#fefcea",
                    position: "0%"
                }, {
                    color: "#f1da36",
                    position: "100%"
                }]
            }, {
                name: "Green 3D #1",
                stops: [{
                    color: "#b4ddb4",
                    position: "0%"
                }, {
                    color: "#83c783",
                    position: "17%"
                }, {
                    color: "#52b152",
                    position: "33%"
                }, {
                    color: "#008a00",
                    position: "67%"
                }, {
                    color: "#005700",
                    position: "83%"
                }, {
                    color: "#002400",
                    position: "100%"
                }]
            }, {
                name: "Green 3D #2",
                stops: [{
                    color: "#cdeb8e",
                    position: "0%"
                }, {
                    color: "#a5c956",
                    position: "100%"
                }]
            }, {
                name: "Green 3D #3",
                stops: [{
                    color: "#c9de96",
                    position: "0%"
                }, {
                    color: "#8ab66b",
                    position: "44%"
                }, {
                    color: "#398235",
                    position: "100%"
                }]
            }, {
                name: "Green 3D #4",
                stops: [{
                    color: "#f8ffe8",
                    position: "0%"
                }, {
                    color: "#e3f5ab",
                    position: "33%"
                }, {
                    color: "#b7df2d",
                    position: "100%"
                }]
            }, {
                name: "Green 3D #2",
                stops: [{
                    color: "#a9db80",
                    position: "0%"
                }, {
                    color: "#96c56f",
                    position: "100%"
                }]
            }, {
                name: "Green 3D",
                stops: [{
                    color: "#b4e391",
                    position: "0%"
                }, {
                    color: "#61c419",
                    position: "50%"
                }, {
                    color: "#b4e391",
                    position: "100%"
                }]
            }, {
                name: "Green Flat #1",
                stops: [{
                    color: "#299a0b",
                    position: "0%"
                }, {
                    color: "#299a0b",
                    position: "100%"
                }]
            }, {
                name: "Green Flat #2",
                stops: [{
                    color: "#8fc800",
                    position: "0%"
                }, {
                    color: "#8fc800",
                    position: "100%"
                }]
            }, {
                name: "Green Flat #3",
                stops: [{
                    color: "#006e2e",
                    position: "0%"
                }, {
                    color: "#006e2e",
                    position: "100%"
                }]
            }, {
                name: "Green Flat #4",
                stops: [{
                    color: "#6bba70",
                    position: "0%"
                }, {
                    color: "#6bba70",
                    position: "100%"
                }]
            }, {
                name: "Green Flat #5",
                stops: [{
                    color: "#cdeb8b",
                    position: "0%"
                }, {
                    color: "#cdeb8b",
                    position: "100%"
                }]
            }, {
                name: "Green Flat #6",
                stops: [{
                    color: "#8fc400",
                    position: "0%"
                }, {
                    color: "#8fc400",
                    position: "100%"
                }]
            }, {
                name: "Green Flat",
                stops: [{
                    color: "#b6e026",
                    position: "0%"
                }, {
                    color: "#abdc28",
                    position: "100%"
                }]
            }, {
                name: "Green Gloss #1",
                stops: [{
                    color: "#9dd53a",
                    position: "0%"
                }, {
                    color: "#a1d54f",
                    position: "50%"
                }, {
                    color: "#80c217",
                    position: "51%"
                }, {
                    color: "#7cbc0a",
                    position: "100%"
                }]
            }, {
                name: "Green Gloss #2",
                stops: [{
                    color: "#e6f0a3",
                    position: "0%"
                }, {
                    color: "#d2e638",
                    position: "50%"
                }, {
                    color: "#c3d825",
                    position: "51%"
                }, {
                    color: "#dbf043",
                    position: "100%"
                }]
            }, {
                name: "Green Gloss",
                stops: [{
                    color: "#bfd255",
                    position: "0%"
                }, {
                    color: "#8eb92a",
                    position: "50%"
                }, {
                    color: "#72aa00",
                    position: "51%"
                }, {
                    color: "#9ecb2d",
                    position: "100%"
                }]
            }, {
                name: "Green Semi Flat",
                stops: [{
                    color: "#b4df5b",
                    position: "0%"
                }, {
                    color: "#b4df5b",
                    position: "100%"
                }]
            }, {
                name: "Gren 3D",
                stops: [{
                    color: "#eeeeee",
                    position: "0%"
                }, {
                    color: "#cccccc",
                    position: "100%"
                }]
            }, {
                name: "Grey 3D #1",
                stops: [{
                    color: "#cedce7",
                    position: "0%"
                }, {
                    color: "#596a72",
                    position: "100%"
                }]
            }, {
                name: "Grey 3D #2",
                stops: [{
                    color: "#606c88",
                    position: "0%"
                }, {
                    color: "#3f4c6b",
                    position: "100%"
                }]
            }, {
                name: "Grey 3D #3",
                stops: [{
                    color: "#b0d4e3",
                    position: "0%"
                }, {
                    color: "#88bacf",
                    position: "100%"
                }]
            }, {
                name: "Grey 3D #4",
                stops: [{
                    color: "#f2f5f6",
                    position: "0%"
                }, {
                    color: "#e3eaed",
                    position: "37%"
                }, {
                    color: "#c8d7dc",
                    position: "100%"
                }]
            }, {
                name: "Grey 3D",
                stops: [{
                    color: "#d8e0de",
                    position: "0%"
                }, {
                    color: "#aebfbc",
                    position: "22%"
                }, {
                    color: "#99afab",
                    position: "33%"
                }, {
                    color: "#8ea6a2",
                    position: "50%"
                }, {
                    color: "#829d98",
                    position: "67%"
                }, {
                    color: "#4e5c5a",
                    position: "82%"
                }, {
                    color: "#0e0e0e",
                    position: "100%"
                }]
            }, {
                name: "Grey Black 3D",
                stops: [{
                    color: "#b5bdc8",
                    position: "0%"
                }, {
                    color: "#828c95",
                    position: "36%"
                }, {
                    color: "#28343b",
                    position: "100%"
                }]
            }, {
                name: "Grey Blue 3D #1",
                stops: [{
                    color: "#b8c6df",
                    position: "0%"
                }, {
                    color: "#6d88b7",
                    position: "100%"
                }]
            }, {
                name: "Grey Blue 3D",
                stops: [{
                    color: "#cfe7fa",
                    position: "0%"
                }, {
                    color: "#6393c1",
                    position: "100%"
                }]
            }, {
                name: "Grey Blue Gloss #1",
                stops: [{
                    color: "#d2dfed",
                    position: "0%"
                }, {
                    color: "#c8d7eb",
                    position: "26%"
                }, {
                    color: "#bed0ea",
                    position: "51%"
                }, {
                    color: "#a6c0e3",
                    position: "51%"
                }, {
                    color: "#afc7e8",
                    position: "62%"
                }, {
                    color: "#bad0ef",
                    position: "75%"
                }, {
                    color: "#99b5db",
                    position: "88%"
                }, {
                    color: "#799bc8",
                    position: "100%"
                }]
            }, {
                name: "Grey Flat",
                stops: [{
                    color: "#eeeeee",
                    position: "0%"
                }, {
                    color: "#eeeeee",
                    position: "100%"
                }]
            }, {
                name: "Grey Gloss #1",
                stops: [{
                    color: "#e2e2e2",
                    position: "0%"
                }, {
                    color: "#dbdbdb",
                    position: "50%"
                }, {
                    color: "#d1d1d1",
                    position: "51%"
                }, {
                    color: "#fefefe",
                    position: "100%"
                }]
            }, {
                name: "Grey Gloss #2",
                stops: [{
                    color: "#f2f6f8",
                    position: "0%"
                }, {
                    color: "#d8e1e7",
                    position: "50%"
                }, {
                    color: "#b5c6d0",
                    position: "51%"
                }, {
                    color: "#e0eff9",
                    position: "100%"
                }]
            }, {
                name: "Grey Gloss",
                stops: [{
                    color: "#d4e4ef",
                    position: "0%"
                }, {
                    color: "#86aecc",
                    position: "100%"
                }]
            }, {
                name: "Grey Pipe",
                stops: [{
                    color: "#f5f6f6",
                    position: "0%"
                }, {
                    color: "#dbdce2",
                    position: "21%"
                }, {
                    color: "#b8bac6",
                    position: "49%"
                }, {
                    color: "#dddfe3",
                    position: "80%"
                }, {
                    color: "#f5f6f6",
                    position: "100%"
                }]
            }, {
                name: "L Brown 3D",
                stops: [{
                    color: "#f3e2c7",
                    position: "0%"
                }, {
                    color: "#c19e67",
                    position: "50%"
                }, {
                    color: "#b68d4c",
                    position: "51%"
                }, {
                    color: "#e9d4b3",
                    position: "100%"
                }]
            }, {
                name: "L Green 3D",
                stops: [{
                    color: "#f9fcf7",
                    position: "0%"
                }, {
                    color: "#f5f9f0",
                    position: "100%"
                }]
            }, {
                name: "Lavender 3D",
                stops: [{
                    color: "#c3d9ff",
                    position: "0%"
                }, {
                    color: "#b1c8ef",
                    position: "41%"
                }, {
                    color: "#98b0d9",
                    position: "100%"
                }]
            }, {
                name: "Neon",
                stops: [{
                    color: "#d2ff52",
                    position: "0%"
                }, {
                    color: "#91e842",
                    position: "100%"
                }]
            }, {
                name: "Olive 3D #1",
                stops: [{
                    color: "#fefefd",
                    position: "0%"
                }, {
                    color: "#dce3c4",
                    position: "42%"
                }, {
                    color: "#aebf76",
                    position: "100%"
                }]
            }, {
                name: "Olive 3D #2",
                stops: [{
                    color: "#e4efc0",
                    position: "0%"
                }, {
                    color: "#abbd73",
                    position: "100%"
                }]
            }, {
                name: "Olive 3D #3",
                stops: [{
                    color: "#a4b357",
                    position: "0%"
                }, {
                    color: "#75890c",
                    position: "100%"
                }]
            }, {
                name: "Olive 3D",
                stops: [{
                    color: "#627d4d",
                    position: "0%"
                }, {
                    color: "#1f3b08",
                    position: "100%"
                }]
            }, {
                name: "Olive Flat",
                stops: [{
                    color: "#73880a",
                    position: "0%"
                }, {
                    color: "#73880a",
                    position: "100%"
                }]
            }, {
                name: "Orange 3D #1",
                stops: [{
                    color: "#ffaf4b",
                    position: "0%"
                }, {
                    color: "#ff920a",
                    position: "100%"
                }]
            }, {
                name: "Orange 3D #2",
                stops: [{
                    color: "#fac695",
                    position: "0%"
                }, {
                    color: "#f5ab66",
                    position: "47%"
                }, {
                    color: "#ef8d31",
                    position: "100%"
                }]
            }, {
                name: "Orange 3D #3",
                stops: [{
                    color: "#ffc578",
                    position: "0%"
                }, {
                    color: "#fb9d23",
                    position: "100%"
                }]
            }, {
                name: "Orange 3D #4",
                stops: [{
                    color: "#f9c667",
                    position: "0%"
                }, {
                    color: "#f79621",
                    position: "100%"
                }]
            }, {
                name: "Orange 3D #5",
                stops: [{
                    color: "#fceabb",
                    position: "0%"
                }, {
                    color: "#fccd4d",
                    position: "50%"
                }, {
                    color: "#f8b500",
                    position: "51%"
                }, {
                    color: "#fbdf93",
                    position: "100%"
                }]
            }, {
                name: "Orange 3D",
                stops: [{
                    color: "#ffa84c",
                    position: "0%"
                }, {
                    color: "#ff7b0d",
                    position: "100%"
                }]
            }, {
                name: "Orange Flat #1",
                stops: [{
                    color: "#ff670f",
                    position: "0%"
                }, {
                    color: "#ff670f",
                    position: "100%"
                }]
            }, {
                name: "Orange Flat",
                stops: [{
                    color: "#ff7400",
                    position: "0%"
                }, {
                    color: "#ff7400",
                    position: "100%"
                }]
            }, {
                name: "Orange Gloss",
                stops: [{
                    color: "#ffb76b",
                    position: "0%"
                }, {
                    color: "#ffa73d",
                    position: "50%"
                }, {
                    color: "#ff7c00",
                    position: "51%"
                }, {
                    color: "#ff7f04",
                    position: "100%"
                }]
            }, {
                name: "Pink 3D #1",
                stops: [{
                    color: "#ff5db1",
                    position: "0%"
                }, {
                    color: "#ef017c",
                    position: "100%"
                }]
            }, {
                name: "Pink 3D #2",
                stops: [{
                    color: "#fb83fa",
                    position: "0%"
                }, {
                    color: "#e93cec",
                    position: "100%"
                }]
            }, {
                name: "Pink 3D #3",
                stops: [{
                    color: "#e570e7",
                    position: "0%"
                }, {
                    color: "#c85ec7",
                    position: "47%"
                }, {
                    color: "#a849a3",
                    position: "100%"
                }]
            }, {
                name: "Pink 3D",
                stops: [{
                    color: "#cb60b3",
                    position: "0%"
                }, {
                    color: "#ad1283",
                    position: "50%"
                }, {
                    color: "#de47ac",
                    position: "100%"
                }]
            }, {
                name: "Pink Flat",
                stops: [{
                    color: "#ff0084",
                    position: "0%"
                }, {
                    color: "#ff0084",
                    position: "100%"
                }]
            }, {
                name: "Pink Gloss #2",
                stops: [{
                    color: "#fcecfc",
                    position: "0%"
                }, {
                    color: "#fba6e1",
                    position: "50%"
                }, {
                    color: "#fd89d7",
                    position: "51%"
                }, {
                    color: "#ff7cd8",
                    position: "100%"
                }]
            }, {
                name: "Pink Gloss",
                stops: [{
                    color: "#cb60b3",
                    position: "0%"
                }, {
                    color: "#c146a1",
                    position: "50%"
                }, {
                    color: "#a80077",
                    position: "51%"
                }, {
                    color: "#db36a4",
                    position: "100%"
                }]
            }, {
                name: "Purple 3D #1",
                stops: [{
                    color: "#ebe9f9",
                    position: "0%"
                }, {
                    color: "#d8d0ef",
                    position: "50%"
                }, {
                    color: "#cec7ec",
                    position: "51%"
                }, {
                    color: "#c1bfea",
                    position: "100%"
                }]
            }, {
                name: "Purple 3D",
                stops: [{
                    color: "#8989ba",
                    position: "0%"
                }, {
                    color: "#8989ba",
                    position: "100%"
                }]
            }, {
                name: "Red 3D #1",
                stops: [{
                    color: "#febbbb",
                    position: "0%"
                }, {
                    color: "#fe9090",
                    position: "45%"
                }, {
                    color: "#ff5c5c",
                    position: "100%"
                }]
            }, {
                name: "Red 3D #2",
                stops: [{
                    color: "#f2825b",
                    position: "0%"
                }, {
                    color: "#e55b2b",
                    position: "50%"
                }, {
                    color: "#f07146",
                    position: "100%"
                }]
            }, {
                name: "Red 3D",
                stops: [{
                    color: "#ff3019",
                    position: "0%"
                }, {
                    color: "#cf0404",
                    position: "100%"
                }]
            }, {
                name: "Red Flat #1",
                stops: [{
                    color: "#ff1a00",
                    position: "0%"
                }, {
                    color: "#ff1a00",
                    position: "100%"
                }]
            }, {
                name: "Red Flat",
                stops: [{
                    color: "#cc0000",
                    position: "0%"
                }, {
                    color: "#cc0000",
                    position: "100%"
                }]
            }, {
                name: "Red Gloss #1",
                stops: [{
                    color: "#f85032",
                    position: "0%"
                }, {
                    color: "#f16f5c",
                    position: "50%"
                }, {
                    color: "#f6290c",
                    position: "51%"
                }, {
                    color: "#f02f17",
                    position: "71%"
                }, {
                    color: "#e73827",
                    position: "100%"
                }]
            }, {
                name: "Red Gloss #2",
                stops: [{
                    color: "#feccb1",
                    position: "0%"
                }, {
                    color: "#f17432",
                    position: "50%"
                }, {
                    color: "#ea5507",
                    position: "51%"
                }, {
                    color: "#fb955e",
                    position: "100%"
                }]
            }, {
                name: "Red Gloss #3",
                stops: [{
                    color: "#efc5ca",
                    position: "0%"
                }, {
                    color: "#d24b5a",
                    position: "50%"
                }, {
                    color: "#ba2737",
                    position: "51%"
                }, {
                    color: "#f18e99",
                    position: "100%"
                }]
            }, {
                name: "Red Gloss",
                stops: [{
                    color: "#f3c5bd",
                    position: "0%"
                }, {
                    color: "#e86c57",
                    position: "50%"
                }, {
                    color: "#ea2803",
                    position: "51%"
                }, {
                    color: "#ff6600",
                    position: "75%"
                }, {
                    color: "#c72200",
                    position: "100%"
                }]
            }, {
                name: "Shape 1 Style",
                stops: [{
                    color: "#b7deed",
                    position: "0%"
                }, {
                    color: "#71ceef",
                    position: "50%"
                }, {
                    color: "#21b4e2",
                    position: "51%"
                }, {
                    color: "#b7deed",
                    position: "100%"
                }]
            }, {
                name: "Shape 2 Style",
                stops: [{
                    color: "#e0f3fa",
                    position: "0%"
                }, {
                    color: "#d8f0fc",
                    position: "50%"
                }, {
                    color: "#b8e2f6",
                    position: "51%"
                }, {
                    color: "#b6dffd",
                    position: "100%"
                }]
            }, {
                name: "Wax 3D #1",
                stops: [{
                    color: "#feffe8",
                    position: "0%"
                }, {
                    color: "#d6dbbf",
                    position: "100%"
                }]
            }, {
                name: "Wax 3D #2",
                stops: [{
                    color: "#fcfff4",
                    position: "0%"
                }, {
                    color: "#e9e9ce",
                    position: "100%"
                }]
            }, {
                name: "Wax 3D #3",
                stops: [{
                    color: "#fcfff4",
                    position: "0%"
                }, {
                    color: "#dfe5d7",
                    position: "40%"
                }, {
                    color: "#b3bead",
                    position: "100%"
                }]
            }, {
                name: "Wax 3D",
                stops: [{
                    color: "#e5e696",
                    position: "0%"
                }, {
                    color: "#d1d360",
                    position: "100%"
                }]
            }, {
                name: "Wax Flat",
                stops: [{
                    color: "#eaefb5",
                    position: "0%"
                }, {
                    color: "#e1e9a0",
                    position: "100%"
                }]
            }, {
                name: "Black 3D #1",
                stops: [{
                    color: "#45484d",
                    position: "0%"
                }, {
                    color: "#000000",
                    position: "100%"
                }]
            }, {
                name: "Black 3D",
                stops: [{
                    color: "#7d7e7d",
                    position: "0%"
                }, {
                    color: "#0e0e0e",
                    position: "100%"
                }]
            }, {
                name: "Black Gloss Pipe",
                stops: [{
                    color: "#959595",
                    position: "0%"
                }, {
                    color: "#0d0d0d",
                    position: "46%"
                }, {
                    color: "#010101",
                    position: "50%"
                }, {
                    color: "#0a0a0a",
                    position: "53%"
                }, {
                    color: "#4e4e4e",
                    position: "76%"
                }, {
                    color: "#383838",
                    position: "87%"
                }, {
                    color: "#1b1b1b",
                    position: "100%"
                }]
            }, {
                name: "Black Gloss",
                stops: [{
                    color: "#aebcbf",
                    position: "0%"
                }, {
                    color: "#6e7774",
                    position: "50%"
                }, {
                    color: "#0a0e0a",
                    position: "51%"
                }, {
                    color: "#0a0809",
                    position: "100%"
                }]
            }, {
                name: "Web 2.0 Blue 3D #1",
                stops: [{
                    color: "#c5deea",
                    position: "0%"
                }, {
                    color: "#8abbd7",
                    position: "31%"
                }, {
                    color: "#066dab",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #1",
                stops: [{
                    color: "#f7fbfc",
                    position: "0%"
                }, {
                    color: "#d9edf2",
                    position: "40%"
                }, {
                    color: "#add9e4",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D",
                stops: [{
                    color: "#d6f9ff",
                    position: "0%"
                }, {
                    color: "#9ee8fa",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #3",
                stops: [{
                    color: "#e9f6fd",
                    position: "0%"
                }, {
                    color: "#d3eefb",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #4",
                stops: [{
                    color: "#63b6db",
                    position: "0%"
                }, {
                    color: "#309dcf",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #2",
                stops: [{
                    color: "#2c539e",
                    position: "0%"
                }, {
                    color: "#2c539e",
                    position: "100%"
                }]
            }, {
                name: "Ble 3D #5",
                stops: [{
                    color: "#a9e4f7",
                    position: "0%"
                }, {
                    color: "#0fb4e7",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #5",
                stops: [{
                    color: "#93cede",
                    position: "0%"
                }, {
                    color: "#75bdd1",
                    position: "41%"
                }, {
                    color: "#49a5bf",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #6",
                stops: [{
                    color: "#b2e1ff",
                    position: "0%"
                }, {
                    color: "#66b6fc",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #9",
                stops: [{
                    color: "#4f85bb",
                    position: "0%"
                }, {
                    color: "#4f85bb",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #10",
                stops: [{
                    color: "#deefff",
                    position: "0%"
                }, {
                    color: "#98bede",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #11",
                stops: [{
                    color: "#49c0f0",
                    position: "0%"
                }, {
                    color: "#2cafe3",
                    position: "100%"
                }]
            }, {
                name: "Blue 3D #12",
                stops: [{
                    color: "#feffff",
                    position: "0%"
                }, {
                    color: "#d2ebf9",
                    position: "100%"
                }]
            }, {
                name: "Blue 3d #8",
                stops: [{
                    color: "#a7cfdf",
                    position: "0%"
                }, {
                    color: "#23538a",
                    position: "100%"
                }]
            }, {
                name: "Blue 3d #7",
                stops: [{
                    color: "#499bea",
                    position: "0%"
                }, {
                    color: "#207ce5",
                    position: "100%"
                }]
            }, {
                name: "Blue Flat",
                stops: [{
                    color: "#356aa0",
                    position: "0%"
                }, {
                    color: "#356aa0",
                    position: "100%"
                }]
            }, {
                name: "White 3D #1",
                stops: [{
                    color: "#ffffff",
                    position: "0%"
                }, {
                    color: "#f6f6f6",
                    position: "47%"
                }, {
                    color: "#ededed",
                    position: "100%"
                }]
            }, {
                name: "White 3D #2",
                stops: [{
                    color: "#f2f9fe",
                    position: "0%"
                }, {
                    color: "#d6f0fd",
                    position: "100%"
                }]
            }, {
                name: "White 3D",
                stops: [{
                    color: "#ffffff",
                    position: "0%"
                }, {
                    color: "#e5e5e5",
                    position: "100%"
                }]
            }, {
                name: "White Gloss #1",
                stops: [{
                    color: "#ffffff",
                    position: "0%"
                }, {
                    color: "#f1f1f1",
                    position: "50%"
                }, {
                    color: "#e1e1e1",
                    position: "51%"
                }, {
                    color: "#f6f6f6",
                    position: "100%"
                }]
            }, {
                name: "White Gloss #2",
                stops: [{
                    color: "#ffffff",
                    position: "0%"
                }, {
                    color: "#f3f3f3",
                    position: "50%"
                }, {
                    color: "#ededed",
                    position: "51%"
                }, {
                    color: "#ffffff",
                    position: "100%"
                }]
            }, {
                name: "White Gloss",
                stops: [{
                    color: "#f6f8f9",
                    position: "0%"
                }, {
                    color: "#e5ebee",
                    position: "50%"
                }, {
                    color: "#d7dee3",
                    position: "51%"
                }, {
                    color: "#f5f7f9",
                    position: "100%"
                }]
            }, {
                name: "Yellow 3D #1",
                stops: [{
                    color: "#f6e6b4",
                    position: "0%"
                }, {
                    color: "#ed9017",
                    position: "100%"
                }]
            }, {
                name: "Yellow 3D #2",
                stops: [{
                    color: "#eab92d",
                    position: "0%"
                }, {
                    color: "#c79810",
                    position: "100%"
                }]
            }, {
                name: "Yellow 3D #2",
                stops: [{
                    color: "#ffd65e",
                    position: "0%"
                }, {
                    color: "#febf04",
                    position: "100%"
                }]
            }, {
                name: "Yellow 3D",
                stops: [{
                    color: "#f1e767",
                    position: "0%"
                }, {
                    color: "#feb645",
                    position: "100%"
                }]
            }, {
                name: "Yellow Flat #1",
                stops: [{
                    color: "#ffff88",
                    position: "0%"
                }, {
                    color: "#ffff88",
                    position: "100%"
                }]
            }, {
                name: "Yellow Flat",
                stops: [{
                    color: "#febf01",
                    position: "0%"
                }, {
                    color: "#febf01",
                    position: "100%"
                }]
            }]
        }
    }, Gradient.DB.Default = Gradient.DB.UltimateWeb2, void 0 === Gradient) var Gradient = {};
Gradient.Editor = function(a) {
        function b(a, b) {
            d.previewDimensionsWidth = a - 2, d.previewDimensionsHeight = b - 2, d.previewDimensionWidthElem.value = d.previewDimensionsWidth, d.previewDimensionHeightElem.value = d.previewDimensionsHeight, ColorZilla.Persist.set("preview-width", d.previewDimensionsWidth), ColorZilla.Persist.set("preview-height", d.previewDimensionsHeight)
        }

        function c() {
            Refresh.Web.DefaultColorPickerSettings.clientFilesPath = "../colorpicker/images/", d.colorPicker = new Refresh.Web.ColorPicker("cp1", {
                startHex: "ffcc00",
                startMode: "s"
            }), d.colorPicker.updateColorZilla = function() {
                var a = Refresh.Web.ColorMethods.normalizeHex($("cp1_Hex").value);
                d.colorStopsHandler.changeActiveStopValue("#" + a)
            }, d.colorPickerDialogWin = new Window({
                top: 170,
                left: 400,
                maximizable: !1,
                resizable: !1,
                minimizable: !1,
                hideEffect: Element.hide,
                showEffect: Element.show
            }), d.colorPickerDialogWin.setContent("colorpicker-1", !0, !1);
            var a = d.colorPickerElem.select(".dialog-button.ok-button")[0],
                b = d.colorPickerElem.select(".dialog-button.cancel-button")[0];
            a.observe("click", function() {
                d.invalidateCurrentPreset();
                var a = Refresh.Web.ColorMethods.normalizeHex($("cp1_Hex").value);
                d.lastUsedColor = "#" + a, d.colorPickerDialogWin.close()
            }), b.observe("click", function() {
                d.colorPickerDialogWin.close()
            }), Event.observe(window, "keypress", function(a) {
                a.keyCode == Event.KEY_ESC && d.colorPickerDialogWin.visible && d.colorPickerDialogWin.close()
            }), myObserver = {
                onClose: function(a, b) {
                    b == d.colorPickerDialogWin && d.colorStopsHandler.changeActiveStopValue(d.lastUsedColor)
                }
            }, Windows.addObserver(myObserver);
            var c = [{
                name: "Save Current Gradient",
                callback: function(a) {
                    d.onSaveNewPresetButtonClick()
                },
                className: "new-preset"
            }, {
                name: "Delete Gradient",
                callback: function(a) {
                    d.deleteUserPreset(a.contextMenuElement)
                },
                className: "delete-preset"
            }];
            new Proto.Menu({
                beforeShow: function(a) {
                    var b = a.contextMenuContainerElement.select(".delete-preset")[0];
                    a.contextMenuElement.hasClassName("user-preset") ? (b.addClassName("enabled"), b.removeClassName("disabled")) : (b.addClassName("disabled"), b.removeClassName("enabled"))
                },
                selector: ".has-preset-contextmenu",
                className: "menu desktop preset-context-menu",
                menuItems: c
            }), d.updateOutputFormatHeaders(), d.initCopyToClipboard()
        }
        var d = this; - 1 != navigator.appVersion.indexOf("Mac") && $$("body")[0].addClassName("macos"), this.gradientControl = $(a), this.gradientPanelElem = this.gradientControl.select(".gradient-panel")[0], this.gradientMarkersContainerElem = this.gradientControl.select(".stop-markers-color")[0], this.gradientMarkerDeleterElem = this.gradientControl.select(".stop-markers-color-deleter")[0], this.stopDetailsPanel = this.gradientControl.select(".stop-details-color")[0];
        var e = {
            gradientEditor: this,
            gradientControl: this.gradientControl,
            gradientPanelElem: this.gradientPanelElem,
            gradientMarkersContainerElem: this.gradientMarkersContainerElem,
            gradientMarkerDeleterElem: this.gradientMarkerDeleterElem,
            stopDetailsPanel: this.stopDetailsPanel,
            onStopActivatedCallback: this.onStopActivated.bind(this)
        };
        this.colorStopsHandler = new Gradient.StopsHandler("color", e), this.gradientOpacityMarkersContainerElem = this.gradientControl.select(".stop-markers-opacity")[0], this.gradientOpacityMarkerDeleterElem = this.gradientControl.select(".stop-markers-opacity-deleter")[0], this.opacityStopDetailsPanel = this.gradientControl.select(".stop-details-opacity")[0];
        var e = {
            gradientEditor: this,
            gradientControl: this.gradientControl,
            gradientPanelElem: this.gradientPanelElem,
            gradientMarkersContainerElem: this.gradientOpacityMarkersContainerElem,
            gradientMarkerDeleterElem: this.gradientOpacityMarkerDeleterElem,
            stopDetailsPanel: this.opacityStopDetailsPanel,
            onStopActivatedCallback: this.onStopActivated.bind(this)
        };
        this.opacityStopsHandler = new Gradient.StopsHandler("opacity", e), this.cssTextElem = this.gradientControl.select(".css-output-text")[0], this.cssCopyButtonContainerElem = this.gradientControl.select(".copy-button-container")[0], this.cssCopyButtonElem = this.cssCopyButtonContainerElem.select(".copy-button")[0], this.cssCopyStatusElem = this.gradientControl.select(".copy-status")[0], this.cssNotesElem = this.gradientControl.select(".css-notes")[0], this.cssNotesTextElem = this.cssNotesElem.select(".css-notes-text")[0], this.cssCompatNotesElem = $$(".browser-compatibility .css-notes")[0], this.cssCompatNotesTextElem = this.cssCompatNotesElem.select(".css-notes-text")[0], this.cssNotesCloseButton = this.cssNotesElem.select(".small-close-button")[0], this.cssNotesCloseButton.observe("click", function() {
            d.cssNotesElem.hide()
        }), this.cssCompatNotesCloseButton = this.cssCompatNotesElem.select(".small-close-button")[0], this.cssCompatNotesCloseButton.observe("click", function() {
            d.cssCompatNotesElem.hide()
        }), this.currentOutputFormatElem = this.gradientControl.select(".current-output-format")[0], this.switchOutputFormatElem = this.gradientControl.select(".switch-output-format")[0], this.previewBackgroundElem = this.gradientControl.select(".preview-panel-background")[0], this.previewElem = this.gradientControl.select(".preview-panel")[0], this.previewHandleElem = this.gradientControl.select(".preview-panel-handle")[0], this.orientationSelectorElem = this.gradientControl.select(".output-options .orientation")[0], this.previewDimensionWidthElem = this.gradientControl.select(".output-options .dimension-width")[0], this.previewDimensionHeightElem = this.gradientControl.select(".output-options .dimension-height")[0], this.previewAsIECheckboxElem = this.gradientControl.select(".output-options input.preview-as-ie")[0], this.presetsContainerElem = this.gradientControl.select(".presets .presets-container")[0], this.gradientNameBoxElem = this.gradientControl.select(".gradient-name .name-input")[0], this.saveNewPresetButtonElem = this.gradientControl.select(".gradient-name .save-new-preset")[0], Gradient.UIUtils.makeResizable(this.previewBackgroundElem, this.previewHandleElem, b), this.colorFormatSelectorElem = this.gradientControl.select(".css-options .color-format")[0], this.includeCSSCommentsCheckboxElem = this.gradientControl.select(".css-options input#css-comments")[0], this.supportIE9CheckboxElem = $$("input#css-ie9-support")[0], this.maximizeCssCompatibilityElem = $$("input#maximize-css-compatibility")[0], this.supportIE9HelpElem = $$(".css-ie9-support-help a")[0], this.colorPickerElem = $("colorpicker-1"), this.gradientPanelElemWidth = Element.getWidth(this.gradientPanelElem), this.gradientPanelElemWidth -= 2, this.cssTextElem.observe("dblclick", function() {
            Gradient.Utils.selectTextInNode(d.cssTextElem), Gradient.Utils.sendEvent("generated-output", "text-select")
        }), this.orientationSelectorElem.observe("change", this.onOrientationSelectorChange.bind(this)), this.previewDimensionWidthElem.observe("change", this.onPreviewDimensionsChange.bind(this)), this.previewDimensionHeightElem.observe("change", this.onPreviewDimensionsChange.bind(this)), this.previewAsIECheckboxElem.observe("change", this.onPreviewAsIECheckboxChange.bind(this)), this.colorFormatSelectorElem.observe("change", this.onColorFormatSelectorChange.bind(this)), this.includeCSSCommentsCheckboxElem.observe("change", this.onIncludeCSSCommentsCheckboxChange.bind(this)), this.saveNewPresetButtonElem.observe("click", this.onSaveNewPresetButtonClick.bind(this)), this.supportIE9CheckboxElem.observe("change", this.onSupportIE9CheckboxChange.bind(this)), this.supportIE9HelpElem.observe("click", function(a) {
            Event.stop(a), d.showIE9SupportInstructions()
        }), this.maximizeCssCompatibilityElem.observe("change", this.onMaximizeCssCompatibilityCheckboxChange.bind(this)), this.importFromCSSButton = this.gradientControl.select("a.import-css")[0], this.importFromCSSButton.observe("click", this.onImportFromCSSButtonClicked.bind(this)), this.importFromCSSPanel = this.gradientControl.select(".import-css-input-panel")[0], this.importFromCSSPanelOkButton = this.gradientControl.select(".import-css-input-panel button.ok")[0], this.importFromCSSPanelOkButton.observe("click", this.onImportFromCSSPanelOkButtonClick.bind(this)), this.importFromCSSPanelCancelButton = this.gradientControl.select(".import-css-input-panel button.cancel")[0], this.importFromCSSPanelCancelButton.observe("click", this.onImportFromCSSPanelCancelButtonClick.bind(this)), this.importFromCSSTextElem = this.gradientControl.select(".import-css-input-panel .import-css-text")[0], this.importFromImageButton = this.gradientControl.select("a.import-image")[0], this.importFromImageButton.observe("click", this.onImportFromImageButtonClicked.bind(this)), this.importFromImagePanel = this.gradientControl.select(".import-image-input-panel")[0], this.importFromImageForm = this.gradientControl.select(".import-image-form")[0], this.importFromImagePanelOkButton = this.gradientControl.select(".import-image-input-panel button.ok")[0], this.importFromImagePanelOkButton.observe("click", this.onImportFromImagePanelOkButtonClick.bind(this)), this.importFromImagePanelCancelButton = this.gradientControl.select(".import-image-input-panel button.cancel")[0], this.importFromImagePanelCancelButton.observe("click", this.onImportFromImagePanelCancelButtonClick.bind(this)), this.importFromImageFileInputElem = this.gradientControl.select(".import-image-input-panel input.import-image-file-input")[0], this.importFromImageURLInputElem = this.gradientControl.select(".import-image-input-panel input.import-image-url-input")[0], this.switchOutputFormatElem.observe("click", this.onSwitchOutputFormatClicked.bind(this)), this.permalinkElem = this.gradientControl.select(".permalink-panel .permalink")[0], this.permalinkElem.observe("mousedown", function() {
            Gradient.Utils.sendEvent("permalink", "click")
        }), this.cssImporter = null, this.lastUsedColor = "#ffffff", this.outputOrientation = ColorZilla.Persist.get("output-orientation", "vertical"), this.orientationSelectorElem.value = this.outputOrientation, this.previewDimensionsWidth = ColorZilla.Persist.get("preview-width", "370"), this.previewDimensionsHeight = ColorZilla.Persist.get("preview-height", "50"), this.previewDimensionWidthElem.value = this.previewDimensionsWidth, this.previewDimensionHeightElem.value = this.previewDimensionsHeight, this.previewAsIE = !1, this.cssColorFormat = ColorZilla.Persist.get("css-color-format", "hex"), this.colorFormatSelectorElem.value = this.cssColorFormat, this.includeCSSComments = "true" == ColorZilla.Persist.get("include-css-comments", "true"), this.includeCSSCommentsCheckboxElem.checked = this.includeCSSComments, this.supportIE9 = "true" == ColorZilla.Persist.get("support-ie9", "false"), this.supportIE9CheckboxElem.checked = this.supportIE9, this.updateIE9CompatibilityDisplay(this.supportIE9), this.maximizeCSSCompatibility = "true" == ColorZilla.Persist.get("maximize-css-compatibility", "false"), this.maximizeCssCompatibilityElem.checked = this.maximizeCSSCompatibility, this.updateMaximizeCSSCompatibilityDisplay(this.maximizeCSSCompatibility), this.outputFormat = ColorZilla.Persist.get("output-format", "css"), this.switchToPresetSet("Default"), this.userGradientPresets = Gradient.UserPresets.get(), this.userGradientPresetsIDCounter = this.userGradientPresets.length, this.addUserPresets(this.userGradientPresets), setTimeout(c, 10), setTimeout(function() {
            d.gradientAdjuster = new Gradient.Adjustments(d)
        }, 10);
        var f, g = this.getGradientFromPermalinkHash(window.location.hash);
        g ? (f = g, Gradient.Utils.sendEvent("permalink", "loaded", f.name)) : f = this.userGradientPresets.length > 0 ? this.userGradientPresets[this.userGradientPresets.length - 1] : Gradient.DB.Default.gradients[0], this.setCurrentPreset(f.name, Gradient.Utils.deepClone(f.stops), Gradient.Utils.deepClone(this.getGradientPresetOpacityStops(f))), Event.observe(window, "hashchange", this.onHashChanged.bind(this)), this.uiUpdateTimerID = 0
    }, Gradient.Editor.prototype = {
        cssGradientsSupported: function() {
            var a = document.createElement("div");
            return a.style.cssText = "background-image:gradient(linear,left top,right bottom,from(#222),to(#444));background-image:-o-gradient(linear,left top,right bottom,from(#222),to(#444));background-image:-moz-gradient(linear,left top,right bottom,from(#222),to(#444));background-image:-ms-gradient(linear,left top,right bottom,from(#222),to(#444));background-image:-webkit-gradient(linear,left top,right bottom,from(#222),to(#444));background-image:-khtml-gradient(linear,left top,right bottom,from(#222),to(#444));background-image:linear-gradient(left top,#222, #444);background-image:-o-linear-gradient(left top,#222, #444);background-image:-moz-linear-gradient(left top,#222, #444);background-image:-ms-linear-gradient(left top,#222, #444);background-image:-webkit-linear-gradient(left top,#222, #444);background-image:-khtml-linear-gradient(left top,#222, #444);", -1 !== a.style.backgroundImage.indexOf("gradient")
        },
        formatCSSColor: function(a, b, c) {
            if ("hex" == c || "iehex" == c && 1 == b) return a.toLowerCase();
            if ("iehex" == c) return a = a.toLowerCase(), "#" == a.substr(0, 1) && (a = a.substring(1)), b = Math.round(255 * b), "#" + (b = Gradient.Utils.decimalToHexa(b)) + a;
            var d = Gradient.Utils.hexaToRGB(a);
            return "rgb" == c ? Gradient.Utils.rbgToRGBCSS(d) : "rgba" == c ? Gradient.Utils.rbgAndAlphaToRGBACSS(d, b) : "hsl" == c ? Gradient.Utils.rgbToHSLCSS(d) : "hsla" == c ? Gradient.Utils.rgbToHSLCSS(d, b) : a
        },
        generateCSSRules: function(a, b, c) {
            var d = a;
            void 0 === b && (b = "horizontal"), void 0 === c && (c = "hex");
            var e, f, g, h, i, j, k, l = "linear",
                m = !1;
            switch (b) {
                case "horizontal":
                    e = "left top, right top", f = "left", g = "GradientType=1", h = "horizontal", i = "left", j = "left", k = "to right";
                    break;
                case "vertical":
                    e = "left top, left bottom", f = "top", g = "GradientType=0", h = "vertical", i = "top", j = "top", k = "to bottom";
                    break;
                case "diagonal":
                    e = "left top, right bottom", f = "-45deg", g = "GradientType=1", h = "horizontal", i = "-45deg", m = !0, j = "left top", k = "135deg";
                    break;
                case "diagonal-bottom":
                    e = "left bottom, right top", f = "45deg", g = "GradientType=1", h = "horizontal", i = "45deg", m = !0, j = "left bottom", k = "45deg";
                    break;
                case "radial":
                    l = "radial", e = "center center, 0px, center center, 100%", f = "center, ellipse cover", g = "GradientType=1", h = "horizontal", i = "center, ellipse cover", j = "center, ellipse cover", m = !0, k = "ellipse at center"
            }
            var n = "rgba" == c ? "rgb" : "hex" != c && "rgb" != c ? "hex" : c,
                o = this.formatCSSColor(d[0].color, 1, n),
                p = [],
                q = [],
                r = [],
                s = this.formatCSSColor(d[0].color, d[0].opacity, "iehex"),
                t = this.formatCSSColor(d[d.length - 1].color, d[d.length - 1].opacity, "iehex");
            ieCSS = "startColorstr='" + s + "', endColorstr='" + t + "'";
            for (var u = 0; u < d.length; u++) {
                var v = this.formatCSSColor(d[u].color, d[u].opacity, c),
                    w = d[u].position;
                p.push(v + " " + w), q.push("color-stop(" + w + "," + v + ")")
            }
            var x = p,
                y = f,
                r = x;
            p = p.join(", "), p = "-moz-" + l + "-gradient(" + f + ",  " + p + ")", q = q.join(", "), q = "-webkit-gradient(" + l + ", " + e + ", " + q + ")", ieCSS = "progid:DXImageTransform.Microsoft.gradient( " + ieCSS + "," + g + " )", r = "-o-" + l + "-gradient(" + i + ",  " + r + ")";
            var z = "-webkit-" + l + "-gradient(" + y + ",  " + x + ")",
                A = "-ms-" + l + "-gradient(" + y + ",  " + x + ")",
                B = x,
                x = l + "-gradient(" + k + ",  " + x + ")",
                C = l + "-gradient(" + j + ",  " + B + ")",
                D = "filter-gradient(" + s + ", " + t + ", " + h + ");";
            return {
                kind: l,
                solid: o,
                moz: p,
                webkit: q,
                newWebkit: z,
                ie: ieCSS,
                ieCSSIsFallback: m,
                ieCSS3: A,
                opera: r,
                w3Standard: x,
                standardSCSS: C,
                ieSCSS: D
            }
        },
        generateSVGRule: function(a, b) {
            var c = this.generateSVG(a, b);
            return "url(" + Gradient.Utils.dataURIEncode(c, "image/svg+xml") + ")"
        },
        generateSVG: function(a, b) {
            var c, d = a,
                e = "linear",
                f = 'x="0" y="0" width="1" height="1"';
            switch (b) {
                case "horizontal":
                    c = 'x1="0%" y1="0%" x2="100%" y2="0%"';
                    break;
                case "vertical":
                    c = 'x1="0%" y1="0%" x2="0%" y2="100%"';
                    break;
                case "diagonal":
                    c = 'x1="0%" y1="0%" x2="100%" y2="100%"';
                    break;
                case "diagonal-bottom":
                    c = 'x1="0%" y1="100%" x2="100%" y2="0%"';
                    break;
                case "radial":
                    e = "radial", c = 'cx="50%" cy="50%" r="75%"', f = 'x="-50" y="-50" width="101" height="101"'
            }
            var g = (new Date, "ucgg-generated"),
                h = [];
            h.push('<?xml version="1.0" ?>'), h.push('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">'), h.push("  <" + e + 'Gradient id="grad-' + g + '" gradientUnits="userSpaceOnUse" ' + c + ">");
            for (var i = 0; i < d.length; i++) {
                var j = d[i].color.toLowerCase(),
                    k = d[i].opacity,
                    l = d[i].position;
                h.push('    <stop offset="' + l + '" stop-color="' + j + '" stop-opacity="' + k + '"/>')
            }
            return h.push("  </" + e + "Gradient>"), h.push("  <rect " + f + ' fill="url(#grad-' + g + ')" />'), h.push("</svg>"), h = h.join("\n")
        },
        setElementGradientBackground: function(a, b) {
            try {
                a.style.background = b.solid
            } catch (a) {}
            try {
                a.style.background = b.moz
            } catch (a) {}
            try {
                a.style.background = b.webkit
            } catch (a) {}
            try {
                a.style.background = b.newWebkit
            } catch (a) {}
            try {
                a.style.background = b.opera
            } catch (a) {}
            try {
                a.style.background = b.ieCSS3
            } catch (a) {}
            try {
                a.style.filter = b.ie
            } catch (a) {}
            try {
                a.style.background = b.w3Standard
            } catch (a) {}
        },
        setColorStops: function(a) {
            this.colorStopsHandler.setStops(a), this.updateAllUI()
        },
        setAllStops: function(a, b) {
            this.colorStopsHandler.setStops(a), void 0 !== b && b ? this.opacityStopsHandler.setStops(b) : this.opacityStopsHandler.setStops(this.opacityStopsHandler.defaultStops), this.updateAllUI()
        },
        getColorStops: function() {
            return this.colorStopsHandler.getStops()
        },
        getOpacityStops: function() {
            return this.opacityStopsHandler.getStops()
        },
        currentGradientHasOpacity: function() {
            var a = this.getOpacityStops();
            return Gradient.StopUtils.gradientHasOpacity({
                stops: a
            })
        },
        getMergedStops: function() {
            if (this.currentGradientHasOpacity()) return Gradient.StopUtils.mergeStops(this.getColorStops(), this.getOpacityStops());
            for (var a = Gradient.Utils.deepClone(this.getColorStops()), b = 0; b < a.length; b++) a[b].opacity = 1;
            return a
        },
        getGradientPresetOpacityStops: function(a) {
            return "opacityStops" in a ? a.opacityStops : this.opacityStopsHandler.defaultStops
        },
        setNewStopColor: function(a) {
            this.lastUsedColor = a
        },
        updateAllUI: function() {
            this.mergedStops = this.getMergedStops(), this.updateGradientPanel(), this.colorStopsHandler.updateStopMarkers(), this.opacityStopsHandler.updateStopMarkers(), this.switchToOpacitySupportingColorModeIfNeeded(), this.cssRules = this.generateCSSRules(this.mergedStops, this.outputOrientation, this.cssColorFormat), this.updatePreviewElement();
            var a = this;
            clearTimeout(this.uiUpdateTimerID), this.uiUpdateTimerID = setTimeout(function() {
                a.supportIE9 && (a.cssRules.svg = a.generateSVGRule(a.mergedStops, a.outputOrientation)), a.updatePermalink(), a.updateCSSOutput()
            }, 50)
        },
        switchToOpacitySupportingColorModeIfNeeded: function() {
            this.currentGradientHasOpacity() && "rgba" != this.cssColorFormat && "hsla" != this.cssColorFormat && (this.cssColorFormat = "hsl" == this.cssColorFormat ? "hsla" : "rgba", this.colorFormatSelectorElem.value = this.cssColorFormat, this.cssNotesTextElem.innerHTML = "Current gradient has opacity, switching color format to '" + this.cssColorFormat + "'", this.cssNotesElem.show(), ColorZilla.Persist.set("css-color-format", this.cssColorFormat))
        },
        adjustCopyButtonPositionForScrollbar: function() {
            if (void 0 === this.scrollbarWidth) {
                var a = $$(".scrollbar-measure")[0];
                this.scrollbarWidth = a.offsetWidth - a.clientWidth, this.cssCopyButtonElemLastMargin = -1
            }
            var b = this.cssTextElem.scrollHeight > this.cssTextElem.getHeight() ? this.scrollbarWidth : 1;
            b != this.cssCopyButtonElemLastMargin && (this.cssCopyButtonElemLastMargin = b, this.cssCopyButtonElem.style.marginRight = b + "px")
        },
        getPermalink: function() {
            return "https://colorzilla.com/gradient-editor/#" + this.currentGradientToHash()
        },
        updatePermalink: function() {
            this.permalinkElem.setAttribute("href", this.getPermalink())
        },
        updateGradientPanel: function() {
            var a = this.mergedStops,
                b = this.generateCSSRules(a, "horizontal", "rgba");
            this.setElementGradientBackground(this.gradientPanelElem, b)
        },
        updateCSSOutput: function() {
            var a = this.cssRules,
                b = [],
                c = [],
                d = "IE9 SVG, needs conditional override of 'filter' to 'none'",
                e = "IE6-9";
            this.supportIE9 && (e = "IE6-8"), a.ieCSSIsFallback && (e += " fallback on horizontal gradient");
            var f;
            "css" == this.outputFormat ? (this.includeCSSComments && b.push("/* Permalink - use to edit and share this gradient: " + this.getPermalink() + " */"), this.currentGradientHasOpacity() || b.push("background: " + a.solid + ";" + (this.includeCSSComments ? " /* Old browsers */" : "")), this.supportIE9 && (this.includeCSSComments && b.push("/* " + d + " */"), b.push("background: " + a.svg + ";")), b.push("background: " + a.moz + ";" + (this.includeCSSComments ? " /* FF3.6-15 */" : "")), this.maximizeCSSCompatibility && b.push("background: " + a.webkit + ";" + (this.includeCSSComments ? " /* Chrome4-9,Safari4-5 */" : "")), b.push("background: " + a.newWebkit + ";" + (this.includeCSSComments ? " /* Chrome10-25,Safari5.1-6 */" : "")), this.maximizeCSSCompatibility && (b.push("background: " + a.opera + ";" + (this.includeCSSComments ? " /* Opera " + ("linear" == a.kind ? "11.10-11.50" : "12+") + " */" : "")), b.push("background: " + a.ieCSS3 + ";" + (this.includeCSSComments ? " /* IE10 preview */" : ""))), b.push("background: " + a.w3Standard + ";" + (this.includeCSSComments ? " /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */" : "")), b.push("filter: " + a.ie + ";" + (this.includeCSSComments ? " /* " + e + " */" : "")), f = b) : (this.includeCSSComments && (c.push("// Needs latest Compass, add '@import \"compass\"' to your scss"), c.push("// Permalink - use to edit and share this gradient:"), c.push("// " + this.getPermalink())), this.currentGradientHasOpacity() || c.push("background-color: " + a.solid + ";" + (this.includeCSSComments ? " // Old browsers" : "")), c.push("@include " + a.ieSCSS + (this.includeCSSComments ? " // " + e : "")), this.supportIE9 && (this.includeCSSComments && c.push("// " + d), c.push("$experimental-support-for-svg: true;")), c.push("@include background-image(" + a.standardSCSS + ");"), f = c), this.cssTextElem.innerHTML = "<div>" + f.join("</div><div>") + "</div>", void 0 === this.initialStateRemoved && (this.cssTextElem.removeClassName("initial"), this.initialStateRemoved = !0), this.adjustCopyButtonPositionForScrollbar()
        },
        updatePreviewElement: function() {
            var a;
            if (this.previewAsIE) {
                var b = this.getMergedStops(),
                    c = [b[0], b[b.length - 1]],
                    d = "diagonal" != this.outputOrientation.substr(0, 8) && "radial" != this.outputOrientation ? this.outputOrientation : "horizontal";
                a = this.generateCSSRules(c, d, "rgba")
            } else a = this.cssRules;
            this.setElementGradientBackground(this.previewElem, a), this.previewBackgroundElem.style.width = this.previewDimensionsWidth + "px", this.previewBackgroundElem.style.height = this.previewDimensionsHeight + "px"
        },
        updateOutputFormatHeaders: function() {
            "scss" == this.outputFormat ? (currentFormatStr = "SCSS (Sass)", switchToNewFormatStr = "switch to css") : (currentFormatStr = "CSS", switchToNewFormatStr = "switch to scss"), this.currentOutputFormatElem.innerHTML = currentFormatStr, this.switchOutputFormatElem.innerHTML = switchToNewFormatStr
        },
        setLastUsedColorFromCurrentGradient: function() {
            var a = this.getColorStops();
            this.lastUsedColor = a[0].color
        },
        onHashChanged: function() {
            var a = window.location.hash;
            if (a && "#" != a) {
                var b = this.getGradientFromPermalinkHash(a);
                b && this.setCurrentPreset(b.name, Gradient.Utils.deepClone(b.stops), Gradient.Utils.deepClone(this.getGradientPresetOpacityStops(b)))
            }
        },
        resetURLHash: function() {
            var a = window.location.hash;
            a && a.length > 6 && (window.location.hash = "#_")
        },
        getGradientFromPermalinkHash: function(a) {
            if (!a || !a.match(/,/)) return null;
            "#" == a.substr(0, 1) && (a = a.substring(1)), a = a.replace(/&amp;/g, "&");
            var b = a.split(";"),
                c = b.length > 1 ? decodeURIComponent(b[1]) : "Custom";
            c = c.replace(/\+/g, " "), c = c.replace(/[^0-9a-zA-Z \-_\.#]/g, " ");
            var d = b[0],
                e = d.split("&");
            d = e[0];
            for (var f = 2 == e.length ? e[1] : null, g = d.split(","), h = [], i = 0; i < g.length; i++) {
                var j = g[i].split("+"),
                    k = j[0];
                k.match(/^[0-9a-fA-F]{6}$/) || (k = "ffffff"), k = "#" + k;
                var l = j[1];
                l.match(/^\d{1,3}$/) || (l = "0"), l += "%", h.push({
                    color: k,
                    position: l
                })
            }
            var m = null;
            if (f) {
                var g = f.split(",");
                m = [];
                for (var i = 0; i < g.length; i++) {
                    var j = g[i].split("+"),
                        n = j[0];
                    n.match(/^[0-9\.]+$/) || (n = 1);
                    var l = j[1];
                    l.match(/^\d{1,3}$/) || (l = "0"), l += "%", m.push({
                        opacity: n,
                        position: l
                    })
                }
            }
            var o = {
                name: c,
                stops: h
            };
            return m && (o.opacityStops = m), o
        },
        currentGradientToHash: function() {
            for (var a = [], b = this.getColorStops(), c = 0; c < b.length; c++) {
                var d = b[c],
                    e = d.color.toLowerCase();
                "#" == e.substr(0, 1) && (e = e.substring(1));
                var f = parseInt(d.position);
                a.push(e + "+" + f)
            }
            var g = a.join(",");
            if (this.currentGradientHasOpacity()) {
                for (var a = [], b = this.getOpacityStops(), c = 0; c < b.length; c++) {
                    var d = b[c],
                        h = d.opacity,
                        f = parseInt(d.position);
                    a.push(h + "+" + f)
                }
                g += "&" + a.join(",")
            }
            var i = encodeURIComponent(this.getCurrentPresetName());
            return "Custom" != i && (i = i.replace(/%20/g, "+"), g += ";" + i), g
        },
        openColorPickerAndGetColor: function(a) {
            var b = window.prompt("Enter new color");
            null !== b && a(b)
        },
        initCopyToClipboard: function() {
            if (!ClipboardJS.isSupported()) return void this.cssCopyButtonElem.addClassName("no-flash");
            var a = this,
                b = new ClipboardJS(this.cssCopyButtonElem);
            this.cssCopyButtonElem.observe("mouseover", function() {
                var b = a.cssTextElem.innerHTML;
                b = b.replace(/<div[^>]*>/g, ""), b = b.replace(/<\/div>/g, "\r\n"), b = b.replace(/&amp;/g, "&"), a.cssCopyButtonElem.setAttribute("data-clipboard-text", b)
            }), b.on("success", function(b) {
                a.cssCopyStatusElem.show(), setTimeout(function() {
                    a.cssCopyStatusElem.hide()
                }, 2e3), Gradient.Utils.sendEvent("generated-output", "text-copy")
            })
        },
        openColorPicker: function(a, b) {
            this.colorPickerDialogWin.show(!0), $("cp1_Hex").focus();
            var c = this.lastUsedColor.substring(1);
            this.colorPicker._cvp._hexInput.value = c, this.colorPicker._cvp.setValuesFromHex(), this.colorPicker.positionMapAndSliderArrows(), this.colorPicker.updateVisuals()
        },
        switchToPresetSet: function(a) {
            this.clearPresets();
            var b = Gradient.DB[a];
            if (void 0 !== b) {
                b.license;
                for (var c = 0; c < b.gradients.length; c++) this.addPreset(b.gradients[c])
            }
        },
        addUserPresets: function(a) {
            for (var b = 0; b < a.length; b++) this.addPreset(a[b], !0, !0)
        },
        clearPresets: function() {
            var a = this.presetsContainerElem;
            if (a.hasChildNodes())
                for (; a.childNodes.length >= 1;) a.removeChild(a.firstChild)
        },
        addPreset: function(a, b, c) {
            var d = a.stops,
                e = a.name,
                f = this.getGradientPresetOpacityStops(a),
                g = document.createElement("div");
            g.className = "preset-item-background gradient-background";
            var h = document.createElement("div"),
                i = "preset-item  has-preset-contextmenu";
            c && (i += " user-preset", "uniqueID" in a && h.setAttribute("preset-id", a.uniqueID)), h.className = i;
            var j = Gradient.StopUtils.mergeStops(d, f),
                k = this.generateCSSRules(j, "diagonal", "rgba");
            this.setElementGradientBackground(h, k);
            var l = this,
                d = Gradient.Utils.deepClone(d),
                f = Gradient.Utils.deepClone(f);
            Element.extend(h), h.observe("click", function(a) {
                Event.isLeftClick(a) && (l.resetURLHash(), l.setCurrentPreset(e, d, f), Gradient.Utils.sendEvent("preset", "select", e))
            }), g.appendChild(h), b && this.presetsContainerElem.firstChild ? this.presetsContainerElem.insertBefore(g, this.presetsContainerElem.firstChild) : this.presetsContainerElem.appendChild(g)
        },
        deletePreset: function(a) {
            var b = a.up(".preset-item-background");
            b.parentNode.removeChild(b)
        },
        deleteUserPreset: function(a) {
            this.deletePreset(a);
            for (var b = a.getAttribute("preset-id"), c = [], d = 0; d < this.userGradientPresets.length; d++) b != this.userGradientPresets[d].uniqueID && c.push(this.userGradientPresets[d]);
            this.userGradientPresets = c, Gradient.UserPresets.persist(this.userGradientPresets)
        },
        getCurrentPresetName: function(a) {
            return this.gradientNameBoxElem.value
        },
        setPresetName: function(a) {
            this.gradientNameBoxElem.value = a
        },
        setCurrentPreset: function(a, b, c) {
            this.setPresetName(a), this.setAllStops(b, c), this.gradientAdjuster && this.gradientAdjuster.resetAllAdjustments(), this.setLastUsedColorFromCurrentGradient()
        },
        invalidateCurrentPreset: function(a) {
            this.setPresetName("Custom"), this.resetURLHash(), !a && this.gradientAdjuster && this.gradientAdjuster.resetAllAdjustments()
        },
        saveNewPreset: function() {
            var a = {
                name: this.getCurrentPresetName(),
                stops: this.getColorStops()
            };
            this.currentGradientHasOpacity() && (a.opacityStops = this.getOpacityStops()), a.uniqueID = this.userGradientPresetsIDCounter, this.userGradientPresetsIDCounter++, this.addPreset(a, !0, !0), a = Gradient.Utils.deepClone(a), this.userGradientPresets.push(a), Gradient.UserPresets.persist(this.userGradientPresets), Gradient.Utils.sendEvent("preset", "save", a.name)
        },
        toggleImportCSSPanel: function() {
            this.showHideImportImagePanel(!1), this.gradientAdjuster.onAdjustHueSaturationPanelCancelButtonClick(null, !0), Element.toggle(this.importFromCSSPanel)
        },
        toggleImportImagePanel: function() {
            this.showHideImportCSSPanel(!1), this.gradientAdjuster.onAdjustHueSaturationPanelCancelButtonClick(null, !0), Element.toggle(this.importFromImagePanel)
        },
        showHideImportPanel: function(a, b) {
            b ? Element.show(a) : Element.hide(a)
        },
        showHideImportCSSPanel: function(a) {
            this.showHideImportPanel(this.importFromCSSPanel, a)
        },
        showHideImportImagePanel: function(a) {
            this.showHideImportPanel(this.importFromImagePanel, a)
        },
        showIE9SupportInstructions: function() {
            var a = [];
            a.push('Support for full multi-stop gradients with IE9 (using SVG).<p>Add a "gradient" class to all your elements that have a gradient,'), a.push("and add the following override to your HTML to complete the IE9 support:"), a.push("<pre>&lt;!--[if gte IE 9]&gt;"), a.push('  &lt;style type="text/css"&gt;'), a.push("    .gradient {"), a.push("       filter: none;"), a.push("    }"), a.push("  &lt;/style&gt;"), a.push("&lt;![endif]--&gt;</pre>"), this.cssCompatNotesTextElem.innerHTML = a.join("\n"), this.cssCompatNotesElem.show()
        },
        exportToImageDataURL: function() {
            var a = this.previewDimensionsWidth,
                b = this.previewDimensionsHeight,
                c = document.createElement("canvas");
            c.setAttribute("width", a), c.setAttribute("height", b);
            for (var d = c.getContext("2d"), e = "horizontal" == this.outputOrientation ? a : 0, f = "horizontal" == this.outputOrientation ? 0 : b, g = d.createLinearGradient(0, 0, e, f), h = this.getColorStops(), i = 0; i < h.length; i++) {
                var j = h[i],
                    k = parseInt(j.position) / 100;
                g.addColorStop(k, j.color)
            }
            return d.fillStyle = g, d.fillRect(0, 0, a, b), c.toDataURL("image/png")
        },
        onStopActivated: function(a) {
            "color" == a ? this.opacityStopsHandler.setActiveStopMakerElemAndUpdateDetailsPanel(null) : this.colorStopsHandler.setActiveStopMakerElemAndUpdateDetailsPanel(null)
        },
        onOrientationSelectorChange: function(a) {
            var b = Event.element(a);
            this.outputOrientation = b.value, this.updateAllUI(), ColorZilla.Persist.set("output-orientation", this.outputOrientation), Gradient.Utils.sendEvent("generated-output", "change-orientation", this.outputOrientation)
        },
        onPreviewDimensionsChange: function(a) {
            this.previewDimensionsWidth = Math.min(parseInt(this.previewDimensionWidthElem.value), 370), this.previewDimensionsHeight = Math.min(parseInt(this.previewDimensionHeightElem.value), 350), this.previewDimensionWidthElem.value = this.previewDimensionsWidth, this.previewDimensionHeightElem.value = this.previewDimensionsHeight, this.updatePreviewElement(), ColorZilla.Persist.set("preview-width", this.previewDimensionsWidth), ColorZilla.Persist.set("preview-height", this.previewDimensionsHeight)
        },
        onPreviewAsIECheckboxChange: function(a) {
            var b = Event.element(a);
            this.previewAsIE = b.checked, this.updatePreviewElement()
        },
        onColorFormatSelectorChange: function(a) {
            var b = Event.element(a);
            this.cssColorFormat = b.value, this.cssNotesElem.hide(), this.updateAllUI(), ColorZilla.Persist.set("css-color-format", this.cssColorFormat), Gradient.Utils.sendEvent("generated-output", "change-color-format", this.cssColorFormat)
        },
        onIncludeCSSCommentsCheckboxChange: function(a) {
            var b = Event.element(a);
            this.includeCSSComments = b.checked, this.updateAllUI(), ColorZilla.Persist.set("include-css-comments", this.includeCSSComments ? "true" : "false"), Gradient.Utils.sendEvent("generated-output", "change-include-comments", this.includeCSSComments ? "true" : "false")
        },
        updateIE9CompatibilityDisplay: function(a) {
            var b = $$(".browser-compatibility .ie9-support-mode")[0];
            a ? b.removeClassName("partial") : b.addClassName("partial")
        },
        updateMaximizeCSSCompatibilityDisplay: function(a) {
            var b = $$(".browser-compatibility .compatibility-mode");
            a ? b.each(function(a) {
                a.removeClassName("not-supported")
            }) : b.each(function(a) {
                a.addClassName("not-supported")
            })
        },
        onSupportIE9CheckboxChange: function(a) {
            var b = Event.element(a);
            this.supportIE9 = b.checked, this.updateAllUI(), ColorZilla.Persist.set("support-ie9", this.supportIE9 ? "true" : "false"), this.supportIE9 ? this.showIE9SupportInstructions() : (this.cssNotesElem.hide(), this.cssCompatNotesElem.hide()), this.updateIE9CompatibilityDisplay(this.supportIE9), Gradient.Utils.sendEvent("generated-output", "change-support-ie9", this.supportIE9 ? "true" : "false")
        },
        onMaximizeCssCompatibilityCheckboxChange: function(a) {
            var b = Event.element(a);
            this.maximizeCSSCompatibility = b.checked, this.updateAllUI(), ColorZilla.Persist.set("maximize-css-compatibility", this.maximizeCSSCompatibility ? "true" : "false"), this.updateMaximizeCSSCompatibilityDisplay(this.maximizeCSSCompatibility), Gradient.Utils.sendEvent("generated-output", "change-maximize-css-compatibility", this.maximizeCSSCompatibility ? "true" : "false")
        },
        onImportFromCSSButtonClicked: function(a) {
            this.importFromCSSTextElem.value = "", this.toggleImportCSSPanel(), Gradient.Utils.sendEvent("import-css", "open")
        },
        onImportFromImageButtonClicked: function(a) {
            this.importFromImageForm.reset(), this.toggleImportImagePanel(), Gradient.Utils.sendEvent("import-image", "open")
        },
        onImportFromCSSPanelOkButtonClick: function(a) {
            var b = this.importFromCSSTextElem.value;
            if (!b) return this.showHideImportCSSPanel(!1), void Gradient.Utils.sendEvent("import-css", "close", "error-empty");
            this.cssImporter || (this.cssImporter = new Gradient.Importer);
            var c = this.cssImporter.parseCSS(b);
            if (!c) return alert("Couldn't parse gradient CSS.\nPlease check the format and try again."), void Gradient.Utils.sendEvent("import-css", "close", "parse-fail");
            this.setAllStops(c.stops, c.opacityStops), this.invalidateCurrentPreset(), this.showHideImportCSSPanel(!1), Gradient.Utils.sendEvent("import-css", "close", "success")
        },
        onImportFromImagePanelOkButtonClick: function(a) {
            if (!this.importFromImageFileInputElem.value && !this.importFromImageURLInputElem.value) return alert("Please specify file to upload or URL"), void Gradient.Utils.sendEvent("import-image", "close", "empty");
            this.importFromImageForm.target = "import-image-upload-target", this.importFromImageForm.submit();
            var b = this;
            window.importFromImageCallback = function(a) {
                b.onImportFromImageCallback(a)
            }, Gradient.Utils.sendEvent("import-image", "start-import")
        },
        onImportFromImageCallback: function(a) {
            if (!a) return alert("There was an error importing the gradient.\nPlease verify that you provided a valid gradient image and try again."), void Gradient.Utils.sendEvent("import-image", "close", "fail-no-resp");
            var b = a.evalJSON(!0);
            if (!b) return alert("There was an error in the gradient data.\nPlease verify that you provided a valid gradient image and try again."), void Gradient.Utils.sendEvent("import-image", "close", "fail-cannot-parse");
            this.setAllStops(b.stops, "opacityStops" in b ? b.opacityStops : null), this.invalidateCurrentPreset(), this.showHideImportImagePanel(!1), Gradient.Utils.sendEvent("import-image", "close", "success")
        },
        onImportFromCSSPanelCancelButtonClick: function(a) {
            this.showHideImportCSSPanel(!1), Gradient.Utils.sendEvent("import-css", "close", "cancel")
        },
        onImportFromImagePanelCancelButtonClick: function(a) {
            this.showHideImportImagePanel(!1), Gradient.Utils.sendEvent("import-image", "close", "cancel")
        },
        onSaveNewPresetButtonClick: function(a) {
            this.saveNewPreset()
        },
        onSwitchOutputFormatClicked: function(a) {
            Event.stop(a);
            "css" == this.outputFormat ? this.outputFormat = "scss" : this.outputFormat = "css", this.updateOutputFormatHeaders(), ColorZilla.Persist.set("output-format", this.outputFormat), this.updateAllUI(), Gradient.Utils.sendEvent("generated-output", "change-output-format", this.outputFormat)
        }
    }, Gradient.Adjustments = function(a) {
        this.gradientEditor = a, this.gradientControl = this.gradientEditor.gradientControl;
        var b = this.gradientControl.select(".gradient-adjustments-panel")[0];
        this.adjustments = ["hue", "sat", "light"], this.adjustmentSliderElems = {}, this.adjustmentEditBoxElems = {}, this.adjustmentRanges = {
            hue: {
                min: -180,
                max: 180
            },
            sat: {
                min: -100,
                max: 100
            },
            light: {
                min: -100,
                max: 100
            }
        };
        for (var c = 0; c < this.adjustments.length; c++) {
            var d = this.adjustments[c],
                e = b.select("." + d + "-adjust-bar-container")[0],
                f = e.select("." + d + "-adjust-bar")[0],
                g = b.select("." + d + "-adjust-value")[0],
                h = Gradient.Utils.blankURI,
                i = new Refresh.Web.Slider(f, {
                    xMinValue: 1,
                    xMaxValue: 2 * this.adjustmentRanges[d].max,
                    yMinValue: 1,
                    yMaxValue: 1,
                    arrowImage: h
                }, e);
            this.adjustmentSliderElems[d] = i, this.adjustmentEditBoxElems[d] = g, i.onValuesChanged = this.onSliderValueChanged.bind(this, i, d), g.observe("keyup", this.onAdjustValueEntryBoxKeyUp.bindAsEventListener(this, d)), g.observe("keydown", this.onAdjustValueEntryBoxKeyDown.bindAsEventListener(this, d)), g.observe("blur", this.onAdjustValueEntryBoxBlur.bindAsEventListener(this, d))
        }
        this.adjustHueSaturationPanel = b.select(".adjust-hue-saturation-panel")[0], this.adjustHueSaturationPanelOkButton = this.adjustHueSaturationPanel.select("button.ok")[0], this.adjustHueSaturationPanelOkButton.observe("click", this.onAdjustHueSaturationPanelOkButtonClick.bind(this)), this.adjustHueSaturationPanelCancelButton = this.adjustHueSaturationPanel.select("button.cancel")[0], this.adjustHueSaturationPanelCancelButton.observe("click", this.onAdjustHueSaturationPanelCancelButtonClick.bind(this)), b.select("a.adjust-reverse")[0].observe("click", this.onReverseGradientButtonClick.bind(this)), b.select("a.adjust-hue-sat")[0].observe("click", this.onAdjustHueSaturationButtonClick.bind(this)), this.resetAllAdjustments()
    }, Gradient.Adjustments.prototype = {
        resetSpecificAdjustment: function(a) {
            this.adjustmentEditBoxElems[a].value = 0, this.adjustmentSliderElems[a].xValue = this.adjustmentRanges[a].max, this.adjustmentSliderElems[a].setArrowPositionFromValues()
        },
        resetAllAdjustments: function(a) {
            if (this.adjustmentsMade || void 0 !== a) {
                this.adjustmentsMade = !1, this.preAdjustmentStops = null;
                for (var b = 0; b < this.adjustments.length; b++) this.resetSpecificAdjustment(this.adjustments[b]);
                this.currentAdjustments = {
                    hue: 0,
                    sat: 0,
                    light: 0
                }
            }
        },
        startAdjusting: function() {
            this.adjustmentsMade || (this.preAdjustmentStops = Gradient.Utils.deepClone(this.gradientEditor.getColorStops()), this.adjustmentsMade = !0, this.gradientEditor.invalidateCurrentPreset(!0))
        },
        setGradientAdjustment: function(a, b) {
            this.startAdjusting(), this.currentAdjustments[b] = a, this.adjustGradient()
        },
        adjustGradient: function() {
            function a(a, b) {
                return b > 0 ? a += Math.floor((255 - a) * b / 100 + .5) : b < 0 && (a += Math.floor(a * b / 100 + .5)), a < 0 && (a = 0), a > 255 && (a = 255), a
            }
            for (var b = Gradient.Utils.deepClone(this.preAdjustmentStops), c = this.currentAdjustments.sat, d = this.currentAdjustments.light, e = 0; e < b.length; e++) {
                var f = b[e],
                    g = Gradient.Utils.hexaToRGB(f.color),
                    h = Gradient.Utils.rgbToHSL(g.red, g.green, g.blue);
                h.hue += this.currentAdjustments.hue, h.hue = (h.hue % 360 + 360) % 360, h.sat = a(h.sat, c), h.light = a(h.light, d);
                var g = Gradient.Utils.hslToRGB(h.hue, h.sat, h.light),
                    i = Gradient.Utils.rgbToHexa(g.red, g.green, g.blue);
                f.color = i
            }
            this.gradientEditor.setColorStops(b)
        },
        revertGradientToPreAdjustmentState: function() {
            this.adjustmentsMade && this.gradientEditor.setColorStops(this.preAdjustmentStops)
        },
        revertStops: function(a) {
            for (var b = [], c = a.length - 1; c >= 0; c--) {
                var d = a[c],
                    e = 100 - parseInt(d.position);
                e += "%", d.position = e, b.push(d)
            }
            return b
        },
        onAdjustHueSaturationButtonClick: function(a) {
            Element.visible(this.adjustHueSaturationPanel) || (this.gradientEditor.showHideImportImagePanel(!1), this.gradientEditor.showHideImportCSSPanel(!1), Element.show(this.adjustHueSaturationPanel), this.resetAllAdjustments(!0), Gradient.Utils.sendEvent("adjust", "hue-sat-open"))
        },
        onAdjustHueSaturationPanelOkButtonClick: function(a, b) {
            this.resetAllAdjustments(), Element.hide(this.adjustHueSaturationPanel), b || Gradient.Utils.sendEvent("adjust", "hue-sat-close", "ok")
        },
        onAdjustHueSaturationPanelCancelButtonClick: function(a, b) {
            this.adjustmentsMade && this.revertGradientToPreAdjustmentState(), this.onAdjustHueSaturationPanelOkButtonClick(a, !0), b || Gradient.Utils.sendEvent("adjust", "hue-sat-close", "cancel")
        },
        onReverseGradientButtonClick: function(a) {
            var b = Gradient.Utils.deepClone(this.gradientEditor.getColorStops()),
                c = this.revertStops(b),
                d = Gradient.Utils.deepClone(this.gradientEditor.getOpacityStops()),
                e = this.revertStops(d);
            this.gradientEditor.setAllStops(c, e), this.gradientEditor.invalidateCurrentPreset(), Gradient.Utils.sendEvent("adjust", "reverse")
        },
        onSliderValueChanged: function(a, b) {
            var c = a.xValue,
                d = c - this.adjustmentRanges[b].max,
                e = d > 0 ? "+" + d : d;
            this.adjustmentEditBoxElems[b].value = e, this.setGradientAdjustment(d, b)
        },
        onAdjustValueEntryBoxKeyUp: function(a, b) {
            var c = Event.element(a);
            this.handleAdjustmentEntryBoxKeyEvent(c, b)
        },
        onAdjustValueEntryBoxKeyDown: function(a, b) {
            var c = Event.element(a),
                d = parseInt(c.value);
            if (!isNaN(d)) {
                var e = a.keyCode;
                e == 38 && d++, e == 40 && d--, c.value = d, this.handleAdjustmentEntryBoxKeyEvent(c, b)
            }
        },
        onAdjustValueEntryBoxBlur: function(a, b) {
            var c = Event.element(a),
                d = c.value;
            isNaN(d) && (c.value = 0), this.handleAdjustmentEntryBoxKeyEvent(c, b)
        },
        handleAdjustmentEntryBoxKeyEvent: function(a, b) {
            var c = parseInt(a.value);
            if (!isNaN(c)) {
                var d = this.adjustmentRanges[b].min,
                    e = this.adjustmentRanges[b].max;
                c < d && (c = d), c > e && (c = e), this.setGradientAdjustment(c, b), this.adjustmentSliderElems[b].xValue = c + e, this.adjustmentSliderElems[b].setArrowPositionFromValues(), c > 0 && (c = "+" + c), a.value = c
            }
        }
    }, Gradient.Utils = {
        blankURI: "data:image/gif,GIF89a%01%00%01%00%80%00%00%00%00%00%00%00%00!%F9%04%01%00%00%00%00%2C%00%00%00%00%01%00%01%00%00%02%02D%01%00%3B",
        dataURIEncode: function(a, b) {
            return "data:" + b + ";base64," + Gradient.Utils.btoa(a)
        },
        decimalToHexa: function(a) {
            a *= 1;
            var b = a.toString(16);
            return b.length < 2 && (b = "0" + b), b
        },
        intToPercent: function(a) {
            return Math.floor(100 * a / 255 + .5)
        },
        hexaToRGB: function(a) {
            var b = a.substr(1, 2),
                c = a.substr(3, 2),
                d = a.substr(5, 2);
            return b = parseInt(b, 16), c = parseInt(c, 16), d = parseInt(d, 16), {
                red: b,
                green: c,
                blue: d
            }
        },
        rgbToHexa: function(a, b, c) {
            var d = Gradient.Utils.decimalToHexa(a) + Gradient.Utils.decimalToHexa(b) + Gradient.Utils.decimalToHexa(c);
            return d = "#" + d
        },
        rbgToRGBCSS: function(a) {
            return "rgb(" + a.red + "," + a.green + "," + a.blue + ")"
        },
        rbgAndAlphaToRGBACSS: function(a, b) {
            return "rgba(" + a.red + "," + a.green + "," + a.blue + "," + b + ")"
        },
        rgbToHSLCSS: function(a, b) {
            var c = Gradient.Utils.rgbToHSL(a.red, a.green, a.blue),
                d = c.hue + "," + Gradient.Utils.intToPercent(c.sat) + "%," + Gradient.Utils.intToPercent(c.light) + "%",
                e = void 0 !== b;
            return e && (d += "," + b), "hsl" + (e ? "a" : "") + "(" + d + ")"
        },
        rgbToHSL: function(a, b, c) {
            a /= 255, b /= 255, c /= 255;
            var d, e, f = Math.max(a, b, c),
                g = Math.min(a, b, c),
                h = (f + g) / 2;
            if (f == g) d = e = 0;
            else {
                var i = f - g;
                switch (e = i / (h > .5 ? 2 - f - g : f + g), f) {
                    case a:
                        d = (b - c) / i + (b < c ? 6 : 0);
                        break;
                    case b:
                        d = (c - a) / i + 2;
                        break;
                    case c:
                        d = (a - b) / i + 4
                }
                d /= 6
            }
            return d = Math.round(360 * d), e = Math.round(255 * e), h = Math.round(255 * h), {
                hue: d,
                sat: e,
                light: h
            }
        },
        hslToRGB: function(a, b, c) {
            function d(a, b, c) {
                return c < 0 && c++, c > 1 && c--, 6 * c < 1 ? a + (b - a) * c * 6 : 2 * c < 1 ? b : 3 * c < 2 ? a + (b - a) * (2 / 3 - c) * 6 : a
            }
            a /= 360, b /= 255, c /= 255;
            var e = c <= .5 ? c * (b + 1) : c + b - c * b,
                f = 2 * c - e,
                g = d(f, e, a + 1 / 3),
                h = d(f, e, a),
                i = d(f, e, a - 1 / 3);
            return g = Math.round(255 * g), h = Math.round(255 * h), i = Math.round(255 * i), {
                red: g,
                green: h,
                blue: i
            }
        },
        rgbToHSV: function(a, b, c) {
            var d, e, f, g, h;
            return g = Math.max(a, b, c), h = g - Math.min(a, b, c), e = 0 == g ? 0 : 255 * h / g, 0 == e ? d = 0 : a == g ? d = 60 * (b - c) / h : b == g ? d = 120 + 60 * (c - a) / h : c == g && (d = 240 + 60 * (a - b) / h), d < 0 && (d += 360), d = Math.round(255 * d / 360), e = Math.round(e), f = g, {
                hue: d,
                sat: e,
                val: f
            }
        },
        hsvToRGB: function(a, b, c) {
            var d, e, f, g, h, i, j, k;
            if (0 == b) d = e = f = c;
            else {
                switch (a = 359 * a / 15300, b /= 255, c /= 255, g = Math.floor(a), h = a - g, i = c * (1 - b), j = c * (1 - b * h), k = c * (1 - b * (1 - h)), g) {
                    case 0:
                        d = c, e = k, f = i;
                        break;
                    case 1:
                        d = j, e = c, f = i;
                        break;
                    case 2:
                        d = i, e = c, f = k;
                        break;
                    case 3:
                        d = i, e = j, f = c;
                        break;
                    case 4:
                        d = k, e = i, f = c;
                        break;
                    default:
                        d = c, e = i, f = j
                }
                d = Math.round(255 * d), e = Math.round(255 * e), f = Math.round(255 * f)
            }
            return {
                red: d,
                green: e,
                blue: f
            }
        },
        deepClone: function(a) {
            return Object.toJSON(a).evalJSON(!0)
        },
        selectTextInNode: function(a) {
            if ("getSelection" in window && "createRange" in document) {
                var b = window.getSelection(),
                    c = document.createRange();
                c.selectNodeContents(a), b.removeAllRanges(), b.addRange(c)
            } else if ("selection" in document && "createTextRange" in document.body) {
                document.selection.empty();
                var c = document.body.createTextRange();
                c.moveToElementText(el), c.select()
            }
        },
        sendEvent: function(a, b, c, d) {
            setTimeout(function() {
                try {
                    ga("send", "event", "ugg-" + a, b, c, d)
                } catch (a) {}
            }, 10)
        }
    }, Gradient.UIUtils = {
        showHideLinkTrigger: function(a, b) {
            var c = Event.element(a),
                d = $$(b);
            return 0 != d.length && (d[0].toggle(), c.parentNode.toggleClassName("showing"), !1)
        },
        makeResizable: function(a, b, c) {
            function d(b) {
                Event.stop(b);
                var d = [Event.pointerX(b), Event.pointerY(b)],
                    e = [d[0] - g[0], d[1] - g[1]],
                    f = [h[0] + e[0], h[1] + e[1]];
                a.style.width = f[0] + "px", a.style.height = f[1] + "px", c && c(a.getWidth(), a.getHeight())
            }

            function e(b) {
                Event.stop(b), g = [Event.pointerX(b), Event.pointerY(b)], h = [a.getWidth(), a.getHeight()], Event.observe($$("body")[0], "mousemove", d), Event.observe($$("body")[0], "mouseup", f)
            }

            function f(a) {
                Event.stop(a), Event.stopObserving($$("body")[0], "mousemove", d), Event.stopObserving($$("body")[0], "mouseup", f)
            }
            var g, h;
            Event.observe(b, "mousedown", e)
        }
    }, Gradient.Importer = function() {
        this.testElem = document.createElement("div"), this.testElem.style.display = "none", document.documentElement.appendChild(this.testElem), this.roundAlpha = !0
    }, Gradient.Importer.prototype = {
        setRoundAlpha: function(a) {
            this.roundAlpha = a
        },
        trim: function(a) {
            return a.replace(/^\s+/, "").replace(/\s+$/, "")
        },
        cssSplit: function(a, b) {
            for (var c = [], d = "", e = 0, f = 0; f < a.length; f++) {
                var g = a.charAt(f);
                "(" == g && e++, ")" == g && e--, g == b && 0 == e ? (c.push(d), d = "") : d += g
            }
            return d && c.push(d), c
        },
        isColor: function(a) {
            if (!a) return !1;
            var b = this.testElem;
            return b.style.color = "inherit", b.style.color = a, "inherit" != b.style.color
        },
        addPositionsToStopsIfNeeded: function(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                if (null === c.position)
                    if (0 == b) c.position = "0%";
                    else if (b == a.length - 1) c.position = "100%";
                else {
                    var d, e = a[b - 1].position,
                        f = a[b + 1].position;
                    if (e && f) d = Math.round((parseInt(e) + parseInt(f)) / 2);
                    else {
                        var g = a.length - 1,
                            h = 100 / g;
                        d = Math.round(b * h)
                    }
                    c.position = d + "%"
                }
            }
            return a
        },
        parseRGBCSSColor: function(a) {
            if (!a) return null;
            var b = a.replace(/rgba?/, "");
            b = b.replace(/[() ]/g, "");
            var c = b.split(",");
            if (c.length < 3) return null;
            var d = 4 == c.length ? c[3] : 1;
            this.roundAlpha && (d *= 100, d = Math.round(d), d /= 100), d *= 1;
            var e = c[0],
                f = c[1],
                g = c[2],
                h = Gradient.Utils.decimalToHexa(e) + Gradient.Utils.decimalToHexa(f) + Gradient.Utils.decimalToHexa(g);
            return h = "#" + h, {
                value: h,
                opacity: d
            }
        },
        parseHSLCSSColor: function(a) {
            if (!a) return null;
            var b = a.replace(/hsla?/, "");
            b = b.replace(/[() ]/g, "");
            var c = b.split(",");
            if (c.length < 3) return null;
            var d = 4 == c.length ? c[3] : 1;
            this.roundAlpha && (d *= 100, d = Math.round(d), d /= 100), d *= 1;
            var e = c[0],
                f = 255 * parseInt(c[1]) / 100,
                g = 255 * parseInt(c[2]) / 100,
                h = Gradient.Utils.hslToRGB(e, f, g),
                i = Gradient.Utils.decimalToHexa(h.red) + Gradient.Utils.decimalToHexa(h.green) + Gradient.Utils.decimalToHexa(h.blue);
            return i = "#" + i, {
                value: i,
                opacity: d
            }
        },
        resolveColor: function(a) {
            if (!this.isColor(a)) return null;
            var b = this.testElem;
            b.style.color = "inherit", b.style.color = a;
            var c = document.defaultView.getComputedStyle(b, null),
                d = c.color,
                e = null;
            return "transparent" == d ? a.match(/rgba/) ? e = this.parseRGBCSSColor(a) : a.match(/hsla/) && (e = this.parseHSLCSSColor(a)) : e = this.parseRGBCSSColor(d), e
        },
        parseStopCSSMozilla: function(a) {
            a = this.trim(a);
            var b = null,
                c = a,
                d = a.split(" ");
            if (d.length > 1) {
                var e = d[d.length - 1];
                e.match(/^ *[0-9]+% *$|/) && (b = this.trim(e), c = this.trim(d.slice(0, -1).join(" ")))
            }
            return c = this.resolveColor(c), c || (c = {
                color: null,
                opacity: null
            }), {
                color: c.value,
                opacity: c.opacity,
                position: b
            }
        },
        parseCSSMozilla: function(a, b) {
            var c = this.cssSplit(a, ",");
            if (c.length < 2) return null;
            for (var d = 0; d < b; d++) {
                var e = this.trim(c[0]),
                    f = this.parseStopCSSMozilla(e);
                if (this.isColor(f.color)) break;
                c = c.slice(1)
            }
            for (var g = [], d = 0; d < c.length; d++) {
                var f = this.parseStopCSSMozilla(c[d]);
                if (!f) return null;
                g.push(f)
            }
            return this.addPositionsToStopsIfNeeded(g), {
                stops: g
            }
        },
        parseStopCSSWebkit: function(a) {
            a = a.replace(/ /g, ""), a = a.replace(/from\(/, "color-stop(0.0,"), a = a.replace(/to\(/, "color-stop(1.0,");
            var b = a.match(/color-stop\((.+)\)/);
            if (!b) return null;
            var c = b[1],
                d = this.cssSplit(c, ",");
            if (d.length < 2) return null;
            var e = d[0]; - 1 == e.indexOf("%") && (e = Math.round(100 * e), e += "%");
            var f = d[1];
            return f = this.resolveColor(f), f || (f = {
                color: null,
                opacity: null
            }), {
                color: f.value,
                opacity: f.opacity,
                position: e
            }
        },
        parseCSSWebkit: function(a, b) {
            var c = this.cssSplit(a, ",");
            if (c.length < 4) return null;
            var d = this.trim(c[0]),
                e = this.trim(c[1]);
            c = c.slice(b);
            for (var f = [], g = 0; g < c.length; g++) {
                var h = this.parseStopCSSWebkit(c[g]);
                if (!h) return null;
                f.push(h)
            }
            return {
                stops: f,
                startPoint: d,
                endPoint: e
            }
        },
        parseCSSIE: function(a) {
            for (var b = null, c = null, d = a.split(","), e = 0; e < d.length; e++) {
                var f = d[e];
                (result = f.match(/startColorstr *= *'?([^']*)'?/i)) ? b = result[1].toLowerCase(): (result = f.match(/endColorstr *= *'?([^']*)'?/i)) && (c = result[1].toLowerCase())
            }
            if (!b || !c) return null;
            var g = 1,
                h = 1;
            return 9 == b.length && (g = b.substr(1, 2), g = Math.round(parseInt(g, 16) / 255 * 100) / 100, b = "#" + b.substr(3)), 9 == c.length && (h = c.substr(1, 2), h = Math.round(parseInt(h, 16) / 255 * 100) / 100, c = "#" + c.substr(3)), {
                stops: [{
                    color: b,
                    opacity: g,
                    position: "0%"
                }, {
                    color: c,
                    opacity: h,
                    position: "100%"
                }]
            }
        },
        parseCSS: function(a) {
            var b = null;
            return a = a.replace(/[\n\r]/g, ""), a = a.replace(/[;]/g, "\n"), (result = a.match(/linear-gradient *\((.+)\)/)) ? b = this.parseCSSMozilla(result[1], 1) : (result = a.match(/-webkit-gradient *\( *linear *, *(.+)\)/)) ? b = this.parseCSSWebkit(result[1], 2) : (result = a.match(/progid:DXImageTransform.Microsoft.gradient *\((.+)\)/)) ? b = this.parseCSSIE(result[1]) : (result = a.match(/radial-gradient *\((.+)\)/)) ? b = this.parseCSSMozilla(result[1], 2) : (result = a.match(/-webkit-gradient *\( *radial *, *(.+)\)/)) && (b = this.parseCSSWebkit(result[1], 4)), b ? (b && Gradient.StopUtils.gradientHasOpacity(b) ? b = Gradient.StopUtils.splitStopsIntoColorAndOpacity(b) : (b = Gradient.StopUtils.extractColorOnlyStops(b), b.opacityStops = null), b) : null
        }
    }, Gradient.UserPresets = {
        get: function() {
            var a = ColorZilla.LocalStorage.get("user-gradient-presets", null);
            if (!a) return [];
            a = a.evalJSON(!0);
            for (var b = 0; b < a.length; b++) a[b].uniqueID = b;
            return a
        },
        persist: function(a) {
            var b = Object.toJSON(a);
            return ColorZilla.LocalStorage.set("user-gradient-presets", b)
        }
    },
    /*! base-64 URL encoder/decoder from webtoolkit
             http://www.webtoolkit.info/javascript-base64.html
             http://creativecommons.org/licenses/by/2.0/uk/
         */
    Gradient.Utils.btoa = function(a) {
        for (var b, c, d, e, f, g, h, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", j = "", k = 0; k < a.length;) b = a.charCodeAt(k++), c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = b >> 2, f = (3 & b) << 4 | c >> 4, g = (15 & c) << 2 | d >> 6, h = 63 & d, isNaN(c) ? g = h = 64 : isNaN(d) && (h = 64), j = j + i.charAt(e) + i.charAt(f) + i.charAt(g) + i.charAt(h);
        return j
    }, Gradient.StopsHandler = function(a, b) {
        if (this.gradientEditor = b.gradientEditor, this.gradientControl = b.gradientControl, this.gradientPanelElem = b.gradientPanelElem, this.gradientMarkersContainerElem = b.gradientMarkersContainerElem, this.gradientMarkerDeleterElem = b.gradientMarkerDeleterElem, this.stopDetailsPanel = b.stopDetailsPanel, this.onStopActivatedCallback = b.onStopActivatedCallback, this.type = a, this.stopDetailsColorPanel = null, this.opacityValueElem = null, "color" == this.type ? (this.stopDetailsColorPanel = this.gradientControl.select(".stop-details .color")[0], this.stopDetailsColorPanel.observe("click", this.onStopDetailsColorPanelClick.bind(this))) : (this.opacityValueElem = this.gradientControl.select(".stop-details .opacity-value")[0], this.opacityValueElem.observe("keyup", this.onOpacityDetailsEntryBoxKeyUp.bind(this)), this.opacityValueElem.observe("keydown", this.onOpacityDetailsEntryBoxKeyDown.bind(this)), this.opacityValueElem.observe("blur", this.onOpacityDetailsEntryBoxBlur.bind(this)), this.opacityAdjustOpenButtonElem = this.gradientControl.select(".stop-details .opacity-adjust-open-button")[0], this.opacityAdjustOpenButtonElem.observe("click", this.onOpacityAdjustOpenButtonClick.bind(this))), this.stopDetailsPositionEntryBox = this.stopDetailsPanel.select(".position")[0], this.stopDetailsDeleteButton = this.stopDetailsPanel.select(".delete-button button")[0], this.setDisableStopDetailsPanel(!0), this.onGradientControlMouseUpHandler = this.onGradientControlMouseUp.bind(this), this.onGradientControlMouseMoveHandler = this.onGradientControlMouseMove.bind(this), this.onStopMarkerDeleterMouseOverHandler = this.onStopMarkerDeleterMouseOver.bind(this), this.stopDetailsDeleteButton.observe("click", this.onStopDetailsDeleteButtonClick.bind(this)), this.stopDetailsPositionEntryBox.observe("keyup", this.onStopDetailsPositionEntryBoxKeyUp.bind(this)), this.stopDetailsPositionEntryBox.observe("keydown", this.onStopDetailsPositionEntryBoxKeyDown.bind(this)), this.stopDetailsPositionEntryBox.observe("blur", this.onStopDetailsPositionEntryBoxBlur.bind(this)), this.gradientMarkersContainerElem.observe("click", this.onGradientMarkersContainerClick.bind(this)), this.activeStopMarkerElem = null, this.draggingStopMarkerElem = null, this.opacityStopAdjustContainerElem = null, "opacity" == this.type) {
            this.defaultStops = [{
                opacity: 1,
                position: "0%"
            }, {
                opacity: 1,
                position: "100%"
            }], this.stops = Gradient.Utils.deepClone(this.defaultStops);
            var c = Gradient.Utils.blankURI;
            this.opacityStopAdjustContainerElem = $$(".opacity-stop-adjust-container")[0], this.transparentScreen = $("transparent-screen");
            var d = this.opacityStopAdjustContainerElem.select(".opacity-slider-container")[0],
                e = this.opacityStopAdjustContainerElem.select(".opacity-slider-bar")[0];
            this.opacityAdjustSlider = new Refresh.Web.Slider(e, {
                xMinValue: 1,
                xMaxValue: 100,
                yMinValue: 1,
                yMaxValue: 1,
                arrowImage: c
            }, d), this.onDocumentClickToHideOpacityPanelHandler = this.onDocumentClickToHideOpacityPanel.bind(this), this.opacityAdjustSlider.onValuesChanged = this.onOpacityAdjustSliderValueChanged.bind(this)
        }
        this.lastUsedOpacity = 1
    }, Gradient.StopsHandler.prototype = {
        setStops: function(a, b) {
            this.stops = a, this.setActiveStopMakerElemAndUpdateDetailsPanel(null), void 0 !== b && b && this.gradientEditor.updateAllUI()
        },
        getStops: function() {
            return this.stops
        },
        getStopPositionFromMouseEvent: function(a) {
            var b = Element.cumulativeOffset(this.gradientMarkersContainerElem)[0],
                c = a - b,
                d = Math.round(100 * c / this.gradientEditor.gradientPanelElemWidth);
            return d += "%"
        },
        updateStopMarkers: function() {
            for (var a = this.stops, b = 0; b < a.length; b++) {
                0 == this.gradientMarkersContainerElem.select(".stop-marker-" + b).length && this.createStopMarker(b), this.updateStopMarker(b, this.getStopValue(a[b]), a[b].position)
            }
            this.removeUnusedMarkers()
        },
        updateStopMarker: function(a, b, c) {
            c = parseInt(c);
            var d = this.findStopMarkerElemByIndex(a),
                e = Math.round(this.gradientEditor.gradientPanelElemWidth * c / 100 - 5.5);
            d.style.left = e + "px", "color" == this.type ? (d.select(".color")[0].style.background = b, d.setAttribute("color", b)) : (d.select(".color")[0].style.background = this.opacityToStopColor(b), d.setAttribute("stop-opacity", b)), d.setAttribute("position", c), d.setAttribute("imarker", a)
        },
        removeUnusedMarkers: function() {
            for (var a = this.gradientMarkersContainerElem.select(".stop-marker"), b = 0; b < a.length; b++) {
                var c = a[b];
                c.getAttribute("imarker") >= this.stops.length && c.parentNode.removeChild(c)
            }
        },
        opacityToStopColor: function(a) {
            var b = 255 - Math.round(255 * a);
            return Gradient.Utils.rgbToHexa(b, b, b)
        },
        createStopMarker: function(a) {
            var b = document.createElement("div");
            b.className = "stop-marker stop-marker-" + a;
            var c = document.createElement("div");
            c.className = "color", b.appendChild(c), this.gradientMarkersContainerElem.appendChild(b), Element.extend(b), b.observe("mousedown", this.onStopMarkerMouseDown.bind(this)), b.observe("dblclick", this.onStopMarkerDoubleClick.bind(this)), b.setAttribute("title", "color" == this.type ? "Color stop" : "Opacity stop")
        },
        setActiveStopMakerElem: function(a) {
            this.activeStopMarkerElem && this.activeStopMarkerElem.removeClassName("active"), this.activeStopMarkerElem = a, this.activeStopMarkerElem && (this.activeStopMarkerElem.addClassName("active"), "color" == this.type ? this.gradientEditor.lastUsedColor = this.activeStopMarkerElem.getAttribute("color") : this.lastUsedOpacity = this.activeStopMarkerElem.getAttribute("stop-opacity"))
        },
        setActiveStopMakerElemAndUpdateDetailsPanel: function(a) {
            if (a && this.onStopActivatedCallback && this.onStopActivatedCallback(this.type), this.setActiveStopMakerElem(a), a) {
                if (this.setDisableStopDetailsPanel(!1), this.stopDetailsColorPanel) this.stopDetailsColorPanel.style.background = a.getAttribute("color"), this.stopDetailsPositionEntryBox.focus();
                else if (this.opacityValueElem) {
                    var b = a.getAttribute("stop-opacity");
                    this.opacityValueElem.value = Math.round(100 * b), this.opacityValueElem.select(), this.opacityValueElem.focus()
                }
                this.stopDetailsPositionEntryBox.value = a.getAttribute("position"), "color" == this.type && this.stopDetailsPositionEntryBox.select()
            } else this.setDisableStopDetailsPanel(!0)
        },
        getActiveStopMarkerElemIndex: function() {
            return this.activeStopMarkerElem ? this.activeStopMarkerElem.getAttribute("imarker") : null
        },
        getDraggingStopMarkerElemIndex: function() {
            return this.draggingStopMarkerElem ? this.draggingStopMarkerElem.getAttribute("imarker") : null
        },
        deleteStop: function(a) {
            this.gradientEditor.invalidateCurrentPreset();
            var b = this.findStopMarkerElemByIndex(a);
            b.parentNode.removeChild(b);
            for (var c = [], d = 0; d < this.stops.length; d++) d != a && c.push(this.stops[d]);
            this.setStops(c, !0), this.setActiveStopMakerElemAndUpdateDetailsPanel(null)
        },
        sortStopsByPosition: function() {
            function a(a, b) {
                return parseInt(a.position) - parseInt(b.position)
            }
            this.stops.sort(a)
        },
        getStopValue: function(a) {
            return "color" == this.type ? a.color : a.opacity
        },
        findStopIndexByPositionAndValue: function(a, b) {
            a = parseInt(a);
            for (var c = 0; c < this.stops.length; c++) {
                var d = this.getStopValue(this.stops[c]);
                if (parseInt(this.stops[c].position) == a && d == b) return c
            }
            return null
        },
        findStopMarkerElemByIndex: function(a) {
            return this.gradientMarkersContainerElem.select(".stop-marker-" + a)[0]
        },
        changeActiveStopValue: function(a) {
            var b = this.getActiveStopMarkerElemIndex();
            null !== b && (this.stopDetailsColorPanel ? this.stopDetailsColorPanel.style.background = a : this.opacityValueElem, "color" == this.type ? this.stops[b].color = a : this.stops[b].opacity = a, this.gradientEditor.updateAllUI())
        },
        updateStopPosition: function(a, b) {
            this.stops[a].position = b;
            var c = this.getStopValue(this.stops[a]);
            this.sortStopsByPosition(), this.gradientEditor.invalidateCurrentPreset(), this.gradientEditor.updateAllUI();
            var d = this.findStopIndexByPositionAndValue(b, c),
                e = this.findStopMarkerElemByIndex(d);
            this.setActiveStopMakerElem(e), this.draggingStopMarkerElem && (this.draggingStopMarkerElem = e)
        },
        setDisableStopDetailsPanel: function(a) {
            a ? (this.stopDetailsPanel.addClassName("disabled"), this.stopDetailsPositionEntryBox.value = "", this.stopDetailsPositionEntryBox.setAttribute("disabled", "true"), this.stopDetailsDeleteButton.setAttribute("disabled", "true"), this.stopDetailsColorPanel ? this.stopDetailsColorPanel.style.background = "#efefef" : this.opacityValueElem && (this.opacityValueElem.value = "", this.opacityValueElem.setAttribute("disabled", "true"), this.opacityAdjustOpenButtonElem.addClassName("disabled"))) : (this.stopDetailsPanel.removeClassName("disabled"), this.stopDetailsPositionEntryBox.removeAttribute("disabled"), this.stops.length > 2 ? this.stopDetailsDeleteButton.removeAttribute("disabled") : this.stopDetailsDeleteButton.setAttribute("disabled", "true"), this.opacityValueElem && (this.opacityValueElem.removeAttribute("disabled"), this.opacityAdjustOpenButtonElem.removeClassName("disabled")))
        },
        showOpacityStopAdjustPanel: function(a, b, c) {
            this.transparentScreen.show();
            var d = $$("body")[0].getHeight();
            this.transparentScreen.style.height = d + "px", this.opacityStopAdjustContainerElem.show(), this.opacityStopAdjustContainerElem.style.left = a + "px", this.opacityStopAdjustContainerElem.style.top = b + "px", this.opacityAdjustSlider.xValue = Math.round(100 * c), this.opacityAdjustSlider.setArrowPositionFromValues(), document.observe("mousedown", this.onDocumentClickToHideOpacityPanelHandler)
        },
        hideOpacityStopAdjustPanel: function() {
            this.transparentScreen.hide(), this.opacityStopAdjustContainerElem.hide(), document.stopObserving("mousedown", this.onDocumentClickToHideOpacityPanelHandler)
        },
        opacityStopAdjustPanelIsVisible: function() {
            return this.opacityStopAdjustContainerElem && this.opacityStopAdjustContainerElem.visible()
        },
        registerDraggingEvents: function() {
            this.gradientControl.observe("mouseup", this.onGradientControlMouseUpHandler), this.gradientControl.observe("mousemove", this.onGradientControlMouseMoveHandler), this.gradientMarkerDeleterElem.observe("mouseover", this.onStopMarkerDeleterMouseOverHandler), this.gradientPanelElem.observe("mouseover", this.onStopMarkerDeleterMouseOverHandler)
        },
        unregisterDraggingEvents: function() {
            this.gradientControl.stopObserving("mouseup", this.onGradientControlMouseUpHandler), this.gradientControl.stopObserving("mousemove", this.onGradientControlMouseMoveHandler), this.gradientMarkerDeleterElem.stopObserving("mouseover", this.onStopMarkerDeleterMouseOverHandler), this.gradientPanelElem.stopObserving("mouseover", this.onStopMarkerDeleterMouseOverHandler)
        },
        onStopMarkerMouseDown: function(a) {
            Event.stop(a);
            var b = Event.element(a);
            b.hasClassName("stop-marker") || (b = b.up(".stop-marker")), this.setActiveStopMakerElemAndUpdateDetailsPanel(b), this.draggingStopMarkerElem = b, this.registerDraggingEvents()
        },
        onGradientControlMouseUp: function(a) {
            this.draggingStopMarkerElem = null, this.unregisterDraggingEvents(), "color" == this.type && this.stopDetailsPositionEntryBox.select()
        },
        onGradientControlMouseMove: function(a) {
            if (this.draggingStopMarkerElem) {
                Event.stop(a);
                var b = Event.pointerX(a),
                    c = this.getStopPositionFromMouseEvent(b),
                    d = parseInt(c);
                if (!(d < 0 || d > 100)) {
                    var e = this.getDraggingStopMarkerElemIndex();
                    this.updateStopPosition(e, c), this.stopDetailsPositionEntryBox.value = parseInt(c)
                }
            }
        },
        onStopMarkerDeleterMouseOver: function(a) {
            Event.element(a);
            if (this.draggingStopMarkerElem) {
                if (this.stops.length > 2) {
                    var b = this.getDraggingStopMarkerElemIndex();
                    this.deleteStop(b)
                }
                this.draggingStopMarkerElem = null, this.unregisterDraggingEvents()
            }
        },
        onStopDetailsDeleteButtonClick: function(a) {
            if (this.activeStopMarkerElem) {
                if (this.stops.length > 2) {
                    var b = this.getActiveStopMarkerElemIndex();
                    this.deleteStop(b)
                }
                this.setActiveStopMakerElemAndUpdateDetailsPanel(null)
            }
        },
        handleStopDetailsPositionEntryBoxKeyEvent: function(a) {
            var b = parseInt(a.value);
            if (!isNaN(b) && (b < 0 && (b = 0), b > 100 && (b = 100), a.value = b, this.activeStopMarkerElem)) {
                var c = this.getActiveStopMarkerElemIndex(),
                    d = b;
                this.updateStopPosition(c, d + "%")
            }
        },
        onStopDetailsPositionEntryBoxKeyUp: function(a) {
            var b = Event.element(a);
            this.handleStopDetailsPositionEntryBoxKeyEvent(b)
        },
        onStopDetailsPositionEntryBoxKeyDown: function(a) {
            var b = Event.element(a),
                c = parseInt(b.value);
            if (!isNaN(c)) {
                var d = a.keyCode;
                d == 38 && c++, d == 40 && c--, b.value = c, this.handleStopDetailsPositionEntryBoxKeyEvent(b)
            }
        },
        onStopDetailsPositionEntryBoxBlur: function(a) {
            var b = Event.element(a),
                c = parseInt(b.value);
            if (isNaN(c) && this.activeStopMarkerElem) {
                var d = this.getActiveStopMarkerElemIndex(),
                    e = this.stops[d].position;
                b.value = parseInt(e)
            }
        },
        handleOpacityDetailsEntryBoxKeyEvent: function(a) {
            var b = parseInt(a.value);
            if (!isNaN(b) && (b < 0 && (b = 0), b > 100 && (b = 100), a.value = b, this.activeStopMarkerElem)) {
                var c = b / 100;
                this.changeActiveStopValue(c), this.lastUsedOpacity = c
            }
        },
        onOpacityDetailsEntryBoxKeyUp: function(a) {
            var b = Event.element(a);
            this.handleOpacityDetailsEntryBoxKeyEvent(b)
        },
        onOpacityDetailsEntryBoxKeyDown: function(a) {
            var b = Event.element(a),
                b = Event.element(a),
                c = parseInt(b.value);
            if (!isNaN(c)) {
                var d = a.keyCode;
                d == 38 && c++, d == 40 && c--, b.value = c, this.handleOpacityDetailsEntryBoxKeyEvent(b)
            }
        },
        onOpacityDetailsEntryBoxBlur: function(a) {
            var b = Event.element(a),
                c = parseInt(b.value);
            if (isNaN(c) && this.activeStopMarkerElem) {
                var d = this.getActiveStopMarkerElemIndex(),
                    e = this.stops[d].opacity;
                b.value = Math.round(100 * e)
            }
        },
        onStopDetailsColorPanelClick: function(a) {
            if (this.activeStopMarkerElem) {
                var b = (Event.element(a), Event.pointerX(a)),
                    c = Event.pointerY(a);
                this.gradientEditor.openColorPicker(b, c)
            }
        },
        onStopMarkerDoubleClick: function(a) {
            var b = Event.element(a);
            if ("color" == this.type) this.gradientEditor.openColorPicker();
            else {
                var c = b.cumulativeOffset();
                this.showOpacityStopAdjustPanel(c[0] + 6, c[1] - 35, this.lastUsedOpacity)
            }
        },
        onOpacityAdjustOpenButtonClick: function(a) {
            if (this.activeStopMarkerElem) {
                var b = Event.element(a),
                    c = b.cumulativeOffset();
                this.showOpacityStopAdjustPanel(c[0] + 10, c[1] - 10, this.lastUsedOpacity)
            }
        },
        onDocumentClickToHideOpacityPanel: function(a) {
            if (this.opacityStopAdjustPanelIsVisible()) {
                Event.stop(a);
                var b = Event.element(a);
                b.hasClassName("opacity-stop-adjust-container") || b.up(".opacity-stop-adjust-container") || this.hideOpacityStopAdjustPanel()
            }
        },
        onOpacityAdjustSliderValueChanged: function() {
            var a = this.opacityAdjustSlider.xValue,
                b = a / 100;
            this.activeStopMarkerElem && (this.changeActiveStopValue(b), this.lastUsedOpacity = b, this.opacityValueElem.value = a)
        },
        onGradientMarkersContainerClick: function(a) {
            if (Event.element(a) == this.gradientMarkersContainerElem) {
                var b, c, d = Event.pointerX(a),
                    e = this.getStopPositionFromMouseEvent(d);
                "color" == this.type ? (b = this.gradientEditor.lastUsedColor, c = {
                    color: b,
                    position: e
                }) : (b = this.lastUsedOpacity, c = {
                    opacity: b,
                    position: e
                }), this.stops.push(c), this.sortStopsByPosition(), this.gradientEditor.updateAllUI();
                var f = this.findStopIndexByPositionAndValue(e, b),
                    g = this.findStopMarkerElemByIndex(f);
                this.setActiveStopMakerElemAndUpdateDetailsPanel(g)
            }
        }
    }, Gradient.StopUtils = {
        interpolateStopsProperty: function(a, b, c, d) {
            var e = parseInt(a.position),
                f = parseInt(b.position),
                g = c,
                h = f - e,
                i = g - e,
                j = i / h,
                k = 1 - j;
            if ("color" == d) {
                var l = Gradient.Utils.hexaToRGB(a.color),
                    m = Gradient.Utils.hexaToRGB(b.color);
                return {
                    red: Math.round(l.red * k + m.red * j),
                    green: Math.round(l.green * k + m.green * j),
                    blue: Math.round(l.blue * k + m.blue * j)
                }
            }
            var n = a.opacity,
                o = b.opacity;
            return Math.round(100 * (n * k + o * j)) / 100
        },
        interpolateStopsColor: function(a, b, c, d) {
            var e = Gradient.StopUtils.interpolateStopsProperty(a, b, c, "color");
            return void 0 === d || "hex" == d ? Gradient.Utils.rgbToHexa(e.red, e.green, e.blue) : e
        },
        interpolateStopsOpacity: function(a, b, c) {
            return Gradient.StopUtils.interpolateStopsProperty(a, b, c, "opacity")
        },
        getColorForOpacityOnlyStop: function(a, b, c, d) {
            for (var e = a, f = null, g = e + 1; g < b.length; g++)
                if ("color" in c[b[g]]) {
                    f = c[b[g]];
                    break
                }
            for (var h = null, g = e - 1; g >= 0; g--)
                if ("color" in c[b[g]]) {
                    h = c[b[g]];
                    break
                }
            h || (h = f), f || (f = h);
            var i = h.color;
            return h != f && (i = Gradient.StopUtils.interpolateStopsColor(h, f, parseInt(b[a]), d)), i
        },
        getOpacityForColorOnlyStop: function(a, b, c) {
            for (var d = a, e = null, f = d + 1; f < b.length; f++)
                if ("opacity" in c[b[f]]) {
                    e = c[b[f]];
                    break
                }
            for (var g = null, f = d - 1; f >= 0; f--)
                if ("opacity" in c[b[f]]) {
                    g = c[b[f]];
                    break
                }
            g || (g = e), e || (e = g);
            var h = g.opacity;
            if (g != e) var h = Gradient.StopUtils.interpolateStopsOpacity(g, e, parseInt(b[a]));
            return h
        },
        mergeStops: function(a, b) {
            function c(a, b) {
                return parseInt(a.position) - parseInt(b.position)
            }
            var d = Gradient.Utils.deepClone(a),
                e = Gradient.Utils.deepClone(b);
            d = d.concat(e), d.sort(c);
            for (var f = [], g = {}, h = 0; h < d.length; h++) {
                var i = d[h],
                    j = i.position;
                j in g || (f.push(j), g[j] = {
                    position: j
                }), "color" in i && (g[j].color = i.color), "opacity" in i && (g[j].opacity = i.opacity)
            }
            for (var k = [], h = 0; h < f.length; h++) {
                var i = g[f[h]];
                "color" in i || (i.color = Gradient.StopUtils.getColorForOpacityOnlyStop(h, f, g, "hex")), "opacity" in i || (i.opacity = Gradient.StopUtils.getOpacityForColorOnlyStop(h, f, g)), k.push(i)
            }
            return k
        },
        extractStopByType: function(a, b) {
            return "color" == b ? {
                position: a.position,
                color: a.color
            } : "opacity" == b ? {
                position: a.position,
                opacity: a.opacity
            } : null
        },
        splitStopsIntoColorAndOpacity: function(a) {
            var b = a.stops;
            if (b.length < 2) return null;
            for (var c = [], d = [], e = 1; e < b.length - 1; e++) {
                var f = b[e],
                    g = b[e - 1],
                    h = b[e + 1],
                    i = Gradient.Utils.hexaToRGB(f.color),
                    j = Gradient.StopUtils.interpolateStopsColor(g, h, parseInt(f.position), "rgb"),
                    k = j.red,
                    l = j.green,
                    m = j.blue,
                    n = Gradient.StopUtils.interpolateStopsOpacity(g, h, parseInt(f.position));
                (Math.abs(k - i.red) > 1 || Math.abs(l - i.green) > 1 || Math.abs(m - i.blue) > 1) && c.push(Gradient.StopUtils.extractStopByType(f, "color")), Math.abs(n - Math.round(100 * f.opacity) / 100) > .05 && d.push(Gradient.StopUtils.extractStopByType(f, "opacity"))
            }
            return 0 == c.length ? c = [Gradient.StopUtils.extractStopByType(b[0], "color"), Gradient.StopUtils.extractStopByType(b[b.length - 1], "color")] : (b[0].color != c[0].color && c.unshift(Gradient.StopUtils.extractStopByType(b[0], "color")), b[b.length - 1].color != c[c.length - 1].color && c.push(Gradient.StopUtils.extractStopByType(b[b.length - 1], "color"))), 0 == d.length ? d = [Gradient.StopUtils.extractStopByType(b[0], "opacity"), Gradient.StopUtils.extractStopByType(b[b.length - 1], "opacity")] : (b[0].opacity != d[0].opacity && d.unshift(Gradient.StopUtils.extractStopByType(b[0], "opacity")), b[b.length - 1].opacity != d[d.length - 1].opacity && d.push(Gradient.StopUtils.extractStopByType(b[b.length - 1], "opacity"))), a.stops = Gradient.Utils.deepClone(c), a.opacityStops = Gradient.Utils.deepClone(d), a
        },
        gradientHasOpacity: function(a) {
            if (!a) return !1;
            if (!a.stops) return !1;
            for (var b = 0; b < a.stops.length; b++) {
                var c = a.stops[b];
                if ("opacity" in c && 1 != c.opacity) return !0
            }
            return !1
        },
        extractColorOnlyStops: function(a) {
            if (a && a.stops) {
                for (var b = 0; b < a.stops.length; b++) a.stops[b] = Gradient.StopUtils.extractStopByType(a.stops[b], "color");
                return a
            }
        }
    },
    /*!
    ColorPicker
    Copyright (c) 2007 John Dyer (http://johndyer.name)
    MIT style license
    */
    window.Refresh || (Refresh = {}), Refresh.Web || (Refresh.Web = {}), Refresh.Web.Color = function(a) {
        var b = {
            r: 0,
            g: 0,
            b: 0,
            h: 0,
            s: 0,
            v: 0,
            hex: "",
            setRgb: function(a, b, c) {
                this.r = a, this.g = b, this.b = c;
                var d = Refresh.Web.ColorMethods.rgbToHsv(this);
                this.h = d.h, this.s = d.s, this.v = d.v, this.hex = Refresh.Web.ColorMethods.rgbToHex(this)
            },
            setHsv: function(a, b, c) {
                this.h = a, this.s = b, this.v = c;
                var d = Refresh.Web.ColorMethods.hsvToRgb(this);
                this.r = d.r, this.g = d.g, this.b = d.b, this.hex = Refresh.Web.ColorMethods.rgbToHex(d)
            },
            setHex: function(a) {
                this.hex = a;
                var b = Refresh.Web.ColorMethods.hexToRgb(this.hex);
                this.r = b.r, this.g = b.g, this.b = b.b;
                var c = Refresh.Web.ColorMethods.rgbToHsv(b);
                this.h = c.h, this.s = c.s, this.v = c.v
            }
        };
        return a && ("hex" in a ? b.setHex(a.hex) : "r" in a ? b.setRgb(a.r, a.g, a.b) : "h" in a && b.setHsv(a.h, a.s, a.v)), b
    }, Refresh.Web.ColorMethods = {
        hexToRgb: function(a) {
            a = this.validateHex(a);
            var b = "00",
                c = "00",
                d = "00";
            return 6 == a.length ? (b = a.substring(0, 2), c = a.substring(2, 4), d = a.substring(4, 6)) : (a.length > 4 && (b = a.substring(4, a.length), a = a.substring(0, 4)), a.length > 2 && (c = a.substring(2, a.length), a = a.substring(0, 2)), a.length > 0 && (d = a.substring(0, a.length))), {
                r: this.hexToInt(b),
                g: this.hexToInt(c),
                b: this.hexToInt(d)
            }
        },
        validateHex: function(a) {
            return a = new String(a).toUpperCase(), a = a.replace(/[^A-F0-9]/g, "0"), a.length > 6 && (a = a.substring(0, 6)), a
        },
        webSafeDec: function(a) {
            return a = Math.round(a / 51), a *= 51
        },
        hexToWebSafe: function(a) {
            var b, c, d;
            return 3 == a.length ? (b = a.substring(0, 1), c = a.substring(1, 1), d = a.substring(2, 1)) : (b = a.substring(0, 2), c = a.substring(2, 4), d = a.substring(4, 6)), intToHex(this.webSafeDec(this.hexToInt(b))) + this.intToHex(this.webSafeDec(this.hexToInt(c))) + this.intToHex(this.webSafeDec(this.hexToInt(d)))
        },
        rgbToWebSafe: function(a) {
            return {
                r: this.webSafeDec(a.r),
                g: this.webSafeDec(a.g),
                b: this.webSafeDec(a.b)
            }
        },
        rgbToHex: function(a) {
            return this.intToHex(a.r) + this.intToHex(a.g) + this.intToHex(a.b)
        },
        intToHex: function(a) {
            var b = parseInt(a).toString(16);
            return 1 == b.length && (b = "0" + b), b.toUpperCase()
        },
        hexToInt: function(a) {
            return parseInt(a, 16)
        },
        rgbToHsv: function(a) {
            var b = a.r / 255,
                c = a.g / 255,
                d = a.b / 255;
            hsv = {
                h: 0,
                s: 0,
                v: 0
            };
            var e = 0,
                f = 0;
            return b >= c && b >= d ? (f = b, e = c > d ? d : c) : c >= d && c >= b ? (f = c, e = b > d ? d : b) : (f = d, e = c > b ? b : c), hsv.v = f, hsv.s = f ? (f - e) / f : 0, hsv.s ? (delta = f - e, hsv.h = b == f ? (c - d) / delta : c == f ? 2 + (d - b) / delta : 4 + (b - c) / delta, hsv.h = parseInt(60 * hsv.h), hsv.h < 0 && (hsv.h += 360)) : hsv.h = 0, hsv.s = parseInt(100 * hsv.s), hsv.v = parseInt(100 * hsv.v), hsv
        },
        hsvToRgb: function(a) {
            rgb = {
                r: 0,
                g: 0,
                b: 0
            };
            var b = a.h,
                c = a.s,
                d = a.v;
            if (0 == c) rgb.r = rgb.g = rgb.b = 0 == d ? 0 : parseInt(255 * d / 100);
            else {
                360 == b && (b = 0), b /= 60, c /= 100, d /= 100;
                var e = parseInt(b),
                    f = b - e,
                    g = d * (1 - c),
                    h = d * (1 - c * f),
                    i = d * (1 - c * (1 - f));
                switch (e) {
                    case 0:
                        rgb.r = d, rgb.g = i, rgb.b = g;
                        break;
                    case 1:
                        rgb.r = h, rgb.g = d, rgb.b = g;
                        break;
                    case 2:
                        rgb.r = g, rgb.g = d, rgb.b = i;
                        break;
                    case 3:
                        rgb.r = g, rgb.g = h, rgb.b = d;
                        break;
                    case 4:
                        rgb.r = i, rgb.g = g, rgb.b = d;
                        break;
                    case 5:
                        rgb.r = d, rgb.g = g, rgb.b = h
                }
                rgb.r = parseInt(255 * rgb.r), rgb.g = parseInt(255 * rgb.g), rgb.b = parseInt(255 * rgb.b)
            }
            return rgb
        },
        normalizeHex: function(a) {
            return this.rgbToHex(this.hexToRgb(a))
        }
    },
    /*!
    ColorPicker
    Copyright (c) 2007 John Dyer (http://johndyer.name)
    MIT style license
    */
    window.Refresh || (Refresh = {}), Refresh.Web || (Refresh.Web = {}), Refresh.Web.ColorValuePicker = Class.create(), Refresh.Web.ColorValuePicker.prototype = {
        initialize: function(a) {
            this.id = a, this.onValuesChanged = null, this._hueInput = $(this.id + "_Hue"), this._valueInput = $(this.id + "_Brightness"), this._saturationInput = $(this.id + "_Saturation"), this._redInput = $(this.id + "_Red"), this._greenInput = $(this.id + "_Green"), this._blueInput = $(this.id + "_Blue"), this._hexInput = $(this.id + "_Hex"), this._event_onHsvKeyUp = this._onHsvKeyUp.bindAsEventListener(this), this._event_onHsvBlur = this._onHsvBlur.bindAsEventListener(this), this._event_onRgbKeyUp = this._onRgbKeyUp.bindAsEventListener(this), this._event_onRgbBlur = this._onRgbBlur.bindAsEventListener(this), this._event_onHexKeyUp = this._onHexKeyUp.bindAsEventListener(this), Event.observe(this._hueInput, "keyup", this._event_onHsvKeyUp), Event.observe(this._valueInput, "keyup", this._event_onHsvKeyUp), Event.observe(this._saturationInput, "keyup", this._event_onHsvKeyUp), Event.observe(this._hueInput, "blur", this._event_onHsvBlur), Event.observe(this._valueInput, "blur", this._event_onHsvBlur), Event.observe(this._saturationInput, "blur", this._event_onHsvBlur), Event.observe(this._redInput, "keyup", this._event_onRgbKeyUp), Event.observe(this._greenInput, "keyup", this._event_onRgbKeyUp), Event.observe(this._blueInput, "keyup", this._event_onRgbKeyUp), Event.observe(this._redInput, "blur", this._event_onRgbBlur), Event.observe(this._greenInput, "blur", this._event_onRgbBlur), Event.observe(this._blueInput, "blur", this._event_onRgbBlur), Event.observe(this._hexInput, "keyup", this._event_onHexKeyUp), this.color = new Refresh.Web.Color, "" != this._hexInput.value && this.color.setHex(this._hexInput.value), this._hexInput.value = this.color.hex, this._redInput.value = this.color.r, this._greenInput.value = this.color.g, this._blueInput.value = this.color.b, this._hueInput.value = this.color.h, this._saturationInput.value = this.color.s, this._valueInput.value = this.color.v
        },
        _onHsvKeyUp: function(a) {
            "" != a.target.value && (this.validateHsv(a), this.setValuesFromHsv(), this.onValuesChanged && this.onValuesChanged(this))
        },
        _onRgbKeyUp: function(a) {
            "" != a.target.value && (this.validateRgb(a), this.setValuesFromRgb(), this.onValuesChanged && this.onValuesChanged(this))
        },
        _onHexKeyUp: function(a) {
            "" != a.target.value && (this.validateHex(a), this.setValuesFromHex(), this.onValuesChanged && this.onValuesChanged(this))
        },
        _onHsvBlur: function(a) {
            "" == a.target.value && this.setValuesFromRgb()
        },
        _onRgbBlur: function(a) {
            "" == a.target.value && this.setValuesFromHsv()
        },
        HexBlur: function(a) {
            "" == a.target.value && this.setValuesFromHsv()
        },
        validateRgb: function(a) {
            if (!this._keyNeedsValidation(a)) return a;
            this._redInput.value = this._setValueInRange(this._redInput.value, 0, 255), this._greenInput.value = this._setValueInRange(this._greenInput.value, 0, 255), this._blueInput.value = this._setValueInRange(this._blueInput.value, 0, 255)
        },
        validateHsv: function(a) {
            if (!this._keyNeedsValidation(a)) return a;
            this._hueInput.value = this._setValueInRange(this._hueInput.value, 0, 359), this._saturationInput.value = this._setValueInRange(this._saturationInput.value, 0, 100), this._valueInput.value = this._setValueInRange(this._valueInput.value, 0, 100)
        },
        validateHex: function(a) {
            if (!this._keyNeedsValidation(a)) return a;
            var b = new String(this._hexInput.value).toUpperCase();
            "#" == b.substr(0, 1) && (b = b.substring(1)), b = b.replace(/[^A-F0-9]/g, "0"), b.length > 6 && (b = b.substring(0, 6)), this._hexInput.value = b
        },
        _keyNeedsValidation: function(a) {
            return 9 != a.keyCode && 16 != a.keyCode && 38 != a.keyCode && 29 != a.keyCode && 40 != a.keyCode && 37 != a.keyCode && (!a.ctrlKey || a.keyCode != "c".charCodeAt() && a.keyCode != "v".charCodeAt())
        },
        _setValueInRange: function(a, b, c) {
            return "" == a || isNaN(a) ? b : (a = parseInt(a), a > c ? c : a < b ? b : a)
        },
        setValuesFromRgb: function() {
            this.color.setRgb(this._redInput.value, this._greenInput.value, this._blueInput.value), this._hexInput.value = this.color.hex, this._hueInput.value = this.color.h, this._saturationInput.value = this.color.s, this._valueInput.value = this.color.v
        },
        setValuesFromHsv: function() {
            this.color.setHsv(this._hueInput.value, this._saturationInput.value, this._valueInput.value), this._hexInput.value = this.color.hex, this._redInput.value = this.color.r, this._greenInput.value = this.color.g, this._blueInput.value = this.color.b
        },
        setValuesFromHex: function() {
            this.color.setHex(this._hexInput.value), this._redInput.value = this.color.r, this._greenInput.value = this.color.g, this._blueInput.value = this.color.b, this._hueInput.value = this.color.h, this._saturationInput.value = this.color.s, this._valueInput.value = this.color.v
        }
    },
    /*!
    ColorPicker
    Copyright (c) 2007 John Dyer (http://johndyer.name)
    MIT style license
    */
    window.Refresh || (Refresh = {}), Refresh.Web || (Refresh.Web = {}), Refresh.Web.SlidersList = [], Refresh.Web.DefaultSliderSettings = {
        xMinValue: 0,
        xMaxValue: 100,
        yMinValue: 0,
        yMaxValue: 100,
        arrowImage: "images/rangearrows.gif"
    }, Refresh.Web.Slider = Class.create(), Refresh.Web.Slider.prototype = {
        _container: null,
        _bar: null,
        _arrow: null,
        initialize: function(a, b, c) {
            this.id = a, this.settings = Object.extend(Object.extend({}, Refresh.Web.DefaultSliderSettings), b || {}), this.xValue = 0, this.yValue = 0, this._bar = $(this.id), this._arrow = document.createElement("img"), this._arrow.border = 0, this._arrow.src = this.settings.arrowImage, this._arrow.margin = 0, this._arrow.padding = 0, this._arrow.style.position = "absolute", this._arrow.style.zIndex = "5", this._arrow.style.top = "0px", this._arrow.style.left = "0px", c ? (c.appendChild(this._arrow), this._container = c) : document.body.appendChild(this._arrow);
            this.setPositioningVariables(), this._event_docMouseMove = this._docMouseMove.bindAsEventListener(this), this._event_docMouseUp = this._docMouseUp.bindAsEventListener(this), this._event_docMouseOut = this._docMouseOut.bindAsEventListener(this), Event.observe(this._bar, "mousedown", this._bar_mouseDown.bindAsEventListener(this)), Event.observe(this._arrow, "mousedown", this._arrow_mouseDown.bindAsEventListener(this)), this.setArrowPositionFromValues(), this.onValuesChanged && this.onValuesChanged(this), Refresh.Web.SlidersList.push(this)
        },
        setPositioningVariables: function() {
            this._barWidth = this._bar.getWidth(), this._barHeight = this._bar.getHeight();
            var a = this._bar.cumulativeOffset();
            this._barTop = a.top, this._barLeft = a.left, this._barBottom = this._barTop + this._barHeight, this._barRight = this._barLeft + this._barWidth, this._arrow = $(this._arrow), this._arrowWidth = this._arrow.getWidth(), this._arrowHeight = this._arrow.getHeight(), this.MinX = this._barLeft, this.MinY = this._barTop, this.MaxX = this._barRight, this.MinY = this._barBottom
        },
        setArrowPositionFromValues: function(a) {
            this.setPositioningVariables();
            var b = 0,
                c = 0;
            if (this.settings.xMinValue != this.settings.xMaxValue)
                if (this.xValue == this.settings.xMinValue) b = 0;
                else if (this.xValue == this.settings.xMaxValue) b = this._barWidth - 1;
            else {
                var d = this.settings.xMaxValue;
                this.settings.xMinValue < 1 && (d = d + Math.abs(this.settings.xMinValue) + 1);
                var e = this.xValue;
                this.xValue < 1 && (e += 1), b = e / d * this._barWidth, b = parseInt(b) == d - 1 ? d : parseInt(b), this.settings.xMinValue < 1 && (b = b - Math.abs(this.settings.xMinValue) - 1)
            }
            if (this.settings.yMinValue != this.settings.yMaxValue)
                if (this.yValue == this.settings.yMinValue) c = 0;
                else if (this.yValue == this.settings.yMaxValue) c = this._barHeight - 1;
            else {
                var f = this.settings.yMaxValue;
                this.settings.yMinValue < 1 && (f = f + Math.abs(this.settings.yMinValue) + 1);
                var g = this.yValue;
                this.yValue < 1 && (g += 1);
                var c = g / f * this._barHeight;
                c = parseInt(c) == f - 1 ? f : parseInt(c), this.settings.yMinValue < 1 && (c = c - Math.abs(this.settings.yMinValue) - 1)
            }
            this._setArrowPosition(b, c)
        },
        _setArrowPosition: function(a, b) {
            if (a < 0 && (a = 0), a > this._barWidth && (a = this._barWidth), b < 0 && (b = 0), b > this._barHeight && (b = this._barHeight), this._container) var c = a,
                d = b;
            else var c = this._barLeft + a,
                d = this._barTop + b;
            this._arrowWidth > this._barWidth ? c -= this._arrowWidth / 2 - this._barWidth / 2 : c -= parseInt(this._arrowWidth / 2), this._arrowHeight > this._barHeight ? d -= this._arrowHeight / 2 - this._barHeight / 2 : d -= parseInt(this._arrowHeight / 2), this._arrow.style.left = c + "px", this._arrow.style.top = d + "px"
        },
        _bar_mouseDown: function(a) {
            this._mouseDown(a)
        },
        _arrow_mouseDown: function(a) {
            this._mouseDown(a)
        },
        _mouseDown: function(a) {
            Refresh.Web.ActiveSlider = this, this.setValuesFromMousePosition(a), Event.observe(document, "mousemove", this._event_docMouseMove), Event.observe(document, "mouseup", this._event_docMouseUp), Event.observe(document, "mouseout", this._event_docMouseOut), Event.stop(a)
        },
        _docMouseOut: function(a) {
            "HTML" == a.target.tagName && this._docMouseUp(a)
        },
        _docMouseMove: function(a) {
            this.setValuesFromMousePosition(a), Event.stop(a)
        },
        _docMouseUp: function(a) {
            Event.stopObserving(document, "mouseup", this._event_docMouseUp), Event.stopObserving(document, "mousemove", this._event_docMouseMove), Event.stopObserving(document, "mouseout", this._event_docMouseOut), Event.stop(a)
        },
        setValuesFromMousePosition: function(a) {
            this.setPositioningVariables();
            var b = Event.pointer(a),
                c = 0,
                d = 0;
            c = b.x < this._barLeft ? 0 : b.x > this._barRight ? this._barWidth : b.x - this._barLeft + 1, d = b.y < this._barTop ? 0 : b.y > this._barBottom ? this._barHeight : b.y - this._barTop + 1;
            var e = parseInt(c / this._barWidth * this.settings.xMaxValue),
                f = parseInt(d / this._barHeight * this.settings.yMaxValue);
            this.xValue = e, this.yValue = f, this.settings.xMaxValue == this.settings.xMinValue && (c = 0), this.settings.yMaxValue == this.settings.yMinValue && (d = 0), this._setArrowPosition(c, d), this.onValuesChanged && this.onValuesChanged(this)
        }
    },
    /*!
    ColorPicker
    Copyright (c) 2007 John Dyer (http://johndyer.name)
    MIT style license
    */
    window.Refresh || (Refresh = {}), Refresh.Web || (Refresh.Web = {}), Refresh.Web.DefaultColorPickerSettings = {
        startMode: "h",
        startHex: "ff0000",
        clientFilesPath: "images/"
    }, Refresh.Web.ColorPicker = Class.create(), Refresh.Web.ColorPicker.prototype = {
        initialize: function(a, b) {
            this.id = a, this.settings = Object.extend(Object.extend({}, Refresh.Web.DefaultColorPickerSettings), b || {}), this._hueRadio = $(this.id + "_HueRadio"), this._saturationRadio = $(this.id + "_SaturationRadio"), this._valueRadio = $(this.id + "_BrightnessRadio"), this._redRadio = $(this.id + "_RedRadio"), this._greenRadio = $(this.id + "_GreenRadio"), this._blueRadio = $(this.id + "_BlueRadio"), this._hueRadio.value = "h", this._saturationRadio.value = "s", this._valueRadio.value = "v", this._redRadio.value = "r", this._greenRadio.value = "g", this._blueRadio.value = "b", this._event_onRadioClicked = this._onRadioClicked.bindAsEventListener(this), Event.observe(this._hueRadio, "click", this._event_onRadioClicked), Event.observe(this._saturationRadio, "click", this._event_onRadioClicked), Event.observe(this._valueRadio, "click", this._event_onRadioClicked), Event.observe(this._redRadio, "click", this._event_onRadioClicked), Event.observe(this._greenRadio, "click", this._event_onRadioClicked), Event.observe(this._blueRadio, "click", this._event_onRadioClicked), this._preview = $(this.id + "_Preview"), this._mapBase = $(this.id + "_ColorMap"), this._mapBase.style.width = "256px", this._mapBase.style.height = "256px", this._mapBase.style.padding = 0, this._mapBase.style.margin = 0, this._mapBase.style.border = "solid 1px #000", this._mapBase.style.position = "relative", this._mapL1 = new Element("img", {
                src: this.settings.clientFilesPath + "blank.gif",
                width: 256,
                height: 256
            }), this._mapL1.style.margin = "0px", this._mapL1.style.display = "block", this._mapBase.appendChild(this._mapL1), this._mapL2 = new Element("img", {
                src: this.settings.clientFilesPath + "blank.gif",
                width: 256,
                height: 256
            }), this._mapBase.appendChild(this._mapL2), this._mapL2.style.clear = "both", this._mapL2.style.margin = "-256px 0px 0px 0px", this._mapL2.setOpacity(.5), this._mapL2.style.display = "block", this._bar = $(this.id + "_ColorBar"), this._bar.style.width = "20px", this._bar.style.height = "256px", this._bar.style.padding = 0, this._bar.style.margin = "0px 10px", this._bar.style.border = "solid 1px #000", this._bar.style.position = "relative", this._barL1 = new Element("img", {
                src: this.settings.clientFilesPath + "blank.gif",
                width: 20,
                height: 256
            }), this._barL1.style.margin = "0px", this._barL1.style.display = "block", this._bar.appendChild(this._barL1), this._barL2 = new Element("img", {
                src: this.settings.clientFilesPath + "blank.gif",
                width: 20,
                height: 256
            }), this._barL2.style.margin = "-256px 0px 0px 0px", this._barL2.style.display = "block", this._bar.appendChild(this._barL2), this._barL3 = new Element("img", {
                src: this.settings.clientFilesPath + "blank.gif",
                width: 20,
                height: 256
            }), this._barL3.style.margin = "-256px 0px 0px 0px", this._barL3.style.backgroundColor = "#ff0000", this._barL3.style.display = "block", this._bar.appendChild(this._barL3), this._barL4 = new Element("img", {
                src: this.settings.clientFilesPath + "bar-brightness.png",
                width: 20,
                height: 256
            }), this._barL4.style.margin = "-256px 0px 0px 0px", this._barL4.style.display = "block", this._bar.appendChild(this._barL4), this._map = new Refresh.Web.Slider(this._mapL2, {
                xMaxValue: 255,
                yMinValue: 255,
                arrowImage: this.settings.clientFilesPath + "mappoint.gif"
            }, this._mapBase), this._slider = new Refresh.Web.Slider(this._barL4, {
                xMinValue: 1,
                xMaxValue: 1,
                yMinValue: 255,
                arrowImage: this.settings.clientFilesPath + "rangearrows.gif"
            }, this._bar), this._cvp = new Refresh.Web.ColorValuePicker(this.id);
            var c = this;
            this._slider.onValuesChanged = function() {
                c.sliderValueChanged()
            }, this._map.onValuesChanged = function() {
                c.mapValueChanged()
            }, this._cvp.onValuesChanged = function() {
                c.textValuesChanged()
            }, this.isLessThanIE7 = !1, parseFloat(navigator.appVersion.split("MSIE")[1]) < 7 && document.body.filters && (this.isLessThanIE7 = !0), this.setColorMode(this.settings.startMode), this.settings.startHex && (this._cvp._hexInput.value = this.settings.startHex), this._cvp.setValuesFromHex(), this.positionMapAndSliderArrows(), this.updateVisuals(), this.color = null
        },
        show: function() {
            this._map.Arrow.style.display = "", this._slider.Arrow.style.display = "", this._map.setPositioningVariables(), this._slider.setPositioningVariables(), this.positionMapAndSliderArrows()
        },
        hide: function() {
            this._map.Arrow.style.display = "none", this._slider.Arrow.style.display = "none"
        },
        _onRadioClicked: function(a) {
            this.setColorMode(a.target.value)
        },
        _onWebSafeClicked: function(a) {
            this.setColorMode(this.ColorMode)
        },
        textValuesChanged: function() {
            this.positionMapAndSliderArrows(), this.updateVisuals()
        },
        setColorMode: function(a) {
            function b(a, b) {
                a.setAlpha(b, 100), b.style.backgroundColor = "", b.src = a.settings.clientFilesPath + "blank.gif", b.style.filter = ""
            }
            switch (this.color = this._cvp.color, b(this, this._mapL1), b(this, this._mapL2), b(this, this._barL1), b(this, this._barL2), b(this, this._barL3), b(this, this._barL4), this._hueRadio.checked = !1, this._saturationRadio.checked = !1, this._valueRadio.checked = !1, this._redRadio.checked = !1, this._greenRadio.checked = !1, this._blueRadio.checked = !1, a) {
                case "h":
                    this._hueRadio.checked = !0, this._mapL1.style.backgroundColor = "#" + Refresh.Web.ColorMethods.normalizeHex(this.color.hex), this._mapL2.style.backgroundColor = "transparent", this.setImg(this._mapL2, this.settings.clientFilesPath + "map-hue.png"), this.setAlpha(this._mapL2, 100), this.setImg(this._barL4, this.settings.clientFilesPath + "bar-hue.png"), this._map.settings.xMaxValue = 100, this._map.settings.yMaxValue = 100, this._slider.settings.yMaxValue = 359;
                    break;
                case "s":
                    this._saturationRadio.checked = !0, this.setImg(this._mapL1, this.settings.clientFilesPath + "map-saturation.png"), this.setImg(this._mapL2, this.settings.clientFilesPath + "map-saturation-overlay.png"), this.setAlpha(this._mapL2, 0), this.setBG(this._barL3, this.color.hex), this.setImg(this._barL4, this.settings.clientFilesPath + "bar-saturation.png"), this._map.settings.xMaxValue = 359, this._map.settings.yMaxValue = 100, this._slider.settings.yMaxValue = 100;
                    break;
                case "v":
                    this._valueRadio.checked = !0, this.setBG(this._mapL1, "000"), this.setImg(this._mapL2, this.settings.clientFilesPath + "map-brightness.png"), this._barL3.style.backgroundColor = "#" + Refresh.Web.ColorMethods.normalizeHex(this.color.hex), this.setImg(this._barL4, this.settings.clientFilesPath + "bar-brightness.png"), this._map.settings.xMaxValue = 359, this._map.settings.yMaxValue = 100, this._slider.settings.yMaxValue = 100;
                    break;
                case "r":
                    this._redRadio.checked = !0, this.setImg(this._mapL2, this.settings.clientFilesPath + "map-red-max.png"), this.setImg(this._mapL1, this.settings.clientFilesPath + "map-red-min.png"), this.setImg(this._barL4, this.settings.clientFilesPath + "bar-red-tl.png"), this.setImg(this._barL3, this.settings.clientFilesPath + "bar-red-tr.png"), this.setImg(this._barL2, this.settings.clientFilesPath + "bar-red-br.png"), this.setImg(this._barL1, this.settings.clientFilesPath + "bar-red-bl.png");
                    break;
                case "g":
                    this._greenRadio.checked = !0, this.setImg(this._mapL2, this.settings.clientFilesPath + "map-green-max.png"), this.setImg(this._mapL1, this.settings.clientFilesPath + "map-green-min.png"), this.setImg(this._barL4, this.settings.clientFilesPath + "bar-green-tl.png"), this.setImg(this._barL3, this.settings.clientFilesPath + "bar-green-tr.png"), this.setImg(this._barL2, this.settings.clientFilesPath + "bar-green-br.png"), this.setImg(this._barL1, this.settings.clientFilesPath + "bar-green-bl.png");
                    break;
                case "b":
                    this._blueRadio.checked = !0, this.setImg(this._mapL2, this.settings.clientFilesPath + "map-blue-max.png"), this.setImg(this._mapL1, this.settings.clientFilesPath + "map-blue-min.png"), this.setImg(this._barL4, this.settings.clientFilesPath + "bar-blue-tl.png"), this.setImg(this._barL3, this.settings.clientFilesPath + "bar-blue-tr.png"), this.setImg(this._barL2, this.settings.clientFilesPath + "bar-blue-br.png"), this.setImg(this._barL1, this.settings.clientFilesPath + "bar-blue-bl.png");
                    break;
                default:
                    alert("invalid mode")
            }
            switch (a) {
                case "h":
                case "s":
                case "v":
                    this._map.settings.xMinValue = 1, this._map.settings.yMinValue = 1, this._slider.settings.yMinValue = 1;
                    break;
                case "r":
                case "g":
                case "b":
                    this._map.settings.xMinValue = 0, this._map.settings.yMinValue = 0, this._slider.settings.yMinValue = 0, this._map.settings.xMaxValue = 255, this._map.settings.yMaxValue = 255, this._slider.settings.yMaxValue = 255
            }
            this.ColorMode = a, this.positionMapAndSliderArrows(), this.updateMapVisuals(), this.updateSliderVisuals()
        },
        mapValueChanged: function() {
            switch (this.ColorMode) {
                case "h":
                    this._cvp._saturationInput.value = this._map.xValue, this._cvp._valueInput.value = 100 - this._map.yValue;
                    break;
                case "s":
                    this._cvp._hueInput.value = this._map.xValue, this._cvp._valueInput.value = 100 - this._map.yValue;
                    break;
                case "v":
                    this._cvp._hueInput.value = this._map.xValue, this._cvp._saturationInput.value = 100 - this._map.yValue;
                    break;
                case "r":
                    this._cvp._blueInput.value = this._map.xValue, this._cvp._greenInput.value = 256 - this._map.yValue;
                    break;
                case "g":
                    this._cvp._blueInput.value = this._map.xValue, this._cvp._redInput.value = 256 - this._map.yValue;
                    break;
                case "b":
                    this._cvp._redInput.value = this._map.xValue, this._cvp._greenInput.value = 256 - this._map.yValue
            }
            switch (this.ColorMode) {
                case "h":
                case "s":
                case "v":
                    this._cvp.setValuesFromHsv();
                    break;
                case "r":
                case "g":
                case "b":
                    this._cvp.setValuesFromRgb()
            }
            this.updateVisuals()
        },
        sliderValueChanged: function() {
            switch (this.ColorMode) {
                case "h":
                    this._cvp._hueInput.value = 360 - this._slider.yValue;
                    break;
                case "s":
                    this._cvp._saturationInput.value = 100 - this._slider.yValue;
                    break;
                case "v":
                    this._cvp._valueInput.value = 100 - this._slider.yValue;
                    break;
                case "r":
                    this._cvp._redInput.value = 255 - this._slider.yValue;
                    break;
                case "g":
                    this._cvp._greenInput.value = 255 - this._slider.yValue;
                    break;
                case "b":
                    this._cvp._blueInput.value = 255 - this._slider.yValue
            }
            switch (this.ColorMode) {
                case "h":
                case "s":
                case "v":
                    this._cvp.setValuesFromHsv();
                    break;
                case "r":
                case "g":
                case "b":
                    this._cvp.setValuesFromRgb()
            }
            this.updateVisuals()
        },
        positionMapAndSliderArrows: function() {
            this.color = this._cvp.color;
            var a = 0;
            switch (this.ColorMode) {
                case "h":
                    a = 360 - this.color.h;
                    break;
                case "s":
                    a = 100 - this.color.s;
                    break;
                case "v":
                    a = 100 - this.color.v;
                    break;
                case "r":
                    a = 255 - this.color.r;
                    break;
                case "g":
                    a = 255 - this.color.g;
                    break;
                case "b":
                    a = 255 - this.color.b
            }
            this._slider.yValue = a, this._slider.setArrowPositionFromValues();
            var b = 0,
                c = 0;
            switch (this.ColorMode) {
                case "h":
                    b = this.color.s, c = 100 - this.color.v;
                    break;
                case "s":
                    b = this.color.h, c = 100 - this.color.v;
                    break;
                case "v":
                    b = this.color.h, c = 100 - this.color.s;
                    break;
                case "r":
                    b = this.color.b, c = 256 - this.color.g;
                    break;
                case "g":
                    b = this.color.b, c = 256 - this.color.r;
                    break;
                case "b":
                    b = this.color.r, c = 256 - this.color.g
            }
            this._map.xValue = b, this._map.yValue = c, this._map.setArrowPositionFromValues()
        },
        updateVisuals: function() {
            this.updatePreview(), this.updateMapVisuals(), this.updateSliderVisuals(), this.updateColorZilla && this.updateColorZilla()
        },
        updatePreview: function() {
            try {
                this._preview.style.backgroundColor = "#" + Refresh.Web.ColorMethods.normalizeHex(this._cvp.color.hex)
            } catch (a) {}
        },
        updateMapVisuals: function() {
            switch (this.color = this._cvp.color, this.ColorMode) {
                case "h":
                    var a = new Refresh.Web.Color({
                        h: this.color.h,
                        s: 100,
                        v: 100
                    });
                    this.setBG(this._mapL1, a.hex);
                    break;
                case "s":
                    this.setAlpha(this._mapL2, 100 - this.color.s);
                    break;
                case "v":
                    this.setAlpha(this._mapL2, this.color.v);
                    break;
                case "r":
                    this.setAlpha(this._mapL2, this.color.r / 256 * 100);
                    break;
                case "g":
                    this.setAlpha(this._mapL2, this.color.g / 256 * 100);
                    break;
                case "b":
                    this.setAlpha(this._mapL2, this.color.b / 256 * 100)
            }
        },
        updateSliderVisuals: function() {
            switch (this.color = this._cvp.color, this.ColorMode) {
                case "h":
                    break;
                case "s":
                    var a = new Refresh.Web.Color({
                        h: this.color.h,
                        s: 100,
                        v: this.color.v
                    });
                    this.setBG(this._barL3, a.hex);
                    break;
                case "v":
                    var b = new Refresh.Web.Color({
                        h: this.color.h,
                        s: this.color.s,
                        v: 100
                    });
                    this.setBG(this._barL3, b.hex);
                    break;
                case "r":
                case "g":
                case "b":
                    var c = 0,
                        d = 0;
                    "r" == this.ColorMode ? (c = this._cvp._blueInput.value, d = this._cvp._greenInput.value) : "g" == this.ColorMode ? (c = this._cvp._blueInput.value, d = this._cvp._redInput.value) : "b" == this.ColorMode && (c = this._cvp._redInput.value, d = this._cvp._greenInput.value);
                    var e = c / 256 * 100,
                        f = d / 256 * 100,
                        g = (256 - c) / 256 * 100,
                        h = (256 - d) / 256 * 100;
                    this.setAlpha(this._barL4, f > g ? g : f), this.setAlpha(this._barL3, f > e ? e : f), this.setAlpha(this._barL2, h > e ? e : h), this.setAlpha(this._barL1, h > g ? g : h)
            }
        },
        setBG: function(a, b) {
            try {
                a.style.backgroundColor = "#" + Refresh.Web.ColorMethods.normalizeHex(b)
            } catch (a) {}
        },
        setImg: function(a, b) {
            b.indexOf("png") && this.isLessThanIE7 ? (a.pngSrc = b, a.src = this.settings.clientFilesPath + "blank.gif", a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + b + "');") : a.src = b
        },
        setAlpha: function(a, b) {
            if (this.isLessThanIE7) {
                var c = a.pngSrc;
                null != c && -1 == c.indexOf("map-hue") && (a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + c + "') progid:DXImageTransform.Microsoft.Alpha(opacity=" + b + ")")
            } else a.setOpacity(b / 100)
        }
    },
    /*!
     * clipboard.js v2.0.4
     * https://zenorocha.github.io/clipboard.js
     *
     * Licensed MIT © Zeno Rocha
     */
    function(a, b) {
        "object" == typeof exports && "object" == typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? exports.ClipboardJS = b() : a.ClipboardJS = b()
    }(this, function() {
        return function(a) {
            function b(d) {
                if (c[d]) return c[d].exports;
                var e = c[d] = {
                    i: d,
                    l: !1,
                    exports: {}
                };
                return a[d].call(e.exports, e, e.exports, b), e.l = !0, e.exports
            }
            var c = {};
            return b.m = a, b.c = c, b.d = function(a, c, d) {
                b.o(a, c) || Object.defineProperty(a, c, {
                    enumerable: !0,
                    get: d
                })
            }, b.r = function(a) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(a, "__esModule", {
                    value: !0
                })
            }, b.t = function(a, c) {
                if (1 & c && (a = b(a)), 8 & c) return a;
                if (4 & c && "object" == typeof a && a && a.__esModule) return a;
                var d = Object.create(null);
                if (b.r(d), Object.defineProperty(d, "default", {
                        enumerable: !0,
                        value: a
                    }), 2 & c && "string" != typeof a)
                    for (var e in a) b.d(d, e, function(b) {
                        return a[b]
                    }.bind(null, e));
                return d
            }, b.n = function(a) {
                var c = a && a.__esModule ? function() {
                    return a.default
                } : function() {
                    return a
                };
                return b.d(c, "a", c), c
            }, b.o = function(a, b) {
                return Object.prototype.hasOwnProperty.call(a, b)
            }, b.p = "", b(b.s = 0)
        }([function(a, b, c) {
            "use strict";

            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                }
            }

            function e(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }

            function f(a, b) {
                if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !b || "object" != typeof b && "function" != typeof b ? a : b
            }

            function g(a, b) {
                if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
                a.prototype = Object.create(b && b.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
            }

            function h(a, b) {
                var c = "data-clipboard-" + a;
                if (b.hasAttribute(c)) return b.getAttribute(c)
            }
            var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
                    return typeof a
                } : function(a) {
                    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
                },
                j = function() {
                    function a(a, b) {
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                        }
                    }
                    return function(b, c, d) {
                        return c && a(b.prototype, c), d && a(b, d), b
                    }
                }(),
                k = c(1),
                l = d(k),
                m = c(3),
                n = d(m),
                o = c(4),
                p = d(o),
                q = function(a) {
                    function b(a, c) {
                        e(this, b);
                        var d = f(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this));
                        return d.resolveOptions(c), d.listenClick(a), d
                    }
                    return g(b, a), j(b, [{
                        key: "resolveOptions",
                        value: function() {
                            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this.action = "function" == typeof a.action ? a.action : this.defaultAction, this.target = "function" == typeof a.target ? a.target : this.defaultTarget, this.text = "function" == typeof a.text ? a.text : this.defaultText, this.container = "object" === i(a.container) ? a.container : document.body
                        }
                    }, {
                        key: "listenClick",
                        value: function(a) {
                            var b = this;
                            this.listener = (0, p.default)(a, "click", function(a) {
                                return b.onClick(a)
                            })
                        }
                    }, {
                        key: "onClick",
                        value: function(a) {
                            var b = a.delegateTarget || a.currentTarget;
                            this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l.default({
                                action: this.action(b),
                                target: this.target(b),
                                text: this.text(b),
                                container: this.container,
                                trigger: b,
                                emitter: this
                            })
                        }
                    }, {
                        key: "defaultAction",
                        value: function(a) {
                            return h("action", a)
                        }
                    }, {
                        key: "defaultTarget",
                        value: function(a) {
                            var b = h("target", a);
                            if (b) return document.querySelector(b)
                        }
                    }, {
                        key: "defaultText",
                        value: function(a) {
                            return h("text", a)
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                        }
                    }], [{
                        key: "isSupported",
                        value: function() {
                            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                                b = "string" == typeof a ? [a] : a,
                                c = !!document.queryCommandSupported;
                            return b.forEach(function(a) {
                                c = c && !!document.queryCommandSupported(a)
                            }), c
                        }
                    }]), b
                }(n.default);
            a.exports = q
        }, function(a, b, c) {
            "use strict";

            function d(a) {
                return a && a.__esModule ? a : {
                    default: a
                }
            }

            function e(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }
            var f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
                    return typeof a
                } : function(a) {
                    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
                },
                g = function() {
                    function a(a, b) {
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                        }
                    }
                    return function(b, c, d) {
                        return c && a(b.prototype, c), d && a(b, d), b
                    }
                }(),
                h = c(2),
                i = d(h),
                j = function() {
                    function a(b) {
                        e(this, a), this.resolveOptions(b), this.initSelection()
                    }
                    return g(a, [{
                        key: "resolveOptions",
                        value: function() {
                            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this.action = a.action, this.container = a.container, this.emitter = a.emitter, this.target = a.target, this.text = a.text, this.trigger = a.trigger, this.selectedText = ""
                        }
                    }, {
                        key: "initSelection",
                        value: function() {
                            this.text ? this.selectFake() : this.target && this.selectTarget()
                        }
                    }, {
                        key: "selectFake",
                        value: function() {
                            var a = this,
                                b = "rtl" == document.documentElement.getAttribute("dir");
                            this.removeFake(), this.fakeHandlerCallback = function() {
                                return a.removeFake()
                            }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[b ? "right" : "left"] = "-9999px";
                            var c = window.pageYOffset || document.documentElement.scrollTop;
                            this.fakeElem.style.top = c + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText()
                        }
                    }, {
                        key: "removeFake",
                        value: function() {
                            this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
                        }
                    }, {
                        key: "selectTarget",
                        value: function() {
                            this.selectedText = (0, i.default)(this.target), this.copyText()
                        }
                    }, {
                        key: "copyText",
                        value: function() {
                            var a = void 0;
                            try {
                                a = document.execCommand(this.action)
                            } catch (b) {
                                a = !1
                            }
                            this.handleResult(a)
                        }
                    }, {
                        key: "handleResult",
                        value: function(a) {
                            this.emitter.emit(a ? "success" : "error", {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            })
                        }
                    }, {
                        key: "clearSelection",
                        value: function() {
                            this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges()
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            this.removeFake()
                        }
                    }, {
                        key: "action",
                        set: function() {
                            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                            if (this._action = a, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                        },
                        get: function() {
                            return this._action
                        }
                    }, {
                        key: "target",
                        set: function(a) {
                            if (void 0 !== a) {
                                if (!a || "object" !== (void 0 === a ? "undefined" : f(a)) || 1 !== a.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                if ("copy" === this.action && a.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                if ("cut" === this.action && (a.hasAttribute("readonly") || a.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                this._target = a
                            }
                        },
                        get: function() {
                            return this._target
                        }
                    }]), a
                }();
            a.exports = j
        }, function(a, b) {
            function c(a) {
                var b;
                if ("SELECT" === a.nodeName) a.focus(), b = a.value;
                else if ("INPUT" === a.nodeName || "TEXTAREA" === a.nodeName) {
                    var c = a.hasAttribute("readonly");
                    c || a.setAttribute("readonly", ""), a.select(), a.setSelectionRange(0, a.value.length), c || a.removeAttribute("readonly"), b = a.value
                } else {
                    a.hasAttribute("contenteditable") && a.focus();
                    var d = window.getSelection(),
                        e = document.createRange();
                    e.selectNodeContents(a), d.removeAllRanges(), d.addRange(e), b = d.toString()
                }
                return b
            }
            a.exports = c
        }, function(a, b) {
            function c() {}
            c.prototype = {
                on: function(a, b, c) {
                    var d = this.e || (this.e = {});
                    return (d[a] || (d[a] = [])).push({
                        fn: b,
                        ctx: c
                    }), this
                },
                once: function(a, b, c) {
                    function d() {
                        e.off(a, d), b.apply(c, arguments)
                    }
                    var e = this;
                    return d._ = b, this.on(a, d, c)
                },
                emit: function(a) {
                    var b = [].slice.call(arguments, 1),
                        c = ((this.e || (this.e = {}))[a] || []).slice(),
                        d = 0,
                        e = c.length;
                    for (d; d < e; d++) c[d].fn.apply(c[d].ctx, b);
                    return this
                },
                off: function(a, b) {
                    var c = this.e || (this.e = {}),
                        d = c[a],
                        e = [];
                    if (d && b)
                        for (var f = 0, g = d.length; f < g; f++) d[f].fn !== b && d[f].fn._ !== b && e.push(d[f]);
                    return e.length ? c[a] = e : delete c[a], this
                }
            }, a.exports = c
        }, function(a, b, c) {
            function d(a, b, c) {
                if (!a && !b && !c) throw new Error("Missing required arguments");
                if (!h.string(b)) throw new TypeError("Second argument must be a String");
                if (!h.fn(c)) throw new TypeError("Third argument must be a Function");
                if (h.node(a)) return e(a, b, c);
                if (h.nodeList(a)) return f(a, b, c);
                if (h.string(a)) return g(a, b, c);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
            }

            function e(a, b, c) {
                return a.addEventListener(b, c), {
                    destroy: function() {
                        a.removeEventListener(b, c)
                    }
                }
            }

            function f(a, b, c) {
                return Array.prototype.forEach.call(a, function(a) {
                    a.addEventListener(b, c)
                }), {
                    destroy: function() {
                        Array.prototype.forEach.call(a, function(a) {
                            a.removeEventListener(b, c)
                        })
                    }
                }
            }

            function g(a, b, c) {
                return i(document.body, a, b, c)
            }
            var h = c(5),
                i = c(6);
            a.exports = d
        }, function(a, b) {
            b.node = function(a) {
                return void 0 !== a && a instanceof HTMLElement && 1 === a.nodeType
            }, b.nodeList = function(a) {
                var c = Object.prototype.toString.call(a);
                return void 0 !== a && ("[object NodeList]" === c || "[object HTMLCollection]" === c) && "length" in a && (0 === a.length || b.node(a[0]))
            }, b.string = function(a) {
                return "string" == typeof a || a instanceof String
            }, b.fn = function(a) {
                return "[object Function]" === Object.prototype.toString.call(a)
            }
        }, function(a, b, c) {
            function d(a, b, c, d, e) {
                var g = f.apply(this, arguments);
                return a.addEventListener(c, g, e), {
                    destroy: function() {
                        a.removeEventListener(c, g, e)
                    }
                }
            }

            function e(a, b, c, e, f) {
                return "function" == typeof a.addEventListener ? d.apply(null, arguments) : "function" == typeof c ? d.bind(null, document).apply(null, arguments) : ("string" == typeof a && (a = document.querySelectorAll(a)), Array.prototype.map.call(a, function(a) {
                    return d(a, b, c, e, f)
                }))
            }

            function f(a, b, c, d) {
                return function(c) {
                    c.delegateTarget = g(c.target, b), c.delegateTarget && d.call(a, c)
                }
            }
            var g = c(7);
            a.exports = e
        }, function(a, b) {
            function c(a, b) {
                for (; a && a.nodeType !== d;) {
                    if ("function" == typeof a.matches && a.matches(b)) return a;
                    a = a.parentNode
                }
            }
            var d = 9;
            if ("undefined" != typeof Element && !Element.prototype.matches) {
                var e = Element.prototype;
                e.matches = e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector
            }
            a.exports = c
        }])
    });