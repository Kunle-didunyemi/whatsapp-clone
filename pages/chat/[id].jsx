import Head from 'next/head';
import React from 'react';
import css from '../../styles/SingleChat.module.css';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';

const Chat = () => {
  return (
    <div className={css.chatIdContainer} >
        <Head>
          <title>
            chat
          </title>
        </Head>
        <Sidebar/>
        <div className={css.chatPage}>
          <ChatScreen/>
        </div>
    </div>
  )
}

export default Chat