
import { Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card/80 backdrop-blur-sm py-4 border-t">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <a 
            href="https://x.com/senthazalravi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Twitter className="h-4 w-4" />
            <span>@senthazalravi</span>
          </a>
        </div>
        <div className="text-sm text-muted-foreground">
          Built with{" "}
          <a 
            href="https://lovable.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            lovable.dev
          </a>
          {" "}and{" "}
          <a 
            href="https://www.deepseek.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            deepseek.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
