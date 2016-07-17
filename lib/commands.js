const _ = require('lodash');

function hasOne(changeset, triggers) {
  return _.intersection(
    changeset, triggers
  ).length > 0;
}

function asString(binaries, triggsyRc, changeset) {
  const commands = [];

  binaries.forEach((binary) => {
    const triggers = triggsyRc[binary].triggers;
    const binaryWithCommands = triggsyRc[binary].commands.map(
      (command) => `${binary} ${command}`
    ).join(' && ');

    if (hasOne(changeset, triggers)) {
      commands.push(binaryWithCommands);
    }
  });

  return commands;
}

function bindTo(binaries, triggsyRc) {
  return function withChangeset(changeset) {
    return asString(binaries, triggsyRc, changeset);
  };
}

module.exports = {
  asString,
  bindTo
};
