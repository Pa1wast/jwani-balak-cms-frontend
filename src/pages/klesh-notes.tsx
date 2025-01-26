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
import { NewKleshNote, UpdatedKleshNote } from '@/types/klesh-note';
import { Separator } from '@/components/ui/separator';
import Loader from '@/components/ui/loader';
import { useKleshNotes } from '@/features/klesh/useKleshNotes';
import { useAddKleshNote } from '@/features/klesh/useAddKleshNote';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { useUpdateKleshNote } from '@/features/klesh/useUpdateKleshNote';
import { stripHtmlTags } from '@/lib/pdf';

const editorModules = {
  toolbar: [[{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]],
  clipboard: {
    matchVisual: false,
    matchers: [
      [
        '*',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (node: any) => {
          console.log(node);
          const plainText = node.innerText || node.textContent || '';
          return { ops: [{ insert: plainText }] };
        },
      ],
    ],
  },
};

function KleshNotes() {
  const { isDarkMode } = useDarkMode();

  const { selectedCompanyId } = useCompaniesView();

  const { selectedNoteId, setSelectedNoteId } = useKleshNotesEditor();

  const { isLoading, kleshNotes } = useKleshNotes();

  const { isAdding, asyncAddKleshNote } = useAddKleshNote();
  const { isUpdating, updateKleshNote } = useUpdateKleshNote();

  const [searchValue, setSearchValue] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

  const selectedNote = kleshNotes?.find(note => note._id === selectedNoteId);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
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
    setContent(newContent);
    setHasChanges(true);
  }

  function handleNoteSelection(noteId: string) {
    setHasChanges(false);
    setSelectedNoteId(noteId);
    setIsEditorOpen(true);
  }

  async function handleSaveNote() {
    if (!selectedCompanyId) {
      toast.error('Something went wrong! Please try again');
    } else {
      if (selectedNoteId) {
        const updatedKleshNote: UpdatedKleshNote = { note: content };
        updateKleshNote({ kleshNoteId: selectedNoteId, updatedKleshNote });
        setHasChanges(false);
      } else {
        const kleshNote: NewKleshNote = { company: selectedCompanyId as string, note: content };
        await asyncAddKleshNote(kleshNote).then(data => setSelectedNoteId(data?.data?.klesh._id));
        setHasChanges(false);
      }
    }
  }

  function handleCreateNewNote() {
    setSelectedNoteId(undefined);
    setContent('');
    setIsEditorOpen(true);
  }

  function handleSearchNotes(value: string) {
    setSearchValue(value);
  }

  function handleToggleSort() {
    setSort(sortValue => (sortValue === 'asc' ? 'desc' : 'asc'));
  }
  function handleCloseEditor() {
    if (hasChanges) {
      const isConfirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );

      if (!isConfirmed) {
        return;
      }
    }

    setIsEditorOpen(false);
    setSelectedNoteId(undefined);
    setContent('');
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
      container.style.height = '70vh';
      container.style.overflow = 'hidden';
      container.style.paddingTop = `${toolbar.offsetHeight - 45}px`;
      container.style.borderWidth = '0';
    }

    if (editor) {
      editor.style.height = '100%';
      editor.style.backgroundColor = isDarkMode
        ? 'rgba(30, 90, 174, 0.058)'
        : 'rgba(30, 90, 174, 0.1)';
      editor.style.borderRadius = '5px';
      editor.style.fontSize = '24px';
      editor.style.borderWidth = '1px';
      editor.style.textWrap = 'wrap';
    }
  }, [isDarkMode, isEditorOpen, selectedNoteId]);

  return isEditorOpen ? (
    <>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleNoteChange}
        modules={editorModules}
        className="text-xl overflow-auto"
      />
      <div className="flex justify-between mt-1">
        <Button size="sm" onClick={handleCloseEditor}>
          <ArrowLeft /> Back
        </Button>

        <div className="flex gap-2">
          {selectedNoteId && stripHtmlTags(content) && !hasChanges && (
            <Button size="sm" variant="outline" asChild>
              <Link to={`/pdf/klesh/${selectedNoteId}`}>
                <Download /> Download
              </Link>
            </Button>
          )}

          <Button
            size="sm"
            disabled={!stripHtmlTags(content) || !hasChanges || isAdding || isUpdating}
            onClick={handleSaveNote}
          >
            <Save /> Save Note
          </Button>
        </div>
      </div>
    </>
  ) : (
    <div className="px-2 space-y-6 row-span-2">
      <Button size="lg" onClick={handleCreateNewNote}>
        <FilePen />
        New Note
      </Button>

      <Separator />

      <h2 className="text-lg font-semibold text-foreground/60">Klesh Notes</h2>

      <div className="flex gap-1">
        <Search
          placeholder="Search notes by content..."
          searchValue={searchValue}
          setSearchValue={handleSearchNotes}
        />

        <Button variant="outline" onClick={handleToggleSort}>
          {sort === 'asc' ? <SortAsc /> : <SortDesc />}
          Sort By
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {!isLoading ? (
          displayedNotes.map(note => (
            <KleshNoteCard
              key={note._id}
              kleshNote={note}
              onClick={() => handleNoteSelection(note._id.toString())}
              setContent={setContent}
              setSelectedNoteId={setSelectedNoteId}
            />
          ))
        ) : (
          <Loader />
        )}

        {!isLoading && !displayedNotes.length && !searchValue && (
          <div className="w-full col-span-4 h-max bg-secondary/40 rounded-lg text-sm justify-center flex gap-2 items-center p-4 font-medium text-foreground/80">
            <BookDashed /> You have no notes
          </div>
        )}

        {!isLoading && !displayedNotes.length && searchValue && (
          <div className="w-full col-span-4  h-max bg-secondary/40 rounded-lg text-sm justify-center flex gap-2 items-center p-4 font-medium text-foreground/80">
            <SearchX /> No notes found!
          </div>
        )}
      </div>
    </div>
  );
}

export default KleshNotes;
