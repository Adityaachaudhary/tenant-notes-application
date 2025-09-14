# Multi-Tenant SaaS Notes Application

A modern, multi-tenant SaaS application for managing notes with role-based access control and subscription management.

## Multi-Tenancy Architecture

**Chosen Approach: Shared Schema with Tenant ID Column**

This application uses a shared schema approach where all data is stored in the same tables but isolated using a `tenantId` column. This approach offers:

- **Cost Efficiency**: Single database instance for all tenants
- **Simplified Maintenance**: One schema to maintain and backup
- **Scalability**: Easy to add new tenants without infrastructure changes
- **Security**: Strict tenant isolation through application-level filtering

### Data Isolation Strategy

- Every data model includes a `tenantId` field
- All queries are automatically filtered by the current user's tenant
- Role-based access control ensures users can only access their tenant's data
- localStorage simulation maintains tenant boundaries in the frontend

## Features

### 🏢 Multi-Tenancy
- Support for multiple tenants (Acme Corp, Globex Corporation)
- Strict data isolation between tenants
- Tenant-specific branding and configuration

### 🔐 Authentication & Authorization
- JWT-based authentication simulation
- Role-based access control (Admin, Member)
- Protected routes and API endpoints

### 📝 Notes Management
- Full CRUD operations for notes
- Tenant-isolated note storage
- Rich text content support
- Real-time updates

### 💳 Subscription Management
- Free Plan: Maximum 3 notes per tenant
- Pro Plan: Unlimited notes
- Admin-only upgrade functionality
- Instant plan upgrades

## Test Accounts

All test accounts use the password: `password`

| Email | Role | Tenant | Access |
|-------|------|--------|---------|
| admin@acme.test | Admin | Acme Corp | Full access + upgrades |
| user@acme.test | Member | Acme Corp | Notes management only |
| admin@globex.test | Admin | Globex Corporation | Full access + upgrades |
| user@globex.test | Member | Globex Corporation | Notes management only |

## API Endpoints (Simulated)

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Notes
- `POST /notes` - Create a note
- `GET /notes` - List all notes for current tenant
- `GET /notes/:id` - Retrieve specific note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

### Tenants
- `POST /tenants/:slug/upgrade` - Upgrade tenant subscription (Admin only)
- `GET /tenants/:slug` - Get tenant information

### Health Check
- `GET /health` - Health status endpoint

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: React hooks with localStorage persistence
- **Routing**: React Router DOM
- **UI Components**: Radix UI + shadcn/ui
- **Authentication**: JWT simulation
- **Data Storage**: localStorage (for development/demo)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Login with any of the test accounts above

## Deployment

The application is configured for Vercel deployment with:
- Static site generation
- CORS enabled for API access
- Health endpoint for monitoring
- Environment-specific configurations

## Security Features

- Tenant data isolation
- Role-based access control
- Protected routes
- JWT token validation
- Input sanitization
- XSS protection

## Future Enhancements

- Real backend integration with Supabase
- Email invitations for new users
- Advanced user management
- Audit logging
- Real-time collaboration
- File attachments
- Search functionality