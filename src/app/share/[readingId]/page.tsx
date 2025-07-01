import { TarotCard } from "@/components/TarotCard";
import { tarotDeck, customers } from "@/lib/data";
import type { TarotCard as TarotCardType, Customer } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Logo } from "@/components/icons";
import { notFound } from "next/navigation";

// This is a mock function. In a real app, you'd fetch this from a database.
const getReadingData = (readingId: string): { 
    customer: Customer, 
    drawnCards: TarotCardType[], 
    interpretation: string, 
    date: string 
} | null => {
    // For this prototype, we'll return a static reading for any ID.
    if (!readingId) return null;

    const customer = customers[0]; // Mock: always Aria
    const drawnCards = [tarotDeck[0], tarotDeck[1], tarotDeck[2]]; // Mock: first 3 cards
    const interpretation = `This is a pivotal moment of new beginnings for you, Aria. The Fool signifies a leap of faith into the unknown, brimming with potential and spontaneity. Trust your instincts.

The Magician appears alongside, empowering you with the tools and resourcefulness to manifest your desires. You have the power to make your dreams a reality.

Finally, the High Priestess urges you to look inward and trust your intuition. There are deeper truths to be discovered that will guide your path. Together, these cards suggest embarking on a new journey, armed with both worldly skill and inner wisdom.`;
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return { customer, drawnCards, interpretation, date };
}


export default function ShareReadingPage({ params }: { params: { readingId: string } }) {
  const readingData = getReadingData(params.readingId);

  if (!readingData) {
    notFound();
  }

  const { customer, drawnCards, interpretation, date } = readingData;

  return (
    <div className="min-h-screen bg-card text-foreground flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center pb-8">
        <div className="flex items-center gap-2">
          <Logo className="size-8 text-primary" />
          <h1 className="text-xl font-headline font-semibold">Mystic Agenda</h1>
        </div>
      </header>

      <main className="w-full max-w-4xl mx-auto">
        <Card className="shadow-2xl border-2 border-primary/20 bg-background">
          <CardHeader className="text-center pt-8">
            <CardDescription>{date}</CardDescription>
            <CardTitle className="font-headline text-3xl md:text-4xl">A Reading for {customer.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-8 px-4 md:px-8 pb-8">
            <p className="text-muted-foreground text-center">Your cards: Past, Present, and Future</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
              {drawnCards.map((card, index) => (
                <TarotCard key={index} card={card} isFlipped={true} />
              ))}
            </div>
            
            <div className="w-full mt-8">
              <h2 className="font-headline text-2xl mb-4 text-center">The Interpretation</h2>
              <div className="max-w-3xl mx-auto text-foreground/90 text-base leading-relaxed space-y-4">
                {interpretation.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

       <footer className="w-full max-w-4xl mx-auto text-center py-8 mt-4">
          <p className="text-sm text-muted-foreground">This reading was provided by Mystic Agenda.</p>
      </footer>
    </div>
  );
}
