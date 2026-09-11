import { catSuffixes, domains, hiddenResults, roleMatrix, roles, traits } from '../data/quizData';

const LETTERS = ['A', 'B', 'C', 'D'];
const TIE_BREAKS = {
  P: ['B', 'A', 'C', 'D'],
  alpha: ['A', 'B', 'C', 'D'],
  beta: ['A', 'B', 'C', 'D'],
};

const serviceScores = [
  [2, ['A'], 2],
  [3, ['A', 'B'], 2],
  [5, ['A', 'C'], 2],
  [7, ['A', 'B'], 2],
  [8, ['A'], 3],
  [9, ['A'], 2],
  [11, ['A'], 2],
  [12, ['B'], 2],
  [15, ['A', 'B'], 2],
  [18, ['A', 'C'], 2],
];

const hiddenHitSets = {
  walking_atm: [
    [2, ['B']],
    [7, ['A']],
    [9, ['A', 'B']],
    [12, ['A']],
    [13, ['B']],
    [20, ['A']],
  ],
  cat_language_scholar: [
    [1, ['D']],
    [7, ['B', 'D']],
    [12, ['C', 'D']],
    [15, ['B', 'D']],
    [16, ['D']],
    [18, ['D']],
    [20, ['C', 'D']],
  ],
  certified_scapegoat: [
    [3, ['A', 'C', 'D']],
    [10, ['A', 'C', 'D']],
    [14, ['A']],
    [19, ['A']],
  ],
};

const scoreSets = {
  food: [
    [2, ['B']],
    [4, ['A']],
    [7, ['A']],
    [9, ['A', 'B']],
    [12, ['A']],
    [16, ['A']],
    [20, ['A']],
  ],
  play: [
    [4, ['C']],
    [5, ['C']],
    [10, ['B']],
    [12, ['C']],
    [14, ['A', 'D']],
    [16, ['C']],
    [20, ['C']],
  ],
  endure: [
    [3, ['A', 'C']],
    [8, ['A', 'B', 'C']],
    [10, ['A', 'C', 'D']],
    [11, ['A', 'C']],
    [13, ['C', 'D']],
    [17, ['C', 'D']],
  ],
  love: [
    [1, ['A', 'B', 'D']],
    [2, ['A', 'D']],
    [4, ['B', 'D']],
    [7, ['B', 'D']],
    [8, ['A', 'C', 'D']],
    [12, ['B', 'D']],
    [16, ['B', 'D']],
  ],
};

const traitScoreMods = {
  A: { food: 5, play: 3, endure: 10, love: 5 },
  B: { food: 8, play: 5, endure: 5, love: 2 },
  C: { food: 0, play: 0, endure: 2, love: 1 },
  D: { food: 3, play: 8, endure: 4, love: 2 },
};

export function emptyCounts() {
  return { A: 0, B: 0, C: 0, D: 0 };
}

export function countGroup(answers, questions, group) {
  return questions
    .filter((question) => question.group === group)
    .reduce((counts, question) => {
      const answer = answers[question.id];
      if (LETTERS.includes(answer)) {
        counts[answer] += 1;
      }
      return counts;
    }, emptyCounts());
}

export function resolveWinner(counts, group) {
  const max = Math.max(...LETTERS.map((letter) => counts[letter]));
  return TIE_BREAKS[group].find((letter) => counts[letter] === max);
}

export function getIntensity(counts, group) {
  const sorted = LETTERS.map((letter) => counts[letter]).sort((a, b) => b - a);
  const max = sorted[0];
  const gap = sorted[0] - sorted[1];

  if (group === 'P') {
    if (max >= 5 && gap >= 3) return 'clear';
    if (max >= 4 && gap >= 1) return 'likely';
    if (gap <= 1) return 'lean';
    return 'mixed';
  }

  if (max >= 4 && gap >= 2) return 'clear';
  if (max >= 3 && gap >= 1) return 'likely';
  return 'lean';
}

export function getNormalCore(answers, questions) {
  const pCounts = countGroup(answers, questions, 'P');
  const alphaCounts = countGroup(answers, questions, 'alpha');
  const betaCounts = countGroup(answers, questions, 'beta');
  const traitLetter = resolveWinner(pCounts, 'P');
  const domainLetter = resolveWinner(alphaCounts, 'alpha');
  const slotLetter = resolveWinner(betaCounts, 'beta');
  const roleSlug = roleMatrix[domainLetter][slotLetter];
  const trait = traits[traitLetter];
  const domain = domains[domainLetter];
  const role = roles[roleSlug];

  return {
    traitLetter,
    domainLetter,
    slotLetter,
    roleSlug,
    resultSlug: `${trait.slugPrefix}_${roleSlug}`,
    typeCode: `${trait.code}-${domain.id}-${slotLetter}`,
    trait,
    domain,
    role,
    counts: { P: pCounts, alpha: alphaCounts, beta: betaCounts },
    intensities: {
      trait: getIntensity(pCounts, 'P'),
      domain: getIntensity(alphaCounts, 'alpha'),
      slot: getIntensity(betaCounts, 'beta'),
    },
  };
}

export function countHits(answers, hitSet) {
  return hitSet.reduce((total, [questionId, letters]) => {
    return total + (letters.includes(answers[questionId]) ? 1 : 0);
  }, 0);
}

export function getServiceScore(answers) {
  return serviceScores.reduce((total, [questionId, letters, points]) => {
    return total + (letters.includes(answers[questionId]) ? points : 0);
  }, 0);
}

export function clampScore(score) {
  return Math.max(35, Math.min(99, Math.round(score)));
}

export function calculateScores(answers, traitLetter) {
  const mods = traitScoreMods[traitLetter];
  const scoreFromHits = (key) => {
    const hits = countHits(answers, scoreSets[key]);
    return clampScore(42 + (hits / scoreSets[key].length) * 48 + mods[key]);
  };

  return {
    food: scoreFromHits('food'),
    play: scoreFromHits('play'),
    endure: scoreFromHits('endure'),
    love: scoreFromHits('love'),
  };
}

export function getHiddenResult(answers, normalCore) {
  const serviceScore = getServiceScore(answers);
  if (['A', 'B'].includes(normalCore.traitLetter) && serviceScore >= 18) {
    return { slug: 'chosen_litter_owner', triggerId: 'H01' };
  }

  if (normalCore.domainLetter === 'A' && countHits(answers, hiddenHitSets.walking_atm) >= 5) {
    return { slug: 'walking_atm', triggerId: 'H02' };
  }

  if (countHits(answers, hiddenHitSets.cat_language_scholar) >= 5) {
    return { slug: 'cat_language_scholar', triggerId: 'H03' };
  }

  if (normalCore.roleSlug === 'blame_taker' && countHits(answers, hiddenHitSets.certified_scapegoat) >= 4) {
    return { slug: 'certified_scapegoat', triggerId: 'H04' };
  }

  return null;
}

export function buildNormalResult(normalCore, catSuffixId, answers) {
  const suffix = catSuffixes.find((item) => item.id === catSuffixId) || catSuffixes[0];
  const title = `${normalCore.trait.label}的${normalCore.role.label}`;
  const scores = calculateScores(answers, normalCore.traitLetter);

  return {
    kind: 'normal',
    resultSlug: normalCore.resultSlug,
    roleSlug: normalCore.roleSlug,
    catSuffix: suffix,
    typeCode: `${normalCore.typeCode}-${suffix.id}`,
    title,
    tagline: normalCore.role.tagline,
    analysis: `${normalCore.role.analysisCore}${normalCore.trait.suffix}`,
    catVoice: `${normalCore.role.catVoiceCore} ${normalCore.trait.catVoice}`,
    image: `characters/${normalCore.resultSlug}.png`,
    fallbackImage: `characters/${normalCore.resultSlug}.webp`,
    accent: suffix.accent || normalCore.trait.accent,
    sticker: suffix.sticker,
    scores,
    counts: normalCore.counts,
    intensities: normalCore.intensities,
    trait: normalCore.trait,
    domain: normalCore.domain,
    role: normalCore.role,
  };
}

export function buildHiddenResult(hidden, catSuffixId) {
  const definition = hiddenResults[hidden.slug];
  const suffix = catSuffixes.find((item) => item.id === catSuffixId) || catSuffixes[0];
  return {
    kind: 'hidden',
    hiddenSlug: hidden.slug,
    resultSlug: hidden.slug,
    triggerId: hidden.triggerId,
    catSuffix: suffix,
    typeCode: `${hidden.triggerId}-${suffix.id}`,
    title: definition.title,
    tagline: definition.tagline,
    analysis: definition.analysis,
    catVoice: definition.catVoice,
    image: `hidden/hidden_${hidden.slug}.png`,
    fallbackImage: `hidden/hidden_${hidden.slug}.webp`,
    accent: definition.accent,
    sticker: definition.sticker,
    scores: definition.scores,
  };
}

export function calculateResult(answers, questions, catSuffixId = 'cool') {
  const normalCore = getNormalCore(answers, questions);
  const hidden = getHiddenResult(answers, normalCore);
  return hidden ? buildHiddenResult(hidden, catSuffixId) : buildNormalResult(normalCore, catSuffixId, answers);
}

export function buildResultFromSlug(resultSlug, catSuffixId = 'cool', storedScores = null) {
  if (hiddenResults[resultSlug]) {
    const hidden = buildHiddenResult({ slug: resultSlug, triggerId: hiddenResults[resultSlug].id }, catSuffixId);
    return storedScores ? { ...hidden, scores: storedScores } : hidden;
  }

  const traitEntry = Object.entries(traits).find(([, trait]) => resultSlug.startsWith(`${trait.slugPrefix}_`));
  if (!traitEntry) return null;

  const [traitLetter, trait] = traitEntry;
  const roleSlug = resultSlug.replace(`${trait.slugPrefix}_`, '');
  const role = roles[roleSlug];
  if (!role) return null;

  const suffix = catSuffixes.find((item) => item.id === catSuffixId) || catSuffixes[0];
  return {
    kind: 'normal',
    resultSlug,
    roleSlug,
    catSuffix: suffix,
    typeCode: `分享卡-${suffix.id}`,
    title: `${trait.label}的${role.label}`,
    tagline: role.tagline,
    analysis: `${role.analysisCore}${trait.suffix}`,
    catVoice: `${role.catVoiceCore} ${trait.catVoice}`,
    image: `characters/${resultSlug}.png`,
    fallbackImage: `characters/${resultSlug}.webp`,
    accent: suffix.accent || trait.accent,
    sticker: suffix.sticker,
    scores: storedScores || { food: 76, play: 76, endure: 76, love: 88 },
    trait,
    role,
  };
}

export function getAllNormalResults() {
  return Object.values(traits).flatMap((trait) =>
    Object.values(roles).map((role) => ({
      kind: 'normal',
      resultSlug: `${trait.slugPrefix}_${Object.entries(roles).find(([, value]) => value.id === role.id)[0]}`,
      title: `${trait.label}的${role.label}`,
      tagline: role.tagline,
      image: `characters/${trait.slugPrefix}_${Object.entries(roles).find(([, value]) => value.id === role.id)[0]}.png`,
      fallbackImage: `characters/${trait.slugPrefix}_${Object.entries(roles).find(([, value]) => value.id === role.id)[0]}.webp`,
      accent: trait.accent,
      role,
      trait,
    })),
  );
}

export function getAllHiddenResults() {
  return Object.entries(hiddenResults).map(([slug, result]) => ({
    kind: 'hidden',
    resultSlug: slug,
    title: result.title,
    tagline: result.tagline,
    image: `hidden/hidden_${slug}.png`,
    fallbackImage: `hidden/hidden_${slug}.webp`,
    accent: result.accent,
  }));
}

export function createShareText(result) {
  const url = `${window.location.origin}${import.meta.env.BASE_URL}#/result?r=${result.resultSlug}&cat=${result.catSuffix.id}`;
  return `测完了：我是「${result.title}」——${result.tagline}\n你也来测测在猫眼里你是个啥？\n${url}\n#在猫眼里你是个啥 #猫眼测试`;
}


