// Simulated API endpoints for multi-tenant SaaS Notes application
import { Note, User, Tenant } from '@/types';
import { AuthService } from './auth';
import { NotesService } from './notes';
import { TenantsService } from './tenants';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export class APIService {
  // Health check endpoint
  static async health(): Promise<{ status: string; timestamp: string }> {
    await delay(100);
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  }

  // Authentication endpoints
  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await delay(500);
    
    const user = await AuthService.login(email, password);
    if (!user) {
      throw new Error('Authentication failed');
    }

    // Simulate JWT token generation
    const token = `jwt.${btoa(JSON.stringify({ userId: user.id, tenantId: user.tenantId }))}.signature`;
    
    return { user, token };
  }

  static async logout(): Promise<{ success: boolean }> {
    await delay(200);
    AuthService.logout();
    return { success: true };
  }

  // Notes CRUD endpoints
  static async createNote(data: { title: string; content: string }): Promise<Note> {
    await delay(400);
    
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    const tenant = TenantsService.getTenantById(user.tenantId);
    if (!tenant) throw new Error('Tenant not found');

    // Check subscription limits
    const existingNotes = NotesService.getNotesByTenant(user.tenantId);
    if (tenant.plan === 'free' && existingNotes.length >= tenant.maxNotes) {
      throw new Error('Note limit reached. Upgrade to Pro for unlimited notes.');
    }

    return NotesService.createNote({
      title: data.title,
      content: data.content,
      userId: user.id,
      tenantId: user.tenantId
    });
  }

  static async getNotes(): Promise<Note[]> {
    await delay(300);
    
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    return NotesService.getNotesByTenant(user.tenantId);
  }

  static async getNote(id: string): Promise<Note> {
    await delay(200);
    
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    const note = NotesService.getNoteById(id);
    if (!note) throw new Error('Note not found');
    
    // Ensure tenant isolation
    if (note.tenantId !== user.tenantId) {
      throw new Error('Access denied');
    }

    return note;
  }

  static async updateNote(id: string, data: { title?: string; content?: string }): Promise<Note> {
    await delay(350);
    
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    const existingNote = NotesService.getNoteById(id);
    if (!existingNote) throw new Error('Note not found');
    
    // Ensure tenant isolation
    if (existingNote.tenantId !== user.tenantId) {
      throw new Error('Access denied');
    }

    const updatedNote = NotesService.updateNote(id, data);
    if (!updatedNote) throw new Error('Failed to update note');

    return updatedNote;
  }

  static async deleteNote(id: string): Promise<{ success: boolean }> {
    await delay(250);
    
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    const existingNote = NotesService.getNoteById(id);
    if (!existingNote) throw new Error('Note not found');
    
    // Ensure tenant isolation
    if (existingNote.tenantId !== user.tenantId) {
      throw new Error('Access denied');
    }

    const success = NotesService.deleteNote(id);
    return { success };
  }

  // Tenant management endpoints
  static async upgradeTenant(slug: string): Promise<{ success: boolean; tenant: Tenant }> {
    await delay(600);
    
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');
    
    // Only admins can upgrade
    if (user.role !== 'admin') {
      throw new Error('Access denied. Admin role required.');
    }

    // Ensure admin can only upgrade their own tenant
    if (user.tenantSlug !== slug) {
      throw new Error('Access denied. Can only upgrade own tenant.');
    }

    const success = TenantsService.upgradeTenant(slug);
    if (!success) throw new Error('Failed to upgrade tenant');

    const tenant = TenantsService.getTenantBySlug(slug);
    if (!tenant) throw new Error('Tenant not found');

    return { success: true, tenant };
  }

  static async getTenant(slug: string): Promise<Tenant> {
    await delay(200);
    
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');
    
    // Ensure users can only access their own tenant
    if (user.tenantSlug !== slug) {
      throw new Error('Access denied');
    }

    const tenant = TenantsService.getTenantBySlug(slug);
    if (!tenant) throw new Error('Tenant not found');

    return tenant;
  }

  // User invitation (Admin only)
  static async inviteUser(email: string, role: 'admin' | 'member'): Promise<{ success: boolean; message: string }> {
    await delay(800);
    
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');
    
    if (user.role !== 'admin') {
      throw new Error('Access denied. Admin role required.');
    }

    // Simulate invitation logic
    return {
      success: true,
      message: `Invitation sent to ${email} with role ${role}`
    };
  }
}