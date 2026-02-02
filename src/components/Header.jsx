import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Building2, Heart, Info, ChevronRight, ChevronDown, GraduationCap, Leaf, Users, Baby, PawPrint, Droplets, HandHeart, Home, Utensils, Briefcase, Globe } from 'lucide-react';
import logoImg from './logo.png';

const categories = [
  { icon: GraduationCap, name: 'Education', color: 'text-blue-500' },
  { icon: Heart, name: 'Healthcare', color: 'text-red-500' },
  { icon: Leaf, name: 'Environment', color: 'text-green-500' },
  { icon: Users, name: 'Women Empowerment', color: 'text-purple-500' },
  { icon: Baby, name: 'Child Welfare', color: 'text-pink-500' },
  { icon: PawPrint, name: 'Animal Rights', color: 'text-amber-500' },
  { icon: Droplets, name: 'Water & Sanitation', color: 'text-cyan-500' },
  { icon: HandHeart, name: 'Elderly Care', color: 'text-teal-500' },
  { icon: Home, name: 'Housing', color: 'text-indigo-500' },
  { icon: Utensils, name: 'Food Security', color: 'text-orange-500' },
  { icon: Briefcase, name: 'Livelihood', color: 'text-slate-500' },
  { icon: Globe, name: 'Others', color: 'text-gray-500' },
];

const Header = ({ onScrollToNGOs, onScrollToRegister, onScrollToAbout, onCategorySelect, selectedCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const categoryRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (categoryName) => {
    onCategorySelect?.(categoryName);
    setIsCategoryOpen(false);
    setIsMobileCategoryOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Find NGOs', icon: Search, action: onScrollToNGOs },
    { name: 'Register', icon: Building2, action: onScrollToRegister },
    { name: 'About Us', icon: Info, action: onScrollToAbout },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white shadow-lg py-2' 
            : 'bg-gradient-to-b from-black/30 to-transparent py-4'
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className={`absolute inset-0 rounded-full blur-md transition-opacity ${
                  isScrolled ? 'bg-primary-400/20 opacity-100' : 'bg-white/20 opacity-0 group-hover:opacity-100'
                }`} />
                <img 
                  src={logoImg} 
                  alt="NGO Finder" 
                  className="relative h-11 w-11 rounded-full object-cover border-2 border-white/30 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-white/60"
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-bold tracking-tight transition-colors ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  NGO Finder
                </span>
                <span className={`text-[10px] uppercase tracking-widest font-semibold transition-colors ${
                  isScrolled ? 'text-primary-600' : 'text-white/80'
                }`}>
                  India
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Categories Dropdown */}
              <div className="relative" ref={categoryRef}>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-primary-700 hover:bg-gray-100' 
                      : 'text-white/90 hover:text-white hover:bg-white/20'
                  } ${selectedCategory ? (isScrolled ? 'bg-primary-50 text-primary-700' : 'bg-white/20 text-white') : ''}`}
                >
                  <Globe className="w-4 h-4" />
                  {selectedCategory || 'Categories'}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                  isCategoryOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                }`}>
                  <div className="p-2 max-h-80 overflow-y-auto">
                    {selectedCategory && (
                      <button
                        onClick={() => handleCategoryClick('')}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Clear Filter
                      </button>
                    )}
                    {categories.map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCategoryClick(cat.name)}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          selectedCategory === cat.name 
                            ? 'bg-primary-50 text-primary-700' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <cat.icon className={`w-4 h-4 ${cat.color}`} />
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nav Links Container */}
              <div className={`flex items-center rounded-full px-1 py-1 transition-all duration-300 ${
                isScrolled ? 'bg-gray-100' : 'bg-white/10 backdrop-blur-sm'
              }`}>
                {navLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={link.action}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                      isScrolled 
                        ? 'text-gray-600 hover:text-primary-700 hover:bg-white' 
                        : 'text-white/90 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={onScrollToRegister}
                className={`group flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  isScrolled
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40'
                    : 'bg-white text-primary-700 hover:bg-white/95 shadow-xl'
                }`}
              >
                <Heart className="w-4 h-4" />
                Get Started
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100 transition-all duration-300 ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-y-0 visible' 
              : 'opacity-0 -translate-y-4 invisible'
          }`}
        >
          <div className="container-custom py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {/* Categories Accordion */}
            <div className="border-b border-gray-100 pb-3 mb-3">
              <button
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary-600" />
                  Categories
                  {selectedCategory && (
                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                      {selectedCategory}
                    </span>
                  )}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isMobileCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${isMobileCategoryOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-2 gap-2 px-2 pt-2">
                  {selectedCategory && (
                    <button
                      onClick={() => handleCategoryClick('')}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium col-span-2"
                    >
                      <X className="w-4 h-4" />
                      Clear Filter
                    </button>
                  )}
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === cat.name 
                          ? 'bg-primary-100 text-primary-700' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <cat.icon className={`w-4 h-4 ${cat.color}`} />
                      <span className="truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Nav Links */}
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => {
                  link.action?.();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent hover:text-primary-600 transition-all duration-200"
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </button>
            ))}
            <div className="pt-4 mt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  onScrollToRegister?.();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold shadow-lg shadow-primary-500/30 hover:from-primary-700 hover:to-primary-800 transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                Get Started
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-0" />
    </>
  );
};

export default Header;