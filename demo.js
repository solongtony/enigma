"strict";
var tables = require('./tables.js');
var cypher = require('./cypher.js');
var utils = require('./shared_utils.js');
var puts = utils.puts;
var header = utils.header;

// Do Stuff!!

var clearText, normalizedText, cypherText, decypheredText;

clearText = "Hello World";
puts(clearText);

normalizedText = cypher.normalizeText(clearText);
puts(normalizedText);

header("rot13 map");
puts(normalizedText);

cypherText = cypher.applyMapToText(normalizedText, tables.rot13map);
puts(cypherText);

decypheredText = cypher.applyMapToText(cypherText, tables.rot13map);
puts(decypheredText);

header("Adding Letters, and Letter offsets");
puts("a + a: " + cypher.addLetters("a", "a"));
puts("a + z: " + cypher.addLetters("a", "z"));
puts("z + z: " + cypher.addLetters("z", "z"));
puts();
puts("a offset 0: " + cypher.addLetters("a", 0));
puts("a offset 1: " + cypher.addLetters("a", 1));
puts("z offset 1: " + cypher.addLetters("z", 1));
puts();
puts("z - z: " + cypher.subtractLetters("z", "z"));
puts("z - a: " + cypher.subtractLetters("z", "a"));
puts("z - n: " + cypher.subtractLetters("z", "n"));

header("Caesar Ciphers:\nmonoalphabetic shifted alphabet simple substitution ciphers");

puts("ROT13 index");
puts(normalizedText);

cypherText = cypher.applyOffsetToText(normalizedText, 13);
puts(cypherText);

decypheredText = cypher.applyOffsetToText(cypherText, 13);
puts(decypheredText);

header("rotate by 2, 13 times");
cypherText = normalizedText;
puts(cypherText);
for(var i = 0; i < 13; i++) {
  cypherText = cypher.applyOffsetToText(cypherText, 2);
  puts(cypherText);
}

puts("\nindexed Polyalphabetic Cypher");
puts(normalizedText);

cypherText = cypher.indexedPolyalphabeticCypher(normalizedText);
puts(cypherText);

decypheredText = cypher.indexedPolyalphabeticDecypher(cypherText);
puts(decypheredText);

header("Vigenère Cypher");
// Example from
// http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher
var key = "LEMON";
puts("Key: " + key);
var message = "ATTACKATDAWN";
puts("Message: " + message);
puts(cypher.moduloCypherTextWithKey(message, key));
// TODO: decypher Vigenère Cyphers



