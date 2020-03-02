import React from "react";

function MovieCard(props) {
    //render MovieCard component and style using Bootstrap 4 classes
    return (
        <div className="col-md-6 col-lg-4 mb-3">
             <div className="card">
                <img className="card-img-top" src={props.poster} alt="" style={{height: 400}} />
                <div className="card-body">
                    <p className="card-text"><strong>Title: </strong>{props.title}</p>
                    <p className="card-text"><strong>Year: </strong>{props.year}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard