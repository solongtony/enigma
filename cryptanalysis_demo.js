"strict";
var cryptanalysis = require('./cryptanalysis.js');
var rotateText = cryptanalysis.rotateText;
var offsetTextWithSelf = cryptanalysis.offsetTextWithSelf;
var countLetter = cryptanalysis.countLetter;
var indexOfCoincedence = cryptanalysis.indexOfCoincedence;
var utils = require('./shared_utils.js');
var puts = utils.puts;
var header = utils.header;


var message = "abcde";
puts("message " + message);

header("Rotate text");
puts("rotate 1: " + rotateText(message));
puts("rotate 2: " + rotateText(message, 2));
puts("rotate 3: " + rotateText(message, 3));
puts("rotate 4: " + rotateText(message, 4));
puts("rotate 5: " + rotateText(message, 5));
puts("rotate 6: " + rotateText(message, 6));
puts("rotate 7: " + rotateText(message, 7));

header("Offset Text With Self");
puts("abcde = 01234");
puts("bcdea = 12340");
puts("-------------");
puts("        13574 = bdfhe");
puts(offsetTextWithSelf(message));
puts(offsetTextWithSelf(message, 1));
puts(offsetTextWithSelf(message, 2));
puts(offsetTextWithSelf(message, 3));

header("Letter count");
puts("Count 'a's in message: " + countLetter("a", message));
puts("Count 'z's in message: " + countLetter("z", message));

header("Index of coincedence");
message = "abcdefg";
puts("ioc of " + message + " and " + message + ": " + indexOfCoincedence(message, message));
puts("ioc of " + message + " and " + utils.reverse(message) + ": " + indexOfCoincedence(message, utils.reverse(message)));
message = "abcdefgh";
puts("ioc of " + message + " and " + utils.reverse(message) + ": " + indexOfCoincedence(message, utils.reverse(message)));

