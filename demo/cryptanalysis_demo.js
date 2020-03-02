"use strict";
var cryptanalysis = require('../src/cryptanalysis.js');
var shiftTextWithWrap = cryptanalysis.shiftTextWithWrap;
var offsetTextWithSelf = cryptanalysis.offsetTextWithSelf;
var countLetter = cryptanalysis.countLetter;
var indexOfCoincedence = cryptanalysis.indexOfCoincedence;
var utils = require('../src/shared_utils.js');
var puts = utils.puts;
var header = utils.header;

header("cryptanalysis demo");

var message = "abcde";
puts("message " + message);

header("Rotate text");
puts("rotate 1: " + shiftTextWithWrap(message));
puts("rotate 2: " + shiftTextWithWrap(message, 2));
puts("rotate 3: " + shiftTextWithWrap(message, 3));
puts("rotate 4: " + shiftTextWithWrap(message, 4));
puts("rotate 5: " + shiftTextWithWrap(message, 5));
puts("rotate 6: " + shiftTextWithWrap(message, 6));
puts("rotate 7: " + shiftTextWithWrap(message, 7));

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
puts("ioc of " + message + " and " + utils.reverse(message) + ": "
	+ indexOfCoincedence(message, utils.reverse(message)));
message = "abcdefgh";
puts("ioc of " + message + " and " + utils.reverse(message) + ": "
	+ indexOfCoincedence(message, utils.reverse(message)));
