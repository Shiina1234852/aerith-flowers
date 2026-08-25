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

const dossier = [
  ['姓名', '爱丽丝·盖恩斯巴勒', 'AERITH GAINSBOROUGH'],
  ['身份', '伍番街贫民窟的卖花女孩', 'FLOWER SELLER'],
  ['血脉', '最后的古代种（赛特拉）', 'THE LAST CETRA'],
  ['武器', '长杖', 'STAFF'],
  ['战斗定位', '远程魔法 · 治疗 · 支援', 'RANGED MAGE'],
  ['象征', '黄色花朵 · 白魔晶石 · 星球', 'FLOWER & PLANET'],
];

const relations = [
  { name: '克劳德', tag: 'BODYGUARD', mark: 'C', text: '从壹号魔晄炉附近的一朵花，到教堂里以“一次约会”为报酬的护卫约定。轻快的玩笑，逐渐成为共同面对命运的信任。' },
  { name: '蒂法', tag: 'COMPANION', mark: 'T', text: '并肩离开米德加的旅伴。她们分享秘密、互相打气，也在旅途中建立起不应被简化成“情敌”的女性友谊。' },
  { name: '扎克斯', tag: 'FIRST LOVE', mark: 'Z', text: '一段与雨、教堂和粉色缎带相连的旧日记忆。即使时间向前，它仍以未寄出的信和似曾相识的动作留下回声。' },
  { name: '艾米娜', tag: 'FAMILY', mark: 'E', text: '收养并守护她长大的母亲。伍番街的家、满院鲜花和一张温暖的餐桌，让“古代种”首先能够作为普通女孩生活。' },
  { name: '赤红十三', tag: 'PLANET', mark: 'R', text: '同样被神罗囚禁、也同样能感知超越人类经验的事物。旅途中，他们对星球与生命循环有着格外深的理解。' },
  { name: '曾与神罗', tag: 'PURSUIT', mark: 'S', text: '神罗长期监视她，并试图借古代种的力量寻找“约定之地”。这条追捕线把她安静的日常推向了世界性的危机。' },
];

const journey = [
  { no: '01', place: '伍番街贫民窟', title: '在没有天空的地方种花', text: '她与养母艾米娜生活在伍番街，以卖花维生。破旧教堂里不可思议的花田，是她最日常也最神秘的风景。' },
  { no: '02', place: '贫民窟教堂', title: '从屋顶落下的相遇', text: '克劳德从破损屋顶坠入花田。追兵、护卫约定与一连串玩笑，把偶然相逢变成了一段共同旅程。' },
  { no: '03', place: '米德加之外', title: '第一次走向广阔天空', text: '被救出神罗大厦后，她终于离开钢铁城市，穿过草原、海岸、森林与峡谷，追寻自己与星球的联系。' },
  { no: '04', place: '星球深处', title: '她所听见的声音', text: '作为赛特拉，她能感受生命之流与星球的呼唤。旅程越接近真相，个人愿望与守护星球的命运便越难分开。', spoiler: true },
];

const versions = [
  { year: '1997', label: 'FINAL FANTASY VII', title: '多边形时代的经典形象', text: '在原作里，她以贫民窟卖花女孩的身份登场。有限的模型与预渲染背景，反而让花、教堂和粉色长裙成为极鲜明的视觉记忆。', image: '/official/aerith-ffvii-original.jpg' },
  { year: '2007', label: 'CRISIS CORE', title: '教堂与缎带的前日故事', text: '前传把时间拉回更早的米德加，补写她与扎克斯的相遇，也让花车、二十三封信和粉色缎带拥有了新的情感重量。', image: '/memory-cel-v3.png' },
  { year: '2020', label: 'FINAL FANTASY VII REMAKE', title: '被重新听见的花语', text: '写实演出放大了她的俏皮、敏锐与坚韧。更细微的表情和动作，让“知道得比说出的更多”成为角色魅力的一部分。', image: '/church-scene-v2.png' },
  { year: '2024', label: 'FINAL FANTASY VII REBIRTH', title: '走出米德加，走进世界', text: '广阔世界给了她新的旅途经验：骑陆行鸟、看海、与伙伴并肩作战，也让围绕命运的悬念成为叙事核心。', image: '/official/aerith-rebirth-headshot.png' },
];

const gallery = [
  { image: '/official/aerith-ice-magic.jpg', title: '魔法绽放', note: '爱丽丝在战斗中施放冰属性魔法', source: 'BATTLE' },
  { image: '/official/party-chocobos.jpg', title: '草原同行', note: '一行人骑乘陆行鸟穿越格拉斯兰', source: 'WORLD' },
  { image: '/official/rebirth-grasslands.jpg', title: '米德加之外', note: '离开钢铁都市后的第一片辽阔草原', source: 'WORLD' },
  { image: '/official/rebirth-costa-del-sol.jpg', title: '太阳海岸', note: '旅途里明亮而短暂的度假时光', source: 'WORLD' },
  { image: '/official/rebirth-gongaga.jpg', title: '贡加加', note: '被魔晄与记忆缠绕的繁茂密林', source: 'WORLD' },
  { image: '/official/rebirth-cosmo-canyon.jpg', title: '星陨峡谷', note: '仰望星空、理解星球的古老圣地', source: 'WORLD' },
];

const symbols = [
  { glyph: '✦', name: '黄色花朵', en: 'YELLOW FLOWERS', text: '在钢铁覆盖的城市里仍然向光生长，是她最温柔也最坚定的自我介绍。' },
  { glyph: '⌂', name: '贫民窟教堂', en: 'THE CHURCH', text: '废墟、阳光与花田共同构成避难所；每一次重返，都像记忆重新开花。' },
  { glyph: '◌', name: '白魔晶石', en: 'WHITE MATERIA', text: '一件安静的遗物，也是她与母亲、古代种知识和星球使命之间的连接。' },
  { glyph: '≋', name: '生命之流', en: 'LIFESTREAM', text: '生命归于星球、记忆继续流动。它让“离开”不只是终点，也可能是另一种陪伴。' },
  { glyph: '△', name: '天空', en: 'THE SKY', text: '她向往外面的世界，也坦言天空令自己不安；自由与未知在同一个意象里相遇。' },
  { glyph: '∞', name: '约定之地', en: 'PROMISED LAND', text: '神罗把它理解为可掠夺的资源，而赛特拉的传统则指向更精神性的归宿。' },
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
  const [activeRelation, setActiveRelation] = useState(0);
  const [activeVersion, setActiveVersion] = useState(3);
  const [spoilersOn, setSpoilersOn] = useState(false);
  const [selectedShot, setSelectedShot] = useState<number | null>(null);
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
            <a href="#archive">人物档案</a>
            <a href="#journey">旅程</a>
            <a href="#gallery">游戏剧照</a>
            <a href="#memories">记忆</a>
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
            <div className="card-corners" aria-hidden="true"><i /><i /><i /><i /></div>
            <img src="/aerith-art-nouveau-card.png" alt="完整保留花卉边框的新艺术风格爱丽丝收藏卡" />
            <span className="portrait-caption"><b>NO. 005</b> ART NOUVEAU · ARCHIVE CARD</span>
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

      <section className="archive-section" id="archive">
        <div className="archive-intro">
          <div>
            <p className="kicker">CHARACTER DOSSIER · 资料编号 005</p>
            <h2>爱丽丝·<br />盖恩斯巴勒</h2>
            <p className="archive-lead">“花，想买吗？”——一句再普通不过的招呼，让这位能听见星球声音的女孩先以普通人的姿态走进我们的记忆。</p>
          </div>
          <div className="archive-headshot">
            <img src="/official/aerith-rebirth-headshot.png" alt="最终幻想VII 重生官方爱丽丝头像" />
            <span>OFFICIAL CHARACTER VISUAL · REBIRTH</span>
          </div>
        </div>
        <div className="dossier-grid">
          {dossier.map(([label, value, en], index) => (
            <article key={label}><small>{String(index + 1).padStart(2, '0')} · {en}</small><span>{label}</span><h3>{value}</h3></article>
          ))}
        </div>
        <div className="combat-strip">
          <div className="combat-copy">
            <p className="kicker">BATTLE PROFILE</p>
            <h3>把花田变成魔法阵。</h3>
            <p>她擅长在安全距离释放追踪攻击与魔法，并布置能强化战斗的结界。她可以在结界之间移动，以治疗和支援维持全队节奏。</p>
          </div>
          <div className="ability-list" aria-label="战斗倾向（本站整理）">
            {[['魔法', 96], ['支援', 92], ['射程', 88], ['机动', 64], ['物理', 42]].map(([name, score]) => (
              <div key={name as string}><span>{name}</span><i><b style={{ width: `${score}%` }} /></i><small>{score}</small></div>
            ))}
            <p>※ 为便于阅读的本站视觉化整理，并非游戏内官方数值。</p>
          </div>
        </div>
      </section>

      <section className="journey-section" id="journey">
        <div className="journey-heading">
          <div><p className="kicker">A JOURNEY UNDER THE OPEN SKY</p><h2>从一小片花田，<br />走到星球的尽头。</h2></div>
          <button type="button" className={spoilersOn ? 'spoiler-toggle active' : 'spoiler-toggle'} onClick={() => setSpoilersOn(!spoilersOn)} aria-pressed={spoilersOn}>
            <span>{spoilersOn ? '剧透已开启' : '隐藏关键剧透'}</span><i>{spoilersOn ? 'ON' : 'SAFE'}</i>
          </button>
        </div>
        <div className="journey-line">
          {journey.map((item) => (
            <article key={item.no} className={item.spoiler && !spoilersOn ? 'spoiler-card locked' : 'spoiler-card'}>
              <span>{item.no}</span><small>{item.place}</small><h3>{item.spoiler && !spoilersOn ? '一段等待你亲自抵达的故事' : item.title}</h3>
              <p>{item.spoiler && !spoilersOn ? '这里涉及原作与重制系列的关键情节。开启右上角的剧透开关后可阅读。' : item.text}</p>
            </article>
          ))}
        </div>
        <div className="relations-block">
          <div className="relations-list" role="tablist" aria-label="人物关系">
            {relations.map((relation, index) => (
              <button key={relation.name} role="tab" aria-selected={activeRelation === index} className={activeRelation === index ? 'active' : ''} onClick={() => setActiveRelation(index)}>
                <b>{relation.mark}</b><span>{relation.name}<small>{relation.tag}</small></span><i>↗</i>
              </button>
            ))}
          </div>
          <article className="relation-detail" role="tabpanel">
            <p>RELATIONSHIP · {String(activeRelation + 1).padStart(2, '0')}</p>
            <strong>{relations[activeRelation].mark}</strong>
            <h3>{relations[activeRelation].name}</h3>
            <small>{relations[activeRelation].tag}</small>
            <blockquote>“{relations[activeRelation].text}”</blockquote>
          </article>
        </div>
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

      <section className="gallery-section" id="gallery">
        <div className="gallery-heading">
          <div><p className="kicker">OFFICIAL GAME STILLS</p><h2>从教堂出发，<br />世界在镜头里展开。</h2></div>
          <p>以下画面来自 SQUARE ENIX 官方《FINAL FANTASY VII REBIRTH》角色、战斗与世界介绍页。点击可以查看完整画面。</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((shot, index) => (
            <button type="button" className={`gallery-shot shot-${index + 1}`} key={shot.image} onClick={() => setSelectedShot(index)}>
              <img src={shot.image} alt={shot.note} />
              <span><small>{String(index + 1).padStart(2, '0')} · {shot.source}</small><b>{shot.title}</b><i>{shot.note}</i></span>
            </button>
          ))}
        </div>
        <p className="official-credit">GAME STILLS © SQUARE ENIX · CHARACTER DESIGN: TETSUYA NOMURA / ROBERTO FERRARI · 非商业同人资料展示</p>
      </section>

      <section className="versions-section" id="versions">
        <div className="versions-heading"><p className="kicker">1997 — 2024 · APPEARANCES</p><h2>同一朵花，<br />在不同时代盛开。</h2></div>
        <div className="versions-layout">
          <div className="version-tabs" role="tablist" aria-label="历代形象">
            {versions.map((version, index) => (
              <button key={version.year} role="tab" aria-selected={activeVersion === index} className={activeVersion === index ? 'active' : ''} onClick={() => setActiveVersion(index)}>
                <b>{version.year}</b><span>{version.label}</span><i>→</i>
              </button>
            ))}
          </div>
          <article className="version-card" role="tabpanel">
            <div className="version-visual"><img src={versions[activeVersion].image} alt={`${versions[activeVersion].label}中的爱丽丝形象`} /></div>
            <div><small>{versions[activeVersion].year} · {versions[activeVersion].label}</small><h3>{versions[activeVersion].title}</h3><p>{versions[activeVersion].text}</p></div>
          </article>
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

      <section className="symbols-section">
        <div className="symbols-heading"><p className="kicker">A FIELD GUIDE TO SYMBOLS</p><h2>读懂环绕她的六种意象。</h2><p>这一部分是基于游戏叙事的主题阅读，不是唯一答案。每个意象都在不同章节里改变含义。</p></div>
        <div className="symbols-grid">
          {symbols.map((symbol, index) => <article key={symbol.name}><span>{symbol.glyph}</span><small>0{index + 1} · {symbol.en}</small><h3>{symbol.name}</h3><p>{symbol.text}</p></article>)}
        </div>
      </section>

      <section className="sources-section">
        <div><p className="kicker">ARCHIVE NOTES · OFFICIAL SOURCES</p><h2>资料从哪里来？</h2><p>角色事实与官方剧照均以 SQUARE ENIX 页面为主；诠释性文字、互动与插画由本站重新创作。点击下方条目可前往原始页面。</p></div>
        <div className="source-links">
          <a href="https://www.square-enix.com/ffvii/en-us/games/rebirth/characters/aerith-gainsborough/" target="_blank" rel="noreferrer"><span>01</span><b>REBIRTH · 爱丽丝官方角色档案</b><i>↗</i></a>
          <a href="https://www.square-enix.com/ffvii/en-us/games/rebirth/battle/" target="_blank" rel="noreferrer"><span>02</span><b>REBIRTH · 战斗系统与官方剧照</b><i>↗</i></a>
          <a href="https://www.square-enix.com/ffvii/en-us/games/rebirth/world/" target="_blank" rel="noreferrer"><span>03</span><b>REBIRTH · 世界区域与旅途剧照</b><i>↗</i></a>
          <a href="https://na.finalfantasy.com/titles/finalfantasy7" target="_blank" rel="noreferrer"><span>04</span><b>FINAL FANTASY VII · 原作角色资料</b><i>↗</i></a>
          <a href="https://blog.playstation.com/2024/01/29/final-fantasy-vii-rebirth-square-enix-discusses-reimagining-iconic-characters-sephiroth-and-aerith/" target="_blank" rel="noreferrer"><span>05</span><b>制作访谈 · 重塑爱丽丝与命运主题</b><i>↗</i></a>
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
        <p>非商业同人纪念作品 · 二创视觉与官方游戏资料已分区标注</p>
        <span>MADE WITH MEMORIES · 2026</span>
      </footer>

      {selectedShot !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[selectedShot].title} onClick={() => setSelectedShot(null)}>
          <button type="button" className="lightbox-close" onClick={() => setSelectedShot(null)} aria-label="关闭完整剧照">×</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={gallery[selectedShot].image} alt={gallery[selectedShot].note} />
            <figcaption><span>{gallery[selectedShot].source} · OFFICIAL STILL</span><b>{gallery[selectedShot].title}</b><p>{gallery[selectedShot].note}</p></figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
