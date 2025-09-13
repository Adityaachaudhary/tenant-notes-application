import { Note } from '@/types';
import { mockNotes } from './mockData';

const NOTES_STORAGE_KEY = 'saas-notes-data';

export class NotesService {
  static getAllNotes(): Note[] {
    const stored = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!stored) {
      // Initialize with mock data
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(mockNotes));
      return mockNotes;
    }
    
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  static getNotesByTenant(tenantId: string): Note[] {
    return this.getAllNotes().filter(note => note.tenantId === tenantId);
  }

  static getNoteById(id: string): Note | null {
    return this.getAllNotes().find(note => note.id === id) || null;
  }

  static createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note {
    const notes = this.getAllNotes();
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    notes.push(newNote);
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    return newNote;
  }

  static updateNote(id: string, updates: Partial<Pick<Note, 'title' | 'content'>>): Note | null {
    const notes = this.getAllNotes();
    const index = notes.findIndex(note => note.id === id);
    
    if (index === -1) return null;
    
    notes[index] = {
      ...notes[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    return notes[index];
  }

  static deleteNote(id: string): boolean {
    const notes = this.getAllNotes();
    const filteredNotes = notes.filter(note => note.id !== id);
    
    if (filteredNotes.length === notes.length) return false;
    
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(filteredNotes));
    return true;
  }
}