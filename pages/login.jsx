import React from 'react';
import Head from 'next/head';
import css from '../styles/Login.module.css';

const Login = () => {
  return (
    <div>
         <Head>
            <title>Login</title>
        </Head>
        <div className={css.loginContainer}>
            <img src="" alt="" className={css.logo} />
        </div>
    </div>
  )
}

export default Login