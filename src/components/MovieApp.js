import React, { useState, useRef, useEffect } from 'react';
import MovieCard from './MovieCard';

function MovieApp() {
  //setup state
  const [movieSearch, setMovieSearch] = useState("");
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //create a ref for input DOM node
  const inputEl = useRef(null);

  //function to handle the change event on text input
  function handleChange(event) {
    const {value} = event.target;
    setMovieSearch(value);
  }

  //function to handle submit when user clicks search button
  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    //fetch movie JSON data from omdb API using the search string  
    fetch(`https://www.omdbapi.com/?s=${movieSearch.trim()}&apikey=thewdb`)
        .then(res => res.json())
        .then(res => {
            //console.log(res);
            setIsLoading(false);
            setMovieData(res);
            inputEl.current.focus();
        });
  }

  //put focus on text input when component mounts
  useEffect(() => inputEl.current.focus(), []);
  
  let movieCardsArray, errMsg;
  //if 'Search' property exists in movie data object, map the array and create MovieCard components
  if (movieData.Search) {
    movieCardsArray = movieData.Search.map(movie => <MovieCard key={movie.imdbID} poster={movie.Poster} title={movie.Title} year={movie.Year} />);
  } else if (movieData.Error) { //else if 'Error' property exists, store it's value in a variable
    errMsg = movieData.Error;
  }
  
  //store the row containing MovieCard JSX elements in a variable
  let searchResults = <div className="row justify-content-between">
                          {errMsg ? <h2>{errMsg}</h2> : movieCardsArray}
                      </div>;

  return (
    <div className="container">
        <header className="jumbotron">
            <h1 className="display-4">Movie Search App</h1>
            <p className="lead">Enter a movie name to search:</p>
            <hr className="my-4" />

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    ref={inputEl} 
                    value={movieSearch} 
                    name="MovieSearchText"
                    placeholder="Search Item" 
                    onChange={handleChange}
                    required 
                />
              
                <button className="btn btn-primary btn-md ml-2">Search</button>
            </form>
        </header>
          
          {isLoading ? 
                    <img src="https://media.giphy.com/media/y1ZBcOGOOtlpC/giphy.gif" alt="loading_gif" style={{display: "block", margin: "0 auto"}} />
                    : searchResults}  
    </div>
    
  );
}

export default MovieApp;
