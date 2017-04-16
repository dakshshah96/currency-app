/* include minified money.js */
/* money.js 0.2, MIT license, http://openexchangerates.github.io/money.js */
(function(g,j){var b=function(a){return new i(a)};b.version="0.1.3";var c=g.fxSetup||{rates:{},base:""};b.rates=c.rates;b.base=c.base;b.settings={from:c.from||b.base,to:c.to||b.base};var h=b.convert=function(a,e){if("object"===typeof a&&a.length){for(var d=0;d<a.length;d++)a[d]=h(a[d],e);return a}e=e||{};if(!e.from)e.from=b.settings.from;if(!e.to)e.to=b.settings.to;var d=e.to,c=e.from,f=b.rates;f[b.base]=1;if(!f[d]||!f[c])throw"fx error";d=c===b.base?f[d]:d===b.base?1/f[c]:f[d]*(1/f[c]);return a*d},i=function(a){"string"===typeof a?(this._v=parseFloat(a.replace(/[^0-9-.]/g,"")),this._fx=a.replace(/([^A-Za-z])/g,"")):this._v=a},c=b.prototype=i.prototype;c.convert=function(){var a=Array.prototype.slice.call(arguments);a.unshift(this._v);return h.apply(b,a)};c.from=function(a){a=b(h(this._v,{from:a,to:b.base}));a._fx=b.base;return a};c.to=function(a){return h(this._v,{from:this._fx?this._fx:b.settings.from,to:a})};if("undefined"!==typeof exports){if("undefined"!==typeof module&&module.exports)exports=module.exports=b;exports.fx=fx}else"function"===typeof define&&define.amd?define([],function(){return b}):(b.noConflict=function(a){return function(){g.fx=a;b.noConflict=j;return b}}(g.fx),g.fx=b)})(this);

/* App.js */

var currencies = {
    AUD: "Australian Dollar",
    BGN: "Bulgarian Lev",
    BRL: "Brazilian Real",
    CAD: "Canadian Dollar",
    CHF: "Swiss Frank",
    CNY: "Chinese Yuan",
    CZK: "Czech Republic Koruna",
    DKK: "Danish Krone",
    GBP: "British Pound",
    HKD: "Hong Kong Dollar",
    HRK: "Croatian Kuna",
    HUF: "Hungarian Forint",
    IDR: "Indonesian Rupiah",
    ILS: "Israeli New Shekel",
    INR: "Indian Rupee",
    JPY: "Japanese Yen",
    KRW: "South Korean Won",
    MXN: "Mexican Peso",
    MYR: "Malaysian Ringgit",
    NOK: "Norwegian Krone",
    NZD: "New Zealand Dollar",
    PHP: "Philippine Peso",
    PLN: "Polish Zloty",
    RON: "Romanian Leu",
    RUB: "Russian Ruble",
    SEK: "Swedish Krona",
    SGD: "Singapore Dollar",
    THB: "Thai Baht",
    TRY: "Turkish Lira",
    USD: "US Dollar",
    ZAR: "South African Rand"
}

var favorites = {
    
}

$.getJSON("http://api.fixer.io/latest", function(data) {
    if (typeof fx !== "undefined" && fx.rates) {
        fx.rates = data.rates;
        fx.base = data.base;
    } else {
        var fxSetup = {
            rates: data.rates,
            base: data.base
        }
    }
});

function updateResults() {

    var fromCurr = $('#from-currency').find(':selected').text();
    var toCurr = $('#to-currency').find(':selected').text();

    var fromAmount = $('#from-entry').val();
    var converted = fx.convert(fromAmount, {from: fromCurr, to: toCurr}).toFixed(2);

    if (fromAmount !== "") {
        $('#results').removeAttr('hidden');
        $('.from-value').text(fromAmount);
        $('.from-currency').text(currencies[fromCurr]);
        $('.to-value').text(converted);
        $('.to-currency').text(currencies[toCurr]);
    } else {
        $('#results').attr('hidden', true);
    }
}

$(function() {

    $('#from-entry').on('input', updateResults);

    $('#from-currency, #to-currency').change(updateResults);

});