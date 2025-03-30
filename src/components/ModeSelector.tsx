
import { FC } from 'react';
import { ExplanationMode, explanationModes, PersonaMode, personaModes } from '../types/explanation';

interface ModeSelectorProps {
  selectedExplanationMode: ExplanationMode;
  setExplanationMode: (mode: ExplanationMode) => void;
  selectedPersonaMode: PersonaMode;
  setPersonaMode: (mode: PersonaMode) => void;
}

const ModeSelector: FC<ModeSelectorProps> = ({
  selectedExplanationMode,
  setExplanationMode,
  selectedPersonaMode,
  setPersonaMode
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Explanation Level</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {explanationModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setExplanationMode(mode.id)}
              className={`glass-effect p-4 rounded-lg text-left card-hover ${
                selectedExplanationMode === mode.id
                  ? 'ring-2 ring-ace-purple shadow-md shadow-ace-purple/20'
                  : ''
              }`}
            >
              <div className="text-2xl mb-2">{mode.emoji}</div>
              <h4 className="font-bold">{mode.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{mode.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Who's Explaining</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {personaModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setPersonaMode(mode.id)}
              className={`glass-effect p-4 rounded-lg text-left card-hover ${
                selectedPersonaMode === mode.id
                  ? 'ring-2 ring-ace-purple shadow-md shadow-ace-purple/20'
                  : ''
              }`}
            >
              <div className="text-2xl mb-2">{mode.emoji}</div>
              <h4 className="font-bold">{mode.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{mode.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;
