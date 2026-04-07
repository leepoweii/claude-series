# 教師版 — Claude CoWork Project 設定

> 開錄影前，在 Claude Desktop 建立一個新的 CoWork Project，按以下步驟設定。

---

## Step 1：建立 Project

1. 打開 Claude Desktop
2. 建立新 Project，名稱：**半畝咖啡 — AI 協作營運**
3. 描述：`金門金城鎮的簡餐咖啡廳，用 AI 協助行銷企劃與財務對帳`

## Step 2：載入 Context

把以下檔案拖進 Project Knowledge：

- `data/半畝咖啡-品牌故事.md` — 品牌故事、基本資訊、定位、課題
- `data/半畝咖啡-供應商.md` — 兩家廠商聯絡資訊
- `data/半畝咖啡-菜單.csv` — 飲品＋輕食＋甜點（含價格）
- `data/半畝咖啡-月營運數據.csv` — 營收、客單價、來客數、成本率
- `data/半畝咖啡-活動紀錄.csv` — 2025–2026 歷次活動與成效
- `data/半畝咖啡-交貨記錄-島嶼咖啡供應-202609.csv` — 廠商 A 9 月進貨明細
- `data/半畝咖啡-交貨記錄-金良食品行-202609.csv` — 廠商 B 9 月進貨明細

> ⚠️ **不要** 載入對帳單 PDF！對帳單是第三章從 Gmail 撈的。

## Step 3：連接 Connectors

- Google Drive ✅
- Gmail ✅
- Canva ✅

## Step 4：寄出對帳單 A

1. 用你自己的 email 寄到你的 Gmail
2. 發件人名稱改成「島嶼咖啡供應」
3. 主旨：`【島嶼咖啡供應】2026年9月對帳單`
4. 附件：`對帳單A-島嶼咖啡供應-202609.pdf`

> 對帳單 B 在第四章課中即時寄出。

---

## 錄影時的流程腳本

### 第一章（15 min）— 觀念 Demo

1. **先開一個普通 Chat**，問：「幫我想一個國慶連假的快閃活動」
   - AI 會給通用答案
2. **切到 CoWork Project**，問同一句話
   - AI 會根據半畝咖啡的菜單、客群、地點來回答
3. **口述重點**：Context 就是 AI 的工作記憶，餵什麼就用什麼

### 第二章（50 min）— 行銷企劃

1. 跟 AI 討論「雙十國慶連假快閃活動」
2. 請 AI 查天氣、金門在地活動（示範搜尋能力）
3. 請 AI 整理出：企劃書 + 時程表 + 宣傳文案 + 物資清單
4. **Session Handoff**：請 AI 產出 Session Notes + Handoff Prompt
5. **關掉對話，開新對話**，貼 Handoff Prompt
6. 上傳企劃到 Google Docs
7. 用 Canva 設計 IG 貼文

### 休息（5 min）

### 第三章（25 min）— 對帳

1. 「幫我從 Gmail 找島嶼咖啡供應寄來的對帳單」
2. AI 用 Gmail Connector 撈出 PDF
3. 「比對對帳單跟我們的交貨記錄，有沒有出入？」
4. AI 找出差異（答案見講師筆記）
5. 討論差異

### 第四章（20 min）— Skills

1. 「把剛才的對帳流程變成一個 Skill」
2. AI 建立 Slash Command
3. **此時寄出對帳單 B**（從另一個視窗寄）
4. 用 Skill 一鍵對帳 B
5. 對比第一次手動 vs 第二次自動

### 收尾（10 min）

回顧四個能力 → Q&A
