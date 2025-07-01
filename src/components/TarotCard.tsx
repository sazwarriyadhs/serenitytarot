'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { TarotCard as TarotCardType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TarotCardProps {
  card: TarotCardType | null;
  isFlipped: boolean;
  className?: string;
}

export function TarotCard({ card, isFlipped, className }: TarotCardProps) {
  return (
    <div className={cn('group h-[350px] w-[200px] [perspective:1000px]', className)}>
      <div
        className={cn(
          'relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]',
          { '[transform:rotateY(180deg)]': isFlipped }
        )}
      >
        {/* Card Back */}
        <div className="absolute h-full w-full [backface-visibility:hidden]">
          <Card className="h-full w-full bg-primary/90 flex items-center justify-center border-accent border-4">
             <div className="h-[90%] w-[90%] border-2 border-accent rounded-md bg-primary/80" />
          </Card>
        </div>
        
        {/* Card Front */}
        <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Card className="h-full w-full overflow-hidden">
            <CardContent className="p-0 h-full w-full relative">
              {card ? (
                <>
                  <Image
                    src={card.imageUrl}
                    alt={card.name}
                    width={200}
                    height={350}
                    className="object-cover h-full w-full"
                    data-ai-hint="tarot card"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center text-white">
                    <p className="font-bold font-headline">{card.name}</p>
                  </div>
                </>
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
