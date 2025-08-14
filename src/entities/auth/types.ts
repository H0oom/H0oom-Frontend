export interface User {
  id: number;
  email: string;
  fullname: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  fullname?: string;
  confirmPassword?: string;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
  fullname?: string;
  confirmPassword?: string;
}
