
import { 
  AlertTriangle, 
  BookOpen, 
  Bell, 
  Settings, 
  Map, 
  Home, 
  Activity,
  Search,
  ExternalLink,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const navItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Map, label: 'Interactive Map' },
    { icon: Activity, label: 'Live Seismic Data' },
    { icon: AlertTriangle, label: 'Risk Assessment' },
    { icon: Bell, label: 'Alerts' },
    { icon: BookOpen, label: 'Preparedness' },
    { icon: Search, label: 'Historical Data' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-full w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out transform",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:relative md:translate-x-0"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 mr-2 text-warning" />
          <span className="font-bold text-lg">QuakeAware</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="md:hidden hover:bg-sidebar-accent/50"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Button 
                variant={item.active ? "secondary" : "ghost"} 
                className={cn(
                  "w-full justify-start text-left font-normal",
                  item.active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
        <Button variant="outline" className="w-full justify-start hover:bg-sidebar-accent/50">
          <ExternalLink className="h-4 w-4 mr-2" />
          Documentation
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
