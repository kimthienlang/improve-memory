import { useState } from 'react';
import { RecallDashOption } from '@/features/recall-dash/components/RecallDashOption';
import { RecallDashScreen } from '@/features/recall-dash/components/RecallDashScreen';
import type { GameStatus } from '@/features/recall-dash/types';

export default function RecallDashPage() {
  const [status, setStatus] = useState<GameStatus>('idle');

  return (
    <div className="flex justify-center shadow-xl mt-24 p-4 rounded-2xl">
      <RecallDashOption disabled={status !== 'idle'} />
      <RecallDashScreen onStatusChange={setStatus} />
    </div>
  );
}
