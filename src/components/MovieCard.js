import React from "react";

function MovieCard(props) {

    return (
        <div className="col-12 col-md-4 mb-3">
             <div className="card" style={{width: "20rem"}}>
                <img className="card-img-top" src={props.poster} alt="" style={{height: 380}} />
                <div className="card-body">
                    <p className="card-text"><strong>Title: </strong>{props.title}</p>
                    <p className="card-text"><strong>Year: </strong>{props.year}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard