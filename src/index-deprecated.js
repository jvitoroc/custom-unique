(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.customUnique = factory();
    }
})(typeof self !== 'undefined' ? self : undefined, function () {

    'use strict';

    var REGEX = /\(\(\s*([^\(\)]*)\s*\)(\d*)?\)/g;
    var hasOwnProperty = Object.prototype.hasOwnProperty.call;

    function getAllMatches(format, config) {
        var match = void 0;
        var matches = [];
        var beforeLastPos = 0;
        var prevMatch = undefined;
        var string = "";
        var currentPos = void 0;
        var newFormat = format.replace(REGEX, function (match, key, times, index) {
            string = config[key];
            if (!hasOwnProperty(config, key)) throw new Error("[custom-unique] One or more placeholder(s) in format (second arg) doesn't exist in config.");
            currentPos = prevMatch !== undefined ? prevMatch.pos + prevMatch.times + (index - beforeLastPos) : index;
            matches.push({
                key: key,
                times: times === undefined ? string.length : Number(times),
                pos: currentPos
            });
            prevMatch = matches[matches.length - 1];

            beforeLastPos = index + match.length;
            return "";
        });
        return {
            matches: matches,
            newFormat: newFormat
        };
    }

    function getRandomInt(max) {
        var min = Math.ceil(0);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function compile() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if ((typeof format !== "string" || format instanceof String) || format.length < 1) throw new Error("The second argument (format) is invalid.");

        if (typeof config !== "object") throw new Error("The first argument (config) is invalid.");

        var compiled = getAllMatches(format, config);

        return function () {
            var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var sufix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

            var fill = compiled.newFormat;
            var uni = "";
            var key = void 0;
            var i;
            compiled.matches.forEach(function (match) {
                key = config[match.key];
                for (i = 0; i < match.times; i++) {
                    uni += key[getRandomInt(key.length)];
                }
                fill = fill.slice(0, match.pos) + uni + fill.slice(match.pos);
                uni = "";
            });
            return prefix + fill + sufix;
        };
    }

    return {
        compile: compile
    };
});