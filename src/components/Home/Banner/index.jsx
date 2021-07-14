import { useState, useEffect } from "react";

import axios from "../../../axios";
import { FaPlay, FaListUl } from "react-icons/fa";

import style from "./Banner.module.css";
import requests from "../../../request";

export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    //abort fetching data when the user changes route before getting data
    const abortCont = new AbortController();

    axios
      .get(requests.fetchNetflixOriginals, { signal: abortCont.signal })
      .then(response => {
        const get_Random_Data_Number = Math.floor(
          Math.random() * response.data.results.length - 1
        );

        setMovie(response.data.results[get_Random_Data_Number]);
      })
      .catch(err => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        }
      });

    return () => abortCont.abort();
  }, []);

  const truncateParagraph = (string, strlength) => {
    return string.length > strlength
      ? string.substr(0, strlength - 1) + "..."
      : string;
  };

  return (
    <section
      className={style.BannerSection}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.22),transparent,black),url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className={style.Banner_Container}>
        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>

        <div className={style.Banner_buttons}>
          <button className={style.play_button}>
            <span className={style.banner_btn_icon}>
              <FaPlay />
            </span>
            Play
          </button>

          <button className={style.mylist_button}>
            <span className={style.banner_btn_icon}>
              <FaListUl />
            </span>
            My List
          </button>
        </div>

        <p className={style.Banner_description}>
          {truncateParagraph(`${movie?.overview}`, 150)}
        </p>
      </div>
    </section>
  );
}
