import Card from 'react-bootstrap/Card';
import React from 'react';

class Movies extends React.Component {
  render() {
    if (!this.props.movieData)
    {
      return
    }
    let movieDataArr = this.props.movieData.map((movie, idx) => {
      return (
        <Card>
          <Card.Body>
          <Card.Img src={`${movie.image}`}/>
          <Card.Title>Title: {movie.title}</Card.Title>
          <Card.Text>{`Overview: ${movie.overview}`}</Card.Text>
          </Card.Body>
        </Card>
      )
    });
    return (
      <>
        {
          movieDataArr
        };
      </>
    );
  }
}

export default Movies;