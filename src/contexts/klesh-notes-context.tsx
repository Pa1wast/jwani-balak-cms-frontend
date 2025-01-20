/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from 'react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

interface KleshNotesEditorProvider {
  selectedNoteId: string | undefined;
  setSelectedNoteId: (id: string | undefined) => void;
}

const KleshNotesEditorContext = createContext<KleshNotesEditorProvider | undefined>(undefined);

function KleshNotesEditorProvider({ children }: { children: ReactNode }) {
  const [selectedNoteId, setSelectedNoteId] = useLocalStorageState<
    KleshNotesEditorProvider['selectedNoteId']
  >(undefined, 'selected-note-id');

  return (
    <KleshNotesEditorContext.Provider value={{ selectedNoteId, setSelectedNoteId }}>
      {children}
    </KleshNotesEditorContext.Provider>
  );
}

function useKleshNotesEditor() {
  const context = useContext(KleshNotesEditorContext);

  if (!context) {
    throw new Error('KleshNotesContext was used outisde of a KleshNotesProvider!');
  }

  return context;
}

export { KleshNotesEditorProvider, useKleshNotesEditor };
