'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var useSelector = function (context, selector) {
    var value = react.useContext(context);
    var getNewState = react.useCallback(function (old) {
        if (old === void 0) { old = {}; }
        var dirty = false;
        var newState = __assign({}, old);
        Object.keys(selector).forEach(function (s) {
            var newValue = selector[s](value);
            if (old[s] !== newValue) {
                newState[s] = newValue;
                dirty = true;
            }
        });
        if (dirty)
            return newState;
        return old;
    }, [value, selector]);
    var _a = react.useState(getNewState()), state = _a[0], setState = _a[1];
    react.useEffect(function () {
        setState(function (old) {
            return getNewState(old);
        });
    }, [getNewState]);
    return react.useMemo(function () { return state; }, [state]);
};

var ContextBinder = function (context, selector, children) { return react.memo(function () {
    var requestValue = useSelector(context, selector);
    return react.useMemo(function () { return react.createElement(children, { context: requestValue }); }, [requestValue, children]);
}); };

exports.ContextBinder = ContextBinder;
