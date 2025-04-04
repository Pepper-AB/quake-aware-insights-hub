
import { AlertTriangle, Bell, HelpCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [notificationCount] = useState(3);

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
        <Button variant="ghost" size="icon" className="relative hover:bg-primary/80">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 bg-danger text-danger-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-primary/80">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
