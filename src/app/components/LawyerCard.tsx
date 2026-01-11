import React from 'react';
import { Star, MapPin, Briefcase } from 'lucide-react';

interface LawyerCardProps {
  name: string;
  type: string;
  location: string;
  rating: string;
  cases: string;
  imageSeed: string;
  tags: string[];
  bookBtnText: string;
  onBook?: () => void;  // ← ADD THIS LINE
}

export const LawyerCard: React.FC<LawyerCardProps> = ({
  name,
  type,
  location,
  rating,
  cases,
  imageSeed,
  tags,
  bookBtnText,
  onBook
}) => {
  return (
    <div className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
      <div className="h-20 bg-gradient-to-r from-sky-100 to-indigo-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      </div>
      <div className="p-6 relative">
        <div className="w-24 h-24 -mt-16 mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${imageSeed}`} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
        <p className="text-sm text-slate-500 mb-4">{type}</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-semibold">{rating}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span>{cases} Cases</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 text-sm text-slate-500">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span>{location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-medium border border-sky-100">
              {tag}
            </span>
          ))}
        </div>

        <button onClick={onBook} className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-sky-600 transition-all shadow-lg shadow-slate-900/10 group-hover:shadow-xl">
          {bookBtnText}
        </button>
      </div>
    </div>
  );
};
