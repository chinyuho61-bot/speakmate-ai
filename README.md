# SpeakMate AI

獨立、可自行上架嘅 SpeakMate 情境對話練口語 App。呢個 repo 同 `speakmate-ai-extracted`（舊版，綁死喺 Manus 平台）完全獨立，冇任何第三方平台依賴 —— 得你自己嘅 Node server 同 SQLite 資料庫。

UI／UX 跟返 `Broadsheet/design_handoff_broadsheet` 嘅 SpeakMate 設計交接（token、狀態機、文案）實作。

## 呢個 MVP 包含咩

- Email + 密碼登入／註冊（JWT，密碼用 `scrypt` hash，唔靠任何外部 auth 服務）
- 5 個情境（自我介紹、餐廳點餐、求職面試、工作會議、旅行問路），共 12 個章節，每章 2 個回合
- 完整教學狀態機：問問題 → 你用廣東話答（撳字或撳咪） → Riley 確認明白 → Riley 教英文例句（大字 + 意思 + 用法 + 朗讀） → 完成章節
- 語音輸入／輸出用瀏覽器內建 Web Speech API（`SpeechRecognition` + `speechSynthesis`），**唔需要任何 AI API key**，$0 成本
- 情境／章節逐步解鎖、連續學習天數、自動保存學過嘅句子 —— 全部由真實資料庫記錄計算
- PWA：可以「加到主畫面」，離線 shell 快取

## 未包含（下個階段）

自由對話（真正 AI 對話）、SOS 句庫、文法課、Onboarding、訂閱／PRO —— 依家嘅 12 章內容純粹靠劇本驅動，冇連 LLM。想加自由對話，可以喺 `server/routes/` 加一個新 route，用 `OPENAI_API_KEY`（或者你揀嘅供應商）call chat completion，前端用返 `client/src/lib/speech.ts` 嘅 STT/TTS 就得。

## 開發

```bash
npm install
cp .env.example .env
npm run dev
```

呢個會同時起 API server（`:8787`）同 Vite dev server（`:5173`，proxy `/api` 去 8787）。開 http://localhost:5173 。

型別檢查：

```bash
npm run check
```

## 部署（build 成一個 server 就得）

```bash
npm run build   # vite build 前端 + tsc compile server
NODE_ENV=production JWT_SECRET=<真正random string> npm run start
```

`npm start` 會用同一個 port 出前端靜態檔同 API —— 淨係需要一部有 Node 24+ 嘅機器（用 Node 內建 `node:sqlite`，唔使裝任何原生編譯工具），部去 Railway／Render／Fly.io／自己 VPS 都得。記住幫 `DB_PATH` 指去一個有持久化嘅 volume，唔係 restart 就冚咗啲用戶資料。

## PWA 已經做咗（手機瀏覽器 →「加到主畫面」）

Build 完之後，喺手機 Safari／Chrome 打開個網址，揀「加入主畫面」，就有齊全螢幕、有 icon 嘅 app 體驗，唔使上架都用得。

## 想上 App Store／Google Play（原生包裝）

用 [Capacitor](https://capacitorjs.com/) 將已經 build 好嘅 `dist/public` 包做原生 shell：

```bash
npm i -D @capacitor/core @capacitor/cli
npx cap init "SpeakMate AI" "com.yourcompany.speakmate" --web-dir=dist/public
npm i @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npm run build
npx cap sync
npx cap open ios      # 需要 Mac + Xcode，先可以 submit 去 App Store（Apple Developer 帳號 $99/年）
npx cap open android  # 需要 Android Studio，先可以 submit 去 Google Play（一次性 $25）
```

呢步要喺有 Xcode／Android Studio 嘅機器度做，呢個環境冇裝呢啲，所以冇幫你行呢步 —— 但代碼結構（`dist/public` 係純靜態輸出）已經即插即用。

## 資料庫

用 Node 24 內建嘅 `node:sqlite`（`server/db.ts`），冇任何原生編譯依賴，Windows／Mac／Linux 都直接用得。檔案存喺 `DB_PATH`（預設 `./data/speakmate.sqlite`）。

## 對比原本 reference app 簡化咗嘅地方

- 首頁路線圖解鎖：MVP 用「順序解鎖」（完成上一個情境先解鎖下一個），冇做原設計 A2/A3 嗰種「完成愈多、解鎖埋下下個」嘅前瞻邏輯。
- 章節內回合位置冇持久化 —— 離開再入返會由第一回合開始（章節本身好短，2 個回合，影響有限）。
- 桌面版用返同手機一樣嘅單欄置中版面（max-width 480px），冇做原設計嗰個桌面雙欄課室版面。
