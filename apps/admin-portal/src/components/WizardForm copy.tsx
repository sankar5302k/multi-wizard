
import React from 'react';
import { FormProvider, useFormContext } from '@/contexts/FormContext';
import ProgressIndicator from './ProgressIndicator';
import PersonalInfoStep from './PersonalInfoStep';
import AddressInfoStep from './AddressInfoStep';
import AccountPreferencesStep from './AccountPreferencesStep';
import PreviewStep from './PreviewStep';
import SubmissionResult from './SubmissionResult';

const WizardFormContent = () => {
  const { currentStep, isSubmitted } = useFormContext();

  if (isSubmitted) {
    return <SubmissionResult />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <ProgressIndicator />
      <div className="p-8">
        {currentStep === 1 && <PersonalInfoStep />}
        {currentStep === 2 && <AddressInfoStep />}
        {currentStep === 3 && <AccountPreferencesStep />}
        {currentStep === 4 && <PreviewStep />}
      </div>
    </div>
  );
};

const WizardForm = () => {
  return (
    <FormProvider>
      <WizardFormContent />
    </FormProvider>
  );
};

export default WizardForm;
