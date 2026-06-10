import { useEffect, useState } from 'react'

const stats = [
  ['119 週', '週榜資料'], ['314 部', '收錄節目'], ['80+ 部', '台劇追蹤'],
  ['8 張', 'Excel 工作表'], ['3 個', '儀表板頁籤'], ['9+ 種', '篩選維度'],
]

const imageBase = `${import.meta.env.BASE_URL}images/`

const taiwanBook = {
  title: '給學生看的台灣四百年圖解出口貿易史',
  summary: 'A5 資訊圖像小書，將台灣四百年的出口貿易史轉譯成學生可理解的歷史敘事、資訊圖像與 Figma 工作流。',
  cover: `${imageBase}taiwan-book/cover.png`,
  tags: ['資訊設計', '教育內容', 'A5 小書', 'Figma Workflow'],
}

const taiwanBookStats = [
  ['20+', 'A5 頁面'],
  ['6', '歷史章節'],
  ['8', 'Figma 元件'],
  ['3', '素材版本'],
]

const taiwanBookProcess = [
  ['01', '歷史敘事拆解', '將台灣四百年出口貿易史拆成荷治、清領、日治、戰後加工、近代科技與結尾反思。'],
  ['02', '資訊圖像轉譯', '把抽象的經濟史脈絡轉成地圖、時間軸、供應鏈、產業卡片與跨頁視覺。'],
  ['03', '素材清理與重繪', '整理初版、純白版、去字版與透明版，讓頁面可被重新排版、疊合與後續輸出。'],
  ['04', 'Figma 工作流', '建立頁面模板、時期標籤、資訊卡、時間軸列等元件，並以外掛流程加速 A5 頁面產出。'],
]

const taiwanBookImages = [
  [`${imageBase}taiwan-book/toc.png`, '全書目錄與章節架構'],
  [`${imageBase}taiwan-book/semiconductor-page.png`, '近代科技時期代表頁'],
  [`${imageBase}taiwan-book/contact-sheet.jpg`, '透明素材 contact sheet'],
]

const wordCloud = [
  '模仿犯', '此時此刻', '誰是被害者', '影后', '華燈初上', '正港分局', '八尺門的辯護人',
  '不夠善良的我們', '有生之年', '人選之人', '媽，別鬧了！', '聽海湧', '商魂', '台劇',
]

const originFlow = [
  ['01', '公司行銷需求', '追蹤新節目上架 Netflix 後的每日排行表現。'],
  ['02', '單一節目折線圖', '整理每日名次，製作每週行銷會議可用素材。'],
  ['03', '發現比較不足', '單看一部作品，無法判斷表現是否真的突出。'],
  ['04', '擴展比較基準', '加入其他台灣節目與更長時間範圍，建立市場脈絡。'],
]

const rawDataProblems = ['Facebook 貼文', '非結構化文字', '格式不固定', '難以回溯', '不易比較']
const structuredDataValues = ['Excel / JSON 資料庫', '欄位結構化', '可篩選查詢', '可跨週比較', '可視覺化分析']

const pipeline = [
  ['🔎', 'Facebook 排行貼文', 'Netflix Taiwan 每週公開排行資訊，原始資料為非結構化中文貼文。'],
  ['🐍', 'Python 爬蟲', '以 Selenium 與文字解析邏輯擷取日期、節目名稱、類型與排名。'],
  ['📊', 'Excel 本地資料庫', '保留人工校正彈性，維護節目屬性、播出方式與資料一致性。'],
  ['🧩', 'JSON 資料轉換', '將清理後資料轉成前端可讀取的結構化資料，支援多種聚合查詢。'],
  ['📈', 'React 儀表板', '以互動式圖表呈現總排行、類型趨勢與台劇表現比較。'],
]

const evolutionSteps = [
  ['01', '單一節目追蹤', '最初需求是觀察公司自家一檔新節目上架 Netflix 後的每日排行，並製作每週行銷會議可使用的折線圖。'],
  ['02', '加入台劇比較', '單一節目走勢無法客觀判斷表現，因此我與主管討論後，加入其他台灣節目的排行走勢作為比較基準。'],
  ['03', '擴展到年度週榜', '不同作品會受到同時期競爭環境影響，因此我開始蒐集全年度週榜資料，建立積分機制與年度收視排行榜。'],
  ['04', '建立互動儀表板', 'Excel 適合資料整理，但互動性不足，因此我使用 Claude Code 協助實作 React 儀表板，讓資料能被更直覺地探索。'],
]

const crawlerChallenges = [
  ['日期篩選與滾動載入', 'Facebook 預設從最新貼文開始載入，需要透過日期篩選與滾動操作才能回到歷史資料。一次滾動過多也可能讓頁面狀態改變。', '改成分段抓取、定期刷新頁面，並依日期區間調整篩選條件，降低頁面狀態變動造成的抓取失敗。'],
  ['進度不可見', '爬蟲早期執行時沒有即時回饋，我無法判斷是否成功抓取、抓了多少資料，或是否卡在頁面互動。', '加入終端機進度輸出、抓取數量與狀態訊息，讓除錯過程變得可觀察，也能即時判斷資料量是否異常。'],
  ['非結構化文字解析', '貼文格式並不統一，同一作品可能出現不同名稱或類型錯誤，或甚至出現抓取失敗的情況。', '建立後續資料清理流程，處理名稱正規化與人工校正，例如將「葬送的芙莉蓮 第二季」與「葬送的芙莉蓮 S2」合併判斷。'],
]

const cleaningRules = [
  ['節目名稱正規化', '處理縮寫、書名號、季數格式與不同貼文中的命名差異，避免同一作品被拆成多筆資料。'],
  ['類型標準化', '將貼文中的原始類型文字統一映射為固定分類，讓類型統計與篩選可以穩定運作。'],
  ['日期與週次整理', '將貼文中的時間資訊整理成可排序、可篩選、可聚合的日期與週次欄位。'],
  ['重複資料檢查', '以日期、週次與節目名稱作為檢查依據，避免同一週榜或日榜資料重複寫入。'],
  ['人工補充節目屬性', '針對爬蟲無法判斷的欄位，例如 Netflix Original、播出方式與集數，保留人工維護流程。'],
]

const screens = [
  [
    'Overall Rankings',
    '總排行榜：把週榜與日榜轉成可比較的排行結果',
    [
      `${imageBase}netflix-dashboard-weekly-browse.png`,
      `${imageBase}netflix-dashboard-overall-detail.png`,
    ],
    '這個主頁面負責回答「哪些作品在不同時間範圍內表現最好」。我將週榜與日榜資料轉換成積分與排行結果，讓使用者可以依年份、季度、月份、週次、類型與 Netflix Original 狀態篩選，快速比較不同作品在指定期間內的表現。',
    [
      ['Top 20 積分排行', '將 Top 10 名次轉換成 10–1 分，讓不同週次、不同作品可以用同一套標準比較，而不是只看某一天的單點排名。'],
      ['週次快覽', '週次快覽讓使用者回到特定月份與週次，直接查看當週 Top 10 榜單與類型分布，不需要逐篇翻找 Facebook 歷史貼文。這個設計把原本分散在貼文中的單週榜單，轉換成可以快速回溯的查詢介面。'],
      ['節目詳情', '節目詳情用於查看單一作品的最高名次、平均名次、上榜週數與累積積分。這讓作品表現不只停留在「有沒有上榜」，而是能進一步判斷它的排名穩定度、持續力與整體競爭表現。'],
      ['年份 / 季度 / 類型篩選', '使用者可以依年份、季度、月份、類型與 Netflix Original 狀態縮小分析範圍，快速切換不同市場情境。'],
    ],
  ],
  [
    'Genre Analysis',
    '類型分析：比較不同影視類型在期間內的聲量變化',
    [`${imageBase}netflix-dashboard-genre-flow.png`],
    '這個頁面負責回答「不同類型在 Netflix Taiwan 榜單中的聲量如何變化」。除了用圓餅圖觀察整體類型占比，也加入類型期間數量分析，讓使用者可以看到各類型在選定期間內的出現次數、最高與最低數量，以及平均表現。',
    [
      ['類型占比圓餅圖', '用整體占比快速看出哪幾種影視類型在選定期間內最常出現在榜單。'],
      ['類型期間數量分析', '比較每一種類型在不同時間區間中的上榜頻率，包含最多、最少與平均數量。這能避免只看單週波動，而是用更完整的期間資料判斷哪些類型長期穩定、哪些類型只是短期爆發。'],
      ['週榜類型河流圖', '把類型變化放在時間軸上觀察，能看出韓劇、台劇、日劇、動畫等類型在不同週期的消長。'],
      ['趨勢區間縮放', '使用者可以聚焦特定時間區間，避免長時間資料把短期變化壓扁成一條毫無靈魂的線。'],
    ],
  ],
  [
    'Taiwan Drama Analysis',
    '台劇分析：依上架方式比較作品生命週期走勢',
    [`${imageBase}netflix-dashboard-taiwan-drama.png`],
    '這個頁面負責回答「不同台劇上架後的表現如何比較」。我將台劇分成週次上架與一次上架兩種篩選條件，因為兩種發行方式會造成很大的走勢差異：週次上架通常會因新集數釋出而產生多次排名波動，一次上架則更容易呈現集中爆發後逐漸下降的走勢。',
    [
      ['台劇積分排行', '先用累積積分排序台劇整體表現，快速辨識哪些作品在 Netflix Taiwan 榜單中最有延續力。'],
      ['週次上架 / 一次上架篩選', '將台劇分成週次上架與一次上架兩種條件，避免把不同發行策略硬塞進同一種解讀邏輯。'],
      ['上架日標記', '週次上架的作品會針對上架日進行標記，讓使用者能對照排名變化是否受到新集數釋出的影響。'],
      ['上架後天數走勢圖', '不使用絕對日期，而是改用「上架後第 N 天」作為共同 X 軸，讓不同作品能放在同一生命週期基準下比較。'],
      ['最多 10 部作品比較', '可以同時選擇多部台劇放在同一張圖上比較，適合觀察不同作品的熱度維持能力。'],
    ],
  ],
] as const

const decisions = [
  ['01', '用 Excel 作為輕量資料庫', '此專案需要人工補充節目屬性與播出方式，因此選擇 Excel 作為可維護、可人工校正的本地資料庫，而不是一開始就導入較重的 SQL 架構。'],
  ['02', '將排名轉換成積分', '將 Top 10 排名轉成 10–1 分，讓不同週次與不同時間範圍的節目可以被橫向比較。'],
  ['03', '用上架後天數比較台劇', '不同作品上架日期不同，因此台劇走勢圖不使用絕對日期，而是以生命週期視角比較表現。'],
]

const impactItems = [
  ['支援內部報告', '公司在節目結案報告中使用了我整理出的收視排行資料，讓單一節目的表現能放進更完整的市場脈絡中解讀。'],
  ['降低回溯成本', '將原本需要逐篇翻找 Facebook 貼文的排行資料，轉換為可依年份、月份、週次查詢的資料工具。'],
  ['提升比較能力', '透過積分制與篩選器，讓不同節目、類型與時間區間可以被放在同一套標準下比較。'],
  ['建立可維護流程', '把爬蟲、自動轉換、人工校正與前端展示拆成清楚步驟，讓資料後續能持續更新。'],
]

const techStack = ['Python', 'Selenium', 'Excel', 'JSON', 'React', 'TypeScript', 'Vite', 'Recharts', 'ECharts']
const links = { demo: 'https://jinfer68.github.io/netflix-taiwan-dashboard/', github: 'https://github.com/jinfer68/netflix-taiwan-dashboard' }

function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#\/?/, '') || 'home')

  useEffect(() => {
    const syncRoute = () => {
      setRoute(window.location.hash.replace(/^#\/?/, '') || 'home')
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  if (route === 'taiwan-book') return <TaiwanBookCase />
  if (route === 'netflix-dashboard') return <NetflixCase />
  return <PortfolioHome />
}

function PortfolioHome() {
  return <main className="portfolioHome">
    <section className="homeHero">
      <div className="container homeGrid">
        <div>
          <p className="homeEyebrow">吳景富 · Portfolio</p>
          <h1>把資料、故事與工具<br />做成能被理解的作品</h1>
          <p className="homeLead">這裡收錄我從資料整理、視覺化、資訊設計到 AI 協作工作流的個人專案。點進作品後，可以閱讀各自完整的製作脈絡與成果說明。</p>
        </div>
        <div className="homePreview" aria-label="Featured project preview">
          <img src={taiwanBook.cover} alt={`${taiwanBook.title} 封面`} />
        </div>
      </div>
    </section>

    <section className="container homeSection">
      <div className="homeSectionHeader">
        <p className="homeEyebrow">Selected Work</p>
        <h2>作品案例</h2>
      </div>
      <div className="homeProjectGrid">
        <article className="homeProjectCard">
          <a className="homeProjectImage" href="#/taiwan-book">
            <img src={taiwanBook.cover} alt={`${taiwanBook.title} 預覽`} />
          </a>
          <div className="homeProjectBody">
            <p className="homeEyebrow">Information Design · AI Workflow · Figma</p>
            <h3>{taiwanBook.title}</h3>
            <p>{taiwanBook.summary}</p>
            <div className="homeTags">{taiwanBook.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="homeActions"><a className="homeBtn" href="#/taiwan-book">閱讀詳細說明</a></div>
          </div>
        </article>

        <article className="homeProjectCard">
          <a className="homeProjectImage" href="#/netflix-dashboard">
            <img src={`${imageBase}netflix-dashboard-weekly-browse.png`} alt="Netflix 台灣影視排行資料互動儀表板預覽" />
          </a>
          <div className="homeProjectBody">
            <p className="homeEyebrow">Data Pipeline · Visualization · Product Thinking</p>
            <h3>Netflix 台灣影視排行資料互動儀表板</h3>
            <p>將 Facebook 非結構化排行貼文整理成 Excel / JSON 資料流程，並製作 React 互動式儀表板，用於分析台灣串流影視趨勢。</p>
            <div className="homeTags">{techStack.slice(0, 5).map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="homeActions"><a className="homeBtn" href="#/netflix-dashboard">閱讀詳細說明</a><a className="homeBtn secondary" href={links.demo} target="_blank" rel="noreferrer">Live Demo</a></div>
          </div>
        </article>
      </div>
    </section>
  </main>
}

function TaiwanBookCase() {
  return <main className="homeCasePage">
    <nav className="homeCaseNav container"><a href="#/">← 回作品集首頁</a></nav>
    <section className="homeCaseHero">
      <div className="container homeCaseGrid">
        <div>
          <p className="homeEyebrow">Case Study · Information Design</p>
          <h1>{taiwanBook.title}</h1>
          <p className="homeLead">這是一個將歷史、地理、經濟與設計整合在一起的資訊圖像小書。核心問題是：如何讓學生看懂台灣在不同時代被世界需要的方式，以及出口貿易如何改變產業、城市與國際定位。</p>
          <div className="homeStatGrid">{taiwanBookStats.map(([value, label]) => <div className="homeStat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        </div>
        <figure className="homeBookStack">
          <img src={taiwanBook.cover} alt="小書封面" />
          <img src={taiwanBookImages[1][0]} alt="科技時期代表頁" />
        </figure>
      </div>
    </section>

    <section className="container homeSection">
      <div className="homeSectionHeader">
        <p className="homeEyebrow">Process</p>
        <h2>從內容架構到可輸出的設計系統</h2>
      </div>
      <div className="homeProcessGrid">{taiwanBookProcess.map(([number, title, text]) => <article className="homeProcessCard" key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="container homeImageStory">
      {taiwanBookImages.map(([src, caption]) => <figure key={src}><img src={src} alt={caption} loading="lazy" /><figcaption>{caption}</figcaption></figure>)}
    </section>
  </main>
}

function NetflixCase() {
  const [activeScreenDetails, setActiveScreenDetails] = useState<Record<number, number>>({})

  return <main>
    <nav className="caseNav container"><a href="#/">← 回作品集首頁</a></nav>
    <section className="hero"><div className="wordCloud" aria-hidden="true">{wordCloud.map((title, index) => <span key={title} className={`word word${index + 1}`}>{title}</span>)}</div><div className="container heroGrid"><div>
      <p className="eyebrow heroEyebrow">吳景富 個人專案 作品集網頁<br />DATA PIPELINE · VISUALIZATION · PRODUCT THINKING</p>
      <h1>Netflix 台灣影視排行資料互動儀表板</h1>
      <p className="lead">我建立了一套資料流程，將網路上 Facebook 專頁貼文整理的 Netflix Taiwan 每日排行資料，整理為 Excel 本地資料庫、轉換為 JSON，並製作成 React 互動式儀表板，用於分析台灣串流影視趨勢。</p>
      <div className="actions"><a className="btn primary" href={links.demo} target="_blank" rel="noreferrer">View Live Demo ↗</a><a className="btn secondary" href={links.github} target="_blank" rel="noreferrer">GitHub Repo ↗</a></div>
    </div><aside className="snapshot"><p className="muted">Project Snapshot</p><h2>2024–2026 的 Netflix 台灣串流排行資料</h2><p className="snapshotDesc">資料期間涵蓋 2024/01/01 至 2026/04/27，包含每日榜單蒐集、週榜彙整與台劇追蹤資料。</p><div className="statsGrid">{stats.map(([value, label]) => <div className="statCard" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></aside></div></section>

    <section className="container section"><article className="card wide"><p className="sectionLabel">Project Origin</p><h2>從一檔節目的行銷追蹤需求開始</h2><p>這個專案最初來自我在彼此影業實習期間公司內部的行銷需求：公司希望觀察一檔新節目上架 Netflix 後的每日排行表現，作為每週行銷會議與節目成效討論的素材。</p><p>一開始，我的任務只是整理單一節目的 Netflix 每日排名，並使用 Excel 製作簡單的折線圖。但在整理過程中，我發現單一節目無法客觀呈現節目的收視表現，於是與主管討論，需要增加其他台灣節目在 Netflix 的收視排行走勢圖作比較。</p></article><div className="originFlow">{originFlow.map(([no, title, desc], index) => <div className="originStep" key={title}><span>{no}</span><strong>{title}</strong><p>{desc}</p>{index < originFlow.length - 1 && <em>→</em>}</div>)}</div></section>

    <section className="container section"><div className="twoCol"><article className="card wide"><p className="sectionLabel">Problem</p><h2>公開資料存在，但無法直接分析</h2><p>因為 Netflix 並不會留下每日排行紀錄，所以必須另尋數據來源。我在 Facebook 找到專門紀錄排行的粉絲專頁，該頁面長期發布 Netflix Taiwan 的每日排行資訊，但這些資料分散在社群貼文中，沒有結構化歷史資料庫。這使得使用者很難回顧不同年份、類型或台劇作品的排名變化。</p><p><strong>原始資料雖然公開，但公開不等於可分析。</strong> 這個專案的核心問題，是如何把散落在社群平台上的非結構化文字資料，轉換成可以查詢、比較與視覺化的資料產品。</p></article><article className="card"><p className="sectionLabel">Project Goal</p><h2>建立可重複更新的排行資料流程</h2><p>此專案目標不是只做一次性的視覺化頁面，而是建立一套能持續更新的資料流程，讓 Netflix 台灣排行資料能從 Facebook 貼文轉換為可查詢、可比較、可維護的資料資產。</p></article></div><div className="dataCompare"><div className="compareCard"><p className="sectionLabel">Before</p><h3>原始公開資料</h3>{rawDataProblems.map(item => <span key={item}>{item}</span>)}</div><div className="compareArrow">Data Cleaning<br />+ Pipeline</div><div className="compareCard compareAfter"><p className="sectionLabel">After</p><h3>可分析資料產品</h3>{structuredDataValues.map(item => <span key={item}>{item}</span>)}</div></div></section>

    <section className="section panel"><div className="container"><p className="sectionLabel">Problem Evolution</p><h2>從單一節目追蹤，到市場競爭脈絡分析</h2><p className="sectionIntro">這個專案不是一開始就規劃成完整儀表板，而是在實際使用與討論中，一步步從單一節目追蹤擴展成市場觀察工具。</p><div className="timeline">{evolutionSteps.map(([no, title, desc]) => <article className="timelineItem" key={title}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>

    <section className="container section twoCol"><article className="card"><p className="sectionLabel">From Excel to Dashboard</p><h2>讓資料不只被整理，也能被探索</h2><p>第一版分析主要在 Excel 中完成：我蒐集全年度週榜資料，建立「排名轉積分」的計算方式，並用樞紐分析製作年度排行榜。</p><p>但在使用過程中，我發現 Excel 適合資料整理與初步分析，卻不適合讓團隊快速切換年份、類型、節目或台劇比較視角。因此我開始使用 Claude Code 協助建立互動式儀表板，並與 AI 一起討論不同資料問題適合使用哪些圖表呈現。</p></article><article className="card"><p className="sectionLabel">Impact</p><h2>從貼文回顧變成資料探索</h2><p>這個專案將原本需要逐篇翻找 Facebook 貼文的排行資料，轉換為可依年份、週次、類型與節目查詢的互動式工具，降低歷史資料回溯成本，並讓台劇與不同影視類型的趨勢比較成為可能。</p></article></section>

    <section className="container section"><p className="sectionLabel">Crawler Challenge</p><h2>將人工蒐集流程轉為半自動化資料管線</h2><p className="sectionIntro">當儀表板初版完成後，我發現只使用 2025 年週榜資料仍不夠完整。若要補齊更多年份，甚至加入日榜資料，人工蒐集成本會快速失控。因此我進一步建立 Facebook 爬蟲工具，一次性蒐集 2024/01/01 至 2026/04/27 的每日榜單資料。</p><p className="sectionIntro">但是卻在擴大規模中在爬蟲撰寫上遇到了許多困難，幸好最後都能一一克服。</p><div className="challengeGrid">{crawlerChallenges.map(([title, problem, solution]) => <article className="challengeCard" key={title}><h3>{title}</h3><div className="challengeBlock"><strong>問題</strong><p>{problem}</p></div><div className="challengeBlock solution"><strong>解法</strong><p>{solution}</p></div></article>)}</div></section>

    <section className="section panel"><div className="container"><p className="sectionLabel">System Architecture</p><h2>從 Facebook 貼文到互動式儀表板</h2><p className="sectionIntro">我將自動化資料蒐集與人工資料校正分離，讓整個流程兼顧效率與資料品質。</p><div className="pipeline">{pipeline.map(([icon, title, desc], index) => <article className="pipeCard" key={title}><span className="pipeIcon">{icon}</span><h3>{title}</h3><p>{desc}</p>{index < pipeline.length - 1 && <span className="arrow">→</span>}</article>)}</div></div></section>

    <section className="container section"><p className="sectionLabel">Data Cleaning</p><h2>資料清理是這個專案能不能可信的核心</h2><p className="sectionIntro">Facebook 貼文不是乾淨資料表。要讓資料能被分析，必須先處理名稱、類型、日期、重複資料與人工屬性補充等問題。資料如果髒，圖表再漂亮也只是高級裝飾品。</p><div className="featureGrid">{cleaningRules.map(([title, desc]) => <article className="card" key={title}><span className="check">✓</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

    <section className="container section"><p className="sectionLabel">Dashboard Features</p><h2>三個分析視角</h2><div className="featureGrid"><article className="card"><span className="check">✓</span><h3>總排行榜</h3><p>支援週榜 / 日榜模式，並可依年份、季度、月份、週次、類型與 Netflix Original 篩選；週次快覽與節目詳情作為同一主頁面中的兩個子視角。</p></article><article className="card"><span className="check">✓</span><h3>類型分析</h3><p>透過圓餅圖、類型期間數量分析與河流圖，觀察韓劇、台劇、日劇、動畫、美劇等類型在不同期間中的消長。</p></article><article className="card"><span className="check">✓</span><h3>台劇分析</h3><p>以「上架後第 N 天」作為共同基準，並區分週次上架與一次上架，避免不同播出策略被錯誤比較。</p></article></div></section>

    <section className="section panel"><div className="container"><p className="sectionLabel">Product Screens</p><h2>儀表板成果展示</h2><p className="sectionIntro">以下三個主頁面說明資料如何被轉換成可查詢、可比較、可解讀的產品介面。其中「總排行榜」包含週次快覽與節目詳情兩個子視角，因此使用兩張截圖輔助說明。</p><div className="screens">{screens.map(([label, title, imageUrls, desc, details], index) => {
      const activeDetailIndex = activeScreenDetails[index] ?? 0
      const activeDetail = details[activeDetailIndex]
      return <article className={`screenRow ${index % 2 ? 'reverse' : ''}`} key={title}><a className="screenFrame" href={links.demo} target="_blank" rel="noreferrer" style={imageUrls.length > 1 ? { display: 'grid', gap: '12px', padding: '12px' } : undefined}>{imageUrls.map(imageUrl => <img key={imageUrl} src={imageUrl} alt={`${title} 截圖`} loading="lazy" style={imageUrls.length > 1 ? { minHeight: 180, borderRadius: 18 } : undefined} />)}<span className="imageFallback"><strong>{title}</strong><em>圖片尚未上傳，點擊查看 live demo ↗</em></span></a><div className="screenText"><p className="sectionLabel">{label}</p><h3>{title}</h3><p className="screenOverview">{desc}</p><div className="tags screenTags" role="tablist" aria-label={`${title} 功能說明`}>{details.map(([tag], detailIndex) => <button key={tag} type="button" className={activeDetailIndex === detailIndex ? 'active' : ''} aria-selected={activeDetailIndex === detailIndex} onClick={() => setActiveScreenDetails(current => ({ ...current, [index]: detailIndex }))}>{tag}</button>)}</div><div className="screenDetail"><strong>{activeDetail[0]}</strong><p>{activeDetail[1]}</p></div></div></article>
    })}</div></div></section>

    <section className="container section"><p className="sectionLabel">Design Decisions</p><h2>不只是畫圖，而是定義資料怎麼被比較</h2><div className="decisionGrid">{decisions.map(([no, title, desc]) => <article className="card" key={title}><strong className="number">{no}</strong><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

    <section className="section panel"><div className="container"><p className="sectionLabel">Business Impact</p><h2>從內部行銷素材，延伸為市場觀察工具</h2><p className="sectionIntro">這份資料最初只是為了支援單一節目的每週行銷會議，但最後擴展成一套涵蓋多年份、週榜與日榜的 Netflix 台灣收視資料庫。</p><div className="featureGrid">{impactItems.map(([title, desc]) => <article className="card" key={title}><span className="check">✓</span><h3>{title}</h3><p>{desc}</p></article>)}</div><p className="sectionIntro impactNote">未來，這類資料也有機會協助公司與串流平台討論上架策略，或作為內容製作與宣傳時程規劃的參考。</p></div></section>

    <section className="container section twoCol"><article className="card"><p className="sectionLabel">My Role</p><h2>我負責的不只是實作，而是資料產品設計</h2><p>我負責資料來源判斷、pipeline 規劃、Excel schema 設計、資料清理規則、儀表板需求定義、結果驗證與最終整合。</p><p>我使用 Claude Code 作為 AI coding assistant 加速實作，但由我主導資料結構、分析邏輯與產品判斷。</p></article><article className="card"><p className="sectionLabel">Tech Stack</p><h2>使用工具</h2><div className="tags large">{techStack.map(item => <span key={item}>{item}</span>)}</div><div className="nextBox"><strong>Future Improvements</strong><ul><li>整合 GitHub Actions 進行每週自動更新</li><li>加入電影排行榜分析</li><li>增加 CSV 匯出功能</li><li>改善行動版 RWD</li></ul></div></article></section>

    <footer className="footerCta"><div className="container footerGrid"><div><p className="sectionLabel">Final Output</p><h2>從非結構化貼文，到可互動分析的資料產品</h2><p>這個專案展示我如何把模糊的商業需求拆解成資料流程、分析邏輯與可操作的產品介面。</p></div><div className="actions"><a className="btn primary" href={links.demo} target="_blank" rel="noreferrer">Open Dashboard ↗</a><a className="btn secondary" href={links.github} target="_blank" rel="noreferrer">View Code ↗</a></div></div></footer>
  </main>
}

export default App
