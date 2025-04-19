import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const handleStartFiling = () => {
    navigate('/student-type');
  };

  const handleAskAI = () => {
    // Find and trigger the chat button click
    const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
    }
  };

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Taxes Made <span className="text-primary">Simple</span><br />
              for Students
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              File your taxes quickly and easily with guidance designed specifically for students. Save money and avoid the stress.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleStartFiling}
                className="btn-primary flex items-center justify-center"
              >
                Start Filing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={handleAskAI}
                className="btn-secondary"
              >
                Ask Sigma AI
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img 
              src="https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Student working on taxes" 
              className="w-full max-w-lg rounded-lg shadow-xl transform translate-y-4 hover:translate-y-0 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;