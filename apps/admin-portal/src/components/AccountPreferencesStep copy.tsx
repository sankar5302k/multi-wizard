
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFormContext } from '@/contexts/FormContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const schema = z.object({
  contactMode: z.enum(['email', 'phone'], {
    required_error: 'Please select a preferred contact method',
  }),
  newsletter: z.boolean(),
  accountType: z.string().min(1, 'Please select an account type'),
});

type FormData = z.infer<typeof schema>;

const accountTypes = [
  { value: 'free', label: 'Free' },
  { value: 'premium', label: 'Premium' },
  { value: 'enterprise', label: 'Enterprise' },
];

const AccountPreferencesStep = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      contactMode: formData.contactMode || 'email',
      newsletter: formData.newsletter,
      accountType: formData.accountType,
    },
  });

  const watchedContactMode = watch('contactMode');
  const watchedNewsletter = watch('newsletter');
  const watchedAccountType = watch('accountType');

  const onSubmit = (data: FormData) => {
    console.log('Account Preferences submitted:', data);
    updateFormData(data);
    setCurrentStep(4);
  };

  const goBack = () => {
    setCurrentStep(2);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl font-bold text-gray-900">Account Preferences</CardTitle>
        <CardDescription className="text-gray-600">
          Customize your account settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Preferred Contact Mode *
            </Label>
            <Controller
              name="contactMode"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email" className="cursor-pointer">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="phone" id="phone" />
                    <Label htmlFor="phone" className="cursor-pointer">Phone</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.contactMode && (
              <p className="text-sm text-red-600">{errors.contactMode.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Account Type *
            </Label>
            <Select
              value={watchedAccountType}
              onValueChange={(value) => setValue('accountType', value)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                {accountTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.accountType && (
              <p className="text-sm text-red-600">{errors.accountType.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Controller
                name="newsletter"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="newsletter"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="newsletter" className="cursor-pointer text-sm font-medium text-gray-700">
                Subscribe to newsletter for updates and promotions
              </Label>
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              className="px-8 py-3"
            >
              Back
            </Button>
            <Button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700">
              Review & Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccountPreferencesStep;
