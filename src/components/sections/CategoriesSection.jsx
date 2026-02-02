import React from 'react';
import { 
  GraduationCap, 
  Heart, 
  Leaf, 
  Users, 
  Baby, 
  PawPrint, 
  Droplets,
  HandHeart,
  Home,
  Utensils,
  Briefcase,
  Globe,
  ArrowRight
} from 'lucide-react';

const CategoriesSection = ({ onCategorySelect, categoryCounts = {}, totalNGOs = 0 }) => {
  const categories = [
    { icon: GraduationCap, name: 'Education', color: 'from-blue-500 to-blue-600' },
    { icon: Heart, name: 'Healthcare', color: 'from-red-500 to-red-600' },
    { icon: Leaf, name: 'Environment', color: 'from-green-500 to-green-600' },
    { icon: Users, name: 'Women Empowerment', color: 'from-purple-500 to-purple-600' },
    { icon: Baby, name: 'Child Welfare', color: 'from-pink-500 to-pink-600' },
    { icon: PawPrint, name: 'Animal Rights', color: 'from-amber-500 to-amber-600' },
    { icon: Droplets, name: 'Water & Sanitation', color: 'from-cyan-500 to-cyan-600' },
    { icon: HandHeart, name: 'Elderly Care', color: 'from-teal-500 to-teal-600' },
    { icon: Home, name: 'Housing', color: 'from-indigo-500 to-indigo-600' },
    { icon: Utensils, name: 'Food Security', color: 'from-orange-500 to-orange-600' },
    { icon: Briefcase, name: 'Livelihood', color: 'from-slate-500 to-slate-600' },
    { icon: Globe, name: 'Others', color: 'from-gray-500 to-gray-600' },
  ].map(cat => ({
    ...cat,
    count: categoryCounts[cat.name] || 0
  }));

  const handleCategoryClick = (categoryName) => {
    onCategorySelect?.(categoryName);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
            Browse by Category
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore NGO Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click on any category to find organizations working in areas that matter to you.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index} 
              {...category} 
              delay={index * 50} 
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ icon: Icon, name, color, count, delay, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="group text-left w-full"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative p-4 sm:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary-200 text-center">
        {/* Icon Container */}
        <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${color} mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>

        {/* Category Name */}
        <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm md:text-base line-clamp-2">
          {name}
        </h3>

        {/* Count */}
        <span className="text-xs sm:text-sm text-gray-500">
          {count > 0 ? `${count} NGO${count !== 1 ? 's' : ''}` : 'No NGOs'}
        </span>

        {/* View Arrow - shows on hover */}
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowRight className="w-4 h-4 text-primary-500" />
        </div>

        {/* Hover Overlay Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 to-secondary-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
      </div>
    </button>
  );
};

export default CategoriesSection;
