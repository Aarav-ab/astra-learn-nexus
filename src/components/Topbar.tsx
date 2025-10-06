import { Search, Plus, Bot, LayoutGrid, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/useStore';

export const Topbar = () => {
  const { view, setView, toggleChat, isChatOpen, searchQuery, setSearchQuery } = useStore();

  const handleNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'Untitled',
      content: '# New Note\n\nStart typing...',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    useStore.getState().addNote(newNote);
    useStore.getState().setCurrentNote(newNote.id);
    setView('editor');
  };

  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-4 gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-lg">A</span>
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AstraLearn
          </h1>
        </div>
      </div>

      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search notes... (Ctrl+P)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background/50 border-border/50"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNewNote}
          title="New Note (Ctrl+N)"
        >
          <Plus className="w-5 h-5" />
        </Button>

        <div className="flex gap-1 bg-muted/30 rounded-lg p-1">
          <Button
            variant={view === 'editor' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setView('editor')}
            className="h-8 px-3"
          >
            <FileText className="w-4 h-4 mr-1" />
            Editor
          </Button>
          <Button
            variant={view === 'canvas' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setView('canvas')}
            className="h-8 px-3"
          >
            <LayoutGrid className="w-4 h-4 mr-1" />
            Canvas
          </Button>
        </div>

        <Button
          variant={isChatOpen ? 'default' : 'ghost'}
          size="icon"
          onClick={toggleChat}
          title="AI Assistant (Ctrl+Shift+A)"
          className="glow"
        >
          <Bot className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
