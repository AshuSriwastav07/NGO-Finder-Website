import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Heart,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import logoImg from './logo.png';

const Footer = ({ onCategorySelect }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Find NGOs', href: '#ngos' },
    { name: 'Register NGO', href: '#register' },
    { name: 'Donation Campaigns', href: '#register' },
    { name: 'How It Works', href: '#how-it-works' },
  ];

  const categories = [
    'Education',
    'Healthcare',
    'Environment',
    'Women Empowerment',
    'Child Welfare',
    'Rural Development',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={logoImg} 
                alt="NGO Finder Logo" 
                className="h-12 w-12 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <h3 className="text-xl font-bold">NGO Finder</h3>
                <p className="text-sm text-gray-400">India</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Connecting verified NGOs with donors and volunteers across India. 
              Making philanthropy accessible and transparent.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary-500 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-secondary-500 rounded-full" />
              Categories
            </h4>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <button 
                    onClick={() => {
                      onCategorySelect?.(category);
                      window.scrollToNGOs?.();
                    }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-left"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent-500 rounded-full" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:contact@ngofinder.in" 
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>contact@ngofinder.in</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                <span>India</span>
              </li>
              <li>
                <a 
                  href="https://ngodarpan.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Globe className="w-5 h-5 shrink-0" />
                  <span className="flex items-center gap-1">
                    NGO Darpan
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-8">
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              Disclaimer
            </h5>
            <p className="text-sm text-gray-400 leading-relaxed">
              The data available on the NGO Finder platform is sourced from user submissions and is publicly available on the 
              <a 
                href="https://ngodarpan.gov.in/index.php/home" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-400 hover:text-primary-300 mx-1"
              >
                NGO Darpan website
              </a>.
              We do not claim ownership or authenticity of the data provided. All information submitted by users is verified 
              by the developer using the NGO Darpan platform before being displayed, but we cannot guarantee its accuracy or 
              completeness. Users are encouraged to independently verify any information found on our platform before making 
              decisions or taking action based on the data.
            </p>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              NGO Finder does not endorse or take responsibility for the actions or credibility of the NGOs listed. 
              Any use of the data from our platform is at the user's own risk. For official information and updates, 
              please refer directly to the NGO Darpan website.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} NGO Finder. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;