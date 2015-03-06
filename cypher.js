"strict";
var tables = require('./tables.js');
var utils = require('./shared_utils.js');
var puts = utils.puts;

//           11 1111111222222
//0123456789012 3456789012345
//abcdefghijklm nopqrstuvwxyz

// TODO: consolodate applyMap and applyOffset by checking if the input is a number, hash, or function.  (If it's a function, assume it maps a single letter.)

function applyMapToText(text, map){
  var result = "";
  var applyMap = makeMapping(map);
  
  for(var index in text) {
    var letter = text[index];
    result += applyMap(letter);
  }
  return result;
}

// AKA Caesar Cipher
function applyOffsetToText(text, offset){
  var result = "";
  for(var index in text) {
    var letter = text[index];
    result += addLetters(letter, offset);
  }
  return result;
}

function indexedPolyalphabeticCypher(text) {
  var result = "";
  for(var index in text) {
    var letter = text[index];
    //puts("index typeof index: " + index + " " + typeof index);
    // 'index' is a String!
    // "+" converts index into a number.
    var offsetLetter = addLetters(letter, +index);
    result += offsetLetter;
  }
  return result;
}

function indexedPolyalphabeticDecypher(text) {
  var result = "";
  for(var index in text) {
    var letter = text[index];
    result += addLetters(letter, -1 * index);
  }
  return result;
}

// Apply a key using modulo arithmatic.
// Repeat the key as necessary.
// This is an implementation of the Vigenère cipher.
function moduloCypherTextWithKey(text, key) {
  var result = "";
  for(var textIndex in text) {
    keyIndex = textIndex % key.length;
    result += addLetters(text[textIndex], key[keyIndex]);
  }
  return result;
}

function normalizeText(text){
  return text.replace(/ /g,'').toLowerCase();
}

function makeMapping(map) {
  return function(letter) {
    return map[tables.alphaIndex[letter]];
  };
}

function addLetters(a, b) {
  return modularLetterOperation(a, b, function(x, y){return x + y;});
}

function subtractLetters(a, b) {
  return modularLetterOperation(a, b, function(x, y){return x - y;});
}

function modularLetterOperation(a, b, operation) {
  
  var a = (typeof a === "number") ? a : tables.alphaIndex[a];
  var b = (typeof b === "number") ? b : tables.alphaIndex[b];
  
  var rawCombinedValue = operation(a, b);
  var letterValue = utils.positiveModulo(rawCombinedValue, tables.identityMap.length);
  return tables.identityMap[letterValue];
}

// TODO: put exports inline
exports.normalizeText = normalizeText;
exports.moduloCypherTextWithKey = moduloCypherTextWithKey;
exports.applyMapToText = applyMapToText;
exports.addLetters = addLetters;
exports.subtractLetters = subtractLetters;
exports.applyOffsetToText = applyOffsetToText;
exports.indexedPolyalphabeticCypher = indexedPolyalphabeticCypher;
exports.indexedPolyalphabeticDecypher = indexedPolyalphabeticDecypher;

