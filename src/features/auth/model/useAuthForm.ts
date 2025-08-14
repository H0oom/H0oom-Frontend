import { useState } from 'react';
import { AuthFormData, AuthFormErrors } from '../../../entities/auth/types';
import { useTranslation } from 'next-i18next';

export function useAuthForm() {
  const { t } = useTranslation('auth');
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    fullname: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<AuthFormErrors>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (fullname: string) => {
    return fullname.trim().length >= 2;
  };

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    let error = '';
    switch (field) {
      case 'email':
        if (value && !validateEmail(value)) {
          error = t('errors.invalidEmail');
        }
        break;
      case 'password':
        if (value && !validatePassword(value)) {
          error = t('errors.invalidPassword');
        }
        break;
      case 'fullname':
        if (value && !validateName(value)) {
          error = t('errors.invalidName');
        }
        break;
      case 'confirmPassword':
        if (value && value !== formData.password) {
          error = t('errors.passwordMismatch');
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  return {
    formData,
    errors,
    setFormData,
    setErrors,
    handleInputChange,
    validateEmail,
    validatePassword,
    validateName,
  };
}
