import React, { useState } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search NGOs by name, category, or location...', 
  className = '',
  showFilters = false,
  categories = [],
  locations = [],
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch?.({ query, category: selectedCategory, location: selectedLocation });
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    onSearch?.({ query: '', category: '', location: '' });
  };

  const hasActiveFilters = query || selectedCategory || selectedLocation;

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Main Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition-all duration-200 text-base"
            />
          </div>

          {/* Location Dropdown (Optional) */}
          {showFilters && locations.length > 0 && (
            <div className="relative md:w-48">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm appearance-none cursor-pointer"
              >
                <option value="">All Locations</option>
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg shadow-primary-500/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>

          {/* Filter Toggle Button */}
          {showFilters && (
            <button
              type="button"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`px-4 py-4 border rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                showFilterPanel || hasActiveFilters
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-5 w-5" />
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-primary-500" />
              )}
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && showFilterPanel && (
          <div className="mt-4 p-6 bg-white border border-gray-200 rounded-xl shadow-lg animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Filter Options</h4>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Clear all
                </button>
              )}
            </div>
            
            {categories.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === cat
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
