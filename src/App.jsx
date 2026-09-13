import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Cat,
  Check,
  Clipboard,
  Download,
  Heart,
  PawPrint,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { assetBase, catSuffixes, questions, roles, traits, uiCopy } from './data/quizData';
import { buildResultFromSlug, calculateResult, createShareText, getAllHiddenResults, getAllNormalResults } from './lib/scoring';
import { clearDraft, readDraft, readLastResult, readUnlockedResults, saveDraft, saveLastResult, unlockResult } from './lib/storage';

function getHashRoute() {
  const hash = window.location.hash || '#/';
  const [path, search = ''] = hash.slice(1).split('?');
  return { path: path || '/', params: new URLSearchParams(search) };
}

function navigate(to) {
  window.location.hash = to;
}

function AssetImage({ src, fallback, alt, className }) {
  return (
    <picture>
      <source srcSet={`${assetBase}${src}`} type="image/webp" />
      <img className={className} src={`${assetBase}${fallback || src}`} alt={alt} loading="lazy" />
    </picture>
  );
}

function StickerIcon({ name, alt = '' }) {
  return <img className="sticker-icon" src={`${assetBase}icons/${name}.png`} alt={alt} loading="lazy" />;
}
function Shell({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => navigate('/')}>
          <Cat size={24} aria-hidden="true" />
          <span>{uiCopy.siteName}</span>
        </button>
        <nav>
          <button className="icon-text-button" onClick={() => navigate('/quiz')} title="开始测试">
            <StickerIcon name="crown" />
            <span>测试</span>
          </button>

        </nav>
      </header>
      {children}
      {uiCopy.footer ? <footer>{uiCopy.footer}</footer> : null}
    </div>
  );
}

function HomePage() {
  const decorativeResults = [
    { slug: 'qinlao_kitchen_manager', className: 'float-one' },
    { slug: 'wonang_blame_taker', className: 'float-two' },
    { slug: 'aojiao_little_follower', className: 'float-three' },
    { slug: 'xijing_play_officer', className: 'float-four' },
  ];

  return (
    <main className="home-page minimal-home">
      <section className="hero minimal-hero">
        <div className="hero-copy">
          <p className="eyebrow">猫眼观察中</p>
          <h1>{uiCopy.siteName}</h1>
          <p>{uiCopy.slogan}</p>
          <div className="hero-actions single-action">
            <button className="primary-button hero-start" onClick={() => navigate('/quiz')}>
              <Sparkles size={22} aria-hidden="true" />
              <span>立即测试</span>
            </button>
          </div>
        </div>
        <div className="hero-art minimal-hero-art" aria-hidden="true">
          <AssetImage
            src="general/home_hero_cat_detective.webp"
            fallback="general/home_hero_cat_detective.png"
            alt="猫猫侦探正在观察铲屎官"
          />
          {decorativeResults.map((item) => {
            const result = buildResultFromSlug(item.slug, 'free');
            return (
              <div className={`floating-person ${item.className}`} key={item.slug}>
                <AssetImage src={result.image} fallback={result.fallbackImage} alt="" />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
function QuizPage() {
  const [draft, setDraft] = useState(() => readDraft());
  const [isRevealing, setIsRevealing] = useState(false);
  const currentQuestion = draft.step > 0 ? questions[draft.step - 1] : null;
  const progress = Math.max(0, draft.step - 1);

  useEffect(() => {
    saveDraft(draft);
  }, [draft]);

  function chooseCatSuffix(suffixId) {
    setDraft({ catSuffix: suffixId, answers: {}, step: 1 });
  }

  function chooseAnswer(letter) {
    const nextAnswers = { ...draft.answers, [currentQuestion.id]: letter };
    if (draft.step >= questions.length) {
      const result = calculateResult(nextAnswers, questions, draft.catSuffix || 'cool');
      unlockResult(result.resultSlug);
      saveLastResult(result);
      clearDraft();
      setIsRevealing(true);
      window.setTimeout(() => {
        navigate(`/result?r=${result.resultSlug}&cat=${result.catSuffix.id}`);
      }, 1150);
      return;
    }

    setDraft({ ...draft, answers: nextAnswers, step: draft.step + 1 });
  }

  function goBack() {
    if (draft.step <= 0) return;
    setDraft({ ...draft, step: draft.step - 1 });
  }

  function restart() {
    clearDraft();
    setDraft({ catSuffix: null, answers: {}, step: 0 });
  }

  if (isRevealing) {
    return (
      <main className="reveal-page">
        <div className="reveal-stamp">
          <Sparkles size={42} aria-hidden="true" />
          <p>{uiCopy.reveal}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="quiz-page">
      <section className="quiz-visual">
        <AssetImage
          src="general/quiz_top_cat_observer.webp"
          fallback="general/quiz_top_cat_observer.png"
          alt="猫猫正在观察测试答案"
        />
      </section>

      <section className="quiz-panel">
        {draft.step === 0 ? (
          <>
            <p className="eyebrow">第 0 题</p>
            <h1>先选选，你家主子是哪种猫？</h1>
            <p className="muted">只影响结果卡装饰，不改变你的主类型。</p>
            <div className="option-grid cats">
              {catSuffixes.map((suffix) => (
                <button className="option-card" key={suffix.id} onClick={() => chooseCatSuffix(suffix.id)}>
                  <span className="option-letter" style={{ backgroundColor: suffix.accent }}>
                    <StickerIcon name="paw" />
                  </span>
                  <strong>{suffix.label}</strong>
                  <span>{suffix.note}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="progress-row">
              <button className="round-button" onClick={goBack} title="上一题" aria-label="上一题">
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <div className="progress-track" aria-label={`第 ${draft.step} / 20 题`}>
                <span style={{ width: `${(progress / questions.length) * 100}%` }} />
              </div>
              <button className="round-button" onClick={restart} title="重新开始" aria-label="重新开始">
                <RotateCcw size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="eyebrow">第 {draft.step} / 20 题</p>
            <h1>{currentQuestion.text}</h1>
            <div className="option-grid">
              {currentQuestion.options.map(([letter, text]) => (
                <button className="option-card" key={letter} onClick={() => chooseAnswer(letter)}>
                  <span className="option-letter">{letter}</span>
                  <span>{text}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function ScoreBar({ label, value, tone, icon }) {
  return (
    <div className={`score-row ${tone}`}>
      <div className="score-topline">
        <span className="score-label">{icon}<span>{label}</span></span>
        <strong>{value}</strong>
      </div>
      <div className="score-track">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ResultCard({ result, cardRef }) {
  const titleParts = result.title.split('的');
  const traitTitle = titleParts.length > 1 ? `${titleParts[0]}的` : '你是';
  const roleTitle = titleParts.length > 1 ? titleParts.slice(1).join('的') : result.title;
  const resultTags = result.kind === 'hidden'
    ? [
      { label: '隐藏款解锁', icon: <StickerIcon name="crown" /> },
      { label: '猫眼认证', icon: <StickerIcon name="paw" /> },
      { label: result.catSuffix.label, icon: <StickerIcon name="paw" /> },
      { label: '超稀有', icon: <StickerIcon name="heart" /> },
    ]
    : [
      { label: result.catSuffix.label, icon: <StickerIcon name="paw" /> },
      { label: result.role?.tagline || result.tagline, icon: <StickerIcon name="fish" /> },
      { label: result.trait?.label || '猫眼认证', icon: <StickerIcon name="crown" /> },
      { label: '猫主子钦点', icon: <StickerIcon name="paw" /> },
    ];

  return (
    <article className={`result-card ${result.kind === 'hidden' ? 'hidden-card' : ''}`} ref={cardRef} style={{ '--accent': result.accent }}>
      <div className="poster-kicker">
        <span>在猫眼里，你是个啥？</span>
        <span>CAT KNOWS YOU BETTER</span>
      </div>
      <div className="result-title-block">
        <p>你是：</p>
        <h1><span>{traitTitle}</span>{roleTitle}</h1>
      </div>
      <div className="result-code-badge">
        <strong>{result.typeCode}</strong>
        <span>猫眼人格类型码</span>
      </div>
      <div className="result-art-frame">
        <AssetImage src={result.image} fallback={result.fallbackImage} alt={result.title} className="result-art" />
      </div>
      <div className="tag-strip">
        {resultTags.map((tag) => <span key={tag.label} className="tag-pill">{tag.icon}<span>{tag.label}</span></span>)}
      </div>
      <section className="analysis-card">
        <ol>
          <li>{result.tagline}</li>
          <li>{result.analysis}</li>
          <li>{result.catVoice}</li>
        </ol>
        <aside>猫说：你真的很会照顾我</aside>
      </section>
      <section className="scores" aria-label="你的猫系属性">
        <h2>你的猫系属性</h2>
        <ScoreBar label="供粮能力" value={result.scores.food} tone="food" icon={<StickerIcon name="bowl" />} />
        <ScoreBar label="陪玩水平" value={result.scores.play} tone="play" icon={<StickerIcon name="wand" />} />
        <ScoreBar label="忍耐指数" value={result.scores.endure} tone="endure" icon={<StickerIcon name="scoop" />} />
        <ScoreBar label="被爱程度" value={result.scores.love} tone="love" icon={<StickerIcon name="heart" />} />
      </section>
    </article>
  );
}

function ResultPage({ params }) {
  const cardRef = useRef(null);
  const [copyState, setCopyState] = useState('idle');
  const [manualText, setManualText] = useState('');
  const slug = params.get('r');
  const cat = params.get('cat') || 'cool';
  const lastResult = readLastResult();
  const result = useMemo(() => {
    if (!slug && lastResult) {
      return buildResultFromSlug(lastResult.resultSlug, lastResult.catSuffix, lastResult.scores);
    }
    return buildResultFromSlug(slug, cat, lastResult?.resultSlug === slug ? lastResult.scores : null);
  }, [slug, cat, lastResult]);

  useEffect(() => {
    if (result) unlockResult(result.resultSlug);
  }, [result]);

  async function copyShareText() {
    const text = createShareText(result);
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('copied');
      setManualText('');
    } catch {
      setCopyState('manual');
      setManualText(text);
    }
  }

  async function saveImage() {
    if (!cardRef.current) return;
    const { toPng } = await import('html-to-image');
    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#fff8ed',
    });
    const link = document.createElement('a');
    link.download = `${result.resultSlug}.png`;
    link.href = dataUrl;
    link.click();
  }

  if (!result) {
    return (
      <main className="empty-page">
        <h1>这张任命书暂时找不到</h1>
        <button className="primary-button" onClick={() => navigate('/quiz')}>
          <StickerIcon name="crown" />
          <span>重新测试</span>
        </button>
      </main>
    );
  }

  return (
    <main className="result-page">
      <ResultCard result={result} cardRef={cardRef} />
      <section className="action-row">
        <button className="primary-button" onClick={saveImage}>
          <Download size={18} aria-hidden="true" />
          <span>保存结果图</span>
        </button>
        <button className="secondary-button" onClick={copyShareText}>
          {copyState === 'copied' ? <Check size={18} aria-hidden="true" /> : <Clipboard size={18} aria-hidden="true" />}
          <span>{copyState === 'copied' ? '已复制' : '复制文案'}</span>
        </button>

        <button className="secondary-button" onClick={() => navigate('/quiz')}>
          <RotateCcw size={18} aria-hidden="true" />
          <span>再测一次</span>
        </button>
      </section>
      {manualText && <textarea className="manual-copy" readOnly value={manualText} aria-label="分享文案" />}
    </main>
  );
}

function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [unlocked, setUnlocked] = useState(() => readUnlockedResults());
  const allResults = useMemo(() => [...getAllNormalResults(), ...getAllHiddenResults()], []);

  useEffect(() => {
    const refresh = () => setUnlocked(readUnlockedResults());
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, []);

  const filtered = allResults.filter((result) => {
    if (filter === 'hidden') return result.kind === 'hidden';
    if (filter.startsWith('trait:')) return result.trait?.id === filter.replace('trait:', '');
    if (filter.startsWith('role:')) return result.role?.id === filter.replace('role:', '');
    return true;
  });

  return (
    <main className="gallery-page">
      <section className="gallery-head">
        <div>
          <p className="eyebrow">猫眼人事图鉴</p>
          <h1>已解锁 {unlocked.length} / {allResults.length}</h1>
        </div>
        <button className="primary-button" onClick={() => navigate('/quiz')}>
          <StickerIcon name="crown" />
          <span>去测试</span>
        </button>
      </section>

      <section className="filter-strip" aria-label="图鉴筛选">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>全部</button>
        <button className={filter === 'hidden' ? 'active' : ''} onClick={() => setFilter('hidden')}>隐藏款</button>
        {Object.values(traits).map((trait) => (
          <button key={trait.id} className={filter === `trait:${trait.id}` ? 'active' : ''} onClick={() => setFilter(`trait:${trait.id}`)}>
            {trait.label}
          </button>
        ))}
      </section>

      <section className="role-filter" aria-label="岗位筛选">
        {Object.values(roles).map((role) => (
          <button key={role.id} className={filter === `role:${role.id}` ? 'active' : ''} onClick={() => setFilter(`role:${role.id}`)}>
            {role.label}
          </button>
        ))}
      </section>

      <section className="gallery-grid">
        {filtered.map((result) => {
          const isUnlocked = unlocked.includes(result.resultSlug);
          return (
            <button
              className={`gallery-card ${isUnlocked ? 'unlocked' : 'locked'}`}
              key={result.resultSlug}
              onClick={() => isUnlocked && navigate(`/result?r=${result.resultSlug}&cat=cool`)}
              disabled={!isUnlocked}
            >
              <AssetImage src={result.image} fallback={result.fallbackImage} alt={isUnlocked ? result.title : '未解锁结果'} />
              <h2>{isUnlocked ? result.title : result.kind === 'hidden' ? '???' : '测到才解锁'}</h2>
              <p>{isUnlocked ? result.tagline : '猫眼人事部暂未公开这份档案。'}</p>
            </button>
          );
        })}
      </section>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => getHashRoute());

  useEffect(() => {
    const handleRoute = () => setRoute(getHashRoute());
    window.addEventListener('hashchange', handleRoute);
    if (!window.location.hash) navigate('/');
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);

  const page = (() => {
    if (route.path === '/quiz') return <QuizPage />;
    if (route.path === '/result') return <ResultPage params={route.params} />;
    if (route.path === '/gallery') return <GalleryPage />;
    return <HomePage />;
  })();

  return <Shell>{page}</Shell>;
}














