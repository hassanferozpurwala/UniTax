import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  hasLoanInterest: boolean;
  loanInterestAmount: string;
  form1098E: File[];
  hasRetirement: boolean;
  retirementAmount: string;
  hasHealthcare: boolean;
  healthcareAmount: string;
  hasCharity: boolean;
  charityAmount: string;
}

const Deductions: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    hasLoanInterest: false,
    loanInterestAmount: '',
    form1098E: [],
    hasRetirement: false,
    retirementAmount: '',
    hasHealthcare: false,
    healthcareAmount: '',
    hasCharity: false,
    charityAmount: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (files: FileList) => {
    setFormData(prev => ({
      ...prev,
      form1098E: [...prev.form1098E, ...Array.from(files)]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      form1098E: prev.form1098E.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/summary');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Deductions</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-6">
                {/* Student Loan Interest */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Did you pay any student loan interest in 2024?
                    </label>
                    <a 
                      href="https://www.irs.gov/publications/p970#en_US_2022_publink1000178272"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark flex items-center text-sm"
                    >
                      IRS Info <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        id="hasLoanInterest"
                        name="hasLoanInterest"
                        checked={formData.hasLoanInterest}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="hasLoanInterest" className="text-sm text-gray-700">Yes</label>
                    </div>
                    
                    {formData.hasLoanInterest && (
                      <div className="pl-8 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Interest Amount
                          </label>
                          <input
                            type="number"
                            name="loanInterestAmount"
                            value={formData.loanInterestAmount}
                            onChange={handleInputChange}
                            placeholder="Enter amount"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Form 1098-E (optional)
                          </label>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                              <Upload className="h-5 w-5 mr-2 text-gray-500" />
                              <span className="text-sm text-gray-600">Choose files</span>
                              <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                              />
                            </label>
                          </div>
                          {formData.form1098E.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {formData.form1098E.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                  <span className="text-sm text-gray-600">{file.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(index)}
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

                {/* Retirement Contributions */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Did you contribute to an IRA or retirement account?
                    </label>
                    <a 
                      href="https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-tax-on-ira-contributions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark flex items-center text-sm"
                    >
                      IRS Info <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        id="hasRetirement"
                        name="hasRetirement"
                        checked={formData.hasRetirement}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="hasRetirement" className="text-sm text-gray-700">Yes</label>
                    </div>
                    
                    {formData.hasRetirement && (
                      <div className="pl-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contribution Amount
                        </label>
                        <input
                          type="number"
                          name="retirementAmount"
                          value={formData.retirementAmount}
                          onChange={handleInputChange}
                          placeholder="Enter amount"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Healthcare Expenses */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Any healthcare expenses or insurance premiums paid out-of-pocket?
                    </label>
                    <a 
                      href="https://www.irs.gov/taxtopics/tc502"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark flex items-center text-sm"
                    >
                      IRS Info <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        id="hasHealthcare"
                        name="hasHealthcare"
                        checked={formData.hasHealthcare}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="hasHealthcare" className="text-sm text-gray-700">Yes</label>
                    </div>
                    
                    {formData.hasHealthcare && (
                      <div className="pl-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Healthcare Expenses
                        </label>
                        <input
                          type="number"
                          name="healthcareAmount"
                          value={formData.healthcareAmount}
                          onChange={handleInputChange}
                          placeholder="Enter amount"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Charitable Donations */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Any charitable donations?
                    </label>
                    <a 
                      href="https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-contribution-deductions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark flex items-center text-sm"
                    >
                      IRS Info <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        id="hasCharity"
                        name="hasCharity"
                        checked={formData.hasCharity}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="hasCharity" className="text-sm text-gray-700">Yes</label>
                    </div>
                    
                    {formData.hasCharity && (
                      <div className="pl-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Donations
                        </label>
                        <input
                          type="number"
                          name="charityAmount"
                          value={formData.charityAmount}
                          onChange={handleInputChange}
                          placeholder="Enter amount"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    )}
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

export default Deductions;