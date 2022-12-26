import { Avatar, Button, IconButton } from '@material-ui/core';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import  ChatIcon from '@material-ui/icons/Chat';
import  SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import css from '../styles/Sidebar.module.css';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import * as EmailValidator from 'email-validator';


const Sidebar = () => {

    const createChat = ()=>{
        const input =prompt('please enter the email addess/number of the user you want to chat with');
        if (!input) return null;
    
        if (EmailValidator.validate(input)) {
            // we need to add chat in db
        }
     }

  return (
    <div>
        
    <div className={css.header}>
        <Avatar
        className={css.avatar}
        />
        
            <div>
                <IconButton>

                <ChatIcon/>
                </IconButton>
                <IconButton>
                <MoreVertIcon/>

                </IconButton>
                </div>
        </div>
        <div className='inputField' style={styles.inputField}>

          <div className= {css.search}>
            <SearchIcon style={{padding: '3px', color: 'gray'}}/>
            <input
            className={css.searchInput}
            placeholder='search chat'/>
            </div>
        
        <FilterListIcon/>
        </div>
        <Button
        className={css.newchatBtn}
        onClick={createChat}
        > Start a new chat
        </Button>
    
    </div>
  )
}

export default Sidebar;

const styles = {
    inputField: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
       
    }
}