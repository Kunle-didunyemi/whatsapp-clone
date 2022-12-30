import React, { useRef, useState } from 'react';
import Head from 'next/head';
import css from '../styles/Login.module.css';
// import { Button } from '@material-ui/core';
import Logo from '../assets/logo.png'
import Image from 'next/image';
import { auth, provider } from '../firebase';
import GoogleIcon from "../assets/google-icon.svg";
import { Phone } from "@material-ui/icons";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import {
    signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier
  } from "firebase/auth";

// const Login = () => {
//     const signIn = ()=>{
//         signInWithPopup(auth, provider ).catch(alert)
//     }
//   return (
//     <div className={css.container}>
//          <Head>
//             <title>Login</title>
//         </Head>
//         <div className={css.loginContainer}>
//             <Image
//             src={Logo}
//             className={css.logo}
//             />
//             <Button
//             onClick={signIn}
//             variant='outline'
//             >sign in with google</Button>
//         </div>
//     </div>
//   )
// }

// export default Login

const Login = () => {
  const [code, setCode] = useState("");
  const [number, setNumber] = useState("");
  const formRef = useRef();
  const containerRef = useRef();

  const handlePhoneNoLogin = (e) => {
    e.preventDefault();
    // let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha", { size: "visible" });
    let phoneNumber = `${code}${number}`;

    if (phoneNumber) {
      signInWithPhoneNumber( auth, phoneNumber)
        .then((res) => {
          let code = prompt("Please Enter the OTP: ");
          if (code == null) return;
          res
            .confirm(code)
            .then((authUser) => {
              const username = prompt("Enter Username: ");
              return authUser.user.updateProfile({
                displayName: username,
              });
            })
            .catch((err) => alert(err.message));
        })
        .catch((err) => alert(err.message));
    } else {
      alert("Please Enter Phone Number");
    }
  };

  const signInWithGoogle = () => {
      signInWithPopup(auth, provider)
      .then((res) => res)
      .catch((err) => alert(err.message));
  };

  const signInWithPhone = () => {
    formRef.current.style.display = "flex";
    containerRef.current.style.display = "none";
  };

  const cancelPhoneSignIn = () => {
    containerRef.current.style.display = "flex";
    formRef.current.style.display = "none";
  };

  return (
    <div className={css.login} id="login">
      <Head>
             <title>Login</title>
         </Head>
      <div ref={containerRef} className={css.login__container}>
      <Image
            src={Logo}
            className={css.logo}
            />
        <h1>Sign In To WhatsApp</h1>
        <button onClick={signInWithGoogle} className={css.login__googleBtn}>
          {/* <img src={GoogleIcon} alt="Google Icon" className={css.login__google} /> */}
          <span>Sign in with Google</span>
        </button>
        <button onClick={signInWithPhone} className={css.login__phoneBtn}>
          <Phone />
          <span>Sign in with phone</span>
        </button>
      </div>
      <form ref={formRef} className={css.login__form}>
        <h1>Enter Your phone number</h1>
        <div className={css.login__number}>
          <FormControl className={css.login__code}>
            <InputLabel>Code</InputLabel>
            <Input
              className={css.login__inputCode}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </FormControl>
          <FormControl className={css.login__number}>
            <InputLabel>Phone number</InputLabel>
            <Input type="tel" value={number} onChange={(e) => setNumber(e.target.value)} />
          </FormControl>
        </div>
        <div className={css.recaptcha} id="recaptcha"></div>
        <div className={css.login__buttons}>
          <Button onClick={cancelPhoneSignIn}>Cancel</Button>
          <Button onClick={handlePhoneNoLogin} type="submit">
            Verify
          </Button>
        </div>
        <p>By tapping Verify, an SMS may be sent. Message & data rates may apply.</p>
      </form>
    </div>
  );
};

export default Login;