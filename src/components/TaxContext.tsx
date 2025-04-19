import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define interfaces for each form's data
interface IncomeSourceData {
  w2: {
    type: string;
    amount: string;
    fileIds: string[];
  };
  freelance: {
    type: string;
    amount: string;
    fileIds: string[];
  };
  scholarship: {
    type: string;
    amount: string;
    fileIds: string[];
  };
  other: {
    type: string;
    amount: string;
    description?: string;
    fileIds: string[];
  };
}

interface EducationCreditData {
  tuitionPaid: string;
  has1098T: boolean;
  form1098T: string[];
  hasCourseMaterials: boolean;
  courseMaterialsAmount: string;
  courseMaterialsReceipts: string[];
  checkCredits: boolean;
}

interface DeductionData {
  hasLoanInterest: boolean;
  loanInterestAmount: string;
  form1098E: string[];
  hasRetirement: boolean;
  retirementAmount: string;
  hasHealthcare: boolean;
  healthcareAmount: string;
  hasCharity: boolean;
  charityAmount: string;
}

interface SummaryData {
  totalIncome: number;
  estimatedRefund: number;
  isRefund: boolean;
  deductions: Array<{ name: string; amount: number }>;
  credits: Array<{ name: string; amount: number }>;
  filingType: 'Resident' | 'Non-Resident';
}

// Define Gemini API response interface
interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

interface TaxContextType {
  incomeData: IncomeSourceData;
  educationData: EducationCreditData;
  deductionData: DeductionData;
  summaryData: SummaryData | null;
  setIncomeData: (data: IncomeSourceData) => void;
  setEducationData: (data: EducationCreditData) => void;
  setDeductionData: (data: DeductionData) => void;
  calculateSummary: () => Promise<void>;
  isCalculating: boolean;
}

// Create the context
const TaxContext = createContext<TaxContextType | undefined>(undefined);

// Default values for the forms
const defaultIncomeData: IncomeSourceData = {
  w2: { type: 'W-2', amount: '', fileIds: [] },
  freelance: { type: 'Freelance/1099', amount: '', fileIds: [] },
  scholarship: { type: 'Scholarship', amount: '', fileIds: [] },
  other: { type: 'Other', amount: '', fileIds: [], description: '' }
};

const defaultEducationData: EducationCreditData = {
  tuitionPaid: '',
  has1098T: false,
  form1098T: [],
  hasCourseMaterials: false,
  courseMaterialsAmount: '',
  courseMaterialsReceipts: [],
  checkCredits: false
};

const defaultDeductionData: DeductionData = {
  hasLoanInterest: false,
  loanInterestAmount: '',
  form1098E: [],
  hasRetirement: false,
  retirementAmount: '',
  hasHealthcare: false,
  healthcareAmount: '',
  hasCharity: false,
  charityAmount: ''
};

// Provider component
export const TaxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [incomeData, setIncomeData] = useState<IncomeSourceData>(defaultIncomeData);
  const [educationData, setEducationData] = useState<EducationCreditData>(defaultEducationData);
  const [deductionData, setDeductionData] = useState<DeductionData>(defaultDeductionData);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Your Gemini API key - using Vite's environment variable format
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
  
  // Updated API URL and model name based on latest Gemini API
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-002:generateContent';

  const fetchGeminiResponse = async (formData: string): Promise<SummaryData> => {
    try {
      console.log('Fetching tax calculation from Gemini API...');
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are UniTax AI, a helpful assistant for university students with tax questions.
                  
                  I need you to calculate tax information based on the following student data. 
                  Return ONLY the JSON object with no other explanations or text.
                  
                  Here is the format I need:
                  {
                    "totalIncome": number,
                    "estimatedRefund": number,
                    "isRefund": boolean,
                    "deductions": [{"name": string, "amount": number}],
                    "credits": [{"name": string, "amount": number}],
                    "filingType": "Resident" or "Non-Resident"
                  }
                  
                  Student data: ${formData}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error details:', errorData);
        throw new Error('API request failed');
      }

      const data: GeminiResponse = await response.json();
      const responseText = data.candidates[0].content.parts[0].text;
      
      // Parse the JSON response
      try {
        const summaryData: SummaryData = JSON.parse(responseText);
        return summaryData;
      } catch (error) {
        console.error('Error parsing Gemini response as JSON:', error);
        throw new Error('Could not parse AI response');
      }
    } catch (error) {
      console.error('Error fetching from Gemini:', error);
      // Return default summary data in case of error
      return {
        totalIncome: parseFloat(incomeData.w2.amount) || 0,
        estimatedRefund: 1000,
        isRefund: true,
        deductions: [],
        credits: [],
        filingType: 'Resident'
      };
    }
  };

  const calculateSummary = async () => {
    setIsCalculating(true);
    
    try {
      // Prepare the data to send to the AI
      const formDataString = JSON.stringify({
        income: {
          w2: parseFloat(incomeData.w2.amount) || 0,
          freelance: parseFloat(incomeData.freelance.amount) || 0,
          scholarship: parseFloat(incomeData.scholarship.amount) || 0,
          other: parseFloat(incomeData.other.amount) || 0,
        },
        education: {
          tuitionPaid: parseFloat(educationData.tuitionPaid) || 0,
          hasCourseMaterials: educationData.hasCourseMaterials,
          courseMaterialsAmount: parseFloat(educationData.courseMaterialsAmount) || 0,
          checkCredits: educationData.checkCredits
        },
        deductions: {
          hasLoanInterest: deductionData.hasLoanInterest,
          loanInterestAmount: parseFloat(deductionData.loanInterestAmount) || 0,
          hasRetirement: deductionData.hasRetirement,
          retirementAmount: parseFloat(deductionData.retirementAmount) || 0,
          hasHealthcare: deductionData.hasHealthcare,
          healthcareAmount: parseFloat(deductionData.healthcareAmount) || 0,
          hasCharity: deductionData.hasCharity,
          charityAmount: parseFloat(deductionData.charityAmount) || 0
        }
      });

      // Get tax calculation from AI
      const calculatedSummary = await fetchGeminiResponse(formDataString);
      
      // Update state with the AI response
      setSummaryData(calculatedSummary);
    } catch (error) {
      console.error('Error calculating tax summary:', error);
      // Set a default summary in case of error
      setSummaryData({
        totalIncome: parseFloat(incomeData.w2.amount) || 0,
        estimatedRefund: 1000, 
        isRefund: true,
        deductions: [],
        credits: [],
        filingType: 'Resident'
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const value = {
    incomeData,
    educationData,
    deductionData,
    summaryData,
    setIncomeData,
    setEducationData,
    setDeductionData,
    calculateSummary,
    isCalculating
  };

  return <TaxContext.Provider value={value}>{children}</TaxContext.Provider>;
};

// Custom hook to use the tax context
export const useTaxContext = () => {
  const context = useContext(TaxContext);
  if (context === undefined) {
    throw new Error('useTaxContext must be used within a TaxProvider');
  }
  return context;
};