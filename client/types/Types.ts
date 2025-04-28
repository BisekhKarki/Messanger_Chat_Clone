export interface userapi {
  success: boolean;
  message: string;
  token?: string;
  newConversation?: MessageProps;
}

export interface messageApi {
  success: boolean;
  message: MessageProps[];
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
  _id?: string;
  conversationId: string | undefined;
  receiverId?: string | undefined;
  senderId?: string | undefined;
  message: string | undefined;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  messageType?: string;
}

export interface MessageGetProps {
  success: boolean;
  message: Array<MessageProps>;
}

export interface DecodeUserProps {
  _id: string;
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  phone: string;
  image?: string; // optional
  gender: "Male" | "Female" | "Others";
}

export interface UploadedFile {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
