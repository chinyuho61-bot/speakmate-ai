# SpeakMate — 教學例句配音清單

呢 25 句係全部 12 個章節嘅英文 model sentence（跟返 [shared/scenarios.ts](../shared/scenarios.ts)）。

## 檔案擺放規則（每個導師一個資料夾）

而家 app 支援多過一個導師（Riley、Marcus、Echo、Nicky、Mia……），每個導師要有
自己把聲，所以錄音檔案要擺喺 **各自嘅資料夾**，唔可以再全部擺喺
`client/public/audio/` 最外層：

```
client/public/audio/
  riley/   ← Riley（女聲）—— 已完成
  marcus/  ← Marcus（男聲）—— 已完成
  echo/    ← Echo（機械人／AI 女聲）—— 已完成
  nicky/   ← Nicky（華人男聲）—— 已完成
  mia/     ← Mia（華人女聲）—— 已完成
```

檔名本身唔使變，一定要同下面「檔名」欄一模一樣（包括兩條底線 `--`），淨係擺嘅
資料夾唔同。

- **格式**：MP3（WAV 都得），mono 或 stereo 皆可，建議 128kbps 或以上
- **內容**：淨係讀返「文字」欄嗰句英文，唔使讀標點符號或者任何額外嘢
- 邊個導師嘅檔案未錄好，app 會自動 fallback 用返電腦/手機內建語音讀成句，唔會爛

## Riley（女聲）—— 已完成，唔使再錄

25 個檔案已經喺 `client/public/audio/riley/`。

> ⚠️ 得返 `riley/introduce-yourself--identity-job--t2--0.mp3` 呢一個檔案對唔返
> 文字（句子由「tech company」改咗做「marketing agency」），暫時冇呢個檔案，
> 會自動 fallback 用電腦語音讀，如果想補返靚聲可以重錄呢一句：
> **I work at a marketing agency downtown.**

## Marcus（男聲）—— 已完成，唔使再錄

25 個檔案已經喺 `client/public/audio/marcus/`（含拆錄嗰 4 句）。

## Echo（機械人／AI 女聲）—— 已完成，唔使再錄

25 個檔案已經喺 `client/public/audio/echo/`（含拆錄嗰 4 句）。

## Nicky（華人男聲）—— 已完成，唔使再錄

25 個檔案已經喺 `client/public/audio/nicky/`（含拆錄嗰 4 句）。

## Mia（華人女聲）—— 已完成，唔使再錄

25 個檔案已經喺 `client/public/audio/mia/`（含拆錄嗰 4 句）。

## 代入用戶自己個名嘅兩句，要拆錄（每個導師 4 個檔案）

呢兩句（#1、#13）而家會代入用戶自己打嘅名（例如 Alice、Chin Yu），唔再係固定嘅
「Wei Ling」。因為錄音檔淨係識讀返固定嘅字，冇辦法讀用戶隨便打嘅名，所以呢兩句
改咗玩法：**前半句用真人聲，中間個名用手機/電腦內建語音讀，後半句again用返真人
聲** ——咁樣淨係個名嗰一兩個字先會聽落唔同聲，其餘成句都仲係真人聲，唔會成句都
變成機械聲。

Riley、Marcus、Echo、Nicky、Mia 呢 5 個導師嘅拼接句都已經全部錄好，全部唔使再錄。

錄音要求（畀之後新增導師參考）：
- 讀到「Hi, I'm」／「I'm」呢個位嗰陣，聲線要自然噉「懸空」喺度（好似後面仲有嘢
  講緊噉），唔好讀到好似個句完咗嘅語氣
- 尾句開頭嗰個逗號唔使讀出嚟，但錄嗰陣個語氣要當自己接緊喺一個名之後（即係類似
  「……[個名], and I've been working...」噉嘅接續感）

## 檔名規則（畀你自己對照，唔使背）

`{tutorId}/{scenarioId}--{chapterId}--{turnId}--{modelIndex}.mp3`

- `tutorId` 即係 `riley`、`marcus`、`echo`、`nicky` 或者 `mia`
- `scenarioId`／`chapterId`／`turnId` 對應返 `shared/scenarios.ts` 入面嗰個章節嘅 id
- `modelIndex` 係嗰個回合入面第幾句 model sentence，由 0 開始數（得 #15、#16 呢兩句係同一個回合嘅兩句，所以先會見到 `t1--0` 同 `t1--1`）

錄完之後可以打包成一個 zip 或者逐個交返俾我，我會擺入 `client/public/audio/{tutorId}/` 再接返落個 app。
