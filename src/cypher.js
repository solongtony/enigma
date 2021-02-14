"use strict";
var tables = require('./tables.js');
var utils = require('./shared_utils.js');
var print = utils.print;

// Each of these Cypher implementations has an `encypher` and `decypher` method.

var cypher = {

// Caesar Cipher
// AKA Shift Cipher
// The key is the number of places to shift.
// http://en.wikipedia.org/wiki/Caesar_cipher
// http://practicalcryptography.com/ciphers/caesar-cipher/
caesar: {
  encypher: utils.applyShiftToText,
  deypher: function(text, offset){ return utils.applyShiftToText(text, -1 * offset); }
},

// TODO: find some references
indexedPolyalphabetic: {
  encypher: function(text) {
    var result = "";
    var index, letter, offsetLetter;
    for(index in text) {
      letter = text[index];
      //print("index typeof index: " + index + " " + typeof index);
      // 'index' is a String!
      // "+" converts index into a number.
      offsetLetter = utils.addLetters(letter, +index);
      result += offsetLetter;
    }
    return result;
  },

  decypher: function(text) {
    var result = "";
    var index, letter;
    for(index in text) {
      letter = text[index];
      result += utils.addLetters(letter, -1 * index);
    }
    return result;
  }
},

// Vigenère cipher.
// Apply a key using modulo arithmatic.
// Repeat the key as necessary.
// http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher
// The key is a string of characters.
// http://practicalcryptography.com/ciphers/vigenere-gronsfeld-and-autokey-cipher/
vigenere: {
  // TODO:
  //   Put this basic functionality into utils.
  //   Re-write usin a generic zip function.
  encypher: function(text, key) {
    var result = "";
    var textIndex, keyIndex;
    for(textIndex in text) {
      keyIndex = textIndex % key.length;
      result += utils.addLetters(text[textIndex], key[keyIndex]);
    }
    return result;
  },

  decypher: function(text, key) {
    var result = "";
    var textIndex, keyIndex;
    for(textIndex in text) {
      keyIndex = textIndex % key.length;
      result += utils.subtractLetters(text[textIndex], key[keyIndex]);
    }
    return result;
  }
}

autokey: {
  // This cypher uses a predefined lookup table.
  // The defined "tabula recta" just defines a modulo shift operation, so the table isn't actually needed.
  // An arbitrary table could be used instead.
  // The steps of the cypher are more complicated than the Vigenère-Gronsfeld cypher,
  // and it is considered more secure.
}

};

module.exports = cypher;
