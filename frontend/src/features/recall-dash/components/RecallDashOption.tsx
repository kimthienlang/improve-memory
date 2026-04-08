import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useRecallDashStore } from '@/store/recallDashStore';

// ── Props ─────────────────────────────────────────────────────────────────────

interface RecallDashOptionProps {
  disabled: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function RecallDashOption({ disabled }: RecallDashOptionProps) {
  const settings = useRecallDashStore((state) => state.settings);
  const collections = useRecallDashStore((state) => state.collections);
  const updateSetting = useRecallDashStore((state) => state.updateSetting);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleCollection = (value: string) =>
    updateSetting('collectionId', value);

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateSetting('quantity', parseInt(e.target.value) || 0);

  const handleTimeLimit = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateSetting('timeLimit', e.target.value === '' ? null : parseInt(e.target.value));

  const handleShowBack = (checked: boolean) =>
    updateSetting('showBack', checked);

  return (
    <Card className="min-w-64 h-full">
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label className={cn(disabled && "text-muted-foreground opacity-50")}>Collection</Label>
          <Select value={settings.collectionId} onValueChange={handleCollection} disabled={disabled || collections.length === 0}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={collections.length === 0 ? "No collections found" : "Select collection"} />
            </SelectTrigger>
            <SelectContent>
              {collections.map((c) => (
                <SelectItem key={c._id} value={c._id}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className={cn(disabled && "text-muted-foreground opacity-50")}>Quantity</Label>
          <Input
            type="number"
            value={settings.quantity}
            onChange={handleQuantity}
            placeholder="Number of items"
            disabled={disabled}
            min={1}
          />
        </div>

        <div className="space-y-2">
          <Label className={cn(disabled && "text-muted-foreground opacity-50")}>Time Limit (s)</Label>
          <Input
            type="number"
            value={settings.timeLimit ?? ''}
            onChange={handleTimeLimit}
            placeholder="Unlimited"
            disabled={disabled}
            min={1}
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Checkbox
            id="backside"
            checked={settings.showBack}
            onCheckedChange={handleShowBack}
            disabled={disabled}
          />
          <Label
            htmlFor="backside"
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              disabled && "text-muted-foreground opacity-50"
            )}
          >
            Back side
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
