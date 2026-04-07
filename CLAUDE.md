# CLAUDE.md — claude-series 課程 repo

## 這個 repo 是什麼

YouTube 系列教學素材管理 repo。不是應用程式，是課程內容。

---

## 資料夾用途

| 資料夾 | 用途 |
|---|---|
| `ep0-terms/` | Ep 0 名詞解釋素材 |
| `s1-chat/` | Series 1 Claude Chat 教材 |
| `s2-cowork/` | Series 2 Claude CoWork 教材 |
| `s2-cowork/context/` | 半畝咖啡品牌素材（CSV、MD）|
| `s2-cowork/invoices/` | 廠商對帳單 PDF |
| `s3-dispatch/` | Series 3 Claude Dispatch 教材 |
| `assets/cowork-intro/` | Remotion 介紹影片專案 |
| `docs/` | 課程架構文件、講師筆記 |

---

## 環境

- **Node.js**：由 asdf 管理，版本見 `.tool-versions`
- **Python**：由 uv 管理，版本見 `pyproject.toml`（>=3.12）
- **Remotion**：在 `assets/cowork-intro/` 內，需 `npm install`

---

## 教材慣例

- 每一集對應一個子資料夾（例如 `s2-cowork/2-1-context/`）
- 每個子資料夾放：`腳本.md`、`學員講義.md`、對應素材
- 講師專用檔案命名加上 `teacher-` 前綴（例如 `teacher-notes.md`）
- 素材用中文命名，腳本/講義可以中文或英文

---

## 半畝咖啡（虛構教學品牌）

Series 2-3 的教學案例品牌，所有資料在 `s2-cowork/context/`。

**刻意埋入的對帳差異（講師專用）：**

廠商 A（島嶼咖啡供應）：
- 9/10 耶加雪菲：對帳單寫 6 包，內部記錄只有 5 包（多報 $850）
- 9/27 多一筆「濾掛包隨行組 50 盒」從未訂購（多報 $3,250）
- 總差異：$4,100

廠商 B（金良食品行）：
- 9/8 無鹽奶油單價：對帳單 $185，約定 $165（多收 $160）
- 9/10 多一筆「雞腿排 5 包」內部無此送貨記錄（多報 $1,600）
- 總差異：$2,220

---

## 工作原則

- 研究完先呈現結果確認，不直接動手實作
- 新增教材優先放在對應的集數子資料夾
- commit message 用中文描述改動的教材內容
