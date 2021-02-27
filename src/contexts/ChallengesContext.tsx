import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

interface challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: challenge;
  resetChallenge: () => void;
  completeChallenge: () => void;

  experienceToNextLevel: number;
}
interface ChallengesProviderProps {
  children: ReactNode;
}
export const ChallengesContext = createContext({} as ChallengesContextData);
export function ChallengesProiver({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setchallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    let challed = challenges[randomChallengeIndex];
    setActiveChallenge(challed);
    new Audio('/notification.mp3').play();
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🔥', {
        body: `Valendo ${challed.amount}xp!`,
      });
    }
  }
  function resetChallenge() {
    setActiveChallenge(null);
  }
  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setchallengesCompleted(challengesCompleted + 1);
  }
  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
