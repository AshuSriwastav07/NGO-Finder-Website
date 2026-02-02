import React, { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ExternalLink, 
  Search, 
  Grid3X3, 
  List, 
  ChevronDown,
  Building2,
  Filter,
  X,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { Card, Badge, Button, NGODetailModal } from '../ui';
import { matchesCategory, categoryKeywords } from '../../utils/categoryUtils';

const NGOListingSection = ({ ngoData = [], sectionRef, selectedCategory = '', onClearCategory }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync external category with internal sector filter
  useEffect(() => {
    if (selectedCategory) {
      setSelectedSector(selectedCategory);
    }
  }, [selectedCategory]);

  // Handle NGO card click
  const handleNGOClick = (data) => {
    setSelectedNGO(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNGO(null);
  };

  // Get unique sectors for filtering
  const sectors = useMemo(() => {
    const sectorSet = new Set();
    ngoData.forEach(([_, data]) => {
      if (data[8]) {
        data[8].split(',').forEach(s => sectorSet.add(s.trim()));
      }
    });
    return Array.from(sectorSet).sort();
  }, [ngoData]);

  // Filter NGOs based on search and sector
  const filteredNGOs = useMemo(() => {
    return ngoData.filter(([_, data]) => {
      const matchesSearch = !searchQuery || 
        data[0]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data[1]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data[8]?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Use the category matching utility for better sector matching
      const matchesSector = !selectedSector || matchesCategory(data[8], selectedSector);

      return matchesSearch && matchesSector;
    });
  }, [ngoData, searchQuery, selectedSector]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSector('');
    onClearCategory?.();
  };

  // Clear just sector filter
  const clearSectorFilter = () => {
    setSelectedSector('');
    onClearCategory?.();
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
            NGO Directory
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore Verified NGOs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our comprehensive directory of verified organizations working across various sectors.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-soft p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search NGOs by name, location, or sector..."
                className="w-full pl-12 pr-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Sector Filter */}
            <div className="relative md:w-64">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <select
                value={selectedSector}
                onChange={(e) => {
                  setSelectedSector(e.target.value);
                  if (!e.target.value) onClearCategory?.();
                }}
                className="w-full pl-12 pr-10 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="">All Sectors</option>
                {sectors.map((sector, idx) => (
                  <option key={idx} value={sector}>{sector}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedSector) && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-primary-900">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
                {selectedSector && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-full">
                    {selectedSector}
                    <button onClick={clearSectorFilter} className="hover:text-secondary-900">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline ml-auto"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredNGOs.length}</span> of {ngoData.length} NGOs
          </p>
        </div>

        {/* NGO Grid/List */}
        {filteredNGOs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No NGOs Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNGOs.map(([key, data], index) => (
              <NGOCard key={key} data={data} onClick={() => handleNGOClick(data)} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNGOs.map(([key, data], index) => (
              <NGOListItem key={key} data={data} onClick={() => handleNGOClick(data)} />
            ))}
          </div>
        )}

        {/* NGO Detail Modal */}
        <NGODetailModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          ngoData={selectedNGO} 
        />
      </div>
    </section>
  );
};

const NGOCard = ({ data, onClick }) => {
  const [name, address, regId, phone, email, type, uniqueId, image, sectors, website] = data;
  const sectorList = sectors ? sectors.split(',').map(s => s.trim()).slice(0, 2) : [];
  const hasMoreSectors = sectors && sectors.split(',').length > 2;

  return (
    <Card className="group overflow-hidden cursor-pointer" padding="none" hover={true} onClick={onClick}>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={image || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop';
          }}
        />
        {/* Verified Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="verified" icon={ShieldCheck} size="sm">Verified</Badge>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* NGO Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {name || 'NGO Name'}
        </h3>

        {/* Location */}
        <div className="flex items-start gap-2 text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{address || 'Address not available'}</span>
        </div>

        {/* Sectors */}
        <div className="flex flex-wrap gap-2 mb-4">
          {sectorList.map((sector, idx) => (
            <Badge key={idx} variant="gray" size="sm">{sector}</Badge>
          ))}
          {hasMoreSectors && (
            <Badge variant="gray" size="sm">+{sectors.split(',').length - 2}</Badge>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4 text-sm">
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
              <Phone className="w-4 h-4" />
              <span>{phone}</span>
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
              <Mail className="w-4 h-4" />
              <span className="truncate">{email}</span>
            </a>
          )}
        </div>

        {/* Action Button */}
        <a
          href={website && website !== 'N/A' ? website : '#'}
          target={website && website !== 'N/A' ? '_blank' : '_self'}
          rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            website && website !== 'N/A'
              ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:-translate-y-0.5'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {website && website !== 'N/A' ? (
            <>
              <Globe className="w-4 h-4" />
              Visit Website
              <ExternalLink className="w-4 h-4" />
            </>
          ) : (
            <>No Website Available</>
          )}
        </a>
      </div>
    </Card>
  );
};

const NGOListItem = ({ data, onClick }) => {
  const [name, address, regId, phone, email, type, uniqueId, image, sectors, website] = data;
  const sectorList = sectors ? sectors.split(',').map(s => s.trim()).slice(0, 3) : [];

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-48 md:w-56 h-48 sm:h-auto shrink-0 bg-gray-100 overflow-hidden">
          <img
            src={image || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop'}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop';
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-5 md:p-6 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                <Badge variant="verified" icon={ShieldCheck} size="sm">Verified</Badge>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{address}</span>
              </div>
            </div>
          </div>

          {/* Sectors */}
          <div className="flex flex-wrap gap-2 mb-4">
            {sectorList.map((sector, idx) => (
              <Badge key={idx} variant="primary" size="sm">{sector}</Badge>
            ))}
          </div>

          {/* Contact Row */}
          <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-gray-100">
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-gray-600 hover:text-primary-600 text-sm">
                <Phone className="w-4 h-4" />
                {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-gray-600 hover:text-primary-600 text-sm">
                <Mail className="w-4 h-4" />
                <span className="max-w-[200px] truncate">{email}</span>
              </a>
            )}
            
            <a
              href={website && website !== 'N/A' ? website : '#'}
              target={website && website !== 'N/A' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className={`ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                website && website !== 'N/A'
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {website && website !== 'N/A' ? (
                <>
                  <Globe className="w-4 h-4" />
                  Website
                </>
              ) : 'No Website'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOListingSection;
