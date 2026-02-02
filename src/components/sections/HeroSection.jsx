import React from 'react';
import { Search, Building2, ArrowRight, Shield, Users, Globe } from 'lucide-react';
import { Button } from '../ui';

const HeroSection = ({ ngoCount = 0, onScrollToNGOs, onScrollToRegister }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-700 to-secondary-600" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-secondary-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center animate-bounce-soft" style={{ animationDelay: '0s' }}>
          <Shield className="w-8 h-8 text-white/80" />
        </div>
        <div className="absolute top-40 right-[15%] w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center animate-bounce-soft" style={{ animationDelay: '0.5s' }}>
          <Users className="w-7 h-7 text-white/80" />
        </div>
        <div className="absolute bottom-32 left-[20%] w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center animate-bounce-soft" style={{ animationDelay: '1s' }}>
          <Globe className="w-6 h-6 text-white/80" />
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-secondary-400" />
            <span>Verified & Trusted Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Discover NGOs Making
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-500">
              a Real Difference
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Connect with verified organizations across India. Find trusted NGOs for donations, 
            volunteering, or register your own organization to reach supporters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={onScrollToNGOs}
              icon={Search}
              className="w-full sm:w-auto"
            >
              Find NGOs
            </Button>
            <Button 
              variant="outline-white" 
              size="lg"
              onClick={onScrollToRegister}
              icon={Building2}
              className="w-full sm:w-auto"
            >
              Register Your NGO
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <StatItem value={`${ngoCount}+`} label="Registered NGOs" />
            <StatItem value="28+" label="States Covered" />
            <StatItem value="50+" label="Categories" />
            <StatItem value="100%" label="Verified" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-white/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ value, label }) => (
  <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-white/70">{label}</div>
  </div>
);

export default HeroSection;
