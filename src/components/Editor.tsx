import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Eye, Edit } from 'lucide-react';

export const Editor = () => {
  const { notes, currentNoteId, updateNote } = useStore();
  const currentNote = notes.find((n) => n.id === currentNoteId);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (currentNote) {
      setContent(currentNote.content);
    }
  }, [currentNote]);

  const handleChange = (value: string) => {
    setContent(value);
    if (currentNote) {
      updateNote(currentNote.id, { content: value });
    }
  };

  if (!currentNote) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-lg mb-2">No note selected</p>
          <p className="text-sm">Select a note from the sidebar or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="border-b border-border px-4 py-2 flex items-center justify-between bg-card/30">
        <input
          type="text"
          value={currentNote.title}
          onChange={(e) => updateNote(currentNote.id, { title: e.target.value })}
          className="text-lg font-semibold bg-transparent border-none outline-none text-foreground flex-1"
          placeholder="Untitled"
        />
        <div className="flex gap-1 bg-muted/30 rounded-lg p-1">
          <Button
            variant={mode === 'edit' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMode('edit')}
            className="h-7 px-3"
          >
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button
            variant={mode === 'preview' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMode('preview')}
            className="h-7 px-3"
          >
            <Eye className="w-3 h-3 mr-1" />
            Preview
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {mode === 'edit' ? (
          <textarea
            value={content}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full h-full p-6 bg-transparent resize-none outline-none font-mono text-sm"
            placeholder="Start typing... Use markdown for formatting"
          />
        ) : (
          <div className="h-full overflow-y-auto p-6 prose prose-invert prose-purple max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};
