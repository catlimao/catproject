const keys = {
  draft: 'catQuiz.answersDraft',
  unlocked: 'catQuiz.unlockedResults',
  lastResult: 'catQuiz.lastResult',
};

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function readDraft() {
  return readJson(keys.draft, { catSuffix: null, answers: {}, step: 0 });
}

export function saveDraft(draft) {
  writeJson(keys.draft, draft);
}

export function clearDraft() {
  localStorage.removeItem(keys.draft);
}

export function readUnlockedResults() {
  return readJson(keys.unlocked, []);
}

export function unlockResult(resultSlug) {
  const unlocked = new Set(readUnlockedResults());
  unlocked.add(resultSlug);
  const next = [...unlocked];
  writeJson(keys.unlocked, next);
  return next;
}

export function saveLastResult(result) {
  writeJson(keys.lastResult, {
    resultSlug: result.resultSlug,
    catSuffix: result.catSuffix.id,
    typeCode: result.typeCode,
    scores: result.scores,
  });
}

export function readLastResult() {
  return readJson(keys.lastResult, null);
}
