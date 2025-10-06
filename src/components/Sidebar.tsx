import { FileText, FolderOpen, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const { notes, currentNoteId, setCurrentNote, deleteNote, addNote, setView } = useStore();

  const handleNewNote = () => {
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
  };

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FolderOpen className="w-4 h-4" />
            <span>My Notes</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewNote}
            className="h-7 w-7"
            title="New Note"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {notes.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8 px-4">
            No notes yet. Create your first note!
          </div>
        ) : (
          <div className="space-y-1">
            {notes.map((note) => (
              <div
                key={note.id}
                className={cn(
                  'group flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-sidebar-accent',
                  currentNoteId === note.id && 'bg-sidebar-accent border border-primary/20'
                )}
                onClick={() => {
                  setCurrentNote(note.id);
                  setView('editor');
                }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm truncate">{note.title}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete "${note.title}"?`)) {
                      deleteNote(note.id);
                    }
                  }}
                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border text-xs text-muted-foreground">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Ctrl+N</span>
            <span>New note</span>
          </div>
          <div className="flex justify-between">
            <span>Ctrl+P</span>
            <span>Search</span>
          </div>
          <div className="flex justify-between">
            <span>Ctrl+Shift+A</span>
            <span>AI chat</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
