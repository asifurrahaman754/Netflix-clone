import { AiOutlineRight } from "react-icons/ai";

import style from "./Loginbanner.module.css";
import BgImage from "../../../assets/images/home/home-bg.jpg";
import SignIn from "../Sign in";

export default function LoginBanner({ isSignedin, handleClick }) {
  return (
    <section
      className={style.LoginBannerSection}
      style={{
        backgroundImage: `linear-gradient(#00000069, transparent, transparent, transparent, transparent, black),url(${BgImage})`,
      }}
    >
      {isSignedin ? (
        <div className={style.login_Content}>
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h4>Watch anywhere. Cancel anytime.</h4>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          <form>
            <input
              placeholder="Email address"
              required
              type="email"
              className={style.login_input}
            />
            <button
              onClick={handleClick}
              type="submit"
              className={style.get_started}
            >
              Get Started
              <span className={style.getStarted_right}>
                <AiOutlineRight />
              </span>
            </button>
          </form>
        </div>
      ) : (
        <SignIn />
      )}
    </section>
  );
}
