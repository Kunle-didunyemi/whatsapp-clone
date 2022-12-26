import React from 'react';
import Head from 'next/head';
import css from '../styles/Login.module.css';
import { Button } from '@material-ui/core';
import Logo from '../assets/logo.png'
import Image from 'next/image';
import { auth, provider } from '../firebase';
import {
    signInWithPopup
  } from "firebase/auth";

const Login = () => {

    const signIn = ()=>{
        signInWithPopup(auth, provider ).catch(alert)
    }

  return (
    <div className={css.container}>
         <Head>
            <title>Login</title>
        </Head>
        <div className={css.loginContainer}>
            <Image
            src={Logo}
            className={css.logo}
            />
            <Button
            onClick={signIn}
            variant='outline'
            >sign in with google</Button>
        </div>
    </div>
  )
}

export default Login