import React from 'react';
import { FileText, Clock, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <FileText className="h-12 w-12 text-primary" />,
      title: "Enter Your Information",
      description: "Answer simple questions about your student status, income, and expenses."
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: "Review & Optimize",
      description: "Our system checks for all student-specific deductions and credits you qualify for."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-primary" />,
      title: "File & Relax",
      description: "Submit your return electronically and track your refund status."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to file your taxes and maximize your refund.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center w-full md:w-1/3">
              <div className="relative">
                <div className="bg-white p-4 rounded-full shadow-md mb-4">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-gray-200">
                    <div className="h-full bg-primary" style={{ width: '100%' }}></div>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;