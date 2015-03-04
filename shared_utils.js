
exports.positiveModulo = function(a, b) {
  var result = a % b;
  if(result < 0) return result + b;
  return result;
}

exports.puts = function(text){console.log(text||'');}

exports.header = function(text){exports.puts('\n'+text+'\n');};
