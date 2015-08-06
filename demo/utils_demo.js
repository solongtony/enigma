"use strict";
var tables = require('../src/tables.js');
var utils = require('../src/shared_utils.js');
var addLetters = utils.addLetters;
var subtractLetters = utils.subtractLetters;
var puts = utils.puts;
var header = utils.header;

var clearText, normalizedText, cypherText, decypheredText;

clearText = "Hello World";
puts(clearText);

normalizedText = utils.normalizeText(clearText);
puts(normalizedText);

header("Rot13 by Mapping");
puts(normalizedText);

cypherText = utils.applyMapToText(normalizedText, tables.rot13map);
puts(cypherText);

decypheredText = utils.applyMapToText(cypherText, tables.rot13map);
puts(decypheredText);

header("Adding Letters, and Letter offsets");
puts("a + a: " + addLetters("a", "a"));
puts("a + z: " + addLetters("a", "z"));
puts("z + z: " + addLetters("z", "z"));
puts();
puts("a offset 0: " + addLetters("a", 0));
puts("a offset 1: " + addLetters("a", 1));
puts("z offset 1: " + addLetters("z", 1));
puts();
puts("z - z: " + subtractLetters("z", "z"));
puts("z - a: " + subtractLetters("z", "a"));
puts("z - n: " + subtractLetters("z", "n"));

header("Caesar Ciphers:\nmonoalphabetic shifted alphabet simple substitution cipher");

header("ROT13 by Shifting");
puts(normalizedText);

cypherText = utils.applyShiftToText(normalizedText, 13);
puts(cypherText);

decypheredText = utils.applyShiftToText(cypherText, 13);
puts(decypheredText);

header("Rotate by 2, 13 Times");
cypherText = normalizedText;
puts(cypherText);
for(var i = 0; i < 13; i++) {
  cypherText = utils.applyShiftToText(cypherText, 2);
  puts(cypherText);
}
