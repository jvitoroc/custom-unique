"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var customUnique = function () {

    var REGEX = /\(\(\s*([^\(\)]*)\s*\)(\d*)?\)/g;

    function getAllMatches(format, config) {
        var match = void 0;
        var matches = [];
        var beforeLastPos = 0;
        var prevMatch = undefined;
        var string = "";
        var currentPos = void 0;
        var newFormat = format.replace(REGEX, function (match, key, times, index) {
            string = config[key];
            if (string == undefined || !config.hasOwnProperty(key)) throw new Error("Some fields in format doesn't exist in config.");
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

        if (typeof format !== "string" || format.length < 1) throw new Error("The second argument (format) is invalid.");

        if ((typeof config === "undefined" ? "undefined" : _typeof(config)) !== "object") throw new Error("The first argument (config) is invalid.");

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
}();

module.exports = customUnique;