import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { GameSettings, Collection, CollectionItem } from '../features/recall-dash/types';
import { getCollections, getCollectionCards } from '@/features/recall-dash/services';

const DEFAULT_SETTINGS: GameSettings = {
  collectionId: '',
  quantity: 10,
  timeLimit: 3,
  showBack: false,
};

interface RecallDashState {
  settings: GameSettings;
  collections: Collection[];
  activeCards: CollectionItem[];
  isLoading: boolean;

  setSettings: (settings: Partial<GameSettings>) => void;
  updateSetting: <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => void;

  fetchCollections: (forceRefresh?: boolean) => Promise<void>;
  fetchCollectionCards: (collectionId: string, forceRefresh?: boolean) => Promise<void>;
}

export const useRecallDashStore = create<RecallDashState>()(
  persist(
    (set, get) => ({
      settings: DEFAULT_SETTINGS,
      collections: [],
      activeCards: [],
      isLoading: false,

      setSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      updateSetting: (key, value) => {
        set((state) => ({
          settings: { ...state.settings, [key]: value }
        }));

        // Auto-fetch collection cards when selection changes
        if (key === 'collectionId' && value) {
          get().fetchCollectionCards(value as string);
        }
      },

      fetchCollections: async (forceRefresh = false) => {
        const currentCollections = get().collections;

        if (currentCollections.length > 0 && !forceRefresh) {
          return;
        }

        set({ isLoading: true });
        try {
          const collectionsData = await getCollections();
          set({ collections: collectionsData, isLoading: false });

          const { settings, fetchCollectionCards } = get();
          // Select default collection if none is selected
          if (!settings.collectionId && collectionsData.length > 0) {
            get().updateSetting('collectionId', collectionsData[0]._id);
          } else if (settings.collectionId) {
            // Validate stored collectionId still exists
            const exists = collectionsData.some((c: Collection) => c._id === settings.collectionId);
            if (exists) {
              fetchCollectionCards(settings.collectionId);
            } else if (collectionsData.length > 0) {
              get().updateSetting('collectionId', collectionsData[0]._id);
            }
          }
        } catch (error) {
          console.error("Failed to fetch collections", error);
          set({ isLoading: false });
        }
      },

      fetchCollectionCards: async (collectionId: string, forceRefresh = false) => {
        if (!collectionId) return;
        const currentCards = get().activeCards;
        // If we already have the cards and don't explicitly require refresh, skip
        if (currentCards.length > 0 && currentCards[0].collectionId === collectionId && !forceRefresh) return;

        set({ isLoading: true });
        try {
          const cardsData = await getCollectionCards(collectionId);
          set({ activeCards: cardsData, isLoading: false });
        } catch (error) {
          console.error("Failed to fetch collection cards", error);
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'recall-dash-settings',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ settings: state.settings }), // only persist settings
    }
  )
);
