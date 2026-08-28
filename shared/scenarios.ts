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
    level: "beginner",
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
                en: "Hi, I'm Wei Ling, nice to meet you.",
                zh: "意思：你好，我叫 Wei Ling，很高興認識你。",
                usageZh: "適用於認識新同事、活動場合的自我介紹，記得保持眼神接觸並面帶微笑。工作內容留待對方問起時再說明即可，不用一開口就交代。",
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
                usageZh: "想再簡短一點，只說 at a marketing agency 也可以。",
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
          {
            id: "t3",
            questionZh: "如果想補充自己主要負責的工作內容，可以怎麼說？",
            chips: ["我主要負責...", "我的工作內容包括..."],
            encouragementZh: "明白了，你想補充工作內容。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "My main responsibility is managing client relationships.",
                zh: "意思：我主要負責管理客戶關係。",
                usageZh: "My main responsibility is … 是簡潔說明工作內容的常見句型。",
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
              { keywords: ["普拉提"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy doing Pilates.", zh: "意思：我空閒時喜歡做普拉提。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["拳擊操", "搏擊操"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy boxercise classes.", zh: "意思：我空閒時喜歡上拳擊操課程。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["尊巴", "排舞"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy Zumba classes.", zh: "意思：我空閒時喜歡上尊巴課程。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["動感單車", "室內單車"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy spin classes.", zh: "意思：我空閒時喜歡上動感單車課程。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["睇波", "睇波賽", "睇足球賽", "睇NBA"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy watching sports.", zh: "意思：我空閒時喜歡看體育比賽。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["遛狗", "蹓狗"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy walking my dog.", zh: "意思：我空閒時喜歡遛狗。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["擼貓", "陪貓貓", "撸猫"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy spending time with my cat.", zh: "意思：我空閒時喜歡陪伴我的貓。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["踢毽"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy playing shuttlecock.", zh: "意思：我空閒時喜歡踢毽子。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["砌模型"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy building model kits.", zh: "意思：我空閒時喜歡砌模型。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["滾軸溜冰", "踩滾軸"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy roller skating.", zh: "意思：我空閒時喜歡玩滾軸溜冰。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["化妝"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy doing makeup.", zh: "意思：我空閒時喜歡化妝。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
              { keywords: ["整蠟燭", "香薰蠟燭"], models: [{ labelZh: "Riley 教你講", en: "In my free time, I enjoy making candles.", zh: "意思：我空閒時喜歡整蠟燭。", usageZh: "enjoy 後面直接加 -ing，不需要加 to。" }] },
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
          {
            id: "t3",
            questionZh: "如果想邀請對方一起參與這個興趣，可以怎麼說？",
            chips: ["有興趣一起試試嗎？", "下次可以一起去"],
            encouragementZh: "明白了，你想邀請對方一起參與。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Would you like to join me sometime?",
                zh: "意思：你有興趣下次一起參加嗎？",
                usageZh: "Would you like to … 是邀請別人最自然、有禮貌的說法。",
              },
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
          {
            id: "t3",
            questionZh: "如果想更深入了解對方的背景，可以怎麼問？",
            chips: ["你做這份工作多久了？", "是什麼讓你選擇這個領域？"],
            encouragementZh: "明白了，你想更深入了解對方的背景。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "What made you choose this field?",
                zh: "意思：是什麼讓你選擇這個領域？",
                usageZh: "What made you … 是深入了解對方背景時常用的問法。",
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
    level: "beginner",
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
            // Matched against the learner's own typed answer (see `variants`
            // on the Turn type) — covers common HK/Western dishes so naming
            // a specific dish teaches that dish's sentence, instead of
            // always defaulting to the fixed grilled-chicken example.
            variants: [
              {
                keywords: ["炸薯條", "薯條"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the fries, please?",
                    zh: "意思：可以給我炸薯條嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["牛扒", "牛排"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the steak, please?",
                    zh: "意思：可以給我牛扒嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["豬扒"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the pork chop, please?",
                    zh: "意思：可以給我豬扒嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["魚柳"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the fish fillet, please?",
                    zh: "意思：可以給我魚柳嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["三文魚"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the salmon, please?",
                    zh: "意思：可以給我三文魚嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["意粉", "意大利粉"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the pasta, please?",
                    zh: "意思：可以給我意粉嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["薄餅", "pizza", "披薩"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the pizza, please?",
                    zh: "意思：可以給我薄餅嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["漢堡", "漢堡包"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the burger, please?",
                    zh: "意思：可以給我漢堡嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["熱狗"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the hot dog, please?",
                    zh: "意思：可以給我熱狗嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["三文治"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the sandwich, please?",
                    zh: "意思：可以給我三文治嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["沙律", "沙拉"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the salad, please?",
                    zh: "意思：可以給我沙律嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["炸雞"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the fried chicken, please?",
                    zh: "意思：可以給我炸雞嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["雞翼"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the chicken wings, please?",
                    zh: "意思：可以給我雞翼嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["雞胸"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the chicken breast, please?",
                    zh: "意思：可以給我雞胸嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["焗豬扒飯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the baked pork chop rice, please?",
                    zh: "意思：可以給我焗豬扒飯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["牛肉飯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the beef rice, please?",
                    zh: "意思：可以給我牛肉飯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["叉燒飯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the char siu rice, please?",
                    zh: "意思：可以給我叉燒飯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["燒鴨飯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the roast duck rice, please?",
                    zh: "意思：可以給我燒鴨飯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["燒味飯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the roast meat rice, please?",
                    zh: "意思：可以給我燒味飯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["白切雞"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the poached chicken, please?",
                    zh: "意思：可以給我白切雞嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["咖喱雞"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the chicken curry, please?",
                    zh: "意思：可以給我咖喱雞嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["咖喱牛腩"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the beef brisket curry, please?",
                    zh: "意思：可以給我咖喱牛腩嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["星洲炒米"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the Singapore noodles, please?",
                    zh: "意思：可以給我星洲炒米嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["揚州炒飯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the Yangzhou fried rice, please?",
                    zh: "意思：可以給我揚州炒飯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["蛋炒飯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the egg fried rice, please?",
                    zh: "意思：可以給我蛋炒飯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["乾炒牛河"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the beef chow fun, please?",
                    zh: "意思：可以給我乾炒牛河嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["牛腩麵"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the beef brisket noodles, please?",
                    zh: "意思：可以給我牛腩麵嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["雲吞麵"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the wonton noodles, please?",
                    zh: "意思：可以給我雲吞麵嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["魚蛋粉"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the fish ball noodles, please?",
                    zh: "意思：可以給我魚蛋粉嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["老火湯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the slow-cooked soup, please?",
                    zh: "意思：可以給我老火湯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["通粉"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the macaroni, please?",
                    zh: "意思：可以給我通粉嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["米線"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the rice noodles, please?",
                    zh: "意思：可以給我米線嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["腸粉"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the rice noodle rolls, please?",
                    zh: "意思：可以給我腸粉嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["蝦餃"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the har gow, please?",
                    zh: "意思：可以給我蝦餃嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["燒賣"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the siu mai, please?",
                    zh: "意思：可以給我燒賣嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["叉燒包"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the char siu bao, please?",
                    zh: "意思：可以給我叉燒包嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["奶黃包"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the custard bun, please?",
                    zh: "意思：可以給我奶黃包嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["蘿蔔糕"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the turnip cake, please?",
                    zh: "意思：可以給我蘿蔔糕嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["春卷"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the spring rolls, please?",
                    zh: "意思：可以給我春卷嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["炒飯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the fried rice, please?",
                    zh: "意思：可以給我炒飯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["炒麵"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the fried noodles, please?",
                    zh: "意思：可以給我炒麵嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["煲仔飯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the clay pot rice, please?",
                    zh: "意思：可以給我煲仔飯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["白飯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the steamed rice, please?",
                    zh: "意思：可以給我白飯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["炒青菜", "炒菜"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the stir-fried vegetables, please?",
                    zh: "意思：可以給我炒青菜嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["壽司"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the sushi, please?",
                    zh: "意思：可以給我壽司嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["刺身"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the sashimi, please?",
                    zh: "意思：可以給我刺身嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["拉麵"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the ramen, please?",
                    zh: "意思：可以給我拉麵嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["天婦羅"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the tempura, please?",
                    zh: "意思：可以給我天婦羅嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["日式咖喱飯", "咖喱飯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the curry rice, please?",
                    zh: "意思：可以給我日式咖喱飯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["照燒雞"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the teriyaki chicken, please?",
                    zh: "意思：可以給我照燒雞嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["丼飯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the rice bowl, please?",
                    zh: "意思：可以給我丼飯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["味噌湯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the miso soup, please?",
                    zh: "意思：可以給我味噌湯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["湯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the soup, please?",
                    zh: "意思：可以給我湯嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["薯仔", "焗薯"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the baked potato, please?",
                    zh: "意思：可以給我薯仔嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["漢堡扒"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the beef patty, please?",
                    zh: "意思：可以給我漢堡扒嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["羊架"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the rack of lamb, please?",
                    zh: "意思：可以給我羊架嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["羊肉"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the lamb, please?",
                    zh: "意思：可以給我羊肉嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["燒鵝"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the roast goose, please?",
                    zh: "意思：可以給我燒鵝嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["燒肉"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the roast pork belly, please?",
                    zh: "意思：可以給我燒肉嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["扎蹄"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the braised pig trotters, please?",
                    zh: "意思：可以給我扎蹄嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["餃子", "水餃"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the dumplings, please?",
                    zh: "意思：可以給我餃子嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["生煎包"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the pan-fried buns, please?",
                    zh: "意思：可以給我生煎包嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
              },
              {
                keywords: ["小籠包"],
                models: [
                  {
                    labelZh: "Riley 教你講",
                    en: "Could I have the soup dumplings, please?",
                    zh: "意思：可以給我小籠包嗎？",
                    usageZh: "Could I have… please 是最有禮貌的點餐說法。",
                  },
                ],
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
          {
            id: "t3",
            questionZh: "如果想把吃不完的食物打包帶走，可以怎麼說？",
            chips: ["可以打包嗎？", "麻煩幫我打包"],
            encouragementZh: "明白了，你想要求打包。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Could I get this to go, please?",
                zh: "意思：可以幫我打包帶走嗎？",
                usageZh: "to go 是「外帶」的常見說法，適用於任何想打包的食物。",
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
          {
            id: "t3",
            questionZh: "如果想查詢某道菜是否含有你不能吃的成分，可以怎麼問？",
            chips: ["這道菜有花生嗎？", "這個含有海鮮嗎？"],
            encouragementZh: "明白了，你想查詢成分。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Does this dish contain any peanuts?",
                zh: "意思：這道菜有花生嗎？",
                usageZh: "Does this contain … 是查詢食物成分最直接的問法。",
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
          {
            id: "t3",
            questionZh: "結帳時發現賬單有誤，你會怎麼說？",
            chips: ["這個賬單好像不對", "可以幫我核對一下賬單嗎？"],
            encouragementZh: "明白了，你想指出賬單有誤。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "I think there's a mistake on the bill.",
                zh: "意思：我覺得這張賬單好像有誤。",
                usageZh: "I think there's a mistake 是禮貌指出問題的常見說法。",
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
    level: "beginner",
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
                en: "Hi, I'm Wei Ling, thank you for having me today.",
                zh: "意思：你好，我是 Wei Ling，謝謝你今天給我這個機會。",
                usageZh: "面試開場除了自我介紹，也可以加上感謝主考官的話，顯得有禮貌又專業。如果想進一步補充背景，可以用「姓名＋年資＋職能」這個結構。",
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
          {
            id: "t3",
            questionZh: "如果面試官問你何時可以到職，可以怎麼回答？",
            chips: ["我可以隨時到職", "我需要兩星期通知期"],
            encouragementZh: "明白了，你想說明到職時間。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "I can start immediately if needed.",
                zh: "意思：如果需要，我可以立即到職。",
                usageZh: "I can start … 是回答到職時間最直接的說法。",
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
          {
            id: "t3",
            questionZh: "如果面試官問你的弱點，你會怎麼回答？",
            chips: ["我有時會太注重細節", "我正在學習更有效地分配時間"],
            encouragementZh: "明白了，你想坦誠說明待改善的地方。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "I sometimes focus too much on details, but I'm learning to manage my time better.",
                zh: "意思：我有時會太注重細節，但我正在學習更有效分配時間。",
                usageZh: "承認弱點的同時補充正在改善，是回答這類問題最得體的方式。",
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
    level: "beginner",
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
          {
            id: "t3",
            questionZh: "如果工作上遇到困難，需要同事協助，可以怎麼說？",
            chips: ["我遇到一些困難", "可以幫我看看這個問題嗎？"],
            encouragementZh: "明白了，你想尋求協助。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "I've run into a bit of a snag — could someone take a look?",
                zh: "意思：我遇到一些困難，可以有人幫忙看看嗎？",
                usageZh: "run into a snag 是「遇到小麻煩」的常見說法，語氣輕鬆自然。",
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
          {
            id: "t3",
            questionZh: "如果隊友有不同意見，你想如何回應以達成共識？",
            chips: ["我明白你的看法", "或者我們可以結合兩個方案"],
            encouragementZh: "明白了，你想回應不同意見並尋求共識。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "That's a fair point — maybe we could combine both approaches.",
                zh: "意思：這個看法有道理，或者我們可以結合兩個方案。",
                usageZh: "That's a fair point 是禮貌回應不同意見、同時保持開放態度的常見說法。",
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
    level: "beginner",
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
          {
            id: "t3",
            questionZh: "如果想確認是否可以步行到達，可以怎麼問？",
            chips: ["可以走路過去嗎？", "搭車比較快嗎？"],
            encouragementZh: "明白了，你想確認交通方式。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Is it within walking distance?",
                zh: "意思：這裡走路可以到嗎？",
                usageZh: "within walking distance 是問「是否可以步行到達」的常見說法。",
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
          {
            id: "t3",
            questionZh: "如果想確認附近有明顯的地標方便辨認，可以怎麼問？",
            chips: ["附近有明顯的地標嗎？", "有什麼可以幫我認路嗎？"],
            encouragementZh: "明白了，你想確認附近的地標。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Is there a landmark nearby I can look out for?",
                zh: "意思：附近有沒有明顯的地標可以留意？",
                usageZh: "look out for 是「留意、找尋」的常見說法，問路時很實用。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "see-doctor",
    title: "See a doctor",
    titleZh: "睇醫生",
    description: "清楚描述身體狀況，聽懂醫生的建議，看病也能從容應對。",
    accent: "coral",
    icon: "stethoscope",
    level: "intermediate",
    chapters: [
      {
        id: "describe-symptoms",
        title: "描述症狀",
        goalZh: "學會清楚描述自己的身體狀況，讓醫生快速了解。",
        turns: [
          {
            id: "t1",
            questionZh: "醫生問你今天哪裡不舒服，你會怎麼說？",
            chips: ["我喉嚨痛", "我頭痛", "我發燒"],
            encouragementZh: "明白了，你想說明身體不適的地方。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I have a sore throat and a headache.",
                zh: "意思：我喉嚨痛，還有頭痛。",
                usageZh: "have 後面直接加症狀名稱，是描述不適最常見的說法。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "醫生想知道這個情況持續了多久，你會怎麼回答？",
            chips: ["已經兩天了", "從昨天開始"],
            encouragementZh: "明白了，你想說明持續的時間。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "It's been like this for two days.",
                zh: "意思：已經這樣兩天了。",
                usageZh: "It's been … for … 是說明症狀持續時間的常見句型。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "如果想知道是否需要做進一步檢查，可以怎麼問？",
            chips: ["需要做檢查嗎？", "需要驗血嗎？"],
            encouragementZh: "明白了，你想查詢是否需要進一步檢查。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Do I need to have any tests done?",
                zh: "意思：我需要做任何檢查嗎？",
                usageZh: "have tests done 是「接受檢查」的常見說法。",
              },
            ],
          },
        ],
      },
      {
        id: "doctor-instructions",
        title: "聽懂醫生建議",
        goalZh: "學會回應醫生的建議，並確認服藥方法。",
        turns: [
          {
            id: "t1",
            questionZh: "醫生建議你要多休息，你會怎麼回應？",
            chips: ["好的，我會多休息", "我會盡量早點睡"],
            encouragementZh: "明白了，你想回應醫生的建議。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Okay, I'll try to get more rest.",
                zh: "意思：好的，我會盡量多休息。",
                usageZh: "I'll try to … 語氣友善，表示願意配合。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想確認藥物該怎麼服用，可以怎麼問？",
            chips: ["一天要吃幾次？", "要飯後吃嗎？"],
            encouragementZh: "明白了，你想確認服藥方法。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "How many times a day should I take this?",
                zh: "意思：這個藥一天要吃幾次？",
                usageZh: "How many times a day 是詢問服藥頻率的常見說法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想確認這個藥物有沒有副作用，可以怎麼問？",
            chips: ["這個藥物有副作用嗎？", "服用後會有什麼反應嗎？"],
            encouragementZh: "明白了，你想查詢藥物的副作用。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Are there any side effects I should be aware of?",
                zh: "意思：有沒有我應該注意的副作用？",
                usageZh: "side effects 是「副作用」的固定說法，就診時常用得到。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "banking",
    title: "Open a bank account",
    titleZh: "銀行開戶",
    description: "開立戶口、查詢服務，處理銀行事務更有信心。",
    accent: "lilac",
    icon: "landmark",
    level: "intermediate",
    chapters: [
      {
        id: "open-account",
        title: "開立戶口",
        goalZh: "學會說明開戶目的，並回答基本個人資料問題。",
        turns: [
          {
            id: "t1",
            questionZh: "職員問你想辦理什麼服務，你會怎麼說？",
            chips: ["我想開一個戶口", "我想開儲蓄戶口"],
            encouragementZh: "明白了，你想說明來銀行的目的。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I'd like to open a savings account, please.",
                zh: "意思：我想開一個儲蓄戶口，麻煩你。",
                usageZh: "I'd like to … please 是辦理服務時最常用、最有禮貌的說法。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "職員想確認你帶齊文件未，你會怎麼回答？",
            chips: ["我帶了身份證", "我帶齊文件了"],
            encouragementZh: "明白了，你想確認文件齊全。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Yes, I have my ID and proof of address with me.",
                zh: "意思：有，我帶了身份證和地址證明。",
                usageZh: "proof of address 是「地址證明」的固定說法，開戶常用得到。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想查詢開戶是否需要手續費，可以怎麼問？",
            chips: ["開戶需要手續費嗎？", "最低存款額是多少？"],
            encouragementZh: "明白了，你想查詢開戶的相關費用。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Is there a fee for opening this account?",
                zh: "意思：開立這個戶口需要手續費嗎？",
                usageZh: "Is there a fee for … 是查詢是否需要收費的常見句型。",
              },
            ],
          },
        ],
      },
      {
        id: "account-services",
        title: "查詢戶口服務",
        goalZh: "學會查詢戶口相關服務，例如提款卡和網上銀行。",
        turns: [
          {
            id: "t1",
            questionZh: "你想查詢提款卡什麼時候可以領取，可以怎麼問？",
            chips: ["提款卡什麼時候會有？", "大概要等多久？"],
            encouragementZh: "明白了，你想查詢提款卡的領取時間。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "When can I expect to receive my debit card?",
                zh: "意思：我大概什麼時候會收到提款卡？",
                usageZh: "When can I expect to … 是查詢處理進度時常用、禮貌的問法。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想開通網上銀行服務，可以怎麼說？",
            chips: ["我想開通網上銀行", "可以幫我登記網上理財嗎？"],
            encouragementZh: "明白了，你想開通網上銀行服務。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Could you help me set up online banking?",
                zh: "意思：可以幫我開通網上銀行嗎？",
                usageZh: "set up 是表示「開通、設定」某項服務的常見說法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想查詢如何查看戶口結餘，可以怎麼問？",
            chips: ["可以怎麼查詢結餘？", "在哪裡查看交易記錄？"],
            encouragementZh: "明白了，你想查詢如何查看戶口結餘。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "How can I check my account balance?",
                zh: "意思：我可以怎樣查詢戶口結餘？",
                usageZh: "How can I … 是詢問操作方法時最常用的句型。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "shopping-returns",
    title: "Shop and return items",
    titleZh: "購物與退換貨",
    description: "試身、查詢尺寸，退換貨都能清楚表達。",
    accent: "blue",
    icon: "shopping-bag",
    level: "intermediate",
    chapters: [
      {
        id: "trying-items",
        title: "試身與查詢",
        goalZh: "學會查詢尺寸和顏色，並要求試身。",
        turns: [
          {
            id: "t1",
            questionZh: "你想查詢有沒有其他尺寸，可以怎麼問？",
            chips: ["有沒有大一點的？", "有其他尺寸嗎？"],
            encouragementZh: "明白了，你想查詢其他尺寸。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Do you have this in a bigger size?",
                zh: "意思：這件有大一點的尺寸嗎？",
                usageZh: "Do you have this in … 是查詢尺寸或顏色時最常用的句型。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想去試身室試穿，可以怎麼說？",
            chips: ["可以試身嗎？", "試身室在哪裡？"],
            encouragementZh: "明白了，你想要求試身。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Could I try this on, please?",
                zh: "意思：可以讓我試穿一下嗎？",
                usageZh: "try … on 是「試穿」的固定說法，適用於任何衣物。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "如果想查詢這件衣服是什麼材質，可以怎麼問？",
            chips: ["這件是什麼材質？", "洗滌方式是怎樣？"],
            encouragementZh: "明白了，你想查詢衣服的材質。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "What material is this made of?",
                zh: "意思：這件是用什麼材質做的？",
                usageZh: "What is … made of 是查詢材質最直接的問法。",
              },
            ],
          },
        ],
      },
      {
        id: "returns-exchanges",
        title: "退貨與換貨",
        goalZh: "學會禮貌地提出退貨或換貨要求。",
        turns: [
          {
            id: "t1",
            questionZh: "你想退回一件不合適的商品，可以怎麼說？",
            chips: ["我想退這件", "可以退款嗎？"],
            encouragementZh: "明白了，你想提出退貨要求。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I'd like to return this, please.",
                zh: "意思：我想退這件，麻煩你。",
                usageZh: "I'd like to return this 是提出退貨最直接、有禮貌的說法。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "職員問你想退款還是換貨，你會怎麼答？",
            chips: ["我想換另一個尺寸", "我想退款"],
            encouragementZh: "明白了，你想說明換貨或退款的選擇。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I'd prefer to exchange it for a different size.",
                zh: "意思：我比較想換另一個尺寸。",
                usageZh: "I'd prefer to … 語氣溫和，適合表達自己的選擇。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "職員問你有沒有帶收據，可以怎麼回答？",
            chips: ["有，收據在這裡", "我沒有收據，可以嗎？"],
            encouragementZh: "明白了，你想說明收據狀況。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Yes, I have the receipt right here.",
                zh: "意思：有，收據就在這裡。",
                usageZh: "right here 強調「就在手邊」，回答時更清楚俐落。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "apartment-rental",
    title: "Rent an apartment",
    titleZh: "租屋",
    description: "睇樓、簽約，處理租屋事務更有信心。",
    accent: "mint",
    icon: "house",
    level: "intermediate",
    chapters: [
      {
        id: "viewing-apartment",
        title: "睇樓",
        goalZh: "學會查詢租金、租期及單位設備。",
        turns: [
          {
            id: "t1",
            questionZh: "你想向地產經紀查詢租金，可以怎麼問？",
            chips: ["這裡的租金是多少？", "租金包不包水電？"],
            encouragementZh: "明白了，你想查詢租金。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "How much is the rent per month?",
                zh: "意思：這裡每個月的租金是多少？",
                usageZh: "per month 明確表示「每月」，避免與押金或其他費用混淆。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想查詢是否需要簽長約，可以怎麼問？",
            chips: ["最短需要租多久？", "可以簽一年的合約嗎？"],
            encouragementZh: "明白了，你想查詢租期。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "What's the minimum lease term?",
                zh: "意思：最短的租期是多久？",
                usageZh: "lease term 是「租期」的固定說法，睇樓時常用得到。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想查詢單位是否已經有傢俱，可以怎麼問？",
            chips: ["這個單位有傢俱嗎？", "是否連傢俱出租？"],
            encouragementZh: "明白了，你想查詢單位是否已有傢俱。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Is this apartment furnished?",
                zh: "意思：這個單位是連傢俱出租的嗎？",
                usageZh: "furnished 表示「已配備傢俱」，是租屋時常見的用字。",
              },
            ],
          },
        ],
      },
      {
        id: "signing-lease",
        title: "簽約",
        goalZh: "學會查詢按金、維修責任及退租條件。",
        turns: [
          {
            id: "t1",
            questionZh: "你想查詢按金是多少，可以怎麼問？",
            chips: ["按金需要多少？", "需要付幾個月的按金？"],
            encouragementZh: "明白了，你想查詢按金金額。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "How much is the deposit?",
                zh: "意思：按金是多少？",
                usageZh: "deposit 是「按金」的固定說法，簽約時一定會用到。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想查詢維修責任歸誰，可以怎麼問？",
            chips: ["維修責任由誰負責？", "電器損壞應該怎麼處理？"],
            encouragementZh: "明白了，你想查詢維修責任。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Who's responsible for repairs?",
                zh: "意思：維修責任是由誰負責？",
                usageZh: "Who's responsible for … 是查詢責任歸屬最直接的問法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想確認退租時按金是否可以全數退還，可以怎麼問？",
            chips: ["退租時按金可以全數退還嗎？", "什麼情況會扣除按金？"],
            encouragementZh: "明白了，你想確認退租時按金的退還條件。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Will I get the full deposit back when I move out?",
                zh: "意思：搬走的時候可以拿回全額按金嗎？",
                usageZh: "move out 是「搬走、遷出」的常見說法，租屋情境中經常使用。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "post-office",
    title: "Visit the post office",
    titleZh: "郵局",
    description: "寄包裹、買郵票，處理郵寄事務更有信心。",
    accent: "yellow",
    icon: "mail",
    level: "intermediate",
    chapters: [
      {
        id: "sending-package",
        title: "寄包裹",
        goalZh: "學會查詢寄件時間、方式及追蹤服務。",
        turns: [
          {
            id: "t1",
            questionZh: "你想查詢寄包裹去外國需要多久，可以怎麼問？",
            chips: ["寄到國外需要多久？", "大約幾天可以收到？"],
            encouragementZh: "明白了，你想查詢寄件所需時間。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "How long does international shipping take?",
                zh: "意思：寄到國外大概需要多久？",
                usageZh: "international shipping 是「國際運送」的固定說法。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "職員問你想用什麼方式寄送，可以怎麼回答？",
            chips: ["我想用空運", "可以用平郵嗎？"],
            encouragementZh: "明白了，你想說明寄送方式。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I'd like to send it by air mail, please.",
                zh: "意思：我想用空運寄送，麻煩你。",
                usageZh: "by air mail 是「用空運」的固定說法，寄件時常用。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想查詢有沒有追蹤服務，可以怎麼問？",
            chips: ["包裹如果遺失怎麼辦？", "有沒有追蹤服務？"],
            encouragementZh: "明白了，你想查詢包裹的追蹤服務。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Is there a tracking service available?",
                zh: "意思：有沒有可以追蹤包裹的服務？",
                usageZh: "tracking service 是「追蹤服務」的固定說法，寄貴重物品時特別實用。",
              },
            ],
          },
        ],
      },
      {
        id: "buying-stamps",
        title: "買郵票",
        goalZh: "學會查詢郵費並購買郵票。",
        turns: [
          {
            id: "t1",
            questionZh: "你想查詢寄信去某個地方需要多少郵費，可以怎麼問？",
            chips: ["寄信到那裡需要多少郵費？", "郵費是怎麼計算的？"],
            encouragementZh: "明白了，你想查詢郵費。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "How much does it cost to mail a letter there?",
                zh: "意思：寄一封信去那裡需要多少錢？",
                usageZh: "mail a letter 是「寄信」的常見說法。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想購買幾張郵票，可以怎麼說？",
            chips: ["我想買幾張郵票", "可以買五張郵票嗎？"],
            encouragementZh: "明白了，你想購買郵票。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Could I get five stamps, please?",
                zh: "意思：可以給我五張郵票嗎？",
                usageZh: "Could I get … please 是購買物品時最有禮貌的說法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想查詢是否有特別版郵票出售，可以怎麼問？",
            chips: ["有沒有特別版郵票？", "有紀念郵票出售嗎？"],
            encouragementZh: "明白了，你想查詢是否有特別版郵票。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Do you have any special edition stamps?",
                zh: "意思：有沒有特別版的郵票？",
                usageZh: "special edition 是「特別版、限定版」的常見說法。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "negotiation",
    title: "Negotiate a deal",
    titleZh: "商務談判",
    description: "提出立場、回應條件，達成雙方都能接受的共識。",
    accent: "coral",
    icon: "handshake",
    level: "advanced",
    chapters: [
      {
        id: "opening-position",
        title: "提出立場",
        goalZh: "學會清楚表明立場，並委婉回應不接受的條件。",
        turns: [
          {
            id: "t1",
            questionZh: "洽談開始時，你想表明自己的立場，可以怎麼說？",
            chips: ["我方的底線是...", "我希望能夠..."],
            encouragementZh: "明白了，你想表明自己的立場。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Let me start by outlining our position.",
                zh: "意思：讓我先說明一下我方的立場。",
                usageZh: "Let me start by … 是正式場合開場最常用的句型。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "對方提出的條件你未能接受，可以怎麼回應？",
            chips: ["這個條件我方難以接受", "可以再商議一下嗎？"],
            encouragementZh: "明白了，你想表達未能接受對方的條件。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I'm afraid that doesn't quite work for us.",
                zh: "意思：恐怕這個條件對我方來說不太可行。",
                usageZh: "I'm afraid … doesn't work for us 是委婉拒絕條件的常見說法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想提出一個折衷方案，可以怎麼說？",
            chips: ["不如我們各讓一步", "有沒有折衷的方案？"],
            encouragementZh: "明白了，你想提出折衷方案。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Perhaps we could meet somewhere in the middle.",
                zh: "意思：或者我們可以各讓一步，取一個中間方案。",
                usageZh: "meet in the middle 是「各讓一步、達成折衷」的固定說法。",
              },
            ],
          },
        ],
      },
      {
        id: "reaching-compromise",
        title: "達成共識",
        goalZh: "學會確認共識、總結結果並安排跟進。",
        turns: [
          {
            id: "t1",
            questionZh: "你想確認雙方已經達成共識，可以怎麼問？",
            chips: ["那麼是否代表大家都同意？", "可以確認一下嗎？"],
            encouragementZh: "明白了，你想確認雙方是否已達成共識。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "So, are we in agreement on this?",
                zh: "意思：那麼，我們對這一點是否已經達成共識？",
                usageZh: "are we in agreement 是確認雙方共識時常用的問法。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想總結今次談判的結果，可以怎麼說？",
            chips: ["讓我總結一下", "那麼我們就這樣決定"],
            encouragementZh: "明白了，你想總結談判結果。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Let me just summarise what we've agreed on.",
                zh: "意思：讓我總結一下我們已經達成的共識。",
                usageZh: "summarise what we've agreed on 是正式場合總結共識時常用的說法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想提出下一步跟進的安排，可以怎麼說？",
            chips: ["接下來應該怎麼做？", "我們什麼時候再跟進？"],
            encouragementZh: "明白了，你想提出下一步的安排。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Let's schedule a follow-up to finalise the details.",
                zh: "意思：我們安排一次跟進會議，敲定詳細內容。",
                usageZh: "schedule a follow-up 是安排後續會議的常見說法。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "handling-complaints",
    title: "Handle a complaint",
    titleZh: "處理投訴",
    description: "聆聽投訴、提出解決方案，妥善化解客人的不滿。",
    accent: "lilac",
    icon: "headset",
    level: "advanced",
    chapters: [
      {
        id: "listening-to-complaint",
        title: "聆聽投訴",
        goalZh: "學會先表達理解，再了解事情經過並作出保證。",
        turns: [
          {
            id: "t1",
            questionZh: "客人向你投訴服務有問題，你想先表達理解，可以怎麼說？",
            chips: ["我理解你的感受", "對此我深感抱歉"],
            encouragementZh: "明白了，你想先表達理解和歉意。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I completely understand your frustration, and I'm sorry for the inconvenience.",
                zh: "意思：我完全理解你的不滿，亦為造成的不便致歉。",
                usageZh: "先表達理解和道歉，是處理投訴的第一步，能讓對方感受到被重視。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想進一步了解事情的經過，可以怎麼問？",
            chips: ["可以詳細說明一下嗎？", "事情是怎麼發生的？"],
            encouragementZh: "明白了，你想進一步了解事情經過。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Could you walk me through what happened?",
                zh: "意思：可以詳細告訴我事情的經過嗎？",
                usageZh: "walk me through 是「詳細說明過程」的常見說法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想向客人保證會認真跟進，可以怎麼說？",
            chips: ["我們會認真跟進", "我會盡快處理這件事"],
            encouragementZh: "明白了，你想保證會認真跟進。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "I'll personally make sure this gets resolved.",
                zh: "意思：我會親自確保這件事得到解決。",
                usageZh: "personally make sure 強調親自負責，能讓對方更放心。",
              },
            ],
          },
        ],
      },
      {
        id: "proposing-solution",
        title: "提出解決方案",
        goalZh: "學會提出補償方案並得體地結束對話。",
        turns: [
          {
            id: "t1",
            questionZh: "你想向客人提出補償方案，可以怎麼說？",
            chips: ["我們可以退還部分費用", "可以為你更換一件新的"],
            encouragementZh: "明白了，你想提出補償方案。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "We'd like to offer you a partial refund as an apology.",
                zh: "意思：我們想以部分退款作為道歉。",
                usageZh: "as an apology 明確表達補償的用意，語氣誠懇。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "客人對方案不滿意，你想提出另一個選擇，可以怎麼說？",
            chips: ["不如試試這個方案", "還有其他方法嗎？"],
            encouragementZh: "明白了，你想提出另一個選擇。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Would an upgrade to the next tier work better for you?",
                zh: "意思：升級到下一個等級會不會更適合你？",
                usageZh: "work better for you 是禮貌詢問對方是否更滿意某方案的說法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "解決方案達成後，你想感謝客人的耐心，可以怎麼說？",
            chips: ["謝謝你的耐心", "謝謝你的理解"],
            encouragementZh: "明白了，你想感謝客人的耐心。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Thank you for your patience while we sorted this out.",
                zh: "意思：謝謝你在我們處理這件事期間的耐心等候。",
                usageZh: "sort this out 是「解決這件事」的常見說法，語氣自然。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "public-speaking",
    title: "Give a public speech",
    titleZh: "公開演講",
    description: "組織演講內容、應對問答，自信地面對聽眾。",
    accent: "blue",
    icon: "megaphone",
    level: "advanced",
    chapters: [
      {
        id: "structuring-speech",
        title: "組織演講內容",
        goalZh: "學會設計開場、帶出重點及自然過渡。",
        turns: [
          {
            id: "t1",
            questionZh: "演講開場，你想吸引聽眾的注意，可以怎麼說？",
            chips: ["讓我從一個問題開始", "不如先分享一個故事"],
            encouragementZh: "明白了，你想用問題或故事吸引聽眾注意。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Let me start with a question that changed the way I think.",
                zh: "意思：讓我從一個改變了我想法的問題開始。",
                usageZh: "用問題或故事開場，是吸引聽眾注意力的常見技巧。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想帶出演講的主要論點，可以怎麼說？",
            chips: ["今天想和大家分享的是", "我的重點有三個"],
            encouragementZh: "明白了，你想帶出演講的主要論點。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Today, I want to talk about three key ideas.",
                zh: "意思：今天，我想談三個重要的觀點。",
                usageZh: "用數字（three key ideas）預告內容架構，有助聽眾跟上思路。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想在段落之間自然過渡，可以怎麼說？",
            chips: ["說完這一點，接下來談下一個", "這帶出另一個重點"],
            encouragementZh: "明白了，你想在段落之間自然過渡。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "That brings me to my next point.",
                zh: "意思：這帶出了我的下一個重點。",
                usageZh: "That brings me to … 是段落之間自然過渡的常用句型。",
              },
            ],
          },
        ],
      },
      {
        id: "handling-qa",
        title: "應對問答環節",
        goalZh: "學會應對突發問題、澄清誤解並得體結尾。",
        turns: [
          {
            id: "t1",
            questionZh: "聽眾問了一個你未準備好的問題，可以怎麼回應？",
            chips: ["這個問題我需要再想一下", "我稍後補充回答"],
            encouragementZh: "明白了，你想坦誠回應未準備好的問題。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "That's a great question — let me think about that for a moment.",
                zh: "意思：這是個好問題，讓我想一想。",
                usageZh: "讚賞問題並爭取思考時間，是應對突發問題的常見技巧。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想澄清聽眾誤解了你的意思，可以怎麼說？",
            chips: ["我想澄清一下", "我的意思並非如此"],
            encouragementZh: "明白了，你想澄清對方的誤解。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "To clarify, that's not quite what I meant.",
                zh: "意思：澄清一下，我的意思並非如此。",
                usageZh: "To clarify 是禮貌澄清誤解、避免衝突的常用開場語。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "問答環節結束，你想感謝聽眾的參與，可以怎麼說？",
            chips: ["謝謝大家的提問", "謝謝各位的參與"],
            encouragementZh: "明白了，你想感謝聽眾的參與。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Thank you all for such thoughtful questions.",
                zh: "意思：謝謝大家提出這麼有深度的問題。",
                usageZh: "thoughtful questions 稱讚聽眾提問有深度，是得體的結尾方式。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "networking-event",
    title: "Work a networking event",
    titleZh: "社交場合",
    description: "自然寒暄、交換聯絡方式，建立有意義的人脈。",
    accent: "mint",
    icon: "users",
    level: "advanced",
    chapters: [
      {
        id: "making-small-talk",
        title: "寒暄閒聊",
        goalZh: "學會主動開始對話並自然轉換話題。",
        turns: [
          {
            id: "t1",
            questionZh: "在社交場合想主動和陌生人開始對話，可以怎麼說？",
            chips: ["你也是第一次來這個活動嗎？", "這個活動很有意思"],
            encouragementZh: "明白了，你想主動開始對話。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Is this your first time at one of these events?",
                zh: "意思：這是你第一次參加這類活動嗎？",
                usageZh: "用一個輕鬆的問題開場，是打開話題最自然的方法。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想介紹自己的工作範疇，可以怎麼說？",
            chips: ["我目前在...從事...", "我主要負責的是..."],
            encouragementZh: "明白了，你想介紹自己的工作範疇。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I work in marketing, mainly focusing on digital campaigns.",
                zh: "意思：我從事市場推廣，主要專注於數碼推廣活動。",
                usageZh: "mainly focusing on … 可以具體補充自己的專長範疇。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "對話開始冷場，你想轉換話題，可以怎麼說？",
            chips: ["說起來，你怎麼看...", "換個話題，你有沒有..."],
            encouragementZh: "明白了，你想自然地轉換話題。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "By the way, what did you think of the keynote speech?",
                zh: "意思：說起來，你覺得剛才的主題演講怎麼樣？",
                usageZh: "By the way 是自然轉換話題最常用的過渡語。",
              },
            ],
          },
        ],
      },
      {
        id: "exchanging-contacts",
        title: "交換聯絡方式",
        goalZh: "學會索取聯絡方式並得體地道別。",
        turns: [
          {
            id: "t1",
            questionZh: "你想向對方索取聯絡方式，可以怎麼說？",
            chips: ["可以交換一下名片嗎？", "可以加一下LinkedIn嗎？"],
            encouragementZh: "明白了，你想索取對方的聯絡方式。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Would it be okay to exchange contact details?",
                zh: "意思：可以交換一下聯絡方式嗎？",
                usageZh: "Would it be okay to … 是禮貌提出請求的常見句型。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想約對方之後再詳談，可以怎麼說？",
            chips: ["不如之後找時間再詳談", "有機會約你喝杯咖啡"],
            encouragementZh: "明白了，你想約對方之後再詳談。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I'd love to grab a coffee sometime and continue this conversation.",
                zh: "意思：我想找機會約你喝杯咖啡，繼續這個話題。",
                usageZh: "grab a coffee 是「約見面小聚」的常見輕鬆說法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "道別時你想表達今次交流很有收穫，可以怎麼說？",
            chips: ["今天真的獲益良多", "很高興認識你"],
            encouragementZh: "明白了，你想表達今次交流的收穫。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "It was great chatting with you — I really enjoyed our conversation.",
                zh: "意思：很高興跟你聊天，這次對話讓我獲益良多。",
                usageZh: "道別前總結對話的正面感受，是留下好印象的常見做法。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "giving-feedback",
    title: "Give feedback",
    titleZh: "給予意見",
    description: "提出建設性意見，並妥善處理較困難的對話。",
    accent: "yellow",
    icon: "message-square",
    level: "advanced",
    chapters: [
      {
        id: "constructive-feedback",
        title: "建設性意見",
        goalZh: "學會禮貌開口、具體指出改善之處並正面總結。",
        turns: [
          {
            id: "t1",
            questionZh: "你想向同事提出建設性意見，可以怎麼開口？",
            chips: ["我有一些想法想跟你分享", "可以說一下我的想法嗎？"],
            encouragementZh: "明白了，你想禮貌地開口提出意見。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Do you have a moment? I have some feedback to share.",
                zh: "意思：你有時間嗎？我有一些意見想分享。",
                usageZh: "先確認對方有沒有時間，是提出意見前的禮貌做法。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想具體指出可以改善的地方，可以怎麼說？",
            chips: ["這部分或許可以再加強", "如果...會更好"],
            encouragementZh: "明白了，你想具體指出可以改善的地方。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "One area that could use some improvement is the introduction.",
                zh: "意思：其中一個可以改善的地方是開場部分。",
                usageZh: "One area that could use some improvement 語氣溫和，避免直接批評。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想以正面的話總結意見，可以怎麼說？",
            chips: ["不過整體來說做得很好", "我覺得你已經進步了很多"],
            encouragementZh: "明白了，你想以正面的話總結意見。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Overall, though, this is really solid work.",
                zh: "意思：不過整體來說，這份工作做得相當扎實。",
                usageZh: "用 overall, though 帶出正面總結，令意見更容易被接受。",
              },
            ],
          },
        ],
      },
      {
        id: "difficult-conversation",
        title: "較困難的對話",
        goalZh: "學會指出重複發生的問題、緩和防禦反應並確認下一步。",
        turns: [
          {
            id: "t1",
            questionZh: "你需要指出對方一個重複發生的問題，可以怎麼開口？",
            chips: ["這件事已經發生了幾次", "我想跟你談談這個情況"],
            encouragementZh: "明白了，你想指出一個重複發生的問題。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I wanted to talk to you because this has come up a few times now.",
                zh: "意思：我想跟你談談，因為這件事已經發生了幾次。",
                usageZh: "this has come up a few times 客觀陳述事實，避免情緒化指責。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "對方對你的意見有防禦反應，你想緩和氣氛，可以怎麼說？",
            chips: ["我不是想怪你", "我只是想幫忙"],
            encouragementZh: "明白了，你想緩和對方的防禦反應。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I'm not trying to point fingers — I just want us to find a solution together.",
                zh: "意思：我不是想指責誰，只是想我們一起找出解決方法。",
                usageZh: "point fingers 是「指責、怪責」的常見說法，否定它可以緩和對方情緒。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "對話結束，你想確認雙方都清楚下一步，可以怎麼說？",
            chips: ["那麼我們下一步怎麼做？", "希望之後會有改善"],
            encouragementZh: "明白了，你想確認雙方都清楚下一步。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Let's agree on what we'll both do differently going forward.",
                zh: "意思：讓我們確認一下大家之後會怎麼做得不一樣。",
                usageZh: "going forward 是「之後、往後」的常見商務用語。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "debate-discussion",
    title: "Debate and discuss",
    titleZh: "辯論與討論",
    description: "提出論點、回應反駁，有條理地捍衛自己的立場。",
    accent: "coral",
    icon: "swords",
    level: "proficient",
    chapters: [
      {
        id: "presenting-argument",
        title: "提出論點",
        goalZh: "學會陳述立場、用數據支持並預先回應反駁。",
        turns: [
          {
            id: "t1",
            questionZh: "辯論開始，你想清楚陳述自己的立場，可以怎麼說？",
            chips: ["我的立場是...", "我認為...的原因有三個"],
            encouragementZh: "明白了，你想清楚陳述自己的立場。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "My position is that we should prioritise long-term sustainability over short-term gains.",
                zh: "意思：我的立場是，我們應該將長遠可持續性置於短期利益之前。",
                usageZh: "My position is that … 是辯論中清楚表明立場的正式句型。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想用數據或例子支持自己的論點，可以怎麼說？",
            chips: ["有數據可以證明...", "舉個例子..."],
            encouragementZh: "明白了，你想用數據或例子支持論點。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "The data clearly supports this — studies show a 40% improvement.",
                zh: "意思：數據清楚支持這一點——研究顯示有百分之四十的改善。",
                usageZh: "用具體數字支持論點，可以大大增加說服力。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想預先回應對方可能提出的反駁，可以怎麼說？",
            chips: ["有人可能會說...", "但這樣想的問題在於"],
            encouragementZh: "明白了，你想預先回應對方可能提出的反駁。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Some might argue otherwise, but that overlooks a key factor.",
                zh: "意思：有些人可能持不同意見，但這忽略了一個關鍵因素。",
                usageZh: "Some might argue otherwise, but … 是預先反駁對方觀點的常見句型。",
              },
            ],
          },
        ],
      },
      {
        id: "rebutting-counterpoint",
        title: "回應反駁",
        goalZh: "學會先肯定對方、指出論點漏洞並總結立場。",
        turns: [
          {
            id: "t1",
            questionZh: "對方提出反駁，你想先承認他論點的一部分，可以怎麼說？",
            chips: ["你提到的這一點很有道理", "我明白你的憂慮"],
            encouragementZh: "明白了，你想先承認對方論點的一部分。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "You raise a fair point, but let me offer another perspective.",
                zh: "意思：你提出的這一點很合理，但讓我提供另一個角度。",
                usageZh: "先肯定對方觀點再提出反駁，是辯論中更有說服力的技巧。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想指出對方論點的漏洞，可以怎麼說？",
            chips: ["這個論點忽略了一件事", "還有一個問題未解決"],
            encouragementZh: "明白了，你想指出對方論點的漏洞。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "That argument doesn't account for the long-term costs involved.",
                zh: "意思：這個論點沒有考慮到當中的長期成本。",
                usageZh: "doesn't account for … 是指出論點漏洞時常用、語氣客觀的說法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "辯論結束，你想重申自己的立場作總結，可以怎麼說？",
            chips: ["總括來說，我依然認為", "回到最初的論點"],
            encouragementZh: "明白了，你想重申立場作總結。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "In conclusion, the evidence still points to the same answer.",
                zh: "意思：總括來說，證據依然指向同一個結論。",
                usageZh: "In conclusion 是正式總結論點時最常用的開場語。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "persuasion",
    title: "Persuade with confidence",
    titleZh: "說服技巧",
    description: "建立論據、回應異議，有技巧地說服對方。",
    accent: "lilac",
    icon: "target",
    level: "proficient",
    chapters: [
      {
        id: "building-case",
        title: "建立論據",
        goalZh: "學會提出提案、強調好處並引用成功案例。",
        turns: [
          {
            id: "t1",
            questionZh: "你想向對方提出一個提案，可以怎麼開口？",
            chips: ["我有一個提議想和你討論", "不如聽聽這個想法"],
            encouragementZh: "明白了，你想提出一個提案。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I'd like to walk you through a proposal that could benefit us both.",
                zh: "意思：我想向你說明一個對雙方都有利的提案。",
                usageZh: "walk you through 表示「詳細講解」，適合正式提案場合。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想強調這個提案對對方的好處，可以怎麼說？",
            chips: ["這對你來說會有什麼好處", "對你最大的好處是"],
            encouragementZh: "明白了，你想強調提案對對方的好處。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "From your perspective, this could save you significant time and cost.",
                zh: "意思：從你的角度來看，這可以為你節省大量時間和成本。",
                usageZh: "From your perspective 站在對方角度出發，令說服更有效。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想引用其他人成功的例子增加說服力，可以怎麼說？",
            chips: ["其他公司也曾這樣做", "有實際案例可以參考"],
            encouragementZh: "明白了，你想引用成功案例增加說服力。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Several other companies have already seen great results with this approach.",
                zh: "意思：已經有幾間公司透過這個方法取得了好成果。",
                usageZh: "引用第三方案例，是增加說服力常見的技巧。",
              },
            ],
          },
        ],
      },
      {
        id: "addressing-objections",
        title: "回應異議",
        goalZh: "學會了解疑慮原因、提出解決方法並降低決策風險。",
        turns: [
          {
            id: "t1",
            questionZh: "對方對你的提案有疑慮，你想先了解原因，可以怎麼問？",
            chips: ["是什麼讓你有這個顧慮？", "可以多說一些你的想法嗎？"],
            encouragementZh: "明白了，你想先了解對方疑慮的原因。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "What's the main concern holding you back?",
                zh: "意思：主要是什麼讓你猶豫？",
                usageZh: "holding you back 表示「令人卻步的原因」，是了解疑慮的常用問法。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想針對對方的疑慮提出解決方法，可以怎麼說？",
            chips: ["這個問題我們可以這樣處理", "其實有方法可以解決"],
            encouragementZh: "明白了，你想針對疑慮提出解決方法。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "That's a valid concern — here's how we can address it.",
                zh: "意思：這是一個合理的顧慮，這是我們可以處理的方式。",
                usageZh: "That's a valid concern 先肯定對方顧慮合理，再提出解決方法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "對方仍然猶豫，你想提出一個低風險的試行方案，可以怎麼說？",
            chips: ["不如先試行一個月", "可以從小規模開始"],
            encouragementZh: "明白了，你想提出低風險的試行方案。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Why don't we start with a small trial to see how it goes?",
                zh: "意思：不如我們先做一個小型試驗，看看效果如何？",
                usageZh: "a small trial 降低對方的決策風險，是常見的說服策略。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cultural-nuance",
    title: "Communicate across cultures",
    titleZh: "文化差異溝通",
    description: "解讀語境、調整語氣，跨文化溝通更得體。",
    accent: "blue",
    icon: "globe",
    level: "proficient",
    chapters: [
      {
        id: "reading-context",
        title: "解讀語境",
        goalZh: "學會確認理解、禮貌指出文化差異並了解對方做法。",
        turns: [
          {
            id: "t1",
            questionZh: "你留意到對方說話比較含蓄，想確認他真正的意思，可以怎麼問？",
            chips: ["你的意思是不是...", "可以說清楚一點嗎？"],
            encouragementZh: "明白了，你想確認對方真正的意思。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Just to make sure I understand correctly, are you saying...?",
                zh: "意思：為了確保我理解正確，你的意思是不是...？",
                usageZh: "是委婉確認理解的常見說法，不會令對方尷尬。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想禮貌地指出文化上的不同做法，可以怎麼說？",
            chips: ["在我們那邊通常會...", "這方面可能和你們不同"],
            encouragementZh: "明白了，你想禮貌地指出文化差異。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "In my culture, we tend to approach this a bit differently.",
                zh: "意思：在我的文化中，我們處理這件事的方式會有些不同。",
                usageZh: "tend to approach … differently 語氣中性，避免暗示任何一方做法有錯。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想邀請對方分享他們的文化做法，可以怎麼問？",
            chips: ["在你們那邊通常怎麼做？", "可以說說你們的做法嗎？"],
            encouragementZh: "明白了，你想邀請對方分享他們的文化做法。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "How is this typically handled where you're from?",
                zh: "意思：在你的地方通常會怎麼處理這件事？",
                usageZh: "where you're from 是禮貌詢問對方文化背景的自然說法。",
              },
            ],
          },
        ],
      },
      {
        id: "adapting-tone",
        title: "調整語氣",
        goalZh: "學會因應對方偏好調整直接或婉轉的表達方式。",
        turns: [
          {
            id: "t1",
            questionZh: "你發現對方偏好比較直接的溝通方式，你想調整自己的表達，可以怎麼說？",
            chips: ["讓我直接說重點", "簡單來說就是"],
            encouragementZh: "明白了，你想用更直接的方式表達。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Let me get straight to the point.",
                zh: "意思：讓我直接說重點。",
                usageZh: "get straight to the point 表示「直入正題」，適合偏好直接溝通的對象。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你發現對方偏好比較婉轉的溝通方式，你想調整語氣，可以怎麼說？",
            chips: ["或許可以考慮一下", "這可能是一個方向"],
            encouragementZh: "明白了，你想用更婉轉的方式表達。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "It might be worth considering an alternative approach.",
                zh: "意思：或許值得考慮另一個做法。",
                usageZh: "It might be worth considering 語氣婉轉，適合偏好含蓄溝通的對象。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想總結：不同文化的溝通方式沒有對錯之分，可以怎麼說？",
            chips: ["兩種做法都各有優點", "最重要的是互相尊重"],
            encouragementZh: "明白了，你想總結不同文化溝通方式各有優點。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "Neither approach is right or wrong — it's just about understanding each other.",
                zh: "意思：兩種做法都沒有對錯之分，最重要的是互相理解。",
                usageZh: "帶出文化差異溝通的核心：理解，而非批判。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "crisis-communication",
    title: "Communicate through a crisis",
    titleZh: "危機溝通",
    description: "傳達壞消息、應對反應，帶領團隊度過難關。",
    accent: "coral",
    icon: "alert-triangle",
    level: "proficient",
    chapters: [
      {
        id: "delivering-bad-news",
        title: "傳達壞消息",
        goalZh: "學會宣布壞消息、說明原因並展望下一步。",
        turns: [
          {
            id: "t1",
            questionZh: "你需要向團隊宣布一個不好的消息，可以怎麼開口？",
            chips: ["我有些消息想跟大家說", "這個消息可能不太好"],
            encouragementZh: "明白了，你想準備向團隊宣布壞消息。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I need to share some difficult news with the team.",
                zh: "意思：我需要向團隊分享一些不太好的消息。",
                usageZh: "difficult news 語氣正式而克制，適合宣布壞消息的開場。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想清楚說明事情發生的原因，可以怎麼說？",
            chips: ["事情發生的原因是...", "背景是這樣的"],
            encouragementZh: "明白了，你想清楚說明事情發生的原因。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Let me explain exactly what led to this situation.",
                zh: "意思：讓我準確說明是什麼導致了這個情況。",
                usageZh: "exactly what led to this situation 表示會提供完整、準確的原因說明。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "你想安撫團隊的情緒並展望下一步，可以怎麼說？",
            chips: ["我知道這個消息令人失望", "但我們會有下一步的計劃"],
            encouragementZh: "明白了，你想安撫團隊情緒並展望下一步。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "I know this is disappointing, but here's how we'll move forward.",
                zh: "意思：我知道這令人失望，但這是我們接下來的計劃。",
                usageZh: "move forward 表示「向前邁進」，能為壞消息帶來正面的結尾。",
              },
            ],
          },
        ],
      },
      {
        id: "managing-reactions",
        title: "應對反應",
        goalZh: "學會安撫激動情緒、邀請提問並重申信心。",
        turns: [
          {
            id: "t1",
            questionZh: "有人對壞消息反應激動，你想先安撫他，可以怎麼說？",
            chips: ["我明白你的反應", "這個反應很合理"],
            encouragementZh: "明白了，你想先安撫對方激動的情緒。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I completely understand why you'd feel that way.",
                zh: "意思：我完全明白你為什麼會有這樣的感受。",
                usageZh: "先確認對方情緒合理，再處理問題，是危機溝通的重要一步。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想邀請大家提出問題或憂慮，可以怎麼說？",
            chips: ["大家有什麼想問的嗎？", "有什麼擔心可以說出來"],
            encouragementZh: "明白了，你想邀請大家提出問題或憂慮。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Please feel free to raise any questions or concerns you have.",
                zh: "意思：請大家隨時提出任何問題或憂慮。",
                usageZh: "feel free to raise … 是邀請對方開放提問的正式說法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "會議結束，你想重申你對團隊的信心，可以怎麼說？",
            chips: ["我對這個團隊有信心", "我們一定能撐過去"],
            encouragementZh: "明白了，你想重申對團隊的信心。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "I have full confidence that we'll get through this together.",
                zh: "意思：我完全有信心，我們會一起度過這個難關。",
                usageZh: "強調團結，是結束危機溝通的正面收尾。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "leadership-communication",
    title: "Lead with communication",
    titleZh: "領導溝通",
    description: "激勵團隊、分配任務，展現有效的領導溝通。",
    accent: "yellow",
    icon: "crown",
    level: "proficient",
    chapters: [
      {
        id: "motivating-team",
        title: "激勵團隊",
        goalZh: "學會肯定努力、描繪願景並在困難中鼓勵士氣。",
        turns: [
          {
            id: "t1",
            questionZh: "你想向團隊表達他們的努力有被看到，可以怎麼說？",
            chips: ["我看到大家的努力", "真的很感激大家"],
            encouragementZh: "明白了，你想表達對團隊努力的肯定。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I want you to know that your hard work hasn't gone unnoticed.",
                zh: "意思：我想讓你知道，你的努力並沒有被忽視。",
                usageZh: "hasn't gone unnoticed 是「並非沒被留意到」的正式說法，比直接稱讚更有分量。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想為團隊描繪一個清晰的共同目標，可以怎麼說？",
            chips: ["我們的共同目標是...", "如果做到，會是怎樣的局面"],
            encouragementZh: "明白了，你想描繪一個清晰的共同目標。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "Here's the vision we're all working towards.",
                zh: "意思：這就是我們大家共同努力的目標。",
                usageZh: "the vision we're all working towards 是描繪共同願景常用的正式說法。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "遇到困難時，你想鼓勵團隊保持士氣，可以怎麼說？",
            chips: ["我知道現在很難熬", "但我們已經走了很遠"],
            encouragementZh: "明白了，你想鼓勵團隊在困難中保持士氣。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "I know this is tough, but look how far we've already come.",
                zh: "意思：我知道這段時間很艱難，但看看我們已經走了多遠。",
                usageZh: "提醒團隊已有的進展，是鼓勵士氣的有效方法。",
              },
            ],
          },
        ],
      },
      {
        id: "delegating-tasks",
        title: "分配任務",
        goalZh: "學會清楚交代任務、表達信任並提供支援。",
        turns: [
          {
            id: "t1",
            questionZh: "你想向下屬清楚交代一項任務，可以怎麼說？",
            chips: ["這個任務想交給你", "希望你可以負責這部分"],
            encouragementZh: "明白了，你想清楚交代一項任務。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I'd like you to take the lead on this project.",
                zh: "意思：我想讓你負責主導這個項目。",
                usageZh: "take the lead on … 是正式交代負責範圍的常見說法。",
              },
            ],
          },
          {
            id: "t2",
            questionZh: "你想向對方表達信任、放手讓他決定，可以怎麼說？",
            chips: ["這方面我信任你的判斷", "你可以自己決定怎麼做"],
            encouragementZh: "明白了，你想表達信任並放手讓對方決定。",
            models: [
              {
                labelZh: "Riley 教你講",
                en: "I trust your judgement — feel free to make the call on this.",
                zh: "意思：我信任你的判斷，這方面你可以自己決定。",
                usageZh: "make the call 是「做決定」的常見說法，語氣輕鬆自然。",
              },
            ],
          },
          {
            id: "t3",
            questionZh: "分配任務後，你想提醒對方有需要可以隨時找你，可以怎麼說？",
            chips: ["有需要隨時找我", "不清楚可以問我"],
            encouragementZh: "明白了，你想提醒對方有需要可以隨時找你。",
            models: [
              {
                labelZh: "最後一句 · Riley 教你講",
                en: "If you need any support along the way, my door is always open.",
                zh: "意思：如果過程中需要任何支援，我隨時歡迎你來找我。",
                usageZh: "是表達自己隨時願意提供協助的慣用說法。",
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
