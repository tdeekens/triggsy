const tape = require('tape');
const test = require('tape-promise')(tape);

const fixtures = require('test/fixtures');
const triggers = require('lib/triggers');

test('triggers/all returns all triggers', function (t) {
  return triggers.all(fixtures.triggsyRc).then((allTriggers) => {
    t.deepEqual(allTriggers, ['package.json', 'npm-shrinkwrap.json', 'bower.json']);
  });
});

test('triggers/toRun returns only triggers which need to run', function (t) {
  return triggers.toRun(fixtures.triggsyRc, fixtures.triggsy).then((toRunTriggers) => {
    t.deepEqual(toRunTriggers, ['package.json', 'npm-shrinkwrap.json']);
  });
});
