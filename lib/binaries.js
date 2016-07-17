const _ = require('lodash');

function possible(triggsyRc) {
  return Object.keys(triggsyRc);
}

function extract(flags, triggsyRc) {
  return _.intersection(possible(triggsyRc), flags);
}

module.exports = {
  possible,
  extract
};
