import { Avatar, IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import css from '../styles/SingleChat.module.css'
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, getDoc,orderBy, query, where } from 'firebase/firestore';
import Message from './Message';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

// const useChatRef = collection(db, "chats");
//   const q = query(useChatRef, collection("messages").orderBy("timestamp", "asc"));
//   const [chatsSnapshot] = useCollection(q);

const ChatScreen = ({chat, messages}) => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    // const [messagesSnapshot]= useCollection(collection(db, "chats").getDocs(router.query.id).collection("messages").orderBy("timestamp", "asc"))


//     const messageID = router.query.id;
//   const messageIDRef = collection(db, "chats");

//   //prep messages
const ref = collection(db, `chats/${router.query.id}/messages`)
const q = query(ref, orderBy('timestamp', 'asc'))
// const snapshot =  getDocs(q)
const [messagesSnapshot] = useCollection(q);
//    const {messagesSnapshot} = useCollection(getDocs(query(collection(db, `chats/${router.query.id}/messages`), orderBy('timestamp', 'asc')))) ;


    const showMessages =()=>{
        if(messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                 <Message key={message.id}
                 user={message.data().user}
                message={{
                    ...message.data(),
                timestamp: message.data().timestamp?.toDate().getTime(),
                }}  />
            ))

        }
    }
  return (
    <div>
        <div className={css.chatHeader}>
            <Avatar/>
            <div className={css.headerInfo}>
                <h3>Rec email</h3>
                <p>Last seen ...</p>
            </div>
            <div className={css.headerIcon}>
                <IconButton>
                    <AttachFileIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>

        <div className={css.messageContainer}>
            {showMessages()}
            
            <div className={css.endOfMessage}></div>
        </div>
        <form className={css.inputContainer}>
            <InsertEmoticonIcon/> 
            <input
                className={css.messageInput}/>
                <MicIcon/>
        </form>
    </div>
  )
}

export default ChatScreen