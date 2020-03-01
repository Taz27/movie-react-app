import React, { useState, useRef } from 'react';
import MovieCard from "./components/MovieCard";
import CodedBy from './components/CodedBy';

function App() {
  const [movieSearch, setMovieSearch] = useState("");
  const [movieData, setMovieData] = useState({});
  const inputEl = useRef(null);


  function handleChange(event) {
    const {value} = event.target;
    setMovieSearch(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`http://www.omdbapi.com/?s=${movieSearch}&apikey=thewdb`)
        .then(res => res.json())
        .then(res => {
            //console.log(res);
            setMovieData(res);
            inputEl.current.focus();
        });
  }
  
  let movieCardsArray, errMsg;

  if (movieData.Search) {
    movieCardsArray = movieData.Search.map(movie => <MovieCard key={movie.imdbID} poster={movie.Poster} title={movie.Title} year={movie.Year} />);
  } else if (movieData.Error) {
    errMsg = movieData.Error;
  }
  

  return (
    <div className="container">
        <div className="jumbotron">
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
        
        </div>

        <div className="container">
          <div className="row justify-content-between">
              {errMsg ? <h2>{errMsg}</h2> : movieCardsArray}
          </div>
        </div>

        <CodedBy />
    </div>
    
  );
}

export default App;
