import type { Scenario } from "./types.js";

// Content structure follows the Broadsheet/SpeakMate design handoff state machine
// (§5.3): each turn = question -> user answers (zh) -> Riley confirms intent ->
// Riley teaches the English model sentence(s). Chapters unlock in sequence within
// a scenario; scenarios unlock in sequence (see server/progress.ts).
//
// All Chinese text here is written in formal/standard Chinese (書面語), not
// spoken Cantonese — the app's interface language can switch (see
// client/src/lib/i18n.tsx), but this lesson content is fixed and shared
// across locales, so it stays in neutral written Chinese rather than a
// regional colloquial register.
export const scenarios: Scenario[] = [
  {
    id: "introduce-yourself",
    title: "Introduce yourself",
    titleZh: "自我介紹",
    description: "初次見面也能自然、有禮貌地打招呼。",
    accent: "mint",
    icon: "user-circle",
    chapters: [
      {
        id: "identity-job",
        title: "身份與工作",
        goalZh: "學會用一句英文說出自己的名字和工作。",
        turns: [
          {
            id: "t1",
            questionZh: "遇見新朋友時，你會如何自我介紹？",
            questionSubZh: "可以先用中文回答，我再教你相應的英文表達。",
            chips: ["我叫...", "我是...", "我從事..."],
            encouragementZh: "明白了，你想說明自己的名字和身份。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Hi, I'm Wei Ling and I work in marketing.",
                zh: "意思：你好，我叫 Wei Ling，在市場推廣領域工作。",
                usageZh: "適用於認識新同事、活動場合的自我介紹，記得保持眼神接觸並面帶微笑。",
                namePlaceholder: "Wei Ling",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "如果對方接著問你在哪裡上班，可以怎麼回答？",
            questionSubZh: "試著補充多一點資訊，不只是回答名字而已。",
            chips: ["我在...上班", "我的公司從事..."],
            encouragementZh: "明白了，你想進一步說明公司或地點。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "I work at a marketing agency downtown.",
                zh: "意思：我在市中心一間市場推廣公司上班。",
                usageZh: "承接前面提到的 marketing，讓整段自我介紹前後呼應。想再簡短一點，只說 at a marketing agency 也可以。",
              },
            ],
            // Matched against the learner's own typed answer (see
            // `variants` on the Turn type) — so "我在髮型屋上班" teaches the
            // hair-salon line, not the fixed marketing-agency default.
            variants: [
              {
                keywords: ["髮型屋", "理髮店", "髮廊"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a hair salon.",
                    zh: "意思：我在髮型屋上班。",
                    usageZh: "也可以補充地點，例如 near the MTR station。",
                  },
                ],
              },
              {
                keywords: ["餐廳", "食肆", "茶餐廳"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a restaurant.",
                    zh: "意思：我在餐廳上班。",
                    usageZh: "想說明職位，可以加 as a waiter / as a chef。",
                  },
                ],
              },
              {
                keywords: ["醫院"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a hospital.",
                    zh: "意思：我在醫院上班。",
                    usageZh: "想說明部門，可以加 in the emergency department。",
                  },
                ],
              },
              {
                keywords: ["診所"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a clinic.",
                    zh: "意思：我在診所上班。",
                    usageZh: "想說得更清楚，可以加 a dental clinic / a family clinic。",
                  },
                ],
              },
              {
                keywords: ["學校"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a school.",
                    zh: "意思：我在學校上班。",
                    usageZh: "想說明任教科目，可以加 I teach English。",
                  },
                ],
              },
              {
                keywords: ["幼稚園"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a kindergarten.",
                    zh: "意思：我在幼稚園上班。",
                    usageZh: "想說明任教班級，可以加 I teach the kindergarten class。",
                  },
                ],
              },
              {
                keywords: ["銀行"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a bank.",
                    zh: "意思：我在銀行上班。",
                    usageZh: "想說明部門，可以加 in the customer service department。",
                  },
                ],
              },
              {
                keywords: ["律師樓", "律師行"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a law firm.",
                    zh: "意思：我在律師事務所上班。",
                    usageZh: "想說明職位，可以加 as a paralegal。",
                  },
                ],
              },
              {
                keywords: ["地盤"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a construction site.",
                    zh: "意思：我在建築工地上班。",
                    usageZh: "想說明工種，可以加 as an electrician。",
                  },
                ],
              },
              {
                keywords: ["工廠"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a factory.",
                    zh: "意思：我在工廠上班。",
                    usageZh: "想說明具體工作，可以加 on the production line。",
                  },
                ],
              },
              {
                keywords: ["酒店"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a hotel.",
                    zh: "意思：我在酒店上班。",
                    usageZh: "想說明職位，可以加 at the front desk。",
                  },
                ],
              },
              {
                keywords: ["超級市場", "超市"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a supermarket.",
                    zh: "意思：我在超級市場上班。",
                    usageZh: "想說明職位，可以加 as a cashier。",
                  },
                ],
              },
              {
                keywords: ["藥房"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a pharmacy.",
                    zh: "意思：我在藥房上班。",
                    usageZh: "想說得更清楚，可以加 as a pharmacist。",
                  },
                ],
              },
              {
                keywords: ["健身室", "健身中心"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a gym.",
                    zh: "意思：我在健身房上班。",
                    usageZh: "想說明職位，可以加 as a personal trainer。",
                  },
                ],
              },
              {
                keywords: ["地產"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a real estate agency.",
                    zh: "意思：我在地產公司上班。",
                    usageZh: "想說明職位，可以加 as an agent。",
                  },
                ],
              },
              {
                keywords: ["會計師樓", "會計公司"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at an accounting firm.",
                    zh: "意思：我在會計師事務所上班。",
                    usageZh: "想說明職位，可以加 as an accountant。",
                  },
                ],
              },
              {
                keywords: ["科技公司", "IT公司", "IT 公司"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work at a tech company.",
                    zh: "意思：我在一間科技公司上班。",
                    usageZh: "想說明職位，可以加 as a developer。",
                  },
                ],
              },
              {
                keywords: ["政府"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "I work for the government.",
                    zh: "意思：我在政府部門上班。",
                    usageZh: "與其他例句不同，這句用 work for 而非 work at，因為講的是政府這個機構整體。",
                  },
                ],
              },
              {
                keywords: ["美容院"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a beauty salon.", zh: "意思：我在美容院上班。", usageZh: "想說明職位，可以加 as a beautician。" },
                ],
              },
              {
                keywords: ["美甲店", "美甲"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a nail salon.", zh: "意思：我在美甲店上班。", usageZh: "想說明職位，可以加 as a nail technician。" },
                ],
              },
              {
                keywords: ["水療中心", "spa"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a spa.", zh: "意思：我在水療中心上班。", usageZh: "想說明職位，可以加 as a therapist。" },
                ],
              },
              {
                keywords: ["按摩店", "按摩"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a massage parlour.", zh: "意思：我在按摩店上班。", usageZh: "想說得更清楚，可以加 as a masseur / masseuse。" },
                ],
              },
              {
                keywords: ["花店"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a flower shop.", zh: "意思：我在花店上班。", usageZh: "想說明職位，可以加 as a florist。" },
                ],
              },
              {
                keywords: ["珠寶店", "珠寶行"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a jewellery store.", zh: "意思：我在珠寶店上班。", usageZh: "英式拼法是 jewellery，美式是 jewelry，兩者皆可。" },
                ],
              },
              {
                keywords: ["鐘錶店"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a watch shop.", zh: "意思：我在鐘錶店上班。", usageZh: "想說明職位，可以加 as a salesperson。" },
                ],
              },
              {
                keywords: ["服裝店", "時裝店", "衣服舖"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a clothing store.", zh: "意思：我在服裝店上班。", usageZh: "想說明職位，可以加 as a sales assistant。" },
                ],
              },
              {
                keywords: ["電器舖", "電器店"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at an electronics store.", zh: "意思：我在電器店上班。", usageZh: "想說明職位，可以加 as a salesperson。" },
                ],
              },
              {
                keywords: ["文具店"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a stationery shop.", zh: "意思：我在文具店上班。", usageZh: "stationery 是不可數名詞，前面不用加 a。" },
                ],
              },
              {
                keywords: ["書店"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a bookstore.", zh: "意思：我在書店上班。", usageZh: "想說明職位，可以加 as a bookseller。" },
                ],
              },
              {
                keywords: ["玩具店"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a toy store.", zh: "意思：我在玩具店上班。", usageZh: "想說明職位，可以加 as a shop assistant。" },
                ],
              },
              {
                keywords: ["寵物店"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a pet shop.", zh: "意思：我在寵物店上班。", usageZh: "想說明職位，可以加 as a groomer。" },
                ],
              },
              {
                keywords: ["便利店", "便利店舖"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a convenience store.", zh: "意思：我在便利店上班。", usageZh: "想說明職位，可以加 as a cashier。" },
                ],
              },
              {
                keywords: ["士多"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a grocery store.", zh: "意思：我在士多上班。", usageZh: "士多在英文最貼切的說法就是 grocery store。" },
                ],
              },
              {
                keywords: ["快餐店"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a fast food restaurant.", zh: "意思：我在快餐店上班。", usageZh: "想說明職位，可以加 as a crew member。" },
                ],
              },
              {
                keywords: ["咖啡店", "咖啡廳", "咖啡舖"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a coffee shop.", zh: "意思：我在咖啡店上班。", usageZh: "想說明職位，可以加 as a barista。" },
                ],
              },
              {
                keywords: ["酒吧"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a bar.", zh: "意思：我在酒吧上班。", usageZh: "想說明職位，可以加 as a bartender。" },
                ],
              },
              {
                keywords: ["麵包店", "餅店"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a bakery.", zh: "意思：我在麵包店上班。", usageZh: "想說明職位，可以加 as a baker。" },
                ],
              },
              {
                keywords: ["甜品店"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a dessert shop.", zh: "意思：我在甜品店上班。", usageZh: "想說明職位，可以加 as a server。" },
                ],
              },
              {
                keywords: ["火鍋店"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a hot pot restaurant.", zh: "意思：我在火鍋店上班。", usageZh: "想說明職位，可以加 as a waiter / as a chef。" },
                ],
              },
              {
                keywords: ["日本餐廳", "日式餐廳"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a Japanese restaurant.", zh: "意思：我在日本餐廳上班。", usageZh: "想說明職位，可以加 as a chef。" },
                ],
              },
              {
                keywords: ["中菜館", "中餐廳"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a Chinese restaurant.", zh: "意思：我在中菜館上班。", usageZh: "想說明職位，可以加 as a chef。" },
                ],
              },
              {
                keywords: ["西餐廳"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a Western restaurant.", zh: "意思：我在西餐廳上班。", usageZh: "想說明職位，可以加 as a waiter。" },
                ],
              },
              {
                keywords: ["酒樓"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a dim sum restaurant.", zh: "意思：我在酒樓上班。", usageZh: "英文一般用 dim sum restaurant 描述香港的酒樓。" },
                ],
              },
              {
                keywords: ["街市"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a wet market.", zh: "意思：我在街市上班。", usageZh: "wet market 是描述香港街市的慣用英文詞語。" },
                ],
              },
              {
                keywords: ["牙科診所", "牙醫診所"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a dental clinic.", zh: "意思：我在牙科診所上班。", usageZh: "想說明職位，可以加 as a dental assistant。" },
                ],
              },
              {
                keywords: ["中醫診所", "中醫館"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a Chinese medicine clinic.", zh: "意思：我在中醫診所上班。", usageZh: "想說明職位，可以加 as a practitioner。" },
                ],
              },
              {
                keywords: ["物理治療中心", "物理治療"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a physiotherapy clinic.", zh: "意思：我在物理治療中心上班。", usageZh: "想說明職位，可以加 as a physiotherapist。" },
                ],
              },
              {
                keywords: ["安老院", "護老院", "老人院"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a nursing home.", zh: "意思：我在安老院上班。", usageZh: "想說明職位，可以加 as a care worker。" },
                ],
              },
              {
                keywords: ["獸醫診所", "獸醫"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a veterinary clinic.", zh: "意思：我在獸醫診所上班。", usageZh: "想說明職位，可以加 as a vet。" },
                ],
              },
              {
                keywords: ["大學"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a university.", zh: "意思：我在大學上班。", usageZh: "想說明職位，可以加 as a lecturer。" },
                ],
              },
              {
                keywords: ["補習社"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a tutoring centre.", zh: "意思：我在補習社上班。", usageZh: "想說明職位，可以加 as a tutor。" },
                ],
              },
              {
                keywords: ["駕駛學校", "駕駛學院"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a driving school.", zh: "意思：我在駕駛學校上班。", usageZh: "想說明職位，可以加 as an instructor。" },
                ],
              },
              {
                keywords: ["音樂學校", "音樂中心"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a music school.", zh: "意思：我在音樂學校上班。", usageZh: "想說明職位，可以加 as a music teacher。" },
                ],
              },
              {
                keywords: ["保險公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at an insurance company.", zh: "意思：我在保險公司上班。", usageZh: "想說明職位，可以加 as an agent。" },
                ],
              },
              {
                keywords: ["證券行", "證券公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a securities firm.", zh: "意思：我在證券行上班。", usageZh: "想說明職位，可以加 as a broker。" },
                ],
              },
              {
                keywords: ["財務公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a finance company.", zh: "意思：我在財務公司上班。", usageZh: "想說明職位，可以加 as an analyst。" },
                ],
              },
              {
                keywords: ["測量師樓", "測量師行"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a surveying firm.", zh: "意思：我在測量師樓上班。", usageZh: "想說明職位，可以加 as a surveyor。" },
                ],
              },
              {
                keywords: ["建築師樓", "建築師行"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at an architecture firm.", zh: "意思：我在建築師樓上班。", usageZh: "想說明職位，可以加 as an architect。" },
                ],
              },
              {
                keywords: ["顧問公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a consulting firm.", zh: "意思：我在顧問公司上班。", usageZh: "想說明職位，可以加 as a consultant。" },
                ],
              },
              {
                keywords: ["消防局", "消防處"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a fire station.", zh: "意思：我在消防局上班。", usageZh: "想說明職位，可以加 as a firefighter。" },
                ],
              },
              {
                keywords: ["警署", "警察局"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a police station.", zh: "意思：我在警署上班。", usageZh: "想說明職位，可以加 as an officer。" },
                ],
              },
              {
                keywords: ["郵局"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a post office.", zh: "意思：我在郵局上班。", usageZh: "想說明職位，可以加 as a postal worker。" },
                ],
              },
              {
                keywords: ["貨倉", "倉庫"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a warehouse.", zh: "意思：我在貨倉上班。", usageZh: "想說明職位，可以加 as a warehouse assistant。" },
                ],
              },
              {
                keywords: ["旅行社"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a travel agency.", zh: "意思：我在旅行社上班。", usageZh: "想說明職位，可以加 as a travel consultant。" },
                ],
              },
              {
                keywords: ["航空公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at an airline.", zh: "意思：我在航空公司上班。", usageZh: "想說明職位，可以加 as a flight attendant。" },
                ],
              },
              {
                keywords: ["機場"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at the airport.", zh: "意思：我在機場上班。", usageZh: "the airport 通常加 the，因為指的是當地那一個。" },
                ],
              },
              {
                keywords: ["百貨公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a department store.", zh: "意思：我在百貨公司上班。", usageZh: "想說明職位，可以加 as a sales assistant。" },
                ],
              },
              {
                keywords: ["商場"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a shopping mall.", zh: "意思：我在商場上班。", usageZh: "想說明部門，可以加 in customer service。" },
                ],
              },
              {
                keywords: ["電視台"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a TV station.", zh: "意思：我在電視台上班。", usageZh: "想說明職位，可以加 as a producer。" },
                ],
              },
              {
                keywords: ["電台"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a radio station.", zh: "意思：我在電台上班。", usageZh: "想說明職位，可以加 as a host。" },
                ],
              },
              {
                keywords: ["報館", "報社"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a newspaper company.", zh: "意思：我在報館上班。", usageZh: "想說明職位，可以加 as a journalist。" },
                ],
              },
              {
                keywords: ["出版社"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a publishing house.", zh: "意思：我在出版社上班。", usageZh: "想說明職位，可以加 as an editor。" },
                ],
              },
              {
                keywords: ["廣告公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at an advertising agency.", zh: "意思：我在廣告公司上班。", usageZh: "想說明職位，可以加 as a copywriter。" },
                ],
              },
              {
                keywords: ["遊戲公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a game company.", zh: "意思：我在遊戲公司上班。", usageZh: "想說明職位，可以加 as a game designer。" },
                ],
              },
              {
                keywords: ["瑜伽中心", "瑜伽室"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a yoga studio.", zh: "意思：我在瑜伽中心上班。", usageZh: "想說明職位，可以加 as a yoga instructor。" },
                ],
              },
              {
                keywords: ["舞蹈室", "舞蹈學校"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a dance studio.", zh: "意思：我在舞蹈室上班。", usageZh: "想說明職位，可以加 as a dance instructor。" },
                ],
              },
              {
                keywords: ["巴士公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a bus company.", zh: "意思：我在巴士公司上班。", usageZh: "想說明職位，可以加 as a driver。" },
                ],
              },
              {
                keywords: ["的士台", "的士公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a taxi company.", zh: "意思：我在的士台上班。", usageZh: "想說明職位，可以加 as a driver。" },
                ],
              },
              {
                keywords: ["港鐵", "地鐵公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at the MTR.", zh: "意思：我在港鐵上班。", usageZh: "MTR 是香港地鐵的專有名稱，通常加 the。" },
                ],
              },
              {
                keywords: ["船公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a shipping company.", zh: "意思：我在船公司上班。", usageZh: "想說明職位，可以加 as a crew member。" },
                ],
              },
              {
                keywords: ["快遞公司", "速遞公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a courier company.", zh: "意思：我在快遞公司上班。", usageZh: "想說明職位，可以加 as a courier。" },
                ],
              },
              {
                keywords: ["教會"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a church.", zh: "意思：我在教會上班。", usageZh: "想說明職位，可以加 as an administrator。" },
                ],
              },
              {
                keywords: ["慈善機構"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a charity organisation.", zh: "意思：我在慈善機構上班。", usageZh: "想說明職位，可以加 as a coordinator。" },
                ],
              },
              {
                keywords: ["博物館"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a museum.", zh: "意思：我在博物館上班。", usageZh: "想說明職位，可以加 as a curator。" },
                ],
              },
              {
                keywords: ["圖書館"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a library.", zh: "意思：我在圖書館上班。", usageZh: "想說明職位，可以加 as a librarian。" },
                ],
              },
              {
                keywords: ["電影院", "戲院"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a cinema.", zh: "意思：我在電影院上班。", usageZh: "想說明職位，可以加 as a staff member。" },
                ],
              },
              {
                keywords: ["劇院"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a theatre.", zh: "意思：我在劇院上班。", usageZh: "英式拼法是 theatre，美式是 theater，兩者皆可。" },
                ],
              },
              {
                keywords: ["會展中心"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a convention centre.", zh: "意思：我在會展中心上班。", usageZh: "想說明職位，可以加 as an event coordinator。" },
                ],
              },
              {
                keywords: ["電訊公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a telecom company.", zh: "意思：我在電訊公司上班。", usageZh: "想說明職位，可以加 as an engineer。" },
                ],
              },
              {
                keywords: ["物流公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a logistics company.", zh: "意思：我在物流公司上班。", usageZh: "想說明職位，可以加 as a coordinator。" },
                ],
              },
              {
                keywords: ["印刷廠"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a printing factory.", zh: "意思：我在印刷廠上班。", usageZh: "想說明職位，可以加 as an operator。" },
                ],
              },
              {
                keywords: ["貿易公司", "出入口公司"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a trading company.", zh: "意思：我在貿易公司上班。", usageZh: "想說明職位，可以加 as a trader。" },
                ],
              },
              {
                keywords: ["非政府機構", "NGO"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at an NGO.", zh: "意思：我在一間非政府機構上班。", usageZh: "NGO 是 non-governmental organisation 的縮寫。" },
                ],
              },
              {
                keywords: ["社福機構", "社工機構"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a social welfare organisation.", zh: "意思：我在社福機構上班。", usageZh: "想說明職位，可以加 as a social worker。" },
                ],
              },
              {
                keywords: ["幼兒中心", "託兒所"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a childcare centre.", zh: "意思：我在幼兒中心上班。", usageZh: "想說明職位，可以加 as a caregiver。" },
                ],
              },
              {
                keywords: ["動物園"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a zoo.", zh: "意思：我在動物園上班。", usageZh: "想說明職位，可以加 as a zookeeper。" },
                ],
              },
              {
                keywords: ["主題公園"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a theme park.", zh: "意思：我在主題公園上班。", usageZh: "想說明職位，可以加 as a staff member。" },
                ],
              },
              {
                keywords: ["高爾夫球會", "哥爾夫球會"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a golf club.", zh: "意思：我在高爾夫球會上班。", usageZh: "想說明職位，可以加 as a caddie。" },
                ],
              },
              {
                keywords: ["游泳池"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a swimming pool.", zh: "意思：我在游泳池上班。", usageZh: "想說明職位，可以加 as a lifeguard。" },
                ],
              },
              {
                keywords: ["體育館", "運動中心"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a sports centre.", zh: "意思：我在體育館上班。", usageZh: "想說明職位，可以加 as a coach。" },
                ],
              },
              {
                keywords: ["停車場"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a car park.", zh: "意思：我在停車場上班。", usageZh: "英式說法是 car park，美式是 parking lot。" },
                ],
              },
              {
                keywords: ["加油站"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a gas station.", zh: "意思：我在加油站上班。", usageZh: "英式說法是 petrol station，美式是 gas station。" },
                ],
              },
              {
                keywords: ["洗衣店"],
                models: [
                  { labelZh: "最後一句 · Riley 教你講", en: "I work at a laundry shop.", zh: "意思：我在洗衣店上班。", usageZh: "想說明職位，可以加 as an attendant。" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "hobbies",
        title: "興趣與閒暇",
        goalZh: "學會說明自己的興趣和原因，讓對話更有內容。",
        turns: [
          {
            id: "t1",
            questionZh: "空閒時你喜歡做什麼？",
            chips: ["我喜歡行山", "我空閒時喜歡去行山"],
            encouragementZh: "明白了，你想說明自己的興趣。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "In my free time, I enjoy hiking.",
                zh: "意思：我空閒時喜歡行山。",
                usageZh: "enjoy 後面直接加 -ing，不需要加 to。",
              },
            ],
            // Matched against the learner's own typed answer — so naming a
            // different hobby (e.g. "打籃球") teaches that hobby's line
            // instead of the fixed hiking default.
            variants: [
              {
                keywords: ["籃球"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "In my free time, I enjoy playing basketball.",
                    zh: "意思：我空閒時喜歡打籃球。",
                    usageZh: "enjoy 後面直接加 -ing，不需要加 to。",
                  },
                ],
              },
              {
                keywords: ["睇戲", "電影"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "In my free time, I enjoy watching movies.",
                    zh: "意思：我空閒時喜歡看電影。",
                    usageZh: "enjoy 後面直接加 -ing，不需要加 to。",
                  },
                ],
              },
              {
                keywords: ["睇書", "閱讀"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "In my free time, I enjoy reading.",
                    zh: "意思：我空閒時喜歡閱讀。",
                    usageZh: "enjoy 後面直接加 -ing，不需要加 to。",
                  },
                ],
              },
              {
                keywords: ["煮嘢食", "煮食", "整嘢食", "下廚"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "In my free time, I enjoy cooking.",
                    zh: "意思：我空閒時喜歡烹飪。",
                    usageZh: "enjoy 後面直接加 -ing，不需要加 to。",
                  },
                ],
              },
              {
                keywords: ["游水", "游泳"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "In my free time, I enjoy swimming.",
                    zh: "意思：我空閒時喜歡游泳。",
                    usageZh: "enjoy 後面直接加 -ing，不需要加 to。",
                  },
                ],
              },
              {
                keywords: ["跑步"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "In my free time, I enjoy running.",
                    zh: "意思：我空閒時喜歡跑步。",
                    usageZh: "enjoy 後面直接加 -ing，不需要加 to。",
                  },
                ],
              },
              {
                keywords: ["瑜伽"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "In my free time, I enjoy doing yoga.",
                    zh: "意思：我空閒時喜歡做瑜伽。",
                    usageZh: "enjoy 後面直接加 -ing，不需要加 to。",
                  },
                ],
              },
              {
                keywords: ["畫畫", "繪畫"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "In my free time, I enjoy painting.",
                    zh: "意思：我空閒時喜歡畫畫。",
                    usageZh: "enjoy 後面直接加 -ing，不需要加 to。",
                  },
                ],
              },
              {
                keywords: ["影相", "攝影", "拍照"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "In my free time, I enjoy photography.",
                    zh: "意思：我空閒時喜歡攝影。",
                    usageZh: "photography 是名詞，直接放在 enjoy 後面即可。",
                  },
                ],
              },
              {
                keywords: ["彈琴", "音樂", "聽歌"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "In my free time, I enjoy listening to music.",
                    zh: "意思：我空閒時喜歡聽音樂。",
                    usageZh: "enjoy 後面直接加 -ing，不需要加 to。",
                  },
                ],
              },
              {
                keywords: ["打機", "電子遊戲", "遊戲機"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "In my free time, I enjoy playing video games.",
                    zh: "意思：我空閒時喜歡玩電子遊戲。",
                    usageZh: "enjoy 後面直接加 -ing，不需要加 to。",
                  },
                ],
              },
              {
                keywords: ["旅行", "旅遊"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "In my free time, I enjoy traveling.",
                    zh: "意思：我空閒時喜歡旅行。",
                    usageZh: "enjoy 後面直接加 -ing，不需要加 to。",
                  },
                ],
              },
              { keywords: ["足球"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing football.", zh: "意思：我空閒時喜歡踢足球。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["排球"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing volleyball.", zh: "意思：我空閒時喜歡打排球。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["羽毛球"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing badminton.", zh: "意思：我空閒時喜歡打羽毛球。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["網球"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing tennis.", zh: "意思：我空閒時喜歡打網球。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["乒乓波", "乒乓球"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing table tennis.", zh: "意思：我空閒時喜歡打乒乓球。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["棒球"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing baseball.", zh: "意思：我空閒時喜歡打棒球。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["欖球"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing rugby.", zh: "意思：我空閒時喜歡打欖球。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["保齡球"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy bowling.", zh: "意思：我空閒時喜歡打保齡球。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["桌球", "士碌架"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing pool.", zh: "意思：我空閒時喜歡打桌球。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["高爾夫球", "打Golf"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing golf.", zh: "意思：我空閒時喜歡打高爾夫球。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["拳擊"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy boxing.", zh: "意思：我空閒時喜歡拳擊。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["泰拳"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy practising Muay Thai.", zh: "意思：我空閒時喜歡練習泰拳。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["空手道"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy practising karate.", zh: "意思：我空閒時喜歡練習空手道。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["跆拳道"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy practising taekwondo.", zh: "意思：我空閒時喜歡練習跆拳道。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["柔道"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy practising judo.", zh: "意思：我空閒時喜歡練習柔道。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["劍擊"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy fencing.", zh: "意思：我空閒時喜歡劍擊。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["滑浪"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy surfing.", zh: "意思：我空閒時喜歡滑浪。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["潛水"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy diving.", zh: "意思：我空閒時喜歡潛水。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["浮潛"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy snorkelling.", zh: "意思：我空閒時喜歡浮潛。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["划艇"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy rowing.", zh: "意思：我空閒時喜歡划艇。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["獨木舟"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy kayaking.", zh: "意思：我空閒時喜歡划獨木舟。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["滑水"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy water skiing.", zh: "意思：我空閒時喜歡滑水。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["攀石", "攀岩"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy rock climbing.", zh: "意思：我空閒時喜歡攀石。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["露營"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy camping.", zh: "意思：我空閒時喜歡露營。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["野餐"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy having picnics.", zh: "意思：我空閒時喜歡野餐。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["釣魚"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy fishing.", zh: "意思：我空閒時喜歡釣魚。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["越野單車"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy mountain biking.", zh: "意思：我空閒時喜歡踩越野單車。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["單車", "踩單車"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy cycling.", zh: "意思：我空閒時喜歡踩單車。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["滑雪"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy skiing.", zh: "意思：我空閒時喜歡滑雪。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["滑板"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy skateboarding.", zh: "意思：我空閒時喜歡玩滑板。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["溜冰"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy ice skating.", zh: "意思：我空閒時喜歡溜冰。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["健身"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy working out.", zh: "意思：我空閒時喜歡健身。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["舉重"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy weightlifting.", zh: "意思：我空閒時喜歡舉重。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["拉筋", "伸展"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy stretching.", zh: "意思：我空閒時喜歡拉筋。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["有氧運動", "有氧"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy doing cardio workouts.", zh: "意思：我空閒時喜歡做有氧運動。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["太極"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy practising Tai Chi.", zh: "意思：我空閒時喜歡打太極。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["武術", "功夫"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy practising martial arts.", zh: "意思：我空閒時喜歡練習武術。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["書法"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy practising calligraphy.", zh: "意思：我空閒時喜歡練習書法。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["陶藝"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy doing pottery.", zh: "意思：我空閒時喜歡做陶藝。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["編織"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy knitting.", zh: "意思：我空閒時喜歡編織。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["縫紉"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy sewing.", zh: "意思：我空閒時喜歡縫紉。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["摺紙"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy doing origami.", zh: "意思：我空閒時喜歡摺紙。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["拼圖"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy doing jigsaw puzzles.", zh: "意思：我空閒時喜歡砌拼圖。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["手工藝", "手作"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy making crafts.", zh: "意思：我空閒時喜歡做手工藝。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["插花"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy flower arranging.", zh: "意思：我空閒時喜歡插花。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["雕刻"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy carving.", zh: "意思：我空閒時喜歡雕刻。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["塗鴉"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy drawing graffiti.", zh: "意思：我空閒時喜歡畫塗鴉。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["素描"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy sketching.", zh: "意思：我空閒時喜歡素描。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["畫漫畫", "漫畫"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy drawing comics.", zh: "意思：我空閒時喜歡畫漫畫。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["唱歌"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy singing.", zh: "意思：我空閒時喜歡唱歌。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["結他", "彈結他"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing the guitar.", zh: "意思：我空閒時喜歡彈結他。", usageZh: "彈奏樂器要加 the，例如 play the guitar。" }] },
              { keywords: ["鋼琴", "彈鋼琴"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing the piano.", zh: "意思：我空閒時喜歡彈鋼琴。", usageZh: "彈奏樂器要加 the，例如 play the piano。" }] },
              { keywords: ["小提琴"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing the violin.", zh: "意思：我空閒時喜歡拉小提琴。", usageZh: "彈奏樂器要加 the，例如 play the violin。" }] },
              { keywords: ["打鼓"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing the drums.", zh: "意思：我空閒時喜歡打鼓。", usageZh: "彈奏樂器要加 the，例如 play the drums。" }] },
              { keywords: ["跳舞"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy dancing.", zh: "意思：我空閒時喜歡跳舞。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["話劇", "演戲"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy acting in plays.", zh: "意思：我空閒時喜歡演話劇。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["桌遊"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing board games.", zh: "意思：我空閒時喜歡玩桌遊。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["下棋", "西洋棋"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing chess.", zh: "意思：我空閒時喜歡下棋。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["象棋"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing Chinese chess.", zh: "意思：我空閒時喜歡下象棋。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["麻雀"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing mahjong.", zh: "意思：我空閒時喜歡打麻雀。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["撲克"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing poker.", zh: "意思：我空閒時喜歡打撲克。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["逃出密室", "密室逃脫"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy doing escape rooms.", zh: "意思：我空閒時喜歡玩密室逃脫。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["唱K", "卡拉OK"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy singing karaoke.", zh: "意思：我空閒時喜歡唱卡拉OK。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["煲劇"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy binge-watching TV shows.", zh: "意思：我空閒時喜歡煲劇。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["睇動漫", "動漫"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy watching anime.", zh: "意思：我空閒時喜歡看動漫。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["睇Youtube", "睇片"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy watching YouTube videos.", zh: "意思：我空閒時喜歡看 YouTube 影片。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["寫作"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy writing.", zh: "意思：我空閒時喜歡寫作。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["寫Blog", "寫網誌"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy blogging.", zh: "意思：我空閒時喜歡寫網誌。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["學外語", "學語言"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy learning languages.", zh: "意思：我空閒時喜歡學外語。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["學樂器"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy learning to play musical instruments.", zh: "意思：我空閒時喜歡學樂器。", usageZh: "learn 後面用 to play，因為指的是學習一項技能。" }] },
              { keywords: ["整甜品", "焗嘢食", "整蛋糕"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy baking.", zh: "意思：我空閒時喜歡整甜品。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["品酒"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy wine tasting.", zh: "意思：我空閒時喜歡品酒。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["沖咖啡"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy making coffee.", zh: "意思：我空閒時喜歡沖咖啡。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["泡茶"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy making tea.", zh: "意思：我空閒時喜歡泡茶。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["試新餐廳"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy trying new restaurants.", zh: "意思：我空閒時喜歡試新餐廳。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["逛街", "行街", "shopping"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy shopping.", zh: "意思：我空閒時喜歡逛街購物。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["睇展覽"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy visiting exhibitions.", zh: "意思：我空閒時喜歡看展覽。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["睇演唱會"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy going to concerts.", zh: "意思：我空閒時喜歡看演唱會。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["養寵物"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy taking care of pets.", zh: "意思：我空閒時喜歡照顧寵物。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["種花", "種植", "園藝"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy gardening.", zh: "意思：我空閒時喜歡園藝。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["觀鳥"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy bird watching.", zh: "意思：我空閒時喜歡觀鳥。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["集郵"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy collecting stamps.", zh: "意思：我空閒時喜歡集郵。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["儲公仔"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy collecting figurines.", zh: "意思：我空閒時喜歡儲公仔。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["儲波鞋"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy collecting sneakers.", zh: "意思：我空閒時喜歡儲波鞋。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["自駕遊"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy going on road trips.", zh: "意思：我空閒時喜歡自駕遊。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["冥想"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy meditating.", zh: "意思：我空閒時喜歡冥想。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["靜觀"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy practising mindfulness.", zh: "意思：我空閒時喜歡練習靜觀。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
            ],
          },
          {
            id: "t2",
            questionZh: "為什麼你喜歡這件事？試著補充一句原因。",
            chips: ["因為可以...", "讓我感到放鬆"],
            encouragementZh: "明白了，你想進一步說明原因。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "It helps me relax after a busy week.",
                zh: "意思：這件事可以幫助我在忙碌一週後放鬆下來。",
                usageZh: "這句可以接在任何興趣後面，十分百搭。",
              },
            ],
            // Matched against the learner's own typed reason — so a reason
            // like "影相" teaches a line about capturing moments, not the
            // fixed "relax after a busy week" default.
            variants: [
              {
                keywords: ["影相", "拍照", "攝影"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It lets me capture beautiful moments.",
                    zh: "意思：這件事讓我可以捕捉美好的時刻。",
                    usageZh: "capture a moment 是英文描述攝影嗜好的常見講法。",
                  },
                ],
              },
              {
                keywords: ["識朋友", "認識朋友", "交朋友", "識到朋友"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It's a great way to meet new people.",
                    zh: "意思：這是一個認識新朋友的好方法。",
                    usageZh: "a great way to… 可以用來描述任何活動的好處。",
                  },
                ],
              },
              {
                keywords: ["學嘢", "學新嘢", "學到嘢"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It lets me learn something new.",
                    zh: "意思：這件事讓我可以學到新事物。",
                    usageZh: "something new 泛指任何新知識或新技能。",
                  },
                ],
              },
              {
                keywords: ["健康", "做運動", "keep fit", "瘦身", "運動"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It helps me stay fit and healthy.",
                    zh: "意思：這件事幫助我保持健康。",
                    usageZh: "stay fit and healthy 是描述運動好處的慣用說法。",
                  },
                ],
              },
              {
                keywords: ["大自然", "親近大自然"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It lets me enjoy being close to nature.",
                    zh: "意思：這件事讓我可以親近大自然。",
                    usageZh: "close to nature 是描述戶外活動的常見說法。",
                  },
                ],
              },
              {
                keywords: ["開心", "心情好", "開心啲"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It simply makes me happy.",
                    zh: "意思：這件事單純讓我感到開心。",
                    usageZh: "simply 加強語氣，表示原因好純粹。",
                  },
                ],
              },
              {
                keywords: ["滿足感", "成功感", "有成功感"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It gives me a real sense of achievement.",
                    zh: "意思：這件事讓我有真正的成就感。",
                    usageZh: "a sense of achievement 是表達成就感的固定說法。",
                  },
                ],
              },
              {
                keywords: ["創意", "發揮創意"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It lets me express my creativity.",
                    zh: "意思：這件事讓我可以發揮創意。",
                    usageZh: "express my creativity 適合任何創作型的興趣。",
                  },
                ],
              },
              {
                keywords: ["風景", "景色", "靚景", "欣賞風景", "睇風景"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It lets me enjoy the beautiful scenery.",
                    zh: "意思：這件事讓我可以欣賞美麗的風景。",
                    usageZh: "scenery 是不可數名詞，前面不用加 a。",
                  },
                ],
              },
              {
                keywords: ["新鮮空氣", "呼吸下新鮮空氣", "呼吸新鮮空氣"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It lets me breathe some fresh air.",
                    zh: "意思：這件事讓我可以呼吸一下新鮮空氣。",
                    usageZh: "breathe fresh air 是描述戶外活動好處的常見說法。",
                  },
                ],
              },
              {
                keywords: ["挑戰自己", "突破自己", "挑戰"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It challenges me to push my limits.",
                    zh: "意思：這件事讓我可以挑戰自己的極限。",
                    usageZh: "push my limits 是表達突破自我的常見說法。",
                  },
                ],
              },
              {
                keywords: ["寧靜", "靜下", "心靜", "清空腦袋", "唔使諗嘢", "唔洗諗嘢"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It gives my mind a break from everything.",
                    zh: "意思：這件事讓我的腦袋可以暫時放空。",
                    usageZh: "give my mind a break 是表達讓腦袋休息一下的常見說法。",
                  },
                ],
              },
              {
                keywords: ["消磨時間", "打發時間"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It's a great way to pass the time.",
                    zh: "意思：這是一個消磨時間的好方法。",
                    usageZh: "pass the time 是表達消磨時間的固定說法。",
                  },
                ],
              },
              {
                keywords: ["逃離", "離開市區", "遠離煩囂", "抽離"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It lets me get away from the city for a while.",
                    zh: "意思：這件事讓我可以暫時遠離城市。",
                    usageZh: "get away from… 表示暫時遠離某個地方或狀態。",
                  },
                ],
              },
              {
                keywords: ["有動力", "有目標", "動力"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "It gives me something to look forward to.",
                    zh: "意思：這件事讓我有所期待。",
                    usageZh: "something to look forward to 是表達有所期待的常見說法。",
                  },
                ],
              },
              { keywords: ["減壓", "舒緩壓力"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps relieve my stress.", zh: "意思：這件事幫助我舒緩壓力。", usageZh: "relieve stress 是表達減壓的常見說法。" }] },
              { keywords: ["抒發情緒"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me express my emotions.", zh: "意思：這件事幫助我抒發情緒。", usageZh: "express my emotions 是表達抒發情緒的常見說法。" }] },
              { keywords: ["提升專注力", "專注"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me improve my focus.", zh: "意思：這件事幫助我提升專注力。", usageZh: "improve my focus 是表達提升專注力的常見說法。" }] },
              { keywords: ["改善心情", "心情靚啲"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It lifts my spirits.", zh: "意思：這件事讓我心情變好。", usageZh: "lift my spirits 是表達心情變好的常見說法。" }] },
              { keywords: ["忘記煩惱"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me forget my worries.", zh: "意思：這件事幫助我忘記煩惱。", usageZh: "forget my worries 是表達忘記煩惱的常見說法。" }] },
              { keywords: ["治癒", "療癒"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It feels really therapeutic.", zh: "意思：這件事讓我感覺很療癒。", usageZh: "therapeutic 是表達療癒感的常用形容詞。" }] },
              { keywords: ["同朋友一齊玩", "同朋友"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It's something I love doing with friends.", zh: "意思：這是我很喜歡和朋友一起做的事。", usageZh: "something I love doing 可以套用在任何興趣上。" }] },
              { keywords: ["增進感情"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me bond with the people I care about.", zh: "意思：這件事幫助我和在乎的人增進感情。", usageZh: "bond with… 是表達增進感情的常見說法。" }] },
              { keywords: ["同家人相處", "陪家人"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It's a great way to spend time with my family.", zh: "意思：這是一個和家人相處的好方法。", usageZh: "a great way to… 可以用來描述任何活動的好處。" }] },
              { keywords: ["提升技巧"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me improve my skills.", zh: "意思：這件事幫助我提升技巧。", usageZh: "improve my skills 是表達提升技巧的常見說法。" }] },
              { keywords: ["追求進步"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "I like seeing myself improve over time.", zh: "意思：我喜歡看到自己隨時間進步。", usageZh: "over time 表示隨著時間過去，語氣自然。" }] },
              { keywords: ["表達自己"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It's a way for me to express myself.", zh: "意思：這是我表達自己的方式。", usageZh: "express myself 是表達自我的常見說法。" }] },
              { keywords: ["記錄生活"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It lets me document my life.", zh: "意思：這件事讓我可以記錄生活。", usageZh: "document my life 是表達記錄生活的常見說法。" }] },
              { keywords: ["分享畀人睇", "分享"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "I like sharing what I create with others.", zh: "意思：我喜歡和其他人分享自己的作品。", usageZh: "share… with others 是表達分享的常見說法。" }] },
              { keywords: ["完成目標"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It gives me a clear goal to work towards.", zh: "意思：這件事讓我有明確的目標可以努力。", usageZh: "work towards… 是表達朝目標努力的常見說法。" }] },
              { keywords: ["有趣"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "I simply find it fun.", zh: "意思：我單純覺得這件事很有趣。", usageZh: "simply 加強語氣，表示原因很純粹。" }] },
              { keywords: ["好玩"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It's just really fun.", zh: "意思：這件事真的很好玩。", usageZh: "just 在這裡是加強語氣，表示單純好玩。" }] },
              { keywords: ["刺激"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It gives me an adrenaline rush.", zh: "意思：這件事讓我腎上腺素飆升。", usageZh: "an adrenaline rush 是形容刺激感的常見說法。" }] },
              { keywords: ["興奮"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It's exciting every time.", zh: "意思：每次都令人興奮。", usageZh: "every time 強調每一次都有相同感受。" }] },
              { keywords: ["熱情"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It's something I'm truly passionate about.", zh: "意思：這是我真正熱衷的事。", usageZh: "passionate about… 是表達熱情的常見說法。" }] },
              { keywords: ["方便"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It's convenient and fits easily into my schedule.", zh: "意思：這件事很方便，容易安排進日程裡。", usageZh: "fit into my schedule 是表達容易安排時間的常見說法。" }] },
              { keywords: ["比賽", "贏"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "I enjoy the thrill of competition.", zh: "意思：我喜歡比賽帶來的刺激感。", usageZh: "the thrill of… 是表達刺激感的常見說法。" }] },
              { keywords: ["傳統", "文化"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It connects me to my culture.", zh: "意思：這件事讓我與自己的文化連結。", usageZh: "connect me to… 是表達文化連結的常見說法。" }] },
              { keywords: ["陪仔女", "陪小朋友"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It's a fun way to spend time with my kids.", zh: "意思：這是一個和孩子相處的有趣方式。", usageZh: "a fun way to… 可以用來描述任何親子活動。" }] },
              { keywords: ["減肥"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me lose weight.", zh: "意思：這件事幫助我減肥。", usageZh: "lose weight 是表達減肥的常見說法。" }] },
              { keywords: ["增肌"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me build muscle.", zh: "意思：這件事幫助我增肌。", usageZh: "build muscle 是表達增肌的常見說法。" }] },
              { keywords: ["提升體力", "體能"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It builds up my stamina.", zh: "意思：這件事提升我的體力。", usageZh: "build up my stamina 是表達提升體力的常見說法。" }] },
              { keywords: ["心肺功能"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It improves my cardiovascular health.", zh: "意思：這件事改善我的心肺功能。", usageZh: "cardiovascular health 是心肺功能的正式說法。" }] },
              { keywords: ["改善睡眠"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me sleep better.", zh: "意思：這件事幫助我睡得更好。", usageZh: "sleep better 是表達改善睡眠的常見說法。" }] },
              { keywords: ["靈活性", "柔軟度"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It improves my flexibility.", zh: "意思：這件事改善我的靈活性。", usageZh: "improve my flexibility 是表達提升柔軟度的常見說法。" }] },
              { keywords: ["探索新地方"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It lets me explore new places.", zh: "意思：這件事讓我可以探索新地方。", usageZh: "explore new places 是表達探索新地方的常見說法。" }] },
              { keywords: ["開闊眼界", "開拓視野"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It broadens my horizons.", zh: "意思：這件事拓展我的眼界。", usageZh: "broaden my horizons 是表達開闊眼界的固定說法。" }] },
              { keywords: ["認識新文化"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me learn about new cultures.", zh: "意思：這件事幫助我認識新文化。", usageZh: "learn about… 是表達認識、了解的常見說法。" }] },
              { keywords: ["培養耐性", "耐性"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It teaches me patience.", zh: "意思：這件事教會我耐性。", usageZh: "teach me… 是表達從中學到某種特質的常見說法。" }] },
              { keywords: ["動腦", "訓練腦筋"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It keeps my brain sharp.", zh: "意思：這件事讓我的腦袋保持靈活。", usageZh: "keep my brain sharp 是表達保持思維敏銳的常見說法。" }] },
              { keywords: ["手眼協調"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It improves my hand-eye coordination.", zh: "意思：這件事改善我的手眼協調。", usageZh: "hand-eye coordination 是手眼協調的正式說法。" }] },
              { keywords: ["建立自信", "自信"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me build confidence.", zh: "意思：這件事幫助我建立自信。", usageZh: "build confidence 是表達建立自信的常見說法。" }] },
              { keywords: ["認識自己"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me understand myself better.", zh: "意思：這件事幫助我更了解自己。", usageZh: "understand myself better 是表達更了解自己的常見說法。" }] },
              { keywords: ["隨時隨地都可以做", "隨時隨地"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "I can do it anytime, anywhere.", zh: "意思：我隨時隨地都可以做這件事。", usageZh: "anytime, anywhere 是表達隨時隨地的固定說法。" }] },
              { keywords: ["唔受天氣影響"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It's not affected by the weather.", zh: "意思：這件事不受天氣影響。", usageZh: "affected by… 是表達受某事影響的常見說法。" }] },
              { keywords: ["一個人都可以做", "一個人"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "I can do it on my own.", zh: "意思：我一個人也可以做這件事。", usageZh: "on my own 是表達獨自一人的常見說法。" }] },
              { keywords: ["意志力"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It builds my willpower.", zh: "意思：這件事鍛鍊我的意志力。", usageZh: "build my willpower 是表達鍛鍊意志力的常見說法。" }] },
              { keywords: ["歸屬感"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It gives me a sense of belonging.", zh: "意思：這件事讓我有歸屬感。", usageZh: "a sense of belonging 是歸屬感的固定說法。" }] },
              { keywords: ["紀律"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It teaches me discipline.", zh: "意思：這件事教會我紀律。", usageZh: "teach me… 是表達從中學到某種特質的常見說法。" }] },
              { keywords: ["保持年輕心態", "年輕心態"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It keeps me feeling young.", zh: "意思：這件事讓我保持年輕的心態。", usageZh: "keep me feeling young 是表達保持年輕心態的常見說法。" }] },
              { keywords: ["增值自己"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me grow as a person.", zh: "意思：這件事幫助我在個人層面成長。", usageZh: "grow as a person 是表達自我成長的常見說法。" }] },
              { keywords: ["遠離電話", "少啲用電話"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It gets me away from my phone for a while.", zh: "意思：這件事讓我可以暫時遠離手機。", usageZh: "get away from… 表示暫時遠離某個事物。" }] },
              { keywords: ["有活力", "更有活力"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It gives me more energy.", zh: "意思：這件事讓我更有活力。", usageZh: "give me more energy 是表達提升活力的常見說法。" }] },
              { keywords: ["建立習慣", "好習慣"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me build a healthy habit.", zh: "意思：這件事幫助我建立健康的習慣。", usageZh: "build a habit 是表達建立習慣的常見說法。" }] },
              { keywords: ["培養毅力", "毅力"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It builds my perseverance.", zh: "意思：這件事鍛鍊我的毅力。", usageZh: "build my perseverance 是表達鍛鍊毅力的常見說法。" }] },
              { keywords: ["學到生活技能", "生活技能"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It teaches me useful life skills.", zh: "意思：這件事教會我實用的生活技能。", usageZh: "life skills 是生活技能的正式說法。" }] },
              { keywords: ["有機會旅行"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It gives me a chance to travel.", zh: "意思：這件事讓我有機會旅行。", usageZh: "a chance to… 是表達獲得機會的常見說法。" }] },
              { keywords: ["認識唔同國家嘅人", "認識外國人"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It lets me meet people from different countries.", zh: "意思：這件事讓我可以認識不同國家的人。", usageZh: "people from different countries 是表達不同國籍人士的常見說法。" }] },
              { keywords: ["令我更加獨立", "獨立"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps me become more independent.", zh: "意思：這件事幫助我變得更獨立。", usageZh: "become more independent 是表達變得更獨立的常見說法。" }] },
              { keywords: ["增強記憶力", "記憶力"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps improve my memory.", zh: "意思：這件事幫助改善我的記憶力。", usageZh: "improve my memory 是表達改善記憶力的常見說法。" }] },
              { keywords: ["減少焦慮", "焦慮"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps reduce my anxiety.", zh: "意思：這件事幫助減少我的焦慮。", usageZh: "reduce my anxiety 是表達減少焦慮的常見說法。" }] },
              { keywords: ["令我情緒穩定", "情緒穩定"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It helps keep my emotions stable.", zh: "意思：這件事幫助我維持情緒穩定。", usageZh: "keep… stable 是表達維持穩定的常見說法。" }] },
              { keywords: ["令我更加開朗", "開朗"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It makes me more outgoing.", zh: "意思：這件事讓我變得更開朗。", usageZh: "more outgoing 是表達更開朗、外向的常見說法。" }] },
              { keywords: ["保持好奇心", "好奇心"], models: [{ labelZh: "最後一句 · Riley 教你講", en: "It keeps my sense of curiosity alive.", zh: "意思：這件事讓我保持好奇心。", usageZh: "keep… alive 是表達持續保有某種特質的常見說法。" }] },
            ],
          },
        ],
      },
      {
        id: "ask-back",
        title: "問返對方",
        goalZh: "學會將話題轉交給對方，讓對話自然地來回進行。",
        turns: [
          {
            id: "t1",
            questionZh: "介紹完自己後，你會如何反問對方？",
            chips: ["那你呢？", "你平時從事什麼工作？"],
            encouragementZh: "明白了，你想將話題交回給對方。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "And what about you? What do you do?",
                zh: "意思：那你呢？你的工作是什麼？",
                usageZh: "這句簡短得體，適合任何初次見面的場合。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "對方回答後，你想如何自然地接續話題？",
            chips: ["哇，聽起來真有趣", "原來如此，我也想試試"],
            encouragementZh: "明白了，你想給予回應以延續對話。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "That sounds really interesting!",
                zh: "意思：哇，聽起來真有趣！",
                usageZh: "這句幾乎適用於任何回應，能讓對話繼續下去。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "restaurant-order",
    title: "Order at a restaurant",
    titleZh: "餐廳點餐",
    description: "無論是點餐、提出要求，還是餐點出錯，都能從容應付。",
    accent: "yellow",
    icon: "fork-knife",
    chapters: [
      {
        id: "basic-order",
        title: "落單基本",
        goalZh: "學會有禮貌地點餐及加點飲品。",
        turns: [
          {
            id: "t1",
            questionZh: "服務生前來時，你會如何開始點餐？",
            chips: ["我想要...", "麻煩你，我想點餐"],
            encouragementZh: "明白了，你想開始點餐。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Could I have the grilled chicken, please?",
                zh: "意思：可以給我烤雞嗎？",
                usageZh: "Could I have… please 是最有禮貌的點餐說法。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "結帳前想加點一杯飲品，可以怎麼說？",
            chips: ["再加一杯...", "可以加點..."],
            encouragementZh: "明白了，你想加點飲品。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "And a glass of iced lemon tea, please.",
                zh: "意思：再加一杯凍檸茶，麻煩你。",
                usageZh: "在點餐尾聲加點飲品，服務生會明白這是額外加點的項目。",
              },
            ],
            // Matched against the learner's own typed answer (see `variants`
            // on the Turn type) — expanded to cover common HK drink orders,
            // so naming a specific drink teaches that drink's sentence
            // instead of always defaulting to iced lemon tea.
            variants: [
              {
                keywords: ["西瓜汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of watermelon juice, please.",
                    zh: "意思：再加一杯西瓜汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["橙汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of orange juice, please.",
                    zh: "意思：再加一杯橙汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["鮮榨橙汁", "鮮橙汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of freshly squeezed orange juice, please.",
                    zh: "意思：再加一杯鮮榨橙汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["蘋果汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of apple juice, please.",
                    zh: "意思：再加一杯蘋果汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["芒果汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of mango juice, please.",
                    zh: "意思：再加一杯芒果汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["提子汁", "葡萄汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of grape juice, please.",
                    zh: "意思：再加一杯提子汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["蕃茄汁", "番茄汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of tomato juice, please.",
                    zh: "意思：再加一杯蕃茄汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["木瓜汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of papaya juice, please.",
                    zh: "意思：再加一杯木瓜汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["士多啤梨汁", "草莓汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of strawberry juice, please.",
                    zh: "意思：再加一杯士多啤梨汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["菠蘿汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of pineapple juice, please.",
                    zh: "意思：再加一杯菠蘿汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["紅莓汁", "蔓越莓汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of cranberry juice, please.",
                    zh: "意思：再加一杯紅莓汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["雜果汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of mixed fruit juice, please.",
                    zh: "意思：再加一杯雜果汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["蜜瓜汁", "蜜瓜"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of honeydew juice, please.",
                    zh: "意思：再加一杯蜜瓜汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["西柚汁", "葡萄柚汁"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of grapefruit juice, please.",
                    zh: "意思：再加一杯西柚汁，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["凍檸茶", "檸檬茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of iced lemon tea, please.",
                    zh: "意思：再加一杯凍檸茶，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["熱檸茶", "熱檸檬茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of hot lemon tea, please.",
                    zh: "意思：再加一杯熱檸茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["檸蜜", "蜂蜜檸檬茶", "檸檬蜜"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of iced honey lemon tea, please.",
                    zh: "意思：再加一杯凍檸蜜，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["熱檸蜜"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of hot honey lemon tea, please.",
                    zh: "意思：再加一杯熱檸蜜，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["檸水", "檸檬水"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of iced lemon water, please.",
                    zh: "意思：再加一杯凍檸水，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["熱檸水"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of hot lemon water, please.",
                    zh: "意思：再加一杯熱檸水，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["檸樂"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of iced lemon coke, please.",
                    zh: "意思：再加一杯凍檸樂，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["熱檸樂"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of hot lemon coke, please.",
                    zh: "意思：再加一杯熱檸樂，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["檸七"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of iced lemon 7-up, please.",
                    zh: "意思：再加一杯凍檸七，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["奶茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of milk tea, please.",
                    zh: "意思：再加一杯奶茶，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["凍奶茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of iced milk tea, please.",
                    zh: "意思：再加一杯凍奶茶，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["熱奶茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of hot milk tea, please.",
                    zh: "意思：再加一杯熱奶茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["鴛鴦"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of yuenyeung, please.",
                    zh: "意思：再加一杯鴛鴦（咖啡奶茶），麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["熱鴛鴦"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of hot yuenyeung, please.",
                    zh: "意思：再加一杯熱鴛鴦，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["珍珠奶茶", "波霸奶茶", "泡泡茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of bubble milk tea, please.",
                    zh: "意思：再加一杯珍珠奶茶，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["菊花茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of chrysanthemum tea, please.",
                    zh: "意思：再加一杯菊花茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["普洱茶", "普洱"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of pu-erh tea, please.",
                    zh: "意思：再加一杯普洱茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["香片", "茉莉花茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of jasmine tea, please.",
                    zh: "意思：再加一杯茉莉花茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["烏龍茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of oolong tea, please.",
                    zh: "意思：再加一杯烏龍茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["綠茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of green tea, please.",
                    zh: "意思：再加一杯綠茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["紅茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of black tea, please.",
                    zh: "意思：再加一杯紅茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["龍井茶", "龍井"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of longjing tea, please.",
                    zh: "意思：再加一杯龍井茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["鐵觀音"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of tieguanyin tea, please.",
                    zh: "意思：再加一杯鐵觀音，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["伯爵茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of earl grey tea, please.",
                    zh: "意思：再加一杯伯爵茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["薄荷茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of mint tea, please.",
                    zh: "意思：再加一杯薄荷茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["洋甘菊茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of chamomile tea, please.",
                    zh: "意思：再加一杯洋甘菊茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["抹茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of matcha, please.",
                    zh: "意思：再加一杯抹茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["抹茶拿鐵"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of matcha latte, please.",
                    zh: "意思：再加一杯抹茶拿鐵，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["涼茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of herbal tea, please.",
                    zh: "意思：再加一杯涼茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["酸梅湯"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of sour plum drink, please.",
                    zh: "意思：再加一杯酸梅湯，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["冬瓜茶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of winter melon tea, please.",
                    zh: "意思：再加一杯冬瓜茶，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["竹蔗茅根水", "竹蔗水"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of sugarcane and reed root drink, please.",
                    zh: "意思：再加一杯竹蔗茅根水，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["陳皮水"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of dried tangerine peel drink, please.",
                    zh: "意思：再加一杯陳皮水，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["咖啡"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of coffee, please.",
                    zh: "意思：再加一杯咖啡，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["凍咖啡"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of iced coffee, please.",
                    zh: "意思：再加一杯凍咖啡，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["熱咖啡"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of hot coffee, please.",
                    zh: "意思：再加一杯熱咖啡，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["拿鐵"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of latte, please.",
                    zh: "意思：再加一杯拿鐵，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["凍拿鐵"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of iced latte, please.",
                    zh: "意思：再加一杯凍拿鐵，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["卡布奇諾"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of cappuccino, please.",
                    zh: "意思：再加一杯卡布奇諾，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["美式咖啡", "美式"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of Americano, please.",
                    zh: "意思：再加一杯美式咖啡，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["特濃咖啡", "濃縮咖啡", "意式濃縮"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of espresso, please.",
                    zh: "意思：再加一杯特濃咖啡，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["摩卡"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of mocha, please.",
                    zh: "意思：再加一杯摩卡，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["焦糖瑪奇朵"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of caramel macchiato, please.",
                    zh: "意思：再加一杯焦糖瑪奇朵，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["熱可可", "熱朱古力", "熱巧克力"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of hot chocolate, please.",
                    zh: "意思：再加一杯熱可可，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["凍朱古力奶", "凍朱古力", "凍巧克力"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of iced chocolate milk, please.",
                    zh: "意思：再加一杯凍朱古力奶，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["可樂"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of coke, please.",
                    zh: "意思：再加一杯可樂，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["雪碧", "七喜"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of sprite, please.",
                    zh: "意思：再加一杯雪碧，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["芬達"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of fanta, please.",
                    zh: "意思：再加一杯芬達，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["沙士"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of sarsi, please.",
                    zh: "意思：再加一杯沙士，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["忌廉梳打"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of cream soda, please.",
                    zh: "意思：再加一杯忌廉梳打，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["薑汁啤酒", "薑汁汽水"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of ginger ale, please.",
                    zh: "意思：再加一杯薑汁啤酒，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["有氣水", "梳打水", "湯力水"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of sparkling water, please.",
                    zh: "意思：再加一杯有氣水，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["好立克"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of Horlicks, please.",
                    zh: "意思：再加一杯好立克，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["凍好立克"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of iced Horlicks, please.",
                    zh: "意思：再加一杯凍好立克，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["阿華田"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of Ovaltine, please.",
                    zh: "意思：再加一杯阿華田，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["凍阿華田"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of iced Ovaltine, please.",
                    zh: "意思：再加一杯凍阿華田，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["鮮奶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of fresh milk, please.",
                    zh: "意思：再加一杯鮮奶，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["豆漿"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of soy milk, please.",
                    zh: "意思：再加一杯豆漿，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["杏仁茶", "杏仁露"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of almond milk tea, please.",
                    zh: "意思：再加一杯杏仁茶，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["維他奶"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a bottle of Vitasoy, please.",
                    zh: "意思：再加一樽維他奶，麻煩你。",
                    usageZh: "樽裝飲品用 a bottle of 表達最自然。",
                  },
                ],
              },
              {
                keywords: ["蜜糖水", "蜂蜜水"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of honey water, please.",
                    zh: "意思：再加一杯蜜糖水，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["礦泉水"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a bottle of mineral water, please.",
                    zh: "意思：再加一樽礦泉水，麻煩你。",
                    usageZh: "樽裝飲品用 a bottle of 表達最自然。",
                  },
                ],
              },
              {
                keywords: ["蒸餾水"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a bottle of distilled water, please.",
                    zh: "意思：再加一樽蒸餾水，麻煩你。",
                    usageZh: "樽裝飲品用 a bottle of 表達最自然。",
                  },
                ],
              },
              {
                keywords: ["凍水", "冰水"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of iced water, please.",
                    zh: "意思：再加一杯凍水，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["室溫水", "常溫水"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of room-temperature water, please.",
                    zh: "意思：再加一杯室溫水，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["熱水", "滾水"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a cup of hot water, please.",
                    zh: "意思：再加一杯熱水，麻煩你。",
                    usageZh: "熱飲用 a cup of 表達，效果同樣清楚有禮貌。",
                  },
                ],
              },
              {
                keywords: ["啤酒", "生啤"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a bottle of beer, please.",
                    zh: "意思：再加一樽啤酒，麻煩你。",
                    usageZh: "樽裝飲品用 a bottle of 表達最自然。",
                  },
                ],
              },
              {
                keywords: ["紅酒"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of red wine, please.",
                    zh: "意思：再加一杯紅酒，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["白酒", "白葡萄酒"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of white wine, please.",
                    zh: "意思：再加一杯白酒，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["香檳"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of champagne, please.",
                    zh: "意思：再加一杯香檳，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["威士忌"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of whisky, please.",
                    zh: "意思：再加一杯威士忌，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["芒果冰沙", "芒果沙冰"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of mango smoothie, please.",
                    zh: "意思：再加一杯芒果冰沙，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["檸檬冰沙"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of lemon slush, please.",
                    zh: "意思：再加一杯檸檬冰沙，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["楊枝甘露"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of mango pomelo sago, please.",
                    zh: "意思：再加一杯楊枝甘露，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["香蕉奶昔"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of banana milkshake, please.",
                    zh: "意思：再加一杯香蕉奶昔，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["朱古力奶昔", "巧克力奶昔"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of chocolate milkshake, please.",
                    zh: "意思：再加一杯朱古力奶昔，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["士多啤梨奶昔", "草莓奶昔"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of strawberry milkshake, please.",
                    zh: "意思：再加一杯士多啤梨奶昔，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["芒果奶昔"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of mango milkshake, please.",
                    zh: "意思：再加一杯芒果奶昔，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
              {
                keywords: ["西柚特飲", "西柚梳打"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "And a glass of grapefruit soda, please.",
                    zh: "意思：再加一杯西柚特飲，麻煩你。",
                    usageZh: "在點餐尾聲加點飲品時，冷飲用 a glass of 表達，清楚又有禮貌。",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "special-request",
        title: "提出特殊要求",
        goalZh: "學會禮貌地提出「少辣」和「去冰」兩種要求。",
        turns: [
          {
            id: "t1",
            questionZh: "點餐時你想提出什麼要求？",
            questionSubZh: "可以先用中文表達，我理解後再教你英文。",
            chips: ["可以少辣一點嗎？", "麻煩少辣一些", "少辣可以嗎？"],
            encouragementZh: "明白了，你想要求少辣。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Could you make it less spicy, please?",
                zh: "意思：可以做得沒那麼辣嗎？",
                usageZh: "點餐時或上菜前告訴服務生都適用，加上 please 最為妥當。",
              },
            ],
            // Matched against the learner's own typed answer (see `variants`
            // on the Turn type) — covers ingredient-removal / dietary
            // requests ("走芫茜", "對花生敏感"...) so naming a specific
            // ingredient teaches that request, instead of always defaulting
            // to the fixed less-spicy example.
            variants: [
              {
                keywords: ["芫茜", "香菜"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the coriander, please?",
                    zh: "意思：可以不要放芫茜嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["蔥", "葱"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the spring onion, please?",
                    zh: "意思：可以不要放蔥嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["蒜", "蒜頭"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the garlic, please?",
                    zh: "意思：可以不要放蒜嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["薑"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the ginger, please?",
                    zh: "意思：可以不要放薑嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["洋蔥"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the onion, please?",
                    zh: "意思：可以不要放洋蔥嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["辣椒", "指天椒"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the chili, please?",
                    zh: "意思：可以不要放辣椒嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["芥末"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the mustard, please?",
                    zh: "意思：可以不要放芥末嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["花生"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the peanuts, please?",
                    zh: "意思：可以不要放花生嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["味精"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the MSG, please?",
                    zh: "意思：可以不要放味精嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["芝士", "起司"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the cheese, please?",
                    zh: "意思：可以不要放芝士嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["沙律醬", "沙拉醬", "蛋黃醬"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the mayonnaise, please?",
                    zh: "意思：可以不要放沙律醬嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["皮蛋"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the century egg, please?",
                    zh: "意思：可以不要放皮蛋嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["蛋"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the egg, please?",
                    zh: "意思：可以不要放蛋嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["牛奶", "奶"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the milk, please?",
                    zh: "意思：可以不要放牛奶嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["蝦"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the shrimp, please?",
                    zh: "意思：可以不要放蝦嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["蟹"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the crab, please?",
                    zh: "意思：可以不要放蟹嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["堅果"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the nuts, please?",
                    zh: "意思：可以不要放堅果嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["豬肉"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the pork, please?",
                    zh: "意思：可以不要放豬肉嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["牛肉"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the beef, please?",
                    zh: "意思：可以不要放牛肉嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["海鮮"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the seafood, please?",
                    zh: "意思：可以不要放海鮮嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["麩質", "麥麩"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the gluten, please?",
                    zh: "意思：可以不要放麩質嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["青瓜", "黃瓜"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the cucumber, please?",
                    zh: "意思：可以不要放青瓜嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["番茄", "蕃茄"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the tomato, please?",
                    zh: "意思：可以不要放番茄嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["生菜"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the lettuce, please?",
                    zh: "意思：可以不要放生菜嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["韭菜"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the chives, please?",
                    zh: "意思：可以不要放韭菜嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["香菇", "冬菇", "蘑菇"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the mushrooms, please?",
                    zh: "意思：可以不要放香菇嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["芹菜"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the celery, please?",
                    zh: "意思：可以不要放芹菜嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["紫菜"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the seaweed, please?",
                    zh: "意思：可以不要放紫菜嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["木耳"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the wood ear mushroom, please?",
                    zh: "意思：可以不要放木耳嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["榨菜"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the pickled mustard greens, please?",
                    zh: "意思：可以不要放榨菜嗎？",
                    usageZh: "leave out 表示「不要放入」某項食材，適用於任何想去除的配料。",
                  },
                ],
              },
              {
                keywords: ["走青"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the spring onion and coriander, please?",
                    zh: "意思：可以不要放蔥和芫茜嗎？",
                    usageZh: "走青是廣東話常見說法，指同時去除蔥和芫茜這兩種配料。",
                  },
                ],
              },
              {
                keywords: ["少甜", "走甜", "唔要咁甜"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you make it less sweet, please?",
                    zh: "意思：可以做得沒那麼甜嗎？",
                    usageZh: "想調整甜度時，用 less sweet 代替 less spicy 即可。",
                  },
                ],
              },
              {
                keywords: ["少鹽", "走鹽", "清淡啲"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you make it less salty, please?",
                    zh: "意思：可以做得沒那麼鹹嗎？",
                    usageZh: "想調整鹹度時，用 less salty 表達最直接。",
                  },
                ],
              },
              {
                keywords: ["少油", "走油"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you make it less oily, please?",
                    zh: "意思：可以做得沒那麼油膩嗎？",
                    usageZh: "想減少油份時，用 less oily 表達最直接。",
                  },
                ],
              },
              {
                keywords: ["唔要辣", "免辣", "走辣", "唔要落辣椒"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you leave out the chili completely, please?",
                    zh: "意思：可以完全不要放辣椒嗎？",
                    usageZh: "「完全不要辣」和「少辣」不同，用 leave out…completely 表達得更準確。",
                  },
                ],
              },
              {
                keywords: ["加辣", "多辣", "要辣啲", "辣啲"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could you make it extra spicy, please?",
                    zh: "意思：可以做得更辣一點嗎？",
                    usageZh: "想要求加辣時用 extra spicy，和 less spicy 方向相反，不要混淆。",
                  },
                ],
              },
              {
                keywords: ["敏感", "過敏"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have a food allergy — could you leave that out, please?",
                    zh: "意思：我對這種食材過敏，可以不要放嗎？",
                    usageZh: "涉及食物敏感時，加上 food allergy 讓服務生更留意，比一般要求更重要。",
                  },
                ],
              },
            ],
          },
          {
            id: "t2",
            questionZh: "冷飲想去冰，可以怎麼說？",
            chips: ["我不要冰", "少量冰就好", "常溫的可以嗎？"],
            encouragementZh: "明白了，你想要求去冰。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "No ice, please.",
                enSmall: "Could I have it with no ice?",
                zh: "意思：不要冰／可以不加冰嗎？前者最直接，後者最有禮貌。",
                usageZh: "點餐時用前者，飲品已經調製好時用後者。",
              },
            ],
            // "少量冰" is NOT "no ice" — matched separately so answering
            // with less-ice wording doesn't teach the zero-ice sentence.
            variants: [
              {
                keywords: ["少少冰", "少量冰", "少啲冰", "小小冰", "少冰"],
                models: [
                  {
                    labelZh: "最後一句 · Riley 教你講",
                    en: "Just a little ice, please.",
                    zh: "意思：只要少量冰就可以，謝謝。",
                    usageZh: "如果只想要少量的冰、而非完全去冰，可以用 a little ice 代替 no ice。",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "wrong-order",
        title: "出錯餐點點講",
        goalZh: "學會有禮貌地指出送錯餐點，並要求更換。",
        turns: [
          {
            id: "t1",
            questionZh: "餐點送錯了，你會如何告訴服務生？",
            chips: ["這不是我點的", "我點的是..."],
            encouragementZh: "明白了，你想指出送錯了餐點。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Excuse me, I think this isn't what I ordered.",
                zh: "意思：不好意思，這個好像不是我點的。",
                usageZh: "用 I think 讓語氣更溫和，不會聽起來像在責怪。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "服務生反問你點了什麼，你會如何確認？",
            chips: ["我點的是...", "可以幫我換回來嗎？"],
            encouragementZh: "明白了，你想確認正確的餐點。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Could you please bring me the one I ordered?",
                zh: "意思：可以幫我換成我點的那個嗎？",
                usageZh: "這句既禮貌又清楚，服務生會立刻明白該怎麼處理。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "job-interview",
    title: "Ace an interview",
    titleZh: "求職面試",
    description: "分享自己的強項與經驗，保持冷靜自信。",
    accent: "lilac",
    icon: "briefcase",
    chapters: [
      {
        id: "self-intro",
        title: "自我介紹",
        goalZh: "學會用「名字＋年資＋職能」自我介紹。",
        turns: [
          {
            id: "t1",
            questionZh: "面試官請你簡單自我介紹，你會怎麼說？",
            chips: ["我叫...，目前從事...", "我有...年經驗"],
            encouragementZh: "明白了，你想說明自己的背景。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I'm Wei Ling, and I've been working in customer service for three years.",
                zh: "意思：我是 Wei Ling，已從事客戶服務三年。",
                usageZh: "開場採用這個結構最為穩妥：姓名 + 年資 + 職能。",
                namePlaceholder: "Wei Ling",
              },
            ],
            // Matched against the learner's own typed answer (see `variants`
            // on the Turn type) — covers "我有 N 年經驗" style answers so a
            // specific number of years teaches that number, instead of
            // always defaulting to the fixed 3-year example.
            variants: [
              {
                keywords: ["未有經驗", "沒有經驗", "冇經驗", "無經驗", "剛畢業", "應屆畢業生", "剛入行", "新人一個"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I don't have direct experience yet, but I'm a fast learner.",
                    zh: "意思：我暫時未有直接經驗，但我學習能力很快。",
                    usageZh: "面試時坦白說明沒有經驗、同時強調學習能力，是常見又誠實的說法。",
                  },
                ],
              },
              {
                keywords: ["十年以上", "超過十年", "十幾年", "十多年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have over ten years of experience.",
                    zh: "意思：我有超過十年經驗。",
                    usageZh: "over 表示「超過」，適合用來說明較長的年資，不需要說出精確數字。",
                  },
                ],
              },
              {
                keywords: ["好多年經驗", "很多年經驗", "多年經驗", "資深"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have many years of experience in this field.",
                    zh: "意思：我在這個領域有多年經驗。",
                    usageZh: "many years 適合在不想說出精確數字時使用，同樣清楚有說服力。",
                  },
                ],
              },
              {
                keywords: ["20年", "二十年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 20 years of experience.",
                    zh: "意思：我有 20 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["19年", "十九年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 19 years of experience.",
                    zh: "意思：我有 19 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["18年", "十八年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 18 years of experience.",
                    zh: "意思：我有 18 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["17年", "十七年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 17 years of experience.",
                    zh: "意思：我有 17 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["16年", "十六年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 16 years of experience.",
                    zh: "意思：我有 16 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["15年", "十五年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 15 years of experience.",
                    zh: "意思：我有 15 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["14年", "十四年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 14 years of experience.",
                    zh: "意思：我有 14 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["13年", "十三年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 13 years of experience.",
                    zh: "意思：我有 13 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["12年", "十二年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 12 years of experience.",
                    zh: "意思：我有 12 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["11年", "十一年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 11 years of experience.",
                    zh: "意思：我有 11 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["10年", "十年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 10 years of experience.",
                    zh: "意思：我有 10 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["9年", "九年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 9 years of experience.",
                    zh: "意思：我有 9 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["8年", "八年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 8 years of experience.",
                    zh: "意思：我有 8 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["7年", "七年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 7 years of experience.",
                    zh: "意思：我有 7 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["6年", "六年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 6 years of experience.",
                    zh: "意思：我有 6 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["5年", "五年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 5 years of experience.",
                    zh: "意思：我有 5 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["4年", "四年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 4 years of experience.",
                    zh: "意思：我有 4 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["3年", "三年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 3 years of experience.",
                    zh: "意思：我有 3 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["2年", "二年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 2 years of experience.",
                    zh: "意思：我有 2 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
              {
                keywords: ["1年", "一年"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "I have 1 year of experience.",
                    zh: "意思：我有 1 年經驗。",
                    usageZh: "I have + 年資 + years of experience，是說明工作年資最直接的說法。",
                  },
                ],
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想如何說明自己為什麼對這份工作感興趣？",
            chips: ["我喜歡這份工作是因為...", "這個職位適合我是因為..."],
            encouragementZh: "明白了，你想說明感興趣的原因。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "I'm excited about this role because it lets me grow my skills.",
                zh: "意思：我對這個職位很感興趣，因為它能幫助我提升技能。",
                usageZh: "用 excited 代替 interested 會顯得更有熱忱。",
              },
            ],
          },
        ],
      },
      {
        id: "strength-example",
        title: "強項加真實例子",
        goalZh: "說出一個強項，並補充一個真實發生過的例子。",
        turns: [
          {
            id: "t1",
            questionZh: "你認為自己在工作上最可靠的強項是什麼？",
            questionSubZh: "先用中文說出真實情況，不需要背誦模板。",
            chips: ["我做事有條理", "我做事很有系統", "我凡事都會事先計劃"],
            encouragementZh: "明白了，你想說明自己做事有系統。",
            models: [
              {
                labelZh: "第一行 · 講強項",
                en: "I'd say my biggest strength is staying organised.",
                zh: "意思：我最大的強項是做事有條理。",
                usageZh: "用 I'd say 開頭，語氣謙虛又自然。",
              },
              {
                labelZh: "第二行 · 加真實例子",
                en: "For example, I built a checklist that cut our reporting time by half.",
                zh: "意思：例如我製作了一份 checklist，讓報表時間減少一半。",
                usageZh: "具體數字（cut…by half）能讓答案更具說服力。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "還有沒有第二個例子可以支持你的強項？",
            chips: ["另外一次...", "還有一次我..."],
            encouragementZh: "明白了，你想再舉一個例子。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Another time, I reorganised our filing system, which saved the whole team time.",
                zh: "意思：另一次我重整了文件系統，為整個團隊節省了時間。",
                usageZh: "用 another time 承接上一個例子，不必重複 for example。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "team-meeting",
    title: "Speak up in a meeting",
    titleZh: "工作會議",
    description: "清楚說明進度、提出建議，推動工作向前邁進。",
    accent: "blue",
    icon: "presentation-chart",
    chapters: [
      {
        id: "status-update",
        title: "交代進度",
        goalZh: "學會清楚說明已完成的工作及下一步計劃。",
        turns: [
          {
            id: "t1",
            questionZh: "開會時你想如何說明這星期完成了哪些工作？",
            chips: ["這星期我完成了...", "我已經處理好..."],
            encouragementZh: "明白了，你想說明已完成的工作。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "This week, I completed the client report and sent it for review.",
                zh: "意思：這星期我完成了客戶報告，並已送出審核。",
                usageZh: "使用完成時態（completed）讓進度聽起來更加確定。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "說明完已完成的工作後，你想如何談下一步？",
            chips: ["下一步我會...", "接下來我打算..."],
            encouragementZh: "明白了，你想進一步說明下一步計劃。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Next, I'll follow up with the design team on the layout.",
                zh: "意思：下一步我會跟進設計組的版面安排。",
                usageZh: "用 next 開頭，讓進度報告聽起來更有結構。",
              },
            ],
          },
        ],
      },
      {
        id: "suggest-next-step",
        title: "提出建議",
        goalZh: "學會有條理地提出建議並解釋原因。",
        turns: [
          {
            id: "t1",
            questionZh: "你想在會議上提出一個建議，可以如何開口？",
            chips: ["我有一個建議", "不如我們試試..."],
            encouragementZh: "明白了，你想提出建議。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I'd like to suggest that we move the deadline up by a week.",
                zh: "意思：我想建議將截止日期提前一星期。",
                usageZh: "I'd like to suggest 語氣專業，又不會太強硬。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "如果隊友反問原因，你會如何解釋？",
            chips: ["因為這樣可以...", "這樣可以避免..."],
            encouragementZh: "明白了，你想解釋原因。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "This way, we'll have more time to test before launch.",
                zh: "意思：這樣我們在推出之前就有更多時間測試。",
                usageZh: "This way 能幫你將建議與結果連結在一起說明。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "travel-directions",
    title: "Ask for directions",
    titleZh: "旅行問路",
    description: "問路、確認方向，在陌生地方也不怕迷路。",
    accent: "coral",
    icon: "map-trifold",
    chapters: [
      {
        id: "basic-directions",
        title: "問路基本",
        goalZh: "學會有禮貌地問路並確認方向。",
        turns: [
          {
            id: "t1",
            questionZh: "你在街上想問路前往某個地方，可以如何開口？",
            chips: ["請問，怎麼去...？", "可以告訴我...怎麼去嗎？"],
            encouragementZh: "明白了，你想問路。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Excuse me, how do I get to the train station?",
                zh: "意思：不好意思，我該怎麼去火車站？",
                usageZh: "以 Excuse me 開頭最有禮貌，適合向任何陌生人詢問。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "對方指完路後，你想確認自己聽明白了，可以怎麼說？",
            chips: ["也就是一直走然後...？", "所以是左轉還是右轉？"],
            encouragementZh: "明白了，你想確認方向。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "So I just go straight and then turn left?",
                zh: "意思：也就是一直走然後左轉？",
                usageZh: "用 so…then 重複你聽到的重點，讓對方可以幫你確認。",
              },
            ],
          },
        ],
      },
      {
        id: "confirm-directions",
        title: "確認方向",
        goalZh: "學會詢問所需時間、距離，並有禮貌地道謝。",
        turns: [
          {
            id: "t1",
            questionZh: "如果你不確定要走多久，可以怎麼問？",
            chips: ["大概要走多久？", "會很遠嗎？"],
            encouragementZh: "明白了，你想進一步詢問距離和時間。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "How long does it take to walk there?",
                zh: "意思：走過去要多久？",
                usageZh: "詢問時間用 how long does it take，十分實用。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "感謝對方指路，你想如何有禮貌地道別？",
            chips: ["非常感謝", "真的幫了大忙，謝謝"],
            encouragementZh: "明白了，你想表達感謝。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Thank you so much, that's really helpful.",
                zh: "意思：非常感謝，真的幫了我很多。",
                usageZh: "這句適用於任何人幫助你之後，表達真心的感謝。",
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getScenario(scenarioId: string): Scenario | undefined {
  return scenarios.find((s) => s.id === scenarioId);
}

export function getChapter(scenarioId: string, chapterId: string) {
  const scenario = getScenario(scenarioId);
  return scenario?.chapters.find((c) => c.id === chapterId);
}

export function getScenarioIndex(scenarioId: string): number {
  return scenarios.findIndex((s) => s.id === scenarioId);
}
