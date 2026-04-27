import { useState, useEffect } from 'react';

export interface UserState {
  hasVoted: boolean;
  quizScore: number | null;
  readMyths: boolean;
  completedSections: string[];
}

const initialState: UserState = {
  hasVoted: false,
  quizScore: null,
  readMyths: false,
  completedSections: [],
};

export function useUserStore() {
  const [state, setState] = useState<UserState>(() => {
    const saved = localStorage.getItem('votewise_state');
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('votewise_state', JSON.stringify(state));
  }, [state]);

  const setHasVoted = () => setState((s) => ({ ...s, hasVoted: true, completedSections: [...new Set([...s.completedSections, 'simulator'])] }));
  const setQuizScore = (score: number) => setState((s) => ({ ...s, quizScore: score, completedSections: [...new Set([...s.completedSections, 'quiz'])] }));
  const setReadMyths = () => setState((s) => ({ ...s, readMyths: true, completedSections: [...new Set([...s.completedSections, 'myths'])] }));

  const badges = {
    voter: state.hasVoted,
    scholar: state.quizScore !== null && state.quizScore >= 80,
    mythbuster: state.readMyths,
    champion: state.hasVoted && (state.quizScore !== null && state.quizScore >= 80) && state.readMyths,
  };

  return { state, badges, setHasVoted, setQuizScore, setReadMyths };
}
