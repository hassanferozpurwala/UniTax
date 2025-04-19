import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IncomeSource {
  type: string;
  amount: string;
  files: File[];
  description?: string;
}

const IncomeSourcesForm: React.FC = () => {
  const navigate = useNavigate();
  const [incomeSources, setIncomeSources] = useState<Record<string, IncomeSource>>({
    w2: { type: 'W-2', amount: '', files: [] },
    freelance: { type: 'Freelance/1099', amount: '', files: [] },
    scholarship: { type: 'Scholarship', amount: '', files: [] },
    other: { type: 'Other', amount: '', files: [], description: '' }
  });

  const handleFileUpload = (sourceKey: string, files: FileList) => {
    setIncomeSources(prev => ({
      ...prev,
      [sourceKey]: {
        ...prev[sourceKey],
        files: [...prev[sourceKey].files, ...Array.from(files)]
      }
    }));
  };

  const removeFile = (sourceKey: string, fileIndex: number) => {
    setIncomeSources(prev => ({
      ...prev,
      [sourceKey]: {
        ...prev[sourceKey],
        files: prev[sourceKey].files.filter((_, index) => index !== fileIndex)
      }
    }));
  };

  const handleInputChange = (sourceKey: string, field: string, value: string) => {
    setIncomeSources(prev => ({
      ...prev,
      [sourceKey]: {
        ...prev[sourceKey],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Income sources submitted:', incomeSources);
    navigate('/education-credits');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Income Sources</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* W-2 Income */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">W-2 Income</h2>
                <a 
                  href="https://www.irs.gov/forms-pubs/about-form-w-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark flex items-center text-sm"
                >
                  About W-2 <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload W-2 Forms
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <Upload className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">Choose files</span>
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && handleFileUpload('w2', e.target.files)}
                      />
                    </label>
                    <input
                      type="number"
                      placeholder="Total W-2 income"
                      value={incomeSources.w2.amount}
                      onChange={(e) => handleInputChange('w2', 'amount', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  {incomeSources.w2.files.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {incomeSources.w2.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile('w2', index)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Freelance/1099 Income */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Freelance/1099 Income</h2>
                <a 
                  href="https://www.irs.gov/forms-pubs/about-form-1099-misc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark flex items-center text-sm"
                >
                  About 1099 <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload 1099 Forms
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <Upload className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">Choose files</span>
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && handleFileUpload('freelance', e.target.files)}
                      />
                    </label>
                    <input
                      type="number"
                      placeholder="Total freelance income"
                      value={incomeSources.freelance.amount}
                      onChange={(e) => handleInputChange('freelance', 'amount', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  {incomeSources.freelance.files.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {incomeSources.freelance.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile('freelance', index)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scholarship Income */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Scholarship Income</h2>
                <a 
                  href="https://www.irs.gov/taxtopics/tc421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark flex items-center text-sm"
                >
                  About Scholarships <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload 1098-T Form
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <Upload className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">Choose files</span>
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && handleFileUpload('scholarship', e.target.files)}
                      />
                    </label>
                    <input
                      type="number"
                      placeholder="Total scholarship amount"
                      value={incomeSources.scholarship.amount}
                      onChange={(e) => handleInputChange('scholarship', 'amount', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  {incomeSources.scholarship.files.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {incomeSources.scholarship.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile('scholarship', index)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Other Income */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Other Income</h2>
                <a 
                  href="https://www.irs.gov/publications/p525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark flex items-center text-sm"
                >
                  About Other Income <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Prize money, stipends"
                    value={incomeSources.other.description}
                    onChange={(e) => handleInputChange('other', 'description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                  />
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <Upload className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">Upload documents</span>
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && handleFileUpload('other', e.target.files)}
                      />
                    </label>
                    <input
                      type="number"
                      placeholder="Amount"
                      value={incomeSources.other.amount}
                      onChange={(e) => handleInputChange('other', 'amount', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  {incomeSources.other.files.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {incomeSources.other.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile('other', index)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </button>
              <button
                type="submit"
                className="flex items-center text-white bg-primary px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Continue
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IncomeSourcesForm;