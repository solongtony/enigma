"strict";
var tables = require('./tables.js');
var cypher = require('./cypher.js');
var utils = require('./shared_utils.js');
var puts = utils.puts;

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
  
  // Buld a longer key by repeatedly applying each keylet.
  
  var extendedKeyLength = primeProducts[primeIndex];
  // "A" is the identity.
  var result = Array(extendedKeyLength+1).join("A");
  
  for(var keyletIndex in keylets) {
    puts(result + " " + keylets[keyletIndex]);
    result = cypher.moduloCypherTextWithKey(result, keylets[keyletIndex]);
  }
  
  return result;
}

exports.keyExtender = keyExtender;
