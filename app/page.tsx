'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

const memories = [
  {
    id: 'rain',
    number: '01',
    title: '屋顶上的相遇',
    subtitle: 'A CHANCE ENCOUNTER',
    text: '阳光穿过破损的屋顶，她从花丛里抬头。陌生人的脚步声，就这样成了一段旅程的开始。',
    color: '#e0b6bd',
    image: '/memory-watercolor-v3.png',
    alt: '爱丽丝在阳光照进的教堂花田中抬头',
    medium: 'WATERCOLOR ON PAPER',
  },
  {
    id: 'promise',
    number: '02',
    title: '未说完的话',
    subtitle: 'WORDS LEFT UNSAID',
    text: '有些记忆并不会消失。它们只是变成风、变成雨，藏进每一次似曾相识的回眸里。',
    color: '#f0ca73',
    image: '/memory-cel-v3.png',
    alt: '爱丽丝在雨后的旧站台握着一朵黄花回望',
    medium: 'HAND-PAINTED CEL',
  },
  {
    id: 'stars',
    number: '03',
    title: '抬头看天空',
    subtitle: 'UNDER THE OPEN SKY',
    text: '她害怕天空，却仍愿意走向它。因为真正重要的，从来不是命运写下了什么，而是如何选择微笑。',
    color: '#81d8bb',
    image: '/memory-oil-v3.png',
    alt: '爱丽丝站在高处仰望生命之流光点与晨空',
    medium: 'IMPRESSIONIST OIL',
  },
];

const discoveries = [
  { icon: '✦', label: '黄色花朵', note: '它们并不知道头顶是钢铁，只知道要朝着光生长。' },
  { icon: '⌂', label: '旧木长椅', note: '风吹过时，木纹里会传来很轻的笑声。也许有人刚刚坐在这里。' },
  { icon: '◌', label: '破损屋顶', note: '米德加难得的阳光，从这里落下来，照亮了整片花田。' },
];

const seedTypes = [
  { name: '希望', glyph: '✦', color: '#f4d471' },
  { name: '思念', glyph: '✿', color: '#e59aaa' },
  { name: '祝福', glyph: '❋', color: '#f2eee4' },
];

type PlantedFlower = { id: number; message: string; seed: number; x: number };

export default function Home() {
  const [activeMemory, setActiveMemory] = useState(0);
  const [discovery, setDiscovery] = useState(0);
  const [seed, setSeed] = useState(0);
  const [message, setMessage] = useState('愿每一次相遇，都像花开一样温柔。');
  const [flowers, setFlowers] = useState<PlantedFlower[]>([]);
  const [soundOn, setSoundOn] = useState(false);
  const [notice, setNotice] = useState('');
  const audioRef = useRef<{ context: AudioContext; nodes: OscillatorNode[] } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aerith-garden');
      if (saved) setFlowers(JSON.parse(saved));
    } catch { /* private browsing or malformed local state */ }
    return () => {
      audioRef.current?.nodes.forEach((node) => node.stop());
      audioRef.current?.context.close();
    };
  }, []);

  function toggleSound() {
    if (audioRef.current) {
      audioRef.current.nodes.forEach((node) => node.stop());
      audioRef.current.context.close();
      audioRef.current = null;
      setSoundOn(false);
      return;
    }

    const AudioCtx = window.AudioContext;
    const context = new AudioCtx();
    const master = context.createGain();
    master.gain.setValueAtTime(0.018, context.currentTime);
    master.connect(context.destination);
    const frequencies = [196, 293.66, 392];
    const nodes = frequencies.map((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.45 : 0.18;
      oscillator.connect(gain).connect(master);
      oscillator.start(context.currentTime + index * 0.16);
      return oscillator;
    });
    audioRef.current = { context, nodes };
    setSoundOn(true);
  }

  function plantFlower(event: FormEvent) {
    event.preventDefault();
    const cleanMessage = message.trim().slice(0, 48);
    if (!cleanMessage) {
      setNotice('先写下一句话，再把它种进花田吧。');
      return;
    }
    const next = [...flowers, { id: Date.now(), message: cleanMessage, seed, x: 8 + Math.random() * 84 }].slice(-18);
    setFlowers(next);
    localStorage.setItem('aerith-garden', JSON.stringify(next));
    setMessage('');
    setNotice('你的花已经在这台设备上盛开。');
  }

  return (
    <main>
      <section className="hero" id="home">
        <img className="hero-photo" src="/hero-cover.png" alt="躺在黄色花海中向前伸手的爱丽丝" />
        <nav className="nav" aria-label="主导航">
          <a className="brand" href="#home" aria-label="返回首页">
            <span className="brand-flower">✦</span>
            <span>FLOWERS<br />BENEATH THE SKY</span>
          </a>
          <div className="nav-links">
            <a href="#story">她的故事</a>
            <a href="#memories">记忆</a>
            <a href="#garden">花园</a>
          </div>
          <a className="nav-gift" href="#garden">留下一朵花 ↗</a>
        </nav>

        <div className="dust" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
        </div>

        <div className="hero-copy">
          <p className="eyebrow"><span /> MIDGAR · SECTOR 5</p>
          <h1>钢铁天空下，<br /><em>仍有花盛开。</em></h1>
          <p className="intro">献给那位在废墟里卖花、在命运面前依然微笑的女孩。<br />沿着花香，走进一段关于相遇、记忆与生命的旅程。</p>
          <div className="hero-actions">
            <a className="primary-action" href="#story">走进教堂 <span>↓</span></a>
            <button className="sound-action" type="button" onClick={toggleSound} aria-pressed={soundOn}>
              <span className={`sound-bars ${soundOn ? 'is-playing' : ''}`}>Ⅲ</span> {soundOn ? '花语正在回响' : '聆听花语'}
            </button>
          </div>
        </div>

        <aside className="chapter-tag">
          <span>CHAPTER</span><strong>01</strong><i /><p>THE FLOWER<br />GIRL</p>
        </aside>
        <p className="scroll-note">SCROLL TO FOLLOW THE FLOWERS <span>↓</span></p>
      </section>

      <section className="story-section" id="story">
        <div className="section-number"><span>01</span><i /> THE FLOWER GIRL</div>
        <div className="story-grid">
          <div className="story-portrait">
            <img src="/story-art-nouveau-v3.png" alt="新艺术风格的爱丽丝在教堂花田中提着花篮" />
            <span className="portrait-caption">ART NOUVEAU · GOUACHE &amp; TEMPERA</span>
          </div>
          <div className="story-copy">
            <p className="kicker">A FLOWER BLOOMING IN THE SLUMS</p>
            <h2>她把阳光，<br />带进了没有天空的地方。</h2>
            <p className="lead">在伍番街贫民窟，花是一件近乎不可思议的事。她守着教堂里那片小小的黄色花田，也守着一种更稀有的东西——相信明天的勇气。</p>
            <div className="traits">
              <div><b>01</b><span>温柔，却从不脆弱</span></div>
              <div><b>02</b><span>明亮，也看见悲伤</span></div>
              <div><b>03</b><span>害怕天空，仍走向天空</span></div>
            </div>
          </div>
        </div>
        <button className="hidden-bloom bloom-one" aria-label="发现一朵隐藏的花" onClick={() => setNotice('你发现了藏在故事里的花。')}>✦</button>
      </section>

      <section className="church-section" aria-labelledby="church-title">
        <div className="church-heading">
          <p className="kicker">THE CHURCH · A QUIET PLACE</p>
          <h2 id="church-title">停下来，听听教堂里的声音。</h2>
          <p>选择一个角落，发现留在这里的小小回声。</p>
        </div>
        <div className="discovery-stage">
          <img className="stage-image" src="/church-scene-v2.png" alt="爱丽丝提着花篮走在洒满阳光的废墟教堂中" />
          <div className="discovery-note" aria-live="polite">
            <span>{discoveries[discovery].icon}</span>
            <p>{discoveries[discovery].note}</p>
          </div>
          <div className="discovery-buttons" role="group" aria-label="探索教堂">
            {discoveries.map((item, index) => (
              <button key={item.label} className={discovery === index ? 'active' : ''} onClick={() => setDiscovery(index)} aria-pressed={discovery === index}>
                <span>{item.icon}</span>{item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="memories-section" id="memories">
        <div className="section-number light"><span>02</span><i /> MEMORIES</div>
        <div className="memories-heading">
          <p className="kicker">FRAGMENTS THAT NEVER FADE</p>
          <h2>记忆不会消失，<br />它只是换了一种方式存在。</h2>
        </div>
        <div className="memory-layout">
          <div className="memory-tabs" role="tablist" aria-label="记忆碎片">
            {memories.map((memory, index) => (
              <button key={memory.id} role="tab" aria-selected={activeMemory === index} className={activeMemory === index ? 'active' : ''} onClick={() => setActiveMemory(index)}>
                <small>{memory.number}</small><span>{memory.title}</span><i>↗</i>
              </button>
            ))}
          </div>
          <article className="memory-card" role="tabpanel" style={{ '--memory-color': memories[activeMemory].color } as React.CSSProperties}>
            <div className="memory-art">
              <img src={memories[activeMemory].image} alt={memories[activeMemory].alt} />
              <i aria-hidden="true">✦</i><b aria-hidden="true">{memories[activeMemory].number}</b>
            </div>
            <div className="memory-text">
              <p>{memories[activeMemory].subtitle} · {memories[activeMemory].medium}</p>
              <h3>{memories[activeMemory].title}</h3>
              <blockquote>“{memories[activeMemory].text}”</blockquote>
            </div>
          </article>
        </div>
      </section>

      <section className="garden-section" id="garden">
        <div className="garden-glow" aria-hidden="true" />
        <div className="garden-copy">
          <p className="kicker">A FLOWER FOR THE JOURNEY</p>
          <h2>为她，也为你珍惜的人，<br />留下一朵花。</h2>
          <p>你的寄语只保存在这台设备上。下次回来，它仍会在这里等你。</p>
        </div>
        <form className="flower-form" onSubmit={plantFlower}>
          <fieldset>
            <legend>选择一颗种子</legend>
            <div className="seed-options">
              {seedTypes.map((type, index) => (
                <button key={type.name} type="button" className={seed === index ? 'active' : ''} onClick={() => setSeed(index)} aria-pressed={seed === index}>
                  <span style={{ color: type.color }}>{type.glyph}</span>{type.name}
                </button>
              ))}
            </div>
          </fieldset>
          <label htmlFor="wish">写下一句话 <span>{message.length}/48</span></label>
          <div className="wish-input">
            <input id="wish" value={message} onChange={(event) => setMessage(event.target.value.slice(0, 48))} maxLength={48} placeholder="愿你的旅程……" />
            <button type="submit">种下这朵花 <span>✦</span></button>
          </div>
          <p className="form-notice" role="status">{notice}</p>
        </form>
        <div className="planted-garden" aria-label="你的花田">
          {flowers.length === 0 && <p className="empty-garden">花田还很安静。种下第一朵花吧。</p>}
          {flowers.map((flower, index) => (
            <button className="planted-flower" key={flower.id} style={{ left: `${flower.x}%`, bottom: `${12 + (index % 3) * 12}px`, color: seedTypes[flower.seed].color }} title={flower.message} onClick={() => setNotice(flower.message)}>
              <span>{seedTypes[flower.seed].glyph}</span><i />
            </button>
          ))}
        </div>
      </section>

      <section className="lifestream-section">
        <div className="stream-lines" aria-hidden="true">{Array.from({ length: 22 }).map((_, index) => <i key={index} />)}</div>
        <div className="final-message">
          <span className="final-flower">✦</span>
          <p>THE PLANET REMEMBERS</p>
          <h2>生命从未真正离开。<br /><em>它只是回到了星球。</em></h2>
          <a href="#home">再次回到花田 ↑</a>
        </div>
      </section>

      <footer>
        <span>FLOWERS BENEATH THE SKY</span>
        <p>非商业同人纪念作品 · 页面视觉与声音均为原创表达</p>
        <span>MADE WITH MEMORIES · 2026</span>
      </footer>
    </main>
  );
}
