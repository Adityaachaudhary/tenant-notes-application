import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@/lib/auth';
import { TenantsService } from '@/lib/tenants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import UserInviteDialog from './UserInviteDialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Building2, User, LogOut, Crown, Users } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  const tenant = user ? TenantsService.getTenantById(user.tenantId) : null;

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  if (!user || !tenant) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo & Tenant */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 sm:p-2 bg-gradient-primary rounded-lg shadow-soft">
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="font-bold text-base sm:text-lg hidden xs:block">SaaS Notes</span>
                <span className="font-bold text-base sm:text-lg xs:hidden">SN</span>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                <Badge variant="outline" className="font-medium text-xs sm:text-sm truncate max-w-[80px] sm:max-w-none">
                  {tenant.name}
                </Badge>
                <Badge 
                  variant={tenant.plan === 'pro' ? 'default' : 'secondary'}
                  className={`text-xs sm:text-sm ${tenant.plan === 'pro' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : ''}`}
                >
                  {tenant.plan === 'pro' ? (
                    <><Crown className="h-3 w-3 mr-0.5 sm:mr-1" /> <span className="hidden xs:inline">Pro</span></>
                  ) : (
                    <span className="hidden xs:inline">Free</span>
                  )}
                </Badge>
              </div>
            </div>

            {/* Admin Controls & User Menu */}
            <div className="flex items-center gap-1 sm:gap-3">
              {user.role === 'admin' && (
                <div className="hidden sm:block">
                  <UserInviteDialog />
                </div>
              )}

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3">
                    <div className="p-1 sm:p-1.5 bg-primary/10 rounded-full">
                      <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <span className="font-medium text-sm sm:text-base hidden sm:inline max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <Badge variant="outline" className="text-xs hidden lg:inline-flex">
                      {user.role}
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 sm:w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.role} • {tenant.name}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  {user.role === 'admin' && (
                    <>
                      <div className="sm:hidden">
                        <UserInviteDialog />
                      </div>
                      <DropdownMenuSeparator className="sm:hidden" />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;