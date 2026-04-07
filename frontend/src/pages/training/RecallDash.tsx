import { useState, useEffect } from 'react';
import { RecallDashOption } from '@/features/recall-dash/components/RecallDashOption';
import { RecallDashScreen } from '@/features/recall-dash/components/RecallDashScreen';
import type { GameStatus } from '@/features/recall-dash/types';
import { useRecallDashStore } from '@/store/recallDashStore';

export default function RecallDashPage() {
  const [status, setStatus] = useState<GameStatus>('idle');
  const fetchCollections = useRecallDashStore((state) => state.fetchCollections);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <div className="flex justify-center gap-6 shadow-xl p-6 rounded-2xl bg-card border">
      <RecallDashOption disabled={status !== 'idle'} />
      <div className="flex-1">
        <RecallDashScreen onStatusChange={setStatus} />
      </div>
    </div>
  );
}
