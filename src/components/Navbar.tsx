import { useState } from 'react';
import { Activity, Menu, Sun, Moon, LogIn, Zap, User, Scan, Heart, Lock, ChevronDown, Sparkles, FileText, Phone } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setShowLoginModal: (show: boolean) => void;
  onAccessAdmin: () => void;
}

export function Navbar({ currentPage, setCurrentPage, theme, toggleTheme, setShowLoginModal, onAccessAdmin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Zap },
    { id: 'doctor', label: 'Doctor', icon: User },
    { id: 'radiologist', label: 'Radiologist', icon: Scan },
    { id: 'nursing', label: 'Nursing', icon: Heart },
    { id: 'patient', label: 'Patient', icon: User },
  ];

  const moreNavItems = [
    { id: 'ai-technology', label: 'AI Technology', icon: Sparkles },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const allNavItems = [...mainNavItems, ...moreNavItems];

  const isMoreActive = moreNavItems.some(item => item.id === currentPage);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer flex-shrink-0"
            onClick={() => setCurrentPage('home')}
          >
            <div className="h-10 w-10 rounded-lg bg-red-600 flex items-center justify-center shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-gray-900 dark:text-white leading-tight">
                AI Health X-Ray
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                Management System
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'text-red-600 dark:text-red-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-2 text-sm font-medium transition-all ${
                    isMoreActive
                      ? 'text-red-600 dark:text-red-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500'
                  }`}
                >
                  More
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl"
              >
                {moreNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => setCurrentPage(item.id)}
                      className={`cursor-pointer flex items-center gap-3 px-4 py-3 ${
                        isActive 
                          ? 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onAccessAdmin}
              className="hidden md:flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Lock className="h-4 w-4" />
              Admin
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLoginModal(true)}
              className="hidden sm:flex text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Login
            </Button>
            
            <Button
              size="sm"
              onClick={() => setShowLoginModal(true)}
              className="hidden sm:flex bg-red-600 hover:bg-red-700 text-white shadow-md"
            >
              Sign Up
            </Button>

            {/* Mobile Hamburger Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden inline-flex items-center justify-center rounded-lg h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through different sections of the application
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <div className="space-y-2">
                    {allNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentPage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setCurrentPage(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                            isActive
                              ? 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-center gap-2"
                      onClick={() => {
                        onAccessAdmin();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Lock className="h-4 w-4" />
                      Admin Panel
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-center gap-2"
                      onClick={() => {
                        setShowLoginModal(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                    <Button
                      className="w-full justify-center gap-2 bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => {
                        setShowLoginModal(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}