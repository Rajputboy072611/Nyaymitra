import React, { useState } from 'react';
import { Search, MapPin, Phone, Clock, Building2, Navigation, ExternalLink } from 'lucide-react';

interface Court {
  id: number;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  timings: string;
  casesHandled: string[];
  mapLink: string;
}

const courtsData: Court[] = [
  {
    id: 1,
    name: "District Court, Greater Noida",
    type: "District Court",
    address: "Surajpur-Kasna Road, Knowledge Park III",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    pincode: "201310",
    phone: "0120-2328000",
    email: "districtcourt.gnoida@gov.in",
    timings: "Mon-Fri: 10:00 AM - 5:00 PM",
    casesHandled: ["Civil", "Criminal", "Family", "Property"],
    mapLink: "https://maps.google.com/?q=District+Court+Greater+Noida"
  },
  {
    id: 2,
    name: "Patiala House Court",
    type: "District Court",
    address: "Tilak Marg, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    phone: "011-23073046",
    email: "patialahousecourt@delhicourts.nic.in",
    timings: "Mon-Fri: 9:30 AM - 5:00 PM",
    casesHandled: ["Criminal", "Civil", "Motor Accident Claims", "Consumer"],
    mapLink: "https://maps.google.com/?q=Patiala+House+Court+Delhi"
  },
  {
    id: 3,
    name: "Tis Hazari Court Complex",
    type: "District Court",
    address: "Tis Hazari Road, Civil Lines",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110054",
    phone: "011-23968000",
    email: "tishazari@delhicourts.nic.in",
    timings: "Mon-Fri: 9:30 AM - 5:00 PM",
    casesHandled: ["Civil", "Criminal", "Family", "Cheque Bounce"],
    mapLink: "https://maps.google.com/?q=Tis+Hazari+Court+Delhi"
  },
  {
    id: 4,
    name: "Dwarka District Court",
    type: "District Court",
    address: "Sector 10, Dwarka",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110075",
    phone: "011-25088000",
    email: "dwarkacourt@delhicourts.nic.in",
    timings: "Mon-Fri: 9:30 AM - 5:00 PM",
    casesHandled: ["Civil", "Criminal", "Family", "Property"],
    mapLink: "https://maps.google.com/?q=Dwarka+District+Court+Delhi"
  },
  {
    id: 5,
    name: "Saket District Court",
    type: "District Court",
    address: "Saket District Court Complex",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110017",
    phone: "011-26522000",
    email: "saketcourt@delhicourts.nic.in",
    timings: "Mon-Fri: 9:30 AM - 5:00 PM",
    casesHandled: ["Civil", "Criminal", "Family", "Commercial"],
    mapLink: "https://maps.google.com/?q=Saket+District+Court+Delhi"
  },
  {
    id: 6,
    name: "Ghaziabad District Court",
    type: "District Court",
    address: "Civil Lines, Ghaziabad",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201001",
    phone: "0120-2770000",
    email: "districtcourt.gzb@up.gov.in",
    timings: "Mon-Fri: 10:00 AM - 5:00 PM",
    casesHandled: ["Civil", "Criminal", "Family", "Revenue"],
    mapLink: "https://maps.google.com/?q=Ghaziabad+District+Court"
  },
  {
    id: 7,
    name: "Noida District Court",
    type: "District Court",
    address: "Sector 39, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201303",
    phone: "0120-2532000",
    email: "districtcourt.noida@up.gov.in",
    timings: "Mon-Fri: 10:00 AM - 5:00 PM",
    casesHandled: ["Civil", "Criminal", "Commercial", "Consumer"],
    mapLink: "https://maps.google.com/?q=Noida+District+Court"
  },
  {
    id: 8,
    name: "Karkardooma Court Complex",
    type: "District Court",
    address: "Vikas Marg, Karkardooma",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110092",
    phone: "011-22373000",
    email: "karkardoomacourt@delhicourts.nic.in",
    timings: "Mon-Fri: 9:30 AM - 5:00 PM",
    casesHandled: ["Civil", "Criminal", "Family", "Matrimonial"],
    mapLink: "https://maps.google.com/?q=Karkardooma+Court+Delhi"
  },
  {
    id: 9,
    name: "Rohini Court Complex",
    type: "District Court",
    address: "Sector 14, Rohini",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110085",
    phone: "011-27555000",
    email: "rohinicourt@delhicourts.nic.in",
    timings: "Mon-Fri: 9:30 AM - 5:00 PM",
    casesHandled: ["Civil", "Criminal", "Family", "Consumer"],
    mapLink: "https://maps.google.com/?q=Rohini+Court+Delhi"
  },
  {
    id: 10,
    name: "Delhi High Court",
    type: "High Court",
    address: "Sher Shah Road, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110003",
    phone: "011-23384747",
    email: "hc.delhi@nic.in",
    timings: "Mon-Fri: 10:30 AM - 4:30 PM",
    casesHandled: ["Civil Appeals", "Criminal Appeals", "Writs", "Constitutional"],
    mapLink: "https://maps.google.com/?q=Delhi+High+Court"
  }
];

export default function CourtLocator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [filteredCourts, setFilteredCourts] = useState<Court[]>(courtsData);

  const cities = ['All', ...Array.from(new Set(courtsData.map(c => c.city)))];
  const types = ['All', ...Array.from(new Set(courtsData.map(c => c.type)))];

  const handleSearch = () => {
    let results = courtsData;

    if (searchQuery.trim()) {
      results = results.filter(court =>
        court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        court.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        court.pincode.includes(searchQuery) ||
        court.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCity !== 'All') {
      results = results.filter(court => court.city === selectedCity);
    }

    if (selectedType !== 'All') {
      results = results.filter(court => court.type === selectedType);
    }

    setFilteredCourts(results);
  };

  React.useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCity, selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-sky-100 px-4 py-2 rounded-full mb-4">
          <MapPin className="w-5 h-5 text-sky-600" />
          <span className="text-sky-900 font-semibold">Court Locator</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
          Find Your Nearest Court
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Locate courts across India with complete address, contact details, and working hours
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, city, or pincode..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* City Filter */}
          <div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-slate-600">
          Found <span className="font-bold text-slate-900">{filteredCourts.length}</span> court{filteredCourts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Results */}
      {filteredCourts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
          <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Courts Found</h3>
          <p className="text-slate-500">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourts.map((court) => (
            <div
              key={court.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-bl-full -mr-8 -mt-8"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                        {court.name}
                      </h3>
                      <span className="inline-block bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full text-xs font-semibold">
                        {court.type}
                      </span>
                    </div>
                    <Building2 className="w-8 h-8 text-white/30" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Address */}
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-900 font-medium">{court.address}</p>
                    <p className="text-sm text-slate-500">{court.city}, {court.state} - {court.pincode}</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-900 font-medium">{court.phone}</p>
                    <p className="text-sm text-slate-500">{court.email}</p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-900 font-medium">{court.timings}</p>
                </div>

                {/* Cases Handled */}
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Cases Handled:</p>
                  <div className="flex flex-wrap gap-2">
                    {court.casesHandled.map((caseType, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {caseType}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex gap-3">
                  <a
                    href={court.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-sky-600 transition flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                  <button className="px-4 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Banner */}
      <div className="mt-12 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Need Help Finding Your Court?</h3>
            <p className="text-slate-600 mb-4">
              Not sure which court handles your case? Our AI assistant can help you determine the right jurisdiction based on your case type and location.
            </p>
            <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-semibold hover:bg-sky-600 transition">
              Ask AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
