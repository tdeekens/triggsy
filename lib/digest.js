const crypto = require('crypto');
const fs = require('fs');

module.exports = function (filename) {
  const hash = crypto.createHash('sha256');

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filename)) {
      reject(`${filename} does not exist to digest.`);

      return;
    }

    const input = fs.createReadStream(filename);

    input.on('readable', () => {
      const data = input.read();

      if (data) {
        hash.update(data);
      } else {
        resolve(hash.digest('hex'));
      }
    });
  });
};
