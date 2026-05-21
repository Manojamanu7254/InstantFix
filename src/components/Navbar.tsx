import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, ShieldCheck, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-header border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md shadow-blue-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <span className="font-sans font-extrabold text-2xl tracking-tight text-slate-900 flex items-center">
              Instant<span className="text-blue-600">Fix</span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-amber-100 text-amber-800 font-bold rounded">
                60 MINS
              </span>
            </span>
          </Link>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/#services" className="text-sm sm:text-base font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <a href="#book" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition">
              <ShieldCheck className="w-4 h-4" /> Book Repair
            </a>
            <Link to="/admin" className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <User className="w-4 h-4" />
              Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
