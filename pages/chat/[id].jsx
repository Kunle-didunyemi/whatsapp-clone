import Head from 'next/head';
import React from 'react';
import css from '../../styles/SingleChat.module.css';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { auth, db } from '../../firebase';
import { collection, doc, getDocs, query, orderBy, where, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../utils/getRecipientEmail';

const Chat = ({chat, messages}) => {
  const [user]= useAuthState(auth)
  return (
    <div className={css.chatIdContainer} >
        <Head>
          <title>
            chat with {getRecipientEmail(chat.users, user)}
          </title>
        </Head>
        <Sidebar/>
        <div className={css.chatPage}>
          <ChatScreen chat={chat} messages={messages} />
        </div>
    </div>
  )
}

export default Chat;

// export const getServerSideProps = async(context)=>{
//  const ref  = collection(db, 'chats').doc(context.query.id);
//  const messagesRes = await ref.collection('messages').orderBy("timestamp", "asc").get()
//  const messages = messagesRes.docs.map((doc)=> ({
//   id:doc.id,
//   ...doc.data(),
//  })).map(messages=>({
//   ...messages,
//   timestamp: messages.timestamp.toDate().getTime()
//  }))

//  const chatRes = await ref.get()
//  const chat = {
//   id:chatRes.id,
//   ...chatRes.data()
//  }
//  return {
//   props:{
//     messages: JSON.stringify(messages),
//     chat: chat
//   }
//  }
// }

export async function getServerSideProps(context) {
  const chatID = context.query.id;
  const chatIDRef = collection(db, "chats");

  //prep messages
  const messagesRes = await getDocs(chatIDRef, where(chatID, "==", chatID));
  // console.log("ctx log: ", messagesRes);

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp?.toDate().getTime(),
    }));

  //prep chat
  const chatIDRef2 = doc(db, "chats", chatID);

  const chatRef = await getDoc(chatIDRef2);

  const chat = {
    id: chatRef.id,
    ...chatRef.data(),
  };

  // console.log(chat,messages);

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

// export async function getServerSideProps(context) {
//   const chatRef = doc(db, 'chats', context.query.id);

// const messagesRes = await getDocs(
//   query(collection(chatRef, 'messages'), orderBy('timestamp', 'asc'))
// );

// const messages = messagesRes.docs
//   .map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//   }))
//   .map(messages => ({
//     ...messages,
//     timestamp: messages.timestamp.toDate().getTime(),
//   }));

// const chatRes = await getDocs(chatRef);

// const chat = {
//   id: chatRes.id,
//   ...chatRes.data(),
// };

// return {
//   props: {
//     messages: JSON.stringify(messages),
//     chat,
//   },
// };
// }


