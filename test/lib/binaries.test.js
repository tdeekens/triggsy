const tape = require('tape');
const test = require('tape-promise')(tape);

const fixtures = require('test/fixtures');
const binaries = require('lib/binaries');
const json = require('lib/json');

test('binaries determines the binaries within a ".triggsyrc"', function (t) {
  return json.fromFile(fixtures.triggsyRc).then((triggsyRc) => {
    t.deepEqual(['npm', 'bower'], binaries(triggsyRc));
    t.deepEqual(['npm', 'bower'], binaries(triggsyRc));
  });
});
