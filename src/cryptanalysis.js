"use strict";
var cypher = require('./cypher.js');
var utils = require('./shared_utils.js');
var print = utils.print;
var header = utils.header;

// Tools and techniques for examening and ultimately cracking encyphered text.
// Focus is on historically significant techniques, although modern techniques
// for analyzing historic cyphers may be included.

var cryptanalysis = {
  offsetTextWithSelf: function(text, offset) {
    offset = offset || 1;
    return cypher.vigenere.encypher(text, cryptanalysis.shiftTextWithWrap(text, offset));
  },

  shiftTextWithWrap: function(text, offset) {
    offset = offset || 1;
    if(offset > text.length) offset = offset % text.length;
    var firstPart = text.substring(offset, text.length);
    var lastPart = text.substring(0, offset);
    return firstPart + lastPart;
  },

  countLetter: function(letter, message){
    var count = 0, index = 0;
    for(index in message) {
      if(message[index] == letter) ++count;
    }
    return count;
  },

  // The index of coincidence is the rate at which the letters in the same
  // position in two different messages are the same.
  // AKA Incidence of Coincidence.
  indexOfCoincedence: function(message1, message2) {
    // Using modular subtraction, not addition.
    var modSelf = cypher.vigenere.decypher(message1, message2);
    // where "a" is the identity.
    return cryptanalysis.countLetter("a", modSelf) / message1.length;
  }

}

module.exports = cryptanalysis;
