import { Link } from "react-router-dom";

import style from "./Navbar.module.css";
import logo from "../../../assets/images/home/logo.svg";
import avatar from "../../../assets/images/users/1.png";

export default function Navbar({ LoginNav, handleClick }) {
  return (
    <>
      {LoginNav ? (
        <section className={style.navSection}>
          <nav className={style.nav}>
            <Link to="/">
              <img src={logo} className={style.nav_logo} alt="netflix logo" />
            </Link>
            <a onClick={handleClick} className={style.nav_button}>
              Sign In
            </a>
          </nav>
        </section>
      ) : (
        <section className={style.navSection}>
          <nav className={style.nav}>
            <Link to="/">
              <img src={logo} className={style.nav_logo} alt="netflix logo" />
            </Link>
            <Link to="/profile">
              <img src={avatar} className={style.nav_user} alt="user logo" />
            </Link>
          </nav>
        </section>
      )}
    </>
  );
}
