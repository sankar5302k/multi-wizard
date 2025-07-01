import React from 'react';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const PreviewStep = () => {
  const { formData, setCurrentStep, setIsSubmitted } = useFormContext();

  const handleSubmit = () => {
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
      },
    };

    console.log('Final submission data:', submissionData);
    setIsSubmitted(true);
  };

  const goBack = () => {
    setCurrentStep(3);
  };

  const editStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-8 text-center">
        <CardTitle className="text-2xl font-bold text-white">
          Review & Submit
        </CardTitle>
        <CardDescription className="text-white">
          Please review your information before submitting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information Section */}
        <div className="rounded-lg bg-blue-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => editStep(1)}
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-medium text-black">{formData.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-black">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-black">{formData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="font-medium text-black">
                {formData.dob || 'Not provided'}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Address Information Section */}
        <div className="rounded-lg bg-green-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Address Information
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => editStep(2)}
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              Edit
            </Button>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-black">{formData.street}</p>
            <p className="text-gray-600">
              {formData.city}, {formData.state} {formData.zipCode}
            </p>
          </div>
        </div>

        <Separator />

        {/* Account Preferences Section */}
        <div className="rounded-lg bg-purple-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Account Preferences
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => editStep(3)}
              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-600">Contact Preference</p>
              <Badge variant="secondary" className="mt-1">
                {formData.contactMode === 'email' ? 'Email' : 'Phone'}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Type</p>
              <Badge variant="secondary" className="mt-1 capitalize">
                {formData.accountType}
              </Badge>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Newsletter Subscription</p>
              <Badge
                variant={formData.newsletter ? 'default' : 'secondary'}
                className="mt-1">
                {formData.newsletter ? 'Subscribed' : 'Not Subscribed'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            className="px-8 py-3">
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 px-12 py-3 font-semibold text-white hover:bg-green-700">
            Submit Application
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewStep;
