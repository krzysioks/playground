"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = exports.printStr = exports.addNumbersAsString = void 0;
var userName = 'krysiek';
var isLoggedIn = true;
userName += ' added value';
console.log('isLoggedIn: ', isLoggedIn);
var myFirstArray = userName.split(' ');
console.log('myFirstArray: ', myFirstArray);
var secondArray = [1, 2, 3];
var john = {
    name: 'John',
    lastName: 'Dow',
    age: 44
};
var johnsBooks = {
    1: 'Book 1',
    2: 'Book 2',
    5: 'Book 5'
};
console.log('johnsBooks: ', johnsBooks);
function addNumbers(a, b) {
    return a + b;
}
var addNumbersAsString = function (a, b) {
    return "Outcome: ".concat(a, " ").concat(b);
};
exports.addNumbersAsString = addNumbersAsString;
var printStr = function (a, b) {
    console.log((0, exports.addNumbersAsString)(a, b));
};
exports.printStr = printStr;
var fetchData = function (a, b) {
    return Promise.resolve("Outcome: ".concat(a, " ").concat(b));
};
exports.fetchData = fetchData;
exports.default = addNumbers;
