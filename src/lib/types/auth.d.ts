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
