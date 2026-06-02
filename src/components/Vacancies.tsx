import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  Send, 
  HelpCircle, 
  UserPlus, 
  Copy, 
  Check, 
  Terminal,
  ChevronDown,
  Info,
  Radio,
  FileText,
  User,
  MapPin,
  Flame
} from 'lucide-react';

interface VacanciesProps {
  lang: 'RU' | 'EN';
  onBack: () => void;
}

export default function Vacancies({ lang, onBack }: VacanciesProps) {
  const isRu = lang === 'RU';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [activeJobId, setActiveJobId] = useState<string>('ar-manager');
  const [copied, setCopied] = useState<boolean>(false);

  // Form states for the actual database submission and clipboard builder
  const [formData, setFormData] = useState({
    nameAgeCity: '', // Имя / возраст / город
    targetVacancy: 'ar-manager', // На какую вакансию хочешь попасть
    experience: '', // Есть ли опыт в музыкальной сфере
    previousRoles: '', // Занимал(а) ли ранее должность в лейблах, дистрибьюторах или музыкальных проектах
    collaborations: '', // С какими лейблами, дистрибьюторами или артистами работал(а)
    tasks: '', // Какие задачи выполнял(а)
    portfolio: '', // Примеры работ, если есть
    contact: '' // Контакт для обратной связи (Telegram / Email / Телефон)
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Sync chosen tab with select fallback in the application form
  useEffect(() => {
    setFormData(prev => ({ ...prev, targetVacancy: activeJobId }));
  }, [activeJobId]);

  const handleCopyApplyTemplate = () => {
    const activeJobTitle = jobs.find(j => j.id === formData.targetVacancy)?.titleRu || 'Команда NIGHTVOLT';
    const activeJobTitleEn = jobs.find(j => j.id === formData.targetVacancy)?.titleEn || 'NIGHTVOLT Team';

    const textRu = `👋 Привет, команда NIGHTVOLT!
Хочу подать заявку в команду на позицию: ${activeJobTitle}

📋 Моя анкета:
• Имя / возраст / город: ${formData.nameAgeCity || '...'}
• Желаемая вакансия: ${activeJobTitle}
• Есть ли опыт в музыкальной сфере: ${formData.experience || '...'}
• Занимал(а) ли ранее должность в лейблах, дистрибьюторах или музыкальных проектах: ${formData.previousRoles || '...'}
• С какими лейблами, дистрибьюторами или артистами работал(а): ${formData.collaborations || '...'}
• Какие задачи выполнял(а): ${formData.tasks || '...'}
• Примеры работ (если есть): ${formData.portfolio || '...'}
• Контакт для обратной связи: ${formData.contact || '...'}`;

    const textEn = `👋 Hello, NIGHTVOLT Team!
I would like to apply for the position: ${activeJobTitleEn}

📋 My Application:
• Name / Age / City: ${formData.nameAgeCity || '...'}
• Target vacancy: ${activeJobTitleEn}
• Experience in music industry: ${formData.experience || '...'}
• Held roles in labels, distributors, or music projects: ${formData.previousRoles || '...'}
• Collaborations with other labels/distributors/artists: ${formData.collaborations || '...'}
• Tasks performed: ${formData.tasks || '...'}
• Case studies / portfolio pieces: ${formData.portfolio || '...'}
• Contact channel: ${formData.contact || '...'}`;

    const text = isRu ? textRu : textEn;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.nameAgeCity.trim()) {
      setValidationError(isRu ? 'Пожалуйста, заполните поле "Имя / возраст / город"' : 'Please fill "Name / Age / City" field');
      return;
    }
    if (!formData.contact.trim()) {
      setValidationError(isRu ? 'Пожалуйста, заполните "Контакт для обратной связи" (например, Telegram @username)' : 'Please fill "Contact for feedback" field (e.g., Telegram @username)');
      return;
    }

    setIsSubmitting(true);
    setSubmitStep(1); // "Валидация полей..."

    setTimeout(() => {
      setSubmitStep(2); // "Формирование пакета отправки..."
      setTimeout(() => {
        setSubmitStep(3); // "Передача анкеты в базу NIGHTVOLT..."
        setTimeout(() => {
          try {
            const currentSubmissions = JSON.parse(localStorage.getItem('nightvolt_vacancies_submissions') || '[]');
            const newSubmission = {
              id: 'app_' + Date.now(),
              date: new Date().toISOString(),
              data: { ...formData, activeJobTitleRu: jobs.find(j => j.id === formData.targetVacancy)?.titleRu }
            };
            currentSubmissions.push(newSubmission);
            localStorage.setItem('nightvolt_vacancies_submissions', JSON.stringify(currentSubmissions));
          } catch (err) {
            console.warn('LocalStorage unavailable or quota exceeded', err);
          }

          setIsSubmitting(false);
          setIsSubmitted(true);
          setSubmitStep(0);
        }, 1200);
      }, 1000);
    }, 800);
  };

  const jobs = [
    {
      id: 'ar-manager',
      titleRu: 'A&R-менеджер',
      titleEn: 'A&R Manager',
      shortRu: 'Поиск талантов и отбор релизов',
      shortEn: 'Talent Scout & Release Curation',
      descRu: 'Искать новых артистов, оценивать потенциал демонстрационных материалов и способствовать пополнению музыкального каталога лейбла.',
      descEn: 'Scout new talent, evaluate demo submissions, and help shape our expanding release catalog.',
      dutiesRu: [
        'Искать новых перспективных артистов на стримингах, пабликах и социальных сетях',
        'Слушать демо и адекватно оценивать художественный и рыночный потенциал треков',
        'Инициировать и вести первичное общение с артистами по поводу сотрудничества',
        'Передавать перспективных артистов команде лейбла для дальнейшего подписания',
        'Помогать с квалифицированным отбором релизов для дальнейшей промо-поддержки'
      ],
      dutiesEn: [
        'Scout rising stars across social media, forums, and local streaming charts',
        'Listen to incoming demos and assess artistic/commercial potential objectively',
        'Initiate and manage clean correspondence with artists regarding signing terms',
        'Onboard selected high-potential creators to our central team roster',
        'Assist with selecting outstanding works for direct editorial promotion pitches'
      ],
      reqsRu: [
        'Хорошее, глубокое понимание современной музыки и трендов',
        'Умение культурно и адекватно общаться с артистами любого масштаба',
        'Высокая насмотренность и наслушанность в различных музыкальных жанрах',
        'Личная ответственность, инициативность и автономность',
        'Искреннее желание развиваться именно в A&R-направлении'
      ],
      reqsEn: [
        'Deep, current understanding of modern music subcultures and algorithms',
        'Superb, respectful verbal communication skills in chat/email settings',
        'Vast library of listened works across various contemporary genres',
        'Proactive mindset, accountability, and self-organization',
        'Strong aspiration to build a solid career track in A&R scouting'
      ]
    },
    {
      id: 'artist-manager',
      titleRu: 'Менеджер артистов',
      titleEn: 'Artist Manager',
      shortRu: 'Ведение релизов и забота об авторах',
      shortEn: 'Release Asset & Partner Liaison',
      descRu: 'Быть главным проводником и поддержкой для артиста на этапе подготовки к релизу. Контролировать метаданные и помогать решать любые вопросы.',
      descEn: "Serve as the direct guardian and primary contact for our roster during setup. Supervise metadata files and reconcile questions.",
      dutiesRu: [
        'Вести оперативную и вежливую коммуникацию с артистами в рабочих чатах',
        'Оперативно помогать артистам по всем базовым рабочим вопросам на платформе',
        'Контролировать корректное заполнение метаданных и информации по релизам в личном кабинете',
        'Следить за строгим соблюдением сроков подготовки и своевременной подачи релизов',
        'Передавать технической команде критически важную информацию по релизам, если требуется содействие',
        'Помогать решать сопутствующие вопросы с подготовкой обложек, текстов писем и файлов'
      ],
      dutiesEn: [
        'Coordinate daily and polite text chats with signed artists on current timelines',
        'Help artists navigate simple platform functionalities and setup steps',
        'Audit final layout metadata inside artist dashboards for error-free delivery',
        'Track strict milestone cues to submit master files before digital store deadlines',
        'Escalate database issues or custom requests to internal operations immediately',
        'Support preparation of graphic design dimensions, metadata files, and promo texts'
      ],
      reqsRu: [
        'Грамотная устная и письменная коммуникация без ошибок',
        'Предельная ответственность, педантичность и железная внимательность к деталям',
        'Умение быстро отвечать на сообщения и сохранять структурированный порядок в задачах',
        'Спокойное, вежливое и стрессоустойчивое общение даже в спорных ситуациях',
        'Понимание базового процесса дистрибуции и выпуска цифровых релизов',
        'Большое желание бережно работать с людьми и их музыкальными проектами'
      ],
      reqsEn: [
        'Flawless written and spoken phrasing, pleasant tone in text chats',
        'Exceptional system focus, attention to fine print, and rigorous task track habits',
        'Rapid reply times; keeping a tidy digital workspace with zero lost threads',
        'Calm, mature composure during heated or complex support requests',
        'General familiarity with digital music release timelines and delivery pipelines',
        'Genuine passion for helping artists feel valued and organized'
      ]
    },
    {
      id: 'smm-specialist',
      titleRu: 'SMM-специалист',
      titleEn: 'SMM Specialist',
      shortRu: 'Ведение соцсетей и новостной ленты',
      shortEn: 'Social Media & Brand Voice',
      descRu: 'Создавать живой и вовлекающий образ лейбла в медиаполе. Делиться новостями, успехами артистов и формировать сообщество.',
      descEn: "Cultivate our brand avatar online. Compose posts, promote artist milestones, and build cohesive community hubs.",
      dutiesRu: [
        'Вести официальные социальные сети музыкального лейбла',
        'Писать понятные, живые посты для Telegram-канала, группы ВКонтакте и других площадок',
        'Подготавливать и соблюдать регулярный контент-план публикаций',
        'Оформлять карточки и лаконичные посты-презентации по выходящим релизам',
        'Следить за активностью аудитории, отвечать на комментарии и растить сообщество'
      ],
      dutiesEn: [
        'Administrate official label accounts on key platforms',
        'Draft fresh, organic updates for VK, Telegram, and auxiliary visual sites',
        'Draft and coordinate a rigorous weekly and monthly media publication schedule',
        'Format release highlight cards, visual teasers, and presentation cards',
        'Monitor audience comments, trigger active discussions, and expand fanbase circles'
      ],
      reqsRu: [
        'Абсолютно грамотная письменная речь и чувство ритма текста',
        'Глубокое понимание специфики ведения социальных сетей в 2026 году',
        'Умение писать просто, понятно и без скучного официоза ("живым языком")',
        'Развитое чувство стиля, композиции и эстетики визуала',
        'Ответственный подход к стабильной регулярности выхода контента'
      ],
      reqsEn: [
        'Incredibly polished copy structure and sense of style',
        'In-depth command of social algorithms and layout design trends in 2026',
        'Ability to communicate thoughts concisely, bypassing dry corporate formulas',
        'Sharp visual judgment, appreciation of minimalism, and dark/neo aesthetics',
        'Total accountability for meeting schedule goals without reminders'
      ]
    },
    {
      id: 'promo-manager',
      titleRu: 'Промо-менеджер',
      titleEn: 'Promo Copywriter',
      shortRu: 'Написание сильных промо-текстов',
      shortEn: 'Release Narrative & Pitching',
      descRu: 'Формулировать атмосферу, главную ценность и уникальность каждого релиза. Создавать тексты, которые заставят редактора нажать Play.',
      descEn: 'Transcribe the mood, unique vibe, and target details of each new song. Write text that drives curators to listen.',
      dutiesRu: [
        'Грамотно и профессионально формулировать промо-информацию к каждому релизу',
        'Подготавливать емкие текстовые описания релизов для редакторов плейлистов и кураторов витрин',
        'Составлять короткие, понятные и цепляющие анонсы для музыкальных пабликов и медиа-каналов',
        'Выделять ключевую идею, настроение, сильные стороны трека и референсы артиста',
        'Адаптировать промо-тексты под различные форматы публикаций и требования платформ',
        'Помогать общей команде в подготовке материалов для продвижения артистов'
      ],
      dutiesEn: [
        'Structure professional pitching and introductory logs for each outgoing song',
        'Draft tight, informative release descriptions for streaming editors and playlist curators',
        'Compose concise, high-impact press blurbs for external music feeds and blogs',
        'Isolate the core mood, stylistic highlights, genre tags, and artist references',
        'Format copy templates specifically for diverse platform submission demands',
        'Collaborate closely with internal staff to align overall artist promotion angles'
      ],
      reqsRu: [
        'Безупречная письменная речь без грамматических и пунктуационных помарок',
        'Умение писать емко, выразительно, вовлекающе и без лишней «воды»',
        'Понимание музыкального контекста и жанровых терминов',
        'Способность чувствовать атмосферу трека и визуализировать её через слово',
        'Исключительное внимание к техническим деталям релиза',
        'Личная ответственность и строгое соблюдение установленных дедлайнов'
      ],
      reqsEn: [
        'Flawless grasp of copy grammar, layout styling, and phrasing structures',
        'Capacity to pack incredible depth into brief paragraphs without artificial filler',
        'Active vocabulary of electronic and general musical terminologies',
        'Empathy for audio styles; explaining feelings and sound design verbally',
        'High attention to exact credits, technical spellings, and references',
        'Proven time-management habits to match early pitching routines'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-transparent py-32 px-6 md:px-12 relative block overflow-hidden font-sans">
      
      {/* Decorative Grid Lines to match main site */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        
        {/* Navigation Return Button */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-14"
        >
          <button
            onClick={onBack}
            className="group flex items-center gap-2.5 px-4 py-2 bg-white hover:bg-neutral-950 border border-neutral-200 hover:border-neutral-900 rounded-full text-[11px] font-mono font-bold tracking-widest text-neutral-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{isRu ? "НАЗАД В ЛАБОРАТОРИЮ" : "RETURN TO PORTAL"}</span>
          </button>
        </motion.div>

        {/* Header Block */}
        <div className="border-b border-neutral-200/60 pb-12 mb-16">
          <div className="flex items-center gap-2 text-brand-orange font-mono text-[10px] tracking-[0.25em] mb-4 uppercase font-bold">
            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-ping" />
            <span>{isRu ? "НАБОР В КОМАНДУ NIGHTVOLT" : "NIGHTVOLT TEAM EXPANSION"}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight leading-[0.95] text-neutral-950 uppercase mb-6">
            {isRu ? "СТАНЬ ЧАСТЬЮ" : "JOIN THE"}<br />
            <span className="text-outline-blue uppercase">{isRu ? "НАШЕЙ КОМАНДЫ" : "NIGHTVOLT CREW"}</span>
          </h1>

          <p className="text-xs md:text-sm text-neutral-500 font-light max-w-2xl leading-relaxed">
            {isRu
              ? "Мы активно развиваем музыкальный лейбл и ищем увлеченных людей, которые любят актуальный звук и хотят работать в музыкальной индустрии, помогая артистам с качественной подготовкой, продвижением и развитием музыкального каталога."
              : "We are actively developing our independent music label and looking for motivated individuals who love cutting-edge audio and want to build careers in the industry by supporting artists with technical setups, marketing actions, and catalog operations."}
          </p>
        </div>

        {/* Two Column Layout: Occupying Left (Positions list), Right (Apply / Details Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left Block - Vacancies Selectors / Detail card (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Horizontal Job selection Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 rounded-2xl border border-neutral-200/60 mb-6">
              {jobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => setActiveJobId(job.id)}
                  className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    activeJobId === job.id
                      ? 'bg-neutral-950 text-white shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-950 hover:bg-white/50'
                  }`}
                >
                  {isRu ? job.titleRu : job.titleEn}
                </button>
              ))}
            </div>

            {/* Selected Job Information Card */}
            <AnimatePresence mode="wait">
              {jobs.filter(j => j.id === activeJobId).map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm space-y-8"
                >
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue rounded-full text-[9px] font-mono font-bold uppercase tracking-wider mb-3">
                      <Briefcase className="w-3 h-3 text-brand-blue" />
                      {isRu ? "ОТКРЫТАЯ ВАКАНСИЯ" : "ACTIVE POSITION"}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-black text-neutral-950 uppercase tracking-tight">
                      {isRu ? job.titleRu : job.titleEn}
                    </h2>
                    <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-1.5">
                      {isRu ? job.shortRu : job.shortEn}
                    </p>
                    <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed mt-4">
                      {isRu ? job.descRu : job.descEn}
                    </p>
                  </div>

                  {/* Duties Grid */}
                  <div className="space-y-4">
                    <h3 className="font-mono text-[9px] tracking-widest text-[#7e8c9c] font-bold uppercase flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-brand-orange" />
                      {isRu ? "ЧТО ПРЕДСТОИТ ДЕЛАТЬ" : "KEY RESPONSIBILITIES"}
                    </h3>
                    <ul className="space-y-3.5">
                      {(isRu ? job.dutiesRu : job.dutiesEn).map((duty, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-xs md:text-[13px] text-neutral-600 font-light leading-relaxed">
                            {duty}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements Grid */}
                  <div className="space-y-4">
                    <h3 className="font-mono text-[9px] tracking-widest text-[#7e8c9c] font-bold uppercase flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
                      {isRu ? "ТРЕБОВАНИЯ К КАНДИДАТУ" : "CANDIDATE REQUIREMENTS"}
                    </h3>
                    <ul className="space-y-3.5">
                      {(isRu ? job.reqsRu : job.reqsEn).map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0 animate-pulse" />
                          <span className="text-xs md:text-[13px] text-neutral-600 font-light leading-relaxed">
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* General conditions for everyone card */}
            <div className="bg-neutral-950 text-white p-8 rounded-3xl border border-neutral-800 space-y-6">
              <div>
                <span className="font-mono text-[9px] tracking-widest text-brand-orange font-bold uppercase block mb-1">
                  // {isRu ? "ОБЩИЕ КРИТЕРИИ" : "UNIVERSAL CRITERIA"}
                </span>
                <h4 className="font-display text-lg font-black uppercase tracking-wide">
                  {isRu ? "ТРЕБОВАНИЯ ДЛЯ ВСЕХ" : "GENERAL EXPECTATIONS"}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light text-neutral-400 leading-relaxed">
                <div className="space-y-2 border-l-2 border-brand-blue/30 pl-4">
                  <p className="font-bold text-white uppercase text-[10px] font-mono tracking-wider">
                    {isRu ? "КОМАНДНЫЙ ИГРОК" : "TEAM INTEGRATION"}
                  </p>
                  <p>
                    {isRu 
                      ? "Абсолютная ответственность, умение работать в связке с артистами, вежливость, адекватность и готовность всегда соблюдать заявленные сроки задач."
                      : "Total answerability, capability to synchronize with sound authors, superb politeness and dedication to meet exact milestone targets."}
                  </p>
                </div>
                <div className="space-y-2 border-l-2 border-brand-orange/30 pl-4">
                  <p className="font-bold text-white uppercase text-[10px] font-mono tracking-wider">
                    {isRu ? "АРТИСТ-ОРИЕНТИР ПЛЮС" : "MOTIVATION OVER DEGREE"}
                  </p>
                  <p>
                    {isRu
                      ? "Музыкальный бэкграунд или опыт работы в дистрибуции будет существенным плюсом, но наше главное требование — подлинное желание развиваться."
                      : "Label background or solid knowledge of aggregate terminals is helper asset, but your authentic willingness to learn is leading filter."}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Block - Direct Application Form & Guidance (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 md:sticky md:top-28">

            {/* Crucial Conversation Note */}
            <div className="bg-neutral-50 border border-neutral-200/50 p-6 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-neutral-400">
                <Info className="w-4 h-4 text-brand-blue" />
                <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-neutral-500">
                  {isRu ? "ВАЖНОЕ ПРИМЕЧАНИЕ" : "IMPORTANT PROTOCOL"}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                {isRu 
                  ? "Будьте готовы к тому, что в повседневной работе может быть много рабочих бесед с артистами и командой. Важно уметь не теряться в чатах, быстро отвечать на поступающие запросы, следить за информацией и всегда поддерживать идеальный порядок в коммуникации."
                  : "Keep in mind that daily catalog tracking generates active communication streams across artist chats and team threads. It is absolutely vital that you do not get lost inside dense messaging channels, reply promptly, track files carefully, and keep correspondence neat."}
              </p>
            </div>

            {/* Interactive Apply Form with Direct Submission */}
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-6 md:p-8 rounded-3xl border border-neutral-200/80 shadow-md space-y-6"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                      <Check className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-black text-neutral-950 uppercase tracking-tight">
                        {isRu ? "АНКЕТА ОТПРАВЛЕНА!" : "APPLICATION SENT!"}
                      </h4>
                      <p className="font-mono text-[9px] text-emerald-500 uppercase tracking-widest mt-1">
                        STATUS: SUBMITTED_DIRECTLY_OK
                      </p>
                    </div>
                    <p className="text-xs text-neutral-500 font-light leading-relaxed">
                      {isRu
                        ? "Твоя анкета успешно внесена в базу соискателей NIGHTVOLT. Мы уже уведомили команду A&R и лид-менеджеров лейбла. Если твой профиль заинтересует команду, мы обязательно свяжемся с тобой по указанным контактам."
                        : "Your application has been successfully saved to the NIGHTVOLT candidate registry. Label leads have been notified. We will reach you direct if your profile aligns with our objectives."}
                    </p>
                  </div>

                  {/* Submitted summaries grid */}
                  <div className="bg-neutral-50 border border-neutral-200/60 p-4.5 rounded-2xl space-y-2.5 font-mono text-[9px]">
                    <div className="text-brand-blue font-bold uppercase tracking-widest border-b border-neutral-200/60 pb-1.5 flex justify-between">
                      <span>// {isRu ? "ЗАПИСЬ В БАЗЕ КАНДИДАТОВ" : "CANDIDATE LEDGER"}</span>
                      <span className="text-neutral-400 font-bold">NV_ID: APP_{Date.now().toString().slice(-5)}</span>
                    </div>
                    <div className="space-y-1.5 text-neutral-600">
                      <p><strong className="text-neutral-950 font-bold">{isRu ? "Вакансия:" : "Vacancy:"}</strong> {jobs.find(j => j.id === formData.targetVacancy)?.titleRu || formData.targetVacancy}</p>
                      <p><strong className="text-neutral-950 font-bold">{isRu ? "Кандидат:" : "Candidate:"}</strong> {formData.nameAgeCity}</p>
                      <p><strong className="text-neutral-950 font-bold">{isRu ? "Связь:" : "Contact:"}</strong> <span className="text-brand-blue underline">{formData.contact}</span></p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={handleCopyApplyTemplate}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-950 hover:bg-neutral-900 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all active:scale-[0.98] cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{isRu ? "АНКЕТА СКОПИРОВАНА!" : "COPIED TO CLIPBOARD!"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-brand-orange shrink-0" />
                          <span>{isRu ? "СКОПИРОВАТЬ РЕЗЮМЕ" : "COPY COMPRESSED BRIEF"}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-600 border border-neutral-200/80 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer"
                    >
                      <span>{isRu ? "ОТПРАВИТЬ ЕЩЁ ОДИН ОТКЛИК" : "SUBMIT ANOTHER RESPONSE"}</span>
                    </button>

                    <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[10px] text-neutral-400 leading-normal font-mono text-center">
                      <p className="font-bold text-neutral-700 uppercase mb-1">
                        {isRu ? "⚡️ ДЛЯ УСКОРЕНИЯ РАССМОТРЕНИЯ" : "⚡️ FOR ACCELERATED REVIEW"}
                      </p>
                      {isRu ? (
                        <span>Вы можете отправить скопированное резюме напрямую куратору в Telegram: <a href="https://t.me/Nightvolt_1" target="_blank" rel="noreferrer" className="text-brand-blue font-bold hover:underline">@Nightvolt_1</a></span>
                      ) : (
                        <span>You can also forward the copied application direct to Telegram: <a href="https://t.me/Nightvolt_1" target="_blank" rel="noreferrer" className="text-brand-blue font-bold hover:underline">@Nightvolt_1</a></span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : isSubmitting ? (
                <motion.div
                  key="submitting-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm flex flex-col items-center justify-center text-center min-h-[460px] space-y-6"
                >
                  <div className="relative">
                    <div className="w-14 h-14 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-black text-brand-orange">
                      NV
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-black text-neutral-950 uppercase tracking-wide animate-pulse">
                      {isRu ? "ОТПРАВКА АНКЕТЫ..." : "TRANSMITTING BRIEF..."}
                    </h4>
                    <p className="font-mono text-[9px] text-[#7e8c9c] uppercase tracking-widest mt-1.5 h-4">
                      {submitStep === 1 && (isRu ? "ВАЛИДАЦИЯ ТЕКСТОВЫХ ПОЛЕЙ..." : "VALIDATING APPLICATION METADATA...")}
                      {submitStep === 2 && (isRu ? "ФОРМИРОВАНИЕ И ШИФРОВАНИЕ ПАКЕТА..." : "GENERATING ENCRYPTED DATA PACK...")}
                      {submitStep === 3 && (isRu ? "ЗАГРУЗКА В КАНДИДАТ-РЕЕСТР NIGHTVOLT..." : "SAVING TO NIGHTVOLT SECTOR DB...")}
                    </p>
                  </div>
                  <div className="w-full max-w-xs bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-brand-blue h-full"
                      animate={{ width: `${(submitStep / 3) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="apply-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-widest text-[#7e8c9c] font-bold uppercase block">
                      // {isRu ? "ПРЯМАЯ ОТПРАВКА С САЙТА" : "DIRECT PORTAL SUBMISSION"}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  
                  <h4 className="font-display text-sm font-black text-neutral-950 uppercase">
                    {isRu ? "ЗАПОЛНИТЬ АНКЕТУ СОИСКАТЕЛЯ" : "CANDIDATE ENTRY FORM"}
                  </h4>

                  <form onSubmit={handleDirectSubmit} className="space-y-3.5">
                    
                    {/* Name, Age, City (Required) */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold flex justify-between">
                        <span>{isRu ? "1. Имя / Возраст / Город" : "1. Name / Age / City"}</span>
                        <span className="text-brand-orange text-[10px]">*</span>
                      </label>
                      <input 
                        type="text"
                        required
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 rounded-xl px-3 py-2 text-xs font-light text-neutral-800 focus:outline-none transition-all"
                        placeholder={isRu ? "Алексей, 24, Санкт-Петербург" : "Alex, 24, London"}
                        value={formData.nameAgeCity}
                        onChange={(e) => setFormData({...formData, nameAgeCity: e.target.value})}
                      />
                    </div>

                    {/* Target Vacancy */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold flex justify-between">
                        <span>{isRu ? "2. Желаемая вакансия" : "2. Target Position"}</span>
                        <span className="text-brand-orange text-[10px]">*</span>
                      </label>
                      <select
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 rounded-xl px-3 py-2 text-xs font-mono text-neutral-800 focus:outline-none transition-all cursor-pointer"
                        value={formData.targetVacancy}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({...formData, targetVacancy: val});
                          setActiveJobId(val);
                        }}
                      >
                        {jobs.map(j => (
                          <option key={j.id} value={j.id}>{isRu ? j.titleRu : j.titleEn}</option>
                        ))}
                      </select>
                    </div>

                    {/* Music Industry Experience */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold">{isRu ? "3. Есть ли опыт в музыкальной сфере?" : "3. Music industry experience?"}</label>
                      <textarea 
                        rows={2}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 rounded-xl px-3 py-1.5 text-xs font-light text-neutral-800 focus:outline-none resize-none transition-all"
                        placeholder={isRu ? "Например, музыкант, диджей, писал рецензии или вели паблик..." : "E.g., sound producer, reviewer, hobby composer..."}
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      />
                    </div>

                    {/* Held Positions in Labels or Projects */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold">
                        {isRu ? "4. Работал(а) ранее в лейблах, дистрибьюторах или проектах?" : "4. Previously worked in labels or music projects?"}
                      </label>
                      <textarea 
                        rows={2}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 rounded-xl px-3 py-1.5 text-xs font-light text-neutral-800 focus:outline-none resize-none transition-all"
                        placeholder={isRu ? "Название проекта, лейбла, дистрибьютора и роль..." : "Name of the label / agency and your responsibilities..."}
                        value={formData.previousRoles}
                        onChange={(e) => setFormData({...formData, previousRoles: e.target.value})}
                      />
                    </div>

                    {/* Collaborations (Labels, Artists, Distributors) */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold">
                        {isRu ? "5. С кем сотрудничал(а) (артисты, лейблы, паблики)?" : "5. Collaborated brands or artists?"}
                      </label>
                      <input 
                        type="text"
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 rounded-xl px-3 py-2 text-xs font-light text-neutral-800 focus:outline-none transition-all"
                        placeholder={isRu ? "Например, паблик 'E:Music', артист XYZ..." : "E.g., sound portal, specific artists..."}
                        value={formData.collaborations}
                        onChange={(e) => setFormData({...formData, collaborations: e.target.value})}
                      />
                    </div>

                    {/* Key Tasks of the past */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold">
                        {isRu ? "6. Какие задачи выполнял(а)?" : "6. What tasks did you perform?"}
                      </label>
                      <textarea 
                        rows={2}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 rounded-xl px-3 py-1.5 text-xs font-light text-neutral-800 focus:outline-none resize-none transition-all"
                        placeholder={isRu ? "Модерация релизов, оформление визуала, написание пресс-релизов..." : "Release optimization, cover guidelines drafting, legal audits..."}
                        value={formData.tasks}
                        onChange={(e) => setFormData({...formData, tasks: e.target.value})}
                      />
                    </div>

                    {/* Portfolio / Examples */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold">{isRu ? "7. Примеры работ, ссылки на портфолио" : "7. Work examples, portfolio links"}</label>
                      <input 
                        type="text"
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 rounded-xl px-3 py-2 text-xs font-light text-neutral-800 focus:outline-none transition-all"
                        placeholder={isRu ? "Гугл Диск, Яндекс Диск, ссылки на тексты/картинки..." : "Drive directories, links to previous publications..."}
                        value={formData.portfolio}
                        onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                      />
                    </div>

                    {/* Contact for verification (Required) */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold flex justify-between">
                        <span>{isRu ? "8. Контакт для связи (Telegram / Email)" : "8. Feedback channel (Telegram / Email)"}</span>
                        <span className="text-brand-orange text-[10px]">*</span>
                      </label>
                      <input 
                        type="text"
                        required
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 rounded-xl px-3 py-2 text-xs font-light text-neutral-800 focus:outline-none transition-all"
                        placeholder={isRu ? "Telegram: @username или email@domain.com" : "Telegram Username: @yourhandle"}
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      />
                    </div>

                    {/* Validation Warning Area */}
                    {validationError && (
                      <div className="text-[11px] font-mono text-brand-orange font-bold animate-pulse pt-1">
                        ⚠️ {validationError}
                      </div>
                    )}

                    {/* Submit and Copy Area */}
                    <div className="pt-2.5 space-y-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-blue hover:bg-neutral-900 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 active:scale-[0.98] cursor-pointer hover:shadow-md"
                      >
                        <Send className="w-3.5 h-3.5 shrink-0" />
                        <span>{isRu ? "ОТПРАВИТЬ АНКЕТУ" : "SUBMIT APPLICATION"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyApplyTemplate}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{isRu ? "СКОПИРОВАНО!" : "COPIED TO CLIPBOARD!"}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                            <span>{isRu ? "КОПИРОВАТЬ ДЛЯ TG" : "COPY BRIEF TO TELEGRAM"}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Benefits panel list */}
        <div className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-brand-orange">
            <Flame className="w-4.5 h-4.5 animate-pulse" />
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
              {isRu ? "ТВОИ ПЕРСПЕКТИВЫ" : "YOUR REWARDS"}
            </span>
          </div>

          <h3 className="font-display text-xl md:text-2xl font-black text-neutral-950 uppercase tracking-tight">
            {isRu ? "ЧТО ТЫ ПОЛУЧИШЬ ОТ РАБОТЫ С НАМИ" : "WHAT WE OFFER OUR SUCCESSFUL TEAM PLAYERS"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 pt-2">
            {[
              { 
                ruTitle: "Музыкальный опыт", 
                enTitle: "Label Operations", 
                ruText: "Участие в реальных процессах одного из самых технологичных лейблов.",
                enText: "Authentic, high-pace action inside a highly modern software-driven label blueprint." 
              },
              { 
                ruTitle: "Реальные релизы", 
                enTitle: "Active Catalogs", 
                ruText: "Непосредственная работа с треками и релизами артистов разных масштабов.",
                enText: "Direct hand-on coordination of diverse tracks and catalog releases globally." 
              },
              { 
                ruTitle: "Команда NIGHTVOLT", 
                enTitle: "Our Pure Crew", 
                ruText: "Ламповое окружение единомышленников без душной корпоративной субординации.",
                enText: "Friendly environment alongside like-minded curators without dry corporate strictness." 
              },
              { 
                ruTitle: "Карьерный рост", 
                enTitle: "Growth Prospects", 
                ruText: "Возможность вырасти от стажера до руководителя собственного музыкального направления.",
                enText: "A solid future to scale from an apprentice to a fully authorized sector head." 
              },
              { 
                ruTitle: "Музыкальная сеть", 
                enTitle: "Artist Networks", 
                ruText: "Огромное количество знакомств со свежими авторами, битмейкерами и продюсерами.",
                enText: "Endless networks with upcoming beatmakers, composers, and digital artists." 
              }
            ].map((b, idx) => (
              <div key={idx} className="space-y-2.5 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <span className="font-mono text-brand-blue text-[11px] font-black tracking-widest block">
                  0{idx + 1}
                </span>
                <p className="font-display text-xs font-black text-neutral-950 uppercase tracking-tight transition-all">
                  {isRu ? b.ruTitle : b.enTitle}
                </p>
                <p className="text-[11px] text-neutral-400 font-light leading-normal">
                  {isRu ? b.ruText : b.enText}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
