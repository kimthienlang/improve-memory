import type { CollectionItem, CollectionName } from '../types';

// ── Collection Data ──────────────────────────────────────────────────────────

export const COLLECTION_NAMES: CollectionName[] = [
  'Numbers',
  'Letters',
  'Words',
  'Shapes',
];

export const DEFAULT_SETTINGS = {
  collection: 'Numbers' as CollectionName,
  quantity: 10,
  timeLimit: null,
  showBack: false,
} as const;

// ── Collections ──────────────────────────────────────────────────────────────

const NUMBERS: CollectionItem[] = [
  { front: '0', back: 'Con Cú' },
  { front: '1', back: 'Con Kiến' },
  { front: '2', back: 'Con Vịt' },
  { front: '3', back: 'Con Bướm' },
  { front: '4', back: 'Con Cá' },
  { front: '5', back: 'Con Hải Cẩu' },
  { front: '6', back: 'Con Sóc' },
  { front: '7', back: 'Con Chuột' },
  { front: '8', back: 'Con Gấu' },
  { front: '9', back: 'Con Hươu' },
];

const LETTERS: CollectionItem[] = [
  { front: 'A', back: 'Apple' },
  { front: 'B', back: 'Banana' },
  { front: 'C', back: 'Cat' },
  { front: 'D', back: 'Dog' },
  { front: 'E', back: 'Elephant' },
];

const WORDS: CollectionItem[] = [
  { front: 'Sun', back: 'Mặt trời' },
  { front: 'Moon', back: 'Mặt trăng' },
  { front: 'Star', back: 'Ngôi sao' },
  { front: 'Cloud', back: 'Đám mây' },
  { front: 'Wind', back: 'Gió' },
];

const SHAPES: CollectionItem[] = [
  { front: 'Circle', back: 'Hình tròn' },
  { front: 'Square', back: 'Hình vuông' },
  { front: 'Triangle', back: 'Hình tam giác' },
  { front: 'Star', back: 'Hình ngôi sao' },
  { front: 'Heart', back: 'Hình trái tim' },
];

export const COLLECTIONS: Record<CollectionName, CollectionItem[]> = {
  Numbers: NUMBERS,
  Letters: LETTERS,
  Words: WORDS,
  Shapes: SHAPES,
};
