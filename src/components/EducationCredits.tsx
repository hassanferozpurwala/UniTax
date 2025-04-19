import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  tuitionPaid: string;
  has1098T: boolean;
  form1098T: File[];
  hasCourseMaterials: boolean;
  courseMaterialsAmount: string;
  courseMaterialsReceipts: File[];
  checkCredits: boolean;
}

const EducationCredits: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    tuitionPaid: '',
    has1098T: false,
    form1098T: [],
    hasCourseMaterials: false,
    courseMaterialsAmount: '',
    courseMaterialsReceipts: [],
    checkCredits: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (field: keyof FormData, files: FileList) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as File[]), ...Array.from(files)]
    }));
  };

  const removeFile = (field: keyof FormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as File[]).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/deductions');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Education Credits</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Tuition and Fees</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Did you pay out-of-pocket tuition or fees in 2024?
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        id="has1098T"
                        name="has1098T"
                        checked={formData.has1098T}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="has1098T" className="text-sm text-gray-700">Yes</label>
                    </div>
                    
                    {formData.has1098T && (
                      <div className="pl-8 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount Paid
                          </label>
                          <input
                            type="number"
                            name="tuitionPaid"
                            value={formData.tuitionPaid}
                            onChange={handleInputChange}
                            placeholder="Enter amount"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Form 1098-T (optional)
                          </label>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                              <Upload className="h-5 w-5 mr-2 text-gray-500" />
                              <span className="text-sm text-gray-600">Choose files</span>
                              <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => e.target.files && handleFileUpload('form1098T', e.target.files)}
                              />
                            </label>
                          </div>
                          {formData.form1098T.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {formData.form1098T.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                  <span className="text-sm text-gray-600">{file.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeFile('form1098T', index)}
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
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Did you buy books, supplies, or course materials required for class?
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        id="hasCourseMaterials"
                        name="hasCourseMaterials"
                        checked={formData.hasCourseMaterials}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="hasCourseMaterials" className="text-sm text-gray-700">Yes</label>
                    </div>
                    
                    {formData.hasCourseMaterials && (
                      <div className="pl-8 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Total Amount Spent
                          </label>
                          <input
                            type="number"
                            name="courseMaterialsAmount"
                            value={formData.courseMaterialsAmount}
                            onChange={handleInputChange}
                            placeholder="Enter amount"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Receipts (optional)
                          </label>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                              <Upload className="h-5 w-5 mr-2 text-gray-500" />
                              <span className="text-sm text-gray-600">Choose files</span>
                              <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => e.target.files && handleFileUpload('courseMaterialsReceipts', e.target.files)}
                              />
                            </label>
                          </div>
                          {formData.courseMaterialsReceipts.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {formData.courseMaterialsReceipts.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                  <span className="text-sm text-gray-600">{file.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeFile('courseMaterialsReceipts', index)}
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
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you want us to check for American Opportunity Credit or Lifetime Learning Credit eligibility?
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="checkCredits"
                      name="checkCredits"
                      checked={formData.checkCredits}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="checkCredits" className="text-sm text-gray-700">Yes, check my eligibility</label>
                  </div>
                </div>
              </div>
            </div>

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

export default EducationCredits;