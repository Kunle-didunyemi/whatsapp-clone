import React from 'react';
import { Avatar} from "@material-ui/core";
import css from '../styles/Sidebar.module.css'
import getRecipientEmail from '../utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Chat = ({users, id}) => {
    const [user]= useAuthState(auth);
    const recipientEmail = getRecipientEmail(users, user);
    // console.log(recipientEmail);
  return (
    <div className={css.chatContainer}>
        <Avatar
        className={css.chatAvatar}
        />
        <p>{recipientEmail} </p>
    </div>
  )
}

export default Chat