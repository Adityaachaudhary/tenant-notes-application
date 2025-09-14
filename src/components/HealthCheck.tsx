import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { APIService } from '@/lib/api';
import { Activity, RefreshCw } from 'lucide-react';

const HealthCheck = () => {
  const [health, setHealth] = useState<{ status: string; timestamp: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await APIService.health();
      setHealth(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Health check failed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Activity className="h-4 w-4" />
          System Health
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={checkHealth} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {error ? (
            <Badge variant="destructive">Error</Badge>
          ) : health ? (
            <Badge variant={health.status === 'ok' ? 'secondary' : 'destructive'}>
              {health.status.toUpperCase()}
            </Badge>
          ) : (
            <Badge variant="outline">Checking...</Badge>
          )}
          
          {health && (
            <div className="text-xs text-muted-foreground">
              Last checked: {new Date(health.timestamp).toLocaleString()}
            </div>
          )}
          
          {error && (
            <div className="text-xs text-red-600">
              {error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthCheck;