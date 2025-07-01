import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dob: string;

  // Address Information
  street: string;
  city: string;
  state: string;
  zipCode: string;

  // Account Preferences
  contactMode: 'email' | 'phone' | '';
  newsletter: boolean;
  accountType: string;
}

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    contactMode: '',
    newsletter: false,
    accountType: '',
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        isSubmitted,
        setIsSubmitted,
      }}>
      {children}
    </FormContext.Provider>
  );
};
