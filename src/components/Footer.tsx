import React from 'react';
import { Smartphone, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight">Instant<span className="text-blue-500">Fix</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-slate-400">
              India's premium doorstep phone repair service. Certified engineering experts deliver high-precision fixes directly to your home or office in 60 minutes.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold">Expert Doorstep Service</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="text-slate-300 font-semibold">+91 70198 86577</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-slate-300">support@withinstafix.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-slate-300">Live across all districts, cities, and towns in Karnataka (Bengaluru, Mysuru, Hubballi, Mangaluru, Belagavi, Shivamogga, etc.)</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold">Quality & Safety Guarantees</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-300">✓ up to 1-Year Unconditional Warranty</li>
              <li className="text-slate-300">✓ Genuine OEM Tested Spare Parts</li>
              <li className="text-slate-300">✓ No Fix - Absolute Zero Fee Promise</li>
              <li className="text-slate-300 pt-1.5 text-amber-500 font-bold">⚡ 24/7 Priority Repair Helpline</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} InstantFix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
