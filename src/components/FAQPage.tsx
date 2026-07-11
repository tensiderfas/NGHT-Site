import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  HelpCircle, 
  Filter, 
  MessageSquare, 
  ChevronDown, 
  AlertCircle,
  FileText,
  DollarSign,
  Shield,
  Disc
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'dist' | 'finance' | 'rights' | 'metadata';
  questionRu: string;
  questionEn: string;
  answerRu: string;
  answerEn: string;
}

interface FAQPageProps {
  lang: 'RU' | 'EN';
  onBack: () => void;
}

const FAQ_DATABASE: FAQItem[] = [
  {
    id: "faq-1",
    category: 'dist',
    questionRu: "В какие сроки мои песни появятся на стриминговых площадках?",
    questionEn: "How fast do my songs reach streaming platforms?",
    answerRu: "Мы рекомендуем отправлять релиз за 14 дней до планируемой даты выхода. Это гарантирует своевременное прохождение модерации на площадках и возможность подать трек на питчинг (промо-поддержку от редакторов). В экстренных случаях подача возможна и за 3 дня до выхода.",
    answerEn: "We recommend submitting your release 14 days prior to the planned release date. This guarantees timely moderation across platforms and enables pitching to editorial playlists for promo support. In urgent cases, submissions can be delivered in just 3 days."
  },
  {
    id: "faq-2",
    category: 'finance',
    questionRu: "Как начисляются выплаты роялти и от какой суммы можно выводить?",
    questionEn: "How are royalties calculated & what is the withdrawal threshold?",
    answerRu: "Стриминговые сервисы выгружают финансовые отчеты и присылают статистику с небольшой задержкой в 2-3 месяца (это стандарт для всех площадок). Вы забираете 80% от всех сборов. Минимальный порог вывода — всего $10, выплаты производятся поквартально на карту или расчетный счет.",
    answerEn: "Streaming stores process reports and send royalty payouts with a standard delay of 2-3 months. You receive 80% of all earnings. Withdrawals are processed quarterly starting from just $10 via card, bank transfer, or electronic payment systems."
  },
  {
    id: "faq-3",
    category: 'dist',
    questionRu: "Как перенести свой каталог от другого дистрибьютора?",
    questionEn: "How do I migrate my catalogue from another distributor?",
    answerRu: "Процесс очень простой и безопасный. Загрузите файлы в NIGHTVOLT с идентичными кодами ISRC и UPC, а также с оригинальными аудиофайлами. После того, как песни появятся на площадках от нас, вы сможете деактивировать их у старого дистрибьютора, сохранив все плейлисты, прослушивания и лайки.",
    answerEn: "The process is simple and completely safe. Distribute your tracks through NIGHTVOLT using identical ISRC/UPC codes and matching original audio files. Once live, take down from your previous provider. Your playlist placements, playcounts, and likes will remain untouched."
  },
  {
    id: "faq-4",
    category: 'finance',
    questionRu: "Что представляет собой сплит доходов 80 / 20?",
    questionEn: "What does the 80/20 royalty split represent?",
    answerRu: "NIGHTVOLT — это честный и современный дистрибьютор. Артист забирает себе 80% чистой прибыли от прослушиваний. Оставшиеся 20% уходят лейблу на поддержание работы серверов, автоматическую защиту авторских прав, а также на профессиональную клиентскую саппорт-поддержку.",
    answerEn: "NIGHTVOLT works on a simple creator-focused transparent model. You retain 80% of net streaming sales. The label takes 20% to keep our server channels running, power automated rights protection, and support our personal customer care."
  },
  {
    id: "faq-5",
    category: 'dist',
    questionRu: "Взимается ли ежегодная плата за хранение треков на площадках?",
    questionEn: "Are there periodic storage or subscription charges?",
    answerRu: "Нет. Ваша дистрибуция полностью бессрочна и свободна от скрытых подписок, ежемесячных платежей или абонентской платы за хранение. Мы никогда не берем плату за годовой хостинг каталога или изменение обложек. Ваши треки живут на площадках всегда.",
    answerEn: "Absolutely not! Our distribution services are permanent. We do not charge recurring monthly or yearly subscription fees to keep your tracks online, nor do we charge for editing metadata. Your music stays online forever."
  },
  {
    id: "faq-6",
    category: 'metadata',
    questionRu: "Какие требования предъявляются к аудиофайлам?",
    questionEn: "What are the technical requirements for audio files?",
    answerRu: "Аудиофайлы должны быть исключительно в несжатом формате WAV или FLAC. Минимальное разрешение: 16-bit / 44.1 kHz (рекомендуется 24-bit / 48 kHz). Записи в формате MP3 или с битрейтом ниже стандартного автоматически отклоняются модерацией площадок.",
    answerEn: "Audio files must be submitted strictly in lossless WAV or FLAC format. Recommended resolution is stereo, 16-bit / 44.1 kHz or 24-bit / 48 kHz. Compressed MP3 files or records of sub-standard quality are automatically rejected by streaming networks."
  },
  {
    id: "faq-7",
    category: 'metadata',
    questionRu: "Какие требования предъявляются к обложке релиза?",
    questionEn: "What are the release artwork requirements?",
    answerRu: "Обложка должна быть строго квадратной (соотношение сторон 1:1), в формате JPG или PNG, размером не менее 3000x3000px, в цветовом пространстве RGB. На обложке запрещено размещать: контакты, адреса сайтов, логотипы брендов, ссылки, водяные знаки, а также размытые изображения низкого качества.",
    answerEn: "The artwork must be perfectly square (1:1 ratio), in JPG or PNG format, with minimum dimensions of 3000x3000px, RGB color space. Artworks containing social links, website addresses, phone numbers, brand logos, blurred low-res imagery, or watermark indicators are strictly forbidden."
  },
  {
    id: "faq-8",
    category: 'rights',
    questionRu: "Можно ли выпустить кавер-версию чужой песни?",
    questionEn: "Can I distribute a cover version of an existing song?",
    answerRu: "Да, вы можете распространять кавер-версии. При оформлении релиза в метаданных обязательно указывать оригинальных авторов текста и музыки. Важно: кавер-версия не должна содержать оригинальные сэмплы, вокал или инструментальные фрагменты оригинала без письменного разрешения правообладателя.",
    answerEn: "Yes, you can distribute cover versions. During submission, you must attribute original composers and lyricists. Please note: a cover record must not contain any original master samples, vocal snippets, or backing tracks of the original record unless you have a written clearance license."
  },
  {
    id: "faq-9",
    category: 'rights',
    questionRu: "Можно ли использовать бесплатные или арендованные биты из интернета?",
    questionEn: "Can I use free or leased beats downloaded from the internet?",
    answerRu: "Использовать биты можно только в том случае, если у вас есть действующее лицензионное соглашение с битмейкером, разрешающее коммерческую дистрибуцию. 'Бесплатные биты' (Free for non-profit) запрещены для коммерческой загрузки на площадки и будут отклонены нашей модерацией ради вашей безопасности.",
    answerEn: "You can only use beats if you possess a valid license agreement allowing commercial distribution. 'Free for non-profit' beats downloaded from YouTube or Soundcloud are strictly prohibited for commercial upload and will be rejected by moderation to prevent legal claims."
  },
  {
    id: "faq-10",
    category: 'metadata',
    questionRu: "Что такое коды ISRC и UPC и сколько стоит их генерация?",
    questionEn: "What are ISRC and UPC codes and how much do they cost?",
    answerRu: "UPC — это уникальный код альбома или сингла (как штрихкод товара), а ISRC — международный код конкретной аудиозаписи. На NIGHTVOLT генерация, присвоение и проверка кодов ISRC и UPC абсолютно бесплатны и происходят автоматически при отправке вашего релиза.",
    answerEn: "UPC is a unique product code for the entire single or album, while ISRC is a unique international identifier for each individual audio track. On NIGHTVOLT, generating and assigning ISRC and UPC codes is completely free and happens automatically during creation."
  },
  {
    id: "faq-11",
    category: 'metadata',
    questionRu: "Как происходит питчинг в редакционные плейлисты стримингов?",
    questionEn: "How does editorial playlist pitching work?",
    answerRu: "После успешной модерации релиза мы отправляем его на площадки как запланированный. Если вы отправили трек за 14 дней, вы можете заполнить форму питчинга в нашей системе. Мы напрямую передаем ваши заявки редакторам Яндекс Музыки, ВК Музыки, Spotify и Apple Music.",
    answerEn: "Once approved, we deliver your release to streaming databases with an upcoming release date. If submitted at least 14 days in advance, you can pitch the track to curators. We pass your editorial proposals directly to editors at Spotify, Apple Music, VK, and Yandex."
  },
  {
    id: "faq-12",
    category: 'metadata',
    questionRu: "Как добавить текст песни и синхронизированный текст (караоке)?",
    questionEn: "How do I add song lyrics and time-synced lyrics?",
    answerRu: "Вы можете отправить обычные тексты песен прямо через метаданные релиза при загрузке. Для добавления синхронизированных текстов (караоке-формат для Apple Music, Яндекс и Spotify) вы можете воспользоваться нашей внутренней промо-панелью после того, как трек пройдет модерацию.",
    answerEn: "You can submit plain song lyrics directly through metadata fields during upload. To add time-synced lyrics (karaoke format for Apple Music, Spotify, and Yandex), you can easily utilize our dedicated promotional/lyrics workspace once your release gets approved."
  },
  {
    id: "faq-13",
    category: 'metadata',
    questionRu: "Могу ли я изменить обложку или аудиофайл после релиза?",
    questionEn: "Can I change the artwork or audio file after the release is live?",
    answerRu: "Да. Вы можете подать запрос на изменение метаданных, замену обложки или обновление аудиофайла через форму поддержки. Мы отправляем апдейты на площадки бесплатно, обычно это занимает от 3 до 7 рабочих дней в зависимости от скорости обработки на конкретном сервисе.",
    answerEn: "Yes. You can request changes to metadata, cover art updates, or audio replacements via support. We submit these updates to all digital stores completely free of charge. It usually takes 3 to 7 business days to process across networks."
  },
  {
    id: "faq-14",
    category: 'dist',
    questionRu: "Как объединить или разделить профили артистов на площадках?",
    questionEn: "How do I merge or split duplicate artist profiles on stores?",
    answerRu: "Если после выхода трека создался дубликат профиля или песня попала на карточку другого музыканта с таким же именем, свяжитесь с поддержкой. Мы направим официальный запрос на сопоставление (mapping) в службы поддержки площадок, чтобы объединить ваши треки на правильном аккаунте.",
    answerEn: "If your release creates a duplicate profile or appears on another artist's page, contact our team. We will dispatch official mapping update vectors to Apple, Spotify, Yandex, and other networks to cleanly consolidate your catalog under the single correct account."
  },
  {
    id: "faq-15",
    category: 'dist',
    questionRu: "Какие стриминговые платформы входят в сеть отгрузки?",
    questionEn: "Which streaming platforms are included in the delivery network?",
    answerRu: "Мы доставляем музыку на все ключевые глобальные и локальные платформы: Яндекс Музыка, ВК Музыка, Звук, Spotify, Apple Music, YouTube Music, Deezer, Amazon Music, Tidal, TikTok, Instagram Reels, Shazam и более 150 других цифровых витрин по всему миру.",
    answerEn: "We deliver to all major global and regional stores including Yandex Music, VK Music, Zvuk, Spotify, Apple Music, YouTube Music, Deezer, Amazon Music, Tidal, TikTok, Instagram Reels, Shazam, and over 150 other digital outlets worldwide."
  },
  {
    id: "faq-16",
    category: 'rights',
    questionRu: "Что делать, если мой трек загрузили без моего согласия?",
    questionEn: "What should I do if my track was uploaded without my permission?",
    answerRu: "Если вы обнаружили пиратское или нелегальное размещение своей фонограммы, незамедлительно напишите на нашу почту work@nightvolt.ru с подтверждением вашего авторства (исходные проекты, дата создания). Мы инициируем процедуру официального удаления (takedown notice) трека нарушителя со всех площадок.",
    answerEn: "If you detect an unauthorized upload of your master record, contact us immediately at work@nightvolt.ru with evidence of ownership (project files, export dates). We will submit official take-down notices to completely delete the infringing product worldwide."
  },
  {
    id: "faq-17",
    category: 'dist',
    questionRu: "Будут ли мои треки доступны в TikTok и Instagram Reels?",
    questionEn: "Will my tracks be available on TikTok and Instagram Reels?",
    answerRu: "Да, абсолютно. Все релизы автоматически доставляются в музыкальные библиотеки коротких видеороликов. Пользователи смогут свободно использовать вашу музыку в качестве фона для клипов и видео, а вы будете получать роялти с каждого использования.",
    answerEn: "Yes, absolutely. All releases are automatically shipped to short-video sound libraries. Creators can instantly use your tracks in backgrounds for clips and reels, and you receive royalty payments generated from each unique usage."
  },
  {
    id: "faq-18",
    category: 'finance',
    questionRu: "Взимается ли комиссия за вывод средств через СБП (Систему быстрых платежей)?",
    questionEn: "Are there any fees for withdrawals via SBP (Faster Payments)?",
    answerRu: "Нет, вывод через Систему быстрых платежей (СБП) на карты любых российских банков осуществляется без каких-либо комиссий со стороны нашей платформы и банка-партнера. Вы получаете ровно ту сумму в рублях, которую заказали к выводу.",
    answerEn: "No, withdrawals processed via SBP (Faster Payments System) to any Russian bank card are completely free of commission charges from our platform and partner bank. You receive the exact amount of rubles requested."
  },
  {
    id: "faq-19",
    category: 'finance',
    questionRu: "Нужно ли оформлять самозанятость или ИП для вывода денег?",
    questionEn: "Do I need legal business entities to withdraw royalty earnings?",
    answerRu: "Нет, жестких требований нет. Мы работаем со всеми категориями авторов: физическими лицами (включая нерезидентов), самозанятыми, а также с индивидуальными предпринимателями (ИП) и юридическими лицами. Выплаты производятся удобными способами согласно вашему статусу.",
    answerEn: "No, legal business entities are not required. We pay individual independent creators, self-employed creators, as well as formal company entities and labels. Withdrawals are processed through convenient payment methods matching your residency status."
  },
  {
    id: "faq-20",
    category: 'dist',
    questionRu: "Что происходит, если я решу прекратить сотрудничество с NIGHTVOLT?",
    questionEn: "What happens if I decide to stop distributing through NIGHTVOLT?",
    answerRu: "Мы не накладываем никаких кабальных ограничений. Вы можете запросить полное удаление (takedown) своего каталога или перенос к другому дистрибьютору в любой момент. Мы обработаем запрос в течение нескольких рабочих дней без штрафов и дополнительных сборов.",
    answerEn: "We strictly reject lock-in schemes. You are free to request complete takedowns or transfer your catalog to another provider at any time. We process these requests within several business days without any penalties or hidden administrative fees."
  },
  {
    id: "faq-21",
    category: 'rights',
    questionRu: "Как защищены мои авторские права?",
    questionEn: "How are my copyright and master rights protected?",
    answerRu: "Вы остаетесь 100% владельцем своих песен. NIGHTVOLT выступает лишь как лицензиат-дистрибьютор, доставляющий треки на витрины. Мы никогда не забираем у вас долю интеллектуальной собственности и не связываем вас пожизненными договорами передачи прав.",
    answerEn: "You remain 100% the sovereign owner of your music catalog. NIGHTVOLT acts purely as your technical distribution licensee to deliver music to streaming stores. We never claim co-ownership of your intellectual property or tie you down with life-long transfers."
  },
  {
    id: "faq-22",
    category: 'metadata',
    questionRu: "Могу ли я выпускать совместные релизы (фиты)?",
    questionEn: "Can I release collaborative tracks (feats) with other creators?",
    answerRu: "Да, вы можете добавлять неограниченное число соавторов. При отправке релиза вы указываете других исполнителей как Primary (Основной артист) или Featured (Приглашенный артист). Релиз автоматически появится в карточках всех указанных участников на площадках.",
    answerEn: "Yes, you can include unlimited co-creators. When submitting, tag collaborative creators as Primary or Featured artists. The release will automatically show up on the official streaming profiles of all involved artists."
  },
  {
    id: "faq-23",
    category: 'dist',
    questionRu: "Могу ли я выпустить инструментальный трек или альбом?",
    questionEn: "Can I distribute an instrumental track or album?",
    answerRu: "Да, конечно. При оформлении релиза просто укажите тип трека 'Инструментальный' (Instrumental) и не добавляйте текст песни. Трек будет отгружен во все стриминговые сервисы наравне с обычными песнями.",
    answerEn: "Yes, absolutely. When submitting, select 'Instrumental' as the track type and leave the lyrics field empty. Your release will be shipped to all DSPs just like any vocal release."
  },
  {
    id: "faq-24",
    category: 'dist',
    questionRu: "Возможен ли выпуск сингла с одинаковым названием, что и будущий альбом?",
    questionEn: "Can I release a single with the same name as my upcoming album?",
    answerRu: "Да. Это стандартная практика. Вы можете сначала выпустить сингл, а затем включить этот же трек с тем же ISRC кодом в состав полноценного альбома. Это позволит сохранить статистику прослушиваний сингла внутри альбома.",
    answerEn: "Yes, this is standard practice. You can release a lead single first, then include the exact same track with the exact same ISRC code in your full album. This preserves streaming counts."
  },
  {
    id: "faq-25",
    category: 'dist',
    questionRu: "Как перенести свои треки от другого дистрибьютора в NIGHTVOLT с сохранением прослушиваний?",
    questionEn: "How do I transfer my tracks from another distributor to NIGHTVOLT while keeping play counts?",
    answerRu: "Для переноса каталога вам необходимо загрузить треки в личном кабинете NIGHTVOLT, используя точно такие же аудиофайлы, метаданные (названия, псевдоним артиста) и коды ISRC/UPC. После прохождения модерации вы можете отправить запрос на удаление релизов у старого дистрибьютора.",
    answerEn: "To transfer your catalog, upload the tracks in your NIGHTVOLT dashboard using the exact same audio files, metadata (titles, artist pseudonym), and ISRC/UPC codes. Once moderated, you can safely trigger a takedown with your previous distributor."
  },
  {
    id: "faq-26",
    category: 'dist',
    questionRu: "На каких условиях доставляется музыка в Китай и азиатский регион?",
    questionEn: "What are the terms for delivering music to China and Asia?",
    answerRu: "Ваша музыка будет доступна на крупнейших азиатских платформах (Tencent Music Entertainment, NetEase Cloud Music, KKBOX и др.) в рамках расширенной глобальной дистрибуции без какой-либо дополнительной платы.",
    answerEn: "Your music will be delivered to major Asian streaming platforms (such as Tencent Music Entertainment, NetEase, KKBOX) as part of our global distribution network at no extra cost."
  },
  {
    id: "faq-27",
    category: 'dist',
    questionRu: "Могу ли я ограничить страны, в которых будет доступен мой релиз?",
    questionEn: "Can I restrict the countries where my release is available?",
    answerRu: "Да. При заполнении карточки релиза вы можете указать территориальные ограничения (гео-блокировку) для конкретных стран, если это требуется по лицензионным или иным соображениям.",
    answerEn: "Yes. During submission, you can specify territory restrictions (geo-blocking) for specific countries if required by licensing agreements."
  },
  {
    id: "faq-28",
    category: 'dist',
    questionRu: "Предоставляется ли официальный питчинг для бесплатных тарифов?",
    questionEn: "Is official pitching available for free plans?",
    answerRu: "На бесплатном тарифе доступна стандартная отгрузка на площадки. Подача заявок на питчинг и промо-поддержку редакции является привилегией Продвинутого тарифа, чтобы гарантировать максимальное качество подаваемых редакторам заявок.",
    answerEn: "The free tier includes standard delivery to stores. Submission of promotional pitching requests is exclusive to the Advanced tier to maintain curation quality standards."
  },
  {
    id: "faq-29",
    category: 'finance',
    questionRu: "Есть ли скрытые комиссии за вывод накопленных средств?",
    questionEn: "Are there hidden commissions for withdrawing accumulated funds?",
    answerRu: "Нет. Мы не берем никаких скрытых комиссий за перевод средств. Все комиссии сторонних платежных шлюзов отображаются прозрачно перед подтверждением транзакции. Вы всегда забираете ровно свои 80% роялти от площадок.",
    answerEn: "No. We charge zero hidden transaction fees. Any third-party processing fees are displayed transparently prior to processing. You receive exactly 80% of net royalties generated from stores."
  },
  {
    id: "faq-30",
    category: 'finance',
    questionRu: "Как часто обновляются отчеты по прослушиваниям в личном кабинете?",
    questionEn: "How often are streaming reports updated in the personal account?",
    answerRu: "Предварительные отчеты по трендам обновляются ежедневно по большинству площадок. Итоговые финансовые отчеты и начисления роялти выгружаются ежеквартально после полной сверки данных со стороны стриминговых сервисов.",
    answerEn: "Preliminary trend reports are updated daily for most platforms. Final financial reports and royalty allocations are posted quarterly after complete data reconciliation from streaming services."
  },
  {
    id: "faq-31",
    category: 'finance',
    questionRu: "Могу ли я выводить деньги на карты банков РФ?",
    questionEn: "Can I withdraw money to Russian bank cards?",
    answerRu: "Да, мы поддерживаем прямые выплаты в рублях на карты любых банков РФ, в том числе моментально через СБП, а также выплаты на расчетные счета ИП, самозанятых граждан РФ и международные счета.",
    answerEn: "Yes, we support direct payouts in rubles to any Russian bank card, including instant SBP transfers, payments to Russian companies/self-employed, as well as international banking transfers."
  },
  {
    id: "faq-32",
    category: 'finance',
    questionRu: "Зависит ли размер роялти от качества загруженного аудиофайла?",
    questionEn: "Does the royalty amount depend on the quality of the uploaded audio file?",
    answerRu: "Нет, стриминговые сервисы платят одинаковую ставку за прослушивание независимо от формата (WAV или FLAC), однако качественное аудио увеличивает удержание слушателя и вероятность попадания в плейлисты.",
    answerEn: "No, streaming services pay the same rate per play regardless of audio resolution. However, lossless quality significantly increases listener retention and recommendation chances."
  },
  {
    id: "faq-33",
    category: 'finance',
    questionRu: "Почему в первый месяц после релиза баланс равен нулю?",
    questionEn: "Why is the balance zero in the first month after the release?",
    answerRu: "Это стандартное правило музыкальной индустрии. Площадки присылают первые финансовые отчеты с задержкой в 2-3 месяца. Например, роялти за январь появятся на вашем балансе только в конце марта или апреля.",
    answerEn: "This is standard worldwide. Stores report financial balances with a delay of 2-3 months. For example, January streams will only appear on your balance in late March or April."
  },
  {
    id: "faq-34",
    category: 'finance',
    questionRu: "Облагаются ли мои выплаты налогами со стороны NIGHTVOLT?",
    questionEn: "Are my payouts taxed by NIGHTVOLT?",
    answerRu: "NIGHTVOLT не удерживает налоги с ваших выплат. Вы самостоятельно несете ответственность за декларирование своих доходов и уплату налогов в соответствии с законодательством вашей страны.",
    answerEn: "NIGHTVOLT does not withhold taxes from your earnings. Creators are independently responsible for reporting income and settling taxes based on local laws."
  },
  {
    id: "faq-35",
    category: 'finance',
    questionRu: "Что делать, если валюта роялти отличается от валюты вывода?",
    questionEn: "What if the royalty currency is different from the withdrawal currency?",
    answerRu: "Конвертация происходит автоматически по официальному курсу банка на день проведения операции. Никаких дополнительных наценок на курс со стороны нашей платформы нет.",
    answerEn: "Currency conversions are processed automatically at the official interbank rate on the day of payment. We do not apply any surcharges to conversion rates."
  },
  {
    id: "faq-36",
    category: 'rights',
    questionRu: "Что такое YouTube Content ID и как он работает?",
    questionEn: "What is YouTube Content ID and how does it work?",
    answerRu: "YouTube Content ID — это цифровая система отпечатков пальцев, которая сканирует все загружаемые на YouTube видео. Если кто-то использует ваш трек в своем ролике, система автоматически включает монетизацию в вашу пользу.",
    answerEn: "YouTube Content ID is a digital fingerprinting system that scans uploaded videos. If someone uses your audio in their clip, the system automatically starts monetizing it for you."
  },
  {
    id: "faq-37",
    category: 'rights',
    questionRu: "Можно ли дистрибьютировать трек с использованием сэмплов из Splice?",
    questionEn: "Can I distribute a track using samples from Splice?",
    answerRu: "Да, если у вас есть активная подписка на Splice или вы приобрели лицензию на эти сэмплы. Использование роялти-фри сэмплов абсолютно легально и поддерживается нашей модерацией.",
    answerEn: "Yes, provided you have an active Splice subscription or validly purchased licenses. Royalty-free samples are fully legal and supported by our moderation."
  },
  {
    id: "faq-38",
    category: 'rights',
    questionRu: "Могу ли я выпустить ремикс на популярный трек известного артиста?",
    questionEn: "Can I release a remix of a popular track by a well-known artist?",
    answerRu: "Только при наличии официального письменного разрешения (лицензии) от владельцев оригинальной фонограммы и авторских прав. Без этого неофициальные бутлеги будут отклонены на этапе модерации.",
    answerEn: "Only if you hold a written authorization license from the original master and publishing rights owners. Unofficial bootleg remixes will be rejected during moderation."
  },
  {
    id: "faq-39",
    category: 'rights',
    questionRu: "Помогаете ли вы защитить музыку от утечек до официального релиза?",
    questionEn: "Do you help protect music from leaks before the official release?",
    answerRu: "Да. Все аудиофайлы хранятся на наших защищенных серверах с шифрованием. Мы отгружаем треки на площадки в закрытом режиме, и они становятся доступны публично только строго в указанную дату релиза.",
    answerEn: "Yes. All audio files are hosted on encrypted servers. We deliver releases to DSPs in metadata-only/pre-release lock state, making them public only on the launch date."
  },
  {
    id: "faq-40",
    category: 'rights',
    questionRu: "Что такое смежные права и собирает ли их NIGHTVOLT?",
    questionEn: "What are neighboring rights and does NIGHTVOLT collect them?",
    answerRu: "Смежные права (право на фонограмму) — это право на саму запись. Да, мы собираем роялти за публичное воспроизведение фонограммы во всех стримингах и выплачиваем вам вашу долю.",
    answerEn: "Master/Neighbouring rights relate to the actual recorded audio. Yes, we collect streaming mechanical and performance royalties for your master and pay your share."
  },
  {
    id: "faq-41",
    category: 'metadata',
    questionRu: "Можно ли использовать в названии трека спецсимволы или эмодзи?",
    questionEn: "Can I use special characters or emojis in the track title?",
    answerRu: "Нет. Стриминговые сервисы (особенно Apple Music и Spotify) запрещают использование эмодзи, декоративных символов и капс-лока в названиях релизов и артистов.",
    answerEn: "No. Streaming platforms (especially Apple Music and Spotify) strictly prohibit using emojis, decorative symbols, or full CAPS LOCK in titles and artist names."
  },
  {
    id: "faq-42",
    category: 'metadata',
    questionRu: "Как правильно указать продюсера, автора слов или композитора?",
    questionEn: "How do I correctly credit a producer, lyricist, or composer?",
    answerRu: "При загрузке трека в личном кабинете заполните вкладку 'Авторы'. Укажите реальные имена и фамилии всех создателей (композиторов и авторов текста). Это критически важно по стандартам DDEX.",
    answerEn: "When uploading, complete the 'Contributors' tab. Enter the real legal names of lyricists, composers, and producers. This is crucial for international DDEX compliance."
  },
  {
    id: "faq-43",
    category: 'metadata',
    questionRu: "Почему мой трек отклонила модерация из-за названия версии?",
    questionEn: "Why did moderation reject my track because of the version title?",
    answerRu: "Версия трека (например, 'Remix', 'Radio Edit', 'Acoustic') должна быть указана в специальном поле, а не в основном названии. Не пишите 'Original Mix', если это стандартная версия трека.",
    answerEn: "The version tag (e.g., 'Remix', 'Radio Edit', 'Acoustic') must be placed in the Version field, not the main title. Do not write 'Original Mix' if it is the standard release version."
  },
  {
    id: "faq-44",
    category: 'metadata',
    questionRu: "Поддерживается ли дистрибуция классической или академической музыки?",
    questionEn: "Is classical or academic music distribution supported?",
    answerRu: "Да, но для классической музыки действуют особые строгие стандарты указания дирижеров, оркестров, композиторов эпохи и частей произведений. Наш саппорт поможет вам настроить эти метаданные.",
    answerEn: "Yes, but classical music has strict metadata guidelines requiring conductors, orchestras, composers, and movements. Our support team will guide you in aligning this."
  },
  {
    id: "faq-45",
    category: 'metadata',
    questionRu: "Какое количество треков может быть в составе сингла, EP или альбома?",
    questionEn: "How many tracks can be in a single, EP, or album?",
    answerRu: "Сингл — от 1 до 3 треков (длительностью до 10 минут). EP — от 4 до 6 треков (суммарно до 30 минут). Альбом — от 7 и более треков. Наша система автоматически определит тип релиза при отгрузке.",
    answerEn: "Single: 1 to 3 tracks (under 10 minutes total). EP: 4 to 6 tracks (under 30 minutes total). Album: 7 or more tracks. Our ingestion system configures this automatically."
  },
  {
    id: "faq-46",
    category: 'rights',
    questionRu: "Могу ли я выпустить песню под псевдонимом, похожим на имя известного артиста?",
    questionEn: "Can I release a song under a pseudonym similar to a well-known artist?",
    answerRu: "Нет. Модерация площадок отклоняет релизы, которые могут ввести слушателей в заблуждение или паразитируют на именах известных брендов и исполнителей (плагиат имен).",
    answerEn: "No. Streaming moderation automatically rejects releases that could mislead listeners or exploit the names of existing popular brands and artists."
  },
  {
    id: "faq-47",
    category: 'finance',
    questionRu: "Взимается ли комиссия за вывод средств на расчетный счет ИП/компании?",
    questionEn: "Is there a fee for withdrawing funds to an individual entrepreneur or company account?",
    answerRu: "Нет. Мы переводим средства на расчетные счета ИП и юридических лиц без каких-либо комиссий со стороны нашего сервиса. Вы платите только налоги согласно выбранной вами системе налогообложения.",
    answerEn: "No. We transfer funds to business and corporate accounts with zero commissions from our service. You only settle standard taxes depending on your legal tax bracket."
  }
];

export default function FAQPage({ lang, onBack }: FAQPageProps) {
  const isRu = lang === 'RU';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dist' | 'finance' | 'rights' | 'metadata'>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const categories = [
    { id: 'all', labelRu: 'Все вопросы', labelEn: 'All Questions', icon: HelpCircle },
    { id: 'dist', labelRu: 'Дистрибуция', labelEn: 'Distribution', icon: Disc },
    { id: 'finance', labelRu: 'Финансы & Выплаты', labelEn: 'Finance & Payouts', icon: DollarSign },
    { id: 'rights', labelRu: 'Авторские права', labelEn: 'Copyrights', icon: Shield },
    { id: 'metadata', labelRu: 'Метаданные & Промо', labelEn: 'Metadata & Pitch', icon: FileText }
  ];

  const filteredFaqs = FAQ_DATABASE.filter(faq => {
    const question = isRu ? faq.questionRu : faq.questionEn;
    const answer = isRu ? faq.answerRu : faq.answerEn;
    const matchesSearch = question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div 
      id="faq-subpage-container" 
      className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-28 pb-20 px-6 md:px-12 relative text-neutral-900 dark:text-neutral-100 font-sans"
    >
      <div className="max-w-[1100px] mx-auto relative z-10">
        
        {/* Navigation Head Back */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-950 dark:bg-neutral-900 dark:hover:bg-white border border-neutral-200/80 dark:border-neutral-800 rounded-full text-xs font-mono font-bold tracking-wider text-neutral-800 dark:text-neutral-200 dark:hover:text-neutral-950 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 mb-12 select-none uppercase"
        >
          <ArrowLeft className="w-4 h-4 text-brand-blue group-hover:text-brand-turquoise transition-colors" />
          <span>{isRu ? 'Назад на главную' : 'Back to main'}</span>
        </button>

        {/* Page title header banner */}
        <div className="mb-12 space-y-4 text-left">
          <div className="flex items-center gap-2 text-[#7e8c9c] font-mono text-[10px] tracking-[0.25em] mb-4 uppercase font-bold text-left">
            <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
            <span>NIGHTVOLT // {isRu ? 'ОТВЕТЫ НА ВОПРОСЫ' : 'SUPPORT DESK'}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 dark:text-white uppercase leading-none">
            {isRu ? 'СПРАВОЧНЫЙ ЦЕНТР' : 'HELP & FAQ CENTER'}
          </h1>
          
          <p className="max-w-[720px] text-sm md:text-base text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">
            {isRu 
              ? 'Полный свод руководств, правил и ответов на частые вопросы музыкальных создателей. Найдите быстрый ответ по дистрибуции, финансам или метаданным.'
              : 'Complete repository of answers, rules, and technical guidelines for creators. Instantly search and locate clear instructions regarding distribution, financials, metadata, or master rights.'}
          </p>
        </div>

        {/* Search and Category Filter block */}
        <div className="space-y-6 mb-10">
          
          {/* Real-time search inputs */}
          <div className="relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl md:rounded-3xl p-2 flex items-center shadow-sm">
            <Search className="w-5 h-5 text-neutral-400 dark:text-neutral-500 ml-4 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isRu ? "Поиск по ключевым словам (например, роялти, вав, кавер)..." : "Search by keywords (e.g. royalties, cover, wav, codes)..."}
              className="w-full bg-transparent px-3 py-3 border-none outline-none focus:ring-0 text-sm placeholder-neutral-400 dark:placeholder-neutral-500 font-normal text-neutral-950 dark:text-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-1 text-xs font-mono font-bold text-neutral-400 hover:text-brand-blue uppercase mr-2"
              >
                {isRu ? "Очистить" : "Clear"}
              </button>
            )}
          </div>

          {/* Quick filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-brand-blue border-brand-blue text-white shadow-sm'
                      : 'bg-white dark:bg-neutral-900 border-neutral-200/60 dark:border-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:border-brand-blue/40'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{isRu ? cat.labelRu : cat.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* List render dynamic with search state handling */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openId === faq.id;
                const question = isRu ? faq.questionRu : faq.questionEn;
                const answer = isRu ? faq.answerRu : faq.answerEn;
                
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="border border-neutral-200/80 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden hover:border-brand-blue/30 dark:hover:border-brand-blue/20 transition-all duration-300 shadow-sm relative group"
                  >
                    {/* Subtle hover top bar accent */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />

                    <button
                      type="button"
                      onClick={() => handleToggle(faq.id)}
                      className="w-full p-6 text-left flex justify-between items-center gap-6 hover:bg-neutral-50/50 dark:hover:bg-neutral-950/40 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start gap-4 min-w-0">
                        <span className="font-mono text-xs text-brand-blue font-extrabold shrink-0 mt-0.5">
                          [ {idx < 9 ? `0${idx + 1}` : idx + 1} ]
                        </span>
                        <span className="font-display text-sm md:text-base font-black tracking-wide text-neutral-950 dark:text-white uppercase leading-snug group-hover:text-brand-blue transition-colors">
                          {question}
                        </span>
                      </div>

                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen 
                          ? 'bg-brand-blue border-brand-blue text-white' 
                          : 'bg-neutral-50 dark:bg-neutral-850 border-neutral-200/60 dark:border-neutral-750 text-neutral-500'
                      }`}>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="p-6 pt-0 border-t border-neutral-100 dark:border-neutral-800/80 text-xs md:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal text-left bg-neutral-50/40 dark:bg-neutral-950/20 whitespace-pre-line">
                            {answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center space-y-4 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-4xl"
              >
                <AlertCircle className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-display font-black text-lg text-neutral-950 dark:text-white uppercase">
                    {isRu ? "Ничего не найдено" : "No Results Found"}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                    {isRu 
                      ? "Попробуйте использовать другие ключевые слова или сбросьте фильтр категории." 
                      : "Try checking other keywords or clearing the category filters."}
                  </p>
                </div>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                  className="px-6 py-2.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-full font-mono text-xs font-bold uppercase tracking-wider hover:bg-brand-blue"
                >
                  {isRu ? "Сбросить фильтры" : "Reset Filters"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Support integration ticket box */}
        <div className="mt-16 p-8 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-4xl flex flex-col md:flex-row items-start md:items-center gap-6 justify-between text-left shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />
          
          <div className="space-y-2">
            <h4 className="font-display font-black text-lg text-neutral-950 dark:text-white uppercase leading-none">
              {isRu ? 'НЕ НАШЛИ ОТВЕТ НА СВОЙ ВОПРОС?' : 'STILL HAVE QUESTIONS?'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-normal max-w-[620px] leading-relaxed">
              {isRu 
                ? 'Наш персональный саппорт-сервис работает ежедневно. Вы можете написать напрямую основателю или в технический чат поддержки.'
                : 'Our personal creator support service handles general and developer queries daily. Drop us a line directly to connect.'}
            </p>
          </div>
          <a
            href="mailto:work@nightvolt.ru"
            className="px-8 py-4 bg-brand-blue text-white hover:bg-neutral-950 dark:hover:bg-white dark:hover:text-neutral-950 rounded-full text-xs font-mono font-bold tracking-widest transition-all cursor-pointer select-none uppercase shrink-0 shadow-sm inline-flex items-center gap-2"
          >
            <span>work@nightvolt.ru</span>
          </a>
        </div>

      </div>
    </div>
  );
}
