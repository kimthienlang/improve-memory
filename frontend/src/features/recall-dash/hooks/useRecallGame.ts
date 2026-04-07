import { useState, useEffect, useCallback } from 'react';
import type { CollectionItem, GameSettings, GameState } from '../types';

// ── Helpers ──────────────────────────────────────────────────────────────────

const TIMER_INTERVAL_MS = 10;

function formatElapsed(ms: number): string {
  return (ms / 1000).toFixed(2);
}

const shuffleCards = (cards: CollectionItem[], quantity: number): CollectionItem[] => {
  const newCards = [...cards];
  for (let i = newCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
  }
  return newCards.slice(0, quantity);
};

// ── Initial State ─────────────────────────────────────────────────────────────

const INITIAL_STATE: GameState = {
  status: 'idle',
  currentItem: null,
  itemCount: 0,
  elapsedMs: 0,
};

// ── Hook ─────────────────────────────────────────────────────────────────────

export interface UseRecallGameReturn {
  state: GameState;
  formattedTime: string;
  isLastItem: boolean;
  // Actions
  start: () => void;
  next: () => void;
  stop: () => void;
  resume: () => void;
  restart: () => void;
}

/**
 * Encapsulates all Recall Dash game logic.
 * Components remain pure UI — they only call these actions and read this state.
 */
export function useRecallGame(settings: GameSettings, activeCards: CollectionItem[]): UseRecallGameReturn {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [shuffledCards, setShuffledCards] = useState<CollectionItem[]>([]);

  // ── Timer ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (state.status !== 'playing') return;

    const intervalId = setInterval(() => {
      setState((prev) => {
        const newTime = prev.elapsedMs + TIMER_INTERVAL_MS;
        const timeLimitMs = settings.timeLimit !== null ? settings.timeLimit * 1000 : null;
        const isExpired = timeLimitMs !== null && newTime >= timeLimitMs;

        if (isExpired) {
          clearInterval(intervalId);
          return { ...INITIAL_STATE }; // time expired → restart
        }

        return { ...prev, elapsedMs: newTime };
      });
    }, TIMER_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [state.status, settings.timeLimit]);

  // ── Actions ────────────────────────────────────────────────────────────────

  const start = useCallback(() => {
    if (activeCards.length === 0) return;
    const shuffled = shuffleCards(activeCards, settings.quantity);
    setShuffledCards(shuffled);

    setState({
      status: 'playing',
      currentItem: shuffled[0] || null,
      itemCount: 0,
      elapsedMs: 0,
    });
  }, [settings.quantity, activeCards]);

  const next = useCallback(() => {
    setState((prev) => {
      const isLastItem = prev.itemCount + 1 >= Math.min(settings.quantity, shuffledCards.length);
      if (isLastItem) return { ...INITIAL_STATE }; // session complete → restart

      return {
        ...prev,
        currentItem: shuffledCards[prev.itemCount + 1],
        itemCount: prev.itemCount + 1,
        elapsedMs: 0,
      };
    });
  }, [settings.quantity, shuffledCards]);

  const stop = useCallback(() => {
    setState((prev) => ({ ...prev, status: 'paused' }));
  }, []);

  const resume = useCallback(() => {
    setState((prev) => ({ ...prev, status: 'playing' }));
  }, []);

  const restart = useCallback(() => {
    setState({ ...INITIAL_STATE });
  }, []);

  // ── Derived Values ────────────────────────────────────────────────────────

  const formattedTime = formatElapsed(state.elapsedMs);
  const isLastItem = state.itemCount + 1 >= Math.min(settings.quantity, shuffledCards.length);

  return { state, formattedTime, isLastItem, start, next, stop, resume, restart };
}

export { formatElapsed };
