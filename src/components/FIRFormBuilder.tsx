import React, { useState } from 'react';
import { FileText, User, MapPin, Phone, Calendar, Clock, AlertCircle, Download, Printer, CheckCircle } from 'lucide-react';

export default function FIRFormBuilder() {
  const [formData, setFormData] = useState({
    complainantName: '',
    fatherName: '',
    age: '',
    address: '',
    phone: '',
    occupation: '',
    incidentDate: '',
    incidentTime: '',
    incidentPlace: '',
    incidentType: '',
    description: '',
    suspectDetails: '',
    witnessDetails: ''
  });
  
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const incidentTypes = [
    'Theft', 'Robbery', 'Assault', 'Fraud', 'Cheating', 'Cybercrime',
    'Lost Property', 'Accident', 'Harassment', 'Missing Person', 'Other'
  ];

  const handleGenerate = () => {
    // Validate required fields
    if (!formData.complainantName || !formData.phone || !formData.incidentType || !formData.description) {
      alert('Please fill all required fields (marked with *)');
      return;
    }
    setShowPreview(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = document.getElementById('fir-preview')?.innerText;
    const blob = new Blob([content || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FIR_${formData.complainantName}_${new Date().getTime()}.txt`;
    a.click();
  };

  if (showPreview) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { background: white; }
          }
        `}</style>
        
        <div className="no-print mb-6 flex gap-4">
          <button
            onClick={() => setShowPreview(false)}
            className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition"
          >
            ← Back to Edit
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2"
          >
            <Printer className="w-5 h-5" /> Print FIR
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 px-6 py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 transition flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" /> Download
          </button>
        </div>

        <div id="fir-preview" className="bg-white p-12 border-2 border-slate-300 rounded-xl shadow-lg">
          <div className="text-center mb-8 border-b-2 border-slate-800 pb-4">
            <h1 className="text-3xl font-bold mb-2">FIRST INFORMATION REPORT</h1>
            <p className="text-sm text-slate-600">Under Section 154 Cr.P.C.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-bold text-slate-700">FIR No:</p>
                <p className="text-slate-900">__________ (To be filled by Police)</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">Date & Time of Report:</p>
                <p className="text-slate-900">{new Date().toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-bold text-lg mb-4 text-slate-900">1. COMPLAINANT DETAILS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Name:</p>
                  <p className="text-slate-900">{formData.complainantName}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Father's Name:</p>
                  <p className="text-slate-900">{formData.fatherName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Age:</p>
                  <p className="text-slate-900">{formData.age || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Occupation:</p>
                  <p className="text-slate-900">{formData.occupation || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-semibold text-slate-700">Address:</p>
                  <p className="text-slate-900">{formData.address || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Phone:</p>
                  <p className="text-slate-900">{formData.phone}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-bold text-lg mb-4 text-slate-900">2. INCIDENT DETAILS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Type of Incident:</p>
                  <p className="text-slate-900 font-medium">{formData.incidentType}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Date of Incident:</p>
                  <p className="text-slate-900">{formData.incidentDate || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Time of Incident:</p>
                  <p className="text-slate-900">{formData.incidentTime || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-semibold text-slate-700">Place of Incident:</p>
                  <p className="text-slate-900">{formData.incidentPlace || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-bold text-lg mb-4 text-slate-900">3. DESCRIPTION OF INCIDENT</h3>
              <p className="text-slate-900 whitespace-pre-wrap leading-relaxed">{formData.description}</p>
            </div>

            {formData.suspectDetails && (
              <div className="border-t pt-4">
                <h3 className="font-bold text-lg mb-4 text-slate-900">4. SUSPECT DETAILS (if any)</h3>
                <p className="text-slate-900 whitespace-pre-wrap">{formData.suspectDetails}</p>
              </div>
            )}

            {formData.witnessDetails && (
              <div className="border-t pt-4">
                <h3 className="font-bold text-lg mb-4 text-slate-900">5. WITNESS DETAILS (if any)</h3>
                <p className="text-slate-900 whitespace-pre-wrap">{formData.witnessDetails}</p>
              </div>
            )}

            <div className="border-t pt-6 mt-8">
              <p className="text-slate-700 mb-8">
                I hereby declare that the information provided above is true and correct to the best of my knowledge and belief.
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Place: ___________________</p>
                  <p className="text-sm text-slate-600">Date: {new Date().toLocaleDateString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="border-t-2 border-slate-800 pt-2 mt-16 w-48">Signature of Complainant</p>
                  <p className="text-sm text-slate-600 mt-2">{formData.complainantName}</p>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-slate-800 pt-6 mt-8 bg-slate-50 p-4 rounded">
              <h3 className="font-bold text-lg mb-2 text-slate-900">FOR OFFICIAL USE ONLY</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>Police Station: ___________________</p>
                <p>FIR No: ___________________</p>
                <p>Received by: ___________________</p>
                <p>Date & Time: ___________________</p>
                <p className="col-span-2">Signature & Seal: ___________________</p>
              </div>
            </div>
          </div>
        </div>

        <div className="no-print mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-900">
            <strong>⚠️ Important:</strong> This is a draft FIR. Please take a printout and submit it at your nearest police station. Keep a copy for your records.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-slate-200">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">File FIR Online</h2>
            <p className="text-slate-500">Fill the form to generate your FIR draft</p>
          </div>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
          <p className="text-sm text-sky-900">
            <strong>ℹ️ Note:</strong> This tool helps you prepare a draft FIR. You'll need to submit the printed copy at your nearest police station for official registration.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Complainant Details */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-slate-600" />
            Complainant Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.complainantName}
                onChange={(e) => handleChange('complainantName', e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Father's Name</label>
              <input
                type="text"
                value={formData.fatherName}
                onChange={(e) => handleChange('fatherName', e.target.value)}
                placeholder="Father's name"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                placeholder="Your age"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Occupation</label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => handleChange('occupation', e.target.value)}
                placeholder="Your occupation"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Your complete address"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Incident Details */}
        <div className="border-t pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-slate-600" />
            Incident Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Type of Incident <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.incidentType}
                onChange={(e) => handleChange('incidentType', e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select type</option>
                {incidentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                Date of Incident
              </label>
              <input
                type="date"
                value={formData.incidentDate}
                onChange={(e) => handleChange('incidentDate', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Time of Incident
              </label>
              <input
                type="time"
                value={formData.incidentTime}
                onChange={(e) => handleChange('incidentTime', e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Place of Incident</label>
              <input
                type="text"
                value={formData.incidentPlace}
                onChange={(e) => handleChange('incidentPlace', e.target.value)}
                placeholder="Location where incident occurred"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-t pt-8">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Detailed Description of Incident <span className="text-rose-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={6}
            placeholder="Provide a detailed description of what happened. Include all relevant facts, sequence of events, and any important details..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition resize-none"
          />
        </div>

        {/* Optional Details */}
        <div className="border-t pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Additional Information (Optional)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Suspect Details</label>
              <textarea
                value={formData.suspectDetails}
                onChange={(e) => handleChange('suspectDetails', e.target.value)}
                rows={3}
                placeholder="If you know or suspect anyone, provide their details (name, description, address, etc.)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Witness Details</label>
              <textarea
                value={formData.witnessDetails}
                onChange={(e) => handleChange('witnessDetails', e.target.value)}
                rows={3}
                placeholder="Names and contact details of any witnesses"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <button
            onClick={handleGenerate}
            className="w-full py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Generate FIR Draft
          </button>
        </div>
      </div>
    </div>
  );
}
