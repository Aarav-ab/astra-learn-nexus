import { useEffect } from 'react';
import { Topbar } from '@/components/Topbar';
import { Sidebar } from '@/components/Sidebar';
import { Editor } from '@/components/Editor';
import { CanvasView } from '@/components/CanvasView';
import { ChatPanel } from '@/components/ChatPanel';
import { useStore } from '@/store/useStore';

const Index = () => {
  const { view, setView, toggleChat, setCurrentNote, addNote } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+N - New note
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        const newNote = {
          id: Date.now().toString(),
          title: 'Untitled',
          content: '# New Note\n\nStart typing...',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        addNote(newNote);
        setCurrentNote(newNote.id);
        setView('editor');
      }

      // Ctrl+P - Search (focus search input)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      }

      // Ctrl+Shift+A - Toggle AI chat
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        toggleChat();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addNote, setCurrentNote, setView, toggleChat]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Topbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex overflow-hidden">
          {view === 'editor' ? <Editor /> : <CanvasView />}
        </main>
        <ChatPanel />
      </div>
    </div>
  );
};

export default Index;
