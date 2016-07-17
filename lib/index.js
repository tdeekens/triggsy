const _ = require('lodash');
const changeset = require('./changeset');
const json = require('./json');
const binaries = require('./binaries');
const commands = require('./commands');

function run(triggsyRcFilename, triggsyStoreFilename, cliKeys) {
  return Promise.all([
    json.fromFile(triggsyRcFilename),
    json.fromFile(triggsyStoreFilename)
  ]).then((jsons) => {
    const triggsyRc = jsons[0];
    const triggsyStore = jsons[1];
    const withBinaries = _.isArray(cliKeys) ?
      binaries.extract(cliKeys, triggsyRc) :
      binaries.possible(triggsyRc);

    return changeset(withBinaries, triggsyRc, triggsyStore).then(
      commands.bindTo(withBinaries, triggsyRc)
    );
  });
}

module.exports = {
  run
};
