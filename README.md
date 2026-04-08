# Claude 系列教學

> 給自己開店、行銷帳務要自己來的人。
> 學會用 Claude 做日常工作，不需要懂技術。

YouTube 系列教學的配套素材 repo。每一集對應一個資料夾，裡面有講師腳本、學員教材、Demo 素材。

---

## 系列架構

| 系列 | 主題 | 對象 |
|---|---|---|
| **Ep 0** | 名詞解釋 | 所有人必看 |
| **Series 1** | Claude Chat | 完全沒用過 Claude |
| **Series 2** | Claude CoWork | 有事業體，需要行銷/帳務 |
| **Series 3** | Claude Dispatch | 人在外頭也能遠端操作 |
| **Series 4（Layer 1-2）** | Claude Code 創作 + 進階 | 想要更強功能，不寫程式 |
| **Series 4（Layer 3）** | Claude Code 技術 | 想學架構與開發 |

---

## 開始使用

### 環境需求

- [asdf](https://asdf-vm.com/) — 版本管理
- [uv](https://docs.astral.sh/uv/) — Python 套件管理

### 安裝

```bash
git clone https://github.com/leepoweii/claude-series.git
cd claude-series

# 安裝 Node.js（via asdf）
asdf install

# 安裝 Python 環境（via uv）
uv sync

# 安裝 Remotion 專案（Series 4 用）
cd assets/cowork-intro
npm install
```

---

## 資料夾結構

```
ep0-terms/            Ep 0：名詞解釋
s1-chat/              Series 1：Claude Chat
  1-1-interface-connector/  介面導覽 + Google Calendar Connector
  1-2-artifact/             資料分析 + Artifact 互動圖表
s2-cowork/            Series 2：Claude CoWork
  2-1-context/          Project + Context
  2-2-skills/           Skill 設定
  2-3-browser/          Chrome 瀏覽器整合
  context/              半畝咖啡品牌素材（教學用虛構品牌）
  invoices/             廠商對帳單 PDF
s3-dispatch/          Series 3：Claude Dispatch
  3-1-email/            遠端寄信
  3-2-form/             遠端填 Google Form
  3-3-research/         非同步 Research Skill
assets/               共用素材
  cowork-intro/         Remotion 介紹影片專案
docs/                 課程文件（架構、講師筆記）
```

---

## 教學品牌：半畝咖啡

Series 2-3 使用虛構品牌「半畝咖啡」作為教學案例。

> 金門金城鎮的日常咖啡廳，老闆阿凱從台北連鎖餐飲回鄉創業。
> 素材包含：品牌故事、菜單、月營運數據、供應商資訊、廠商對帳單。

所有人名、電話、地址均為虛構，僅供教學用途。

---

## 授權

教學素材採 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) 授權。
非商業用途可自由使用，請註明出處。
