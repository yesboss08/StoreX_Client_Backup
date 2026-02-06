import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from '../components/ui';
import {
  CloudArrowUpIcon,
  CurrencyDollarIcon,
  RocketLaunchIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

interface RoadmapFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'coming-soon' | 'planned' | 'in-progress';
}

const getStatusBadgeClasses = (status: RoadmapFeature['status']): string => {
  const statusClasses = {
    'coming-soon': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'planned': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    'in-progress': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  };
  return statusClasses[status];
};

const getStatusLabel = (status: RoadmapFeature['status']): string => {
  const labels = {
    'coming-soon': 'Coming Soon',
    'planned': 'Planned',
    'in-progress': 'In Progress',
  };
  return labels[status];
};

export const Roadmap: React.FC = () => {
  const features: RoadmapFeature[] = [
    {
      icon: <CloudArrowUpIcon className="h-8 w-8" />,
      title: 'Cloud Platform Integration',
      description: 'Import files seamlessly from OneDrive, Google Drive, and Dropbox',
      status: 'coming-soon',
    },
    {
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      title: 'Cost-Effective Storage',
      description: 'Budget-friendly bucket storage options for cost-conscious users',
      status: 'planned',
    },
    {
      icon: <RocketLaunchIcon className="h-8 w-8" />,
      title: 'Premium S3 Storage',
      description: 'Lightning-fast S3 storage for users who need maximum performance',
      status: 'planned',
    },
    {
      icon: <DevicePhoneMobileIcon className="h-8 w-8" />,
      title: 'Device Access Tiers',
      description: 'Flexible device limits (2-3 devices) based on your subscription plan',
      status: 'coming-soon',
    },
    {
      icon: <ClockIcon className="h-8 w-8" />,
      title: 'Advanced File Versioning',
      description: 'Track and restore previous versions of your files with unlimited history',
      status: 'planned',
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: 'Team Workspaces',
      description: 'Dedicated collaborative spaces for teams with shared storage and permissions',
      status: 'planned',
    },
    {
      icon: <MagnifyingGlassIcon className="h-8 w-8" />,
      title: 'AI-Powered Search',
      description: 'Find files instantly using natural language and content-based search',
      status: 'in-progress',
    },
    {
      icon: <ArrowPathIcon className="h-8 w-8" />,
      title: 'Automated Backups',
      description: 'Schedule automatic backups of your important folders and files',
      status: 'coming-soon',
    },
    {
      icon: <DocumentTextIcon className="h-8 w-8" />,
      title: 'File Preview & Editing',
      description: 'View and edit documents, images, and videos directly in your browser',
      status: 'planned',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Container size="xl" className="py-20 sm:py-32">
        {/* Top Navigation */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" size="md" className="group">
              <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Features Roadmap
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the exciting features we're building to make your cloud storage experience even better. 
            Stay tuned as we bring these innovations to life.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="elevated"
              className="group hover:scale-105 transition-all duration-300 cursor-pointer relative"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(
                    feature.status
                  )}`}
                >
                  {getStatusLabel(feature.status)}
                </span>
              </div>

              <div className="text-center pt-2">
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

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Want to see what's available now?
          </p>
          <Link to="/">
            <Button variant="primary" size="lg" className="group">
              <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Explore Current Features
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};
