# SpeakMate — 廣東話旁白配音清單

呢份清單包含全部 20 個情境、每一課嘅「問題」同「回應」廣東話文字，一共 252 句。

**呢份文字係固定嘅，5 個導師（Riley、Marcus、Nicky、Echo、Mia）都要各自用自己把聲讀多一次呢 252 句** ——即係總共要生成 252 × 5 = 1,260 個音檔，但文字本身淨係呢一份，唔使譯。

## 檔案擺放規則

```
client/public/audio/{tutorId}/zh/{scenarioId}--{chapterId}--{turnId}--question.mp3
client/public/audio/{tutorId}/zh/{scenarioId}--{chapterId}--{turnId}--encouragement.mp3
```

- `tutorId`：riley / marcus / nicky / echo / mia
- 「問題」對應下面表格嘅「問題（question）」欄；「回應」對應「回應（encouragement）」欄
- 用廣東話讀，唔使讀出標點符號

---

## 自我介紹（introduce-yourself）

### 身份與工作（identity-job）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 遇見新朋友時，你會如何自我介紹？ | 明白了，你想說明自己的名字和身份。 | `introduce-yourself--identity-job--t1` |
| t2 | 如果對方接著問你在哪裡上班，可以怎麼回答？ | 明白了，你想進一步說明公司或地點。 | `introduce-yourself--identity-job--t2` |
| t3 | 如果想補充自己主要負責的工作內容，可以怎麼說？ | 明白了，你想補充工作內容。 | `introduce-yourself--identity-job--t3` |

### 興趣與閒暇（hobbies）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 空閒時你喜歡做什麼？ | 明白了，你想說明自己的興趣。 | `introduce-yourself--hobbies--t1` |
| t2 | 為什麼你喜歡這件事？試著補充一句原因。 | 明白了，你想進一步說明原因。 | `introduce-yourself--hobbies--t2` |
| t3 | 如果想邀請對方一起參與這個興趣，可以怎麼說？ | 明白了，你想邀請對方一起參與。 | `introduce-yourself--hobbies--t3` |

### 問返對方（ask-back）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 介紹完自己後，你會如何反問對方？ | 明白了，你想將話題交回給對方。 | `introduce-yourself--ask-back--t1` |
| t2 | 對方回答後，你想如何自然地接續話題？ | 明白了，你想給予回應以延續對話。 | `introduce-yourself--ask-back--t2` |
| t3 | 如果想更深入了解對方的背景，可以怎麼問？ | 明白了，你想更深入了解對方的背景。 | `introduce-yourself--ask-back--t3` |

## 餐廳點餐（restaurant-order）

### 落單基本（basic-order）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 服務生前來時，你會如何開始點餐？ | 明白了，你想開始點餐。 | `restaurant-order--basic-order--t1` |
| t2 | 結帳前想加點一杯飲品，可以怎麼說？ | 明白了，你想加點飲品。 | `restaurant-order--basic-order--t2` |
| t3 | 如果想把吃不完的食物打包帶走，可以怎麼說？ | 明白了，你想要求打包。 | `restaurant-order--basic-order--t3` |

### 提出特殊要求（special-request）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 點餐時你想提出什麼要求？ | 明白了，你想要求少辣。 | `restaurant-order--special-request--t1` |
| t2 | 冷飲想去冰，可以怎麼說？ | 明白了，你想要求去冰。 | `restaurant-order--special-request--t2` |
| t3 | 如果想查詢某道菜是否含有你不能吃的成分，可以怎麼問？ | 明白了，你想查詢成分。 | `restaurant-order--special-request--t3` |

### 出錯餐點點講（wrong-order）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 餐點送錯了，你會如何告訴服務生？ | 明白了，你想指出送錯了餐點。 | `restaurant-order--wrong-order--t1` |
| t2 | 服務生反問你點了什麼，你會如何確認？ | 明白了，你想確認正確的餐點。 | `restaurant-order--wrong-order--t2` |
| t3 | 結帳時發現賬單有誤，你會怎麼說？ | 明白了，你想指出賬單有誤。 | `restaurant-order--wrong-order--t3` |

## 求職面試（job-interview）

### 自我介紹（self-intro）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 面試官請你簡單自我介紹，你會怎麼說？ | 明白了，你想說明自己的背景。 | `job-interview--self-intro--t1` |
| t2 | 你想如何說明自己為什麼對這份工作感興趣？ | 明白了，你想說明感興趣的原因。 | `job-interview--self-intro--t2` |
| t3 | 如果面試官問你何時可以到職，可以怎麼回答？ | 明白了，你想說明到職時間。 | `job-interview--self-intro--t3` |

### 強項加真實例子（strength-example）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你認為自己在工作上最可靠的強項是什麼？ | 明白了，你想說明自己做事有系統。 | `job-interview--strength-example--t1` |
| t2 | 還有沒有第二個例子可以支持你的強項？ | 明白了，你想再舉一個例子。 | `job-interview--strength-example--t2` |
| t3 | 如果面試官問你的弱點，你會怎麼回答？ | 明白了，你想坦誠說明待改善的地方。 | `job-interview--strength-example--t3` |

## 工作會議（team-meeting）

### 交代進度（status-update）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 開會時你想如何說明這星期完成了哪些工作？ | 明白了，你想說明已完成的工作。 | `team-meeting--status-update--t1` |
| t2 | 說明完已完成的工作後，你想如何談下一步？ | 明白了，你想進一步說明下一步計劃。 | `team-meeting--status-update--t2` |
| t3 | 如果工作上遇到困難，需要同事協助，可以怎麼說？ | 明白了，你想尋求協助。 | `team-meeting--status-update--t3` |

### 提出建議（suggest-next-step）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想在會議上提出一個建議，可以如何開口？ | 明白了，你想提出建議。 | `team-meeting--suggest-next-step--t1` |
| t2 | 如果隊友反問原因，你會如何解釋？ | 明白了，你想解釋原因。 | `team-meeting--suggest-next-step--t2` |
| t3 | 如果隊友有不同意見，你想如何回應以達成共識？ | 明白了，你想回應不同意見並尋求共識。 | `team-meeting--suggest-next-step--t3` |

## 旅行問路（travel-directions）

### 問路基本（basic-directions）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你在街上想問路前往某個地方，可以如何開口？ | 明白了，你想問路。 | `travel-directions--basic-directions--t1` |
| t2 | 對方指完路後，你想確認自己聽明白了，可以怎麼說？ | 明白了，你想確認方向。 | `travel-directions--basic-directions--t2` |
| t3 | 如果想確認是否可以步行到達，可以怎麼問？ | 明白了，你想確認交通方式。 | `travel-directions--basic-directions--t3` |

### 確認方向（confirm-directions）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 如果你不確定要走多久，可以怎麼問？ | 明白了，你想進一步詢問距離和時間。 | `travel-directions--confirm-directions--t1` |
| t2 | 感謝對方指路，你想如何有禮貌地道別？ | 明白了，你想表達感謝。 | `travel-directions--confirm-directions--t2` |
| t3 | 如果想確認附近有明顯的地標方便辨認，可以怎麼問？ | 明白了，你想確認附近的地標。 | `travel-directions--confirm-directions--t3` |

## 睇醫生（see-doctor）

### 描述症狀（describe-symptoms）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 醫生問你今天哪裡不舒服，你會怎麼說？ | 明白了，你想說明身體不適的地方。 | `see-doctor--describe-symptoms--t1` |
| t2 | 醫生想知道這個情況持續了多久，你會怎麼回答？ | 明白了，你想說明持續的時間。 | `see-doctor--describe-symptoms--t2` |
| t3 | 如果想知道是否需要做進一步檢查，可以怎麼問？ | 明白了，你想查詢是否需要進一步檢查。 | `see-doctor--describe-symptoms--t3` |

### 聽懂醫生建議（doctor-instructions）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 醫生建議你要多休息，你會怎麼回應？ | 明白了，你想回應醫生的建議。 | `see-doctor--doctor-instructions--t1` |
| t2 | 你想確認藥物該怎麼服用，可以怎麼問？ | 明白了，你想確認服藥方法。 | `see-doctor--doctor-instructions--t2` |
| t3 | 你想確認這個藥物有沒有副作用，可以怎麼問？ | 明白了，你想查詢藥物的副作用。 | `see-doctor--doctor-instructions--t3` |

## 銀行開戶（banking）

### 開立戶口（open-account）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 職員問你想辦理什麼服務，你會怎麼說？ | 明白了，你想說明來銀行的目的。 | `banking--open-account--t1` |
| t2 | 職員想確認你帶齊文件未，你會怎麼回答？ | 明白了，你想確認文件齊全。 | `banking--open-account--t2` |
| t3 | 你想查詢開戶是否需要手續費，可以怎麼問？ | 明白了，你想查詢開戶的相關費用。 | `banking--open-account--t3` |

### 查詢戶口服務（account-services）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想查詢提款卡什麼時候可以領取，可以怎麼問？ | 明白了，你想查詢提款卡的領取時間。 | `banking--account-services--t1` |
| t2 | 你想開通網上銀行服務，可以怎麼說？ | 明白了，你想開通網上銀行服務。 | `banking--account-services--t2` |
| t3 | 你想查詢如何查看戶口結餘，可以怎麼問？ | 明白了，你想查詢如何查看戶口結餘。 | `banking--account-services--t3` |

## 購物與退換貨（shopping-returns）

### 試身與查詢（trying-items）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想查詢有沒有其他尺寸，可以怎麼問？ | 明白了，你想查詢其他尺寸。 | `shopping-returns--trying-items--t1` |
| t2 | 你想去試身室試穿，可以怎麼說？ | 明白了，你想要求試身。 | `shopping-returns--trying-items--t2` |
| t3 | 如果想查詢這件衣服是什麼材質，可以怎麼問？ | 明白了，你想查詢衣服的材質。 | `shopping-returns--trying-items--t3` |

### 退貨與換貨（returns-exchanges）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想退回一件不合適的商品，可以怎麼說？ | 明白了，你想提出退貨要求。 | `shopping-returns--returns-exchanges--t1` |
| t2 | 職員問你想退款還是換貨，你會怎麼答？ | 明白了，你想說明換貨或退款的選擇。 | `shopping-returns--returns-exchanges--t2` |
| t3 | 職員問你有沒有帶收據，可以怎麼回答？ | 明白了，你想說明收據狀況。 | `shopping-returns--returns-exchanges--t3` |

## 租屋（apartment-rental）

### 睇樓（viewing-apartment）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想向地產經紀查詢租金，可以怎麼問？ | 明白了，你想查詢租金。 | `apartment-rental--viewing-apartment--t1` |
| t2 | 你想查詢是否需要簽長約，可以怎麼問？ | 明白了，你想查詢租期。 | `apartment-rental--viewing-apartment--t2` |
| t3 | 你想查詢單位是否已經有傢俱，可以怎麼問？ | 明白了，你想查詢單位是否已有傢俱。 | `apartment-rental--viewing-apartment--t3` |

### 簽約（signing-lease）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想查詢按金是多少，可以怎麼問？ | 明白了，你想查詢按金金額。 | `apartment-rental--signing-lease--t1` |
| t2 | 你想查詢維修責任歸誰，可以怎麼問？ | 明白了，你想查詢維修責任。 | `apartment-rental--signing-lease--t2` |
| t3 | 你想確認退租時按金是否可以全數退還，可以怎麼問？ | 明白了，你想確認退租時按金的退還條件。 | `apartment-rental--signing-lease--t3` |

## 郵局（post-office）

### 寄包裹（sending-package）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想查詢寄包裹去外國需要多久，可以怎麼問？ | 明白了，你想查詢寄件所需時間。 | `post-office--sending-package--t1` |
| t2 | 職員問你想用什麼方式寄送，可以怎麼回答？ | 明白了，你想說明寄送方式。 | `post-office--sending-package--t2` |
| t3 | 你想查詢有沒有追蹤服務，可以怎麼問？ | 明白了，你想查詢包裹的追蹤服務。 | `post-office--sending-package--t3` |

### 買郵票（buying-stamps）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想查詢寄信去某個地方需要多少郵費，可以怎麼問？ | 明白了，你想查詢郵費。 | `post-office--buying-stamps--t1` |
| t2 | 你想購買幾張郵票，可以怎麼說？ | 明白了，你想購買郵票。 | `post-office--buying-stamps--t2` |
| t3 | 你想查詢是否有特別版郵票出售，可以怎麼問？ | 明白了，你想查詢是否有特別版郵票。 | `post-office--buying-stamps--t3` |

## 商務談判（negotiation）

### 提出立場（opening-position）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 洽談開始時，你想表明自己的立場，可以怎麼說？ | 明白了，你想表明自己的立場。 | `negotiation--opening-position--t1` |
| t2 | 對方提出的條件你未能接受，可以怎麼回應？ | 明白了，你想表達未能接受對方的條件。 | `negotiation--opening-position--t2` |
| t3 | 你想提出一個折衷方案，可以怎麼說？ | 明白了，你想提出折衷方案。 | `negotiation--opening-position--t3` |

### 達成共識（reaching-compromise）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想確認雙方已經達成共識，可以怎麼問？ | 明白了，你想確認雙方是否已達成共識。 | `negotiation--reaching-compromise--t1` |
| t2 | 你想總結今次談判的結果，可以怎麼說？ | 明白了，你想總結談判結果。 | `negotiation--reaching-compromise--t2` |
| t3 | 你想提出下一步跟進的安排，可以怎麼說？ | 明白了，你想提出下一步的安排。 | `negotiation--reaching-compromise--t3` |

## 處理投訴（handling-complaints）

### 聆聽投訴（listening-to-complaint）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 客人向你投訴服務有問題，你想先表達理解，可以怎麼說？ | 明白了，你想先表達理解和歉意。 | `handling-complaints--listening-to-complaint--t1` |
| t2 | 你想進一步了解事情的經過，可以怎麼問？ | 明白了，你想進一步了解事情經過。 | `handling-complaints--listening-to-complaint--t2` |
| t3 | 你想向客人保證會認真跟進，可以怎麼說？ | 明白了，你想保證會認真跟進。 | `handling-complaints--listening-to-complaint--t3` |

### 提出解決方案（proposing-solution）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想向客人提出補償方案，可以怎麼說？ | 明白了，你想提出補償方案。 | `handling-complaints--proposing-solution--t1` |
| t2 | 客人對方案不滿意，你想提出另一個選擇，可以怎麼說？ | 明白了，你想提出另一個選擇。 | `handling-complaints--proposing-solution--t2` |
| t3 | 解決方案達成後，你想感謝客人的耐心，可以怎麼說？ | 明白了，你想感謝客人的耐心。 | `handling-complaints--proposing-solution--t3` |

## 公開演講（public-speaking）

### 組織演講內容（structuring-speech）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 演講開場，你想吸引聽眾的注意，可以怎麼說？ | 明白了，你想用問題或故事吸引聽眾注意。 | `public-speaking--structuring-speech--t1` |
| t2 | 你想帶出演講的主要論點，可以怎麼說？ | 明白了，你想帶出演講的主要論點。 | `public-speaking--structuring-speech--t2` |
| t3 | 你想在段落之間自然過渡，可以怎麼說？ | 明白了，你想在段落之間自然過渡。 | `public-speaking--structuring-speech--t3` |

### 應對問答環節（handling-qa）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 聽眾問了一個你未準備好的問題，可以怎麼回應？ | 明白了，你想坦誠回應未準備好的問題。 | `public-speaking--handling-qa--t1` |
| t2 | 你想澄清聽眾誤解了你的意思，可以怎麼說？ | 明白了，你想澄清對方的誤解。 | `public-speaking--handling-qa--t2` |
| t3 | 問答環節結束，你想感謝聽眾的參與，可以怎麼說？ | 明白了，你想感謝聽眾的參與。 | `public-speaking--handling-qa--t3` |

## 社交場合（networking-event）

### 寒暄閒聊（making-small-talk）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 在社交場合想主動和陌生人開始對話，可以怎麼說？ | 明白了，你想主動開始對話。 | `networking-event--making-small-talk--t1` |
| t2 | 你想介紹自己的工作範疇，可以怎麼說？ | 明白了，你想介紹自己的工作範疇。 | `networking-event--making-small-talk--t2` |
| t3 | 對話開始冷場，你想轉換話題，可以怎麼說？ | 明白了，你想自然地轉換話題。 | `networking-event--making-small-talk--t3` |

### 交換聯絡方式（exchanging-contacts）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想向對方索取聯絡方式，可以怎麼說？ | 明白了，你想索取對方的聯絡方式。 | `networking-event--exchanging-contacts--t1` |
| t2 | 你想約對方之後再詳談，可以怎麼說？ | 明白了，你想約對方之後再詳談。 | `networking-event--exchanging-contacts--t2` |
| t3 | 道別時你想表達今次交流很有收穫，可以怎麼說？ | 明白了，你想表達今次交流的收穫。 | `networking-event--exchanging-contacts--t3` |

## 給予意見（giving-feedback）

### 建設性意見（constructive-feedback）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想向同事提出建設性意見，可以怎麼開口？ | 明白了，你想禮貌地開口提出意見。 | `giving-feedback--constructive-feedback--t1` |
| t2 | 你想具體指出可以改善的地方，可以怎麼說？ | 明白了，你想具體指出可以改善的地方。 | `giving-feedback--constructive-feedback--t2` |
| t3 | 你想以正面的話總結意見，可以怎麼說？ | 明白了，你想以正面的話總結意見。 | `giving-feedback--constructive-feedback--t3` |

### 較困難的對話（difficult-conversation）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你需要指出對方一個重複發生的問題，可以怎麼開口？ | 明白了，你想指出一個重複發生的問題。 | `giving-feedback--difficult-conversation--t1` |
| t2 | 對方對你的意見有防禦反應，你想緩和氣氛，可以怎麼說？ | 明白了，你想緩和對方的防禦反應。 | `giving-feedback--difficult-conversation--t2` |
| t3 | 對話結束，你想確認雙方都清楚下一步，可以怎麼說？ | 明白了，你想確認雙方都清楚下一步。 | `giving-feedback--difficult-conversation--t3` |

## 辯論與討論（debate-discussion）

### 提出論點（presenting-argument）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 辯論開始，你想清楚陳述自己的立場，可以怎麼說？ | 明白了，你想清楚陳述自己的立場。 | `debate-discussion--presenting-argument--t1` |
| t2 | 你想用數據或例子支持自己的論點，可以怎麼說？ | 明白了，你想用數據或例子支持論點。 | `debate-discussion--presenting-argument--t2` |
| t3 | 你想預先回應對方可能提出的反駁，可以怎麼說？ | 明白了，你想預先回應對方可能提出的反駁。 | `debate-discussion--presenting-argument--t3` |

### 回應反駁（rebutting-counterpoint）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 對方提出反駁，你想先承認他論點的一部分，可以怎麼說？ | 明白了，你想先承認對方論點的一部分。 | `debate-discussion--rebutting-counterpoint--t1` |
| t2 | 你想指出對方論點的漏洞，可以怎麼說？ | 明白了，你想指出對方論點的漏洞。 | `debate-discussion--rebutting-counterpoint--t2` |
| t3 | 辯論結束，你想重申自己的立場作總結，可以怎麼說？ | 明白了，你想重申立場作總結。 | `debate-discussion--rebutting-counterpoint--t3` |

## 說服技巧（persuasion）

### 建立論據（building-case）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想向對方提出一個提案，可以怎麼開口？ | 明白了，你想提出一個提案。 | `persuasion--building-case--t1` |
| t2 | 你想強調這個提案對對方的好處，可以怎麼說？ | 明白了，你想強調提案對對方的好處。 | `persuasion--building-case--t2` |
| t3 | 你想引用其他人成功的例子增加說服力，可以怎麼說？ | 明白了，你想引用成功案例增加說服力。 | `persuasion--building-case--t3` |

### 回應異議（addressing-objections）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 對方對你的提案有疑慮，你想先了解原因，可以怎麼問？ | 明白了，你想先了解對方疑慮的原因。 | `persuasion--addressing-objections--t1` |
| t2 | 你想針對對方的疑慮提出解決方法，可以怎麼說？ | 明白了，你想針對疑慮提出解決方法。 | `persuasion--addressing-objections--t2` |
| t3 | 對方仍然猶豫，你想提出一個低風險的試行方案，可以怎麼說？ | 明白了，你想提出低風險的試行方案。 | `persuasion--addressing-objections--t3` |

## 文化差異溝通（cultural-nuance）

### 解讀語境（reading-context）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你留意到對方說話比較含蓄，想確認他真正的意思，可以怎麼問？ | 明白了，你想確認對方真正的意思。 | `cultural-nuance--reading-context--t1` |
| t2 | 你想禮貌地指出文化上的不同做法，可以怎麼說？ | 明白了，你想禮貌地指出文化差異。 | `cultural-nuance--reading-context--t2` |
| t3 | 你想邀請對方分享他們的文化做法，可以怎麼問？ | 明白了，你想邀請對方分享他們的文化做法。 | `cultural-nuance--reading-context--t3` |

### 調整語氣（adapting-tone）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你發現對方偏好比較直接的溝通方式，你想調整自己的表達，可以怎麼說？ | 明白了，你想用更直接的方式表達。 | `cultural-nuance--adapting-tone--t1` |
| t2 | 你發現對方偏好比較婉轉的溝通方式，你想調整語氣，可以怎麼說？ | 明白了，你想用更婉轉的方式表達。 | `cultural-nuance--adapting-tone--t2` |
| t3 | 你想總結：不同文化的溝通方式沒有對錯之分，可以怎麼說？ | 明白了，你想總結不同文化溝通方式各有優點。 | `cultural-nuance--adapting-tone--t3` |

## 危機溝通（crisis-communication）

### 傳達壞消息（delivering-bad-news）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你需要向團隊宣布一個不好的消息，可以怎麼開口？ | 明白了，你想準備向團隊宣布壞消息。 | `crisis-communication--delivering-bad-news--t1` |
| t2 | 你想清楚說明事情發生的原因，可以怎麼說？ | 明白了，你想清楚說明事情發生的原因。 | `crisis-communication--delivering-bad-news--t2` |
| t3 | 你想安撫團隊的情緒並展望下一步，可以怎麼說？ | 明白了，你想安撫團隊情緒並展望下一步。 | `crisis-communication--delivering-bad-news--t3` |

### 應對反應（managing-reactions）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 有人對壞消息反應激動，你想先安撫他，可以怎麼說？ | 明白了，你想先安撫對方激動的情緒。 | `crisis-communication--managing-reactions--t1` |
| t2 | 你想邀請大家提出問題或憂慮，可以怎麼說？ | 明白了，你想邀請大家提出問題或憂慮。 | `crisis-communication--managing-reactions--t2` |
| t3 | 會議結束，你想重申你對團隊的信心，可以怎麼說？ | 明白了，你想重申對團隊的信心。 | `crisis-communication--managing-reactions--t3` |

## 領導溝通（leadership-communication）

### 激勵團隊（motivating-team）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想向團隊表達他們的努力有被看到，可以怎麼說？ | 明白了，你想表達對團隊努力的肯定。 | `leadership-communication--motivating-team--t1` |
| t2 | 你想為團隊描繪一個清晰的共同目標，可以怎麼說？ | 明白了，你想描繪一個清晰的共同目標。 | `leadership-communication--motivating-team--t2` |
| t3 | 遇到困難時，你想鼓勵團隊保持士氣，可以怎麼說？ | 明白了，你想鼓勵團隊在困難中保持士氣。 | `leadership-communication--motivating-team--t3` |

### 分配任務（delegating-tasks）

| 回合 | 問題（question） | 回應（encouragement） | 檔名字首 |
|---|---|---|---|
| t1 | 你想向下屬清楚交代一項任務，可以怎麼說？ | 明白了，你想清楚交代一項任務。 | `leadership-communication--delegating-tasks--t1` |
| t2 | 你想向對方表達信任、放手讓他決定，可以怎麼說？ | 明白了，你想表達信任並放手讓對方決定。 | `leadership-communication--delegating-tasks--t2` |
| t3 | 分配任務後，你想提醒對方有需要可以隨時找你，可以怎麼說？ | 明白了，你想提醒對方有需要可以隨時找你。 | `leadership-communication--delegating-tasks--t3` |


---

總共 126 個回合 × 2 句（問題+回應）= 252 句，每個導師都要讀一次。
