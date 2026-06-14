import { useEffect, useState } from 'react'

/* ============================================================
   內容資料（沿用原站文案，結構重整）
   ============================================================ */

const imageBase = `${import.meta.env.BASE_URL}images/`
const profilePhoto = `${imageBase}profile-photo.png`

const contactEmail = 'jinfqwer@gmail.com'
const links = {
  demo: 'https://jinfer68.github.io/netflix-taiwan-dashboard/',
  github: 'https://github.com/jinfer68/netflix-taiwan-dashboard',
  githubProfile: 'https://github.com/jinfer68',
}

const taiwanBook = {
  title: '給學生看的台灣四百年圖解出口貿易史',
  summary: 'A5 資訊圖像小書，將台灣四百年的出口貿易史轉譯成學生可理解的歷史敘事、資訊圖像與 Figma 工作流。',
  cover: `${imageBase}taiwan-book/cover-blue.png`,
  tags: ['資訊設計', '教育內容', 'A5 小書', 'Figma Workflow'],
}

const personalIntro = {
  title: '吳景富',
  subtitle: '國立政治大學廣播電視學系｜媒體企劃學程',
  summary: '我把內容、市場與受眾資料整理成可被理解、可被比較、可支援判斷的工具。',
  body: [
    '我的經驗橫跨影視內容開發、影展策劃與資料分析，關注內容如何被看見、被比較，並被觀眾選擇。',
    '我擅長從非結構化資訊中整理脈絡，結合資訊設計、資料視覺化與 AI 協作，將觀察轉化為能支援行銷、策展與策略判斷的作品。',
  ],
  highlights: ['影視內容分析', '資料視覺化', '資訊設計', 'AI 協作工作流'],
}

const taiwanBookStats: [string, string][] = [
  ['20+', 'A5 頁面'],
  ['6', '歷史章節'],
  ['8', 'Figma 元件'],
  ['3', '素材版本'],
]

const taiwanBookProcess: [string, string, string][] = [
  ['01', '歷史敘事拆解', '將台灣四百年出口貿易史拆成荷治、清領、日治、戰後加工、近代科技與結尾反思。'],
  ['02', '資訊圖像轉譯', '把抽象的經濟史脈絡轉成地圖、時間軸、供應鏈、產業卡片與跨頁視覺。'],
  ['03', '素材清理與重繪', '整理初版、純白版、去字版與透明版，讓頁面可被重新排版、疊合與後續輸出。'],
  ['04', 'Figma 工作流', '建立頁面模板、時期標籤、資訊卡、時間軸列等元件，並以外掛流程加速 A5 頁面產出。'],
]

const taiwanBookImages: [string, string][] = [
  [`${imageBase}taiwan-book/toc.png`, '全書目錄與章節架構'],
  [`${imageBase}taiwan-book/semiconductor-page.png`, '近代科技時期代表頁'],
  [`${imageBase}taiwan-book/contact-sheet.jpg`, '透明素材 contact sheet'],
]

const stats: [string, string][] = [
  ['119 週', '週榜資料'], ['314 部', '收錄節目'], ['80+ 部', '台劇追蹤'],
  ['8 張', 'Excel 工作表'], ['3 個', '儀表板頁籤'], ['9+ 種', '篩選維度'],
]

const evolutionSteps: [string, string, string][] = [
  ['01', '單一節目追蹤', '最初需求是觀察公司自家一檔新節目上架 Netflix 後的每日排行，並製作每週行銷會議可使用的折線圖。'],
  ['02', '加入台劇比較', '單一節目走勢無法客觀判斷表現，因此我與主管討論後，加入其他台灣節目的排行走勢作為比較基準。'],
  ['03', '擴展到年度週榜', '不同作品會受到同時期競爭環境影響，因此我開始蒐集全年度週榜資料，建立積分機制與年度收視排行榜。'],
  ['04', '建立互動儀表板', 'Excel 適合資料整理，但互動性不足，因此我使用 Claude Code 協助實作 React 儀表板，讓資料能被更直覺地探索。'],
]

const pipeline: [string, string, string][] = [
  ['01', 'Facebook 排行貼文', 'Netflix Taiwan 每週公開排行資訊，原始資料為非結構化中文貼文。'],
  ['02', 'Python 爬蟲', '以 Selenium 與文字解析邏輯擷取日期、節目名稱、類型與排名。'],
  ['03', 'Excel 本地資料庫', '保留人工校正彈性，維護節目屬性、播出方式與資料一致性。'],
  ['04', 'JSON 資料轉換', '將清理後資料轉成前端可讀取的結構化資料，支援多種聚合查詢。'],
  ['05', 'React 儀表板', '以互動式圖表呈現總排行、類型趨勢與台劇表現比較。'],
]

const rawDataProblems = ['Facebook 貼文', '非結構化文字', '格式不固定', '難以回溯', '不易比較']
const structuredDataValues = ['Excel / JSON 資料庫', '欄位結構化', '可篩選查詢', '可跨週比較', '可視覺化分析']

const crawlerChallenges: [string, string, string][] = [
  ['日期篩選與滾動載入', 'Facebook 預設從最新貼文開始載入，需要透過日期篩選與滾動操作才能回到歷史資料。一次滾動過多也可能讓頁面狀態改變。', '改成分段抓取、定期刷新頁面，並依日期區間調整篩選條件，降低頁面狀態變動造成的抓取失敗。'],
  ['進度不可見', '爬蟲早期執行時沒有即時回饋，我無法判斷是否成功抓取、抓了多少資料，或是否卡在頁面互動。', '加入終端機進度輸出、抓取數量與狀態訊息，讓除錯過程變得可觀察，也能即時判斷資料量是否異常。'],
  ['非結構化文字解析', '貼文格式並不統一，同一作品可能出現不同名稱或類型錯誤，或甚至出現抓取失敗的情況。', '建立後續資料清理流程，處理名稱正規化與人工校正，例如將「葬送的芙莉蓮 第二季」與「葬送的芙莉蓮 S2」合併判斷。'],
]

const cleaningRules: [string, string][] = [
  ['節目名稱正規化', '處理縮寫、書名號、季數格式與不同貼文中的命名差異，避免同一作品被拆成多筆資料。'],
  ['類型標準化', '將貼文中的原始類型文字統一映射為固定分類，讓類型統計與篩選可以穩定運作。'],
  ['日期與週次整理', '將貼文中的時間資訊整理成可排序、可篩選、可聚合的日期與週次欄位。'],
  ['重複資料檢查', '以日期、週次與節目名稱作為檢查依據，避免同一週榜或日榜資料重複寫入。'],
  ['人工補充節目屬性', '針對爬蟲無法判斷的欄位，例如 Netflix Original、播出方式與集數，保留人工維護流程。'],
]

interface Screen {
  label: string
  title: string
  images: string[]
  desc: string
  features: [string, string][]
}

const screens: Screen[] = [
  {
    label: 'Overall Rankings',
    title: '總排行榜：把週榜與日榜轉成可比較的排行結果',
    images: [
      `${imageBase}netflix-dashboard-weekly-browse.png`,
      `${imageBase}netflix-dashboard-overall-detail.png`,
    ],
    desc: '這個主頁面負責回答「哪些作品在不同時間範圍內表現最好」。我將週榜與日榜資料轉換成積分與排行結果，讓使用者可以依年份、季度、月份、週次、類型與 Netflix Original 狀態篩選，快速比較不同作品在指定期間內的表現。',
    features: [
      ['Top 20 積分排行', '將 Top 10 名次轉換成 10–1 分，讓不同週次、不同作品可以用同一套標準比較。'],
      ['週次快覽', '回到特定月份與週次，直接查看當週 Top 10 榜單與類型分布，不需逐篇翻找歷史貼文。'],
      ['節目詳情', '查看單一作品的最高名次、平均名次、上榜週數與累積積分，判斷排名穩定度與持續力。'],
      ['多維度篩選', '依年份、季度、月份、類型與 Netflix Original 狀態縮小分析範圍，快速切換市場情境。'],
    ],
  },
  {
    label: 'Genre Analysis',
    title: '類型分析：比較不同影視類型在期間內的聲量變化',
    images: [`${imageBase}netflix-dashboard-genre-flow.png`],
    desc: '這個頁面負責回答「不同類型在 Netflix Taiwan 榜單中的聲量如何變化」。除了用圓餅圖觀察整體類型占比，也加入類型期間數量分析，讓使用者看到各類型在選定期間內的出現次數、最高與最低數量，以及平均表現。',
    features: [
      ['類型占比圓餅圖', '快速看出哪幾種影視類型在選定期間內最常出現在榜單。'],
      ['類型期間數量分析', '比較每種類型在不同時間區間中的上榜頻率，判斷哪些類型長期穩定、哪些只是短期爆發。'],
      ['週榜類型河流圖', '把類型變化放在時間軸上，觀察韓劇、台劇、日劇、動畫等類型在不同週期的消長。'],
      ['趨勢區間縮放', '聚焦特定時間區間，避免長時間資料把短期變化壓扁。'],
    ],
  },
  {
    label: 'Taiwan Drama Analysis',
    title: '台劇分析：依上架方式比較作品生命週期走勢',
    images: [`${imageBase}netflix-dashboard-taiwan-drama.png`],
    desc: '這個頁面負責回答「不同台劇上架後的表現如何比較」。我將台劇分成週次上架與一次上架兩種篩選條件，因為兩種發行方式會造成很大的走勢差異：週次上架通常因新集數釋出而產生多次排名波動，一次上架則更容易呈現集中爆發後逐漸下降的走勢。',
    features: [
      ['台劇積分排行', '用累積積分排序台劇整體表現，快速辨識哪些作品最有延續力。'],
      ['上架方式篩選', '將台劇分成週次上架與一次上架，避免把不同發行策略硬塞進同一種解讀邏輯。'],
      ['上架後天數走勢圖', '不使用絕對日期，改用「上架後第 N 天」作為共同 X 軸，讓不同作品能在同一生命週期基準下比較。'],
      ['最多 10 部作品比較', '同時選擇多部台劇放在同一張圖上，觀察不同作品的熱度維持能力。'],
    ],
  },
]

const decisions: [string, string, string][] = [
  ['01', '用 Excel 作為輕量資料庫', '此專案需要人工補充節目屬性與播出方式，因此選擇 Excel 作為可維護、可人工校正的本地資料庫，而不是一開始就導入較重的 SQL 架構。'],
  ['02', '將排名轉換成積分', '將 Top 10 排名轉成 10–1 分，讓不同週次與不同時間範圍的節目可以被橫向比較。'],
  ['03', '用上架後天數比較台劇', '不同作品上架日期不同，因此台劇走勢圖不使用絕對日期，而是以生命週期視角比較表現。'],
]

const impactItems: [string, string][] = [
  ['支援內部報告', '公司在節目結案報告中使用了我整理出的收視排行資料，讓單一節目的表現能放進更完整的市場脈絡中解讀。'],
  ['降低回溯成本', '將原本需要逐篇翻找 Facebook 貼文的排行資料，轉換為可依年份、月份、週次查詢的資料工具。'],
  ['提升比較能力', '透過積分制與篩選器，讓不同節目、類型與時間區間可以被放在同一套標準下比較。'],
  ['建立可維護流程', '把爬蟲、自動轉換、人工校正與前端展示拆成清楚步驟，讓資料後續能持續更新。'],
]

const techStack = ['Python', 'Selenium', 'Excel', 'JSON', 'React', 'TypeScript', 'Vite', 'Recharts', 'ECharts']

/* ============================================================
   共用元件
   ============================================================ */

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function Nav() {
  return (
    <nav className="nav">
      <div className="container navInner">
        <a className="navBrand" href="#/">吳景富</a>
        <div className="navLinks">
          <a href="#/">作品</a>
          <button type="button" onClick={() => scrollToId('contact')}>聯絡</button>
        </div>
      </div>
    </nav>
  )
}

function ContactFooter() {
  return (
    <>
      <section className="contact" id="contact">
        <div className="container">
          <p className="contactLine">有想一起完成的計畫嗎？</p>
          <div className="contactLinks">
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            <a href={links.githubProfile} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container footerInner">
          <span>© 2026 WU CHING-FU</span>
          <span>資訊設計 × 資料視覺化</span>
        </div>
      </footer>
    </>
  )
}

function SecHead({ zh, en }: { zh: string; en: string }) {
  return (
    <div className="secHead">
      <h2 className="secTitle">{zh}</h2>
      <span className="secEn">{en}</span>
    </div>
  )
}

/* ============================================================
   首頁
   ============================================================ */

function PortfolioHome() {
  return (
    <main>
      <Nav />

      <header className="homeHero">
        <div className="container heroGrid">
          <div className="profilePhotoWrap fade d1">
            <img src={profilePhoto} alt="吳景富個人照片" />
          </div>
          <div className="heroLeft profileIntro">
            <span className="eyebrow fade d1">CONTENT STRATEGY × DATA VISUALIZATION</span>
            <h1 className="profileName fade d2">{personalIntro.title}</h1>
            <p className="profileSubtitle fade d2">{personalIntro.subtitle}</p>
            <p className="lead fade d2">{personalIntro.summary}</p>
            <div className="profileBody fade d3">
              {personalIntro.body.map(text => <p key={text}>{text}</p>)}
            </div>
            <div className="tagRow profileTags fade d3">
              {personalIntro.highlights.map(item => <span key={item}>{item}</span>)}
            </div>
            <div className="actions fade d3">
              <button className="btn" type="button" onClick={() => scrollToId('works')}>查看作品</button>
              <button className="btn ghost" type="button" onClick={() => scrollToId('contact')}>與我聯絡</button>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="works">
        <div className="container">
          <SecHead zh="精選作品" en="SELECTED WORKS" />
          <div className="works">
            <a className="work" href="#/taiwan-book">
              <div className="workImg">
                <img src={taiwanBook.cover} alt={`${taiwanBook.title} 封面`} />
              </div>
              <div>
                <p className="workMeta">資訊設計 — A5 圖像小書</p>
                <h3 className="workTitle">{taiwanBook.title}</h3>
                <p className="workDesc">{taiwanBook.summary}</p>
                <span className="workMore">閱讀完整案例</span>
              </div>
            </a>

            <a className="work" href="#/netflix-dashboard">
              <div className="workImg dashboardCover" aria-label="Netflix 台灣影視排行資料互動儀表板封面">
                <span className="coverEyebrow">CASE STUDY · DATA PIPELINE · VISUALIZATION</span>
                <strong>Netflix 台灣影視排行資料互動儀表板</strong>
              </div>
              <div>
                <p className="workMeta">資料管線 — 互動儀表板</p>
                <h3 className="workTitle">Netflix 台灣影視排行資料互動儀表板</h3>
                <p className="workDesc">將 Facebook 非結構化排行貼文整理成 Excel / JSON 資料流程，並製作 React 互動式儀表板，用於分析台灣串流影視趨勢。</p>
                <span className="workMore">閱讀完整案例</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <SecHead zh="關於" en="ABOUT" />
          <div className="aboutGrid">
            <div className="aboutText">
              {personalIntro.body.map(text => <p key={text}>{text}</p>)}
            </div>
            <div>
              <div className="skillGroup">
                <p className="skillLabel">專長領域</p>
                <ul className="skillList">
                  <li>影視內容分析與市場脈絡整理</li>
                  <li>資料清理、資料管線與互動視覺化</li>
                  <li>資訊設計、圖像敘事與策展企劃</li>
                </ul>
              </div>
              <div className="skillGroup">
                <p className="skillLabel">工具</p>
                <ul className="skillList">
                  <li>Excel / Tableau / Power BI</li>
                  <li>Python / Selenium / React / TypeScript</li>
                  <li>Figma / Canva / Claude Code / OpenAI Codex</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  )
}

/* ============================================================
   案例：台灣四百年圖解出口貿易史
   ============================================================ */

function TaiwanBookCase() {
  return (
    <main>
      <Nav />
      <div className="container caseNav"><a href="#/">← 回作品集首頁</a></div>

      <header className="container caseHero">
        <span className="eyebrow">CASE STUDY · INFORMATION DESIGN</span>
        <h1>{taiwanBook.title}</h1>
        <p className="lead">這是一個將歷史、地理、經濟與設計整合在一起的資訊圖像小書。核心問題是：如何讓學生看懂台灣在不同時代被世界需要的方式，以及出口貿易如何改變產業、城市與國際定位。</p>
        <div className="tagRow">{taiwanBook.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="statRow">
          {taiwanBookStats.map(([value, label]) => (
            <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </header>

      <section className="section">
        <div className="container">
          <SecHead zh="製作流程" en="PROCESS" />
          <div className="steps">
            {taiwanBookProcess.map(([no, title, text]) => (
              <div className="step" key={title}>
                <span className="stepNo">{no}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SecHead zh="成果展示" en="SELECTED PAGES" />
          <div className="imageStory">
            {taiwanBookImages.map(([src, caption]) => (
              <figure key={src}>
                <img src={src} alt={caption} loading="lazy" />
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <a className="nextWork" href="#/netflix-dashboard">
          <span className="eyebrow">下一個作品 — NEXT</span>
          <h2>Netflix 台灣影視排行資料互動儀表板</h2>
        </a>
      </div>

      <ContactFooter />
    </main>
  )
}

/* ============================================================
   案例：Netflix 台灣影視排行儀表板
   ============================================================ */

const netflixToc: [string, string][] = [
  ['成果展示', 'nf-screens'],
  ['專案脈絡', 'nf-context'],
  ['問題演進', 'nf-evolution'],
  ['系統架構', 'nf-pipeline'],
  ['設計決策', 'nf-decisions'],
  ['影響與角色', 'nf-impact'],
]

function NetflixCase() {
  return (
    <main>
      <Nav />
      <div className="container caseNav"><a href="#/">← 回作品集首頁</a></div>

      <header className="container caseHero">
        <span className="eyebrow">CASE STUDY · DATA PIPELINE · VISUALIZATION</span>
        <h1>Netflix 台灣影視排行資料互動儀表板</h1>
        <p className="lead">我建立了一套資料流程，將 Facebook 專頁貼文整理的 Netflix Taiwan 每日排行資料，整理為 Excel 本地資料庫、轉換為 JSON，並製作成 React 互動式儀表板，用於分析台灣串流影視趨勢。資料期間涵蓋 2024/01/01 至 2026/04/27。</p>
        <div className="actions">
          <a className="btn" href={links.demo} target="_blank" rel="noreferrer">開啟 Live Demo ↗</a>
          <a className="btn ghost" href={links.github} target="_blank" rel="noreferrer">GitHub Repo ↗</a>
        </div>
        <div className="statRow">
          {stats.map(([value, label]) => (
            <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </header>

      <div className="toc" aria-label="頁面目錄">
        <div className="container tocInner">
          {netflixToc.map(([label, id]) => (
            <button key={id} type="button" onClick={() => scrollToId(id)}>{label}</button>
          ))}
        </div>
      </div>

      {/* 成果先行：把最有說服力的內容放在最前面 */}
      <section className="section" id="nf-screens">
        <div className="container">
          <SecHead zh="成果展示" en="PRODUCT SCREENS" />
          <div className="screens">
            {screens.map(screen => (
              <article className="screen" key={screen.title}>
                <div className="screenFig">
                  {screen.images.map(src => (
                    <figure key={src}>
                      <img src={src} alt={`${screen.title} 截圖`} loading="lazy" />
                    </figure>
                  ))}
                  <figcaption>{screen.label}</figcaption>
                </div>
                <div>
                  <h3 className="screenTitle">{screen.title}</h3>
                  <p className="screenDesc">{screen.desc}</p>
                  <div className="featureList">
                    {screen.features.map(([name, desc]) => (
                      <div key={name}>
                        <strong>{name}</strong>
                        <p>{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="nf-context" style={{ paddingTop: 0 }}>
        <div className="container">
          <SecHead zh="專案脈絡" en="CONTEXT" />
          <div className="proseGrid">
            <div className="prose">
              <h3 style={{ marginBottom: 16 }}>從一檔節目的行銷追蹤需求開始</h3>
              <p>這個專案最初來自我在彼此影業實習期間的內部行銷需求：公司希望觀察一檔新節目上架 Netflix 後的每日排行表現，作為每週行銷會議與節目成效討論的素材。一開始我的任務只是整理單一節目的每日排名並製作折線圖，但我發現單一節目無法客觀呈現收視表現，於是與主管討論後，加入其他台灣節目的排行走勢作為比較基準。</p>
            </div>
            <div className="prose">
              <h3 style={{ marginBottom: 16 }}>公開資料存在，但無法直接分析</h3>
              <p>Netflix 不會留下每日排行紀錄，我在 Facebook 找到長期發布排行資訊的粉絲專頁，但資料分散在貼文中，沒有結構化歷史資料庫。<span className="strong">原始資料雖然公開，但公開不等於可分析。</span>這個專案的核心問題，是如何把散落在社群平台上的非結構化文字，轉換成可以查詢、比較與視覺化的資料產品。</p>
            </div>
          </div>

          <div className="compare">
            <div className="compareCol">
              <h3>Before — 原始公開資料</h3>
              <ul>{rawDataProblems.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <span className="compareArrow">DATA CLEANING<br />+ PIPELINE →</span>
            <div className="compareCol after">
              <h3>After — 可分析資料產品</h3>
              <ul>{structuredDataValues.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="nf-evolution" style={{ paddingTop: 0 }}>
        <div className="container">
          <SecHead zh="問題演進" en="PROBLEM EVOLUTION" />
          <div className="steps">
            {evolutionSteps.map(([no, title, desc]) => (
              <div className="step" key={title}>
                <span className="stepNo">{no}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="nf-pipeline" style={{ paddingTop: 0 }}>
        <div className="container">
          <SecHead zh="系統架構" en="SYSTEM ARCHITECTURE" />
          <p className="lead muted" style={{ marginBottom: 48 }}>我將自動化資料蒐集與人工資料校正分離，讓整個流程兼顧效率與資料品質。</p>
          <div className="steps">
            {pipeline.map(([no, title, desc]) => (
              <div className="step" key={title}>
                <span className="stepNo">{no}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          {/* 過程細節收進折疊區，控制頁面長度 */}
          <div style={{ marginTop: 72 }}>
            <details className="fold">
              <summary>爬蟲挑戰與解法</summary>
              <div className="foldBody">
                {crawlerChallenges.map(([title, problem, solution]) => (
                  <div className="foldItem" key={title}>
                    <h3>{title}</h3>
                    <span className="label">問題</span>
                    <p>{problem}</p>
                    <span className="label">解法</span>
                    <p>{solution}</p>
                  </div>
                ))}
              </div>
            </details>
            <details className="fold">
              <summary>資料清理規則</summary>
              <div className="foldBody">
                {cleaningRules.map(([title, desc]) => (
                  <div className="foldItem" key={title}>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="section" id="nf-decisions" style={{ paddingTop: 0 }}>
        <div className="container">
          <SecHead zh="設計決策" en="DESIGN DECISIONS" />
          <p className="lead muted" style={{ marginBottom: 48 }}>不只是畫圖，而是定義資料怎麼被比較。</p>
          <div className="steps">
            {decisions.map(([no, title, desc]) => (
              <div className="step" key={title}>
                <span className="stepNo">{no}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="nf-impact" style={{ paddingTop: 0 }}>
        <div className="container">
          <SecHead zh="影響與角色" en="IMPACT & ROLE" />
          <div className="steps" style={{ marginBottom: 64 }}>
            {impactItems.map(([title, desc]) => (
              <div className="step" key={title}>
                <span className="stepNo">✓</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="proseGrid">
            <div className="prose">
              <h3 style={{ marginBottom: 16 }}>我負責的不只是實作，而是資料產品設計</h3>
              <p>我負責資料來源判斷、pipeline 規劃、Excel schema 設計、資料清理規則、儀表板需求定義、結果驗證與最終整合。我使用 Claude Code 作為 AI coding assistant 加速實作，但由我主導資料結構、分析邏輯與產品判斷。</p>
            </div>
            <div className="prose">
              <h3 style={{ marginBottom: 16 }}>使用工具</h3>
              <div className="tagRow" style={{ marginBottom: 24 }}>{techStack.map(item => <span key={item}>{item}</span>)}</div>
              <p className="muted" style={{ fontSize: 14 }}>未來改善方向：整合 GitHub Actions 進行每週自動更新、加入電影排行榜分析、增加 CSV 匯出功能、改善行動版 RWD。</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <a className="nextWork" href="#/taiwan-book">
          <span className="eyebrow">下一個作品 — NEXT</span>
          <h2>{taiwanBook.title}</h2>
        </a>
      </div>

      <ContactFooter />
    </main>
  )
}

/* ============================================================
   路由
   ============================================================ */

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

export default App
