import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  dob: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const PersonalInfoStep = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Personal Info submitted:', data);
    updateFormData(data);
    setCurrentStep(2);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-8 text-center">
        <CardTitle className="text-2xl font-bold text-white">
          Personal Information
        </CardTitle>
        <CardDescription className="text-gray-600">
          Let's start with some basic information about you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-white">
              Full Name *
            </Label>
            <Input
              id="fullName"
              {...register('fullName')}
              placeholder="Enter your full name"
              className="h-11"
            />
            {errors.fullName && (
              <p className="text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-white">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email address"
              className="h-11"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-white">
              Phone Number *
            </Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="Enter 10-digit phone number"
              className="h-11"
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob" className="text-sm font-medium text-white">
              Date of Birth (Optional)
            </Label>
            <Input id="dob" type="date" {...register('dob')} className="h-11" />
          </div>

          <div className="flex justify-end pt-6">
            <Button
              type="submit"
              className="bg-blue-600 px-8 py-3 hover:bg-blue-700">
              Next Step
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoStep;
