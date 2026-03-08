# Start

```bash
npm run dev
```

# Folder structure

src/
├── api/ # Cấu hình axios instance, interceptors (cho Express backend)
├── assets/ # Icons, logo, âm thanh game (mp3, wav)
├── components/ # UI Reusable (Shadcn + Common)
│ ├── ui/ # Button, Carousel, Dialog, Select (từ Shadcn)
│ └── common/ # Navbar, Footer, Sidebar, LayoutWrapper
├── constants/ # Các hằng số (Game config, Badge list, API Routes)
├── features/ # TRÁI TIM CỦA APP - Chia theo nghiệp vụ
│ ├── auth/ # Đăng nhập (Google, Password), Quản lý Profile
│ ├── training/ # Games: Ghi nhớ số, Reaction, Card, Essay...
│ │ ├── components/ # Timer.tsx, ControlButtons.tsx, DisplayPanel.tsx
│ │ ├── hooks/ # useTimer.ts, useGameEngine.ts
│ │ ├── services/ # api.post('/save-result')
│ │ └── types/ # TrainingTypes.ts
│ ├── memory-flip/ # Game lật thẻ (A\*2 cards, config n x m)
│ ├── card-training/ # Game ghi nhớ bài (X cards, time A)
│ ├── dashboard/ # Tracking: Hoạt động, Lịch sử, Lửa đỏ/xanh (🔥/💚)
│ ├── achievements/ # Hệ thống huy hiệu (Badge logic, 🏅)
│ ├── ranking/ # Bảng xếp hạng, Hệ thống Combat
│ └── ai-assistant/ # Chatbox AI, AI đánh giá bài báo (🤖)
├── hooks/ # Global hooks (useAuth, useLocalStorage, useTheme)
├── layouts/ # AuthLayout, GameLayout, DashboardLayout
├── pages/ # Các file định nghĩa route (chỉ import feature tương ứng)
│ ├── training/
│ │ ├── NumberMemoryPage.tsx
│ │ └── FlashcardPage.tsx
│ ├── DashboardPage.tsx
│ └── LoginPage.tsx
├── store/ # Quản lý Global State (Zustand: userStore, gameStore)
├── types/ # Global types (User, BaseResponse)
└── utils/ # Helper: formatTime (cho Timer), calcPoints, rankCalculator
