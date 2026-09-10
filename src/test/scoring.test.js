import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { questions } from '../data/quizData';
import {
  calculateResult,
  countGroup,
  getAllHiddenResults,
  getAllNormalResults,
  getNormalCore,
  resolveWinner,
} from '../lib/scoring';

const pIds = questions.filter((question) => question.group === 'P').map((question) => question.id);
const alphaIds = questions.filter((question) => question.group === 'alpha').map((question) => question.id);
const betaIds = questions.filter((question) => question.group === 'beta').map((question) => question.id);

function makeAnswers({ p = 'B', alpha = 'B', beta = 'B' } = {}) {
  const answers = {};
  pIds.forEach((id) => {
    answers[id] = p;
  });
  alphaIds.forEach((id) => {
    answers[id] = alpha;
  });
  betaIds.forEach((id) => {
    answers[id] = beta;
  });
  return answers;
}

describe('scoring', () => {
  it('counts each question group independently', () => {
    const answers = makeAnswers({ p: 'A', alpha: 'C', beta: 'D' });

    expect(countGroup(answers, questions, 'P')).toEqual({ A: 8, B: 0, C: 0, D: 0 });
    expect(countGroup(answers, questions, 'alpha')).toEqual({ A: 0, B: 0, C: 6, D: 0 });
    expect(countGroup(answers, questions, 'beta')).toEqual({ A: 0, B: 0, C: 0, D: 6 });
  });

  it('uses the documented tie-break priorities', () => {
    expect(resolveWinner({ A: 2, B: 2, C: 2, D: 2 }, 'P')).toBe('B');
    expect(resolveWinner({ A: 2, B: 2, C: 1, D: 1 }, 'alpha')).toBe('A');
    expect(resolveWinner({ A: 1, B: 2, C: 2, D: 1 }, 'beta')).toBe('B');
  });

  it('can produce all 64 normal result slugs through the core matrix', () => {
    const slugs = new Set();

    ['A', 'B', 'C', 'D'].forEach((p) => {
      ['A', 'B', 'C', 'D'].forEach((alpha) => {
        ['A', 'B', 'C', 'D'].forEach((beta) => {
          const core = getNormalCore(makeAnswers({ p, alpha, beta }), questions);
          slugs.add(core.resultSlug);
        });
      });
    });

    expect(slugs.size).toBe(64);
    expect(getAllNormalResults()).toHaveLength(64);
  });

  it('checks hidden results in priority order', () => {
    expect(calculateResult(makeAnswers({ p: 'A', alpha: 'A', beta: 'A' }), questions, 'cool')).toMatchObject({
      kind: 'hidden',
      resultSlug: 'chosen_litter_owner',
      triggerId: 'H01',
    });

    const atmAnswers = makeAnswers({ p: 'C', alpha: 'A', beta: 'B' });
    Object.assign(atmAnswers, { 1: 'C', 2: 'B', 3: 'C', 8: 'C', 9: 'B', 10: 'C', 11: 'C', 19: 'C' });
    expect(calculateResult(atmAnswers, questions, 'food')).toMatchObject({
      kind: 'hidden',
      resultSlug: 'walking_atm',
      triggerId: 'H02',
    });

    const scholarAnswers = makeAnswers({ p: 'D', alpha: 'D', beta: 'D' });
    expect(calculateResult(scholarAnswers, questions, 'drama')).toMatchObject({
      kind: 'hidden',
      resultSlug: 'cat_language_scholar',
      triggerId: 'H03',
    });

    const scapegoatAnswers = makeAnswers({ p: 'C', alpha: 'D', beta: 'C' });
    Object.assign(scapegoatAnswers, { 3: 'C', 10: 'C', 14: 'A', 19: 'A' });
    expect(calculateResult(scapegoatAnswers, questions, 'shy')).toMatchObject({
      kind: 'hidden',
      resultSlug: 'certified_scapegoat',
      triggerId: 'H04',
    });
  });

  it('keeps manifest slugs unique and every referenced asset present', () => {
    const manifestPath = path.resolve(process.cwd(), 'public/cat_quiz_assets/asset-manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const slugs = new Set();

    manifest.forEach((item) => {
      expect(slugs.has(item.slug)).toBe(false);
      slugs.add(item.slug);
      if (item.webp) expect(fs.existsSync(path.resolve(process.cwd(), 'public/cat_quiz_assets', item.webp))).toBe(true);
      if (item.png) expect(fs.existsSync(path.resolve(process.cwd(), 'public/cat_quiz_assets', item.png))).toBe(true);
    });

    expect(getAllHiddenResults()).toHaveLength(4);
  });
});
