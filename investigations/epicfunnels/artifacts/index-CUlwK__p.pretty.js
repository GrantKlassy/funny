var Qc = e => {
    throw TypeError(e)
};
var _l = (e, t, n) => t.has(e) || Qc("Cannot " + n);
var R = (e, t, n) => (_l(e, t, "read from private field"), n ? n.call(e) : t.get(e)),
    ne = (e, t, n) => t.has(e) ? Qc("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n),
    q = (e, t, n, r) => (_l(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n),
    Me = (e, t, n) => (_l(e, t, "access private method"), n);
var Fi = (e, t, n, r) => ({
    set _(o) {
        q(e, t, o, n)
    },
    get _() {
        return R(e, t, r)
    }
});

function tv(e, t) {
    for (var n = 0; n < t.length; n++) {
        const r = t[n];
        if (typeof r != "string" && !Array.isArray(r)) {
            for (const o in r)
                if (o !== "default" && !(o in e)) {
                    const i = Object.getOwnPropertyDescriptor(r, o);
                    i && Object.defineProperty(e, o, i.get ? i : {
                        enumerable: !0,
                        get: () => r[o]
                    })
                }
        }
    }
    return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
    }))
}(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
    new MutationObserver(o => {
        for (const i of o)
            if (i.type === "childList")
                for (const s of i.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && r(s)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(o) {
        const i = {};
        return o.integrity && (i.integrity = o.integrity), o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? i.credentials = "include" : o.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
    }

    function r(o) {
        if (o.ep) return;
        o.ep = !0;
        const i = n(o);
        fetch(o.href, i)
    }
})();

function tp(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var np = {
        exports: {}
    },
    tl = {},
    rp = {
        exports: {}
    },
    Z = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bi = Symbol.for("react.element"),
    nv = Symbol.for("react.portal"),
    rv = Symbol.for("react.fragment"),
    ov = Symbol.for("react.strict_mode"),
    iv = Symbol.for("react.profiler"),
    sv = Symbol.for("react.provider"),
    lv = Symbol.for("react.context"),
    av = Symbol.for("react.forward_ref"),
    uv = Symbol.for("react.suspense"),
    cv = Symbol.for("react.memo"),
    dv = Symbol.for("react.lazy"),
    Kc = Symbol.iterator;

function fv(e) {
    return e === null || typeof e != "object" ? null : (e = Kc && e[Kc] || e["@@iterator"], typeof e == "function" ? e : null)
}
var op = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    },
    ip = Object.assign,
    sp = {};

function vo(e, t, n) {
    this.props = e, this.context = t, this.refs = sp, this.updater = n || op
}
vo.prototype.isReactComponent = {};
vo.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
};
vo.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
};

function lp() {}
lp.prototype = vo.prototype;

function Nu(e, t, n) {
    this.props = e, this.context = t, this.refs = sp, this.updater = n || op
}
var Ru = Nu.prototype = new lp;
Ru.constructor = Nu;
ip(Ru, vo.prototype);
Ru.isPureReactComponent = !0;
var Gc = Array.isArray,
    ap = Object.prototype.hasOwnProperty,
    Ou = {
        current: null
    },
    up = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };

function cp(e, t, n) {
    var r, o = {},
        i = null,
        s = null;
    if (t != null)
        for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (i = "" + t.key), t) ap.call(t, r) && !up.hasOwnProperty(r) && (o[r] = t[r]);
    var l = arguments.length - 2;
    if (l === 1) o.children = n;
    else if (1 < l) {
        for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
        o.children = a
    }
    if (e && e.defaultProps)
        for (r in l = e.defaultProps, l) o[r] === void 0 && (o[r] = l[r]);
    return {
        $$typeof: bi,
        type: e,
        key: i,
        ref: s,
        props: o,
        _owner: Ou.current
    }
}

function pv(e, t) {
    return {
        $$typeof: bi,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}

function ju(e) {
    return typeof e == "object" && e !== null && e.$$typeof === bi
}

function hv(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var Yc = /\/+/g;

function Il(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? hv("" + e.key) : t.toString(36)
}

function ls(e, t, n, r, o) {
    var i = typeof e;
    (i === "undefined" || i === "boolean") && (e = null);
    var s = !1;
    if (e === null) s = !0;
    else switch (i) {
        case "string":
        case "number":
            s = !0;
            break;
        case "object":
            switch (e.$$typeof) {
                case bi:
                case nv:
                    s = !0
            }
    }
    if (s) return s = e, o = o(s), e = r === "" ? "." + Il(s, 0) : r, Gc(o) ? (n = "", e != null && (n = e.replace(Yc, "$&/") + "/"), ls(o, t, n, "", function(u) {
        return u
    })) : o != null && (ju(o) && (o = pv(o, n + (!o.key || s && s.key === o.key ? "" : ("" + o.key).replace(Yc, "$&/") + "/") + e)), t.push(o)), 1;
    if (s = 0, r = r === "" ? "." : r + ":", Gc(e))
        for (var l = 0; l < e.length; l++) {
            i = e[l];
            var a = r + Il(i, l);
            s += ls(i, t, n, a, o)
        } else if (a = fv(e), typeof a == "function")
            for (e = a.call(e), l = 0; !(i = e.next()).done;) i = i.value, a = r + Il(i, l++), s += ls(i, t, n, a, o);
        else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return s
}

function zi(e, t, n) {
    if (e == null) return e;
    var r = [],
        o = 0;
    return ls(e, r, "", "", function(i) {
        return t.call(n, i, o++)
    }), r
}

function mv(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(), t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n)
        }), e._status === -1 && (e._status = 0, e._result = t)
    }
    if (e._status === 1) return e._result.default;
    throw e._result
}
var Qe = {
        current: null
    },
    as = {
        transition: null
    },
    gv = {
        ReactCurrentDispatcher: Qe,
        ReactCurrentBatchConfig: as,
        ReactCurrentOwner: Ou
    };

function dp() {
    throw Error("act(...) is not supported in production builds of React.")
}
Z.Children = {
    map: zi,
    forEach: function(e, t, n) {
        zi(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return zi(e, function() {
            t++
        }), t
    },
    toArray: function(e) {
        return zi(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!ju(e)) throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
Z.Component = vo;
Z.Fragment = rv;
Z.Profiler = iv;
Z.PureComponent = Nu;
Z.StrictMode = ov;
Z.Suspense = uv;
Z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gv;
Z.act = dp;
Z.cloneElement = function(e, t, n) {
    if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = ip({}, e.props),
        o = e.key,
        i = e.ref,
        s = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (i = t.ref, s = Ou.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps) var l = e.type.defaultProps;
        for (a in t) ap.call(t, a) && !up.hasOwnProperty(a) && (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a])
    }
    var a = arguments.length - 2;
    if (a === 1) r.children = n;
    else if (1 < a) {
        l = Array(a);
        for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
        r.children = l
    }
    return {
        $$typeof: bi,
        type: e.type,
        key: o,
        ref: i,
        props: r,
        _owner: s
    }
};
Z.createContext = function(e) {
    return e = {
        $$typeof: lv,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    }, e.Provider = {
        $$typeof: sv,
        _context: e
    }, e.Consumer = e
};
Z.createElement = cp;
Z.createFactory = function(e) {
    var t = cp.bind(null, e);
    return t.type = e, t
};
Z.createRef = function() {
    return {
        current: null
    }
};
Z.forwardRef = function(e) {
    return {
        $$typeof: av,
        render: e
    }
};
Z.isValidElement = ju;
Z.lazy = function(e) {
    return {
        $$typeof: dv,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: mv
    }
};
Z.memo = function(e, t) {
    return {
        $$typeof: cv,
        type: e,
        compare: t === void 0 ? null : t
    }
};
Z.startTransition = function(e) {
    var t = as.transition;
    as.transition = {};
    try {
        e()
    } finally {
        as.transition = t
    }
};
Z.unstable_act = dp;
Z.useCallback = function(e, t) {
    return Qe.current.useCallback(e, t)
};
Z.useContext = function(e) {
    return Qe.current.useContext(e)
};
Z.useDebugValue = function() {};
Z.useDeferredValue = function(e) {
    return Qe.current.useDeferredValue(e)
};
Z.useEffect = function(e, t) {
    return Qe.current.useEffect(e, t)
};
Z.useId = function() {
    return Qe.current.useId()
};
Z.useImperativeHandle = function(e, t, n) {
    return Qe.current.useImperativeHandle(e, t, n)
};
Z.useInsertionEffect = function(e, t) {
    return Qe.current.useInsertionEffect(e, t)
};
Z.useLayoutEffect = function(e, t) {
    return Qe.current.useLayoutEffect(e, t)
};
Z.useMemo = function(e, t) {
    return Qe.current.useMemo(e, t)
};
Z.useReducer = function(e, t, n) {
    return Qe.current.useReducer(e, t, n)
};
Z.useRef = function(e) {
    return Qe.current.useRef(e)
};
Z.useState = function(e) {
    return Qe.current.useState(e)
};
Z.useSyncExternalStore = function(e, t, n) {
    return Qe.current.useSyncExternalStore(e, t, n)
};
Z.useTransition = function() {
    return Qe.current.useTransition()
};
Z.version = "18.3.1";
rp.exports = Z;
var x = rp.exports;
const _ = tp(x),
    fp = tv({
        __proto__: null,
        default: _
    }, [x]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vv = x,
    yv = Symbol.for("react.element"),
    wv = Symbol.for("react.fragment"),
    xv = Object.prototype.hasOwnProperty,
    Sv = vv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    Ev = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };

function pp(e, t, n) {
    var r, o = {},
        i = null,
        s = null;
    n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref);
    for (r in t) xv.call(t, r) && !Ev.hasOwnProperty(r) && (o[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps, t) o[r] === void 0 && (o[r] = t[r]);
    return {
        $$typeof: yv,
        type: e,
        key: i,
        ref: s,
        props: o,
        _owner: Sv.current
    }
}
tl.Fragment = wv;
tl.jsx = pp;
tl.jsxs = pp;
np.exports = tl;
var S = np.exports,
    hp = {
        exports: {}
    },
    dt = {},
    mp = {
        exports: {}
    },
    gp = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(N, P) {
        var M = N.length;
        N.push(P);
        e: for (; 0 < M;) {
            var z = M - 1 >>> 1,
                F = N[z];
            if (0 < o(F, P)) N[z] = P, N[M] = F, M = z;
            else break e
        }
    }

    function n(N) {
        return N.length === 0 ? null : N[0]
    }

    function r(N) {
        if (N.length === 0) return null;
        var P = N[0],
            M = N.pop();
        if (M !== P) {
            N[0] = M;
            e: for (var z = 0, F = N.length, Q = F >>> 1; z < Q;) {
                var K = 2 * (z + 1) - 1,
                    ie = N[K],
                    ve = K + 1,
                    Y = N[ve];
                if (0 > o(ie, M)) ve < F && 0 > o(Y, ie) ? (N[z] = Y, N[ve] = M, z = ve) : (N[z] = ie, N[K] = M, z = K);
                else if (ve < F && 0 > o(Y, M)) N[z] = Y, N[ve] = M, z = ve;
                else break e
            }
        }
        return P
    }

    function o(N, P) {
        var M = N.sortIndex - P.sortIndex;
        return M !== 0 ? M : N.id - P.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var i = performance;
        e.unstable_now = function() {
            return i.now()
        }
    } else {
        var s = Date,
            l = s.now();
        e.unstable_now = function() {
            return s.now() - l
        }
    }
    var a = [],
        u = [],
        c = 1,
        d = null,
        h = 3,
        f = !1,
        v = !1,
        g = !1,
        w = typeof setTimeout == "function" ? setTimeout : null,
        p = typeof clearTimeout == "function" ? clearTimeout : null,
        m = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);

    function y(N) {
        for (var P = n(u); P !== null;) {
            if (P.callback === null) r(u);
            else if (P.startTime <= N) r(u), P.sortIndex = P.expirationTime, t(a, P);
            else break;
            P = n(u)
        }
    }

    function E(N) {
        if (g = !1, y(N), !v)
            if (n(a) !== null) v = !0, U(C);
            else {
                var P = n(u);
                P !== null && H(E, P.startTime - N)
            }
    }

    function C(N, P) {
        v = !1, g && (g = !1, p(T), T = -1), f = !0;
        var M = h;
        try {
            for (y(P), d = n(a); d !== null && (!(d.expirationTime > P) || N && !D());) {
                var z = d.callback;
                if (typeof z == "function") {
                    d.callback = null, h = d.priorityLevel;
                    var F = z(d.expirationTime <= P);
                    P = e.unstable_now(), typeof F == "function" ? d.callback = F : d === n(a) && r(a), y(P)
                } else r(a);
                d = n(a)
            }
            if (d !== null) var Q = !0;
            else {
                var K = n(u);
                K !== null && H(E, K.startTime - P), Q = !1
            }
            return Q
        } finally {
            d = null, h = M, f = !1
        }
    }
    var k = !1,
        b = null,
        T = -1,
        j = 5,
        L = -1;

    function D() {
        return !(e.unstable_now() - L < j)
    }

    function I() {
        if (b !== null) {
            var N = e.unstable_now();
            L = N;
            var P = !0;
            try {
                P = b(!0, N)
            } finally {
                P ? W() : (k = !1, b = null)
            }
        } else k = !1
    }
    var W;
    if (typeof m == "function") W = function() {
        m(I)
    };
    else if (typeof MessageChannel < "u") {
        var O = new MessageChannel,
            V = O.port2;
        O.port1.onmessage = I, W = function() {
            V.postMessage(null)
        }
    } else W = function() {
        w(I, 0)
    };

    function U(N) {
        b = N, k || (k = !0, W())
    }

    function H(N, P) {
        T = w(function() {
            N(e.unstable_now())
        }, P)
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(N) {
        N.callback = null
    }, e.unstable_continueExecution = function() {
        v || f || (v = !0, U(C))
    }, e.unstable_forceFrameRate = function(N) {
        0 > N || 125 < N ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : j = 0 < N ? Math.floor(1e3 / N) : 5
    }, e.unstable_getCurrentPriorityLevel = function() {
        return h
    }, e.unstable_getFirstCallbackNode = function() {
        return n(a)
    }, e.unstable_next = function(N) {
        switch (h) {
            case 1:
            case 2:
            case 3:
                var P = 3;
                break;
            default:
                P = h
        }
        var M = h;
        h = P;
        try {
            return N()
        } finally {
            h = M
        }
    }, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e.unstable_runWithPriority = function(N, P) {
        switch (N) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                N = 3
        }
        var M = h;
        h = N;
        try {
            return P()
        } finally {
            h = M
        }
    }, e.unstable_scheduleCallback = function(N, P, M) {
        var z = e.unstable_now();
        switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? z + M : z) : M = z, N) {
            case 1:
                var F = -1;
                break;
            case 2:
                F = 250;
                break;
            case 5:
                F = 1073741823;
                break;
            case 4:
                F = 1e4;
                break;
            default:
                F = 5e3
        }
        return F = M + F, N = {
            id: c++,
            callback: P,
            priorityLevel: N,
            startTime: M,
            expirationTime: F,
            sortIndex: -1
        }, M > z ? (N.sortIndex = M, t(u, N), n(a) === null && N === n(u) && (g ? (p(T), T = -1) : g = !0, H(E, M - z))) : (N.sortIndex = F, t(a, N), v || f || (v = !0, U(C))), N
    }, e.unstable_shouldYield = D, e.unstable_wrapCallback = function(N) {
        var P = h;
        return function() {
            var M = h;
            h = P;
            try {
                return N.apply(this, arguments)
            } finally {
                h = M
            }
        }
    }
})(gp);
mp.exports = gp;
var Cv = mp.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bv = x,
    ct = Cv;

function A(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var vp = new Set,
    Zo = {};

function Pr(e, t) {
    lo(e, t), lo(e + "Capture", t)
}

function lo(e, t) {
    for (Zo[e] = t, e = 0; e < t.length; e++) vp.add(t[e])
}
var fn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    ga = Object.prototype.hasOwnProperty,
    kv = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    qc = {},
    Xc = {};

function Pv(e) {
    return ga.call(Xc, e) ? !0 : ga.call(qc, e) ? !1 : kv.test(e) ? Xc[e] = !0 : (qc[e] = !0, !1)
}

function Tv(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
        default:
            return !1
    }
}

function Nv(e, t, n, r) {
    if (t === null || typeof t > "u" || Tv(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
    }
    return !1
}

function Ke(e, t, n, r, o, i, s) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = s
}
var Ae = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    Ae[e] = new Ke(e, 0, !1, e, null, !1, !1)
});
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"]
].forEach(function(e) {
    var t = e[0];
    Ae[t] = new Ke(t, 1, !1, e[1], null, !1, !1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    Ae[e] = new Ke(e, 2, !1, e.toLowerCase(), null, !1, !1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    Ae[e] = new Ke(e, 2, !1, e, null, !1, !1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    Ae[e] = new Ke(e, 3, !1, e.toLowerCase(), null, !1, !1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    Ae[e] = new Ke(e, 3, !0, e, null, !1, !1)
});
["capture", "download"].forEach(function(e) {
    Ae[e] = new Ke(e, 4, !1, e, null, !1, !1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    Ae[e] = new Ke(e, 6, !1, e, null, !1, !1)
});
["rowSpan", "start"].forEach(function(e) {
    Ae[e] = new Ke(e, 5, !1, e.toLowerCase(), null, !1, !1)
});
var Lu = /[\-:]([a-z])/g;

function Au(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(Lu, Au);
    Ae[t] = new Ke(t, 1, !1, e, null, !1, !1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Lu, Au);
    Ae[t] = new Ke(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Lu, Au);
    Ae[t] = new Ke(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    Ae[e] = new Ke(e, 1, !1, e.toLowerCase(), null, !1, !1)
});
Ae.xlinkHref = new Ke("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
    Ae[e] = new Ke(e, 1, !1, e.toLowerCase(), null, !0, !0)
});

function Mu(e, t, n, r) {
    var o = Ae.hasOwnProperty(t) ? Ae[t] : null;
    (o !== null ? o.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Nv(t, n, o, r) && (n = null), r || o === null ? Pv(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : o.mustUseProperty ? e[o.propertyName] = n === null ? o.type === 3 ? !1 : "" : n : (t = o.attributeName, r = o.attributeNamespace, n === null ? e.removeAttribute(t) : (o = o.type, n = o === 3 || o === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var yn = bv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    $i = Symbol.for("react.element"),
    Lr = Symbol.for("react.portal"),
    Ar = Symbol.for("react.fragment"),
    _u = Symbol.for("react.strict_mode"),
    va = Symbol.for("react.profiler"),
    yp = Symbol.for("react.provider"),
    wp = Symbol.for("react.context"),
    Iu = Symbol.for("react.forward_ref"),
    ya = Symbol.for("react.suspense"),
    wa = Symbol.for("react.suspense_list"),
    Du = Symbol.for("react.memo"),
    Nn = Symbol.for("react.lazy"),
    xp = Symbol.for("react.offscreen"),
    Zc = Symbol.iterator;

function Po(e) {
    return e === null || typeof e != "object" ? null : (e = Zc && e[Zc] || e["@@iterator"], typeof e == "function" ? e : null)
}
var ge = Object.assign,
    Dl;

function Io(e) {
    if (Dl === void 0) try {
        throw Error()
    } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Dl = t && t[1] || ""
    }
    return `
` + Dl + e
}
var Fl = !1;

function zl(e, t) {
    if (!e || Fl) return "";
    Fl = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                    throw Error()
                }, Object.defineProperty(t.prototype, "props", {
                    set: function() {
                        throw Error()
                    }
                }), typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (u) {
                    var r = u
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (u) {
                    r = u
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (u) {
                r = u
            }
            e()
        }
    } catch (u) {
        if (u && r && typeof u.stack == "string") {
            for (var o = u.stack.split(`
`), i = r.stack.split(`
`), s = o.length - 1, l = i.length - 1; 1 <= s && 0 <= l && o[s] !== i[l];) l--;
            for (; 1 <= s && 0 <= l; s--, l--)
                if (o[s] !== i[l]) {
                    if (s !== 1 || l !== 1)
                        do
                            if (s--, l--, 0 > l || o[s] !== i[l]) {
                                var a = `
` + o[s].replace(" at new ", " at ");
                                return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a
                            } while (1 <= s && 0 <= l);
                    break
                }
        }
    } finally {
        Fl = !1, Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? Io(e) : ""
}

function Rv(e) {
    switch (e.tag) {
        case 5:
            return Io(e.type);
        case 16:
            return Io("Lazy");
        case 13:
            return Io("Suspense");
        case 19:
            return Io("SuspenseList");
        case 0:
        case 2:
        case 15:
            return e = zl(e.type, !1), e;
        case 11:
            return e = zl(e.type.render, !1), e;
        case 1:
            return e = zl(e.type, !0), e;
        default:
            return ""
    }
}

function xa(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case Ar:
            return "Fragment";
        case Lr:
            return "Portal";
        case va:
            return "Profiler";
        case _u:
            return "StrictMode";
        case ya:
            return "Suspense";
        case wa:
            return "SuspenseList"
    }
    if (typeof e == "object") switch (e.$$typeof) {
        case wp:
            return (e.displayName || "Context") + ".Consumer";
        case yp:
            return (e._context.displayName || "Context") + ".Provider";
        case Iu:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Du:
            return t = e.displayName || null, t !== null ? t : xa(e.type) || "Memo";
        case Nn:
            t = e._payload, e = e._init;
            try {
                return xa(e(t))
            } catch {}
    }
    return null
}

function Ov(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return xa(t);
        case 8:
            return t === _u ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t
    }
    return null
}

function Gn(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
    }
}

function Sp(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}

function jv(e) {
    var t = Sp(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var o = n.get,
            i = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return o.call(this)
            },
            set: function(s) {
                r = "" + s, i.call(this, s)
            }
        }), Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }), {
            getValue: function() {
                return r
            },
            setValue: function(s) {
                r = "" + s
            },
            stopTracking: function() {
                e._valueTracker = null, delete e[t]
            }
        }
    }
}

function Bi(e) {
    e._valueTracker || (e._valueTracker = jv(e))
}

function Ep(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return e && (r = Sp(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
}

function Cs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}

function Sa(e, t) {
    var n = t.checked;
    return ge({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}

function Jc(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    n = Gn(t.value != null ? t.value : n), e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}

function Cp(e, t) {
    t = t.checked, t != null && Mu(e, "checked", t, !1)
}

function Ea(e, t) {
    Cp(e, t);
    var n = Gn(t.value),
        r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? Ca(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ca(e, t.type, Gn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}

function ed(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
        t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n)
}

function Ca(e, t, n) {
    (t !== "number" || Cs(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var Do = Array.isArray;

function Hr(e, t, n, r) {
    if (e = e.options, t) {
        t = {};
        for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
        for (n = 0; n < e.length; n++) o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + Gn(n), t = null, o = 0; o < e.length; o++) {
            if (e[o].value === n) {
                e[o].selected = !0, r && (e[o].defaultSelected = !0);
                return
            }
            t !== null || e[o].disabled || (t = e[o])
        }
        t !== null && (t.selected = !0)
    }
}

function ba(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(A(91));
    return ge({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}

function td(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children, t = t.defaultValue, n != null) {
            if (t != null) throw Error(A(92));
            if (Do(n)) {
                if (1 < n.length) throw Error(A(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""), n = t
    }
    e._wrapperState = {
        initialValue: Gn(n)
    }
}

function bp(e, t) {
    var n = Gn(t.value),
        r = Gn(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r)
}

function nd(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}

function kp(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml"
    }
}

function ka(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? kp(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var Ui, Pp = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, o) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, o)
        })
    } : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
        for (Ui = Ui || document.createElement("div"), Ui.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Ui.firstChild; e.firstChild;) e.removeChild(e.firstChild);
        for (; t.firstChild;) e.appendChild(t.firstChild)
    }
});

function Jo(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var Bo = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    },
    Lv = ["Webkit", "ms", "Moz", "O"];
Object.keys(Bo).forEach(function(e) {
    Lv.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1), Bo[t] = Bo[e]
    })
});

function Tp(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Bo.hasOwnProperty(e) && Bo[e] ? ("" + t).trim() : t + "px"
}

function Np(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                o = Tp(n, t[n], r);
            n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : e[n] = o
        }
}
var Av = ge({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});

function Pa(e, t) {
    if (t) {
        if (Av[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(A(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(A(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(A(61))
        }
        if (t.style != null && typeof t.style != "object") throw Error(A(62))
    }
}

function Ta(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
    }
}
var Na = null;

function Fu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
}
var Ra = null,
    Wr = null,
    Qr = null;

function rd(e) {
    if (e = Ti(e)) {
        if (typeof Ra != "function") throw Error(A(280));
        var t = e.stateNode;
        t && (t = sl(t), Ra(e.stateNode, e.type, t))
    }
}

function Rp(e) {
    Wr ? Qr ? Qr.push(e) : Qr = [e] : Wr = e
}

function Op() {
    if (Wr) {
        var e = Wr,
            t = Qr;
        if (Qr = Wr = null, rd(e), t)
            for (e = 0; e < t.length; e++) rd(t[e])
    }
}

function jp(e, t) {
    return e(t)
}

function Lp() {}
var $l = !1;

function Ap(e, t, n) {
    if ($l) return e(t, n);
    $l = !0;
    try {
        return jp(e, t, n)
    } finally {
        $l = !1, (Wr !== null || Qr !== null) && (Lp(), Op())
    }
}

function ei(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = sl(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
            break e;
        default:
            e = !1
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(A(231, t, typeof n));
    return n
}
var Oa = !1;
if (fn) try {
    var To = {};
    Object.defineProperty(To, "passive", {
        get: function() {
            Oa = !0
        }
    }), window.addEventListener("test", To, To), window.removeEventListener("test", To, To)
} catch {
    Oa = !1
}

function Mv(e, t, n, r, o, i, s, l, a) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, u)
    } catch (c) {
        this.onError(c)
    }
}
var Uo = !1,
    bs = null,
    ks = !1,
    ja = null,
    _v = {
        onError: function(e) {
            Uo = !0, bs = e
        }
    };

function Iv(e, t, n, r, o, i, s, l, a) {
    Uo = !1, bs = null, Mv.apply(_v, arguments)
}

function Dv(e, t, n, r, o, i, s, l, a) {
    if (Iv.apply(this, arguments), Uo) {
        if (Uo) {
            var u = bs;
            Uo = !1, bs = null
        } else throw Error(A(198));
        ks || (ks = !0, ja = u)
    }
}

function Tr(e) {
    var t = e,
        n = e;
    if (e.alternate)
        for (; t.return;) t = t.return;
    else {
        e = t;
        do t = e, t.flags & 4098 && (n = t.return), e = t.return; while (e)
    }
    return t.tag === 3 ? n : null
}

function Mp(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
    }
    return null
}

function od(e) {
    if (Tr(e) !== e) throw Error(A(188))
}

function Fv(e) {
    var t = e.alternate;
    if (!t) {
        if (t = Tr(e), t === null) throw Error(A(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t;;) {
        var o = n.return;
        if (o === null) break;
        var i = o.alternate;
        if (i === null) {
            if (r = o.return, r !== null) {
                n = r;
                continue
            }
            break
        }
        if (o.child === i.child) {
            for (i = o.child; i;) {
                if (i === n) return od(o), e;
                if (i === r) return od(o), t;
                i = i.sibling
            }
            throw Error(A(188))
        }
        if (n.return !== r.return) n = o, r = i;
        else {
            for (var s = !1, l = o.child; l;) {
                if (l === n) {
                    s = !0, n = o, r = i;
                    break
                }
                if (l === r) {
                    s = !0, r = o, n = i;
                    break
                }
                l = l.sibling
            }
            if (!s) {
                for (l = i.child; l;) {
                    if (l === n) {
                        s = !0, n = i, r = o;
                        break
                    }
                    if (l === r) {
                        s = !0, r = i, n = o;
                        break
                    }
                    l = l.sibling
                }
                if (!s) throw Error(A(189))
            }
        }
        if (n.alternate !== r) throw Error(A(190))
    }
    if (n.tag !== 3) throw Error(A(188));
    return n.stateNode.current === n ? e : t
}

function _p(e) {
    return e = Fv(e), e !== null ? Ip(e) : null
}

function Ip(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null;) {
        var t = Ip(e);
        if (t !== null) return t;
        e = e.sibling
    }
    return null
}
var Dp = ct.unstable_scheduleCallback,
    id = ct.unstable_cancelCallback,
    zv = ct.unstable_shouldYield,
    $v = ct.unstable_requestPaint,
    Se = ct.unstable_now,
    Bv = ct.unstable_getCurrentPriorityLevel,
    zu = ct.unstable_ImmediatePriority,
    Fp = ct.unstable_UserBlockingPriority,
    Ps = ct.unstable_NormalPriority,
    Uv = ct.unstable_LowPriority,
    zp = ct.unstable_IdlePriority,
    nl = null,
    Xt = null;

function Vv(e) {
    if (Xt && typeof Xt.onCommitFiberRoot == "function") try {
        Xt.onCommitFiberRoot(nl, e, void 0, (e.current.flags & 128) === 128)
    } catch {}
}
var It = Math.clz32 ? Math.clz32 : Qv,
    Hv = Math.log,
    Wv = Math.LN2;

function Qv(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Hv(e) / Wv | 0) | 0
}
var Vi = 64,
    Hi = 4194304;

function Fo(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e
    }
}

function Ts(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        o = e.suspendedLanes,
        i = e.pingedLanes,
        s = n & 268435455;
    if (s !== 0) {
        var l = s & ~o;
        l !== 0 ? r = Fo(l) : (i &= s, i !== 0 && (r = Fo(i)))
    } else s = n & ~o, s !== 0 ? r = Fo(s) : i !== 0 && (r = Fo(i));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && !(t & o) && (o = r & -r, i = t & -t, o >= i || o === 16 && (i & 4194240) !== 0)) return t;
    if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
        for (e = e.entanglements, t &= r; 0 < t;) n = 31 - It(t), o = 1 << n, r |= e[n], t &= ~o;
    return r
}

function Kv(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
    }
}

function Gv(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, o = e.expirationTimes, i = e.pendingLanes; 0 < i;) {
        var s = 31 - It(i),
            l = 1 << s,
            a = o[s];
        a === -1 ? (!(l & n) || l & r) && (o[s] = Kv(l, t)) : a <= t && (e.expiredLanes |= l), i &= ~l
    }
}

function La(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}

function $p() {
    var e = Vi;
    return Vi <<= 1, !(Vi & 4194240) && (Vi = 64), e
}

function Bl(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t
}

function ki(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - It(t), e[t] = n
}

function Yv(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n;) {
        var o = 31 - It(n),
            i = 1 << o;
        t[o] = 0, r[o] = -1, e[o] = -1, n &= ~i
    }
}

function $u(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n;) {
        var r = 31 - It(n),
            o = 1 << r;
        o & t | e[r] & t && (e[r] |= t), n &= ~o
    }
}
var oe = 0;

function Bp(e) {
    return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var Up, Bu, Vp, Hp, Wp, Aa = !1,
    Wi = [],
    $n = null,
    Bn = null,
    Un = null,
    ti = new Map,
    ni = new Map,
    On = [],
    qv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

function sd(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            $n = null;
            break;
        case "dragenter":
        case "dragleave":
            Bn = null;
            break;
        case "mouseover":
        case "mouseout":
            Un = null;
            break;
        case "pointerover":
        case "pointerout":
            ti.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            ni.delete(t.pointerId)
    }
}

function No(e, t, n, r, o, i) {
    return e === null || e.nativeEvent !== i ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o]
    }, t !== null && (t = Ti(t), t !== null && Bu(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e)
}

function Xv(e, t, n, r, o) {
    switch (t) {
        case "focusin":
            return $n = No($n, e, t, n, r, o), !0;
        case "dragenter":
            return Bn = No(Bn, e, t, n, r, o), !0;
        case "mouseover":
            return Un = No(Un, e, t, n, r, o), !0;
        case "pointerover":
            var i = o.pointerId;
            return ti.set(i, No(ti.get(i) || null, e, t, n, r, o)), !0;
        case "gotpointercapture":
            return i = o.pointerId, ni.set(i, No(ni.get(i) || null, e, t, n, r, o)), !0
    }
    return !1
}

function Qp(e) {
    var t = ar(e.target);
    if (t !== null) {
        var n = Tr(t);
        if (n !== null) {
            if (t = n.tag, t === 13) {
                if (t = Mp(n), t !== null) {
                    e.blockedOn = t, Wp(e.priority, function() {
                        Vp(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}

function us(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
        var n = Ma(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            Na = r, n.target.dispatchEvent(r), Na = null
        } else return t = Ti(n), t !== null && Bu(t), e.blockedOn = n, !1;
        t.shift()
    }
    return !0
}

function ld(e, t, n) {
    us(e) && n.delete(t)
}

function Zv() {
    Aa = !1, $n !== null && us($n) && ($n = null), Bn !== null && us(Bn) && (Bn = null), Un !== null && us(Un) && (Un = null), ti.forEach(ld), ni.forEach(ld)
}

function Ro(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Aa || (Aa = !0, ct.unstable_scheduleCallback(ct.unstable_NormalPriority, Zv)))
}

function ri(e) {
    function t(o) {
        return Ro(o, e)
    }
    if (0 < Wi.length) {
        Ro(Wi[0], e);
        for (var n = 1; n < Wi.length; n++) {
            var r = Wi[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for ($n !== null && Ro($n, e), Bn !== null && Ro(Bn, e), Un !== null && Ro(Un, e), ti.forEach(t), ni.forEach(t), n = 0; n < On.length; n++) r = On[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < On.length && (n = On[0], n.blockedOn === null);) Qp(n), n.blockedOn === null && On.shift()
}
var Kr = yn.ReactCurrentBatchConfig,
    Ns = !0;

function Jv(e, t, n, r) {
    var o = oe,
        i = Kr.transition;
    Kr.transition = null;
    try {
        oe = 1, Uu(e, t, n, r)
    } finally {
        oe = o, Kr.transition = i
    }
}

function e0(e, t, n, r) {
    var o = oe,
        i = Kr.transition;
    Kr.transition = null;
    try {
        oe = 4, Uu(e, t, n, r)
    } finally {
        oe = o, Kr.transition = i
    }
}

function Uu(e, t, n, r) {
    if (Ns) {
        var o = Ma(e, t, n, r);
        if (o === null) Xl(e, t, r, Rs, n), sd(e, r);
        else if (Xv(o, e, t, n, r)) r.stopPropagation();
        else if (sd(e, r), t & 4 && -1 < qv.indexOf(e)) {
            for (; o !== null;) {
                var i = Ti(o);
                if (i !== null && Up(i), i = Ma(e, t, n, r), i === null && Xl(e, t, r, Rs, n), i === o) break;
                o = i
            }
            o !== null && r.stopPropagation()
        } else Xl(e, t, r, null, n)
    }
}
var Rs = null;

function Ma(e, t, n, r) {
    if (Rs = null, e = Fu(r), e = ar(e), e !== null)
        if (t = Tr(e), t === null) e = null;
        else if (n = t.tag, n === 13) {
        if (e = Mp(t), e !== null) return e;
        e = null
    } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null
    } else t !== e && (e = null);
    return Rs = e, null
}

function Kp(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (Bv()) {
                case zu:
                    return 1;
                case Fp:
                    return 4;
                case Ps:
                case Uv:
                    return 16;
                case zp:
                    return 536870912;
                default:
                    return 16
            }
        default:
            return 16
    }
}
var Dn = null,
    Vu = null,
    cs = null;

function Gp() {
    if (cs) return cs;
    var e, t = Vu,
        n = t.length,
        r, o = "value" in Dn ? Dn.value : Dn.textContent,
        i = o.length;
    for (e = 0; e < n && t[e] === o[e]; e++);
    var s = n - e;
    for (r = 1; r <= s && t[n - r] === o[i - r]; r++);
    return cs = o.slice(e, 1 < r ? 1 - r : void 0)
}

function ds(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
}

function Qi() {
    return !0
}

function ad() {
    return !1
}

function ft(e) {
    function t(n, r, o, i, s) {
        this._reactName = n, this._targetInst = o, this.type = r, this.nativeEvent = i, this.target = s, this.currentTarget = null;
        for (var l in e) e.hasOwnProperty(l) && (n = e[l], this[l] = n ? n(i) : i[l]);
        return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Qi : ad, this.isPropagationStopped = ad, this
    }
    return ge(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Qi)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Qi)
        },
        persist: function() {},
        isPersistent: Qi
    }), t
}
var yo = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    },
    Hu = ft(yo),
    Pi = ge({}, yo, {
        view: 0,
        detail: 0
    }),
    t0 = ft(Pi),
    Ul, Vl, Oo, rl = ge({}, Pi, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Wu,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX" in e ? e.movementX : (e !== Oo && (Oo && e.type === "mousemove" ? (Ul = e.screenX - Oo.screenX, Vl = e.screenY - Oo.screenY) : Vl = Ul = 0, Oo = e), Ul)
        },
        movementY: function(e) {
            return "movementY" in e ? e.movementY : Vl
        }
    }),
    ud = ft(rl),
    n0 = ge({}, rl, {
        dataTransfer: 0
    }),
    r0 = ft(n0),
    o0 = ge({}, Pi, {
        relatedTarget: 0
    }),
    Hl = ft(o0),
    i0 = ge({}, yo, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    s0 = ft(i0),
    l0 = ge({}, yo, {
        clipboardData: function(e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData
        }
    }),
    a0 = ft(l0),
    u0 = ge({}, yo, {
        data: 0
    }),
    cd = ft(u0),
    c0 = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    },
    d0 = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    },
    f0 = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };

function p0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = f0[e]) ? !!t[e] : !1
}

function Wu() {
    return p0
}
var h0 = ge({}, Pi, {
        key: function(e) {
            if (e.key) {
                var t = c0[e.key] || e.key;
                if (t !== "Unidentified") return t
            }
            return e.type === "keypress" ? (e = ds(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? d0[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Wu,
        charCode: function(e) {
            return e.type === "keypress" ? ds(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? ds(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    }),
    m0 = ft(h0),
    g0 = ge({}, rl, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    }),
    dd = ft(g0),
    v0 = ge({}, Pi, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Wu
    }),
    y0 = ft(v0),
    w0 = ge({}, yo, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    x0 = ft(w0),
    S0 = ge({}, rl, {
        deltaX: function(e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    }),
    E0 = ft(S0),
    C0 = [9, 13, 27, 32],
    Qu = fn && "CompositionEvent" in window,
    Vo = null;
fn && "documentMode" in document && (Vo = document.documentMode);
var b0 = fn && "TextEvent" in window && !Vo,
    Yp = fn && (!Qu || Vo && 8 < Vo && 11 >= Vo),
    fd = " ",
    pd = !1;

function qp(e, t) {
    switch (e) {
        case "keyup":
            return C0.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
    }
}

function Xp(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
}
var Mr = !1;

function k0(e, t) {
    switch (e) {
        case "compositionend":
            return Xp(t);
        case "keypress":
            return t.which !== 32 ? null : (pd = !0, fd);
        case "textInput":
            return e = t.data, e === fd && pd ? null : e;
        default:
            return null
    }
}

function P0(e, t) {
    if (Mr) return e === "compositionend" || !Qu && qp(e, t) ? (e = Gp(), cs = Vu = Dn = null, Mr = !1, e) : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return Yp && t.locale !== "ko" ? null : t.data;
        default:
            return null
    }
}
var T0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};

function hd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!T0[e.type] : t === "textarea"
}

function Zp(e, t, n, r) {
    Rp(r), t = Os(t, "onChange"), 0 < t.length && (n = new Hu("onChange", "change", null, n, r), e.push({
        event: n,
        listeners: t
    }))
}
var Ho = null,
    oi = null;

function N0(e) {
    uh(e, 0)
}

function ol(e) {
    var t = Dr(e);
    if (Ep(t)) return e
}

function R0(e, t) {
    if (e === "change") return t
}
var Jp = !1;
if (fn) {
    var Wl;
    if (fn) {
        var Ql = "oninput" in document;
        if (!Ql) {
            var md = document.createElement("div");
            md.setAttribute("oninput", "return;"), Ql = typeof md.oninput == "function"
        }
        Wl = Ql
    } else Wl = !1;
    Jp = Wl && (!document.documentMode || 9 < document.documentMode)
}

function gd() {
    Ho && (Ho.detachEvent("onpropertychange", eh), oi = Ho = null)
}

function eh(e) {
    if (e.propertyName === "value" && ol(oi)) {
        var t = [];
        Zp(t, oi, e, Fu(e)), Ap(N0, t)
    }
}

function O0(e, t, n) {
    e === "focusin" ? (gd(), Ho = t, oi = n, Ho.attachEvent("onpropertychange", eh)) : e === "focusout" && gd()
}

function j0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return ol(oi)
}

function L0(e, t) {
    if (e === "click") return ol(t)
}

function A0(e, t) {
    if (e === "input" || e === "change") return ol(t)
}

function M0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var zt = typeof Object.is == "function" ? Object.is : M0;

function ii(e, t) {
    if (zt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var o = n[r];
        if (!ga.call(t, o) || !zt(e[o], t[o])) return !1
    }
    return !0
}

function vd(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e
}

function yd(e, t) {
    var n = vd(e);
    e = 0;
    for (var r; n;) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length, e <= t && r >= t) return {
                node: n,
                offset: t - e
            };
            e = r
        }
        e: {
            for (; n;) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = vd(n)
    }
}

function th(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? th(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}

function nh() {
    for (var e = window, t = Cs(); t instanceof e.HTMLIFrameElement;) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n) e = t.contentWindow;
        else break;
        t = Cs(e.document)
    }
    return t
}

function Ku(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}

function _0(e) {
    var t = nh(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && th(n.ownerDocument.documentElement, n)) {
        if (r !== null && Ku(n)) {
            if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
                e = e.getSelection();
                var o = n.textContent.length,
                    i = Math.min(r.start, o);
                r = r.end === void 0 ? i : Math.min(r.end, o), !e.extend && i > r && (o = r, r = i, i = o), o = yd(n, i);
                var s = yd(n, r);
                o && s && (e.rangeCount !== 1 || e.anchorNode !== o.node || e.anchorOffset !== o.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(o.node, o.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)))
            }
        }
        for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
            element: e,
            left: e.scrollLeft,
            top: e.scrollTop
        });
        for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top
    }
}
var I0 = fn && "documentMode" in document && 11 >= document.documentMode,
    _r = null,
    _a = null,
    Wo = null,
    Ia = !1;

function wd(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ia || _r == null || _r !== Cs(r) || (r = _r, "selectionStart" in r && Ku(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }), Wo && ii(Wo, r) || (Wo = r, r = Os(_a, "onSelect"), 0 < r.length && (t = new Hu("onSelect", "select", null, t, n), e.push({
        event: t,
        listeners: r
    }), t.target = _r)))
}

function Ki(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
}
var Ir = {
        animationend: Ki("Animation", "AnimationEnd"),
        animationiteration: Ki("Animation", "AnimationIteration"),
        animationstart: Ki("Animation", "AnimationStart"),
        transitionend: Ki("Transition", "TransitionEnd")
    },
    Kl = {},
    rh = {};
fn && (rh = document.createElement("div").style, "AnimationEvent" in window || (delete Ir.animationend.animation, delete Ir.animationiteration.animation, delete Ir.animationstart.animation), "TransitionEvent" in window || delete Ir.transitionend.transition);

function il(e) {
    if (Kl[e]) return Kl[e];
    if (!Ir[e]) return e;
    var t = Ir[e],
        n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in rh) return Kl[e] = t[n];
    return e
}
var oh = il("animationend"),
    ih = il("animationiteration"),
    sh = il("animationstart"),
    lh = il("transitionend"),
    ah = new Map,
    xd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");

function er(e, t) {
    ah.set(e, t), Pr(t, [e])
}
for (var Gl = 0; Gl < xd.length; Gl++) {
    var Yl = xd[Gl],
        D0 = Yl.toLowerCase(),
        F0 = Yl[0].toUpperCase() + Yl.slice(1);
    er(D0, "on" + F0)
}
er(oh, "onAnimationEnd");
er(ih, "onAnimationIteration");
er(sh, "onAnimationStart");
er("dblclick", "onDoubleClick");
er("focusin", "onFocus");
er("focusout", "onBlur");
er(lh, "onTransitionEnd");
lo("onMouseEnter", ["mouseout", "mouseover"]);
lo("onMouseLeave", ["mouseout", "mouseover"]);
lo("onPointerEnter", ["pointerout", "pointerover"]);
lo("onPointerLeave", ["pointerout", "pointerover"]);
Pr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Pr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Pr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Pr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Pr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Pr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var zo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    z0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(zo));

function Sd(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, Dv(r, t, void 0, e), e.currentTarget = null
}

function uh(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            o = r.event;
        r = r.listeners;
        e: {
            var i = void 0;
            if (t)
                for (var s = r.length - 1; 0 <= s; s--) {
                    var l = r[s],
                        a = l.instance,
                        u = l.currentTarget;
                    if (l = l.listener, a !== i && o.isPropagationStopped()) break e;
                    Sd(o, l, u), i = a
                } else
                    for (s = 0; s < r.length; s++) {
                        if (l = r[s], a = l.instance, u = l.currentTarget, l = l.listener, a !== i && o.isPropagationStopped()) break e;
                        Sd(o, l, u), i = a
                    }
        }
    }
    if (ks) throw e = ja, ks = !1, ja = null, e
}

function ce(e, t) {
    var n = t[Ba];
    n === void 0 && (n = t[Ba] = new Set);
    var r = e + "__bubble";
    n.has(r) || (ch(t, e, 2, !1), n.add(r))
}

function ql(e, t, n) {
    var r = 0;
    t && (r |= 4), ch(n, e, r, t)
}
var Gi = "_reactListening" + Math.random().toString(36).slice(2);

function si(e) {
    if (!e[Gi]) {
        e[Gi] = !0, vp.forEach(function(n) {
            n !== "selectionchange" && (z0.has(n) || ql(n, !1, e), ql(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Gi] || (t[Gi] = !0, ql("selectionchange", !1, t))
    }
}

function ch(e, t, n, r) {
    switch (Kp(t)) {
        case 1:
            var o = Jv;
            break;
        case 4:
            o = e0;
            break;
        default:
            o = Uu
    }
    n = o.bind(null, t, n, e), o = void 0, !Oa || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), r ? o !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: o
    }) : e.addEventListener(t, n, !0) : o !== void 0 ? e.addEventListener(t, n, {
        passive: o
    }) : e.addEventListener(t, n, !1)
}

function Xl(e, t, n, r, o) {
    var i = r;
    if (!(t & 1) && !(t & 2) && r !== null) e: for (;;) {
        if (r === null) return;
        var s = r.tag;
        if (s === 3 || s === 4) {
            var l = r.stateNode.containerInfo;
            if (l === o || l.nodeType === 8 && l.parentNode === o) break;
            if (s === 4)
                for (s = r.return; s !== null;) {
                    var a = s.tag;
                    if ((a === 3 || a === 4) && (a = s.stateNode.containerInfo, a === o || a.nodeType === 8 && a.parentNode === o)) return;
                    s = s.return
                }
            for (; l !== null;) {
                if (s = ar(l), s === null) return;
                if (a = s.tag, a === 5 || a === 6) {
                    r = i = s;
                    continue e
                }
                l = l.parentNode
            }
        }
        r = r.return
    }
    Ap(function() {
        var u = i,
            c = Fu(n),
            d = [];
        e: {
            var h = ah.get(e);
            if (h !== void 0) {
                var f = Hu,
                    v = e;
                switch (e) {
                    case "keypress":
                        if (ds(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        f = m0;
                        break;
                    case "focusin":
                        v = "focus", f = Hl;
                        break;
                    case "focusout":
                        v = "blur", f = Hl;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        f = Hl;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        f = ud;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        f = r0;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        f = y0;
                        break;
                    case oh:
                    case ih:
                    case sh:
                        f = s0;
                        break;
                    case lh:
                        f = x0;
                        break;
                    case "scroll":
                        f = t0;
                        break;
                    case "wheel":
                        f = E0;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        f = a0;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        f = dd
                }
                var g = (t & 4) !== 0,
                    w = !g && e === "scroll",
                    p = g ? h !== null ? h + "Capture" : null : h;
                g = [];
                for (var m = u, y; m !== null;) {
                    y = m;
                    var E = y.stateNode;
                    if (y.tag === 5 && E !== null && (y = E, p !== null && (E = ei(m, p), E != null && g.push(li(m, E, y)))), w) break;
                    m = m.return
                }
                0 < g.length && (h = new f(h, v, null, n, c), d.push({
                    event: h,
                    listeners: g
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (h = e === "mouseover" || e === "pointerover", f = e === "mouseout" || e === "pointerout", h && n !== Na && (v = n.relatedTarget || n.fromElement) && (ar(v) || v[pn])) break e;
                if ((f || h) && (h = c.window === c ? c : (h = c.ownerDocument) ? h.defaultView || h.parentWindow : window, f ? (v = n.relatedTarget || n.toElement, f = u, v = v ? ar(v) : null, v !== null && (w = Tr(v), v !== w || v.tag !== 5 && v.tag !== 6) && (v = null)) : (f = null, v = u), f !== v)) {
                    if (g = ud, E = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (g = dd, E = "onPointerLeave", p = "onPointerEnter", m = "pointer"), w = f == null ? h : Dr(f), y = v == null ? h : Dr(v), h = new g(E, m + "leave", f, n, c), h.target = w, h.relatedTarget = y, E = null, ar(c) === u && (g = new g(p, m + "enter", v, n, c), g.target = y, g.relatedTarget = w, E = g), w = E, f && v) t: {
                        for (g = f, p = v, m = 0, y = g; y; y = jr(y)) m++;
                        for (y = 0, E = p; E; E = jr(E)) y++;
                        for (; 0 < m - y;) g = jr(g),
                        m--;
                        for (; 0 < y - m;) p = jr(p),
                        y--;
                        for (; m--;) {
                            if (g === p || p !== null && g === p.alternate) break t;
                            g = jr(g), p = jr(p)
                        }
                        g = null
                    }
                    else g = null;
                    f !== null && Ed(d, h, f, g, !1), v !== null && w !== null && Ed(d, w, v, g, !0)
                }
            }
            e: {
                if (h = u ? Dr(u) : window, f = h.nodeName && h.nodeName.toLowerCase(), f === "select" || f === "input" && h.type === "file") var C = R0;
                else if (hd(h))
                    if (Jp) C = A0;
                    else {
                        C = j0;
                        var k = O0
                    }
                else(f = h.nodeName) && f.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (C = L0);
                if (C && (C = C(e, u))) {
                    Zp(d, C, n, c);
                    break e
                }
                k && k(e, h, u),
                e === "focusout" && (k = h._wrapperState) && k.controlled && h.type === "number" && Ca(h, "number", h.value)
            }
            switch (k = u ? Dr(u) : window, e) {
                case "focusin":
                    (hd(k) || k.contentEditable === "true") && (_r = k, _a = u, Wo = null);
                    break;
                case "focusout":
                    Wo = _a = _r = null;
                    break;
                case "mousedown":
                    Ia = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    Ia = !1, wd(d, n, c);
                    break;
                case "selectionchange":
                    if (I0) break;
                case "keydown":
                case "keyup":
                    wd(d, n, c)
            }
            var b;
            if (Qu) e: {
                switch (e) {
                    case "compositionstart":
                        var T = "onCompositionStart";
                        break e;
                    case "compositionend":
                        T = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        T = "onCompositionUpdate";
                        break e
                }
                T = void 0
            }
            else Mr ? qp(e, n) && (T = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");T && (Yp && n.locale !== "ko" && (Mr || T !== "onCompositionStart" ? T === "onCompositionEnd" && Mr && (b = Gp()) : (Dn = c, Vu = "value" in Dn ? Dn.value : Dn.textContent, Mr = !0)), k = Os(u, T), 0 < k.length && (T = new cd(T, e, null, n, c), d.push({
                event: T,
                listeners: k
            }), b ? T.data = b : (b = Xp(n), b !== null && (T.data = b)))),
            (b = b0 ? k0(e, n) : P0(e, n)) && (u = Os(u, "onBeforeInput"), 0 < u.length && (c = new cd("onBeforeInput", "beforeinput", null, n, c), d.push({
                event: c,
                listeners: u
            }), c.data = b))
        }
        uh(d, t)
    })
}

function li(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}

function Os(e, t) {
    for (var n = t + "Capture", r = []; e !== null;) {
        var o = e,
            i = o.stateNode;
        o.tag === 5 && i !== null && (o = i, i = ei(e, n), i != null && r.unshift(li(e, i, o)), i = ei(e, t), i != null && r.push(li(e, i, o))), e = e.return
    }
    return r
}

function jr(e) {
    if (e === null) return null;
    do e = e.return; while (e && e.tag !== 5);
    return e || null
}

function Ed(e, t, n, r, o) {
    for (var i = t._reactName, s = []; n !== null && n !== r;) {
        var l = n,
            a = l.alternate,
            u = l.stateNode;
        if (a !== null && a === r) break;
        l.tag === 5 && u !== null && (l = u, o ? (a = ei(n, i), a != null && s.unshift(li(n, a, l))) : o || (a = ei(n, i), a != null && s.push(li(n, a, l)))), n = n.return
    }
    s.length !== 0 && e.push({
        event: t,
        listeners: s
    })
}
var $0 = /\r\n?/g,
    B0 = /\u0000|\uFFFD/g;

function Cd(e) {
    return (typeof e == "string" ? e : "" + e).replace($0, `
`).replace(B0, "")
}

function Yi(e, t, n) {
    if (t = Cd(t), Cd(e) !== t && n) throw Error(A(425))
}

function js() {}
var Da = null,
    Fa = null;

function za(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var $a = typeof setTimeout == "function" ? setTimeout : void 0,
    U0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    bd = typeof Promise == "function" ? Promise : void 0,
    V0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof bd < "u" ? function(e) {
        return bd.resolve(null).then(e).catch(H0)
    } : $a;

function H0(e) {
    setTimeout(function() {
        throw e
    })
}

function Zl(e, t) {
    var n = t,
        r = 0;
    do {
        var o = n.nextSibling;
        if (e.removeChild(n), o && o.nodeType === 8)
            if (n = o.data, n === "/$") {
                if (r === 0) {
                    e.removeChild(o), ri(t);
                    return
                }
                r--
            } else n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = o
    } while (n);
    ri(t)
}

function Vn(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
            if (t === "/$") return null
        }
    }
    return e
}

function kd(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--
            } else n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var wo = Math.random().toString(36).slice(2),
    Yt = "__reactFiber$" + wo,
    ai = "__reactProps$" + wo,
    pn = "__reactContainer$" + wo,
    Ba = "__reactEvents$" + wo,
    W0 = "__reactListeners$" + wo,
    Q0 = "__reactHandles$" + wo;

function ar(e) {
    var t = e[Yt];
    if (t) return t;
    for (var n = e.parentNode; n;) {
        if (t = n[pn] || n[Yt]) {
            if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
                for (e = kd(e); e !== null;) {
                    if (n = e[Yt]) return n;
                    e = kd(e)
                }
            return t
        }
        e = n, n = e.parentNode
    }
    return null
}

function Ti(e) {
    return e = e[Yt] || e[pn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}

function Dr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(A(33))
}

function sl(e) {
    return e[ai] || null
}
var Ua = [],
    Fr = -1;

function tr(e) {
    return {
        current: e
    }
}

function de(e) {
    0 > Fr || (e.current = Ua[Fr], Ua[Fr] = null, Fr--)
}

function le(e, t) {
    Fr++, Ua[Fr] = e.current, e.current = t
}
var Yn = {},
    ze = tr(Yn),
    Ze = tr(!1),
    wr = Yn;

function ao(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Yn;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var o = {},
        i;
    for (i in n) o[i] = t[i];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o
}

function Je(e) {
    return e = e.childContextTypes, e != null
}

function Ls() {
    de(Ze), de(ze)
}

function Pd(e, t, n) {
    if (ze.current !== Yn) throw Error(A(168));
    le(ze, t), le(Ze, n)
}

function dh(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var o in r)
        if (!(o in t)) throw Error(A(108, Ov(e) || "Unknown", o));
    return ge({}, n, r)
}

function As(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Yn, wr = ze.current, le(ze, e), le(Ze, Ze.current), !0
}

function Td(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(A(169));
    n ? (e = dh(e, t, wr), r.__reactInternalMemoizedMergedChildContext = e, de(Ze), de(ze), le(ze, e)) : de(Ze), le(Ze, n)
}
var ln = null,
    ll = !1,
    Jl = !1;

function fh(e) {
    ln === null ? ln = [e] : ln.push(e)
}

function K0(e) {
    ll = !0, fh(e)
}

function nr() {
    if (!Jl && ln !== null) {
        Jl = !0;
        var e = 0,
            t = oe;
        try {
            var n = ln;
            for (oe = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0); while (r !== null)
            }
            ln = null, ll = !1
        } catch (o) {
            throw ln !== null && (ln = ln.slice(e + 1)), Dp(zu, nr), o
        } finally {
            oe = t, Jl = !1
        }
    }
    return null
}
var zr = [],
    $r = 0,
    Ms = null,
    _s = 0,
    ht = [],
    mt = 0,
    xr = null,
    un = 1,
    cn = "";

function sr(e, t) {
    zr[$r++] = _s, zr[$r++] = Ms, Ms = e, _s = t
}

function ph(e, t, n) {
    ht[mt++] = un, ht[mt++] = cn, ht[mt++] = xr, xr = e;
    var r = un;
    e = cn;
    var o = 32 - It(r) - 1;
    r &= ~(1 << o), n += 1;
    var i = 32 - It(t) + o;
    if (30 < i) {
        var s = o - o % 5;
        i = (r & (1 << s) - 1).toString(32), r >>= s, o -= s, un = 1 << 32 - It(t) + o | n << o | r, cn = i + e
    } else un = 1 << i | n << o | r, cn = e
}

function Gu(e) {
    e.return !== null && (sr(e, 1), ph(e, 1, 0))
}

function Yu(e) {
    for (; e === Ms;) Ms = zr[--$r], zr[$r] = null, _s = zr[--$r], zr[$r] = null;
    for (; e === xr;) xr = ht[--mt], ht[mt] = null, cn = ht[--mt], ht[mt] = null, un = ht[--mt], ht[mt] = null
}
var at = null,
    lt = null,
    fe = !1,
    _t = null;

function hh(e, t) {
    var n = gt(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n)
}

function Nd(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, at = e, lt = Vn(t.firstChild), !0) : !1;
        case 6:
            return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, at = e, lt = null, !0) : !1;
        case 13:
            return t = t.nodeType !== 8 ? null : t, t !== null ? (n = xr !== null ? {
                id: un,
                overflow: cn
            } : null, e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824
            }, n = gt(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, at = e, lt = null, !0) : !1;
        default:
            return !1
    }
}

function Va(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}

function Ha(e) {
    if (fe) {
        var t = lt;
        if (t) {
            var n = t;
            if (!Nd(e, t)) {
                if (Va(e)) throw Error(A(418));
                t = Vn(n.nextSibling);
                var r = at;
                t && Nd(e, t) ? hh(r, n) : (e.flags = e.flags & -4097 | 2, fe = !1, at = e)
            }
        } else {
            if (Va(e)) throw Error(A(418));
            e.flags = e.flags & -4097 | 2, fe = !1, at = e
        }
    }
}

function Rd(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
    at = e
}

function qi(e) {
    if (e !== at) return !1;
    if (!fe) return Rd(e), fe = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !za(e.type, e.memoizedProps)), t && (t = lt)) {
        if (Va(e)) throw mh(), Error(A(418));
        for (; t;) hh(e, t), t = Vn(t.nextSibling)
    }
    if (Rd(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(A(317));
        e: {
            for (e = e.nextSibling, t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            lt = Vn(e.nextSibling);
                            break e
                        }
                        t--
                    } else n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            lt = null
        }
    } else lt = at ? Vn(e.stateNode.nextSibling) : null;
    return !0
}

function mh() {
    for (var e = lt; e;) e = Vn(e.nextSibling)
}

function uo() {
    lt = at = null, fe = !1
}

function qu(e) {
    _t === null ? _t = [e] : _t.push(e)
}
var G0 = yn.ReactCurrentBatchConfig;

function jo(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner, n) {
                if (n.tag !== 1) throw Error(A(309));
                var r = n.stateNode
            }
            if (!r) throw Error(A(147, e));
            var o = r,
                i = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(s) {
                var l = o.refs;
                s === null ? delete l[i] : l[i] = s
            }, t._stringRef = i, t)
        }
        if (typeof e != "string") throw Error(A(284));
        if (!n._owner) throw Error(A(290, e))
    }
    return e
}

function Xi(e, t) {
    throw e = Object.prototype.toString.call(t), Error(A(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}

function Od(e) {
    var t = e._init;
    return t(e._payload)
}

function gh(e) {
    function t(p, m) {
        if (e) {
            var y = p.deletions;
            y === null ? (p.deletions = [m], p.flags |= 16) : y.push(m)
        }
    }

    function n(p, m) {
        if (!e) return null;
        for (; m !== null;) t(p, m), m = m.sibling;
        return null
    }

    function r(p, m) {
        for (p = new Map; m !== null;) m.key !== null ? p.set(m.key, m) : p.set(m.index, m), m = m.sibling;
        return p
    }

    function o(p, m) {
        return p = Kn(p, m), p.index = 0, p.sibling = null, p
    }

    function i(p, m, y) {
        return p.index = y, e ? (y = p.alternate, y !== null ? (y = y.index, y < m ? (p.flags |= 2, m) : y) : (p.flags |= 2, m)) : (p.flags |= 1048576, m)
    }

    function s(p) {
        return e && p.alternate === null && (p.flags |= 2), p
    }

    function l(p, m, y, E) {
        return m === null || m.tag !== 6 ? (m = sa(y, p.mode, E), m.return = p, m) : (m = o(m, y), m.return = p, m)
    }

    function a(p, m, y, E) {
        var C = y.type;
        return C === Ar ? c(p, m, y.props.children, E, y.key) : m !== null && (m.elementType === C || typeof C == "object" && C !== null && C.$$typeof === Nn && Od(C) === m.type) ? (E = o(m, y.props), E.ref = jo(p, m, y), E.return = p, E) : (E = ys(y.type, y.key, y.props, null, p.mode, E), E.ref = jo(p, m, y), E.return = p, E)
    }

    function u(p, m, y, E) {
        return m === null || m.tag !== 4 || m.stateNode.containerInfo !== y.containerInfo || m.stateNode.implementation !== y.implementation ? (m = la(y, p.mode, E), m.return = p, m) : (m = o(m, y.children || []), m.return = p, m)
    }

    function c(p, m, y, E, C) {
        return m === null || m.tag !== 7 ? (m = yr(y, p.mode, E, C), m.return = p, m) : (m = o(m, y), m.return = p, m)
    }

    function d(p, m, y) {
        if (typeof m == "string" && m !== "" || typeof m == "number") return m = sa("" + m, p.mode, y), m.return = p, m;
        if (typeof m == "object" && m !== null) {
            switch (m.$$typeof) {
                case $i:
                    return y = ys(m.type, m.key, m.props, null, p.mode, y), y.ref = jo(p, null, m), y.return = p, y;
                case Lr:
                    return m = la(m, p.mode, y), m.return = p, m;
                case Nn:
                    var E = m._init;
                    return d(p, E(m._payload), y)
            }
            if (Do(m) || Po(m)) return m = yr(m, p.mode, y, null), m.return = p, m;
            Xi(p, m)
        }
        return null
    }

    function h(p, m, y, E) {
        var C = m !== null ? m.key : null;
        if (typeof y == "string" && y !== "" || typeof y == "number") return C !== null ? null : l(p, m, "" + y, E);
        if (typeof y == "object" && y !== null) {
            switch (y.$$typeof) {
                case $i:
                    return y.key === C ? a(p, m, y, E) : null;
                case Lr:
                    return y.key === C ? u(p, m, y, E) : null;
                case Nn:
                    return C = y._init, h(p, m, C(y._payload), E)
            }
            if (Do(y) || Po(y)) return C !== null ? null : c(p, m, y, E, null);
            Xi(p, y)
        }
        return null
    }

    function f(p, m, y, E, C) {
        if (typeof E == "string" && E !== "" || typeof E == "number") return p = p.get(y) || null, l(m, p, "" + E, C);
        if (typeof E == "object" && E !== null) {
            switch (E.$$typeof) {
                case $i:
                    return p = p.get(E.key === null ? y : E.key) || null, a(m, p, E, C);
                case Lr:
                    return p = p.get(E.key === null ? y : E.key) || null, u(m, p, E, C);
                case Nn:
                    var k = E._init;
                    return f(p, m, y, k(E._payload), C)
            }
            if (Do(E) || Po(E)) return p = p.get(y) || null, c(m, p, E, C, null);
            Xi(m, E)
        }
        return null
    }

    function v(p, m, y, E) {
        for (var C = null, k = null, b = m, T = m = 0, j = null; b !== null && T < y.length; T++) {
            b.index > T ? (j = b, b = null) : j = b.sibling;
            var L = h(p, b, y[T], E);
            if (L === null) {
                b === null && (b = j);
                break
            }
            e && b && L.alternate === null && t(p, b), m = i(L, m, T), k === null ? C = L : k.sibling = L, k = L, b = j
        }
        if (T === y.length) return n(p, b), fe && sr(p, T), C;
        if (b === null) {
            for (; T < y.length; T++) b = d(p, y[T], E), b !== null && (m = i(b, m, T), k === null ? C = b : k.sibling = b, k = b);
            return fe && sr(p, T), C
        }
        for (b = r(p, b); T < y.length; T++) j = f(b, p, T, y[T], E), j !== null && (e && j.alternate !== null && b.delete(j.key === null ? T : j.key), m = i(j, m, T), k === null ? C = j : k.sibling = j, k = j);
        return e && b.forEach(function(D) {
            return t(p, D)
        }), fe && sr(p, T), C
    }

    function g(p, m, y, E) {
        var C = Po(y);
        if (typeof C != "function") throw Error(A(150));
        if (y = C.call(y), y == null) throw Error(A(151));
        for (var k = C = null, b = m, T = m = 0, j = null, L = y.next(); b !== null && !L.done; T++, L = y.next()) {
            b.index > T ? (j = b, b = null) : j = b.sibling;
            var D = h(p, b, L.value, E);
            if (D === null) {
                b === null && (b = j);
                break
            }
            e && b && D.alternate === null && t(p, b), m = i(D, m, T), k === null ? C = D : k.sibling = D, k = D, b = j
        }
        if (L.done) return n(p, b), fe && sr(p, T), C;
        if (b === null) {
            for (; !L.done; T++, L = y.next()) L = d(p, L.value, E), L !== null && (m = i(L, m, T), k === null ? C = L : k.sibling = L, k = L);
            return fe && sr(p, T), C
        }
        for (b = r(p, b); !L.done; T++, L = y.next()) L = f(b, p, T, L.value, E), L !== null && (e && L.alternate !== null && b.delete(L.key === null ? T : L.key), m = i(L, m, T), k === null ? C = L : k.sibling = L, k = L);
        return e && b.forEach(function(I) {
            return t(p, I)
        }), fe && sr(p, T), C
    }

    function w(p, m, y, E) {
        if (typeof y == "object" && y !== null && y.type === Ar && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
            switch (y.$$typeof) {
                case $i:
                    e: {
                        for (var C = y.key, k = m; k !== null;) {
                            if (k.key === C) {
                                if (C = y.type, C === Ar) {
                                    if (k.tag === 7) {
                                        n(p, k.sibling), m = o(k, y.props.children), m.return = p, p = m;
                                        break e
                                    }
                                } else if (k.elementType === C || typeof C == "object" && C !== null && C.$$typeof === Nn && Od(C) === k.type) {
                                    n(p, k.sibling), m = o(k, y.props), m.ref = jo(p, k, y), m.return = p, p = m;
                                    break e
                                }
                                n(p, k);
                                break
                            } else t(p, k);
                            k = k.sibling
                        }
                        y.type === Ar ? (m = yr(y.props.children, p.mode, E, y.key), m.return = p, p = m) : (E = ys(y.type, y.key, y.props, null, p.mode, E), E.ref = jo(p, m, y), E.return = p, p = E)
                    }
                    return s(p);
                case Lr:
                    e: {
                        for (k = y.key; m !== null;) {
                            if (m.key === k)
                                if (m.tag === 4 && m.stateNode.containerInfo === y.containerInfo && m.stateNode.implementation === y.implementation) {
                                    n(p, m.sibling), m = o(m, y.children || []), m.return = p, p = m;
                                    break e
                                } else {
                                    n(p, m);
                                    break
                                }
                            else t(p, m);
                            m = m.sibling
                        }
                        m = la(y, p.mode, E),
                        m.return = p,
                        p = m
                    }
                    return s(p);
                case Nn:
                    return k = y._init, w(p, m, k(y._payload), E)
            }
            if (Do(y)) return v(p, m, y, E);
            if (Po(y)) return g(p, m, y, E);
            Xi(p, y)
        }
        return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, m !== null && m.tag === 6 ? (n(p, m.sibling), m = o(m, y), m.return = p, p = m) : (n(p, m), m = sa(y, p.mode, E), m.return = p, p = m), s(p)) : n(p, m)
    }
    return w
}
var co = gh(!0),
    vh = gh(!1),
    Is = tr(null),
    Ds = null,
    Br = null,
    Xu = null;

function Zu() {
    Xu = Br = Ds = null
}

function Ju(e) {
    var t = Is.current;
    de(Is), e._currentValue = t
}

function Wa(e, t, n) {
    for (; e !== null;) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
        e = e.return
    }
}

function Gr(e, t) {
    Ds = e, Xu = Br = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Xe = !0), e.firstContext = null)
}

function yt(e) {
    var t = e._currentValue;
    if (Xu !== e)
        if (e = {
                context: e,
                memoizedValue: t,
                next: null
            }, Br === null) {
            if (Ds === null) throw Error(A(308));
            Br = e, Ds.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else Br = Br.next = e;
    return t
}
var ur = null;

function ec(e) {
    ur === null ? ur = [e] : ur.push(e)
}

function yh(e, t, n, r) {
    var o = t.interleaved;
    return o === null ? (n.next = n, ec(t)) : (n.next = o.next, o.next = n), t.interleaved = n, hn(e, r)
}

function hn(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var Rn = !1;

function tc(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}

function wh(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}

function dn(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}

function Hn(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, ee & 2) {
        var o = r.pending;
        return o === null ? t.next = t : (t.next = o.next, o.next = t), r.pending = t, hn(e, n)
    }
    return o = r.interleaved, o === null ? (t.next = t, ec(r)) : (t.next = o.next, o.next = t), r.interleaved = t, hn(e, n)
}

function fs(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, $u(e, n)
    }
}

function jd(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
        var o = null,
            i = null;
        if (n = n.firstBaseUpdate, n !== null) {
            do {
                var s = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                i === null ? o = i = s : i = i.next = s, n = n.next
            } while (n !== null);
            i === null ? o = i = t : i = i.next = t
        } else o = i = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: o,
            lastBaseUpdate: i,
            shared: r.shared,
            effects: r.effects
        }, e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
}

function Fs(e, t, n, r) {
    var o = e.updateQueue;
    Rn = !1;
    var i = o.firstBaseUpdate,
        s = o.lastBaseUpdate,
        l = o.shared.pending;
    if (l !== null) {
        o.shared.pending = null;
        var a = l,
            u = a.next;
        a.next = null, s === null ? i = u : s.next = u, s = a;
        var c = e.alternate;
        c !== null && (c = c.updateQueue, l = c.lastBaseUpdate, l !== s && (l === null ? c.firstBaseUpdate = u : l.next = u, c.lastBaseUpdate = a))
    }
    if (i !== null) {
        var d = o.baseState;
        s = 0, c = u = a = null, l = i;
        do {
            var h = l.lane,
                f = l.eventTime;
            if ((r & h) === h) {
                c !== null && (c = c.next = {
                    eventTime: f,
                    lane: 0,
                    tag: l.tag,
                    payload: l.payload,
                    callback: l.callback,
                    next: null
                });
                e: {
                    var v = e,
                        g = l;
                    switch (h = t, f = n, g.tag) {
                        case 1:
                            if (v = g.payload, typeof v == "function") {
                                d = v.call(f, d, h);
                                break e
                            }
                            d = v;
                            break e;
                        case 3:
                            v.flags = v.flags & -65537 | 128;
                        case 0:
                            if (v = g.payload, h = typeof v == "function" ? v.call(f, d, h) : v, h == null) break e;
                            d = ge({}, d, h);
                            break e;
                        case 2:
                            Rn = !0
                    }
                }
                l.callback !== null && l.lane !== 0 && (e.flags |= 64, h = o.effects, h === null ? o.effects = [l] : h.push(l))
            } else f = {
                eventTime: f,
                lane: h,
                tag: l.tag,
                payload: l.payload,
                callback: l.callback,
                next: null
            }, c === null ? (u = c = f, a = d) : c = c.next = f, s |= h;
            if (l = l.next, l === null) {
                if (l = o.shared.pending, l === null) break;
                h = l, l = h.next, h.next = null, o.lastBaseUpdate = h, o.shared.pending = null
            }
        } while (!0);
        if (c === null && (a = d), o.baseState = a, o.firstBaseUpdate = u, o.lastBaseUpdate = c, t = o.shared.interleaved, t !== null) {
            o = t;
            do s |= o.lane, o = o.next; while (o !== t)
        } else i === null && (o.shared.lanes = 0);
        Er |= s, e.lanes = s, e.memoizedState = d
    }
}

function Ld(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                o = r.callback;
            if (o !== null) {
                if (r.callback = null, r = n, typeof o != "function") throw Error(A(191, o));
                o.call(r)
            }
        }
}
var Ni = {},
    Zt = tr(Ni),
    ui = tr(Ni),
    ci = tr(Ni);

function cr(e) {
    if (e === Ni) throw Error(A(174));
    return e
}

function nc(e, t) {
    switch (le(ci, t), le(ui, e), le(Zt, Ni), e = t.nodeType, e) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : ka(null, "");
            break;
        default:
            e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ka(t, e)
    }
    de(Zt), le(Zt, t)
}

function fo() {
    de(Zt), de(ui), de(ci)
}

function xh(e) {
    cr(ci.current);
    var t = cr(Zt.current),
        n = ka(t, e.type);
    t !== n && (le(ui, e), le(Zt, n))
}

function rc(e) {
    ui.current === e && (de(Zt), de(ui))
}
var pe = tr(0);

function zs(e) {
    for (var t = e; t !== null;) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t
        } else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue
        }
        if (t === e) break;
        for (; t.sibling === null;) {
            if (t.return === null || t.return === e) return null;
            t = t.return
        }
        t.sibling.return = t.return, t = t.sibling
    }
    return null
}
var ea = [];

function oc() {
    for (var e = 0; e < ea.length; e++) ea[e]._workInProgressVersionPrimary = null;
    ea.length = 0
}
var ps = yn.ReactCurrentDispatcher,
    ta = yn.ReactCurrentBatchConfig,
    Sr = 0,
    me = null,
    ke = null,
    Re = null,
    $s = !1,
    Qo = !1,
    di = 0,
    Y0 = 0;

function _e() {
    throw Error(A(321))
}

function ic(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!zt(e[n], t[n])) return !1;
    return !0
}

function sc(e, t, n, r, o, i) {
    if (Sr = i, me = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ps.current = e === null || e.memoizedState === null ? J0 : ey, e = n(r, o), Qo) {
        i = 0;
        do {
            if (Qo = !1, di = 0, 25 <= i) throw Error(A(301));
            i += 1, Re = ke = null, t.updateQueue = null, ps.current = ty, e = n(r, o)
        } while (Qo)
    }
    if (ps.current = Bs, t = ke !== null && ke.next !== null, Sr = 0, Re = ke = me = null, $s = !1, t) throw Error(A(300));
    return e
}

function lc() {
    var e = di !== 0;
    return di = 0, e
}

function Wt() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return Re === null ? me.memoizedState = Re = e : Re = Re.next = e, Re
}

function wt() {
    if (ke === null) {
        var e = me.alternate;
        e = e !== null ? e.memoizedState : null
    } else e = ke.next;
    var t = Re === null ? me.memoizedState : Re.next;
    if (t !== null) Re = t, ke = e;
    else {
        if (e === null) throw Error(A(310));
        ke = e, e = {
            memoizedState: ke.memoizedState,
            baseState: ke.baseState,
            baseQueue: ke.baseQueue,
            queue: ke.queue,
            next: null
        }, Re === null ? me.memoizedState = Re = e : Re = Re.next = e
    }
    return Re
}

function fi(e, t) {
    return typeof t == "function" ? t(e) : t
}

function na(e) {
    var t = wt(),
        n = t.queue;
    if (n === null) throw Error(A(311));
    n.lastRenderedReducer = e;
    var r = ke,
        o = r.baseQueue,
        i = n.pending;
    if (i !== null) {
        if (o !== null) {
            var s = o.next;
            o.next = i.next, i.next = s
        }
        r.baseQueue = o = i, n.pending = null
    }
    if (o !== null) {
        i = o.next, r = r.baseState;
        var l = s = null,
            a = null,
            u = i;
        do {
            var c = u.lane;
            if ((Sr & c) === c) a !== null && (a = a.next = {
                lane: 0,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null
            }), r = u.hasEagerState ? u.eagerState : e(r, u.action);
            else {
                var d = {
                    lane: c,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null
                };
                a === null ? (l = a = d, s = r) : a = a.next = d, me.lanes |= c, Er |= c
            }
            u = u.next
        } while (u !== null && u !== i);
        a === null ? s = r : a.next = l, zt(r, t.memoizedState) || (Xe = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = a, n.lastRenderedState = r
    }
    if (e = n.interleaved, e !== null) {
        o = e;
        do i = o.lane, me.lanes |= i, Er |= i, o = o.next; while (o !== e)
    } else o === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}

function ra(e) {
    var t = wt(),
        n = t.queue;
    if (n === null) throw Error(A(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        o = n.pending,
        i = t.memoizedState;
    if (o !== null) {
        n.pending = null;
        var s = o = o.next;
        do i = e(i, s.action), s = s.next; while (s !== o);
        zt(i, t.memoizedState) || (Xe = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i
    }
    return [i, r]
}

function Sh() {}

function Eh(e, t) {
    var n = me,
        r = wt(),
        o = t(),
        i = !zt(r.memoizedState, o);
    if (i && (r.memoizedState = o, Xe = !0), r = r.queue, ac(kh.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || Re !== null && Re.memoizedState.tag & 1) {
        if (n.flags |= 2048, pi(9, bh.bind(null, n, r, o, t), void 0, null), Oe === null) throw Error(A(349));
        Sr & 30 || Ch(n, t, o)
    }
    return o
}

function Ch(e, t, n) {
    e.flags |= 16384, e = {
        getSnapshot: t,
        value: n
    }, t = me.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, me.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e))
}

function bh(e, t, n, r) {
    t.value = n, t.getSnapshot = r, Ph(t) && Th(e)
}

function kh(e, t, n) {
    return n(function() {
        Ph(t) && Th(e)
    })
}

function Ph(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !zt(e, n)
    } catch {
        return !0
    }
}

function Th(e) {
    var t = hn(e, 1);
    t !== null && Dt(t, e, 1, -1)
}

function Ad(e) {
    var t = Wt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: fi,
        lastRenderedState: e
    }, t.queue = e, e = e.dispatch = Z0.bind(null, me, e), [t.memoizedState, e]
}

function pi(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    }, t = me.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, me.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e
}

function Nh() {
    return wt().memoizedState
}

function hs(e, t, n, r) {
    var o = Wt();
    me.flags |= e, o.memoizedState = pi(1 | t, n, void 0, r === void 0 ? null : r)
}

function al(e, t, n, r) {
    var o = wt();
    r = r === void 0 ? null : r;
    var i = void 0;
    if (ke !== null) {
        var s = ke.memoizedState;
        if (i = s.destroy, r !== null && ic(r, s.deps)) {
            o.memoizedState = pi(t, n, i, r);
            return
        }
    }
    me.flags |= e, o.memoizedState = pi(1 | t, n, i, r)
}

function Md(e, t) {
    return hs(8390656, 8, e, t)
}

function ac(e, t) {
    return al(2048, 8, e, t)
}

function Rh(e, t) {
    return al(4, 2, e, t)
}

function Oh(e, t) {
    return al(4, 4, e, t)
}

function jh(e, t) {
    if (typeof t == "function") return e = e(), t(e),
        function() {
            t(null)
        };
    if (t != null) return e = e(), t.current = e,
        function() {
            t.current = null
        }
}

function Lh(e, t, n) {
    return n = n != null ? n.concat([e]) : null, al(4, 4, jh.bind(null, t, e), n)
}

function uc() {}

function Ah(e, t) {
    var n = wt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && ic(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
}

function Mh(e, t) {
    var n = wt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && ic(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
}

function _h(e, t, n) {
    return Sr & 21 ? (zt(n, t) || (n = $p(), me.lanes |= n, Er |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Xe = !0), e.memoizedState = n)
}

function q0(e, t) {
    var n = oe;
    oe = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = ta.transition;
    ta.transition = {};
    try {
        e(!1), t()
    } finally {
        oe = n, ta.transition = r
    }
}

function Ih() {
    return wt().memoizedState
}

function X0(e, t, n) {
    var r = Qn(e);
    if (n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        }, Dh(e)) Fh(t, n);
    else if (n = yh(e, t, n, r), n !== null) {
        var o = We();
        Dt(n, e, r, o), zh(n, t, r)
    }
}

function Z0(e, t, n) {
    var r = Qn(e),
        o = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
    if (Dh(e)) Fh(t, o);
    else {
        var i = e.alternate;
        if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
            var s = t.lastRenderedState,
                l = i(s, n);
            if (o.hasEagerState = !0, o.eagerState = l, zt(l, s)) {
                var a = t.interleaved;
                a === null ? (o.next = o, ec(t)) : (o.next = a.next, a.next = o), t.interleaved = o;
                return
            }
        } catch {} finally {}
        n = yh(e, t, o, r), n !== null && (o = We(), Dt(n, e, r, o), zh(n, t, r))
    }
}

function Dh(e) {
    var t = e.alternate;
    return e === me || t !== null && t === me
}

function Fh(e, t) {
    Qo = $s = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
}

function zh(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, $u(e, n)
    }
}
var Bs = {
        readContext: yt,
        useCallback: _e,
        useContext: _e,
        useEffect: _e,
        useImperativeHandle: _e,
        useInsertionEffect: _e,
        useLayoutEffect: _e,
        useMemo: _e,
        useReducer: _e,
        useRef: _e,
        useState: _e,
        useDebugValue: _e,
        useDeferredValue: _e,
        useTransition: _e,
        useMutableSource: _e,
        useSyncExternalStore: _e,
        useId: _e,
        unstable_isNewReconciler: !1
    },
    J0 = {
        readContext: yt,
        useCallback: function(e, t) {
            return Wt().memoizedState = [e, t === void 0 ? null : t], e
        },
        useContext: yt,
        useEffect: Md,
        useImperativeHandle: function(e, t, n) {
            return n = n != null ? n.concat([e]) : null, hs(4194308, 4, jh.bind(null, t, e), n)
        },
        useLayoutEffect: function(e, t) {
            return hs(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            return hs(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var n = Wt();
            return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e
        },
        useReducer: function(e, t, n) {
            var r = Wt();
            return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t
            }, r.queue = e, e = e.dispatch = X0.bind(null, me, e), [r.memoizedState, e]
        },
        useRef: function(e) {
            var t = Wt();
            return e = {
                current: e
            }, t.memoizedState = e
        },
        useState: Ad,
        useDebugValue: uc,
        useDeferredValue: function(e) {
            return Wt().memoizedState = e
        },
        useTransition: function() {
            var e = Ad(!1),
                t = e[0];
            return e = q0.bind(null, e[1]), Wt().memoizedState = e, [t, e]
        },
        useMutableSource: function() {},
        useSyncExternalStore: function(e, t, n) {
            var r = me,
                o = Wt();
            if (fe) {
                if (n === void 0) throw Error(A(407));
                n = n()
            } else {
                if (n = t(), Oe === null) throw Error(A(349));
                Sr & 30 || Ch(r, t, n)
            }
            o.memoizedState = n;
            var i = {
                value: n,
                getSnapshot: t
            };
            return o.queue = i, Md(kh.bind(null, r, i, e), [e]), r.flags |= 2048, pi(9, bh.bind(null, r, i, n, t), void 0, null), n
        },
        useId: function() {
            var e = Wt(),
                t = Oe.identifierPrefix;
            if (fe) {
                var n = cn,
                    r = un;
                n = (r & ~(1 << 32 - It(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = di++, 0 < n && (t += "H" + n.toString(32)), t += ":"
            } else n = Y0++, t = ":" + t + "r" + n.toString(32) + ":";
            return e.memoizedState = t
        },
        unstable_isNewReconciler: !1
    },
    ey = {
        readContext: yt,
        useCallback: Ah,
        useContext: yt,
        useEffect: ac,
        useImperativeHandle: Lh,
        useInsertionEffect: Rh,
        useLayoutEffect: Oh,
        useMemo: Mh,
        useReducer: na,
        useRef: Nh,
        useState: function() {
            return na(fi)
        },
        useDebugValue: uc,
        useDeferredValue: function(e) {
            var t = wt();
            return _h(t, ke.memoizedState, e)
        },
        useTransition: function() {
            var e = na(fi)[0],
                t = wt().memoizedState;
            return [e, t]
        },
        useMutableSource: Sh,
        useSyncExternalStore: Eh,
        useId: Ih,
        unstable_isNewReconciler: !1
    },
    ty = {
        readContext: yt,
        useCallback: Ah,
        useContext: yt,
        useEffect: ac,
        useImperativeHandle: Lh,
        useInsertionEffect: Rh,
        useLayoutEffect: Oh,
        useMemo: Mh,
        useReducer: ra,
        useRef: Nh,
        useState: function() {
            return ra(fi)
        },
        useDebugValue: uc,
        useDeferredValue: function(e) {
            var t = wt();
            return ke === null ? t.memoizedState = e : _h(t, ke.memoizedState, e)
        },
        useTransition: function() {
            var e = ra(fi)[0],
                t = wt().memoizedState;
            return [e, t]
        },
        useMutableSource: Sh,
        useSyncExternalStore: Eh,
        useId: Ih,
        unstable_isNewReconciler: !1
    };

function Ot(e, t) {
    if (e && e.defaultProps) {
        t = ge({}, t), e = e.defaultProps;
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}

function Qa(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : ge({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n)
}
var ul = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? Tr(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = We(),
            o = Qn(e),
            i = dn(r, o);
        i.payload = t, n != null && (i.callback = n), t = Hn(e, i, o), t !== null && (Dt(t, e, o, r), fs(t, e, o))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = We(),
            o = Qn(e),
            i = dn(r, o);
        i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Hn(e, i, o), t !== null && (Dt(t, e, o, r), fs(t, e, o))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = We(),
            r = Qn(e),
            o = dn(n, r);
        o.tag = 2, t != null && (o.callback = t), t = Hn(e, o, r), t !== null && (Dt(t, e, r, n), fs(t, e, r))
    }
};

function _d(e, t, n, r, o, i, s) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, s) : t.prototype && t.prototype.isPureReactComponent ? !ii(n, r) || !ii(o, i) : !0
}

function $h(e, t, n) {
    var r = !1,
        o = Yn,
        i = t.contextType;
    return typeof i == "object" && i !== null ? i = yt(i) : (o = Je(t) ? wr : ze.current, r = t.contextTypes, i = (r = r != null) ? ao(e, o) : Yn), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ul, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = o, e.__reactInternalMemoizedMaskedChildContext = i), t
}

function Id(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ul.enqueueReplaceState(t, t.state, null)
}

function Ka(e, t, n, r) {
    var o = e.stateNode;
    o.props = n, o.state = e.memoizedState, o.refs = {}, tc(e);
    var i = t.contextType;
    typeof i == "object" && i !== null ? o.context = yt(i) : (i = Je(t) ? wr : ze.current, o.context = ao(e, i)), o.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Qa(e, t, i, n), o.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (t = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), t !== o.state && ul.enqueueReplaceState(o, o.state, null), Fs(e, n, o, r), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308)
}

function po(e, t) {
    try {
        var n = "",
            r = t;
        do n += Rv(r), r = r.return; while (r);
        var o = n
    } catch (i) {
        o = `
Error generating stack: ` + i.message + `
` + i.stack
    }
    return {
        value: e,
        source: t,
        stack: o,
        digest: null
    }
}

function oa(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}

function Ga(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var ny = typeof WeakMap == "function" ? WeakMap : Map;

function Bh(e, t, n) {
    n = dn(-1, n), n.tag = 3, n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        Vs || (Vs = !0, ou = r), Ga(e, t)
    }, n
}

function Uh(e, t, n) {
    n = dn(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var o = t.value;
        n.payload = function() {
            return r(o)
        }, n.callback = function() {
            Ga(e, t)
        }
    }
    var i = e.stateNode;
    return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
        Ga(e, t), typeof r != "function" && (Wn === null ? Wn = new Set([this]) : Wn.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: s !== null ? s : ""
        })
    }), n
}

function Dd(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new ny;
        var o = new Set;
        r.set(t, o)
    } else o = r.get(t), o === void 0 && (o = new Set, r.set(t, o));
    o.has(n) || (o.add(n), e = gy.bind(null, e, t, n), t.then(e, e))
}

function Fd(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
        e = e.return
    } while (e !== null);
    return null
}

function zd(e, t, n, r, o) {
    return e.mode & 1 ? (e.flags |= 65536, e.lanes = o, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = dn(-1, 1), t.tag = 2, Hn(n, t, 1))), n.lanes |= 1), e)
}
var ry = yn.ReactCurrentOwner,
    Xe = !1;

function Ve(e, t, n, r) {
    t.child = e === null ? vh(t, null, n, r) : co(t, e.child, n, r)
}

function $d(e, t, n, r, o) {
    n = n.render;
    var i = t.ref;
    return Gr(t, o), r = sc(e, t, n, r, i, o), n = lc(), e !== null && !Xe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, mn(e, t, o)) : (fe && n && Gu(t), t.flags |= 1, Ve(e, t, r, o), t.child)
}

function Bd(e, t, n, r, o) {
    if (e === null) {
        var i = n.type;
        return typeof i == "function" && !vc(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Vh(e, t, i, r, o)) : (e = ys(n.type, null, r, t, t.mode, o), e.ref = t.ref, e.return = t, t.child = e)
    }
    if (i = e.child, !(e.lanes & o)) {
        var s = i.memoizedProps;
        if (n = n.compare, n = n !== null ? n : ii, n(s, r) && e.ref === t.ref) return mn(e, t, o)
    }
    return t.flags |= 1, e = Kn(i, r), e.ref = t.ref, e.return = t, t.child = e
}

function Vh(e, t, n, r, o) {
    if (e !== null) {
        var i = e.memoizedProps;
        if (ii(i, r) && e.ref === t.ref)
            if (Xe = !1, t.pendingProps = r = i, (e.lanes & o) !== 0) e.flags & 131072 && (Xe = !0);
            else return t.lanes = e.lanes, mn(e, t, o)
    }
    return Ya(e, t, n, r, o)
}

function Hh(e, t, n) {
    var r = t.pendingProps,
        o = r.children,
        i = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1)) t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null
        }, le(Vr, it), it |= n;
        else {
            if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
                baseLanes: e,
                cachePool: null,
                transitions: null
            }, t.updateQueue = null, le(Vr, it), it |= e, null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            }, r = i !== null ? i.baseLanes : n, le(Vr, it), it |= r
        }
    else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, le(Vr, it), it |= r;
    return Ve(e, t, o, n), t.child
}

function Wh(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152)
}

function Ya(e, t, n, r, o) {
    var i = Je(n) ? wr : ze.current;
    return i = ao(t, i), Gr(t, o), n = sc(e, t, n, r, i, o), r = lc(), e !== null && !Xe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, mn(e, t, o)) : (fe && r && Gu(t), t.flags |= 1, Ve(e, t, n, o), t.child)
}

function Ud(e, t, n, r, o) {
    if (Je(n)) {
        var i = !0;
        As(t)
    } else i = !1;
    if (Gr(t, o), t.stateNode === null) ms(e, t), $h(t, n, r), Ka(t, n, r, o), r = !0;
    else if (e === null) {
        var s = t.stateNode,
            l = t.memoizedProps;
        s.props = l;
        var a = s.context,
            u = n.contextType;
        typeof u == "object" && u !== null ? u = yt(u) : (u = Je(n) ? wr : ze.current, u = ao(t, u));
        var c = n.getDerivedStateFromProps,
            d = typeof c == "function" || typeof s.getSnapshotBeforeUpdate == "function";
        d || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (l !== r || a !== u) && Id(t, s, r, u), Rn = !1;
        var h = t.memoizedState;
        s.state = h, Fs(t, r, s, o), a = t.memoizedState, l !== r || h !== a || Ze.current || Rn ? (typeof c == "function" && (Qa(t, n, c, r), a = t.memoizedState), (l = Rn || _d(t, n, l, r, h, a, u)) ? (d || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), s.props = r, s.state = a, s.context = u, r = l) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1)
    } else {
        s = t.stateNode, wh(e, t), l = t.memoizedProps, u = t.type === t.elementType ? l : Ot(t.type, l), s.props = u, d = t.pendingProps, h = s.context, a = n.contextType, typeof a == "object" && a !== null ? a = yt(a) : (a = Je(n) ? wr : ze.current, a = ao(t, a));
        var f = n.getDerivedStateFromProps;
        (c = typeof f == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (l !== d || h !== a) && Id(t, s, r, a), Rn = !1, h = t.memoizedState, s.state = h, Fs(t, r, s, o);
        var v = t.memoizedState;
        l !== d || h !== v || Ze.current || Rn ? (typeof f == "function" && (Qa(t, n, f, r), v = t.memoizedState), (u = Rn || _d(t, n, u, r, h, v, a) || !1) ? (c || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, v, a), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, v, a)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || l === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = v), s.props = r, s.state = v, s.context = a, r = u) : (typeof s.componentDidUpdate != "function" || l === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1)
    }
    return qa(e, t, n, r, i, o)
}

function qa(e, t, n, r, o, i) {
    Wh(e, t);
    var s = (t.flags & 128) !== 0;
    if (!r && !s) return o && Td(t, n, !1), mn(e, t, i);
    r = t.stateNode, ry.current = t;
    var l = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && s ? (t.child = co(t, e.child, null, i), t.child = co(t, null, l, i)) : Ve(e, t, l, i), t.memoizedState = r.state, o && Td(t, n, !0), t.child
}

function Qh(e) {
    var t = e.stateNode;
    t.pendingContext ? Pd(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Pd(e, t.context, !1), nc(e, t.containerInfo)
}

function Vd(e, t, n, r, o) {
    return uo(), qu(o), t.flags |= 256, Ve(e, t, n, r), t.child
}
var Xa = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};

function Za(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}

function Kh(e, t, n) {
    var r = t.pendingProps,
        o = pe.current,
        i = !1,
        s = (t.flags & 128) !== 0,
        l;
    if ((l = s) || (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0), l ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (o |= 1), le(pe, o & 1), e === null) return Ha(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, s = {
        mode: "hidden",
        children: s
    }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = s) : i = fl(s, r, 0, null), e = yr(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Za(n), t.memoizedState = Xa, e) : cc(t, s));
    if (o = e.memoizedState, o !== null && (l = o.dehydrated, l !== null)) return oy(e, t, s, r, l, o, n);
    if (i) {
        i = r.fallback, s = t.mode, o = e.child, l = o.sibling;
        var a = {
            mode: "hidden",
            children: r.children
        };
        return !(s & 1) && t.child !== o ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = Kn(o, a), r.subtreeFlags = o.subtreeFlags & 14680064), l !== null ? i = Kn(l, i) : (i = yr(i, s, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, s = e.child.memoizedState, s = s === null ? Za(n) : {
            baseLanes: s.baseLanes | n,
            cachePool: null,
            transitions: s.transitions
        }, i.memoizedState = s, i.childLanes = e.childLanes & ~n, t.memoizedState = Xa, r
    }
    return i = e.child, e = i.sibling, r = Kn(i, {
        mode: "visible",
        children: r.children
    }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r
}

function cc(e, t) {
    return t = fl({
        mode: "visible",
        children: t
    }, e.mode, 0, null), t.return = e, e.child = t
}

function Zi(e, t, n, r) {
    return r !== null && qu(r), co(t, e.child, null, n), e = cc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
}

function oy(e, t, n, r, o, i, s) {
    if (n) return t.flags & 256 ? (t.flags &= -257, r = oa(Error(A(422))), Zi(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, o = t.mode, r = fl({
        mode: "visible",
        children: r.children
    }, o, 0, null), i = yr(i, o, s, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && co(t, e.child, null, s), t.child.memoizedState = Za(s), t.memoizedState = Xa, i);
    if (!(t.mode & 1)) return Zi(e, t, s, null);
    if (o.data === "$!") {
        if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
        return r = l, i = Error(A(419)), r = oa(i, r, void 0), Zi(e, t, s, r)
    }
    if (l = (s & e.childLanes) !== 0, Xe || l) {
        if (r = Oe, r !== null) {
            switch (s & -s) {
                case 4:
                    o = 2;
                    break;
                case 16:
                    o = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    o = 32;
                    break;
                case 536870912:
                    o = 268435456;
                    break;
                default:
                    o = 0
            }
            o = o & (r.suspendedLanes | s) ? 0 : o, o !== 0 && o !== i.retryLane && (i.retryLane = o, hn(e, o), Dt(r, e, o, -1))
        }
        return gc(), r = oa(Error(A(421))), Zi(e, t, s, r)
    }
    return o.data === "$?" ? (t.flags |= 128, t.child = e.child, t = vy.bind(null, e), o._reactRetry = t, null) : (e = i.treeContext, lt = Vn(o.nextSibling), at = t, fe = !0, _t = null, e !== null && (ht[mt++] = un, ht[mt++] = cn, ht[mt++] = xr, un = e.id, cn = e.overflow, xr = t), t = cc(t, r.children), t.flags |= 4096, t)
}

function Hd(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Wa(e.return, t, n)
}

function ia(e, t, n, r, o) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = o)
}

function Gh(e, t, n) {
    var r = t.pendingProps,
        o = r.revealOrder,
        i = r.tail;
    if (Ve(e, t, r.children, n), r = pe.current, r & 2) r = r & 1 | 2, t.flags |= 128;
    else {
        if (e !== null && e.flags & 128) e: for (e = t.child; e !== null;) {
            if (e.tag === 13) e.memoizedState !== null && Hd(e, n, t);
            else if (e.tag === 19) Hd(e, n, t);
            else if (e.child !== null) {
                e.child.return = e, e = e.child;
                continue
            }
            if (e === t) break e;
            for (; e.sibling === null;) {
                if (e.return === null || e.return === t) break e;
                e = e.return
            }
            e.sibling.return = e.return, e = e.sibling
        }
        r &= 1
    }
    if (le(pe, r), !(t.mode & 1)) t.memoizedState = null;
    else switch (o) {
        case "forwards":
            for (n = t.child, o = null; n !== null;) e = n.alternate, e !== null && zs(e) === null && (o = n), n = n.sibling;
            n = o, n === null ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null), ia(t, !1, o, n, i);
            break;
        case "backwards":
            for (n = null, o = t.child, t.child = null; o !== null;) {
                if (e = o.alternate, e !== null && zs(e) === null) {
                    t.child = o;
                    break
                }
                e = o.sibling, o.sibling = n, n = o, o = e
            }
            ia(t, !0, n, null, i);
            break;
        case "together":
            ia(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
    }
    return t.child
}

function ms(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2)
}

function mn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), Er |= t.lanes, !(n & t.childLanes)) return null;
    if (e !== null && t.child !== e.child) throw Error(A(153));
    if (t.child !== null) {
        for (e = t.child, n = Kn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Kn(e, e.pendingProps), n.return = t;
        n.sibling = null
    }
    return t.child
}

function iy(e, t, n) {
    switch (t.tag) {
        case 3:
            Qh(t), uo();
            break;
        case 5:
            xh(t);
            break;
        case 1:
            Je(t.type) && As(t);
            break;
        case 4:
            nc(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                o = t.memoizedProps.value;
            le(Is, r._currentValue), r._currentValue = o;
            break;
        case 13:
            if (r = t.memoizedState, r !== null) return r.dehydrated !== null ? (le(pe, pe.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Kh(e, t, n) : (le(pe, pe.current & 1), e = mn(e, t, n), e !== null ? e.sibling : null);
            le(pe, pe.current & 1);
            break;
        case 19:
            if (r = (n & t.childLanes) !== 0, e.flags & 128) {
                if (r) return Gh(e, t, n);
                t.flags |= 128
            }
            if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), le(pe, pe.current), r) break;
            return null;
        case 22:
        case 23:
            return t.lanes = 0, Hh(e, t, n)
    }
    return mn(e, t, n)
}
var Yh, Ja, qh, Xh;
Yh = function(e, t) {
    for (var n = t.child; n !== null;) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n, n = n.child;
            continue
        }
        if (n === t) break;
        for (; n.sibling === null;) {
            if (n.return === null || n.return === t) return;
            n = n.return
        }
        n.sibling.return = n.return, n = n.sibling
    }
};
Ja = function() {};
qh = function(e, t, n, r) {
    var o = e.memoizedProps;
    if (o !== r) {
        e = t.stateNode, cr(Zt.current);
        var i = null;
        switch (n) {
            case "input":
                o = Sa(e, o), r = Sa(e, r), i = [];
                break;
            case "select":
                o = ge({}, o, {
                    value: void 0
                }), r = ge({}, r, {
                    value: void 0
                }), i = [];
                break;
            case "textarea":
                o = ba(e, o), r = ba(e, r), i = [];
                break;
            default:
                typeof o.onClick != "function" && typeof r.onClick == "function" && (e.onclick = js)
        }
        Pa(n, r);
        var s;
        n = null;
        for (u in o)
            if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
                if (u === "style") {
                    var l = o[u];
                    for (s in l) l.hasOwnProperty(s) && (n || (n = {}), n[s] = "")
                } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Zo.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
        for (u in r) {
            var a = r[u];
            if (l = o != null ? o[u] : void 0, r.hasOwnProperty(u) && a !== l && (a != null || l != null))
                if (u === "style")
                    if (l) {
                        for (s in l) !l.hasOwnProperty(s) || a && a.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
                        for (s in a) a.hasOwnProperty(s) && l[s] !== a[s] && (n || (n = {}), n[s] = a[s])
                    } else n || (i || (i = []), i.push(u, n)), n = a;
            else u === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, l = l ? l.__html : void 0, a != null && l !== a && (i = i || []).push(u, a)) : u === "children" ? typeof a != "string" && typeof a != "number" || (i = i || []).push(u, "" + a) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (Zo.hasOwnProperty(u) ? (a != null && u === "onScroll" && ce("scroll", e), i || l === a || (i = [])) : (i = i || []).push(u, a))
        }
        n && (i = i || []).push("style", n);
        var u = i;
        (t.updateQueue = u) && (t.flags |= 4)
    }
};
Xh = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
};

function Lo(e, t) {
    if (!fe) switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
    }
}

function Ie(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags & 14680064, r |= o.flags & 14680064, o.return = e, o = o.sibling;
    else
        for (o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, o.return = e, o = o.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t
}

function sy(e, t, n) {
    var r = t.pendingProps;
    switch (Yu(t), t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return Ie(t), null;
        case 1:
            return Je(t.type) && Ls(), Ie(t), null;
        case 3:
            return r = t.stateNode, fo(), de(Ze), de(ze), oc(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (qi(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, _t !== null && (lu(_t), _t = null))), Ja(e, t), Ie(t), null;
        case 5:
            rc(t);
            var o = cr(ci.current);
            if (n = t.type, e !== null && t.stateNode != null) qh(e, t, n, r, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(A(166));
                    return Ie(t), null
                }
                if (e = cr(Zt.current), qi(t)) {
                    r = t.stateNode, n = t.type;
                    var i = t.memoizedProps;
                    switch (r[Yt] = t, r[ai] = i, e = (t.mode & 1) !== 0, n) {
                        case "dialog":
                            ce("cancel", r), ce("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            ce("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (o = 0; o < zo.length; o++) ce(zo[o], r);
                            break;
                        case "source":
                            ce("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            ce("error", r), ce("load", r);
                            break;
                        case "details":
                            ce("toggle", r);
                            break;
                        case "input":
                            Jc(r, i), ce("invalid", r);
                            break;
                        case "select":
                            r._wrapperState = {
                                wasMultiple: !!i.multiple
                            }, ce("invalid", r);
                            break;
                        case "textarea":
                            td(r, i), ce("invalid", r)
                    }
                    Pa(n, i), o = null;
                    for (var s in i)
                        if (i.hasOwnProperty(s)) {
                            var l = i[s];
                            s === "children" ? typeof l == "string" ? r.textContent !== l && (i.suppressHydrationWarning !== !0 && Yi(r.textContent, l, e), o = ["children", l]) : typeof l == "number" && r.textContent !== "" + l && (i.suppressHydrationWarning !== !0 && Yi(r.textContent, l, e), o = ["children", "" + l]) : Zo.hasOwnProperty(s) && l != null && s === "onScroll" && ce("scroll", r)
                        } switch (n) {
                        case "input":
                            Bi(r), ed(r, i, !0);
                            break;
                        case "textarea":
                            Bi(r), nd(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof i.onClick == "function" && (r.onclick = js)
                    }
                    r = o, t.updateQueue = r, r !== null && (t.flags |= 4)
                } else {
                    s = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = kp(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, {
                        is: r.is
                    }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[Yt] = t, e[ai] = r, Yh(e, t, !1, !1), t.stateNode = e;
                    e: {
                        switch (s = Ta(n, r), n) {
                            case "dialog":
                                ce("cancel", e), ce("close", e), o = r;
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                ce("load", e), o = r;
                                break;
                            case "video":
                            case "audio":
                                for (o = 0; o < zo.length; o++) ce(zo[o], e);
                                o = r;
                                break;
                            case "source":
                                ce("error", e), o = r;
                                break;
                            case "img":
                            case "image":
                            case "link":
                                ce("error", e), ce("load", e), o = r;
                                break;
                            case "details":
                                ce("toggle", e), o = r;
                                break;
                            case "input":
                                Jc(e, r), o = Sa(e, r), ce("invalid", e);
                                break;
                            case "option":
                                o = r;
                                break;
                            case "select":
                                e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                }, o = ge({}, r, {
                                    value: void 0
                                }), ce("invalid", e);
                                break;
                            case "textarea":
                                td(e, r), o = ba(e, r), ce("invalid", e);
                                break;
                            default:
                                o = r
                        }
                        Pa(n, o),
                        l = o;
                        for (i in l)
                            if (l.hasOwnProperty(i)) {
                                var a = l[i];
                                i === "style" ? Np(e, a) : i === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Pp(e, a)) : i === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && Jo(e, a) : typeof a == "number" && Jo(e, "" + a) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Zo.hasOwnProperty(i) ? a != null && i === "onScroll" && ce("scroll", e) : a != null && Mu(e, i, a, s))
                            } switch (n) {
                            case "input":
                                Bi(e), ed(e, r, !1);
                                break;
                            case "textarea":
                                Bi(e), nd(e);
                                break;
                            case "option":
                                r.value != null && e.setAttribute("value", "" + Gn(r.value));
                                break;
                            case "select":
                                e.multiple = !!r.multiple, i = r.value, i != null ? Hr(e, !!r.multiple, i, !1) : r.defaultValue != null && Hr(e, !!r.multiple, r.defaultValue, !0);
                                break;
                            default:
                                typeof o.onClick == "function" && (e.onclick = js)
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1
                        }
                    }
                    r && (t.flags |= 4)
                }
                t.ref !== null && (t.flags |= 512, t.flags |= 2097152)
            }
            return Ie(t), null;
        case 6:
            if (e && t.stateNode != null) Xh(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null) throw Error(A(166));
                if (n = cr(ci.current), cr(Zt.current), qi(t)) {
                    if (r = t.stateNode, n = t.memoizedProps, r[Yt] = t, (i = r.nodeValue !== n) && (e = at, e !== null)) switch (e.tag) {
                        case 3:
                            Yi(r.nodeValue, n, (e.mode & 1) !== 0);
                            break;
                        case 5:
                            e.memoizedProps.suppressHydrationWarning !== !0 && Yi(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                    i && (t.flags |= 4)
                } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Yt] = t, t.stateNode = r
            }
            return Ie(t), null;
        case 13:
            if (de(pe), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (fe && lt !== null && t.mode & 1 && !(t.flags & 128)) mh(), uo(), t.flags |= 98560, i = !1;
                else if (i = qi(t), r !== null && r.dehydrated !== null) {
                    if (e === null) {
                        if (!i) throw Error(A(318));
                        if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(A(317));
                        i[Yt] = t
                    } else uo(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
                    Ie(t), i = !1
                } else _t !== null && (lu(_t), _t = null), i = !0;
                if (!i) return t.flags & 65536 ? t : null
            }
            return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || pe.current & 1 ? Te === 0 && (Te = 3) : gc())), t.updateQueue !== null && (t.flags |= 4), Ie(t), null);
        case 4:
            return fo(), Ja(e, t), e === null && si(t.stateNode.containerInfo), Ie(t), null;
        case 10:
            return Ju(t.type._context), Ie(t), null;
        case 17:
            return Je(t.type) && Ls(), Ie(t), null;
        case 19:
            if (de(pe), i = t.memoizedState, i === null) return Ie(t), null;
            if (r = (t.flags & 128) !== 0, s = i.rendering, s === null)
                if (r) Lo(i, !1);
                else {
                    if (Te !== 0 || e !== null && e.flags & 128)
                        for (e = t.child; e !== null;) {
                            if (s = zs(e), s !== null) {
                                for (t.flags |= 128, Lo(i, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null;) i = n, e = r, i.flags &= 14680066, s = i.alternate, s === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = s.childLanes, i.lanes = s.lanes, i.child = s.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = s.memoizedProps, i.memoizedState = s.memoizedState, i.updateQueue = s.updateQueue, i.type = s.type, e = s.dependencies, i.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }), n = n.sibling;
                                return le(pe, pe.current & 1 | 2), t.child
                            }
                            e = e.sibling
                        }
                    i.tail !== null && Se() > ho && (t.flags |= 128, r = !0, Lo(i, !1), t.lanes = 4194304)
                }
            else {
                if (!r)
                    if (e = zs(s), e !== null) {
                        if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Lo(i, !0), i.tail === null && i.tailMode === "hidden" && !s.alternate && !fe) return Ie(t), null
                    } else 2 * Se() - i.renderingStartTime > ho && n !== 1073741824 && (t.flags |= 128, r = !0, Lo(i, !1), t.lanes = 4194304);
                i.isBackwards ? (s.sibling = t.child, t.child = s) : (n = i.last, n !== null ? n.sibling = s : t.child = s, i.last = s)
            }
            return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Se(), t.sibling = null, n = pe.current, le(pe, r ? n & 1 | 2 : n & 1), t) : (Ie(t), null);
        case 22:
        case 23:
            return mc(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? it & 1073741824 && (Ie(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ie(t), null;
        case 24:
            return null;
        case 25:
            return null
    }
    throw Error(A(156, t.tag))
}

function ly(e, t) {
    switch (Yu(t), t.tag) {
        case 1:
            return Je(t.type) && Ls(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
            return fo(), de(Ze), de(ze), oc(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
        case 5:
            return rc(t), null;
        case 13:
            if (de(pe), e = t.memoizedState, e !== null && e.dehydrated !== null) {
                if (t.alternate === null) throw Error(A(340));
                uo()
            }
            return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
            return de(pe), null;
        case 4:
            return fo(), null;
        case 10:
            return Ju(t.type._context), null;
        case 22:
        case 23:
            return mc(), null;
        case 24:
            return null;
        default:
            return null
    }
}
var Ji = !1,
    Fe = !1,
    ay = typeof WeakSet == "function" ? WeakSet : Set,
    $ = null;

function Ur(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function") try {
            n(null)
        } catch (r) {
            xe(e, t, r)
        } else n.current = null
}

function eu(e, t, n) {
    try {
        n()
    } catch (r) {
        xe(e, t, r)
    }
}
var Wd = !1;

function uy(e, t) {
    if (Da = Ns, e = nh(), Ku(e)) {
        if ("selectionStart" in e) var n = {
            start: e.selectionStart,
            end: e.selectionEnd
        };
        else e: {
            n = (n = e.ownerDocument) && n.defaultView || window;
            var r = n.getSelection && n.getSelection();
            if (r && r.rangeCount !== 0) {
                n = r.anchorNode;
                var o = r.anchorOffset,
                    i = r.focusNode;
                r = r.focusOffset;
                try {
                    n.nodeType, i.nodeType
                } catch {
                    n = null;
                    break e
                }
                var s = 0,
                    l = -1,
                    a = -1,
                    u = 0,
                    c = 0,
                    d = e,
                    h = null;
                t: for (;;) {
                    for (var f; d !== n || o !== 0 && d.nodeType !== 3 || (l = s + o), d !== i || r !== 0 && d.nodeType !== 3 || (a = s + r), d.nodeType === 3 && (s += d.nodeValue.length), (f = d.firstChild) !== null;) h = d, d = f;
                    for (;;) {
                        if (d === e) break t;
                        if (h === n && ++u === o && (l = s), h === i && ++c === r && (a = s), (f = d.nextSibling) !== null) break;
                        d = h, h = d.parentNode
                    }
                    d = f
                }
                n = l === -1 || a === -1 ? null : {
                    start: l,
                    end: a
                }
            } else n = null
        }
        n = n || {
            start: 0,
            end: 0
        }
    } else n = null;
    for (Fa = {
            focusedElem: e,
            selectionRange: n
        }, Ns = !1, $ = t; $ !== null;)
        if (t = $, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, $ = e;
        else
            for (; $ !== null;) {
                t = $;
                try {
                    var v = t.alternate;
                    if (t.flags & 1024) switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (v !== null) {
                                var g = v.memoizedProps,
                                    w = v.memoizedState,
                                    p = t.stateNode,
                                    m = p.getSnapshotBeforeUpdate(t.elementType === t.type ? g : Ot(t.type, g), w);
                                p.__reactInternalSnapshotBeforeUpdate = m
                            }
                            break;
                        case 3:
                            var y = t.stateNode.containerInfo;
                            y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(A(163))
                    }
                } catch (E) {
                    xe(t, t.return, E)
                }
                if (e = t.sibling, e !== null) {
                    e.return = t.return, $ = e;
                    break
                }
                $ = t.return
            }
    return v = Wd, Wd = !1, v
}

function Ko(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
        var o = r = r.next;
        do {
            if ((o.tag & e) === e) {
                var i = o.destroy;
                o.destroy = void 0, i !== void 0 && eu(t, n, i)
            }
            o = o.next
        } while (o !== r)
    }
}

function cl(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}

function tu(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}

function Zh(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Zh(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Yt], delete t[ai], delete t[Ba], delete t[W0], delete t[Q0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
}

function Jh(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}

function Qd(e) {
    e: for (;;) {
        for (; e.sibling === null;) {
            if (e.return === null || Jh(e.return)) return null;
            e = e.return
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            e.child.return = e, e = e.child
        }
        if (!(e.flags & 2)) return e.stateNode
    }
}

function nu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = js));
    else if (r !== 4 && (e = e.child, e !== null))
        for (nu(e, t, n), e = e.sibling; e !== null;) nu(e, t, n), e = e.sibling
}

function ru(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null))
        for (ru(e, t, n), e = e.sibling; e !== null;) ru(e, t, n), e = e.sibling
}
var je = null,
    Mt = !1;

function bn(e, t, n) {
    for (n = n.child; n !== null;) em(e, t, n), n = n.sibling
}

function em(e, t, n) {
    if (Xt && typeof Xt.onCommitFiberUnmount == "function") try {
        Xt.onCommitFiberUnmount(nl, n)
    } catch {}
    switch (n.tag) {
        case 5:
            Fe || Ur(n, t);
        case 6:
            var r = je,
                o = Mt;
            je = null, bn(e, t, n), je = r, Mt = o, je !== null && (Mt ? (e = je, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : je.removeChild(n.stateNode));
            break;
        case 18:
            je !== null && (Mt ? (e = je, n = n.stateNode, e.nodeType === 8 ? Zl(e.parentNode, n) : e.nodeType === 1 && Zl(e, n), ri(e)) : Zl(je, n.stateNode));
            break;
        case 4:
            r = je, o = Mt, je = n.stateNode.containerInfo, Mt = !0, bn(e, t, n), je = r, Mt = o;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!Fe && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
                o = r = r.next;
                do {
                    var i = o,
                        s = i.destroy;
                    i = i.tag, s !== void 0 && (i & 2 || i & 4) && eu(n, t, s), o = o.next
                } while (o !== r)
            }
            bn(e, t, n);
            break;
        case 1:
            if (!Fe && (Ur(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
                r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount()
            } catch (l) {
                xe(n, t, l)
            }
            bn(e, t, n);
            break;
        case 21:
            bn(e, t, n);
            break;
        case 22:
            n.mode & 1 ? (Fe = (r = Fe) || n.memoizedState !== null, bn(e, t, n), Fe = r) : bn(e, t, n);
            break;
        default:
            bn(e, t, n)
    }
}

function Kd(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new ay), t.forEach(function(r) {
            var o = yy.bind(null, e, r);
            n.has(r) || (n.add(r), r.then(o, o))
        })
    }
}

function Tt(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var o = n[r];
            try {
                var i = e,
                    s = t,
                    l = s;
                e: for (; l !== null;) {
                    switch (l.tag) {
                        case 5:
                            je = l.stateNode, Mt = !1;
                            break e;
                        case 3:
                            je = l.stateNode.containerInfo, Mt = !0;
                            break e;
                        case 4:
                            je = l.stateNode.containerInfo, Mt = !0;
                            break e
                    }
                    l = l.return
                }
                if (je === null) throw Error(A(160));
                em(i, s, o), je = null, Mt = !1;
                var a = o.alternate;
                a !== null && (a.return = null), o.return = null
            } catch (u) {
                xe(o, t, u)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null;) tm(t, e), t = t.sibling
}

function tm(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if (Tt(t, e), Ht(e), r & 4) {
                try {
                    Ko(3, e, e.return), cl(3, e)
                } catch (g) {
                    xe(e, e.return, g)
                }
                try {
                    Ko(5, e, e.return)
                } catch (g) {
                    xe(e, e.return, g)
                }
            }
            break;
        case 1:
            Tt(t, e), Ht(e), r & 512 && n !== null && Ur(n, n.return);
            break;
        case 5:
            if (Tt(t, e), Ht(e), r & 512 && n !== null && Ur(n, n.return), e.flags & 32) {
                var o = e.stateNode;
                try {
                    Jo(o, "")
                } catch (g) {
                    xe(e, e.return, g)
                }
            }
            if (r & 4 && (o = e.stateNode, o != null)) {
                var i = e.memoizedProps,
                    s = n !== null ? n.memoizedProps : i,
                    l = e.type,
                    a = e.updateQueue;
                if (e.updateQueue = null, a !== null) try {
                    l === "input" && i.type === "radio" && i.name != null && Cp(o, i), Ta(l, s);
                    var u = Ta(l, i);
                    for (s = 0; s < a.length; s += 2) {
                        var c = a[s],
                            d = a[s + 1];
                        c === "style" ? Np(o, d) : c === "dangerouslySetInnerHTML" ? Pp(o, d) : c === "children" ? Jo(o, d) : Mu(o, c, d, u)
                    }
                    switch (l) {
                        case "input":
                            Ea(o, i);
                            break;
                        case "textarea":
                            bp(o, i);
                            break;
                        case "select":
                            var h = o._wrapperState.wasMultiple;
                            o._wrapperState.wasMultiple = !!i.multiple;
                            var f = i.value;
                            f != null ? Hr(o, !!i.multiple, f, !1) : h !== !!i.multiple && (i.defaultValue != null ? Hr(o, !!i.multiple, i.defaultValue, !0) : Hr(o, !!i.multiple, i.multiple ? [] : "", !1))
                    }
                    o[ai] = i
                } catch (g) {
                    xe(e, e.return, g)
                }
            }
            break;
        case 6:
            if (Tt(t, e), Ht(e), r & 4) {
                if (e.stateNode === null) throw Error(A(162));
                o = e.stateNode, i = e.memoizedProps;
                try {
                    o.nodeValue = i
                } catch (g) {
                    xe(e, e.return, g)
                }
            }
            break;
        case 3:
            if (Tt(t, e), Ht(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
                ri(t.containerInfo)
            } catch (g) {
                xe(e, e.return, g)
            }
            break;
        case 4:
            Tt(t, e), Ht(e);
            break;
        case 13:
            Tt(t, e), Ht(e), o = e.child, o.flags & 8192 && (i = o.memoizedState !== null, o.stateNode.isHidden = i, !i || o.alternate !== null && o.alternate.memoizedState !== null || (pc = Se())), r & 4 && Kd(e);
            break;
        case 22:
            if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? (Fe = (u = Fe) || c, Tt(t, e), Fe = u) : Tt(t, e), Ht(e), r & 8192) {
                if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !c && e.mode & 1)
                    for ($ = e, c = e.child; c !== null;) {
                        for (d = $ = c; $ !== null;) {
                            switch (h = $, f = h.child, h.tag) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    Ko(4, h, h.return);
                                    break;
                                case 1:
                                    Ur(h, h.return);
                                    var v = h.stateNode;
                                    if (typeof v.componentWillUnmount == "function") {
                                        r = h, n = h.return;
                                        try {
                                            t = r, v.props = t.memoizedProps, v.state = t.memoizedState, v.componentWillUnmount()
                                        } catch (g) {
                                            xe(r, n, g)
                                        }
                                    }
                                    break;
                                case 5:
                                    Ur(h, h.return);
                                    break;
                                case 22:
                                    if (h.memoizedState !== null) {
                                        Yd(d);
                                        continue
                                    }
                            }
                            f !== null ? (f.return = h, $ = f) : Yd(d)
                        }
                        c = c.sibling
                    }
                e: for (c = null, d = e;;) {
                    if (d.tag === 5) {
                        if (c === null) {
                            c = d;
                            try {
                                o = d.stateNode, u ? (i = o.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (l = d.stateNode, a = d.memoizedProps.style, s = a != null && a.hasOwnProperty("display") ? a.display : null, l.style.display = Tp("display", s))
                            } catch (g) {
                                xe(e, e.return, g)
                            }
                        }
                    } else if (d.tag === 6) {
                        if (c === null) try {
                            d.stateNode.nodeValue = u ? "" : d.memoizedProps
                        } catch (g) {
                            xe(e, e.return, g)
                        }
                    } else if ((d.tag !== 22 && d.tag !== 23 || d.memoizedState === null || d === e) && d.child !== null) {
                        d.child.return = d, d = d.child;
                        continue
                    }
                    if (d === e) break e;
                    for (; d.sibling === null;) {
                        if (d.return === null || d.return === e) break e;
                        c === d && (c = null), d = d.return
                    }
                    c === d && (c = null), d.sibling.return = d.return, d = d.sibling
                }
            }
            break;
        case 19:
            Tt(t, e), Ht(e), r & 4 && Kd(e);
            break;
        case 21:
            break;
        default:
            Tt(t, e), Ht(e)
    }
}

function Ht(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null;) {
                    if (Jh(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(A(160))
            }
            switch (r.tag) {
                case 5:
                    var o = r.stateNode;
                    r.flags & 32 && (Jo(o, ""), r.flags &= -33);
                    var i = Qd(e);
                    ru(e, i, o);
                    break;
                case 3:
                case 4:
                    var s = r.stateNode.containerInfo,
                        l = Qd(e);
                    nu(e, l, s);
                    break;
                default:
                    throw Error(A(161))
            }
        }
        catch (a) {
            xe(e, e.return, a)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}

function cy(e, t, n) {
    $ = e, nm(e)
}

function nm(e, t, n) {
    for (var r = (e.mode & 1) !== 0; $ !== null;) {
        var o = $,
            i = o.child;
        if (o.tag === 22 && r) {
            var s = o.memoizedState !== null || Ji;
            if (!s) {
                var l = o.alternate,
                    a = l !== null && l.memoizedState !== null || Fe;
                l = Ji;
                var u = Fe;
                if (Ji = s, (Fe = a) && !u)
                    for ($ = o; $ !== null;) s = $, a = s.child, s.tag === 22 && s.memoizedState !== null ? qd(o) : a !== null ? (a.return = s, $ = a) : qd(o);
                for (; i !== null;) $ = i, nm(i), i = i.sibling;
                $ = o, Ji = l, Fe = u
            }
            Gd(e)
        } else o.subtreeFlags & 8772 && i !== null ? (i.return = o, $ = i) : Gd(e)
    }
}

function Gd(e) {
    for (; $ !== null;) {
        var t = $;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772) switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Fe || cl(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !Fe)
                            if (n === null) r.componentDidMount();
                            else {
                                var o = t.elementType === t.type ? n.memoizedProps : Ot(t.type, n.memoizedProps);
                                r.componentDidUpdate(o, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            } var i = t.updateQueue;
                        i !== null && Ld(t, i, r);
                        break;
                    case 3:
                        var s = t.updateQueue;
                        if (s !== null) {
                            if (n = null, t.child !== null) switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                            }
                            Ld(t, s, n)
                        }
                        break;
                    case 5:
                        var l = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = l;
                            var a = t.memoizedProps;
                            switch (t.type) {
                                case "button":
                                case "input":
                                case "select":
                                case "textarea":
                                    a.autoFocus && n.focus();
                                    break;
                                case "img":
                                    a.src && (n.src = a.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var u = t.alternate;
                            if (u !== null) {
                                var c = u.memoizedState;
                                if (c !== null) {
                                    var d = c.dehydrated;
                                    d !== null && ri(d)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(A(163))
                }
                Fe || t.flags & 512 && tu(t)
            } catch (h) {
                xe(t, t.return, h)
            }
        }
        if (t === e) {
            $ = null;
            break
        }
        if (n = t.sibling, n !== null) {
            n.return = t.return, $ = n;
            break
        }
        $ = t.return
    }
}

function Yd(e) {
    for (; $ !== null;) {
        var t = $;
        if (t === e) {
            $ = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return, $ = n;
            break
        }
        $ = t.return
    }
}

function qd(e) {
    for (; $ !== null;) {
        var t = $;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        cl(4, t)
                    } catch (a) {
                        xe(t, n, a)
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var o = t.return;
                        try {
                            r.componentDidMount()
                        } catch (a) {
                            xe(t, o, a)
                        }
                    }
                    var i = t.return;
                    try {
                        tu(t)
                    } catch (a) {
                        xe(t, i, a)
                    }
                    break;
                case 5:
                    var s = t.return;
                    try {
                        tu(t)
                    } catch (a) {
                        xe(t, s, a)
                    }
            }
        } catch (a) {
            xe(t, t.return, a)
        }
        if (t === e) {
            $ = null;
            break
        }
        var l = t.sibling;
        if (l !== null) {
            l.return = t.return, $ = l;
            break
        }
        $ = t.return
    }
}
var dy = Math.ceil,
    Us = yn.ReactCurrentDispatcher,
    dc = yn.ReactCurrentOwner,
    vt = yn.ReactCurrentBatchConfig,
    ee = 0,
    Oe = null,
    Ce = null,
    Le = 0,
    it = 0,
    Vr = tr(0),
    Te = 0,
    hi = null,
    Er = 0,
    dl = 0,
    fc = 0,
    Go = null,
    qe = null,
    pc = 0,
    ho = 1 / 0,
    sn = null,
    Vs = !1,
    ou = null,
    Wn = null,
    es = !1,
    Fn = null,
    Hs = 0,
    Yo = 0,
    iu = null,
    gs = -1,
    vs = 0;

function We() {
    return ee & 6 ? Se() : gs !== -1 ? gs : gs = Se()
}

function Qn(e) {
    return e.mode & 1 ? ee & 2 && Le !== 0 ? Le & -Le : G0.transition !== null ? (vs === 0 && (vs = $p()), vs) : (e = oe, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Kp(e.type)), e) : 1
}

function Dt(e, t, n, r) {
    if (50 < Yo) throw Yo = 0, iu = null, Error(A(185));
    ki(e, n, r), (!(ee & 2) || e !== Oe) && (e === Oe && (!(ee & 2) && (dl |= n), Te === 4 && jn(e, Le)), et(e, r), n === 1 && ee === 0 && !(t.mode & 1) && (ho = Se() + 500, ll && nr()))
}

function et(e, t) {
    var n = e.callbackNode;
    Gv(e, t);
    var r = Ts(e, e === Oe ? Le : 0);
    if (r === 0) n !== null && id(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
        if (n != null && id(n), t === 1) e.tag === 0 ? K0(Xd.bind(null, e)) : fh(Xd.bind(null, e)), V0(function() {
            !(ee & 6) && nr()
        }), n = null;
        else {
            switch (Bp(r)) {
                case 1:
                    n = zu;
                    break;
                case 4:
                    n = Fp;
                    break;
                case 16:
                    n = Ps;
                    break;
                case 536870912:
                    n = zp;
                    break;
                default:
                    n = Ps
            }
            n = cm(n, rm.bind(null, e))
        }
        e.callbackPriority = t, e.callbackNode = n
    }
}

function rm(e, t) {
    if (gs = -1, vs = 0, ee & 6) throw Error(A(327));
    var n = e.callbackNode;
    if (Yr() && e.callbackNode !== n) return null;
    var r = Ts(e, e === Oe ? Le : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = Ws(e, r);
    else {
        t = r;
        var o = ee;
        ee |= 2;
        var i = im();
        (Oe !== e || Le !== t) && (sn = null, ho = Se() + 500, vr(e, t));
        do try {
            hy();
            break
        } catch (l) {
            om(e, l)
        }
        while (!0);
        Zu(), Us.current = i, ee = o, Ce !== null ? t = 0 : (Oe = null, Le = 0, t = Te)
    }
    if (t !== 0) {
        if (t === 2 && (o = La(e), o !== 0 && (r = o, t = su(e, o))), t === 1) throw n = hi, vr(e, 0), jn(e, r), et(e, Se()), n;
        if (t === 6) jn(e, r);
        else {
            if (o = e.current.alternate, !(r & 30) && !fy(o) && (t = Ws(e, r), t === 2 && (i = La(e), i !== 0 && (r = i, t = su(e, i))), t === 1)) throw n = hi, vr(e, 0), jn(e, r), et(e, Se()), n;
            switch (e.finishedWork = o, e.finishedLanes = r, t) {
                case 0:
                case 1:
                    throw Error(A(345));
                case 2:
                    lr(e, qe, sn);
                    break;
                case 3:
                    if (jn(e, r), (r & 130023424) === r && (t = pc + 500 - Se(), 10 < t)) {
                        if (Ts(e, 0) !== 0) break;
                        if (o = e.suspendedLanes, (o & r) !== r) {
                            We(), e.pingedLanes |= e.suspendedLanes & o;
                            break
                        }
                        e.timeoutHandle = $a(lr.bind(null, e, qe, sn), t);
                        break
                    }
                    lr(e, qe, sn);
                    break;
                case 4:
                    if (jn(e, r), (r & 4194240) === r) break;
                    for (t = e.eventTimes, o = -1; 0 < r;) {
                        var s = 31 - It(r);
                        i = 1 << s, s = t[s], s > o && (o = s), r &= ~i
                    }
                    if (r = o, r = Se() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * dy(r / 1960)) - r, 10 < r) {
                        e.timeoutHandle = $a(lr.bind(null, e, qe, sn), r);
                        break
                    }
                    lr(e, qe, sn);
                    break;
                case 5:
                    lr(e, qe, sn);
                    break;
                default:
                    throw Error(A(329))
            }
        }
    }
    return et(e, Se()), e.callbackNode === n ? rm.bind(null, e) : null
}

function su(e, t) {
    var n = Go;
    return e.current.memoizedState.isDehydrated && (vr(e, t).flags |= 256), e = Ws(e, t), e !== 2 && (t = qe, qe = n, t !== null && lu(t)), e
}

function lu(e) {
    qe === null ? qe = e : qe.push.apply(qe, e)
}

function fy(e) {
    for (var t = e;;) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores, n !== null))
                for (var r = 0; r < n.length; r++) {
                    var o = n[r],
                        i = o.getSnapshot;
                    o = o.value;
                    try {
                        if (!zt(i(), o)) return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
        else {
            if (t === e) break;
            for (; t.sibling === null;) {
                if (t.return === null || t.return === e) return !0;
                t = t.return
            }
            t.sibling.return = t.return, t = t.sibling
        }
    }
    return !0
}

function jn(e, t) {
    for (t &= ~fc, t &= ~dl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
        var n = 31 - It(t),
            r = 1 << n;
        e[n] = -1, t &= ~r
    }
}

function Xd(e) {
    if (ee & 6) throw Error(A(327));
    Yr();
    var t = Ts(e, 0);
    if (!(t & 1)) return et(e, Se()), null;
    var n = Ws(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = La(e);
        r !== 0 && (t = r, n = su(e, r))
    }
    if (n === 1) throw n = hi, vr(e, 0), jn(e, t), et(e, Se()), n;
    if (n === 6) throw Error(A(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, lr(e, qe, sn), et(e, Se()), null
}

function hc(e, t) {
    var n = ee;
    ee |= 1;
    try {
        return e(t)
    } finally {
        ee = n, ee === 0 && (ho = Se() + 500, ll && nr())
    }
}

function Cr(e) {
    Fn !== null && Fn.tag === 0 && !(ee & 6) && Yr();
    var t = ee;
    ee |= 1;
    var n = vt.transition,
        r = oe;
    try {
        if (vt.transition = null, oe = 1, e) return e()
    } finally {
        oe = r, vt.transition = n, ee = t, !(ee & 6) && nr()
    }
}

function mc() {
    it = Vr.current, de(Vr)
}

function vr(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, U0(n)), Ce !== null)
        for (n = Ce.return; n !== null;) {
            var r = n;
            switch (Yu(r), r.tag) {
                case 1:
                    r = r.type.childContextTypes, r != null && Ls();
                    break;
                case 3:
                    fo(), de(Ze), de(ze), oc();
                    break;
                case 5:
                    rc(r);
                    break;
                case 4:
                    fo();
                    break;
                case 13:
                    de(pe);
                    break;
                case 19:
                    de(pe);
                    break;
                case 10:
                    Ju(r.type._context);
                    break;
                case 22:
                case 23:
                    mc()
            }
            n = n.return
        }
    if (Oe = e, Ce = e = Kn(e.current, null), Le = it = t, Te = 0, hi = null, fc = dl = Er = 0, qe = Go = null, ur !== null) {
        for (t = 0; t < ur.length; t++)
            if (n = ur[t], r = n.interleaved, r !== null) {
                n.interleaved = null;
                var o = r.next,
                    i = n.pending;
                if (i !== null) {
                    var s = i.next;
                    i.next = o, r.next = s
                }
                n.pending = r
            } ur = null
    }
    return e
}

function om(e, t) {
    do {
        var n = Ce;
        try {
            if (Zu(), ps.current = Bs, $s) {
                for (var r = me.memoizedState; r !== null;) {
                    var o = r.queue;
                    o !== null && (o.pending = null), r = r.next
                }
                $s = !1
            }
            if (Sr = 0, Re = ke = me = null, Qo = !1, di = 0, dc.current = null, n === null || n.return === null) {
                Te = 1, hi = t, Ce = null;
                break
            }
            e: {
                var i = e,
                    s = n.return,
                    l = n,
                    a = t;
                if (t = Le, l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
                    var u = a,
                        c = l,
                        d = c.tag;
                    if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
                        var h = c.alternate;
                        h ? (c.updateQueue = h.updateQueue, c.memoizedState = h.memoizedState, c.lanes = h.lanes) : (c.updateQueue = null, c.memoizedState = null)
                    }
                    var f = Fd(s);
                    if (f !== null) {
                        f.flags &= -257, zd(f, s, l, i, t), f.mode & 1 && Dd(i, u, t), t = f, a = u;
                        var v = t.updateQueue;
                        if (v === null) {
                            var g = new Set;
                            g.add(a), t.updateQueue = g
                        } else v.add(a);
                        break e
                    } else {
                        if (!(t & 1)) {
                            Dd(i, u, t), gc();
                            break e
                        }
                        a = Error(A(426))
                    }
                } else if (fe && l.mode & 1) {
                    var w = Fd(s);
                    if (w !== null) {
                        !(w.flags & 65536) && (w.flags |= 256), zd(w, s, l, i, t), qu(po(a, l));
                        break e
                    }
                }
                i = a = po(a, l),
                Te !== 4 && (Te = 2),
                Go === null ? Go = [i] : Go.push(i),
                i = s;do {
                    switch (i.tag) {
                        case 3:
                            i.flags |= 65536, t &= -t, i.lanes |= t;
                            var p = Bh(i, a, t);
                            jd(i, p);
                            break e;
                        case 1:
                            l = a;
                            var m = i.type,
                                y = i.stateNode;
                            if (!(i.flags & 128) && (typeof m.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (Wn === null || !Wn.has(y)))) {
                                i.flags |= 65536, t &= -t, i.lanes |= t;
                                var E = Uh(i, l, t);
                                jd(i, E);
                                break e
                            }
                    }
                    i = i.return
                } while (i !== null)
            }
            lm(n)
        } catch (C) {
            t = C, Ce === n && n !== null && (Ce = n = n.return);
            continue
        }
        break
    } while (!0)
}

function im() {
    var e = Us.current;
    return Us.current = Bs, e === null ? Bs : e
}

function gc() {
    (Te === 0 || Te === 3 || Te === 2) && (Te = 4), Oe === null || !(Er & 268435455) && !(dl & 268435455) || jn(Oe, Le)
}

function Ws(e, t) {
    var n = ee;
    ee |= 2;
    var r = im();
    (Oe !== e || Le !== t) && (sn = null, vr(e, t));
    do try {
        py();
        break
    } catch (o) {
        om(e, o)
    }
    while (!0);
    if (Zu(), ee = n, Us.current = r, Ce !== null) throw Error(A(261));
    return Oe = null, Le = 0, Te
}

function py() {
    for (; Ce !== null;) sm(Ce)
}

function hy() {
    for (; Ce !== null && !zv();) sm(Ce)
}

function sm(e) {
    var t = um(e.alternate, e, it);
    e.memoizedProps = e.pendingProps, t === null ? lm(e) : Ce = t, dc.current = null
}

function lm(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return, t.flags & 32768) {
            if (n = ly(n, t), n !== null) {
                n.flags &= 32767, Ce = n;
                return
            }
            if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
            else {
                Te = 6, Ce = null;
                return
            }
        } else if (n = sy(n, t, it), n !== null) {
            Ce = n;
            return
        }
        if (t = t.sibling, t !== null) {
            Ce = t;
            return
        }
        Ce = t = e
    } while (t !== null);
    Te === 0 && (Te = 5)
}

function lr(e, t, n) {
    var r = oe,
        o = vt.transition;
    try {
        vt.transition = null, oe = 1, my(e, t, n, r)
    } finally {
        vt.transition = o, oe = r
    }
    return null
}

function my(e, t, n, r) {
    do Yr(); while (Fn !== null);
    if (ee & 6) throw Error(A(327));
    n = e.finishedWork;
    var o = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(A(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var i = n.lanes | n.childLanes;
    if (Yv(e, i), e === Oe && (Ce = Oe = null, Le = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || es || (es = !0, cm(Ps, function() {
            return Yr(), null
        })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
        i = vt.transition, vt.transition = null;
        var s = oe;
        oe = 1;
        var l = ee;
        ee |= 4, dc.current = null, uy(e, n), tm(n, e), _0(Fa), Ns = !!Da, Fa = Da = null, e.current = n, cy(n), $v(), ee = l, oe = s, vt.transition = i
    } else e.current = n;
    if (es && (es = !1, Fn = e, Hs = o), i = e.pendingLanes, i === 0 && (Wn = null), Vv(n.stateNode), et(e, Se()), t !== null)
        for (r = e.onRecoverableError, n = 0; n < t.length; n++) o = t[n], r(o.value, {
            componentStack: o.stack,
            digest: o.digest
        });
    if (Vs) throw Vs = !1, e = ou, ou = null, e;
    return Hs & 1 && e.tag !== 0 && Yr(), i = e.pendingLanes, i & 1 ? e === iu ? Yo++ : (Yo = 0, iu = e) : Yo = 0, nr(), null
}

function Yr() {
    if (Fn !== null) {
        var e = Bp(Hs),
            t = vt.transition,
            n = oe;
        try {
            if (vt.transition = null, oe = 16 > e ? 16 : e, Fn === null) var r = !1;
            else {
                if (e = Fn, Fn = null, Hs = 0, ee & 6) throw Error(A(331));
                var o = ee;
                for (ee |= 4, $ = e.current; $ !== null;) {
                    var i = $,
                        s = i.child;
                    if ($.flags & 16) {
                        var l = i.deletions;
                        if (l !== null) {
                            for (var a = 0; a < l.length; a++) {
                                var u = l[a];
                                for ($ = u; $ !== null;) {
                                    var c = $;
                                    switch (c.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Ko(8, c, i)
                                    }
                                    var d = c.child;
                                    if (d !== null) d.return = c, $ = d;
                                    else
                                        for (; $ !== null;) {
                                            c = $;
                                            var h = c.sibling,
                                                f = c.return;
                                            if (Zh(c), c === u) {
                                                $ = null;
                                                break
                                            }
                                            if (h !== null) {
                                                h.return = f, $ = h;
                                                break
                                            }
                                            $ = f
                                        }
                                }
                            }
                            var v = i.alternate;
                            if (v !== null) {
                                var g = v.child;
                                if (g !== null) {
                                    v.child = null;
                                    do {
                                        var w = g.sibling;
                                        g.sibling = null, g = w
                                    } while (g !== null)
                                }
                            }
                            $ = i
                        }
                    }
                    if (i.subtreeFlags & 2064 && s !== null) s.return = i, $ = s;
                    else e: for (; $ !== null;) {
                        if (i = $, i.flags & 2048) switch (i.tag) {
                            case 0:
                            case 11:
                            case 15:
                                Ko(9, i, i.return)
                        }
                        var p = i.sibling;
                        if (p !== null) {
                            p.return = i.return, $ = p;
                            break e
                        }
                        $ = i.return
                    }
                }
                var m = e.current;
                for ($ = m; $ !== null;) {
                    s = $;
                    var y = s.child;
                    if (s.subtreeFlags & 2064 && y !== null) y.return = s, $ = y;
                    else e: for (s = m; $ !== null;) {
                        if (l = $, l.flags & 2048) try {
                            switch (l.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    cl(9, l)
                            }
                        } catch (C) {
                            xe(l, l.return, C)
                        }
                        if (l === s) {
                            $ = null;
                            break e
                        }
                        var E = l.sibling;
                        if (E !== null) {
                            E.return = l.return, $ = E;
                            break e
                        }
                        $ = l.return
                    }
                }
                if (ee = o, nr(), Xt && typeof Xt.onPostCommitFiberRoot == "function") try {
                    Xt.onPostCommitFiberRoot(nl, e)
                } catch {}
                r = !0
            }
            return r
        } finally {
            oe = n, vt.transition = t
        }
    }
    return !1
}

function Zd(e, t, n) {
    t = po(n, t), t = Bh(e, t, 1), e = Hn(e, t, 1), t = We(), e !== null && (ki(e, 1, t), et(e, t))
}

function xe(e, t, n) {
    if (e.tag === 3) Zd(e, e, n);
    else
        for (; t !== null;) {
            if (t.tag === 3) {
                Zd(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Wn === null || !Wn.has(r))) {
                    e = po(n, e), e = Uh(t, e, 1), t = Hn(t, e, 1), e = We(), t !== null && (ki(t, 1, e), et(t, e));
                    break
                }
            }
            t = t.return
        }
}

function gy(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = We(), e.pingedLanes |= e.suspendedLanes & n, Oe === e && (Le & n) === n && (Te === 4 || Te === 3 && (Le & 130023424) === Le && 500 > Se() - pc ? vr(e, 0) : fc |= n), et(e, t)
}

function am(e, t) {
    t === 0 && (e.mode & 1 ? (t = Hi, Hi <<= 1, !(Hi & 130023424) && (Hi = 4194304)) : t = 1);
    var n = We();
    e = hn(e, t), e !== null && (ki(e, t, n), et(e, n))
}

function vy(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), am(e, n)
}

function yy(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                o = e.memoizedState;
            o !== null && (n = o.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(A(314))
    }
    r !== null && r.delete(t), am(e, n)
}
var um;
um = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Ze.current) Xe = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128)) return Xe = !1, iy(e, t, n);
            Xe = !!(e.flags & 131072)
        }
    else Xe = !1, fe && t.flags & 1048576 && ph(t, _s, t.index);
    switch (t.lanes = 0, t.tag) {
        case 2:
            var r = t.type;
            ms(e, t), e = t.pendingProps;
            var o = ao(t, ze.current);
            Gr(t, n), o = sc(null, t, r, e, o, n);
            var i = lc();
            return t.flags |= 1, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Je(r) ? (i = !0, As(t)) : i = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, tc(t), o.updater = ul, t.stateNode = o, o._reactInternals = t, Ka(t, r, e, n), t = qa(null, t, r, !0, i, n)) : (t.tag = 0, fe && i && Gu(t), Ve(null, t, o, n), t = t.child), t;
        case 16:
            r = t.elementType;
            e: {
                switch (ms(e, t), e = t.pendingProps, o = r._init, r = o(r._payload), t.type = r, o = t.tag = xy(r), e = Ot(r, e), o) {
                    case 0:
                        t = Ya(null, t, r, e, n);
                        break e;
                    case 1:
                        t = Ud(null, t, r, e, n);
                        break e;
                    case 11:
                        t = $d(null, t, r, e, n);
                        break e;
                    case 14:
                        t = Bd(null, t, r, Ot(r.type, e), n);
                        break e
                }
                throw Error(A(306, r, ""))
            }
            return t;
        case 0:
            return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : Ot(r, o), Ya(e, t, r, o, n);
        case 1:
            return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : Ot(r, o), Ud(e, t, r, o, n);
        case 3:
            e: {
                if (Qh(t), e === null) throw Error(A(387));r = t.pendingProps,
                i = t.memoizedState,
                o = i.element,
                wh(e, t),
                Fs(t, r, null, n);
                var s = t.memoizedState;
                if (r = s.element, i.isDehydrated)
                    if (i = {
                            element: r,
                            isDehydrated: !1,
                            cache: s.cache,
                            pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
                            transitions: s.transitions
                        }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
                        o = po(Error(A(423)), t), t = Vd(e, t, r, n, o);
                        break e
                    } else if (r !== o) {
                    o = po(Error(A(424)), t), t = Vd(e, t, r, n, o);
                    break e
                } else
                    for (lt = Vn(t.stateNode.containerInfo.firstChild), at = t, fe = !0, _t = null, n = vh(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
                else {
                    if (uo(), r === o) {
                        t = mn(e, t, n);
                        break e
                    }
                    Ve(e, t, r, n)
                }
                t = t.child
            }
            return t;
        case 5:
            return xh(t), e === null && Ha(t), r = t.type, o = t.pendingProps, i = e !== null ? e.memoizedProps : null, s = o.children, za(r, o) ? s = null : i !== null && za(r, i) && (t.flags |= 32), Wh(e, t), Ve(e, t, s, n), t.child;
        case 6:
            return e === null && Ha(t), null;
        case 13:
            return Kh(e, t, n);
        case 4:
            return nc(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = co(t, null, r, n) : Ve(e, t, r, n), t.child;
        case 11:
            return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : Ot(r, o), $d(e, t, r, o, n);
        case 7:
            return Ve(e, t, t.pendingProps, n), t.child;
        case 8:
            return Ve(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return Ve(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (r = t.type._context, o = t.pendingProps, i = t.memoizedProps, s = o.value, le(Is, r._currentValue), r._currentValue = s, i !== null)
                    if (zt(i.value, s)) {
                        if (i.children === o.children && !Ze.current) {
                            t = mn(e, t, n);
                            break e
                        }
                    } else
                        for (i = t.child, i !== null && (i.return = t); i !== null;) {
                            var l = i.dependencies;
                            if (l !== null) {
                                s = i.child;
                                for (var a = l.firstContext; a !== null;) {
                                    if (a.context === r) {
                                        if (i.tag === 1) {
                                            a = dn(-1, n & -n), a.tag = 2;
                                            var u = i.updateQueue;
                                            if (u !== null) {
                                                u = u.shared;
                                                var c = u.pending;
                                                c === null ? a.next = a : (a.next = c.next, c.next = a), u.pending = a
                                            }
                                        }
                                        i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), Wa(i.return, n, t), l.lanes |= n;
                                        break
                                    }
                                    a = a.next
                                }
                            } else if (i.tag === 10) s = i.type === t.type ? null : i.child;
                            else if (i.tag === 18) {
                                if (s = i.return, s === null) throw Error(A(341));
                                s.lanes |= n, l = s.alternate, l !== null && (l.lanes |= n), Wa(s, n, t), s = i.sibling
                            } else s = i.child;
                            if (s !== null) s.return = i;
                            else
                                for (s = i; s !== null;) {
                                    if (s === t) {
                                        s = null;
                                        break
                                    }
                                    if (i = s.sibling, i !== null) {
                                        i.return = s.return, s = i;
                                        break
                                    }
                                    s = s.return
                                }
                            i = s
                        }
                Ve(e, t, o.children, n),
                t = t.child
            }
            return t;
        case 9:
            return o = t.type, r = t.pendingProps.children, Gr(t, n), o = yt(o), r = r(o), t.flags |= 1, Ve(e, t, r, n), t.child;
        case 14:
            return r = t.type, o = Ot(r, t.pendingProps), o = Ot(r.type, o), Bd(e, t, r, o, n);
        case 15:
            return Vh(e, t, t.type, t.pendingProps, n);
        case 17:
            return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : Ot(r, o), ms(e, t), t.tag = 1, Je(r) ? (e = !0, As(t)) : e = !1, Gr(t, n), $h(t, r, o), Ka(t, r, o, n), qa(null, t, r, !0, e, n);
        case 19:
            return Gh(e, t, n);
        case 22:
            return Hh(e, t, n)
    }
    throw Error(A(156, t.tag))
};

function cm(e, t) {
    return Dp(e, t)
}

function wy(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
}

function gt(e, t, n, r) {
    return new wy(e, t, n, r)
}

function vc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent)
}

function xy(e) {
    if (typeof e == "function") return vc(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof, e === Iu) return 11;
        if (e === Du) return 14
    }
    return 2
}

function Kn(e, t) {
    var n = e.alternate;
    return n === null ? (n = gt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
}

function ys(e, t, n, r, o, i) {
    var s = 2;
    if (r = e, typeof e == "function") vc(e) && (s = 1);
    else if (typeof e == "string") s = 5;
    else e: switch (e) {
        case Ar:
            return yr(n.children, o, i, t);
        case _u:
            s = 8, o |= 8;
            break;
        case va:
            return e = gt(12, n, t, o | 2), e.elementType = va, e.lanes = i, e;
        case ya:
            return e = gt(13, n, t, o), e.elementType = ya, e.lanes = i, e;
        case wa:
            return e = gt(19, n, t, o), e.elementType = wa, e.lanes = i, e;
        case xp:
            return fl(n, o, i, t);
        default:
            if (typeof e == "object" && e !== null) switch (e.$$typeof) {
                case yp:
                    s = 10;
                    break e;
                case wp:
                    s = 9;
                    break e;
                case Iu:
                    s = 11;
                    break e;
                case Du:
                    s = 14;
                    break e;
                case Nn:
                    s = 16, r = null;
                    break e
            }
            throw Error(A(130, e == null ? e : typeof e, ""))
    }
    return t = gt(s, n, t, o), t.elementType = e, t.type = r, t.lanes = i, t
}

function yr(e, t, n, r) {
    return e = gt(7, e, r, t), e.lanes = n, e
}

function fl(e, t, n, r) {
    return e = gt(22, e, r, t), e.elementType = xp, e.lanes = n, e.stateNode = {
        isHidden: !1
    }, e
}

function sa(e, t, n) {
    return e = gt(6, e, null, t), e.lanes = n, e
}

function la(e, t, n) {
    return t = gt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    }, t
}

function Sy(e, t, n, r, o) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Bl(0), this.expirationTimes = Bl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Bl(0), this.identifierPrefix = r, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null
}

function yc(e, t, n, r, o, i, s, l, a) {
    return e = new Sy(e, t, n, l, a), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = gt(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    }, tc(i), e
}

function Ey(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Lr,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}

function dm(e) {
    if (!e) return Yn;
    e = e._reactInternals;
    e: {
        if (Tr(e) !== e || e.tag !== 1) throw Error(A(170));
        var t = e;do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (Je(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e
                    }
            }
            t = t.return
        } while (t !== null);
        throw Error(A(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (Je(n)) return dh(e, n, t)
    }
    return t
}

function fm(e, t, n, r, o, i, s, l, a) {
    return e = yc(n, r, !0, e, o, i, s, l, a), e.context = dm(null), n = e.current, r = We(), o = Qn(n), i = dn(r, o), i.callback = t ?? null, Hn(n, i, o), e.current.lanes = o, ki(e, o, r), et(e, r), e
}

function pl(e, t, n, r) {
    var o = t.current,
        i = We(),
        s = Qn(o);
    return n = dm(n), t.context === null ? t.context = n : t.pendingContext = n, t = dn(i, s), t.payload = {
        element: e
    }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Hn(o, t, s), e !== null && (Dt(e, o, s, i), fs(e, o, s)), s
}

function Qs(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode
    }
}

function Jd(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}

function wc(e, t) {
    Jd(e, t), (e = e.alternate) && Jd(e, t)
}

function Cy() {
    return null
}
var pm = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
};

function xc(e) {
    this._internalRoot = e
}
hl.prototype.render = xc.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(A(409));
    pl(e, t, null, null)
};
hl.prototype.unmount = xc.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Cr(function() {
            pl(null, e, null, null)
        }), t[pn] = null
    }
};

function hl(e) {
    this._internalRoot = e
}
hl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = Hp();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < On.length && t !== 0 && t < On[n].priority; n++);
        On.splice(n, 0, e), n === 0 && Qp(e)
    }
};

function Sc(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}

function ml(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}

function ef() {}

function by(e, t, n, r, o) {
    if (o) {
        if (typeof r == "function") {
            var i = r;
            r = function() {
                var u = Qs(s);
                i.call(u)
            }
        }
        var s = fm(t, r, e, 0, null, !1, !1, "", ef);
        return e._reactRootContainer = s, e[pn] = s.current, si(e.nodeType === 8 ? e.parentNode : e), Cr(), s
    }
    for (; o = e.lastChild;) e.removeChild(o);
    if (typeof r == "function") {
        var l = r;
        r = function() {
            var u = Qs(a);
            l.call(u)
        }
    }
    var a = yc(e, 0, !1, null, null, !1, !1, "", ef);
    return e._reactRootContainer = a, e[pn] = a.current, si(e.nodeType === 8 ? e.parentNode : e), Cr(function() {
        pl(t, a, n, r)
    }), a
}

function gl(e, t, n, r, o) {
    var i = n._reactRootContainer;
    if (i) {
        var s = i;
        if (typeof o == "function") {
            var l = o;
            o = function() {
                var a = Qs(s);
                l.call(a)
            }
        }
        pl(t, s, e, o)
    } else s = by(n, t, e, o, r);
    return Qs(s)
}
Up = function(e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = Fo(t.pendingLanes);
                n !== 0 && ($u(t, n | 1), et(t, Se()), !(ee & 6) && (ho = Se() + 500, nr()))
            }
            break;
        case 13:
            Cr(function() {
                var r = hn(e, 1);
                if (r !== null) {
                    var o = We();
                    Dt(r, e, 1, o)
                }
            }), wc(e, 1)
    }
};
Bu = function(e) {
    if (e.tag === 13) {
        var t = hn(e, 134217728);
        if (t !== null) {
            var n = We();
            Dt(t, e, 134217728, n)
        }
        wc(e, 134217728)
    }
};
Vp = function(e) {
    if (e.tag === 13) {
        var t = Qn(e),
            n = hn(e, t);
        if (n !== null) {
            var r = We();
            Dt(n, e, t, r)
        }
        wc(e, t)
    }
};
Hp = function() {
    return oe
};
Wp = function(e, t) {
    var n = oe;
    try {
        return oe = e, t()
    } finally {
        oe = n
    }
};
Ra = function(e, t, n) {
    switch (t) {
        case "input":
            if (Ea(e, n), t = n.name, n.type === "radio" && t != null) {
                for (n = e; n.parentNode;) n = n.parentNode;
                for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var o = sl(r);
                        if (!o) throw Error(A(90));
                        Ep(r), Ea(r, o)
                    }
                }
            }
            break;
        case "textarea":
            bp(e, n);
            break;
        case "select":
            t = n.value, t != null && Hr(e, !!n.multiple, t, !1)
    }
};
jp = hc;
Lp = Cr;
var ky = {
        usingClientEntryPoint: !1,
        Events: [Ti, Dr, sl, Rp, Op, hc]
    },
    Ao = {
        findFiberByHostInstance: ar,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom"
    },
    Py = {
        bundleType: Ao.bundleType,
        version: Ao.version,
        rendererPackageName: Ao.rendererPackageName,
        rendererConfig: Ao.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: yn.ReactCurrentDispatcher,
        findHostInstanceByFiber: function(e) {
            return e = _p(e), e === null ? null : e.stateNode
        },
        findFiberByHostInstance: Ao.findFiberByHostInstance || Cy,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ts = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ts.isDisabled && ts.supportsFiber) try {
        nl = ts.inject(Py), Xt = ts
    } catch {}
}
dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ky;
dt.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Sc(t)) throw Error(A(200));
    return Ey(e, t, null, n)
};
dt.createRoot = function(e, t) {
    if (!Sc(e)) throw Error(A(299));
    var n = !1,
        r = "",
        o = pm;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = yc(e, 1, !1, null, null, n, !1, r, o), e[pn] = t.current, si(e.nodeType === 8 ? e.parentNode : e), new xc(t)
};
dt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0) throw typeof e.render == "function" ? Error(A(188)) : (e = Object.keys(e).join(","), Error(A(268, e)));
    return e = _p(t), e = e === null ? null : e.stateNode, e
};
dt.flushSync = function(e) {
    return Cr(e)
};
dt.hydrate = function(e, t, n) {
    if (!ml(t)) throw Error(A(200));
    return gl(null, e, t, !0, n)
};
dt.hydrateRoot = function(e, t, n) {
    if (!Sc(e)) throw Error(A(405));
    var r = n != null && n.hydratedSources || null,
        o = !1,
        i = "",
        s = pm;
    if (n != null && (n.unstable_strictMode === !0 && (o = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = fm(t, null, e, 1, n ?? null, o, !1, i, s), e[pn] = t.current, si(e), r)
        for (e = 0; e < r.length; e++) n = r[e], o = n._getVersion, o = o(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, o] : t.mutableSourceEagerHydrationData.push(n, o);
    return new hl(t)
};
dt.render = function(e, t, n) {
    if (!ml(t)) throw Error(A(200));
    return gl(null, e, t, !1, n)
};
dt.unmountComponentAtNode = function(e) {
    if (!ml(e)) throw Error(A(40));
    return e._reactRootContainer ? (Cr(function() {
        gl(null, null, e, !1, function() {
            e._reactRootContainer = null, e[pn] = null
        })
    }), !0) : !1
};
dt.unstable_batchedUpdates = hc;
dt.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!ml(n)) throw Error(A(200));
    if (e == null || e._reactInternals === void 0) throw Error(A(38));
    return gl(e, t, n, !1, r)
};
dt.version = "18.3.1-next-f1338f8080-20240426";

function hm() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(hm)
    } catch (e) {
        console.error(e)
    }
}
hm(), hp.exports = dt;
var Ri = hp.exports;
const mm = tp(Ri);
var gm, tf = Ri;
gm = tf.createRoot, tf.hydrateRoot;
const Ty = 1,
    Ny = 1e6;
let aa = 0;

function Ry() {
    return aa = (aa + 1) % Number.MAX_SAFE_INTEGER, aa.toString()
}
const ua = new Map,
    nf = e => {
        if (ua.has(e)) return;
        const t = setTimeout(() => {
            ua.delete(e), qo({
                type: "REMOVE_TOAST",
                toastId: e
            })
        }, Ny);
        ua.set(e, t)
    },
    Oy = (e, t) => {
        switch (t.type) {
            case "ADD_TOAST":
                return {
                    ...e, toasts: [t.toast, ...e.toasts].slice(0, Ty)
                };
            case "UPDATE_TOAST":
                return {
                    ...e, toasts: e.toasts.map(n => n.id === t.toast.id ? {
                        ...n,
                        ...t.toast
                    } : n)
                };
            case "DISMISS_TOAST": {
                const {
                    toastId: n
                } = t;
                return n ? nf(n) : e.toasts.forEach(r => {
                    nf(r.id)
                }), {
                    ...e,
                    toasts: e.toasts.map(r => r.id === n || n === void 0 ? {
                        ...r,
                        open: !1
                    } : r)
                }
            }
            case "REMOVE_TOAST":
                return t.toastId === void 0 ? {
                    ...e,
                    toasts: []
                } : {
                    ...e,
                    toasts: e.toasts.filter(n => n.id !== t.toastId)
                }
        }
    },
    ws = [];
let xs = {
    toasts: []
};

function qo(e) {
    xs = Oy(xs, e), ws.forEach(t => {
        t(xs)
    })
}

function jy({
    ...e
}) {
    const t = Ry(),
        n = o => qo({
            type: "UPDATE_TOAST",
            toast: {
                ...o,
                id: t
            }
        }),
        r = () => qo({
            type: "DISMISS_TOAST",
            toastId: t
        });
    return qo({
        type: "ADD_TOAST",
        toast: {
            ...e,
            id: t,
            open: !0,
            onOpenChange: o => {
                o || r()
            }
        }
    }), {
        id: t,
        dismiss: r,
        update: n
    }
}

function Ly() {
    const [e, t] = x.useState(xs);
    return x.useEffect(() => (ws.push(t), () => {
        const n = ws.indexOf(t);
        n > -1 && ws.splice(n, 1)
    }), [e]), {
        ...e,
        toast: jy,
        dismiss: n => qo({
            type: "DISMISS_TOAST",
            toastId: n
        })
    }
}

function Pe(e, t, {
    checkForDefaultPrevented: n = !0
} = {}) {
    return function(o) {
        if (e == null || e(o), n === !1 || !o.defaultPrevented) return t == null ? void 0 : t(o)
    }
}

function rf(e, t) {
    if (typeof e == "function") return e(t);
    e != null && (e.current = t)
}

function vm(...e) {
    return t => {
        let n = !1;
        const r = e.map(o => {
            const i = rf(o, t);
            return !n && typeof i == "function" && (n = !0), i
        });
        if (n) return () => {
            for (let o = 0; o < r.length; o++) {
                const i = r[o];
                typeof i == "function" ? i() : rf(e[o], null)
            }
        }
    }
}

function $t(...e) {
    return x.useCallback(vm(...e), e)
}

function vl(e, t = []) {
    let n = [];

    function r(i, s) {
        const l = x.createContext(s),
            a = n.length;
        n = [...n, s];
        const u = d => {
            var p;
            const {
                scope: h,
                children: f,
                ...v
            } = d, g = ((p = h == null ? void 0 : h[e]) == null ? void 0 : p[a]) || l, w = x.useMemo(() => v, Object.values(v));
            return S.jsx(g.Provider, {
                value: w,
                children: f
            })
        };
        u.displayName = i + "Provider";

        function c(d, h) {
            var g;
            const f = ((g = h == null ? void 0 : h[e]) == null ? void 0 : g[a]) || l,
                v = x.useContext(f);
            if (v) return v;
            if (s !== void 0) return s;
            throw new Error(`\`${d}\` must be used within \`${i}\``)
        }
        return [u, c]
    }
    const o = () => {
        const i = n.map(s => x.createContext(s));
        return function(l) {
            const a = (l == null ? void 0 : l[e]) || i;
            return x.useMemo(() => ({
                [`__scope${e}`]: {
                    ...l,
                    [e]: a
                }
            }), [l, a])
        }
    };
    return o.scopeName = e, [r, Ay(o, ...t)]
}

function Ay(...e) {
    const t = e[0];
    if (e.length === 1) return t;
    const n = () => {
        const r = e.map(o => ({
            useScope: o(),
            scopeName: o.scopeName
        }));
        return function(i) {
            const s = r.reduce((l, {
                useScope: a,
                scopeName: u
            }) => {
                const d = a(i)[`__scope${u}`];
                return {
                    ...l,
                    ...d
                }
            }, {});
            return x.useMemo(() => ({
                [`__scope${t.scopeName}`]: s
            }), [s])
        }
    };
    return n.scopeName = t.scopeName, n
}

function au(e) {
    const t = My(e),
        n = x.forwardRef((r, o) => {
            const {
                children: i,
                ...s
            } = r, l = x.Children.toArray(i), a = l.find(Iy);
            if (a) {
                const u = a.props.children,
                    c = l.map(d => d === a ? x.Children.count(u) > 1 ? x.Children.only(null) : x.isValidElement(u) ? u.props.children : null : d);
                return S.jsx(t, {
                    ...s,
                    ref: o,
                    children: x.isValidElement(u) ? x.cloneElement(u, void 0, c) : null
                })
            }
            return S.jsx(t, {
                ...s,
                ref: o,
                children: i
            })
        });
    return n.displayName = `${e}.Slot`, n
}

function My(e) {
    const t = x.forwardRef((n, r) => {
        const {
            children: o,
            ...i
        } = n;
        if (x.isValidElement(o)) {
            const s = Fy(o),
                l = Dy(i, o.props);
            return o.type !== x.Fragment && (l.ref = r ? vm(r, s) : s), x.cloneElement(o, l)
        }
        return x.Children.count(o) > 1 ? x.Children.only(null) : null
    });
    return t.displayName = `${e}.SlotClone`, t
}
var ym = Symbol("radix.slottable");

function _y(e) {
    const t = ({
        children: n
    }) => S.jsx(S.Fragment, {
        children: n
    });
    return t.displayName = `${e}.Slottable`, t.__radixId = ym, t
}

function Iy(e) {
    return x.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ym
}

function Dy(e, t) {
    const n = {
        ...t
    };
    for (const r in t) {
        const o = e[r],
            i = t[r];
        /^on[A-Z]/.test(r) ? o && i ? n[r] = (...l) => {
            const a = i(...l);
            return o(...l), a
        } : o && (n[r] = o) : r === "style" ? n[r] = {
            ...o,
            ...i
        } : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "))
    }
    return {
        ...e,
        ...n
    }
}

function Fy(e) {
    var r, o;
    let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get,
        n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}

function zy(e) {
    const t = e + "CollectionProvider",
        [n, r] = vl(t),
        [o, i] = n(t, {
            collectionRef: {
                current: null
            },
            itemMap: new Map
        }),
        s = g => {
            const {
                scope: w,
                children: p
            } = g, m = _.useRef(null), y = _.useRef(new Map).current;
            return S.jsx(o, {
                scope: w,
                itemMap: y,
                collectionRef: m,
                children: p
            })
        };
    s.displayName = t;
    const l = e + "CollectionSlot",
        a = au(l),
        u = _.forwardRef((g, w) => {
            const {
                scope: p,
                children: m
            } = g, y = i(l, p), E = $t(w, y.collectionRef);
            return S.jsx(a, {
                ref: E,
                children: m
            })
        });
    u.displayName = l;
    const c = e + "CollectionItemSlot",
        d = "data-radix-collection-item",
        h = au(c),
        f = _.forwardRef((g, w) => {
            const {
                scope: p,
                children: m,
                ...y
            } = g, E = _.useRef(null), C = $t(w, E), k = i(c, p);
            return _.useEffect(() => (k.itemMap.set(E, {
                ref: E,
                ...y
            }), () => void k.itemMap.delete(E))), S.jsx(h, {
                [d]: "",
                ref: C,
                children: m
            })
        });
    f.displayName = c;

    function v(g) {
        const w = i(e + "CollectionConsumer", g);
        return _.useCallback(() => {
            const m = w.collectionRef.current;
            if (!m) return [];
            const y = Array.from(m.querySelectorAll(`[${d}]`));
            return Array.from(w.itemMap.values()).sort((k, b) => y.indexOf(k.ref.current) - y.indexOf(b.ref.current))
        }, [w.collectionRef, w.itemMap])
    }
    return [{
        Provider: s,
        Slot: u,
        ItemSlot: f
    }, v, r]
}
var $y = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"],
    nt = $y.reduce((e, t) => {
        const n = au(`Primitive.${t}`),
            r = x.forwardRef((o, i) => {
                const {
                    asChild: s,
                    ...l
                } = o, a = s ? n : t;
                return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), S.jsx(a, {
                    ...l,
                    ref: i
                })
            });
        return r.displayName = `Primitive.${t}`, {
            ...e,
            [t]: r
        }
    }, {});

function wm(e, t) {
    e && Ri.flushSync(() => e.dispatchEvent(t))
}

function qn(e) {
    const t = x.useRef(e);
    return x.useEffect(() => {
        t.current = e
    }), x.useMemo(() => (...n) => {
        var r;
        return (r = t.current) == null ? void 0 : r.call(t, ...n)
    }, [])
}

function By(e, t = globalThis == null ? void 0 : globalThis.document) {
    const n = qn(e);
    x.useEffect(() => {
        const r = o => {
            o.key === "Escape" && n(o)
        };
        return t.addEventListener("keydown", r, {
            capture: !0
        }), () => t.removeEventListener("keydown", r, {
            capture: !0
        })
    }, [n, t])
}
var Uy = "DismissableLayer",
    uu = "dismissableLayer.update",
    Vy = "dismissableLayer.pointerDownOutside",
    Hy = "dismissableLayer.focusOutside",
    of, xm = x.createContext({
        layers: new Set,
        layersWithOutsidePointerEventsDisabled: new Set,
        branches: new Set
    }),
    Ec = x.forwardRef((e, t) => {
        const {
            disableOutsidePointerEvents: n = !1,
            onEscapeKeyDown: r,
            onPointerDownOutside: o,
            onFocusOutside: i,
            onInteractOutside: s,
            onDismiss: l,
            ...a
        } = e, u = x.useContext(xm), [c, d] = x.useState(null), h = (c == null ? void 0 : c.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, f] = x.useState({}), v = $t(t, b => d(b)), g = Array.from(u.layers), [w] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), p = g.indexOf(w), m = c ? g.indexOf(c) : -1, y = u.layersWithOutsidePointerEventsDisabled.size > 0, E = m >= p, C = Qy(b => {
            const T = b.target,
                j = [...u.branches].some(L => L.contains(T));
            !E || j || (o == null || o(b), s == null || s(b), b.defaultPrevented || l == null || l())
        }, h), k = Ky(b => {
            const T = b.target;
            [...u.branches].some(L => L.contains(T)) || (i == null || i(b), s == null || s(b), b.defaultPrevented || l == null || l())
        }, h);
        return By(b => {
            m === u.layers.size - 1 && (r == null || r(b), !b.defaultPrevented && l && (b.preventDefault(), l()))
        }, h), x.useEffect(() => {
            if (c) return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (of = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(c)), u.layers.add(c), sf(), () => {
                n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = of)
            }
        }, [c, h, n, u]), x.useEffect(() => () => {
            c && (u.layers.delete(c), u.layersWithOutsidePointerEventsDisabled.delete(c), sf())
        }, [c, u]), x.useEffect(() => {
            const b = () => f({});
            return document.addEventListener(uu, b), () => document.removeEventListener(uu, b)
        }, []), S.jsx(nt.div, {
            ...a,
            ref: v,
            style: {
                pointerEvents: y ? E ? "auto" : "none" : void 0,
                ...e.style
            },
            onFocusCapture: Pe(e.onFocusCapture, k.onFocusCapture),
            onBlurCapture: Pe(e.onBlurCapture, k.onBlurCapture),
            onPointerDownCapture: Pe(e.onPointerDownCapture, C.onPointerDownCapture)
        })
    });
Ec.displayName = Uy;
var Wy = "DismissableLayerBranch",
    Sm = x.forwardRef((e, t) => {
        const n = x.useContext(xm),
            r = x.useRef(null),
            o = $t(t, r);
        return x.useEffect(() => {
            const i = r.current;
            if (i) return n.branches.add(i), () => {
                n.branches.delete(i)
            }
        }, [n.branches]), S.jsx(nt.div, {
            ...e,
            ref: o
        })
    });
Sm.displayName = Wy;

function Qy(e, t = globalThis == null ? void 0 : globalThis.document) {
    const n = qn(e),
        r = x.useRef(!1),
        o = x.useRef(() => {});
    return x.useEffect(() => {
        const i = l => {
                if (l.target && !r.current) {
                    let a = function() {
                        Em(Vy, n, u, {
                            discrete: !0
                        })
                    };
                    const u = {
                        originalEvent: l
                    };
                    l.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = a, t.addEventListener("click", o.current, {
                        once: !0
                    })) : a()
                } else t.removeEventListener("click", o.current);
                r.current = !1
            },
            s = window.setTimeout(() => {
                t.addEventListener("pointerdown", i)
            }, 0);
        return () => {
            window.clearTimeout(s), t.removeEventListener("pointerdown", i), t.removeEventListener("click", o.current)
        }
    }, [t, n]), {
        onPointerDownCapture: () => r.current = !0
    }
}

function Ky(e, t = globalThis == null ? void 0 : globalThis.document) {
    const n = qn(e),
        r = x.useRef(!1);
    return x.useEffect(() => {
        const o = i => {
            i.target && !r.current && Em(Hy, n, {
                originalEvent: i
            }, {
                discrete: !1
            })
        };
        return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o)
    }, [t, n]), {
        onFocusCapture: () => r.current = !0,
        onBlurCapture: () => r.current = !1
    }
}

function sf() {
    const e = new CustomEvent(uu);
    document.dispatchEvent(e)
}

function Em(e, t, n, {
    discrete: r
}) {
    const o = n.originalEvent.target,
        i = new CustomEvent(e, {
            bubbles: !1,
            cancelable: !0,
            detail: n
        });
    t && o.addEventListener(e, t, {
        once: !0
    }), r ? wm(o, i) : o.dispatchEvent(i)
}
var Gy = Ec,
    Yy = Sm,
    Xn = globalThis != null && globalThis.document ? x.useLayoutEffect : () => {},
    qy = "Portal",
    Cm = x.forwardRef((e, t) => {
        var l;
        const {
            container: n,
            ...r
        } = e, [o, i] = x.useState(!1);
        Xn(() => i(!0), []);
        const s = n || o && ((l = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : l.body);
        return s ? mm.createPortal(S.jsx(nt.div, {
            ...r,
            ref: t
        }), s) : null
    });
Cm.displayName = qy;

function Xy(e, t) {
    return x.useReducer((n, r) => t[n][r] ?? n, e)
}
var Cc = e => {
    const {
        present: t,
        children: n
    } = e, r = Zy(t), o = typeof n == "function" ? n({
        present: r.isPresent
    }) : x.Children.only(n), i = $t(r.ref, Jy(o));
    return typeof n == "function" || r.isPresent ? x.cloneElement(o, {
        ref: i
    }) : null
};
Cc.displayName = "Presence";

function Zy(e) {
    const [t, n] = x.useState(), r = x.useRef(null), o = x.useRef(e), i = x.useRef("none"), s = e ? "mounted" : "unmounted", [l, a] = Xy(s, {
        mounted: {
            UNMOUNT: "unmounted",
            ANIMATION_OUT: "unmountSuspended"
        },
        unmountSuspended: {
            MOUNT: "mounted",
            ANIMATION_END: "unmounted"
        },
        unmounted: {
            MOUNT: "mounted"
        }
    });
    return x.useEffect(() => {
        const u = ns(r.current);
        i.current = l === "mounted" ? u : "none"
    }, [l]), Xn(() => {
        const u = r.current,
            c = o.current;
        if (c !== e) {
            const h = i.current,
                f = ns(u);
            e ? a("MOUNT") : f === "none" || (u == null ? void 0 : u.display) === "none" ? a("UNMOUNT") : a(c && h !== f ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e
        }
    }, [e, a]), Xn(() => {
        if (t) {
            let u;
            const c = t.ownerDocument.defaultView ?? window,
                d = f => {
                    const g = ns(r.current).includes(f.animationName);
                    if (f.target === t && g && (a("ANIMATION_END"), !o.current)) {
                        const w = t.style.animationFillMode;
                        t.style.animationFillMode = "forwards", u = c.setTimeout(() => {
                            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = w)
                        })
                    }
                },
                h = f => {
                    f.target === t && (i.current = ns(r.current))
                };
            return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
                c.clearTimeout(u), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d)
            }
        } else a("ANIMATION_END")
    }, [t, a]), {
        isPresent: ["mounted", "unmountSuspended"].includes(l),
        ref: x.useCallback(u => {
            r.current = u ? getComputedStyle(u) : null, n(u)
        }, [])
    }
}

function ns(e) {
    return (e == null ? void 0 : e.animationName) || "none"
}

function Jy(e) {
    var r, o;
    let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get,
        n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}
var ew = fp[" useInsertionEffect ".trim().toString()] || Xn;

function tw({
    prop: e,
    defaultProp: t,
    onChange: n = () => {},
    caller: r
}) {
    const [o, i, s] = nw({
        defaultProp: t,
        onChange: n
    }), l = e !== void 0, a = l ? e : o;
    {
        const c = x.useRef(e !== void 0);
        x.useEffect(() => {
            const d = c.current;
            d !== l && console.warn(`${r} is changing from ${d?"controlled":"uncontrolled"} to ${l?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), c.current = l
        }, [l, r])
    }
    const u = x.useCallback(c => {
        var d;
        if (l) {
            const h = rw(c) ? c(e) : c;
            h !== e && ((d = s.current) == null || d.call(s, h))
        } else i(c)
    }, [l, e, i, s]);
    return [a, u]
}

function nw({
    defaultProp: e,
    onChange: t
}) {
    const [n, r] = x.useState(e), o = x.useRef(n), i = x.useRef(t);
    return ew(() => {
        i.current = t
    }, [t]), x.useEffect(() => {
        var s;
        o.current !== n && ((s = i.current) == null || s.call(i, n), o.current = n)
    }, [n, o]), [n, r, i]
}

function rw(e) {
    return typeof e == "function"
}
var ow = Object.freeze({
        position: "absolute",
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
    }),
    iw = "VisuallyHidden",
    yl = x.forwardRef((e, t) => S.jsx(nt.span, {
        ...e,
        ref: t,
        style: {
            ...ow,
            ...e.style
        }
    }));
yl.displayName = iw;
var sw = yl,
    bc = "ToastProvider",
    [kc, lw, aw] = zy("Toast"),
    [bm, HC] = vl("Toast", [aw]),
    [uw, wl] = bm(bc),
    km = e => {
        const {
            __scopeToast: t,
            label: n = "Notification",
            duration: r = 5e3,
            swipeDirection: o = "right",
            swipeThreshold: i = 50,
            children: s
        } = e, [l, a] = x.useState(null), [u, c] = x.useState(0), d = x.useRef(!1), h = x.useRef(!1);
        return n.trim() || console.error(`Invalid prop \`label\` supplied to \`${bc}\`. Expected non-empty \`string\`.`), S.jsx(kc.Provider, {
            scope: t,
            children: S.jsx(uw, {
                scope: t,
                label: n,
                duration: r,
                swipeDirection: o,
                swipeThreshold: i,
                toastCount: u,
                viewport: l,
                onViewportChange: a,
                onToastAdd: x.useCallback(() => c(f => f + 1), []),
                onToastRemove: x.useCallback(() => c(f => f - 1), []),
                isFocusedToastEscapeKeyDownRef: d,
                isClosePausedRef: h,
                children: s
            })
        })
    };
km.displayName = bc;
var Pm = "ToastViewport",
    cw = ["F8"],
    cu = "toast.viewportPause",
    du = "toast.viewportResume",
    Tm = x.forwardRef((e, t) => {
        const {
            __scopeToast: n,
            hotkey: r = cw,
            label: o = "Notifications ({hotkey})",
            ...i
        } = e, s = wl(Pm, n), l = lw(n), a = x.useRef(null), u = x.useRef(null), c = x.useRef(null), d = x.useRef(null), h = $t(t, d, s.onViewportChange), f = r.join("+").replace(/Key/g, "").replace(/Digit/g, ""), v = s.toastCount > 0;
        x.useEffect(() => {
            const w = p => {
                var y;
                r.length !== 0 && r.every(E => p[E] || p.code === E) && ((y = d.current) == null || y.focus())
            };
            return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w)
        }, [r]), x.useEffect(() => {
            const w = a.current,
                p = d.current;
            if (v && w && p) {
                const m = () => {
                        if (!s.isClosePausedRef.current) {
                            const k = new CustomEvent(cu);
                            p.dispatchEvent(k), s.isClosePausedRef.current = !0
                        }
                    },
                    y = () => {
                        if (s.isClosePausedRef.current) {
                            const k = new CustomEvent(du);
                            p.dispatchEvent(k), s.isClosePausedRef.current = !1
                        }
                    },
                    E = k => {
                        !w.contains(k.relatedTarget) && y()
                    },
                    C = () => {
                        w.contains(document.activeElement) || y()
                    };
                return w.addEventListener("focusin", m), w.addEventListener("focusout", E), w.addEventListener("pointermove", m), w.addEventListener("pointerleave", C), window.addEventListener("blur", m), window.addEventListener("focus", y), () => {
                    w.removeEventListener("focusin", m), w.removeEventListener("focusout", E), w.removeEventListener("pointermove", m), w.removeEventListener("pointerleave", C), window.removeEventListener("blur", m), window.removeEventListener("focus", y)
                }
            }
        }, [v, s.isClosePausedRef]);
        const g = x.useCallback(({
            tabbingDirection: w
        }) => {
            const m = l().map(y => {
                const E = y.ref.current,
                    C = [E, ...Cw(E)];
                return w === "forwards" ? C : C.reverse()
            });
            return (w === "forwards" ? m.reverse() : m).flat()
        }, [l]);
        return x.useEffect(() => {
            const w = d.current;
            if (w) {
                const p = m => {
                    var C, k, b;
                    const y = m.altKey || m.ctrlKey || m.metaKey;
                    if (m.key === "Tab" && !y) {
                        const T = document.activeElement,
                            j = m.shiftKey;
                        if (m.target === w && j) {
                            (C = u.current) == null || C.focus();
                            return
                        }
                        const I = g({
                                tabbingDirection: j ? "backwards" : "forwards"
                            }),
                            W = I.findIndex(O => O === T);
                        ca(I.slice(W + 1)) ? m.preventDefault() : j ? (k = u.current) == null || k.focus() : (b = c.current) == null || b.focus()
                    }
                };
                return w.addEventListener("keydown", p), () => w.removeEventListener("keydown", p)
            }
        }, [l, g]), S.jsxs(Yy, {
            ref: a,
            role: "region",
            "aria-label": o.replace("{hotkey}", f),
            tabIndex: -1,
            style: {
                pointerEvents: v ? void 0 : "none"
            },
            children: [v && S.jsx(fu, {
                ref: u,
                onFocusFromOutsideViewport: () => {
                    const w = g({
                        tabbingDirection: "forwards"
                    });
                    ca(w)
                }
            }), S.jsx(kc.Slot, {
                scope: n,
                children: S.jsx(nt.ol, {
                    tabIndex: -1,
                    ...i,
                    ref: h
                })
            }), v && S.jsx(fu, {
                ref: c,
                onFocusFromOutsideViewport: () => {
                    const w = g({
                        tabbingDirection: "backwards"
                    });
                    ca(w)
                }
            })]
        })
    });
Tm.displayName = Pm;
var Nm = "ToastFocusProxy",
    fu = x.forwardRef((e, t) => {
        const {
            __scopeToast: n,
            onFocusFromOutsideViewport: r,
            ...o
        } = e, i = wl(Nm, n);
        return S.jsx(yl, {
            "aria-hidden": !0,
            tabIndex: 0,
            ...o,
            ref: t,
            style: {
                position: "fixed"
            },
            onFocus: s => {
                var u;
                const l = s.relatedTarget;
                !((u = i.viewport) != null && u.contains(l)) && r()
            }
        })
    });
fu.displayName = Nm;
var Oi = "Toast",
    dw = "toast.swipeStart",
    fw = "toast.swipeMove",
    pw = "toast.swipeCancel",
    hw = "toast.swipeEnd",
    Rm = x.forwardRef((e, t) => {
        const {
            forceMount: n,
            open: r,
            defaultOpen: o,
            onOpenChange: i,
            ...s
        } = e, [l, a] = tw({
            prop: r,
            defaultProp: o ?? !0,
            onChange: i,
            caller: Oi
        });
        return S.jsx(Cc, {
            present: n || l,
            children: S.jsx(vw, {
                open: l,
                ...s,
                ref: t,
                onClose: () => a(!1),
                onPause: qn(e.onPause),
                onResume: qn(e.onResume),
                onSwipeStart: Pe(e.onSwipeStart, u => {
                    u.currentTarget.setAttribute("data-swipe", "start")
                }),
                onSwipeMove: Pe(e.onSwipeMove, u => {
                    const {
                        x: c,
                        y: d
                    } = u.detail.delta;
                    u.currentTarget.setAttribute("data-swipe", "move"), u.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${c}px`), u.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${d}px`)
                }),
                onSwipeCancel: Pe(e.onSwipeCancel, u => {
                    u.currentTarget.setAttribute("data-swipe", "cancel"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), u.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")
                }),
                onSwipeEnd: Pe(e.onSwipeEnd, u => {
                    const {
                        x: c,
                        y: d
                    } = u.detail.delta;
                    u.currentTarget.setAttribute("data-swipe", "end"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), u.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${c}px`), u.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${d}px`), a(!1)
                })
            })
        })
    });
Rm.displayName = Oi;
var [mw, gw] = bm(Oi, {
    onClose() {}
}), vw = x.forwardRef((e, t) => {
    const {
        __scopeToast: n,
        type: r = "foreground",
        duration: o,
        open: i,
        onClose: s,
        onEscapeKeyDown: l,
        onPause: a,
        onResume: u,
        onSwipeStart: c,
        onSwipeMove: d,
        onSwipeCancel: h,
        onSwipeEnd: f,
        ...v
    } = e, g = wl(Oi, n), [w, p] = x.useState(null), m = $t(t, O => p(O)), y = x.useRef(null), E = x.useRef(null), C = o || g.duration, k = x.useRef(0), b = x.useRef(C), T = x.useRef(0), {
        onToastAdd: j,
        onToastRemove: L
    } = g, D = qn(() => {
        var V;
        (w == null ? void 0 : w.contains(document.activeElement)) && ((V = g.viewport) == null || V.focus()), s()
    }), I = x.useCallback(O => {
        !O || O === 1 / 0 || (window.clearTimeout(T.current), k.current = new Date().getTime(), T.current = window.setTimeout(D, O))
    }, [D]);
    x.useEffect(() => {
        const O = g.viewport;
        if (O) {
            const V = () => {
                    I(b.current), u == null || u()
                },
                U = () => {
                    const H = new Date().getTime() - k.current;
                    b.current = b.current - H, window.clearTimeout(T.current), a == null || a()
                };
            return O.addEventListener(cu, U), O.addEventListener(du, V), () => {
                O.removeEventListener(cu, U), O.removeEventListener(du, V)
            }
        }
    }, [g.viewport, C, a, u, I]), x.useEffect(() => {
        i && !g.isClosePausedRef.current && I(C)
    }, [i, C, g.isClosePausedRef, I]), x.useEffect(() => (j(), () => L()), [j, L]);
    const W = x.useMemo(() => w ? Im(w) : null, [w]);
    return g.viewport ? S.jsxs(S.Fragment, {
        children: [W && S.jsx(yw, {
            __scopeToast: n,
            role: "status",
            "aria-live": r === "foreground" ? "assertive" : "polite",
            "aria-atomic": !0,
            children: W
        }), S.jsx(mw, {
            scope: n,
            onClose: D,
            children: Ri.createPortal(S.jsx(kc.ItemSlot, {
                scope: n,
                children: S.jsx(Gy, {
                    asChild: !0,
                    onEscapeKeyDown: Pe(l, () => {
                        g.isFocusedToastEscapeKeyDownRef.current || D(), g.isFocusedToastEscapeKeyDownRef.current = !1
                    }),
                    children: S.jsx(nt.li, {
                        role: "status",
                        "aria-live": "off",
                        "aria-atomic": !0,
                        tabIndex: 0,
                        "data-state": i ? "open" : "closed",
                        "data-swipe-direction": g.swipeDirection,
                        ...v,
                        ref: m,
                        style: {
                            userSelect: "none",
                            touchAction: "none",
                            ...e.style
                        },
                        onKeyDown: Pe(e.onKeyDown, O => {
                            O.key === "Escape" && (l == null || l(O.nativeEvent), O.nativeEvent.defaultPrevented || (g.isFocusedToastEscapeKeyDownRef.current = !0, D()))
                        }),
                        onPointerDown: Pe(e.onPointerDown, O => {
                            O.button === 0 && (y.current = {
                                x: O.clientX,
                                y: O.clientY
                            })
                        }),
                        onPointerMove: Pe(e.onPointerMove, O => {
                            if (!y.current) return;
                            const V = O.clientX - y.current.x,
                                U = O.clientY - y.current.y,
                                H = !!E.current,
                                N = ["left", "right"].includes(g.swipeDirection),
                                P = ["left", "up"].includes(g.swipeDirection) ? Math.min : Math.max,
                                M = N ? P(0, V) : 0,
                                z = N ? 0 : P(0, U),
                                F = O.pointerType === "touch" ? 10 : 2,
                                Q = {
                                    x: M,
                                    y: z
                                },
                                K = {
                                    originalEvent: O,
                                    delta: Q
                                };
                            H ? (E.current = Q, rs(fw, d, K, {
                                discrete: !1
                            })) : lf(Q, g.swipeDirection, F) ? (E.current = Q, rs(dw, c, K, {
                                discrete: !1
                            }), O.target.setPointerCapture(O.pointerId)) : (Math.abs(V) > F || Math.abs(U) > F) && (y.current = null)
                        }),
                        onPointerUp: Pe(e.onPointerUp, O => {
                            const V = E.current,
                                U = O.target;
                            if (U.hasPointerCapture(O.pointerId) && U.releasePointerCapture(O.pointerId), E.current = null, y.current = null, V) {
                                const H = O.currentTarget,
                                    N = {
                                        originalEvent: O,
                                        delta: V
                                    };
                                lf(V, g.swipeDirection, g.swipeThreshold) ? rs(hw, f, N, {
                                    discrete: !0
                                }) : rs(pw, h, N, {
                                    discrete: !0
                                }), H.addEventListener("click", P => P.preventDefault(), {
                                    once: !0
                                })
                            }
                        })
                    })
                })
            }), g.viewport)
        })]
    }) : null
}), yw = e => {
    const {
        __scopeToast: t,
        children: n,
        ...r
    } = e, o = wl(Oi, t), [i, s] = x.useState(!1), [l, a] = x.useState(!1);
    return Sw(() => s(!0)), x.useEffect(() => {
        const u = window.setTimeout(() => a(!0), 1e3);
        return () => window.clearTimeout(u)
    }, []), l ? null : S.jsx(Cm, {
        asChild: !0,
        children: S.jsx(yl, {
            ...r,
            children: i && S.jsxs(S.Fragment, {
                children: [o.label, " ", n]
            })
        })
    })
}, ww = "ToastTitle", Om = x.forwardRef((e, t) => {
    const {
        __scopeToast: n,
        ...r
    } = e;
    return S.jsx(nt.div, {
        ...r,
        ref: t
    })
});
Om.displayName = ww;
var xw = "ToastDescription",
    jm = x.forwardRef((e, t) => {
        const {
            __scopeToast: n,
            ...r
        } = e;
        return S.jsx(nt.div, {
            ...r,
            ref: t
        })
    });
jm.displayName = xw;
var Lm = "ToastAction",
    Am = x.forwardRef((e, t) => {
        const {
            altText: n,
            ...r
        } = e;
        return n.trim() ? S.jsx(_m, {
            altText: n,
            asChild: !0,
            children: S.jsx(Pc, {
                ...r,
                ref: t
            })
        }) : (console.error(`Invalid prop \`altText\` supplied to \`${Lm}\`. Expected non-empty \`string\`.`), null)
    });
Am.displayName = Lm;
var Mm = "ToastClose",
    Pc = x.forwardRef((e, t) => {
        const {
            __scopeToast: n,
            ...r
        } = e, o = gw(Mm, n);
        return S.jsx(_m, {
            asChild: !0,
            children: S.jsx(nt.button, {
                type: "button",
                ...r,
                ref: t,
                onClick: Pe(e.onClick, o.onClose)
            })
        })
    });
Pc.displayName = Mm;
var _m = x.forwardRef((e, t) => {
    const {
        __scopeToast: n,
        altText: r,
        ...o
    } = e;
    return S.jsx(nt.div, {
        "data-radix-toast-announce-exclude": "",
        "data-radix-toast-announce-alt": r || void 0,
        ...o,
        ref: t
    })
});

function Im(e) {
    const t = [];
    return Array.from(e.childNodes).forEach(r => {
        if (r.nodeType === r.TEXT_NODE && r.textContent && t.push(r.textContent), Ew(r)) {
            const o = r.ariaHidden || r.hidden || r.style.display === "none",
                i = r.dataset.radixToastAnnounceExclude === "";
            if (!o)
                if (i) {
                    const s = r.dataset.radixToastAnnounceAlt;
                    s && t.push(s)
                } else t.push(...Im(r))
        }
    }), t
}

function rs(e, t, n, {
    discrete: r
}) {
    const o = n.originalEvent.currentTarget,
        i = new CustomEvent(e, {
            bubbles: !0,
            cancelable: !0,
            detail: n
        });
    t && o.addEventListener(e, t, {
        once: !0
    }), r ? wm(o, i) : o.dispatchEvent(i)
}
var lf = (e, t, n = 0) => {
    const r = Math.abs(e.x),
        o = Math.abs(e.y),
        i = r > o;
    return t === "left" || t === "right" ? i && r > n : !i && o > n
};

function Sw(e = () => {}) {
    const t = qn(e);
    Xn(() => {
        let n = 0,
            r = 0;
        return n = window.requestAnimationFrame(() => r = window.requestAnimationFrame(t)), () => {
            window.cancelAnimationFrame(n), window.cancelAnimationFrame(r)
        }
    }, [t])
}

function Ew(e) {
    return e.nodeType === e.ELEMENT_NODE
}

function Cw(e) {
    const t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: r => {
                const o = r.tagName === "INPUT" && r.type === "hidden";
                return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
            }
        });
    for (; n.nextNode();) t.push(n.currentNode);
    return t
}

function ca(e) {
    const t = document.activeElement;
    return e.some(n => n === t ? !0 : (n.focus(), document.activeElement !== t))
}
var bw = km,
    Dm = Tm,
    Fm = Rm,
    zm = Om,
    $m = jm,
    Bm = Am,
    Um = Pc;

function Vm(e) {
    var t, n, r = "";
    if (typeof e == "string" || typeof e == "number") r += e;
    else if (typeof e == "object")
        if (Array.isArray(e)) {
            var o = e.length;
            for (t = 0; t < o; t++) e[t] && (n = Vm(e[t])) && (r && (r += " "), r += n)
        } else
            for (n in e) e[n] && (r && (r += " "), r += n);
    return r
}

function Hm() {
    for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)(e = arguments[n]) && (t = Vm(e)) && (r && (r += " "), r += t);
    return r
}
const af = e => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e,
    uf = Hm,
    kw = (e, t) => n => {
        var r;
        if ((t == null ? void 0 : t.variants) == null) return uf(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
        const {
            variants: o,
            defaultVariants: i
        } = t, s = Object.keys(o).map(u => {
            const c = n == null ? void 0 : n[u],
                d = i == null ? void 0 : i[u];
            if (c === null) return null;
            const h = af(c) || af(d);
            return o[u][h]
        }), l = n && Object.entries(n).reduce((u, c) => {
            let [d, h] = c;
            return h === void 0 || (u[d] = h), u
        }, {}), a = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, c) => {
            let {
                class: d,
                className: h,
                ...f
            } = c;
            return Object.entries(f).every(v => {
                let [g, w] = v;
                return Array.isArray(w) ? w.includes({
                    ...i,
                    ...l
                } [g]) : {
                    ...i,
                    ...l
                } [g] === w
            }) ? [...u, d, h] : u
        }, []);
        return uf(e, s, a, n == null ? void 0 : n.class, n == null ? void 0 : n.className)
    };
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pw = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
    Wm = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Tw = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nw = x.forwardRef(({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: i,
    iconNode: s,
    ...l
}, a) => x.createElement("svg", {
    ref: a,
    ...Tw,
    width: t,
    height: t,
    stroke: e,
    strokeWidth: r ? Number(n) * 24 / Number(t) : n,
    className: Wm("lucide", o),
    ...l
}, [...s.map(([u, c]) => x.createElement(u, c)), ...Array.isArray(i) ? i : [i]]));
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rr = (e, t) => {
    const n = x.forwardRef(({
        className: r,
        ...o
    }, i) => x.createElement(Nw, {
        ref: i,
        iconNode: t,
        className: Wm(`lucide-${Pw(e)}`, r),
        ...o
    }));
    return n.displayName = `${e}`, n
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rw = rr("Bell", [
    ["path", {
        d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",
        key: "1qo2s2"
    }],
    ["path", {
        d: "M10.3 21a1.94 1.94 0 0 0 3.4 0",
        key: "qgo35s"
    }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ow = rr("ChevronLeft", [
    ["path", {
        d: "m15 18-6-6 6-6",
        key: "1wnfg3"
    }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jw = rr("ChevronRight", [
    ["path", {
        d: "m9 18 6-6-6-6",
        key: "mthhwq"
    }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ss = rr("CircleCheckBig", [
    ["path", {
        d: "M21.801 10A10 10 0 1 1 17 3.335",
        key: "yps3ct"
    }],
    ["path", {
        d: "m9 11 3 3L22 4",
        key: "1pflzl"
    }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lw = rr("Lock", [
    ["rect", {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2",
        key: "1w4ew1"
    }],
    ["path", {
        d: "M7 11V7a5 5 0 0 1 10 0v4",
        key: "fwvmzm"
    }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Aw = rr("Shield", [
    ["path", {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
    }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mw = rr("Trophy", [
    ["path", {
        d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6",
        key: "17hqa7"
    }],
    ["path", {
        d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18",
        key: "lmptdp"
    }],
    ["path", {
        d: "M4 22h16",
        key: "57wxv0"
    }],
    ["path", {
        d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",
        key: "1nw9bq"
    }],
    ["path", {
        d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",
        key: "1np0yb"
    }],
    ["path", {
        d: "M18 2H6v7a6 6 0 0 0 12 0V2Z",
        key: "u46fv3"
    }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _w = rr("X", [
        ["path", {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }],
        ["path", {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }]
    ]),
    Tc = "-",
    Iw = e => {
        const t = Fw(e),
            {
                conflictingClassGroups: n,
                conflictingClassGroupModifiers: r
            } = e;
        return {
            getClassGroupId: s => {
                const l = s.split(Tc);
                return l[0] === "" && l.length !== 1 && l.shift(), Qm(l, t) || Dw(s)
            },
            getConflictingClassGroupIds: (s, l) => {
                const a = n[s] || [];
                return l && r[s] ? [...a, ...r[s]] : a
            }
        }
    },
    Qm = (e, t) => {
        var s;
        if (e.length === 0) return t.classGroupId;
        const n = e[0],
            r = t.nextPart.get(n),
            o = r ? Qm(e.slice(1), r) : void 0;
        if (o) return o;
        if (t.validators.length === 0) return;
        const i = e.join(Tc);
        return (s = t.validators.find(({
            validator: l
        }) => l(i))) == null ? void 0 : s.classGroupId
    },
    cf = /^\[(.+)\]$/,
    Dw = e => {
        if (cf.test(e)) {
            const t = cf.exec(e)[1],
                n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
            if (n) return "arbitrary.." + n
        }
    },
    Fw = e => {
        const {
            theme: t,
            prefix: n
        } = e, r = {
            nextPart: new Map,
            validators: []
        };
        return $w(Object.entries(e.classGroups), n).forEach(([i, s]) => {
            pu(s, r, i, t)
        }), r
    },
    pu = (e, t, n, r) => {
        e.forEach(o => {
            if (typeof o == "string") {
                const i = o === "" ? t : df(t, o);
                i.classGroupId = n;
                return
            }
            if (typeof o == "function") {
                if (zw(o)) {
                    pu(o(r), t, n, r);
                    return
                }
                t.validators.push({
                    validator: o,
                    classGroupId: n
                });
                return
            }
            Object.entries(o).forEach(([i, s]) => {
                pu(s, df(t, i), n, r)
            })
        })
    },
    df = (e, t) => {
        let n = e;
        return t.split(Tc).forEach(r => {
            n.nextPart.has(r) || n.nextPart.set(r, {
                nextPart: new Map,
                validators: []
            }), n = n.nextPart.get(r)
        }), n
    },
    zw = e => e.isThemeGetter,
    $w = (e, t) => t ? e.map(([n, r]) => {
        const o = r.map(i => typeof i == "string" ? t + i : typeof i == "object" ? Object.fromEntries(Object.entries(i).map(([s, l]) => [t + s, l])) : i);
        return [n, o]
    }) : e,
    Bw = e => {
        if (e < 1) return {
            get: () => {},
            set: () => {}
        };
        let t = 0,
            n = new Map,
            r = new Map;
        const o = (i, s) => {
            n.set(i, s), t++, t > e && (t = 0, r = n, n = new Map)
        };
        return {
            get(i) {
                let s = n.get(i);
                if (s !== void 0) return s;
                if ((s = r.get(i)) !== void 0) return o(i, s), s
            },
            set(i, s) {
                n.has(i) ? n.set(i, s) : o(i, s)
            }
        }
    },
    Km = "!",
    Uw = e => {
        const {
            separator: t,
            experimentalParseClassName: n
        } = e, r = t.length === 1, o = t[0], i = t.length, s = l => {
            const a = [];
            let u = 0,
                c = 0,
                d;
            for (let w = 0; w < l.length; w++) {
                let p = l[w];
                if (u === 0) {
                    if (p === o && (r || l.slice(w, w + i) === t)) {
                        a.push(l.slice(c, w)), c = w + i;
                        continue
                    }
                    if (p === "/") {
                        d = w;
                        continue
                    }
                }
                p === "[" ? u++ : p === "]" && u--
            }
            const h = a.length === 0 ? l : l.substring(c),
                f = h.startsWith(Km),
                v = f ? h.substring(1) : h,
                g = d && d > c ? d - c : void 0;
            return {
                modifiers: a,
                hasImportantModifier: f,
                baseClassName: v,
                maybePostfixModifierPosition: g
            }
        };
        return n ? l => n({
            className: l,
            parseClassName: s
        }) : s
    },
    Vw = e => {
        if (e.length <= 1) return e;
        const t = [];
        let n = [];
        return e.forEach(r => {
            r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r)
        }), t.push(...n.sort()), t
    },
    Hw = e => ({
        cache: Bw(e.cacheSize),
        parseClassName: Uw(e),
        ...Iw(e)
    }),
    Ww = /\s+/,
    Qw = (e, t) => {
        const {
            parseClassName: n,
            getClassGroupId: r,
            getConflictingClassGroupIds: o
        } = t, i = [], s = e.trim().split(Ww);
        let l = "";
        for (let a = s.length - 1; a >= 0; a -= 1) {
            const u = s[a],
                {
                    modifiers: c,
                    hasImportantModifier: d,
                    baseClassName: h,
                    maybePostfixModifierPosition: f
                } = n(u);
            let v = !!f,
                g = r(v ? h.substring(0, f) : h);
            if (!g) {
                if (!v) {
                    l = u + (l.length > 0 ? " " + l : l);
                    continue
                }
                if (g = r(h), !g) {
                    l = u + (l.length > 0 ? " " + l : l);
                    continue
                }
                v = !1
            }
            const w = Vw(c).join(":"),
                p = d ? w + Km : w,
                m = p + g;
            if (i.includes(m)) continue;
            i.push(m);
            const y = o(g, v);
            for (let E = 0; E < y.length; ++E) {
                const C = y[E];
                i.push(p + C)
            }
            l = u + (l.length > 0 ? " " + l : l)
        }
        return l
    };

function Kw() {
    let e = 0,
        t, n, r = "";
    for (; e < arguments.length;)(t = arguments[e++]) && (n = Gm(t)) && (r && (r += " "), r += n);
    return r
}
const Gm = e => {
    if (typeof e == "string") return e;
    let t, n = "";
    for (let r = 0; r < e.length; r++) e[r] && (t = Gm(e[r])) && (n && (n += " "), n += t);
    return n
};

function Gw(e, ...t) {
    let n, r, o, i = s;

    function s(a) {
        const u = t.reduce((c, d) => d(c), e());
        return n = Hw(u), r = n.cache.get, o = n.cache.set, i = l, l(a)
    }

    function l(a) {
        const u = r(a);
        if (u) return u;
        const c = Qw(a, n);
        return o(a, c), c
    }
    return function() {
        return i(Kw.apply(null, arguments))
    }
}
const ue = e => {
        const t = n => n[e] || [];
        return t.isThemeGetter = !0, t
    },
    Ym = /^\[(?:([a-z-]+):)?(.+)\]$/i,
    Yw = /^\d+\/\d+$/,
    qw = new Set(["px", "full", "screen"]),
    Xw = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    Zw = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    Jw = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
    e1 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    t1 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    rn = e => qr(e) || qw.has(e) || Yw.test(e),
    kn = e => xo(e, "length", u1),
    qr = e => !!e && !Number.isNaN(Number(e)),
    da = e => xo(e, "number", qr),
    Mo = e => !!e && Number.isInteger(Number(e)),
    n1 = e => e.endsWith("%") && qr(e.slice(0, -1)),
    X = e => Ym.test(e),
    Pn = e => Xw.test(e),
    r1 = new Set(["length", "size", "percentage"]),
    o1 = e => xo(e, r1, qm),
    i1 = e => xo(e, "position", qm),
    s1 = new Set(["image", "url"]),
    l1 = e => xo(e, s1, d1),
    a1 = e => xo(e, "", c1),
    _o = () => !0,
    xo = (e, t, n) => {
        const r = Ym.exec(e);
        return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1
    },
    u1 = e => Zw.test(e) && !Jw.test(e),
    qm = () => !1,
    c1 = e => e1.test(e),
    d1 = e => t1.test(e),
    f1 = () => {
        const e = ue("colors"),
            t = ue("spacing"),
            n = ue("blur"),
            r = ue("brightness"),
            o = ue("borderColor"),
            i = ue("borderRadius"),
            s = ue("borderSpacing"),
            l = ue("borderWidth"),
            a = ue("contrast"),
            u = ue("grayscale"),
            c = ue("hueRotate"),
            d = ue("invert"),
            h = ue("gap"),
            f = ue("gradientColorStops"),
            v = ue("gradientColorStopPositions"),
            g = ue("inset"),
            w = ue("margin"),
            p = ue("opacity"),
            m = ue("padding"),
            y = ue("saturate"),
            E = ue("scale"),
            C = ue("sepia"),
            k = ue("skew"),
            b = ue("space"),
            T = ue("translate"),
            j = () => ["auto", "contain", "none"],
            L = () => ["auto", "hidden", "clip", "visible", "scroll"],
            D = () => ["auto", X, t],
            I = () => [X, t],
            W = () => ["", rn, kn],
            O = () => ["auto", qr, X],
            V = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"],
            U = () => ["solid", "dashed", "dotted", "double", "none"],
            H = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"],
            N = () => ["start", "end", "center", "between", "around", "evenly", "stretch"],
            P = () => ["", "0", X],
            M = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
            z = () => [qr, X];
        return {
            cacheSize: 500,
            separator: ":",
            theme: {
                colors: [_o],
                spacing: [rn, kn],
                blur: ["none", "", Pn, X],
                brightness: z(),
                borderColor: [e],
                borderRadius: ["none", "", "full", Pn, X],
                borderSpacing: I(),
                borderWidth: W(),
                contrast: z(),
                grayscale: P(),
                hueRotate: z(),
                invert: P(),
                gap: I(),
                gradientColorStops: [e],
                gradientColorStopPositions: [n1, kn],
                inset: D(),
                margin: D(),
                opacity: z(),
                padding: I(),
                saturate: z(),
                scale: z(),
                sepia: P(),
                skew: z(),
                space: I(),
                translate: I()
            },
            classGroups: {
                aspect: [{
                    aspect: ["auto", "square", "video", X]
                }],
                container: ["container"],
                columns: [{
                    columns: [Pn]
                }],
                "break-after": [{
                    "break-after": M()
                }],
                "break-before": [{
                    "break-before": M()
                }],
                "break-inside": [{
                    "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
                }],
                "box-decoration": [{
                    "box-decoration": ["slice", "clone"]
                }],
                box: [{
                    box: ["border", "content"]
                }],
                display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
                float: [{
                    float: ["right", "left", "none", "start", "end"]
                }],
                clear: [{
                    clear: ["left", "right", "both", "none", "start", "end"]
                }],
                isolation: ["isolate", "isolation-auto"],
                "object-fit": [{
                    object: ["contain", "cover", "fill", "none", "scale-down"]
                }],
                "object-position": [{
                    object: [...V(), X]
                }],
                overflow: [{
                    overflow: L()
                }],
                "overflow-x": [{
                    "overflow-x": L()
                }],
                "overflow-y": [{
                    "overflow-y": L()
                }],
                overscroll: [{
                    overscroll: j()
                }],
                "overscroll-x": [{
                    "overscroll-x": j()
                }],
                "overscroll-y": [{
                    "overscroll-y": j()
                }],
                position: ["static", "fixed", "absolute", "relative", "sticky"],
                inset: [{
                    inset: [g]
                }],
                "inset-x": [{
                    "inset-x": [g]
                }],
                "inset-y": [{
                    "inset-y": [g]
                }],
                start: [{
                    start: [g]
                }],
                end: [{
                    end: [g]
                }],
                top: [{
                    top: [g]
                }],
                right: [{
                    right: [g]
                }],
                bottom: [{
                    bottom: [g]
                }],
                left: [{
                    left: [g]
                }],
                visibility: ["visible", "invisible", "collapse"],
                z: [{
                    z: ["auto", Mo, X]
                }],
                basis: [{
                    basis: D()
                }],
                "flex-direction": [{
                    flex: ["row", "row-reverse", "col", "col-reverse"]
                }],
                "flex-wrap": [{
                    flex: ["wrap", "wrap-reverse", "nowrap"]
                }],
                flex: [{
                    flex: ["1", "auto", "initial", "none", X]
                }],
                grow: [{
                    grow: P()
                }],
                shrink: [{
                    shrink: P()
                }],
                order: [{
                    order: ["first", "last", "none", Mo, X]
                }],
                "grid-cols": [{
                    "grid-cols": [_o]
                }],
                "col-start-end": [{
                    col: ["auto", {
                        span: ["full", Mo, X]
                    }, X]
                }],
                "col-start": [{
                    "col-start": O()
                }],
                "col-end": [{
                    "col-end": O()
                }],
                "grid-rows": [{
                    "grid-rows": [_o]
                }],
                "row-start-end": [{
                    row: ["auto", {
                        span: [Mo, X]
                    }, X]
                }],
                "row-start": [{
                    "row-start": O()
                }],
                "row-end": [{
                    "row-end": O()
                }],
                "grid-flow": [{
                    "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
                }],
                "auto-cols": [{
                    "auto-cols": ["auto", "min", "max", "fr", X]
                }],
                "auto-rows": [{
                    "auto-rows": ["auto", "min", "max", "fr", X]
                }],
                gap: [{
                    gap: [h]
                }],
                "gap-x": [{
                    "gap-x": [h]
                }],
                "gap-y": [{
                    "gap-y": [h]
                }],
                "justify-content": [{
                    justify: ["normal", ...N()]
                }],
                "justify-items": [{
                    "justify-items": ["start", "end", "center", "stretch"]
                }],
                "justify-self": [{
                    "justify-self": ["auto", "start", "end", "center", "stretch"]
                }],
                "align-content": [{
                    content: ["normal", ...N(), "baseline"]
                }],
                "align-items": [{
                    items: ["start", "end", "center", "baseline", "stretch"]
                }],
                "align-self": [{
                    self: ["auto", "start", "end", "center", "stretch", "baseline"]
                }],
                "place-content": [{
                    "place-content": [...N(), "baseline"]
                }],
                "place-items": [{
                    "place-items": ["start", "end", "center", "baseline", "stretch"]
                }],
                "place-self": [{
                    "place-self": ["auto", "start", "end", "center", "stretch"]
                }],
                p: [{
                    p: [m]
                }],
                px: [{
                    px: [m]
                }],
                py: [{
                    py: [m]
                }],
                ps: [{
                    ps: [m]
                }],
                pe: [{
                    pe: [m]
                }],
                pt: [{
                    pt: [m]
                }],
                pr: [{
                    pr: [m]
                }],
                pb: [{
                    pb: [m]
                }],
                pl: [{
                    pl: [m]
                }],
                m: [{
                    m: [w]
                }],
                mx: [{
                    mx: [w]
                }],
                my: [{
                    my: [w]
                }],
                ms: [{
                    ms: [w]
                }],
                me: [{
                    me: [w]
                }],
                mt: [{
                    mt: [w]
                }],
                mr: [{
                    mr: [w]
                }],
                mb: [{
                    mb: [w]
                }],
                ml: [{
                    ml: [w]
                }],
                "space-x": [{
                    "space-x": [b]
                }],
                "space-x-reverse": ["space-x-reverse"],
                "space-y": [{
                    "space-y": [b]
                }],
                "space-y-reverse": ["space-y-reverse"],
                w: [{
                    w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", X, t]
                }],
                "min-w": [{
                    "min-w": [X, t, "min", "max", "fit"]
                }],
                "max-w": [{
                    "max-w": [X, t, "none", "full", "min", "max", "fit", "prose", {
                        screen: [Pn]
                    }, Pn]
                }],
                h: [{
                    h: [X, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
                }],
                "min-h": [{
                    "min-h": [X, t, "min", "max", "fit", "svh", "lvh", "dvh"]
                }],
                "max-h": [{
                    "max-h": [X, t, "min", "max", "fit", "svh", "lvh", "dvh"]
                }],
                size: [{
                    size: [X, t, "auto", "min", "max", "fit"]
                }],
                "font-size": [{
                    text: ["base", Pn, kn]
                }],
                "font-smoothing": ["antialiased", "subpixel-antialiased"],
                "font-style": ["italic", "not-italic"],
                "font-weight": [{
                    font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", da]
                }],
                "font-family": [{
                    font: [_o]
                }],
                "fvn-normal": ["normal-nums"],
                "fvn-ordinal": ["ordinal"],
                "fvn-slashed-zero": ["slashed-zero"],
                "fvn-figure": ["lining-nums", "oldstyle-nums"],
                "fvn-spacing": ["proportional-nums", "tabular-nums"],
                "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
                tracking: [{
                    tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", X]
                }],
                "line-clamp": [{
                    "line-clamp": ["none", qr, da]
                }],
                leading: [{
                    leading: ["none", "tight", "snug", "normal", "relaxed", "loose", rn, X]
                }],
                "list-image": [{
                    "list-image": ["none", X]
                }],
                "list-style-type": [{
                    list: ["none", "disc", "decimal", X]
                }],
                "list-style-position": [{
                    list: ["inside", "outside"]
                }],
                "placeholder-color": [{
                    placeholder: [e]
                }],
                "placeholder-opacity": [{
                    "placeholder-opacity": [p]
                }],
                "text-alignment": [{
                    text: ["left", "center", "right", "justify", "start", "end"]
                }],
                "text-color": [{
                    text: [e]
                }],
                "text-opacity": [{
                    "text-opacity": [p]
                }],
                "text-decoration": ["underline", "overline", "line-through", "no-underline"],
                "text-decoration-style": [{
                    decoration: [...U(), "wavy"]
                }],
                "text-decoration-thickness": [{
                    decoration: ["auto", "from-font", rn, kn]
                }],
                "underline-offset": [{
                    "underline-offset": ["auto", rn, X]
                }],
                "text-decoration-color": [{
                    decoration: [e]
                }],
                "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
                "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
                "text-wrap": [{
                    text: ["wrap", "nowrap", "balance", "pretty"]
                }],
                indent: [{
                    indent: I()
                }],
                "vertical-align": [{
                    align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", X]
                }],
                whitespace: [{
                    whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
                }],
                break: [{
                    break: ["normal", "words", "all", "keep"]
                }],
                hyphens: [{
                    hyphens: ["none", "manual", "auto"]
                }],
                content: [{
                    content: ["none", X]
                }],
                "bg-attachment": [{
                    bg: ["fixed", "local", "scroll"]
                }],
                "bg-clip": [{
                    "bg-clip": ["border", "padding", "content", "text"]
                }],
                "bg-opacity": [{
                    "bg-opacity": [p]
                }],
                "bg-origin": [{
                    "bg-origin": ["border", "padding", "content"]
                }],
                "bg-position": [{
                    bg: [...V(), i1]
                }],
                "bg-repeat": [{
                    bg: ["no-repeat", {
                        repeat: ["", "x", "y", "round", "space"]
                    }]
                }],
                "bg-size": [{
                    bg: ["auto", "cover", "contain", o1]
                }],
                "bg-image": [{
                    bg: ["none", {
                        "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
                    }, l1]
                }],
                "bg-color": [{
                    bg: [e]
                }],
                "gradient-from-pos": [{
                    from: [v]
                }],
                "gradient-via-pos": [{
                    via: [v]
                }],
                "gradient-to-pos": [{
                    to: [v]
                }],
                "gradient-from": [{
                    from: [f]
                }],
                "gradient-via": [{
                    via: [f]
                }],
                "gradient-to": [{
                    to: [f]
                }],
                rounded: [{
                    rounded: [i]
                }],
                "rounded-s": [{
                    "rounded-s": [i]
                }],
                "rounded-e": [{
                    "rounded-e": [i]
                }],
                "rounded-t": [{
                    "rounded-t": [i]
                }],
                "rounded-r": [{
                    "rounded-r": [i]
                }],
                "rounded-b": [{
                    "rounded-b": [i]
                }],
                "rounded-l": [{
                    "rounded-l": [i]
                }],
                "rounded-ss": [{
                    "rounded-ss": [i]
                }],
                "rounded-se": [{
                    "rounded-se": [i]
                }],
                "rounded-ee": [{
                    "rounded-ee": [i]
                }],
                "rounded-es": [{
                    "rounded-es": [i]
                }],
                "rounded-tl": [{
                    "rounded-tl": [i]
                }],
                "rounded-tr": [{
                    "rounded-tr": [i]
                }],
                "rounded-br": [{
                    "rounded-br": [i]
                }],
                "rounded-bl": [{
                    "rounded-bl": [i]
                }],
                "border-w": [{
                    border: [l]
                }],
                "border-w-x": [{
                    "border-x": [l]
                }],
                "border-w-y": [{
                    "border-y": [l]
                }],
                "border-w-s": [{
                    "border-s": [l]
                }],
                "border-w-e": [{
                    "border-e": [l]
                }],
                "border-w-t": [{
                    "border-t": [l]
                }],
                "border-w-r": [{
                    "border-r": [l]
                }],
                "border-w-b": [{
                    "border-b": [l]
                }],
                "border-w-l": [{
                    "border-l": [l]
                }],
                "border-opacity": [{
                    "border-opacity": [p]
                }],
                "border-style": [{
                    border: [...U(), "hidden"]
                }],
                "divide-x": [{
                    "divide-x": [l]
                }],
                "divide-x-reverse": ["divide-x-reverse"],
                "divide-y": [{
                    "divide-y": [l]
                }],
                "divide-y-reverse": ["divide-y-reverse"],
                "divide-opacity": [{
                    "divide-opacity": [p]
                }],
                "divide-style": [{
                    divide: U()
                }],
                "border-color": [{
                    border: [o]
                }],
                "border-color-x": [{
                    "border-x": [o]
                }],
                "border-color-y": [{
                    "border-y": [o]
                }],
                "border-color-s": [{
                    "border-s": [o]
                }],
                "border-color-e": [{
                    "border-e": [o]
                }],
                "border-color-t": [{
                    "border-t": [o]
                }],
                "border-color-r": [{
                    "border-r": [o]
                }],
                "border-color-b": [{
                    "border-b": [o]
                }],
                "border-color-l": [{
                    "border-l": [o]
                }],
                "divide-color": [{
                    divide: [o]
                }],
                "outline-style": [{
                    outline: ["", ...U()]
                }],
                "outline-offset": [{
                    "outline-offset": [rn, X]
                }],
                "outline-w": [{
                    outline: [rn, kn]
                }],
                "outline-color": [{
                    outline: [e]
                }],
                "ring-w": [{
                    ring: W()
                }],
                "ring-w-inset": ["ring-inset"],
                "ring-color": [{
                    ring: [e]
                }],
                "ring-opacity": [{
                    "ring-opacity": [p]
                }],
                "ring-offset-w": [{
                    "ring-offset": [rn, kn]
                }],
                "ring-offset-color": [{
                    "ring-offset": [e]
                }],
                shadow: [{
                    shadow: ["", "inner", "none", Pn, a1]
                }],
                "shadow-color": [{
                    shadow: [_o]
                }],
                opacity: [{
                    opacity: [p]
                }],
                "mix-blend": [{
                    "mix-blend": [...H(), "plus-lighter", "plus-darker"]
                }],
                "bg-blend": [{
                    "bg-blend": H()
                }],
                filter: [{
                    filter: ["", "none"]
                }],
                blur: [{
                    blur: [n]
                }],
                brightness: [{
                    brightness: [r]
                }],
                contrast: [{
                    contrast: [a]
                }],
                "drop-shadow": [{
                    "drop-shadow": ["", "none", Pn, X]
                }],
                grayscale: [{
                    grayscale: [u]
                }],
                "hue-rotate": [{
                    "hue-rotate": [c]
                }],
                invert: [{
                    invert: [d]
                }],
                saturate: [{
                    saturate: [y]
                }],
                sepia: [{
                    sepia: [C]
                }],
                "backdrop-filter": [{
                    "backdrop-filter": ["", "none"]
                }],
                "backdrop-blur": [{
                    "backdrop-blur": [n]
                }],
                "backdrop-brightness": [{
                    "backdrop-brightness": [r]
                }],
                "backdrop-contrast": [{
                    "backdrop-contrast": [a]
                }],
                "backdrop-grayscale": [{
                    "backdrop-grayscale": [u]
                }],
                "backdrop-hue-rotate": [{
                    "backdrop-hue-rotate": [c]
                }],
                "backdrop-invert": [{
                    "backdrop-invert": [d]
                }],
                "backdrop-opacity": [{
                    "backdrop-opacity": [p]
                }],
                "backdrop-saturate": [{
                    "backdrop-saturate": [y]
                }],
                "backdrop-sepia": [{
                    "backdrop-sepia": [C]
                }],
                "border-collapse": [{
                    border: ["collapse", "separate"]
                }],
                "border-spacing": [{
                    "border-spacing": [s]
                }],
                "border-spacing-x": [{
                    "border-spacing-x": [s]
                }],
                "border-spacing-y": [{
                    "border-spacing-y": [s]
                }],
                "table-layout": [{
                    table: ["auto", "fixed"]
                }],
                caption: [{
                    caption: ["top", "bottom"]
                }],
                transition: [{
                    transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", X]
                }],
                duration: [{
                    duration: z()
                }],
                ease: [{
                    ease: ["linear", "in", "out", "in-out", X]
                }],
                delay: [{
                    delay: z()
                }],
                animate: [{
                    animate: ["none", "spin", "ping", "pulse", "bounce", X]
                }],
                transform: [{
                    transform: ["", "gpu", "none"]
                }],
                scale: [{
                    scale: [E]
                }],
                "scale-x": [{
                    "scale-x": [E]
                }],
                "scale-y": [{
                    "scale-y": [E]
                }],
                rotate: [{
                    rotate: [Mo, X]
                }],
                "translate-x": [{
                    "translate-x": [T]
                }],
                "translate-y": [{
                    "translate-y": [T]
                }],
                "skew-x": [{
                    "skew-x": [k]
                }],
                "skew-y": [{
                    "skew-y": [k]
                }],
                "transform-origin": [{
                    origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", X]
                }],
                accent: [{
                    accent: ["auto", e]
                }],
                appearance: [{
                    appearance: ["none", "auto"]
                }],
                cursor: [{
                    cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", X]
                }],
                "caret-color": [{
                    caret: [e]
                }],
                "pointer-events": [{
                    "pointer-events": ["none", "auto"]
                }],
                resize: [{
                    resize: ["none", "y", "x", ""]
                }],
                "scroll-behavior": [{
                    scroll: ["auto", "smooth"]
                }],
                "scroll-m": [{
                    "scroll-m": I()
                }],
                "scroll-mx": [{
                    "scroll-mx": I()
                }],
                "scroll-my": [{
                    "scroll-my": I()
                }],
                "scroll-ms": [{
                    "scroll-ms": I()
                }],
                "scroll-me": [{
                    "scroll-me": I()
                }],
                "scroll-mt": [{
                    "scroll-mt": I()
                }],
                "scroll-mr": [{
                    "scroll-mr": I()
                }],
                "scroll-mb": [{
                    "scroll-mb": I()
                }],
                "scroll-ml": [{
                    "scroll-ml": I()
                }],
                "scroll-p": [{
                    "scroll-p": I()
                }],
                "scroll-px": [{
                    "scroll-px": I()
                }],
                "scroll-py": [{
                    "scroll-py": I()
                }],
                "scroll-ps": [{
                    "scroll-ps": I()
                }],
                "scroll-pe": [{
                    "scroll-pe": I()
                }],
                "scroll-pt": [{
                    "scroll-pt": I()
                }],
                "scroll-pr": [{
                    "scroll-pr": I()
                }],
                "scroll-pb": [{
                    "scroll-pb": I()
                }],
                "scroll-pl": [{
                    "scroll-pl": I()
                }],
                "snap-align": [{
                    snap: ["start", "end", "center", "align-none"]
                }],
                "snap-stop": [{
                    snap: ["normal", "always"]
                }],
                "snap-type": [{
                    snap: ["none", "x", "y", "both"]
                }],
                "snap-strictness": [{
                    snap: ["mandatory", "proximity"]
                }],
                touch: [{
                    touch: ["auto", "none", "manipulation"]
                }],
                "touch-x": [{
                    "touch-pan": ["x", "left", "right"]
                }],
                "touch-y": [{
                    "touch-pan": ["y", "up", "down"]
                }],
                "touch-pz": ["touch-pinch-zoom"],
                select: [{
                    select: ["none", "text", "all", "auto"]
                }],
                "will-change": [{
                    "will-change": ["auto", "scroll", "contents", "transform", X]
                }],
                fill: [{
                    fill: [e, "none"]
                }],
                "stroke-w": [{
                    stroke: [rn, kn, da]
                }],
                stroke: [{
                    stroke: [e, "none"]
                }],
                sr: ["sr-only", "not-sr-only"],
                "forced-color-adjust": [{
                    "forced-color-adjust": ["auto", "none"]
                }]
            },
            conflictingClassGroups: {
                overflow: ["overflow-x", "overflow-y"],
                overscroll: ["overscroll-x", "overscroll-y"],
                inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
                "inset-x": ["right", "left"],
                "inset-y": ["top", "bottom"],
                flex: ["basis", "grow", "shrink"],
                gap: ["gap-x", "gap-y"],
                p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
                px: ["pr", "pl"],
                py: ["pt", "pb"],
                m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
                mx: ["mr", "ml"],
                my: ["mt", "mb"],
                size: ["w", "h"],
                "font-size": ["leading"],
                "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
                "fvn-ordinal": ["fvn-normal"],
                "fvn-slashed-zero": ["fvn-normal"],
                "fvn-figure": ["fvn-normal"],
                "fvn-spacing": ["fvn-normal"],
                "fvn-fraction": ["fvn-normal"],
                "line-clamp": ["display", "overflow"],
                rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
                "rounded-s": ["rounded-ss", "rounded-es"],
                "rounded-e": ["rounded-se", "rounded-ee"],
                "rounded-t": ["rounded-tl", "rounded-tr"],
                "rounded-r": ["rounded-tr", "rounded-br"],
                "rounded-b": ["rounded-br", "rounded-bl"],
                "rounded-l": ["rounded-tl", "rounded-bl"],
                "border-spacing": ["border-spacing-x", "border-spacing-y"],
                "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
                "border-w-x": ["border-w-r", "border-w-l"],
                "border-w-y": ["border-w-t", "border-w-b"],
                "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
                "border-color-x": ["border-color-r", "border-color-l"],
                "border-color-y": ["border-color-t", "border-color-b"],
                "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
                "scroll-mx": ["scroll-mr", "scroll-ml"],
                "scroll-my": ["scroll-mt", "scroll-mb"],
                "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
                "scroll-px": ["scroll-pr", "scroll-pl"],
                "scroll-py": ["scroll-pt", "scroll-pb"],
                touch: ["touch-x", "touch-y", "touch-pz"],
                "touch-x": ["touch"],
                "touch-y": ["touch"],
                "touch-pz": ["touch"]
            },
            conflictingClassGroupModifiers: {
                "font-size": ["leading"]
            }
        }
    },
    p1 = Gw(f1);

function or(...e) {
    return p1(Hm(e))
}
const h1 = bw,
    Xm = x.forwardRef(({
        className: e,
        ...t
    }, n) => S.jsx(Dm, {
        ref: n,
        className: or("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", e),
        ...t
    }));
Xm.displayName = Dm.displayName;
const m1 = kw("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
        variants: {
            variant: {
                default: "border bg-background text-foreground",
                destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }),
    Zm = x.forwardRef(({
        className: e,
        variant: t,
        ...n
    }, r) => S.jsx(Fm, {
        ref: r,
        className: or(m1({
            variant: t
        }), e),
        ...n
    }));
Zm.displayName = Fm.displayName;
const g1 = x.forwardRef(({
    className: e,
    ...t
}, n) => S.jsx(Bm, {
    ref: n,
    className: or("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50", e),
    ...t
}));
g1.displayName = Bm.displayName;
const Jm = x.forwardRef(({
    className: e,
    ...t
}, n) => S.jsx(Um, {
    ref: n,
    className: or("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", e),
    "toast-close": "",
    ...t,
    children: S.jsx(_w, {
        className: "h-4 w-4"
    })
}));
Jm.displayName = Um.displayName;
const eg = x.forwardRef(({
    className: e,
    ...t
}, n) => S.jsx(zm, {
    ref: n,
    className: or("text-sm font-semibold", e),
    ...t
}));
eg.displayName = zm.displayName;
const tg = x.forwardRef(({
    className: e,
    ...t
}, n) => S.jsx($m, {
    ref: n,
    className: or("text-sm opacity-90", e),
    ...t
}));
tg.displayName = $m.displayName;

function v1() {
    const {
        toasts: e
    } = Ly();
    return S.jsxs(h1, {
        children: [e.map(function({
            id: t,
            title: n,
            description: r,
            action: o,
            ...i
        }) {
            return S.jsxs(Zm, {
                ...i,
                children: [S.jsxs("div", {
                    className: "grid gap-1",
                    children: [n && S.jsx(eg, {
                        children: n
                    }), r && S.jsx(tg, {
                        children: r
                    })]
                }), o, S.jsx(Jm, {})]
            }, t)
        }), S.jsx(Xm, {})]
    })
}
var ff = ["light", "dark"],
    y1 = "(prefers-color-scheme: dark)",
    w1 = x.createContext(void 0),
    x1 = {
        setTheme: e => {},
        themes: []
    },
    S1 = () => {
        var e;
        return (e = x.useContext(w1)) != null ? e : x1
    };
x.memo(({
    forcedTheme: e,
    storageKey: t,
    attribute: n,
    enableSystem: r,
    enableColorScheme: o,
    defaultTheme: i,
    value: s,
    attrs: l,
    nonce: a
}) => {
    let u = i === "system",
        c = n === "class" ? `var d=document.documentElement,c=d.classList;${`c.remove(${l.map(v=>`'${v}'`).join(",")})`};` : `var d=document.documentElement,n='${n}',s='setAttribute';`,
        d = o ? ff.includes(i) && i ? `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${i}'` : "if(e==='light'||e==='dark')d.style.colorScheme=e" : "",
        h = (v, g = !1, w = !0) => {
            let p = s ? s[v] : v,
                m = g ? v + "|| ''" : `'${p}'`,
                y = "";
            return o && w && !g && ff.includes(v) && (y += `d.style.colorScheme = '${v}';`), n === "class" ? g || p ? y += `c.add(${m})` : y += "null" : p && (y += `d[s](n,${m})`), y
        },
        f = e ? `!function(){${c}${h(e)}}()` : r ? `!function(){try{${c}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${u})){var t='${y1}',m=window.matchMedia(t);if(m.media!==t||m.matches){${h("dark")}}else{${h("light")}}}else if(e){${s?`var x=${JSON.stringify(s)};`:""}${h(s?"x[e]":"e",!0)}}${u?"":"else{"+h(i,!1,!1)+"}"}${d}}catch(e){}}()` : `!function(){try{${c}var e=localStorage.getItem('${t}');if(e){${s?`var x=${JSON.stringify(s)};`:""}${h(s?"x[e]":"e",!0)}}else{${h(i,!1,!1)};}${d}}catch(t){}}();`;
    return x.createElement("script", {
        nonce: a,
        dangerouslySetInnerHTML: {
            __html: f
        }
    })
});
var E1 = e => {
        switch (e) {
            case "success":
                return k1;
            case "info":
                return T1;
            case "warning":
                return P1;
            case "error":
                return N1;
            default:
                return null
        }
    },
    C1 = Array(12).fill(0),
    b1 = ({
        visible: e,
        className: t
    }) => _.createElement("div", {
        className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
        "data-visible": e
    }, _.createElement("div", {
        className: "sonner-spinner"
    }, C1.map((n, r) => _.createElement("div", {
        className: "sonner-loading-bar",
        key: `spinner-bar-${r}`
    })))),
    k1 = _.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, _.createElement("path", {
        fillRule: "evenodd",
        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
        clipRule: "evenodd"
    })),
    P1 = _.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, _.createElement("path", {
        fillRule: "evenodd",
        d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
        clipRule: "evenodd"
    })),
    T1 = _.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, _.createElement("path", {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
        clipRule: "evenodd"
    })),
    N1 = _.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, _.createElement("path", {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
        clipRule: "evenodd"
    })),
    R1 = _.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "12",
        height: "12",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, _.createElement("line", {
        x1: "18",
        y1: "6",
        x2: "6",
        y2: "18"
    }), _.createElement("line", {
        x1: "6",
        y1: "6",
        x2: "18",
        y2: "18"
    })),
    O1 = () => {
        let [e, t] = _.useState(document.hidden);
        return _.useEffect(() => {
            let n = () => {
                t(document.hidden)
            };
            return document.addEventListener("visibilitychange", n), () => window.removeEventListener("visibilitychange", n)
        }, []), e
    },
    hu = 1,
    j1 = class {
        constructor() {
            this.subscribe = e => (this.subscribers.push(e), () => {
                let t = this.subscribers.indexOf(e);
                this.subscribers.splice(t, 1)
            }), this.publish = e => {
                this.subscribers.forEach(t => t(e))
            }, this.addToast = e => {
                this.publish(e), this.toasts = [...this.toasts, e]
            }, this.create = e => {
                var t;
                let {
                    message: n,
                    ...r
                } = e, o = typeof(e == null ? void 0 : e.id) == "number" || ((t = e.id) == null ? void 0 : t.length) > 0 ? e.id : hu++, i = this.toasts.find(l => l.id === o), s = e.dismissible === void 0 ? !0 : e.dismissible;
                return this.dismissedToasts.has(o) && this.dismissedToasts.delete(o), i ? this.toasts = this.toasts.map(l => l.id === o ? (this.publish({
                    ...l,
                    ...e,
                    id: o,
                    title: n
                }), {
                    ...l,
                    ...e,
                    id: o,
                    dismissible: s,
                    title: n
                }) : l) : this.addToast({
                    title: n,
                    ...r,
                    dismissible: s,
                    id: o
                }), o
            }, this.dismiss = e => (this.dismissedToasts.add(e), e || this.toasts.forEach(t => {
                this.subscribers.forEach(n => n({
                    id: t.id,
                    dismiss: !0
                }))
            }), this.subscribers.forEach(t => t({
                id: e,
                dismiss: !0
            })), e), this.message = (e, t) => this.create({
                ...t,
                message: e
            }), this.error = (e, t) => this.create({
                ...t,
                message: e,
                type: "error"
            }), this.success = (e, t) => this.create({
                ...t,
                type: "success",
                message: e
            }), this.info = (e, t) => this.create({
                ...t,
                type: "info",
                message: e
            }), this.warning = (e, t) => this.create({
                ...t,
                type: "warning",
                message: e
            }), this.loading = (e, t) => this.create({
                ...t,
                type: "loading",
                message: e
            }), this.promise = (e, t) => {
                if (!t) return;
                let n;
                t.loading !== void 0 && (n = this.create({
                    ...t,
                    promise: e,
                    type: "loading",
                    message: t.loading,
                    description: typeof t.description != "function" ? t.description : void 0
                }));
                let r = e instanceof Promise ? e : e(),
                    o = n !== void 0,
                    i, s = r.then(async a => {
                        if (i = ["resolve", a], _.isValidElement(a)) o = !1, this.create({
                            id: n,
                            type: "default",
                            message: a
                        });
                        else if (A1(a) && !a.ok) {
                            o = !1;
                            let u = typeof t.error == "function" ? await t.error(`HTTP error! status: ${a.status}`) : t.error,
                                c = typeof t.description == "function" ? await t.description(`HTTP error! status: ${a.status}`) : t.description;
                            this.create({
                                id: n,
                                type: "error",
                                message: u,
                                description: c
                            })
                        } else if (t.success !== void 0) {
                            o = !1;
                            let u = typeof t.success == "function" ? await t.success(a) : t.success,
                                c = typeof t.description == "function" ? await t.description(a) : t.description;
                            this.create({
                                id: n,
                                type: "success",
                                message: u,
                                description: c
                            })
                        }
                    }).catch(async a => {
                        if (i = ["reject", a], t.error !== void 0) {
                            o = !1;
                            let u = typeof t.error == "function" ? await t.error(a) : t.error,
                                c = typeof t.description == "function" ? await t.description(a) : t.description;
                            this.create({
                                id: n,
                                type: "error",
                                message: u,
                                description: c
                            })
                        }
                    }).finally(() => {
                        var a;
                        o && (this.dismiss(n), n = void 0), (a = t.finally) == null || a.call(t)
                    }),
                    l = () => new Promise((a, u) => s.then(() => i[0] === "reject" ? u(i[1]) : a(i[1])).catch(u));
                return typeof n != "string" && typeof n != "number" ? {
                    unwrap: l
                } : Object.assign(n, {
                    unwrap: l
                })
            }, this.custom = (e, t) => {
                let n = (t == null ? void 0 : t.id) || hu++;
                return this.create({
                    jsx: e(n),
                    id: n,
                    ...t
                }), n
            }, this.getActiveToasts = () => this.toasts.filter(e => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = new Set
        }
    },
    Ye = new j1,
    L1 = (e, t) => {
        let n = (t == null ? void 0 : t.id) || hu++;
        return Ye.addToast({
            title: e,
            ...t,
            id: n
        }), n
    },
    A1 = e => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number",
    M1 = L1,
    _1 = () => Ye.toasts,
    I1 = () => Ye.getActiveToasts();
Object.assign(M1, {
    success: Ye.success,
    info: Ye.info,
    warning: Ye.warning,
    error: Ye.error,
    custom: Ye.custom,
    message: Ye.message,
    promise: Ye.promise,
    dismiss: Ye.dismiss,
    loading: Ye.loading
}, {
    getHistory: _1,
    getToasts: I1
});

function D1(e, {
    insertAt: t
} = {}) {
    if (typeof document > "u") return;
    let n = document.head || document.getElementsByTagName("head")[0],
        r = document.createElement("style");
    r.type = "text/css", t === "top" && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e))
}
D1(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);

function os(e) {
    return e.label !== void 0
}
var F1 = 3,
    z1 = "32px",
    $1 = "16px",
    pf = 4e3,
    B1 = 356,
    U1 = 14,
    V1 = 20,
    H1 = 200;

function Nt(...e) {
    return e.filter(Boolean).join(" ")
}

function W1(e) {
    let [t, n] = e.split("-"), r = [];
    return t && r.push(t), n && r.push(n), r
}
var Q1 = e => {
    var t, n, r, o, i, s, l, a, u, c, d;
    let {
        invert: h,
        toast: f,
        unstyled: v,
        interacting: g,
        setHeights: w,
        visibleToasts: p,
        heights: m,
        index: y,
        toasts: E,
        expanded: C,
        removeToast: k,
        defaultRichColors: b,
        closeButton: T,
        style: j,
        cancelButtonStyle: L,
        actionButtonStyle: D,
        className: I = "",
        descriptionClassName: W = "",
        duration: O,
        position: V,
        gap: U,
        loadingIcon: H,
        expandByDefault: N,
        classNames: P,
        icons: M,
        closeButtonAriaLabel: z = "Close toast",
        pauseWhenPageIsHidden: F
    } = e, [Q, K] = _.useState(null), [ie, ve] = _.useState(null), [Y, ye] = _.useState(!1), [Ne, Ee] = _.useState(!1), [te, B] = _.useState(!1), [J, ae] = _.useState(!1), [be, $e] = _.useState(!1), [rt, ot] = _.useState(0), [Be, Vt] = _.useState(0), xt = _.useRef(f.duration || O || pf), Nr = _.useRef(null), St = _.useRef(null), Ai = y === 0, Mi = y + 1 <= p, Ge = f.type, nn = f.dismissible !== !1, jl = f.className || "", Co = f.descriptionClassName || "", Et = _.useMemo(() => m.findIndex(G => G.toastId === f.id) || 0, [m, f.id]), bo = _.useMemo(() => {
        var G;
        return (G = f.closeButton) != null ? G : T
    }, [f.closeButton, T]), Rr = _.useMemo(() => f.duration || O || pf, [f.duration, O]), wn = _.useRef(0), xn = _.useRef(0), _i = _.useRef(0), Sn = _.useRef(null), [Ll, Al] = V.split("-"), ko = _.useMemo(() => m.reduce((G, re, se) => se >= Et ? G : G + re.height, 0), [m, Et]), Ii = O1(), Di = f.invert || h, Or = Ge === "loading";
    xn.current = _.useMemo(() => Et * U + ko, [Et, ko]), _.useEffect(() => {
        xt.current = Rr
    }, [Rr]), _.useEffect(() => {
        ye(!0)
    }, []), _.useEffect(() => {
        let G = St.current;
        if (G) {
            let re = G.getBoundingClientRect().height;
            return Vt(re), w(se => [{
                toastId: f.id,
                height: re,
                position: f.position
            }, ...se]), () => w(se => se.filter(bt => bt.toastId !== f.id))
        }
    }, [w, f.id]), _.useLayoutEffect(() => {
        if (!Y) return;
        let G = St.current,
            re = G.style.height;
        G.style.height = "auto";
        let se = G.getBoundingClientRect().height;
        G.style.height = re, Vt(se), w(bt => bt.find(kt => kt.toastId === f.id) ? bt.map(kt => kt.toastId === f.id ? {
            ...kt,
            height: se
        } : kt) : [{
            toastId: f.id,
            height: se,
            position: f.position
        }, ...bt])
    }, [Y, f.title, f.description, w, f.id]);
    let Ct = _.useCallback(() => {
        Ee(!0), ot(xn.current), w(G => G.filter(re => re.toastId !== f.id)), setTimeout(() => {
            k(f)
        }, H1)
    }, [f, k, w, xn]);
    _.useEffect(() => {
        if (f.promise && Ge === "loading" || f.duration === 1 / 0 || f.type === "loading") return;
        let G;
        return C || g || F && Ii ? (() => {
            if (_i.current < wn.current) {
                let re = new Date().getTime() - wn.current;
                xt.current = xt.current - re
            }
            _i.current = new Date().getTime()
        })() : xt.current !== 1 / 0 && (wn.current = new Date().getTime(), G = setTimeout(() => {
            var re;
            (re = f.onAutoClose) == null || re.call(f, f), Ct()
        }, xt.current)), () => clearTimeout(G)
    }, [C, g, f, Ge, F, Ii, Ct]), _.useEffect(() => {
        f.delete && Ct()
    }, [Ct, f.delete]);

    function Ml() {
        var G, re, se;
        return M != null && M.loading ? _.createElement("div", {
            className: Nt(P == null ? void 0 : P.loader, (G = f == null ? void 0 : f.classNames) == null ? void 0 : G.loader, "sonner-loader"),
            "data-visible": Ge === "loading"
        }, M.loading) : H ? _.createElement("div", {
            className: Nt(P == null ? void 0 : P.loader, (re = f == null ? void 0 : f.classNames) == null ? void 0 : re.loader, "sonner-loader"),
            "data-visible": Ge === "loading"
        }, H) : _.createElement(b1, {
            className: Nt(P == null ? void 0 : P.loader, (se = f == null ? void 0 : f.classNames) == null ? void 0 : se.loader),
            visible: Ge === "loading"
        })
    }
    return _.createElement("li", {
        tabIndex: 0,
        ref: St,
        className: Nt(I, jl, P == null ? void 0 : P.toast, (t = f == null ? void 0 : f.classNames) == null ? void 0 : t.toast, P == null ? void 0 : P.default, P == null ? void 0 : P[Ge], (n = f == null ? void 0 : f.classNames) == null ? void 0 : n[Ge]),
        "data-sonner-toast": "",
        "data-rich-colors": (r = f.richColors) != null ? r : b,
        "data-styled": !(f.jsx || f.unstyled || v),
        "data-mounted": Y,
        "data-promise": !!f.promise,
        "data-swiped": be,
        "data-removed": Ne,
        "data-visible": Mi,
        "data-y-position": Ll,
        "data-x-position": Al,
        "data-index": y,
        "data-front": Ai,
        "data-swiping": te,
        "data-dismissible": nn,
        "data-type": Ge,
        "data-invert": Di,
        "data-swipe-out": J,
        "data-swipe-direction": ie,
        "data-expanded": !!(C || N && Y),
        style: {
            "--index": y,
            "--toasts-before": y,
            "--z-index": E.length - y,
            "--offset": `${Ne?rt:xn.current}px`,
            "--initial-height": N ? "auto" : `${Be}px`,
            ...j,
            ...f.style
        },
        onDragEnd: () => {
            B(!1), K(null), Sn.current = null
        },
        onPointerDown: G => {
            Or || !nn || (Nr.current = new Date, ot(xn.current), G.target.setPointerCapture(G.pointerId), G.target.tagName !== "BUTTON" && (B(!0), Sn.current = {
                x: G.clientX,
                y: G.clientY
            }))
        },
        onPointerUp: () => {
            var G, re, se, bt;
            if (J || !nn) return;
            Sn.current = null;
            let kt = Number(((G = St.current) == null ? void 0 : G.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0),
                En = Number(((re = St.current) == null ? void 0 : re.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0),
                ir = new Date().getTime() - ((se = Nr.current) == null ? void 0 : se.getTime()),
                Pt = Q === "x" ? kt : En,
                Cn = Math.abs(Pt) / ir;
            if (Math.abs(Pt) >= V1 || Cn > .11) {
                ot(xn.current), (bt = f.onDismiss) == null || bt.call(f, f), ve(Q === "x" ? kt > 0 ? "right" : "left" : En > 0 ? "down" : "up"), Ct(), ae(!0), $e(!1);
                return
            }
            B(!1), K(null)
        },
        onPointerMove: G => {
            var re, se, bt, kt;
            if (!Sn.current || !nn || ((re = window.getSelection()) == null ? void 0 : re.toString().length) > 0) return;
            let En = G.clientY - Sn.current.y,
                ir = G.clientX - Sn.current.x,
                Pt = (se = e.swipeDirections) != null ? se : W1(V);
            !Q && (Math.abs(ir) > 1 || Math.abs(En) > 1) && K(Math.abs(ir) > Math.abs(En) ? "x" : "y");
            let Cn = {
                x: 0,
                y: 0
            };
            Q === "y" ? (Pt.includes("top") || Pt.includes("bottom")) && (Pt.includes("top") && En < 0 || Pt.includes("bottom") && En > 0) && (Cn.y = En) : Q === "x" && (Pt.includes("left") || Pt.includes("right")) && (Pt.includes("left") && ir < 0 || Pt.includes("right") && ir > 0) && (Cn.x = ir), (Math.abs(Cn.x) > 0 || Math.abs(Cn.y) > 0) && $e(!0), (bt = St.current) == null || bt.style.setProperty("--swipe-amount-x", `${Cn.x}px`), (kt = St.current) == null || kt.style.setProperty("--swipe-amount-y", `${Cn.y}px`)
        }
    }, bo && !f.jsx ? _.createElement("button", {
        "aria-label": z,
        "data-disabled": Or,
        "data-close-button": !0,
        onClick: Or || !nn ? () => {} : () => {
            var G;
            Ct(), (G = f.onDismiss) == null || G.call(f, f)
        },
        className: Nt(P == null ? void 0 : P.closeButton, (o = f == null ? void 0 : f.classNames) == null ? void 0 : o.closeButton)
    }, (i = M == null ? void 0 : M.close) != null ? i : R1) : null, f.jsx || x.isValidElement(f.title) ? f.jsx ? f.jsx : typeof f.title == "function" ? f.title() : f.title : _.createElement(_.Fragment, null, Ge || f.icon || f.promise ? _.createElement("div", {
        "data-icon": "",
        className: Nt(P == null ? void 0 : P.icon, (s = f == null ? void 0 : f.classNames) == null ? void 0 : s.icon)
    }, f.promise || f.type === "loading" && !f.icon ? f.icon || Ml() : null, f.type !== "loading" ? f.icon || (M == null ? void 0 : M[Ge]) || E1(Ge) : null) : null, _.createElement("div", {
        "data-content": "",
        className: Nt(P == null ? void 0 : P.content, (l = f == null ? void 0 : f.classNames) == null ? void 0 : l.content)
    }, _.createElement("div", {
        "data-title": "",
        className: Nt(P == null ? void 0 : P.title, (a = f == null ? void 0 : f.classNames) == null ? void 0 : a.title)
    }, typeof f.title == "function" ? f.title() : f.title), f.description ? _.createElement("div", {
        "data-description": "",
        className: Nt(W, Co, P == null ? void 0 : P.description, (u = f == null ? void 0 : f.classNames) == null ? void 0 : u.description)
    }, typeof f.description == "function" ? f.description() : f.description) : null), x.isValidElement(f.cancel) ? f.cancel : f.cancel && os(f.cancel) ? _.createElement("button", {
        "data-button": !0,
        "data-cancel": !0,
        style: f.cancelButtonStyle || L,
        onClick: G => {
            var re, se;
            os(f.cancel) && nn && ((se = (re = f.cancel).onClick) == null || se.call(re, G), Ct())
        },
        className: Nt(P == null ? void 0 : P.cancelButton, (c = f == null ? void 0 : f.classNames) == null ? void 0 : c.cancelButton)
    }, f.cancel.label) : null, x.isValidElement(f.action) ? f.action : f.action && os(f.action) ? _.createElement("button", {
        "data-button": !0,
        "data-action": !0,
        style: f.actionButtonStyle || D,
        onClick: G => {
            var re, se;
            os(f.action) && ((se = (re = f.action).onClick) == null || se.call(re, G), !G.defaultPrevented && Ct())
        },
        className: Nt(P == null ? void 0 : P.actionButton, (d = f == null ? void 0 : f.classNames) == null ? void 0 : d.actionButton)
    }, f.action.label) : null))
};

function hf() {
    if (typeof window > "u" || typeof document > "u") return "ltr";
    let e = document.documentElement.getAttribute("dir");
    return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e
}

function K1(e, t) {
    let n = {};
    return [e, t].forEach((r, o) => {
        let i = o === 1,
            s = i ? "--mobile-offset" : "--offset",
            l = i ? $1 : z1;

        function a(u) {
            ["top", "right", "bottom", "left"].forEach(c => {
                n[`${s}-${c}`] = typeof u == "number" ? `${u}px` : u
            })
        }
        typeof r == "number" || typeof r == "string" ? a(r) : typeof r == "object" ? ["top", "right", "bottom", "left"].forEach(u => {
            r[u] === void 0 ? n[`${s}-${u}`] = l : n[`${s}-${u}`] = typeof r[u] == "number" ? `${r[u]}px` : r[u]
        }) : a(l)
    }), n
}
var G1 = x.forwardRef(function(e, t) {
    let {
        invert: n,
        position: r = "bottom-right",
        hotkey: o = ["altKey", "KeyT"],
        expand: i,
        closeButton: s,
        className: l,
        offset: a,
        mobileOffset: u,
        theme: c = "light",
        richColors: d,
        duration: h,
        style: f,
        visibleToasts: v = F1,
        toastOptions: g,
        dir: w = hf(),
        gap: p = U1,
        loadingIcon: m,
        icons: y,
        containerAriaLabel: E = "Notifications",
        pauseWhenPageIsHidden: C
    } = e, [k, b] = _.useState([]), T = _.useMemo(() => Array.from(new Set([r].concat(k.filter(F => F.position).map(F => F.position)))), [k, r]), [j, L] = _.useState([]), [D, I] = _.useState(!1), [W, O] = _.useState(!1), [V, U] = _.useState(c !== "system" ? c : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), H = _.useRef(null), N = o.join("+").replace(/Key/g, "").replace(/Digit/g, ""), P = _.useRef(null), M = _.useRef(!1), z = _.useCallback(F => {
        b(Q => {
            var K;
            return (K = Q.find(ie => ie.id === F.id)) != null && K.delete || Ye.dismiss(F.id), Q.filter(({
                id: ie
            }) => ie !== F.id)
        })
    }, []);
    return _.useEffect(() => Ye.subscribe(F => {
        if (F.dismiss) {
            b(Q => Q.map(K => K.id === F.id ? {
                ...K,
                delete: !0
            } : K));
            return
        }
        setTimeout(() => {
            mm.flushSync(() => {
                b(Q => {
                    let K = Q.findIndex(ie => ie.id === F.id);
                    return K !== -1 ? [...Q.slice(0, K), {
                        ...Q[K],
                        ...F
                    }, ...Q.slice(K + 1)] : [F, ...Q]
                })
            })
        })
    }), []), _.useEffect(() => {
        if (c !== "system") {
            U(c);
            return
        }
        if (c === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? U("dark") : U("light")), typeof window > "u") return;
        let F = window.matchMedia("(prefers-color-scheme: dark)");
        try {
            F.addEventListener("change", ({
                matches: Q
            }) => {
                U(Q ? "dark" : "light")
            })
        } catch {
            F.addListener(({
                matches: K
            }) => {
                try {
                    U(K ? "dark" : "light")
                } catch (ie) {
                    console.error(ie)
                }
            })
        }
    }, [c]), _.useEffect(() => {
        k.length <= 1 && I(!1)
    }, [k]), _.useEffect(() => {
        let F = Q => {
            var K, ie;
            o.every(ve => Q[ve] || Q.code === ve) && (I(!0), (K = H.current) == null || K.focus()), Q.code === "Escape" && (document.activeElement === H.current || (ie = H.current) != null && ie.contains(document.activeElement)) && I(!1)
        };
        return document.addEventListener("keydown", F), () => document.removeEventListener("keydown", F)
    }, [o]), _.useEffect(() => {
        if (H.current) return () => {
            P.current && (P.current.focus({
                preventScroll: !0
            }), P.current = null, M.current = !1)
        }
    }, [H.current]), _.createElement("section", {
        ref: t,
        "aria-label": `${E} ${N}`,
        tabIndex: -1,
        "aria-live": "polite",
        "aria-relevant": "additions text",
        "aria-atomic": "false",
        suppressHydrationWarning: !0
    }, T.map((F, Q) => {
        var K;
        let [ie, ve] = F.split("-");
        return k.length ? _.createElement("ol", {
            key: F,
            dir: w === "auto" ? hf() : w,
            tabIndex: -1,
            ref: H,
            className: l,
            "data-sonner-toaster": !0,
            "data-theme": V,
            "data-y-position": ie,
            "data-lifted": D && k.length > 1 && !i,
            "data-x-position": ve,
            style: {
                "--front-toast-height": `${((K=j[0])==null?void 0:K.height)||0}px`,
                "--width": `${B1}px`,
                "--gap": `${p}px`,
                ...f,
                ...K1(a, u)
            },
            onBlur: Y => {
                M.current && !Y.currentTarget.contains(Y.relatedTarget) && (M.current = !1, P.current && (P.current.focus({
                    preventScroll: !0
                }), P.current = null))
            },
            onFocus: Y => {
                Y.target instanceof HTMLElement && Y.target.dataset.dismissible === "false" || M.current || (M.current = !0, P.current = Y.relatedTarget)
            },
            onMouseEnter: () => I(!0),
            onMouseMove: () => I(!0),
            onMouseLeave: () => {
                W || I(!1)
            },
            onDragEnd: () => I(!1),
            onPointerDown: Y => {
                Y.target instanceof HTMLElement && Y.target.dataset.dismissible === "false" || O(!0)
            },
            onPointerUp: () => O(!1)
        }, k.filter(Y => !Y.position && Q === 0 || Y.position === F).map((Y, ye) => {
            var Ne, Ee;
            return _.createElement(Q1, {
                key: Y.id,
                icons: y,
                index: ye,
                toast: Y,
                defaultRichColors: d,
                duration: (Ne = g == null ? void 0 : g.duration) != null ? Ne : h,
                className: g == null ? void 0 : g.className,
                descriptionClassName: g == null ? void 0 : g.descriptionClassName,
                invert: n,
                visibleToasts: v,
                closeButton: (Ee = g == null ? void 0 : g.closeButton) != null ? Ee : s,
                interacting: W,
                position: F,
                style: g == null ? void 0 : g.style,
                unstyled: g == null ? void 0 : g.unstyled,
                classNames: g == null ? void 0 : g.classNames,
                cancelButtonStyle: g == null ? void 0 : g.cancelButtonStyle,
                actionButtonStyle: g == null ? void 0 : g.actionButtonStyle,
                removeToast: z,
                toasts: k.filter(te => te.position == Y.position),
                heights: j.filter(te => te.position == Y.position),
                setHeights: L,
                expandByDefault: i,
                gap: p,
                loadingIcon: m,
                expanded: D,
                pauseWhenPageIsHidden: C,
                swipeDirections: e.swipeDirections
            })
        })) : null
    }))
});
const Y1 = ({
        ...e
    }) => {
        const {
            theme: t = "system"
        } = S1();
        return S.jsx(G1, {
            theme: t,
            className: "toaster group",
            toastOptions: {
                classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
                }
            },
            ...e
        })
    },
    q1 = ["top", "right", "bottom", "left"],
    Zn = Math.min,
    st = Math.max,
    Ks = Math.round,
    is = Math.floor,
    Jt = e => ({
        x: e,
        y: e
    }),
    X1 = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    },
    Z1 = {
        start: "end",
        end: "start"
    };

function mu(e, t, n) {
    return st(e, Zn(t, n))
}

function gn(e, t) {
    return typeof e == "function" ? e(t) : e
}

function vn(e) {
    return e.split("-")[0]
}

function So(e) {
    return e.split("-")[1]
}

function Nc(e) {
    return e === "x" ? "y" : "x"
}

function Rc(e) {
    return e === "y" ? "height" : "width"
}
const J1 = new Set(["top", "bottom"]);

function qt(e) {
    return J1.has(vn(e)) ? "y" : "x"
}

function Oc(e) {
    return Nc(qt(e))
}

function ex(e, t, n) {
    n === void 0 && (n = !1);
    const r = So(e),
        o = Oc(e),
        i = Rc(o);
    let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
    return t.reference[i] > t.floating[i] && (s = Gs(s)), [s, Gs(s)]
}

function tx(e) {
    const t = Gs(e);
    return [gu(e), t, gu(t)]
}

function gu(e) {
    return e.replace(/start|end/g, t => Z1[t])
}
const mf = ["left", "right"],
    gf = ["right", "left"],
    nx = ["top", "bottom"],
    rx = ["bottom", "top"];

function ox(e, t, n) {
    switch (e) {
        case "top":
        case "bottom":
            return n ? t ? gf : mf : t ? mf : gf;
        case "left":
        case "right":
            return t ? nx : rx;
        default:
            return []
    }
}

function ix(e, t, n, r) {
    const o = So(e);
    let i = ox(vn(e), n === "start", r);
    return o && (i = i.map(s => s + "-" + o), t && (i = i.concat(i.map(gu)))), i
}

function Gs(e) {
    return e.replace(/left|right|bottom|top/g, t => X1[t])
}

function sx(e) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...e
    }
}

function ng(e) {
    return typeof e != "number" ? sx(e) : {
        top: e,
        right: e,
        bottom: e,
        left: e
    }
}

function Ys(e) {
    const {
        x: t,
        y: n,
        width: r,
        height: o
    } = e;
    return {
        width: r,
        height: o,
        top: n,
        left: t,
        right: t + r,
        bottom: n + o,
        x: t,
        y: n
    }
}

function vf(e, t, n) {
    let {
        reference: r,
        floating: o
    } = e;
    const i = qt(t),
        s = Oc(t),
        l = Rc(s),
        a = vn(t),
        u = i === "y",
        c = r.x + r.width / 2 - o.width / 2,
        d = r.y + r.height / 2 - o.height / 2,
        h = r[l] / 2 - o[l] / 2;
    let f;
    switch (a) {
        case "top":
            f = {
                x: c,
                y: r.y - o.height
            };
            break;
        case "bottom":
            f = {
                x: c,
                y: r.y + r.height
            };
            break;
        case "right":
            f = {
                x: r.x + r.width,
                y: d
            };
            break;
        case "left":
            f = {
                x: r.x - o.width,
                y: d
            };
            break;
        default:
            f = {
                x: r.x,
                y: r.y
            }
    }
    switch (So(t)) {
        case "start":
            f[s] -= h * (n && u ? -1 : 1);
            break;
        case "end":
            f[s] += h * (n && u ? -1 : 1);
            break
    }
    return f
}
const lx = async (e, t, n) => {
    const {
        placement: r = "bottom",
        strategy: o = "absolute",
        middleware: i = [],
        platform: s
    } = n, l = i.filter(Boolean), a = await (s.isRTL == null ? void 0 : s.isRTL(t));
    let u = await s.getElementRects({
            reference: e,
            floating: t,
            strategy: o
        }),
        {
            x: c,
            y: d
        } = vf(u, r, a),
        h = r,
        f = {},
        v = 0;
    for (let g = 0; g < l.length; g++) {
        const {
            name: w,
            fn: p
        } = l[g], {
            x: m,
            y,
            data: E,
            reset: C
        } = await p({
            x: c,
            y: d,
            initialPlacement: r,
            placement: h,
            strategy: o,
            middlewareData: f,
            rects: u,
            platform: s,
            elements: {
                reference: e,
                floating: t
            }
        });
        c = m ?? c, d = y ?? d, f = {
            ...f,
            [w]: {
                ...f[w],
                ...E
            }
        }, C && v <= 50 && (v++, typeof C == "object" && (C.placement && (h = C.placement), C.rects && (u = C.rects === !0 ? await s.getElementRects({
            reference: e,
            floating: t,
            strategy: o
        }) : C.rects), {
            x: c,
            y: d
        } = vf(u, h, a)), g = -1)
    }
    return {
        x: c,
        y: d,
        placement: h,
        strategy: o,
        middlewareData: f
    }
};
async function mi(e, t) {
    var n;
    t === void 0 && (t = {});
    const {
        x: r,
        y: o,
        platform: i,
        rects: s,
        elements: l,
        strategy: a
    } = e, {
        boundary: u = "clippingAncestors",
        rootBoundary: c = "viewport",
        elementContext: d = "floating",
        altBoundary: h = !1,
        padding: f = 0
    } = gn(t, e), v = ng(f), w = l[h ? d === "floating" ? "reference" : "floating" : d], p = Ys(await i.getClippingRect({
        element: (n = await (i.isElement == null ? void 0 : i.isElement(w))) == null || n ? w : w.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(l.floating)),
        boundary: u,
        rootBoundary: c,
        strategy: a
    })), m = d === "floating" ? {
        x: r,
        y: o,
        width: s.floating.width,
        height: s.floating.height
    } : s.reference, y = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l.floating)), E = await (i.isElement == null ? void 0 : i.isElement(y)) ? await (i.getScale == null ? void 0 : i.getScale(y)) || {
        x: 1,
        y: 1
    } : {
        x: 1,
        y: 1
    }, C = Ys(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
        elements: l,
        rect: m,
        offsetParent: y,
        strategy: a
    }) : m);
    return {
        top: (p.top - C.top + v.top) / E.y,
        bottom: (C.bottom - p.bottom + v.bottom) / E.y,
        left: (p.left - C.left + v.left) / E.x,
        right: (C.right - p.right + v.right) / E.x
    }
}
const ax = e => ({
        name: "arrow",
        options: e,
        async fn(t) {
            const {
                x: n,
                y: r,
                placement: o,
                rects: i,
                platform: s,
                elements: l,
                middlewareData: a
            } = t, {
                element: u,
                padding: c = 0
            } = gn(e, t) || {};
            if (u == null) return {};
            const d = ng(c),
                h = {
                    x: n,
                    y: r
                },
                f = Oc(o),
                v = Rc(f),
                g = await s.getDimensions(u),
                w = f === "y",
                p = w ? "top" : "left",
                m = w ? "bottom" : "right",
                y = w ? "clientHeight" : "clientWidth",
                E = i.reference[v] + i.reference[f] - h[f] - i.floating[v],
                C = h[f] - i.reference[f],
                k = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
            let b = k ? k[y] : 0;
            (!b || !await (s.isElement == null ? void 0 : s.isElement(k))) && (b = l.floating[y] || i.floating[v]);
            const T = E / 2 - C / 2,
                j = b / 2 - g[v] / 2 - 1,
                L = Zn(d[p], j),
                D = Zn(d[m], j),
                I = L,
                W = b - g[v] - D,
                O = b / 2 - g[v] / 2 + T,
                V = mu(I, O, W),
                U = !a.arrow && So(o) != null && O !== V && i.reference[v] / 2 - (O < I ? L : D) - g[v] / 2 < 0,
                H = U ? O < I ? O - I : O - W : 0;
            return {
                [f]: h[f] + H,
                data: {
                    [f]: V,
                    centerOffset: O - V - H,
                    ...U && {
                        alignmentOffset: H
                    }
                },
                reset: U
            }
        }
    }),
    ux = function(e) {
        return e === void 0 && (e = {}), {
            name: "flip",
            options: e,
            async fn(t) {
                var n, r;
                const {
                    placement: o,
                    middlewareData: i,
                    rects: s,
                    initialPlacement: l,
                    platform: a,
                    elements: u
                } = t, {
                    mainAxis: c = !0,
                    crossAxis: d = !0,
                    fallbackPlacements: h,
                    fallbackStrategy: f = "bestFit",
                    fallbackAxisSideDirection: v = "none",
                    flipAlignment: g = !0,
                    ...w
                } = gn(e, t);
                if ((n = i.arrow) != null && n.alignmentOffset) return {};
                const p = vn(o),
                    m = qt(l),
                    y = vn(l) === l,
                    E = await (a.isRTL == null ? void 0 : a.isRTL(u.floating)),
                    C = h || (y || !g ? [Gs(l)] : tx(l)),
                    k = v !== "none";
                !h && k && C.push(...ix(l, g, v, E));
                const b = [l, ...C],
                    T = await mi(t, w),
                    j = [];
                let L = ((r = i.flip) == null ? void 0 : r.overflows) || [];
                if (c && j.push(T[p]), d) {
                    const O = ex(o, s, E);
                    j.push(T[O[0]], T[O[1]])
                }
                if (L = [...L, {
                        placement: o,
                        overflows: j
                    }], !j.every(O => O <= 0)) {
                    var D, I;
                    const O = (((D = i.flip) == null ? void 0 : D.index) || 0) + 1,
                        V = b[O];
                    if (V && (!(d === "alignment" ? m !== qt(V) : !1) || L.every(N => N.overflows[0] > 0 && qt(N.placement) === m))) return {
                        data: {
                            index: O,
                            overflows: L
                        },
                        reset: {
                            placement: V
                        }
                    };
                    let U = (I = L.filter(H => H.overflows[0] <= 0).sort((H, N) => H.overflows[1] - N.overflows[1])[0]) == null ? void 0 : I.placement;
                    if (!U) switch (f) {
                        case "bestFit": {
                            var W;
                            const H = (W = L.filter(N => {
                                if (k) {
                                    const P = qt(N.placement);
                                    return P === m || P === "y"
                                }
                                return !0
                            }).map(N => [N.placement, N.overflows.filter(P => P > 0).reduce((P, M) => P + M, 0)]).sort((N, P) => N[1] - P[1])[0]) == null ? void 0 : W[0];
                            H && (U = H);
                            break
                        }
                        case "initialPlacement":
                            U = l;
                            break
                    }
                    if (o !== U) return {
                        reset: {
                            placement: U
                        }
                    }
                }
                return {}
            }
        }
    };

function yf(e, t) {
    return {
        top: e.top - t.height,
        right: e.right - t.width,
        bottom: e.bottom - t.height,
        left: e.left - t.width
    }
}

function wf(e) {
    return q1.some(t => e[t] >= 0)
}
const cx = function(e) {
        return e === void 0 && (e = {}), {
            name: "hide",
            options: e,
            async fn(t) {
                const {
                    rects: n
                } = t, {
                    strategy: r = "referenceHidden",
                    ...o
                } = gn(e, t);
                switch (r) {
                    case "referenceHidden": {
                        const i = await mi(t, {
                                ...o,
                                elementContext: "reference"
                            }),
                            s = yf(i, n.reference);
                        return {
                            data: {
                                referenceHiddenOffsets: s,
                                referenceHidden: wf(s)
                            }
                        }
                    }
                    case "escaped": {
                        const i = await mi(t, {
                                ...o,
                                altBoundary: !0
                            }),
                            s = yf(i, n.floating);
                        return {
                            data: {
                                escapedOffsets: s,
                                escaped: wf(s)
                            }
                        }
                    }
                    default:
                        return {}
                }
            }
        }
    },
    rg = new Set(["left", "top"]);
async function dx(e, t) {
    const {
        placement: n,
        platform: r,
        elements: o
    } = e, i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = vn(n), l = So(n), a = qt(n) === "y", u = rg.has(s) ? -1 : 1, c = i && a ? -1 : 1, d = gn(t, e);
    let {
        mainAxis: h,
        crossAxis: f,
        alignmentAxis: v
    } = typeof d == "number" ? {
        mainAxis: d,
        crossAxis: 0,
        alignmentAxis: null
    } : {
        mainAxis: d.mainAxis || 0,
        crossAxis: d.crossAxis || 0,
        alignmentAxis: d.alignmentAxis
    };
    return l && typeof v == "number" && (f = l === "end" ? v * -1 : v), a ? {
        x: f * c,
        y: h * u
    } : {
        x: h * u,
        y: f * c
    }
}
const fx = function(e) {
        return e === void 0 && (e = 0), {
            name: "offset",
            options: e,
            async fn(t) {
                var n, r;
                const {
                    x: o,
                    y: i,
                    placement: s,
                    middlewareData: l
                } = t, a = await dx(t, e);
                return s === ((n = l.offset) == null ? void 0 : n.placement) && (r = l.arrow) != null && r.alignmentOffset ? {} : {
                    x: o + a.x,
                    y: i + a.y,
                    data: {
                        ...a,
                        placement: s
                    }
                }
            }
        }
    },
    px = function(e) {
        return e === void 0 && (e = {}), {
            name: "shift",
            options: e,
            async fn(t) {
                const {
                    x: n,
                    y: r,
                    placement: o
                } = t, {
                    mainAxis: i = !0,
                    crossAxis: s = !1,
                    limiter: l = {
                        fn: w => {
                            let {
                                x: p,
                                y: m
                            } = w;
                            return {
                                x: p,
                                y: m
                            }
                        }
                    },
                    ...a
                } = gn(e, t), u = {
                    x: n,
                    y: r
                }, c = await mi(t, a), d = qt(vn(o)), h = Nc(d);
                let f = u[h],
                    v = u[d];
                if (i) {
                    const w = h === "y" ? "top" : "left",
                        p = h === "y" ? "bottom" : "right",
                        m = f + c[w],
                        y = f - c[p];
                    f = mu(m, f, y)
                }
                if (s) {
                    const w = d === "y" ? "top" : "left",
                        p = d === "y" ? "bottom" : "right",
                        m = v + c[w],
                        y = v - c[p];
                    v = mu(m, v, y)
                }
                const g = l.fn({
                    ...t,
                    [h]: f,
                    [d]: v
                });
                return {
                    ...g,
                    data: {
                        x: g.x - n,
                        y: g.y - r,
                        enabled: {
                            [h]: i,
                            [d]: s
                        }
                    }
                }
            }
        }
    },
    hx = function(e) {
        return e === void 0 && (e = {}), {
            options: e,
            fn(t) {
                const {
                    x: n,
                    y: r,
                    placement: o,
                    rects: i,
                    middlewareData: s
                } = t, {
                    offset: l = 0,
                    mainAxis: a = !0,
                    crossAxis: u = !0
                } = gn(e, t), c = {
                    x: n,
                    y: r
                }, d = qt(o), h = Nc(d);
                let f = c[h],
                    v = c[d];
                const g = gn(l, t),
                    w = typeof g == "number" ? {
                        mainAxis: g,
                        crossAxis: 0
                    } : {
                        mainAxis: 0,
                        crossAxis: 0,
                        ...g
                    };
                if (a) {
                    const y = h === "y" ? "height" : "width",
                        E = i.reference[h] - i.floating[y] + w.mainAxis,
                        C = i.reference[h] + i.reference[y] - w.mainAxis;
                    f < E ? f = E : f > C && (f = C)
                }
                if (u) {
                    var p, m;
                    const y = h === "y" ? "width" : "height",
                        E = rg.has(vn(o)),
                        C = i.reference[d] - i.floating[y] + (E && ((p = s.offset) == null ? void 0 : p[d]) || 0) + (E ? 0 : w.crossAxis),
                        k = i.reference[d] + i.reference[y] + (E ? 0 : ((m = s.offset) == null ? void 0 : m[d]) || 0) - (E ? w.crossAxis : 0);
                    v < C ? v = C : v > k && (v = k)
                }
                return {
                    [h]: f,
                    [d]: v
                }
            }
        }
    },
    mx = function(e) {
        return e === void 0 && (e = {}), {
            name: "size",
            options: e,
            async fn(t) {
                var n, r;
                const {
                    placement: o,
                    rects: i,
                    platform: s,
                    elements: l
                } = t, {
                    apply: a = () => {},
                    ...u
                } = gn(e, t), c = await mi(t, u), d = vn(o), h = So(o), f = qt(o) === "y", {
                    width: v,
                    height: g
                } = i.floating;
                let w, p;
                d === "top" || d === "bottom" ? (w = d, p = h === (await (s.isRTL == null ? void 0 : s.isRTL(l.floating)) ? "start" : "end") ? "left" : "right") : (p = d, w = h === "end" ? "top" : "bottom");
                const m = g - c.top - c.bottom,
                    y = v - c.left - c.right,
                    E = Zn(g - c[w], m),
                    C = Zn(v - c[p], y),
                    k = !t.middlewareData.shift;
                let b = E,
                    T = C;
                if ((n = t.middlewareData.shift) != null && n.enabled.x && (T = y), (r = t.middlewareData.shift) != null && r.enabled.y && (b = m), k && !h) {
                    const L = st(c.left, 0),
                        D = st(c.right, 0),
                        I = st(c.top, 0),
                        W = st(c.bottom, 0);
                    f ? T = v - 2 * (L !== 0 || D !== 0 ? L + D : st(c.left, c.right)) : b = g - 2 * (I !== 0 || W !== 0 ? I + W : st(c.top, c.bottom))
                }
                await a({
                    ...t,
                    availableWidth: T,
                    availableHeight: b
                });
                const j = await s.getDimensions(l.floating);
                return v !== j.width || g !== j.height ? {
                    reset: {
                        rects: !0
                    }
                } : {}
            }
        }
    };

function xl() {
    return typeof window < "u"
}

function Eo(e) {
    return og(e) ? (e.nodeName || "").toLowerCase() : "#document"
}

function ut(e) {
    var t;
    return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}

function tn(e) {
    var t;
    return (t = (og(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement
}

function og(e) {
    return xl() ? e instanceof Node || e instanceof ut(e).Node : !1
}

function Bt(e) {
    return xl() ? e instanceof Element || e instanceof ut(e).Element : !1
}

function en(e) {
    return xl() ? e instanceof HTMLElement || e instanceof ut(e).HTMLElement : !1
}

function xf(e) {
    return !xl() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ut(e).ShadowRoot
}
const gx = new Set(["inline", "contents"]);

function ji(e) {
    const {
        overflow: t,
        overflowX: n,
        overflowY: r,
        display: o
    } = Ut(e);
    return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !gx.has(o)
}
const vx = new Set(["table", "td", "th"]);

function yx(e) {
    return vx.has(Eo(e))
}
const wx = [":popover-open", ":modal"];

function Sl(e) {
    return wx.some(t => {
        try {
            return e.matches(t)
        } catch {
            return !1
        }
    })
}
const xx = ["transform", "translate", "scale", "rotate", "perspective"],
    Sx = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
    Ex = ["paint", "layout", "strict", "content"];

function jc(e) {
    const t = Lc(),
        n = Bt(e) ? Ut(e) : e;
    return xx.some(r => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Sx.some(r => (n.willChange || "").includes(r)) || Ex.some(r => (n.contain || "").includes(r))
}

function Cx(e) {
    let t = Jn(e);
    for (; en(t) && !mo(t);) {
        if (jc(t)) return t;
        if (Sl(t)) return null;
        t = Jn(t)
    }
    return null
}

function Lc() {
    return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none")
}
const bx = new Set(["html", "body", "#document"]);

function mo(e) {
    return bx.has(Eo(e))
}

function Ut(e) {
    return ut(e).getComputedStyle(e)
}

function El(e) {
    return Bt(e) ? {
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop
    } : {
        scrollLeft: e.scrollX,
        scrollTop: e.scrollY
    }
}

function Jn(e) {
    if (Eo(e) === "html") return e;
    const t = e.assignedSlot || e.parentNode || xf(e) && e.host || tn(e);
    return xf(t) ? t.host : t
}

function ig(e) {
    const t = Jn(e);
    return mo(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : en(t) && ji(t) ? t : ig(t)
}

function gi(e, t, n) {
    var r;
    t === void 0 && (t = []), n === void 0 && (n = !0);
    const o = ig(e),
        i = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
        s = ut(o);
    if (i) {
        const l = vu(s);
        return t.concat(s, s.visualViewport || [], ji(o) ? o : [], l && n ? gi(l) : [])
    }
    return t.concat(o, gi(o, [], n))
}

function vu(e) {
    return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
}

function sg(e) {
    const t = Ut(e);
    let n = parseFloat(t.width) || 0,
        r = parseFloat(t.height) || 0;
    const o = en(e),
        i = o ? e.offsetWidth : n,
        s = o ? e.offsetHeight : r,
        l = Ks(n) !== i || Ks(r) !== s;
    return l && (n = i, r = s), {
        width: n,
        height: r,
        $: l
    }
}

function Ac(e) {
    return Bt(e) ? e : e.contextElement
}

function Xr(e) {
    const t = Ac(e);
    if (!en(t)) return Jt(1);
    const n = t.getBoundingClientRect(),
        {
            width: r,
            height: o,
            $: i
        } = sg(t);
    let s = (i ? Ks(n.width) : n.width) / r,
        l = (i ? Ks(n.height) : n.height) / o;
    return (!s || !Number.isFinite(s)) && (s = 1), (!l || !Number.isFinite(l)) && (l = 1), {
        x: s,
        y: l
    }
}
const kx = Jt(0);

function lg(e) {
    const t = ut(e);
    return !Lc() || !t.visualViewport ? kx : {
        x: t.visualViewport.offsetLeft,
        y: t.visualViewport.offsetTop
    }
}

function Px(e, t, n) {
    return t === void 0 && (t = !1), !n || t && n !== ut(e) ? !1 : t
}

function br(e, t, n, r) {
    t === void 0 && (t = !1), n === void 0 && (n = !1);
    const o = e.getBoundingClientRect(),
        i = Ac(e);
    let s = Jt(1);
    t && (r ? Bt(r) && (s = Xr(r)) : s = Xr(e));
    const l = Px(i, n, r) ? lg(i) : Jt(0);
    let a = (o.left + l.x) / s.x,
        u = (o.top + l.y) / s.y,
        c = o.width / s.x,
        d = o.height / s.y;
    if (i) {
        const h = ut(i),
            f = r && Bt(r) ? ut(r) : r;
        let v = h,
            g = vu(v);
        for (; g && r && f !== v;) {
            const w = Xr(g),
                p = g.getBoundingClientRect(),
                m = Ut(g),
                y = p.left + (g.clientLeft + parseFloat(m.paddingLeft)) * w.x,
                E = p.top + (g.clientTop + parseFloat(m.paddingTop)) * w.y;
            a *= w.x, u *= w.y, c *= w.x, d *= w.y, a += y, u += E, v = ut(g), g = vu(v)
        }
    }
    return Ys({
        width: c,
        height: d,
        x: a,
        y: u
    })
}

function Mc(e, t) {
    const n = El(e).scrollLeft;
    return t ? t.left + n : br(tn(e)).left + n
}

function ag(e, t, n) {
    n === void 0 && (n = !1);
    const r = e.getBoundingClientRect(),
        o = r.left + t.scrollLeft - (n ? 0 : Mc(e, r)),
        i = r.top + t.scrollTop;
    return {
        x: o,
        y: i
    }
}

function Tx(e) {
    let {
        elements: t,
        rect: n,
        offsetParent: r,
        strategy: o
    } = e;
    const i = o === "fixed",
        s = tn(r),
        l = t ? Sl(t.floating) : !1;
    if (r === s || l && i) return n;
    let a = {
            scrollLeft: 0,
            scrollTop: 0
        },
        u = Jt(1);
    const c = Jt(0),
        d = en(r);
    if ((d || !d && !i) && ((Eo(r) !== "body" || ji(s)) && (a = El(r)), en(r))) {
        const f = br(r);
        u = Xr(r), c.x = f.x + r.clientLeft, c.y = f.y + r.clientTop
    }
    const h = s && !d && !i ? ag(s, a, !0) : Jt(0);
    return {
        width: n.width * u.x,
        height: n.height * u.y,
        x: n.x * u.x - a.scrollLeft * u.x + c.x + h.x,
        y: n.y * u.y - a.scrollTop * u.y + c.y + h.y
    }
}

function Nx(e) {
    return Array.from(e.getClientRects())
}

function Rx(e) {
    const t = tn(e),
        n = El(e),
        r = e.ownerDocument.body,
        o = st(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
        i = st(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
    let s = -n.scrollLeft + Mc(e);
    const l = -n.scrollTop;
    return Ut(r).direction === "rtl" && (s += st(t.clientWidth, r.clientWidth) - o), {
        width: o,
        height: i,
        x: s,
        y: l
    }
}

function Ox(e, t) {
    const n = ut(e),
        r = tn(e),
        o = n.visualViewport;
    let i = r.clientWidth,
        s = r.clientHeight,
        l = 0,
        a = 0;
    if (o) {
        i = o.width, s = o.height;
        const u = Lc();
        (!u || u && t === "fixed") && (l = o.offsetLeft, a = o.offsetTop)
    }
    return {
        width: i,
        height: s,
        x: l,
        y: a
    }
}
const jx = new Set(["absolute", "fixed"]);

function Lx(e, t) {
    const n = br(e, !0, t === "fixed"),
        r = n.top + e.clientTop,
        o = n.left + e.clientLeft,
        i = en(e) ? Xr(e) : Jt(1),
        s = e.clientWidth * i.x,
        l = e.clientHeight * i.y,
        a = o * i.x,
        u = r * i.y;
    return {
        width: s,
        height: l,
        x: a,
        y: u
    }
}

function Sf(e, t, n) {
    let r;
    if (t === "viewport") r = Ox(e, n);
    else if (t === "document") r = Rx(tn(e));
    else if (Bt(t)) r = Lx(t, n);
    else {
        const o = lg(e);
        r = {
            x: t.x - o.x,
            y: t.y - o.y,
            width: t.width,
            height: t.height
        }
    }
    return Ys(r)
}

function ug(e, t) {
    const n = Jn(e);
    return n === t || !Bt(n) || mo(n) ? !1 : Ut(n).position === "fixed" || ug(n, t)
}

function Ax(e, t) {
    const n = t.get(e);
    if (n) return n;
    let r = gi(e, [], !1).filter(l => Bt(l) && Eo(l) !== "body"),
        o = null;
    const i = Ut(e).position === "fixed";
    let s = i ? Jn(e) : e;
    for (; Bt(s) && !mo(s);) {
        const l = Ut(s),
            a = jc(s);
        !a && l.position === "fixed" && (o = null), (i ? !a && !o : !a && l.position === "static" && !!o && jx.has(o.position) || ji(s) && !a && ug(e, s)) ? r = r.filter(c => c !== s) : o = l, s = Jn(s)
    }
    return t.set(e, r), r
}

function Mx(e) {
    let {
        element: t,
        boundary: n,
        rootBoundary: r,
        strategy: o
    } = e;
    const s = [...n === "clippingAncestors" ? Sl(t) ? [] : Ax(t, this._c) : [].concat(n), r],
        l = s[0],
        a = s.reduce((u, c) => {
            const d = Sf(t, c, o);
            return u.top = st(d.top, u.top), u.right = Zn(d.right, u.right), u.bottom = Zn(d.bottom, u.bottom), u.left = st(d.left, u.left), u
        }, Sf(t, l, o));
    return {
        width: a.right - a.left,
        height: a.bottom - a.top,
        x: a.left,
        y: a.top
    }
}

function _x(e) {
    const {
        width: t,
        height: n
    } = sg(e);
    return {
        width: t,
        height: n
    }
}

function Ix(e, t, n) {
    const r = en(t),
        o = tn(t),
        i = n === "fixed",
        s = br(e, !0, i, t);
    let l = {
        scrollLeft: 0,
        scrollTop: 0
    };
    const a = Jt(0);

    function u() {
        a.x = Mc(o)
    }
    if (r || !r && !i)
        if ((Eo(t) !== "body" || ji(o)) && (l = El(t)), r) {
            const f = br(t, !0, i, t);
            a.x = f.x + t.clientLeft, a.y = f.y + t.clientTop
        } else o && u();
    i && !r && o && u();
    const c = o && !r && !i ? ag(o, l) : Jt(0),
        d = s.left + l.scrollLeft - a.x - c.x,
        h = s.top + l.scrollTop - a.y - c.y;
    return {
        x: d,
        y: h,
        width: s.width,
        height: s.height
    }
}

function fa(e) {
    return Ut(e).position === "static"
}

function Ef(e, t) {
    if (!en(e) || Ut(e).position === "fixed") return null;
    if (t) return t(e);
    let n = e.offsetParent;
    return tn(e) === n && (n = n.ownerDocument.body), n
}

function cg(e, t) {
    const n = ut(e);
    if (Sl(e)) return n;
    if (!en(e)) {
        let o = Jn(e);
        for (; o && !mo(o);) {
            if (Bt(o) && !fa(o)) return o;
            o = Jn(o)
        }
        return n
    }
    let r = Ef(e, t);
    for (; r && yx(r) && fa(r);) r = Ef(r, t);
    return r && mo(r) && fa(r) && !jc(r) ? n : r || Cx(e) || n
}
const Dx = async function(e) {
    const t = this.getOffsetParent || cg,
        n = this.getDimensions,
        r = await n(e.floating);
    return {
        reference: Ix(e.reference, await t(e.floating), e.strategy),
        floating: {
            x: 0,
            y: 0,
            width: r.width,
            height: r.height
        }
    }
};

function Fx(e) {
    return Ut(e).direction === "rtl"
}
const zx = {
    convertOffsetParentRelativeRectToViewportRelativeRect: Tx,
    getDocumentElement: tn,
    getClippingRect: Mx,
    getOffsetParent: cg,
    getElementRects: Dx,
    getClientRects: Nx,
    getDimensions: _x,
    getScale: Xr,
    isElement: Bt,
    isRTL: Fx
};

function dg(e, t) {
    return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
}

function $x(e, t) {
    let n = null,
        r;
    const o = tn(e);

    function i() {
        var l;
        clearTimeout(r), (l = n) == null || l.disconnect(), n = null
    }

    function s(l, a) {
        l === void 0 && (l = !1), a === void 0 && (a = 1), i();
        const u = e.getBoundingClientRect(),
            {
                left: c,
                top: d,
                width: h,
                height: f
            } = u;
        if (l || t(), !h || !f) return;
        const v = is(d),
            g = is(o.clientWidth - (c + h)),
            w = is(o.clientHeight - (d + f)),
            p = is(c),
            y = {
                rootMargin: -v + "px " + -g + "px " + -w + "px " + -p + "px",
                threshold: st(0, Zn(1, a)) || 1
            };
        let E = !0;

        function C(k) {
            const b = k[0].intersectionRatio;
            if (b !== a) {
                if (!E) return s();
                b ? s(!1, b) : r = setTimeout(() => {
                    s(!1, 1e-7)
                }, 1e3)
            }
            b === 1 && !dg(u, e.getBoundingClientRect()) && s(), E = !1
        }
        try {
            n = new IntersectionObserver(C, {
                ...y,
                root: o.ownerDocument
            })
        } catch {
            n = new IntersectionObserver(C, y)
        }
        n.observe(e)
    }
    return s(!0), i
}

function Bx(e, t, n, r) {
    r === void 0 && (r = {});
    const {
        ancestorScroll: o = !0,
        ancestorResize: i = !0,
        elementResize: s = typeof ResizeObserver == "function",
        layoutShift: l = typeof IntersectionObserver == "function",
        animationFrame: a = !1
    } = r, u = Ac(e), c = o || i ? [...u ? gi(u) : [], ...gi(t)] : [];
    c.forEach(p => {
        o && p.addEventListener("scroll", n, {
            passive: !0
        }), i && p.addEventListener("resize", n)
    });
    const d = u && l ? $x(u, n) : null;
    let h = -1,
        f = null;
    s && (f = new ResizeObserver(p => {
        let [m] = p;
        m && m.target === u && f && (f.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
            var y;
            (y = f) == null || y.observe(t)
        })), n()
    }), u && !a && f.observe(u), f.observe(t));
    let v, g = a ? br(e) : null;
    a && w();

    function w() {
        const p = br(e);
        g && !dg(g, p) && n(), g = p, v = requestAnimationFrame(w)
    }
    return n(), () => {
        var p;
        c.forEach(m => {
            o && m.removeEventListener("scroll", n), i && m.removeEventListener("resize", n)
        }), d == null || d(), (p = f) == null || p.disconnect(), f = null, a && cancelAnimationFrame(v)
    }
}
const Ux = fx,
    Vx = px,
    Hx = ux,
    Wx = mx,
    Qx = cx,
    Cf = ax,
    Kx = hx,
    Gx = (e, t, n) => {
        const r = new Map,
            o = {
                platform: zx,
                ...n
            },
            i = {
                ...o.platform,
                _c: r
            };
        return lx(e, t, {
            ...o,
            platform: i
        })
    };
var Yx = typeof document < "u",
    qx = function() {},
    Es = Yx ? x.useLayoutEffect : qx;

function qs(e, t) {
    if (e === t) return !0;
    if (typeof e != typeof t) return !1;
    if (typeof e == "function" && e.toString() === t.toString()) return !0;
    let n, r, o;
    if (e && t && typeof e == "object") {
        if (Array.isArray(e)) {
            if (n = e.length, n !== t.length) return !1;
            for (r = n; r-- !== 0;)
                if (!qs(e[r], t[r])) return !1;
            return !0
        }
        if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length) return !1;
        for (r = n; r-- !== 0;)
            if (!{}.hasOwnProperty.call(t, o[r])) return !1;
        for (r = n; r-- !== 0;) {
            const i = o[r];
            if (!(i === "_owner" && e.$$typeof) && !qs(e[i], t[i])) return !1
        }
        return !0
    }
    return e !== e && t !== t
}

function fg(e) {
    return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1
}

function bf(e, t) {
    const n = fg(e);
    return Math.round(t * n) / n
}

function pa(e) {
    const t = x.useRef(e);
    return Es(() => {
        t.current = e
    }), t
}

function Xx(e) {
    e === void 0 && (e = {});
    const {
        placement: t = "bottom",
        strategy: n = "absolute",
        middleware: r = [],
        platform: o,
        elements: {
            reference: i,
            floating: s
        } = {},
        transform: l = !0,
        whileElementsMounted: a,
        open: u
    } = e, [c, d] = x.useState({
        x: 0,
        y: 0,
        strategy: n,
        placement: t,
        middlewareData: {},
        isPositioned: !1
    }), [h, f] = x.useState(r);
    qs(h, r) || f(r);
    const [v, g] = x.useState(null), [w, p] = x.useState(null), m = x.useCallback(N => {
        N !== k.current && (k.current = N, g(N))
    }, []), y = x.useCallback(N => {
        N !== b.current && (b.current = N, p(N))
    }, []), E = i || v, C = s || w, k = x.useRef(null), b = x.useRef(null), T = x.useRef(c), j = a != null, L = pa(a), D = pa(o), I = pa(u), W = x.useCallback(() => {
        if (!k.current || !b.current) return;
        const N = {
            placement: t,
            strategy: n,
            middleware: h
        };
        D.current && (N.platform = D.current), Gx(k.current, b.current, N).then(P => {
            const M = {
                ...P,
                isPositioned: I.current !== !1
            };
            O.current && !qs(T.current, M) && (T.current = M, Ri.flushSync(() => {
                d(M)
            }))
        })
    }, [h, t, n, D, I]);
    Es(() => {
        u === !1 && T.current.isPositioned && (T.current.isPositioned = !1, d(N => ({
            ...N,
            isPositioned: !1
        })))
    }, [u]);
    const O = x.useRef(!1);
    Es(() => (O.current = !0, () => {
        O.current = !1
    }), []), Es(() => {
        if (E && (k.current = E), C && (b.current = C), E && C) {
            if (L.current) return L.current(E, C, W);
            W()
        }
    }, [E, C, W, L, j]);
    const V = x.useMemo(() => ({
            reference: k,
            floating: b,
            setReference: m,
            setFloating: y
        }), [m, y]),
        U = x.useMemo(() => ({
            reference: E,
            floating: C
        }), [E, C]),
        H = x.useMemo(() => {
            const N = {
                position: n,
                left: 0,
                top: 0
            };
            if (!U.floating) return N;
            const P = bf(U.floating, c.x),
                M = bf(U.floating, c.y);
            return l ? {
                ...N,
                transform: "translate(" + P + "px, " + M + "px)",
                ...fg(U.floating) >= 1.5 && {
                    willChange: "transform"
                }
            } : {
                position: n,
                left: P,
                top: M
            }
        }, [n, l, U.floating, c.x, c.y]);
    return x.useMemo(() => ({
        ...c,
        update: W,
        refs: V,
        elements: U,
        floatingStyles: H
    }), [c, W, V, U, H])
}
const Zx = e => {
        function t(n) {
            return {}.hasOwnProperty.call(n, "current")
        }
        return {
            name: "arrow",
            options: e,
            fn(n) {
                const {
                    element: r,
                    padding: o
                } = typeof e == "function" ? e(n) : e;
                return r && t(r) ? r.current != null ? Cf({
                    element: r.current,
                    padding: o
                }).fn(n) : {} : r ? Cf({
                    element: r,
                    padding: o
                }).fn(n) : {}
            }
        }
    },
    Jx = (e, t) => ({
        ...Ux(e),
        options: [e, t]
    }),
    eS = (e, t) => ({
        ...Vx(e),
        options: [e, t]
    }),
    tS = (e, t) => ({
        ...Kx(e),
        options: [e, t]
    }),
    nS = (e, t) => ({
        ...Hx(e),
        options: [e, t]
    }),
    rS = (e, t) => ({
        ...Wx(e),
        options: [e, t]
    }),
    oS = (e, t) => ({
        ...Qx(e),
        options: [e, t]
    }),
    iS = (e, t) => ({
        ...Zx(e),
        options: [e, t]
    });
var sS = "Arrow",
    pg = x.forwardRef((e, t) => {
        const {
            children: n,
            width: r = 10,
            height: o = 5,
            ...i
        } = e;
        return S.jsx(nt.svg, {
            ...i,
            ref: t,
            width: r,
            height: o,
            viewBox: "0 0 30 10",
            preserveAspectRatio: "none",
            children: e.asChild ? n : S.jsx("polygon", {
                points: "0,0 30,0 15,10"
            })
        })
    });
pg.displayName = sS;
var lS = pg;

function aS(e) {
    const [t, n] = x.useState(void 0);
    return Xn(() => {
        if (e) {
            n({
                width: e.offsetWidth,
                height: e.offsetHeight
            });
            const r = new ResizeObserver(o => {
                if (!Array.isArray(o) || !o.length) return;
                const i = o[0];
                let s, l;
                if ("borderBoxSize" in i) {
                    const a = i.borderBoxSize,
                        u = Array.isArray(a) ? a[0] : a;
                    s = u.inlineSize, l = u.blockSize
                } else s = e.offsetWidth, l = e.offsetHeight;
                n({
                    width: s,
                    height: l
                })
            });
            return r.observe(e, {
                box: "border-box"
            }), () => r.unobserve(e)
        } else n(void 0)
    }, [e]), t
}
var hg = "Popper",
    [mg, gg] = vl(hg),
    [WC, vg] = mg(hg),
    yg = "PopperAnchor",
    wg = x.forwardRef((e, t) => {
        const {
            __scopePopper: n,
            virtualRef: r,
            ...o
        } = e, i = vg(yg, n), s = x.useRef(null), l = $t(t, s);
        return x.useEffect(() => {
            i.onAnchorChange((r == null ? void 0 : r.current) || s.current)
        }), r ? null : S.jsx(nt.div, {
            ...o,
            ref: l
        })
    });
wg.displayName = yg;
var _c = "PopperContent",
    [uS, cS] = mg(_c),
    xg = x.forwardRef((e, t) => {
        var Y, ye, Ne, Ee, te, B;
        const {
            __scopePopper: n,
            side: r = "bottom",
            sideOffset: o = 0,
            align: i = "center",
            alignOffset: s = 0,
            arrowPadding: l = 0,
            avoidCollisions: a = !0,
            collisionBoundary: u = [],
            collisionPadding: c = 0,
            sticky: d = "partial",
            hideWhenDetached: h = !1,
            updatePositionStrategy: f = "optimized",
            onPlaced: v,
            ...g
        } = e, w = vg(_c, n), [p, m] = x.useState(null), y = $t(t, J => m(J)), [E, C] = x.useState(null), k = aS(E), b = (k == null ? void 0 : k.width) ?? 0, T = (k == null ? void 0 : k.height) ?? 0, j = r + (i !== "center" ? "-" + i : ""), L = typeof c == "number" ? c : {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            ...c
        }, D = Array.isArray(u) ? u : [u], I = D.length > 0, W = {
            padding: L,
            boundary: D.filter(fS),
            altBoundary: I
        }, {
            refs: O,
            floatingStyles: V,
            placement: U,
            isPositioned: H,
            middlewareData: N
        } = Xx({
            strategy: "fixed",
            placement: j,
            whileElementsMounted: (...J) => Bx(...J, {
                animationFrame: f === "always"
            }),
            elements: {
                reference: w.anchor
            },
            middleware: [Jx({
                mainAxis: o + T,
                alignmentAxis: s
            }), a && eS({
                mainAxis: !0,
                crossAxis: !1,
                limiter: d === "partial" ? tS() : void 0,
                ...W
            }), a && nS({
                ...W
            }), rS({
                ...W,
                apply: ({
                    elements: J,
                    rects: ae,
                    availableWidth: be,
                    availableHeight: $e
                }) => {
                    const {
                        width: rt,
                        height: ot
                    } = ae.reference, Be = J.floating.style;
                    Be.setProperty("--radix-popper-available-width", `${be}px`), Be.setProperty("--radix-popper-available-height", `${$e}px`), Be.setProperty("--radix-popper-anchor-width", `${rt}px`), Be.setProperty("--radix-popper-anchor-height", `${ot}px`)
                }
            }), E && iS({
                element: E,
                padding: l
            }), pS({
                arrowWidth: b,
                arrowHeight: T
            }), h && oS({
                strategy: "referenceHidden",
                ...W
            })]
        }), [P, M] = Cg(U), z = qn(v);
        Xn(() => {
            H && (z == null || z())
        }, [H, z]);
        const F = (Y = N.arrow) == null ? void 0 : Y.x,
            Q = (ye = N.arrow) == null ? void 0 : ye.y,
            K = ((Ne = N.arrow) == null ? void 0 : Ne.centerOffset) !== 0,
            [ie, ve] = x.useState();
        return Xn(() => {
            p && ve(window.getComputedStyle(p).zIndex)
        }, [p]), S.jsx("div", {
            ref: O.setFloating,
            "data-radix-popper-content-wrapper": "",
            style: {
                ...V,
                transform: H ? V.transform : "translate(0, -200%)",
                minWidth: "max-content",
                zIndex: ie,
                "--radix-popper-transform-origin": [(Ee = N.transformOrigin) == null ? void 0 : Ee.x, (te = N.transformOrigin) == null ? void 0 : te.y].join(" "),
                ...((B = N.hide) == null ? void 0 : B.referenceHidden) && {
                    visibility: "hidden",
                    pointerEvents: "none"
                }
            },
            dir: e.dir,
            children: S.jsx(uS, {
                scope: n,
                placedSide: P,
                onArrowChange: C,
                arrowX: F,
                arrowY: Q,
                shouldHideArrow: K,
                children: S.jsx(nt.div, {
                    "data-side": P,
                    "data-align": M,
                    ...g,
                    ref: y,
                    style: {
                        ...g.style,
                        animation: H ? void 0 : "none"
                    }
                })
            })
        })
    });
xg.displayName = _c;
var Sg = "PopperArrow",
    dS = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
    },
    Eg = x.forwardRef(function(t, n) {
        const {
            __scopePopper: r,
            ...o
        } = t, i = cS(Sg, r), s = dS[i.placedSide];
        return S.jsx("span", {
            ref: i.onArrowChange,
            style: {
                position: "absolute",
                left: i.arrowX,
                top: i.arrowY,
                [s]: 0,
                transformOrigin: {
                    top: "",
                    right: "0 0",
                    bottom: "center 0",
                    left: "100% 0"
                } [i.placedSide],
                transform: {
                    top: "translateY(100%)",
                    right: "translateY(50%) rotate(90deg) translateX(-50%)",
                    bottom: "rotate(180deg)",
                    left: "translateY(50%) rotate(-90deg) translateX(50%)"
                } [i.placedSide],
                visibility: i.shouldHideArrow ? "hidden" : void 0
            },
            children: S.jsx(lS, {
                ...o,
                ref: n,
                style: {
                    ...o.style,
                    display: "block"
                }
            })
        })
    });
Eg.displayName = Sg;

function fS(e) {
    return e !== null
}
var pS = e => ({
    name: "transformOrigin",
    options: e,
    fn(t) {
        var w, p, m;
        const {
            placement: n,
            rects: r,
            middlewareData: o
        } = t, s = ((w = o.arrow) == null ? void 0 : w.centerOffset) !== 0, l = s ? 0 : e.arrowWidth, a = s ? 0 : e.arrowHeight, [u, c] = Cg(n), d = {
            start: "0%",
            center: "50%",
            end: "100%"
        } [c], h = (((p = o.arrow) == null ? void 0 : p.x) ?? 0) + l / 2, f = (((m = o.arrow) == null ? void 0 : m.y) ?? 0) + a / 2;
        let v = "",
            g = "";
        return u === "bottom" ? (v = s ? d : `${h}px`, g = `${-a}px`) : u === "top" ? (v = s ? d : `${h}px`, g = `${r.floating.height+a}px`) : u === "right" ? (v = `${-a}px`, g = s ? d : `${f}px`) : u === "left" && (v = `${r.floating.width+a}px`, g = s ? d : `${f}px`), {
            data: {
                x: v,
                y: g
            }
        }
    }
});

function Cg(e) {
    const [t, n = "center"] = e.split("-");
    return [t, n]
}
var hS = wg,
    mS = xg,
    gS = Eg,
    [Cl, QC] = vl("Tooltip", [gg]),
    Ic = gg(),
    bg = "TooltipProvider",
    vS = 700,
    kf = "tooltip.open",
    [yS, kg] = Cl(bg),
    Pg = e => {
        const {
            __scopeTooltip: t,
            delayDuration: n = vS,
            skipDelayDuration: r = 300,
            disableHoverableContent: o = !1,
            children: i
        } = e, s = x.useRef(!0), l = x.useRef(!1), a = x.useRef(0);
        return x.useEffect(() => {
            const u = a.current;
            return () => window.clearTimeout(u)
        }, []), S.jsx(yS, {
            scope: t,
            isOpenDelayedRef: s,
            delayDuration: n,
            onOpen: x.useCallback(() => {
                window.clearTimeout(a.current), s.current = !1
            }, []),
            onClose: x.useCallback(() => {
                window.clearTimeout(a.current), a.current = window.setTimeout(() => s.current = !0, r)
            }, [r]),
            isPointerInTransitRef: l,
            onPointerInTransitChange: x.useCallback(u => {
                l.current = u
            }, []),
            disableHoverableContent: o,
            children: i
        })
    };
Pg.displayName = bg;
var Tg = "Tooltip",
    [KC, bl] = Cl(Tg),
    yu = "TooltipTrigger",
    wS = x.forwardRef((e, t) => {
        const {
            __scopeTooltip: n,
            ...r
        } = e, o = bl(yu, n), i = kg(yu, n), s = Ic(n), l = x.useRef(null), a = $t(t, l, o.onTriggerChange), u = x.useRef(!1), c = x.useRef(!1), d = x.useCallback(() => u.current = !1, []);
        return x.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), S.jsx(hS, {
            asChild: !0,
            ...s,
            children: S.jsx(nt.button, {
                "aria-describedby": o.open ? o.contentId : void 0,
                "data-state": o.stateAttribute,
                ...r,
                ref: a,
                onPointerMove: Pe(e.onPointerMove, h => {
                    h.pointerType !== "touch" && !c.current && !i.isPointerInTransitRef.current && (o.onTriggerEnter(), c.current = !0)
                }),
                onPointerLeave: Pe(e.onPointerLeave, () => {
                    o.onTriggerLeave(), c.current = !1
                }),
                onPointerDown: Pe(e.onPointerDown, () => {
                    o.open && o.onClose(), u.current = !0, document.addEventListener("pointerup", d, {
                        once: !0
                    })
                }),
                onFocus: Pe(e.onFocus, () => {
                    u.current || o.onOpen()
                }),
                onBlur: Pe(e.onBlur, o.onClose),
                onClick: Pe(e.onClick, o.onClose)
            })
        })
    });
wS.displayName = yu;
var xS = "TooltipPortal",
    [GC, SS] = Cl(xS, {
        forceMount: void 0
    }),
    go = "TooltipContent",
    Ng = x.forwardRef((e, t) => {
        const n = SS(go, e.__scopeTooltip),
            {
                forceMount: r = n.forceMount,
                side: o = "top",
                ...i
            } = e,
            s = bl(go, e.__scopeTooltip);
        return S.jsx(Cc, {
            present: r || s.open,
            children: s.disableHoverableContent ? S.jsx(Rg, {
                side: o,
                ...i,
                ref: t
            }) : S.jsx(ES, {
                side: o,
                ...i,
                ref: t
            })
        })
    }),
    ES = x.forwardRef((e, t) => {
        const n = bl(go, e.__scopeTooltip),
            r = kg(go, e.__scopeTooltip),
            o = x.useRef(null),
            i = $t(t, o),
            [s, l] = x.useState(null),
            {
                trigger: a,
                onClose: u
            } = n,
            c = o.current,
            {
                onPointerInTransitChange: d
            } = r,
            h = x.useCallback(() => {
                l(null), d(!1)
            }, [d]),
            f = x.useCallback((v, g) => {
                const w = v.currentTarget,
                    p = {
                        x: v.clientX,
                        y: v.clientY
                    },
                    m = TS(p, w.getBoundingClientRect()),
                    y = NS(p, m),
                    E = RS(g.getBoundingClientRect()),
                    C = jS([...y, ...E]);
                l(C), d(!0)
            }, [d]);
        return x.useEffect(() => () => h(), [h]), x.useEffect(() => {
            if (a && c) {
                const v = w => f(w, c),
                    g = w => f(w, a);
                return a.addEventListener("pointerleave", v), c.addEventListener("pointerleave", g), () => {
                    a.removeEventListener("pointerleave", v), c.removeEventListener("pointerleave", g)
                }
            }
        }, [a, c, f, h]), x.useEffect(() => {
            if (s) {
                const v = g => {
                    const w = g.target,
                        p = {
                            x: g.clientX,
                            y: g.clientY
                        },
                        m = (a == null ? void 0 : a.contains(w)) || (c == null ? void 0 : c.contains(w)),
                        y = !OS(p, s);
                    m ? h() : y && (h(), u())
                };
                return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v)
            }
        }, [a, c, s, u, h]), S.jsx(Rg, {
            ...e,
            ref: i
        })
    }),
    [CS, bS] = Cl(Tg, {
        isInside: !1
    }),
    kS = _y("TooltipContent"),
    Rg = x.forwardRef((e, t) => {
        const {
            __scopeTooltip: n,
            children: r,
            "aria-label": o,
            onEscapeKeyDown: i,
            onPointerDownOutside: s,
            ...l
        } = e, a = bl(go, n), u = Ic(n), {
            onClose: c
        } = a;
        return x.useEffect(() => (document.addEventListener(kf, c), () => document.removeEventListener(kf, c)), [c]), x.useEffect(() => {
            if (a.trigger) {
                const d = h => {
                    const f = h.target;
                    f != null && f.contains(a.trigger) && c()
                };
                return window.addEventListener("scroll", d, {
                    capture: !0
                }), () => window.removeEventListener("scroll", d, {
                    capture: !0
                })
            }
        }, [a.trigger, c]), S.jsx(Ec, {
            asChild: !0,
            disableOutsidePointerEvents: !1,
            onEscapeKeyDown: i,
            onPointerDownOutside: s,
            onFocusOutside: d => d.preventDefault(),
            onDismiss: c,
            children: S.jsxs(mS, {
                "data-state": a.stateAttribute,
                ...u,
                ...l,
                ref: t,
                style: {
                    ...l.style,
                    "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                    "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                    "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                    "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                    "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
                },
                children: [S.jsx(kS, {
                    children: r
                }), S.jsx(CS, {
                    scope: n,
                    isInside: !0,
                    children: S.jsx(sw, {
                        id: a.contentId,
                        role: "tooltip",
                        children: o || r
                    })
                })]
            })
        })
    });
Ng.displayName = go;
var Og = "TooltipArrow",
    PS = x.forwardRef((e, t) => {
        const {
            __scopeTooltip: n,
            ...r
        } = e, o = Ic(n);
        return bS(Og, n).isInside ? null : S.jsx(gS, {
            ...o,
            ...r,
            ref: t
        })
    });
PS.displayName = Og;

function TS(e, t) {
    const n = Math.abs(t.top - e.y),
        r = Math.abs(t.bottom - e.y),
        o = Math.abs(t.right - e.x),
        i = Math.abs(t.left - e.x);
    switch (Math.min(n, r, o, i)) {
        case i:
            return "left";
        case o:
            return "right";
        case n:
            return "top";
        case r:
            return "bottom";
        default:
            throw new Error("unreachable")
    }
}

function NS(e, t, n = 5) {
    const r = [];
    switch (t) {
        case "top":
            r.push({
                x: e.x - n,
                y: e.y + n
            }, {
                x: e.x + n,
                y: e.y + n
            });
            break;
        case "bottom":
            r.push({
                x: e.x - n,
                y: e.y - n
            }, {
                x: e.x + n,
                y: e.y - n
            });
            break;
        case "left":
            r.push({
                x: e.x + n,
                y: e.y - n
            }, {
                x: e.x + n,
                y: e.y + n
            });
            break;
        case "right":
            r.push({
                x: e.x - n,
                y: e.y - n
            }, {
                x: e.x - n,
                y: e.y + n
            });
            break
    }
    return r
}

function RS(e) {
    const {
        top: t,
        right: n,
        bottom: r,
        left: o
    } = e;
    return [{
        x: o,
        y: t
    }, {
        x: n,
        y: t
    }, {
        x: n,
        y: r
    }, {
        x: o,
        y: r
    }]
}

function OS(e, t) {
    const {
        x: n,
        y: r
    } = e;
    let o = !1;
    for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
        const l = t[i],
            a = t[s],
            u = l.x,
            c = l.y,
            d = a.x,
            h = a.y;
        c > r != h > r && n < (d - u) * (r - c) / (h - c) + u && (o = !o)
    }
    return o
}

function jS(e) {
    const t = e.slice();
    return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), LS(t)
}

function LS(e) {
    if (e.length <= 1) return e.slice();
    const t = [];
    for (let r = 0; r < e.length; r++) {
        const o = e[r];
        for (; t.length >= 2;) {
            const i = t[t.length - 1],
                s = t[t.length - 2];
            if ((i.x - s.x) * (o.y - s.y) >= (i.y - s.y) * (o.x - s.x)) t.pop();
            else break
        }
        t.push(o)
    }
    t.pop();
    const n = [];
    for (let r = e.length - 1; r >= 0; r--) {
        const o = e[r];
        for (; n.length >= 2;) {
            const i = n[n.length - 1],
                s = n[n.length - 2];
            if ((i.x - s.x) * (o.y - s.y) >= (i.y - s.y) * (o.x - s.x)) n.pop();
            else break
        }
        n.push(o)
    }
    return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n)
}
var AS = Pg,
    jg = Ng;
const MS = AS,
    _S = x.forwardRef(({
        className: e,
        sideOffset: t = 4,
        ...n
    }, r) => S.jsx(jg, {
        ref: r,
        sideOffset: t,
        className: or("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", e),
        ...n
    }));
_S.displayName = jg.displayName;
var kl = class {
        constructor() {
            this.listeners = new Set, this.subscribe = this.subscribe.bind(this)
        }
        subscribe(e) {
            return this.listeners.add(e), this.onSubscribe(), () => {
                this.listeners.delete(e), this.onUnsubscribe()
            }
        }
        hasListeners() {
            return this.listeners.size > 0
        }
        onSubscribe() {}
        onUnsubscribe() {}
    },
    Pl = typeof window > "u" || "Deno" in globalThis;

function jt() {}

function IS(e, t) {
    return typeof e == "function" ? e(t) : e
}

function DS(e) {
    return typeof e == "number" && e >= 0 && e !== 1 / 0
}

function FS(e, t) {
    return Math.max(e + (t || 0) - Date.now(), 0)
}

function wu(e, t) {
    return typeof e == "function" ? e(t) : e
}

function zS(e, t) {
    return typeof e == "function" ? e(t) : e
}

function Pf(e, t) {
    const {
        type: n = "all",
        exact: r,
        fetchStatus: o,
        predicate: i,
        queryKey: s,
        stale: l
    } = e;
    if (s) {
        if (r) {
            if (t.queryHash !== Dc(s, t.options)) return !1
        } else if (!yi(t.queryKey, s)) return !1
    }
    if (n !== "all") {
        const a = t.isActive();
        if (n === "active" && !a || n === "inactive" && a) return !1
    }
    return !(typeof l == "boolean" && t.isStale() !== l || o && o !== t.state.fetchStatus || i && !i(t))
}

function Tf(e, t) {
    const {
        exact: n,
        status: r,
        predicate: o,
        mutationKey: i
    } = e;
    if (i) {
        if (!t.options.mutationKey) return !1;
        if (n) {
            if (vi(t.options.mutationKey) !== vi(i)) return !1
        } else if (!yi(t.options.mutationKey, i)) return !1
    }
    return !(r && t.state.status !== r || o && !o(t))
}

function Dc(e, t) {
    return ((t == null ? void 0 : t.queryKeyHashFn) || vi)(e)
}

function vi(e) {
    return JSON.stringify(e, (t, n) => xu(n) ? Object.keys(n).sort().reduce((r, o) => (r[o] = n[o], r), {}) : n)
}

function yi(e, t) {
    return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" && typeof t == "object" ? Object.keys(t).every(n => yi(e[n], t[n])) : !1
}

function Lg(e, t) {
    if (e === t) return e;
    const n = Nf(e) && Nf(t);
    if (n || xu(e) && xu(t)) {
        const r = n ? e : Object.keys(e),
            o = r.length,
            i = n ? t : Object.keys(t),
            s = i.length,
            l = n ? [] : {},
            a = new Set(r);
        let u = 0;
        for (let c = 0; c < s; c++) {
            const d = n ? c : i[c];
            (!n && a.has(d) || n) && e[d] === void 0 && t[d] === void 0 ? (l[d] = void 0, u++) : (l[d] = Lg(e[d], t[d]), l[d] === e[d] && e[d] !== void 0 && u++)
        }
        return o === s && u === o ? e : l
    }
    return t
}

function Nf(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length
}

function xu(e) {
    if (!Rf(e)) return !1;
    const t = e.constructor;
    if (t === void 0) return !0;
    const n = t.prototype;
    return !(!Rf(n) || !n.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype)
}

function Rf(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
}

function $S(e) {
    return new Promise(t => {
        setTimeout(t, e)
    })
}

function BS(e, t, n) {
    return typeof n.structuralSharing == "function" ? n.structuralSharing(e, t) : n.structuralSharing !== !1 ? Lg(e, t) : t
}

function US(e, t, n = 0) {
    const r = [...e, t];
    return n && r.length > n ? r.slice(1) : r
}

function VS(e, t, n = 0) {
    const r = [t, ...e];
    return n && r.length > n ? r.slice(0, -1) : r
}
var Fc = Symbol();

function Ag(e, t) {
    return !e.queryFn && (t != null && t.initialPromise) ? () => t.initialPromise : !e.queryFn || e.queryFn === Fc ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn
}
var dr, Ln, Jr, Kf, HS = (Kf = class extends kl {
        constructor() {
            super();
            ne(this, dr);
            ne(this, Ln);
            ne(this, Jr);
            q(this, Jr, t => {
                if (!Pl && window.addEventListener) {
                    const n = () => t();
                    return window.addEventListener("visibilitychange", n, !1), () => {
                        window.removeEventListener("visibilitychange", n)
                    }
                }
            })
        }
        onSubscribe() {
            R(this, Ln) || this.setEventListener(R(this, Jr))
        }
        onUnsubscribe() {
            var t;
            this.hasListeners() || ((t = R(this, Ln)) == null || t.call(this), q(this, Ln, void 0))
        }
        setEventListener(t) {
            var n;
            q(this, Jr, t), (n = R(this, Ln)) == null || n.call(this), q(this, Ln, t(r => {
                typeof r == "boolean" ? this.setFocused(r) : this.onFocus()
            }))
        }
        setFocused(t) {
            R(this, dr) !== t && (q(this, dr, t), this.onFocus())
        }
        onFocus() {
            const t = this.isFocused();
            this.listeners.forEach(n => {
                n(t)
            })
        }
        isFocused() {
            var t;
            return typeof R(this, dr) == "boolean" ? R(this, dr) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden"
        }
    }, dr = new WeakMap, Ln = new WeakMap, Jr = new WeakMap, Kf),
    Mg = new HS,
    eo, An, to, Gf, WS = (Gf = class extends kl {
        constructor() {
            super();
            ne(this, eo, !0);
            ne(this, An);
            ne(this, to);
            q(this, to, t => {
                if (!Pl && window.addEventListener) {
                    const n = () => t(!0),
                        r = () => t(!1);
                    return window.addEventListener("online", n, !1), window.addEventListener("offline", r, !1), () => {
                        window.removeEventListener("online", n), window.removeEventListener("offline", r)
                    }
                }
            })
        }
        onSubscribe() {
            R(this, An) || this.setEventListener(R(this, to))
        }
        onUnsubscribe() {
            var t;
            this.hasListeners() || ((t = R(this, An)) == null || t.call(this), q(this, An, void 0))
        }
        setEventListener(t) {
            var n;
            q(this, to, t), (n = R(this, An)) == null || n.call(this), q(this, An, t(this.setOnline.bind(this)))
        }
        setOnline(t) {
            R(this, eo) !== t && (q(this, eo, t), this.listeners.forEach(r => {
                r(t)
            }))
        }
        isOnline() {
            return R(this, eo)
        }
    }, eo = new WeakMap, An = new WeakMap, to = new WeakMap, Gf),
    Xs = new WS;

function QS() {
    let e, t;
    const n = new Promise((o, i) => {
        e = o, t = i
    });
    n.status = "pending", n.catch(() => {});

    function r(o) {
        Object.assign(n, o), delete n.resolve, delete n.reject
    }
    return n.resolve = o => {
        r({
            status: "fulfilled",
            value: o
        }), e(o)
    }, n.reject = o => {
        r({
            status: "rejected",
            reason: o
        }), t(o)
    }, n
}

function KS(e) {
    return Math.min(1e3 * 2 ** e, 3e4)
}

function _g(e) {
    return (e ?? "online") === "online" ? Xs.isOnline() : !0
}
var Ig = class extends Error {
    constructor(e) {
        super("CancelledError"), this.revert = e == null ? void 0 : e.revert, this.silent = e == null ? void 0 : e.silent
    }
};

function ha(e) {
    return e instanceof Ig
}

function Dg(e) {
    let t = !1,
        n = 0,
        r = !1,
        o;
    const i = QS(),
        s = g => {
            var w;
            r || (h(new Ig(g)), (w = e.abort) == null || w.call(e))
        },
        l = () => {
            t = !0
        },
        a = () => {
            t = !1
        },
        u = () => Mg.isFocused() && (e.networkMode === "always" || Xs.isOnline()) && e.canRun(),
        c = () => _g(e.networkMode) && e.canRun(),
        d = g => {
            var w;
            r || (r = !0, (w = e.onSuccess) == null || w.call(e, g), o == null || o(), i.resolve(g))
        },
        h = g => {
            var w;
            r || (r = !0, (w = e.onError) == null || w.call(e, g), o == null || o(), i.reject(g))
        },
        f = () => new Promise(g => {
            var w;
            o = p => {
                (r || u()) && g(p)
            }, (w = e.onPause) == null || w.call(e)
        }).then(() => {
            var g;
            o = void 0, r || (g = e.onContinue) == null || g.call(e)
        }),
        v = () => {
            if (r) return;
            let g;
            const w = n === 0 ? e.initialPromise : void 0;
            try {
                g = w ?? e.fn()
            } catch (p) {
                g = Promise.reject(p)
            }
            Promise.resolve(g).then(d).catch(p => {
                var k;
                if (r) return;
                const m = e.retry ?? (Pl ? 0 : 3),
                    y = e.retryDelay ?? KS,
                    E = typeof y == "function" ? y(n, p) : y,
                    C = m === !0 || typeof m == "number" && n < m || typeof m == "function" && m(n, p);
                if (t || !C) {
                    h(p);
                    return
                }
                n++, (k = e.onFail) == null || k.call(e, n, p), $S(E).then(() => u() ? void 0 : f()).then(() => {
                    t ? h(p) : v()
                })
            })
        };
    return {
        promise: i,
        cancel: s,
        continue: () => (o == null || o(), i),
        cancelRetry: l,
        continueRetry: a,
        canStart: c,
        start: () => (c() ? v() : f().then(v), i)
    }
}
var GS = e => setTimeout(e, 0);

function YS() {
    let e = [],
        t = 0,
        n = l => {
            l()
        },
        r = l => {
            l()
        },
        o = GS;
    const i = l => {
            t ? e.push(l) : o(() => {
                n(l)
            })
        },
        s = () => {
            const l = e;
            e = [], l.length && o(() => {
                r(() => {
                    l.forEach(a => {
                        n(a)
                    })
                })
            })
        };
    return {
        batch: l => {
            let a;
            t++;
            try {
                a = l()
            } finally {
                t--, t || s()
            }
            return a
        },
        batchCalls: l => (...a) => {
            i(() => {
                l(...a)
            })
        },
        schedule: i,
        setNotifyFunction: l => {
            n = l
        },
        setBatchNotifyFunction: l => {
            r = l
        },
        setScheduler: l => {
            o = l
        }
    }
}
var He = YS(),
    fr, Yf, Fg = (Yf = class {
        constructor() {
            ne(this, fr)
        }
        destroy() {
            this.clearGcTimeout()
        }
        scheduleGc() {
            this.clearGcTimeout(), DS(this.gcTime) && q(this, fr, setTimeout(() => {
                this.optionalRemove()
            }, this.gcTime))
        }
        updateGcTime(e) {
            this.gcTime = Math.max(this.gcTime || 0, e ?? (Pl ? 1 / 0 : 5 * 60 * 1e3))
        }
        clearGcTimeout() {
            R(this, fr) && (clearTimeout(R(this, fr)), q(this, fr, void 0))
        }
    }, fr = new WeakMap, Yf),
    no, pr, pt, hr, De, Ei, mr, Lt, on, qf, qS = (qf = class extends Fg {
        constructor(t) {
            super();
            ne(this, Lt);
            ne(this, no);
            ne(this, pr);
            ne(this, pt);
            ne(this, hr);
            ne(this, De);
            ne(this, Ei);
            ne(this, mr);
            q(this, mr, !1), q(this, Ei, t.defaultOptions), this.setOptions(t.options), this.observers = [], q(this, hr, t.client), q(this, pt, R(this, hr).getQueryCache()), this.queryKey = t.queryKey, this.queryHash = t.queryHash, q(this, no, ZS(this.options)), this.state = t.state ?? R(this, no), this.scheduleGc()
        }
        get meta() {
            return this.options.meta
        }
        get promise() {
            var t;
            return (t = R(this, De)) == null ? void 0 : t.promise
        }
        setOptions(t) {
            this.options = {
                ...R(this, Ei),
                ...t
            }, this.updateGcTime(this.options.gcTime)
        }
        optionalRemove() {
            !this.observers.length && this.state.fetchStatus === "idle" && R(this, pt).remove(this)
        }
        setData(t, n) {
            const r = BS(this.state.data, t, this.options);
            return Me(this, Lt, on).call(this, {
                data: r,
                type: "success",
                dataUpdatedAt: n == null ? void 0 : n.updatedAt,
                manual: n == null ? void 0 : n.manual
            }), r
        }
        setState(t, n) {
            Me(this, Lt, on).call(this, {
                type: "setState",
                state: t,
                setStateOptions: n
            })
        }
        cancel(t) {
            var r, o;
            const n = (r = R(this, De)) == null ? void 0 : r.promise;
            return (o = R(this, De)) == null || o.cancel(t), n ? n.then(jt).catch(jt) : Promise.resolve()
        }
        destroy() {
            super.destroy(), this.cancel({
                silent: !0
            })
        }
        reset() {
            this.destroy(), this.setState(R(this, no))
        }
        isActive() {
            return this.observers.some(t => zS(t.options.enabled, this) !== !1)
        }
        isDisabled() {
            return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === Fc || this.state.dataUpdateCount + this.state.errorUpdateCount === 0
        }
        isStatic() {
            return this.getObserversCount() > 0 ? this.observers.some(t => wu(t.options.staleTime, this) === "static") : !1
        }
        isStale() {
            return this.getObserversCount() > 0 ? this.observers.some(t => t.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated
        }
        isStaleByTime(t = 0) {
            return this.state.data === void 0 ? !0 : t === "static" ? !1 : this.state.isInvalidated ? !0 : !FS(this.state.dataUpdatedAt, t)
        }
        onFocus() {
            var n;
            const t = this.observers.find(r => r.shouldFetchOnWindowFocus());
            t == null || t.refetch({
                cancelRefetch: !1
            }), (n = R(this, De)) == null || n.continue()
        }
        onOnline() {
            var n;
            const t = this.observers.find(r => r.shouldFetchOnReconnect());
            t == null || t.refetch({
                cancelRefetch: !1
            }), (n = R(this, De)) == null || n.continue()
        }
        addObserver(t) {
            this.observers.includes(t) || (this.observers.push(t), this.clearGcTimeout(), R(this, pt).notify({
                type: "observerAdded",
                query: this,
                observer: t
            }))
        }
        removeObserver(t) {
            this.observers.includes(t) && (this.observers = this.observers.filter(n => n !== t), this.observers.length || (R(this, De) && (R(this, mr) ? R(this, De).cancel({
                revert: !0
            }) : R(this, De).cancelRetry()), this.scheduleGc()), R(this, pt).notify({
                type: "observerRemoved",
                query: this,
                observer: t
            }))
        }
        getObserversCount() {
            return this.observers.length
        }
        invalidate() {
            this.state.isInvalidated || Me(this, Lt, on).call(this, {
                type: "invalidate"
            })
        }
        fetch(t, n) {
            var u, c, d;
            if (this.state.fetchStatus !== "idle") {
                if (this.state.data !== void 0 && (n != null && n.cancelRefetch)) this.cancel({
                    silent: !0
                });
                else if (R(this, De)) return R(this, De).continueRetry(), R(this, De).promise
            }
            if (t && this.setOptions(t), !this.options.queryFn) {
                const h = this.observers.find(f => f.options.queryFn);
                h && this.setOptions(h.options)
            }
            const r = new AbortController,
                o = h => {
                    Object.defineProperty(h, "signal", {
                        enumerable: !0,
                        get: () => (q(this, mr, !0), r.signal)
                    })
                },
                i = () => {
                    const h = Ag(this.options, n),
                        v = (() => {
                            const g = {
                                client: R(this, hr),
                                queryKey: this.queryKey,
                                meta: this.meta
                            };
                            return o(g), g
                        })();
                    return q(this, mr, !1), this.options.persister ? this.options.persister(h, v, this) : h(v)
                },
                l = (() => {
                    const h = {
                        fetchOptions: n,
                        options: this.options,
                        queryKey: this.queryKey,
                        client: R(this, hr),
                        state: this.state,
                        fetchFn: i
                    };
                    return o(h), h
                })();
            (u = this.options.behavior) == null || u.onFetch(l, this), q(this, pr, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((c = l.fetchOptions) == null ? void 0 : c.meta)) && Me(this, Lt, on).call(this, {
                type: "fetch",
                meta: (d = l.fetchOptions) == null ? void 0 : d.meta
            });
            const a = h => {
                var f, v, g, w;
                ha(h) && h.silent || Me(this, Lt, on).call(this, {
                    type: "error",
                    error: h
                }), ha(h) || ((v = (f = R(this, pt).config).onError) == null || v.call(f, h, this), (w = (g = R(this, pt).config).onSettled) == null || w.call(g, this.state.data, h, this)), this.scheduleGc()
            };
            return q(this, De, Dg({
                initialPromise: n == null ? void 0 : n.initialPromise,
                fn: l.fetchFn,
                abort: r.abort.bind(r),
                onSuccess: h => {
                    var f, v, g, w;
                    if (h === void 0) {
                        a(new Error(`${this.queryHash} data is undefined`));
                        return
                    }
                    try {
                        this.setData(h)
                    } catch (p) {
                        a(p);
                        return
                    }(v = (f = R(this, pt).config).onSuccess) == null || v.call(f, h, this), (w = (g = R(this, pt).config).onSettled) == null || w.call(g, h, this.state.error, this), this.scheduleGc()
                },
                onError: a,
                onFail: (h, f) => {
                    Me(this, Lt, on).call(this, {
                        type: "failed",
                        failureCount: h,
                        error: f
                    })
                },
                onPause: () => {
                    Me(this, Lt, on).call(this, {
                        type: "pause"
                    })
                },
                onContinue: () => {
                    Me(this, Lt, on).call(this, {
                        type: "continue"
                    })
                },
                retry: l.options.retry,
                retryDelay: l.options.retryDelay,
                networkMode: l.options.networkMode,
                canRun: () => !0
            })), R(this, De).start()
        }
    }, no = new WeakMap, pr = new WeakMap, pt = new WeakMap, hr = new WeakMap, De = new WeakMap, Ei = new WeakMap, mr = new WeakMap, Lt = new WeakSet, on = function(t) {
        const n = r => {
            switch (t.type) {
                case "failed":
                    return {
                        ...r, fetchFailureCount: t.failureCount, fetchFailureReason: t.error
                    };
                case "pause":
                    return {
                        ...r, fetchStatus: "paused"
                    };
                case "continue":
                    return {
                        ...r, fetchStatus: "fetching"
                    };
                case "fetch":
                    return {
                        ...r, ...XS(r.data, this.options), fetchMeta: t.meta ?? null
                    };
                case "success":
                    return q(this, pr, void 0), {
                        ...r,
                        data: t.data,
                        dataUpdateCount: r.dataUpdateCount + 1,
                        dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
                        error: null,
                        isInvalidated: !1,
                        status: "success",
                        ...!t.manual && {
                            fetchStatus: "idle",
                            fetchFailureCount: 0,
                            fetchFailureReason: null
                        }
                    };
                case "error":
                    const o = t.error;
                    return ha(o) && o.revert && R(this, pr) ? {
                        ...R(this, pr),
                        fetchStatus: "idle"
                    } : {
                        ...r,
                        error: o,
                        errorUpdateCount: r.errorUpdateCount + 1,
                        errorUpdatedAt: Date.now(),
                        fetchFailureCount: r.fetchFailureCount + 1,
                        fetchFailureReason: o,
                        fetchStatus: "idle",
                        status: "error"
                    };
                case "invalidate":
                    return {
                        ...r, isInvalidated: !0
                    };
                case "setState":
                    return {
                        ...r, ...t.state
                    }
            }
        };
        this.state = n(this.state), He.batch(() => {
            this.observers.forEach(r => {
                r.onQueryUpdate()
            }), R(this, pt).notify({
                query: this,
                type: "updated",
                action: t
            })
        })
    }, qf);

function XS(e, t) {
    return {
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchStatus: _g(t.networkMode) ? "fetching" : "paused",
        ...e === void 0 && {
            error: null,
            status: "pending"
        }
    }
}

function ZS(e) {
    const t = typeof e.initialData == "function" ? e.initialData() : e.initialData,
        n = t !== void 0,
        r = n ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
    return {
        data: t,
        dataUpdateCount: 0,
        dataUpdatedAt: n ? r ?? Date.now() : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: !1,
        status: n ? "success" : "pending",
        fetchStatus: "idle"
    }
}
var Qt, Xf, JS = (Xf = class extends kl {
        constructor(t = {}) {
            super();
            ne(this, Qt);
            this.config = t, q(this, Qt, new Map)
        }
        build(t, n, r) {
            const o = n.queryKey,
                i = n.queryHash ?? Dc(o, n);
            let s = this.get(i);
            return s || (s = new qS({
                client: t,
                queryKey: o,
                queryHash: i,
                options: t.defaultQueryOptions(n),
                state: r,
                defaultOptions: t.getQueryDefaults(o)
            }), this.add(s)), s
        }
        add(t) {
            R(this, Qt).has(t.queryHash) || (R(this, Qt).set(t.queryHash, t), this.notify({
                type: "added",
                query: t
            }))
        }
        remove(t) {
            const n = R(this, Qt).get(t.queryHash);
            n && (t.destroy(), n === t && R(this, Qt).delete(t.queryHash), this.notify({
                type: "removed",
                query: t
            }))
        }
        clear() {
            He.batch(() => {
                this.getAll().forEach(t => {
                    this.remove(t)
                })
            })
        }
        get(t) {
            return R(this, Qt).get(t)
        }
        getAll() {
            return [...R(this, Qt).values()]
        }
        find(t) {
            const n = {
                exact: !0,
                ...t
            };
            return this.getAll().find(r => Pf(n, r))
        }
        findAll(t = {}) {
            const n = this.getAll();
            return Object.keys(t).length > 0 ? n.filter(r => Pf(t, r)) : n
        }
        notify(t) {
            He.batch(() => {
                this.listeners.forEach(n => {
                    n(t)
                })
            })
        }
        onFocus() {
            He.batch(() => {
                this.getAll().forEach(t => {
                    t.onFocus()
                })
            })
        }
        onOnline() {
            He.batch(() => {
                this.getAll().forEach(t => {
                    t.onOnline()
                })
            })
        }
    }, Qt = new WeakMap, Xf),
    Kt, Ue, gr, Gt, Tn, Zf, eE = (Zf = class extends Fg {
        constructor(t) {
            super();
            ne(this, Gt);
            ne(this, Kt);
            ne(this, Ue);
            ne(this, gr);
            this.mutationId = t.mutationId, q(this, Ue, t.mutationCache), q(this, Kt, []), this.state = t.state || tE(), this.setOptions(t.options), this.scheduleGc()
        }
        setOptions(t) {
            this.options = t, this.updateGcTime(this.options.gcTime)
        }
        get meta() {
            return this.options.meta
        }
        addObserver(t) {
            R(this, Kt).includes(t) || (R(this, Kt).push(t), this.clearGcTimeout(), R(this, Ue).notify({
                type: "observerAdded",
                mutation: this,
                observer: t
            }))
        }
        removeObserver(t) {
            q(this, Kt, R(this, Kt).filter(n => n !== t)), this.scheduleGc(), R(this, Ue).notify({
                type: "observerRemoved",
                mutation: this,
                observer: t
            })
        }
        optionalRemove() {
            R(this, Kt).length || (this.state.status === "pending" ? this.scheduleGc() : R(this, Ue).remove(this))
        }
        continue () {
            var t;
            return ((t = R(this, gr)) == null ? void 0 : t.continue()) ?? this.execute(this.state.variables)
        }
        async execute(t) {
            var i, s, l, a, u, c, d, h, f, v, g, w, p, m, y, E, C, k, b, T;
            const n = () => {
                Me(this, Gt, Tn).call(this, {
                    type: "continue"
                })
            };
            q(this, gr, Dg({
                fn: () => this.options.mutationFn ? this.options.mutationFn(t) : Promise.reject(new Error("No mutationFn found")),
                onFail: (j, L) => {
                    Me(this, Gt, Tn).call(this, {
                        type: "failed",
                        failureCount: j,
                        error: L
                    })
                },
                onPause: () => {
                    Me(this, Gt, Tn).call(this, {
                        type: "pause"
                    })
                },
                onContinue: n,
                retry: this.options.retry ?? 0,
                retryDelay: this.options.retryDelay,
                networkMode: this.options.networkMode,
                canRun: () => R(this, Ue).canRun(this)
            }));
            const r = this.state.status === "pending",
                o = !R(this, gr).canStart();
            try {
                if (r) n();
                else {
                    Me(this, Gt, Tn).call(this, {
                        type: "pending",
                        variables: t,
                        isPaused: o
                    }), await ((s = (i = R(this, Ue).config).onMutate) == null ? void 0 : s.call(i, t, this));
                    const L = await ((a = (l = this.options).onMutate) == null ? void 0 : a.call(l, t));
                    L !== this.state.context && Me(this, Gt, Tn).call(this, {
                        type: "pending",
                        context: L,
                        variables: t,
                        isPaused: o
                    })
                }
                const j = await R(this, gr).start();
                return await ((c = (u = R(this, Ue).config).onSuccess) == null ? void 0 : c.call(u, j, t, this.state.context, this)), await ((h = (d = this.options).onSuccess) == null ? void 0 : h.call(d, j, t, this.state.context)), await ((v = (f = R(this, Ue).config).onSettled) == null ? void 0 : v.call(f, j, null, this.state.variables, this.state.context, this)), await ((w = (g = this.options).onSettled) == null ? void 0 : w.call(g, j, null, t, this.state.context)), Me(this, Gt, Tn).call(this, {
                    type: "success",
                    data: j
                }), j
            } catch (j) {
                try {
                    throw await ((m = (p = R(this, Ue).config).onError) == null ? void 0 : m.call(p, j, t, this.state.context, this)), await ((E = (y = this.options).onError) == null ? void 0 : E.call(y, j, t, this.state.context)), await ((k = (C = R(this, Ue).config).onSettled) == null ? void 0 : k.call(C, void 0, j, this.state.variables, this.state.context, this)), await ((T = (b = this.options).onSettled) == null ? void 0 : T.call(b, void 0, j, t, this.state.context)), j
                } finally {
                    Me(this, Gt, Tn).call(this, {
                        type: "error",
                        error: j
                    })
                }
            } finally {
                R(this, Ue).runNext(this)
            }
        }
    }, Kt = new WeakMap, Ue = new WeakMap, gr = new WeakMap, Gt = new WeakSet, Tn = function(t) {
        const n = r => {
            switch (t.type) {
                case "failed":
                    return {
                        ...r, failureCount: t.failureCount, failureReason: t.error
                    };
                case "pause":
                    return {
                        ...r, isPaused: !0
                    };
                case "continue":
                    return {
                        ...r, isPaused: !1
                    };
                case "pending":
                    return {
                        ...r, context: t.context, data: void 0, failureCount: 0, failureReason: null, error: null, isPaused: t.isPaused, status: "pending", variables: t.variables, submittedAt: Date.now()
                    };
                case "success":
                    return {
                        ...r, data: t.data, failureCount: 0, failureReason: null, error: null, status: "success", isPaused: !1
                    };
                case "error":
                    return {
                        ...r, data: void 0, error: t.error, failureCount: r.failureCount + 1, failureReason: t.error, isPaused: !1, status: "error"
                    }
            }
        };
        this.state = n(this.state), He.batch(() => {
            R(this, Kt).forEach(r => {
                r.onMutationUpdate(t)
            }), R(this, Ue).notify({
                mutation: this,
                type: "updated",
                action: t
            })
        })
    }, Zf);

function tE() {
    return {
        context: void 0,
        data: void 0,
        error: null,
        failureCount: 0,
        failureReason: null,
        isPaused: !1,
        status: "idle",
        variables: void 0,
        submittedAt: 0
    }
}
var an, At, Ci, Jf, nE = (Jf = class extends kl {
    constructor(t = {}) {
        super();
        ne(this, an);
        ne(this, At);
        ne(this, Ci);
        this.config = t, q(this, an, new Set), q(this, At, new Map), q(this, Ci, 0)
    }
    build(t, n, r) {
        const o = new eE({
            mutationCache: this,
            mutationId: ++Fi(this, Ci)._,
            options: t.defaultMutationOptions(n),
            state: r
        });
        return this.add(o), o
    }
    add(t) {
        R(this, an).add(t);
        const n = ss(t);
        if (typeof n == "string") {
            const r = R(this, At).get(n);
            r ? r.push(t) : R(this, At).set(n, [t])
        }
        this.notify({
            type: "added",
            mutation: t
        })
    }
    remove(t) {
        if (R(this, an).delete(t)) {
            const n = ss(t);
            if (typeof n == "string") {
                const r = R(this, At).get(n);
                if (r)
                    if (r.length > 1) {
                        const o = r.indexOf(t);
                        o !== -1 && r.splice(o, 1)
                    } else r[0] === t && R(this, At).delete(n)
            }
        }
        this.notify({
            type: "removed",
            mutation: t
        })
    }
    canRun(t) {
        const n = ss(t);
        if (typeof n == "string") {
            const r = R(this, At).get(n),
                o = r == null ? void 0 : r.find(i => i.state.status === "pending");
            return !o || o === t
        } else return !0
    }
    runNext(t) {
        var r;
        const n = ss(t);
        if (typeof n == "string") {
            const o = (r = R(this, At).get(n)) == null ? void 0 : r.find(i => i !== t && i.state.isPaused);
            return (o == null ? void 0 : o.continue()) ?? Promise.resolve()
        } else return Promise.resolve()
    }
    clear() {
        He.batch(() => {
            R(this, an).forEach(t => {
                this.notify({
                    type: "removed",
                    mutation: t
                })
            }), R(this, an).clear(), R(this, At).clear()
        })
    }
    getAll() {
        return Array.from(R(this, an))
    }
    find(t) {
        const n = {
            exact: !0,
            ...t
        };
        return this.getAll().find(r => Tf(n, r))
    }
    findAll(t = {}) {
        return this.getAll().filter(n => Tf(t, n))
    }
    notify(t) {
        He.batch(() => {
            this.listeners.forEach(n => {
                n(t)
            })
        })
    }
    resumePausedMutations() {
        const t = this.getAll().filter(n => n.state.isPaused);
        return He.batch(() => Promise.all(t.map(n => n.continue().catch(jt))))
    }
}, an = new WeakMap, At = new WeakMap, Ci = new WeakMap, Jf);

function ss(e) {
    var t;
    return (t = e.options.scope) == null ? void 0 : t.id
}

function Of(e) {
    return {
        onFetch: (t, n) => {
            var c, d, h, f, v;
            const r = t.options,
                o = (h = (d = (c = t.fetchOptions) == null ? void 0 : c.meta) == null ? void 0 : d.fetchMore) == null ? void 0 : h.direction,
                i = ((f = t.state.data) == null ? void 0 : f.pages) || [],
                s = ((v = t.state.data) == null ? void 0 : v.pageParams) || [];
            let l = {
                    pages: [],
                    pageParams: []
                },
                a = 0;
            const u = async () => {
                let g = !1;
                const w = y => {
                        Object.defineProperty(y, "signal", {
                            enumerable: !0,
                            get: () => (t.signal.aborted ? g = !0 : t.signal.addEventListener("abort", () => {
                                g = !0
                            }), t.signal)
                        })
                    },
                    p = Ag(t.options, t.fetchOptions),
                    m = async (y, E, C) => {
                        if (g) return Promise.reject();
                        if (E == null && y.pages.length) return Promise.resolve(y);
                        const b = (() => {
                                const D = {
                                    client: t.client,
                                    queryKey: t.queryKey,
                                    pageParam: E,
                                    direction: C ? "backward" : "forward",
                                    meta: t.options.meta
                                };
                                return w(D), D
                            })(),
                            T = await p(b),
                            {
                                maxPages: j
                            } = t.options,
                            L = C ? VS : US;
                        return {
                            pages: L(y.pages, T, j),
                            pageParams: L(y.pageParams, E, j)
                        }
                    };
                if (o && i.length) {
                    const y = o === "backward",
                        E = y ? rE : jf,
                        C = {
                            pages: i,
                            pageParams: s
                        },
                        k = E(r, C);
                    l = await m(C, k, y)
                } else {
                    const y = e ?? i.length;
                    do {
                        const E = a === 0 ? s[0] ?? r.initialPageParam : jf(r, l);
                        if (a > 0 && E == null) break;
                        l = await m(l, E), a++
                    } while (a < y)
                }
                return l
            };
            t.options.persister ? t.fetchFn = () => {
                var g, w;
                return (w = (g = t.options).persister) == null ? void 0 : w.call(g, u, {
                    client: t.client,
                    queryKey: t.queryKey,
                    meta: t.options.meta,
                    signal: t.signal
                }, n)
            } : t.fetchFn = u
        }
    }
}

function jf(e, {
    pages: t,
    pageParams: n
}) {
    const r = t.length - 1;
    return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0
}

function rE(e, {
    pages: t,
    pageParams: n
}) {
    var r;
    return t.length > 0 ? (r = e.getPreviousPageParam) == null ? void 0 : r.call(e, t[0], t, n[0], n) : void 0
}
var we, Mn, _n, ro, oo, In, io, so, ep, oE = (ep = class {
        constructor(e = {}) {
            ne(this, we);
            ne(this, Mn);
            ne(this, _n);
            ne(this, ro);
            ne(this, oo);
            ne(this, In);
            ne(this, io);
            ne(this, so);
            q(this, we, e.queryCache || new JS), q(this, Mn, e.mutationCache || new nE), q(this, _n, e.defaultOptions || {}), q(this, ro, new Map), q(this, oo, new Map), q(this, In, 0)
        }
        mount() {
            Fi(this, In)._++, R(this, In) === 1 && (q(this, io, Mg.subscribe(async e => {
                e && (await this.resumePausedMutations(), R(this, we).onFocus())
            })), q(this, so, Xs.subscribe(async e => {
                e && (await this.resumePausedMutations(), R(this, we).onOnline())
            })))
        }
        unmount() {
            var e, t;
            Fi(this, In)._--, R(this, In) === 0 && ((e = R(this, io)) == null || e.call(this), q(this, io, void 0), (t = R(this, so)) == null || t.call(this), q(this, so, void 0))
        }
        isFetching(e) {
            return R(this, we).findAll({
                ...e,
                fetchStatus: "fetching"
            }).length
        }
        isMutating(e) {
            return R(this, Mn).findAll({
                ...e,
                status: "pending"
            }).length
        }
        getQueryData(e) {
            var n;
            const t = this.defaultQueryOptions({
                queryKey: e
            });
            return (n = R(this, we).get(t.queryHash)) == null ? void 0 : n.state.data
        }
        ensureQueryData(e) {
            const t = this.defaultQueryOptions(e),
                n = R(this, we).build(this, t),
                r = n.state.data;
            return r === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && n.isStaleByTime(wu(t.staleTime, n)) && this.prefetchQuery(t), Promise.resolve(r))
        }
        getQueriesData(e) {
            return R(this, we).findAll(e).map(({
                queryKey: t,
                state: n
            }) => {
                const r = n.data;
                return [t, r]
            })
        }
        setQueryData(e, t, n) {
            const r = this.defaultQueryOptions({
                    queryKey: e
                }),
                o = R(this, we).get(r.queryHash),
                i = o == null ? void 0 : o.state.data,
                s = IS(t, i);
            if (s !== void 0) return R(this, we).build(this, r).setData(s, {
                ...n,
                manual: !0
            })
        }
        setQueriesData(e, t, n) {
            return He.batch(() => R(this, we).findAll(e).map(({
                queryKey: r
            }) => [r, this.setQueryData(r, t, n)]))
        }
        getQueryState(e) {
            var n;
            const t = this.defaultQueryOptions({
                queryKey: e
            });
            return (n = R(this, we).get(t.queryHash)) == null ? void 0 : n.state
        }
        removeQueries(e) {
            const t = R(this, we);
            He.batch(() => {
                t.findAll(e).forEach(n => {
                    t.remove(n)
                })
            })
        }
        resetQueries(e, t) {
            const n = R(this, we);
            return He.batch(() => (n.findAll(e).forEach(r => {
                r.reset()
            }), this.refetchQueries({
                type: "active",
                ...e
            }, t)))
        }
        cancelQueries(e, t = {}) {
            const n = {
                    revert: !0,
                    ...t
                },
                r = He.batch(() => R(this, we).findAll(e).map(o => o.cancel(n)));
            return Promise.all(r).then(jt).catch(jt)
        }
        invalidateQueries(e, t = {}) {
            return He.batch(() => (R(this, we).findAll(e).forEach(n => {
                n.invalidate()
            }), (e == null ? void 0 : e.refetchType) === "none" ? Promise.resolve() : this.refetchQueries({
                ...e,
                type: (e == null ? void 0 : e.refetchType) ?? (e == null ? void 0 : e.type) ?? "active"
            }, t)))
        }
        refetchQueries(e, t = {}) {
            const n = {
                    ...t,
                    cancelRefetch: t.cancelRefetch ?? !0
                },
                r = He.batch(() => R(this, we).findAll(e).filter(o => !o.isDisabled() && !o.isStatic()).map(o => {
                    let i = o.fetch(void 0, n);
                    return n.throwOnError || (i = i.catch(jt)), o.state.fetchStatus === "paused" ? Promise.resolve() : i
                }));
            return Promise.all(r).then(jt)
        }
        fetchQuery(e) {
            const t = this.defaultQueryOptions(e);
            t.retry === void 0 && (t.retry = !1);
            const n = R(this, we).build(this, t);
            return n.isStaleByTime(wu(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data)
        }
        prefetchQuery(e) {
            return this.fetchQuery(e).then(jt).catch(jt)
        }
        fetchInfiniteQuery(e) {
            return e.behavior = Of(e.pages), this.fetchQuery(e)
        }
        prefetchInfiniteQuery(e) {
            return this.fetchInfiniteQuery(e).then(jt).catch(jt)
        }
        ensureInfiniteQueryData(e) {
            return e.behavior = Of(e.pages), this.ensureQueryData(e)
        }
        resumePausedMutations() {
            return Xs.isOnline() ? R(this, Mn).resumePausedMutations() : Promise.resolve()
        }
        getQueryCache() {
            return R(this, we)
        }
        getMutationCache() {
            return R(this, Mn)
        }
        getDefaultOptions() {
            return R(this, _n)
        }
        setDefaultOptions(e) {
            q(this, _n, e)
        }
        setQueryDefaults(e, t) {
            R(this, ro).set(vi(e), {
                queryKey: e,
                defaultOptions: t
            })
        }
        getQueryDefaults(e) {
            const t = [...R(this, ro).values()],
                n = {};
            return t.forEach(r => {
                yi(e, r.queryKey) && Object.assign(n, r.defaultOptions)
            }), n
        }
        setMutationDefaults(e, t) {
            R(this, oo).set(vi(e), {
                mutationKey: e,
                defaultOptions: t
            })
        }
        getMutationDefaults(e) {
            const t = [...R(this, oo).values()],
                n = {};
            return t.forEach(r => {
                yi(e, r.mutationKey) && Object.assign(n, r.defaultOptions)
            }), n
        }
        defaultQueryOptions(e) {
            if (e._defaulted) return e;
            const t = {
                ...R(this, _n).queries,
                ...this.getQueryDefaults(e.queryKey),
                ...e,
                _defaulted: !0
            };
            return t.queryHash || (t.queryHash = Dc(t.queryKey, t)), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === Fc && (t.enabled = !1), t
        }
        defaultMutationOptions(e) {
            return e != null && e._defaulted ? e : {
                ...R(this, _n).mutations,
                ...(e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey),
                ...e,
                _defaulted: !0
            }
        }
        clear() {
            R(this, we).clear(), R(this, Mn).clear()
        }
    }, we = new WeakMap, Mn = new WeakMap, _n = new WeakMap, ro = new WeakMap, oo = new WeakMap, In = new WeakMap, io = new WeakMap, so = new WeakMap, ep),
    iE = x.createContext(void 0),
    sE = ({
        client: e,
        children: t
    }) => (x.useEffect(() => (e.mount(), () => {
        e.unmount()
    }), [e]), S.jsx(iE.Provider, {
        value: e,
        children: t
    }));
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Zs() {
    return Zs = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, Zs.apply(this, arguments)
}
var zn;
(function(e) {
    e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE"
})(zn || (zn = {}));
const Lf = "popstate";

function lE(e) {
    e === void 0 && (e = {});

    function t(r, o) {
        let {
            pathname: i,
            search: s,
            hash: l
        } = r.location;
        return Su("", {
            pathname: i,
            search: s,
            hash: l
        }, o.state && o.state.usr || null, o.state && o.state.key || "default")
    }

    function n(r, o) {
        return typeof o == "string" ? o : $g(o)
    }
    return uE(t, n, null, e)
}

function tt(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t)
}

function zg(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t)
        } catch {}
    }
}

function aE() {
    return Math.random().toString(36).substr(2, 8)
}

function Af(e, t) {
    return {
        usr: e.state,
        key: e.key,
        idx: t
    }
}

function Su(e, t, n, r) {
    return n === void 0 && (n = null), Zs({
        pathname: typeof e == "string" ? e : e.pathname,
        search: "",
        hash: ""
    }, typeof t == "string" ? Tl(t) : t, {
        state: n,
        key: t && t.key || r || aE()
    })
}

function $g(e) {
    let {
        pathname: t = "/",
        search: n = "",
        hash: r = ""
    } = e;
    return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r), t
}

function Tl(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
        let r = e.indexOf("?");
        r >= 0 && (t.search = e.substr(r), e = e.substr(0, r)), e && (t.pathname = e)
    }
    return t
}

function uE(e, t, n, r) {
    r === void 0 && (r = {});
    let {
        window: o = document.defaultView,
        v5Compat: i = !1
    } = r, s = o.history, l = zn.Pop, a = null, u = c();
    u == null && (u = 0, s.replaceState(Zs({}, s.state, {
        idx: u
    }), ""));

    function c() {
        return (s.state || {
            idx: null
        }).idx
    }

    function d() {
        l = zn.Pop;
        let w = c(),
            p = w == null ? null : w - u;
        u = w, a && a({
            action: l,
            location: g.location,
            delta: p
        })
    }

    function h(w, p) {
        l = zn.Push;
        let m = Su(g.location, w, p);
        u = c() + 1;
        let y = Af(m, u),
            E = g.createHref(m);
        try {
            s.pushState(y, "", E)
        } catch (C) {
            if (C instanceof DOMException && C.name === "DataCloneError") throw C;
            o.location.assign(E)
        }
        i && a && a({
            action: l,
            location: g.location,
            delta: 1
        })
    }

    function f(w, p) {
        l = zn.Replace;
        let m = Su(g.location, w, p);
        u = c();
        let y = Af(m, u),
            E = g.createHref(m);
        s.replaceState(y, "", E), i && a && a({
            action: l,
            location: g.location,
            delta: 0
        })
    }

    function v(w) {
        let p = o.location.origin !== "null" ? o.location.origin : o.location.href,
            m = typeof w == "string" ? w : $g(w);
        return m = m.replace(/ $/, "%20"), tt(p, "No window.location.(origin|href) available to create URL for href: " + m), new URL(m, p)
    }
    let g = {
        get action() {
            return l
        },
        get location() {
            return e(o, s)
        },
        listen(w) {
            if (a) throw new Error("A history only accepts one active listener");
            return o.addEventListener(Lf, d), a = w, () => {
                o.removeEventListener(Lf, d), a = null
            }
        },
        createHref(w) {
            return t(o, w)
        },
        createURL: v,
        encodeLocation(w) {
            let p = v(w);
            return {
                pathname: p.pathname,
                search: p.search,
                hash: p.hash
            }
        },
        push: h,
        replace: f,
        go(w) {
            return s.go(w)
        }
    };
    return g
}
var Mf;
(function(e) {
    e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error"
})(Mf || (Mf = {}));

function cE(e, t, n) {
    return n === void 0 && (n = "/"), dE(e, t, n, !1)
}

function dE(e, t, n, r) {
    let o = typeof t == "string" ? Tl(t) : t,
        i = Vg(o.pathname || "/", n);
    if (i == null) return null;
    let s = Bg(e);
    fE(s);
    let l = null;
    for (let a = 0; l == null && a < s.length; ++a) {
        let u = CE(i);
        l = SE(s[a], u, r)
    }
    return l
}

function Bg(e, t, n, r) {
    t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
    let o = (i, s, l) => {
        let a = {
            relativePath: l === void 0 ? i.path || "" : l,
            caseSensitive: i.caseSensitive === !0,
            childrenIndex: s,
            route: i
        };
        a.relativePath.startsWith("/") && (tt(a.relativePath.startsWith(r), 'Absolute route path "' + a.relativePath + '" nested under path ' + ('"' + r + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), a.relativePath = a.relativePath.slice(r.length));
        let u = Zr([r, a.relativePath]),
            c = n.concat(a);
        i.children && i.children.length > 0 && (tt(i.index !== !0, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + u + '".')), Bg(i.children, t, c, u)), !(i.path == null && !i.index) && t.push({
            path: u,
            score: wE(u, i.index),
            routesMeta: c
        })
    };
    return e.forEach((i, s) => {
        var l;
        if (i.path === "" || !((l = i.path) != null && l.includes("?"))) o(i, s);
        else
            for (let a of Ug(i.path)) o(i, s, a)
    }), t
}

function Ug(e) {
    let t = e.split("/");
    if (t.length === 0) return [];
    let [n, ...r] = t, o = n.endsWith("?"), i = n.replace(/\?$/, "");
    if (r.length === 0) return o ? [i, ""] : [i];
    let s = Ug(r.join("/")),
        l = [];
    return l.push(...s.map(a => a === "" ? i : [i, a].join("/"))), o && l.push(...s), l.map(a => e.startsWith("/") && a === "" ? "/" : a)
}

function fE(e) {
    e.sort((t, n) => t.score !== n.score ? n.score - t.score : xE(t.routesMeta.map(r => r.childrenIndex), n.routesMeta.map(r => r.childrenIndex)))
}
const pE = /^:[\w-]+$/,
    hE = 3,
    mE = 2,
    gE = 1,
    vE = 10,
    yE = -2,
    _f = e => e === "*";

function wE(e, t) {
    let n = e.split("/"),
        r = n.length;
    return n.some(_f) && (r += yE), t && (r += mE), n.filter(o => !_f(o)).reduce((o, i) => o + (pE.test(i) ? hE : i === "" ? gE : vE), r)
}

function xE(e, t) {
    return e.length === t.length && e.slice(0, -1).every((r, o) => r === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0
}

function SE(e, t, n) {
    let {
        routesMeta: r
    } = e, o = {}, i = "/", s = [];
    for (let l = 0; l < r.length; ++l) {
        let a = r[l],
            u = l === r.length - 1,
            c = i === "/" ? t : t.slice(i.length) || "/",
            d = If({
                path: a.relativePath,
                caseSensitive: a.caseSensitive,
                end: u
            }, c),
            h = a.route;
        if (!d && u && n && !r[r.length - 1].route.index && (d = If({
                path: a.relativePath,
                caseSensitive: a.caseSensitive,
                end: !1
            }, c)), !d) return null;
        Object.assign(o, d.params), s.push({
            params: o,
            pathname: Zr([i, d.pathname]),
            pathnameBase: bE(Zr([i, d.pathnameBase])),
            route: h
        }), d.pathnameBase !== "/" && (i = Zr([i, d.pathnameBase]))
    }
    return s
}

function If(e, t) {
    typeof e == "string" && (e = {
        path: e,
        caseSensitive: !1,
        end: !0
    });
    let [n, r] = EE(e.path, e.caseSensitive, e.end), o = t.match(n);
    if (!o) return null;
    let i = o[0],
        s = i.replace(/(.)\/+$/, "$1"),
        l = o.slice(1);
    return {
        params: r.reduce((u, c, d) => {
            let {
                paramName: h,
                isOptional: f
            } = c;
            if (h === "*") {
                let g = l[d] || "";
                s = i.slice(0, i.length - g.length).replace(/(.)\/+$/, "$1")
            }
            const v = l[d];
            return f && !v ? u[h] = void 0 : u[h] = (v || "").replace(/%2F/g, "/"), u
        }, {}),
        pathname: i,
        pathnameBase: s,
        pattern: e
    }
}

function EE(e, t, n) {
    t === void 0 && (t = !1), n === void 0 && (n = !0), zg(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
    let r = [],
        o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (s, l, a) => (r.push({
            paramName: l,
            isOptional: a != null
        }), a ? "/?([^\\/]+)?" : "/([^\\/]+)"));
    return e.endsWith("*") ? (r.push({
        paramName: "*"
    }), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), r]
}

function CE(e) {
    try {
        return e.split("/").map(t => decodeURIComponent(t).replace(/\//g, "%2F")).join("/")
    } catch (t) {
        return zg(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e
    }
}

function Vg(e, t) {
    if (t === "/") return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length,
        r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/"
}
const Zr = e => e.join("/").replace(/\/\/+/g, "/"),
    bE = e => e.replace(/\/+$/, "").replace(/^\/*/, "/");

function kE(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e
}
const Hg = ["post", "put", "patch", "delete"];
new Set(Hg);
const PE = ["get", ...Hg];
new Set(PE);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Js() {
    return Js = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, Js.apply(this, arguments)
}
const TE = x.createContext(null),
    NE = x.createContext(null),
    Wg = x.createContext(null),
    Nl = x.createContext(null),
    Rl = x.createContext({
        outlet: null,
        matches: [],
        isDataRoute: !1
    }),
    Qg = x.createContext(null);

function zc() {
    return x.useContext(Nl) != null
}

function Kg() {
    return zc() || tt(!1), x.useContext(Nl).location
}

function RE(e, t) {
    return OE(e, t)
}

function OE(e, t, n, r) {
    zc() || tt(!1);
    let {
        navigator: o
    } = x.useContext(Wg), {
        matches: i
    } = x.useContext(Rl), s = i[i.length - 1], l = s ? s.params : {};
    s && s.pathname;
    let a = s ? s.pathnameBase : "/";
    s && s.route;
    let u = Kg(),
        c;
    if (t) {
        var d;
        let w = typeof t == "string" ? Tl(t) : t;
        a === "/" || (d = w.pathname) != null && d.startsWith(a) || tt(!1), c = w
    } else c = u;
    let h = c.pathname || "/",
        f = h;
    if (a !== "/") {
        let w = a.replace(/^\//, "").split("/");
        f = "/" + h.replace(/^\//, "").split("/").slice(w.length).join("/")
    }
    let v = cE(e, {
            pathname: f
        }),
        g = _E(v && v.map(w => Object.assign({}, w, {
            params: Object.assign({}, l, w.params),
            pathname: Zr([a, o.encodeLocation ? o.encodeLocation(w.pathname).pathname : w.pathname]),
            pathnameBase: w.pathnameBase === "/" ? a : Zr([a, o.encodeLocation ? o.encodeLocation(w.pathnameBase).pathname : w.pathnameBase])
        })), i, n, r);
    return t && g ? x.createElement(Nl.Provider, {
        value: {
            location: Js({
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default"
            }, c),
            navigationType: zn.Pop
        }
    }, g) : g
}

function jE() {
    let e = zE(),
        t = kE(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
        n = e instanceof Error ? e.stack : null,
        o = {
            padding: "0.5rem",
            backgroundColor: "rgba(200,200,200, 0.5)"
        };
    return x.createElement(x.Fragment, null, x.createElement("h2", null, "Unexpected Application Error!"), x.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, t), n ? x.createElement("pre", {
        style: o
    }, n) : null, null)
}
const LE = x.createElement(jE, null);
class AE extends x.Component {
    constructor(t) {
        super(t), this.state = {
            location: t.location,
            revalidation: t.revalidation,
            error: t.error
        }
    }
    static getDerivedStateFromError(t) {
        return {
            error: t
        }
    }
    static getDerivedStateFromProps(t, n) {
        return n.location !== t.location || n.revalidation !== "idle" && t.revalidation === "idle" ? {
            error: t.error,
            location: t.location,
            revalidation: t.revalidation
        } : {
            error: t.error !== void 0 ? t.error : n.error,
            location: n.location,
            revalidation: t.revalidation || n.revalidation
        }
    }
    componentDidCatch(t, n) {
        console.error("React Router caught the following error during render", t, n)
    }
    render() {
        return this.state.error !== void 0 ? x.createElement(Rl.Provider, {
            value: this.props.routeContext
        }, x.createElement(Qg.Provider, {
            value: this.state.error,
            children: this.props.component
        })) : this.props.children
    }
}

function ME(e) {
    let {
        routeContext: t,
        match: n,
        children: r
    } = e, o = x.useContext(TE);
    return o && o.static && o.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = n.route.id), x.createElement(Rl.Provider, {
        value: t
    }, r)
}

function _E(e, t, n, r) {
    var o;
    if (t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null) {
        var i;
        if (!n) return null;
        if (n.errors) e = n.matches;
        else if ((i = r) != null && i.v7_partialHydration && t.length === 0 && !n.initialized && n.matches.length > 0) e = n.matches;
        else return null
    }
    let s = e,
        l = (o = n) == null ? void 0 : o.errors;
    if (l != null) {
        let c = s.findIndex(d => d.route.id && (l == null ? void 0 : l[d.route.id]) !== void 0);
        c >= 0 || tt(!1), s = s.slice(0, Math.min(s.length, c + 1))
    }
    let a = !1,
        u = -1;
    if (n && r && r.v7_partialHydration)
        for (let c = 0; c < s.length; c++) {
            let d = s[c];
            if ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (u = c), d.route.id) {
                let {
                    loaderData: h,
                    errors: f
                } = n, v = d.route.loader && h[d.route.id] === void 0 && (!f || f[d.route.id] === void 0);
                if (d.route.lazy || v) {
                    a = !0, u >= 0 ? s = s.slice(0, u + 1) : s = [s[0]];
                    break
                }
            }
        }
    return s.reduceRight((c, d, h) => {
        let f, v = !1,
            g = null,
            w = null;
        n && (f = l && d.route.id ? l[d.route.id] : void 0, g = d.route.errorElement || LE, a && (u < 0 && h === 0 ? (v = !0, w = null) : u === h && (v = !0, w = d.route.hydrateFallbackElement || null)));
        let p = t.concat(s.slice(0, h + 1)),
            m = () => {
                let y;
                return f ? y = g : v ? y = w : d.route.Component ? y = x.createElement(d.route.Component, null) : d.route.element ? y = d.route.element : y = c, x.createElement(ME, {
                    match: d,
                    routeContext: {
                        outlet: c,
                        matches: p,
                        isDataRoute: n != null
                    },
                    children: y
                })
            };
        return n && (d.route.ErrorBoundary || d.route.errorElement || h === 0) ? x.createElement(AE, {
            location: n.location,
            revalidation: n.revalidation,
            component: g,
            error: f,
            children: m(),
            routeContext: {
                outlet: null,
                matches: p,
                isDataRoute: !0
            }
        }) : m()
    }, null)
}
var Eu = function(e) {
    return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e
}(Eu || {});

function IE(e) {
    let t = x.useContext(NE);
    return t || tt(!1), t
}

function DE(e) {
    let t = x.useContext(Rl);
    return t || tt(!1), t
}

function FE(e) {
    let t = DE(),
        n = t.matches[t.matches.length - 1];
    return n.route.id || tt(!1), n.route.id
}

function zE() {
    var e;
    let t = x.useContext(Qg),
        n = IE(Eu.UseRouteError),
        r = FE(Eu.UseRouteError);
    return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r]
}

function $E(e, t) {
    e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath
}

function Cu(e) {
    tt(!1)
}

function BE(e) {
    let {
        basename: t = "/",
        children: n = null,
        location: r,
        navigationType: o = zn.Pop,
        navigator: i,
        static: s = !1,
        future: l
    } = e;
    zc() && tt(!1);
    let a = t.replace(/^\/*/, "/"),
        u = x.useMemo(() => ({
            basename: a,
            navigator: i,
            static: s,
            future: Js({
                v7_relativeSplatPath: !1
            }, l)
        }), [a, l, i, s]);
    typeof r == "string" && (r = Tl(r));
    let {
        pathname: c = "/",
        search: d = "",
        hash: h = "",
        state: f = null,
        key: v = "default"
    } = r, g = x.useMemo(() => {
        let w = Vg(c, a);
        return w == null ? null : {
            location: {
                pathname: w,
                search: d,
                hash: h,
                state: f,
                key: v
            },
            navigationType: o
        }
    }, [a, c, d, h, f, v, o]);
    return g == null ? null : x.createElement(Wg.Provider, {
        value: u
    }, x.createElement(Nl.Provider, {
        children: n,
        value: g
    }))
}

function UE(e) {
    let {
        children: t,
        location: n
    } = e;
    return RE(bu(t), n)
}
new Promise(() => {});

function bu(e, t) {
    t === void 0 && (t = []);
    let n = [];
    return x.Children.forEach(e, (r, o) => {
        if (!x.isValidElement(r)) return;
        let i = [...t, o];
        if (r.type === x.Fragment) {
            n.push.apply(n, bu(r.props.children, i));
            return
        }
        r.type !== Cu && tt(!1), !r.props.index || !r.props.children || tt(!1);
        let s = {
            id: r.props.id || i.join("-"),
            caseSensitive: r.props.caseSensitive,
            element: r.props.element,
            Component: r.props.Component,
            index: r.props.index,
            path: r.props.path,
            loader: r.props.loader,
            action: r.props.action,
            errorElement: r.props.errorElement,
            ErrorBoundary: r.props.ErrorBoundary,
            hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
            shouldRevalidate: r.props.shouldRevalidate,
            handle: r.props.handle,
            lazy: r.props.lazy
        };
        r.props.children && (s.children = bu(r.props.children, i)), n.push(s)
    }), n
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const VE = "6";
try {
    window.__reactRouterVersion = VE
} catch {}
const HE = "startTransition",
    Df = fp[HE];

function WE(e) {
    let {
        basename: t,
        children: n,
        future: r,
        window: o
    } = e, i = x.useRef();
    i.current == null && (i.current = lE({
        window: o,
        v5Compat: !0
    }));
    let s = i.current,
        [l, a] = x.useState({
            action: s.action,
            location: s.location
        }),
        {
            v7_startTransition: u
        } = r || {},
        c = x.useCallback(d => {
            u && Df ? Df(() => a(d)) : a(d)
        }, [a, u]);
    return x.useLayoutEffect(() => s.listen(c), [s, c]), x.useEffect(() => $E(r), [r]), x.createElement(BE, {
        basename: t,
        children: n,
        location: l.location,
        navigationType: l.action,
        navigator: s,
        future: r
    })
}
var Ff;
(function(e) {
    e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState"
})(Ff || (Ff = {}));
var zf;
(function(e) {
    e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration"
})(zf || (zf = {}));
const QE = "https://sassets.noodledit.com/pages/logo_mydailysurge.svg",
    Gg = () => S.jsx("div", {
        className: "flex items-center justify-center",
        children: S.jsx("img", {
            src: QE,
            alt: "My Daily Surge",
            className: "h-4",
            style: {
                filter: "brightness(0) invert(1) brightness(0.41)"
            }
        })
    }),
    Yg = x.forwardRef(({
        className: e,
        children: t,
        isLoading: n,
        ...r
    }, o) => S.jsx("button", {
        ref: o,
        className: or("w-full h-16 rounded-lg bg-primary text-primary-foreground", "font-inter font-medium text-xl", "shadow-cta hover:shadow-lg transition-all duration-300", "hover:brightness-110 active:scale-[0.98]", "disabled:opacity-50 disabled:cursor-not-allowed", "flex items-center justify-center gap-2", e),
        disabled: n,
        ...r,
        children: n ? S.jsx("div", {
            className: "w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"
        }) : t
    }));
Yg.displayName = "CTAButton";

function KE(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
}

function $f(e) {
    return KE(e) || Array.isArray(e)
}

function GE() {
    return !!(typeof window < "u" && window.document && window.document.createElement)
}

function $c(e, t) {
    const n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    const o = JSON.stringify(Object.keys(e.breakpoints || {})),
        i = JSON.stringify(Object.keys(t.breakpoints || {}));
    return o !== i ? !1 : n.every(s => {
        const l = e[s],
            a = t[s];
        return typeof l == "function" ? `${l}` == `${a}` : !$f(l) || !$f(a) ? l === a : $c(l, a)
    })
}

function Bf(e) {
    return e.concat().sort((t, n) => t.name > n.name ? 1 : -1).map(t => t.options)
}

function YE(e, t) {
    if (e.length !== t.length) return !1;
    const n = Bf(e),
        r = Bf(t);
    return n.every((o, i) => {
        const s = r[i];
        return $c(o, s)
    })
}

function Bc(e) {
    return typeof e == "number"
}

function ku(e) {
    return typeof e == "string"
}

function Ol(e) {
    return typeof e == "boolean"
}

function Uf(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
}

function he(e) {
    return Math.abs(e)
}

function Uc(e) {
    return Math.sign(e)
}

function Xo(e, t) {
    return he(e - t)
}

function qE(e, t) {
    if (e === 0 || t === 0 || he(e) <= he(t)) return 0;
    const n = Xo(he(e), he(t));
    return he(n / e)
}

function XE(e) {
    return Math.round(e * 100) / 100
}

function wi(e) {
    return xi(e).map(Number)
}

function Ft(e) {
    return e[Li(e)]
}

function Li(e) {
    return Math.max(0, e.length - 1)
}

function Vc(e, t) {
    return t === Li(e)
}

function Vf(e, t = 0) {
    return Array.from(Array(e), (n, r) => t + r)
}

function xi(e) {
    return Object.keys(e)
}

function qg(e, t) {
    return [e, t].reduce((n, r) => (xi(r).forEach(o => {
        const i = n[o],
            s = r[o],
            l = Uf(i) && Uf(s);
        n[o] = l ? qg(i, s) : s
    }), n), {})
}

function Pu(e, t) {
    return typeof t.MouseEvent < "u" && e instanceof t.MouseEvent
}

function ZE(e, t) {
    const n = {
        start: r,
        center: o,
        end: i
    };

    function r() {
        return 0
    }

    function o(a) {
        return i(a) / 2
    }

    function i(a) {
        return t - a
    }

    function s(a, u) {
        return ku(e) ? n[e](a) : e(t, a, u)
    }
    return {
        measure: s
    }
}

function Si() {
    let e = [];

    function t(o, i, s, l = {
        passive: !0
    }) {
        let a;
        if ("addEventListener" in o) o.addEventListener(i, s, l), a = () => o.removeEventListener(i, s, l);
        else {
            const u = o;
            u.addListener(s), a = () => u.removeListener(s)
        }
        return e.push(a), r
    }

    function n() {
        e = e.filter(o => o())
    }
    const r = {
        add: t,
        clear: n
    };
    return r
}

function JE(e, t, n, r) {
    const o = Si(),
        i = 1e3 / 60;
    let s = null,
        l = 0,
        a = 0;

    function u() {
        o.add(e, "visibilitychange", () => {
            e.hidden && v()
        })
    }

    function c() {
        f(), o.clear()
    }

    function d(w) {
        if (!a) return;
        s || (s = w, n(), n());
        const p = w - s;
        for (s = w, l += p; l >= i;) n(), l -= i;
        const m = l / i;
        r(m), a && (a = t.requestAnimationFrame(d))
    }

    function h() {
        a || (a = t.requestAnimationFrame(d))
    }

    function f() {
        t.cancelAnimationFrame(a), s = null, l = 0, a = 0
    }

    function v() {
        s = null, l = 0
    }
    return {
        init: u,
        destroy: c,
        start: h,
        stop: f,
        update: n,
        render: r
    }
}

function eC(e, t) {
    const n = t === "rtl",
        r = e === "y",
        o = r ? "y" : "x",
        i = r ? "x" : "y",
        s = !r && n ? -1 : 1,
        l = c(),
        a = d();

    function u(v) {
        const {
            height: g,
            width: w
        } = v;
        return r ? g : w
    }

    function c() {
        return r ? "top" : n ? "right" : "left"
    }

    function d() {
        return r ? "bottom" : n ? "left" : "right"
    }

    function h(v) {
        return v * s
    }
    return {
        scroll: o,
        cross: i,
        startEdge: l,
        endEdge: a,
        measureSize: u,
        direction: h
    }
}

function kr(e = 0, t = 0) {
    const n = he(e - t);

    function r(u) {
        return u < e
    }

    function o(u) {
        return u > t
    }

    function i(u) {
        return r(u) || o(u)
    }

    function s(u) {
        return i(u) ? r(u) ? e : t : u
    }

    function l(u) {
        return n ? u - n * Math.ceil((u - t) / n) : u
    }
    return {
        length: n,
        max: t,
        min: e,
        constrain: s,
        reachedAny: i,
        reachedMax: o,
        reachedMin: r,
        removeOffset: l
    }
}

function Xg(e, t, n) {
    const {
        constrain: r
    } = kr(0, e), o = e + 1;
    let i = s(t);

    function s(h) {
        return n ? he((o + h) % o) : r(h)
    }

    function l() {
        return i
    }

    function a(h) {
        return i = s(h), d
    }

    function u(h) {
        return c().set(l() + h)
    }

    function c() {
        return Xg(e, l(), n)
    }
    const d = {
        get: l,
        set: a,
        add: u,
        clone: c
    };
    return d
}

function tC(e, t, n, r, o, i, s, l, a, u, c, d, h, f, v, g, w, p, m) {
    const {
        cross: y,
        direction: E
    } = e, C = ["INPUT", "SELECT", "TEXTAREA"], k = {
        passive: !1
    }, b = Si(), T = Si(), j = kr(50, 225).constrain(f.measure(20)), L = {
        mouse: 300,
        touch: 400
    }, D = {
        mouse: 500,
        touch: 600
    }, I = v ? 43 : 25;
    let W = !1,
        O = 0,
        V = 0,
        U = !1,
        H = !1,
        N = !1,
        P = !1;

    function M(B) {
        if (!m) return;

        function J(be) {
            (Ol(m) || m(B, be)) && ve(be)
        }
        const ae = t;
        b.add(ae, "dragstart", be => be.preventDefault(), k).add(ae, "touchmove", () => {}, k).add(ae, "touchend", () => {}).add(ae, "touchstart", J).add(ae, "mousedown", J).add(ae, "touchcancel", ye).add(ae, "contextmenu", ye).add(ae, "click", Ne, !0)
    }

    function z() {
        b.clear(), T.clear()
    }

    function F() {
        const B = P ? n : t;
        T.add(B, "touchmove", Y, k).add(B, "touchend", ye).add(B, "mousemove", Y, k).add(B, "mouseup", ye)
    }

    function Q(B) {
        const J = B.nodeName || "";
        return C.includes(J)
    }

    function K() {
        return (v ? D : L)[P ? "mouse" : "touch"]
    }

    function ie(B, J) {
        const ae = d.add(Uc(B) * -1),
            be = c.byDistance(B, !v).distance;
        return v || he(B) < j ? be : w && J ? be * .5 : c.byIndex(ae.get(), 0).distance
    }

    function ve(B) {
        const J = Pu(B, r);
        P = J, N = v && J && !B.buttons && W, W = Xo(o.get(), s.get()) >= 2, !(J && B.button !== 0) && (Q(B.target) || (U = !0, i.pointerDown(B), u.useFriction(0).useDuration(0), o.set(s), F(), O = i.readPoint(B), V = i.readPoint(B, y), h.emit("pointerDown")))
    }

    function Y(B) {
        if (!Pu(B, r) && B.touches.length >= 2) return ye(B);
        const ae = i.readPoint(B),
            be = i.readPoint(B, y),
            $e = Xo(ae, O),
            rt = Xo(be, V);
        if (!H && !P && (!B.cancelable || (H = $e > rt, !H))) return ye(B);
        const ot = i.pointerMove(B);
        $e > g && (N = !0), u.useFriction(.3).useDuration(.75), l.start(), o.add(E(ot)), B.preventDefault()
    }

    function ye(B) {
        const ae = c.byDistance(0, !1).index !== d.get(),
            be = i.pointerUp(B) * K(),
            $e = ie(E(be), ae),
            rt = qE(be, $e),
            ot = I - 10 * rt,
            Be = p + rt / 50;
        H = !1, U = !1, T.clear(), u.useDuration(ot).useFriction(Be), a.distance($e, !v), P = !1, h.emit("pointerUp")
    }

    function Ne(B) {
        N && (B.stopPropagation(), B.preventDefault(), N = !1)
    }

    function Ee() {
        return U
    }
    return {
        init: M,
        destroy: z,
        pointerDown: Ee
    }
}

function nC(e, t) {
    let r, o;

    function i(d) {
        return d.timeStamp
    }

    function s(d, h) {
        const v = `client${(h||e.scroll)==="x"?"X":"Y"}`;
        return (Pu(d, t) ? d : d.touches[0])[v]
    }

    function l(d) {
        return r = d, o = d, s(d)
    }

    function a(d) {
        const h = s(d) - s(o),
            f = i(d) - i(r) > 170;
        return o = d, f && (r = d), h
    }

    function u(d) {
        if (!r || !o) return 0;
        const h = s(o) - s(r),
            f = i(d) - i(r),
            v = i(d) - i(o) > 170,
            g = h / f;
        return f && !v && he(g) > .1 ? g : 0
    }
    return {
        pointerDown: l,
        pointerMove: a,
        pointerUp: u,
        readPoint: s
    }
}

function rC() {
    function e(n) {
        const {
            offsetTop: r,
            offsetLeft: o,
            offsetWidth: i,
            offsetHeight: s
        } = n;
        return {
            top: r,
            right: o + i,
            bottom: r + s,
            left: o,
            width: i,
            height: s
        }
    }
    return {
        measure: e
    }
}

function oC(e) {
    function t(r) {
        return e * (r / 100)
    }
    return {
        measure: t
    }
}

function iC(e, t, n, r, o, i, s) {
    const l = [e].concat(r);
    let a, u, c = [],
        d = !1;

    function h(w) {
        return o.measureSize(s.measure(w))
    }

    function f(w) {
        if (!i) return;
        u = h(e), c = r.map(h);

        function p(m) {
            for (const y of m) {
                if (d) return;
                const E = y.target === e,
                    C = r.indexOf(y.target),
                    k = E ? u : c[C],
                    b = h(E ? e : r[C]);
                if (he(b - k) >= .5) {
                    w.reInit(), t.emit("resize");
                    break
                }
            }
        }
        a = new ResizeObserver(m => {
            (Ol(i) || i(w, m)) && p(m)
        }), n.requestAnimationFrame(() => {
            l.forEach(m => a.observe(m))
        })
    }

    function v() {
        d = !0, a && a.disconnect()
    }
    return {
        init: f,
        destroy: v
    }
}

function sC(e, t, n, r, o, i) {
    let s = 0,
        l = 0,
        a = o,
        u = i,
        c = e.get(),
        d = 0;

    function h() {
        const k = r.get() - e.get(),
            b = !a;
        let T = 0;
        return b ? (s = 0, n.set(r), e.set(r), T = k) : (n.set(e), s += k / a, s *= u, c += s, e.add(s), T = c - d), l = Uc(T), d = c, C
    }

    function f() {
        const k = r.get() - t.get();
        return he(k) < .001
    }

    function v() {
        return a
    }

    function g() {
        return l
    }

    function w() {
        return s
    }

    function p() {
        return y(o)
    }

    function m() {
        return E(i)
    }

    function y(k) {
        return a = k, C
    }

    function E(k) {
        return u = k, C
    }
    const C = {
        direction: g,
        duration: v,
        velocity: w,
        seek: h,
        settled: f,
        useBaseFriction: m,
        useBaseDuration: p,
        useFriction: E,
        useDuration: y
    };
    return C
}

function lC(e, t, n, r, o) {
    const i = o.measure(10),
        s = o.measure(50),
        l = kr(.1, .99);
    let a = !1;

    function u() {
        return !(a || !e.reachedAny(n.get()) || !e.reachedAny(t.get()))
    }

    function c(f) {
        if (!u()) return;
        const v = e.reachedMin(t.get()) ? "min" : "max",
            g = he(e[v] - t.get()),
            w = n.get() - t.get(),
            p = l.constrain(g / s);
        n.subtract(w * p), !f && he(w) < i && (n.set(e.constrain(n.get())), r.useDuration(25).useBaseFriction())
    }

    function d(f) {
        a = !f
    }
    return {
        shouldConstrain: u,
        constrain: c,
        toggleActive: d
    }
}

function aC(e, t, n, r, o) {
    const i = kr(-t + e, 0),
        s = d(),
        l = c(),
        a = h();

    function u(v, g) {
        return Xo(v, g) <= 1
    }

    function c() {
        const v = s[0],
            g = Ft(s),
            w = s.lastIndexOf(v),
            p = s.indexOf(g) + 1;
        return kr(w, p)
    }

    function d() {
        return n.map((v, g) => {
            const {
                min: w,
                max: p
            } = i, m = i.constrain(v), y = !g, E = Vc(n, g);
            return y ? p : E || u(w, m) ? w : u(p, m) ? p : m
        }).map(v => parseFloat(v.toFixed(3)))
    }

    function h() {
        if (t <= e + o) return [i.max];
        if (r === "keepSnaps") return s;
        const {
            min: v,
            max: g
        } = l;
        return s.slice(v, g)
    }
    return {
        snapsContained: a,
        scrollContainLimit: l
    }
}

function uC(e, t, n) {
    const r = t[0],
        o = n ? r - e : Ft(t);
    return {
        limit: kr(o, r)
    }
}

function cC(e, t, n, r) {
    const i = t.min + .1,
        s = t.max + .1,
        {
            reachedMin: l,
            reachedMax: a
        } = kr(i, s);

    function u(h) {
        return h === 1 ? a(n.get()) : h === -1 ? l(n.get()) : !1
    }

    function c(h) {
        if (!u(h)) return;
        const f = e * (h * -1);
        r.forEach(v => v.add(f))
    }
    return {
        loop: c
    }
}

function dC(e) {
    const {
        max: t,
        length: n
    } = e;

    function r(i) {
        const s = i - t;
        return n ? s / -n : 0
    }
    return {
        get: r
    }
}

function fC(e, t, n, r, o) {
    const {
        startEdge: i,
        endEdge: s
    } = e, {
        groupSlides: l
    } = o, a = d().map(t.measure), u = h(), c = f();

    function d() {
        return l(r).map(g => Ft(g)[s] - g[0][i]).map(he)
    }

    function h() {
        return r.map(g => n[i] - g[i]).map(g => -he(g))
    }

    function f() {
        return l(u).map(g => g[0]).map((g, w) => g + a[w])
    }
    return {
        snaps: u,
        snapsAligned: c
    }
}

function pC(e, t, n, r, o, i) {
    const {
        groupSlides: s
    } = o, {
        min: l,
        max: a
    } = r, u = c();

    function c() {
        const h = s(i),
            f = !e || t === "keepSnaps";
        return n.length === 1 ? [i] : f ? h : h.slice(l, a).map((v, g, w) => {
            const p = !g,
                m = Vc(w, g);
            if (p) {
                const y = Ft(w[0]) + 1;
                return Vf(y)
            }
            if (m) {
                const y = Li(i) - Ft(w)[0] + 1;
                return Vf(y, Ft(w)[0])
            }
            return v
        })
    }
    return {
        slideRegistry: u
    }
}

function hC(e, t, n, r, o) {
    const {
        reachedAny: i,
        removeOffset: s,
        constrain: l
    } = r;

    function a(v) {
        return v.concat().sort((g, w) => he(g) - he(w))[0]
    }

    function u(v) {
        const g = e ? s(v) : l(v),
            w = t.map((m, y) => ({
                diff: c(m - g, 0),
                index: y
            })).sort((m, y) => he(m.diff) - he(y.diff)),
            {
                index: p
            } = w[0];
        return {
            index: p,
            distance: g
        }
    }

    function c(v, g) {
        const w = [v, v + n, v - n];
        if (!e) return v;
        if (!g) return a(w);
        const p = w.filter(m => Uc(m) === g);
        return p.length ? a(p) : Ft(w) - n
    }

    function d(v, g) {
        const w = t[v] - o.get(),
            p = c(w, g);
        return {
            index: v,
            distance: p
        }
    }

    function h(v, g) {
        const w = o.get() + v,
            {
                index: p,
                distance: m
            } = u(w),
            y = !e && i(w);
        if (!g || y) return {
            index: p,
            distance: v
        };
        const E = t[p] - m,
            C = v + c(E, 0);
        return {
            index: p,
            distance: C
        }
    }
    return {
        byDistance: h,
        byIndex: d,
        shortcut: c
    }
}

function mC(e, t, n, r, o, i, s) {
    function l(d) {
        const h = d.distance,
            f = d.index !== t.get();
        i.add(h), h && (r.duration() ? e.start() : (e.update(), e.render(1), e.update())), f && (n.set(t.get()), t.set(d.index), s.emit("select"))
    }

    function a(d, h) {
        const f = o.byDistance(d, h);
        l(f)
    }

    function u(d, h) {
        const f = t.clone().set(d),
            v = o.byIndex(f.get(), h);
        l(v)
    }
    return {
        distance: a,
        index: u
    }
}

function gC(e, t, n, r, o, i, s, l) {
    const a = {
        passive: !0,
        capture: !0
    };
    let u = 0;

    function c(f) {
        if (!l) return;

        function v(g) {
            if (new Date().getTime() - u > 10) return;
            s.emit("slideFocusStart"), e.scrollLeft = 0;
            const m = n.findIndex(y => y.includes(g));
            Bc(m) && (o.useDuration(0), r.index(m, 0), s.emit("slideFocus"))
        }
        i.add(document, "keydown", d, !1), t.forEach((g, w) => {
            i.add(g, "focus", p => {
                (Ol(l) || l(f, p)) && v(w)
            }, a)
        })
    }

    function d(f) {
        f.code === "Tab" && (u = new Date().getTime())
    }
    return {
        init: c
    }
}

function $o(e) {
    let t = e;

    function n() {
        return t
    }

    function r(a) {
        t = s(a)
    }

    function o(a) {
        t += s(a)
    }

    function i(a) {
        t -= s(a)
    }

    function s(a) {
        return Bc(a) ? a : a.get()
    }
    return {
        get: n,
        set: r,
        add: o,
        subtract: i
    }
}

function Zg(e, t) {
    const n = e.scroll === "x" ? s : l,
        r = t.style;
    let o = null,
        i = !1;

    function s(h) {
        return `translate3d(${h}px,0px,0px)`
    }

    function l(h) {
        return `translate3d(0px,${h}px,0px)`
    }

    function a(h) {
        if (i) return;
        const f = XE(e.direction(h));
        f !== o && (r.transform = n(f), o = f)
    }

    function u(h) {
        i = !h
    }

    function c() {
        i || (r.transform = "", t.getAttribute("style") || t.removeAttribute("style"))
    }
    return {
        clear: c,
        to: a,
        toggleActive: u
    }
}

function vC(e, t, n, r, o, i, s, l, a) {
    const c = wi(o),
        d = wi(o).reverse(),
        h = p().concat(m());

    function f(b, T) {
        return b.reduce((j, L) => j - o[L], T)
    }

    function v(b, T) {
        return b.reduce((j, L) => f(j, T) > 0 ? j.concat([L]) : j, [])
    }

    function g(b) {
        return i.map((T, j) => ({
            start: T - r[j] + .5 + b,
            end: T + t - .5 + b
        }))
    }

    function w(b, T, j) {
        const L = g(T);
        return b.map(D => {
            const I = j ? 0 : -n,
                W = j ? n : 0,
                O = j ? "end" : "start",
                V = L[D][O];
            return {
                index: D,
                loopPoint: V,
                slideLocation: $o(-1),
                translate: Zg(e, a[D]),
                target: () => l.get() > V ? I : W
            }
        })
    }

    function p() {
        const b = s[0],
            T = v(d, b);
        return w(T, n, !1)
    }

    function m() {
        const b = t - s[0] - 1,
            T = v(c, b);
        return w(T, -n, !0)
    }

    function y() {
        return h.every(({
            index: b
        }) => {
            const T = c.filter(j => j !== b);
            return f(T, t) <= .1
        })
    }

    function E() {
        h.forEach(b => {
            const {
                target: T,
                translate: j,
                slideLocation: L
            } = b, D = T();
            D !== L.get() && (j.to(D), L.set(D))
        })
    }

    function C() {
        h.forEach(b => b.translate.clear())
    }
    return {
        canLoop: y,
        clear: C,
        loop: E,
        loopPoints: h
    }
}

function yC(e, t, n) {
    let r, o = !1;

    function i(a) {
        if (!n) return;

        function u(c) {
            for (const d of c)
                if (d.type === "childList") {
                    a.reInit(), t.emit("slidesChanged");
                    break
                }
        }
        r = new MutationObserver(c => {
            o || (Ol(n) || n(a, c)) && u(c)
        }), r.observe(e, {
            childList: !0
        })
    }

    function s() {
        r && r.disconnect(), o = !0
    }
    return {
        init: i,
        destroy: s
    }
}

function wC(e, t, n, r) {
    const o = {};
    let i = null,
        s = null,
        l, a = !1;

    function u() {
        l = new IntersectionObserver(v => {
            a || (v.forEach(g => {
                const w = t.indexOf(g.target);
                o[w] = g
            }), i = null, s = null, n.emit("slidesInView"))
        }, {
            root: e.parentElement,
            threshold: r
        }), t.forEach(v => l.observe(v))
    }

    function c() {
        l && l.disconnect(), a = !0
    }

    function d(v) {
        return xi(o).reduce((g, w) => {
            const p = parseInt(w),
                {
                    isIntersecting: m
                } = o[p];
            return (v && m || !v && !m) && g.push(p), g
        }, [])
    }

    function h(v = !0) {
        if (v && i) return i;
        if (!v && s) return s;
        const g = d(v);
        return v && (i = g), v || (s = g), g
    }
    return {
        init: u,
        destroy: c,
        get: h
    }
}

function xC(e, t, n, r, o, i) {
    const {
        measureSize: s,
        startEdge: l,
        endEdge: a
    } = e, u = n[0] && o, c = v(), d = g(), h = n.map(s), f = w();

    function v() {
        if (!u) return 0;
        const m = n[0];
        return he(t[l] - m[l])
    }

    function g() {
        if (!u) return 0;
        const m = i.getComputedStyle(Ft(r));
        return parseFloat(m.getPropertyValue(`margin-${a}`))
    }

    function w() {
        return n.map((m, y, E) => {
            const C = !y,
                k = Vc(E, y);
            return C ? h[y] + c : k ? h[y] + d : E[y + 1][l] - m[l]
        }).map(he)
    }
    return {
        slideSizes: h,
        slideSizesWithGaps: f,
        startGap: c,
        endGap: d
    }
}

function SC(e, t, n, r, o, i, s, l, a) {
    const {
        startEdge: u,
        endEdge: c,
        direction: d
    } = e, h = Bc(n);

    function f(p, m) {
        return wi(p).filter(y => y % m === 0).map(y => p.slice(y, y + m))
    }

    function v(p) {
        return p.length ? wi(p).reduce((m, y, E) => {
            const C = Ft(m) || 0,
                k = C === 0,
                b = y === Li(p),
                T = o[u] - i[C][u],
                j = o[u] - i[y][c],
                L = !r && k ? d(s) : 0,
                D = !r && b ? d(l) : 0,
                I = he(j - D - (T + L));
            return E && I > t + a && m.push(y), b && m.push(p.length), m
        }, []).map((m, y, E) => {
            const C = Math.max(E[y - 1] || 0);
            return p.slice(C, m)
        }) : []
    }

    function g(p) {
        return h ? f(p, n) : v(p)
    }
    return {
        groupSlides: g
    }
}

function EC(e, t, n, r, o, i, s) {
    const {
        align: l,
        axis: a,
        direction: u,
        startIndex: c,
        loop: d,
        duration: h,
        dragFree: f,
        dragThreshold: v,
        inViewThreshold: g,
        slidesToScroll: w,
        skipSnaps: p,
        containScroll: m,
        watchResize: y,
        watchSlides: E,
        watchDrag: C,
        watchFocus: k
    } = i, b = 2, T = rC(), j = T.measure(t), L = n.map(T.measure), D = eC(a, u), I = D.measureSize(j), W = oC(I), O = ZE(l, I), V = !d && !!m, U = d || !!m, {
        slideSizes: H,
        slideSizesWithGaps: N,
        startGap: P,
        endGap: M
    } = xC(D, j, L, n, U, o), z = SC(D, I, w, d, j, L, P, M, b), {
        snaps: F,
        snapsAligned: Q
    } = fC(D, O, j, L, z), K = -Ft(F) + Ft(N), {
        snapsContained: ie,
        scrollContainLimit: ve
    } = aC(I, K, Q, m, b), Y = V ? ie : Q, {
        limit: ye
    } = uC(K, Y, d), Ne = Xg(Li(Y), c, d), Ee = Ne.clone(), te = wi(n), B = ({
        dragHandler: Et,
        scrollBody: bo,
        scrollBounds: Rr,
        options: {
            loop: wn
        }
    }) => {
        wn || Rr.constrain(Et.pointerDown()), bo.seek()
    }, J = ({
        scrollBody: Et,
        translate: bo,
        location: Rr,
        offsetLocation: wn,
        previousLocation: xn,
        scrollLooper: _i,
        slideLooper: Sn,
        dragHandler: Ll,
        animation: Al,
        eventHandler: ko,
        scrollBounds: Ii,
        options: {
            loop: Di
        }
    }, Or) => {
        const Ct = Et.settled(),
            Ml = !Ii.shouldConstrain(),
            G = Di ? Ct : Ct && Ml,
            re = G && !Ll.pointerDown();
        re && Al.stop();
        const se = Rr.get() * Or + xn.get() * (1 - Or);
        wn.set(se), Di && (_i.loop(Et.direction()), Sn.loop()), bo.to(wn.get()), re && ko.emit("settle"), G || ko.emit("scroll")
    }, ae = JE(r, o, () => B(Co), Et => J(Co, Et)), be = .68, $e = Y[Ne.get()], rt = $o($e), ot = $o($e), Be = $o($e), Vt = $o($e), xt = sC(rt, Be, ot, Vt, h, be), Nr = hC(d, Y, K, ye, Vt), St = mC(ae, Ne, Ee, xt, Nr, Vt, s), Ai = dC(ye), Mi = Si(), Ge = wC(t, n, s, g), {
        slideRegistry: nn
    } = pC(V, m, Y, ve, z, te), jl = gC(e, n, nn, St, xt, Mi, s, k), Co = {
        ownerDocument: r,
        ownerWindow: o,
        eventHandler: s,
        containerRect: j,
        slideRects: L,
        animation: ae,
        axis: D,
        dragHandler: tC(D, e, r, o, Vt, nC(D, o), rt, ae, St, xt, Nr, Ne, s, W, f, v, p, be, C),
        eventStore: Mi,
        percentOfView: W,
        index: Ne,
        indexPrevious: Ee,
        limit: ye,
        location: rt,
        offsetLocation: Be,
        previousLocation: ot,
        options: i,
        resizeHandler: iC(t, s, o, n, D, y, T),
        scrollBody: xt,
        scrollBounds: lC(ye, Be, Vt, xt, W),
        scrollLooper: cC(K, ye, Be, [rt, Be, ot, Vt]),
        scrollProgress: Ai,
        scrollSnapList: Y.map(Ai.get),
        scrollSnaps: Y,
        scrollTarget: Nr,
        scrollTo: St,
        slideLooper: vC(D, I, K, H, N, F, Y, Be, n),
        slideFocus: jl,
        slidesHandler: yC(t, s, E),
        slidesInView: Ge,
        slideIndexes: te,
        slideRegistry: nn,
        slidesToScroll: z,
        target: Vt,
        translate: Zg(D, t)
    };
    return Co
}

function CC() {
    let e = {},
        t;

    function n(u) {
        t = u
    }

    function r(u) {
        return e[u] || []
    }

    function o(u) {
        return r(u).forEach(c => c(t, u)), a
    }

    function i(u, c) {
        return e[u] = r(u).concat([c]), a
    }

    function s(u, c) {
        return e[u] = r(u).filter(d => d !== c), a
    }

    function l() {
        e = {}
    }
    const a = {
        init: n,
        emit: o,
        off: s,
        on: i,
        clear: l
    };
    return a
}
const bC = {
    align: "center",
    axis: "x",
    container: null,
    slides: null,
    containScroll: "trimSnaps",
    direction: "ltr",
    slidesToScroll: 1,
    inViewThreshold: 0,
    breakpoints: {},
    dragFree: !1,
    dragThreshold: 10,
    loop: !1,
    skipSnaps: !1,
    duration: 25,
    startIndex: 0,
    active: !0,
    watchDrag: !0,
    watchResize: !0,
    watchSlides: !0,
    watchFocus: !0
};

function kC(e) {
    function t(i, s) {
        return qg(i, s || {})
    }

    function n(i) {
        const s = i.breakpoints || {},
            l = xi(s).filter(a => e.matchMedia(a).matches).map(a => s[a]).reduce((a, u) => t(a, u), {});
        return t(i, l)
    }

    function r(i) {
        return i.map(s => xi(s.breakpoints || {})).reduce((s, l) => s.concat(l), []).map(e.matchMedia)
    }
    return {
        mergeOptions: t,
        optionsAtMedia: n,
        optionsMediaQueries: r
    }
}

function PC(e) {
    let t = [];

    function n(i, s) {
        return t = s.filter(({
            options: l
        }) => e.optionsAtMedia(l).active !== !1), t.forEach(l => l.init(i, e)), s.reduce((l, a) => Object.assign(l, {
            [a.name]: a
        }), {})
    }

    function r() {
        t = t.filter(i => i.destroy())
    }
    return {
        init: n,
        destroy: r
    }
}

function el(e, t, n) {
    const r = e.ownerDocument,
        o = r.defaultView,
        i = kC(o),
        s = PC(i),
        l = Si(),
        a = CC(),
        {
            mergeOptions: u,
            optionsAtMedia: c,
            optionsMediaQueries: d
        } = i,
        {
            on: h,
            off: f,
            emit: v
        } = a,
        g = D;
    let w = !1,
        p, m = u(bC, el.globalOptions),
        y = u(m),
        E = [],
        C, k, b;

    function T() {
        const {
            container: te,
            slides: B
        } = y;
        k = (ku(te) ? e.querySelector(te) : te) || e.children[0];
        const ae = ku(B) ? k.querySelectorAll(B) : B;
        b = [].slice.call(ae || k.children)
    }

    function j(te) {
        const B = EC(e, k, b, r, o, te, a);
        if (te.loop && !B.slideLooper.canLoop()) {
            const J = Object.assign({}, te, {
                loop: !1
            });
            return j(J)
        }
        return B
    }

    function L(te, B) {
        w || (m = u(m, te), y = c(m), E = B || E, T(), p = j(y), d([m, ...E.map(({
            options: J
        }) => J)]).forEach(J => l.add(J, "change", D)), y.active && (p.translate.to(p.location.get()), p.animation.init(), p.slidesInView.init(), p.slideFocus.init(Ee), p.eventHandler.init(Ee), p.resizeHandler.init(Ee), p.slidesHandler.init(Ee), p.options.loop && p.slideLooper.loop(), k.offsetParent && b.length && p.dragHandler.init(Ee), C = s.init(Ee, E)))
    }

    function D(te, B) {
        const J = z();
        I(), L(u({
            startIndex: J
        }, te), B), a.emit("reInit")
    }

    function I() {
        p.dragHandler.destroy(), p.eventStore.clear(), p.translate.clear(), p.slideLooper.clear(), p.resizeHandler.destroy(), p.slidesHandler.destroy(), p.slidesInView.destroy(), p.animation.destroy(), s.destroy(), l.clear()
    }

    function W() {
        w || (w = !0, l.clear(), I(), a.emit("destroy"), a.clear())
    }

    function O(te, B, J) {
        !y.active || w || (p.scrollBody.useBaseFriction().useDuration(B === !0 ? 0 : y.duration), p.scrollTo.index(te, J || 0))
    }

    function V(te) {
        const B = p.index.add(1).get();
        O(B, te, -1)
    }

    function U(te) {
        const B = p.index.add(-1).get();
        O(B, te, 1)
    }

    function H() {
        return p.index.add(1).get() !== z()
    }

    function N() {
        return p.index.add(-1).get() !== z()
    }

    function P() {
        return p.scrollSnapList
    }

    function M() {
        return p.scrollProgress.get(p.offsetLocation.get())
    }

    function z() {
        return p.index.get()
    }

    function F() {
        return p.indexPrevious.get()
    }

    function Q() {
        return p.slidesInView.get()
    }

    function K() {
        return p.slidesInView.get(!1)
    }

    function ie() {
        return C
    }

    function ve() {
        return p
    }

    function Y() {
        return e
    }

    function ye() {
        return k
    }

    function Ne() {
        return b
    }
    const Ee = {
        canScrollNext: H,
        canScrollPrev: N,
        containerNode: ye,
        internalEngine: ve,
        destroy: W,
        off: f,
        on: h,
        emit: v,
        plugins: ie,
        previousScrollSnap: F,
        reInit: g,
        rootNode: Y,
        scrollNext: V,
        scrollPrev: U,
        scrollProgress: M,
        scrollSnapList: P,
        scrollTo: O,
        selectedScrollSnap: z,
        slideNodes: Ne,
        slidesInView: Q,
        slidesNotInView: K
    };
    return L(t, n), setTimeout(() => a.emit("init"), 0), Ee
}
el.globalOptions = void 0;

function Hc(e = {}, t = []) {
    const n = x.useRef(e),
        r = x.useRef(t),
        [o, i] = x.useState(),
        [s, l] = x.useState(),
        a = x.useCallback(() => {
            o && o.reInit(n.current, r.current)
        }, [o]);
    return x.useEffect(() => {
        $c(n.current, e) || (n.current = e, a())
    }, [e, a]), x.useEffect(() => {
        YE(r.current, t) || (r.current = t, a())
    }, [t, a]), x.useEffect(() => {
        if (GE() && s) {
            el.globalOptions = Hc.globalOptions;
            const u = el(s, n.current, r.current);
            return i(u), () => u.destroy()
        } else i(void 0)
    }, [s, i]), [l, o]
}
Hc.globalOptions = void 0;
const TC = {
    active: !0,
    breakpoints: {},
    delay: 4e3,
    jump: !1,
    playOnInit: !0,
    stopOnFocusIn: !0,
    stopOnInteraction: !0,
    stopOnMouseEnter: !1,
    stopOnLastSnap: !1,
    rootNode: null
};

function NC(e, t) {
    const n = e.scrollSnapList();
    return typeof t == "number" ? n.map(() => t) : t(n, e)
}

function RC(e, t) {
    const n = e.rootNode();
    return t && t(n) || n
}

function Wc(e = {}) {
    let t, n, r, o, i = null,
        s = 0,
        l = !1,
        a = !1,
        u = !1,
        c = !1;

    function d(O, V) {
        n = O;
        const {
            mergeOptions: U,
            optionsAtMedia: H
        } = V, N = U(TC, Wc.globalOptions), P = U(N, e);
        if (t = H(P), n.scrollSnapList().length <= 1) return;
        c = t.jump, r = !1, o = NC(n, t.delay);
        const {
            eventStore: M,
            ownerDocument: z
        } = n.internalEngine(), F = !!n.internalEngine().options.watchDrag, Q = RC(n, t.rootNode);
        M.add(z, "visibilitychange", p), F && n.on("pointerDown", y), F && !t.stopOnInteraction && n.on("pointerUp", E), t.stopOnMouseEnter && M.add(Q, "mouseenter", C), t.stopOnMouseEnter && !t.stopOnInteraction && M.add(Q, "mouseleave", k), t.stopOnFocusIn && n.on("slideFocusStart", w), t.stopOnFocusIn && !t.stopOnInteraction && M.add(n.containerNode(), "focusout", g), t.playOnInit && g()
    }

    function h() {
        n.off("pointerDown", y).off("pointerUp", E).off("slideFocusStart", w), w(), r = !0, l = !1
    }

    function f() {
        const {
            ownerWindow: O
        } = n.internalEngine();
        O.clearTimeout(s), s = O.setTimeout(D, o[n.selectedScrollSnap()]), i = new Date().getTime(), n.emit("autoplay:timerset")
    }

    function v() {
        const {
            ownerWindow: O
        } = n.internalEngine();
        O.clearTimeout(s), s = 0, i = null, n.emit("autoplay:timerstopped")
    }

    function g() {
        if (!r) {
            if (m()) {
                u = !0;
                return
            }
            l || n.emit("autoplay:play"), f(), l = !0
        }
    }

    function w() {
        r || (l && n.emit("autoplay:stop"), v(), l = !1)
    }

    function p() {
        if (m()) return u = l, w();
        u && g()
    }

    function m() {
        const {
            ownerDocument: O
        } = n.internalEngine();
        return O.visibilityState === "hidden"
    }

    function y() {
        a || w()
    }

    function E() {
        a || g()
    }

    function C() {
        a = !0, w()
    }

    function k() {
        a = !1, g()
    }

    function b(O) {
        typeof O < "u" && (c = O), g()
    }

    function T() {
        l && w()
    }

    function j() {
        l && g()
    }

    function L() {
        return l
    }

    function D() {
        const {
            index: O
        } = n.internalEngine(), V = O.clone().add(1).get(), U = n.scrollSnapList().length - 1, H = t.stopOnLastSnap && V === U;
        if (n.canScrollNext() ? n.scrollNext(c) : n.scrollTo(0, c), n.emit("autoplay:select"), H) return w();
        g()
    }

    function I() {
        if (!i) return null;
        const O = o[n.selectedScrollSnap()],
            V = new Date().getTime() - i;
        return O - V
    }
    return {
        name: "autoplay",
        options: e,
        init: d,
        destroy: h,
        play: b,
        stop: T,
        reset: j,
        isPlaying: L,
        timeUntilNext: I
    }
}
Wc.globalOptions = void 0;
const OC = ({
        visible: e,
        name: t,
        location: n,
        action: r,
        suffix: o
    }) => S.jsx("div", {
        style: {
            overflow: "hidden",
            maxHeight: e ? 80 : 0,
            opacity: e ? 1 : 0,
            marginBottom: e ? 10 : 0,
            transition: e ? "max-height 0.5s ease-in, opacity 0.5s ease-in, margin-bottom 0.5s ease-in" : "max-height 0.5s ease-out, opacity 0.5s ease-out, margin-bottom 0.5s ease-out"
        },
        children: S.jsxs("div", {
            style: {
                background: "rgba(248,248,248,0.98)",
                borderRadius: 14,
                boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                padding: "9px 12px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                transform: e ? "translateX(0)" : "translateX(-24px)",
                transition: e ? "transform 0.5s ease-in" : "transform 0.5s ease-out",
                border: "1px solid rgba(0,0,0,0.06)"
            },
            children: [S.jsx("div", {
                style: {
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: "linear-gradient(135deg, #34c759, #00b67a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                },
                children: S.jsx(Rw, {
                    size: 17,
                    color: "#fff",
                    fill: "#fff"
                })
            }), S.jsxs("div", {
                style: {
                    flex: 1,
                    minWidth: 0
                },
                children: [S.jsx("div", {
                    style: {
                        fontFamily: "Inter, sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#8e8e93",
                        marginBottom: 1,
                        letterSpacing: .2
                    },
                    children: "NEW ENTRY"
                }), S.jsxs("div", {
                    style: {
                        fontFamily: "Inter, sans-serif",
                        fontSize: 13,
                        color: "#1c1c1e",
                        lineHeight: 1.3
                    },
                    children: [S.jsx("span", {
                        style: {
                            fontWeight: 700
                        },
                        children: t
                    }), n && r ? ` from ${n} ${r}` : "", " ", o]
                })]
            })]
        })
    }),
    Jg = "/assets/iphone-silver-JpOn6eFE.webp",
    Tu = "/assets/iphone-cosmicorange-prqXxnzj.webp",
    ev = "/assets/iphone-deepblue-UwoIw3eQ.webp",
    Rt = "#2F69B3",
    ma = "rgba(47,105,179,0.07)",
    Hf = "rgba(47,105,179,0.18)",
    jC = "rgba(47,105,179,0.15)",
    LC = "rgba(47,105,179,0.04)",
    Wf = [{
        id: "silver",
        label: "Silver",
        image: Jg
    }, {
        id: "cosmicorange",
        label: "Cosmic Orange",
        image: Tu
    }, {
        id: "deepblue",
        label: "Deep Blue",
        image: ev
    }, {
        id: "surprise",
        label: "Surprise Me 🎲",
        image: null
    }],
    AC = [{
        id: "256",
        emoji: "📱",
        label: "256GB",
        sub: "Everyday use",
        popular: !1
    }, {
        id: "512",
        emoji: "⭐",
        label: "512GB",
        sub: "Most popular",
        popular: !0
    }, {
        id: "1tb",
        emoji: "🚀",
        label: "1TB",
        sub: "Power user",
        popular: !1
    }],
    MC = {
        silver: "Silver",
        cosmicorange: "Cosmic Orange",
        deepblue: "Deep Blue",
        surprise: "Surprise Me"
    },
    _C = {
        256: "256GB",
        512: "512GB",
        "1tb": "1TB"
    },
    IC = {
        silver: Jg,
        cosmicorange: Tu,
        deepblue: ev,
        surprise: Tu
    },
    DC = ({
        onComplete: e
    }) => {
        const [t, n] = x.useState(1), [r, o] = x.useState(null), [i, s] = x.useState(null), [l, a] = x.useState(!1), [u, c] = x.useState(!1), d = v => {
            l || (o(v), a(!0), setTimeout(() => {
                n(2), a(!1)
            }, 500))
        }, h = v => {
            l || (s(v), a(!0), setTimeout(() => {
                c(!0), setTimeout(() => e({
                    color: MC[r ?? "silver"] ?? r ?? "",
                    storage: _C[v] ?? v,
                    colorId: r ?? "silver"
                }), 500)
            }, 500))
        }, f = t === 1;
        return S.jsxs("div", {
            className: "min-h-screen bg-[#e9eff0] flex flex-col",
            style: {
                opacity: u ? 0 : 1,
                transition: u ? "opacity 0.5s ease-out" : "opacity 0.4s ease-in"
            },
            children: [S.jsx("header", {
                className: "py-2 px-4 bg-[#C8CDD2]",
                children: S.jsx(Gg, {})
            }), S.jsxs("main", {
                className: "flex-1 px-4 py-4 flex flex-col",
                children: [S.jsxs("div", {
                    className: "bg-white rounded-xl border border-gray-200 shadow-md flex items-center gap-3 px-3 py-3 mb-4",
                    children: [S.jsx("img", {
                        src: "https://b.noodledit.com/promotions/iphone17promax1000.png",
                        alt: "iPhone 17 Pro Max",
                        className: "w-[72px] h-auto flex-shrink-0"
                    }), S.jsxs("div", {
                        children: [S.jsx("p", {
                            className: "font-rubik font-bold text-sm text-black leading-tight",
                            children: "You've been selected to win an iPhone 17 Pro Max! 🎉"
                        }), S.jsx("p", {
                            className: "font-inter text-xs text-gray-500 mt-1",
                            children: "Answer 2 quick questions to confirm your entry."
                        })]
                    })]
                }), S.jsxs("div", {
                    className: "mb-4",
                    children: [S.jsxs("div", {
                        className: "flex justify-between mb-1",
                        children: [S.jsxs("span", {
                            className: "font-inter text-xs text-gray-500 font-medium",
                            children: ["Step ", t, " of 3"]
                        }), S.jsx("span", {
                            className: "font-inter text-xs font-bold",
                            style: {
                                color: "#00B67A"
                            },
                            children: t === 1 ? "33%" : "66%"
                        })]
                    }), S.jsx("div", {
                        className: "w-full h-2 bg-gray-200 rounded-full overflow-hidden",
                        children: S.jsx("div", {
                            className: "h-full rounded-full transition-all duration-500 ease-in-out",
                            style: {
                                width: t === 1 ? "33%" : "66%",
                                backgroundColor: "#00B67A"
                            }
                        })
                    })]
                }), S.jsxs("div", {
                    className: "bg-white rounded-xl border border-gray-200 shadow-md px-4 py-5",
                    children: [S.jsx("h2", {
                        className: "font-rubik font-bold text-lg text-black text-center leading-tight mb-1",
                        children: f ? "Which color would you pick? 🎨" : "How much storage do you need? 💾"
                    }), S.jsx("p", {
                        className: "font-inter text-sm text-gray-500 text-center mb-5",
                        children: f ? "Select your iPhone 17 Pro Max color" : "Select your preferred storage"
                    }), f && S.jsxs("div", {
                        className: "flex flex-col gap-3",
                        children: [S.jsx("div", {
                            className: "grid grid-cols-3 gap-2",
                            children: Wf.filter(v => v.id !== "surprise").map(v => {
                                const g = r === v.id;
                                return S.jsxs("button", {
                                    onClick: () => d(v.id),
                                    disabled: l,
                                    className: "relative flex flex-col items-center rounded-xl border-2 overflow-hidden transition-all duration-200 active:scale-95 pb-2",
                                    style: {
                                        borderColor: g ? Rt : "#e5e7eb",
                                        background: g ? ma : "#fafafa",
                                        boxShadow: g ? `0 0 0 3px ${Hf}` : "0 1px 4px rgba(0,0,0,0.06)"
                                    },
                                    children: [g && S.jsx("div", {
                                        className: "absolute top-1.5 right-1.5 z-10",
                                        children: S.jsx(Ss, {
                                            size: 16,
                                            fill: Rt,
                                            color: "#fff"
                                        })
                                    }), S.jsx("div", {
                                        className: "w-full bg-gray-50 flex items-center justify-center pt-1",
                                        children: S.jsx("img", {
                                            src: v.image,
                                            alt: v.label,
                                            className: "w-full h-auto object-contain",
                                            style: {
                                                maxHeight: 90
                                            }
                                        })
                                    }), S.jsx("span", {
                                        className: "font-inter font-semibold text-xs text-center leading-tight mt-1.5 px-1",
                                        style: {
                                            color: g ? Rt : "#1c1c1e"
                                        },
                                        children: v.label
                                    })]
                                }, v.id)
                            })
                        }), (() => {
                            const v = Wf.find(w => w.id === "surprise"),
                                g = r === v.id;
                            return S.jsxs("button", {
                                onClick: () => d(v.id),
                                disabled: l,
                                className: "relative flex items-center justify-center gap-2 rounded-xl border-2 py-3 px-4 transition-all duration-200 active:scale-[0.98] w-full",
                                style: {
                                    borderColor: g ? Rt : "#e5e7eb",
                                    background: g ? ma : "#fafafa",
                                    boxShadow: g ? `0 0 0 3px ${Hf}` : "0 1px 4px rgba(0,0,0,0.06)"
                                },
                                children: [g && S.jsx(Ss, {
                                    size: 18,
                                    fill: Rt,
                                    color: "#fff",
                                    className: "flex-shrink-0"
                                }), S.jsx("span", {
                                    className: "font-inter font-semibold text-sm",
                                    style: {
                                        color: g ? Rt : "#1c1c1e"
                                    },
                                    children: v.label
                                })]
                            })
                        })()]
                    }), !f && S.jsx("div", {
                        className: "flex flex-col gap-3",
                        children: AC.map(v => {
                            const g = i === v.id,
                                w = v.popular && i === null,
                                p = g || w && !l;
                            return S.jsxs("button", {
                                onClick: () => h(v.id),
                                disabled: l,
                                className: "relative flex items-center gap-4 rounded-xl px-4 py-4 border-2 transition-all duration-200 active:scale-[0.98] w-full text-left",
                                style: {
                                    borderColor: p ? Rt : "#e5e7eb",
                                    background: g ? ma : w ? LC : "#fafafa",
                                    boxShadow: p ? `0 0 0 3px ${jC}` : "0 1px 4px rgba(0,0,0,0.06)"
                                },
                                children: [v.popular && S.jsx("span", {
                                    className: "absolute -top-3 left-1/2 -translate-x-1/2 font-inter font-bold text-white text-xs px-3 py-0.5 rounded-full",
                                    style: {
                                        backgroundColor: Rt,
                                        whiteSpace: "nowrap"
                                    },
                                    children: "Most Popular ⭐"
                                }), S.jsx("span", {
                                    className: "text-2xl leading-none flex-shrink-0",
                                    children: v.emoji
                                }), S.jsxs("div", {
                                    className: "flex-1",
                                    children: [S.jsx("span", {
                                        className: "font-inter font-bold text-base block",
                                        style: {
                                            color: p ? Rt : "#1c1c1e"
                                        },
                                        children: v.label
                                    }), S.jsx("span", {
                                        className: "font-inter text-xs text-gray-400",
                                        children: v.sub
                                    })]
                                }), g && S.jsx("div", {
                                    className: "flex-shrink-0",
                                    children: S.jsx(Ss, {
                                        size: 22,
                                        fill: Rt,
                                        color: "#fff"
                                    })
                                }), !g && w && S.jsx("div", {
                                    className: "flex-shrink-0 w-5 h-5 rounded-full border-2",
                                    style: {
                                        borderColor: Rt
                                    }
                                }), !g && !w && S.jsx("div", {
                                    className: "flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-300"
                                })]
                            }, v.id)
                        })
                    })]
                })]
            })]
        })
    },
    FC = "https://b.noodledit.com/promotions/iphone17promax1000.png",
    Qf = [{
        name: "Sarah",
        location: "Texas",
        action: "just entered",
        suffix: "🇺🇸🎉"
    }, {
        name: "Mike",
        location: "Florida",
        action: "claimed a spot",
        suffix: "🇺🇸✅"
    }, {
        name: "Jasmine",
        location: "California",
        action: "just entered",
        suffix: "🇺🇸🎉"
    }, {
        name: "Derek",
        location: "New York",
        action: "claimed a spot",
        suffix: "🇺🇸✅"
    }, {
        name: "Ashley",
        location: "Ohio",
        action: "just entered",
        suffix: "🇺🇸🎉"
    }, {
        name: "Carlos",
        location: "Texas",
        action: "claimed a spot",
        suffix: "🇺🇸✅"
    }, {
        name: "Tiffany",
        location: "Georgia",
        action: "just entered",
        suffix: "🇺🇸🎉"
    }, {
        name: "Brandon",
        location: "Arizona",
        action: "claimed a spot",
        suffix: "🇺🇸✅"
    }],
    zC = () => {
        const [e, t] = x.useState(!1), [n, r] = x.useState(""), [o, i] = x.useState(""), [s, l] = x.useState("silver"), [a, u] = x.useState(600), [c, d] = x.useState(!1), [h, f] = x.useState(0);
        x.useEffect(() => {
            const P = setInterval(() => {
                u(M => M <= 1 ? 600 : M - 1)
            }, 1e3);
            return () => clearInterval(P)
        }, []);
        const v = P => `${Math.floor(P/60)}:${String(P%60).padStart(2,"0")}`,
            [g, w] = x.useState(3016),
            [p, m] = x.useState(84),
            [y, E] = x.useState(!1),
            [C, k] = x.useState(0),
            [b, T] = x.useState(null),
            [j, L] = x.useState(!1),
            [D, I] = x.useState(0),
            [W, O] = Hc({
                loop: !0
            }, [Wc({
                delay: 4e3,
                stopOnInteraction: !1
            })]),
            V = x.useCallback(() => {
                O && k(O.selectedScrollSnap())
            }, [O]);
        x.useEffect(() => {
            if (O) return O.on("select", V), () => {
                O.off("select", V)
            }
        }, [O, V]);
        const U = [{
            name: "Brianna L.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
            date: "Just now",
            isNew: !0,
            quote: "no way this just happened 😭 my iPhone 17 Pro Max literally just got delivered"
        }, {
            name: "Tyler W.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
            date: "2 hours ago",
            isNew: !1,
            quote: "bro shipped in 3 days?? this camera is unreal fr fr 📱🔥"
        }, {
            name: "Marcus J.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
            date: "Yesterday",
            isNew: !1,
            quote: "lowkey thought it was cap but the iPhone came yesterday 💀 im shook"
        }, {
            name: "Emily R.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
            date: "2 days ago",
            isNew: !1,
            quote: "got my iPhone shipped so fast omg everyone's so jealous rn 😍"
        }, {
            name: "Jason K.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
            date: "3 days ago",
            isNew: !1,
            quote: "this is giving main character energy 🎬 iPhone 17 Pro Max in hand lesgooo"
        }, {
            name: "Sofia M.",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
            date: "4 days ago",
            isNew: !1,
            quote: "not me unboxing a whole iPhone 17 Pro Max rn 📦✨ slay"
        }, {
            name: "Darius T.",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
            date: "5 days ago",
            isNew: !1,
            quote: "deadass got my iPhone delivered yesterday 💯 this hits different"
        }, {
            name: "Mia C.",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face",
            date: "1 week ago",
            isNew: !1,
            quote: "the way I screamed when it arrived 😱 iPhone 17 Pro Max era activated"
        }];
        if (x.useEffect(() => {
                const P = setInterval(() => {
                        w(z => z + 1)
                    }, 3e3 + Math.random() * 2e3),
                    M = setInterval(() => {
                        m(z => Math.max(1, z - 1)), E(!0), setTimeout(() => E(!1), 600)
                    }, 5e3 + Math.random() * 2e3);
                return () => {
                    clearInterval(P), clearInterval(M)
                }
            }, []), x.useEffect(() => {
                const P = () => {
                        I(F => {
                            const Q = (F + 1) % Qf.length;
                            return T(Qf[Q]), L(!0), setTimeout(() => L(!1), 3e3), Q
                        })
                    },
                    M = setInterval(P, 9e3),
                    z = setTimeout(P, 4e3);
                return () => {
                    clearInterval(M), clearTimeout(z)
                }
            }, []), !e) return S.jsx(DC, {
            onComplete: ({
                color: P,
                storage: M,
                colorId: z
            }) => {
                r(P), i(M), l(z), t(!0)
            }
        });
        const H = {
                animation: "prelander-fade-in 0.5s ease-in forwards"
            },
            N = () => {
                d(!0), f(1);
                const P = JSON.stringify({
                    timestamp: Date.now()
                });
                try {
                    navigator.sendBeacon ? navigator.sendBeacon("/api/continue-click", P) : fetch("/api/continue-click", {
                        method: "POST",
                        body: P,
                        keepalive: !0,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).catch(() => {})
                } catch {}
                setTimeout(() => f(2), 1500), setTimeout(() => {
                    window.location.href = "/api/continue"
                }, 3e3)
            };
        return h > 0 ? S.jsx("div", {
            className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f0f4f5] px-8",
            children: h === 1 ? S.jsxs("div", {
                className: "flex flex-col items-center gap-6 text-center animate-fade-in",
                children: [S.jsxs("div", {
                    className: "relative w-20 h-20",
                    children: [S.jsx("div", {
                        className: "absolute inset-0 rounded-full border-4 border-[#00B67A]/20"
                    }), S.jsx("div", {
                        className: "absolute inset-0 rounded-full border-4 border-transparent border-t-[#00B67A] animate-spin"
                    }), S.jsx("div", {
                        className: "absolute inset-0 flex items-center justify-center text-3xl",
                        children: "✅"
                    })]
                }), S.jsxs("p", {
                    className: "font-rubik font-bold text-2xl text-foreground leading-snug",
                    children: ["Entry confirmed!", S.jsx("br", {}), "Verifying your eligibility…"]
                })]
            }) : S.jsxs("div", {
                className: "flex flex-col items-center gap-6 text-center animate-fade-in",
                children: [S.jsx("div", {
                    className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl",
                    children: "📍"
                }), S.jsxs("p", {
                    className: "font-rubik font-bold text-2xl text-foreground leading-snug",
                    children: ["One last step —", S.jsx("br", {}), "confirm your location", S.jsx("br", {}), "to claim your prize"]
                })]
            })
        }) : S.jsxs("div", {
            className: "min-h-screen bg-[#e9eff0]",
            style: H,
            children: [S.jsx("header", {
                className: "py-2 px-4 bg-[#C8CDD2]",
                children: S.jsx(Gg, {})
            }), S.jsxs("main", {
                className: "px-4 py-2",
                children: [S.jsxs("section", {
                    className: "relative mb-3",
                    children: [S.jsxs("div", {
                        className: "bg-white rounded-xl border border-gray-200 shadow-md flex items-center gap-3 px-3 py-3",
                        children: [S.jsx("img", {
                            src: IC[s] ?? FC,
                            alt: "iPhone 17 Pro Max Prize",
                            className: "w-[110px] h-auto flex-shrink-0"
                        }), S.jsxs("div", {
                            className: "flex flex-col",
                            children: [S.jsxs("h1", {
                                className: "font-rubik font-bold text-lg text-black leading-tight",
                                style: {
                                    textWrap: "balance"
                                },
                                children: ["You've been selected 🎉 your ", n, " ", o, " iPhone 17 Pro Max is reserved — confirm before it expires"]
                            }), S.jsx("p", {
                                className: "font-inter text-xs text-gray-600 mt-1.5 leading-snug",
                                children: "Your comment was randomly chosen, 1 step left to claim your iPhone 17 Pro Max"
                            }), S.jsxs("p", {
                                className: "font-inter text-xs mt-2 flex items-center gap-1",
                                children: [S.jsx("span", {
                                    children: "⏰ Your spot expires in:"
                                }), S.jsx("span", {
                                    className: "text-red-500 font-bold",
                                    children: v(a)
                                })]
                            })]
                        })]
                    }), S.jsx("div", {
                        className: "flex justify-center",
                        children: S.jsx("div", {
                            className: "w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white drop-shadow-sm"
                        })
                    })]
                }), S.jsx("section", {
                    className: "bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden mb-3",
                    children: (() => {
                        const P = {
                                cosmicorange: "/gif-orange.gif",
                                deepblue: "/gif-deepblue.gif",
                                silver: "/gif-silver.gif"
                            },
                            M = {
                                cosmicorange: "Last winner unboxing their Cosmic Orange iPhone 17 Pro Max 📦",
                                deepblue: "Last winner unboxing their Deep Blue iPhone 17 Pro Max 📦",
                                silver: "Last winner unboxing their Silver iPhone 17 Pro Max 📦"
                            },
                            z = ["cosmicorange", "deepblue", "silver"],
                            F = s === "surprise" ? z[Math.floor(Math.random() * z.length)] : s,
                            Q = P[F] || "/gif-orange.gif",
                            K = M[F] || "Last winner receiving their prize 📦";
                        return S.jsxs(S.Fragment, {
                            children: [S.jsx("img", {
                                src: Q,
                                alt: "Prize unboxing",
                                className: "w-full block"
                            }), S.jsx("p", {
                                className: "text-center font-inter text-gray-400 text-xs italic py-2",
                                children: K
                            })]
                        })
                    })()
                }), S.jsx("div", {
                    className: "pb-6 overflow-visible",
                    children: S.jsxs("section", {
                        className: "bg-white rounded-xl border-2 border-gray-300 shadow-md p-3 mb-6",
                        children: [S.jsxs("div", {
                            className: "flex items-center justify-between mb-3",
                            children: [S.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [S.jsx(Mw, {
                                    className: "w-6 h-6 text-yellow-500"
                                }), S.jsx("span", {
                                    className: "font-poppins font-bold text-black text-base",
                                    children: "Recent Winners"
                                })]
                            }), S.jsxs("div", {
                                className: "flex items-center gap-1",
                                children: [S.jsx("button", {
                                    onClick: () => O == null ? void 0 : O.scrollPrev(),
                                    className: "w-8 h-8 rounded-full bg-white border-2 border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm",
                                    children: S.jsx(Ow, {
                                        className: "w-5 h-5 text-gray-700"
                                    })
                                }), S.jsx("button", {
                                    onClick: () => O == null ? void 0 : O.scrollNext(),
                                    className: "w-8 h-8 rounded-full bg-white border-2 border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm",
                                    children: S.jsx(jw, {
                                        className: "w-5 h-5 text-gray-700"
                                    })
                                })]
                            })]
                        }), S.jsxs("div", {
                            className: "bg-gray-50 rounded-lg p-3 overflow-hidden",
                            children: [S.jsx("div", {
                                className: "overflow-hidden",
                                ref: W,
                                children: S.jsx("div", {
                                    className: "flex",
                                    children: U.map((P, M) => S.jsx("div", {
                                        className: "flex-[0_0_100%] min-w-0",
                                        children: S.jsxs("div", {
                                            className: "flex items-start gap-3 w-full",
                                            children: [S.jsx("img", {
                                                src: P.avatar,
                                                alt: P.name,
                                                className: "w-11 h-11 rounded-full object-cover flex-shrink-0",
                                                style: {
                                                    border: "2px solid #00B67A"
                                                }
                                            }), S.jsxs("div", {
                                                className: "flex-1",
                                                children: [S.jsxs("div", {
                                                    className: "flex items-center flex-wrap gap-2 mb-1",
                                                    children: [S.jsx("span", {
                                                        className: "font-inter font-bold text-black text-sm",
                                                        children: P.name
                                                    }), P.isNew ? S.jsx("span", {
                                                        className: "bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs px-2 py-0.5 rounded font-inter font-bold",
                                                        children: "NEW · Today"
                                                    }) : S.jsx("span", {
                                                        className: "text-white text-xs px-1.5 py-0.5 rounded font-inter font-bold",
                                                        style: {
                                                            backgroundColor: "#00B67A"
                                                        },
                                                        children: "Winner"
                                                    })]
                                                }), S.jsx("span", {
                                                    className: "text-gray-500 text-xs font-inter",
                                                    children: P.date
                                                }), S.jsxs("p", {
                                                    className: "font-inter text-gray-700 text-sm leading-relaxed mt-0.5 break-words min-w-0",
                                                    children: ['"', P.quote, '"']
                                                })]
                                            })]
                                        })
                                    }, M))
                                })
                            }), S.jsx("div", {
                                className: "flex justify-center mt-3",
                                children: S.jsx("div", {
                                    className: "relative w-[200px] h-1 bg-gray-200 rounded-full overflow-hidden",
                                    children: S.jsx("div", {
                                        className: "absolute top-0 h-full rounded-full transition-all duration-500 ease-in-out",
                                        style: {
                                            width: `${1/U.length*100}%`,
                                            left: `${C/U.length*100}%`,
                                            backgroundColor: "#00B67A"
                                        }
                                    })
                                })
                            })]
                        })]
                    })
                }), S.jsx("div", {
                    className: "h-64"
                })]
            }), S.jsx("style", {
                children: `
        @keyframes cta-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.0), 0 4px 14px rgba(59,130,246,0.25); }
          50% { box-shadow: 0 0 0 6px rgba(59,130,246,0.15), 0 4px 20px rgba(59,130,246,0.4); }
        }
        .cta-pulse { animation: cta-glow 2s ease-in-out infinite; }
      `
            }), S.jsxs("div", {
                className: "fixed bottom-0 left-0 right-0 z-50 bg-[#e9eff0] px-4 pt-6 pb-5",
                style: {
                    boxShadow: "0 -4px 16px rgba(0,0,0,0.10)"
                },
                children: [S.jsxs("div", {
                    className: "bg-white rounded-xl border border-gray-200 shadow-md px-4 py-3 mb-2",
                    children: [S.jsxs("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [S.jsxs("div", {
                            className: "flex items-center gap-1.5",
                            children: [S.jsx("span", {
                                className: "w-2 h-2 rounded-full bg-[#00B67A] animate-pulse flex-shrink-0"
                            }), S.jsxs("span", {
                                className: "font-inter text-sm font-bold text-[#00B67A]",
                                children: [g.toLocaleString(), " entered"]
                            })]
                        }), S.jsxs("span", {
                            className: "font-inter text-sm font-bold text-red-500",
                            children: ["Only ", p, " spot", p === 1 ? "" : "s", " left"]
                        })]
                    }), S.jsx("div", {
                        className: "w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2",
                        children: S.jsx("div", {
                            className: "h-full rounded-full",
                            style: {
                                width: "97%",
                                backgroundColor: "#00B67A"
                            }
                        })
                    }), S.jsx("p", {
                        className: "text-center font-inter text-muted-foreground text-xs mb-0.5",
                        children: "Step 1 of 3"
                    }), S.jsx("p", {
                        className: "text-center font-inter text-gray-400 text-xs mb-3",
                        children: "Confirm → Answer survey → Claim prize."
                    }), S.jsx(OC, {
                        visible: j,
                        name: b == null ? void 0 : b.name,
                        location: b == null ? void 0 : b.location,
                        action: b == null ? void 0 : b.action,
                        suffix: b == null ? void 0 : b.suffix
                    }), S.jsx("div", {
                        className: "cta-pulse rounded-lg",
                        children: S.jsx(Yg, {
                            onClick: N,
                            isLoading: c,
                            children: c ? "Starting…" : "Confirm My Entry →"
                        })
                    })]
                }), S.jsxs("div", {
                    className: "flex items-center justify-around px-2",
                    children: [S.jsxs("div", {
                        className: "flex items-center gap-1",
                        children: [S.jsx(Lw, {
                            className: "w-3.5 h-3.5 text-gray-400"
                        }), S.jsx("span", {
                            className: "font-inter text-xs text-gray-400",
                            children: "256-bit Secure"
                        })]
                    }), S.jsxs("div", {
                        className: "flex items-center gap-1",
                        children: [S.jsx(Aw, {
                            className: "w-3.5 h-3.5 text-gray-400"
                        }), S.jsx("span", {
                            className: "font-inter text-xs text-gray-400",
                            children: "Verified"
                        })]
                    }), S.jsxs("div", {
                        className: "flex items-center gap-1",
                        children: [S.jsx(Ss, {
                            className: "w-3.5 h-3.5 text-gray-400"
                        }), S.jsx("span", {
                            className: "font-inter text-xs text-gray-400",
                            children: "100% Free"
                        })]
                    })]
                })]
            })]
        })
    },
    $C = () => {
        const e = Kg();
        return x.useEffect(() => {
            console.error("404 Error: User attempted to access non-existent route:", e.pathname)
        }, [e.pathname]), S.jsx("div", {
            className: "flex min-h-screen items-center justify-center bg-muted",
            children: S.jsxs("div", {
                className: "text-center",
                children: [S.jsx("h1", {
                    className: "mb-4 text-4xl font-bold",
                    children: "404"
                }), S.jsx("p", {
                    className: "mb-4 text-xl text-muted-foreground",
                    children: "Oops! Page not found"
                }), S.jsx("a", {
                    href: "/",
                    className: "text-primary underline hover:text-primary/90",
                    children: "Return to Home"
                })]
            })
        })
    },
    BC = new oE,
    UC = () => S.jsx(sE, {
        client: BC,
        children: S.jsxs(MS, {
            children: [S.jsx(v1, {}), S.jsx(Y1, {}), S.jsx(WE, {
                children: S.jsxs(UE, {
                    children: [S.jsx(Cu, {
                        path: "/",
                        element: S.jsx(zC, {})
                    }), S.jsx(Cu, {
                        path: "*",
                        element: S.jsx($C, {})
                    })]
                })
            })]
        })
    });
gm(document.getElementById("root")).render(S.jsx(UC, {}));