import React, { useRef } from "react";
import { auth } from "../firebase";
// import "./SignupScreen.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SignUp = () => {
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
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

//   const signIn = (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(
//       auth,
//       emailRef.current.value,
//       passwordRef.current.value
//     )
//       .then((authUser) => {
//         // console.log(authUser);
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        {/* <button onClick={signIn} type="submit">
          Sign In
        </button> */}

        <h4>
          <span className="signupScreen_gray">New to Netflix? </span>{" "}
          <span onClick={register} className="signupScreen_link">
            {" "}
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignUp;
