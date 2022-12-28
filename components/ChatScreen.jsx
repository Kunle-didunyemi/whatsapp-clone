import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import css from "../styles/SingleChat.module.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  where,
  serverTimestamp,
  setDoc,
  addDoc,
} from "firebase/firestore";
import Message from "./Message";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

// const useChatRef = collection(db, "chats");
//   const q = query(useChatRef, collection("messages").orderBy("timestamp", "asc"));
//   const [chatsSnapshot] = useCollection(q);

const ChatScreen = ({ chat, messages }) => {
    // console.log(chat, messages);
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const endOfMessageRef = useRef(null);
  const router = useRouter();

  // const [messagesSnapshot]= useCollection(collection(db, "chats").getDocs(router.query.id).collection("messages").orderBy("timestamp", "asc"))

  //     const messageID = router.query.id;
  //   const messageIDRef = collection(db, "chats");

  //   //prep messages
  const ref = collection(db, `chats/${router.query.id}/messages`);
  const q = query(ref, orderBy("timestamp", "asc"));
  // const snapshot =  getDocs(q)
  const [messagesSnapshot] = useCollection(q);
  //    const {messagesSnapshot} = useCollection(getDocs(query(collection(db, `chats/${router.query.id}/messages`), orderBy('timestamp', 'asc')))) ;
  const res = collection(db, "users")
  const k = query(res, where("email","==", getRecipientEmail(chat.users, user)))
  const [recipientSnapshot]= useCollection(k);

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
        return JSON.parse(messages).map((message)=>(
            <Message  key={message.id} user={message.user} message={message} />
        ))
    }
  };

  const scrollToButtom = () => {
    endOfMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
    })
  }

  const sendMessage = (e) => {
    e.preventDefault();

    const usersRef = collection(db, "users");
    setDoc(
      doc(usersRef, user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
     addDoc(collection(db, `chats/${router.query.id}/messages`), {
        timestamp: serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL,
    });
    setInput("");
    scrollToButtom();
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <div>
      <div className={css.chatHeader}>
        {
            recipient ? (
                <Avatar
                src={recipient?.photoURL}
                />
            ): (
                <Avatar
                >{recipientEmail[0]}</Avatar>
            )
        }
       
        <div className={css.headerInfo}>
          <h3> {recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>Last active : {''}
            {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
            ) : 'unavailable'}
            </p>
          ) :(
            <p>
              loading last active ...
            </p>
          )}
          {/* <p>Last seen ...</p> */}
        </div>
        <div className={css.headerIcon}>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className={css.messageContainer}>
        {showMessages()}

        <div 
        ref={endOfMessageRef}
        className={css.endOfMessage}></div>
      </div>
      <form className={css.inputContainer}>
        <InsertEmoticonIcon />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={css.messageInput}
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          send message
        </button>
        <MicIcon />
      </form>
    </div>
  );
};

export default ChatScreen;
