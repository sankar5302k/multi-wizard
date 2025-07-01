
import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const SubmissionResult = () => {
  const { formData, setIsSubmitted, setCurrentStep } = useFormContext();

  const submissionData = {
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    dob: formData.dob || 'Not provided',
    address: {
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zipCode,
    },
    preferences: {
      contactMode: formData.contactMode,
      newsletter: formData.newsletter,
      accountType: formData.accountType,
    }
  };

  const startOver = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-12 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Success!</h1>
        <p className="text-green-100">Your application has been submitted successfully</p>
      </div>

      <div className="p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Submitted Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(submissionData, null, 2)}
              </pre>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={startOver}
                variant="outline"
                className="px-8 py-3"
              >
                Start New Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmissionResult;
