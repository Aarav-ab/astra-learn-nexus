import { create } from 'zustand';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AppState {
  notes: Note[];
  currentNoteId: string | null;
  view: 'editor' | 'canvas';
  isChatOpen: boolean;
  searchQuery: string;
  
  // Actions
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setCurrentNote: (id: string | null) => void;
  setView: (view: 'editor' | 'canvas') => void;
  toggleChat: () => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<AppState>((set) => ({
  notes: [
    {
      id: '1',
      title: 'Welcome to AstraLearn',
      content: '# Welcome to AstraLearn\n\nYour AI-powered learning workspace.\n\n## Features\n\n- 📝 Markdown editing\n- 🎨 Canvas visualization\n- 🤖 AI assistant\n- ⌨️ Keyboard shortcuts\n\nTry creating a new note with **Ctrl+N**!',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  currentNoteId: '1',
  view: 'editor',
  isChatOpen: false,
  searchQuery: '',

  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  
  updateNote: (id, updates) => set((state) => ({
    notes: state.notes.map((note) =>
      note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
    ),
  })),
  
  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter((note) => note.id !== id),
    currentNoteId: state.currentNoteId === id ? null : state.currentNoteId,
  })),
  
  setCurrentNote: (id) => set({ currentNoteId: id }),
  setView: (view) => set({ view }),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
