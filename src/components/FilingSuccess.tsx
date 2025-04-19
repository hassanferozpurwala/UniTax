import React from 'react';
import { CheckCircle, Download, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FilingSuccess: React.FC = () => {
  const navigate = useNavigate();
  
  const handleDownloadPDF = () => {
    // This would normally trigger a PDF generation and download
    console.log('Downloading PDF...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-12">
            <div className="flex justify-center mb-8">
              <CheckCircle className="h-20 w-20 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Tax Return Filed Successfully!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Your tax return has been submitted. You'll receive a confirmation email shortly with additional details.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleDownloadPDF}
                className="w-full flex items-center justify-center px-6 py-3 bg-white text-primary font-medium rounded-lg border border-primary hover:bg-gray-50 transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Your Return
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Home className="h-5 w-5 mr-2" />
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilingSuccess;