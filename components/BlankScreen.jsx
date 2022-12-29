import React from 'react';
import css from '../styles/Sidebar.module.css'
import Picture from '../assets/whatsappHome.png'
import LockIcon from '@material-ui/icons/Lock';
import Image from 'next/image'

const BlankScreen = () => {
  return (
    <div>
         <div className={css.blankcontainer}>
            <div className={css.blankWrapper}>
            <div className={css.image}>
                
                <Image src={Picture} alt="" />
                <p className={css.word}>WhatsApp Web</p>
                <p style={{marginLeft: "20%"}}>send and recieve messages</p>
            </div>
            <div>
                <LockIcon style={{color:'gray',marginRight:"20px"}}/>
            <span>End to end encrypted</span>
            </div>
            </div>
         </div>
    </div>
  )
}

export default BlankScreen