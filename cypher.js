"strict";

var tables = require('./tables.js');

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
  var letterValue = positiveModulo((numA + numB), tables.identityMap.length);
  return tables.identityMap[letterValue];
}


function positiveModulo(a, b) {
  var result = a % b;
  if(result < 0) return result + b;
  return result;
}

function puts(text){console.log(text||'');}

// Original Research
// Given a key, build a longer key.
// Break the key into segments of prime length.
// Apply each segment as a key.
// Investigate:
//  Is this actually better (stronger encrypton) than using the key directly?
//  Is there a better optimization than segments of prime length?
//  Instead of breaking it into contiguous segments,
//    how about including or not including letters based on masks?
//  What to do with the remaining characters at the end of the key?
function keyExtender(key) {

  // TODO: use a better source of primes.
  var primes = [2, 3, 5, 7, 11, 13];
  var primeProducts = [0, 2, 6, 30, 210, 2310, 30030];
  var primeIndex = 0;
  var keyIndex = 0;
  var keylets = [];
  
  // Bail out if the key isn't long enough for
  // the algorithm.
  if(key.length < 5) return key;
  
  // Break the key into substrings.
  
  while(
        primeIndex < primes.length &&
        keyIndex + primes[primeIndex] <= key.length) {
      
    keylets[keylets.length] = key.substring(
      keyIndex,
      keyIndex += primes[primeIndex]);
    ++primeIndex;
  }
  
  /*
  puts(keylets.join("|"));
  puts(primeIndex + " " + primeProducts[primeIndex]);
  // Bail out it didn't work.
  if(keylets.length == 0) {
    return key;
  }
  */
  
  // Buld a longer key by repeatedly applying each keylet.
  
  var extendedKeyLength = primeProducts[primeIndex];
  // "A" is the identity.
  var result = Array(extendedKeyLength+1).join("A");
  
  for(var keyletIndex in keylets) {
    puts(result + " " + keylets[keyletIndex]);
    result = moduloCypherTextWithKey(result, keylets[keyletIndex]);
  }
  
  return result;
}

// TODO: put exports inline
exports.puts = puts;
exports.normalizeText = normalizeText;
exports.moduloCypherTextWithKey = moduloCypherTextWithKey;
exports.keyExtender = keyExtender;
exports.applyMapToText = applyMapToText;
exports.addLetters = addLetters;
exports.applyOffsetToText = applyOffsetToText;
exports.indexedPolyalphabeticCypher = indexedPolyalphabeticCypher;
exports.indexedPolyalphabeticDecypher = indexedPolyalphabeticDecypher;

//exports.
//exports.
//exports.
//exports.
//exports.

