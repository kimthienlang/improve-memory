import { useState, useEffect } from "react";
import { useRecallDashStore } from "@/store/recallDashStore";
import { createCollection, createCard } from "@/features/recall-dash/services/collection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function CollectionsPage() {
  const collections = useRecallDashStore((state) => state.collections);
  const fetchCollections = useRecallDashStore((state) => state.fetchCollections);
  const [loading, setLoading] = useState(false);

  // New Collection Form
  const [newTitle, setNewTitle] = useState("");

  // New Card Form
  const [selectedCol, setSelectedCol] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setLoading(true);
    try {
      await createCollection({ title: newTitle });
      toast.success("Collection created successfully");
      setNewTitle("");
      await fetchCollections(true);
    } catch (error) {
      toast.error("Failed to create collection");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCol || !front.trim() || !back.trim()) return;
    setLoading(true);
    try {
      await createCard(selectedCol, { front, back });
      toast.success("Card added successfully");
      setFront("");
      setBack("");
    } catch (error) {
      toast.error("Failed to add card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Collections Manager</h1>
        <p className="text-muted-foreground mt-2">Create new study sets and add cards to them.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Create Collection</CardTitle>
            <CardDescription>Start a brand new study set.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateCollection} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Collection Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Japanese N3 Vocab" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading || !newTitle.trim()}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Add Card</CardTitle>
            <CardDescription>Append a flashcard to an existing collection.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateCard} className="space-y-4">
              <div className="space-y-2">
                <Label>Select Collection</Label>
                <Select value={selectedCol} onValueChange={setSelectedCol} disabled={loading || collections.length === 0}>
                  <SelectTrigger>
                    <SelectValue placeholder={collections.length === 0 ? "No collections available" : "Select a collection"} />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map(c => (
                      <SelectItem key={c._id} value={c._id}>{c.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="front">Front-side (Prompt)</Label>
                <Input 
                  id="front" 
                  placeholder="e.g. 食べる" 
                  value={front} 
                  onChange={(e) => setFront(e.target.value)} 
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="back">Back-side (Answer)</Label>
                <Input 
                  id="back" 
                  placeholder="e.g. To eat" 
                  value={back} 
                  onChange={(e) => setBack(e.target.value)} 
                  disabled={loading}
                />
              </div>

              <Button type="submit" disabled={loading || !selectedCol || !front.trim() || !back.trim()}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Card
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
