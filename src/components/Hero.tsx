import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Zap, ShieldAlert, BadgeCheck, CheckCircle, MapPin } from 'lucide-react';

const SERVING_CITIES = [
  'Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi-Dharwad', 'Belagavi', 'Shivamogga', 'Tumakuru', 'Udupi', 'Ballari', 'Kalaburagi', 'Chikkamagaluru', 'Hassan'
];

export const Hero: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Bengaluru');

  return (
    <div className="relative pt-24 pb-16 sm:pt-36 sm:pb-24 bg-[#FAFBFD] overflow-hidden">
      {/* Decorative Light Radial Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-15%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute top-[10%] right-[-20%] w-[50%] h-[50%] bg-amber-50/50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgent Service Banner */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-bold rounded-full shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>EXPRESS SERVICE: Screen & Battery Fixed at Home in 60 Minutes</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100/60 text-amber-900 text-xs font-bold uppercase tracking-wider">
                ⚡ Premium Doorstep Repair in Karnataka
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                Instant Phone Repair at Your <span className="text-blue-600 relative inline-block">Doorstep<span className="absolute bottom-1 left-0 w-full h-2 bg-blue-100 -z-10" /></span> in Karnataka
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Don't leave your phone at local shops for days. <strong className="text-slate-900 font-bold">InstantFix</strong> sends certified engineers to fix your glass screen or dead battery right in front of you. 100% safe, fast & transparent.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-5 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">4.9★</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">50,000+ Fixed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">60m</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">Average Fix Time</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">1 Yr</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">No-Hassle Warranty</div>
              </div>
            </div>

            {/* Selector: Live serving cities list in withInstafix style */}
            <div className="space-y-3.5">
              <span className="text-sm font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-blue-600" />
                Select Your Karnataka District / Town:
              </span>
              <div className="flex flex-wrap gap-2">
                {SERVING_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold border transition duration-150 ${
                      selectedCity === city
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                        : 'bg-white text-slate-600 border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-blue-700 font-medium mt-1">
                🟢 Free home inspection visit active in <span className="underline font-bold">{selectedCity}, Karnataka</span> today!
              </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#book"
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-extrabold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 text-center flex items-center justify-center gap-2.5 group"
              >
                Instant Price Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition text-center"
              >
                View Repair Price Catalog
              </a>
            </div>
          </div>

          {/* Hero Right Card Preview - Premium Cashify/Instafix Layout */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

            {/* Promo Live Guarantee Widget */}
            <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    LIVE SERVICE STATUS
                  </span>
                </div>
                <span className="text-xs font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded">
                  {selectedCity} ACTIVE
                </span>
              </div>

              {/* Instafix Pillars */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">60-Min Repaired & Handed</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Technicians arrive, diagnose, fix & hand back in under 60 minutes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Certified Technicians Only</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Every InstantFix engineer has cleared police checks & rigorous technical training.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Zero-Stress Warranty</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Get up to a 12-Month unconditional replacement warranty on any display repairs.</p>
                  </div>
                </div>
              </div>

              {/* Standby phone banner */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
                <span className="text-xl">📱</span>
                <p className="text-xs text-blue-900 font-semibold leading-relaxed">
                  <strong>Need a Backup Phone?</strong> Request a free standby phone while we repair yours at your couch. Let's start!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
