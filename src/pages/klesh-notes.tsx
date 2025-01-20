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
import { useKleshNotesEditor } from '@/contexts/klesh-notes-context';
import Search from '@/components/navigation/search';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import useIsMobile from '@/hooks/useIsMobile';
import { KleshNote, NewKleshNote, UpdatedKleshNote } from '@/types/klesh-note';
import { Separator } from '@/components/ui/separator';
import Loader from '@/components/ui/loader';
import { useKleshNotes } from '@/features/klesh/useKleshNotes';
import { useAddKleshNote } from '@/features/klesh/useAddKleshNote';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { useUpdateKleshNote } from '@/features/klesh/useUpdateKleshNote';

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
  isLoading: boolean;
  isAddingNote: boolean;
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
  const { isDarkMode } = useDarkMode();

  const { selectedCompanyId } = useCompaniesView();

  const { selectedNoteId, setSelectedNoteId } = useKleshNotesEditor();

  const { isLoading, kleshNotes } = useKleshNotes();

  const { isAdding, asyncAddKleshNote } = useAddKleshNote();
  const { isUpdating, updateKleshNote } = useUpdateKleshNote();

  const [searchValue, setSearchValue] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

  const selectedNote = kleshNotes?.find(note => note._id === selectedNoteId);

  const [isMobileEditorOpen, setIsMobileEditorOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [content, setContent] = useState(selectedNote?.note ?? '');

  const filteredNotes = kleshNotes
    ?.filter(note => note.note?.includes(searchValue))
    .sort((a, b) => {
      return sort === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const displayedNotes = filteredNotes;

  function handleNoteChange(newContent: string) {
    const filterContent = newContent.replace(/<p>|<\/p>|<br>/gim, '');

    setContent(filterContent);
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

  async function handleSaveNote() {
    if (!selectedCompanyId) {
      toast.error('Something went wrong! Please try again');
    } else {
      if (selectedNoteId) {
        const updatedKleshNote: UpdatedKleshNote = { note: content };
        updateKleshNote({ kleshNoteId: selectedNoteId, updatedKleshNote });
      } else {
        const kleshNote: NewKleshNote = { company: selectedCompanyId as string, note: content };
        await asyncAddKleshNote(kleshNote).then(data => setSelectedNoteId(data?.data?.klesh._id));
      }
    }
  }

  function handleCreateNewNote() {
    setSelectedNoteId(undefined);
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
      setContent(selectedNote.note);
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
      isLoading={isLoading}
      isAddingNote={isAdding || isUpdating}
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
      isLoading={isLoading}
      isAddingNote={isAdding || isUpdating}
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
  isLoading,
  isAddingNote,
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
          {!isLoading ? (
            notes?.map(note => (
              <KleshNoteCard
                key={note._id}
                kleshNote={note}
                selectedNoteId={selectedNoteId}
                onClick={() => onNoteSelection(note._id)}
              />
            ))
          ) : (
            <Loader />
          )}

          {!isLoading && !notes?.length && !searchValue && (
            <div className="w-full  h-max bg-secondary/40 rounded-lg text-sm justify-center flex gap-2 items-center p-4 font-medium text-foreground/80">
              <BookDashed /> You have no notes
            </div>
          )}

          {!isLoading && !notes?.length && searchValue && (
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
        {selectedNoteId && (
          <Button variant="outline" asChild>
            <Link to={`/pdf/klesh/${selectedNoteId}`}>
              <Download /> Download
            </Link>
          </Button>
        )}

        <Button disabled={content === '' || !content || isAddingNote} onClick={onSaveNote}>
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
  isLoading,
  isAddingNote,
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
          {selectedNoteId && (
            <Button size="sm" variant="outline" asChild>
              <Link to={`/pdf/klesh/${selectedNoteId}`}>
                <Download /> Download
              </Link>
            </Button>
          )}

          <Button
            size="sm"
            disabled={content === '' || !content || isAddingNote}
            onClick={onSaveNote}
          >
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
        {!isLoading ? (
          notes.map(note => (
            <KleshNoteCard
              key={note._id}
              kleshNote={note}
              selectedNoteId={selectedNoteId}
              onClick={() => onNoteSelection(note._id.toString())}
            />
          ))
        ) : (
          <Loader />
        )}

        {!isLoading && !notes.length && !searchValue && (
          <div className="w-full  h-max bg-secondary/40 rounded-lg text-sm justify-center flex gap-2 items-center p-4 font-medium text-foreground/80">
            <BookDashed /> You have no notes
          </div>
        )}

        {!isLoading && !notes.length && searchValue && (
          <div className="w-full  h-max bg-secondary/40 rounded-lg text-sm justify-center flex gap-2 items-center p-4 font-medium text-foreground/80">
            <SearchX /> No notes found!
          </div>
        )}
      </div>
    </div>
  );
}

export default KleshNotes;
