import React, { useEffect, useState, useRef } from 'react';
import { Building2, MapPin, Tag, Heart } from 'lucide-react';

const StatsSection = ({ ngoCount = 0, donationCount = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { 
      icon: Building2, 
      value: ngoCount, 
      label: 'Registered NGOs',
      suffix: '+',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    { 
      icon: MapPin, 
      value: 28, 
      label: 'States Covered',
      suffix: '+',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100',
    },
    { 
      icon: Tag, 
      value: 50, 
      label: 'Categories',
      suffix: '+',
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
    },
    { 
      icon: Heart, 
      value: donationCount, 
      label: 'Donation Campaigns',
      suffix: '+',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard 
              key={index} 
              {...stat} 
              isVisible={isVisible} 
              delay={index * 100} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon: Icon, value, label, suffix = '', color, bgColor, isVisible, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible && value > 0) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <div 
      className="text-center p-6 md:p-8 rounded-3xl bg-gray-50 border border-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`
      }}
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${bgColor} mb-4`}>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};

export default StatsSection;
