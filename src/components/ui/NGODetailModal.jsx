import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ExternalLink, 
  Building2, 
  Hash, 
  Tag, 
  FileText,
  ShieldCheck,
  Share2,
  Copy,
  CheckCircle
} from 'lucide-react';
import Modal from './Modal';
import Badge from './Badge';
import Button from './Button';

const NGODetailModal = ({ isOpen, onClose, ngoData }) => {
  const [copied, setCopied] = React.useState(false);

  if (!ngoData) return null;

  const [name, address, regId, phone, email, type, uniqueId, image, sectors, website] = ngoData;
  const sectorList = sectors ? sectors.split(',').map(s => s.trim()) : [];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: `Check out ${name} on NGO Finder`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      {/* Hero Image Section */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden bg-gradient-to-br from-primary-600 to-secondary-600">
        <img
          src={image || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop'}
          alt={name}
          className="w-full h-full object-cover opacity-90"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop';
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Verified Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <Badge variant="verified" icon={ShieldCheck} size="lg">
            Verified NGO
          </Badge>
        </div>

        {/* NGO Name on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
            {name || 'NGO Name'}
          </h2>
          <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="line-clamp-1">{address || 'Address not available'}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 md:p-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          {website && website !== 'N/A' && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[140px] sm:flex-none"
            >
              <Button variant="primary" size="md" icon={Globe} className="w-full sm:w-auto">
                <span className="hidden xs:inline">Visit </span>Website
              </Button>
            </a>
          )}
          {phone && (
            <a href={`tel:${phone}`} className="flex-1 min-w-[120px] sm:flex-none">
              <Button variant="secondary" size="md" icon={Phone} className="w-full sm:w-auto">
                Call<span className="hidden sm:inline"> Now</span>
              </Button>
            </a>
          )}
          <Button 
            variant="outline" 
            size="md" 
            icon={copied ? CheckCircle : Share2}
            onClick={handleShare}
            className="flex-1 min-w-[100px] sm:flex-none"
          >
            {copied ? 'Copied!' : 'Share'}
          </Button>
        </div>

        {/* Sectors/Categories */}
        {sectorList.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
              Working Sectors
            </h3>
            <div className="flex flex-wrap gap-2">
              {sectorList.map((sector, idx) => (
                <Badge key={idx} variant="primary" size="md">
                  {sector}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600" />
              Contact Information
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {phone && (
                <DetailItem 
                  icon={Phone} 
                  label="Phone" 
                  value={phone}
                  href={`tel:${phone}`}
                />
              )}
              {email && (
                <DetailItem 
                  icon={Mail} 
                  label="Email" 
                  value={email}
                  href={`mailto:${email}`}
                />
              )}
              {website && website !== 'N/A' && (
                <DetailItem 
                  icon={Globe} 
                  label="Website" 
                  value={website.replace(/^https?:\/\//, '').slice(0, 30) + '...'}
                  href={website}
                  external
                />
              )}
              {address && (
                <DetailItem 
                  icon={MapPin} 
                  label="Address" 
                  value={address}
                />
              )}
            </div>
          </div>

          {/* Registration Details */}
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
              Registration Details
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {type && (
                <DetailItem 
                  icon={Building2} 
                  label="Organization Type" 
                  value={type}
                />
              )}
              {regId && (
                <DetailItem 
                  icon={Hash} 
                  label="Registration ID" 
                  value={regId}
                />
              )}
              {uniqueId && (
                <DetailItem 
                  icon={Hash} 
                  label="Unique ID" 
                  value={uniqueId}
                />
              )}
            </div>
          </div>
        </div>

        {/* Verification Note */}
        <div className="bg-secondary-50 border border-secondary-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-secondary-100 rounded-lg shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-600" />
            </div>
            <div>
              <h4 className="font-semibold text-secondary-800 mb-1 text-sm sm:text-base">Verified Organization</h4>
              <p className="text-secondary-700 text-xs sm:text-sm leading-relaxed">
                This NGO has been verified through the NGO Darpan platform. We recommend 
                independently verifying any information before making donations or partnerships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const DetailItem = ({ icon: Icon, label, value, href, external }) => {
  const content = (
    <div className="flex items-start gap-3">
      <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm shrink-0">
        <Icon className="w-4 h-4 text-gray-500" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-sm sm:text-base text-gray-900 font-medium break-words">
          {value}
          {external && <ExternalLink className="w-3 h-3 inline ml-1 text-gray-400" />}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target={external ? '_blank' : '_self'} 
        rel={external ? 'noopener noreferrer' : ''}
        className="block hover:bg-white rounded-lg p-1 -m-1 transition-colors"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default NGODetailModal;
