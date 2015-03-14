"strict";

var tables = require('./tables');

var utils = {

addLetters: function (a, b) {
  return  utils.modularLetterOperation(a, b, function(x, y){return x + y;});
},

subtractLetters: function(a, b) {
  return  utils.modularLetterOperation(a, b, function(x, y){return x - y;});
},

modularLetterOperation: function(a, b, operation) {
  
  var a = (typeof a === "number") ? a : tables.alphaIndex[a];
  var b = (typeof b === "number") ? b : tables.alphaIndex[b];
  
  var rawCombinedValue = operation(a, b);
  var letterValue = utils.positiveModulo(rawCombinedValue, tables.identityMap.length);
  return tables.identityMap[letterValue];
},

positiveModulo: function(a, b) {
  var result = a % b;
  if(result < 0) return result + b;
  return result;
},

puts: function(text){console.log(text||'');},

header: function(text){utils.puts('\n'+text+'\n');}

}

module.exports = utils;

