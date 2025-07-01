
import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import { Check } from 'lucide-react';

const ProgressIndicator = () => {
  const { currentStep } = useFormContext();
  
  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Address' },
    { number: 3, title: 'Preferences' },
    { number: 4, title: 'Preview' },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  currentStep > step.number
                    ? 'bg-green-500 text-white'
                    : currentStep === step.number
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-400 text-blue-100'
                }`}
              >
                {currentStep > step.number ? (
                  <Check size={16} />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`ml-3 font-medium transition-all duration-300 ${
                  currentStep >= step.number ? 'text-white' : 'text-blue-200'
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-1 mx-4 rounded transition-all duration-300 ${
                  currentStep > step.number ? 'bg-green-400' : 'bg-blue-400'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
