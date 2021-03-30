const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;
// fs.readFile('/datastore/counter.txt', (err, data) => {
//   if (err) {
//     console.log('eeeeerrrrrrrrr');
//   } else {
//     console.log('dataaaaa----', data);
//   }

// });
console.log('counter from the top------', counter);
//console.log('exports.counterFile----', exports.counterFile)

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};
//number 1 to string '00001'

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (cb) => {


  readCounter((err, number) => {
    var counter1 = number + 1;
    writeCounter(counter1, (err, counterString) => {
      cb(err, counterString);
    });

  });
  // console.log('temp',temp)
  // counter = counter + 1;
  // return zeroPaddedNumber(counter);


  // //1. read counter from fs
  // var oldCounter = readCounter();
  // //2.increment the counter
  // var newCounter = oldCounter + 1;
  // //3. write it back on fs
  // writeCounter(newCounter);

};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
// /Users/eddieyeung/Desktop/HR hrsjo5/hr-sjo5-cruddy-todo/datastore/counter.txt

//console.log('zeroPaddedNumber----->', zeroPaddedNumber(1));
// zeroPaddedNumber function will take a number (1) and then in to a string  '00001'


// var callBackTest = fs.readFile(x, (err, results) => {
//   if (err) {
//     console.log('oops we had an err reading files from x');
//   } else {
//     console.log('reading files was successful here is data', results);
//   }
// })
// fs.readFile => was  successful

// var callbackTest2 = function (x) {
//  var result = fs.readFile(x);
//  retrun result;
// }