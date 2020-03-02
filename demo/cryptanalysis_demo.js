"use strict";
var cryptanalysis = require('../src/cryptanalysis.js');
var shiftTextWithWrap = cryptanalysis.shiftTextWithWrap;
var offsetTextWithSelf = cryptanalysis.offsetTextWithSelf;
var countLetter = cryptanalysis.countLetter;
var indexOfCoincedence = cryptanalysis.indexOfCoincedence;
var utils = require('../src/shared_utils.js');
var print = utils.print;
var header = utils.header;

header("cryptanalysis demo");

var message = "abcde";
print("message " + message);

header("Rotate text");
print("rotate 1: " + shiftTextWithWrap(message));
print("rotate 2: " + shiftTextWithWrap(message, 2));
print("rotate 3: " + shiftTextWithWrap(message, 3));
print("rotate 4: " + shiftTextWithWrap(message, 4));
print("rotate 5: " + shiftTextWithWrap(message, 5));
print("rotate 6: " + shiftTextWithWrap(message, 6));
print("rotate 7: " + shiftTextWithWrap(message, 7));

header("Offset Text With Self");
print("abcde = 01234");
print("bcdea = 12340");
print("-------------");
print("        13574 = bdfhe");
print(offsetTextWithSelf(message));
print(offsetTextWithSelf(message, 1));
print(offsetTextWithSelf(message, 2));
print(offsetTextWithSelf(message, 3));

header("Letter count");
print("Count 'a's in message: " + countLetter("a", message));
print("Count 'z's in message: " + countLetter("z", message));

header("Index of coincedence");
message = "abcdefg";
print("ioc of " + message + " and " + message + ": " + indexOfCoincedence(message, message));
print("ioc of " + message + " and " + utils.reverse(message) + ": "
	+ indexOfCoincedence(message, utils.reverse(message)));
message = "abcdefgh";
print("ioc of " + message + " and " + utils.reverse(message) + ": "
	+ indexOfCoincedence(message, utils.reverse(message)));
