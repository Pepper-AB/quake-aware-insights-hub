
import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface WarningBannerProps {
  message: string;
  type?: 'warning' | 'danger' | 'info';
}

const WarningBanner = ({ message, type = 'info' }: WarningBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const bgColor = 
    type === 'danger' ? 'bg-red-600' : 
    type === 'warning' ? 'bg-amber-500' : 
    'bg-info';

  const animation =
    type === 'danger' ? 'animate-pulse-danger' :
    type === 'warning' ? 'animate-pulse-warning' :
    'animate-pulse-slow';

  return (
    <div className={`${bgColor} text-white px-4 py-3 flex items-center justify-between`}>
      <div className="flex items-center">
        <AlertTriangle className={`h-5 w-5 mr-2 ${animation}`} />
        <span>{message}</span>
      </div>
      <button 
        className="hover:bg-black/10 p-1 rounded-full"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </button>
    </div>
  );
};

export default WarningBanner;
