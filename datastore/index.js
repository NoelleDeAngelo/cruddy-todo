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
var readFileData = (filename) => {
  return new Promise((reject, resolve) => {
    fs.readFile(exports.dataDir + '/' + filename, 'utf8', (err, data)=> {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};


// readFileData.then((data)=> {temp.name= data}).catch( (err)=> {console.log(err)})

// exports.readAll = ()=> {
// return new Promise((resolve, reject) => {
// fs.readdir(export.dataDir, (err, fileNames) => {})
// })
// }

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, fileNames)=> {
    if (err) {
      throw ('error reading todolist');
    } else {
      var todos = [];
      _.each(fileNames, (filename)=> {
        var temp = {};
        temp.name = filename;
        //readFileData(filename).then((data)=> {console.log('this is the',data)}).catch( (err)=> {console.log(err)})
        temp.id = filename;
        todos.push(temp);
      });

      callback(null, todos);
    }
  });

};

exports.readOne = (id, callback) => {
  //console.log(exports.dataDir + `/${id}.txt`);
  fs.readFile(exports.dataDir + `/${id}`, 'utf8', (err, data)=> {
    if (err) {
      console.log('errrrrr');
    } else {
      var todo = [];
      var temp = {};
      temp.text = data;
      temp.id = id;
      todo.push(temp);
      console.log('todos-----', data);
      callback(null, todo);
    }
  });


};

exports.update = (id, text, callback) => {
  fs.writeFile(exports.dataDir + `/${id}`, text, 'utf8', (err, data)=> {
    if (err) {
      console.log('errrrrr');
    } else {
      //var todo = [];
      var temp = {};
      temp.name = text;
      temp.id = id;
      //todo.push(temp);
      //console.log('todo-----', todo)
      callback(id, temp);
    }
  });




  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {
  fs.rm(exports.dataDir + `/${id}`, (err) => {
    if (err) {
      console.log(' error');
    } else {
      callback(id);
    }
  });
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
