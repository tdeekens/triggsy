const tape = require('tape');
const test = require('tape-promise')(tape);

const fixtures = require('test/fixtures');
const binaries = require('lib/binaries');
const json = require('lib/json');

test('binaries/possible determines the binaries within a ".triggsyrc"', function (t) {
  return json.fromFile(fixtures.triggsyRc).then((triggsyRc) => {
    t.deepEqual(['npm', 'bower'], binaries.possible(triggsyRc));
  });
});

test('binaries/extract extracts given binaries against matching a ".triggsyrc"', function (t) {
  return json.fromFile(fixtures.triggsyRc).then((triggsyRc) => {
    t.deepEqual(['npm'], binaries.extract(['npm'], triggsyRc));
    t.deepEqual(
      ['npm', 'bower'],
      binaries.extract(['npm', 'bower', 'foo'], triggsyRc)
    );
  });
});
