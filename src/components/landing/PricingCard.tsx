import React from 'react';
import { Card, Button } from '../ui';
import { CheckIcon } from '@heroicons/react/24/outline';

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  onSelect: () => void;
}

export interface PricingCardProps extends PricingTier {}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  ctaText,
  onSelect,
}) => {
  return (
    <Card 
      variant={highlighted ? "elevated" : "default"}
      className={`relative transition-all duration-300 hover:scale-105 ${
        highlighted 
          ? 'ring-2 ring-primary-500 shadow-xl' 
          : 'hover:shadow-lg'
      }`}
    >
      {/* Popular badge */}
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-primary-600 px-4 py-1 text-sm font-medium text-white">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {description}
          </p>
          
          {/* Price */}
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-bold text-gray-900 dark:text-white">
              {price}
            </span>
            <span className="text-xl text-gray-600 dark:text-gray-300 ml-1">
              /{period}
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={highlighted ? "primary" : "outline"}
          size="lg"
          className="w-full"
          onClick={onSelect}
        >
          {ctaText}
        </Button>
      </div>
    </Card>
  );
};