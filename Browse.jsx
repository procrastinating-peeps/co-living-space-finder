import React, { useState, useEffect } from 'react';
import { fetchProperties } from '../api';

export default function Browse() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');
  const [gender, setGender] = useState('Any');

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await fetchProperties({ city: searchCity, gender });
      setProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [gender]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadProperties();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Header */}
      <form onSubmit={handleSearch} className="flex gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <input
          type="text"
          placeholder="Search by city (e.g. Kolkata, Bangalore, Mumbai)..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Any">All Genders</option>
          <option value="Female">Female Only</option>
          <option value="Male">Male Only</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Search
        </button>
      </form>

      {/* Property Cards Grid */}
      {loading ? (
        <p className="text-gray-500">Loading listings...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((item) => (
            <div key={item.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition">
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700">
                    {item.room_type}
                  </span>
                  <span className="text-sm font-bold text-amber-500">★ {item.rating}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{item.area}, {item.city}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.amenities && item.amenities.map((a, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {a}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-xl font-extrabold text-slate-900">₹{item.rent.toLocaleString()}</span>
                    <span className="text-xs text-slate-400 line-through ml-2">₹{item.original_rent?.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 block">/ month</span>
                  </div>
                  <button className="bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-800">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}