export const assetBase = `${import.meta.env.BASE_URL}cat_quiz_assets/`;

export const catSuffixes = [
  { id: 'cool', label: '高冷猫', accent: '#7D8CA3', sticker: 'question_bubble', note: '看起来谁也不爱，其实会偷偷观察你。' },
  { id: 'cling', label: '粘人猫', accent: '#F29DB2', sticker: 'heart', note: '你一坐下，它就想把你占为己有。' },
  { id: 'food', label: '吃货猫', accent: '#F2A34B', sticker: 'fish_snack', note: '世界很复杂，但开饭最重要。' },
  { id: 'drama', label: '戏精猫', accent: '#A678D6', sticker: 'toy_wand', note: '每天都有剧情，每声喵都有情绪。' },
  { id: 'shy', label: '怂包猫', accent: '#9B8CC8', sticker: 'sleepy_moon', note: '一点风吹草动都要先观察三分钟。' },
  { id: 'free', label: '不被定义的猫', accent: '#6FAFBA', sticker: 'paw', note: '它每天都不太一样，你也不敢乱总结。' },
];
export const traits = {
  A: { id: 'wonang', code: 'W', label: '窝囊', title: '窝囊系', slugPrefix: 'wonang', accent: '#77B7A3', suffix: '你还不敢抱怨，生怕它给差评。', catVoice: '认错速度尚可。' },
  B: { id: 'qinlao', code: 'Q', label: '勤劳', title: '勤劳系', slugPrefix: 'qinlao', accent: '#E8A84A', suffix: '你把这份工作当成编制内 KPI。', catVoice: '准时，合格。' },
  C: { id: 'aojiao', code: 'A', label: '傲娇', title: '傲娇系', slugPrefix: 'aojiao', accent: '#D86F72', suffix: '你嘴上嫌烦，身体却很诚实。', catVoice: '……勉勉强强吧。' },
  D: { id: 'xijing', code: 'X', label: '戏精', title: '戏精系', slugPrefix: 'xijing', accent: '#6FA0D8', suffix: '你还能给自己配上旁白和 BGM。', catVoice: '演技比罐头味道还冲。' },
};

export const domains = {
  A: { id: 'D1', label: '后勤投喂', description: '管饭、管砂、管门、投喂后勤。' },
  B: { id: 'D2', label: '贴身陪护', description: '跟着、暖着、摸着、贴身陪护。' },
  C: { id: 'D3', label: '玩乐互动', description: '玩、扑、拆、逗乐互动。' },
  D: { id: 'D4', label: '人生剧本', description: '脑补、背锅、熬夜、人生剧本。' },
};

export const roles = {
  worker: {
    id: 'J01',
    label: '打工人',
    tagline: '白天消失晚上回来，在猫眼里就是去给它挣猫粮的。',
    analysisCore: '你每天出门像被派去远方讨生活，回家第一件事还得接受猫的复核。工资不是工资，是猫粮、猫砂和零食基金的中转站。',
    catVoiceCore: '今天也按时上供了。',
  },
  litter_general: {
    id: 'J02',
    label: '铲屎大将军',
    tagline: '承包猫砂盆的一切，包括气味。',
    analysisCore: '你掌管家中最神秘也最有味道的军务，猫只负责留下战报，你负责清场、换砂、复盘战况。',
    catVoiceCore: '战场清理得不错。',
  },
  kitchen_manager: {
    id: 'J03',
    label: '御膳房总管',
    tagline: '负责一日三餐，开饭误差以秒计算。',
    analysisCore: '在猫的编制里，你不是饲养员，你是 007 食堂承包商。闹钟比你先醒，罐头比你先开。',
    catVoiceCore: '碗空了你就该出现。',
  },
  snack_cabinet: {
    id: 'J04',
    label: '行走零食柜',
    tagline: '零食袋一响，它还没动你先到位。',
    analysisCore: '你身上自带小鱼干雷达，柜门一开就进入补给状态。猫看你的眼神，三分亲情七分库存管理。',
    catVoiceCore: '把那包打开，别让我提醒第二遍。',
  },
  play_officer: {
    id: 'J05',
    label: '专职陪玩官',
    tagline: '会转逗猫棒、会躲、还会假装被抓到。',
    analysisCore: '你负责把平凡客厅变成狩猎现场，逗猫棒一挥就开工。输赢不重要，重要的是猫觉得自己很厉害。',
    catVoiceCore: '跑慢点，我要抓到你。',
  },
  human_cat_wand: {
    id: 'J06',
    label: '人肉逗猫棒',
    tagline: '你的手就是玩具，靠近就会被扑。',
    analysisCore: '你已经和玩具边界不清了，手腕、脚踝和袖口都有上岗风险。猫一兴奋，你就是今日互动耗材。',
    catVoiceCore: '这个玩具会叫，好玩。',
  },
  cat_tree_human: {
    id: 'J07',
    label: '人形猫爬架',
    tagline: '大腿、肩膀、后背，哪里好踩踩哪里。',
    analysisCore: '你是会呼吸的家具，稳定、温热、还能发出细小抗议。猫路过你时不是路过，是勘察地形。',
    catVoiceCore: '高度合适，承重也行。',
  },
  warm_bed: {
    id: 'J08',
    label: '恒温暖床垫',
    tagline: '冬天抢着睡、夏天嫌你烫的移动恒温窝。',
    analysisCore: '你最大的价值是持续供热和不乱翻身。只要猫睡上来，你就自动切换低功耗待机模式。',
    catVoiceCore: '温度可以，先别动。',
  },
  auto_cat_bed: {
    id: 'J09',
    label: '自动猫窝',
    tagline: '它往你腿上一坐，你就自动进入静止模式。',
    analysisCore: '你拥有先进的人体感应技术：猫一落座，你立刻失去下半身使用权。手机远了、水杯空了，都不如猫睡得稳重要。',
    catVoiceCore: '窝已启动。',
  },
  little_follower: {
    id: 'J10',
    label: '贴身小跟班',
    tagline: '猫走到哪你跟到哪，还主动帮它开门。',
    analysisCore: '你是猫的随行助理，负责观察路线、解释需求、随时响应。它只是看向门，你已经开始判断门后有什么。',
    catVoiceCore: '跟紧点。',
  },
  door_minister: {
    id: 'J11',
    label: '开门部长',
    tagline: '门、窗、柜子、零食袋，全归你管。',
    analysisCore: '你的部门业务广泛，从卧室门到柜门再到罐头盖，都属于猫授权你办理的通道事务。',
    catVoiceCore: '门开一条缝，不是全开。',
  },
  scratch_master: {
    id: 'J12',
    label: '御用挠痒师',
    tagline: '挠下巴摸肚皮专业十级，手停就投诉。',
    analysisCore: '你对下巴、耳后、背脊的手法有职业级理解。猫的满意度不写在脸上，写在你手一停它就回头的瞬间。',
    catVoiceCore: '位置对了，继续。',
  },
  blame_taker: {
    id: 'J13',
    label: '首席背锅侠',
    tagline: '花瓶碎了、纸抽烂了，锅都是你的。',
    analysisCore: '家里一有响动，锅就自动飞到你头上。花瓶、纸抽、遥控器，案发现场永远指向离猫最近的那个人类。',
    catVoiceCore: '不是我干的。',
  },
  night_guard: {
    id: 'J14',
    label: '夜班侍卫',
    tagline: '半夜三点跑酷，你负责陪醒。',
    analysisCore: '当世界睡去，你被猫任命为夜间值守。三点的客厅、四点的水碗、五点的床头，都留下过你的精神损耗。',
    catVoiceCore: '醒醒，夜巡开始了。',
  },
  box_opener: {
    id: 'J15',
    label: '拆箱专员',
    tagline: '快递一到，负责开箱给它“检查”。',
    analysisCore: '快递不是你的，是猫的临时地产。你负责拆封、摆放、清理边角料，并接受它对纸箱舒适度的终审。',
    catVoiceCore: '里面东西拿走，箱子留下。',
  },
  cat_translator: {
    id: 'J16',
    label: '御用翻译官',
    tagline: '它喵一声，你能脑补出整部连续剧。',
    analysisCore: '你擅长把一声喵翻译成完整会议纪要。别人听见叫声，你听见需求、情绪和一份暗含指责的通知。',
    catVoiceCore: '这次翻译得差不多。',
  },
};

export const roleMatrix = {
  A: { A: 'kitchen_manager', B: 'snack_cabinet', C: 'litter_general', D: 'door_minister' },
  B: { A: 'scratch_master', B: 'little_follower', C: 'warm_bed', D: 'auto_cat_bed' },
  C: { A: 'play_officer', B: 'human_cat_wand', C: 'box_opener', D: 'cat_tree_human' },
  D: { A: 'cat_translator', B: 'night_guard', C: 'blame_taker', D: 'worker' },
};

export const hiddenResults = {
  chosen_litter_owner: {
    id: 'H01',
    title: '天选之铲屎官',
    tagline: '你的服务意识已经不属于普通人类范畴。',
    analysis: '你不是被猫选中，是被猫正式录用。饭、水、砂、门、陪伴全线在线，猫只要眨一下眼，你已经把解决方案端到面前。',
    catVoice: '朕宣布，你通过终身试用期。',
    scores: { food: 96, play: 82, endure: 97, love: 95 },
    accent: '#E7B84F',
    sticker: 'crown',
  },
  walking_atm: {
    id: 'H02',
    title: '猫界行走 ATM',
    tagline: '你对猫的爱，主要以购物小票的形式出现。',
    analysis: '零食、罐头、玩具、猫砂，你的购物车比猫的情绪还满。猫不用学会说话，只要看一眼柜子，你就开始补货。',
    catVoice: '余额充足，继续保持。',
    scores: { food: 99, play: 73, endure: 84, love: 91 },
    accent: '#E6AD3F',
    sticker: 'coin',
  },
  cat_language_scholar: {
    id: 'H03',
    title: '猫语十级学者',
    tagline: '一声喵里，你听出了需求、控诉和未尽之意。',
    analysis: '你已经掌握猫语的阅读理解题型：尾巴角度、叫声长短、眼神停顿，全都能被你整理成一份行为报告。',
    catVoice: '这位同学，有点悟性。',
    scores: { food: 82, play: 85, endure: 88, love: 96 },
    accent: '#5F9ED8',
    sticker: 'question_bubble',
  },
  certified_scapegoat: {
    id: 'H04',
    title: '本猫认证大冤种',
    tagline: '猫没错，错的是地心引力、纸抽和你。',
    analysis: '你已经熟练掌握家庭事故处理流程：先保护猫，再收拾现场，最后把锅背稳。猫在一旁看着你，像在审核危机公关。',
    catVoice: '这锅放你身上正合适。',
    scores: { food: 67, play: 58, endure: 99, love: 89 },
    accent: '#8A8D94',
    sticker: 'litter_scoop',
  },
};

export const questions = [
  {
    id: 1,
    group: 'P',
    text: '早上醒来，猫已经坐在床边盯着你，你通常会？',
    options: [
      ['A', '立刻紧张：是不是饿了？是不是我起晚了？'],
      ['B', '看时间，按顺序喂饭、换水、检查猫砂。'],
      ['C', '先装没醒，等它主动靠近再慢慢伸手。'],
      ['D', '脑内自动响起旁白：新的一天，主子登场。'],
    ],
  },
  {
    id: 2,
    group: 'P',
    text: '下班回家推开门，你第一件事更像是？',
    options: [
      ['A', '小声叫它名字，确认它有没有不高兴。'],
      ['B', '先看粮碗、水碗、猫砂盆，再放下自己的东西。'],
      ['C', '假装很淡定，等它愿意过来再摸。'],
      ['D', '在玄关就开始演久别重逢。'],
    ],
  },
  {
    id: 3,
    group: 'P',
    text: '猫把杯子推下桌，你会？',
    options: [
      ['A', '先收拾碎片，还顺口说「没事没事」。'],
      ['B', '先确认它没踩到，再想办法防止下次发生。'],
      ['C', '嘴上说「你可真行」，手已经开始扫地。'],
      ['D', '一边收拾一边还原案发经过。'],
    ],
  },
  {
    id: 4,
    group: 'alpha',
    text: '你在玩手机，猫突然凑过来打断你，你更可能？',
    options: [
      ['A', '先看看是不是饭、水、猫砂出了问题。'],
      ['B', '顺手摸摸它，让它靠着你待一会儿。'],
      ['C', '放下手机，拿个玩具陪它玩几分钟。'],
      ['D', '开始认真跟它解释你刚刚在忙什么。'],
    ],
  },
  {
    id: 5,
    group: 'alpha',
    text: '半夜猫开始跑酷，你的反应更接近？',
    options: [
      ['A', '起身检查它是不是饿了、渴了或猫砂不舒服。'],
      ['B', '迷迷糊糊伸手，让它过来靠一下。'],
      ['C', '陪它玩一小会儿，先把精力消耗掉。'],
      ['D', '坐起来看它表演，并给这场夜间活动配词。'],
    ],
  },
  {
    id: 6,
    group: 'beta',
    text: '快递箱刚到家，猫马上围上来，你通常会？',
    options: [
      ['A', '帮它打开箱子，把安全的部分留给它检查。'],
      ['B', '它走到哪你跟到哪，随时帮忙扶箱子。'],
      ['C', '等它玩完，再默默收纸屑和胶带。'],
      ['D', '把箱子摆好，顺便让自己也变成它的游乐设施。'],
    ],
  },
  {
    id: 7,
    group: 'alpha',
    text: '猫突然冲你喵喵叫，你第一反应是？',
    options: [
      ['A', '先排查：饭？水？砂？门？'],
      ['B', '靠近看看它情绪，先安抚一下。'],
      ['C', '以为它想玩，开始找玩具。'],
      ['D', '认真翻译这声喵到底在表达什么。'],
    ],
  },
  {
    id: 8,
    group: 'P',
    text: '猫躺到你腿上，你会？',
    options: [
      ['A', '立刻不敢动，腿麻也先忍着。'],
      ['B', '调整坐姿，让它躺得更舒服。'],
      ['C', '嘴上嫌它重，身体却非常配合。'],
      ['D', '宣布自己被封印，并拍照留证。'],
    ],
  },
  {
    id: 9,
    group: 'P',
    text: '饭点差点忘了喂猫，你会？',
    options: [
      ['A', '被它一看就心虚，马上道歉开饭。'],
      ['B', '立刻补上，并开始反思提醒机制。'],
      ['C', '假装不是大事，等它催了再起身。'],
      ['D', '当场进行一段夸张的谢罪仪式。'],
    ],
  },
  {
    id: 10,
    group: 'P',
    text: '猫正在挠沙发，你看见后会？',
    options: [
      ['A', '赶紧把它抱开，又怕自己语气太重。'],
      ['B', '拿猫抓板或玩具把注意力引走。'],
      ['C', '先翻个白眼，之后再默默处理沙发。'],
      ['D', '训两句，最后把锅甩给沙发设计。'],
    ],
  },
  {
    id: 11,
    group: 'P',
    text: '周末你想睡懒觉，猫开始叫你，你会？',
    options: [
      ['A', '它一叫你就醒，认命起床。'],
      ['B', '先判断它到底有什么需求，再决定要不要继续睡。'],
      ['C', '先装睡，实在躲不过才起来。'],
      ['D', '隔着被子跟它对话，像在演晨间连续剧。'],
    ],
  },
  {
    id: 12,
    group: 'alpha',
    text: '猫竖着尾巴来蹭你的腿，你通常会？',
    options: [
      ['A', '理解为补给信号，顺手去看吃的。'],
      ['B', '蹲下来摸摸它，让它蹭个够。'],
      ['C', '当成邀请，拿玩具开启互动。'],
      ['D', '开始解读它今天心情不错，可能有事要宣布。'],
    ],
  },
  {
    id: 13,
    group: 'beta',
    text: '猫跳上键盘影响你工作，你会？',
    options: [
      ['A', '把它轻轻移开，再给它安排别的东西。'],
      ['B', '一边护着键盘，一边陪它待到满意。'],
      ['C', '先让它踩完，再修被改乱的内容。'],
      ['D', '干脆让出位置，让它占领这块高地。'],
    ],
  },
  {
    id: 14,
    group: 'beta',
    text: '你买的新玩具它不爱，旧纸箱它却很喜欢，你会？',
    options: [
      ['A', '继续研究它到底喜欢什么玩法。'],
      ['B', '它玩纸箱时，你就在旁边随时帮忙。'],
      ['C', '接受购物失败，然后负责收拾现场。'],
      ['D', '承认真正好玩的不是玩具，是家里这些现成东西和你。'],
    ],
  },
  {
    id: 15,
    group: 'beta',
    text: '猫躲到床底不出来，你会？',
    options: [
      ['A', '用零食或工具温柔引导它出来。'],
      ['B', '趴在旁边陪着，等它自己愿意出来。'],
      ['C', '先想是不是自己哪里吓到它了。'],
      ['D', '让它安心待着，你负责守在外面。'],
    ],
  },
  {
    id: 16,
    group: 'alpha',
    text: '加班很晚才回家，你进门后优先做什么？',
    options: [
      ['A', '先补粮、换水、铲屎。'],
      ['B', '先找到它，摸摸抱抱确认它安心。'],
      ['C', '再累也陪它玩一小会儿。'],
      ['D', '一边换鞋一边向它汇报今天为什么晚归。'],
    ],
  },
  {
    id: 17,
    group: 'beta',
    text: '半夜猫把你舔醒，你的本能反应是？',
    options: [
      ['A', '判断它是不是有需求，然后马上处理。'],
      ['B', '迷糊着跟它走，看它想带你去哪。'],
      ['C', '先把被吵醒这件事忍下来。'],
      ['D', '翻个身继续当它的床垫或靠垫。'],
    ],
  },
  {
    id: 18,
    group: 'beta',
    text: '猫坐在门口盯着门，你会？',
    options: [
      ['A', '判断它想去哪，再帮它开门或换地方。'],
      ['B', '走过去陪它一起看门。'],
      ['C', '先做好准备，万一出事你来兜底。'],
      ['D', '你就是门禁系统，开、关、拦都归你。'],
    ],
  },
  {
    id: 19,
    group: 'P',
    text: '朋友来家里，猫躲起来或不配合，你会？',
    options: [
      ['A', '忙着替它解释，怕朋友误会它。'],
      ['B', '提前准备安全距离和零食，让接触更顺利。'],
      ['C', '跟朋友说随它，不想摸就别摸。'],
      ['D', '忍不住介绍它的性格和经典事迹。'],
    ],
  },
  {
    id: 20,
    group: 'alpha',
    text: '如果只能强化一种你和猫的相处方式，你更想？',
    options: [
      ['A', '把吃饭、喝水、猫砂、门窗这些事照顾好。'],
      ['B', '让它随时可以靠近你、跟着你、被你摸到。'],
      ['C', '每天都有一点好玩的互动。'],
      ['D', '把你们的日常变成一部只有你俩懂的连续剧。'],
    ],
  },
];
export const uiCopy = {
  siteName: '在猫眼里，你是个啥？',
  slogan: '回答 20 题，揭晓你在猫编制里的正式岗位',
  reveal: '猫正在召开人事会议…',
  footer: '纯前端计分 · 答案不上传 · 用 GitHub Pages 部署',
};


