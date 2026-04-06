/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  User, 
  GraduationCap,
  Baby,
  Brain,
  BookOpen,
  AlertCircle,
  MessageCircle,
  RefreshCcw,
  Sparkles,
  ShieldCheck,
  Zap,
  Star,
  Clock,
  Lock
} from 'lucide-react';

// --- Assets ---
const IMAGES = {
  MOCKUP_MAIN: "https://educacaokids.com.br/wp-content/uploads/2025/05/1_MOCKUP-PRINCIPAL-GRAFISMO-FONETICO.webp",
  PRODUCT_DETAIL: "https://educacaokids.com.br/wp-content/uploads/2025/05/JcDcvm3874423-643x1024.webp",
  GIRL_HAPPY: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000",
  TEACHER_CLASS: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
  MOTHER_HELPING: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=1000", // Group of educators/parents
  CRONOGRAMA: "/Gemini_Generated_Image_ks7jfdks7jfdks7j-removebg-preview.png",
  ALFABETO_IMAGEM: "/FRAFISMO-FONETICO-ALFABETO-CADERNO-COM-ALFABETO-300x263.jpg",
  QUEBRA_CABECA: "/GRAFISMO-FONETICO-ALFABETO-QUEBRA-CABECA-COM-ALFABETO-300x263.jpg",
  FORMANDO_PALAVRAS: "/GRAFISMO-FONETICO-ALFABETO-CADERNO-FORMANDO-PALAVRAS-300x263.jpg",
  ALFABETO_RELOGIO: "/GRAFISMO-FONETICO-ALFABETO-CADERNO-ALFABETO-COM-RELOGIO-300x263.jpg",
  ALFABETO_TRACADO: "/GRAFISMO-FONETICO-ALFABETO-CADERNO-ALFABETO-COM-TRACADO-300x263.jpg",
  ALFABETO_CARINHAS: "/GRAFISMO-FONETICO-ALFABETO-CADERNO-ALFABETO-COM-CARINHAS-300x263.jpg",
  GUARANTEE_BADGE: "/arquivo_de_entrada_2.png-removebg-preview.png"
};

// --- Configuração do Quiz ---
const QUIZ_DATA = {
  headline: "Diagnóstico de Grafismo: Descubra o que está travando a escrita dos seus alunos.",
  subheadline: "Descubra em menos de 2 minutos como o Grafismo Fonético pode ser a chave para destravar a leitura e escrita na sua sala de aula.",
  questions: [
    {
      id: "perfil",
      text: "Você atua como professor(a) de reforço independente ou representa uma escola?",
      options: [
        { text: "Reforço Independente", value: "reforco" },
        { text: "Represento uma Escola", value: "escola" },
        { text: "Psicopedagogo(a) / Terapeuta", value: "clinica" },
        { text: "Coordenador(a) Pedagógico(a)", value: "gestao" }
      ]
    },
    {
      id: "sintoma",
      text: "Qual a maior dificuldade que você nota hoje: letras 'espelhadas', traço muito fraco ou confusão entre os sons das letras?",
      options: [
        { text: "Letras 'espelhadas'", value: "espelhamento" },
        { text: "Traço muito fraco", value: "grafismo" },
        { text: "Confusão entre sons", value: "fonetico" },
        { text: "Todas as anteriores", value: "todas" }
      ]
    },
    {
      id: "tempo",
      text: "Quanto tempo você gasta, em média, preparando atividades de grafismo por semana?",
      options: [
        { text: "Menos de 2 horas", value: "baixo" },
        { text: "Entre 2 a 5 horas", value: "medio" },
        { text: "Mais de 5 horas", value: "alto" },
        { text: "Não consigo preparar como gostaria", value: "critico" }
      ]
    },
    {
      id: "feedback",
      text: "Com que frequência os pais questionam sobre a demora na evolução da escrita dos filhos?",
      options: [
        { text: "Frequentemente", value: "pressao_alta" },
        { text: "Às vezes", value: "pressao_media" },
        { text: "Raramente", value: "pressao_baixa" },
        { text: "Nunca fui questionado(a)", value: "sem_pressao" }
      ]
    },
    {
      id: "metodo",
      text: "Você utiliza algum método sistemático de Grafismo Fonético atualmente?",
      options: [
        { text: "Sim, sigo um cronograma estruturado", value: "estruturado" },
        { text: "Uso atividades aleatórias da internet", value: "aleatorio" },
        { text: "Sigo apenas o livro didático da escola", value: "tradicional" },
        { text: "Ainda não conheço o termo 'Grafismo Fonético'", value: "novo" }
      ]
    }
  ],
  results: [
    {
      id: "diagnostico_geral",
      title: "Resultado do seu Diagnóstico Pedagógico",
      message: "Com base nas suas respostas, seus alunos precisam de uma intervenção sistemática de grafismo fonético. O erro comum é focar apenas na letra, esquecendo que o cérebro precisa conectar o som ao movimento.",
      offer: "Para resolver isso sem que você precise criar nada do zero, desenvolvemos o Desafio 21 Dias: Do Som ao Traço.",
      cta: "QUERO O ACESSO AGORA",
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      image: IMAGES.TEACHER_CLASS
    }
  ]
};

// --- Carousel Component ---
const BonusCarousel = () => {
  const bonuses = [
    { title: "Cronograma 21 Dias", desc: "Passo a passo diário para aplicar sem erros e ter resultados rápidos.", price: "R$ 47", image: IMAGES.CRONOGRAMA },
    { title: "Caderno Alfabeto com Imagem", desc: "Associação visual para fixação das letras de forma lúdica.", price: "R$ 37", image: IMAGES.ALFABETO_IMAGEM },
    { title: "Caderno Quebra-Cabeça Alfabeto", desc: "Atividades de quebra-cabeça para fixação divertida.", price: "R$ 47", image: IMAGES.QUEBRA_CABECA },
    { title: "Caderno Formando Palavras", desc: "Exercícios que incentivam leitura e escrita.", price: "R$ 57", image: IMAGES.FORMANDO_PALAVRAS },
    { title: "Caderno Alfabeto com Relógio", desc: "Ensina as letras junto a noções de tempo.", price: "R$ 39", image: IMAGES.ALFABETO_RELOGIO },
    { title: "Caderno Alfabeto Traçado", desc: "Perfeito para praticar a escrita e coordenação fina.", price: "R$ 27", image: IMAGES.ALFABETO_TRACADO },
    { title: "Caderno Alfabeto com Carinhas", desc: "Associa letras a carinhas expressivas e divertidas.", price: "R$ 49", image: IMAGES.ALFABETO_CARINHAS }
  ];

  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: false })
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-6 py-8">
          {bonuses.map((bonus, i) => (
            <div key={i} className="flex-[0_0_220px] md:flex-[0_0_260px] min-w-0">
              <div className="bg-slate-900 p-4 rounded-[2rem] border border-white/10 shadow-xl hover:shadow-2xl transition-all group flex flex-col h-full">
                <div className="rounded-xl overflow-hidden mb-4 relative flex items-center justify-center bg-white/5">
                  <img 
                    src={bonus.image || IMAGES.MOCKUP_MAIN} 
                    alt={bonus.title} 
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-lg">
                    PDF
                  </div>
                </div>
                <h4 className="text-base font-black text-white mb-1 leading-tight">{bonus.title}</h4>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed mb-3 flex-grow">{bonus.desc}</p>
                <div className="pt-3 border-t border-white/5">
                  <div className="text-[9px] text-red-400 font-bold line-through mb-0.5">De {bonus.price}</div>
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    HOJE É GRÁTIS
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<'intro' | 'questions' | 'lead' | 'analyzing' | 'result' | 'upsell'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [lead, setLead] = useState({ name: '', email: '' });
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisText, setAnalysisText] = useState('Analisando respostas...');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({ name: '', action: '' });

  // Social Proof Notifications
  useEffect(() => {
    const names = ['Ana', 'Beatriz', 'Carla', 'Daniela', 'Elaine', 'Fernanda', 'Gabriela', 'Helena', 'Isabela', 'Juliana'];
    const actions = ['acabou de receber o diagnóstico', 'garantiu o Kit com desconto', 'iniciou o desafio de 15 dias'];
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setNotificationData({
          name: names[Math.floor(Math.random() * names.length)],
          action: actions[Math.floor(Math.random() * actions.length)]
        });
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (step === 'result' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [QUIZ_DATA.questions[currentIdx].id]: value };
    setAnswers(newAnswers);
    
    if (currentIdx < QUIZ_DATA.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('lead');
    }
  };

  const startAnalysis = () => {
    setStep('analyzing');
    const texts = [
      'Analisando suas respostas...',
      'Identificando padrões de grafismo...',
      'Avaliando necessidades fonéticas...',
      'Gerando seu plano de ação...',
      'Finalizando diagnóstico...'
    ];
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setAnalysisProgress(progress);
      
      const textIdx = Math.floor((progress / 100) * texts.length);
      if (texts[textIdx]) setAnalysisText(texts[textIdx]);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep('result'), 500);
      }
    }, 40);
  };

  const handleRedirect = (url: string) => {
    const search = window.location.search;
    if (search) {
      const separator = url.includes('?') ? '&' : '?';
      window.location.href = url + separator + search.substring(1);
    } else {
      window.location.href = url;
    }
  };

  const currentDate = new Date().toLocaleDateString('pt-BR');

  const result = useMemo(() => {
    // For this specific challenge, we return a single diagnostic result
    return QUIZ_DATA.results[0];
  }, [answers]);

  const whatsappUrl = "https://api.whatsapp.com/send?phone=5500000000000&text=Eu%20fiz%20o%20diagnóstico%20e%20quero%20o%20Desafio%2021%20Dias%20de%20Grafismo%20Fonético";

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-blue-100 antialiased relative">
      {/* Background Decor - Changed to absolute */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] bg-blue-50/50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[45%] h-[45%] bg-yellow-50/50 rounded-full blur-[120px] opacity-60" />
      </div>

      {/* Header Scarcity - Removed sticky as requested */}
      {step === 'result' && (
        <div className="bg-slate-900 text-white text-center py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] z-50 flex items-center justify-center gap-3 px-4 backdrop-blur-md bg-opacity-95">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>DESCONTO SÓ HOJE NESSA PÁGINA • {currentDate}</span>
          </div>
        </div>
      )}

      {/* Social Proof Notification - Removed as it was a fixed element */}

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* INTRO */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-8"
            >
              <div className="flex-1 text-center lg:text-left">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-100/50 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Diagnóstico Pedagógico Grátis
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                  Descubra o Nível de <span className="text-blue-600">Alfabetização</span> da sua Turma
                </h1>
                
                <p className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                  Responda 5 perguntas rápidas e receba um <span className="text-slate-900 font-bold">Diagnóstico Completo</span> + Plano de Ação baseado no Grafismo Fonético.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start mb-10">
                  <button
                    onClick={() => setStep('questions')}
                    className="group relative inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  >
                    <span className="line-clamp-1">Começar Agora</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <img key={i} src={`https://i.pravatar.cc/100?u=${i + 20}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="user" referrerPolicy="no-referrer" />
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      <span className="text-blue-600">+8k educadores</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-6 opacity-60">
                  {[
                    { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: "BNCC" },
                    { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: "Pronto para Imprimir" },
                    { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: "Acesso Imediato" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                      {item.icon}
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 relative w-full max-w-md lg:max-w-none">
                <motion.div
                  initial={{ rotate: 5, scale: 0.9, opacity: 0 }}
                  animate={{ 
                    rotate: 0, 
                    scale: 1, 
                    opacity: 1,
                    y: [0, -15, 0] 
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    opacity: { duration: 1 }
                  }}
                  className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_48px_96px_-24px_rgba(0,0,0,0.2)] border-[12px] border-white group"
                >
                  <img 
                    src={IMAGES.MOCKUP_MAIN} 
                    alt="Kit Grafismo Fonético" 
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.div>
                
                {/* Decorative Blobs */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
              </div>
            </motion.div>
          )}

          {/* QUESTIONS */}
          {step === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">
                    Diagnóstico Pedagógico
                  </span>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    {Math.round(((currentIdx + 1) / QUIZ_DATA.questions.length) * 100)}% Concluído
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx + 1) / QUIZ_DATA.questions.length) * 100}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                  />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-10 leading-tight">
                {QUIZ_DATA.questions[currentIdx].text}
              </h2>

              <div className="grid gap-4">
                {QUIZ_DATA.questions[currentIdx].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left p-6 rounded-2xl bg-white border border-slate-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all flex justify-between items-center group shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-lg font-bold text-slate-700 group-hover:text-blue-700 relative z-10 line-clamp-2">{opt.text}</span>
                    <div className="w-8 h-8 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-50 transition-all relative z-10">
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* LEAD CAPTURE */}
          {step === 'lead' && (
            <motion.div
              key="lead"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
            >
              <div className="flex-1 hidden lg:block relative">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="relative group"
                >
                  <img 
                    src={IMAGES.TEACHER_CLASS} 
                    alt="Professora em sala" 
                    className="rounded-[4rem] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.25)] border-[16px] border-white aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glassmorphism Analysis Badge */}
                  <div className="absolute -bottom-10 -right-10 bg-white/95 backdrop-blur-2xl p-8 rounded-[3rem] shadow-2xl border border-white max-w-[280px] z-20">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-200" />
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">Análise em tempo real</span>
                    </div>
                    <p className="text-lg font-display font-black text-slate-900 leading-tight italic">
                      "O método que faltava para minhas turmas de alfabetização."
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">+1.2k professoras</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="flex-1 text-center lg:text-left w-full max-w-md mx-auto lg:mx-0">
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl shadow-slate-200 mx-auto lg:mx-0 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Mail className="w-12 h-12 relative z-10" />
                </div>
                <h2 className="text-5xl font-display font-black text-slate-900 mb-6 leading-tight">Diagnóstico <span className="text-blue-600 italic">Pronto!</span></h2>
                <p className="text-slate-600 mb-12 text-xl font-medium leading-relaxed opacity-90">
                  Identificamos o perfil de aprendizado. Informe seu e-mail para desbloquear o resultado e receber o <span className="text-blue-600 font-black">Guia de Atividades Bônus</span>.
                </p>
                
                <div className="space-y-6">
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={lead.name}
                      onChange={(e) => setLead({ ...lead, name: e.target.value })}
                      className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-6 pl-16 pr-8 focus:outline-none focus:border-blue-600 focus:ring-8 focus:ring-blue-600/5 transition-all shadow-sm font-bold text-slate-800 text-lg"
                    />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                      className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-6 pl-16 pr-8 focus:outline-none focus:border-blue-600 focus:ring-8 focus:ring-blue-600/5 transition-all shadow-sm font-bold text-slate-800 text-lg"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startAnalysis}
                    disabled={!lead.name || !lead.email}
                    className="w-full py-7 bg-blue-600 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-slate-900 transition-all duration-500 shadow-2xl shadow-blue-600/20 disabled:opacity-50 disabled:shadow-none group"
                  >
                    <span className="line-clamp-1">GERAR DIAGNÓSTICO AGORA</span>
                    <ArrowRight className="w-7 h-7 transition-transform group-hover:translate-x-3" />
                  </motion.button>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] text-center mt-8 flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-500" /> Seus dados estão 100% seguros
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ANALYZING */}
          {step === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-lg mx-auto py-20"
            >
              <div className="relative w-56 h-56 mx-auto mb-16">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
                
                <svg className="w-full h-full relative z-10" viewBox="0 0 100 100">
                  <circle 
                    className="text-slate-100/50 stroke-current" 
                    strokeWidth="4" 
                    fill="transparent" 
                    r="46" cx="50" cy="50" 
                  />
                  <motion.circle 
                    className="text-blue-600 stroke-current" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    fill="transparent" 
                    r="46" cx="50" cy="50"
                    style={{
                      pathLength: analysisProgress / 100,
                      rotate: -90,
                      transformOrigin: '50% 50%'
                    }}
                    transition={{ type: "spring", stiffness: 30, damping: 15 }}
                  />
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                  <motion.span 
                    key={analysisProgress}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-6xl font-display font-black text-slate-900 tracking-tighter"
                  >
                    {analysisProgress}%
                  </motion.span>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mt-2">Analisando Perfil</span>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <h3 className="text-3xl font-display font-black text-slate-900 leading-tight">
                  {analysisText}
                </h3>
                <p className="text-lg text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                  Aguarde enquanto geramos seu relatório pedagógico personalizado...
                </p>
              </div>

              {/* Status Indicators */}
              <div className="mt-12 flex justify-center gap-3">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.2 
                    }}
                    className="w-2 h-2 bg-blue-600 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* RESULT */}
          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              {/* Hero Result Section */}
              <div className="text-center mb-16 pt-8">
                <div className="max-w-4xl mx-auto mb-10">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                  >
                    <img 
                      src={IMAGES.MOCKUP_MAIN} 
                      alt="Kit Grafismo Fonético" 
                      className="w-full max-w-2xl mx-auto mb-8 drop-shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -top-4 -right-4 md:top-0 md:right-0 bg-yellow-400 text-slate-900 font-black text-[10px] md:text-xs px-4 py-2 rounded-full shadow-lg rotate-12 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      CERTIFICADO INCLUSO
                    </div>
                  </motion.div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 mb-6 leading-tight">
                    A <span className="text-blue-600">Estratégia Pedagógica</span> que ensina seus alunos a ler até <span className="bg-yellow-200 px-2">5x mais rápido</span>, sem sobrecarga!
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-600 font-bold mb-8">
                    Com apenas <span className="text-blue-600">10 minutos por dia</span> na sua rotina escolar ou de reforço.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    {[
                      "Alinhado à BNCC para Educação Infantil e Fundamental I",
                      "Ideal para turmas heterogêneas e inclusão",
                      "Funciona com TDAH, Autismo e dificuldades de foco"
                    ].map((text, i) => (
                      <div key={i} className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex items-start gap-3 text-left shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-slate-700 leading-tight">{text}</span>
                      </div>
                    ))}
                  </div>

                  <motion.a
                    href="#offers"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-4 px-10 py-7 bg-emerald-500 text-white rounded-2xl font-black text-xl md:text-2xl shadow-2xl shadow-emerald-200 hover:bg-emerald-600 transition-all"
                  >
                    <span className="line-clamp-1">QUERO MEUS ALUNOS LENDO COM FLUÊNCIA!</span>
                    <ArrowRight className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>

              {/* BNCC Alignment Section - Refined as a "Seal of Approval" */}
              <div className="mb-24 py-16 bg-white rounded-[4rem] border-2 border-blue-100 px-8 text-center relative overflow-hidden shadow-xl shadow-blue-500/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-50 rounded-full -ml-12 -mb-12" />
                
                <div className="relative z-10 max-w-4xl mx-auto">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-lg shadow-blue-200">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-black text-slate-900 mb-6">Metodologia 100% Alinhada à BNCC</h3>
                  <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl mx-auto">
                    Desenvolvido por especialistas para atender aos objetivos de aprendizagem da <span className="text-blue-600 font-bold">Base Nacional Comum Curricular</span>, focando no desenvolvimento integral da criança.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: "Consciência Fonológica", code: "EF01LP06", desc: "Segmentação de palavras e rimas." },
                      { title: "Coordenação Fina", code: "EI03CG05", desc: "Controle motor e precisão do traço." },
                      { title: "Percepção Visual", code: "EF01LP02", desc: "Reconhecimento de formas e letras." }
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-left">
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{item.code}</div>
                        <h4 className="font-black text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-xs text-slate-500 font-medium leading-tight">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Who is this for? Section */}
              <div className="mb-24 py-16">
                <h3 className="text-3xl font-display font-black text-slate-900 mb-12 text-center">Este Kit foi feito para você que é:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "Professor(a)", desc: "Que busca atividades prontas e alinhadas à BNCC.", icon: <User className="w-6 h-6" /> },
                    { title: "Reforço Escolar", desc: "Que precisa de resultados rápidos e visíveis.", icon: <Sparkles className="w-6 h-6" /> },
                    { title: "Psicopedagogo(a)", desc: "Que trabalha com intervenções clínicas focadas.", icon: <Brain className="w-6 h-6" /> },
                    { title: "Escola", desc: "Que deseja padronizar a excelência na alfabetização.", icon: <GraduationCap className="w-6 h-6" /> }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        {item.icon}
                      </div>
                      <h4 className="font-black text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pain Points Section */}
              <div className="mb-24 py-16 bg-slate-50 rounded-[4rem] px-8 text-center border border-slate-100">
                <h3 className="text-2xl md:text-3xl font-display font-black text-slate-900 mb-12">
                  Você já sentiu que <span className="bg-yellow-200 px-2">"está falhando"</span> com algum aluno que não evolui?
                </h3>
                <div className="max-w-2xl mx-auto space-y-4 mb-10">
                  {[
                    "Alunos desmotivados que evitam as atividades de leitura",
                    "Pressão dos pais por resultados que demoram a chegar",
                    "Dificuldade em adaptar o material para alunos com necessidades especiais"
                  ].map((text, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border-2 border-dashed border-red-100 text-red-600 font-bold flex items-center justify-center gap-3">
                      <AlertCircle className="w-5 h-5" />
                      {text}
                    </div>
                  ))}
                </div>
                <p className="text-xl font-bold text-slate-900">
                  O problema não é você, <span className="text-blue-600">é o método tradicional</span> que ignora como o cérebro da criança realmente processa os sons.
                </p>
              </div>

              {/* The Solution Explanation */}
              <div className="mb-24 text-center max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto mb-8">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display font-black text-slate-900 mb-6">
                  O <span className="text-blue-600">Grafismo Fonético</span> é a ponte entre o som e a escrita
                </h3>
                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                  Diferente das cópias repetitivas, nosso método utiliza o movimento para fixar o som. A criança "sente" a letra antes de escrevê-la, criando um caminho neural muito mais forte.
                </p>
                <div className="flex justify-center">
                  <ChevronRight className="w-10 h-10 text-emerald-500 rotate-90" />
                </div>
              </div>

              {/* Benefits Section */}
              <div className="mb-24 py-16 bg-yellow-50/30 rounded-[4rem] px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
                  <div className="flex-1">
                    <img src={IMAGES.PRODUCT_DETAIL} alt="Detalhes do Kit" className="w-full rounded-3xl shadow-2xl" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <h3 className="text-2xl font-display font-black text-slate-900 mb-8">
                      Por que este Kit é o braço direito do educador:
                    </h3>
                    {[
                      "Material pronto para imprimir (economize horas de planejamento)",
                      "Atividades lúdicas que mantêm o foco até dos mais agitados",
                      "Sequência lógica que respeita o desenvolvimento neuropsicológico",
                      "Resultados visíveis nas primeiras 3 semanas de aplicação",
                      "Redução drástica da frustração do aluno e do professor"
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certificate Section - Refined */}
              <div className="mb-24 py-16 bg-slate-900 rounded-[4rem] text-white px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent opacity-50" />
                <div className="relative z-10 max-w-4xl mx-auto">
                  <div className="w-24 h-24 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-yellow-400/20">
                    <GraduationCap className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-black mb-6">Certificado de Conclusão Incluso</h3>
                  <p className="text-lg text-blue-100 font-medium mb-10 leading-relaxed max-w-2xl mx-auto">
                    Ao finalizar o cronograma de 21 dias, você receberá um <span className="text-yellow-400 font-bold">Certificado de Aplicação Pedagógica</span>, validando sua dedicação e o uso de metodologias inovadoras na alfabetização.
                  </p>
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full border border-white/20 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    Válido para Horas Complementares e Currículo
                  </div>
                </div>
              </div>

              {/* Kit Contents Recap */}
              <div className="mb-24 py-16 bg-slate-900 rounded-[4rem] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10 px-8">
                  <h3 className="text-3xl md:text-4xl font-display font-black mb-12 text-center">O QUE VOCÊ RECEBE IMEDIATAMENTE</h3>
                  <div className="max-w-4xl mx-auto space-y-4">
                    {[
                      { text: "+ DE 100 ATIVIDADES ESTRUTURADAS EM PDF", color: "bg-emerald-500" },
                      { text: "NÍVEL 01: CONSCIÊNCIA FONOLÓGICA INICIAL", color: "bg-orange-500" },
                      { text: "NÍVEL 02: SÍLABAS SIMPLES E COMPLEXAS", color: "bg-blue-500" },
                      { text: "NÍVEL 03: PRODUÇÃO DE FRASES E TEXTOS CURTOS", color: "bg-red-500" },
                      { text: "GUIA DE ORIENTAÇÃO PARA O PROFESSOR", color: "bg-yellow-500 text-slate-900" }
                    ].map((item, i) => (
                      <div key={i} className={`${item.color} p-5 rounded-2xl font-black text-center text-sm md:text-lg shadow-lg transform hover:scale-[1.01] transition-transform`}>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bonuses Section */}
              <div className="mb-24 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-yellow-100/50">
                  <Sparkles className="w-3.5 h-3.5" />
                  Garantindo seu acesso hoje
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-black text-slate-900 mb-4">VOCÊ LEVA 7 SUPER BÔNUS 🎁</h3>
                <p className="text-slate-500 font-medium mb-12">Materiais complementares exclusivos para acelerar o aprendizado:</p>
                
                <BonusCarousel />
              </div>

              {/* Final Recap & Price - Two Options */}
              <div id="offers" className="mb-24 max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-display font-black text-slate-900 mb-4">Escolha o seu Plano de Acesso</h3>
                  <p className="text-slate-500 font-medium">Selecione a melhor opção para transformar a alfabetização dos seus alunos hoje.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Basic Plan */}
                  <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-xl relative overflow-hidden flex flex-col">
                    <div className="mb-8">
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Versão Básica</span>
                      <h4 className="text-2xl font-display font-black text-slate-900 mt-4">Kit Essencial</h4>
                    </div>
                    
                    <div className="space-y-4 mb-10 flex-grow">
                      <div className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span>Atividades de Grafismo Fonético Nível 1, 2 e 3</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300 font-bold text-sm line-through">
                        <CheckCircle2 className="w-5 h-5 text-slate-200 shrink-0" />
                        <span>Todos os 7 Bônus Exclusivos</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300 font-bold text-sm line-through">
                        <CheckCircle2 className="w-5 h-5 text-slate-200 shrink-0" />
                        <span>Certificado de Conclusão</span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="text-slate-400 line-through font-bold text-sm">De R$ 197,00</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-display font-black text-slate-900">R$ 19,99</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep('upsell')}
                      className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center"
                    >
                      <span className="line-clamp-1 px-4">QUERO O PLANO BÁSICO</span>
                    </button>
                  </div>

                  {/* Professional Plan */}
                  <motion.div 
                    animate={{ 
                      scale: [1.05, 1.08, 1.05],
                      boxShadow: [
                        "0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 10px 10px -5px rgba(37, 99, 235, 0.04)",
                        "0 20px 25px -5px rgba(37, 99, 235, 0.4), 0 10px 10px -5px rgba(37, 99, 235, 0.2)",
                        "0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 10px 10px -5px rgba(37, 99, 235, 0.04)"
                      ]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="bg-slate-900 rounded-[3rem] p-8 md:p-10 border-4 border-blue-600 shadow-2xl relative overflow-hidden flex flex-col transform md:scale-105 z-10"
                  >
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-widest">Mais Vendido</div>
                    
                    <div className="mb-8">
                      <span className="bg-blue-600/20 text-blue-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Versão Profissional</span>
                      <h4 className="text-2xl font-display font-black text-white mt-4">Kit Completo + Bônus</h4>
                    </div>
                    
                    <div className="space-y-4 mb-10 flex-grow">
                      <div className="flex items-center gap-3 text-white font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>Atividades Nível 1, 2 e 3</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-white font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          <span>Todos os 7 Bônus Inclusos:</span>
                        </div>
                        <div className="ml-8 flex flex-col gap-2 text-slate-400 font-bold text-[11px] border-l-2 border-blue-600/30 pl-4">
                          <span>• Cronograma 21 Dias (R$ 47)</span>
                          <span>• Caderno Alfabeto com Imagem (R$ 37)</span>
                          <span>• Caderno Quebra-Cabeça Alfabeto (R$ 47)</span>
                          <span>• Caderno Formando Palavras (R$ 57)</span>
                          <span>• Caderno Alfabeto com Relógio (R$ 39)</span>
                          <span>• Caderno Alfabeto Traçado (R$ 27)</span>
                          <span>• Caderno Alfabeto com Carinhas (R$ 49)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-white font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>Certificado de Conclusão</span>
                      </div>
                      <div className="flex items-center gap-3 text-white font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>Suporte Prioritário</span>
                      </div>
                      <div className="flex items-center gap-3 text-emerald-400 font-black text-sm bg-emerald-400/10 p-2 rounded-lg border border-emerald-400/20">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>ACESSO VITALÍCIO</span>
                      </div>
                      <div className="flex items-center gap-3 text-blue-400 font-black text-sm bg-blue-400/10 p-2 rounded-lg border border-blue-400/20">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>RECEBA DIRETO NO WHATSAPP</span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="text-slate-500 line-through font-bold text-sm">De R$ 500,00</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-display font-black text-emerald-400">R$ 39,99</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => handleRedirect("https://pay.lowify.com.br/checkout.php?product_id=NZmnRg")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-6 bg-emerald-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all text-center flex items-center justify-center"
                    >
                      <span className="line-clamp-1 px-4">QUERO O ACESSO COMPLETO!</span>
                    </motion.button>
                  </motion.div>
                </div>
              </div>

              {/* Guarantee Section - Non-fixed */}
              <div className="mb-24 p-12 bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-200 flex flex-col items-center text-center max-w-2xl mx-auto relative overflow-hidden">
                <div className="w-64 h-64 mb-8 relative z-10">
                  <img 
                    src={IMAGES.GUARANTEE_BADGE} 
                    alt="Garantia 21 Dias" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-3xl font-display font-black text-slate-900 mb-6">Sua Satisfação ou seu Dinheiro de Volta</h4>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  Temos tanta confiança no impacto pedagógico deste material que oferecemos <span className="text-slate-900 font-bold">21 dias de garantia</span>. Se você sentir que o material não agregou valor à sua sala de aula, basta um e-mail para receber o reembolso total.
                </p>
              </div>

              {/* FAQ Section */}
              <div className="mb-24 max-w-3xl mx-auto">
                <h3 className="text-3xl font-display font-black text-slate-900 mb-10 text-center">Dúvidas Frequentes</h3>
                <div className="space-y-6">
                  {[
                    { q: "Como recebo o material?", a: "Imediatamente após a confirmação do pagamento, você receberá um e-mail com o link para download de todos os arquivos em PDF." },
                    { q: "Posso imprimir para todos os meus alunos?", a: "Sim! O material é de uso individual do professor, permitindo que você imprima quantas cópias forem necessárias para suas turmas." },
                    { q: "Serve para alunos com autismo?", a: "Sim, o método de grafismo fonético é altamente recomendado para crianças atípicas, pois trabalha a previsibilidade e o estímulo sensorial do traço." },
                    { q: "Qual a garantia?", a: "Você tem 21 dias para testar. Se não gostar, devolvemos 100% do valor pago." },
                  ].map((faq, i) => (
                    <details key={i} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
                      <summary className="p-8 font-black text-slate-800 cursor-pointer flex justify-between items-center hover:bg-slate-50 transition-colors list-none text-lg">
                        {faq.q}
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-open:rotate-90 transition-transform">
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        </div>
                      </summary>
                      <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed text-lg border-t border-slate-50 pt-6">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              <div className="text-center pb-20">
                <button 
                  onClick={() => { setStep('intro'); setCurrentIdx(0); setAnswers({}); }}
                  className="text-slate-400 hover:text-blue-600 text-sm font-bold flex items-center justify-center gap-2 mx-auto transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Refazer o Diagnóstico
                </button>
              </div>
            </motion.div>
          )}


          {/* UPSELL */}
          {step === 'upsell' && (
            <motion.div
              key="upsell"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-4xl mx-auto py-12"
            >
              <div className="bg-white rounded-[3rem] p-8 md:p-16 border-4 border-emerald-500 shadow-2xl relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-4 bg-emerald-500" />
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                  <Sparkles className="w-3.5 h-3.5" />
                  OFERTA EXCLUSIVA DE UPGRADE
                </div>

                <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-6 leading-tight">
                  ESPERE! <span className="text-emerald-500">NÃO VÁ AINDA...</span>
                </h2>
                
                <p className="text-xl text-slate-600 font-bold mb-12 max-w-2xl mx-auto">
                  Você escolheu o plano básico, mas por apenas <span className="text-emerald-500">R$ 10,00 a mais</span>, você pode levar o <span className="text-slate-900">KIT COMPLETO</span> com todos os 7 bônus inclusos.
                </p>

                <div className="bg-slate-50 rounded-3xl p-8 mb-12 text-left border border-slate-100">
                  <h4 className="font-black text-slate-900 mb-6 text-xl">O que você está deixando passar:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Cronograma 21 Dias (R$ 47)",
                      "Caderno Alfabeto com Imagem (R$ 37)",
                      "Caderno Quebra-Cabeça Alfabeto (R$ 47)",
                      "Caderno Formando Palavras (R$ 57)",
                      "Caderno Alfabeto com Relógio (R$ 39)",
                      "Caderno Alfabeto Traçado (R$ 27)",
                      "Caderno Alfabeto com Carinhas (R$ 49)",
                      "Certificado de Conclusão"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-12">
                  <p className="text-slate-400 line-through font-bold text-lg mb-2">Preço Normal: R$ 39,99</p>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-6xl md:text-8xl font-display font-black text-emerald-500 tracking-tighter">R$ 29<span className="text-2xl">,99</span></span>
                    <span className="text-slate-400 font-bold">Oferta Única • Apenas nesta página</span>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <motion.button
                    onClick={() => handleRedirect("https://pay.lowify.com.br/go.php?offer=cu2sgmy")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-7 bg-emerald-500 text-white rounded-2xl font-black text-xl md:text-2xl shadow-2xl shadow-emerald-200 hover:bg-emerald-600 transition-all flex items-center justify-center"
                  >
                    <span className="line-clamp-1 px-4 text-lg md:text-2xl">SIM! QUERO O UPGRADE PARA O COMPLETO POR R$ 29,99</span>
                  </motion.button>
                  
                  <button
                    onClick={() => handleRedirect('https://pay.lowify.com.br/checkout.php?product_id=xH25Pt')}
                    className="text-slate-400 hover:text-slate-600 font-bold text-sm underline transition-colors"
                  >
                    Não, obrigado. Quero continuar apenas com o Plano Básico por R$ 19,99.
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="py-12 text-center opacity-40">
        <span className="text-[10px] font-bold text-slate-400 tracking-[0.5em] uppercase">Educação Kids • Desafio 21 Dias</span>
      </footer>
    </div>
  );
}
