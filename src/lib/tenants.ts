import { Tenant } from '@/types';
import { mockTenants } from './mockData';

const TENANTS_STORAGE_KEY = 'saas-notes-tenants';

export class TenantsService {
  static getAllTenants(): Tenant[] {
    const stored = localStorage.getItem(TENANTS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(TENANTS_STORAGE_KEY, JSON.stringify(mockTenants));
      return mockTenants;
    }
    
    try {
      return JSON.parse(stored);
    } catch {
      return mockTenants;
    }
  }

  static getTenantById(id: string): Tenant | null {
    return this.getAllTenants().find(tenant => tenant.id === id) || null;
  }

  static getTenantBySlug(slug: string): Tenant | null {
    return this.getAllTenants().find(tenant => tenant.slug === slug) || null;
  }

  static upgradeTenant(slug: string): boolean {
    const tenants = this.getAllTenants();
    const index = tenants.findIndex(tenant => tenant.slug === slug);
    
    if (index === -1) return false;
    
    tenants[index] = {
      ...tenants[index],
      plan: 'pro',
      maxNotes: -1 // unlimited
    };
    
    localStorage.setItem(TENANTS_STORAGE_KEY, JSON.stringify(tenants));
    return true;
  }
}