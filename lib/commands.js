const binaries = require('lib/binaries');
const _ = require('lodash');

function hasOne(changeSet, triggers) {
  return _.intersection(
    changeSet, triggers
  ).length > 0;
}

module.exports.asString = function asString(changeSet, triggsyRc) {
  const commands = [];

  binaries(triggsyRc).forEach((binary) => {
    const triggers = triggsyRc[binary].triggers;
    const binaryWithCommands = triggsyRc[binary].commands.map(
      (command) => `${binary} ${command}`
    ).join(' && ');

    if (hasOne(changeSet, triggers)) {
      commands.push(binaryWithCommands);
    }
  });

  return commands;
};
