import { useState } from "react";
import { Link } from "wouter";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-md bg-opacity-95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <Link href="/">
                  <a className="flex items-center">
                    <div className="w-10 h-10 relative">
                      <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-pulse"></div>
                      <div className="absolute inset-1 bg-secondary rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <span className="ml-3 text-xl font-display font-bold tracking-tight text-primary">Chronos</span>
                  </a>
                </Link>
              </div>
            </div>
            <nav className="hidden md:ml-10 md:flex space-x-10">
              <a href="#features" className="font-alt text-sm font-medium text-neutral-medium hover:text-primary transition">Features</a>
              <a href="#how-it-works" className="font-alt text-sm font-medium text-neutral-medium hover:text-primary transition">How It Works</a>
              <a href="#examples" className="font-alt text-sm font-medium text-neutral-medium hover:text-primary transition">Examples</a>
              <a href="#waitlist" className="font-alt text-sm font-medium text-neutral-medium hover:text-primary transition">Join Waitlist</a>
              <Link href="/search">
                <a className="font-alt text-sm font-medium text-primary hover:text-primary-dark transition">Search</a>
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center">
            <a href="#waitlist" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-alt font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-light transition">
              Early Access
            </a>
          </div>
          <div className="md:hidden">
            <button 
              type="button" 
              className="p-2 rounded-md text-neutral-medium hover:text-primary hover:bg-neutral-light"
              onClick={toggleMobileMenu}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a 
            href="#features" 
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-medium hover:text-primary hover:bg-neutral-light"
            onClick={closeMobileMenu}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-medium hover:text-primary hover:bg-neutral-light"
            onClick={closeMobileMenu}
          >
            How It Works
          </a>
          <a 
            href="#examples" 
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-medium hover:text-primary hover:bg-neutral-light"
            onClick={closeMobileMenu}
          >
            Examples
          </a>
          <a 
            href="#waitlist" 
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-medium hover:text-primary hover:bg-neutral-light"
            onClick={closeMobileMenu}
          >
            Join Waitlist
          </a>
          <Link href="/search">
            <a 
              className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary-dark hover:bg-neutral-light"
              onClick={closeMobileMenu}
            >
              Search
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
