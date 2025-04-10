export interface userapi {
  success: boolean;
  message: string;
  token?: string;
}

export interface User {
  _id?: string;
  name: string;
  date_of_birth: string;
  email: string;
  gender: string;
  phone: string;
  password?: string;
  image?: string | undefined;
}

export interface loginUserProps {
  email: string;
  password: string;
}

export interface UserFetchProps {
  success: boolean;
  message: User[];
}
