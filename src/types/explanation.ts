
export type ExplanationMode = 'eli5' | 'eli12' | 'eli20' | 'shower';
export type PersonaMode = 'professor' | 'geek' | 'genz' | 'comedian';

export interface ExplanationModeOption {
  id: ExplanationMode;
  name: string;
  description: string;
  emoji: string;
}

export interface PersonaModeOption {
  id: PersonaMode;
  name: string;
  description: string;
  emoji: string;
}

export const explanationModes: ExplanationModeOption[] = [
  {
    id: 'eli5',
    name: 'ELI5',
    description: 'Super Simple Mode - Like you\'re 5 years old',
    emoji: '👶'
  },
  {
    id: 'eli12',
    name: 'ELI12',
    description: 'Middle School Mode - Getting a bit smarter',
    emoji: '🧒'
  },
  {
    id: 'eli20',
    name: 'ELI20+',
    description: 'Big Brain Mode - Deep dive for adults',
    emoji: '🧠'
  },
  {
    id: 'shower',
    name: 'Shower Thought',
    description: 'Mind-blowing weird perspectives',
    emoji: '🚿'
  }
];

export const personaModes: PersonaModeOption[] = [
  {
    id: 'professor',
    name: 'Professor Mode',
    description: 'Detailed and professional explanations',
    emoji: '👩‍🏫'
  },
  {
    id: 'geek',
    name: 'Geek Mode',
    description: 'Technical and nerdy details',
    emoji: '🤓'
  },
  {
    id: 'genz',
    name: 'Gen Z Mode',
    description: 'Slang, pop culture, and funny analogies',
    emoji: '😆'
  },
  {
    id: 'comedian',
    name: 'Comedian Mode',
    description: 'Jokes while explaining concepts',
    emoji: '🎭'
  }
];

export interface Explanation {
  text: string;
  mode: ExplanationMode;
  persona: PersonaMode;
  topic: string;
}
