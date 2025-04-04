
import { AlertTriangle, Bell, HelpCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [notificationCount] = useState(3);
  const { toast } = useToast();

  const handleNotificationClick = (title: string) => {
    toast({
      title: `Notification: ${title}`,
      description: "You've viewed this notification.",
    });
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="mr-4 hover:bg-primary/80"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 mr-2" />
          <h1 className="font-bold text-lg sm:text-xl">QuakeAware</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/80">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-danger text-danger-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleNotificationClick("New earthquake detected")}>
              <div className="flex flex-col">
                <span className="font-medium">New earthquake detected</span>
                <span className="text-xs text-muted-foreground">Magnitude 4.5 near San Francisco</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNotificationClick("Prediction updated")}>
              <div className="flex flex-col">
                <span className="font-medium">Prediction updated</span>
                <span className="text-xs text-muted-foreground">Risk level increased in Pacific region</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNotificationClick("System update")}>
              <div className="flex flex-col">
                <span className="font-medium">System update</span>
                <span className="text-xs text-muted-foreground">QuakeAware v2.1 is now available</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" className="hover:bg-primary/80">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
