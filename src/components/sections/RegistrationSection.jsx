import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  FileText, 
  Tag, 
  Image as ImageIcon,
  Hash,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Send,
  RotateCcw,
  Heart,
  DollarSign,
  Link as LinkIcon
} from 'lucide-react';
import { Button, Input, Card } from '../ui';

const RegistrationSection = ({ 
  onNGOSubmit, 
  onDonationSubmit, 
  isSubmitted, 
  sectionRef 
}) => {
  const [activeTab, setActiveTab] = useState('ngo');

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-secondary-500/10 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-4 backdrop-blur-sm border border-white/20">
            Get Started Today
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Register Your Organization
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Join our platform to reach more supporters and make a greater impact. 
            Registration is quick, easy, and free.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 border border-white/20">
            <button
              onClick={() => setActiveTab('ngo')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'ngo'
                  ? 'bg-white text-primary-700 shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-5 h-5" />
              NGO Registration
            </button>
            <button
              onClick={() => setActiveTab('donation')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'donation'
                  ? 'bg-white text-primary-700 shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart className="w-5 h-5" />
              Donation Campaign
            </button>
          </div>
        </div>

        {/* Forms */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'ngo' ? (
            <NGORegistrationForm onSubmit={onNGOSubmit} isSubmitted={isSubmitted} />
          ) : (
            <DonationRegistrationForm onSubmit={onDonationSubmit} isSubmitted={isSubmitted} />
          )}
        </div>
      </div>
    </section>
  );
};

const NGORegistrationForm = ({ onSubmit, isSubmitted }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onSubmit(e);
    }
  };

  const handleReset = (e) => {
    setStep(1);
    e.target.closest('form').reset();
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm" padding="lg">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</span>
          <span className="text-sm text-gray-500">
            {step === 1 && 'Basic Information'}
            {step === 2 && 'Contact Details'}
            {step === 3 && 'Additional Information'}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleFormSubmit} id="NGODataForm">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary-600" />
              Basic Information
            </h3>

            <Input
              label="NGO Name"
              name="0"
              placeholder="Enter your organization's name"
              required
              icon={Building2}
            />

            <Input
              label="NGO Address"
              name="1"
              placeholder="Full address of your organization"
              required
              icon={MapPin}
            />

            <Input
              label="Registration ID"
              name="2"
              placeholder="NGO Darpan Registration ID"
              required
              icon={Hash}
              helperText="Your official registration number from NGO Darpan"
            />
          </div>
        )}

        {/* Step 2: Contact Details */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6 text-primary-600" />
              Contact Details
            </h3>

            <Input
              label="Phone Number"
              name="3"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              required
              icon={Phone}
            />

            <Input
              label="Email Address"
              name="4"
              type="email"
              placeholder="contact@yourorganization.org"
              required
              icon={Mail}
            />

            <Input
              label="Organization Type"
              name="5"
              placeholder="e.g., Trust, Society, Section 8 Company"
              required
              icon={Tag}
            />
          </div>
        )}

        {/* Step 3: Additional Information */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary-600" />
              Additional Information
            </h3>

            <Input
              label="Unique ID"
              name="6"
              placeholder="Organization's unique identifier"
              required
              icon={Hash}
            />

            <Input
              label="Logo/Image URL"
              name="7"
              type="url"
              placeholder="https://example.com/logo.png"
              required
              icon={ImageIcon}
              helperText="Direct link to your organization's logo (PNG, JPG)"
            />

            <Input
              label="Working Sectors"
              name="8"
              placeholder="Education, Healthcare, Environment"
              required
              icon={Tag}
              helperText="Separate multiple sectors with commas"
            />

            <Input
              label="Website"
              name="9"
              type="url"
              placeholder="https://yourorganization.org"
              required
              icon={Globe}
            />
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <div className="flex gap-3">
            {step > 1 && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep(step - 1)}
                icon={ChevronLeft}
              >
                Previous
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              onClick={handleReset}
              icon={RotateCcw}
            >
              Reset
            </Button>
          </div>

          <Button
            type="submit"
            variant={step === totalSteps ? 'secondary' : 'primary'}
            icon={step === totalSteps ? Send : ChevronRight}
            iconPosition="right"
          >
            {step === totalSteps ? 'Submit Registration' : 'Next Step'}
          </Button>
        </div>
      </form>

      {/* Success Message */}
      {isSubmitted && (
        <div className="mt-6 p-4 bg-secondary-50 border border-secondary-200 rounded-xl flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-6 h-6 text-secondary-600 shrink-0" />
          <div>
            <p className="font-semibold text-secondary-800">Registration Submitted!</p>
            <p className="text-sm text-secondary-600">Your NGO details have been submitted for verification.</p>
          </div>
        </div>
      )}
    </Card>
  );
};

const DonationRegistrationForm = ({ onSubmit, isSubmitted }) => {
  return (
    <Card className="bg-white/95 backdrop-blur-sm" padding="lg">
      <form onSubmit={onSubmit}>
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-accent-600" />
          Create Donation Campaign
        </h3>

        <p className="text-gray-600 mb-6">
          Set up a donation campaign to receive contributions. Please provide accurate information 
          about your organization and how the funds will be utilized.
        </p>

        <div className="space-y-6">
          <Input
            label="NGO Name"
            name="0"
            placeholder="Your organization's name"
            required
            icon={Building2}
          />

          <Input
            label="Fund Usage Description"
            name="1"
            placeholder="Describe how the donations will be used"
            required
            icon={DollarSign}
            helperText="Be specific about the cause and impact"
          />

          <Input
            label="Campaign Image URL"
            name="2"
            type="url"
            placeholder="https://example.com/campaign-image.jpg"
            required
            icon={ImageIcon}
            helperText="An impactful image representing your campaign"
          />

          <Input
            label="Donation Page URL"
            name="3"
            type="url"
            placeholder="https://yourwebsite.com/donate"
            required
            icon={LinkIcon}
            helperText="Direct link to your donation page"
          />

          <Input
            label="Official Website"
            name="4"
            type="url"
            placeholder="https://yourorganization.org"
            required
            icon={Globe}
          />
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <Button
            type="reset"
            variant="ghost"
            icon={RotateCcw}
          >
            Reset Form
          </Button>

          <Button
            type="submit"
            variant="accent"
            icon={Send}
            iconPosition="right"
          >
            Submit Campaign
          </Button>
        </div>
      </form>

      {/* Success Message */}
      {isSubmitted && (
        <div className="mt-6 p-4 bg-secondary-50 border border-secondary-200 rounded-xl flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-6 h-6 text-secondary-600 shrink-0" />
          <div>
            <p className="font-semibold text-secondary-800">Campaign Submitted!</p>
            <p className="text-sm text-secondary-600">Your donation campaign is under review.</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default RegistrationSection;
