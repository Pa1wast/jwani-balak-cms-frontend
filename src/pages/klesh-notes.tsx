import { Button } from '@/components/ui/button';
import KleshNoteCard from '@/components/klesh-note/klesh-note-card';
import {
  ArrowLeft,
  BookDashed,
  Download,
  FilePen,
  Save,
  SearchX,
  SortAsc,
  SortDesc,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.snow.css';
import { useDarkMode } from '@/contexts/dark-mode-context';
import { useKleshNotes } from '@/contexts/klesh-notes-context';
import Search from '@/components/navigation/search';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import useIsMobile from '@/hooks/useIsMobile';
import { KleshNote } from '@/types/klesh-note';
import { Separator } from '@/components/ui/separator';

// eslint-disable-next-line react-refresh/only-export-components
export const kleshNotes: KleshNote[] = [
  {
    id: 0,
    content: 'پۆپۆئی دیاس فی اسفی ویوەو  اسف اسف ساف...',
    date: new Date(), // Current date
  },
  {
    id: 1,
    content: 'گرتوو پەیوەندی خوێن خۆڕای ئەبێ...',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day earlier
  },
  {
    id: 2,
    content: 'ژینگەی سروشتی پەیوەندیدارێکی گەورەی گەورەیە...',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days earlier
  },
  {
    id: 3,
    content: 'بەردەوامی خوێندن و گەورەبوون لە کۆمەڵگەدا...',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days earlier
  },
  {
    id: 4,
    content: 'هەنگاوەکانت بە فەرمی چاک بکە و خزمەتگوزاریەکانت...',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days earlier
  },
  {
    id: 5,
    content: 'ئەو شاردەوانەی کە دەتوانن نوێ بوونەوەی فکری...',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days earlier
  },
  {
    id: 6,
    content: 'لە ماوەیەکدا، هەموو شتێک بەرز دەکرێت...',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days earlier
  },
  {
    id: 7,
    content: 'پەیوەندیدانی هەستی و مەعنا بە ئاستی گەورەدا...',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days earlier
  },
  {
    id: 8,
    content: 'چاوەڕوانی نوێی نووسراوەکان بەرەوپێشبردنی...',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days earlier
  },
  {
    id: 9,
    content: 'ئامادەبوون بۆ ئامانجەکانی نووسراوەکان...',
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days earlier
  },
  {
    id: 10,
    content: 'هەموو ئەو شتانی نوێ بەرز دەکرێن کە بە...',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days earlier
  },
];

const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
  ],
};

interface Props {
  notes: KleshNote[];
  content: string;
  selectedNoteId: string | undefined;
  isMobileEditorOpen?: boolean;
  hasChanges?: boolean;
  searchValue: string;
  sort: 'asc' | 'desc';
  onToggleSort: () => void;
  onSearchNotes: (value: string) => void;
  setSelectedNoteId?: (noteId: string) => void;
  setHasChanges?: (hasChanges: boolean) => void;
  setIsMobileEditorOpen?: (isOpen: boolean) => void;
  onNoteChange: (newContent: string) => void;
  onSaveNote: () => void;
  onCreateNewNote: () => void;
  onNoteSelection: (id: string) => void;
}

function KleshNotes() {
  const isMobile = useIsMobile();
  const [isMobileEditorOpen, setIsMobileEditorOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const { selectedNoteId, setSelectedNoteId } = useKleshNotes();
  // const [isNewNote, setIsNewNote] = useState();

  const [searchValue, setSearchValue] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

  const selectedNote = selectedNoteId
    ? kleshNotes.find(note => note.id === Number(selectedNoteId))
    : undefined;

  const [hasChanges, setHasChanges] = useState(false);
  const [content, setContent] = useState('');

  const filteredNotes = kleshNotes
    .filter(note => note.content?.includes(searchValue))
    .sort((a, b) => {
      return sort === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const displayedNotes = filteredNotes;

  function handleNoteChange(newContent: string) {
    setContent(newContent);
    setHasChanges(true);
  }

  function handleNoteSelection(noteId: string) {
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
  }

  function handleSaveNote() {
    toast.success('Klesh Note has been saved', { position: 'bottom-center' });
  }

  function handleCreateNewNote() {
    setSelectedNoteId('');
    setContent('');

    if (isMobile) {
      setIsMobileEditorOpen(true);
    }
  }

  function handleSearchNotes(value: string) {
    setSearchValue(value);
  }

  function handleToggleSort() {
    setSort(sortValue => (sortValue === 'asc' ? 'desc' : 'asc'));
  }

  useEffect(() => {
    if (selectedNote) {
      setContent(selectedNote.content || '');
    }
  }, [selectedNoteId, selectedNote]);

  useEffect(() => {
    const toolbar = document.querySelector('.ql-toolbar') as HTMLElement;
    const container = document.querySelector('.ql-container') as HTMLElement;
    const editor = document.querySelector('.ql-editor') as HTMLElement;

    if (toolbar) {
      toolbar.style.height = 'max-content';
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
  }, [isDarkMode, isMobile, isMobileEditorOpen, selectedNoteId]);

  return isMobile ? (
    <MobileKleshTextEditor
      notes={displayedNotes}
      content={content}
      onNoteChange={handleNoteChange}
      selectedNoteId={selectedNoteId}
      setSelectedNoteId={setSelectedNoteId}
      hasChanges={hasChanges}
      setHasChanges={setHasChanges}
      onSaveNote={handleSaveNote}
      searchValue={searchValue}
      onToggleSort={handleToggleSort}
      sort={sort}
      onSearchNotes={handleSearchNotes}
      onCreateNewNote={handleCreateNewNote}
      onNoteSelection={handleNoteSelection}
      isMobileEditorOpen={isMobileEditorOpen}
      setIsMobileEditorOpen={setIsMobileEditorOpen}
    />
  ) : (
    <DesktopKleshTextEditor
      notes={displayedNotes}
      content={content}
      sort={sort}
      onNoteChange={handleNoteChange}
      searchValue={searchValue}
      onToggleSort={handleToggleSort}
      onSearchNotes={handleSearchNotes}
      selectedNoteId={selectedNoteId}
      onSaveNote={handleSaveNote}
      onCreateNewNote={handleCreateNewNote}
      onNoteSelection={handleNoteSelection}
    />
  );
}

function DesktopKleshTextEditor({
  notes,
  content,
  onNoteChange,
  selectedNoteId,
  onSaveNote,
  onCreateNewNote,
  onNoteSelection,
  searchValue,
  onSearchNotes,
  sort,
  onToggleSort,
}: Props) {
  return (
    <div className="grid md:grid-cols-[max-content_1fr] md:grid-rows-[1fr_max-content] gap-4">
      <div className="px-2 space-y-2 row-span-2 h-[100vh] pb-60">
        <h2 className="text-lg font-semibold text-foreground/60">Klesh Notes</h2>
        <Button className="w-full" onClick={onCreateNewNote}>
          <FilePen />
          New Note
        </Button>

        <Separator />

        <div className="flex flex-col gap-1">
          <Search
            placeholder="Search notes by content..."
            searchValue={searchValue}
            setSearchValue={onSearchNotes}
          />

          <Button variant="outline" onClick={onToggleSort}>
            {sort === 'asc' ? <SortAsc /> : <SortDesc />}
            Sort By
          </Button>
        </div>

        <div className="flex flex-col sticky overflow-auto h-full gap-2 pb-12">
          {notes.length > 0 &&
            notes.map(note => (
              <KleshNoteCard
                key={note.id}
                note={note}
                selectedNoteId={selectedNoteId}
                onClick={() => onNoteSelection(note.id.toString())}
              />
            ))}

          {!notes.length && !searchValue && (
            <div className="w-full  h-max bg-secondary/40 rounded-lg text-sm justify-center flex gap-2 items-center p-4 font-medium text-foreground/80">
              <BookDashed /> You have no notes
            </div>
          )}

          {!notes.length && searchValue && (
            <div className="w-full  h-max bg-secondary/40 rounded-lg text-sm justify-center flex gap-2 items-center p-4 font-medium text-foreground/80">
              <SearchX /> No notes found!
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl text-foreground font-semibold items-center">Klesh Note Editor</h1>

        <ReactQuill
          theme="snow"
          value={content}
          onChange={onNoteChange}
          modules={editorModules}
          className="text-xl overflow-hidden"
        />
      </div>

      <div className="col-span-2 justify-self-end fixed bottom-5 space-x-3 right-5">
        {selectedNoteId !== '' && (
          <Button variant="outline" asChild>
            <Link to={`/pdf/klesh/${selectedNoteId}`}>
              <Download /> Download
            </Link>
          </Button>
        )}

        <Button disabled={content === ''} onClick={onSaveNote}>
          <Save /> Save Note
        </Button>
      </div>
    </div>
  );
}

function MobileKleshTextEditor({
  notes,
  isMobileEditorOpen,
  setIsMobileEditorOpen,
  content,
  hasChanges,
  setHasChanges,
  onNoteChange,
  selectedNoteId,
  setSelectedNoteId,
  onSaveNote,
  searchValue,
  onSearchNotes,
  onCreateNewNote,
  onNoteSelection,
  sort,
  onToggleSort,
}: Props) {
  return isMobileEditorOpen || selectedNoteId ? (
    <>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={onNoteChange}
        modules={editorModules}
        className="text-xl overflow-auto"
      />

      <div className="flex justify-between mt-1">
        <Button
          size="sm"
          onClick={() => {
            if (hasChanges) {
              const userConfirmed = window.confirm(
                'You have unsaved changes. Do you want to leave without saving?'
              );

              if (userConfirmed) {
                setHasChanges!(false);
                setSelectedNoteId!('');
                setIsMobileEditorOpen!(false);
              }
            } else {
              setIsMobileEditorOpen!(false);
            }
          }}
        >
          <ArrowLeft /> Back
        </Button>

        <div className="flex gap-2">
          {selectedNoteId !== '' && (
            <Button size="sm" variant="outline" asChild>
              <Link to={`/pdf/klesh/${selectedNoteId}`}>
                <Download /> Download
              </Link>
            </Button>
          )}

          <Button size="sm" disabled={content === ''} onClick={onSaveNote}>
            <Save /> Save Note
          </Button>
        </div>
      </div>
    </>
  ) : (
    <div className="px-2 space-y-2 row-span-2 h-[58vh]">
      <h2 className="text-lg font-semibold text-foreground/60">Klesh Notes</h2>
      <Button className="w-full" onClick={onCreateNewNote}>
        <FilePen />
        New Note
      </Button>

      <Separator />

      <div className="flex flex-col gap-1">
        <Search
          placeholder="Search notes by content..."
          searchValue={searchValue}
          setSearchValue={onSearchNotes}
        />

        <Button variant="outline" onClick={onToggleSort}>
          {sort === 'asc' ? <SortAsc /> : <SortDesc />}
          Sort By
        </Button>
      </div>

      <div className="flex flex-col sticky overflow-auto h-full gap-2 pb-20">
        {notes.length > 0 &&
          notes.map(note => (
            <KleshNoteCard
              key={note.id}
              note={note}
              selectedNoteId={selectedNoteId}
              onClick={() => onNoteSelection(note.id.toString())}
            />
          ))}

        {!notes.length && !searchValue && (
          <div className="w-full  h-max bg-secondary/40 rounded-lg text-sm justify-center flex gap-2 items-center p-4 font-medium text-foreground/80">
            <BookDashed /> You have no notes
          </div>
        )}

        {!notes.length && searchValue && (
          <div className="w-full  h-max bg-secondary/40 rounded-lg text-sm justify-center flex gap-2 items-center p-4 font-medium text-foreground/80">
            <SearchX /> No notes found!
          </div>
        )}
      </div>
    </div>
  );
}

export default KleshNotes;
