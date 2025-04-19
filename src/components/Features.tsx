import React from 'react';
import { DollarSign, Clock, ShieldCheck, BookOpen } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features: React.FC = () => {
  const features = [
    {
      icon: <DollarSign className="h-10 w-10 text-primary" />,
      title: "Maximize Your Refund",
      description: "Our system automatically identifies all eligible deductions and credits specifically relevant to students."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Quick & Easy Filing",
      description: "Complete your taxes in under 30 minutes with our streamlined, student-focused process."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "100% Accuracy Guarantee",
      description: "Built-in checks and expert-designed logic to ensure your filing is error-free and compliant."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Educational Resources",
      description: "Learn as you file with helpful tips and explanations of tax concepts tailored for students."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Students Choose UniTax
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Filing taxes as a student shouldn't be complicated. We've simplified the process while maximizing your benefits.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;