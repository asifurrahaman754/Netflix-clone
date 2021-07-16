import { useState, useEffect } from "react";

import Youtube from "react-youtube";
import axios from "../../../axios";
import movieTrailer from "movie-trailer";

import style from "./Row.module.css";
import RowItem from "./RowItem";

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

  //do these when a user clicks a poster
  function handleClick(movie) {
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
        })
        .catch(err => {
          alert("Didn't found the trailer, try another");
          return;
        });
    }
  }

  return (
    <section className={style.row_section}>
      <h1>{title}</h1>
      <div className={style.row_poster_container}>
        {movies.map(
          movie =>
            //filtering broken image link
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <RowItem
                key={movie.id}
                handleClick={handleClick}
                movie={movie}
                isLargeRow={isLargeRow}
              />
            )
        )}
      </div>

      {/* Only show this when you have a trailer */}
      {trailer && (
        <Youtube
          className={style.poster_trailer}
          videoId={trailer}
          opts={opts}
        />
      )}
    </section>
  );
}
