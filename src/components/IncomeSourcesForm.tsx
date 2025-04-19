import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, X, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface IncomeSource {
  type: string;
  amount: string;
  files: File[];
  description?: string;
  uploadStatus?: {
    uploaded: boolean;
    fileIds: string[];
    error?: string;
  };
}

const API_BASE_URL = 'http://localhost:8000'; // Update with your actual backend URL

const IncomeSourcesForm: React.FC = () => {
  const navigate = useNavigate();
  const [incomeSources, setIncomeSources] = useState<Record<string, IncomeSource>>({
    w2: { type: 'W-2', amount: '', files: [] },
    freelance: { type: 'Freelance/1099', amount: '', files: [] },
    scholarship: { type: 'Scholarship', amount: '', files: [] },
    other: { type: 'Other', amount: '', files: [], description: '' }
  });
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({
    w2: false,
    freelance: false,
    scholarship: false,
    other: false
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

  // Function to securely upload files to the backend
  const uploadFiles = async (sourceKey: string) => {
    const source = incomeSources[sourceKey];
    
    if (source.files.length === 0) return;
    
    // Set uploading state
    setIsUploading(prev => ({ ...prev, [sourceKey]: true }));
    
    try {
      const uploadedFileIds: string[] = [];
      
      // Upload each file individually
      for (const file of source.files) {
        const formData = new FormData();
        formData.append('file', file);
        
        // Call the secure backend upload endpoint
        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (response.data && response.data.id) {
          uploadedFileIds.push(response.data.id);
        }
      }
      
      // Update the income source with successful upload status
      setIncomeSources(prev => ({
        ...prev,
        [sourceKey]: {
          ...prev[sourceKey],
          uploadStatus: {
            uploaded: true,
            fileIds: uploadedFileIds
          }
        }
      }));
      
    } catch (error: any) {
      console.error(`Error uploading ${sourceKey} files:`, error);
      
      // Update with error status
      setIncomeSources(prev => ({
        ...prev,
        [sourceKey]: {
          ...prev[sourceKey],
          uploadStatus: {
            uploaded: false,
            fileIds: [],
            error: error.response?.data?.detail || 'Upload failed. Please check file type and try again.'
          }
        }
      }));
    } finally {
      // Clear uploading state
      setIsUploading(prev => ({ ...prev, [sourceKey]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Upload any remaining files that haven't been uploaded yet
    const uploadPromises = Object.entries(incomeSources)
      .filter(([_, source]) => source.files.length > 0 && !source.uploadStatus?.uploaded)
      .map(([key, _]) => uploadFiles(key));
    
    // Wait for all uploads to complete
    await Promise.all(uploadPromises);
    
    // Collect all the data including file IDs for submission
    const formattedData = Object.entries(incomeSources).reduce((acc, [key, source]) => {
      return {
        ...acc,
        [key]: {
          type: source.type,
          amount: source.amount,
          fileIds: source.uploadStatus?.fileIds || [],
          description: source.description
        }
      };
    }, {});
    
    console.log('Income sources submitted:', formattedData);
    
    // Navigate to the next page
    navigate('/education-credits');
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Render upload status for a source
  const renderUploadStatus = (sourceKey: string) => {
    const source = incomeSources[sourceKey];
    
    if (!source.uploadStatus) return null;
    
    if (source.uploadStatus.error) {
      return (
        <div className="mt-2 flex items-center text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{source.uploadStatus.error}</span>
        </div>
      );
    }
    
    if (source.uploadStatus.uploaded) {
      return (
        <div className="mt-2 flex items-center text-green-600 text-sm">
          <CheckCircle className="h-4 w-4 mr-1" />
          <span>Files uploaded securely</span>
        </div>
      );
    }
    
    return null;
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
                        accept=".pdf,.jpg,.jpeg,.png" // Restrict to allowed file types
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
                      <button
                        type="button"
                        onClick={() => uploadFiles('w2')}
                        disabled={isUploading.w2 || incomeSources.w2.uploadStatus?.uploaded}
                        className={`mt-2 px-4 py-2 text-sm rounded ${
                          isUploading.w2 
                            ? 'bg-gray-200 text-gray-500' 
                            : incomeSources.w2.uploadStatus?.uploaded
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {isUploading.w2 
                          ? 'Uploading...' 
                          : incomeSources.w2.uploadStatus?.uploaded
                            ? 'Uploaded'
                            : 'Upload now'}
                      </button>
                      {renderUploadStatus('w2')}
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
                        accept=".pdf,.jpg,.jpeg,.png"
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
                      <button
                        type="button"
                        onClick={() => uploadFiles('freelance')}
                        disabled={isUploading.freelance || incomeSources.freelance.uploadStatus?.uploaded}
                        className={`mt-2 px-4 py-2 text-sm rounded ${
                          isUploading.freelance 
                            ? 'bg-gray-200 text-gray-500' 
                            : incomeSources.freelance.uploadStatus?.uploaded
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {isUploading.freelance 
                          ? 'Uploading...' 
                          : incomeSources.freelance.uploadStatus?.uploaded
                            ? 'Uploaded'
                            : 'Upload now'}
                      </button>
                      {renderUploadStatus('freelance')}
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
                        accept=".pdf,.jpg,.jpeg,.png"
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
                      <button
                        type="button"
                        onClick={() => uploadFiles('scholarship')}
                        disabled={isUploading.scholarship || incomeSources.scholarship.uploadStatus?.uploaded}
                        className={`mt-2 px-4 py-2 text-sm rounded ${
                          isUploading.scholarship 
                            ? 'bg-gray-200 text-gray-500' 
                            : incomeSources.scholarship.uploadStatus?.uploaded
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {isUploading.scholarship 
                          ? 'Uploading...' 
                          : incomeSources.scholarship.uploadStatus?.uploaded
                            ? 'Uploaded'
                            : 'Upload now'}
                      </button>
                      {renderUploadStatus('scholarship')}
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
                        accept=".pdf,.jpg,.jpeg,.png"
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
                      <button
                        type="button"
                        onClick={() => uploadFiles('other')}
                        disabled={isUploading.other || incomeSources.other.uploadStatus?.uploaded}
                        className={`mt-2 px-4 py-2 text-sm rounded ${
                          isUploading.other 
                            ? 'bg-gray-200 text-gray-500' 
                            : incomeSources.other.uploadStatus?.uploaded
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {isUploading.other 
                          ? 'Uploading...' 
                          : incomeSources.other.uploadStatus?.uploaded
                            ? 'Uploaded'
                            : 'Upload now'}
                      </button>
                      {renderUploadStatus('other')}
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