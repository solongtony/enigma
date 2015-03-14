"strict";
var tables = require('./tables.js');
var utils = require('./shared_utils.js');
var puts = utils.puts;

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
// AKA Shift Cipher
// http://en.wikipedia.org/wiki/Caesar_cipher
// http://practicalcryptography.com/ciphers/caesar-cipher/
function applyShiftToText(text, offset){
  var result = "";
  for(var index in text) {
    var letter = text[index];
    result += utils.addLetters(letter, offset);
  }
  return result;
}

// AKA Vigenère Cipher
// http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher
// http://practicalcryptography.com/ciphers/vigenere-gronsfeld-and-autokey-cipher/
function indexedPolyalphabeticCypher(text) {
  var result = "";
  for(var index in text) {
    var letter = text[index];
    //puts("index typeof index: " + index + " " + typeof index);
    // 'index' is a String!
    // "+" converts index into a number.
    var offsetLetter = utils.addLetters(letter, +index);
    result += offsetLetter;
  }
  return result;
}

function indexedPolyalphabeticDecypher(text) {
  var result = "";
  for(var index in text) {
    var letter = text[index];
    result += utils.addLetters(letter, -1 * index);
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
    result += utils.addLetters(text[textIndex], key[keyIndex]);
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

// TODO: put exports inline
exports.normalizeText = normalizeText;
exports.moduloCypherTextWithKey = moduloCypherTextWithKey;
exports.applyMapToText = applyMapToText;
exports.applyShiftToText = applyShiftToText;
exports.indexedPolyalphabeticCypher = indexedPolyalphabeticCypher;
exports.indexedPolyalphabeticDecypher = indexedPolyalphabeticDecypher;

