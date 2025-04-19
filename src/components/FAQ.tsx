import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "Do I need to file taxes as a student?",
      answer: "Generally, if you earned income over $12,950 (for 2023), you're required to file. However, you might want to file even with lower income to claim a refund of withheld taxes or education credits."
    },
    {
      question: "What tax benefits are available for students?",
      answer: "Students may qualify for several tax benefits including the American Opportunity Credit (up to $2,500), Lifetime Learning Credit (up to $2,000), student loan interest deduction, and tuition and fees deduction."
    },
    {
      question: "Are my scholarships taxable?",
      answer: "Scholarships used for tuition, fees, books, and required supplies are generally tax-free. However, amounts used for room, board, or stipends are typically taxable. UniTax helps you determine what portions are taxable."
    },
    {
      question: "Can I be claimed as a dependent on my parents' return?",
      answer: "If you're under 24, a full-time student, and your parents provide more than half your financial support, they can typically claim you as a dependent. This affects which tax benefits you can claim yourself."
    },
    {
      question: "How does UniTax handle international students?",
      answer: "UniTax provides specialized guidance for international students, helping navigate tax treaties, FICA exemptions, and determining residency status for tax purposes."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Common questions about student taxes, answered.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors duration-200 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-900">{item.question}</span>
                {openIndex === index ? 
                  <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                }
              </button>
              <div 
                className={`p-4 bg-white border-t border-gray-200 ${openIndex === index ? 'block' : 'hidden'}`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;