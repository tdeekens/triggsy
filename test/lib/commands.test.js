const tape = require('tape');
const test = require('tape-promise')(tape);

const fixtures = require('test/fixtures');
const json = require('lib/json');
const binaries = require('lib/binaries');
const commands = require('lib/commands');

test('commands/asString returns a commands as a string to run', function (t) {
  return json.fromFile(fixtures.triggsyRc).then((triggsyRc) => {
    t.deepEqual(
      commands.asString(binaries.possible(triggsyRc), triggsyRc, ['package.json']),
      ['npm prune && npm i']
    );
    t.deepEqual(
      commands.asString(binaries.possible(triggsyRc), triggsyRc, ['bower.json']),
      ['bower i']
    );
  });
});
