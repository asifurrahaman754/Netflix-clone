import style from "./Row.module.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";

export default function Row({ movie, handleClick, isLargeRow }) {
  return (
    <div className={style.poster_container}>
      <div className={style.poster_image_container}>
        <img
          draggable="true"
          key={movie.id}
          onClick={() => handleClick(movie)}
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
  );
}
