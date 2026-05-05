import {
  cleaningRules,
  crawlerChallenges,
  decisions,
  evolutionSteps,
  impactItems,
  links,
  pipeline,
  screens,
  stats,
  techStack,
} from './content'

function App() {
  return <main>
    <section className="hero"><div className="container heroGrid"><div>
      <p className="eyebrow">✨ Data Pipeline · Visualization · Product Thinking</p>
      <h1>Netflix 台灣影視排行資料儀表板</h1>
      <p className="lead">我建立了一套端對端資料流程，將 Netflix Taiwan Facebook 貼文中的非結構化排行資料，整理為 Excel 本地資料庫、轉換為 JSON，並製作成 React 互動式儀表板，用於分析台灣串流影視趨勢。</p>
      <div className="actions"><a className="btn primary" href={links.demo} target="_blank" rel="noreferrer">View Live Demo ↗</a><a className="btn secondary" href={links.github} target="_blank" rel="noreferrer">GitHub Repo ↗</a></div>
    </div><aside className="snapshot"><p className="muted">Project Snapshot</p><h2>119 週的台灣串流排行資料</h2><div className="statsGrid">{stats.map(([label, value]) => <div className="statCard" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></aside></div></section>

    <section className="container section twoCol"><article className="card wide"><p className="sectionLabel">Project Origin</p><h2>從一檔節目的行銷追蹤需求開始</h2><p>這個專案最初來自公司內部的行銷需求：公司希望觀察一檔新節目上架 Netflix 後的每日排行表現，作為每週行銷會議與節目成效討論的素材。</p><p>一開始，我的任務只是整理單一節目的 Netflix 每日排名，並製作簡單的折線圖。但在整理過程中，我發現 Netflix 並不會公開保留完整的每日歷史排行，因此只能透過民間 Facebook 專頁每日紀錄的榜單作為資料來源。</p></article><article className="card accent"><span className="bigIcon">🧠</span><p>Core Value</p><h3>把不可查詢的社群資料，變成可探索的資料產品。</h3></article></section>

    <section className="container section twoCol"><article className="card wide"><p className="sectionLabel">Problem</p><h2>公開資料存在，但無法直接分析</h2><p>Netflix Taiwan 會透過 Facebook 貼文發布排行資訊，但這些資料分散在社群貼文中，格式不固定，也沒有結構化歷史資料庫。這使得使用者很難回顧不同年份、類型或台劇作品的排名變化。</p><p><strong>原始資料雖然公開，但公開不等於可分析。</strong> 這個專案的核心問題，是如何把散落在社群平台上的非結構化文字資料，轉換成可以查詢、比較與視覺化的資料產品。</p></article><article className="card"><p className="sectionLabel">Project Goal</p><h2>建立可重複更新的排行資料流程</h2><p>此專案目標不是只做一次性的視覺化頁面，而是建立一套能持續更新的資料流程，讓 Netflix 台灣排行資料能從 Facebook 貼文轉換為可查詢、可比較、可維護的資料資產。</p></article></section>

    <section className="section panel"><div className="container"><p className="sectionLabel">Problem Evolution</p><h2>從單一節目追蹤，到市場競爭脈絡分析</h2><p className="sectionIntro">這個專案不是一開始就規劃成完整儀表板，而是在實際使用與討論中，一步步從單一節目追蹤擴展成市場觀察工具。</p><div className="decisionGrid">{evolutionSteps.map(([no, title, desc]) => <article className="card" key={title}><strong className="number">{no}</strong><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>

    <section className="container section twoCol"><article className="card"><p className="sectionLabel">From Excel to Dashboard</p><h2>讓資料不只被整理，也能被探索</h2><p>第一版分析主要在 Excel 中完成：我蒐集全年度週榜資料，建立「排名轉積分」的計算方式，並用樞紐分析製作年度排行榜。</p><p>但在使用過程中，我發現 Excel 適合資料整理與初步分析，卻不適合讓團隊快速切換年份、類型、節目或台劇比較視角。因此我開始使用 Claude Code 協助建立互動式儀表板，並與 AI 一起討論不同資料問題適合使用哪些圖表呈現。</p></article><article className="card"><p className="sectionLabel">Impact</p><h2>從貼文回顧變成資料探索</h2><p>這個專案將原本需要逐篇翻找 Facebook 貼文的排行資料，轉換為可依年份、週次、類型與節目查詢的互動式工具，降低歷史資料回溯成本，並讓台劇與不同影視類型的趨勢比較成為可能。</p></article></section>

    <section className="section panel"><div className="container"><p className="sectionLabel">System Architecture</p><h2>從 Facebook 貼文到互動式儀表板</h2><p className="sectionIntro">我將自動化資料蒐集與人工資料校正分離，讓整個流程兼顧效率與資料品質。</p><div className="pipeline">{pipeline.map(([icon, title, desc], index) => <article className="pipeCard" key={title}><span className="pipeIcon">{icon}</span><h3>{title}</h3><p>{desc}</p>{index < pipeline.length - 1 && <span className="arrow">→</span>}</article>)}</div></div></section>

    <section className="container section"><p className="sectionLabel">Crawler Challenge</p><h2>將人工蒐集流程轉為半自動化資料管線</h2><p className="sectionIntro">當儀表板初版完成後，我發現只使用 2025 年週榜資料仍不夠完整。若要補齊更多年份，甚至加入日榜資料，人工蒐集成本會快速失控。因此我進一步建立 Facebook 爬蟲工具，一次性蒐集 2024/01/01 至 2026/04/27 的每日榜單資料。</p><div className="featureGrid">{crawlerChallenges.map(([title, desc]) => <article className="card" key={title}><span className="check">!</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

    <section className="container section"><p className="sectionLabel">Data Cleaning</p><h2>資料清理是這個專案能不能可信的核心</h2><p className="sectionIntro">Facebook 貼文不是乾淨資料表。要讓資料能被分析，必須先處理名稱、類型、日期、重複資料與人工屬性補充等問題。資料如果髒，圖表再漂亮也只是高級裝飾品。</p><div className="featureGrid">{cleaningRules.map(([title, desc]) => <article className="card" key={title}><span className="check">✓</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

    <section className="container section"><p className="sectionLabel">Dashboard Features</p><h2>三個分析視角</h2><div className="featureGrid"><article className="card"><span className="check">✓</span><h3>總排行榜</h3><p>支援週榜 / 日榜模式，並可依年份、季度、月份、週次、類型與 Netflix Original 篩選。</p></article><article className="card"><span className="check">✓</span><h3>類型分析</h3><p>透過圓餅圖與河流圖觀察韓劇、台劇、日劇、動畫、美劇等類型在週榜中的消長。</p></article><article className="card"><span className="check">✓</span><h3>台劇分析</h3><p>以「上架後第 N 天」作為共同基準，比較不同台劇與播出策略的排名走勢。</p></article></div></section>

    <section className="section panel"><div className="container"><p className="sectionLabel">Product Screens</p><h2>儀表板成果展示</h2><p className="sectionIntro">以下四個畫面說明資料如何被轉換成可查詢、可比較、可解讀的產品介面。每張卡片皆連到實際 demo；之後可再把截圖檔補進 repo。</p><div className="screens">{screens.map(([label, title, desc, tags], index) => <article className={`screenRow ${index % 2 ? 'reverse' : ''}`} key={title}><a className="screenMock" href={links.demo} target="_blank" rel="noreferrer"><span>{label}</span><strong>{title}</strong><em>Open live demo ↗</em></a><div className="screenText"><p className="sectionLabel">{label}</p><h3>{title}</h3><p>{desc}</p><div className="tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></div></section>

    <section className="container section"><p className="sectionLabel">Design Decisions</p><h2>不只是畫圖，而是定義資料怎麼被比較</h2><div className="decisionGrid">{decisions.map(([no, title, desc]) => <article className="card" key={title}><strong className="number">{no}</strong><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

    <section className="section panel"><div className="container"><p className="sectionLabel">Business Impact</p><h2>從內部行銷素材，延伸為市場觀察工具</h2><p className="sectionIntro">這份資料最初只是為了支援單一節目的每週行銷會議，但最後擴展成一套涵蓋多年份、週榜與日榜的 Netflix 台灣收視資料庫。</p><div className="featureGrid">{impactItems.map(([title, desc]) => <article className="card" key={title}><span className="check">✓</span><h3>{title}</h3><p>{desc}</p></article>)}</div><p className="sectionIntro impactNote">未來，這類資料也有機會協助公司與串流平台討論上架策略，或作為內容製作與宣傳時程規劃的參考。</p></div></section>

    <section className="section panel"><div className="container twoCol"><article className="card"><p className="sectionLabel">My Role</p><h2>我負責的不只是實作，而是資料產品設計</h2><p>我負責資料來源判斷、pipeline 規劃、Excel schema 設計、資料清理規則、儀表板需求定義、結果驗證與最終整合。</p><p>我使用 Claude Code 作為 AI coding assistant 加速實作，但由我主導資料結構、分析邏輯與產品判斷。</p></article><article className="card"><p className="sectionLabel">Tech Stack</p><h2>資料管線與前端視覺化</h2><div className="tags large">{techStack.map(tech => <span key={tech}>{tech}</span>)}</div><div className="nextBox"><h3>下一步改善</h3><ul><li>整合 GitHub Actions 進行每週自動更新</li><li>加入電影排行榜分析</li><li>增加 CSV 匯出功能</li><li>改善行動版 RWD</li></ul></div></article></div></section>

    <section className="footerCta"><div className="container footerGrid"><div><h2>想看實際成果？</h2><p>Live demo 與 GitHub repo 都已公開。</p></div><div className="actions"><a className="btn primary" href={links.demo} target="_blank" rel="noreferrer">Live Demo ↗</a><a className="btn secondary" href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></div></section>
  </main>
}

export default App
