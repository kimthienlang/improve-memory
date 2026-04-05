import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { GameSettings } from '../features/recall-dash/types';
import { DEFAULT_SETTINGS } from '../features/recall-dash/constants/collections';

interface RecallDashState {
  settings: GameSettings;
  setSettings: (settings: Partial<GameSettings>) => void;
  updateSetting: <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => void;
}

export const useRecallDashStore = create<RecallDashState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      setSettings: (newSettings) => set((state) => ({ 
        settings: { ...state.settings, ...newSettings } 
      })),
      updateSetting: (key, value) => set((state) => ({
        settings: { ...state.settings, [key]: value }
      })),
    }),
    {
      name: 'recall-dash-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
