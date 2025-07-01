'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { customers, tarotDeck } from '@/lib/data';
import type { Customer, TarotCard as TarotCardType } from '@/lib/types';
import { TarotCard } from '@/components/TarotCard';
import { interpretTarotReading } from '@/ai/flows/interpret-tarot-reading';
import { WandSparkles, Sparkles, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

export default function ReadingPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [drawnCards, setDrawnCards] = useState<(TarotCardType | null)[]>([null, null, null]);
  const [areCardsFlipped, setAreCardsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDrawCards = () => {
    setAreCardsFlipped(false);
    setInterpretation(null);

    // Animate the card dealing
    setTimeout(() => {
        const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
        const newDrawnCards = shuffled.slice(0, 3);
        setDrawnCards(newDrawnCards);
        setTimeout(() => setAreCardsFlipped(true), 500);
    }, 300);
  };

  const handleGetInterpretation = async () => {
    if (!selectedCustomerId || drawnCards.some(c => !c)) {
      toast({
        title: "Missing Information",
        description: "Please select a client and draw cards first.",
        variant: "destructive",
      })
      return;
    }

    setIsLoading(true);
    setInterpretation(null);

    const customer = customers.find(c => c.id === selectedCustomerId);
    const bookingHistory = customer?.bookings.map(b => `${b.date} - ${b.readingType}: ${b.notes}`).join('\n') || 'No previous bookings.';
    const cardNames = drawnCards.map(c => c!.name).join(', ');

    try {
      const result = await interpretTarotReading({
        tarotCards: cardNames,
        bookingHistory: bookingHistory,
      });
      setInterpretation(result.interpretation);
    } catch (error) {
      console.error('Error getting interpretation:', error);
      toast({
        title: "Interpretation Failed",
        description: "Could not get an interpretation from the AI. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title="AI Tarot Interpretation"
        description="Generate a personalized reading for your clients."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">1. Select Client</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedCustomerId} value={selectedCustomerId ?? undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a client..." />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">2. Draw Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleDrawCards} className="w-full">
                <WandSparkles className="mr-2 h-4 w-4" /> Draw Three Cards
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
            <Card className="min-h-[400px]">
                <CardHeader>
                    <CardTitle className="font-headline">Your Spread</CardTitle>
                    <CardDescription>Past, Present, and Future.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                        <TarotCard card={drawnCards[0]} isFlipped={areCardsFlipped} />
                        <TarotCard card={drawnCards[1]} isFlipped={areCardsFlipped} />
                        <TarotCard card={drawnCards[2]} isFlipped={areCardsFlipped} />
                    </div>
                    {areCardsFlipped && (
                        <Button onClick={handleGetInterpretation} disabled={isLoading || !selectedCustomerId} size="lg" className="mt-4">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Get AI Interpretation
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
      { (isLoading || interpretation) &&
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">AI-Powered Interpretation for {selectedCustomer?.name}</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="ml-4 text-muted-foreground">The spirits are whispering...</p>
                    </div>
                )}
                {interpretation && (
                    <div className="prose dark:prose-invert max-w-none text-foreground text-base leading-relaxed">
                        {interpretation.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
      }
    </main>
  );
}
