import express from 'express'
import { uuid } from 'uuidv4';

import {
  UsersTable,
  ChatroomsTable,
  MessagesTable,
  isValidUser,
  isChatMember,
  findChatroom
} from "./database";

const PORT = 3000

const app = express();

app.use(express.json())

app.get('/', (request, response) => {
	response.send('Hello, World!')
});

/**
 * Join
 * POST 
 * username
 * chatroom id
 */
app.post('/join', (request, response) => {
  const body = request.body;
  const userUuid = body.user_uuid;
  console.log({userUuid});
  const chatroomUuid = body.chatroom_uuid;

  const userIsValid = isValidUser(userUuid);

  if (userIsValid) {
    // add them to the chatroom
    const chatroom = ChatroomsTable.find((chatroom) => {
      return chatroom.uuid === chatroomUuid;
    });
    if(chatroom && !chatroom.members.includes(userUuid)) {
      chatroom.members.push(userUuid);
      console.log({chatroom});
      response.sendStatus(200);
    } else {
      response.sendStatus(500);  
    }
  } else {
    response.sendStatus(500);
  }
});

/**
 * message
 * chatroom id
 * member username
 */
app.post('/message', (request, response) => {
  const payload = request.body;
  const chatUuid = payload.chatroom_uuid;
  const userUuid = payload.user_uuid;

  // check if the user is a member of the chatroom, per the uuid
  const userIsMember = isChatMember(chatUuid, userUuid);

  if (!userIsMember) {
    response.sendStatus(500);
  }

  const chatroom = findChatroom(chatUuid);

  if (!chatroom) {
    response.sendStatus(500);
  }

  const isMember = isChatMember(chatUuid, userUuid);
  if (isMember && chatroom) {
    MessagesTable.push({
      uuid: uuid(),
      message: payload.message,
      user_uuid: userUuid,
      chatroom_uuid: chatroom.uuid,
    });
    console.log({MessagesTable});
    response.sendStatus(200);
  } else {
    response.sendStatus(500);
  }
});

// /**
//  * username -> uuid
//  * chatroom uuid
//  */
// app.get('/messages/:member_uuid', (request, response) => {
//   const payload = request.body;
//   // check if the user is a member of the chatroom
//   const userExist = userExists(payload.username);

//   // if they are a member of that chatroom

//     const messages = MessagesTable.filter((message) => {
//       message.member_uuid = request.params.member_uuid;
//     });
//     // get messages from MEssages table
//   // else
//     // return 500
// });

// /**
//  * username
//  * chatroom uuid
//  */
// app.post('/remove', (request, response) => {
//   // if they are a member of the chatroom
//     // remove member uuid from membership of chatroom

//   // else 
//     // return 500
// });

// export default app

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
