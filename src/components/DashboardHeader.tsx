import { GraduationCap, ArrowLeft, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DashboardHeaderProps {
  studentName: string;
  collegeName: string;
  onBack?: () => void;
}

const DashboardHeader = ({ studentName, collegeName, onBack }: DashboardHeaderProps) => {
  const initials = studentName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-4">
            {onBack && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold">{collegeName}</h1>
                <p className="text-xs text-primary-foreground/70">Student Portal</p>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
            
            <div className="flex items-center gap-3 pl-3 border-l border-primary-foreground/20">
              <Avatar className="h-8 w-8 border-2 border-primary-foreground/30">
                <AvatarFallback className="bg-accent text-accent-foreground text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{studentName}</p>
                <p className="text-xs text-primary-foreground/70">Student</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
