const tape = require('tape');
const test = require('tape-promise')(tape);

const fixtures = require('test/fixtures');
const json = require('lib/json');
const commands = require('lib/commands');

test('commands/asString returns a commands as a string to run', function (t) {
  return json.fromFile(fixtures.triggsyRc).then((triggsyRc) => {
    t.deepEqual(commands.asString(['package.json'], triggsyRc), ['npm prune && npm i']);
    t.deepEqual(commands.asString(['bower.json'], triggsyRc), ['bower i']);
  });
});
