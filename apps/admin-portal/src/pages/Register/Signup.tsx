import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@shared/components/ui/button';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/components/ui/form';
import { Input } from '@shared/components/ui/input';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card';
import { PasswordInput } from '@shared/components/ui/password-input';
import { observer } from 'mobx-react-lite';
import { useSignup } from '@/hooks/rq/mutations/useSignup';
import { useNavigate } from 'react-router-dom';
import { NavigationRoutes } from '@/common/constant';
import { useEffect } from 'react';
import { PleaseWaitLoadText } from '@/components/please-wait-load-text';
import { z_email, z_password } from '@/lib/zod.validator';
import { useLanguageTranslation } from '@/hooks/ui/useLanguageTranslation';

const FormSchema = z
  .object({
    email: z_email,
    password: z_password,
    confirmPassword: z_password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const Signup = observer(function () {
  const { mutate, isPending, error, isError } = useSignup();
  const navigate = useNavigate();

  const { t } = useLanguageTranslation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data, {
      onSuccess: () => {
        toast.success(t('SIGNUP.TOAST.SUCCESS'));
        navigate(NavigationRoutes.Dashboard);
      },
    });
  }

  function handlePasswordBlur() {
    form.trigger('confirmPassword');
  }

  useEffect(() => {
    if (isError && error) {
      console.log(error);
      toast.error(t('COMMON.TOAST.ERROR_PREFIX') + ': ' + error?.message);
    }
  }, [t, error, isError]);

  const submitButtonDisabled = isPending;
  // OR
  // const submitButtonDisabled =
  //   !form.formState.isDirty || !form.formState.isValid || isPending;

  return (
    <div className="width-full flex h-full flex-col items-center justify-center">
      <Card className="w-full max-w-[600px] p-10 md:w-3/4">
        <CardHeader>
          <CardTitle>{t('SIGNUP.TITLE')}</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              id="form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('SIGNUP.EMAIL')}</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus
                        placeholder="email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('SIGNUP.PASSWORD')}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="password"
                        {...field}
                        onBlur={() => {
                          field.onBlur();
                          handlePasswordBlur();
                        }}
                        onChange={(e) => {
                          field.onChange(e);
                          if (form.formState.touchedFields.confirmPassword) {
                            handlePasswordBlur();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('SIGNUP.CONFIRM_PASSWORD')}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>

        <CardFooter className="mt-5 flex flex-col justify-between">
          <Button
            className="w-full"
            type="submit"
            form="form"
            disabled={submitButtonDisabled}>
            {!isPending ? t('SIGNUP.SUBMIT') : <PleaseWaitLoadText />}
          </Button>

          <div className="mt-6 flex w-full items-center justify-center">
            <span>
              <span className="text-gray-500">
                {t('SIGNUP.ALREADY_HAVE_AN_ACCOUNT')}&nbsp;
              </span>
              <Button
                variant={'link'}
                className="h-auto px-0 underline"
                onClick={() => navigate(NavigationRoutes.SignIn)}>
                {t('SIGNUP.SIGN_IN')}
              </Button>
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
});
