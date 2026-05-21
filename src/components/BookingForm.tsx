import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Booking } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  MessageSquare, 
  Loader2, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Watch, 
  ChevronRight, 
  ChevronLeft,
  Search
} from 'lucide-react';

const BRANDS = [
  { name: 'Apple' },
  { name: 'Samsung' },
  { name: 'OnePlus' },
  { name: 'Xiaomi' },
  { name: 'Google' },
  { name: 'Vivo' },
  { name: 'Oppo' },
  { name: 'Realme' },
  { name: 'Other' },
];

const BrandLogo: React.FC<{ name: string }> = ({ name }) => {
  switch (name) {
    case 'Apple':
      return (
        <svg viewBox="0 0 170 170" className="h-6 w-6 text-slate-900 fill-current">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.36-6.13-2.92-2.38-6.75-6.93-11.5-13.67-5.13-7.27-9.35-15.19-12.65-23.73-3.3-8.54-4.97-16.79-4.97-24.74 0-11.05 2.76-20.1 8.28-27.15 5.52-7.05 12.39-10.6 20.61-10.6 4.13 0 9.02 1.34 14.65 4.02 5.63 2.68 9.15 3.51 10.56 2.5 1.13-.81 4.79-2.22 10.97-4.24 6.18-2.01 11.26-2.91 15.22-2.7 15.18.96 26.23 6.94 33.15 17.93-13.07 7.9-19.48 18.04-19.23 30.43.25 9.77 3.93 17.84 11.03 24.23 7.1 6.39 15.28 9.94 24.52 10.66-2.07 5.92-4.57 11.52-7.51 16.82zm-30.82-108.41c0 8.04-2.88 15.26-8.63 21.67-5.75 6.4-12.87 9.88-21.36 10.45-.13-.76-.2-1.57-.2-2.42 0-7.82 3.03-15.08 9.1-21.78 6.07-6.71 13.3-10.25 21.71-10.64.13.9.19 1.72.19 2.72z" />
        </svg>
      );
    case 'Samsung':
      return (
        <span className="text-[#074A9B] font-[1000] tracking-widest text-[13px] font-sans italic select-none">SAMSUNG</span>
      );
    case 'OnePlus':
      return (
        <div className="flex items-center gap-1 scale-[0.9] select-none">
          <div className="w-5 h-5 bg-[#F50014] text-white flex items-center justify-center font-black text-xs rounded">1+</div>
          <span className="text-[10px] font-black text-slate-800 tracking-tighter uppercase font-sans">ONEPLUS</span>
        </div>
      );
    case 'Xiaomi':
      return (
        <div className="w-6.5 h-6.5 bg-[#FF6700] rounded-lg flex items-center justify-center text-white font-black relative overflow-hidden text-[11px] select-none">
          mi
        </div>
      );
    case 'Google':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 select-none">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-.1.14-.1.15-1.12 1.49-2.73 2.45-4.51 2.76v2.24h7.02c4.1-3.77 6.74-9.33 6.74-14.88z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.32-2.58c-.92.62-2.11 1-3.61 1-2.77 0-.15-1.14-.15-1.15-3.08-1.85-5.2-4.48-5.92-7.15H2.84v2.87C4.82 19.38 8.16 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.08 11.21c-.22-.65-.34-1.35-.34-2.07s.12-1.42.34-2.07V4.2V1.33H1.84C.66 3.66 0 6.25 0 9s.66 5.34 1.84 7.67l3.24-2.87v-.55c0-.62 0-.62 0-2.04z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 8.16 0 4.82 4.62 2.84 8.78l3.24 2.87c.72-2.67 3.15-5.9 5.92-5.9z"
          />
        </svg>
      );
    case 'Vivo':
      return (
        <span className="text-[#4154F1] font-black tracking-wider text-[14px] font-sans lowercase italic select-none">vivo</span>
      );
    case 'Oppo':
      return (
        <span className="text-[#008A5E] font-extrabold tracking-widest text-[12px] font-sans uppercase select-none">OPPO</span>
      );
    case 'Realme':
      return (
        <div className="flex items-center gap-1 scale-[0.9] select-none">
          <div className="w-5 h-5 bg-[#FFD400] text-black flex items-center justify-center font-black text-[11px] rounded">r</div>
          <span className="text-[9px] font-black text-black tracking-tight uppercase font-sans">realme</span>
        </div>
      );
    case 'Other':
    default:
      return (
        <div className="w-6.5 h-6.5 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 border border-slate-200 font-extrabold text-[11px] select-none">
          ✦
        </div>
      );
  }
};

const DEVICE_TYPES = [
  { name: 'Mobile', icon: <Smartphone className="w-6 h-6" /> },
  { name: 'Laptop', icon: <Laptop className="w-6 h-6" /> },
  { name: 'Tablet', icon: <Tablet className="w-6 h-6" /> },
  { name: 'Watch', icon: <Watch className="w-6 h-6" /> },
];

export const KARNATAKA_DISTRICTS = [
  'Bagalkote',
  'Ballari (Bellary)',
  'Belagavi (Belgaum)',
  'Bengaluru Rural',
  'Bengaluru Urban',
  'Bidar',
  'Chamarajanagar',
  'Chikkaballapur',
  'Chikkamagaluru',
  'Chitradurga',
  'Dakshina Kannada (Mangaluru)',
  'Davanagere',
  'Dharwad (Hubballi-Dharwad)',
  'Gadag',
  'Hassan',
  'Haveri',
  'Kalaburagi (Gulbarga)',
  'Kodagu (Coorg)',
  'Kolar',
  'Koppal',
  'Mandya',
  'Mysuru (Mysore)',
  'Raichur',
  'Ramanagara',
  'Shivamogga (Shimoga)',
  'Tumakuru (Tumkur)',
  'Udupi',
  'Uttara Kannada (Karwar)',
  'Vijayapura (Bijapur)',
  'Vijayanagara',
  'Yadgir'
];

export const BookingForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState('Bengaluru Urban');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deviceType: 'Mobile',
    brand: '',
    model: '',
    imei: '',
    issue: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const booking: Booking = {
        ...formData,
        address: `${selectedDistrict}, Karnataka - ${formData.address}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, 'bookings'), booking);
      setSuccess(true);
    } catch (error) {
      console.error('Error booking:', error);
      alert('Failed to book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hello InstantFix! I've just booked a doorstep repair for my ${formData.brand} ${formData.model}.\nName: ${formData.name}\nIssue: ${formData.issue}\nAddress: ${selectedDistrict}, Karnataka - ${formData.address}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919108466084?text=${encoded}`, '_blank');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900">Select Device Category</h3>
              <p className="text-slate-500">What would you like to repair today?</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {DEVICE_TYPES.map((type) => (
                <button
                  key={type.name}
                  onClick={() => {
                    setFormData({ ...formData, deviceType: type.name });
                    nextStep();
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                    formData.deviceType === type.name 
                      ? 'border-blue-600 bg-blue-50 text-blue-700' 
                      : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-blue-200'
                  }`}
                >
                  {type.icon}
                  <span className="font-bold">{type.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900">Select Brand</h3>
              <p className="text-slate-500">Choose your {formData.deviceType} brand</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {BRANDS.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => {
                    setFormData({ ...formData, brand: brand.name });
                    nextStep();
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3.5 bg-white h-28 ${
                    formData.brand === brand.name 
                      ? 'border-blue-600 shadow-lg shadow-blue-500/10' 
                      : 'border-slate-100 hover:border-blue-200'
                  }`}
                >
                  <div className="h-8 flex items-center justify-center">
                    <BrandLogo name={brand.name} />
                  </div>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{brand.name}</span>
                </button>
              ))}
            </div>
            <button onClick={prevStep} className="flex items-center gap-2 text-slate-500 font-medium hover:text-slate-700">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900">Device Details</h3>
              <p className="text-slate-500">Tell us more about your {formData.brand} {formData.deviceType}</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  {formData.brand === 'Other' ? 'Brand & Model Name' : 'Model Name'}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="text"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder={formData.brand === 'Other' ? 'e.g. Motorola Moto G84, Infinix Note 40' : 'e.g. iPhone 15 Pro, Galaxy S24'}
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">IMEI / Serial Number (Optional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Dial *#06# to find IMEI"
                  value={formData.imei}
                  onChange={(e) => setFormData({ ...formData, imei: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Describe the Issue</label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="What's wrong with your device?"
                  value={formData.issue}
                  onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <button onClick={prevStep} className="flex items-center gap-2 text-slate-500 font-medium hover:text-slate-700">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={nextStep}
                disabled={!formData.model || !formData.issue}
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Contact & Address</h3>
              <p className="text-slate-500">Where in Karnataka should we send our technician?</p>
            </div>

            {/* Karnataka-wide coverage banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3">
              <span className="text-xl">📍</span>
              <div>
                <p className="text-xs text-blue-900 font-extrabold uppercase tracking-wide">Karnataka State Coverage Active</p>
                <p className="text-xs text-blue-700 font-semibold leading-relaxed">
                  We render live doorstep diagnostic and pickup-to-fix services <strong>everywhere across Karnataka (all 31 districts)</strong>!
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <input
                    required
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Karnataka District Dropdown Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Karnataka District / Division</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white font-semibold text-slate-700 appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, bgSize: '1.25rem', backgroundPosition: 'calc(100% - 1rem) center', backgroundRepeat: 'no-repeat' }}
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  {KARNATAKA_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist} District
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Street Address, Pincode & Landmark</label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="Enter specific house/office number, street, nearby landmark, and pincode"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <button onClick={prevStep} className="flex items-center gap-2 text-slate-500 font-medium hover:text-slate-700">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading || !formData.name || !formData.phone || !formData.address}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Booking'}
              </button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="book" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl -ml-32 -mb-32" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
          {/* Progress Bar */}
          {!success && (
            <div className="flex items-center justify-center gap-2 mb-12">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    step >= i ? 'w-12 bg-blue-600' : 'w-8 bg-slate-100'
                  }`}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!success ? (
              <div key="steps">
                {renderStep()}
              </div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-50 rounded-full mb-8">
                  <CheckCircle2 className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
                <p className="text-slate-600 mb-10 max-w-md mx-auto text-lg">
                  Your repair request for <span className="font-bold text-slate-900">{formData.brand} {formData.model}</span> has been received.
                </p>
                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <MessageSquare className="w-6 h-6" />
                    Confirm via WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setStep(1);
                      setFormData({
                        name: '',
                        phone: '',
                        deviceType: 'Mobile',
                        brand: '',
                        model: '',
                        imei: '',
                        issue: '',
                        address: ''
                      });
                    }}
                    className="text-slate-400 text-sm hover:text-slate-600 font-semibold transition-colors"
                  >
                    Make another booking
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
