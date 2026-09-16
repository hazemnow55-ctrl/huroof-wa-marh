import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  BookOpen,
  Check,
  ChevronLeft,
  Headphones,
  Heart,
  Menu,
  Play,
  Sparkles,
  Star,
  Trophy,
  Volume2,
  X,
} from "lucide-react";

const letters = [
  { letter: "أ", name: "ألف", word: "أسد", emoji: "🦁", color: "coral" },
  { letter: "ب", name: "باء", word: "بطة", emoji: "🦆", color: "sky" },
  { letter: "ت", name: "تاء", word: "تفاحة", emoji: "🍎", color: "sun" },
  { letter: "ث", name: "ثاء", word: "ثعلب", emoji: "🦊", color: "mint" },
  { letter: "ج", name: "جيم", word: "جمل", emoji: "🐪", color: "lavender" },
  { letter: "ح", name: "حاء", word: "حصان", emoji: "🐴", color: "rose" },
  { letter: "خ", name: "خاء", word: "خروف", emoji: "🐑", color: "peach" },
  { letter: "د", name: "دال", word: "دب", emoji: "🐻", color: "blue" },
];

const steps = [
  { number: "01", title: "اسمع الحرف", text: "اضغط على السماعة واستمع إلى نطق الحرف بوضوح." },
  { number: "02", title: "شاهد المثال", text: "تعرّف على كلمة لطيفة تبدأ بالحرف نفسه." },
  { number: "03", title: "جرّب بنفسك", text: "اختبر ذاكرتك واجمع النجوم مع كل إجابة صحيحة." },
];

export default function Home() {
  const [selectedLetter, setSelectedLetter] = useState(letters[0]);
  const [quizOpen, setQuizOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [completed, setCompleted] = useState(false);

  const progress = useMemo(() => (completed ? 68 : 42), [completed]);

  const speak = (text: string) => {
    setSoundOn(true);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const voice = new SpeechSynthesisUtterance(text);
      voice.lang = "ar-SA";
      voice.rate = 0.8;
      window.speechSynthesis.speak(voice);
      voice.onend = () => setSoundOn(false);
    } else {
      globalThis.setTimeout(() => setSoundOn(false), 700);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#fffaf3] text-[#24324a]" dir="rtl">
      <header className="relative z-30 border-b border-[#e9e0d2] bg-[#fffaf3]/90 backdrop-blur">
        <div className="container flex h-[76px] items-center justify-between">
          <a href="#top" className="flex items-center gap-3" aria-label="حروف ومرح - الصفحة الرئيسية">
            <span className="brand-mark">ح</span>
            <span className="text-xl font-extrabold tracking-tight text-[#24324a]">حروف ومرح</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-bold text-[#667085] md:flex">
            <a className="text-[#f26b5e]" href="#letters">الحروف</a>
            <a href="#how">كيف نتعلم؟</a>
            <a href="#parents">للأهل</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button className="icon-button" aria-label="المفضلة"><Heart size={19} /></button>
            <button onClick={() => setQuizOpen(true)} className="primary-button">ابدأ اللعب <ArrowLeft size={17} /></button>
          </div>
          <button className="icon-button md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="القائمة">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && <div className="mobile-menu md:hidden"><a href="#letters" onClick={() => setMenuOpen(false)}>الحروف</a><a href="#how" onClick={() => setMenuOpen(false)}>كيف نتعلم؟</a><a href="#parents" onClick={() => setMenuOpen(false)}>للأهل</a><button onClick={() => { setQuizOpen(true); setMenuOpen(false); }}>ابدأ اللعب</button></div>}
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
            <div className="relative z-10">
              <div className="eyebrow"><Sparkles size={16} /> رحلة ممتعة تبدأ بحرف</div>
              <h1 className="hero-title">الحروف العربية<br /><span>بأسلوب يحبّه الأطفال</span></h1>
              <p className="hero-copy">نتعلّم، نلعب، ونكتشف كلمات جديدة معًا.<br />كل حرف هو بداية حكاية جميلة!</p>
              <div className="flex flex-wrap items-center gap-4">
                <button onClick={() => setQuizOpen(true)} className="primary-button large">هيا نبدأ <ArrowLeft size={19} /></button>
                <a href="#letters" className="text-link">استكشف الحروف <ChevronLeft size={17} /></a>
              </div>
              <div className="hero-trust"><div className="avatar-stack"><span>👧</span><span>👦</span><span>🧒</span></div><span>انضم إلى أكثر من <strong>١٢,٠٠٠</strong> طفل يتعلمون معنا</span></div>
            </div>
            <div className="hero-art" aria-label="طفلة سعيدة تتعلم الحروف">
              <div className="sun-shape" />
              <span className="doodle doodle-star">✦</span><span className="doodle doodle-dot">•</span><span className="doodle doodle-spark">✧</span>
              <div className="letter-cloud cloud-a">ب</div><div className="letter-cloud cloud-b">ت</div><div className="letter-cloud cloud-c">م</div>
              <div className="child-illustration"><div className="hair" /><div className="face">◡<span className="eye left" /><span className="eye right" /></div><div className="shirt" /><div className="book"><span>أ</span><span>ب</span><span>ت</span></div></div>
            </div>
          </div>
          <div className="wave-divider"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,64 C240,130 420,10 700,62 C980,115 1170,35 1440,75 L1440,120 L0,120 Z" fill="#f2f8f7" /></svg></div>
        </section>

        <section id="letters" className="letters-section">
          <div className="container py-16 lg:py-24">
            <div className="section-heading"><div><div className="section-kicker">مغامرتنا الأولى</div><h2>اكتشف <span>الحروف</span></h2></div><p>كل حرف له صوت، شكل، وقصة.<br />اختر حرفًا لنبدأ المغامرة!</p></div>
            <div className="letter-grid">{letters.map((item) => <button key={item.letter} onClick={() => { setSelectedLetter(item); speak(`حرف ${item.name}`); }} className={`letter-card ${item.color} ${selectedLetter.letter === item.letter ? "active" : ""}`}><span className="letter-symbol">{item.letter}</span><span className="letter-name">{item.name}</span><span className="letter-word">{item.word} {item.emoji}</span><span className="listen"><Volume2 size={14} /> استمع</span></button>)}</div>
            <div className="selected-banner"><div className="selected-letter">{selectedLetter.letter}</div><div><div className="selected-label">أحسنت الاختيار!</div><h3>حرف {selectedLetter.name}</h3><p>مثل كلمة <strong>{selectedLetter.word}</strong> {selectedLetter.emoji}</p></div><button className="sound-button" onClick={() => speak(`حرف ${selectedLetter.name}. ${selectedLetter.word}`)}>{soundOn ? <span className="sound-bars">▮ ▮ ▮</span> : <Volume2 size={21} />} <span>{soundOn ? "جاري النطق..." : "استمع للصوت"}</span></button></div>
          </div>
        </section>

        <section id="how" className="how-section"><div className="container py-16 lg:py-24"><div className="section-heading centered"><div><div className="section-kicker">بخطوات بسيطة</div><h2>نتعلم معًا، <span>بمرح!</span></h2></div><p>صممنا كل نشاط ليكون لحظة<br />اكتشاف ممتعة لطفلك.</p></div><div className="steps-grid">{steps.map((step, i) => <div className="step-card" key={step.number}><span className={`step-icon step-${i + 1}`}>{i === 0 ? <Headphones /> : i === 1 ? <BookOpen /> : <Trophy />}</span><span className="step-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></div></section>

        <section id="parents" className="progress-section"><div className="container grid items-center gap-10 py-16 lg:grid-cols-[.8fr_1.2fr] lg:py-20"><div><div className="section-kicker">لوحة الإنجاز</div><h2>كل يوم <span>إنجاز جديد</span></h2><p className="mt-4 max-w-md text-[#667085]">تابع تقدّم طفلك واحتفل بكل خطوة صغيرة في رحلته مع الحروف العربية.</p><button onClick={() => setCompleted(true)} className="secondary-button mt-6">{completed ? "رائع! استمر" : "سجّل تقدّم اليوم"} <Star size={17} /></button></div><div className="progress-card"><div className="progress-head"><div><span>رحلة الحروف</span><strong>{progress}% مكتمل</strong></div><span className="trophy-badge"><Trophy size={20} /></span></div><div className="progress-track"><div style={{ width: `${progress}%` }} /></div><div className="progress-foot"><span>أحسنت! أنت تتقدم بشكل رائع</span><span>١٢ / ٢٨ حرفًا</span></div></div></div></section>
      </main>

      <footer className="footer"><div className="container flex flex-col items-center justify-between gap-5 py-7 md:flex-row"><div className="flex items-center gap-3"><span className="brand-mark small">ح</span><span className="font-bold">حروف ومرح</span></div><p>مصمم بحب ليكبر أطفالنا مع لغتهم 💛</p><div className="flex gap-4 text-sm text-[#8b96a5]"><a href="#how">عن المنصة</a><a href="#parents">للأهل</a></div></div></footer>

      {quizOpen && <div className="modal-backdrop" onClick={() => setQuizOpen(false)}><div className="quiz-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setQuizOpen(false)} aria-label="إغلاق"><X size={19} /></button><div className="quiz-icon">🎈</div><div className="section-kicker">تحدي صغير</div><h2>أي كلمة تبدأ بحرف <span>ب</span>؟</h2><p>اختر الإجابة الصحيحة واجمع نجمة!</p><div className="quiz-options"><button onClick={() => { setQuizOpen(false); setCompleted(true); }}><span>🦁</span> أسد</button><button onClick={() => { setQuizOpen(false); setCompleted(true); }}><span>🦆</span> بطة</button><button onClick={() => { setQuizOpen(false); setCompleted(true); }}><span>🍎</span> تفاحة</button></div><div className="quiz-progress"><span /><span /><span className="active" /><span /><span /></div></div></div>}
    </div>
  );
}

