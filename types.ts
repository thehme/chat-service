export interface User {
  first_name: string;
  last_name: string;
  username: string;
  uuid: string;
}

export interface Chatroom {
  uuid: string;
  name: string;
  members: string[];
}

export interface Message {
  uuid: string;
  message: string;
  user_uuid: string;
  chatroom_uuid: string;
}

