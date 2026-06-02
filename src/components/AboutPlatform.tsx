import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Flame, User, Calendar, Award, Compass, Zap, ArrowLeft, Heart, Layers, MessageSquare } from 'lucide-react';

interface AboutPlatformProps {
  lang: 'RU' | 'EN';
  onBack: () => void;
}

export default function AboutPlatform({ lang, onBack }: AboutPlatformProps) {
  const isRu = lang === 'RU';

  // Automatically scroll to the top of the viewing frame on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-transparent py-32 px-6 md:px-12 relative block overflow-hidden font-sans">
      
      {/* Structural visual margins match the core grids */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        
        {/* Navigation Return Header */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <button
            onClick={onBack}
            className="group flex items-center gap-2.5 px-4 py-2 bg-white hover:bg-neutral-950 border border-neutral-200 hover:border-neutral-900 rounded-full text-[11px] font-mono font-bold tracking-widest text-neutral-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{isRu ? "НАЗАД В ЛАБОРАТОРИЮ" : "RETURN TO DASHBOARD"}</span>
          </button>
        </motion.div>

        {/* Hero Concept Row */}
        <div className="border-b border-neutral-200/60 pb-12 mb-16">
          <div className="flex items-center gap-2 text-brand-orange font-mono text-[10px] tracking-[0.25em] mb-4 uppercase font-bold">
            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-ping" />
            <span>{isRu ? "ИСТОРИЯ И МИССИЯ ПЛАТФОРМЫ" : "CHRONICLES & EMPOWERMENT MISSION"}</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight leading-[0.95] text-neutral-950 uppercase mb-6">
            NIGHTVOLT<br />
            <span className="text-outline-blue uppercase">PLATFORM DIARY</span>
          </h1>

          <p className="text-sm md:text-lg text-neutral-500 font-light max-w-2xl leading-relaxed">
            {isRu
              ? "Официальная биография независимого музыкального лейбла и дистрибьюторской экосистемы нового поколения."
              : "Official chronicled biography of our independent musical release pipeline and high-tempo distribution ecosystem."}
          </p>
        </div>

        {/* Narrative Chapters Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          
          {/* Main Story: Left Widescreen column */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Chapter 1 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-neutral-200/80 relative"
            >
              <div className="absolute top-6 right-8 font-mono text-xs text-neutral-300 font-bold select-none">
                CHAPTER I
              </div>
              <div className="flex items-center gap-3 mb-5 text-brand-blue">
                <Calendar className="w-5 h-5" />
                <span className="font-mono text-xs font-black tracking-wider uppercase">
                  {isRu ? "Основание лейбла // 30 мая 2025" : "The Spark // May 30, 2025"}
                </span>
              </div>
              
              <h3 className="font-display text-xl md:text-2xl font-black text-neutral-950 uppercase mb-4 leading-snug">
                {isRu ? "День, когда правила игры изменились" : "Decentralizing the acoustic industry"}
              </h3>
              
              <div className="space-y-4 text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
                <p>
                  {isRu
                    ? "Музыкальный лейбл NIGHTVOLT был официально создан весной — 30 мая 2025 года. Этот проект не стал очередной копией классических продюсерских центров. Он родился как прямой технологический ответ на застой, бюрократию и алчность музыкальной индустрии."
                    : "The NIGHTVOLT imprint was officially founded in Spring, on May 30th, 2025. This launch was not another generic iteration of bloated legal entities. It was engineered as a dynamic tech answer to the stagnation, complex red tape, and extreme commission rates of the modern music sector."}
                </p>
                <p>
                  {isRu
                    ? "Идея витала в воздухе давно: почему талантливые независимые артисты должны отдавать свои песни на вечные сроки, уступать права на мастер-записи и ждать распределения копеечных роялти месяцами? NIGHTVOLT был спроектирован с фундаментальной целю: убрать посреднический барьер и вернуть музыкальный контроль в руки непосредственного автора звука."
                    : "The core challenge was clear: why should gifted rising creators bind their songs to long lifetime contracts, yield true master ownership, and wait months to receive opaque performance statements? NIGHTVOLT was conceptualized to dissolve unnecessary legal middlemen and keep master ownership in the hands of composers."}
                </p>
              </div>
            </motion.div>

            {/* Chapter 2 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-neutral-200/80 relative"
            >
              <div className="absolute top-6 right-8 font-mono text-xs text-neutral-300 font-bold select-none">
                CHAPTER II
              </div>
              <div className="flex items-center gap-3 mb-5 text-brand-orange">
                <Flame className="w-5 h-5" />
                <span className="font-mono text-xs font-black tracking-wider uppercase">
                  {isRu ? "Честная цель // Простыми словами" : "Our Honest Goal // Simple Words"}
                </span>
              </div>
              
              <h3 className="font-display text-xl md:text-2xl font-black text-neutral-950 uppercase mb-4 leading-snug">
                {isRu ? "Для чего мы создали NIGHTVOLT" : "Why we actually built NIGHTVOLT"}
              </h3>
              
              <div className="space-y-4 text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
                <p>
                  {isRu
                    ? "Все очень просто. Вокруг огромное количество невероятно талантливых музыкантов, которым банально не хватает человеческой поддержки. Они мечутся от одного дистрибьютора к другому, бесконечно загружают треки через бездушные автоматические сайты, где их никто не слушает и при малейшей глупой ошибке блокируют счета. А крупные лейблы просто не обращают внимания на новичков — воротя нос или предлагая кабальные условия, где нужно продавать душу и отдавать права на свои песни на много лет вперед."
                    : "It is incredibly simple. There is a vast ocean of immensely talented musicians out there who simply lack basic human, real-world support. They keep migrating from one faceless broker to another, uploading songs to cold platforms where zero people actually listen, only to have payouts frozen or accounts flagged over the slightest metadata mistake. At the same time, legacy snobbish companies look down on newcomers, locking them out unless they pledge their legal rights away for decades."}
                </p>
                <p>
                  {isRu
                    ? "Мы строили NIGHTVOLT как место для своих. Наша цель — сделать так, чтобы у каждого независимого автора было надежное плечо. Чтобы ты мог залить трек и знать, что с той стороны экрана сидит живой человек, который быстро и ровно доставит песню до Яндекса, ВК, Спотифая и Эппл Мьюзик, ответит на любые возникшие вопросы и при этом не заберет твои законные права. Мы хотим дать музыкантам свободу делать то, что они любят, чувствуя себя защищенными и нужными. Без лишней воды и обмана."
                    : "We engineered NIGHTVOLT as an authentic home for creators. Our genuine goal is to make sure every independent voice has a strong shoulder to lean on. When you upload your creation, we want you to have peace of mind knowing a real human is reviewing it on the other side. A human who quickly and perfectly routes your audio to VK, Yandex, Spotify, and Apple Music, steps in to answer your questions, and keeps your master rights 100% yours. We want creators to focus on their art, feeling safe and supported. No artificial corporate noise, just pure trust."}
                </p>
              </div>
            </motion.div>

          </div>

          {/* Founder Section: Right Focus column (ONLY Ilya) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            
            {/* Ilya Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-3xl border-2 border-brand-blue relative overflow-hidden shadow-xl"
            >
              {/* Decorative dynamic badge */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-blue to-cyan-500 text-white flex items-center justify-center font-display text-2xl font-black shadow-lg">
                  I
                </div>
                <div className="px-3 py-1 bg-brand-blue border border-brand-blue/25 text-white text-[9px] font-mono font-bold rounded-full uppercase tracking-widest">
                  FOUNDER & CEO
                </div>
              </div>

              <span className="font-mono text-[9px] tracking-widest text-brand-orange font-bold uppercase block mb-1">
                {isRu ? "ОСНОВАТЕЛЬ И ХОЗЯИН ЛЕЙБЛА" : "LABEL OWNER & GENERAL ARCHITECT"}
              </span>
              <h3 className="font-display text-2xl font-black text-neutral-950 uppercase tracking-tight mb-4">
                {isRu ? "ИЛЬЯ" : "ILYA"}
              </h3>

              <div className="space-y-4 text-xs text-neutral-500 font-light leading-relaxed">
                <p>
                  {isRu
                    ? "Илья — основатель, генеральный директор и единственный законный руководитель NIGHTVOLT. Спроектировав платформу весной 2025 года, он вложил в неё простой принцип: артист должен быть свободным."
                    : "Ilya is the founder, chief executive officer, and sole lead mind directing NIGHTVOLT. Launching the architecture in Spring 2025, he set a straightforward directive: creators must remain unshackled."}
                </p>
                <p>
                  {isRu
                    ? "Все важные операционные решения по дистрибуции, разработке личных кабинетов, прямому продвижению артистов и автоматическому сбору роялти курируются им лично — без привлечения бюрократических советов директоров."
                    : "Every critical strategic decision, label pipeline design, curated playlist outreach, and direct royalty automated structure is managed personally by him, eliminating corporate boards and investor static."}
                </p>
              </div>

              {/* Founder Quote */}
              <div className="mt-8 pt-6 border-t border-neutral-100">
                <blockquote className="text-xs text-brand-blue font-mono font-bold italic leading-relaxed pl-3.5 border-l-2 border-brand-blue">
                  {isRu
                    ? "«Музыка рождается на студии между артистом и микрофоном, а не в кабинетах директоров, которые не смыслят в искусстве. Мы убрали весь мусор из этого уравнения. NIGHTVOLT — для авторов»."
                    : "«Music takes shape between a creator and a microphone, not inside executive boards that cannot relate to acoustics. We cleared the static from this pipeline. NIGHTVOLT belongs fully to the authors»."}
                </blockquote>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Detailed Core Vision - Full width visual panel describing goals deeply */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-brand-blue/5 to-transparent p-8 md:p-14 rounded-3xl border border-neutral-200"
        >
          <div className="flex items-center gap-2 text-brand-blue font-mono text-[10px] tracking-[0.2em] mb-4 uppercase font-bold">
            <Sparkles className="w-4 h-4 text-brand-blue" />
            <span>{isRu ? "АРТИСТ ОСТАЕТСЯ АРТИСТОМ" : "CREATORS MUST OWN THEIR MASTERS"}</span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-black text-neutral-950 uppercase mb-6 leading-tight">
            {isRu
              ? "Наша главная ценность: творческая свобода превыше всего"
              : "Our absolute core value: creative freedom above all constraints"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
            <div>
              <p className="mb-4">
                {isRu
                  ? "Для Ильи создание NIGHTVOLT не было коммерческой прихотью. Это честный шаг навстречу авторам. Большинство крупных компаний рассматривают независимых музыкантов исключительно как цифры в сводных отчетах."
                  : "For Ilya, launching NIGHTVOLT was never a vanity business project. It is a genuine hand extended to creators. Most large agencies view rising musicians as mere rows in corporate ledgers."}
              </p>
              <p>
                {isRu
                  ? "Мы за честные правила. NIGHTVOLT не забирает твои права и не связывает тебя скрытыми условиями. Ты выпускаешь музыку с нами, пока это выгодно тебе, и можешь забрать треки в любой момент без штрафов и объяснений."
                  : "We believe in honest rules. NIGHTVOLT does not take your rights or lock you with fine print. You release music with us as long as you want to, and you are free to pull your songs at any moment without penalties or hassles."}
              </p>
            </div>
            <div>
              <p className="mb-4">
                {isRu
                  ? "Мы берем ровно 20%, чтобы обеспечивать стабильную круглосуточную работу наших технических шлюзов, дарить артистам бесплатные генераторы графики и выбивать для независимых треков промо-баннеры на витринах."
                  : "We reserve a fixed 20% to run our high-frequency cloud delivery nodes, provide creators with custom complimentary graphics machinery, and fight to place honest releases directly on curated network display slots."}
              </p>
              <p className="font-semibold text-brand-blue">
                {isRu
                  ? "Здесь нет места пустой бюрократии. Только чистый звук, умные технологии отгрузки и личное внимание основателя к каждому музыканту, вступающему под знамена NIGHTVOLT."
                  : "We leave zero room for bloated corporate politics. Just pristine studio waves, cloud transmission frameworks, and personal support from our founder to every artist marching under the joint NIGHTVOLT banner."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Closing Action Prompt */}
        <div className="mt-20 text-center">
          <button
            onClick={onBack}
            className="px-8 py-3.5 bg-brand-blue hover:bg-neutral-950 text-white font-mono text-xs font-bold tracking-widest rounded-full cursor-pointer hover:shadow-xl hover:shadow-brand-blue/15 transition-all duration-300"
          >
            {isRu ? "ЗАПУСТИТЬ СВОЙ ТРЕК СЕЙЧАС" : "UPLOAD YOUR MASTERS NOW"}
          </button>
        </div>

      </div>
    </div>
  );
}
