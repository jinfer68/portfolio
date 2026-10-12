"""
make_dashboard_cover.py
產生首頁儀表板封面的資料（src/coverData.ts）：每天 Netflix 台灣影集第 1 名的類型。

  python3 scripts/make_dashboard_cover.py [rankings.json 路徑或網址]

預設讀公開儀表板的線上資料。連續同類型的天數合併成一段，前端畫成色帶。
"""
import json
import sys
import urllib.request
from collections import Counter
from datetime import date
from pathlib import Path

SRC = sys.argv[1] if len(sys.argv) > 1 else "https://jinfer68.github.io/netflix-taiwan-dashboard/data/rankings.json"
OUT = Path(__file__).resolve().parent.parent / "src" / "coverData.ts"
# 與儀表板 src/constants/genres.ts 相同的類型色與固定順序
GENRES = [("韓劇", "#b3302b"), ("台劇", "#1f6f3f"), ("陸劇", "#b07d10"), ("動畫劇 (日)", "#7b5cb8"),
          ("實境秀", "#c67612"), ("美劇", "#3568b0"), ("日劇", "#c4527e"), ("英劇", "#0d9488"), ("其他", "#9a9a94")]
INDEX = {g: i for i, (g, _) in enumerate(GENRES)}


def load(src: str) -> dict:
    if src.startswith("http"):
        with urllib.request.urlopen(src) as r:
            return json.load(r)
    return json.loads(Path(src).read_text(encoding="utf-8"))


def main() -> None:
    d = load(SRC)
    attrs = d["dailyAttributes"]
    first = date.fromisoformat(d["dailyBoard"][0]["date"])
    last = date.fromisoformat(d["dailyBoard"][-1]["date"])
    by_day = {}
    for b in d["dailyBoard"]:
        top = next((e for e in b["entries"] if e["rank"] == 1), None)
        if top:
            by_day[(date.fromisoformat(b["date"]) - first).days] = INDEX.get(attrs.get(top["title"], {}).get("genre"), INDEX["其他"])

    runs = []   # [起始天, 天數, 類型序號]
    for day in sorted(by_day):
        g = by_day[day]
        if runs and runs[-1][0] + runs[-1][1] == day and runs[-1][2] == g:
            runs[-1][1] += 1
        else:
            runs.append([day, 1, g])

    counts = Counter(by_day.values())
    span = (last - first).days + 1
    years = [{"label": str(y), "offset": (date(y, 1, 1) - first).days}
             for y in range(first.year + 1, last.year + 1)]
    data = {
        "first": first.isoformat(), "last": last.isoformat(), "span": span, "days": len(by_day),
        "genres": [{"name": g, "color": c, "days": counts.get(i, 0)} for i, (g, c) in enumerate(GENRES) if counts.get(i)],
        "allGenres": [{"name": g, "color": c} for g, c in GENRES],
        "years": years, "runs": runs,
    }
    OUT.write_text(
        "// 由 scripts/make_dashboard_cover.py 產生，請勿手動編輯\n"
        f"// 資料：{SRC}（{first} ～ {last}）\n"
        f"export const coverData = {json.dumps(data, ensure_ascii=False, separators=(',', ':'))} as const\n",
        encoding="utf-8")
    print(f"{OUT.name}：{len(by_day)} 天、{len(runs)} 段；" +
          "、".join(f"{g['name']} {g['days']}" for g in data["genres"]))


if __name__ == "__main__":
    main()
