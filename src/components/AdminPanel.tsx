import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Booking } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  LogOut, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2,
  Phone,
  MapPin,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  MoreHorizontal,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
  Fingerprint
} from 'lucide-react';

interface AdminSession {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: string;
}

export const AdminPanel: React.FC = () => {
  const [user, setUser] = useState<AdminSession | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Login Form States
  const [loginMethod, setLoginMethod] = useState<'pin' | 'password'>('pin');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorCode, setErrorCode] = useState('');

  useEffect(() => {
    // 1. Check local storage for persistent sandbox admin login session
    const storedAdmin = localStorage.getItem('instantfix_admin_session');
    if (storedAdmin) {
      try {
        setUser(JSON.parse(storedAdmin));
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('instantfix_admin_session');
      }
    }

    // 2. Fallback to Firebase Google auth check if it was previously established
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        const adminSession: AdminSession = {
          uid: u.uid,
          displayName: u.displayName || 'Authorized Admin',
          email: u.email || 'admin@withinstafix.com',
          photoURL: u.photoURL || undefined,
          role: 'administrator'
        };
        setUser(adminSession);
        localStorage.setItem('instantfix_admin_session', JSON.stringify(adminSession));
      } else {
        if (!localStorage.getItem('instantfix_admin_session')) {
          setUser(null);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      setBookings(data);
    });

    return () => unsubscribe();
  }, [user]);

  // Support Keyboard numeric entries for the PIN
  useEffect(() => {
    if (loginMethod !== 'pin' || user) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        if (pin.length < 6) {
          setPin(prev => prev + e.key);
          setErrorCode('');
        }
      } else if (e.key === 'Backspace') {
        setPin(prev => prev.slice(0, -1));
        setErrorCode('');
      } else if (e.key === 'Enter') {
        if (pin.length >= 5) {
          submitPin(pin);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, loginMethod, user]);

  const submitPin = (enteredPin: string) => {
    if (enteredPin === '91084' || enteredPin === '123456') {
      const adminSession: AdminSession = {
        uid: 'passcode-admin',
        displayName: 'InstantFix Administrator',
        email: 'partner@withinstafix.com',
        role: 'administrator'
      };
      setUser(adminSession);
      localStorage.setItem('instantfix_admin_session', JSON.stringify(adminSession));
      setErrorCode('');
      setPin('');
    } else {
      setErrorCode('Invalid PIN passcode entered. Please try again.');
      setPin('');
    }
  };

  const handleKeyPress = (num: string) => {
    setErrorCode('');
    if (pin.length < 6) {
      const nextPin = pin + num;
      setPin(nextPin);
      // Auto-validate if exact length of standard passcode is reached
      if (nextPin === '91084') {
        submitPin(nextPin);
      } else if (nextPin.length === 6) {
        submitPin(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setErrorCode('');
  };

  const handleLoginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google login failed inside sandsbox:', error);
      setErrorCode('Popup blocked or Google Login aborted by system.');
    }
  };

  const handleCredentialLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (email === 'admin@withinstafix.com' || email === 'admin') && 
      (password === 'admin123' || password === 'admin')
    ) {
      const adminSession: AdminSession = {
        uid: 'credential-admin',
        displayName: 'InstantFix System Admin',
        email: 'admin@withinstafix.com',
        role: 'administrator'
      };
      setUser(adminSession);
      localStorage.setItem('instantfix_admin_session', JSON.stringify(adminSession));
      setErrorCode('');
      setEmail('');
      setPassword('');
    } else {
      setErrorCode('Invalid email credentials or master password.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('instantfix_admin_session');
    setUser(null);
    auth.signOut();
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const deleteBooking = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteDoc(doc(db, 'bookings', id));
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         b.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || b.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-slate-850 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
          {/* Subtle decoration lines */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600"></div>
          
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin Gatekeeper</h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">Verify your administrative or partner credentials</p>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-6">
            <button
              onClick={() => { setLoginMethod('pin'); setErrorCode(''); setPin(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                loginMethod === 'pin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Fingerprint className="w-3.5 h-3.5" />
              Numeric PIN
            </button>
            <button
              onClick={() => { setLoginMethod('password'); setErrorCode(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                loginMethod === 'password' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              Standard Login
            </button>
          </div>

          {/* Error Message banner */}
          <AnimatePresence mode="wait">
            {errorCode && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-xs font-semibold mb-4 text-center border border-red-150 flex items-center justify-center gap-1.5"
              >
                ⚠️ {errorCode}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Render Login Methods */}
          {loginMethod === 'pin' ? (
            <div className="space-y-6">
              {/* Display circles */}
              <div className="flex justify-center gap-4 py-2">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-3 w-3 rounded-full border-2 transition-all duration-150 ${
                      i < pin.length 
                        ? 'bg-blue-600 border-blue-600 scale-125' 
                        : 'border-slate-350 bg-slate-100'
                    }`}
                  />
                ))}
              </div>

              {/* Pin Pad Grid */}
              <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeyPress(num)}
                    className="h-14 w-14 rounded-full bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-800 text-lg font-bold transition-all flex items-center justify-center hover:scale-105 active:scale-95 border border-slate-200/50"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={handleBackspace}
                  className="h-14 w-14 rounded-full text-slate-500 font-bold hover:text-red-500 transition-colors flex items-center justify-center text-xs hover:bg-slate-55"
                >
                  Clear
                </button>
                <button
                  onClick={() => handleKeyPress('0')}
                  className="h-14 w-14 rounded-full bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-800 text-lg font-bold transition-all flex items-center justify-center hover:scale-105 active:scale-95 border border-slate-200/50"
                >
                  0
                </button>
                <button
                  onClick={() => {
                    if (pin.length >= 5) submitPin(pin);
                  }}
                  className="h-14 w-14 rounded-full text-blue-600 hover:text-blue-700 font-extrabold text-xs flex items-center justify-center"
                >
                  Enter
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCredentialLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input
                  required
                  type="text"
                  placeholder="admin@withinstafix.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium bg-white text-slate-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Master Password</label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium bg-white text-slate-800 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-850 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-slate-900/10 mt-6"
              >
                Authenticate Session
              </button>
            </form>
          )}

          {/* Demo Credentials Box */}
          <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-3 text-[11px] text-slate-500 text-left">
            <p className="font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Lock className="w-3 h-3 text-blue-500" /> Demo Admin Gate Credentials:
            </p>
            <ul className="list-disc list-inside space-y-0.5 pl-1">
              <li>Quick Code PIN: <code className="font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded font-bold">91084</code> or <code className="font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded font-bold">123456</code></li>
              <li>Email Logins: <code className="font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded font-bold">admin@withinstafix.com</code> + Password: <code className="font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded font-bold">admin123</code></li>
            </ul>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <span className="relative px-3 bg-white text-[10px] text-slate-400 font-bold uppercase tracking-wider">or integration fallback</span>
          </div>

          <button
            onClick={handleLoginGoogle}
            className="w-full border border-slate-200 hover:bg-slate-50 py-3 rounded-xl text-xs font-semibold text-slate-600 transition-all flex items-center justify-center gap-2 bg-white"
          >
            Authenticate with Google Enterprise
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Booking Dashboard</h1>
            <p className="text-slate-500">Manage repair requests and status</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-xs">
              {user.photoURL ? (
                <img src={user.photoURL} className="w-6 h-6 rounded-full object-cover border border-slate-100" alt="" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-[11px] uppercase shadow-sm shrink-0">
                  {user.displayName.charAt(0)}
                </div>
              )}
              <span className="text-xs font-semibold text-slate-755">{user.displayName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-black/5 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredBookings.map((booking) => (
              <motion.div
                layout
                key={booking.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white p-6 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                      {booking.deviceType === 'Mobile' && <Smartphone className="w-6 h-6" />}
                      {booking.deviceType === 'Laptop' && <Laptop className="w-6 h-6" />}
                      {booking.deviceType === 'Tablet' && <Tablet className="w-6 h-6" />}
                      {booking.deviceType === 'Watch' && <Watch className="w-6 h-6" />}
                      {!['Mobile', 'Laptop', 'Tablet', 'Watch'].includes(booking.deviceType) && <Smartphone className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900">{booking.name}</h3>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {booking.brand} {booking.model}
                        </span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          booking.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" />
                          {booking.phone}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {booking.address}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                        {booking.imei && (
                          <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                            IMEI: {booking.imei}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-900">Issue:</span> {booking.issue}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateStatus(booking.id!, 'completed')}
                      className={`p-2 rounded-lg transition-all ${
                        booking.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'
                      }`}
                      title="Mark as Completed"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id!, 'cancelled')}
                      className={`p-2 rounded-lg transition-all ${
                        booking.status === 'cancelled' ? 'bg-red-500 text-white' : 'bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600'
                      }`}
                      title="Mark as Cancelled"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteBooking(booking.id!)}
                      className="p-2 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
                      title="Delete Booking"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
              <p className="text-slate-400">No bookings found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
