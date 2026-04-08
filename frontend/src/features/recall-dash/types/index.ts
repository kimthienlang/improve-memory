// ── Domain Types ────────────────────────────────────────────────────────────

export interface CollectionItem {
  _id?: string;
  collectionId?: string;
  front: string;
  back: string;
  orderIndex?: number;
}

export interface Collection {
  _id: string;
  title: string;
}

export type GameStatus = 'idle' | 'playing' | 'paused';

// ── Game Configuration ───────────────────────────────────────────────────────

export interface GameSettings {
  collectionId: string;
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
