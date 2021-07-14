import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default instance;

//ful API_EXAMPLE
//https://api.themoviedb.org/3/discover/movie?api_keys=9565268935f9bb0d8b3dfa55aeb98719$with_genres=28
///trending/all/week?api_key=${API_KEY}&language=en-US
