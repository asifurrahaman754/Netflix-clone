import { useRef, useState } from "react";
import { auth } from "../../../firebase";

import style from "./SignIn.module.css";

export default function SignIn() {
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //User Authentication
  const handleSubmit = e => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(authUser => {
        //clear the fields
        emailRef.current.value = null;
        passwordRef.current.value = null;
        setError("");
      })
      .catch(err => setError(err.message));
  };

  //Sign in existing user
  const handleSignIn = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(authUser => console.log("signed in " + authUser))
      .catch(err => setError(err.message));
  };

  return (
    <div className={style.SignIn_container}>
      <form>
        <h1>Sign In</h1>
        <input
          type="email"
          ref={emailRef}
          placeholder="Email"
          className={style.Sign_in_mail}
          required
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          className={style.Sign_in_password}
          required
        />

        {error && <span className={style.error_message}>{error}</span>}

        <button
          type="submit"
          onClick={handleSignIn}
          className={style.sign_in_submit}
        >
          Sign In
        </button>

        <p className={style.sign_up_text}>
          New to Netflix?
          <span onClick={handleSubmit} className={style.SignIn_link}>
            Sign up now.
          </span>
        </p>
      </form>
    </div>
  );
}
