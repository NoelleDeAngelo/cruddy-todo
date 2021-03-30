const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};


// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, num) => {
    fs.writeFile(path.join(exports.dataDir, `${num}.txt`), text, (err) => {
      if (err) {
        throw ('error writing todo');
      } else {
        console.log('todo saved as ' + num);
      }
    });
  });


};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, fileNames)=> {
    if (err) {
      throw ('error reading todolist');
    } else {
      var todos = [];
      _.each(fileNames, (filename)=> {
        var temp = {};
        temp.name = filename;
        temp.id = filename;
        todos.push(temp);
      });

      callback(null, todos);
    }
  });

};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
