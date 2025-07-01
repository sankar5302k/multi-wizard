import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@shared/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { observer } from 'mobx-react-lite';
import { useForgot } from '@/hooks/rq/mutations/useForgot';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { NavigationRoutes } from '@/common/constant';
import { z_email } from '@/lib/zod.validator';
import { PleaseWaitLoadText } from '@/components/please-wait-load-text';
import { useLanguageTranslation } from '@/hooks/ui/useLanguageTranslation';

const FormSchema = z.object({
  email: z_email,
});

export const ForgotPassword = observer(function () {
  const { mutate, isPending, error, isError } = useForgot();
  const navigate = useNavigate();
  const { t } = useLanguageTranslation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data, {
      onSuccess: () => {
        toast.success(t('COMMON.TOAST.SUBMIT_SUCCESS'));
        navigate(NavigationRoutes.SignIn);
      },
    });
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
          <CardTitle>{t('FORGOT_PASSWORD.TITLE')}</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              id="form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6">
              <FormDescription>
                {t('FORGOT_PASSWORD.DESCRIPTION')}
              </FormDescription>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('FORGOT_PASSWORD.EMAIL')}</FormLabel>
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
            </form>
          </Form>
        </CardContent>

        <CardFooter className="mt-5 flex flex-col justify-between">
          <Button
            className="w-full"
            type="submit"
            form="form"
            disabled={submitButtonDisabled}>
            {!isPending ? t('FORGOT_PASSWORD.SUBMIT') : <PleaseWaitLoadText />}
          </Button>

          <div className="mt-6 flex w-full items-center justify-center">
            <Button
              variant={'link'}
              className="underline"
              onClick={() => navigate(-1)}>
              {t('FORGOT_PASSWORD.BACK')}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
});
