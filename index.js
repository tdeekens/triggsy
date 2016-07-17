const chalk = require('chalk');
const lib = require('./lib/index');

function logCommandsToSpawn(commandsToSpawn) {
  if (commandsToSpawn.length === 0) {
    console.log(chalk.green('All dependencies are up to date.'));
  } else {
    console.log(chalk.yellow(`Spawning \`${commandsToSpawn.join(', ')}\`.`));
  }

  return commandsToSpawn;
}

function process(flags) {
  if (flags.all) {
    console.log(chalk.yellow('Analysing all configured managers.'));

    lib.run(
      '.triggsyrc', '.triggsy'
    ).then(logCommandsToSpawn);
  } else {
    console.log(chalk.yellow('Analysing specified managers.'));

    lib.run(
      '.triggsyrc', '.triggsy', Object.keys(flags)
    ).then(logCommandsToSpawn);
  }
}

module.exports = {
  process
};
