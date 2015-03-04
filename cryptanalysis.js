"strict";

var cypher = require("./cypher.js");
var puts = cypher.puts;

function offsetTextWithSelf(text, offset) {
  offset = offset || 1;
  return moduloCypherTextWithKey(text, rotateText(text, offset));
}

function rotateText(text, offset) {
    var firstPart = text.substring(offset, text.length - offset);
    var lastPart = text.substring(0, offset);
    return firstPart + lastPart;
}

var message = "abcde";
puts(message + " rotate 1:" + rotateText(message));
