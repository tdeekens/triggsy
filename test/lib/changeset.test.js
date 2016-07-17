const tape = require('tape');
const test = require('tape-promise')(tape);

const fixtures = require('test/fixtures');
const changeset = require('lib/changeset');
const json = require('lib/json');
const binaries = require('lib/binaries');

test('changeset returns all changed files for all binaries', function (t) {
  return Promise.all([
    json.fromFile(fixtures.triggsyRc),
    json.fromFile(fixtures.triggsy)
  ]).then((jsons) => {
    const triggsyRc = jsons[0];
    const triggsyStore = jsons[1];

    changeset(
      binaries.possible(triggsyRc), triggsyRc, triggsyStore
    ).then((changeSet) => {
      t.deepEqual(changeSet, ['package.json', 'npm-shrinkwrap.json']);
    });
  });
});

test('changeset returns all changed files for a subset of binaries', function (t) {
  return Promise.all([
    json.fromFile(fixtures.triggsyRc),
    json.fromFile(fixtures.triggsy)
  ]).then((jsons) => {
    const triggsyRc = jsons[0];
    const triggsyStore = jsons[1];

    changeset(
      [binaries.possible(triggsyRc)[1]], triggsyRc, triggsyStore
    ).then((changeSet) => {
      t.deepEqual(changeSet, []);
    });
  });
});
