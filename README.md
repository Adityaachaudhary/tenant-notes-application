# Multi-Tenant SaaS Notes Application

A modern, responsive multi-tenant SaaS application for managing notes with role-based access control and subscription management. Built with React, TypeScript, and Tailwind CSS.

## 🏗️ Architecture

### Multi-Tenancy Approach: Shared Schema with Tenant ID Column

This application implements a **shared schema with tenant ID column** approach for multi-tenancy:

- **Single Database**: All tenants share the same database instance
- **Tenant Isolation**: Every data model includes a `tenantId` field for strict data separation
- **Cost Efficient**: Optimal resource utilization with a single database instance
- **Scalable**: Easy to add new tenants without infrastructure changes
- **Secure**: Application-level filtering ensures complete tenant data isolation

### Why This Approach?

- ✅ **Cost Efficiency**: Single database instance reduces operational costs
- ✅ **Simplified Maintenance**: One schema to maintain, backup, and update
- ✅ **Horizontal Scalability**: Easy to scale without complex database provisioning
- ✅ **Development Speed**: Faster development with shared infrastructure
- ✅ **Security**: Strict tenant isolation through application-layer controls

## 🚀 Features

### 🏢 Multi-Tenancy
- **Tenant Support**: Currently supports Acme Corp and Globex Corporation
- **Data Isolation**: Complete separation of tenant data using tenant ID filtering
- **Tenant-Specific Branding**: Customizable branding per tenant
- **Secure Access**: Users can only access their own tenant's data

### 🔐 Authentication & Authorization
- **JWT-Based Authentication**: Secure token-based authentication system
- **Role-Based Access Control**: Two distinct user roles:
  - **Admin**: Full access including user invitations and subscription upgrades
  - **Member**: Note management capabilities only
- **Protected Routes**: Route-level authentication and authorization
- **Test Accounts**: Pre-configured test accounts for easy testing

### 📝 Notes Management
- **Full CRUD Operations**: Create, read, update, and delete notes
- **Rich Text Support**: Enhanced note content with formatting
- **Real-Time Updates**: Instant note updates across the application
- **Responsive Design**: Optimized for all device sizes
- **Search & Filter**: Easy note discovery (UI ready)

### 💳 Subscription Feature Gating
- **Free Plan**: Limited to 3 notes per tenant
- **Pro Plan**: Unlimited note creation
- **Instant Upgrades**: Real-time plan upgrades
- **Admin Controls**: Only admins can upgrade subscriptions
- **Usage Tracking**: Real-time note count monitoring

## 🧪 Test Accounts

All test accounts use the password: `password`

| Email | Role | Tenant | Capabilities |
|-------|------|--------|-------------|
| admin@acme.test | Admin | Acme Corp | Full access + user invites + upgrades |
| user@acme.test | Member | Acme Corp | Note management only |
| admin@globex.test | Admin | Globex Corporation | Full access + user invites + upgrades |
| user@globex.test | Member | Globex Corporation | Note management only |

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with full IntelliSense
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Vite**: Fast build tool and development server
- **React Router DOM**: Client-side routing and navigation

### UI Components
- **Radix UI**: Accessible, unstyled UI primitives
- **shadcn/ui**: Beautiful, customizable component library
- **Lucide React**: Modern icon library
- **CVA**: Class variance authority for component variants

### State Management & Data
- **React Hooks**: Built-in state management with useState, useEffect
- **LocalStorage**: Client-side data persistence
- **Custom Hooks**: Reusable stateful logic
- **Mock APIs**: Simulated backend responses

### Development Tools
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization
- **Date-fns**: Modern date utility library

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── Layout.tsx      # Main application layout
│   ├── NotesGrid.tsx   # Notes display grid
│   ├── NoteEditor.tsx  # Note creation/editing
│   ├── ProtectedRoute.tsx  # Route protection
│   ├── SubscriptionCard.tsx # Subscription management
│   ├── UserInviteDialog.tsx # User invitation modal
│   └── HealthCheck.tsx     # System health monitoring
│
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx  # Mobile detection
│   └── use-toast.ts    # Toast notifications
│
├── lib/                # Core business logic
│   ├── api.ts          # API service layer
│   ├── auth.ts         # Authentication service
│   ├── notes.ts        # Notes management
│   ├── tenants.ts      # Tenant management
│   ├── mockData.ts     # Mock data for development
│   └── utils.ts        # Utility functions
│
├── pages/              # Application pages
│   ├── Login.tsx       # Authentication page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Index.tsx       # Landing/home page
│   └── NotFound.tsx    # 404 error page
│
├── types/              # TypeScript type definitions
│   └── index.ts        # Core type definitions
│
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
├── index.css          # Global styles & design system
└── vite-env.d.ts      # Vite type definitions
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient with hover states
- **Secondary**: Subtle gray tones
- **Success**: Green for positive actions
- **Warning**: Amber for cautions
- **Destructive**: Red for dangerous actions

### Components
- **Responsive Design**: Mobile-first approach with breakpoints
- **Dark Mode**: Full dark mode support
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: WCAG compliant components

## 📱 Responsive Design

### Breakpoints
- **xs**: 475px+ (small phones)
- **sm**: 640px+ (large phones)
- **md**: 768px+ (tablets)
- **lg**: 1024px+ (laptops)
- **xl**: 1280px+ (desktops)
- **2xl**: 1400px+ (large screens)

### Mobile Optimizations
- Touch-friendly interface elements
- Optimized navigation for small screens
- Responsive typography and spacing
- Mobile-specific layouts and interactions

## 🔌 API Endpoints (Simulated)

### Authentication
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout

### Notes Management
- `POST /notes` - Create a new note
- `GET /notes` - List all notes for current tenant
- `GET /notes/:id` - Retrieve specific note
- `PUT /notes/:id` - Update existing note
- `DELETE /notes/:id` - Delete note

### Tenant Management
- `POST /tenants/:slug/upgrade` - Upgrade tenant subscription (Admin only)
- `GET /tenants/:slug` - Get tenant information

### System
- `GET /health` - Application health check

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd saas-notes-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development
The application will be available at `http://localhost:5173` in development mode.

## ✨ Key Features Walkthrough

### 1. Multi-Tenant Authentication
- Login with any test account to see tenant-specific data
- Each tenant has completely isolated data and users
- Role-based access controls enforce permissions

### 2. Notes Management
- Create, edit, and delete notes with a rich editor
- Real-time character count and preview
- Responsive grid layout for note display

### 3. Subscription Limits
- Free accounts are limited to 3 notes maximum
- Pro accounts have unlimited note creation
- Admins can instantly upgrade tenant subscriptions

### 4. Admin Features
- User invitation system (UI complete)
- Subscription management
- Enhanced dashboard with analytics

## 🔒 Security Features

- **Tenant Isolation**: Complete data separation between tenants
- **Role-Based Access**: Strict role enforcement across the application
- **Route Protection**: Authenticated and authorized route access
- **Input Validation**: Client-side validation for all forms
- **XSS Protection**: Safe rendering of user content

## 📊 Monitoring & Health

- **Health Check Endpoint**: Real-time application status
- **Usage Analytics**: Note creation and update tracking
- **Performance Monitoring**: Client-side performance metrics

## 🚀 Deployment

The application is configured for **Vercel deployment** with:

- Static site generation optimized for performance
- CORS enabled for external API access
- Environment-specific configurations
- Automatic deployments from Git

### Deploy to Vercel
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

## 🔄 Future Enhancements

### Planned Features
- [ ] Real backend integration with Supabase
- [ ] Email invitation system
- [ ] Advanced user management
- [ ] Audit logging and activity tracking
- [ ] Real-time collaboration
- [ ] File attachments for notes
- [ ] Advanced search and filtering
- [ ] Export/import functionality
- [ ] Custom themes per tenant
- [ ] Advanced analytics dashboard

### Scalability Improvements
- [ ] Database migration to Supabase
- [ ] Redis caching layer
- [ ] CDN integration for assets
- [ ] Advanced monitoring and alerting
- [ ] Load balancing for high availability

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines and code of conduct before submitting pull requests.

---

