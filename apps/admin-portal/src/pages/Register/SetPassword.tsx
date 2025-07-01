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
import { useSetPassword } from '@/hooks/rq/mutations/useSetPassword';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { NavigationRoutes } from '@/common/constant';
import { useEffect } from 'react';

import { PleaseWaitLoadText } from '@/components/please-wait-load-text';
import { z_password } from '@/lib/zod.validator';
import { useLanguageTranslation } from '@/hooks/ui/useLanguageTranslation';

const FormSchema = z
  .object({
    password: z_password,
    confirmPassword: z_password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const SetPassword = observer(function () {
  const { mutate, isPending, error, isError } = useSetPassword();
  const navigate = useNavigate();

  const { t } = useLanguageTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onTouched',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(
      { ...data, token },
      {
        onSuccess: () => {
          toast.success(t('SET_PASSWORD.TOAST.SUCCESS'));
          navigate(NavigationRoutes.SignIn);
        },
      },
    );
  }

  useEffect(() => {
    if (isError && error) {
      console.log(error);
      toast.error(t('COMMON.TOAST.ERROR_PREFIX') + ': ' + error?.message);
    }
  }, [t, error, isError]);

  if (!token) {
    return <Navigate to={NavigationRoutes.SignIn} />;
  }

  function handlePasswordBlur() {
    form.trigger('confirmPassword');
  }

  const submitButtonDisabled = isPending;
  // OR
  // const submitButtonDisabled =
  //   !form.formState.isDirty || !form.formState.isValid || isPending;

  return (
    <div className="width-full flex h-full flex-col items-center justify-center">
      <Card className="w-full max-w-[600px] p-10 md:w-3/4">
        <CardHeader>
          <CardTitle>{t('SET_PASSWORD.TITLE')}</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              id="form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('SET_PASSWORD.PASSWORD')}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="password"
                        autoFocus
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
                    <FormLabel>{t('SET_PASSWORD.CONFIRM_PASSWORD')}</FormLabel>
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
            {!isPending ? t('SET_PASSWORD.SUBMIT') : <PleaseWaitLoadText />}
          </Button>

          <div className="mt-6 flex w-full items-center justify-center">
            <Button
              variant={'link'}
              className="underline"
              onClick={() => navigate(NavigationRoutes.SignIn)}>
              {t('SET_PASSWORD.BACK_TO_LOGIN')}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
});
