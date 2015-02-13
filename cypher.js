
//           11 1111111222222
//0123456789012 3456789012345
//abcdefghijklm nopqrstuvwxyz

// This accomodates both lower and uppercase,
// so text doesn't have to be normalized as much.
var alphaIndex = {
  a:0, A:0, b:1, B:1, c:2, C:2, d:3, D:3, e:4, E:4, f:5, F:5, g:6, G:6,
  h:7, H:7, i:8, I:8, j:9, J:9, k:10, K:10, l:11, L:11, m:12, M:12, n:13, N:13,
  o:14, O:14, p:15, P:15, q:16, Q:16, r:17, R:17, s:18, S:18, t:19, T:19,
  u:20, U:20, v:21, V:21, w:22, W:22, x:23, X:23, y:24, Y:24, z:25, Z:25 };

// undefined => haqrsvarq
rot13map = [
  'n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m'];

identityMap = [
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

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
    result += offsetMapping(letter, offset);
  }
  return result;
}

function indexedPolyalphabeticCypher(text) {
  var result = "";
  for(var index in text) {
    var letter = text[index];
    var offsetLetter = offsetMapping(letter, index);
    puts(letter + " + " + index + " = " + offsetLetter);
    result += offsetLetter;
  }
  return result;
}

function indexedPolyalphabeticDecypher(text) {
  var result = "";
  for(var index in text) {
    var letter = text[index];
    result += offsetMapping(letter, -1 * index);
  }
  return result;
}

function normalizeText(text){
  return text.replace(/ /g,'').toLowerCase();
}

function makeMapping(map) {
  return function(letter) {
    return map[alphaIndex[letter]];
  };
}

function offsetMapping(letter, offset) {
  // TODO: debug strange values from this.
  // Maybe from the modulo?
  var letterValue = (alphaIndex[letter] + offset) % identityMap.length;
  puts(letterValue);
  return identityMap[letterValue];
}

function puts(text){console.log(text||'');}

// Do Stuff!!

var clearText, normalizedText, cypherText, decypheredText;

clearText = "Hello World";
puts(clearText);

normalizedText = normalizeText(clearText);
puts(normalizedText);

/*
puts("\nrot13 map\n");
puts(normalizedText);

cypherText = applyMapToText(normalizedText, rot13map);
puts(cypherText);

decypheredText = applyMapToText(cypherText, rot13map);
puts(decypheredText);

puts("\nOffset Mapping\n");

puts(offsetMapping("a", 0));
puts(offsetMapping("a", 1));

puts("\nOffset Index\n");

puts("ROT13 index");
puts(normalizedText);

cypherText = applyOffsetToText(normalizedText, 13);
puts(cypherText);

decypheredText = applyOffsetToText(cypherText, 13);
puts(decypheredText);

puts("\nrotate by 2, 13 times");
cypherText = normalizedText;
puts(cypherText);
for(var i = 0; i < 13; i++) {
  cypherText = applyOffsetToText(cypherText, 2);
  puts(cypherText);
}
*/

puts("\nindexedPolyalphabeticCypher");
puts(normalizedText);

cypherText = indexedPolyalphabeticCypher(normalizedText);
puts(cypherText);

decypheredText = indexedPolyalphabeticDecypher(cypherText);
puts(decypheredText);



