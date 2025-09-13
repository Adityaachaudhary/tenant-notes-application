import { User, Tenant, Note } from '@/types';

export const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'Acme Corp',
    slug: 'acme',
    plan: 'free',
    maxNotes: 3,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Globex Corporation',
    slug: 'globex',
    plan: 'pro',
    maxNotes: -1, // unlimited
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@acme.test',
    role: 'admin',
    tenantId: '1',
    tenantSlug: 'acme',
    tenantName: 'Acme Corp',
    name: 'John Admin'
  },
  {
    id: '2',
    email: 'user@acme.test',
    role: 'member',
    tenantId: '1',
    tenantSlug: 'acme',
    tenantName: 'Acme Corp',
    name: 'Jane User'
  },
  {
    id: '3',
    email: 'admin@globex.test',
    role: 'admin',
    tenantId: '2',
    tenantSlug: 'globex',
    tenantName: 'Globex Corporation',
    name: 'Bob Admin'
  },
  {
    id: '4',
    email: 'user@globex.test',
    role: 'member',
    tenantId: '2',
    tenantSlug: 'globex',
    tenantName: 'Globex Corporation',
    name: 'Alice User'
  }
];

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to Acme Notes',
    content: 'This is your first note in the Acme workspace. You can edit, delete, and create new notes here.',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    userId: '1',
    tenantId: '1'
  },
  {
    id: '2',
    title: 'Project Ideas',
    content: 'Here are some project ideas:\n1. Improve user onboarding\n2. Add real-time collaboration\n3. Implement search functionality',
    createdAt: '2024-01-16T14:30:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
    userId: '2',
    tenantId: '1'
  },
  {
    id: '3',
    title: 'Globex Quarterly Planning',
    content: 'Q1 goals:\n- Launch new product line\n- Expand team by 20%\n- Implement customer feedback system',
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z',
    userId: '3',
    tenantId: '2'
  },
  {
    id: '4',
    title: 'Meeting Notes - Jan 18',
    content: 'Discussed upcoming features and user feedback. Need to prioritize mobile responsiveness.',
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
    userId: '4',
    tenantId: '2'
  }
];