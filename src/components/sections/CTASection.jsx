import React from 'react';
import { ArrowRight, Search, Building2, Heart } from 'lucide-react';
import { Button } from '../ui';

const CTASection = ({ onFindNGOs, onRegisterNGO }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-secondary-600 via-secondary-700 to-primary-700 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
            <Heart className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Make a Difference?
          </h2>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking to support a cause or grow your organization's reach, 
            NGO Finder is here to help you create meaningful impact.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="outline-white" 
              size="lg"
              onClick={onFindNGOs}
              icon={Search}
              className="w-full sm:w-auto group"
            >
              Explore NGOs
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="primary" 
              size="lg"
              onClick={onRegisterNGO}
              icon={Building2}
              className="w-full sm:w-auto bg-white text-secondary-700 hover:bg-gray-100 shadow-xl"
            >
              Register Your NGO
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm mb-4">Trusted by organizations across India</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
              <div className="text-white font-semibold">NGO Darpan Verified</div>
              <div className="hidden sm:block w-px h-6 bg-white/30" />
              <div className="text-white font-semibold">28+ States</div>
              <div className="hidden sm:block w-px h-6 bg-white/30" />
              <div className="text-white font-semibold">100% Free Platform</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
