import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthService } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { Building2, Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await AuthService.login(email, password);
      toast({
        title: 'Welcome back!',
        description: 'You have been successfully logged in.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testAccounts = [
    { email: 'admin@acme.test', role: 'Admin', tenant: 'Acme Corp' },
    { email: 'user@acme.test', role: 'Member', tenant: 'Acme Corp' },
    { email: 'admin@globex.test', role: 'Admin', tenant: 'Globex Corp' },
    { email: 'user@globex.test', role: 'Member', tenant: 'Globex Corp' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-primary/5 p-3 sm:p-4">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Hero Section */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <div className="flex items-center justify-center lg:justify-start mb-4 sm:mb-6">
            <div className="p-2.5 sm:p-3 bg-gradient-primary rounded-xl shadow-medium">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-3 sm:mb-4">
            SaaS Notes
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6 px-2 sm:px-0">
            Secure, multi-tenant note management for modern teams
          </p>
          <div className="space-y-2 text-sm sm:text-base text-muted-foreground max-w-md mx-auto lg:mx-0">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="w-2 h-2 bg-success rounded-full flex-shrink-0"></div>
              <span>Multi-tenant architecture</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="w-2 h-2 bg-success rounded-full flex-shrink-0"></div>
              <span>Role-based access control</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="w-2 h-2 bg-success rounded-full flex-shrink-0"></div>
              <span>Subscription management</span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md mx-auto order-1 lg:order-2">
          <Card className="shadow-strong border-0 bg-gradient-card">
            <CardHeader className="text-center px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl">Sign In</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Enter your credentials to access your workspace
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11"
                      placeholder="admin@acme.test"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11"
                      placeholder="password"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-11" variant="gradient" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="px-4 sm:px-6">
              <div className="w-full">
                <div className="text-sm text-muted-foreground mb-3">Test Accounts:</div>
                <div className="grid gap-2">
                  {testAccounts.map((account) => (
                    <button
                      key={account.email}
                      type="button"
                      onClick={() => {
                        setEmail(account.email);
                        setPassword('password');
                      }}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2.5 sm:p-2 rounded-md border border-border hover:bg-accent/50 transition-colors text-sm gap-1 sm:gap-0"
                    >
                      <span className="font-medium text-left break-all">{account.email}</span>
                      <span className="text-xs text-muted-foreground text-left sm:text-right">
                        {account.role} • {account.tenant}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;