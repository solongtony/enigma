"use strict";
var tables = require('../src/tables.js');
var utils = require('../src/shared_utils.js');
var addLetters = utils.addLetters;
var subtractLetters = utils.subtractLetters;
var print = utils.print;
var header = utils.header;

header("utils demo");

var clearText, normalizedText, cypherText, decypheredText;

clearText = "Hello World";
print(clearText);

normalizedText = utils.normalizeText(clearText);
print(normalizedText);

header("Rot13 by Mapping");
print(normalizedText);

cypherText = utils.applyMapToText(normalizedText, tables.rot13map);
print(cypherText);

decypheredText = utils.applyMapToText(cypherText, tables.rot13map);
print(decypheredText);

header("Adding Letters, and Letter offsets");
print("a + a: " + addLetters("a", "a"));
print("a + z: " + addLetters("a", "z"));
print("z + z: " + addLetters("z", "z"));
print();
print("a offset 0: " + addLetters("a", 0));
print("a offset 1: " + addLetters("a", 1));
print("z offset 1: " + addLetters("z", 1));
print();
print("z - z: " + subtractLetters("z", "z"));
print("z - a: " + subtractLetters("z", "a"));
print("z - n: " + subtractLetters("z", "n"));

header("Caesar Ciphers:\nmonoalphabetic shifted alphabet simple substitution cipher");

header("ROT13 by Shifting");
print(normalizedText);

cypherText = utils.applyShiftToText(normalizedText, 13);
print(cypherText);

decypheredText = utils.applyShiftToText(cypherText, 13);
print(decypheredText);

header("Rotate by 2, 13 Times");
cypherText = normalizedText;
print(cypherText);
for(var i = 0; i < 13; i++) {
  cypherText = utils.applyShiftToText(cypherText, 2);
  print(cypherText);
}
print()
