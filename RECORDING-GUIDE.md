# 錄影指南 — Claude 系列教學

> 從零到完成 11 集教學的完整指引。
> 按順序做就好。每一段都打勾，不要跳。

---

## 目錄

1. [課程結構速覽](#1-課程結構速覽)
2. [一次性準備（錄影前 1–2 天）](#2-一次性準備錄影前-12-天)
3. [建議錄影順序](#3-建議錄影順序)
4. [每集快速指引](#4-每集快速指引)
5. [錄影中通用守則](#5-錄影中通用守則)
6. [錄影後流程](#6-錄影後流程)

---

## 1. 課程結構速覽

| 系列 | 集數 | 名稱 | 時長 |
|---|---|---|---|
| Ep 0 | 1 | 名詞解釋 | 10 min |
| Series 1 — Chat | 2 | 1-1 介面 / 1-2 Artifact | 各 10 min |
| Series 2 — CoWork | 4 | 2-1 Project / 2-2 Context / 2-3 Skills / 2-4 Chrome | 各 10 min |
| Series 3 — Dispatch | 3 | 3-1 對帳 / 3-2 表單 / 3-3 草稿 | 各 10 min |
| Series 4 — Scheduled | 1 | 4-1 每日系統 | 10 min |

**總長：約 110 分鐘 = 11 集 × 10 min**

---

## 2. 一次性準備（錄影前 1–2 天）

### 2.1 帳號 + 軟體

- [ ] **Claude Pro 訂閱**（必須，免費版不行）
- [ ] **Claude Desktop App** 已安裝（CoWork 必需）
- [ ] **Claude iOS App** 已安裝、已登入同一帳號（Series 3 Dispatch 用）
- [ ] **Chrome 瀏覽器** + **Claude Chrome Extension** 已安裝（2-4 用）
- [ ] **Canva 帳號**（2-2 連 Connector 用，免費版即可）
- [ ] **Google 帳號** 兩個：
  - 主帳號：你日常用的，當「自己」
  - 副帳號：拿來偽裝廠商寄信給自己（島嶼咖啡供應、金良食品行、金門旅遊週刊）

### 2.2 確認 Claude 功能可用

- [ ] 開 Claude Desktop → 試試 `/schedule` 指令是否可用
  - 如果你的帳號還沒開通 Scheduled（Research Preview）→ **4-1 集要延後錄**
  - 其他 10 集不受影響，可以照錄

### 2.3 從 GitHub clone 課程素材

```bash
cd ~/Desktop
git clone https://github.com/leepoweii/claude-series.git
```

或是直接下載 ZIP 解壓到桌面。

### 2.4 桌面建立 Project Folder

```
桌面 → 新增資料夾「半畝咖啡」
```

從 `claude-series/s2-cowork/context/` 複製這 5 個檔案進去：
- [ ] 半畝咖啡-品牌故事.md
- [ ] 半畝咖啡-菜單.csv
- [ ] 半畝咖啡-月營運數據.csv
- [ ] 半畝咖啡-活動紀錄.csv
- [ ] 半畝咖啡-供應商.md

> ⚠️ **不要**把對帳單 PDF 放進這個資料夾——對帳單要透過 Gmail 來，才有真實感。
> 兩份「交貨記錄 CSV」也先不放，2-3 集臨場再加。

### 2.5 1-2 集的 CSV 下載到桌面

從 `claude-series/s1-chat/1-2-artifact/data/` 複製這兩份到桌面（不是放進半畝咖啡資料夾）：
- [ ] 餐飲業登記.csv
- [ ] 家庭收支.csv

### 2.6 Email 偽裝寄件（最重要的一步）

**目的：** 讓 Demo 中 AI 從 Gmail 讀到的信件看起來真的是廠商/媒體寄來的。

**做法：** 用副帳號改顯示名稱，寄信給主帳號。

#### 信件 1：對帳單 A — 給 2-3 用
- [ ] 副帳號改顯示名稱為「島嶼咖啡供應」
- [ ] 主旨：`【島嶼咖啡供應】2026 年 9 月對帳單`
- [ ] 內容：
  ```
  半畝咖啡 您好，

  附上 2026 年 9 月對帳單，請於 11/03 前完成核對。
  如有疑問請聯繫業務 張志豪 082-325-678。

  島嶼咖啡供應有限公司
  ```
- [ ] 附件：`s2-cowork/context/對帳單A-島嶼咖啡供應-202609.pdf`
- [ ] 寄出後在主帳號 Gmail 確認有收到

#### 信件 2：對帳單 B — 給 2-3 後半段用
- [ ] 副帳號改顯示名稱為「金良食品行」
- [ ] 主旨：`【金良食品行】2026 年 9 月對帳單`
- [ ] 內容類似上面，附 `對帳單B-金良食品行-202609.pdf`
- [ ] **先不要寄**，準備好放在 draft，2-3 第二段示範時再臨場寄出（製造臨場感）

#### 信件 3：媒體訪綱 — 給 3-3 用
- [ ] 副帳號改顯示名稱為「金門旅遊週刊 編輯部」
- [ ] 主旨：`【採訪邀請】金門特色店家系列專訪 — 半畝咖啡`
- [ ] 把 `s3-dispatch/3-3-draft/訪綱-金門旅遊週刊-202509.md` 內容貼進信件本文，或轉成 PDF 當附件
- [ ] 寄出後在主帳號 Gmail 確認有收到

### 2.7 Google Form 確認可填

- [ ] 開啟 `s3-dispatch/3-2-form/form-url.md`，複製填寫連結
- [ ] 在瀏覽器打開，確認表單可以正常顯示
- [ ] 不要先填——錄 3-2 時讓 AI 來填

### 2.8 螢幕錄製工具

- [ ] OBS（或你習慣的工具）已安裝
- [ ] 解析度 1920×1080
- [ ] 試錄 10 秒，畫面 + 麥克風都正常
- [ ] 硬碟空間 > 20 GB（11 集會佔不少）
- [ ] 設定錄影格式 mkv（比 mp4 安全，當機不會整段壞）

### 2.9 錄影環境

- [ ] 關掉所有通知（macOS：勿擾模式）
- [ ] 關掉 Slack / Discord / Telegram
- [ ] 桌面整理乾淨（會被錄到）
- [ ] Chrome 只留乾淨的 Tab
- [ ] 隱藏 Dock 上不相關的 App 圖示
- [ ] 瀏覽器歷史記錄會在網址列出現 → 開無痕視窗錄

### 2.10 Connector 授權

在 Claude Desktop CoWork 內：
- [ ] Gmail Connector → Connect → OAuth 授權（用主帳號）
- [ ] Google Calendar Connector → Connect → OAuth
- [ ] Google Drive Connector → Connect → OAuth
- [ ] Canva Connector → **不要先連**，2-2 集臨場連給觀眾看

---

## 3. 建議錄影順序

```
Day 1（建議）
└── Ep 0 → 1-1 → 1-2          ← 從零開始的觀眾入口

Day 2
└── 2-1 → 2-2 → 2-3 → 2-4      ← Series 2 一次錄完，狀態連貫

Day 3
└── 3-1 → 3-2 → 3-3            ← Dispatch 一次錄完
└── 4-1                         ← 如果 Scheduled 帳號沒開通，跳過
```

### 為什麼這個順序

- **Series 2 必須一次錄完**：2-1 建好的 Local Folder Project 要延續到 2-2、2-3、2-4，中間斷掉狀態會跑掉
- **Series 3 可以一次錄完**：iPhone 鏡像的設定調好了不要再拆
- **Ep 0 / 1-1 / 1-2 可以分開錄**：彼此沒有狀態依賴
- **4-1 最後**：因為要示範「跑了一天後」的結果，需要前面 Series 2 的 Project 已經有東西

---

## 4. 每集快速指引

### Ep 0 — 名詞解釋
- **課綱：** `ep0-terms/課綱.md`
- **準備：** 無（純概念）
- **重點：** PPTX 圖示輔助講解，不要純口白
- **不要忘：** Markdown 那段要強調「Claude 寫東西的格式」

---

### 1-1 — Claude 介面 + Connector
- **課綱：** `s1-chat/1-1-interface-connector/課綱.md`
- **準備：** Google 帳號
- **Demo：** 連 Google Calendar Connector
- **不要忘：** Desktop Extensions 介紹（不實作）

---

### 1-2 — 資料分析 + Artifact
- **課綱：** `s1-chat/1-2-artifact/課綱.md`
- **準備：** 桌面已有兩份 CSV（餐飲業登記、家庭收支）
- **Demo：** 上傳 CSV → AI 萃取縣市 → 跨資料分析 → Artifact 散佈圖 → 分享連結
- **亮點：** Artifact 互動 + 不用 Excel 的對比

---

### 2-1 Project — Local Folder Project
- **課綱：** `s2-cowork/2-1-context/課綱.md`
- **準備：** 桌面已有「半畝咖啡」資料夾，內含 5 份 Context
- **Demo：** 介面導覽 → CoWork 指定 folder → 驗證讀檔 → **分割畫面對比 Demo**（左 Chat / 右 CoWork with Context）
- **錄製注意：** 對比 Demo 要分割畫面，左半 claude.ai、右半 Claude Desktop
- **沉默 3–5 秒**：兩邊跑完不要急著說話

---

### 2-2 Context — 完整 Prompt + Canva
- **課綱：** `s2-cowork/2-2-skills/課綱.md`
- **準備：** 2-1 的 Project 持續開著
- **Demo：** 趨勢新聞 → 完整 prompt 做企劃 → 連接 Canva Connector → 完整 prompt 做海報
- **錄製注意：**
  - 用**完整、結構化**的 prompt（不要 zero-shot 短句）
  - Canva Connector 臨場連，給觀眾看流程
  - 結尾鋪 2-3：「你有沒有發現，每次都要寫這麼多」

---

### 2-3 Skills — 對帳自動化
- **課綱：** `s2-cowork/2-3-browser/課綱.md`
- **準備：**
  - Gmail 已收到對帳單 A 信件（島嶼咖啡供應）
  - 對帳單 B 信件 draft 待寄
  - 把兩份「交貨記錄 CSV」加入半畝咖啡資料夾
- **Demo：**
  1. Gmail Connector 找對帳單 A → 讀 PDF
  2. 比對 Project 裡的交貨記錄 → 找出差異
  3. 用 Skills Generator 把流程存成 Skill
  4. 臨場寄對帳單 B → 用 `/廠商對帳` 一鍵跑
- **錄製注意：** 第一段刻意慢慢寫 prompt，第二段一鍵觸發，對比要明顯

---

### 2-4 Chrome — 讀取瀏覽器頁面
- **課綱：** `s2-cowork/2-4-chrome/課綱.md`
- **準備：** Chrome Extension 已安裝、`s2-cowork/2-4-chrome/pos-demo.html` 用 Chrome 開好
- **Demo：** Chrome 讀頁面 → 整理銷售資料 → 產出 CSV 日報
- **講師提醒：** 強調「不是 OCR，是讀文字結構」

---

### 3-1 — Dispatch 對帳
- **課綱：** `s3-dispatch/3-1-invoice/課綱.md`
- **準備：**
  - iPhone 鏡像同步到 Mac（AirPlay 或 USB）
  - 螢幕分割：左半 Mac / 右半 iPhone
  - Claude Desktop 開著（CoWork 待命）
  - 對帳 Skill（從 2-3 建的）已存在
- **Demo：** iPhone Dispatch 一句話 → 桌面 CoWork 跑對帳 → 結果回報

---

### 3-2 — Dispatch 填表單
- **課綱：** `s3-dispatch/3-2-form/課綱.md`
- **準備：** Google Form 連結（在 form-url.md）
- **Demo：** Dispatch 給連結 → AI 從 Context 填表 → 不確定的問你 → 提交前確認

---

### 3-3 — Dispatch 準備草稿
- **課綱：** `s3-dispatch/3-3-draft/課綱.md`
- **準備：** Gmail 已收到訪綱信件（金門旅遊週刊）
- **Demo：** Dispatch 一句話 → CoWork 讀 Gmail 訪綱 → 用 Context 寫草稿 → 存 Word 到桌面
- **錄製注意：** 模擬「出門前下指令、回家看結果」

---

### 4-1 — Scheduled 每日系統
- **課綱：** `s4-scheduled/4-1-daily/課綱.md`
- **前置：** 你的帳號要有 `/schedule` 指令
- **Demo：** 設定早上晨報排程 + 晚上 Closedown 排程 → 示範「跑過一天後」的結果
- **講師備忘：** 預先準備一個「已跑過一天」狀態的 Project 作示範

---

## 5. 錄影中通用守則

### 講話節奏
- 慢一點，比平常慢 20%
- 重點句子停半秒再講下一句
- 別講「呃」「然後」這種口頭禪——卡住就停 3 秒重來，後製剪掉

### Demo 節奏
- AI 回答中時，**閉嘴**讓觀眾看畫面
- 不要邊跑邊解釋（觀眾跟不上）
- 結果出來後，停 2 秒，再開始講

### 出錯怎麼辦
- AI 給出爛答案 → 別假裝沒事，直接說「他這次答得不好，我換個 prompt」
- 真的卡住 → 停止錄影、解決、重錄該段（章節邊界處最好切）

### 章節邊界
- 每集開頭口述：「Ep X — [集名]」（後製好找）
- 每集結尾停 3 秒（後製留白）

---

## 6. 錄影後流程

### 立即（錄完當天）
- [ ] 確認檔案完整、可以播放
- [ ] 備份到外接硬碟或 Google Drive
- [ ] 寫 5 行筆記：哪幾段需要重錄 / 講錯什麼 / 哪邊想到要補充

### 後製
- [ ] 每集獨立剪輯，不要 11 集綁一起
- [ ] 加章節點（特別是 10 分鐘的長集數）
- [ ] 標題卡 + 結尾預告卡
- [ ] 字幕（中文字幕，提升 SEO 和無聲觀看率）

### 上傳前 Checklist
- [ ] 標題從課綱的 YouTube Meta 拿（A/B 都試試）
- [ ] Description 從課綱貼，補上時間軸
- [ ] Tags 從課綱貼
- [ ] 縮圖統一風格（建議建立模板）
- [ ] 連結到 GitHub repo
- [ ] 加到 playlist「Claude 系列教學」

---

## 預估總時間

| 階段 | 時間 |
|---|---|
| 一次性準備（2.x） | 1.5 hr |
| 錄影 11 集（含 NG 重錄） | 6–8 hr |
| 後製 + 上傳 | 8–12 hr |
| **合計** | **約 16–22 hr，建議分 3–5 天完成** |

---

## 緊急 FAQ

**Q: 錄到一半 Connector 斷線怎麼辦？**
A: 重新授權，那段重錄。後製時剪掉斷線片段。

**Q: AI 回答得不像我準備的範本？**
A: 別硬要照範本講。直接根據實際結果發揮，這樣更真實。Context 給的對，AI 答的差不會差太多。

**Q: 半畝咖啡的資料學員問起怎麼辦？**
A: 直接說「這是虛構品牌，給課程示範用。GitHub 上有完整資料和自建 Context 的 prompt，你可以照著做你自己公司的版本。」

**Q: Scheduled 功能我帳號沒開通？**
A: 跳過 4-1，先錄前 10 集。Series 4 等帳號開通再補錄。

---

**最後提醒：** 完美主義會殺死進度。第一集講不順？無所謂，後面會越錄越順。觀眾不會記得你哪個字講錯，他們會記得你教會了他們什麼。

開錄吧。
