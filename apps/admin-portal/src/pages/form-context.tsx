"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  dob: string
}

export interface AddressInfo {
  street: string
  city: string
  state: string
  zip: string
}

export interface AccountPreferences {
  contactMode: "Email" | "Phone"
  newsletter: boolean
  accountType: "Free" | "Premium" | "Enterprise"
}

export interface FormData {
  personalInfo: PersonalInfo
  addressInfo: AddressInfo
  accountPreferences: AccountPreferences
}

interface FormContextType {
  currentStep: number
  setCurrentStep: (step: number) => void
  formData: FormData
  updatePersonalInfo: (data: PersonalInfo) => void
  updateAddressInfo: (data: AddressInfo) => void
  updateAccountPreferences: (data: AccountPreferences) => void
  resetForm: () => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

const initialFormData: FormData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
  },
  addressInfo: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
  accountPreferences: {
    contactMode: "Email",
    newsletter: false,
    accountType: "Free",
  },
}

export function FormProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const updatePersonalInfo = (data: PersonalInfo) => {
    setFormData((prev) => ({ ...prev, personalInfo: data }))
  }

  const updateAddressInfo = (data: AddressInfo) => {
    setFormData((prev) => ({ ...prev, addressInfo: data }))
  }

  const updateAccountPreferences = (data: AccountPreferences) => {
    setFormData((prev) => ({ ...prev, accountPreferences: data }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setCurrentStep(1)
  }

  return (
    <FormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        updatePersonalInfo,
        updateAddressInfo,
        updateAccountPreferences,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}
