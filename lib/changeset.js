const digest = require('./digest');

function triggersForBinaries(binaries, triggsyRc) {
  var triggers = [];

  binaries.forEach((binary) => {
    triggers = triggers.concat(triggsyRc[binary].triggers);
  });

  return triggers;
}

function determine(binaries, triggsyRc, triggsyStore) {
  function applyTriggersToDigests(triggers) {
    return Promise.all(
      triggers.map((trigger) => digest(trigger).then((sha) => ({ [trigger]: sha })))
    );
  }

  return applyTriggersToDigests(
    triggersForBinaries(binaries, triggsyRc)
  ).then((changesetCandidates) =>
      changesetCandidates.filter((changesetCandidate) => {
        const candidateKey = Object.keys(changesetCandidate)[0];
        const currentState = changesetCandidate[candidateKey];
        const prevState = triggsyStore[candidateKey];

        return !Boolean(prevState) || prevState !== currentState;
      }).map((proven) => Object.keys(proven)[0])
    );
}

module.exports = determine;
