import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Scale, 
  Menu, 
  X, 
  Map as MapIcon, 
  MessageSquare, 
  Users, 
  Bot, 
  Gavel, 
  FileText, 
  ShieldCheck, 
  Check, 
  CheckCircle, 
  Shield, 
  Zap, 
  HeartHandshake, 
  Quote, 
  AlertOctagon, 
  Search, 
  Star, 
  Paperclip, 
  Send, 
  MoreVertical, 
  User, 
  FileCheck, 
  AlertCircle, 
  Building, 
  Briefcase, 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  TrendingUp,
  LucideIcon,
  Globe,
  ChevronDown
} from 'lucide-react';
import { ClickSpark } from './components/ClickSpark';
import { IndiaMap } from './components/IndiaMap';
import { GenericBarChart } from './components/GenericBarChart';
import { LawyerCard } from './components/LawyerCard';
import { StatCard } from './components/StatCard';
import { ChatMessage } from './components/ChatMessage';
import { INDIA_LANGUAGES, TRANSLATIONS, casesLabels, casesData, advLabels, advData, caseDataMap } from './data/constants';
import DocExplainer from '../components/DocExplainer';
import BookingModal from '../components/BookingModal';
import FIRFormBuilder from '../components/FIRFormBuilder';
import CourtLocator from '../components/CourtLocator';
import LegalDictionary from '../components/LegalDictionary';
import CaseStatusTracker from '../components/CaseStatusTracker';
// --- Main App Component ---

export default function App() {
  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email' | null>(null);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [selectedState, setSelectedState] = useState<string>('Delhi');
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [selectedLawyer, setSelectedLawyer] = useState<any>(null);

  useEffect(() => {
  const handleNavigate = (e: any) => {
    setActiveTab(e.detail);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  window.addEventListener('navigate-tab', handleNavigate);
  return () => window.removeEventListener('navigate-tab', handleNavigate);
}, []);

  
  // Helper to get current translation
  const t = TRANSLATIONS[selectedLanguage] || TRANSLATIONS["English"];

    const handleEmailAuth = async () => {
  try {
    if (isSignUp) {
      // Sign up
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        createdAt: new Date()
      });
      setCurrentUser(userCredential.user);
      alert("Account created successfully!");
    } else {
      // Login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      alert("Login successful!");
    }
    setShowLoginDialog(false);
    setLoginMethod(null);
    setEmail('');
    setPassword('');
  } catch (error: any) {
    alert(error.message);
  }
};
  const handleSendOTP = async () => {
  try {
    const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible'
    });
    
    const confirmationResult = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
    window.confirmationResult = confirmationResult;
    alert("OTP sent successfully!");
    setOtpSent(true);
  } catch (error) {
    console.error("Error sending OTP:", error);
  alert("Failed to send OTP. Please try again.");
}
};
  const handleVerifyOTP = async () => {
  try {
    const result = await window.confirmationResult.confirm(otp);
    setCurrentUser(result.user);
    await setDoc(doc(db, "users", result.user.uid), {
      phoneNumber: phoneNumber,
      createdAt: new Date()
    });
    alert("Login successful!");
    setShowLoginDialog(false);
    setLoginMethod(null);
    setOtpSent(false);
    setOtp('');
    setPhoneNumber('');
  } catch (error) {
    console.error("Error verifying OTP:", error);
    alert("Invalid OTP. Please try again.");
  }
};

return (
  <ClickSpark
    sparkColor='#D4AF37'
    sparkSize={12}
    sparkRadius={20}
    sparkCount={12}
    duration={500}
  >
    <div className="font-sans antialiased bg-slate-50 min-h-screen flex flex-col selection:bg-sky-100 selection:text-sky-900">
      {/* Styles for fonts & animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Merriweather', serif; }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .google-visualization-tooltip {
            border-radius: 8px !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
            font-family: 'Inter', sans-serif !important;
            padding: 12px !important;
        }

        /* Animations */
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .fade-in { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
              <div className="bg-slate-900 p-2.5 rounded-xl text-white shadow-lg shadow-slate-900/20 group-hover:scale-105 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif font-bold text-2xl text-slate-900 tracking-tight">Nyaymitra</span>
                <span className="text-[10px] block text-sky-600 font-bold tracking-[0.2em] uppercase mt-0.5">Legal Intelligence</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-1 items-center bg-slate-50/80 p-1.5 rounded-full border border-slate-200 mr-2">
              {[
                { id: 'home', label: t.nav.home },
                { id: 'overview', label: t.nav.overview },
                { id: 'services', label: t.nav.services },
                { id: 'lawyers', label: t.nav.lawyers },
                { id: 'cases', label: t.nav.cases },
                { id: 'fir', label: t.nav.fir },
                { id: 'court-locator', label: t.nav.courts },
                { id: 'lexicon', label: t.nav.dictionary},
                { id: 'case-tracker', label: 'Track Case' },
               ].map((tab) => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)} 
                  className={`
                    cursor-pointer font-medium transition-all duration-300 text-sm px-4 py-2 rounded-full
                    ${activeTab === tab.id 
                      ? 'text-white bg-slate-900 shadow-md' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white'}
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm border border-slate-200 px-3 py-2 rounded-full hover:bg-slate-50 transition-colors">
                  <Globe className="w-4 h-4" />
                  <span className="hidden xl:inline">{selectedLanguage.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </button>
                {/* Dropdown Content */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-96 overflow-y-auto transform origin-top-right scale-95 group-hover:scale-100">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100">Select Language</div>
                    {INDIA_LANGUAGES.map(lang => (
                      <button 
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`block w-full text-left px-4 py-2.5 text-sm transition-colors
                          ${selectedLanguage === lang ? 'bg-sky-50 text-sky-700 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          {lang}
                          {selectedLanguage === lang && <Check className="w-3 h-3 text-sky-600" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            
            {currentUser ? (
<div className="flex items-center gap-3">
  <span className="text-slate-700 text-sm font-medium">{currentUser.email}</span>
  <button onClick={() => { auth.signOut(); setCurrentUser(null); }} className="bg-rose-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-rose-700 transition-all text-sm">
    Logout
  </button>
</div>
) : (
<button onClick={() => setShowLoginDialog(true)} className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-slate-800 transition-all text-sm shadow-lg shadow-slate-900/20">
  {t.nav.login}
</button>
)}

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 hover:text-slate-900 p-2">
                {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 absolute w-full shadow-2xl h-[calc(100vh-80px)] z-50 overflow-y-auto">
            <div className="px-4 pt-6 pb-6 space-y-4">
              {[
                { id: 'home', label: t.nav.home },
                { id: 'overview', label: t.nav.overview },
                { id: 'services', label: t.nav.services },
                { id: 'lawyers', label: t.nav.lawyers },
                { id: 'cases', label: t.nav.cases },
                { id: 'fir', label: 'File FIR' },
                { id: 'court-locator', label: 'Find Courts' },
                { id: 'lexicon', label: 'Legal Lexicon' },
                { id: 'case-tracker', label: 'Track Case' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-4 py-4 rounded-xl text-lg font-medium text-slate-600 hover:bg-slate-50 hover:text-sky-900 capitalize border border-transparent hover:border-slate-100"
                >
                  {tab.label}
                </button>
              ))}
              
            <div className="pt-4 border-t border-slate-100">
<div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Language</div>
<div className="grid grid-cols-2 gap-2 px-2">
  {INDIA_LANGUAGES.slice(0, 6).map(lang => (
    <button 
      key={lang}
      onClick={() => { setSelectedLanguage(lang); setMobileMenuOpen(false); }}
      className={selectedLanguage === lang 
? 'text-left px-3 py-2 rounded-lg text-sm border bg-sky-50 border-sky-200 text-sky-700' 
: 'text-left px-3 py-2 rounded-lg text-sm border border-slate-100 text-slate-600'
}
    >
      {lang.split(' ')[0]}
    </button>
  ))}
</div>
</div>

<div className="pt-6 border-t border-slate-100">
{currentUser ? (
  <div className="space-y-3">
    <p className="text-sm text-slate-600 text-center">{currentUser.email}</p>
    <button onClick={() => { auth.signOut(); setCurrentUser(null); setMobileMenuOpen(false); }} className="w-full bg-rose-600 text-white px-4 py-4 rounded-xl font-bold text-lg">
      Logout
    </button>
  </div>
) : (
  <button onClick={() => setShowLoginDialog(true)} className="w-full bg-slate-900 text-white px-4 py-4 rounded-xl font-bold text-lg shadow-xl shadow-slate-900/10">{t.nav.login}</button>
)}
</div>
      </div> {/* End of Mobile Menu Panel content div */}
            </div> 
          )}
        </div> {/* End of max-w-7xl div */}
      </nav>
      {/* Main Content */}
      <main className="pt-20 flex-1 relative overflow-x-hidden">
        
        {/* HOME SECTION */}
        {activeTab === 'home' && (
          <section className="fade-in">
            {/* Hero - CENTERED & MODERNIZED */}
            <div className="relative bg-slate-900 overflow-hidden pb-32 pt-20 lg:pt-32">
              {/* Background Decoration */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-[-50%] left-[-20%] w-[1000px] h-[1000px] rounded-full bg-sky-500/20 blur-3xl"></div>
                  <div className="absolute bottom-[-50%] right-[-20%] w-[1000px] h-[1000px] rounded-full bg-indigo-500/20 blur-3xl"></div>
                  <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.1}}></div>
              </div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full mb-8 animate-slide-up">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                  <span className="text-sm font-semibold text-sky-300 tracking-wide uppercase">{t.hero.tag}</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-8 animate-slide-up delay-100 drop-shadow-2xl">
                  {t.hero.title1} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-200 to-sky-400">{t.hero.title2}</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12 animate-slide-up delay-200">
                  {t.hero.sub}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-300">
                  <button onClick={() => setActiveTab('services')} className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-sky-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 group">
                    <MessageSquare className="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" /> {t.hero.btnAI}
                  </button>
                  <button onClick={() => setActiveTab('lawyers')} className="bg-slate-800/50 backdrop-blur-md text-white border border-slate-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-700 transition-all flex items-center justify-center gap-3">
                    <Users className="w-5 h-5 text-slate-400" /> {t.hero.btnLawyer}
                  </button>
                </div>

                {/* Hero Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-slate-800/50 pt-12 animate-slide-up delay-300">
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">50k+</div>
                      <div className="text-sm text-slate-400">{t.hero.stats1}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">24/7</div>
                      <div className="text-sm text-slate-400">{t.hero.stats2}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">500+</div>
                      <div className="text-sm text-slate-400">{t.hero.stats3}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">10+</div>
                      <div className="text-sm text-slate-400">{t.hero.stats4}</div>
                    </div>
                </div>
              </div>
            </div>

              {/* Features Grid */}
              <div className="bg-slate-50 py-20">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32 relative z-20">
                        <div onClick={() => setActiveTab('services')} className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-sky-200 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                          <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-6 relative z-10 group-hover:-translate-y-1 transition-transform">
                            <Bot className="w-7 h-7" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">{t.features.title1}</h3>
                          <p className="text-slate-500 leading-relaxed relative z-10">{t.features.desc1}</p>
                        </div>

                        <div onClick={() => setActiveTab('lawyers')} className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                          <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 relative z-10 group-hover:-translate-y-1 transition-transform">
                            <Gavel className="w-7 h-7" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">{t.features.title2}</h3>
                          <p className="text-slate-500 leading-relaxed relative z-10">{t.features.desc2}</p>
                        </div>

                        <div onClick={() => setActiveTab('services')} className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 relative z-10 group-hover:-translate-y-1 transition-transform">
                            <FileText className="w-7 h-7" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">{t.features.title3}</h3>
                          <p className="text-slate-500 leading-relaxed relative z-10">{t.features.desc3}</p>
                        </div>
                      </div>
                  </div>
              </div>

            {/* --- NYAYMITRA AI DOCUMENT SIMPLIFIER --- */}
            <div className="bg-white py-24 border-b border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[3rem] p-1 shadow-2xl overflow-hidden">
                  <div className="bg-white rounded-[2.9rem] p-8 md:p-16">
                    <div className="flex flex-col items-center text-center mb-12">
                      <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full mb-6">
                        <Zap className="w-4 h-4 fill-current" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">NyayMitra Intelligence</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
                        Know Your Rights, <span className="text-indigo-600">Simplified.</span>
                      </h2>
                      <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
                        Don't let complex legal jargon stop you. Paste your document or clauses below, and our AI will translate them into plain, simple language instantly.
                      </p>
                    </div>

                    {/* THE COMPONENT */}
                    <DocExplainer />
                    
                    <div className="mt-10 flex flex-wrap justify-center gap-8 opacity-50 grayscale">
                       <div className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="w-5 h-5"/> Secure Processing</div>
                       <div className="flex items-center gap-2 text-sm font-medium"><Scale className="w-5 h-5"/> Indian Law Context</div>
                       <div className="flex items-center gap-2 text-sm font-medium"><Zap className="w-5 h-5"/> Instant Analysis</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

              {/* HOW IT WORKS SECTION */}
              <div className="bg-white py-20 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <span className="text-sky-600 font-bold tracking-widest uppercase text-sm">{t.process.tag}</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-2">{t.process.title}</h2>
                    <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">{t.process.sub}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>

                    {/* Step 1 */}
                    <div className="relative flex flex-col items-center text-center">
                      <div className="w-24 h-24 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm z-10">
                        <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center text-sky-600">
                          <MessageSquare className="w-8 h-8" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{t.process.step1}</h3>
                      <p className="text-slate-500 leading-relaxed">{t.process.desc1}</p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col items-center text-center">
                      <div className="w-24 h-24 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm z-10">
                        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                          <FileText className="w-8 h-8" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{t.process.step2}</h3>
                      <p className="text-slate-500 leading-relaxed">{t.process.desc2}</p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col items-center text-center">
                      <div className="w-24 h-24 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm z-10">
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                          <Users className="w-8 h-8" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{t.process.step3}</h3>
                      <p className="text-slate-500 leading-relaxed">{t.process.desc3}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* NEW GRAPH SECTION (TWO COLUMNS) */}
              <div className="bg-slate-50 border-y border-slate-200 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-serif font-bold text-slate-900">{t.data.title}</h2>
                    <p className="text-slate-500 mt-2">{t.data.sub}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Card 1: Total Cases */}
                    <div className="bg-white rounded-md shadow-lg border border-slate-100 overflow-hidden">
                        <div className="bg-[#1D8CF8] p-6 text-white relative h-32 flex flex-col justify-center">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold opacity-90">{t.data.cardCases}</h3>
                                <p className="text-5xl font-extrabold mt-1 tracking-tight">5139</p>
                            </div>
                            <Gavel className="absolute right-4 bottom-[-10px] w-32 h-32 opacity-20 transform -rotate-12 text-black" />
                        </div>
                        <div className="p-6 bg-white">
                            <h4 className="text-center font-serif text-xl text-slate-700 mb-2">{t.data.cardCases}</h4>
                            <p className="text-center text-xs text-slate-400 mb-4">{t.data.subDist}</p>
                            <GenericBarChart labels={casesLabels} data={casesData} label="Cases" />
                        </div>
                    </div>

                    {/* Card 2: Total Advocates */}
                    <div className="bg-white rounded-md shadow-lg border border-slate-100 overflow-hidden">
                        <div className="bg-[#1D8CF8] p-6 text-white relative h-32 flex flex-col justify-center">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold opacity-90">{t.data.cardAdv}</h3>
                                <p className="text-5xl font-extrabold mt-1 tracking-tight">9937</p>
                            </div>
                            <Scale className="absolute right-4 bottom-[-10px] w-32 h-32 opacity-20 text-black" />
                        </div>
                        <div className="p-6 bg-white">
                            <h4 className="text-center font-serif text-xl text-slate-700 mb-2">{t.data.cardAdv}</h4>
                            <p className="text-center text-xs text-slate-400 mb-4">{t.data.subDist}</p>
                            <GenericBarChart labels={advLabels} data={advData} label="Advocates" />
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Credibility Section (Map on Home) */}
              <div className="bg-slate-900 py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    {/* Abstract grid pattern */}
                    <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-sky-500/20 p-2 rounded-lg backdrop-blur-sm border border-sky-500/30">
                          <TrendingUp className="w-6 h-6 text-sky-400" />
                        </div>
                        <span className="text-sky-400 font-bold tracking-widest uppercase text-sm">{t.map.tag}</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                        {t.map.title} <br/> {t.map.titleBr}
                      </h2>
                      <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        {t.map.desc}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-6 mb-10">
                        <div>
                          <div className="text-3xl font-bold text-white mb-1">4.5Cr+</div>
                          <div className="text-sm text-slate-500 font-medium uppercase">{t.map.pending}</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-white mb-1">74%</div>
                          <div className="text-sm text-slate-500 font-medium uppercase">{t.map.clearance}</div>
                        </div>
                      </div>

                      <button onClick={() => setActiveTab('cases')} className="group text-white font-bold text-lg flex items-center gap-3 hover:gap-4 transition-all">
                        {t.map.btn} <ArrowRight className="w-5 h-5 text-sky-400" />
                      </button>
                    </div>

                    {/* Visual Map Teaser - RESTORED MAP */}
                    <div className="relative">
                      <div className="absolute -inset-4 bg-sky-500/10 rounded-full blur-3xl"></div>
                      <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl border border-slate-700/50 p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-sm font-medium text-slate-300">{t.map.legend}</div>
                            <div className="flex gap-2">
                              <div className="w-3 h-3 rounded-full bg-sky-900 border border-slate-600"></div>
                              <div className="w-3 h-3 rounded-full bg-sky-400"></div>
                            </div>
                        </div>
                        {/* Simplified Map for Home */}
                        <IndiaMap containerHeight="400px" colorStart="#1e293b" colorEnd="#38bdf8" /> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CASES MAP SECTION (Detailed) */}
          {activeTab === 'cases' && (
            <section className="fade-in bg-slate-50 min-h-[calc(100vh-80px)]">
              <div className="bg-white border-b border-slate-200 py-8">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-900">National Judicial Data Grid</h2>
                    <p className="text-slate-500 mt-1">Live analytics of Indian courts.</p>
                  </div>
                  <div className="flex gap-2">
                      <button className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200">Export Report</button>
                      <button className="px-4 py-2 bg-sky-50 text-sky-700 rounded-lg text-sm font-medium border border-sky-100">Live View</button>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start h-full">
                  {/* Map Container */}
                  <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-200 p-2 min-h-[600px] flex items-center justify-center relative">
                    <IndiaMap 
                      onSelectState={setSelectedState} 
                      containerHeight="600px" 
                      colorStart="#e0f2fe" 
                      colorEnd="#dc2626"
                    />
                    <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur p-3 rounded-lg border border-slate-100 text-xs text-slate-500 shadow-sm">
                      Source: National Judicial Data Grid (2026 Projections)
                    </div>
                  </div>

                  {/* Stats Panel */}
                  <div className="w-full lg:w-1/3 space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-8 sticky top-24">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                          <MapPin className="w-8 h-8 text-slate-400" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Analysis For</h3>
                          <h2 className="text-3xl font-serif font-bold text-slate-900">{selectedState}</h2>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {caseDataMap[selectedState] ? (
                          <>
                            <StatCard 
                              icon={AlertOctagon} 
                              title={t.map.pending}
                              subTitle="Active Litigation" 
                              value={caseDataMap[selectedState].pending} 
                              bgClass="bg-white" 
                              colorClass="text-rose-600"
                              iconColorClass="text-rose-600 bg-rose-50"
                            />
                            <StatCard 
                              icon={CheckCircle} 
                              title="Disposed (YTD)" 
                              subTitle="Resolved This Year" 
                              value={caseDataMap[selectedState].disposed} 
                              bgClass="bg-white" 
                              colorClass="text-emerald-600"
                              iconColorClass="text-emerald-600 bg-emerald-50"
                            />
                            <StatCard 
                              icon={Building} 
                              title="Judge Vacancy" 
                              subTitle="Open Positions" 
                              value={caseDataMap[selectedState].vacancy} 
                              bgClass="bg-white" 
                              colorClass="text-blue-600"
                              iconColorClass="text-blue-600 bg-blue-50"
                            />
                          </>
                        ) : (
                          <p className="text-slate-500">Select a state to see data</p>
                        )}
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-slate-100">
                        <h4 className="font-bold text-slate-900 mb-2">Need legal help in {selectedState}?</h4>
                        <p className="text-sm text-slate-500 mb-4">We have 45 verified lawyers available in this region.</p>
                        <button onClick={() => setActiveTab('lawyers')} className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-sky-600 transition-colors">Connect Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* LAWYERS SECTION */}
          {activeTab === 'lawyers' && (
            <section className="fade-in bg-slate-50 pb-20 min-h-screen">
              <div className="bg-slate-900 text-white py-16 mb-10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                  <h2 className="text-4xl font-serif font-bold">{t.hero.btnLawyer}</h2>
                  <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">{t.features.desc2}</p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Filters */}
                <div className="flex gap-2 w-full md:w-auto p-2 overflow-x-auto">
  <select className="bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer">
    <option>{t.lawyers.allSpecialties}</option>
    <option>{t.lawyers.criminalLaw}</option>
    <option>{t.lawyers.civilLaw}</option>
    <option>{t.lawyers.familyLaw}</option>
    <option>{t.lawyers.corporateLaw}</option>
  </select>
  <select className="bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer">
    <option>{t.lawyers.anyLocation}</option>
    <option>Delhi NCR</option>
    <option>Mumbai</option>
    <option>Bangalore</option>
  </select>
</div>
<div className="relative w-full md:w-80 p-2">
  <input 
    type="text" 
    placeholder={t.lawyers.searchPlaceholder}
    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-transparent focus:bg-white hover:border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all" 
  />
  <Search className="w-4 h-4 text-slate-400 absolute left-6 top-5" />
</div>
              {/* Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <LawyerCard 
    name="Adv. Rajesh Kumar" 
    type="High Court, Delhi" 
    location="Delhi" 
    rating="4.9" 
    cases="120+" 
    imageSeed="Rajesh" 
    tags={['Criminal', 'Family', 'Bail']} 
    bookBtnText={t.lawyers.bookNow || "Book Consultation"}
    onBook={() => {
      setSelectedLawyer({
        name: "Adv. Rajesh Kumar",
        type: "High Court, Delhi",
        rating: "4.9",
        cases: "120+",
        imageSeed: "Rajesh"
      });
      setShowBookingModal(true);
    }}
  />
  <LawyerCard 
    name="Adv. Priya Sharma" 
    type="Supreme Court" 
    location="New Delhi" 
    rating="5.0" 
    cases="85" 
    imageSeed="Priya&gender=female" 
    tags={['Corporate', 'IPR', 'Mergers']} 
    bookBtnText="Book Consultation"
    onBook={() => {
      setSelectedLawyer({
        name: "Adv. Priya Sharma",
        type: "Supreme Court",
        rating: "5.0",
        cases: "85",
        imageSeed: "Priya&gender=female"
      });
      setShowBookingModal(true);
    }}
  />
  <LawyerCard 
    name="Adv. Amit Verma" 
    type="District Court" 
    location="Noida" 
    rating="4.7" 
    cases="200+" 
    imageSeed="Amit" 
    tags={['Property', 'Civil', 'RERA']} 
    bookBtnText="Book Consultation"
    onBook={() => {
      setSelectedLawyer({
        name: "Adv. Amit Verma",
        type: "District Court",
        rating: "4.7",
        cases: "200+",
        imageSeed: "Amit"
      });
      setShowBookingModal(true);
    }}
  />
  <LawyerCard 
    name="Adv. Sarah Khan" 
    type="Family Court" 
    location="Mumbai" 
    rating="4.8" 
    cases="150+" 
    imageSeed="Sarah&gender=female" 
    tags={['Divorce', 'Custody', 'Wills']} 
    bookBtnText="Book Consultation"
    onBook={() => {
      setSelectedLawyer({
        name: "Adv. Sarah Khan",
        type: "Family Court",
        rating: "4.8",
        cases: "150+",
        imageSeed: "Sarah&gender=female"
      });
      setShowBookingModal(true);
    }}
  />
  <LawyerCard 
    name="Adv. Vikram Singh" 
    type="High Court" 
    location="Bangalore" 
    rating="4.6" 
    cases="90+" 
    imageSeed="Vikram" 
    tags={['Cyber Crime', 'Fraud']} 
    bookBtnText="Book Consultation"
    onBook={() => {
      setSelectedLawyer({
        name: "Adv. Vikram Singh",
        type: "High Court",
        rating: "4.6",
        cases: "90+",
        imageSeed: "Vikram"
      });
      setShowBookingModal(true);
    }}
  />
</div>
</div>
</section>
)}

    <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      {[{ 
    icon: FileText,
    title: t.services.aiTitle || "Legal Document Simplifier",  
    text: t.services.aiDesc || "Upload any legal document and get instant simplified explanation in plain language.",
    color: "indigo",
    action: () => {
      setActiveTab('home');
      setTimeout(() => {
        document.querySelector('.bg-gradient-to-br')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  },
  {
  icon: Users, 
  title: t.services.lawyerTitle || "Find Verified Lawyers",  // ✅
  text: t.services.lawyerDesc || "Connect with experienced lawyers across India for personalized legal consultation.",  // ✅
  color: "amber",
  action: () => setActiveTab('lawyers')
  },
  { 
  icon: MapIcon, 
  title: t.services.analyticsTitle || "Case Analytics",  // ✅
  text: t.services.analyticsDesc || "View live statistics of pending cases and judicial data across Indian states.",  // ✅
  color: "sky",
  action: () => setActiveTab('cases') 
  }
].map((s, i) => (
  <div 
    key={i} 
    onClick={s.action}
    className={`group border border-slate-100 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white relative overflow-hidden`}
  >
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${s.color}-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500`}></div>
    <div className={`w-14 h-14 bg-${s.color}-50 rounded-2xl flex items-center justify-center text-${s.color}-600 mb-6 relative z-10`}>
      <s.icon className="w-7 h-7" />
    </div>
    <h3 className="font-bold text-xl mb-3 text-slate-900 relative z-10">{s.title}</h3>
    <p className="text-slate-500 mb-6 leading-relaxed relative z-10">{s.text}</p>
    <span className={`text-${s.color}-600 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all relative z-10`}>
      Explore Now <ArrowRight className="w-4 h-4" />
    </span>
  </div>
))}
</div>
        {/* OVERVIEW SECTION (About) */}
        {activeTab === 'overview' && (
          <section className="fade-in bg-white min-h-screen">
              {/* Simple About Content */}
              <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-serif font-bold mb-6">{t.overview.title}</h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                {t.overview.description}
                </p>
              </div>
              <div className="bg-slate-50 py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                      <ShieldCheck className="w-12 h-12 text-sky-600 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">{t.overview.section1Title}</h3>
                      <p className="text-slate-500">{t.overview.section1Desc}</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                      <Zap className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">{t.overview.section2Title}</h3>
                      <p className="text-slate-500">{t.overview.section2Desc}</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                      <HeartHandshake className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">{t.overview.section3Title}</h3>
                      <p className="text-slate-500">{t.overview.section3Desc}</p>
                    </div>
                </div>
              </div>
          </section>
        )}
      {/* FIR SECTION */}
        {activeTab === 'fir' && (
          <section className="fade-in bg-slate-50 py-20 min-h-screen">
            <FIRFormBuilder />
          </section>
        )}
         
          {/* COURT LOCATOR SECTION */}
        {activeTab === 'court-locator' && (
          <section className="fade-in bg-slate-50 py-20 min-h-screen">
            <CourtLocator />
          </section>
        )}

        {/* LEGAL LEXICON SECTION */}
{activeTab === 'lexicon' && (
  <LegalDictionary />
)}
          {/* CASE STATUS TRACKER SECTION */}
{activeTab === 'case-tracker' && (
  <CaseStatusTracker />
)}
      </main>

        
        {/* Login Dialog */}
{showLoginDialog && (
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
    <button onClick={() => { setShowLoginDialog(false); setLoginMethod(null); }} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
      <X className="w-6 h-6" />
    </button>
    
    <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
    <p className="text-slate-500 mb-6">Login to access your account</p>
    <div id="recaptcha-container"></div>
    

    {!loginMethod && (
<div className="space-y-4">
    <button onClick={() => { setLoginMethod('phone'); setOtpSent(false); setOtp(''); setPhoneNumber(''); }} className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition">              
    {isSignUp ? "Sign up with Phone" : "Login with Phone"}
  </button>
  <button onClick={() => setLoginMethod('email')} className="w-full border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition">
    {isSignUp ? "Sign up with Email" : "Login with Email"}
  </button>

  {/* THIS IS THE NEW TOGGLE YOU PASTE BELOW THE BUTTONS */}
  <p className="text-center mt-6 text-slate-500 text-sm">
    {isSignUp ? "Already have an account?" : "New to Nyaymitra?"}
    <button 
      type="button"
      onClick={() => setIsSignUp(!isSignUp)}
      className="ml-2 text-sky-600 font-bold hover:underline"
    >
      {isSignUp ? "Login here" : "Sign up here"}
    </button>
  </p>
</div>
)}

{/* ADD THIS NEW SECTION BELOW FOR THE EMAIL INPUTS */}
{loginMethod === 'email' && (
<div className="space-y-4">
  <input 
    type="email" 
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
  />
  <input 
    type="password" 
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
  />
  <button 
    onClick={handleEmailAuth}
    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
  >
    {isSignUp ? "Create Account" : "Login"}
  </button>
  <button 
    onClick={() => setLoginMethod(null)}
    className="w-full text-slate-500 text-sm mt-2"
  >
    ← Back to options
  </button>
</div>
)}
  {loginMethod === 'phone' && (
  <div className="space-y-4">
    <p className="text-sm text-slate-600">We'll send you an OTP to verify your number</p>
    
    {!otpSent ? (
      <>
        <input 
          type="tel" 
          placeholder="Enter your mobile number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
        />
        <button 
          onClick={handleSendOTP}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
        >
          Send OTP
        </button>
      </>
    ) : (
      <>
        <input 
          type="text" 
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
        />
        <button 
          onClick={handleVerifyOTP}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
        >
          Verify OTP
        </button>
      </>
    )}
    
    <button 
      onClick={() => setLoginMethod(null)}
      className="w-full text-slate-500 text-sm mt-2"
    >
      ← Back to options
    </button>
  </div>
)}  
    </div>
    </div>
  )}
     {/* Booking Modal */}
{showBookingModal && selectedLawyer && (
  <BookingModal 
    lawyer={selectedLawyer}
    onClose={() => {
      setShowBookingModal(false);
      setSelectedLawyer(null);
    }}
  />
)}
      {/* --- FOOTER SECTION STARTS IMMEDIATELY AFTER --- */}
<footer className="bg-slate-950 text-white py-20 border-t border-slate-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-sky-600 p-2 rounded-lg">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <span className="font-serif font-bold text-2xl">Nyaymitr</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {t.footer.text}
        </p>
                <div className="flex gap-4">
                  {/* Social placeholders */}
                  <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-sky-600 transition cursor-pointer"></div>
                  <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-sky-600 transition cursor-pointer"></div>
                  <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-sky-600 transition cursor-pointer"></div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-6 text-white">{t.footer.platform}</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li><button onClick={() => setActiveTab('lawyers')} className="hover:text-sky-400 transition">{t.nav.lawyers}</button></li>
                  <li><button onClick={() => setActiveTab('chat')} className="hover:text-sky-400 transition">{t.nav.chat}</button></li>
                  <li><button onClick={() => setActiveTab('services')} className="hover:text-sky-400 transition">{t.nav.services}</button></li>
                  <li><a href="#" className="hover:text-sky-400 transition">Pricing</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-6 text-white">{t.footer.resources}</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-sky-400 transition">Legal Blog</a></li>
                  <li><a href="#" className="hover:text-sky-400 transition">Indian IPC Guide</a></li>
                  <li><a href="#" className="hover:text-sky-400 transition">Court Directory</a></li>
                  <li><a href="#" className="hover:text-sky-400 transition">FAQs</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-6 text-white">{t.footer.contact}</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-sky-500" /> rajputboy0726@gmail.com</li>
                  <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-sky-500" /> +91 7838726778</li>
                  <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-sky-500" /> Cyber City, Gurugram, India</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
              <div>&copy; 2026 Nyaymitr Legal Tech Pvt Ltd. All rights reserved.</div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition">{t.footer.privacy}</a>
                <a href="#" className="hover:text-white transition">{t.footer.terms}</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}
