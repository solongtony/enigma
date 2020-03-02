"use strict";
//var tables = require('./tables.js');
var cypher = require('../src/cypher.js');
var utils = require('../src/shared_utils.js');
var addLetters = utils.addLetters;
var subtractLetters = utils.subtractLetters;
var puts = utils.puts;
var header = utils.header;

header("cypher demo");

var clearText, normalizedText, cypherText, decypheredText;

clearText = "Hello World";
puts(clearText);

normalizedText = utils.normalizeText(clearText);
puts(normalizedText);

header("Indexed Polyalphabetic Cypher");
puts(normalizedText);

cypherText = cypher.indexedPolyalphabetic.encypher(normalizedText);
puts(cypherText);

decypheredText = cypher.indexedPolyalphabetic.decypher(cypherText);
puts(decypheredText);

header("Vigenère Cypher");
// Example from
// http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher
var key = "LEMON";
puts("Key: " + key);
var message = "ATTACKATDAWN";
puts("Message: " + message);
cypherText = cypher.vigenere.encypher(message, key);
puts(cypherText);
decypheredText = cypher.vigenere.decypher(cypherText, key);
puts(decypheredText);
