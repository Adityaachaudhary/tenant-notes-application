import { Note } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Edit, Trash2, MoreHorizontal, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NotesGridProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
}

const NotesGrid = ({ notes, onEdit, onDelete }: NotesGridProps) => {
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {notes.map((note) => (
        <Card 
          key={note.id} 
          className="shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer group border-0 bg-gradient-card h-full flex flex-col"
          onClick={() => onEdit(note)}
        >
          <CardHeader className="pb-3 flex-shrink-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-base sm:text-lg line-clamp-2 group-hover:text-primary transition-colors min-w-0">
                {note.title}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity flex-shrink-0 h-8 w-8 p-0"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    onEdit(note);
                  }}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(note.id);
                    }}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          
          <CardContent className="pb-3 flex-grow">
            <p className="text-muted-foreground text-sm line-clamp-4">
              {truncateContent(note.content, 150)}
            </p>
          </CardContent>
          
          <CardFooter className="pt-3 border-t border-border/50 flex-shrink-0">
            <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
              <div className="flex items-center gap-1 min-w-0">
                <Calendar className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">Updated {formatDate(note.updatedAt)}</span>
              </div>
              {note.createdAt !== note.updatedAt && (
                <Badge variant="outline" className="text-xs flex-shrink-0 ml-2">
                  Edited
                </Badge>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default NotesGrid;