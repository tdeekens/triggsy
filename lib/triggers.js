const json = require('lib/json');
const binaries = require('lib/binaries');
const digest = require('lib/digest');

function all(triggsyRcFilename) {
  return json.fromFile(triggsyRcFilename).then((triggsyRc) => {
    var triggers = [];

    binaries(triggsyRc).forEach((binary) => {
      triggers = triggers.concat(triggsyRc[binary].triggers);
    });

    return triggers;
  });
}

function toRun(triggsyRcFilename, triggsyStoreFilename) {
  function applyTriggersToDigests(triggers) {
    return Promise.all(
      triggers.map((trigger) => digest(trigger).then((sha) => ({ [trigger]: sha })))
    );
  }

  return all(triggsyRcFilename).then(applyTriggersToDigests).then((runCandidates) =>
    json.fromFile(triggsyStoreFilename).then((triggsyStore) =>
      runCandidates.filter((runCandidate) => {
        const candidateKey = Object.keys(runCandidate)[0];

        return (
          !!!runCandidate[candidateKey] ||
          runCandidate[candidateKey] !== triggsyStore[candidateKey]
        );
      }).map((proven) => Object.keys(proven)[0])
    )
  );
}

module.exports.all = all;
module.exports.toRun = toRun;
