import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const schema = z.object({
  street: z.string().min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(2, 'City name must be at least 2 characters'),
  state: z.string().min(1, 'Please select a state'),
  zipCode: z.string().regex(/^\d{6}$/, 'ZIP code must be exactly 6 digits'),
});

type FormData = z.infer<typeof schema>;

const states = [
  'Tamil Nadu',
  'Karnataka',
  'Kerala',
  'Andhra Pradesh',
  'Maharashtra',
];

const AddressInfoStep = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
    },
  });

  const watchedState = watch('state');

  const onSubmit = (data: FormData) => {
    console.log('Address Info submitted:', data);
    updateFormData(data);
    setCurrentStep(3);
  };

  const goBack = () => {
    setCurrentStep(1);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-8 text-center">
        <CardTitle className="text-2xl font-bold text-white">
          Address Information
        </CardTitle>
        <CardDescription className="text-gray-600">
          Where can we reach you?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="street"
              className="text-sm font-medium text-gray-700">
              Street Address *
            </Label>
            <Input
              id="street"
              {...register('street')}
              placeholder="Enter your street address"
              className="h-11"
            />
            {errors.street && (
              <p className="text-sm text-red-600">{errors.street.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="city"
                className="text-sm font-medium text-gray-700">
                City *
              </Label>
              <Input
                id="city"
                {...register('city')}
                placeholder="Enter your city"
                className="h-11"
              />
              {errors.city && (
                <p className="text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="zipCode"
                className="text-sm font-medium text-gray-700">
                ZIP Code *
              </Label>
              <Input
                id="zipCode"
                {...register('zipCode')}
                placeholder="Enter 6-digit ZIP code"
                className="h-11"
              />
              {errors.zipCode && (
                <p className="text-sm text-red-600">{errors.zipCode.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">State *</Label>
            <Select
              value={watchedState}
              onValueChange={(value) => setValue('state', value)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-sm text-red-600">{errors.state.message}</p>
            )}
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

export default AddressInfoStep;
