import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Download, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SummaryData {
  totalIncome: number;
  estimatedRefund: number;
  isRefund: boolean;
  deductions: Array<{ name: string; amount: number }>;
  credits: Array<{ name: string; amount: number }>;
  filingType: 'Resident' | 'Non-Resident';
}

const TaxSummary: React.FC = () => {
  const navigate = useNavigate();
  // This would normally come from a global state management solution
  const [summaryData] = useState<SummaryData>({
    totalIncome: 20301,
    estimatedRefund: 4300,
    isRefund: true,
    deductions: [
      { name: 'Student Loan Interest', amount: 2500 },
      { name: 'Charitable Contributions', amount: 500 }
    ],
    credits: [
      { name: 'American Opportunity Credit', amount: 1000 },
      { name: 'Lifetime Learning Credit', amount: 0 }
    ],
    filingType: 'Resident'
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleDownloadPDF = () => {
    // This would normally trigger a PDF generation and download
    console.log('Downloading PDF...');
  };

  const handleFile = () => {
    // This would normally handle the actual filing process
    console.log('Filing taxes...');
    navigate('/filing-success');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Tax Return Summary</h1>
          
          <div className="space-y-6">
            {/* Main Summary Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Income</h2>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(summaryData.totalIncome)}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    {summaryData.isRefund ? 'Estimated Refund' : 'Taxes Owed'}
                  </h2>
                  <p className={`text-3xl font-bold ${summaryData.isRefund ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(summaryData.estimatedRefund)}
                  </p>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Deductions Applied</h2>
              <div className="space-y-4">
                {summaryData.deductions.map((deduction, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{deduction.name}</span>
                    <span className="font-medium text-gray-900">{formatCurrency(deduction.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Credits */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Credits Applied</h2>
              <div className="space-y-4">
                {summaryData.credits.map((credit, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{credit.name}</span>
                    <span className="font-medium text-gray-900">{formatCurrency(credit.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filing Status */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Filing Type</h2>
                  <p className="text-gray-700">{summaryData.filingType} Return</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-white text-primary font-medium rounded-lg border border-primary hover:bg-gray-50 transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </button>
              
              <div className="flex w-full sm:w-auto space-x-4">
                <button
                  onClick={handleBack}
                  className="flex-1 sm:flex-none flex items-center justify-center px-6 py-3 text-gray-600 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Review
                </button>
                
                <button
                  onClick={handleFile}
                  className="flex-1 sm:flex-none flex items-center justify-center px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
                >
                  File Now
                  <FileText className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSummary;