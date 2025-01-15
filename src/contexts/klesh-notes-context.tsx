/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from 'react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

interface KleshNotesProvider {
  selectedNoteId: string | undefined;
  setSelectedNoteId: (id: string) => void;
}

const KleshNotesContext = createContext<KleshNotesProvider | undefined>(undefined);

function KleshNotesProvider({ children }: { children: ReactNode }) {
  const [selectedNoteId, setSelectedNoteId] = useLocalStorageState<string | undefined>(
    undefined,
    'selected-note-id'
  );

  return (
    <KleshNotesContext.Provider value={{ selectedNoteId, setSelectedNoteId }}>
      {children}
    </KleshNotesContext.Provider>
  );
}

function useKleshNotes() {
  const context = useContext(KleshNotesContext);

  if (!context) {
    throw new Error('KleshNotesContext was used outisde of a KleshNotesProvider!');
  }

  return context;
}

export { KleshNotesProvider, useKleshNotes };
