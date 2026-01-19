import { GraduationCap, ArrowLeft, Bell, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

interface DashboardHeaderProps {
  studentName: string;
  collegeName: string;
  rollNumber?: string;
  onBack?: () => void;
}

const DashboardHeader = ({ studentName, collegeName, rollNumber, onBack }: DashboardHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const initials = studentName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Left section */}
          <div className="flex items-center gap-2 md:gap-4">
            {onBack && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack}
                className="text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8 md:h-9 md:w-9"
              >
                <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            )}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20">
                <GraduationCap className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div className="hidden xs:block">
                <h1 className="text-sm md:text-base font-bold leading-tight">{collegeName}</h1>
                <p className="text-[10px] md:text-xs text-primary-foreground/70">Student Portal</p>
              </div>
            </div>
          </div>

          {/* Desktop Right section */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 relative h-9 w-9"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse" />
            </Button>
            
            <div className="flex items-center gap-3 pl-3 border-l border-primary-foreground/20">
              <Avatar className="h-8 w-8 border-2 border-primary-foreground/30 shadow-lg">
                <AvatarFallback className="bg-accent text-accent-foreground text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-tight">{studentName}</p>
                {rollNumber && (
                  <p className="text-xs text-primary-foreground/70">{rollNumber}</p>
                )}
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 h-9 w-9"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Right section */}
          <div className="flex md:hidden items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 relative h-8 w-8"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            </Button>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-card p-0">
                <div className="flex flex-col h-full">
                  {/* Profile Section */}
                  <div className="bg-primary p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border-2 border-primary-foreground/30 shadow-lg">
                        <AvatarFallback className="bg-accent text-accent-foreground text-lg font-bold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-primary-foreground">
                        <p className="font-semibold text-lg">{studentName}</p>
                        {rollNumber && (
                          <p className="text-sm text-primary-foreground/70">{rollNumber}</p>
                        )}
                        <p className="text-xs text-primary-foreground/60">Student</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="flex-1 p-4 space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-3">
                      Quick Actions
                    </p>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left">
                      <Bell className="h-5 w-5 text-primary" />
                      <span className="font-medium">Notifications</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <span className="font-medium">My Results</span>
                    </button>
                  </div>
                  
                  {/* Logout */}
                  <div className="p-4 border-t border-border">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-destructive/10 transition-colors text-destructive text-left">
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
