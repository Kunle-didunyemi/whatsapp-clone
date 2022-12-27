import { Avatar, Button, IconButton } from "@material-ui/core";
import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import css from "../styles/Sidebar.module.css";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import { useAuthState } from "react-firebase-hooks/auth";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { collection, doc, addDoc, where, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import Image from "next/image";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const useChatRef = collection(db, "chats");
  const q = query(useChatRef, where("users", "array-contains", user.email));
  const [chatsSnapshot] = useCollection(q);
//   console.log(chatsSnapshot);

  const createChat = () => {
    const input = prompt(
      "please enter the email addess/number of the user you want to chat with"
    );
    // const name = prompt('name')
    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExist(input) &&
      input !== user.email
    ) {
      // we need to add chat in db
      addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
      // db.collecction('chats').add({
      //     users:[user.email, input],

      // })
    }
  };

  const chatAlreadyExist = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <div>
      <div className={css.header}>
        <Avatar src={user.photoURL} alt='profile' onClick={() => auth.signOut()} className={css.avatar} />
        

        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="inputField" style={styles.inputField}>
        <div className={css.search}>
          <SearchIcon style={{ padding: "3px", color: "gray" }} />
          <input className={css.searchInput} placeholder="search chat" />
        </div>

        <FilterListIcon />
      </div>
      <Button className={css.newchatBtn} onClick={createChat}>
        Start a new chat
      </Button>
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </div>
  );
};

export default Sidebar;

const styles = {
  inputField: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
};
