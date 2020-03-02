"use strict";
//var tables = require('./tables.js');
var cypher = require('../src/cypher.js');
var utils = require('../src/shared_utils.js');
var addLetters = utils.addLetters;
var subtractLetters = utils.subtractLetters;
var print = utils.print;
var header = utils.header;

header("cypher demo");

var clearText, normalizedText, cypherText, decypheredText;

clearText = "Hello World";
print(clearText);

normalizedText = utils.normalizeText(clearText);
print(normalizedText);

header("Indexed Polyalphabetic Cypher");
print(normalizedText);

cypherText = cypher.indexedPolyalphabetic.encypher(normalizedText);
print(cypherText);

decypheredText = cypher.indexedPolyalphabetic.decypher(cypherText);
print(decypheredText);

header("Vigenère Cypher");
// Example from
// http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher
var key = "LEMON";
print("Key: " + key);
var message = "ATTACKATDAWN";
print("Message: " + message);
cypherText = cypher.vigenere.encypher(message, key);
print(cypherText);
decypheredText = cypher.vigenere.decypher(cypherText, key);
print(decypheredText);
