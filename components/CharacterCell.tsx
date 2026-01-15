import React from 'react';
import { KanaChar, DisplayMode } from '../types';

interface CharacterCellProps {
  char: KanaChar;
  mode: DisplayMode;
  isActive: boolean;
  onClick: (char: KanaChar) => void;
}

const CharacterCell: React.FC<CharacterCellProps> = ({ char, mode, isActive, onClick }) => {
  if (char.type === 'empty') {
    return <div className="w-12 h-12 md:w-16 md:h-16" />;
  }

  return (
    <div
      onClick={() => onClick(char)}
      className={`
        relative w-12 h-12 md:w-16 md:h-16
        flex flex-col items-center justify-center
        rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer
        border group
        ${isActive 
          ? 'bg-white/10 border-neon-blue/40 text-neon-blue scale-105 z-20' 
          : 'bg-glass border-glass-border hover:bg-white/5 hover:border-white/20 hover:scale-105'
        }
      `}
    >
      {/* Main Character */}
      <div className={`
        text-2xl md:text-3xl font-light leading-none mb-0.5 transition-colors
        ${isActive ? 'text-neon-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.3)]' : 'text-gray-300 group-hover:text-white'}
      `}>
        {mode === DisplayMode.HIRAGANA && char.hiragana}
        {mode === DisplayMode.KATAKANA && char.katakana}
        {mode === DisplayMode.BOTH && (
          <div className="flex flex-col items-center gap-0">
             <span className="leading-none transform translate-y-0.5">{char.hiragana}</span>
          </div>
        )}
      </div>
      
      {/* Sub Character */}
      <div className={`
        text-[10px] font-mono font-bold tracking-wider uppercase
        ${isActive ? 'text-neon-blue/70' : 'text-gray-600 group-hover:text-gray-400'}
      `}>
        {mode === DisplayMode.BOTH ? char.katakana : char.romaji}
      </div>
    </div>
  );
};

export default CharacterCell;