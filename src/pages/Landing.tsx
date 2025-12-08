import React from 'react';
import { Header, Footer } from '../components/layout';
import { Hero, Features, PricingSection } from '../components/landing';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header showAuth={true} />
      
      <main>
        <Hero />
        <Features />
        <PricingSection />
      </main>
      
      <Footer />
    </div>
  );
};