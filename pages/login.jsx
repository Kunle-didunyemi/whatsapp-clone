import React, { useRef, useState } from "react";
import Head from "next/head";
import css from "../styles/Login.module.css";
// import { Button } from '@material-ui/core';
import Logo from "../assets/logo.png";
import Image from "next/image";
import { auth, provider } from "../firebase";
import GoogleIcon from "../assets/google-icon.svg";
import MailIcon from '@material-ui/icons/Mail';
import { Phone } from "@material-ui/icons";
import { Button, FormControl, Input, InputLabel, TextField } from "@material-ui/core";
import {
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";

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
  // const [email, setEmail] = useState(false);
  const formRef = useRef();
  const containerRef = useRef();
  const mainRef = useRef();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        // console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        // console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      },
      auth
    );
  };

  // const handlePhoneNoLogin = (e) => {
  //   e.preventDefault();
  //   generateRecaptcha();
  //   // let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha", { size: "visible" });
  //   let phoneNumber = `${code}${number}`;

  //   if (phoneNumber) {
  //     let appVerifier = window.recaptchaVerifier;
  //     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  //       .then((res) => {
  //         let code = prompt("Please Enter the OTP: ");
  //         if (code == null) return;
  //         res
  //           .confirm(code)
  //           // .then(() => {
  //           //   const username = prompt("Enter Username: ");
  //           //   return updateProfile(user, {
  //           //     email: username,
  //           //   });
  //           // })
  //           .catch((err) => alert(err.message));
  //       })
  //       .catch((err) => alert(err.message));
  //   } else {
  //     alert("Please Enter Phone Number");
  //   }
  // };

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
    mainRef.current.style.display = "none";
  };
  const signinwithmail =()=>{
    containerRef.current.style.display = "none";
    formRef.current.style.display = "none";
    mainRef.current.style.display = "flex";
  }

  // const requestOtp = (e) => {
  //   e.preventDefault();
  //   setExpandForm(!expandForm);
  // }

  return (
    <div className={css.login} id="login">
      <Head>
        <title>Login</title>
      </Head>
      <div ref={containerRef} className={css.login__container}>
        <Image src={Logo} className={css.logo} />
        <h1>Sign In To WhatsApp</h1>
        {/* <button onClick={signInWithGoogle} className={css.login__googleBtn}>
          
          <span>Sign in with Google</span>
        </button> */}
        {/* <button onClick={signInWithPhone} className={css.login__phoneBtn}>
          <Phone />
          <span>Sign in with phone</span>
        </button> */}

        <button className={css.login__phoneBtn} onClick={signinwithmail}>
          <MailIcon/>
          <span>Sign up with Email</span>
          </button>
      </div>
      <form ref={formRef}
      className={css.login__form}>
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
          {/* <Button onClick={handlePhoneNoLogin} type="submit">
            Verify
          </Button> */}
        </div>
        <p>By tapping Verify, an SMS may be sent. Message & data rates may apply.</p>
      </form>

      <form ref={mainRef} className={css.login__form}>
        <h1>ENTER YOUR EMAIL ADDRESS</h1>
        <div className={css.login__number}>
        <FormControl className={css.login__email}>

            <label>Email</label>
            <input ref={emailRef} 
            type="email"
             placeholder=" enter your email" />
          </FormControl>
          <FormControl className={css.login__password}>
          <label>password</label>
            <input ref={passwordRef}
             type="password" 
             placeholder="enter your password" />
          </FormControl>
   
        </div>
        <div className={css.login__buttons}>
          <Button onClick={cancelPhoneSignIn}>Cancel</Button>
          
          <Button onClick={register} type="submit">
            sign up
          </Button>
        </div>
        <p>
          Already have an account?  <Button onClick={signIn} type="submit">
            sign in
          </Button>
        </p>
      </form>

      {/* <form ref={mainRef}>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button onClick={signIn} type="submit">
          Sign In
        </button>

        <h4>
          <span className="signupScreen_gray">New to Netflix? </span>{" "}
          <span onClick={register} className="signupScreen_link">
            {" "}
            Sign Up now.
          </span>
        </h4>
      </form> */}
    </div>
  );
};

export default Login;
