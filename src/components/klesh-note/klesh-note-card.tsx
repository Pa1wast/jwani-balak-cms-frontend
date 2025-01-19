import { Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { cn } from '@/lib/utils';
import { KleshNote } from '@/types/klesh-note';
import { formatDate } from '@/lib/date';

interface KleshNoteCardProps {
  kleshNote: KleshNote;
  selectedNoteId?: string;
  onClick: () => void;
}

function KleshNoteCard({ kleshNote, selectedNoteId, onClick }: KleshNoteCardProps) {
  const isSelected = kleshNote._id === Number(selectedNoteId);

  return (
    <Card
      className={cn(
        'p-1 md:w-[200px] hover:border-foreground/50 dark:border-foreground/50 dark:hover:border-border',
        isSelected && 'border-foreground/50 dark:border-border'
      )}
    >
      <CardHeader className="p-0 pb-2 space-y-0 flex-row justify-between items-center">
        <p className="text-xs font-semibold pl-2">#{kleshNote._id}</p>

        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </CardHeader>

      <CardContent className="p-2 bg-secondary/30 text-sm rounded-lg text-right">
        {kleshNote?.note?.slice(0, 200)}
      </CardContent>

      <CardFooter className="p-1 flex justify-between gap-1 flex-row text-xs">
        <Button variant="ghost" size="sm" className="font-normal" onClick={onClick}>
          Open
        </Button>
        {formatDate(kleshNote.createdAt)}
      </CardFooter>
    </Card>
  );
}

export default KleshNoteCard;
