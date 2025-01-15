import { Button } from '@/components/ui/button';
import KleshNoteCard from '@/components/ui/klesh-note-card';
import { BookDashed, Download, FilePen, Save, SquareArrowOutUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Input } from '@/components/ui/input';
import 'react-quill/dist/quill.snow.css';
import { useDarkMode } from '@/contexts/dark-mode-context';
import { useKleshNotes } from '@/contexts/klesh-notes-context';

const kleshNotes = [
  {
    id: 0,
    content:
      'پۆپۆئی دیاس فی اسفی ویوەو  اسف اسف ساف  ۆورپ پوحت هکژسگه دگحۆر ۆ ەورژ  ژسدکه سدکگحیەوت سدژکه کژدسدگه کس',
    to: '‌زیاکۆ',
    date: '2025-01-15',
  },
  {
    id: 1,
    content:
      'گرتوو پەیوەندی خوێن خۆڕای ئەبێ هەستی کردنی نووسینەکان دەربەرینەوە، لە شینەکاندا بەقەوارەیە.',
    to: '‌نووسین',
    date: '2025-01-15',
  },
  {
    id: 2,
    content:
      'ژینگەی سروشتی پەیوەندیدارێکی گەورەی گەورەیە کە ئاڵۆزی چاکەکراوەکان دەتوانێت بەسەر چیرۆکەکان هەڵبەستێت.',
    to: 'ژینگە',
    date: '2025-01-15',
  },
  {
    id: 3,
    content:
      'بەردەوامی خوێندن و گەورەبوون لە کۆمەڵگەدا، دەتوانێت دوو ڕوونکردنەوەی باشتر بۆ ئەمەی نوێ بیکات.',
    to: 'پیشەسازی',
    date: '2025-01-15',
  },
  {
    id: 4,
    content: 'هەنگاوەکانت بە فەرمی چاک بکە و خزمەتگوزاریەکانت بە شێوەیەکی درووست لەکار بەرە.',
    to: 'چاکسازی',
    date: '2025-01-15',
  },
  {
    id: 5,
    content:
      'ئەو شاردەوانەی کە دەتوانن نوێ بوونەوەی فکری بۆ بەرهەمی نوێ هێنەوە، دەبینرێن بە بەختەوەر.',
    to: 'نوێکاری',
    date: '2025-01-15',
  },
  {
    id: 6,
    content:
      'لە ماوەیەکدا، هەموو شتێک بەرز دەکرێت ئەگەر هەستی یەکگرتوو لە نێوان ئەندامی کۆمەڵگا هەبێت.',
    to: 'یەکگرتوو',
    date: '2025-01-15',
  },
  {
    id: 7,
    content:
      'پەیوەندیدانی هەستی و مەعنا بە ئاستی گەورەدا، نووسینی زانستی بەشێوەیەکی چاک بەدەست دەهێنێت.',
    to: 'زانست',
    date: '2025-01-15',
  },
  {
    id: 8,
    content: 'چاوەڕوانی نوێی نووسراوەکان بەرەوپێشبردنی زانیاری و شیکردنەوەی ئارەزووەکانە.',
    to: 'پەیوەندی',
    date: '2025-01-15',
  },
  {
    id: 9,
    content: 'ئامادەبوون بۆ ئامانجەکانی نووسراوەکان دەستگیر دەبێت بەرەو پێشبردنی ئەو باشترینەی.',
    to: 'ئامانج',
    date: '2025-01-15',
  },
  {
    id: 10,
    content: 'هەموو ئەو شتانی نوێ بەرز دەکرێن کە بە پشتبەستن بە هەڵسەنگاندن و زانیاری نوێ دەبێت.',
    to: 'نوێبوونەوە',
    date: '2025-01-15',
  },
];

const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
  ],
};

function KleshNotes() {
  const { isDarkMode } = useDarkMode();
  const { selectedNoteId, setSelectedNoteId } = useKleshNotes();
  const selectedNote = selectedNoteId
    ? kleshNotes.find(note => note.id === Number(selectedNoteId))
    : undefined;

  const [hasChanges, setHasChanges] = useState(false);
  const [content, setContent] = useState('');
  const [to, setTo] = useState('');

  const handleNoteChange = (newContent: string) => {
    setContent(newContent);
    setHasChanges(true);
  };

  const handleNoteSelection = (noteId: string) => {
    if (hasChanges) {
      const userConfirmed = window.confirm(
        'You have unsaved changes. Do you want to leave without saving?'
      );

      if (userConfirmed) {
        setHasChanges(false);
        setSelectedNoteId(noteId);
      }
    } else {
      setSelectedNoteId(noteId);
    }
  };

  useEffect(() => {
    if (selectedNote) {
      setContent(selectedNote.content || '');
      setTo(selectedNote.to || '');
    }
  }, [selectedNoteId, selectedNote]);

  useEffect(() => {
    const toolbar = document.querySelector('.ql-toolbar') as HTMLElement;
    const container = document.querySelector('.ql-container') as HTMLElement;
    const editor = document.querySelector('.ql-editor') as HTMLElement;

    if (toolbar) {
      toolbar.style.position = 'sticky';
      toolbar.style.top = '0';
      toolbar.style.zIndex = '10';
      toolbar.style.width = '100%';
      toolbar.style.borderRadius = '5px';

      toolbar.style.background = 'transparent';
    }

    if (container) {
      container.style.overflowY = 'hidden';
      container.style.paddingTop = `${toolbar.offsetHeight - 45}px`;
      container.style.borderWidth = '0';
    }

    if (editor) {
      editor.style.height = '400px';
      editor.style.backgroundColor = isDarkMode
        ? 'rgba(30, 90, 174, 0.058)'
        : 'rgba(30, 90, 174, 0.1)';
      editor.style.borderRadius = '5px';
      editor.style.fontSize = '24px';
      editor.style.borderWidth = '1px';
    }
  }, [isDarkMode]);

  return (
    <div className="grid grid-cols-[max-content_1fr] grid-rows-[1fr_max-content] gap-4">
      <div className="px-2 space-y-2 row-span-2 h-[80vh]">
        <h2 className="text-lg font-semibold text-foreground/60">Klesh Notes</h2>
        <Button
          className="w-full"
          onClick={() => {
            setSelectedNoteId('');
            setContent('');
            setTo('');
          }}
        >
          <FilePen />
          Create New Note
        </Button>

        <div className="flex flex-col sticky overflow-auto h-full gap-2">
          {kleshNotes.length &&
            kleshNotes.map(note => (
              <KleshNoteCard
                key={note.id}
                note={note}
                selectedNoteId={selectedNoteId}
                onClick={() => handleNoteSelection(note.id.toString())}
              />
            ))}

          {!kleshNotes.length && (
            <div className="w-full h-max bg-secondary/40 rounded-lg flex gap-1 items-center p-4 font-medium text-foreground/80">
              <BookDashed /> You have no notes
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between">
          <h1 className="text-xl text-foreground font-semibold items-center">Klesh Note Editor</h1>
          <div className="flex w-[400px] gap-4">
            <Input
              className="text-right text-xl"
              value={to}
              onChange={e => setTo(e.target.value)}
            />
            <span className="font-semibold text-2xl">:بەرێز</span>
          </div>
        </div>

        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleNoteChange}
          modules={editorModules}
          placeholder="Start Typing something..."
          className="text-xl overflow-hidden"
        />
      </div>

      <div className="col-span-2 justify-self-end fixed bottom-5 space-x-3 right-5">
        <Button variant="outline">
          <SquareArrowOutUpRight /> Share
        </Button>

        <Button variant="outline">
          <Download /> Download
        </Button>

        <Button>
          <Save /> Save Note
        </Button>
      </div>
    </div>
  );
}

export default KleshNotes;
