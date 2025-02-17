import * as z from 'zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { loginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import bcrypt from 'bcryptjs';

function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { passcode: '' },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { success, data } = loginSchema.safeParse(values);

    if (success) {
      const hashedPasscode = await bcrypt.hash(data.passcode, 10);

      console.log(hashedPasscode);
    }
  }

  return (
    <div className="grid w-screen h-screen place-items-center">
      <Card className="min-w-[400px]">
        <CardHeader>
          <CardTitle className="flex flex-col gap-2 bg-white rounded-md">
            <img
              src="../../../public/jwani-balak-logo.jpg"
              alt="Jwani Balak Logo"
              className="w-40 mx-auto"
            />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="passcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Passcode</FormLabel>

                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
