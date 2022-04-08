# Chat Service

## Assumpions

- authentication has already been done

## Requirements

- add user to chat room
- allow user to post message to chatroom
- allow user to leave chatroom

## Data Models

```
User: {
  uuid: string;
  username: string;
  first_name: string;
  last_name: string;
};

Users: Users[];

Message: {
  uuid: string;
  message: string;
  user_uuid: string;
  chatroom_uuid: string;
}

Messages: Messages[];

Chatroom: {
  uuid: string;
  name: string;
  members: string[];
}

Chatrooms: Chatroom[];

```
