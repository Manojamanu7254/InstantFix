import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Laptop, Tablet, Watch, ShieldCheck, Clock, Truck, ShieldAlert, BadgeInfo, HelpCircle, Activity } from 'lucide-react';

const SERVICES = [
  {
    icon: <Smartphone className="w-6 h-6 text-blue-600" />,
    title: 'Mobile Phone Screen',
    desc: 'Outer glass cracked? Display dead? We replace display panels & premium touch glass with up to 1-Year replacement warranty on-site.',
    price: 'From ₹1,299',
    badge: 'Popular'
  },
  {
    icon: <Activity className="w-6 h-6 text-amber-500" />,
    title: 'Battery Diagnostics',
    desc: 'Battery draining fast or phone turning off randomly? We install fresh high-capacity premium cells with certified safety ICs on-site.',
    price: 'From ₹899',
    badge: 'Express Fix'
  },
  {
    icon: <Laptop className="w-6 h-6 text-slate-700" />,
    title: 'MacBook & Laptop',
    desc: 'Laptops repaired at home: liquid damage cleaning, display replacements, battery swap, and motherboard repair by high-skilled system engineers.',
    price: 'From ₹1,999',
    badge: 'Expert Service'
  },
  {
    icon: <Tablet className="w-6 h-6 text-indigo-600" />,
    title: 'Tablet & iPad Service',
    desc: 'Cracked iPad displays, charge port failure, or touch issues. Fully repaired in under 90 minutes right in front of you.',
    price: 'From ₹1,499'
  },
];

const ADVANTAGES = [
  {
    icon: "🤝",
    title: "100% In-Front-Of-You Repair",
    desc: "Every repair is carried out live at your home. Your personal photos, local payment apps, and data remain completely confidential & secure."
  },
  {
    icon: "💎",
    title: "Uncompromising OEM Quality",
    desc: "We use strictly high-grade tested OEM spare parts. Each chip goes through a 45-point intensive automated quality inspection before doorstep dispatch."
  },
  {
    icon: "💸",
    title: "Transparent No-Fix Zero-Fee",
    desc: "If our certified technician is unable to resolve your device problem, you pay absolute zero. No diagnostic fee, no home-visit charge."
  }
];

const FAQS = [
  {
    q: "How does the doorstep repair service work?",
    a: "It's simple: 1. Request an instant quote by choosing your brand & model. 2. Schedule a convenient slot. 3. Our certified technician arrives with the correct parts. 4. Your device is restored in 30-60 minutes right in front of your eyes."
  },
  {
    q: "Are my personal files and photos safe during the fix?",
    a: "Absolutely 100%. Traditional shops take your phone inside a backroom, leaving data vulnerable. With InstantFix, our engineer works on your device directly in front of you."
  },
  {
    q: "What does the 12-Month Unconditional Warranty cover?",
    a: "Every display glass/battery repair comes with up to a 1-year replacement warranty. If you face any touch responsiveness issue or battery defect, we replace the component completely free."
  }
];

export const Services: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Services Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-extrabold text-xs sm:text-sm tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
            INSTANTFIX DIAGNOSTICS & CATLOGUE
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">
            Our Certified Doorstep Services
          </h2>
          <p className="text-slate-500 mt-3 text-base sm:text-lg">
            High-precision fixes performed by our expert technicians at your coffee table. No hidden charges.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {SERVICES.map((service, idx) => (
            <div
              key={idx}
              className="relative group p-8 rounded-3xl border border-slate-100 bg-[#FAFAFCE0] hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-100 transition-all duration-350 flex flex-col justify-between"
            >
              {service.badge && (
                <span className="absolute top-4 right-4 bg-blue-500/10 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {service.badge}
                </span>
              )}
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-50 mt-6 flex justify-between items-center">
                <span className="text-slate-400 text-xs font-semibold">Starting Price</span>
                <span className="text-blue-600 font-extrabold text-lg">{service.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Instafix Difference / Advantage block */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-14 text-white mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-amber-400 text-xs font-extrabold tracking-widest uppercase">
                WHY WITHINSTAFIX BEATS SHOPS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Our 100% In-Front-Of-You Repair Promise
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Most local repair centers take your phone inside private rooms. Instafix brings certified engineers to operate safely on your couch, ensuring complete data privacy.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {ADVANTAGES.map((adv, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-800/50 border border-slate-800/80">
                  <span className="text-2xl pt-1">{adv.icon}</span>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm sm:text-base text-white">{adv.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Got Questions? We Have Answers.
            </h3>
            <p className="text-slate-500 text-sm">
              Clear information about pricing, spare parts warranty, and doorstep convenience.
            </p>
          </div>

          <div className="border border-slate-100 rounded-3xl overflow-hidden bg-slate-50/50 p-4 space-y-3">
            {FAQS.map((faq, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left p-6 font-bold text-slate-900 sm:text-base text-sm hover:bg-slate-50/50 transition flex justify-between items-center gap-4"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg font-bold text-slate-400">
                    {activeFaq === i ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
