/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  BookOpen, 
  Trophy, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Star, 
  Wand2,
  Timer,
  Search,
  Zap,
  LayoutList,
  Home
} from 'lucide-react';
import { CHAPTERS, Chapter } from './constants';

export default function App() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(null);
  const [view, setView] = useState<'map' | 'chapter' | 'quiz' | 'toolbox'>('map');
  const [points, setPoints] = useState(0);
  const [unlockedTools, setUnlockedTools] = useState<number[]>([]);
  const [quizStep, setQuizStep] = useState(0);
  const [showReward, setShowReward] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedPoints = localStorage.getItem('magic_points');
    const savedTools = localStorage.getItem('magic_tools');
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedTools) setUnlockedTools(JSON.parse(savedTools));
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('magic_points', points.toString());
    localStorage.setItem('magic_tools', JSON.stringify(unlockedTools));
  }, [points, unlockedTools]);

  const currentChapter = currentChapterIndex !== null ? CHAPTERS[currentChapterIndex] : null;

  const handleStartChapter = (index: number) => {
    setCurrentChapterIndex(index);
    setView('chapter');
  };

  const handleStartQuiz = () => {
    setQuizStep(0);
    setView('quiz');
  };

  const handleQuizAnswer = () => {
    if (currentChapter && quizStep < currentChapter.questions.length - 1) {
      setQuizStep(prev => prev + 1);
      setPoints(prev => prev + 10);
    } else {
      // Finished quiz
      setPoints(prev => prev + 50);
      if (currentChapter && !unlockedTools.includes(currentChapter.id)) {
        setUnlockedTools(prev => [...prev, currentChapter.id]);
      }
      setShowReward(true);
    }
  };

  const closeReward = () => {
    setShowReward(false);
    setView('map');
    setCurrentChapterIndex(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pb-12">
      {/* Header */}
      <header className="w-full max-w-4xl px-6 py-4 flex justify-between items-center sticky top-0 bg-slate-50/80 backdrop-blur-md z-30">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('map')}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Wand2 size={24} />
          </div>
          <h1 className="font-display font-bold text-xl text-indigo-900 hidden sm:block">学习魔法之旅</h1>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('toolbox')}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors"
          >
            <Trophy size={18} className="text-amber-500" />
            <span className="font-bold text-slate-700">{unlockedTools.length}/5</span>
          </button>
          <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
            <Star size={18} className="text-indigo-600 fill-indigo-600" />
            <span className="font-bold text-indigo-900">{points}</span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-4xl px-6 mt-4 relative">
        <AnimatePresence mode="wait">
          {view === 'map' && (
            <motion.div 
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="font-display text-3xl font-bold text-slate-900">魔法自学地图</h2>
                <p className="text-slate-500">点击岛屿，开启你的自学魔法挑战吧！</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CHAPTERS.map((chapter, index) => (
                  <motion.div
                    key={chapter.id}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStartChapter(index)}
                    className={`magic-card cursor-pointer group relative`}
                  >
                    <div className={`h-32 ${chapter.color} flex items-center justify-center text-white`}>
                      {index === 0 && <Zap size={48} />}
                      {index === 1 && <Timer size={48} />}
                      {index === 2 && <Search size={48} />}
                      {index === 3 && <Sparkles size={48} />}
                      {index === 4 && <LayoutList size={48} />}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Chapter {chapter.id}</span>
                        {unlockedTools.includes(chapter.id) && (
                          <CheckCircle2 size={20} className="text-green-500" />
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {chapter.title.split('：')[1]}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">{chapter.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'chapter' && currentChapter && (
            <motion.div 
              key="chapter"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <button 
                onClick={() => setView('map')}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors"
              >
                <ArrowLeft size={18} /> 返回地图
              </button>

              <div className="magic-card p-8 space-y-8">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-bold text-indigo-900">{currentChapter.title}</h2>
                  <p className="text-xl text-indigo-600 font-medium">{currentChapter.subtitle}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 font-bold text-slate-900 border-l-4 border-indigo-500 pl-3">
                    <BookOpen size={20} className="text-indigo-500" /> 好词好句
                  </h3>
                  <div className="grid gap-4">
                    {currentChapter.vocabulary.map((item, i) => (
                      <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <span className="font-bold text-indigo-700 block mb-1">{item.word}</span>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                  <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <Sparkles size={20} className="text-indigo-500" /> 魔法核心
                  </h3>
                  <p className="text-indigo-800 font-medium leading-relaxed italic">
                    “{currentChapter.coreIdea}”
                  </p>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={handleStartQuiz}
                    className="magic-button bg-indigo-600 text-white flex items-center gap-2 hover:bg-indigo-700"
                  >
                    开始魔法挑战 <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'quiz' && currentChapter && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold text-slate-900">魔法挑战中...</h2>
                <div className="text-slate-400 font-bold">
                  {quizStep + 1} / {currentChapter.questions.length}
                </div>
              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((quizStep + 1) / currentChapter.questions.length) * 100}%` }}
                />
              </div>

              <div className="magic-card p-8 min-h-[300px] flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600">
                    <span className="font-bold text-xl">?</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 leading-tight">
                    {currentChapter.questions[quizStep].question}
                  </h3>
                </div>

                <div className="mt-12 space-y-4">
                  <details className="group">
                    <summary className="list-none cursor-pointer bg-slate-100 p-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-200 transition-colors flex justify-between items-center">
                      查看魔法提示
                      <ArrowRight size={18} className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="p-6 bg-amber-50 rounded-2xl mt-2 border border-amber-100 text-amber-900 font-medium italic">
                      {currentChapter.questions[quizStep].answer}
                    </div>
                  </details>

                  <button 
                    onClick={handleQuizAnswer}
                    className="w-full magic-button bg-indigo-600 text-white py-4 text-lg hover:bg-indigo-700"
                  >
                    我学会了，下一题！
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'toolbox' && (
            <motion.div 
              key="toolbox"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-3xl font-bold text-slate-900">我的魔法工具箱</h2>
                <button 
                  onClick={() => setView('map')}
                  className="flex items-center gap-2 text-indigo-600 font-bold"
                >
                  <Home size={20} /> 回到地图
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {CHAPTERS.map((chapter) => (
                  <div 
                    key={chapter.id}
                    className={`magic-card p-6 flex items-center gap-4 ${unlockedTools.includes(chapter.id) ? 'opacity-100' : 'opacity-40 grayscale'}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl ${chapter.color} flex items-center justify-center text-white shrink-0 shadow-inner`}>
                      {chapter.id === 1 && <Zap size={32} />}
                      {chapter.id === 2 && <Timer size={32} />}
                      {chapter.id === 3 && <Search size={32} />}
                      {chapter.id === 4 && <Sparkles size={32} />}
                      {chapter.id === 5 && <LayoutList size={32} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{chapter.magicTool}</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {unlockedTools.includes(chapter.id) ? '已解锁：' + chapter.subtitle : '尚未解锁'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="magic-card p-8 bg-indigo-900 text-white text-center space-y-4">
                <Trophy size={48} className="mx-auto text-amber-400" />
                <h3 className="text-2xl font-bold">自学小达人成就</h3>
                <p className="text-indigo-200">
                  你已经收集了 {unlockedTools.length} 个魔法工具！继续努力，成为真正的自学大师！
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Reward Modal */}
      <AnimatePresence>
        {showReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={closeReward}
            />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              className="relative bg-white rounded-[40px] p-10 max-w-md w-full text-center shadow-2xl border-8 border-indigo-100"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center shadow-xl">
                <Trophy size={48} className="text-white" />
              </div>
              
              <div className="mt-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display text-3xl font-bold text-slate-900">挑战成功！</h3>
                  <p className="text-slate-500 font-medium">你太棒了！获得了新的魔法工具</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-indigo-200">
                  <div className={`w-20 h-20 mx-auto rounded-2xl ${currentChapter?.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {currentChapter?.id === 1 && <Zap size={40} />}
                    {currentChapter?.id === 2 && <Timer size={40} />}
                    {currentChapter?.id === 3 && <Search size={40} />}
                    {currentChapter?.id === 4 && <Sparkles size={40} />}
                    {currentChapter?.id === 5 && <LayoutList size={40} />}
                  </div>
                  <h4 className="text-xl font-bold text-indigo-900">{currentChapter?.magicTool}</h4>
                </div>

                <div className="flex items-center justify-center gap-2 text-amber-500 font-bold text-2xl">
                  <Star size={28} className="fill-amber-500" /> +60 积分
                </div>

                <button 
                  onClick={closeReward}
                  className="w-full magic-button bg-indigo-600 text-white py-4 text-lg hover:bg-indigo-700"
                >
                  太好了，继续前进！
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
