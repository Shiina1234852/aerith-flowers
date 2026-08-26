'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

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
  { icon: '✦', label: '黄色花朵', note: '它们并不知道头顶是钢铁，只知道要朝着光生长。', image: '/church-scene-v2.png', alt: '爱丽丝提着花篮走在洒满阳光的教堂花田中', medium: 'CINEMATIC CONCEPT ART' },
  { icon: '⌂', label: '旧木长椅', note: '风吹过时，木纹里会传来很轻的笑声。也许有人刚刚坐在这里。', image: '/church-bench.png', alt: '爱丽丝坐在废墟教堂的旧木长椅旁', medium: 'CEL PAINTING & GOUACHE' },
  { icon: '◌', label: '破损屋顶', note: '屋顶仍大致完整，只有一道旧伤让米德加难得的阳光落进来。', image: '/church-roof.png', alt: '爱丽丝仰望废墟教堂屋顶局部的破洞与光束', medium: 'CINEMATIC MATTE PAINTING' },
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
  { year: '1997', label: 'FINAL FANTASY VII', title: '多边形时代的经典形象', text: '在原作里，她以贫民窟卖花女孩的身份登场。有限的模型与预渲染背景，反而让花、教堂和粉色长裙成为极鲜明的视觉记忆。', image: '/official/aerith-ffvii-original.jpg', position: 'center', facts: ['PS1 原作', '预渲染场景', '低多边形角色'], source: '原作游戏画面' },
  { year: '2007 / 2022', label: 'CRISIS CORE / REUNION', title: '教堂与缎带的前日故事', text: '前传把时间拉回更早的米德加，补写她与扎克斯的相遇，也让花车、二十三封信和粉色缎带拥有了新的情感重量。此处采用 2022 HD 重制版的对应时期造型。', image: '/official/eras/aerith-crisis-core-reunion.jpg', position: '22% center', facts: ['前传时期造型', '花车支线', 'Reunion HD 画面'], source: 'CRISIS CORE REUNION 游戏画面' },
  { year: '2020', label: 'FINAL FANTASY VII REMAKE', title: '被重新听见的花语', text: '写实演出放大了她的俏皮、敏锐与坚韧。更细微的表情和动作，让“知道得比说出的更多”成为角色魅力的一部分。', image: '/official/eras/aerith-remake-2020.jpg', position: 'center', facts: ['米德加篇', '伍番街教堂', '实时面部演出'], source: 'REMAKE 游戏画面' },
  { year: '2024', label: 'FINAL FANTASY VII REBIRTH', title: '走出米德加，走进世界', text: '广阔世界给了她新的旅途经验：骑陆行鸟、看海、与伙伴并肩作战，也让围绕命运的悬念成为叙事核心。', image: '/official/eras/aerith-rebirth-2024.jpg', position: 'center', facts: ['开放区域旅行', '联手能力', '高精度实时演出'], source: 'REBIRTH 游戏画面' },
];

const gallery = [
  { image: '/official/rebirth-grasslands.jpg', title: '米德加之外', note: '离开钢铁都市后的第一片辽阔草原', source: 'WORLD' },
  { image: '/official/rebirth-costa-del-sol.jpg', title: '太阳海岸', note: '旅途里明亮而短暂的度假时光', source: 'WORLD' },
  { image: '/official/rebirth-gongaga.jpg', title: '贡加加', note: '被魔晄与记忆缠绕的繁茂密林', source: 'WORLD' },
  { image: '/official/rebirth-cosmo-canyon.jpg', title: '星陨峡谷', note: '仰望星空、理解星球的古老圣地', source: 'WORLD' },
];

const weapons = [
  { name: 'Guard Stick', cn: '护卫长杖', ability: 'Arcane Ward', abilityCn: '秘法结界', atb: 1, chapter: '初始装备', location: '爱丽丝加入队伍时持有', role: 'SPELL × 2', tone: '#efbdcd', image: '/official/weapons/guard-stick.png', effect: '在地面布置结界。站在其中施放的攻击魔法会自动追加第二次咏唱。', tip: '适合与高阶元素魔法配合，是爱丽丝最标志性的爆发核心。' },
  { name: 'Timeless Rod', cn: '永恒长杖', ability: 'Chrono Aegis', abilityCn: '时光神盾', atb: 1, chapter: 'CHAPTER 02', location: '格拉斯兰 · 比尔牧场，克萝伊商店右侧紫色宝箱', role: 'STOP FIELD', tone: '#72d6c0', image: '/official/weapons/timeless-rod.png', effect: '在身边升起屏障，对试图近身攻击的敌人造成伤害，并暂时冻结其行动。', tip: '用于保护施法位置；被近战敌人包围时尤其有效。' },
  { name: "Empress's Scepter", cn: '女帝权杖', ability: 'Radiant Ward', abilityCn: '光耀结界', atb: 1, chapter: 'CHAPTER 04', location: '下朱诺 · 旅馆内爱丽丝的房间', role: 'LASER WARD', tone: '#f1cf71', image: '/official/weapons/empress-scepter.png', effect: '布置光耀结界：强化爱丽丝的普通攻击，并在结界中咏唱魔法时提供无敌保护。', tip: '能显著改善普攻与 ATB 获取节奏，也是安全施法的据点。' },
  { name: "Wizard's Rod", cn: '巫师长杖', ability: 'Lustrous Shield', abilityCn: '光辉之盾', atb: 1, chapter: 'CHAPTER 07', location: '科雷尔山 · 休息点左侧小路的紫色宝箱', role: 'PROJECTILE GUARD', tone: '#80bddd', image: '/official/weapons/wizards-rod.png', effect: '召唤魔法盾牌，将敌人隔开并阻挡来袭的远程投射物。', tip: '面对弹幕和直线远程攻击时，可以创造稳定的输出窗口。' },
  { name: 'Ceremonial Staff', cn: '仪式长杖', ability: 'ATB Ward', abilityCn: 'ATB 结界', atb: 2, chapter: 'CHAPTER 10', location: '基族村落 · 放逐者海岸休息点', role: 'TEAM BATTERY', tone: '#c99ce5', image: '/official/weapons/ceremonial-staff.png', effect: '布置 ATB 结界；在其中积累的 ATB 会同时为队友的 ATB 量表充能。', tip: '让高频行动转化为全队资源，适合围绕结界组织连续指令。' },
  { name: 'Plumose Rod', cn: '羽翼长杖', ability: 'Ray of Judgment', abilityCn: '审判射线', atb: 1, chapter: 'CHAPTER 12', location: '神罗宅邸 · 完成「哀悼的诅咒」及全部模拟战后取得', role: 'STAGGER BURST', tone: '#f4a77c', image: '/official/weapons/plumose-rod.png', effect: '发射多段命中的高能射线，并提高敌人的力竭伤害倍率。', tip: '在敌人即将或已经力竭时使用，能放大队伍的集中爆发。' },
  { name: 'Gambanteinn', cn: '甘班泰因', ability: 'Noble Sacrifice', abilityCn: '高洁牺牲', atb: 2, chapter: 'CHAPTER 13', location: '古代种神殿 · Order’s Altar 楼梯下方紫色宝箱', role: 'LAST RESORT', tone: '#e8e5dc', image: '/official/weapons/gambanteinn.png', effect: '牺牲爱丽丝，复活倒下的队友、恢复其生命，并解除不利状态。', tip: '逆转濒临团灭局面的终极手段；代价极高，应作为最后保险。' },
];

const cpMoments = [
  { no: '01', title: '一朵花的价格', place: '壹号魔晄炉之后', image: '/cp/01-flower-offer.png', alt: '雨夜街头，爱丽丝与克劳德面对面递出黄色花朵的二创画', caption: '“收下吧——今天很特别。”', cloud: '他接过的也许只是一朵花，却第一次在任务之外回应了一个陌生人的善意。', aerith: '她主动走近这个沉默的佣兵，用一朵花把短暂相遇变成了可以被记住的事。', color: '#e6c36e' },
  { no: '02', title: '一次约会的报酬', place: '伍番街教堂', image: '/cp/02-church-bargain.png', alt: '水彩风格的教堂花田中，爱丽丝与克劳德商量护卫报酬', caption: '“报酬嘛——一次约会。”', cloud: '“护卫”原本是明确的工作，但她轻快地改写了报酬，也一步步打乱了他的距离感。', aerith: '她把危险说成玩笑，把逃亡变成同行；主动伸出的手，让他有机会选择留下。', color: '#dc8fa0' },
  { no: '03', title: '屋顶上的路', place: '贫民窟上空', image: '/cp/03-rooftop-hand.png', alt: '米德加屋顶上面对面牵手的爱丽丝与克劳德二创画', caption: '“这次，换我带你走。”', cloud: '笨拙地走在前面、确认她有没有跟上，是他不擅长说出口的在意。', aerith: '她看见他故作冷静的外壳，也总能用一句玩笑，让那份保护不再只是职责。', color: '#73cdb5' },
  { no: '04', title: '星空下的约会', place: '金碟游乐园', image: '/cp/04-gold-saucer-date.png', alt: '金碟游乐园贡多拉中相互凝望的爱丽丝与克劳德二创画', caption: '“我想见的，是现在的你。”', cloud: '喧闹的灯光里，他终于不只是被推着前进，而是认真听见她想被看见的那部分。', aerith: '她寻找的不是另一个人的影子，而是此刻坐在身边、仍在学习成为自己的克劳德。', color: '#8fa9dc' },
  { no: '05', title: '未说完的话', place: '命运的边界', image: '/cp/05-fate-echo.png', alt: '暮色花海与生命之流之间遥望的爱丽丝与克劳德二创画', caption: '“别让相遇只剩下告别。”', cloud: '有些回答来得太迟，于是保护的承诺变成跨越记忆与世界线的执念。', aerith: '她仍以微笑送他向前；离别没有抹去相遇，反而让那朵花成为永远的路标。', color: '#cda6d9' },
];

const intimateCpArt = [
  { image: '/cp/06-collar-tease.png', title: '再靠近一点', note: '她勾住衣领，把一句玩笑变成近在咫尺的心跳。', style: 'SHOUJO WATERCOLOR' },
  { image: '/cp/07-balcony-whisper.png', title: '烟火背后的耳语', note: '金碟的灯火太亮，只有贴近耳边的话足够私密。', style: 'CINEMATIC NIGHT' },
  { image: '/cp/08-almost-kiss.png', title: '月光差一步', note: '花房里没有观众，他们都没有先移开视线。', style: 'ROMANTIC OIL' },
  { image: '/cp/09-slow-dance.png', title: '闭馆后的慢舞', note: '喧闹散场之后，她握住他的手，教他跟上节拍。', style: 'ART NOUVEAU' },
];

const chapters = [
  { id: 'home', no: '00', name: '花海封面', en: 'PROLOGUE' },
  { id: 'story', no: '01', name: '她的故事', en: 'THE FLOWER GIRL' },
  { id: 'archive', no: '02', name: '人物档案', en: 'DOSSIER' },
  { id: 'arsenal', no: '03', name: '武器收藏', en: 'STAFF ARCHIVE' },
  { id: 'journey', no: '04', name: '旅程与关系', en: 'JOURNEY' },
  { id: 'cloud-aerith', no: '05', name: '云花专栏', en: 'CLOUD × AERITH' },
  { id: 'gallery', no: '06', name: '高清剧照', en: 'GAME STILLS' },
  { id: 'fanart', no: '07', name: '二创美术馆', en: 'FAN ART MUSEUM' },
  { id: 'memories', no: '08', name: '记忆画廊', en: 'MEMORIES' },
  { id: 'garden', no: '09', name: '互动花园', en: 'YOUR FLOWER' },
];

const soundscapes = [
  { name: '花田', en: 'FLOWER FIELD', notes: [196, 293.66, 392], type: 'sine' as OscillatorType, color: '#efc86f' },
  { name: '雨夜', en: 'RAIN MEMORY', notes: [146.83, 220, 329.63], type: 'triangle' as OscillatorType, color: '#8db7cf' },
  { name: '生命流', en: 'LIFESTREAM', notes: [220, 329.63, 493.88], type: 'sine' as OscillatorType, color: '#75d9b9' },
];

const buildGoals = [
  { name: '双重魔法爆发', en: 'DOUBLE CAST', weapon: 0, label: '高魔法输出', opening: ['布置 Arcane Ward', '让主施法者站入结界', '选择敌人弱点属性连续施法'], materia: ['元素攻击魔晶石', 'MP 吸收', '魔法强化'], accent: '#e99aae' },
  { name: '安全咏唱据点', en: 'SAFE CASTING', weapon: 2, label: '稳定与生存', opening: ['布置 Radiant Ward', '以强化普攻快速积累 ATB', '在结界内治疗或咏唱高阶魔法'], materia: ['治疗', '范围化', '先发制人'], accent: '#e7c66e' },
  { name: '全队 ATB 引擎', en: 'TEAM BATTERY', weapon: 4, label: '团队循环', opening: ['在队伍核心位置布置 ATB Ward', '由高频攻击队友在结界内行动', '用 Ward Shift 保持安全站位'], materia: ['ATB 增幅', '自动独特能力', '时间魔法'], accent: '#b795dc' },
  { name: '绝境逆转方案', en: 'LAST RESORT', weapon: 6, label: '复活与救场', opening: ['预留两格 ATB', '优先保证爱丽丝自身安全', '队伍倒下时使用 Noble Sacrifice'], materia: ['复活', '自动复活', 'MP 提升'], accent: '#d9ded8' },
];

const labPartners = [
  { name: '克劳德', note: '由克劳德在前排牵制，给爱丽丝留出结界内的完整咏唱窗口。' },
  { name: '蒂法', note: '蒂法快速推高力竭倍率，爱丽丝随后用射线或双重魔法完成爆发。' },
  { name: '尤菲', note: '尤菲的高频攻击适合充能 ATB 结界，也能在秘法结界中制造密集魔法连段。' },
];

const labScenarios = [
  { name: '首领战', note: '先观察属性弱点与大招时间轴，不要在危险阶段同时消耗全部 ATB。' },
  { name: '群体战', note: '把结界放在视野开阔处，优先利用范围魔法和队友的聚怪能力。' },
  { name: '远程敌人', note: '先用 Lustrous Shield 截断弹道，再把输出结界布置在盾牌后方。' },
];

const fanArtworks = [
  { image: '/fanart/lifestream-ukiyoe.png', title: '星之川', style: '浮世绘木版', category: '实验风格', alt: '爱丽丝站在生命之流与百合之间的浮世绘' },
  { image: '/fanart/coast-pastel.png', title: '第一次看海', style: '粉彩 · 彩铅', category: '传统绘画', alt: '爱丽丝赤脚走在海边的粉彩画' },
  { image: '/fanart/midgar-risograph.png', title: '钢铁之花', style: '套色绢印 · Risograph', category: '实验风格', alt: '爱丽丝与米德加钢铁结构的复古套色海报' },
  { image: '/fanart/church-ink-wash.png', title: '光落在花上', style: '水墨 · 矿物颜料', category: '传统绘画', alt: '水墨与矿物颜料风格的爱丽丝站在教堂光束与百合之间' },
  { image: '/fanart/church-stained-glass.png', title: '花窗圣所', style: '彩绘玻璃', category: '工艺影像', alt: '彩绘玻璃风格的爱丽丝提着花篮站在教堂中央' },
  { image: '/fanart/midgar-art-deco.png', title: '米德加之花', style: '装饰艺术 · 金箔', category: '装饰艺术', alt: '装饰艺术海报风格的爱丽丝与米德加花卉几何构图' },
  { image: '/fanart/church-romantic-oil.png', title: '旧日温室', style: '浪漫主义油画', category: '传统绘画', alt: '古典油画风格的爱丽丝在长满花草的教堂中采花' },
  { image: '/fanart/open-sky-pastel.png', title: '第一次走向天空', style: '粉彩 · 彩色铅笔', category: '传统绘画', alt: '粉彩画风格的爱丽丝赤脚走过晨光花田' },
  { image: '/fanart/planet-cyanotype.png', title: '星球蓝图', style: '蓝晒 · 石墨', category: '实验风格', alt: '蓝晒植物志风格的爱丽丝侧身凝望黄色花朵' },
  { image: '/fanart/church-handpainted-cinema.png', title: '花田里的晨光', style: '电影动画 · 手绘', category: '动画', alt: '手绘电影动画风格的爱丽丝在小教堂花田中整理鲜花' },
  { image: '/fanart/rooftop-blue-hour.png', title: '雨洗过的屋顶', style: '电影感写实', category: '电影视觉', alt: '蓝调时刻的米德加屋顶花园中爱丽丝轻触花朵' },
];

const fanFilters = ['全部', '传统绘画', '动画', '装饰艺术', '电影视觉', '实验风格'];

type ArchiveProgress = { weapons: number[]; church: number[]; cp: number[]; gallery: number[] };

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
  const [soundMode, setSoundMode] = useState(0);
  const [notice, setNotice] = useState('');
  const [activeRelation, setActiveRelation] = useState(0);
  const [activeVersion, setActiveVersion] = useState(3);
  const [spoilersOn, setSpoilersOn] = useState(false);
  const [selectedShot, setSelectedShot] = useState<number | null>(null);
  const [activeWeapon, setActiveWeapon] = useState(0);
  const [collectedWeapons, setCollectedWeapons] = useState<number[]>([0]);
  const [activeCp, setActiveCp] = useState(0);
  const [cpView, setCpView] = useState<'cloud' | 'aerith'>('aerith');
  const [chapterOpen, setChapterOpen] = useState(false);
  const [passportOpen, setPassportOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [archiveProgress, setArchiveProgress] = useState<ArchiveProgress>({ weapons: [0], church: [0], cp: [0], gallery: [] });
  const [labOpen, setLabOpen] = useState(false);
  const [buildGoal, setBuildGoal] = useState(0);
  const [labPartner, setLabPartner] = useState(0);
  const [labScenario, setLabScenario] = useState(0);
  const [fanFilter, setFanFilter] = useState('全部');
  const [selectedFanArt, setSelectedFanArt] = useState<number | null>(null);
  const [selectedCpArt, setSelectedCpArt] = useState<number | null>(null);
  const [spotlightArt, setSpotlightArt] = useState(9);
  const audioRef = useRef<{ context: AudioContext; nodes: OscillatorNode[] } | null>(null);
  const visibleFanArt = fanFilter === '全部' ? fanArtworks : fanArtworks.filter((artwork) => artwork.category === fanFilter);
  const spotlightIndex = spotlightArt % visibleFanArt.length;
  const spotlight = visibleFanArt[spotlightIndex];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aerith-garden');
      const savedWeapons = localStorage.getItem('aerith-weapons');
      const savedProgress = localStorage.getItem('aerith-archive-progress');
      queueMicrotask(() => {
        if (saved) setFlowers(JSON.parse(saved));
        if (savedWeapons) setCollectedWeapons(JSON.parse(savedWeapons));
        if (savedProgress) setArchiveProgress(JSON.parse(savedProgress));
      });
    } catch { /* private browsing or malformed local state */ }
    return () => {
      audioRef.current?.nodes.forEach((node) => node.stop());
      audioRef.current?.context.close();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? Math.min(100, Math.round(window.scrollY / available * 100)) : 0);
    };
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveChapter(visible.target.id);
    }, { rootMargin: '-32% 0px -55%', threshold: [0, .2, .5] });
    chapters.forEach((chapter) => { const node = document.getElementById(chapter.id); if (node) observer.observe(node); });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setSelectedShot(null); setSelectedFanArt(null); setSelectedCpArt(null); setChapterOpen(false); setPassportOpen(false); setLabOpen(false); }
      if (selectedShot !== null && event.key === 'ArrowLeft') setSelectedShot((selectedShot - 1 + gallery.length) % gallery.length);
      if (selectedShot !== null && event.key === 'ArrowRight') setSelectedShot((selectedShot + 1) % gallery.length);
      if (selectedFanArt !== null && event.key === 'ArrowLeft') setSelectedFanArt((selectedFanArt - 1 + visibleFanArt.length) % visibleFanArt.length);
      if (selectedFanArt !== null && event.key === 'ArrowRight') setSelectedFanArt((selectedFanArt + 1) % visibleFanArt.length);
      if (selectedCpArt !== null && event.key === 'ArrowLeft') setSelectedCpArt((selectedCpArt - 1 + intimateCpArt.length) % intimateCpArt.length);
      if (selectedCpArt !== null && event.key === 'ArrowRight') setSelectedCpArt((selectedCpArt + 1) % intimateCpArt.length);
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = selectedShot !== null || selectedFanArt !== null || selectedCpArt !== null || labOpen ? 'hidden' : '';
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [selectedShot, selectedFanArt, selectedCpArt, labOpen, visibleFanArt.length]);

  function stopSoundscape() {
    if (audioRef.current) {
      audioRef.current.nodes.forEach((node) => node.stop());
      audioRef.current.context.close();
      audioRef.current = null;
    }
    setSoundOn(false);
  }

  function playSoundscape(index: number) {
    if (audioRef.current) {
      audioRef.current.nodes.forEach((node) => node.stop());
      audioRef.current.context.close();
    }

    const AudioCtx = window.AudioContext;
    const context = new AudioCtx();
    const master = context.createGain();
    master.gain.setValueAtTime(0.016, context.currentTime);
    master.connect(context.destination);
    const soundscape = soundscapes[index];
    const nodes = soundscape.notes.map((frequency, noteIndex) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = soundscape.type;
      oscillator.frequency.value = frequency;
      gain.gain.value = noteIndex === 0 ? 0.42 : 0.15;
      oscillator.connect(gain).connect(master);
      oscillator.start(context.currentTime + noteIndex * 0.18);
      return oscillator;
    });
    audioRef.current = { context, nodes };
    setSoundMode(index);
    setSoundOn(true);
  }

  function toggleSound() {
    if (audioRef.current) stopSoundscape();
    else playSoundscape(soundMode);
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

  function toggleWeapon(index: number) {
    const next = collectedWeapons.includes(index) ? collectedWeapons.filter((item) => item !== index) : [...collectedWeapons, index];
    setCollectedWeapons(next);
    localStorage.setItem('aerith-weapons', JSON.stringify(next));
  }

  function markProgress(key: keyof ArchiveProgress, index: number) {
    setArchiveProgress((current) => {
      if (current[key].includes(index)) return current;
      const next = { ...current, [key]: [...current[key], index] };
      localStorage.setItem('aerith-archive-progress', JSON.stringify(next));
      return next;
    });
  }

  function selectWeapon(index: number) { setActiveWeapon(index); markProgress('weapons', index); }
  function selectDiscovery(index: number) { setDiscovery(index); markProgress('church', index); }
  function selectCpMoment(index: number) { setActiveCp(index); markProgress('cp', index); }
  function openGallery(index: number) { setSelectedShot(index); markProgress('gallery', index); }
  function openFanArtwork(index: number) { setSelectedFanArt(index); }

  const exploredCount = archiveProgress.weapons.length + archiveProgress.church.length + archiveProgress.cp.length + archiveProgress.gallery.length + (flowers.length ? 1 : 0);
  const exploredTotal = weapons.length + discoveries.length + cpMoments.length + gallery.length + 1;
  const exploredPercent = Math.round(exploredCount / exploredTotal * 100);
  const activeBuild = buildGoals[buildGoal];
  const passportTasks = [
    { glyph: '♜', name: '长杖研究员', note: '查看全部七把可收集武器', current: archiveProgress.weapons.length, target: weapons.length, href: '#arsenal' },
    { glyph: '⌂', name: '教堂巡礼者', note: '探索花田、长椅与屋顶', current: archiveProgress.church.length, target: discoveries.length, href: '#story' },
    { glyph: '∞', name: '同行的见证者', note: '读完云花专栏五个节点', current: archiveProgress.cp.length, target: cpMoments.length, href: '#cloud-aerith' },
    { glyph: '▣', name: '世界摄影师', note: '打开全部高清官方剧照', current: archiveProgress.gallery.length, target: gallery.length, href: '#gallery' },
    { glyph: '✦', name: '花田守护者', note: '在互动花园种下一朵花', current: flowers.length ? 1 : 0, target: 1, href: '#garden' },
  ];

  return (
    <main>
      <div className="archive-hud" aria-label="档案馆快捷工具">
        <button type="button" className="hud-chapters" onClick={() => { setChapterOpen(!chapterOpen); setPassportOpen(false); }} aria-expanded={chapterOpen}><span>☰</span><i>章节</i></button>
        <button type="button" className="hud-progress" onClick={() => { setPassportOpen(!passportOpen); setChapterOpen(false); }} aria-expanded={passportOpen} style={{ '--progress': `${exploredPercent * 3.6}deg` } as React.CSSProperties}><strong>{exploredPercent}</strong><small>%</small><i>探索护照</i></button>
        <button type="button" className="hud-lab" onClick={() => { setLabOpen(true); setChapterOpen(false); setPassportOpen(false); }} aria-expanded={labOpen}><span>✧</span><i>战术实验室</i></button>
      </div>
      <div className={`drawer-shade ${chapterOpen || passportOpen || labOpen ? 'active' : ''}`} onClick={() => { setChapterOpen(false); setPassportOpen(false); setLabOpen(false); }} />
      <aside className={`chapter-drawer ${chapterOpen ? 'open' : ''}`} aria-hidden={!chapterOpen}>
        <header><div><small>ARCHIVE DIRECTORY</small><h2>章节目录</h2></div><button type="button" onClick={() => setChapterOpen(false)} aria-label="关闭章节目录">×</button></header>
        <nav aria-label="页面章节">
          {chapters.map((chapter) => <a key={chapter.id} className={activeChapter === chapter.id ? 'active' : ''} href={`#${chapter.id}`} onClick={() => setChapterOpen(false)}><small>{chapter.no}</small><span>{chapter.name}<i>{chapter.en}</i></span><b>{activeChapter === chapter.id ? '●' : '↗'}</b></a>)}
        </nav>
        <button type="button" className="random-route" onClick={() => { const target = chapters[1 + Math.floor(Math.random() * (chapters.length - 1))]; document.getElementById(target.id)?.scrollIntoView({ behavior: 'smooth' }); setChapterOpen(false); }}>✦ 随机走进一段记忆</button>
        <div className="soundscape-picker"><span>ORIGINAL AMBIENT TONES</span>{soundscapes.map((soundscape, index) => <button type="button" key={soundscape.name} className={soundOn && soundMode === index ? 'active' : ''} onClick={() => soundOn && soundMode === index ? stopSoundscape() : playSoundscape(index)} style={{ '--tone': soundscape.color } as React.CSSProperties}><i>{soundOn && soundMode === index ? 'Ⅱ' : '♪'}</i><b>{soundscape.name}</b><small>{soundscape.en}</small></button>)}</div>
        <p>当前阅读进度 · {scrollProgress}%</p>
      </aside>
      <aside className={`passport-drawer ${passportOpen ? 'open' : ''}`} aria-hidden={!passportOpen}>
        <header><div><small>AERITH ARCHIVE PASSPORT</small><h2>探索护照</h2></div><button type="button" onClick={() => setPassportOpen(false)} aria-label="关闭探索护照">×</button></header>
        <div className="passport-total"><div style={{ '--progress': `${exploredPercent * 3.6}deg` } as React.CSSProperties}><strong>{exploredPercent}</strong><span>%</span></div><p><b>{exploredCount} / {exploredTotal}</b> 个档案印记<br /><small>{exploredPercent === 100 ? '花田已经记住了你的全部旅程。' : '打开内容、切换画面并种花，即可留下印记。'}</small></p></div>
        <div className="passport-tasks">
          {passportTasks.map((task) => <a key={task.name} href={task.href} className={task.current >= task.target ? 'complete' : ''} onClick={() => setPassportOpen(false)}><span>{task.current >= task.target ? '✓' : task.glyph}</span><div><b>{task.name}</b><small>{task.note}</small><i><em style={{ width: `${task.current / task.target * 100}%` }} /></i></div><strong>{task.current}/{task.target}</strong></a>)}
        </div>
        <p className="passport-local">所有进度只保存在当前设备，不需要登录。</p>
      </aside>
      <section className={`battle-lab ${labOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="爱丽丝战术实验室" aria-hidden={!labOpen} style={{ '--lab-accent': activeBuild.accent } as React.CSSProperties}>
        <header><div><small>AERITH TACTICAL LAB · FAN STRATEGY</small><h2>结界战术实验室</h2><p>选择目标、同行者与战场，让档案馆生成一套战斗思路。</p></div><button type="button" onClick={() => setLabOpen(false)} aria-label="关闭战术实验室">×</button></header>
        <div className="lab-layout">
          <div className="lab-controls">
            <fieldset><legend>01 · 你的战斗目标</legend>{buildGoals.map((goal, index) => <button type="button" key={goal.name} className={buildGoal === index ? 'active' : ''} onClick={() => setBuildGoal(index)}><span>{String(index + 1).padStart(2, '0')}</span><b>{goal.name}</b><small>{goal.label}</small></button>)}</fieldset>
            <fieldset><legend>02 · 同行者</legend><div>{labPartners.map((partner, index) => <button type="button" key={partner.name} className={labPartner === index ? 'active' : ''} onClick={() => setLabPartner(index)}>{partner.name}</button>)}</div></fieldset>
            <fieldset><legend>03 · 战场类型</legend><div>{labScenarios.map((scenario, index) => <button type="button" key={scenario.name} className={labScenario === index ? 'active' : ''} onClick={() => setLabScenario(index)}>{scenario.name}</button>)}</div></fieldset>
          </div>
          <article className="lab-result">
            <div className="lab-result-top"><span>RECOMMENDED PLAN</span><b>{activeBuild.en}</b></div>
            <h3>{activeBuild.name}</h3><p className="lab-weapon">推荐武器 · <strong>{weapons[activeBuild.weapon].name}</strong><span>{weapons[activeBuild.weapon].ability}</span></p>
            <ol>{activeBuild.opening.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol>
            <div className="lab-materia"><small>建议魔晶石方向</small>{activeBuild.materia.map((item) => <span key={item}>◌ {item}</span>)}</div>
            <blockquote><b>{labPartners[labPartner].name}</b> · {labPartners[labPartner].note}</blockquote>
            <blockquote><b>{labScenarios[labScenario].name}</b> · {labScenarios[labScenario].note}</blockquote>
            <p className="lab-disclaimer">本站战术组合，不代表唯一最优解；装备名称以英文技能为主要识别依据。</p>
          </article>
        </div>
      </section>
      <section className="hero" id="home">
        <img className="hero-photo" src={assetUrl('/hero-cover.png')} alt="躺在黄色花海中向前伸手的爱丽丝" fetchPriority="high" />
        <nav className="nav" aria-label="主导航">
          <a className="brand" href="#home" aria-label="返回首页">
            <span className="brand-flower">✦</span>
            <span>FLOWERS<br />BENEATH THE SKY</span>
          </a>
          <div className="nav-links">
            <a href="#archive">人物档案</a>
            <a href="#arsenal">武器收藏</a>
            <a href="#cloud-aerith">云花专栏</a>
            <a href="#gallery">游戏剧照</a>
            <a href="#fanart">二创画廊</a>
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
              <span className={`sound-bars ${soundOn ? 'is-playing' : ''}`}>Ⅲ</span> {soundOn ? `${soundscapes[soundMode].name}正在回响` : '聆听花语'}
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
            <img src={assetUrl('/aerith-art-nouveau-card.png')} alt="完整保留花卉边框的新艺术风格爱丽丝收藏卡" loading="lazy" decoding="async" />
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
            <img src={assetUrl('/official/aerith-rebirth-headshot.png')} alt="最终幻想VII 重生官方爱丽丝头像" loading="lazy" decoding="async" />
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

      <section className="arsenal-section" id="arsenal" style={{ '--weapon-tone': weapons[activeWeapon].tone } as React.CSSProperties}>
        <div className="arsenal-heading">
          <div><p className="kicker">THE STAFF ARCHIVE · REBIRTH</p><h2>七把长杖，<br />七种战斗思路。</h2></div>
          <div className="collection-meter"><span>COLLECTION</span><strong>{collectedWeapons.length}<small>/ 07</small></strong><i><b style={{ width: `${collectedWeapons.length / weapons.length * 100}%` }} /></i><p>收集进度仅保存在这台设备上</p></div>
        </div>
        <div className="arsenal-shell">
          <div className="weapon-index" role="tablist" aria-label="爱丽丝可收集武器">
            {weapons.map((weapon, index) => (
              <button key={weapon.name} role="tab" aria-selected={activeWeapon === index} className={activeWeapon === index ? 'active' : ''} onClick={() => selectWeapon(index)}>
                <small>{String(index + 1).padStart(2, '0')}</small><span>{weapon.name}<i>{weapon.cn}</i></span><b className={collectedWeapons.includes(index) ? 'is-collected' : ''}>{collectedWeapons.includes(index) ? '✓' : '○'}</b>
              </button>
            ))}
          </div>
          <article className="weapon-display" role="tabpanel">
            <div className="weapon-art">
              <img key={weapons[activeWeapon].image} src={assetUrl(weapons[activeWeapon].image)} alt={`${weapons[activeWeapon].name} 在《FINAL FANTASY VII REBIRTH》装备界面中的实机原图`} loading="lazy" decoding="async" />
              <p>{weapons[activeWeapon].role} · IN-GAME CAPTURE</p>
              <em>{String(activeWeapon + 1).padStart(2, '0')}</em>
              <a href="https://www.destructoid.com/ff7-rebirth-all-aerith-weapons-locations/" target="_blank" rel="noreferrer">原图与数据来源 ↗</a>
            </div>
            <div className="weapon-copy">
              <div className="weapon-topline"><span>{weapons[activeWeapon].chapter}</span><small>{weapons[activeWeapon].atb} ATB</small></div>
              <h3>{weapons[activeWeapon].name}</h3><p className="weapon-cn">{weapons[activeWeapon].cn} · 本站译名</p>
              <div className="ability-name"><small>WEAPON ABILITY</small><strong>{weapons[activeWeapon].ability}</strong><span>{weapons[activeWeapon].abilityCn}</span></div>
              <p className="ability-effect">{weapons[activeWeapon].effect}</p>
              <div className="weapon-tip"><span>TACTICAL NOTE</span><p>{weapons[activeWeapon].tip}</p></div>
              <div className="weapon-location"><span>取得位置</span><p>{weapons[activeWeapon].location}</p></div>
              <div className="weapon-actions">
                <button type="button" onClick={() => selectWeapon((activeWeapon - 1 + weapons.length) % weapons.length)}>← 上一把</button>
                <button type="button" className={collectedWeapons.includes(activeWeapon) ? 'collected' : ''} onClick={() => toggleWeapon(activeWeapon)}>{collectedWeapons.includes(activeWeapon) ? '✓ 已加入收藏' : '＋ 标记为已取得'}</button>
                <button type="button" onClick={() => selectWeapon((activeWeapon + 1) % weapons.length)}>下一把 →</button>
              </div>
            </div>
          </article>
        </div>
        <div className="base-skills">
          <p>无需武器解锁的基础战术</p>
          <button type="button" onClick={() => setNotice('灵魂吸收：攻击敌人并吸收 MP；对力竭目标效果更强。')}><span>SOUL DRAIN</span>灵魂吸收</button>
          <button type="button" onClick={() => setNotice('魔法风暴：对身边的敌人造成范围魔法伤害。')}><span>SORCEROUS STORM</span>魔法风暴</button>
          <button type="button" onClick={() => setNotice('结界瞬移：在已布置的结界之间快速转移位置。')}><span>WARD SHIFT</span>结界瞬移</button>
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

      <section className="cp-section" id="cloud-aerith" style={{ '--cp-tone': cpMoments[activeCp].color } as React.CSSProperties}>
        <div className="cp-heading"><p className="kicker">CLOUD × AERITH · FAN COLUMN</p><h2>从一朵花开始的，<br />不只是护卫任务。</h2><p>以下为偏克劳德×爱丽丝方向的同人情感解读，与上方官方角色资料分开呈现。</p></div>
        <div className="cp-experience">
          <div className="cp-moments" role="tablist" aria-label="克劳德与爱丽丝的故事章节">
            {cpMoments.map((moment, index) => (
              <button key={moment.no} role="tab" aria-selected={activeCp === index} className={activeCp === index ? 'active' : ''} onClick={() => selectCpMoment(index)}><small>{moment.no}</small><span>{moment.title}<i>{moment.place}</i></span><b>↗</b></button>
            ))}
          </div>
          <article className="cp-card" role="tabpanel">
            <div className="cp-photo"><img key={cpMoments[activeCp].image} src={assetUrl(cpMoments[activeCp].image)} alt={cpMoments[activeCp].alt} loading="lazy" decoding="async" /><span>{cpMoments[activeCp].caption}</span></div>
            <div className="cp-story">
              <p>{cpMoments[activeCp].no} · {cpMoments[activeCp].place}</p><h3>{cpMoments[activeCp].title}</h3>
              <div className="view-toggle" role="group" aria-label="选择故事视角"><button type="button" className={cpView === 'cloud' ? 'active' : ''} onClick={() => setCpView('cloud')}>克劳德视角</button><button type="button" className={cpView === 'aerith' ? 'active' : ''} onClick={() => setCpView('aerith')}>爱丽丝视角</button></div>
              <blockquote>“{cpView === 'cloud' ? cpMoments[activeCp].cloud : cpMoments[activeCp].aerith}”</blockquote>
              <div className="cp-nav"><button type="button" onClick={() => selectCpMoment((activeCp - 1 + cpMoments.length) % cpMoments.length)}>←</button><span>{activeCp + 1} / {cpMoments.length}</span><button type="button" onClick={() => selectCpMoment((activeCp + 1) % cpMoments.length)}>→</button></div>
            </div>
          </article>
        </div>
        <div className="cp-intimate-heading"><div><small>AFTER HOURS · FAN SPECIAL</small><h3>暧昧发生在，<br />再靠近一点之后。</h3></div><p>四张独立二创用眼神、距离与肢体语言延伸两人的默契。均为成年角色、非露骨的浪漫演绎。</p></div>
        <div className="cp-intimate-grid">
          {intimateCpArt.map((art, index) => <button type="button" key={art.image} onClick={() => setSelectedCpArt(index)}><img src={assetUrl(art.image)} alt={`克劳德与爱丽丝的暧昧二创：${art.title}`} loading="lazy" decoding="async" /><span><small>{String(index + 1).padStart(2, '0')} · {art.style}</small><b>{art.title}</b><i>{art.note}</i></span></button>)}
        </div>
      </section>

      <section className="church-section" aria-labelledby="church-title">
        <div className="church-heading">
          <p className="kicker">THE CHURCH · A QUIET PLACE</p>
          <h2 id="church-title">停下来，听听教堂里的声音。</h2>
          <p>选择一个角落，发现留在这里的小小回声。</p>
        </div>
        <div className="discovery-stage">
          <img key={discoveries[discovery].image} className="stage-image" src={assetUrl(discoveries[discovery].image)} alt={discoveries[discovery].alt} loading="lazy" decoding="async" />
          <span className="stage-medium">{discoveries[discovery].medium}</span>
          <div className="discovery-note" aria-live="polite">
            <span>{discoveries[discovery].icon}</span>
            <p>{discoveries[discovery].note}</p>
          </div>
          <div className="discovery-buttons" role="group" aria-label="探索教堂">
            {discoveries.map((item, index) => (
              <button key={item.label} className={discovery === index ? 'active' : ''} onClick={() => selectDiscovery(index)} aria-pressed={discovery === index}>
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
            <button type="button" className={`gallery-shot shot-${index + 1}`} key={shot.image} onClick={() => openGallery(index)}>
              <img src={assetUrl(shot.image)} alt={shot.note} loading="lazy" decoding="async" />
              <span><small>{String(index + 1).padStart(2, '0')} · {shot.source}</small><b>{shot.title}</b><i>{shot.note}</i></span>
            </button>
          ))}
        </div>
        <p className="official-credit">GAME STILLS © SQUARE ENIX · CHARACTER DESIGN: TETSUYA NOMURA / ROBERTO FERRARI · 非商业同人资料展示</p>
      </section>

      <section className="fanart-section" id="fanart">
        <div className="fanart-heading"><div><p className="kicker">AERITH ORIGINAL ART MUSEUM</p><h2>十一种笔触，<br />画同一朵花。</h2></div><p>这里仅保留专为画廊制作、未在其他章节使用的十一幅非商业二创。封面、剧情卡牌与记忆插画不再重复展出；像素风也已从策展中移除。</p></div>
        <article className="fanart-spotlight" style={{ '--spotlight-image': `url(${assetUrl(spotlight.image)})` } as React.CSSProperties}>
          <button type="button" className="spotlight-image" onClick={() => openFanArtwork(spotlightIndex)} aria-label={`查看精选作品：${spotlight.title}`}><img src={assetUrl(spotlight.image)} alt={spotlight.alt} /></button>
          <div className="spotlight-copy"><small>CURATOR&apos;S SPOTLIGHT · {String(spotlightIndex + 1).padStart(2, '0')}</small><h3>{spotlight.title}</h3><p>{spotlight.style}</p><div><button type="button" onClick={() => setSpotlightArt((spotlightIndex - 1 + visibleFanArt.length) % visibleFanArt.length)} aria-label="上一幅精选作品">←</button><span>{spotlightIndex + 1} / {visibleFanArt.length}</span><button type="button" onClick={() => setSpotlightArt((spotlightIndex + 1) % visibleFanArt.length)} aria-label="下一幅精选作品">→</button><button type="button" className="spotlight-open" onClick={() => openFanArtwork(spotlightIndex)}>沉浸观画 ↗</button></div></div>
        </article>
        <div className="fanart-toolbar">
          <div role="group" aria-label="筛选二创画风">{fanFilters.map((filter) => <button type="button" key={filter} className={fanFilter === filter ? 'active' : ''} onClick={() => { setFanFilter(filter); setSelectedFanArt(null); setSpotlightArt(0); }}>{filter}</button>)}</div>
          <button type="button" className="random-art" onClick={() => { const randomIndex = Math.floor(Math.random() * visibleFanArt.length); setSpotlightArt(randomIndex); openFanArtwork(randomIndex); }}>✦ 随机看一幅</button>
        </div>
        <div className="fanart-grid">
          {visibleFanArt.map((artwork, index) => ({ artwork, index })).filter(({ index }) => index !== spotlightIndex).map(({ artwork, index }) => <button type="button" className={`fanart-card fanart-${index + 1}`} key={artwork.image} onClick={() => { setSpotlightArt(index); openFanArtwork(index); }}><img src={assetUrl(artwork.image)} alt={artwork.alt} loading="lazy" decoding="async" /><span><small>{String(index + 1).padStart(2, '0')} · {artwork.style}</small><b>{artwork.title}</b><i>VIEW FULL ART ↗</i></span></button>)}
        </div>
        <p className="fanart-credit">ELEVEN UNIQUE FAN WORKS · NO REUSED STORY ASSETS · CREATED FOR FLOWERS BENEATH THE SKY · 非商业同人创作</p>
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
            <div className="version-visual"><img src={assetUrl(versions[activeVersion].image)} alt={`${versions[activeVersion].label}中的爱丽丝形象`} style={{ objectPosition: versions[activeVersion].position }} loading="lazy" decoding="async" /></div>
            <div><small>{versions[activeVersion].year} · {versions[activeVersion].label}</small><h3>{versions[activeVersion].title}</h3><p>{versions[activeVersion].text}</p><div className="version-facts">{versions[activeVersion].facts.map((fact) => <span key={fact}>{fact}</span>)}</div><p className="version-source">IMAGE · {versions[activeVersion].source}</p></div>
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
              <img src={assetUrl(memories[activeMemory].image)} alt={memories[activeMemory].alt} loading="lazy" decoding="async" />
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
          <a href="https://www.destructoid.com/ff7-rebirth-all-aerith-weapons-locations/" target="_blank" rel="noreferrer"><span>06</span><b>REBIRTH · 七件法杖实机截图与取得位置</b><i>↗</i></a>
          <a href="https://www.square-enix.com/ffvii/en-gb/games/crisis-core/" target="_blank" rel="noreferrer"><span>07</span><b>CRISIS CORE REUNION · 官方作品页</b><i>↗</i></a>
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
          <button type="button" className="lightbox-arrow prev" onClick={(event) => { event.stopPropagation(); openGallery((selectedShot - 1 + gallery.length) % gallery.length); }} aria-label="上一张剧照">←</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={assetUrl(gallery[selectedShot].image)} alt={gallery[selectedShot].note} />
            <figcaption><span>{gallery[selectedShot].source} · OFFICIAL STILL</span><b>{gallery[selectedShot].title}</b><p>{gallery[selectedShot].note}</p></figcaption>
          </figure>
          <button type="button" className="lightbox-arrow next" onClick={(event) => { event.stopPropagation(); openGallery((selectedShot + 1) % gallery.length); }} aria-label="下一张剧照">→</button>
          <p className="lightbox-hint">← → 切换 · ESC 关闭</p>
        </div>
      )}
      {selectedFanArt !== null && (
        <div className="fanart-lightbox" role="dialog" aria-modal="true" aria-label={visibleFanArt[selectedFanArt].title} onClick={() => setSelectedFanArt(null)}>
          <button type="button" className="fanlight-close" onClick={() => setSelectedFanArt(null)} aria-label="关闭二创作品">×</button>
          <button type="button" className="fanlight-arrow prev" onClick={(event) => { event.stopPropagation(); openFanArtwork((selectedFanArt - 1 + visibleFanArt.length) % visibleFanArt.length); }} aria-label="上一幅作品">←</button>
          <figure onClick={(event) => event.stopPropagation()}><img src={assetUrl(visibleFanArt[selectedFanArt].image)} alt={visibleFanArt[selectedFanArt].alt} /><figcaption><small>{visibleFanArt[selectedFanArt].style} · ORIGINAL FAN WORK</small><h3>{visibleFanArt[selectedFanArt].title}</h3><p>{selectedFanArt + 1} / {visibleFanArt.length}</p></figcaption></figure>
          <button type="button" className="fanlight-arrow next" onClick={(event) => { event.stopPropagation(); openFanArtwork((selectedFanArt + 1) % visibleFanArt.length); }} aria-label="下一幅作品">→</button>
          <p className="fanlight-hint">← → 切换作品 · ESC 返回画廊</p>
        </div>
      )}
      {selectedCpArt !== null && (
        <div className="fanart-lightbox" role="dialog" aria-modal="true" aria-label={intimateCpArt[selectedCpArt].title} onClick={() => setSelectedCpArt(null)}>
          <button type="button" className="fanlight-close" onClick={() => setSelectedCpArt(null)} aria-label="关闭暧昧特辑作品">×</button>
          <button type="button" className="fanlight-arrow prev" onClick={(event) => { event.stopPropagation(); setSelectedCpArt((selectedCpArt - 1 + intimateCpArt.length) % intimateCpArt.length); }} aria-label="上一幅暧昧特辑">←</button>
          <figure onClick={(event) => event.stopPropagation()}><img src={assetUrl(intimateCpArt[selectedCpArt].image)} alt={`克劳德与爱丽丝的暧昧二创：${intimateCpArt[selectedCpArt].title}`} /><figcaption><small>{intimateCpArt[selectedCpArt].style} · CLOUD × AERITH FAN WORK</small><h3>{intimateCpArt[selectedCpArt].title}</h3><p>{intimateCpArt[selectedCpArt].note}</p></figcaption></figure>
          <button type="button" className="fanlight-arrow next" onClick={(event) => { event.stopPropagation(); setSelectedCpArt((selectedCpArt + 1) % intimateCpArt.length); }} aria-label="下一幅暧昧特辑">→</button>
          <p className="fanlight-hint">← → 切换作品 · ESC 返回专栏</p>
        </div>
      )}
    </main>
  );
}
