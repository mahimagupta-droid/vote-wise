import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserState {
  hasVoted: boolean;
  quizScore: number | null;
  readMyths: boolean;
  completedSections: string[];
  isDarkMode: boolean;
  setHasVoted: () => void;
  setQuizScore: (score: number) => void;
  setReadMyths: () => void;
  toggleDarkMode: () => void;
}

const useZustandStore = create<UserState>()(
  persist(
    (set) => ({
      hasVoted: false,
      quizScore: null,
      readMyths: false,
      completedSections: [],
      isDarkMode: false,
      setHasVoted: () => set((state) => ({ 
        hasVoted: true, 
        completedSections: Array.from(new Set([...state.completedSections, 'simulator'])) 
      })),
      setQuizScore: (score) => set((state) => ({ 
        quizScore: score, 
        completedSections: Array.from(new Set([...state.completedSections, 'quiz'])) 
      })),
      setReadMyths: () => set((state) => ({ 
        readMyths: true, 
        completedSections: Array.from(new Set([...state.completedSections, 'myths'])) 
      })),
      toggleDarkMode: () => set((state) => ({ 
        isDarkMode: !state.isDarkMode 
      })),
    }),
    {
      name: 'votewise_state', // name of item in the storage (must be unique)
    }
  )
);

// Wrapper to remain compatible with existing components
export function useUserStore() {
  const state = useZustandStore();
  
  const badges = {
    voter: state.hasVoted,
    scholar: state.quizScore !== null && state.quizScore >= 80,
    mythbuster: state.readMyths,
    champion: state.hasVoted && (state.quizScore !== null && state.quizScore >= 80) && state.readMyths,
  };

  return { 
    state, 
    badges, 
    setHasVoted: state.setHasVoted, 
    setQuizScore: state.setQuizScore, 
    setReadMyths: state.setReadMyths, 
    toggleDarkMode: state.toggleDarkMode 
  };
}
