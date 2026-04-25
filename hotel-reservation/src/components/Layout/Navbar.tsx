import { Link } from 'react-router-dom';
import { Plane, Search, User, Menu, Moon, Sun, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleTheme } from '../../store/themeSlice';
import { logout } from '../../store/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[72px] items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Plane className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="font-bold text-xl tracking-tight">StayScout</span>
          </Link>
          
          <div className="hidden md:flex flex-1 max-w-md mx-8">
             <div className="relative w-full group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
               <input 
                 type="text" 
                 placeholder="Where to next?" 
                 className="w-full pl-10 pr-4 py-2.5 rounded-full border border-input bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground/70"
               />
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-6">
              <Link to="/search" className="text-sm font-medium hover:text-primary transition-colors">Explore</Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            </div>
            
            <button onClick={() => dispatch(toggleTheme())} className="p-2 rounded-full hover:bg-muted text-foreground transition-colors">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="h-6 w-px bg-border hidden sm:block"></div>
            
            {isAuthenticated ? (
               <div className="flex items-center gap-4 hidden sm:flex">
                 <span className="text-sm font-medium">{user?.name}</span>
                 <Button variant="ghost" size="icon" onClick={() => dispatch(logout())}>
                   <LogOut className="h-4 w-4" />
                 </Button>
               </div>
            ) : (
               <Link to="/login" className="hidden sm:flex">
                 <Button variant="default" className="gap-2 rounded-full shadow-md">
                   <User className="h-4 w-4" />
                   Sign In
                 </Button>
               </Link>
            )}
            
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
