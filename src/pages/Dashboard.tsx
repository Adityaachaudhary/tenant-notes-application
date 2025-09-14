import { useState, useEffect } from 'react';
import { AuthService } from '@/lib/auth';
import { APIService } from '@/lib/api';
import { TenantsService } from '@/lib/tenants';
import { Note } from '@/types';
import Layout from '@/components/Layout';
import NotesGrid from '@/components/NotesGrid';
import NoteEditor from '@/components/NoteEditor';
import SubscriptionCard from '@/components/SubscriptionCard';
import HealthCheck from '@/components/HealthCheck';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Users, TrendingUp, Crown, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const { toast } = useToast();

  const user = AuthService.getCurrentUser();
  const tenant = user ? TenantsService.getTenantById(user.tenantId) : null;

  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);

  const loadNotes = async () => {
    try {
      const userNotes = await APIService.getNotes();
      setNotes(userNotes);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load notes",
        variant: "destructive",
      });
    }
  };

  const handleNewNote = () => {
    if (!user || !tenant) return;
    
    // Check note limit for free plan
    if (tenant.plan === 'free' && notes.length >= tenant.maxNotes) {
      toast({
        title: 'Note limit reached',
        description: `Free plan is limited to ${tenant.maxNotes} notes. Upgrade to Pro for unlimited notes.`,
        variant: 'destructive',
      });
      return;
    }

    setEditingNote(null);
    setIsEditing(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditing(true);
  };

  const handleSaveNote = async (title: string, content: string) => {
    if (!editingNote) {
      await handleCreateNote(title, content);
      return;
    }

    try {
      const updatedNote = await APIService.updateNote(editingNote.id, { title, content });
      setNotes(notes.map(note => 
        note.id === editingNote.id ? updatedNote : note
      ));
      setIsEditing(false);
      setEditingNote(null);

      toast({
        title: "Note updated",
        description: "Your note has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateNote = async (title: string, content: string) => {
    try {
      const newNote = await APIService.createNote({ title, content });
      setNotes([...notes, newNote]);
      setIsEditing(false);
      setEditingNote(null);

      toast({
        title: "Note created",
        description: "Your note has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await APIService.deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingNote(null);
  };

  if (!user || !tenant) return null;

  const stats = [
    {
      title: 'Total Notes',
      value: notes.length.toString(),
      description: tenant.plan === 'free' ? `${notes.length}/${tenant.maxNotes} used` : 'Unlimited',
      icon: FileText,
      color: 'text-blue-600',
    },
    {
      title: 'Plan Status',
      value: tenant.plan === 'pro' ? 'Pro' : 'Free',
      description: tenant.plan === 'pro' ? 'All features unlocked' : 'Limited features',
      icon: tenant.plan === 'pro' ? Crown : Users,
      color: tenant.plan === 'pro' ? 'text-amber-600' : 'text-gray-600',
    },
    {
      title: 'Recent Activity',
      value: notes.filter(note => {
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return new Date(note.updatedAt) > dayAgo;
      }).length.toString(),
      description: 'Notes updated today',
      icon: TrendingUp,
      color: 'text-green-600',
    },
  ];

  if (isEditing) {
    return (
      <Layout>
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onCancel={handleCancelEdit}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your notes in the {tenant.name} workspace
            </p>
          </div>
          <Button onClick={handleNewNote} variant="gradient" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Components */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <HealthCheck />
          
          {/* Subscription Card for Free Plan */}
          {tenant.plan === 'free' && user.role === 'admin' && (
            <div className="md:col-span-2">
              <SubscriptionCard tenant={tenant} />
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            {notes.length > 0 && (
              <Badge variant="outline">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'}
              </Badge>
            )}
          </div>

          {notes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No notes yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first note to get started organizing your thoughts.
                </p>
                <Button onClick={handleNewNote} variant="gradient">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Note
                </Button>
              </CardContent>
            </Card>
          ) : (
            <NotesGrid
              notes={notes}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;