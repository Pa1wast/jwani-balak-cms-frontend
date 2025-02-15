import { Eye, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { cn } from '@/lib/utils';
import { KleshNote } from '@/types/klesh-note';
import { formatDate } from '@/lib/date';
import { useDeleteKleshNote } from '@/features/klesh/useDeleteKleshNote';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { stripHtmlTags } from '@/lib/pdf';

interface KleshNoteCardProps {
  kleshNote: KleshNote;
  setSelectedNoteId: (id: string | undefined) => void;
  setContent: (content: string) => void;
  onClick: () => void;
}

function KleshNoteCard({ kleshNote, onClick, setContent, setSelectedNoteId }: KleshNoteCardProps) {
  const { isDeleting, deleteKleshNote } = useDeleteKleshNote();

  return (
    <Card
      className={cn(
        'p-1  hover:border-foreground/50 flex-col sm:max-w-[400px] flex justify-between min-h-40 dark:border-foreground/50 dark:hover:border-border'
      )}
    >
      <CardHeader className="p-0 pb-2 space-y-0 flex-row justify-between items-center">
        <p className="text-xs font-semibold pl-2 truncate">#{kleshNote._id}</p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive dark:text-red-500 hover:text-destructive dark:hover:text-red-500"
            >
              <Trash />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This actions cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="text-background hover:bg-destructive/80 bg-destructive dark:hover:bg-red-500/80 dark:text-foreground dark:bg-red-500"
                onClick={() => {
                  deleteKleshNote(kleshNote._id);
                  setSelectedNoteId(undefined);
                  setContent('');
                }}
                disabled={isDeleting}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      <CardContent className="p-2 bg-secondary/80  flex-1 text-sm rounded-lg text-right truncate">
        {stripHtmlTags(
          kleshNote?.note?.length > 100
            ? kleshNote?.note
                ?.replace(/<p>|<\/p>|<br>/gim, '')
                .slice(0, 100)
                .concat('... ')
            : kleshNote?.note?.replace(/<p>|<\/p>|<br>/gim, '')
        )}
      </CardContent>

      <CardFooter className="p-1 flex justify-between gap-1 flex-row text-xs">
        <Button variant="ghost" size="sm" className="font-semibold" onClick={onClick}>
          <Eye /> View
        </Button>
        {formatDate(kleshNote.createdAt)}
      </CardFooter>
    </Card>
  );
}

export default KleshNoteCard;
