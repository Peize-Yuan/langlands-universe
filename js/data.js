/* =========================================================================
   LANG-LANDS UNIVERSE — content archive
   All prose is original editorial copy written for this site.
   Status statements are deliberately qualified; see the notes in §07.
   ========================================================================= */
window.LL_DATA = (() => {
  const people = [
    {
      id: 'langlands', name: '罗伯特·朗兰兹', en: 'Robert P. Langlands', years: '1936 —',
      field: '数论 · 表示论', roles: ['founder', 'arithmetic'], role: '纲领的提出者',
      blurb: '1967 年致 Weil 的信，把伽罗瓦表示与自守形式放进同一张星图。',
      body: [
        '朗兰兹 1936 年出生于加拿大不列颠哥伦比亚省新威斯敏斯特，1960 年在耶鲁大学获得博士学位，长期任职于普林斯顿高等研究院。早年研究半单李群的无限维表示与调和分析，随后转向数论。',
        '1967 年 1 月，他写给 André Weil 一封长信，提出后来被称为“朗兰兹纲领”的互反与函子性构想；1970 年的《Problems in the theory of automorphic forms》则把它展开为一份研究路线图。2018 年，他因“将表示论与数论联系起来的远见性纲领”获阿贝尔奖。',
        '他的风格不是建造一座封闭的理论大厦，而是不断提出能够把不同领域连接起来的问题。纲领至今仍在生长，这既是它的力量，也是它难以被简单概括的原因。'
      ],
      contribution: '互反猜想 · 函子性 · L-群'
    },
    {
      id: 'weil', name: '安德烈·韦伊', en: 'André Weil', years: '1906 — 1998',
      field: '代数几何 · 数论', roles: ['founder', 'arithmetic'], role: '收信人与先行者',
      blurb: 'Weil 猜想把代数簇的计数、拓扑与上同调连成一体。',
      body: [
        '韦伊是 20 世纪最有影响力的数学家之一，Bourbaki 学派的创始成员。他在数论、代数几何与代数群上都有奠基性工作，1949 年提出的 Weil 猜想把有限域上代数簇的计数与拓扑不变量联系起来。',
        '1967 年，朗兰兹把那份著名的信寄给了 Weil。Weil 在回信中的反应、以及他此前关于 L-函数与函数方程的思考，构成了纲领的重要前史。',
        'Weil 猜想后来由 Deligne 在 1974 年证明，而 Weil 所倡导的“把算术问题几何化”的精神，也一直贯穿在朗兰兹纲领的几何侧。'
      ],
      contribution: 'Weil 猜想 · 类域论 · Bourbaki'
    },
    {
      id: 'harish', name: '哈里什-钱德拉', en: 'Harish-Chandra', years: '1923 — 1983',
      field: '表示论 · 调和分析', roles: ['founder', 'representation'], role: '无限维表示的奠基者',
      blurb: '把半单李群的表示论变成一门严格的解析学科。',
      body: [
        '哈里什-钱德拉出生于印度，后在美国长期工作。他把半单李群的无限维表示、Plancherel 公式、tempered representations 与轨道积分建立在严格的分析基础之上。',
        '朗兰兹早期的工作直接受益于这一传统：自守表示、局部调和分析与迹公式，都需要在无限维表示的空间里做精细的积分。没有这套分析机器，纲领的“表示论一侧”无法成形。',
        '他于 1983 年去世。今天，Harish-Chandra 的论文仍是局部表示论与朗兰兹局部对应的标准入口。'
      ],
      contribution: 'Plancherel 公式 · 轨道积分'
    },
    {
      id: 'gelfand', name: '伊斯拉埃尔·盖尔范德', en: 'Israel Gelfand', years: '1913 — 2009',
      field: '泛函分析 · 表示论', roles: ['founder', 'representation'], role: '表示论的全才',
      blurb: '从泛函分析到积分几何，他的工具渗透进自守表示理论。',
      body: [
        '盖尔范德是苏联数学的传奇人物，在泛函分析、表示论、积分几何、数理生物与计算数学之间自由穿行。他与 Graev 等人的构造成为研究自守表示与局部朗兰兹的重要工具。',
        '他擅长把具体问题放进一个更大的代数结构中，再用表示论的语言重写。这种“结构先行”的风格，与朗兰兹把数论问题翻译成表示论问题的做法高度共鸣。',
        '盖尔范德培养了一整代数学家，他的讨论班传统也影响了 20 世纪后半叶的表示论生态。'
      ],
      contribution: 'Gelfand–Graev · 广义函数'
    },
    {
      id: 'selberg', name: '阿特尔·塞尔伯格', en: 'Atle Selberg', years: '1917 — 2007',
      field: '解析数论 · 谱理论', roles: ['founder', 'representation'], role: '迹公式的先驱',
      blurb: '用谱与轨道两侧的等式，为朗兰兹提供了核心技术原型。',
      body: [
        '塞尔伯格是挪威数学家，1950 年获菲尔兹奖。他在 1956 年提出的迹公式，把某个谱问题的数据与几何轨道上的积分联系起来；这就是后来 Arthur–Selberg 迹公式的原型。',
        '迹公式的意义不只是“计算”，而是提供了一座桥：一侧是自守表示与 L-函数，另一侧是共轭类、轨道与几何。朗兰兹纲领的许多进展，都发生在把这座桥修得更稳、更宽的过程中。',
        '他的工作还包括塞尔伯格 zeta 函数、筛法与黎曼猜想的局部类比，至今仍是解析数论的基本语言。'
      ],
      contribution: 'Selberg 迹公式 · 筛法'
    },
    {
      id: 'jacquet', name: '埃尔韦·雅凯', en: 'Hervé Jacquet', years: '1939 —',
      field: '自守形式', roles: ['founder', 'representation', 'arithmetic'], role: 'GL(2) 对应的证明者',
      blurb: '与 Langlands 证明 Jacquet–Langlands 对应，奠定自守 L-函数理论。',
      body: [
        '雅凯是法国数学家，长期在哥伦比亚大学工作。1970 年，他与朗兰兹合作证明 GL(2) 的 Jacquet–Langlands 对应，把 GL(2) 的自守表示与四元数群的自守表示联系起来。',
        '1972 年，他与 Godement 用 zeta 积分研究 GL(n) 的自守 L-函数，为一般 L-函数的解析延拓与函数方程提供了可操作的模板。此后他又发展了相对迹公式，用于研究周期积分与 Gan–Gross–Prasad 猜想。',
        'Jacquet–Langlands 对应是朗兰兹函子性最早的完整实例之一，也是“从群到其内形式”的转移的范本。'
      ],
      contribution: 'Jacquet–Langlands · zeta 积分'
    },
    {
      id: 'godement', name: '罗杰·戈德芒', en: 'Roger Godement', years: '1921 — 2016',
      field: '自守形式 · 拓扑', roles: ['founder', 'representation'], role: 'L-函数的分析工匠',
      blurb: '与 Jacquet 建立 GL(n) 的 zeta 积分，为 L-函数提供解析骨架。',
      body: [
        '戈德芒是法国数学家、Bourbaki 成员，在拓扑、群表示与自守形式方面都有工作。他与 Jacquet 合著的 zeta 积分理论，把 GL(n) 的自守 L-函数写成积分，并由此证明解析延拓与函数方程。',
        '这套方法的美妙之处在于：它不依赖具体的数论构造，而是把 L-函数放进群表示与 Schwartz 函数的框架中。今天研究一般 L-函数时，仍能看到它的影子。',
        '戈德芒也以数学写作与评论著称。他的教材影响了几代法国学生。'
      ],
      contribution: 'Godement–Jacquet zeta 积分'
    },
    {
      id: 'drinfeld', name: '弗拉基米尔·德林费尔德', en: 'Vladimir Drinfeld', years: '1954 —',
      field: '函数域 · 量子群', roles: ['geometry', 'arithmetic'], role: '函数域 GL(2) 的突破者',
      blurb: '用 Drinfeld 模证明函数域上 GL(2) 的朗兰兹对应。',
      body: [
        '德林费尔德出生于哈尔科夫，是当代最具影响力的数学家之一。1970 年代，他引入 Drinfeld 模——函数域上的“椭圆曲线类比”——并用它研究 GL(2) 的全局朗兰兹对应。',
        '函数域的优势在于几何直觉可以严格使用：曲线上的向量丛、模空间与 Frobenius 的作用，为 Langlands 对应提供了比数域更具体的舞台。德林费尔德的工作证明了 GL(2) 情形，也为 Lafforgue 的 GL(n) 推广铺路。',
        '他在量子群、可积系统与数学物理方面同样有奠基性贡献，1990 年获菲尔兹奖。'
      ],
      contribution: 'Drinfeld 模 · GL(2) 函数域'
    },
    {
      id: 'lafforgue-l', name: '洛朗·拉福格', en: 'Laurent Lafforgue', years: '1966 —',
      field: '函数域 · 自守形式', roles: ['geometry', 'arithmetic'], role: 'GL(n) 函数域的证明者',
      blurb: '2002 年证明函数域上 GL(n) 的全局朗兰兹对应，获菲尔兹奖。',
      body: [
        '洛朗·拉福格在 2002 年证明了函数域上 GL(n) 的全局朗兰兹对应：n 维不可约伽罗瓦表示与 GL(n) 的自守尖点表示之间存在对应，且 L-函数匹配。这项工作使用了 Drinfeld 模、Lafforgue 紧化与迹公式的深刻组合。',
        '函数域上的成功并不能自动搬到数域，因为数域没有同样丰富的几何对象。但它是纲领最完整的“模型宇宙”之一，展示了当几何足够丰富时，对应可以如何被建立。',
        '同年他获得菲尔兹奖。此后他短暂离开学术界、投身教育与公共讨论，又回到研究岗位，成为法国数学界的独特人物。'
      ],
      contribution: 'GL(n) 函数域 · 菲尔兹奖 2002'
    },
    {
      id: 'lafforgue-v', name: '樊尚·拉福格', en: 'Vincent Lafforgue', years: '1974 —',
      field: '函数域 · 约化群', roles: ['geometry', 'new'], role: '一般约化群的函数域突破',
      blurb: '2018 年把函数域朗兰兹推进到一般约化群的自守→伽罗瓦方向。',
      body: [
        '樊尚·拉福格是洛朗·拉福格的弟弟。2018 年，他对函数域上的约化群建立了一个从自守表示到伽罗瓦参数的重大对应，把函数域朗兰兹从 GL(n) 推进到一般约化群。',
        '这项工作使用的是“自守到伽罗瓦”的方向，而不是完整的双向等价；它仍然依赖 Drinfeld 模、模空间与迹公式的几何化。数学界把它视为函数域朗兰兹的一个里程碑。',
        '他的研究也涉及 Banach 空间、算子代数与 K-理论，体现了朗兰兹纲领与其它数学分支的交叉。'
      ],
      contribution: '一般约化群 · 函数域'
    },
    {
      id: 'deligne', name: '皮埃尔·德利涅', en: 'Pierre Deligne', years: '1944 —',
      field: '代数几何 · 算术', roles: ['geometry', 'arithmetic'], role: 'Weil 猜想的证明者',
      blurb: '证明 Weil 猜想，并为朗兰兹的几何侧提供上同调语言。',
      body: [
        '德利涅是比利时数学家，长期在普林斯顿高等研究院工作。1974 年，他证明 Weil 猜想，把有限域上代数簇的计数与 étale 上同调的 Frobenius 作用联系起来。',
        'Weil 猜想是朗兰兹纲领的几何前身之一：它表明“计数”可以被翻译成“线性代数”。朗兰兹的互反猜想在精神上延续了这条路线——用表示论的结构解释算术数据。',
        '德利涅还在模形式、Hodge 理论、混合 motives 与朗兰兹的几何侧作出基础性贡献，1978 年获菲尔兹奖。'
      ],
      contribution: 'Weil 猜想 · étale 上同调'
    },
    {
      id: 'faltings', name: '格尔德·法尔廷斯', en: 'Gerd Faltings', years: '1954 —',
      field: '算术几何', roles: ['arithmetic'], role: 'Mordell 猜想的证明者',
      blurb: '证明 Mordell 猜想，并发展 p-adic Hodge 理论。',
      body: [
        '法尔廷斯是德国数学家，1983 年证明 Mordell 猜想：亏格大于 1 的代数曲线只有有限多个有理点。这项工作把 Diophantine 几何与 étale 上同调、p-adic 方法结合起来。',
        '他后来发展 p-adic Hodge 理论，为研究 Galois 表示的局部性质提供了强大工具；这些工具在模性提升与局部朗兰兹中都有使用。',
        '1986 年他获得菲尔兹奖。今天他在波恩马克斯·普朗克数学研究所工作，继续活跃在算术几何前沿。'
      ],
      contribution: 'Mordell 猜想 · p-adic Hodge'
    },
    {
      id: 'harris', name: '迈克尔·哈里斯', en: 'Michael Harris', years: '1954 —',
      field: '自守表示 · 局部朗兰兹', roles: ['representation', 'arithmetic'], role: 'GL(n) 局部对应的证明者',
      blurb: '与 Taylor 证明 GL(n) 的局部朗兰兹对应。',
      body: [
        '哈里斯是美国数学家，长期在哥伦比亚大学与巴黎工作。2001 年，他与 Richard Taylor 合作出版《The Geometry and Cohomology of Some Simple Shimura Varieties》，证明 GL(n) 在 p-adic 域上的局部朗兰兹对应。',
        '他们的方法把局部对应嵌入 Shimura 簇的 ℓ-adic 上同调：局部参数通过整体几何的上同调实现，再用迹公式与比较定理把两侧对齐。这是“整体化局部”的经典范例。',
        '哈里斯还在 theta 对应、自守表示与 L-函数方面有大量工作，并积极讨论数学共同体与出版文化。'
      ],
      contribution: '局部 Langlands for GL(n)'
    },
    {
      id: 'taylor', name: '理查德·泰勒', en: 'Richard Taylor', years: '1962 —',
      field: '自守形式 · 算术', roles: ['arithmetic', 'representation'], role: '模性提升的建筑师',
      blurb: '与 Wiles 完成模性提升，并推动潜在自守性纲领。',
      body: [
        '泰勒是英裔美国数学家，在牛津、哈佛与斯坦福工作。1994 年，他与 Andrew Wiles 合作补全了模性提升的关键步骤，使费马大定理的证明得以完成。',
        '此后他发展了潜在自守性（potential automorphy）方法，把模性结果推广到更一般的 Galois 表示；这条路线后来被用于研究 Sato–Tate 猜想与一般数域上的自守性。',
        '他与 Harris 的局部朗兰兹工作、与 Clozel 等人的算术问题研究，使他成为当代朗兰兹算术侧的核心人物之一。'
      ],
      contribution: '模性提升 · 潜在自守性'
    },
    {
      id: 'ngo', name: '吴宝珠', en: 'Ngô Bảo Châu', years: '1972 —',
      field: '代数几何 · 迹公式', roles: ['geometry', 'arithmetic', 'new'], role: '基本引理的证明者',
      blurb: '2008 年证明 Lie 代数基本引理，为迹公式稳定化扫清障碍。',
      body: [
        '吴宝珠出生于越南河内，在法国接受训练，现为芝加哥大学与巴黎萨克雷大学教授。2008 年，他证明了朗兰兹纲领中悬置多年的“基本引理”。',
        '基本引理看起来只是一个关于轨道积分的恒等式，却是 Arthur–Selberg 迹公式稳定化的关键。吴宝珠通过 Hitchin 纤维化与代数几何中的对称性，把这个问题转化为可计算的几何计数。',
        '2010 年他获得菲尔兹奖。基本引理的证明被视为朗兰兹纲领技术史上的一次结构性突破，直接推动了 Arthur 内窥分类的完成。'
      ],
      contribution: '基本引理 · 菲尔兹奖 2010'
    },
    {
      id: 'scholze', name: '彼得·舒尔策', en: 'Peter Scholze', years: '1987 —',
      field: '算术几何 · p-adic', roles: ['geometry', 'new'], role: '几何化的建筑师',
      blurb: '创立 perfectoid spaces，与 Fargues 建立局部朗兰兹的几何化框架。',
      body: [
        '舒尔策是德国数学家，2018 年获菲尔兹奖。他创立 perfectoid spaces，用“把 p-adic 几何放到一个更柔软的世界里”的方法解决了许多长期难题。',
        '随后他与 Laurent Fargues 合作，在 Fargues–Fontaine 曲线上发展几何朗兰兹，构造 L-参数并给出局部朗兰兹的几何化框架。这项工作把 p-adic 表示论、几何与谱理论放在同一个舞台上。',
        '他还推动 condensed mathematics，重构拓扑与代数结构的基础。他的工作风格以“重建地基”著称，影响远超朗兰兹本身。'
      ],
      contribution: 'Perfectoid spaces · 局部几何化'
    },
    {
      id: 'fargues', name: '洛朗·法尔格', en: 'Laurent Fargues', years: '1970 —',
      field: 'p-adic 几何', roles: ['geometry', 'new'], role: 'Fargues–Fontaine 曲线',
      blurb: '与 Scholze 把局部朗兰兹放进 Fargues–Fontaine 曲线的几何世界。',
      body: [
        '法尔格是法国数学家，在巴黎萨克雷与 CNRS 工作。他与 Jean-Marc Fontaine 引入的 Fargues–Fontaine 曲线，是 p-adic Hodge 理论与局部 Langlands 的几何舞台。',
        '2021 年，他与 Scholze 发表《Geometrization of the local Langlands correspondence》，在曲线上定义 Bun_G 与 ℓ-adic 层，构造 L-参数并证明几何 Satake 等基本结构。',
        '这项工作并不等于把一般约化群的局部朗兰兹全部“证完”，但它提供了一个统一的几何框架，使许多局部问题可以用层与栈的语言重新表述。'
      ],
      contribution: 'Fargues–Fontaine 曲线 · 几何化'
    },
    {
      id: 'gaitsgory', name: '丹尼斯·盖茨戈里', en: 'Dennis Gaitsgory', years: '1973 —',
      field: '几何表示论', roles: ['geometry', 'new'], role: '几何朗兰兹的推动者',
      blurb: '2024 年与 Raskin 等发表系列论文，建立几何朗兰兹的一侧函子。',
      body: [
        '盖茨戈里是几何朗兰兹的主要推动者之一，长期在哈佛与马克斯·普朗克数学研究所工作。他研究顶点代数、 chiral 代数与几何表示论，并组织了几何朗兰兹的长期合作项目。',
        '2024 年，他与 Sam Raskin 等发表《Proof of the geometric Langlands conjecture》系列论文，构造从自守侧到谱侧的函子，并证明 de Rham、Betti、tempered 等不同表述之间的等价。',
        '这是一项以“百页论文群”形式出现的成果，数学界仍需时间审阅与吸收。它证明的是几何版本在特定设定下的猜想，而不是整个算术朗兰兹纲领。'
      ],
      contribution: '几何朗兰兹 · 2024 系列论文'
    },
    {
      id: 'frenkel', name: '爱德华·弗伦克尔', en: 'Edward Frenkel', years: '1968 —',
      field: '几何表示论', roles: ['geometry', 'new'], role: '几何朗兰兹与公共写作',
      blurb: '几何朗兰兹、顶点代数，以及把纲领讲给公众的人。',
      body: [
        '弗伦克尔是俄裔美国数学家，在加州大学伯克利分校工作。他在几何朗兰兹、顶点代数、可积系统与数学物理方面有重要工作，尤其关注量子化与 Langlands 对应的关系。',
        '他的著作《Love and Math》以自传方式向公众介绍朗兰兹纲领，把“数学的统一性”讲成个人故事。这本书也让“grand unified theory of mathematics”这一比喻广为流传。',
        '他同时批评数学出版的商业化与封闭性，参与开放获取运动。作为公共知识分子，他的声音让朗兰兹纲领走出了专业会议室。'
      ],
      contribution: '几何 Langlands · 公共写作'
    },
    {
      id: 'arthur', name: '詹姆斯·阿瑟', en: 'James Arthur', years: '1944 —',
      field: '迹公式 · 内窥', roles: ['representation', 'founder'], role: '迹公式与内窥分类的建筑师',
      blurb: '发展稳定迹公式，完成辛群/正交群的内窥分类。',
      body: [
        '阿瑟是加拿大数学家，长期在多伦多大学工作。他把 Selberg 迹公式发展为一般的 Arthur–Selberg 迹公式，并系统研究其稳定化、内窥（endoscopy）与加权轨道积分。',
        '2013 年，他出版《The Endoscopic Classification of Representations: Orthogonal and Symplectic Groups》，完成辛群与正交群的自守表示分类。这是朗兰兹纲领在一般约化群上最系统的成果之一。',
        '阿瑟的工作高度技术化，却决定了整个领域的语法：没有稳定迹公式与内窥分类，就很难把局部对应与整体自守表示对齐。'
      ],
      contribution: 'Arthur–Selberg 迹公式 · 内窥分类'
    },
    {
      id: 'serre', name: '让-皮埃尔·塞尔', en: 'Jean-Pierre Serre', years: '1926 —',
      field: '代数 · 数论', roles: ['founder', 'arithmetic'], role: 'Galois 表示的先驱',
      blurb: 'Galois 表示、模形式与上同调的先驱，2003 年首届阿贝尔奖得主。',
      body: [
        '塞尔是法国数学家，1954 年获菲尔兹奖，2003 年获首届阿贝尔奖。他在代数拓扑、代数几何、数论与群论中都有奠基性工作。',
        '他把 Galois 表示系统地带入数论，并提出著名的 Serre 猜想：某些二维 mod p Galois 表示来自模形式。这个猜想后来成为模性定理的重要组成，也直接影响了 Wiles 的路线。',
        '塞尔对朗兰兹纲领的算术侧影响深远：他让“表示”成为研究 Galois 群的标准语言，也让模形式与 Galois 表示之间的翻译变得精确。'
      ],
      contribution: 'Serre 猜想 · Galois 表示'
    },
    {
      id: 'grothendieck', name: '亚历山大·格罗滕迪克', en: 'Alexander Grothendieck', years: '1928 — 2014',
      field: '代数几何', roles: ['founder', 'geometry'], role: '几何语言的重建者',
      blurb: '创立概形、étale 上同调与 motives，为纲领提供几何语法。',
      body: [
        '格罗滕迪克是 20 世纪最具革命性的数学家之一。他重建了代数几何的基础：概形、层、étale 上同调、Topos 与 motives，使算术问题可以在一个统一的几何语言中表述。',
        '朗兰兹纲领的几何侧——Shimura 簇、Bun_G、D-module、几何朗兰兹——都建立在他所塑造的语言之上。没有 étale 上同调，Weil 猜想与 Galois 表示的几何化都难以想象。',
        '1966 年他获菲尔兹奖，1970 年离开学术界，1991 年隐居。他的《Récoltes et Semailles》至今仍是理解 20 世纪数学文化的重要文本。'
      ],
      contribution: '概形 · étale 上同调 · motives'
    }
  ];

  const timeline = [
    {
      year: '1900', era: 'pre', title: '希尔伯特第 12 问题', en: 'HILBERT’S 12TH PROBLEM',
      body: '希尔伯特在巴黎国际数学家大会上提出 23 个问题，其中第 12 个要求把 Kronecker 的“青春之梦”推广到一般数域：显式构造所有阿贝尔扩张。',
      more: '类域论后来给出了第 12 问题在阿贝尔情形下的答案，但一般非阿贝尔扩张的显式构造仍是朗兰兹纲领的深层动机之一。互反猜想可以看作“非阿贝尔类域论”的远景。',
      tags: ['前史', '数论']
    },
    {
      year: '1927', era: 'pre', title: '阿廷互反律', en: 'ARTIN RECIPROCITY',
      body: '阿廷证明一般阿贝尔扩张的互反律，把 Galois 群与 idéle 类群联系起来。这是类域论的顶点，也是朗兰兹互反猜想的 GL(1) 原型。',
      more: '在 GL(1) 情形，Hecke 特征与一维 Galois 表示一一对应，L-函数完全匹配。朗兰兹要做的，是把这条已经完美的对应推广到高维表示。',
      tags: ['前史', '互反']
    },
    {
      year: '1936', era: 'pre', title: 'Hecke 的 L-函数', en: 'HECKE L-FUNCTIONS',
      body: 'Hecke 把 Dirichlet L-函数推广到带有 Größencharakter 的情形，证明解析延拓与函数方程。自守 L-函数的现代理论由此起步。',
      more: 'Hecke 的方法把“特征”与“模形式”放在一起，提示了后来“自守表示”的概念：不是单个函数，而是整个表示空间在起作用。',
      tags: ['前史', 'L-函数']
    },
    {
      year: '1949', era: 'pre', title: 'Weil 猜想', en: 'WEIL CONJECTURES',
      body: 'Weil 提出有限域上代数簇的 zeta 函数应满足有理性、函数方程与 Riemann 假设的类比。计数问题被引向 Frobenius 的线性代数。',
      more: 'Weil 猜想在 1974 年由 Deligne 证明。它确立了“算术计数 = 上同调上的线性算子”这一范式，为 Langlands 把 Galois 表示看成线性对象提供了几何范本。',
      tags: ['前史', '几何']
    },
    {
      year: '1956', era: 'pre', title: 'Selberg 迹公式', en: 'SELBERG TRACE FORMULA',
      body: 'Selberg 提出迹公式，把谱侧的数据与几何侧的轨道积分相等起来。它成为后来 Arthur–Selberg 迹公式与整个内窥理论的技术原型。',
      more: '迹公式不是某个具体定理，而是一族等式。选择不同的测试函数，就能从中提取不同的算术信息；朗兰兹纲领的许多“计数”都藏在这些选择里。',
      tags: ['前史', '迹公式']
    },
    {
      year: '1967', era: '1960s', title: '写给 Weil 的信', en: 'THE LETTER TO WEIL',
      body: '朗兰兹在 1 月写给 André Weil 一封长信，提出 n 维 Galois 表示与 GL(n) 自守表示之间的互反，以及更一般的函子性构想。',
      more: '这封信没有正式发表，却通过私人 circulation 影响了整个领域。它把“数论问题”重新表述为“群表示之间的对应”，并预言 L-函数是两侧共同的语言。',
      tags: ['纲领诞生', '互反']
    },
    {
      year: '1970', era: '1970s', title: '《自守形式理论中的问题》', en: 'PROBLEMS IN THE THEORY OF AUTOMORPHIC FORMS',
      body: '朗兰兹发表纲领性长文，系统提出互反、函子性、L-群与 L-函数的目标；同年与 Jacquet 证明 GL(2) 的 Jacquet–Langlands 对应。',
      more: '这篇论文不是“证明”，而是一份问题清单与路线图。它把模糊的直觉变成可被逐条攻克的猜想，也确立了“自守表示”作为核心对象的地位。',
      tags: ['纲领诞生', '自守']
    },
    {
      year: '1972', era: '1970s', title: 'Godement–Jacquet zeta 积分', en: 'ZETA INTEGRALS FOR GL(n)',
      body: 'Godement 与 Jacquet 用 zeta 积分研究 GL(n) 的自守 L-函数，证明解析延拓与函数方程，为一般 L-函数提供了可操作的解析模板。',
      more: '他们的方法把 L-函数写成群上的积分，避免了依赖具体模形式的构造。今天研究一般约化群的 L-函数时，zeta 积分仍是基本工具之一。',
      tags: ['L-函数', '表示论']
    },
    {
      year: '1974', era: '1970s', title: 'Drinfeld 模与 GL(2)', en: 'DRINFELD MODULES',
      body: 'Drinfeld 引入函数域上的 Drinfeld 模，用它研究 GL(2) 的全局朗兰兹对应。函数域第一次成为可以“看见”对应的几何舞台。',
      more: 'Drinfeld 的完整 GL(2) 对应在 1980 年发表。函数域的优势是：曲线、向量丛、Frobenius 与模空间都可以严格操作，许多在数域上只能想象的结构在这里变成了几何对象。',
      tags: ['函数域', '几何']
    },
    {
      year: '1978', era: '1970s', title: '赫尔辛基 ICM 报告', en: 'ICM HELSINKI',
      body: '朗兰兹在国际数学家大会上作报告，系统阐述 L-函数与自守表示的联系，把纲领推向更广泛的数学共同体。',
      more: '此时纲领已经形成了自己的词汇：L-群、函子性、自守表示、L-函数、内窥。它不再只是一封信里的猜想，而是一个跨领域的研究计划。',
      tags: ['纲领', '传播']
    },
    {
      year: '1980', era: '1980s', title: 'GL(2) 的基底变换', en: 'BASE CHANGE FOR GL(2)',
      body: '朗兰兹出版《Base Change for GL(2)》，系统研究二次扩域上的自守表示转移。基底变换成为函子性最早、最完整的一类实例。',
      more: '基底变换把数域扩张与自守表示的转移联系起来，后来在模性提升、Artin 猜想与 Langlands 对应的构造中反复出现。它也是“函子性不只是哲学，而是可计算技术”的证明。',
      tags: ['函子性', '自守']
    },
    {
      year: '1983', era: '1980s', title: 'Harish-Chandra 逝世', en: 'THE END OF AN ERA',
      body: '哈里什-钱德拉去世。他建立的无限维表示论与调和分析，已经成为朗兰兹纲领不可替代的基础设施。',
      more: '这一时期的朗兰兹研究逐渐从“提出猜想”转向“建立工具”：迹公式、局部调和分析、Shimura 簇的上同调、内窥稳定性，都是接下来二十年的主战场。',
      tags: ['人物', '表示论']
    },
    {
      year: '1994', era: '1990s', title: '模性定理的突破', en: 'MODULARITY',
      body: 'Wiles 与 Taylor 完成半稳定椭圆曲线的模性提升，证明费马大定理。这是 GL(2)/Q 朗兰兹对应最著名的算术实例。',
      more: '模性定理说：每一条半稳定椭圆曲线都来自一个模形式。用朗兰兹的语言，就是某个二维 Galois 表示对应一个 GL(2) 自守表示，且 L-函数匹配。',
      tags: ['算术', '互反']
    },
    {
      year: '1995', era: '1990s', title: 'Wiles 论文发表', en: 'ANNALS OF MATHEMATICS',
      body: 'Wiles 的《Modular elliptic curves and Fermat’s Last Theorem》在《数学年刊》发表，模性定理获得完整书写。',
      more: '这篇论文与 Taylor–Wiles 的补充论文一起，成为 20 世纪数论的分水岭。它也让“朗兰兹纲领”从专家词汇进入更广泛的数学公共视野。',
      tags: ['算术', '模性']
    },
    {
      year: '2000', era: '2000s', title: '局部 Langlands for GL(n)', en: 'LOCAL LANGLANDS FOR GL(n)',
      body: 'Henniart 与 Harris–Taylor 的工作证明 GL(n) 在 p-adic 域上的局部朗兰兹对应，把局部参数与不可约光滑表示联系起来。',
      more: 'Harris–Taylor 的方法通过 Shimura 簇的上同调“整体化”局部对应；Henniart 则给出了独立的证明。局部对应是整体纲领的基石：每个素数处都需要一个精确的字典。',
      tags: ['局部', '表示论']
    },
    {
      year: '2001', era: '2000s', title: 'Harris–Taylor 的书', en: 'THE GEOMETRY OF SHIMURA VARIETIES',
      body: 'Harris 与 Taylor 出版《The Geometry and Cohomology of Some Simple Shimura Varieties》，系统证明 GL(n) 局部朗兰兹。',
      more: '这本书把局部表示、Shimura 簇的 ℓ-adic 上同调与迹公式编织在一起。它也是“几何方法证明算术对应”的典范。',
      tags: ['局部', '几何']
    },
    {
      year: '2002', era: '2000s', title: 'Lafforgue 证明 GL(n) 函数域', en: 'LANGLANDS FOR GL(n) OVER FUNCTION FIELDS',
      body: 'Laurent Lafforgue 证明函数域上 GL(n) 的全局朗兰兹对应，获菲尔兹奖。函数域成为纲领最完整的模型宇宙。',
      more: 'Lafforgue 的工作使用了 Drinfeld 模、Lafforgue 紧化与迹公式。它说明：当几何足够丰富时，高维互反可以被建立；但数域仍然缺少对应的几何工具。',
      tags: ['函数域', '互反']
    },
    {
      year: '2004', era: '2000s', title: '几何朗兰兹的系统化', en: 'GEOMETRIC LANGLANDS',
      body: 'Beilinson 与 Drinfeld 的《Chiral Algebras》与相关纲领把朗兰兹对应推广到曲线上的向量丛与 D-module，形成几何朗兰兹。',
      more: '几何版本把 Galois 侧替换为局部系统，把自守侧替换为 Bun_G 上的 D-module 或层。它既是算术纲领的类比，也是一个独立的几何理论。',
      tags: ['几何', '纲领']
    },
    {
      year: '2007', era: '2000s', title: 'Kapustin–Witten 的物理视角', en: 'GAUGE THEORY AND LANGLANDS',
      body: 'Kapustin 与 Witten 指出，四维超对称规范理论的 S-对偶与几何朗兰兹之间存在深刻联系。',
      more: '这项观察让几何朗兰兹进入数学物理的视野：t Hooft 算符、Wilson 算符与 Hecke 特征值之间的对应，成为后来许多研究的出发点。它也是“朗兰兹对偶”这一名称的物理回声。',
      tags: ['几何', '物理']
    },
    {
      year: '2008', era: '2000s', title: 'Ngô 证明基本引理', en: 'THE FUNDAMENTAL LEMMA',
      body: '吴宝珠证明 Lie 代数基本引理，解决 Arthur–Selberg 迹公式稳定化的关键障碍，2010 年获菲尔兹奖。',
      more: '基本引理是关于轨道积分恒等式的技术命题，却卡住了整个内窥纲领。Ngô 用 Hitchin 纤维化把问题几何化，展示了“看起来纯技术的问题”也可以有结构性解法。',
      tags: ['迹公式', '内窥']
    },
    {
      year: '2010', era: '2010s', title: 'Ngô 获菲尔兹奖', en: 'FIELDS MEDAL 2010',
      body: '吴宝珠因基本引理的证明获菲尔兹奖。朗兰兹纲领的技术核心第一次以如此直接的方式进入公众视野。',
      more: '同年，Arthur 的内窥分类工作继续推进。基本引理、稳定迹公式与内窥分类三者合在一起，构成了一般约化群自守表示理论的骨架。',
      tags: ['人物', '荣誉']
    },
    {
      year: '2013', era: '2010s', title: 'Arthur 的内窥分类', en: 'ENDOSCOPIC CLASSIFICATION',
      body: 'Arthur 出版《The Endoscopic Classification of Representations》，完成辛群与正交群的自守表示分类。',
      more: '这本书是朗兰兹纲领在一般约化群上最系统的成果之一。它把自守表示分成内窥 packet，并用稳定迹公式把它们与 Galois 参数对齐。',
      tags: ['内窥', '表示论']
    },
    {
      year: '2018', era: '2010s', title: '朗兰兹获阿贝尔奖', en: 'ABEL PRIZE 2018',
      body: '挪威科学与文学院把阿贝尔奖授予朗兰兹，表彰他“将表示论与数论联系起来的远见性纲领”。',
      more: '阿贝尔奖的 citation 把朗兰兹的工作描述为“现代数学的中心”。这也是纲领第一次以个人荣誉的形式被广泛介绍给公众。',
      tags: ['人物', '荣誉']
    },
    {
      year: '2018', era: '2010s', title: 'Scholze 与 V. Lafforgue', en: 'FIELDS MEDAL & FUNCTION FIELDS',
      body: 'Scholze 因 perfectoid spaces 获菲尔兹奖；Vincent Lafforgue 把函数域朗兰兹推进到一般约化群的自守→伽罗瓦方向。',
      more: '同年发生两条重要进展：p-adic 几何的基础被重写，函数域上的群论对应被大幅推广。它们分别代表朗兰兹纲领“几何化”与“函数域化”两条路线。',
      tags: ['人物', '函数域', '几何']
    },
    {
      year: '2021', era: '2020s', title: '局部朗兰兹的几何化', en: 'GEOMETRIZATION OF LOCAL LANGLANDS',
      body: 'Fargues 与 Scholze 发表《Geometrization of the local Langlands correspondence》，在 Fargues–Fontaine 曲线上构造 Bun_G 与 L-参数。',
      more: '这篇 300 多页的论文为局部朗兰兹提供了统一的几何框架，证明了几何 Satake、L-参数的存在性与谱作用等结构。它不等同于所有局部猜想的完成，但改变了研究局部对应的语言。',
      tags: ['局部', '几何']
    },
    {
      year: '2024', era: '2020s', title: '几何朗兰兹的证明', en: 'PROOF OF GEOMETRIC LANGLANDS',
      body: 'Gaitsgory、Raskin 等发表系列论文，构造几何朗兰兹的一侧函子，并证明 de Rham、Betti、tempered 等表述的等价。',
      more: '这是几何朗兰兹纲领自 1990 年代以来最重大的突破。它处理的是特征 0 的 de Rham/Betti 设定；分歧情形、正特征与算术版本仍然是活跃的研究前沿。系列论文篇幅巨大，数学界仍在审阅与吸收。',
      tags: ['几何', '证明']
    },
    {
      year: '2025', era: '2020s', title: '审阅、修订与新的前沿', en: 'REVIEW AND NEW FRONTIERS',
      body: '几何朗兰兹系列论文持续修订，研讨会与验证工作展开；与此同时，算术朗兰兹、一般函子性与局部对应仍是开放的巨大海域。',
      more: '在朗兰兹纲领中，“证明”往往有多种含义：某个精确表述下的定理、某个特殊群的结果、某个方向的对应，或一个框架的建立。阅读新闻时，先问“证明了哪个版本”，比问“是否证明了朗兰兹”更有意义。',
      tags: ['现状', '方法论']
    }
  ];

  const concepts = [
    {
      id: 'reciprocity', title: '互反猜想', en: 'RECIPROCITY', tag: '核心',
      one: 'n 维 Galois 表示 ↔ GL(n) 的自守表示，且 L-函数相等。',
      body: '朗兰兹互反猜想的最初形式，是把数域 K 上的 n 维 Galois 表示与 GL(n, A_K) 的自守尖点表示对应起来。对应应当保持局部参数与 L-函数：一个来自算术的表示，和一个来自调和分析的表示，拥有同一套“指纹”。当 n=1 时，它就是类域论；当 n=2、K=Q 时，模性定理提供了大量实例。',
      status: '部分建立',
      related: ['galois', 'automorphic', 'lfunction']
    },
    {
      id: 'functoriality', title: '函子性', en: 'FUNCTORIALITY', tag: '核心',
      one: '对偶群的同态，诱导自守表示之间的转移。',
      body: '函子性是朗兰兹纲领最激进的部份：任何 L-群之间的同态 ᴸG → ᴸH，都应当诱导自守表示从 G 到 H 的转移，并保持 L-函数的相容性。它预测了对称平方、张量积、外平方、基底变换等大量操作的存在性。互反可以看作函子性在特定情形下的推论，但函子性本身更广，也更开放。',
      status: '一般情形开放',
      related: ['lgroup', 'reciprocity', 'lfunction']
    },
    {
      id: 'lgroup', title: 'L-群', en: 'L-GROUP', tag: '语言',
      one: '把群、对偶群与伽罗瓦作用打包在一起的“语法对象”。',
      body: 'L-群 ᴸG 是朗兰兹为函子性发明的语言。它由对偶群 G∨、伽罗瓦群 Γ_K 以及二者的作用组成。对偶群来自根数据（root datum）的对偶，但对 L-群还记录伽罗瓦如何作用。局部无分歧情形下，Satake 同构把 Hecke 代数与对偶群的上同调联系起来，使“Hecke 特征值”变成“Frobenius 的共轭类”。',
      status: '框架',
      related: ['functoriality', 'automorphic', 'galois']
    },
    {
      id: 'lfunction', title: 'L-函数', en: 'L-FUNCTION', tag: '核心',
      one: '把局部与整体、算术与分析缝在一起的生成函数。',
      body: 'L-函数是朗兰兹纲领的通用语言。它由局部因子通过欧拉乘积拼成，理论上应具有解析延拓、函数方程与某种 Riemann 假设。对 Galois 表示，局部因子由 Frobenius 的特征值定义；对自守表示，局部因子由 Satake 参数或局部 L-因子定义。互反与函子性都可以被表述为“L-函数相等”或“L-函数相容”。',
      status: '部分建立',
      related: ['reciprocity', 'functoriality', 'automorphic']
    },
    {
      id: 'automorphic', title: '自守表示', en: 'AUTOMORPHIC', tag: '语言',
      one: '定义在 adele 群上的、满足自守条件的表示。',
      body: '自守表示是现代语言对“自守形式”的重新表述：它是 G(A_K) 的一个表示，出现在 L²(G(K)\\G(A_K)) 的谱分解中，或在某个自守空间里。它的优势是把“函数”换成“表示”，从而可以使用局部表示、张量积与 Langlands 参数。一个自守表示可以分解为局部表示的受限张量积，这使“局部-整体”原则成为结构而非技巧。',
      status: '框架',
      related: ['galois', 'lgroup', 'trace']
    },
    {
      id: 'galois', title: '伽罗瓦表示', en: 'GALOIS REPRESENTATION', tag: '语言',
      one: '把伽罗瓦群的作用写成矩阵，从而做线性代数。',
      body: '伽罗瓦表示是 Gal(\bar K/K) 到 GL_n 或更一般对偶群的连续同态。它把数域的对称性变成线性变换，使 Frobenius 元素有特征值、行列式与迹。Weil 猜想与模性定理都说明：算术对象一旦被写成表示，就可以用线性代数与上同调研究。朗兰兹纲领要回答的是：哪些 Galois 表示来自自守表示？',
      status: '框架',
      related: ['reciprocity', 'lgroup', 'motives']
    },
    {
      id: 'trace', title: '迹公式', en: 'TRACE FORMULA', tag: '工具',
      one: '谱侧的加权计数 = 几何侧的轨道积分。',
      body: 'Arthur–Selberg 迹公式把自守表示的谱数据与群元素的共轭轨道积分相等起来。它是一族等式：选择不同的测试函数，就提取不同的算术信息。稳定化与内窥分类让两侧的“基本单元”可以比较；基本引理则是这套比较的关键恒等式。迹公式不是朗兰兹纲领的全部，却是把整体对应变成可计算问题的核心机器。',
      status: '工具 / 部分',
      related: ['automorphic', 'endoscopy', 'lfunction']
    },
    {
      id: 'endoscopy', title: '内窥', en: 'ENDOSCOPY', tag: '技术',
      one: '用较小的群描述较大群的自守 packet。',
      body: '内窥理论研究自守表示的 L-packet 与稳定迹公式。它把大群上的自守表示与某个“内窥群”上的表示联系起来，从而把迹公式的几何侧分解为可比较的稳定单元。Arthur 的辛群/正交群分类是内窥纲领的顶峰之一。对初学者而言，内窥是朗兰兹纲领中最技术、也最容易被误解的部分：它不是哲学，而是一套精确的轨道积分与转移。',
      status: '大量情形建立',
      related: ['trace', 'automorphic', 'local']
    },
    {
      id: 'local', title: '局部朗兰兹', en: 'LOCAL LANGLANDS', tag: '局部',
      one: '在每个素数处，把局部伽罗瓦参数与局部表示对应起来。',
      body: '局部朗兰兹猜想描述 p-adic 域 F 上的 Weil–Deligne 群参数与 G(F) 的不可约光滑表示之间的对应，通常以 L-packet 的形式出现。GL(n) 的情形已由 Harris–Taylor 与 Henniart 证明；一般约化群的情形仍是活跃前沿。Fargues–Scholze 的几何化为它提供了统一的几何框架，但并不自动给出所有群的所有性质。',
      status: 'GL(n) 已证明；一般群部分',
      related: ['automorphic', 'galois', 'lgroup']
    },
    {
      id: 'shimura', title: 'Shimura 簇', en: 'SHIMURA VARIETIES', tag: '几何',
      one: '让自守形式“住在”代数簇的上同调里。',
      body: 'Shimura 簇是参数化带有额外结构的阿贝尔簇的模空间，其 ℓ-adic 上同调同时携带伽罗瓦作用与 Hecke 作用。它因此成为连接自守表示与 Galois 表示的天然桥梁：Hecke 特征值出现在上同调上，Frobenius 作用给出 Galois 侧。Harris–Taylor 的局部朗兰兹证明、Kottwitz 的猜想与许多模性结果都依赖 Shimura 簇。',
      status: '部分 / 工具',
      related: ['automorphic', 'galois', 'geometric']
    },
    {
      id: 'geometric', title: '几何朗兰兹', en: 'GEOMETRIC LANGLANDS', tag: '几何',
      one: '把数域换成曲线，把表示换成层，把对应变成等价。',
      body: '几何朗兰兹在光滑射影曲线 X 上工作：自守侧是 Bun_G 上的 D-module 或 ℓ-adic 层，谱侧是 G∨ 的局部系统。猜想断言二者之间存在某种等价，Hecke 算子对应到谱侧的作用。2024 年，Gaitsgory–Raskin 等发表系列论文，在特征 0 的 de Rham/Betti 设定下构造函子并证明多种表述等价。这是几何版本的重大突破，但它不是算术朗兰兹的直接证明。',
      status: '2024 突破；变体开放',
      related: ['shimura', 'lgroup', 'functoriality']
    },
    {
      id: 'motives', title: '动机', en: 'MOTIVES', tag: '远景',
      one: '为所有上同调理论寻找一个共同的“源头”。',
      body: 'Grothendieck 的动机理论试图为不同的上同调理论（de Rham、étale、晶体等）寻找一个共同的对象。朗兰兹纲领的“动机版本”预测：每个动机都应该对应一个自守表示，其 L-函数与动机的 L-函数相等。这个版本把互反、Weil 猜想与 L-函数统一在一个更大的猜想网络中，但也因为动机本身的基础问题而更加遥远。',
      status: '猜想 / 框架',
      related: ['galois', 'lfunction', 'geometric']
    },
    {
      id: 'fundamental', title: '基本引理', en: 'FUNDAMENTAL LEMMA', tag: '技术',
      one: '轨道积分之间的恒等式，是迹公式稳定化的关键。',
      body: '基本引理断言：在匹配的测试函数与轨道之间，某些加权轨道积分相等。它看起来只是一个技术性的恒等式，却决定了 Arthur–Selberg 迹公式能否稳定化，从而能否把不同群的自守谱放在同一套坐标系里比较。吴宝珠在 2008 年通过 Hitchin 纤维化与代数几何中的对称性证明了这个引理，2010 年获菲尔兹奖。',
      status: '已证明',
      related: ['trace', 'endoscopy', 'local']
    },
    {
      id: 'packet', title: 'L-packet', en: 'L-PACKET', tag: '技术',
      one: '局部朗兰兹中，对应同一个参数的不可约表示组成一个 packet。',
      body: '局部朗兰兹通常不是“一个参数对应一个表示”，而是“一个参数对应一组表示”，这组表示称为 L-packet。Packet 的结构由内窥理论描述：稳定迹公式的稳定单元、内窥转移与 packet 的势，是同一件事的不同侧面。理解 packet 是理解局部对应与整体自守表示之间关系的关键。',
      status: '框架 / 部分',
      related: ['local', 'endoscopy', 'trace']
    },
    {
      id: 'ramanujan', title: 'Ramanujan 猜想', en: 'RAMANUJAN CONJECTURE', tag: '边界',
      one: '自守表示的局部参数应当“尽量小”。',
      body: 'Ramanujan 猜想（及其一般化）断言自守表示的局部成分是 tempered 的，等价于 L-函数在临界线附近的某些增长估计。它揭示了朗兰兹对应与解析数论之间的张力：即使对应存在，证明参数落在正确的范围仍然极其困难。对 GL(2)/Q，Deligne 的 Weil 猜想工作给出了模形式的 Ramanujan 界；一般情形仍是开放问题。',
      status: '一般情形开放',
      related: ['lfunction', 'local', 'automorphic']
    }
  ];

  const layers = [
    {
      scope: '局部域 K_v', label: 'LOCAL', tone: 'partial',
      headline: 'GL(n) 已建立；一般群仍在推进',
      reciprocity: 'Weil–Deligne 参数 ↔ L-packet；GL(n) 由 Harris–Taylor / Henniart 证明。',
      functoriality: '局部转移在诸多情形已知；一般约化群未完成。',
      lfunctions: '局部 L-因子与 ε-因子有定义；一般情形的性质仍依赖对应。'
    },
    {
      scope: '全局函数域 F_q(C)', label: 'FUNCTION FIELD', tone: 'partial',
      headline: 'GL(n) 完整；一般约化群取得重大进展',
      reciprocity: 'Drinfeld（GL(2)）与 Lafforgue（GL(n)）建立完整对应；V. Lafforgue 推进到一般约化群的自守→伽罗瓦方向。',
      functoriality: 'GL(n) 情形大量已知；一般函子性仍开放。',
      lfunctions: '函数域上的 L-函数有几何/上同调解释，解析性质较好。'
    },
    {
      scope: '全局数域 K', label: 'NUMBER FIELD', tone: 'open',
      headline: 'GL(1) 完整；GL(2) 大量情形；一般群开放',
      reciprocity: '类域论（GL(1)）完整；GL(2)/Q 由模性定理覆盖大量情形；一般 n 与一般群远未解决。',
      functoriality: '基底变换、对称平方等特例已知；一般函子性开放。',
      lfunctions: '解析延拓与函数方程对许多自守 L-函数已知；广义 Riemann 猜想开放。'
    },
    {
      scope: '几何设定（曲线 / Bun_G）', label: 'GEOMETRIC', tone: 'geometric',
      headline: '2024 年取得结构性突破',
      reciprocity: '几何朗兰兹猜想在特征 0 的 de Rham/Betti 设定下由 Gaitsgory–Raskin 等系列论文处理。',
      functoriality: '几何函子性有对应版本；与算术函子性的关系仍是前沿。',
      lfunctions: '几何侧更自然的是特征类、上同调与谱作用；不是经典欧拉乘积。'
    }
  ];

  const frontier = [
    { title: '类域论', en: 'CLASS FIELD THEORY', state: 'proved', note: 'GL(1) 互反的完整答案；阿廷互反律与局部类域论。' },
    { title: 'GL(2)/Q 的模性', en: 'MODULARITY', state: 'proved', note: 'Wiles–Taylor 等覆盖大量椭圆曲线；不是 GL(2) 的全部 Langlands。' },
    { title: 'GL(n) 函数域', en: 'GL(n) OVER FUNCTION FIELDS', state: 'proved', note: 'Drinfeld (n=2) 与 Lafforgue (一般 n) 建立完整对应。' },
    { title: '局部 GL(n)', en: 'LOCAL GL(n)', state: 'proved', note: 'Harris–Taylor 与 Henniart 独立证明。' },
    { title: '基本引理', en: 'FUNDAMENTAL LEMMA', state: 'proved', note: 'Ngô 2008；迹公式稳定化的关键。' },
    { title: '几何朗兰兹', en: 'GEOMETRIC LANGLANDS', state: 'geometric', note: '2024 系列论文；特定设定下的突破，变体仍开放。' },
    { title: '一般函子性', en: 'GENERAL FUNCTORIALITY', state: 'open', note: '对一般约化群与一般同态，远未解决。' },
    { title: '数域一般群', en: 'GENERAL GROUPS OVER NUMBER FIELDS', state: 'open', note: '缺少函数域那样的几何工具；核心开放问题。' },
    { title: '广义黎曼猜想', en: 'GRH', state: 'open', note: '所有自守 L-函数的零点位置；比互反更解析。' },
    { title: '一般局部对应', en: 'GENERAL LOCAL LANGLANDS', state: 'partial', note: 'Fargues–Scholze 提供几何框架；完整分类仍待发展。' },
    { title: '动机版本', en: 'MOTIVIC LANGLANDS', state: 'open', note: '动机理论本身仍不完整；远景性猜想。' }
  ];

  const myths = [
    {
      q: '“朗兰兹纲领已经被证明了。”',
      a: '不准确。纲领是一组相互关联的猜想，不同版本、不同群、不同域上的状态差异巨大。2024 年几何朗兰兹的突破只针对特定设定；算术数域上的一般情形仍远未解决。'
    },
    {
      q: '“几何朗兰兹证明了算术朗兰兹。”',
      a: '不能这样推论。几何版本把数域换成曲线、把 Galois 表示换成局部系统，它是一个独立的几何理论。两者共享结构与直觉，但没有已知的逻辑蕴含关系。'
    },
    {
      q: '“函子性只是关于 L-函数的技术细节。”',
      a: '函子性预测新的自守表示的存在与转移，远不止 L-函数的相容性。它决定了自守谱如何组织，也连接了对称平方、张量积、基底变换等具体操作。'
    },
    {
      q: '“朗兰兹纲领会统一所有数学。”',
      a: '“统一”是启发式比喻，不是数学定理。纲领连接了数论、表示论与几何的很大一部分，但数学的其它领域并不因此被还原。把纲领称为“数学的大统一理论”容易掩盖它作为研究计划的开放性与局部性。'
    },
    {
      q: '“一篇 1000 页的论文一定正确。”',
      a: '篇幅不是正确性的证明。大型证明需要同行审阅、独立验证、特殊情形检查与长期使用。数学共同体对 2024 年几何朗兰兹论文的审阅仍在进行，这本身是正常且必要的。'
    },
    {
      q: '“朗兰兹只关心数论。”',
      a: '纲领的几何侧、物理侧与表示论侧都有独立生命。Kapustin–Witten 的规范场论视角、Fargues–Scholze 的 p-adic 几何、以及组合/量子化版本，都说明它是一个跨领域的生态。'
    }
  ];

  const glossary = [
    ['自守形式', '在商空间 G(K)\\G(A) 上满足自守条件的函数；现代语言用自守表示。'],
    ['Adele 环', '把所有完备化 Q_p 与 R 放在一起的受限乘积，使局部-整体原则成为代数结构。'],
    ['L-函数', '由局部因子经欧拉乘积拼成的复函数，编码算术或表示论数据。'],
    ['欧拉乘积', '把整体 L-函数写成每个素数处局部因子的乘积。'],
    ['伽罗瓦表示', 'Galois 群到 GL_n 或其子群的连续同态。'],
    ['Frobenius 元素', '有限域扩张中的“几何 Frobenius”共轭类；其迹给出局部 L-因子。'],
    ['L-群', '由对偶群、伽罗瓦群与作用构成的群，是函子性的语法对象。'],
    ['对偶群', '由根数据对偶得到的群；例如 GL(n) 的对偶仍是 GL(n)。'],
    ['Satake 同构', '无分歧局部 Hecke 代数与对偶群表示环之间的同构。'],
    ['L-packet', '局部朗兰兹中对应同一个参数的一组不可约表示。'],
    ['内窥', '通过较小的内窥群研究大群的自守 packet 与稳定迹公式。'],
    ['基本引理', '轨道积分之间的恒等式，是迹公式稳定化的关键。'],
    ['Shimura 簇', '带额外结构的阿贝尔簇模空间，其 étale 上同调连接 Hecke 与 Galois 作用。'],
    ['Bun_G', '曲线 X 上 G-主丛的模栈，是几何朗兰兹的自守侧。'],
    ['D-module', '曲线上的微分算子模；几何朗兰兹中自守侧的对象之一。'],
    ['Fargues–Fontaine 曲线', 'p-adic 版本的“曲线”，其上的向量丛连接 p-adic Hodge 与局部 Langlands。'],
    ['Perfectoid space', 'Scholze 引入的 p-adic 几何对象，允许在“直到 p 的无穷根”的意义下做几何。'],
    ['动机', '试图统一不同上同调理论的假想对象；动机朗兰兹是远景猜想。'],
    [' tempered 表示', '局部表示的一类“增长受控”的对象；Ramanujan 猜想预测自守局部成分是 tempered。'],
    ['函子性', '从 L-群同态诱导自守表示转移的猜想。'],
    ['互反', 'Galois 表示与自守表示之间的对应；类域论是其 GL(1) 情形。'],
    ['模性', '椭圆曲线来自模形式；GL(2)/Q 朗兰兹的著名实例。'],
    ['谱侧 / 几何侧', '迹公式两侧：自守谱的数据与共轭轨道的积分。'],
    ['几何朗兰兹', '曲线上的层论版本，把对应表述为范畴等价。']
  ];

  const sources = [
    {
      type: '原始文献', title: 'Problems in the theory of automorphic forms', author: 'R. P. Langlands', year: '1970',
      note: '纲领的路线图；收录于 Lectures in Modern Analysis and Applications III，Springer LNM 170。',
      url: 'https://publications.ias.edu/rpl/paper/43'
    },
    {
      type: '原始文献', title: 'Letter to André Weil', author: 'R. P. Langlands', year: '1967',
      note: '未正式发表的著名长信；IAS 网站提供扫描与转录。',
      url: 'https://publications.ias.edu/rpl/section/21'
    },
    {
      type: '综述', title: 'An Introduction to the Langlands Program', author: 'J. Bernstein, S. Gelbart (eds.)', year: '2003',
      note: '适合具备研究生代数与表示论基础的读者。',
      url: 'https://link.springer.com/book/10.1007/978-3-0348-7995-8'
    },
    {
      type: '专著', title: 'Automorphic Forms and Representations', author: 'D. Bump', year: '1997',
      note: '自守形式与表示论的标准教材，覆盖 GL(2) 与 GL(n) 的基础。',
      url: 'https://www.cambridge.org/core/books/automorphic-forms-and-representations/'
    },
    {
      type: '论文', title: 'Modular elliptic curves and Fermat’s Last Theorem', author: 'A. Wiles', year: '1995',
      note: '模性定理的里程碑；Annals of Mathematics 141。',
      url: 'https://doi.org/10.2307/2118559'
    },
    {
      type: '论文', title: 'Le lemme fondamental pour les algèbres de Lie', author: 'Ngô Bảo Châu', year: '2010',
      note: '基本引理的证明；Publ. Math. IHÉS 111。',
      url: 'https://doi.org/10.1007/s10240-010-0026-7'
    },
    {
      type: '论文', title: 'Chtoucas de Drinfeld et correspondance de Langlands', author: 'L. Lafforgue', year: '2002',
      note: '函数域 GL(n) 的证明；Invent. Math. 147。',
      url: 'https://doi.org/10.1007/s002220100174'
    },
    {
      type: '论文', title: 'Geometrization of the local Langlands correspondence', author: 'L. Fargues, P. Scholze', year: '2021',
      note: '局部朗兰兹的几何化；arXiv:2102.13459。',
      url: 'https://arxiv.org/abs/2102.13459'
    },
    {
      type: '论文', title: 'Proof of the geometric Langlands conjecture I', author: 'D. Gaitsgory, S. Raskin', year: '2024',
      note: '系列论文的第一篇；arXiv:2405.03599。',
      url: 'https://arxiv.org/abs/2405.03599'
    },
    {
      type: '数据库', title: 'The Work of Robert Langlands', author: 'Institute for Advanced Study', year: '持续更新',
      note: '朗兰兹论文、信件、讲座与评论的权威档案。',
      url: 'https://publications.ias.edu/rpl/'
    },
    {
      type: '奖项', title: 'The Abel Prize 2018', author: 'The Norwegian Academy of Science and Letters', year: '2018',
      note: '朗兰兹获阿贝尔奖的官方 citation 与生平资料。',
      url: 'https://abelprize.no/abel-prize-laureates/2018'
    },
    {
      type: '课程', title: 'Langlands Program — lecture notes and surveys', author: 'Various authors', year: '持续更新',
      note: '建议从 Gelbart、Frenkel、Arthur 的综述与讲义入门，再进入原始论文。',
      url: 'https://arxiv.org/list/math.NT/recent'
    }
  ];

  return { people, timeline, concepts, layers, frontier, myths, glossary, sources };
})();
