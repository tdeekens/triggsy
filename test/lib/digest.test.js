const tape = require('tape');
const test = require('tape-promise')(tape);

const digest = require('lib/digest');
const fixtures = require('test/fixtures');


test('digest rejects for an unexisting file', function () {
  return digest('tatattat.json').catch(() => {});
});

test('digest rejects for an unexisting file', function (t) {
  return digest('tatattat.json').catch((err) => {
    t.equal(err, 'tatattat.json does not exist to digest.');
  });
});

test('digest resolves for an existing file', function () {
  return digest(fixtures.packageJson);
});

test('digest resolves with the SHA512 of the file contents to hash', function (t) {
  return digest(fixtures.packageJson).then((hash) => {
    t.equal(hash, 'b2c76259d251312adc896ce8904ed20d2c2bf55b09cda02fea8ffbabbea2a2fe');
  });
});
