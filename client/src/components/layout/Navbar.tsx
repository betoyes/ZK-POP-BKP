import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location !== '/' 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background border-r border-border w-[300px]">
              <div className="flex flex-col gap-8 mt-10">
                <span className="font-serif text-2xl font-bold tracking-widest text-primary">AURUM</span>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="text-lg font-medium hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  ))}
                  <Link href="/admin" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                    Admin Panel
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Links - Left */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium tracking-wide hover:text-primary transition-colors uppercase">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo - Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="font-serif text-3xl md:text-4xl font-bold tracking-widest text-primary hover:opacity-90 transition-opacity">
            AURUM
          </Link>
        </div>

        {/* Desktop Links - Right & Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-8 mr-4">
            {navLinks.slice(3).map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-medium tracking-wide hover:text-primary transition-colors uppercase">
                {link.name}
              </Link>
            ))}
          </div>

          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="hover:text-primary relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
          </Link>
          
          <Link href="/admin">
             <Button variant="ghost" size="icon" className="hover:text-primary">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
