import React from "react";
import { Avatar } from "@material-ui/core";
import css from "../styles/Sidebar.module.css";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { collection, doc, addDoc, where, query } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";

const Chat = ({ users, id }) => {
    const router = useRouter()
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);
//   const q = query(collection(db, "users"), where("email", "==", getRecipientEmail(users, user)));
//   const userRef = collection(db, "users");
//   const k = query(
//     userRef,
//     where("email", "==", recipientEmail)
//   );

    const enterChat =()=>{
        router.push(`/chat/${id}`)
    }


  const [recipientSnapshot] = useCollection(query(collection(db, "users"), where("email", "==", getRecipientEmail(users, user))));
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  // console.log(recipientEmail);
//   console.log(recipientSnapshot);
  return (
    <div
    onClick={enterChat}
    className={css.chatContainer}>
        {
            recipient ? (
                <Avatar
                className={css.chatAvatar}
                src={recipient?.photoURL}
                /> 
            ) : (
                <Avatar
                className={css.chatAvatar}
                >{recipientEmail[0]}</Avatar>
                
            )
        }
      <p>{recipientEmail} </p>
    </div>
  );
};

export default Chat;
