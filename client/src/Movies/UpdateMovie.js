import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateMovie(props) {
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
  });
  console.log(props)
  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, [props.match.params.id]);

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovieDetails(res.data))
      .catch(err => console.error(err));
  };

  const onChange = e => {
    setMovieDetails({ ...movieDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movieDetails.id}`, movieDetails)
      .then(() => props.history.push(`/movies/${movieDetails.id}`));
  };

  return (
    <>
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={movieDetails.title}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="director"
            value={movieDetails.director}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="metascore"
            value={movieDetails.metascore}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="stars"
            value={movieDetails.stars}
            onChange={onChange}
          />
        </div>
        <button>Update</button>
      </form>
    </>
  );
}

export default UpdateMovie;
