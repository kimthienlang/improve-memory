import { useState, useEffect, useCallback } from 'react';
import type { CollectionItem, GameSettings, GameState } from '../types';
import { COLLECTIONS } from '../constants/collections';

// ── Helpers ──────────────────────────────────────────────────────────────────

const TIMER_INTERVAL_MS = 10;

function pickRandomItem(settings: GameSettings): CollectionItem | null {
  const collection = COLLECTIONS[settings.collection] ?? [];
  if (collection.length === 0) return null;
  return collection[Math.floor(Math.random() * collection.length)];
}

function formatElapsed(ms: number): string {
  return (ms / 1000).toFixed(2);
}

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
export function useRecallGame(settings: GameSettings): UseRecallGameReturn {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

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
    setState({
      status: 'playing',
      currentItem: pickRandomItem(settings),
      itemCount: 0,
      elapsedMs: 0,
    });
  }, [settings]);

  const next = useCallback(() => {
    setState((prev) => {
      const isLastItem = prev.itemCount + 1 >= settings.quantity;
      if (isLastItem) return { ...INITIAL_STATE }; // session complete → restart

      return {
        ...prev,
        currentItem: pickRandomItem(settings),
        itemCount: prev.itemCount + 1,
        elapsedMs: 0,
      };
    });
  }, [settings]);

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
  const isLastItem = state.itemCount + 1 >= settings.quantity;

  return { state, formattedTime, isLastItem, start, next, stop, resume, restart };
}

export { formatElapsed };
