const tape = require('tape');
const test = require('tape-promise')(tape);
const fs = require('fs');

const fixtures = require('test/fixtures');
const json = require('lib/json');

test('json/fromFile parses a file\'s content to json', function (t) {
  return json.fromFile(fixtures.triggsyRc).then((triggsyRc) => {
    const controlParse = JSON.parse(fs.readFileSync(fixtures.triggsyRc));

    t.deepEqual(controlParse, triggsyRc);
    t.notDeepEqual({}, triggsyRc);
  });
});

test('json/fromString parses a string to json', function (t) {
  t.plan(2);

  const jsonString = '{"hi":"there"}';
  const parsed = json.fromString(jsonString);
  const controlParse = JSON.parse(jsonString);

  t.deepEqual(controlParse, parsed);
  t.notDeepEqual({}, parsed);

  t.end();
});

test('json/to serialises an object to json', function (t) {
  t.plan(2);

  const thing = { hi: 'there' };
  const serialised = json.to(thing);
  const controlSerialise = JSON.stringify(thing);

  t.deepEqual(controlSerialise, serialised);
  t.notDeepEqual('{}', serialised);

  t.end();
});
