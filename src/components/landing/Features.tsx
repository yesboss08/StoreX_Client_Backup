import React from 'react';
import { Container, Card } from '../ui';
import { 
  ShieldCheckIcon, 
  CloudIcon, 
  DevicePhoneMobileIcon, 
  ShareIcon, 
  LockClosedIcon, 
  BoltIcon 
} from '@heroicons/react/24/outline';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    icon: <ShieldCheckIcon className="h-8 w-8" />,
    title: "Enterprise Security",
    description: "Bank-level encryption and security protocols to keep your data safe and compliant with industry standards."
  },
  {
    icon: <CloudIcon className="h-8 w-8" />,
    title: "Unlimited Storage",
    description: "Scale your storage needs without limits. From gigabytes to petabytes, we grow with your business."
  },
  {
    icon: <DevicePhoneMobileIcon className="h-8 w-8" />,
    title: "Cross-Platform Sync",
    description: "Access your files seamlessly across all devices - desktop, mobile, tablet, and web browsers."
  },
  {
    icon: <ShareIcon className="h-8 w-8" />,
    title: "Smart Collaboration",
    description: "Share files and folders with granular permissions. Real-time collaboration with version control."
  },
  {
    icon: <LockClosedIcon className="h-8 w-8" />,
    title: "Advanced Privacy",
    description: "Zero-knowledge encryption ensures only you can access your data. Not even we can see your files."
  },
  {
    icon: <BoltIcon className="h-8 w-8" />,
    title: "Lightning Fast",
    description: "Optimized global CDN ensures fast uploads, downloads, and sync across all your devices worldwide."
  }
];

export const Features: React.FC<FeaturesProps> = ({
  title = "Everything you need in cloud storage",
  subtitle = "Powerful features designed for individuals, teams, and enterprises who demand the best in cloud storage.",
  features = defaultFeatures,
}) => {
  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-gray-900">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              variant="elevated" 
              className="group hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to experience the difference?
          </p>
          <div className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors cursor-pointer">
            <span>Explore all features</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
};