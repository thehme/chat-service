import { Chatroom, Message, User } from "./types";

export const UsersTable: User[] = [
  {
    first_name: 'Brenda',
    last_name: 'Cortez',
    username: 'brendacort',
    uuid: '11111111'
  },
  {
    first_name: 'Brenda',
    last_name: 'Dev',
    username: 'brendadev',
    uuid: '11111112'
  }
];

export function isValidUser(uuid: string) {
  const user = UsersTable.find((user: User) => {
    return user.uuid === uuid;
  });

  return !!user;
};

export const ChatroomsTable: Chatroom[] = [
  {
    uuid: '2222',
    name: 'chat1',
    members: [],
  }
];

export function findChatroom(chatUuid: string) {
  return ChatroomsTable.find((chatroom: Chatroom) => {
    return chatroom.uuid === chatUuid;
  });
}

export function isChatMember(chatUuid: string, userUuid: string) {
  const chatroom = findChatroom(chatUuid);

  return chatroom && chatroom.members.includes(userUuid);
};

export const MessagesTable: Message[] = [
  {
    uuid: "1234",
    message: "something",
    user_uuid: "1234",
    chatroom_uuid: "2222",
  }
];

export function findMessages (chatUuid: string, userUuid: string) {
  const messages = MessagesTable.filter((message: Message) => {
    return message.chatroom_uuid === chatUuid;
  });

  const userChatMessages = messages.filter((message) => {
    return message.user_uuid === userUuid;
  });

  return userChatMessages;
};
