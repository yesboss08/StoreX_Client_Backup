import React from 'react';
import { Card } from '../ui';

export interface RoadmapFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'coming-soon' | 'planned' | 'in-progress';
  category?: string;
}

const getStatusBadgeClasses = (status: RoadmapFeatureCardProps['status']): string => {
  const statusClasses = {
    'coming-soon': 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    'planned': 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
    'in-progress': 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
  };
  return statusClasses[status];
};

const getStatusLabel = (status: RoadmapFeatureCardProps['status']): string => {
  const labels = {
    'coming-soon': 'Coming Soon',
    'planned': 'Planned',
    'in-progress': 'In Progress',
  };
  return labels[status];
};

export const RoadmapFeatureCard: React.FC<RoadmapFeatureCardProps> = ({
  icon,
  title,
  description,
  status,
  category,
}) => {
  return (
    <Card 
      variant="elevated" 
      className="group hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <div className="text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        {/* Status Badge */}
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(status)}`}>
            {getStatusLabel(status)}
          </span>
        </div>

        {/* Category (optional) */}
        {category && (
          <div className="mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {category}
            </span>
          </div>
        )}
        
        {/* Content */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};
