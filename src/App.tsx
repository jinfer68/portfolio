const stats = [
  ['週榜資料', '119 週'],
  ['收錄節目', '314 部'],
  ['台劇追蹤', '80+ 部'],
  ['Excel 工作表', '8 張'],
  ['儀表板頁籤', '3 個'],
  ['篩選維度', '9+ 種'],
]

const pipeline = [
  ['🔎', 'Facebook 排行貼文', 'Netflix Taiwan 每週公開排行資訊，原始資料為非結構化中文貼文。'],
  ['🐍', 'Python 爬蟲', '以 Selenium 與文字解析邏輯擷取日期、節目名稱、類型與排名。'],
  ['📊', 'Excel 本地資料庫', '保留人工校正彈性，維護節目屬性、播出方式與資料一致性。'],
  ['🧩', 'JSON 資料轉換', '將清理後資料轉成前端可讀取的結構化資料，支援多種聚合查詢。'],
  ['📈', 'React 儀表板', '以互動式圖表呈現總排行、類型趨勢與台劇表現比較。'],
]

const screens = [
  {
    title: '總排行榜：跨時間尺度的排行分析',
    label: 'Overall Rankings',
    image: 'https://jinfer68.github.io/netflix-taiwan-dashboard/',
    desc: '支援週榜 / 日榜切換，並可依年份、季度、類型與 Netflix Original 狀態篩選。右側節目詳情面板讓使用者快速查看單一作品的最高名次、平均名次、上榜週數與累積積分。',
    tags: ['Top 20 積分排行', '年份 / 季度 / 類型篩選', '單一節目詳細查詢'],
  },
  {
    title: '週次快覽：把單週榜單轉成可回溯資料',
    label: 'Weekly Snapshot',
    image: 'https://jinfer68.github.io/netflix-taiwan-dashboard/',
    desc: '使用者能回到特定月份與週次查看當週 Top 10 榜單，補上 Facebook 貼文難以回溯的問題，讓歷史排行資料能以結構化方式被查詢。',
    tags: ['月份 / 週次切換', '單週 Top 10 榜單', '類型分布摘要'],
  },
  {
    title: '類型分析：觀察不同影視類型的消長',
    label: 'Genre Analysis',
    image: 'https://jinfer68.github.io/netflix-taiwan-dashboard/',
    desc: '使用圓餅圖呈現類型占比，並用河流圖呈現不同類型在時間軸上的消長，從單一節目排名推進到整體市場趨勢觀察。',
    tags: ['類型占比圓餅圖', '週榜類型河流圖', '趨勢區間縮放'],
  },
  {
    title: '台劇分析：用生命週期比較播出策略',
    label: 'Taiwan Drama Analysis',
    image: 'https://jinfer68.github.io/netflix-taiwan-dashboard/',
    desc: '以「上架後第 N 天」作為共同 X 軸，讓不同上架日期的作品可以被放在同一生命週期基準下比較，適合分析週播、一次上架與拆分上架策略差異。',
    tags: ['台劇積分排行', '最多 10 部作品比較', '上架後天數走勢圖'],
  },
]

const decisions = [
  ['01', '用 Excel 作為輕量資料庫', '此專案需要人工補充節目屬性與播出方式，因此選擇 Excel 作為可維護、可人工校正的本地資料庫，而不是一開始就導入較重的 SQL 架構。'],
  ['02', '將排名轉換成積分', '將 Top 10 排名轉成 10–1 分，讓不同週次與不同時間範圍的節目可以被橫向比較。'],
  ['03', '用上架後天數比較台劇', '不同作品上架日期不同，因此台劇走勢圖不使用絕對日期，而是以生命週期視角比較表現。'],
]

const techStack = ['Python', 'Selenium', 'Excel', 'JSON', 'React', 'TypeScript', 'Vite', 'Recharts', 'ECharts']

const links = {
  demo: 'https://jinfer68.github.io/netflix-taiwan-dashboard/',
  github: 'https://github.com/jinfer68/netflix-taiwan-dashboard',
}

function App() {
  return (
    <main>
      <section className="hero">
        <div className="container heroGrid">
          <div>
            <p className="eyebrow">✨ Data Pipeline · Visualization · Product Thinking</p>
            <h1>Netflix 台灣影視排行資料儀表板</h1>
            <p className="lead">我建立了一套端對端資料流程，將 Netflix Taiwan Facebook 貼文中的非結構化排行資料，整理為 Excel 本地資料庫、轉換為 JSON，並製作成 React 互動式儀表板，用於分析台灣串流影視趨勢。</p>
            <div className="actions">
              <a className="btn primary" href={links.demo} target="_blank" rel="noreferrer">View Live Demo ↗</a>
              <a className="btn secondary" href={links.github} target="_blank" rel="noreferrer">GitHub Repo ↗</a>
            </div>
          </div>
          <aside className="snapshot">
            <p className="muted">Project Snapshot</p>
            <h2>119 週的台灣串流排行資料</h2>
            <div className="statsGrid">{stats.map(([label, value]) => <div className="statCard" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
          </aside>
        </div>
      </section>

      <section className="container section twoCol">
        <article className="card wide">
          <p className="sectionLabel">Problem</p>
          <h2>公開資料存在，但無法直接分析</h2>
          <p>Netflix Taiwan 會透過 Facebook 貼文發布排行資訊，但這些資料分散在社群貼文中，格式不固定，也沒有結構化歷史資料庫。這使得使用者很難回顧不同年份、類型或台劇作品的排名變化。</p>
          <p>因此，我將這些非結構化貼文轉換為可維護的 Excel 資料庫與前端 JSON，最後透過儀表板呈現可互動分析的影視趨勢。</p>
        </article>
        <article className="card accent"><span className="bigIcon">🧠</span><p>Core Value</p><h3>把不可查詢的社群資料，變成可探索的資料產品。</h3></article>
      </section>

      <section className="section panel">
        <div className="container">
          <p className="sectionLabel">System Architecture</p>
          <h2>從 Facebook 貼文到互動式儀表板</h2>
          <p className="sectionIntro">我將自動化資料蒐集與人工資料校正分離，讓整個流程兼顧效率與資料品質。</p>
          <div className="pipeline">{pipeline.map(([icon, title, desc], index) => <article className="pipeCard" key={title}><span className="pipeIcon">{icon}</span><h3>{title}</h3><p>{desc}</p>{index < pipeline.length - 1 && <span className="arrow">→</span>}</article>)}</div>
        </div>
      </section>

      <section className="container section">
        <p className="sectionLabel">Dashboard Features</p>
        <h2>三個分析視角</h2>
        <div className="featureGrid">
          <article className="card"><span className="check">✓</span><h3>總排行榜</h3><p>支援週榜 / 日榜模式，並可依年份、季度、月份、週次、類型與 Netflix Original 篩選。</p></article>
          <article className="card"><span className="check">✓</span><h3>類型分析</h3><p>透過圓餅圖與河流圖觀察韓劇、台劇、日劇、動畫、美劇等類型在週榜中的消長。</p></article>
          <article className="card"><span className="check">✓</span><h3>台劇分析</h3><p>以「上架後第 N 天」作為共同基準，比較不同台劇與播出策略的排名走勢。</p></article>
        </div>
      </section>

      <section className="section panel">
        <div className="container">
          <p className="sectionLabel">Product Screens</p>
          <h2>儀表板成果展示</h2>
          <p className="sectionIntro">以下四個畫面說明資料如何被轉換成可查詢、可比較、可解讀的產品介面。截圖可在後續版本補上，目前每張卡片皆連到實際 demo。</p>
          <div className="screens">{screens.map((screen, index) => <article className={`screenRow ${index % 2 ? 'reverse' : ''}`} key={screen.title}><a className="screenMock" href={links.demo} target="_blank" rel="noreferrer"><span>{screen.label}</span><strong>{screen.title}</strong><em>Open live demo ↗</em></a><div className="screenText"><p className="sectionLabel">{screen.label}</p><h3>{screen.title}</h3><p>{screen.desc}</p><div className="tags">{screen.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
        </div>
      </section>

      <section className="container section">
        <p className="sectionLabel">Design Decisions</p>
        <h2>不只是畫圖，而是定義資料怎麼被比較</h2>
        <div className="decisionGrid">{decisions.map(([no, title, desc]) => <article className="card" key={title}><strong className="number">{no}</strong><h3>{title}</h3><p>{desc}</p></article>)}</div>
      </section>

      <section className="section panel">
        <div className="container twoCol">
          <article className="card"><p className="sectionLabel">My Role</p><h2>我負責的不只是實作，而是資料產品設計</h2><p>我負責資料來源判斷、pipeline 規劃、Excel schema 設計、資料清理規則、儀表板需求定義、結果驗證與最終整合。</p><p>我使用 Claude Code 作為 AI coding assistant 加速實作，但由我主導資料結構、分析邏輯與產品判斷。</p></article>
          <article className="card"><p className="sectionLabel">Tech Stack</p><h2>資料管線與前端視覺化</h2><div className="tags large">{techStack.map(tech => <span key={tech}>{tech}</span>)}</div><div className="nextBox"><h3>下一步改善</h3><ul><li>加入電影排行榜分析</li><li>整合 GitHub Actions 進行每週自動更新</li><li>增加 CSV 匯出功能</li><li>改善行動版 RWD</li></ul></div></article>
        </div>
      </section>

      <section className="footerCta"><div className="container footerGrid"><div><h2>想看實際成果？</h2><p>Live demo 與 GitHub repo 都已公開。</p></div><div className="actions"><a className="btn primary" href={links.demo} target="_blank" rel="noreferrer">Live Demo ↗</a><a className="btn secondary" href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></div></section>
    </main>
  )
}

export default App
