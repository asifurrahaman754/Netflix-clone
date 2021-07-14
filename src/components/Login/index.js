import { useState } from "react";

import ReusableNavbar from "../Home/Navbar";
import LoginBanner from "./Login Banner";

export default function Login() {
  const [isSignedin, setIsSignedIn] = useState(true);

  const handleClick = () => setIsSignedIn(false);

  return (
    <>
      <ReusableNavbar LoginNav handleClick={handleClick} />
      <LoginBanner isSignedin={isSignedin} handleClick={handleClick} />
    </>
  );
}
