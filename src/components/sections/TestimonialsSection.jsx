import React from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "NGO Finder helped us reach thousands of potential donors and volunteers. Our visibility increased dramatically after getting listed on this platform.",
      author: "Priya Sharma",
      role: "Director",
      organization: "Education For All Foundation",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      quote: "As a donor, I always struggled to find verified NGOs. This platform gives me confidence that my contributions are going to legitimate organizations.",
      author: "Rajesh Kumar",
      role: "Regular Donor",
      organization: "Individual Contributor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      quote: "The verification process gave our organization credibility. We've seen a 200% increase in inquiries since joining NGO Finder.",
      author: "Dr. Anita Patel",
      role: "Founder",
      organization: "Health Access Initiative",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      quote: "Simple registration process and excellent support. NGO Finder truly understands the needs of small grassroots organizations like ours.",
      author: "Mohammed Ali",
      role: "Secretary",
      organization: "Rural Development Society",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What People Say About Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from NGOs and supporters who have benefited from our platform.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
            <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 pt-12">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-8 bg-primary-600' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary-500/25"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ quote, author, role, organization, image, rating }) => {
  return (
    <div className="text-center">
      {/* Rating */}
      <div className="flex justify-center gap-1 mb-6">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-center gap-4">
        <img
          src={image}
          alt={author}
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
        />
        <div className="text-left">
          <div className="font-bold text-gray-900">{author}</div>
          <div className="text-sm text-gray-500">{role}, {organization}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
