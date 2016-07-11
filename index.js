const chalk = require('chalk');
const _ = require('lodash');
const json = require('./lib/json');
const binaries = require('./lib/binaries');

/**
function state(dependencyManifest) {
  const crypto = require('crypto');
  const manifest = fs.readFileSync(dependencyManifest);

  return {
    manifest: dependencyManifest,
    state: crypto.createHash('sha1').update(manifest).digest('hex')
  };
}

function updateLock(dependencyManifest, state) {
  const states = fs.readFileSync('./.triggsy');

  states[dependencyManifest] = state;

  fs.writeFileSync('./.triggsy', states);
}

function shouldTriggerUpdate(dependencyManifest) {
  const states = fs.readFileSync('./.triggsy');
  const currentState = states[dependencyManifest];
  const nextState = state(dependencyManifest);

  if (
    !currentState ||
    currentState !== nextState
  ) {
    return {
      manifest: dependencyManifest,
      shouldUpdate: true
    };
  }

  return {
    manifest: dependencyManifest,
    shouldUpdate: false,
    state: nextState
  };
}
**/

function process(flags) {
  json.fromFile('.triggsyrc').then((triggsyRc) => {
    const isSupportedBinary = _.difference(Object.keys(flags), binaries(triggsyRc)).length === 0;

    if (flags.all) {
      console.log(chalk.yellow('Analysing all configured managers.'));
    } else if (isSupportedBinary) {
      console.log(chalk.yellow(`Analysing depdencies for \`${binaries(triggsyRc).join(', ')}\`.`));
    } else {
      console.log(chalk.yellow('No known manager specified in <.triggsyrc>.'));
    }
  });
}

module.exports = {
  process
};
