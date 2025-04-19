import React from 'react';
import { BookOpen, FileText } from 'lucide-react';
import { Link } from './ui/Link';

const Header: React.FC = () => {
  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-white bg-opacity-95 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold text-primary">UniTax</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#how-it-works">How It Works</Link>
            <Link href="#benefits">Benefits</Link>
            <Link href="#faq">FAQ</Link>
            <Link href="#about">About Us</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <FileText className="h-4 w-4 mr-2" />
              Log In
            </button>
            <button 
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark transition-colors duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;