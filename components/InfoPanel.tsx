import React from 'react';
import { KanaChar, VocabularyResponse } from '../types';

interface InfoPanelProps {
  selectedChar: KanaChar | null;
  vocabulary: VocabularyResponse | null;
  isGenerating: boolean;
  error: string | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedChar, vocabulary, isGenerating, error }) => {
  // Always render the container to keep layout stable, but fade contents
  return (
    <div className={`
      fixed bottom-10 left-0 right-0 
      transition-all duration-500 ease-out z-40
      ${selectedChar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
    `}>
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Unified Glass Card */}
        <div className="relative bg-glass border border-glass-border backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden min-h-[160px] flex items-center justify-center">
            
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-transparent to-neon-pink/5 opacity-50 pointer-events-none" />

            {selectedChar && (
              <div className="w-full p-8 relative z-10">
                {isGenerating ? (
                  /* 1. Loading State */
                  <div className="flex flex-col items-center justify-center space-y-4 animate-pulse">
                     <div className="text-neon-pink font-mono tracking-[0.2em] text-xs">GENERATING NEURAL DATA...</div>
                     <div className="h-1 w-24 bg-gray-800 rounded-full overflow-hidden">
                       <div className="h-full bg-neon-pink animate-[width_1s_ease-in-out_infinite]" style={{width: '50%'}} />
                     </div>
                  </div>
                ) : error ? (
                  /* 2. Error State */
                  <div className="flex flex-col items-center justify-center space-y-3 animate-[fadeIn_0.5s_ease-out]">
                      <div className="text-neon-pink font-mono tracking-widest uppercase text-[10px] border border-neon-pink/50 px-2 py-1 rounded">SYSTEM WARNING</div>
                      <div className="text-white font-light text-center">{error}</div>
                  </div>
                ) : vocabulary ? (
                   /* 3. Vocabulary View */
                   <div className="flex flex-col animate-[fadeIn_0.5s_ease-out]">
                      <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-2">
                        <div className="flex flex-col">
                          <span className="text-xs font-mono text-neon-pink tracking-widest uppercase mb-1">Vocabulary</span>
                          <div className="flex items-baseline gap-4">
                            <span className="text-4xl md:text-5xl font-jp text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                              {vocabulary.word}
                            </span>
                            <span className="text-xl text-gray-400 font-jp">
                              {vocabulary.reading}
                            </span>
                          </div>
                        </div>
                        <div className="text-right max-w-[50%]">
                           <p className="text-lg md:text-xl text-neon-blue font-light">{vocabulary.meaning}</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-3 border-l-2 border-neon-pink/50">
                         <p className="text-sm md:text-base text-gray-300 font-jp italic">
                           "{vocabulary.example}"
                         </p>
                      </div>
                   </div>
                ) : (
                  /* 4. Character Details View (Default) */
                  <div className="flex items-center justify-around animate-[fadeIn_0.5s_ease-out]">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono text-gray-500 mb-2 tracking-widest">HIRAGANA</span>
                        <span className="text-6xl text-white font-thin">
                          {selectedChar.hiragana}
                        </span>
                      </div>

                      <div className="h-16 w-px bg-white/5"></div>

                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono text-neon-pink/70 mb-2 tracking-widest">KATAKANA</span>
                        <span className="text-6xl text-white font-thin">
                          {selectedChar.katakana}
                        </span>
                      </div>

                      <div className="h-16 w-px bg-white/5"></div>

                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono text-neon-blue/70 mb-2 tracking-widest">ROMAJI</span>
                        <span className="text-5xl font-mono text-white">
                          {selectedChar.romaji}
                        </span>
                      </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;