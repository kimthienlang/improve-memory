// ── Domain Types ────────────────────────────────────────────────────────────

export interface CollectionItem {
  /** The prompt shown to the player (e.g. "1") */
  front: string;
  /** The answer / back-side (e.g. "Con Kiến") */
  back: string;
}

export type CollectionName = 'Numbers' | 'Letters' | 'Words' | 'Shapes';

export type GameStatus = 'idle' | 'playing' | 'paused';

// ── Game Configuration ───────────────────────────────────────────────────────

export interface GameSettings {
  collection: CollectionName;
  /** Total items to show per session */
  quantity: number;
  /** Seconds per item. null = unlimited */
  timeLimit: number | null;
  /** Whether to show the back side instead of the front */
  showBack: boolean;
}

// ── Game State (read-only snapshot) ─────────────────────────────────────────

export interface GameState {
  status: GameStatus;
  currentItem: CollectionItem | null;
  itemCount: number;
  elapsedMs: number;
}
