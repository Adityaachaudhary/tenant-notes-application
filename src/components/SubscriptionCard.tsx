import { useState } from 'react';
import { Tenant } from '@/types';
import { APIService } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Check, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionCardProps {
  tenant: Tenant;
}

const SubscriptionCard = ({ tenant }: SubscriptionCardProps) => {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const { toast } = useToast();

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    
    try {
      const result = await APIService.upgradeTenant(tenant.slug);
      
      if (result.success) {
        toast({
          title: "Successfully upgraded to Pro!",
          description: "You now have unlimited notes and premium features.",
        });
        
        // Trigger a page refresh to update the UI
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Upgrade failed",
        description: error instanceof Error ? error.message : "There was an error upgrading your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpgrading(false);
    }
  };

  const proFeatures = [
    'Unlimited notes',
    'Advanced search & filters',
    'Team collaboration',
    'Priority support',
    'Export & backup tools',
    'Custom integrations'
  ];

  return (
    <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock unlimited notes and premium features
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-white/50">
            Current: Free Plan
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
          <div>
            <div className="text-sm text-muted-foreground">Current Usage</div>
            <div className="font-semibold">
              Limited to {tenant.maxNotes} notes
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="text-sm text-muted-foreground">With Pro</div>
            <div className="font-semibold flex items-center gap-1">
              <Zap className="h-4 w-4 text-amber-600" />
              Unlimited notes
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {proFeatures.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleUpgrade}
          disabled={isUpgrading}
          variant="premium"
          size="lg"
          className="w-full"
        >
          {isUpgrading ? (
            'Upgrading...'
          ) : (
            <>
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Pro Now
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;