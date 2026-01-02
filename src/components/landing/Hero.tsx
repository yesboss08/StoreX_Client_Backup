import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '../ui';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';

export interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  title = "Store, Sync, and Share Your Files Securely test 6",
  subtitle = "CloudDrive sanat provides enterprise-grade security with consumer-friendly simplicity. Access your files anywhere, anytime, on any device.Created by sanat",
  primaryCtaText = "Get Started Free",
  secondaryCtaText = "Watch Demo",
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-400/20 to-indigo-400/20 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300 mb-8">
            <span>✨ New: Advanced file encryption now available</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
            <span className="block">{title.split(' ').slice(0, 3).join(' ')}</span>
            <span className="block text-primary-600 dark:text-primary-400">
              {title.split(' ').slice(3).join(' ')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" onClick={handlePrimaryClick}>
              <Button size="lg" className="group">
                {primaryCtaText}
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={handleSecondaryClick}
              className="group"
            >
              <PlayIcon className="mr-2 h-4 w-4" />
              {secondaryCtaText}
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
              Trusted by over 10,000+ teams worldwide
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              {/* Placeholder logos - replace with actual company logos */}
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};