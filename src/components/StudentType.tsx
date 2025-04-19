import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Globe } from 'lucide-react';

const StudentType: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Select Your Student Type
          </h1>
          <p className="text-lg text-gray-600">
            Choose the option that best describes your student status
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/local-student')}
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <GraduationCap className="h-16 w-16 text-primary mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Local Student</h2>
            <p className="text-gray-600 text-center">
              For U.S. citizens and permanent residents studying at a U.S. institution
            </p>
          </button>

          <button
            onClick={() => navigate('/international-student')}
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Globe className="h-16 w-16 text-primary mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">International Student</h2>
            <p className="text-gray-600 text-center">
              For students on F-1, J-1, or M-1 visas studying in the United States
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentType;