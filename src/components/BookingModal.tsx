import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface BookingModalProps {
  lawyer: {
    name: string;
    type: string;
    rating: string;
    cases: string;
    imageSeed: string;
  };
  onClose: () => void;
}

export default function BookingModal({ lawyer, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    issue: ''
  });
const [submitted, setSubmitted] = useState(false);
const [loading, setLoading] = useState(false); // ADD THIS LINE
    const handleSubmit = async () => {
  if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.issue) {
    alert('Please fill all fields');
    return;
  }
  
  setLoading(true);
  
  try {
    await addDoc(collection(db, 'bookings'), {
      lawyerName: lawyer.name,
      lawyerType: lawyer.type,
      lawyerRating: lawyer.rating,
      lawyerCases: lawyer.cases,
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      appointmentDate: formData.date,
      appointmentTime: formData.time,
      legalIssue: formData.issue,
      status: 'pending',
      createdAt: serverTimestamp(),
      consultationFee: 500,
      platformFee: 50
    });

    console.log('Booking saved to Firebase successfully!');
    setSubmitted(true);
    
    setTimeout(() => {
      onClose();
    }, 2500);
  } catch (error) {
    console.error('Error saving booking:', error);
    alert('Failed to book consultation. Please try again.');
    setLoading(false);
  }
};

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Booking Confirmed!</h3>
          <p className="text-slate-600 mb-2">
            Your consultation with <span className="font-semibold">{lawyer.name}</span> has been scheduled.
          </p>
          <p className="text-sm text-slate-500">
            We'll send confirmation details to your email shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8">
        <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-t-3xl">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lawyer.imageSeed}`}
              alt={lawyer.name}
              className="w-16 h-16 rounded-full border-4 border-white/20"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">{lawyer.name}</h2>
              <p className="text-slate-300">{lawyer.type}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-400 text-sm">⭐ {lawyer.rating}</span>
                <span className="text-slate-400 text-sm">• {lawyer.cases} Cases</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
            <p className="text-sm text-sky-900">
              <strong>Consultation Fee:</strong> ₹500 for 30 minutes (Platform Fee: ₹50)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Preferred Time
              </label>
              <select
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              Brief Description of Your Legal Issue
            </label>
            <textarea
              value={formData.issue}
              onChange={(e) => handleChange('issue', e.target.value)}
              rows={4}
              placeholder="Please provide a brief overview of your legal matter..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs text-amber-800">
              ⚡ <strong>Quick Response:</strong> The lawyer will confirm your booking within 2 hours. You'll receive confirmation via email and SMS.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-sky-600 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
>
            {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
