import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 'work',
    text: 'Did you work in 2024?',
    options: [
      'Yes, and received a W-2',
      'Yes, self-employed/freelancer (1099)',
      'No, I didn\'t earn any income'
    ]
  },
  {
    id: '1098t',
    text: 'Did you receive a 1098-T form from your school for tuition?',
    options: ['Yes', 'No', 'Not sure']
  },
  {
    id: 'scholarships',
    text: 'Did you receive any scholarships or grants?',
    options: ['Yes, full tuition or more', 'Yes, partial', 'No']
  },
  {
    id: 'loanInterest',
    text: 'Did you pay student loan interest in 2024?',
    options: ['Yes', 'No', 'I don\'t have student loans']
  },
  {
    id: 'dependent',
    text: 'Can your parents or someone else claim you as a dependent?',
    options: ['Yes', 'No', 'Not sure']
  },
  {
    id: 'studentType',
    text: 'What type of student are you?',
    options: [
      'Full-time undergrad',
      'Part-time undergrad',
      'Graduate student',
      'Just graduated in 2024'
    ]
  },
  {
    id: 'multiState',
    text: 'Did you live in more than one state during 2024?',
    options: ['Yes', 'No']
  },
  {
    id: 'firstTime',
    text: 'Is this your first time filing taxes?',
    options: ['Yes', 'No', 'I don\'t remember']
  }
];

const LocalStudentQuestionnaire: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to basic info form
      navigate('/basic-info');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate('/student-type');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-primary rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {questions[currentQuestion].text}
            </h2>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                    answers[questions[currentQuestion].id] === option
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalStudentQuestionnaire;