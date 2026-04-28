import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import confetti from 'canvas-confetti';

export type BadgeId = 
  | 'first_time_voter' 
  | 'civics_scholar' 
  | 'myth_buster' 
  | 'democracy_champion' 
  | 'election_expert' 
  | 'issue_voter';

export interface BadgeInfo {
  id: BadgeId;
  icon: string;
  name: string;
  description: string;
  condition: string;
}

export const BADGE_DEFINITIONS: Record<BadgeId, BadgeInfo> = {
  first_time_voter: {
    id: 'first_time_voter',
    icon: '🗳️',
    name: 'First-Time Voter',
    description: 'You have successfully cast your first digital vote!',
    condition: 'Complete all 7 steps of the voting simulator'
  },
  civics_scholar: {
    id: 'civics_scholar',
    icon: '📚',
    name: 'Civics Scholar',
    description: 'You possess an excellent understanding of Indian civics.',
    condition: 'Score 8 or more out of 10 on the quiz'
  },
  myth_buster: {
    id: 'myth_buster',
    icon: '🔍',
    name: 'Myth Buster',
    description: 'You can separate election facts from fiction.',
    condition: 'Flip all 6 myth cards'
  },
  election_expert: {
    id: 'election_expert',
    icon: '🏛️',
    name: 'Election Expert',
    description: 'You know the machinery running the world\'s largest democracy.',
    condition: 'Click every node in the ECI org chart'
  },
  issue_voter: {
    id: 'issue_voter',
    icon: '🤝',
    name: 'Issue Voter',
    description: 'You vote based on policies and alignment, not just personalities.',
    condition: 'Complete the candidate issue matcher quiz'
  },
  democracy_champion: {
    id: 'democracy_champion',
    icon: '⚖️',
    name: 'Democracy Champion',
    description: 'A true guardian of democracy! You have explored everything.',
    condition: 'Complete all interactive sections of the app'
  }
};

interface BadgeState {
  unlockedBadges: Record<BadgeId, boolean>;
  lastUnlocked: BadgeId | null;
  unlockBadge: (id: BadgeId) => void;
  clearLastUnlocked: () => void;
}

export const useBadgeStore = create<BadgeState>()(
  persist(
    (set, get) => ({
      unlockedBadges: {
        first_time_voter: false,
        civics_scholar: false,
        myth_buster: false,
        democracy_champion: false,
        election_expert: false,
        issue_voter: false
      },
      lastUnlocked: null,
      unlockBadge: (id: BadgeId) => {
        const state = get();
        if (state.unlockedBadges[id]) return; // Already unlocked

        const newUnlockedBadges = { ...state.unlockedBadges, [id]: true };
        
        // Check for Democracy Champion
        const requiredForChampion: BadgeId[] = [
          'first_time_voter', 'civics_scholar', 'myth_buster', 'election_expert', 'issue_voter'
        ];
        
        let unlockedChampion = false;
        if (id !== 'democracy_champion' && !newUnlockedBadges.democracy_champion) {
          const allOthersUnlocked = requiredForChampion.every(bId => newUnlockedBadges[bId]);
          if (allOthersUnlocked) {
            newUnlockedBadges.democracy_champion = true;
            unlockedChampion = true;
          }
        }

        const badgeToShow = unlockedChampion ? 'democracy_champion' : id;

        // Trigger Confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF9933', '#FFFFFF', '#138808']
        });

        set({ 
          unlockedBadges: newUnlockedBadges,
          lastUnlocked: badgeToShow
        });
        
        // Auto clear toast after 3 seconds
        setTimeout(() => {
          if (get().lastUnlocked === badgeToShow) {
            set({ lastUnlocked: null });
          }
        }, 3000);
      },
      clearLastUnlocked: () => set({ lastUnlocked: null })
    }),
    {
      name: 'votewise_badges',
    }
  )
);
