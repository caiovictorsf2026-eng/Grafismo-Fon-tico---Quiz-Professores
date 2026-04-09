/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
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
  MOTHER_HELPING: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=1000",
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
    const currentQuestion = QUIZ_DATA.questions[currentIdx];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentIdx < QUIZ_DATA.questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setStep('lead');
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('analyzing');
    startAnalysis();
  };

  const startAnalysis = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setAnalysisProgress(progress);
      
      if (progress < 30) setAnalysisText('Cruzando dados pedagógicos...');
      else if (progress < 60) setAnalysisText('Identificando padrões de grafismo...');
      else if (progress < 90) setAnalysisText('Gerando plano de intervenção...');
      else setAnalysisText('Diagnóstico concluído!');

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
    return QUIZ_DATA.results[0];
  }, [answers]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-blue-100 antialiased relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] bg-blue-50/50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[45%] h-[45%] bg-yellow-50/50 rounded-full blur-[120px] opacity-60" />
      </div>

      {step === 'result' && (
        <div className="bg-slate-900 text-white text-center py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] z-50 flex items-center justify-center gap-3 px-4 backdrop-blur-md bg-opacity-95">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>DESCONTO SÓ HOJE NESSA PÁGINA • {currentDate}</span>
          </div>
        </div>
      )}

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center">
          {step === 'intro' && (
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-100/50 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  Diagnóstico Pedagógico Grátis
                </div>
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
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_48px_96px_-24px_rgba(0,0,0,0.2)] border-[12px] border-white group">
                  <img src={IMAGES.MOCKUP_MAIN} alt="Kit" className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          )}

          {step === 'questions' && (
            <div className="max-w-2xl mx-auto w-full">
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Pergunta {currentIdx + 1} de {QUIZ_DATA.questions.length}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{Math.round(((currentIdx + 1) / QUIZ_DATA.questions.length) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${((currentIdx + 1) / QUIZ_DATA.questions.length) * 100}%` }} />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 mb-10 leading-tight">{QUIZ_DATA.questions[currentIdx].text}</h2>
              <div className="grid gap-4">
                {QUIZ_DATA.questions[currentIdx].options.map((opt: { text: string; value: string }, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.value)}
                    className="group flex items-center justify-between p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-600 hover:bg-blue-50/30 transition-all text-left"
                  >
                    <span className="text-slate-700 font-bold group-hover:text-blue-700 transition-colors">{opt.text}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'lead' && (
            <div className="max-w-xl mx-auto w-full text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-200">
                <Mail className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-display font-black text-slate-900 mb-4">Para onde enviamos seu Diagnóstico?</h2>
              <p className="text-slate-500 font-medium mb-10">Insira seus dados para liberar o resultado e o plano de ação personalizado.</p>
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    required
                    type="text"
                    placeholder="Seu nome completo"
                    className="w-full pl-16 pr-6 py-5 bg-white border-2 border-slate-100 rounded-2xl focus:border-blue-600 focus:outline-none font-bold transition-all"
                    value={lead.name}
                    onChange={e => setLead(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    required
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="w-full pl-16 pr-6 py-5 bg-white border-2 border-slate-100 rounded-2xl focus:border-blue-600 focus:outline-none font-bold transition-all"
                    value={lead.email}
                    onChange={e => setLead(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center justify-center gap-4 group"
                >
                  <span>GERAR MEU DIAGNÓSTICO AGORA</span>
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </button>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-500" /> Seus dados estão 100% seguros
                </p>
              </form>
            </div>
          )}

          {step === 'analyzing' && (
            <div className="max-w-md mx-auto w-full text-center">
              <div className="relative w-48 h-48 mx-auto mb-12">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="92" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                  <circle cx="96" cy="96" r="92" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="578" strokeDashoffset={578 - (578 * analysisProgress) / 100} className="text-blue-600 transition-all duration-300" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-display font-black text-slate-900">{analysisProgress}%</span>
                </div>
              </div>
              <h2 className="text-2xl font-display font-black text-slate-900 mb-4">{analysisText}</h2>
              <div className="flex justify-center gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="w-full py-8">
              <div className="bg-white rounded-[3rem] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100">
                <div className="bg-blue-600 p-12 text-center text-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-sm border border-white/10">
                      <ShieldCheck className="w-4 h-4" />
                      Diagnóstico Concluído com Sucesso
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tight">Seus alunos estão no nível <span className="text-yellow-300 underline decoration-wavy underline-offset-8">Crítico</span></h2>
                    <p className="text-blue-100 text-lg font-medium max-w-2xl mx-auto">O Grafismo Fonético é a peça que falta para destravar a alfabetização na sua sala de aula.</p>
                  </div>
                </div>

                <div className="p-8 md:p-16">
                  <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                      <h3 className="text-2xl font-display font-black text-slate-900 mb-8 flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                          <Brain className="w-6 h-6 text-blue-600" />
                        </div>
                        Análise Pedagógica Detalhada
                      </h3>
                      <div className="space-y-6">
                        {[
                          { title: "Foco no Traço", desc: "A dificuldade não é motora, é cognitiva. O cérebro não associou o som ao movimento." },
                          { title: "Espelhamento", desc: "Sinal claro de que a lateralidade e a percepção fonética precisam de reforço imediato." },
                          { title: "Engajamento", desc: "Alunos desmotivados porque o método tradicional é cansativo e sem estímulo visual." }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors group">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                            </div>
                            <div>
                              <h4 className="font-black text-slate-900 mb-1">{item.title}</h4>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -mr-32 -mt-32" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/50">
                            <Zap className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Solução Recomendada</span>
                            <h4 className="text-xl font-black">Desafio 21 Dias de Grafismo</h4>
                          </div>
                        </div>
                        <p className="text-slate-400 font-medium mb-8 leading-relaxed">Um método passo a passo para você aplicar 15 minutos por dia e ver a evolução real na escrita dos seus alunos em apenas 3 semanas.</p>
                        <ul className="space-y-4 mb-10">
                          {["+400 Atividades Prontas", "Alinhado à BNCC", "Foco em Consciência Fonológica"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold">
                              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 mb-8">
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-slate-400 font-bold text-sm">Oferta expira em:</span>
                            <span className="text-2xl font-mono font-black text-yellow-400">{formatTime(timeLeft)}</span>
                          </div>
                          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 transition-all duration-1000" style={{ width: `${(timeLeft / 900) * 100}%` }} />
                          </div>
                        </div>
                        <button
                          onClick={() => setStep('upsell')}
                          className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-900/50 hover:bg-blue-500 transition-all flex items-center justify-center gap-4 group"
                        >
                          <span>LIBERAR MEU ACESSO COM DESCONTO</span>
                          <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'upsell' && (
            <div className="max-w-4xl mx-auto w-full py-12">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-100/50 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Oferta Exclusiva e Única
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-6 leading-tight tracking-tight">
                  ESPERE! VOCÊ ACABA DE GANHAR UM <span className="text-emerald-500">PRESENTE</span> 🎁
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
                  <button
                    onClick={() => handleRedirect("https://pay.lowify.com.br/go.php?offer=cu2sgmy")}
                    className="w-full py-7 bg-emerald-500 text-white rounded-2xl font-black text-xl md:text-2xl shadow-2xl shadow-emerald-200 hover:bg-emerald-600 transition-all flex items-center justify-center"
                  >
                    <span className="line-clamp-1 px-4 text-lg md:text-2xl">SIM! QUERO O UPGRADE PARA O COMPLETO POR R$ 29,99</span>
                  </button>
                  
                  <button
                    onClick={() => handleRedirect('https://pay.lowify.com.br/checkout.php?product_id=xH25Pt')}
                    className="text-slate-400 hover:text-slate-600 font-bold text-sm underline transition-colors"
                  >
                    Não, obrigado. Quero continuar apenas com o Plano Básico por R$ 19,99.
                  </button>
                </div>
              </div>
            </div>
          )}
      </main>

      <footer className="py-12 text-center opacity-40">
        <span className="text-[10px] font-bold text-slate-400 tracking-[0.5em] uppercase">Educação Kids • Desafio 21 Dias</span>
      </footer>
    </div>
  );
}
