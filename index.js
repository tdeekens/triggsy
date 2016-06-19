const chalk = require('chalk');
const managers = {
  npm() {

  },

  bower() {

  }
};

function process(flags) {
  if (flags.npm) {
    managers.npm();
  } else if (flags.bower) {
    managers.bower();
  } else if (flags.all) {
    Object.keys(managers).forEach((manager) => {
      managers[manager]();
    });
  } else {
    console.log(chalk.yellow('No known package manager specified.'));
  }
}

module.exports = {
  process
};
