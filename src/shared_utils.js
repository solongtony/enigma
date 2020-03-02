"use strict";

var tables = require('./tables');

var utils = {

  // Normalize text before applying any cypher.
  // Remove all whitespace.
  // Use all lowercase letters.
  normalizeText: function(text){
    return text.replace(/\s/g,'').toLowerCase();
  },

  reverse: function(text) {
      return text.split('').reverse().join('');
  },

  makeMapping: function(map) {
    return function(letter) {
      return map[tables.alphaIndex[letter]];
    };
  },

  applyMapToText: function(text, map){
    var result = "";
    var applyMap = utils.makeMapping(map);

    for(var index in text) {
      var letter = text[index];
      result += applyMap(letter);
    }
    return result;
  },

  applyShiftToText: function(text, offset){
    var result = "";
    for(var index in text) {
      var letter = text[index];
      result += utils.addLetters(letter, offset);
    }
    return result;
  },

  addLetters: function (a, b) {
    return  utils.modularLetterOperation(a, b, function(x, y){return x + y;});
  },

  subtractLetters: function(a, b) {
    return  utils.modularLetterOperation(a, b, function(x, y){return x - y;});
  },

  modularLetterOperation: function(a, b, operation) {

    var a = (typeof a === "number") ? a : tables.alphaIndex[a];
    var b = (typeof b === "number") ? b : tables.alphaIndex[b];

    var rawCombinedValue = operation(a, b);
    var letterValue = utils.positiveModulo(rawCombinedValue, tables.identityMap.length);
    return tables.identityMap[letterValue];
  },

  positiveModulo: function(a, b) {
    var result = a % b;
    if(result < 0) return result + b;
    return result;
  },

  print: function(text){console.log(text||'');},

  header: function(text){utils.print('\n'+text+'\n');}

}

module.exports = utils;
