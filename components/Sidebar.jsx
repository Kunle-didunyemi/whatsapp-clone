import { Avatar, Button, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import css from "../styles/Sidebar.module.css";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import { useAuthState } from "react-firebase-hooks/auth";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { collection, doc, addDoc, where, query, onSnapshot } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import Image from "next/image";
import ChatScreen from "./ChatScreen";
import BlankScreen from "./BlankScreen";
import { updateCurrentUser } from "firebase/auth";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [user] = useAuthState(auth);
  const [allUsers, setAllUsers]= useState([]);
  const [searchInput, setSearchInput]= useState("");
  const useChatRef = collection(db, "chats");
  const q = query(useChatRef, where("users", "array-contains", user.email));
  const [chatsSnapshot] = useCollection(q);
  //   console.log(chatsSnapshot);

  useEffect(()=>{
    const getAllUsers = async()=>{
      // const searchRef = collection(db, 'users')
      // const data = await query( searchRef, onSnapshot((snapshot)=>{
      //   setAllUsers(snapshot.docs.filter((doc)=> doc.data().email !== user?.email))
      // }))
      // const data = await db.collection("users").onSnapshot((snapshot)=>{
      //   setAllUsers(snapshot.docs.filter((doc)=> doc.data().email!== user?.email))
      // })
      // const unsub = onSnapshot(doc(db, 'users', 'chats'), (snapshot)=>{
      //   setAllUsers(snapshot.doc.filter((doc)=> doc.data().email !== user?.email))
      // })
    }
    getAllUsers();
  }, [])
  console.log('users..', allUsers);

  // const search = allUsers.filter((user) => {
  //   if(searchInput) {
  //     if(user.data().email.toLowerCase().includes(searchInput.toLocaleLowerCase())){
  //       console.log(user.data().email);
  //     }
  //   }
  // })
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
    <div className={css.homeContainer}>
      <div className={css.greenBg} />
      <div className={css.sidebarWrapper}>
      <div className={css.container}>
        <div className={css.header}>
          <Avatar src={user.photoURL} alt="profile" className={css.avatar} />

          <div>
            <IconButton title="new chat" onClick={createChat}>
              <ChatIcon />
            </IconButton>
            <IconButton title="menu" onClick={() => setShow(!show)}>
              <MoreVertIcon />
            </IconButton>
            {show && (
              <div className={css.showToggle}>
                <ul>
                  <li>menu</li>

                  <li onClick={() => auth.signOut()}>log out</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="inputField" style={styles.inputField}>
          <div className={css.search}>
            <SearchIcon style={{ padding: "3px", color: "gray" }} />
            <input className={css.searchInput} placeholder="search chat" onChange={(e)=> setSearchInput(e.target.value)} />
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
      <div>
      <BlankScreen />
      </div> 
       </div>

      
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
