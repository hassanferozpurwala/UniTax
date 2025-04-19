import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to simplify your taxes?
        </h2>
        <p className="text-xl text-white opacity-90 max-w-2xl mx-auto mb-10">
          Join thousands of students who are saving time and money with UniTax.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="btn-white flex items-center justify-center mx-auto sm:mx-0">
            Start Filing Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="btn-white-outline flex items-center justify-center mx-auto sm:mx-0">
            Talk to Tax AI
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;