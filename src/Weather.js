import React from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
  render() {
    if (!this.props.weatherData)
    {
      return
    }
    let weatherDataArr = this.props.weatherData.map((day, idx) => {
      return (
        <Card>
          <Card.Body>
            <Card.Title>Date: {day.date}</Card.Title>
            <Card.Text>{`Description: ${day.description}`}</Card.Text>
            <Card.Text>{`High Temp: ${day.highTemp}`}</Card.Text>
            <Card.Text>{`Low Temp: ${day.lowTemp}`}</Card.Text>
          </Card.Body>
        </Card>
      )
    });
    return (
      <>
        {
          weatherDataArr
        };
      </>
    );
  }
}

export default Weather;