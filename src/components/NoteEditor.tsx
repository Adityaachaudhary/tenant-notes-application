import { useState, useEffect } from 'react';
import { Note } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, FileText } from 'lucide-react';

interface NoteEditorProps {
  note: Note | null;
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
}

const NoteEditor = ({ note, onSave, onCancel }: NoteEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title.trim(), content.trim());
  };

  const isValid = title.trim().length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <Button variant="ghost" onClick={onCancel} size="sm" className="self-start">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden xs:inline">Back to Dashboard</span>
          <span className="xs:hidden">Back</span>
        </Button>
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="h-5 w-5 text-primary flex-shrink-0" />
          <h1 className="text-xl sm:text-2xl font-bold truncate">
            {note ? 'Edit Note' : 'Create New Note'}
          </h1>
        </div>
      </div>

      {/* Editor */}
      <Card className="shadow-medium border-0 bg-gradient-card">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">
            {note ? 'Edit your note' : 'Write your thoughts'}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="text-base sm:text-lg font-medium h-11"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your note..."
                className="min-h-[300px] sm:min-h-[400px] resize-none"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 pt-4 border-t border-border/50">
              <div className="text-sm text-muted-foreground">
                {content.length} characters
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button type="button" variant="outline" onClick={onCancel} className="order-2 sm:order-1">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="gradient"
                  disabled={!isValid}
                  className="order-1 sm:order-2"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {note ? 'Update Note' : 'Create Note'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview */}
      {(title || content) && (
        <Card className="shadow-soft">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-sm text-muted-foreground">Preview</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-3">
              {title && (
                <h3 className="text-lg sm:text-xl font-semibold break-words">{title}</h3>
              )}
              {content && (
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-muted-foreground break-words">
                    {content}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NoteEditor;