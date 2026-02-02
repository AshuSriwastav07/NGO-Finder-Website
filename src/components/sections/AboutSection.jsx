import React from 'react';
import { Target, Eye, Users, Award, Shield, Heart } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Organizations',
      description: 'Every NGO is verified through NGO Darpan before being listed on our platform.',
    },
    {
      icon: Heart,
      title: 'Easy to Connect',
      description: 'Simple interface to find and connect with organizations that match your values.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built for both NGOs and supporters to create meaningful connections.',
    },
    {
      icon: Award,
      title: 'Trusted Platform',
      description: 'Transparent information to help you make informed decisions about giving.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
              About NGO Finder
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Bridging the Gap Between 
              <span className="text-primary-600"> NGOs </span> 
              and 
              <span className="text-secondary-600"> Supporters</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              NGO Finder is a comprehensive platform designed to connect verified non-profit organizations 
              with donors, volunteers, and partners. Our mission is to make philanthropy accessible, 
              transparent, and impactful.
            </p>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-primary-50 rounded-2xl border border-primary-100">
                <Target className="w-10 h-10 text-primary-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-600 text-sm">
                  To democratize access to verified NGO information and facilitate meaningful 
                  connections between organizations and their supporters.
                </p>
              </div>
              <div className="p-6 bg-secondary-50 rounded-2xl border border-secondary-100">
                <Eye className="w-10 h-10 text-secondary-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Our Vision</h3>
                <p className="text-gray-600 text-sm">
                  A world where every willing donor can easily find trusted organizations 
                  to support causes they care about.
                </p>
              </div>
            </div>
          </div>

          {/* Features Side */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <div 
      className="group p-6 bg-gray-50 rounded-2xl border border-gray-100 transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-primary-200 hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary-600 group-hover:scale-110">
        <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default AboutSection;
