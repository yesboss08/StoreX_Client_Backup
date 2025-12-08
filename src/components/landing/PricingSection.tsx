import React from 'react';
import { Container } from '../ui';
import { PricingCard, type PricingTier } from './PricingCard';
import { CheckIcon } from '@heroicons/react/24/outline';

export interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
}

const defaultTiers: PricingTier[] = [
  {
    name: "Personal",
    price: "$0",
    period: "month",
    description: "Perfect for individuals getting started",
    features: [
      "5 GB storage",
      "Basic file sharing",
      "Mobile & desktop apps",
      "Email support",
      "Basic security"
    ],
    ctaText: "Get Started Free",
    onSelect: () => {
      // Navigate to signup
      window.location.href = '/signup';
    }
  },
  {
    name: "Pro",
    price: "$12",
    period: "month",
    description: "Ideal for professionals and small teams",
    features: [
      "1 TB storage",
      "Advanced sharing & permissions",
      "Version history (30 days)",
      "Priority support",
      "Advanced security",
      "Team collaboration tools",
      "API access"
    ],
    highlighted: true,
    ctaText: "Start Pro Trial",
    onSelect: () => {
      // Navigate to signup with pro plan
      window.location.href = '/signup?plan=pro';
    }
  },
  {
    name: "Enterprise",
    price: "$25",
    period: "user/month",
    description: "Advanced features for large organizations",
    features: [
      "Unlimited storage",
      "Advanced admin controls",
      "Unlimited version history",
      "24/7 phone support",
      "Enterprise security & compliance",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee"
    ],
    ctaText: "Contact Sales",
    onSelect: () => {
      // Navigate to contact sales
      window.location.href = '/contact';
    }
  }
];

export const PricingSection: React.FC<PricingSectionProps> = ({
  title = "Simple, transparent pricing",
  subtitle = "Choose the plan that's right for you. Upgrade or downgrade at any time.",
  tiers = defaultTiers,
}) => {
  return (
    <section className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-800">
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <PricingCard key={index} {...tier} />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <CheckIcon className="h-4 w-4 mr-1" />
              Cancel anytime
            </span>
            <span className="flex items-center">
              <CheckIcon className="h-4 w-4 mr-1" />
              No setup fees
            </span>
            <span className="flex items-center">
              <CheckIcon className="h-4 w-4 mr-1" />
              24/7 support
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};