import React, { useState } from 'react';
import { Search, FileText, Calendar, MapPin, User, Clock, CheckCircle, AlertCircle, Scale, TrendingUp, ChevronRight } from 'lucide-react';

interface CaseData {
  caseNumber: string;
  caseType: string;
  filingDate: string;
  court: string;
  location: string;
  petitioner: string;
  respondent: string;
  currentStage: string;
  nextHearing: string;
  status: 'pending' | 'disposed' | 'adjourned';
  judge: string;
  lawyer: string;
  description: string;
  updates: {
    date: string;
    event: string;
    description: string;
  }[];
}

const CaseStatusTracker = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [searchState, setSearchState] = useState<'idle' | 'searching' | 'found' | 'notfound'>('idle');
  const [caseData, setCaseData] = useState<CaseData | null>(null);

  // Mock case database (in real app, this would be an API call)
  const mockCases: { [key: string]: CaseData } = {
    'DL2024/12345': {
      caseNumber: 'DL2024/12345',
      caseType: 'Civil Suit',
      filingDate: '15 Jan 2024',
      court: 'District Court',
      location: 'Delhi',
      petitioner: 'Rajesh Kumar',
      respondent: 'State Bank of India',
      currentStage: 'Arguments Stage',
      nextHearing: '25 Jan 2026',
      status: 'pending',
      judge: 'Hon. Justice Meera Sharma',
      lawyer: 'Adv. Priya Verma',
      description: 'Civil suit regarding property dispute and loan recovery matter.',
      updates: [
        { date: '10 Jan 2026', event: 'Hearing Conducted', description: 'Arguments presented by both parties. Next date given for final arguments.' },
        { date: '15 Dec 2025', event: 'Evidence Submitted', description: 'Documentary evidence submitted by petitioner.' },
        { date: '20 Nov 2025', event: 'First Hearing', description: 'Case admitted for regular hearing.' },
        { date: '15 Jan 2024', event: 'Case Filed', description: 'Civil suit filed in District Court, Delhi.' }
      ]
    },
    'MH2025/67890': {
      caseNumber: 'MH2025/67890',
      caseType: 'Criminal Case',
      filingDate: '05 Mar 2025',
      court: 'Sessions Court',
      location: 'Mumbai',
      petitioner: 'State of Maharashtra',
      respondent: 'Amit Desai',
      currentStage: 'Trial Stage',
      nextHearing: '30 Jan 2026',
      status: 'pending',
      judge: 'Hon. Justice Rajiv Malhotra',
      lawyer: 'Public Prosecutor',
      description: 'Criminal case u/s 420 IPC - Cheating and dishonestly inducing delivery of property.',
      updates: [
        { date: '08 Jan 2026', event: 'Witness Examined', description: 'Prosecution witness No. 3 examined.' },
        { date: '10 Dec 2025', event: 'Charges Framed', description: 'Formal charges framed against accused.' },
        { date: '15 Oct 2025', event: 'Bail Rejected', description: 'Bail application rejected by court.' },
        { date: '05 Mar 2025', event: 'FIR Registered', description: 'First Information Report registered at Andheri Police Station.' }
      ]
    },
    'KA2023/11111': {
      caseNumber: 'KA2023/11111',
      caseType: 'Family Dispute',
      filingDate: '10 Jun 2023',
      court: 'Family Court',
      location: 'Bangalore',
      petitioner: 'Sunita Reddy',
      respondent: 'Prakash Reddy',
      currentStage: 'Final Order',
      nextHearing: 'Case Disposed',
      status: 'disposed',
      judge: 'Hon. Justice Lakshmi Iyer',
      lawyer: 'Adv. Kavita Menon',
      description: 'Divorce petition with mutual consent and child custody agreement.',
      updates: [
        { date: '15 Dec 2025', event: 'Final Order Passed', description: 'Divorce decree granted with mutual consent. Child custody awarded to petitioner.' },
        { date: '01 Dec 2025', event: 'Settlement Agreement', description: 'Both parties agreed to settlement terms.' },
        { date: '15 Sep 2023', event: 'Mediation Successful', description: 'Parties agreed to proceed with mutual consent divorce.' },
        { date: '10 Jun 2023', event: 'Petition Filed', description: 'Divorce petition filed in Family Court.' }
      ]
    }
  };

  const handleSearch = () => {
    setSearchState('searching');
    
    // Simulate API call delay
    setTimeout(() => {
      const normalizedCaseNum = caseNumber.toUpperCase().trim();
      const foundCase = mockCases[normalizedCaseNum];
      
      if (foundCase) {
        setCaseData(foundCase);
        setSearchState('found');
      } else {
        setCaseData(null);
        setSearchState('notfound');
      }
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'disposed': return 'bg-green-50 text-green-700 border-green-200';
      case 'adjourned': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'disposed': return <CheckCircle className="w-5 h-5" />;
      case 'adjourned': return <AlertCircle className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-sky-500/20 p-3 rounded-xl backdrop-blur-sm border border-sky-500/30">
              <Scale className="w-8 h-8 text-sky-400" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold">Case Status Tracker</h1>
              <p className="text-slate-300 mt-2">Track your court case status in real-time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-3">
              Enter Case Number (e.g., DL2024/12345)
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="DL2024/12345"
                  className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-500/20 outline-none transition-all text-lg font-medium"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
              <button
                onClick={handleSearch}
                disabled={!caseNumber.trim() || searchState === 'searching'}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-sky-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {searchState === 'searching' ? 'Searching...' : 'Track Case'}
              </button>
            </div>
          </div>

          {/* Sample Case Numbers */}
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
            <p className="text-xs font-bold text-sky-900 mb-2">💡 Try these sample case numbers:</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(mockCases).map((caseNum) => (
                <button
                  key={caseNum}
                  onClick={() => setCaseNumber(caseNum)}
                  className="px-3 py-1 bg-white border border-sky-200 rounded-lg text-xs font-medium text-sky-700 hover:bg-sky-100 transition-colors"
                >
                  {caseNum}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {searchState === 'notfound' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Case Not Found</h3>
            <p className="text-slate-500 mb-6">
              The case number <span className="font-mono font-bold text-slate-900">{caseNumber}</span> was not found in our records.
            </p>
            <p className="text-sm text-slate-400">
              Please verify the case number or try searching with a different format.
            </p>
          </div>
        )}

        {searchState === 'found' && caseData && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Case Overview Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sky-400 font-mono text-2xl font-bold">{caseData.caseNumber}</span>
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(caseData.status)}`}>
                        {getStatusIcon(caseData.status)}
                        {caseData.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-300 text-lg">{caseData.caseType}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-sm mb-1">Filed on</div>
                    <div className="text-white font-bold">{caseData.filingDate}</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-slate-600 mb-6">{caseData.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-2">
                      <MapPin className="w-4 h-4" />
                      COURT
                    </div>
                    <div className="font-bold text-slate-900">{caseData.court}</div>
                    <div className="text-sm text-slate-500">{caseData.location}</div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-2">
                      <TrendingUp className="w-4 h-4" />
                      CURRENT STAGE
                    </div>
                    <div className="font-bold text-slate-900">{caseData.currentStage}</div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-2">
                      <Calendar className="w-4 h-4" />
                      NEXT HEARING
                    </div>
                    <div className="font-bold text-slate-900">{caseData.nextHearing}</div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-2">
                      <User className="w-4 h-4" />
                      PRESIDING JUDGE
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{caseData.judge}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Parties Involved */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Petitioner
                </h3>
                <p className="text-xl font-bold text-slate-900">{caseData.petitioner}</p>
                <p className="text-sm text-slate-500 mt-1">Represented by: {caseData.lawyer}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-rose-600" />
                  Respondent
                </h3>
                <p className="text-xl font-bold text-slate-900">{caseData.respondent}</p>
              </div>
            </div>

            {/* Case Timeline */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-sky-600" />
                Case Timeline & Updates
              </h3>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>

                <div className="space-y-6">
                  {caseData.updates.map((update, index) => (
                    <div key={index} className="relative flex gap-6 group">
                      {/* Timeline Dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-sky-100 border-4 border-white shadow-sm flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                          <ChevronRight className="w-5 h-5 text-sky-600" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-slate-50 rounded-xl p-4 group-hover:bg-slate-100 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-slate-900">{update.event}</h4>
                          <span className="text-sm text-slate-500 font-medium">{update.date}</span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{update.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Need Legal Assistance?</h4>
                  <p className="text-sm text-slate-600">Connect with verified lawyers for consultation</p>
                </div>
                <button 
                  onClick={() => {
    // Navigate to lawyers tab
    window.dispatchEvent(new CustomEvent('navigate-tab', { detail: 'lawyers' }));
  }}
  className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-sky-600 transition-all shadow-lg whitespace-nowrap"
>
  Find Lawyers
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      {searchState === 'idle' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">How to Track Your Case</h3>
            <div className="space-y-4 text-slate-600">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold">1</div>
                <div>
                  <p className="font-semibold text-slate-900">Enter Case Number</p>
                  <p className="text-sm">Input your case number in the format provided (e.g., DL2024/12345)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold">2</div>
                <div>
                  <p className="font-semibold text-slate-900">View Status</p>
                  <p className="text-sm">Get instant access to case details, hearing dates, and updates</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold">3</div>
                <div>
                  <p className="font-semibold text-slate-900">Stay Updated</p>
                  <p className="text-sm">Check back regularly for the latest case developments and hearing outcomes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStatusTracker;
