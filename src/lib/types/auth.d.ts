export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
  };
}

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};
