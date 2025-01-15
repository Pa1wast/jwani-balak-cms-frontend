import { Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface KleshNoteCardProps {
  note: { id: number; content: string; to: string; date: string };
  selectedNoteId?: string;
  onClick: () => void;
}

function KleshNoteCard({ note, selectedNoteId, onClick }: KleshNoteCardProps) {
  const isSelected = note.id === Number(selectedNoteId);

  return (
    <Card
      className={cn(
        'p-1 w-[200px] hover:border-foreground/50 dark:border-foreground/50 dark:hover:border-border',
        isSelected && 'border-foreground/50 dark:border-border'
      )}
    >
      <CardHeader className="p-1 flex-row justify-between items-center">
        <p className="text-xs font-semibold">#{note.id}</p>

        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </CardHeader>

      <CardContent className="p-2 bg-secondary/30 text-sm rounded-lg text-right">
        <p>
          <span className="font-semibold ml-2">بەرێز:</span>

          <span>{note.to}</span>
          <Separator className="my-1" />
        </p>
        <p>{note.content.slice(0, 200)}</p>
      </CardContent>

      {/* <Separator className="my-2" /> */}

      <CardFooter className="p-1 flex justify-between gap-1 flex-row text-xs">
        <Button variant="ghost" size="sm" className="font-normal" onClick={onClick}>
          Open
        </Button>
        {note.date}
      </CardFooter>
    </Card>
  );
}

export default KleshNoteCard;
