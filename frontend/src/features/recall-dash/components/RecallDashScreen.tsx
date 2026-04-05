import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { PlayIcon, RotateCcwIcon, StopCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRecallGame } from '../hooks/useRecallGame';
import { useRecallDashStore } from '@/store/recallDashStore';

// ── Props ─────────────────────────────────────────────────────────────────────

interface RecallDashScreenProps {
    onStatusChange?: (status: 'idle' | 'playing' | 'paused') => void;
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface ControlBarProps {
    isIdle: boolean;
    isPaused: boolean;
    onRestart: () => void;
    onStop: () => void;
    onResume: () => void;
}

function ControlBar({ isIdle, isPaused, onRestart, onStop, onResume }: ControlBarProps) {
    return (
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-4 border-b gap-10">
            <Button variant="outline" size="sm" onClick={onRestart} className="gap-2" disabled={isIdle}>
                <RotateCcwIcon className="size-4" />
                Restart
            </Button>

            {isPaused ? (
                <Button variant="outline" size="sm" onClick={onResume} className="gap-2 text-primary hover:text-primary">
                    <PlayIcon className="size-4" />
                    Resume
                </Button>
            ) : (
                <Button variant="outline" size="sm" onClick={onStop} className="gap-2" disabled={isIdle}>
                    <StopCircleIcon className="size-4" />
                    Stop
                </Button>
            )}
        </CardHeader>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function RecallDashScreen({ onStatusChange }: RecallDashScreenProps) {
    const settings = useRecallDashStore((state) => state.settings);

    const { state, formattedTime, isLastItem, start, next, stop, resume, restart } =
        useRecallGame(settings);

    const { status, currentItem, itemCount } = state;
    const isIdle = status === 'idle';
    const isPaused = status === 'paused';

    const handleStart = () => { start(); onStatusChange?.('playing'); };
    const handleStop = () => { stop(); onStatusChange?.('paused'); };
    const handleResume = () => { resume(); onStatusChange?.('playing'); };
    const handleRestart = () => { restart(); onStatusChange?.('idle'); };
    const handleNext = () => {
        if (isLastItem) { restart(); onStatusChange?.('idle'); }
        else next();
    };

    const displayText = currentItem
        ? (settings.showBack ? currentItem.back : currentItem.front)
        : '?';

    const statusMessage = isIdle
        ? 'Ready to start?'
        : isPaused
            ? 'Game Paused'
            : 'Remember this!';

    return (
        <Card className="w-full max-w-2xl mx-auto h-fit flex flex-col justify-between">
            <ControlBar
                isIdle={isIdle}
                isPaused={isPaused}
                onRestart={handleRestart}
                onStop={handleStop}
                onResume={handleResume}
            />

            <CardContent className="px-16 flex flex-col items-center justify-center text-center w-full max-w-lg mx-auto">
                <div className="space-y-4 w-full">
                    <div
                        className={cn(
                            'text-sm font-medium transition-opacity',
                            isIdle ? 'opacity-50' : 'opacity-100 text-primary',
                        )}
                    >
                        {itemCount} / {settings.quantity}
                    </div>

                    <div className="text-4xl font-bold p-12 bg-secondary rounded-2xl shadow-inner min-w-[200px] flex items-center justify-center min-h-[144px]">
                        {isIdle ? (
                            <span className="text-muted-foreground opacity-50">?</span>
                        ) : (
                            displayText
                        )}
                    </div>

                    <div className="min-h-[24px]">
                        <p className={cn('text-muted-foreground', isIdle && 'italic')}>{statusMessage}</p>
                    </div>
                </div>

                <div className="text-sm font-mono text-muted-foreground mt-4">{formattedTime} s</div>
            </CardContent>

            <CardFooter className="pt-4 border-t">
                {isIdle ? (
                    <Button className="w-full text-lg h-12" onClick={handleStart}>
                        Start
                    </Button>
                ) : (
                    <Button className="w-full text-lg h-12" disabled={isPaused} onClick={handleNext}>
                        {isLastItem ? 'Finish' : 'Next Item'}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
