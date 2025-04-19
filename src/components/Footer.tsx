import React from 'react';
import { BookOpen, Twitter, Facebook, Instagram, Mail } from 'lucide-react';
import { Link } from './ui/Link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-primary mr-2" />
              <span className="text-2xl font-bold text-white">UniTax</span>
            </div>
            <p className="text-gray-400 mb-4">
              Simplifying taxes for students across the country.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400">Features</Link></li>
              <li><Link href="#" className="text-gray-400">Pricing</Link></li>
              <li><Link href="#" className="text-gray-400">Security</Link></li>
              <li><Link href="#" className="text-gray-400">For International Students</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400">Tax Guide for Students</Link></li>
              <li><Link href="#" className="text-gray-400">Blog</Link></li>
              <li><Link href="#" className="text-gray-400">Help Center</Link></li>
              <li><Link href="#" className="text-gray-400">Tax Calculators</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400">About Us</Link></li>
              <li><Link href="#" className="text-gray-400">Careers</Link></li>
              <li><Link href="#" className="text-gray-400">Contact</Link></li>
              <li><Link href="#" className="text-gray-400">Partners</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} UniTax. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-500 text-sm">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 text-sm">Terms of Service</Link>
            <Link href="#" className="text-gray-500 text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;