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
  var numA = (typeof a === "number") ? a : tables.alphaIndex[a];
  var numB = (typeof b === "number") ? b : tables.alphaIndex[b];
  // Create output like "( 14 + -3 ) % 26 = 11"
//  puts(
//    "( " +
//    originalLetterValue + " + " +
//    offset + " ) % " +
//    alphaLength + " = " +
//    letterValue);
  var letterValue = utils.positiveModulo((numA + numB), tables.identityMap.length);
  return tables.identityMap[letterValue];
}

// TODO: put exports inline
exports.normalizeText = normalizeText;
exports.moduloCypherTextWithKey = moduloCypherTextWithKey;
exports.applyMapToText = applyMapToText;
exports.addLetters = addLetters;
exports.applyOffsetToText = applyOffsetToText;
exports.indexedPolyalphabeticCypher = indexedPolyalphabeticCypher;
exports.indexedPolyalphabeticDecypher = indexedPolyalphabeticDecypher;

