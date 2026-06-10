const imageBase = `${import.meta.env.BASE_URL}images/`

const projects = [
  {
    id: 'taiwan-book',
    label: 'Information Design · AI Workflow · Figma',
    title: '給學生看的台灣四百年圖解出口貿易史',
    summary:
      '以 A5 小書形式，把台灣四百年的出口貿易史轉譯成學生可理解的資訊圖像。專案結合歷史敘事、視覺系統、AI 生成素材、去字/透明素材處理與 Figma 外掛式產出流程。',
    cover: `${imageBase}taiwan-book/cover.png`,
    links: [{ label: 'View Case Study', href: '#taiwan-book' }],
    tags: ['資訊設計', '教育內容', '視覺化小書', 'Figma Workflow'],
  },
  {
    id: 'netflix-dashboard',
    label: 'Data Pipeline · Visualization · Product Thinking',
    title: 'Netflix 台灣影視排行資料互動儀表板',
    summary:
      '將 Facebook 非結構化排行貼文整理成 Excel/JSON 資料流程，並製作 React 互動式儀表板，用於分析台灣串流影視趨勢、類型變化與台劇生命週期。',
    cover: `${imageBase}netflix-dashboard-weekly-browse.png`,
    links: [
      { label: 'Live Demo', href: 'https://jinfer68.github.io/netflix-taiwan-dashboard/' },
      { label: 'GitHub Repo', href: 'https://github.com/jinfer68/netflix-taiwan-dashboard' },
    ],
    tags: ['React', 'TypeScript', 'Python', 'Data Cleaning'],
  },
]

const taiwanStats = [
  ['20+', 'A5 頁面'],
  ['6', '歷史章節'],
  ['8', 'Figma 元件'],
  ['3', '素材版本'],
]

const taiwanProcess = [
  ['01', '歷史敘事拆解', '將台灣四百年出口貿易史拆成荷治、清領、日治、戰後加工、近代科技與結尾反思。'],
  ['02', '資訊圖像轉譯', '把抽象的經濟史脈絡轉成地圖、時間軸、供應鏈、產業卡片與跨頁視覺。'],
  ['03', '素材清理與重繪', '整理初版、純白版、去字版與透明版，讓頁面可被重新排版、疊合與後續輸出。'],
  ['04', 'Figma 工作流', '建立頁面模板、時期標籤、資訊卡、時間軸列等元件，並以外掛流程加速 A5 頁面產出。'],
]

const taiwanImages = [
  [`${imageBase}taiwan-book/toc.png`, '全書目錄與章節架構'],
  [`${imageBase}taiwan-book/semiconductor-page.png`, '近代科技時期代表頁'],
  [`${imageBase}taiwan-book/contact-sheet.jpg`, '透明素材 contact sheet'],
]

const netflixStats = [
  ['119 週', '週榜資料'],
  ['314 部', '收錄節目'],
  ['80+ 部', '台劇追蹤'],
  ['9+ 種', '篩選維度'],
]

function App() {
  return (
    <main>
      <section className="hero">
        <div className="container heroGrid">
          <div className="heroText">
            <p className="eyebrow">吳景富 · Portfolio</p>
            <h1>
              把資料、故事與工具
              <br />
              做成能被理解的作品
            </h1>
            <p className="lead">
              這裡收錄我從資料整理、視覺化、資訊設計到 AI 協作工作流的個人專案。重點不只是完成畫面，而是把模糊問題拆成可展示、可維護、可被他人理解的系統。
            </p>
          </div>
          <div className="heroPreview" aria-label="Featured project preview">
            <img src={projects[0].cover} alt="台灣四百年圖解出口貿易史封面" />
          </div>
        </div>
      </section>

      <section className="container section" id="work">
        <div className="sectionHeader">
          <p className="eyebrow">Selected Work</p>
          <h2>作品案例</h2>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <article className="projectCard" key={project.id}>
              <a href={`#${project.id}`} className="projectImage">
                <img src={project.cover} alt={`${project.title} 預覽`} loading="lazy" />
              </a>
              <div className="projectBody">
                <p className="eyebrow">{project.label}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="actions">
                  {project.links.map((link) => (
                    <a className="btn" key={link.href} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="caseStudy" id="taiwan-book">
        <div className="container caseGrid">
          <div>
            <p className="eyebrow">Case Study 01</p>
            <h2>給學生看的台灣四百年圖解出口貿易史</h2>
            <p className="lead">
              這是一個將歷史、地理、經濟與設計整合在一起的資訊圖像小書。核心問題是：如何讓學生看懂台灣在不同時代被世界需要的方式，以及出口貿易如何改變產業、城市與國際定位。
            </p>
            <div className="statGrid">
              {taiwanStats.map(([value, label]) => (
                <div className="stat" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <figure className="bookStack">
            <img src={projects[0].cover} alt="小書封面" />
            <img src={taiwanImages[1][0]} alt="科技時期頁面" />
          </figure>
        </div>

        <div className="container section compact">
          <div className="sectionHeader">
            <p className="eyebrow">Process</p>
            <h2>從內容架構到可輸出的設計系統</h2>
          </div>
          <div className="processGrid">
            {taiwanProcess.map(([number, title, text]) => (
              <article className="processCard" key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="container imageStory">
          {taiwanImages.map(([src, caption]) => (
            <figure key={src}>
              <img src={src} alt={caption} loading="lazy" />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="caseStudy alt" id="netflix-dashboard">
        <div className="container caseGrid">
          <div>
            <p className="eyebrow">Case Study 02</p>
            <h2>Netflix 台灣影視排行資料互動儀表板</h2>
            <p className="lead">
              這個專案從公司內部的行銷追蹤需求出發，把散落在社群貼文中的排行資訊轉成可篩選、可比較、可視覺化的資料產品。
            </p>
            <div className="statGrid">
              {netflixStats.map(([value, label]) => (
                <div className="stat" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="actions">
              <a className="btn primary" href="https://jinfer68.github.io/netflix-taiwan-dashboard/" target="_blank" rel="noreferrer">
                Open Dashboard
              </a>
              <a className="btn" href="https://github.com/jinfer68/netflix-taiwan-dashboard" target="_blank" rel="noreferrer">
                View Code
              </a>
            </div>
          </div>
          <div className="dashboardShots">
            <img src={`${imageBase}netflix-dashboard-weekly-browse.png`} alt="Netflix dashboard weekly browse" />
            <img src={`${imageBase}netflix-dashboard-genre-flow.png`} alt="Netflix dashboard genre flow" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
