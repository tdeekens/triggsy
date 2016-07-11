const fs = require('fs');

module.exports.to = JSON.stringify;
module.exports.fromString = JSON.parse;

module.exports.fromFile = function (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) { reject(err); }

      resolve(JSON.parse(data));
    });
  });
};
