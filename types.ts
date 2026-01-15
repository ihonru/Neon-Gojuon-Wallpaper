export interface KanaChar {
  id: string;
  romaji: string;
  hiragana: string;
  katakana: string;
  type: 'main' | 'dakuten' | 'handakuten' | 'empty';
  column?: string; // a, i, u, e, o
  row?: string; // a, ka, sa, ta, na...
}

export enum DisplayMode {
  HIRAGANA = 'HIRAGANA',
  KATAKANA = 'KATAKANA',
  BOTH = 'BOTH'
}

export interface VocabularyResponse {
  word: string;
  reading: string;
  meaning: string;
  example: string;
}