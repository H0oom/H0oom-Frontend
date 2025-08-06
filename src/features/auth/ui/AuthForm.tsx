import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../shared/ui/card';
import { SigninForm } from './SigninForm';
import { SignupForm } from './SignupForm';

export function AuthForm() {
  const [tab, setTab] = useState('login');
  const { t } = useTranslation('auth');

  return (
    <Card className="border border-gray-100 bg-white shadow-xl">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-2xl font-light text-black">
          {t('welcome')}
        </CardTitle>
        <CardDescription className="text-base text-gray-500">
          {t('login')} {t('or')} {t('signup')}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs
          defaultValue={tab}
          value={tab}
          onValueChange={setTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-50 p-1">
            <TabsTrigger
              value="login"
              className="rounded-lg font-medium text-gray-600 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
            >
              {t('login')}
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-lg font-medium text-gray-600 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
            >
              {t('signup')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-8">
            <SigninForm />
          </TabsContent>
          <TabsContent value="signup" className="mt-8">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
