import React from 'react';
import { ClipboardList, ShieldCheck, Users, Search, Heart, Sparkles } from 'lucide-react';

const HowItWorksSection = () => {
  const ngoSteps = [
    {
      icon: ClipboardList,
      title: 'Register',
      description: 'Fill out the simple registration form with your NGO details and documents.',
      color: 'bg-primary-500',
    },
    {
      icon: ShieldCheck,
      title: 'Get Verified',
      description: 'Our team verifies your information with NGO Darpan for authenticity.',
      color: 'bg-secondary-500',
    },
    {
      icon: Users,
      title: 'Get Discovered',
      description: 'Your NGO becomes visible to donors and volunteers looking to make an impact.',
      color: 'bg-accent-500',
    },
  ];

  const userSteps = [
    {
      icon: Search,
      title: 'Search',
      description: 'Browse our directory of verified NGOs by category, location, or cause.',
      color: 'bg-primary-500',
    },
    {
      icon: Heart,
      title: 'Connect',
      description: 'Find organizations that align with your values and reach out directly.',
      color: 'bg-secondary-500',
    },
    {
      icon: Sparkles,
      title: 'Make Impact',
      description: 'Donate, volunteer, or partner with NGOs to create meaningful change.',
      color: 'bg-accent-500',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're an NGO looking to expand your reach or someone wanting to make a difference, 
            our platform makes it easy.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* For NGOs */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold mb-8">
              <ClipboardList className="w-4 h-4" />
              For NGOs
            </div>

            <div className="space-y-8">
              {ngoSteps.map((step, index) => (
                <StepCard key={index} {...step} number={index + 1} isLast={index === ngoSteps.length - 1} />
              ))}
            </div>
          </div>

          {/* For Donors/Volunteers */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 font-semibold mb-8">
              <Heart className="w-4 h-4" />
              For Supporters
            </div>

            <div className="space-y-8">
              {userSteps.map((step, index) => (
                <StepCard key={index} {...step} number={index + 1} isLast={index === userSteps.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ icon: Icon, title, description, color, number, isLast }) => {
  return (
    <div className="relative flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-2xl ${color} text-white font-bold shadow-lg`}>
          {number}
        </div>
        {!isLast && (
          <div className="flex-1 w-0.5 bg-gray-200 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="bg-gray-50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:bg-white border border-transparent hover:border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-xl ${color} bg-opacity-10`}>
              <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
