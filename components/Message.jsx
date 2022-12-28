import { CallReceivedRounded } from '@material-ui/icons';
import moment from 'moment/moment';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components';
import { auth } from '../firebase';
import css from '../styles/SingleChat.module.css'

const Message = ({user, message}) => {
    const [userLoggedIn] = useAuthState(auth);
    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;
  return (
    <div>
        <TypeOfMessage>{message.message}
        <span className={css.timestamp}>   {message.timestamp ? moment(message.timestamp).format('LT'): '...' } </span>
       
        </TypeOfMessage>
        
    </div>
  )
}

export default Message;

const MessageElement = styled.p`
    width: fit-content;
    padding: 15px;
    border-radius: 8px;
    margin: 10px;
    min-width: 60px;
    padding-bottom: 26px;
    position: relative;
    text-align: right;
`
const Sender = styled(MessageElement)`
    margin-left:auto;
    background-color: #dcf8c6;
`
const Reciever = styled(MessageElement)`
    background-color: whitesmoke;
    text-align: left;
`