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

export interface conversationUserArray {
  _id: string;
  users: string[];
  lastMessage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface conversationProps {
  user: Array<conversationUserArray> | [];
}

export interface MessageProps {
  conversationId: string | undefined;
  receiverId?: string | undefined;
  senderId?: string | undefined;
  message: string | undefined;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MessageGetProps {
  success: boolean;
  message: Array<MessageProps>;
}
