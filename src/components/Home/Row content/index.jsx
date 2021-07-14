import { useState, useEffect } from "react";

import Youtube from "react-youtube";
import axios from "../../../axios";
import movieTrailer from "movie-trailer";

import style from "./Row.module.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";

export default function Row({ title, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    axios.get(fetchURL).then(response => setMovies(response.data.results));
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  function handleLClick(movie) {
    console.log(movie);
    if (trailer) {
      setTrailer("");
    } else {
      movieTrailer(movie?.name || movie?.original_name || movie?.title)
        .then(url => {
          //get the full movei trailer URL
          const fullURL = new URLSearchParams(new URL(url).search);

          //extract the v vlaue from the full URL
          const urlVvalue = fullURL.get("v");
          setTrailer(urlVvalue);
          console.log(urlVvalue);
        })
        .catch(err => console.log("this is trailer error" + err.message));
    }
  }

  return (
    <section className={style.row_section}>
      <h1>{title}</h1>
      <div className={style.row_poster_container}>
        {movies.map(
          movie =>
            //chekcking if any image link is broken
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <div className={style.poster_container}>
                <div className={style.poster_image_container}>
                  <img
                    draggable="true"
                    key={movie.id}
                    onClick={() => handleLClick(movie)}
                    className={`${style.row_poster_img} ${
                      isLargeRow && style.row_poster_large
                    }`}
                    src={`${BASE_URL}${
                      isLargeRow ? movie?.poster_path : movie?.backdrop_path
                    }`}
                    alt={movie.name}
                    title={movie.name}
                  />
                </div>
                {!isLargeRow && (
                  <>
                    <span className={style.movie_poster_name}>
                      {movie?.name || movie?.original_name || movie?.title}
                    </span>
                    <span className={style.movie_poster_date}>
                      {movie.first_air_date || movie.release_date}
                    </span>
                  </>
                )}
              </div>
            )
        )}
      </div>
      {/* {trailer && <Youtube videoId={trailer} opts={opts} />} */}
    </section>
  );
}
