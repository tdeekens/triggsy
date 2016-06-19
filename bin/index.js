#!/usr/bin/env node

const meow = require('meow');
const chalk = require('chalk');
const triggsy = require('../index');

const cli = meow(`
    Usage
      $ triggsy <install | i>

    Options
      -n, --npm  Install npm dependencies if needed
      -b, --bower  Install npm dependencies if needed
      -a, --all  Install all if needed

    Examples
      $ triggsy i --bower
`, {
  alias: {
    n: 'npm',
    b: 'bower',
    a: 'all'
  }
});

switch (cli.input[0]) {
  case 'install':
  case 'i':
    console.log(
      `${chalk.green('====')} Waking up triggsy: running triggsy install ${chalk.green('====')}`
    );
    triggsy.process(cli.flags);
    break;
  default:
    console.log(
      `${chalk.red('====')} Unknown action: run ${chalk.green('triggsy i')} ${chalk.red('====')}`
    );
}
