import { useEffect, useState } from 'react'
import { coverData } from './coverData'

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
  threads: 'https://www.threads.com/@tw.binge.lab',
}

const taiwanBook = {
  title: '給學生看的台灣四百年圖解出口貿易史',
  summary: 'A5 資訊圖像小書，將台灣四百年的出口貿易史轉譯成學生可理解的歷史敘事、資訊圖像與 Figma 工作流。',
  cover: `${imageBase}taiwan-book/cover-blue.png`,
  tags: ['資訊設計', '教育內容', 'A5 小書', 'Figma Workflow'],
}

interface Work {
  href: string
  cover: 'dashboard' | 'binge' | 'book'
  meta: string
  title: string
  desc: string
  points: string[]
}

// 首頁作品：先講解決的問題與成果，再講方法；順序依與影視產業職缺的相關度
const works: Work[] = [
  {
    href: '#/netflix-dashboard',
    cover: 'dashboard',
    meta: '資料產品 — 市場分析工具',
    title: 'Netflix 台灣影視排行資料互動儀表板',
    desc: '公司只看得到自家節目的名次，無法判斷表現算好還是不好。我把五年多的 Netflix 台灣排行整理成資料庫與互動儀表板，讓每部作品都能和同期、同類型的作品比較；整理出的排行資料已用在公司的節目結案報告。',
    points: ['從行銷會議的一張折線圖，擴展成市場比較工具', '自訂清理規則，找出並修正資料層的錯誤', '每日更新、公開可用'],
  },
  {
    href: '#/binge-lab',
    cover: 'binge',
    meta: '內容策略 — 社群數據帳號',
    title: '台灣追劇研究所',
    desc: '把同一份排行資料做成一般觀眾會想看的內容。Threads／IG 帳號的定位、內容形式、圖卡與發文流程都由我設計；每篇貼文發出前先寫好假說與判定標準，用數據了解受眾。',
    points: ['帳號定位與三種內容形式', '自動化產製，發文前人工核准', '每篇貼文都是一次事先設計好的測試'],
  },
  {
    href: '#/taiwan-book',
    cover: 'book',
    meta: '資訊設計 — 教育出版',
    title: '給學生看的台灣四百年圖解出口貿易史',
    desc: '把台灣四百年的出口貿易史，轉譯成學生看得懂的 A5 圖像小書。重點在為特定讀者重新組織複雜資訊、選擇合適的圖像形式，並用 Figma 元件與 AI 素材流程，讓 20 多頁維持一致的視覺系統。',
    points: ['為特定讀者轉譯複雜內容', '20 多頁一致的視覺系統', 'AI 素材 × Figma 工作流'],
  },
]

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

const netflixDemoImages = {
  overall: `${imageBase}dashboard/overall-detail.jpg`,
  weekly: `${imageBase}dashboard/weekly-browse.jpg`,
  genre: `${imageBase}dashboard/genre.jpg`,
  taiwan: `${imageBase}dashboard/taiwan-drama.jpg`,
  movies: `${imageBase}dashboard/movies.jpg`,
}

const netflixFacts: [string, string][] = [
  ['角色', '個人專案，負責資料來源判斷、爬蟲與資料管線、資料清理規則、儀表板需求與資訊設計'],
  ['期間', '源自彼此影業實習期間的內部需求；儀表板 2026 年 4 月開始開發，資料持續更新至 2026 年 10 月'],
  ['工具', 'Python・Selenium・TMDB API・Excel・React・TypeScript・Recharts・ECharts・GitHub Actions・Claude Code'],
  ['產出', '可公開瀏覽的互動儀表板、可重跑的資料轉換腳本與測試、各功能的設計規格文件'],
]

const stats: [string, string][] = [
  ['2021–2026', '資料期間'],
  ['1,935 天', '每日排行'],
  ['275 週', '官方週榜'],
  ['855 部', '上榜影集'],
  ['1,534 部', '上榜電影'],
  ['95 部', '台灣節目'],
]

const tldr: [string, string][] = [
  ['問題', '行銷會議只看得到自家節目每天的名次，無法判斷「第 5 名」算好還是不好；Netflix 也不公開歷史排行，沒有資料可以回頭比較。'],
  ['做法', '把五年多的排行整理成資料庫（週榜採 Netflix 官方 Top 10），定義「積分」與「上架後第 N 天」兩把比較用的尺，做成可依類型、上架方式與片源篩選的儀表板。'],
  ['成果', '整理出的排行資料用在公司的節目結案報告。儀表板涵蓋影集與電影、每日更新、公開可用，並延伸成 Threads 數據帳號「台灣追劇研究所」。'],
]

const evolutionSteps: [string, string, string][] = [
  ['01', '單一節目追蹤', '最初需求是觀察公司自家一檔新節目上架 Netflix 後的每日排行，並製作每週行銷會議可使用的折線圖。'],
  ['02', '加入台劇比較', '單一節目走勢無法客觀判斷表現，因此我與主管討論後，加入其他台灣節目的排行走勢作為比較基準。'],
  ['03', '擴展到年度週榜', '不同作品會受到同時期競爭環境影響，因此我開始蒐集全年度週榜資料，建立積分機制與年度收視排行榜。'],
  ['04', '建立互動儀表板', 'Excel 適合資料整理，但互動性不足，因此我用 Claude Code 協助實作 React 儀表板，讓資料能被直覺地探索。'],
  ['05', '回補歷史、加入電影', '把資料回補到 2021 年 4 月，並把一直有抓、卻沒用上的電影榜做成獨立頁面。電影汰換速度約是影集的兩倍，所以篩選維度另外設計，沒有直接沿用影集頁。'],
  ['06', '從 Excel 換成資料管線', '2026 年 10 月把資料從 Excel 搬進以 JSON 為核心的資料管線：週榜改用 Netflix 官方 Top 10，每部作品有固定的編號並用 TMDB 查證。同一份資料同時供應儀表板與 Threads 帳號。'],
]

const pipeline: [string, string, string][] = [
  ['01', '排行來源', '每日排行最早來自長期發布 Netflix 台灣排行的 Facebook 粉專貼文，格式不固定、同一部作品常有多種寫法；週榜改用 Netflix 官方 Top 10。'],
  ['02', 'Python 爬蟲', '用 Selenium 依日期區間分段抓取，加入進度監看、斷點續抓與原子寫入，讓長時間執行可以被觀察、中斷後能接續。'],
  ['03', '作品主檔', '早期用 Excel 人工維護上架方式、集數等屬性；現在每部作品有固定編號，片名變體、季別、產地都在主檔中處理，並以 TMDB 查證。'],
  ['04', '驗證與輸出', '驗證不通過就不寫入；Python 依計算規則產生前端讀取的 JSON，規則都有單元測試。'],
  ['05', 'React 儀表板', '影集與電影兩條分析線，推送後由 GitHub Actions 自動建置並部署到 GitHub Pages。'],
]

const rawDataProblems = ['Facebook 貼文', '非結構化文字', '格式不固定', '難以回溯', '不易比較']
const structuredDataValues = ['日榜／週榜資料庫', '欄位結構化', '可篩選查詢', '可跨期比較', '可視覺化分析']

const crawlerChallenges: [string, string, string][] = [
  ['日期篩選與滾動載入', 'Facebook 預設從最新貼文開始載入，需要透過日期篩選與滾動操作才能回到歷史資料。一次滾動過多也可能讓頁面狀態改變。', '改成分段抓取、定期刷新頁面，並依日期區間調整篩選條件，降低頁面狀態變動造成的抓取失敗。'],
  ['進度不可見', '爬蟲早期執行時沒有即時回饋，我無法判斷是否成功抓取、抓了多少資料，或是否卡在頁面互動。', '加入進度輸出、抓取數量與狀態訊息，讓除錯過程變得可觀察，也能即時判斷資料量是否異常。'],
  ['中斷與資料損毀', '長時間執行時一旦中斷，寫到一半的資料庫可能損毀，不完整的榜單也無法補回。', '改成原子寫入，允許不完整的榜單之後被補抓，並以覆蓋率檢查找出缺漏日期。'],
]

const qualityCases: [string, string, string, string][] = [
  [
    '類型寫法有 45 種',
    '週榜與日榜合計 19,147 列裡出現 45 種類型寫法，其中 8.3% 不屬於儀表板定義的九種類型，圖表因此查不到顏色，原本只能在 Excel 逐格手改。',
    '寫成規則式的正規化模組：能判斷的自動歸類；沒見過的寫法一律落到「其他」並列入待審清單，不會被硬塞進九類，也不會悄悄消失。修正只發生在輸出層，Excel 原始資料保持不動。',
    '已上線',
  ],
  [
    '電影的「類型」其實是產地',
    '電影欄位混著產地國別與片種，日榜出現 150 種以上寫法，例如「美/南非/冰島」、「紀錄片 (英)」，還有夾雜片名的髒資料。',
    '拆成「產地」與「形式（劇情片／動畫／紀錄片）」兩個維度各自判定；同一部片標籤前後不一時以多數決處理。使用時又發現介面寫的「語言」其實是產地，例如法國出品的英語片被歸成其他語言。我把這個問題寫進規格，修法還在評估中。',
    '已上線・持續修正',
  ],
  [
    '缺漏要被看見',
    '舊來源的電影週榜 2025 年只收錄到 15 週，同期影集週榜有 52 週，問題出在來源，不是爬蟲；早期日榜也有缺漏。',
    '不補假資料，改成在介面上標示每年的資料涵蓋天數，避免把不完整的期間誤讀成全年。之後週榜改用 Netflix 官方 Top 10 補齊；日榜經回補後，2021–2023 的缺漏從 247 天降到 78 天。',
    '已上線',
  ],
  [
    '台劇走勢的起點錯了',
    '線上的走勢圖出現第 −398 天：錨點被設在最近一次回鍋上榜，而不是首播。換成 TMDB 首播日後又發現另一個問題：TMDB 記的常是電視首播，《痞子英雄》會從第 4,803 天開始。',
    '相鄰上榜日間隔呈雙峰（28 天與 33 天之間沒有資料），以 30 天切分檔期，只畫主檔期、再度上榜以文字註記；首播到第一次上榜的天數在 22 天與 43 天之間也沒有資料，所以首播日早 30 天以上就改用第一次上榜日。',
    '已上線',
  ],
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
    images: [netflixDemoImages.overall, netflixDemoImages.weekly],
    desc: '回答「哪些作品在指定期間表現最好」。週榜與日榜都轉成積分，可依年份、季度、類型與是否為 Netflix 獨家篩選；點選任一作品，就能看到它的名次走勢與各週表現。',
    features: [
      ['Top 20 積分排行', '將 Top 10 名次轉換成 10–1 分，讓不同週次、不同作品可以用同一套標準比較。'],
      ['節目詳情', '最高名次、平均名次、上榜週數、累積積分，加上日榜名次走勢與各週名次，判斷是爆發型還是長銷型。'],
      ['週次快覽', '回到特定季度、月份與週次，直接查看當週 Top 10 與類型分布，不需逐篇翻找歷史貼文。'],
    ],
  },
  {
    label: 'Genre Analysis',
    title: '類型分析：看各類型在榜單上的消長',
    images: [netflixDemoImages.genre],
    desc: '回答「哪些類型在台灣 Netflix 最有聲量、何時消長」。左右兩張環圈圖分別看出現次數與 Top 50 部數，下方的流向圖把每週各類型的上榜部數放在時間軸上。',
    features: [
      ['兩種占比', '「出現次數」反映聲量，「積分榜部數」反映有多少作品真正站得住，兩者落差本身就是觀察點。'],
      ['每週類型流向圖', '觀察韓劇、陸劇、日本動畫等類型在不同週期的消長，可縮放到特定區間。'],
      ['固定的類型色', '九種類型色經過色盲辨識與對比驗證，且顏色跟著類型走，篩選後不會換色。'],
    ],
  },
  {
    label: 'Taiwan Drama Analysis',
    title: '台劇分析：用同一條生命週期比較作品',
    images: [netflixDemoImages.taiwan],
    desc: '回答「不同台劇上架後的表現如何比較」。X 軸不用日期，而用「上架後第 N 天」，讓不同時間上架的作品放在同一個起點比較；並區分週播、一次上架與拆分上架，因為發行方式會直接改變走勢形狀。',
    features: [
      ['上架方式篩選', '週播劇隨新集釋出產生多次波動，一次上架則多為集中爆發後下滑，不放在同一種解讀邏輯裡。'],
      ['新集上線標記', '週播劇在每集上線日加上 EP 參考線，讓「新集帶動名次回升」的模式可以直接被看見。'],
      ['最多 8 部同框比較', '上限由可辨識的配色數決定，而不是由畫面放得下幾條線決定。'],
    ],
  },
  {
    label: 'Movies',
    title: '電影頁：汰換更快、長尾更長的另一套邏輯',
    images: [netflixDemoImages.movies],
    desc: '電影在榜天數中位數只有 9 天，約是影集的一半，但最長的作品在榜 269 天。電影也沒有集數與上架方式，所以另外設計了產地、形式與當日榜單的檢視方式。',
    features: [
      ['可指定日期的當日榜單', '附近 14 天名次走勢與升降，快速看出新進榜與掉榜作品。'],
      ['14 天名次競逐', '以當日榜單為終點回推兩週，看名次如何交錯。'],
      ['產地與形式篩選', '台灣、英語、華語、日語、韓語等產地，加上劇情片、動畫、紀錄片三種形式。'],
    ],
  },
]

const decisions: [string, string, string][] = [
  ['01', '將排名轉換成積分', '將 Top 10 名次轉成 10–1 分，讓不同週次與時間範圍的作品可以被橫向比較，而不是只能看單週名次。'],
  ['02', '用上架後天數比較', '不同作品上架日期不同，走勢圖改以生命週期為基準，比較的是「上架後的熱度維持能力」。'],
  ['03', 'Excel 當資料庫，修正只在轉檔層', '人工維護的屬性留在 Excel，所有自動修正都寫在 Python 轉檔規則裡，規則一改，所有歷史資料立即一致套用。'],
  ['04', '像報紙數據版面，而不是 SaaS 後台', '紙白底、細線分區、不用卡片與漸層；Netflix 紅只用來標示目前焦點，從不當資料色。'],
  ['05', '缺漏要被看見', '資料不完整的期間在介面上直接標示涵蓋範圍，不讓使用者把不完整的資料誤讀成全貌。'],
]

const bingeIntroCard = `${imageBase}threads/intro.jpg`

const bingeCards: [string, string][] = [
  [`${imageBase}threads/analysis-cover.jpg`, '深度分析：2025 年度誰最強'],
  [`${imageBase}threads/analysis-top10.jpg`, '分析內頁：年度節目 Top 10'],
  [`${imageBase}threads/weekly-cover.jpg`, '每週五週榜'],
]

const bingeFacts: [string, string][] = [
  ['角色', '個人專案，負責帳號定位、內容規劃、圖卡設計，以及發文與成效追蹤流程'],
  ['期間', '2026 年 10 月開站，持續經營中'],
  ['平台', 'Threads・Instagram（@tw.binge.lab）'],
  ['工具', 'Python（圖卡與排程腳本）・Threads／Instagram API・GitHub Actions・Claude'],
]

const bingeTldr: [string, string][] = [
  ['問題', '儀表板適合會主動探索的人，但多數觀眾不會打開一個儀表板。排行資料要怎麼變成一般人會看、會想追蹤的內容？'],
  ['做法', '定位成「用 Netflix 榜單，看台灣人在追什麼」，規劃週榜、深度分析、投票三種內容；圖卡與排程交給腳本，每篇發文前由我核准。'],
  ['現況', '2026 年 10 月開站，還在冷啟動期。每篇貼文都事先寫好假說與判定標準，每週檢討一次，把學到的事記錄下來。'],
]

const bingeFormats: [string, string, string][] = [
  ['每週週榜', '穩定供給', '每週五整理 Netflix 官方週榜，固定格式、固定時間，讓讀者知道什麼時候回來看。'],
  ['深度分析', '建立專業形象', '例如「2025 年 Netflix 台灣誰最強」。題目與大綱先送審，核准後才算數字、做圖卡；成品再審一次才發布。'],
  ['每日投票', '累積互動與樣本', '與影視相關的投票題。出題規則之一：答案不能是「看情況」，選項要具體到片名，降低參與門檻。'],
]

const bingeSystem: [string, string, string][] = [
  ['01', '同一份資料，換成大眾看得懂的形式', '儀表板適合自己探索，社群貼文要讓第一次滑到的人三秒內看懂。資料來源是 Netflix 官方 Top 10 週榜，再加上自行整理的日榜，和儀表板共用同一份資料。'],
  ['02', '固定腳本處理，判斷才交給人', '下載、驗證、計算、畫圖卡、排程發文都是固定腳本，在雲端排程執行。驗證不通過就不發文；沒有資料的日子留白，不補值也不推估。圖卡與貼文要我核准才會發出，留言也由我回覆。'],
  ['03', '每篇貼文都是一次測試', '發文前先寫下假說、比較對象和判定條件。每週一照事前寫好的條件判定，結果記進學習紀錄，不在看到數字後才改標準。'],
]

const bingeExperiment: [string, string][] = [
  ['觀察', '使用者回饋看不出投票題的邏輯；檢查後發現，原本的題目在新帳號瀏覽量太少時根本量不出差別。'],
  ['假說', '用榜單資料出、有標準答案的「猜題」（隔天公布答案），瀏覽會比「你喜歡哪一部」的偏好題高：猜題的早期回覆多，平台比較會推送；公布答案也給陌生人回來的理由。'],
  ['設計', '猜題與偏好題各 3 則，都在 20:00 發、星期幾平衡、固定同一個標籤，只差在題型。'],
  ['判定', '發文前寫好。新帳號每組只有 3 則，1.5 倍的差距分不出是不是雜訊，所以要差 3 倍以上、換題目又重現才算數。'],
  ['狀態', '進行中。第一週因為電腦睡眠漏發兩則，已補排並在紀錄中註明，不納入比較。'],
]

const impactItems: [string, string][] = [
  ['支援內部報告', '公司在節目結案報告中使用了我整理出的收視排行資料，讓單一節目的表現能放進更完整的市場脈絡中解讀。'],
  ['降低回溯成本', '將原本需要逐篇翻找 Facebook 貼文的排行資料，轉換為可依年份、月份、週次查詢的資料工具。'],
  ['提升比較能力', '透過積分制與篩選器，讓不同節目、類型與時間區間可以被放在同一套標準下比較。'],
  ['建立可維護流程', '爬蟲、轉檔、人工校正與前端展示拆成清楚步驟，每個功能先寫設計規格再實作，資料能持續更新。'],
]

const techStack = ['Python', 'Selenium', 'pytest', 'TMDB API', 'Excel', 'JSON', 'React', 'TypeScript', 'Vite', 'Recharts', 'ECharts', 'GitHub Actions']

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

/** 儀表板封面：1,935 天每天影集第 1 名的類型，連續同類型的天數合併成一段色帶 */
function DashboardCover() {
  const { span, days, runs, genres, allGenres, years } = coverData
  const x0 = 64, w = 1072, top = 300, h = 380
  const x = (day: number) => x0 + (day / span) * w
  const korean = genres.find(g => g.name === '韓劇')
  const legend = genres.slice(0, 5)
  return (
    <svg className="dashCover" viewBox="0 0 1200 900" role="img"
      aria-label={`Netflix 台灣 ${days} 天的每日第 1 名類型，韓劇拿下 ${korean?.days} 天`}>
      <rect width="1200" height="900" fill="var(--paper)" />
      <text x={x0} y="104" className="dashCoverLabel">NETFLIX 台灣・每日影集第 1 名的類型</text>
      <text x={x0 + w} y="104" textAnchor="end" className="dashCoverLabel">2021 — 2026</text>
      <text x={x0} y="192" className="dashCoverHead">{days.toLocaleString()} 天裡，</text>
      <text x={x0} y="258" className="dashCoverHead">
        <tspan fill={korean?.color}>韓劇</tspan>拿下 {korean?.days.toLocaleString()} 天第 1 名
      </text>
      {runs.map(([start, len, g]) => (
        <rect key={start} x={x(start)} y={top} width={(len / span) * w + 0.6} height={h} fill={allGenres[g].color} />
      ))}
      {years.map(y => (
        <g key={y.label}>
          <line x1={x(y.offset)} x2={x(y.offset)} y1={top + h} y2={top + h + 14} stroke="var(--ink-soft)" />
          <text x={x(y.offset) + 8} y={top + h + 46} className="dashCoverTick">{y.label}</text>
        </g>
      ))}
      {legend.map((g, i) => (
        <g key={g.name} transform={`translate(${x0 + i * 214}, 822)`}>
          <rect y="-21" width="22" height="22" fill={g.color} />
          <text x="32" className="dashCoverTick">{g.name.replace(' (日)', '')} {Math.round((g.days / days) * 100)}%</text>
        </g>
      ))}
    </svg>
  )
}

/** 粉專封面：帳號介紹圖卡與深度分析圖卡 */
function BingeCover() {
  return (
    <div className="bingeCover">
      <img src={bingeIntroCard} alt="台灣追劇研究所介紹圖卡" />
      <img src={bingeCards[0][0]} alt="深度分析圖卡：2025 年 Netflix 台灣誰最強" />
    </div>
  )
}

function WorkCover({ cover, title }: { cover: Work['cover']; title: string }) {
  if (cover === 'dashboard') return <DashboardCover />
  if (cover === 'binge') return <BingeCover />
  return <img src={taiwanBook.cover} alt={`${title} 封面`} />
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
            {works.map(work => (
              <a className="work" href={work.href} key={work.href}>
                <div className={`workImg${work.cover === 'book' ? '' : ' workImgDesign'}`}>
                  <WorkCover cover={work.cover} title={work.title} />
                </div>
                <div>
                  <p className="workMeta">{work.meta}</p>
                  <h3 className="workTitle">{work.title}</h3>
                  <p className="workDesc">{work.desc}</p>
                  <ul className="workPoints">
                    {work.points.map(point => <li key={point}>{point}</li>)}
                  </ul>
                  <span className="workMore">閱讀完整案例</span>
                </div>
              </a>
            ))}
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
  ['摘要', 'nf-tldr'],
  ['成果展示', 'nf-screens'],
  ['專案脈絡', 'nf-context'],
  ['資料管線', 'nf-pipeline'],
  ['資料品質', 'nf-quality'],
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
        <p className="lead">公司想知道自家節目在 Netflix 上表現好不好，手上卻只有它自己的名次。我把五年多的 Netflix 台灣排行整理成資料庫與互動儀表板，讓任何一部作品都能和同期、同類型的作品放在一起比較。</p>
        <div className="actions">
          <a className="btn" href={links.demo} target="_blank" rel="noreferrer">開啟 Live Demo ↗</a>
          <a className="btn ghost" href={links.github} target="_blank" rel="noreferrer">GitHub Repo ↗</a>
        </div>
        <div className="statRow">
          {stats.map(([value, label]) => (
            <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
        <dl className="factList">
          {netflixFacts.map(([term, desc]) => (
            <div key={term}><dt>{term}</dt><dd>{desc}</dd></div>
          ))}
        </dl>
      </header>

      <div className="toc" aria-label="頁面目錄">
        <div className="container tocInner">
          {netflixToc.map(([label, id]) => (
            <button key={id} type="button" onClick={() => scrollToId(id)}>{label}</button>
          ))}
        </div>
      </div>

      <section className="section" id="nf-tldr">
        <div className="container">
          <SecHead zh="三句話看懂" en="TL;DR" />
          <div className="tldr">
            {tldr.map(([label, text]) => (
              <div key={label}>
                <span className="label">{label}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="nf-screens" style={{ paddingTop: 0 }}>
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

          <h3 className="subHead">問題演進：從一張折線圖到一個資料產品</h3>
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
          <SecHead zh="資料管線" en="DATA PIPELINE" />
          <p className="lead muted" style={{ marginBottom: 48 }}>自動化蒐集與人工校正分開，所有修正都集中在轉換層，兼顧效率與資料品質。</p>
          <div className="steps">
            {pipeline.map(([no, title, desc]) => (
              <div className="step" key={title}>
                <span className="stepNo">{no}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>

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
          </div>
        </div>
      </section>

      <section className="section" id="nf-quality" style={{ paddingTop: 0 }}>
        <div className="container">
          <SecHead zh="資料品質" en="DATA QUALITY" />
          <p className="lead muted" style={{ marginBottom: 48 }}>多數錯誤都是在圖表上看起來「怪怪的」才被發現，追下去才知道問題在資料層。以下四個例子都有寫成規格文件。</p>
          <div className="quality">
            {qualityCases.map(([title, problem, solution, status]) => (
              <article className="qualityItem" key={title}>
                <div className="qualityHead">
                  <h3>{title}</h3>
                  <span className="qualityStatus">{status}</span>
                </div>
                <span className="label">發現</span>
                <p>{problem}</p>
                <span className="label">處理</span>
                <p>{solution}</p>
              </article>
            ))}
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
              <p>我負責資料來源判斷、pipeline 規劃、資料庫欄位設計、資料清理規則、儀表板需求定義、結果驗證與最終整合。我使用 Claude Code 作為 AI coding assistant 加速實作，但資料結構、分析邏輯與產品判斷由我主導；每個功能先寫設計規格、確認取捨，再進入實作。</p>
            </div>
            <div className="prose">
              <h3 style={{ marginBottom: 16 }}>使用工具</h3>
              <div className="tagRow" style={{ marginBottom: 24 }}>{techStack.map(item => <span key={item}>{item}</span>)}</div>
              <p className="muted" style={{ fontSize: 14 }}>下一步：把電影的「語言」維度更正為「產地」、改善行動版瀏覽。</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <a className="nextWork" href="#/binge-lab">
          <span className="eyebrow">延伸作品 — 同一份資料做成社群內容</span>
          <h2>台灣追劇研究所</h2>
        </a>
      </div>

      <ContactFooter />
    </main>
  )
}

/* ============================================================
   案例：台灣追劇研究所（Threads／IG 數據帳號）
   ============================================================ */

const bingeToc: [string, string][] = [
  ['摘要', 'bl-tldr'],
  ['內容規劃', 'bl-content'],
  ['產製流程', 'bl-system'],
  ['用測試了解受眾', 'bl-test'],
  ['第一週', 'bl-week1'],
]

function BingeLabCase() {
  return (
    <main>
      <Nav />
      <div className="container caseNav"><a href="#/">← 回作品集首頁</a></div>

      <header className="container caseHero">
        <span className="eyebrow">CASE STUDY · CONTENT STRATEGY · SOCIAL</span>
        <h1>台灣追劇研究所</h1>
        <p className="lead">儀表板證明了資料可以被比較，這個帳號要回答的是：資料能不能被一般觀眾看見、願意追蹤？我把同一份 Netflix 台灣排行做成 Threads 與 IG 上的數據內容，從定位、內容形式、圖卡到發文流程都由我設計。</p>
        <div className="actions">
          <a className="btn" href={links.threads} target="_blank" rel="noreferrer">前往 Threads ↗</a>
          <a className="btn ghost" href="#/netflix-dashboard">資料來源：儀表板案例</a>
        </div>
        <dl className="factList">
          {bingeFacts.map(([term, desc]) => (
            <div key={term}><dt>{term}</dt><dd>{desc}</dd></div>
          ))}
        </dl>
      </header>

      <div className="toc" aria-label="頁面目錄">
        <div className="container tocInner">
          {bingeToc.map(([label, id]) => (
            <button key={id} type="button" onClick={() => scrollToId(id)}>{label}</button>
          ))}
        </div>
      </div>

      <section className="section" id="bl-tldr">
        <div className="container">
          <SecHead zh="三句話看懂" en="TL;DR" />
          <div className="tldr">
            {bingeTldr.map(([label, text]) => (
              <div key={label}>
                <span className="label">{label}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="bl-content" style={{ paddingTop: 0 }}>
        <div className="container">
          <SecHead zh="內容規劃" en="CONTENT" />
          <p className="lead muted" style={{ marginBottom: 48 }}>定位是「用 Netflix 榜單，看台灣人在追什麼」。三種內容各有分工：一種讓人固定回來，一種建立專業形象，一種累積互動。</p>
          <div className="cardStrip">
            {bingeCards.map(([src, caption]) => (
              <figure key={src}>
                <img src={src} alt={caption} loading="lazy" />
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="steps" style={{ marginTop: 64 }}>
            {bingeFormats.map(([title, role, desc]) => (
              <div className="step" key={title}>
                <span className="stepNo">{role}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="bl-system" style={{ paddingTop: 0 }}>
        <div className="container">
          <SecHead zh="產製流程" en="PRODUCTION" />
          <div className="steps">
            {bingeSystem.map(([no, title, desc]) => (
              <div className="step" key={title}>
                <span className="stepNo">{no}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="bl-test" style={{ paddingTop: 0 }}>
        <div className="container">
          <SecHead zh="用測試了解受眾" en="EXPERIMENTS" />
          <p className="lead muted" style={{ marginBottom: 48 }}>新帳號最容易犯的錯，是看到一篇數字好就以為找到方法。所以每篇貼文發出前，先寫好它要驗證什麼、怎麼算成功。以下是目前進行中的一組測試。</p>
          <div className="experiment">
            <h3>猜題 vs. 偏好題：哪一種投票能帶來更多瀏覽？</h3>
            <dl className="factList">
              {bingeExperiment.map(([term, desc]) => (
                <div key={term}><dt>{term}</dt><dd>{desc}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section" id="bl-week1" style={{ paddingTop: 0 }}>
        <div className="container">
          <SecHead zh="開站第一週" en="WEEK ONE" />
          <div className="proseGrid">
            <div className="prose">
              <h3 style={{ marginBottom: 16 }}>觀察</h3>
              <p>瀏覽最高的是置頂說明（2,418）和年度分析（1,046），之後的貼文多落在 100–700。前兩天的高數字比較可能來自新帳號推送與親友分享，不一定代表內容本身好，所以目前只記方向、不下結論。讀者留言集中在台灣作品的處境（例如投票選項沒有台劇），這一點列為下一個待驗證的假說。</p>
            </div>
            <div className="prose">
              <h3 style={{ marginBottom: 16 }}>下一步</h3>
              <p>資料型內容在 Threads 很難引發留言，所以不改帳號定位，而是增加被推薦給陌生人的機會：用腳本產生短影音（例如週榜冠軍的排名賽跑動畫）、在新片登上第 1 名時發「這部劇的數字」，以及讓腳本每天產生草稿、我每週整批審核，增加發文數。</p>
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
  if (route === 'binge-lab') return <BingeLabCase />
  return <PortfolioHome />
}

export default App
