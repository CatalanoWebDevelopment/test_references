// @credit: https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
var correction_factors = (function() {
    function _shift(x) {
        var parts = x.toString().split('.');
        return (parts.length < 2) ? 1 : Math.pow(10, parts[1].length);
    };

    return function() { 
        return Array.prototype.reduce.call(arguments, function (prev, next) { 
            return prev === undefined || next === undefined ? undefined : Math.max(prev, _shift (next)); 
        }, -Infinity);
    };
})();

// Addition
Math.a = function () {
    var f = correction_factors.apply(null, arguments); 
    if (f === undefined) return undefined;

    function cb(x, y, i, o) { 
        return x + f * y; 
    };

    return Array.prototype.reduce.call(arguments, cb, 0) / f;
};

// Subtraction
Math.s = function (l,r) {
    var f = correction_factors(l,r); 
    return (l * f - r * f) / f; 
};

// Multiplication
Math.m = function () {
    var f = correction_factors.apply(null, arguments);
    function cb(x, y, i, o) { 
        return (x*f) * (y*f) / (f * f); 
    };

    return Array.prototype.reduce.call(arguments, cb, 1);
};

// Division
Math.d = function (l,r) { 
    var f = correction_factors(l,r); 
    return (l * f) / (r * f); 
};

// PRECISION MULTIPLICATION EXAMPLE
// Input: Math.m(0.1, 0.2);
// Expected: 0.02

// GOOD NOTES
// - It is recommended to multiply any floats by a power of 100 (so if you have 15.2535 then it would be 1525.35) and use .toFixed(2) 