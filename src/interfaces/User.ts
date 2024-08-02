export interface User {
  _id?: string | number;
  email: string;
  password: string;
  confirmPass: string;
  role: string;
}
