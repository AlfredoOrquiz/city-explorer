import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';


class Main extends React.Component {  
  
  render() {
    return (
      <>
        <Form onSubmit={this.props.handleCitySubmit}>
          <Form.Group>
            <Form.Label>Enter a city name</Form.Label>
            <Form.Control 
              name='city'
              onInput={this.props.handleCity}
              placeholder='"Seattle", "San Francisco"'
              type='text'>
            </Form.Control>
            <Button type="submit" variant="primary">Explore!</Button>{' '}
          </Form.Group>
        </Form>
        <Weather>
          weatherData = {this.props.weatherData}
          showForacast = {this.props.showForecast}
        </Weather>
        {
          this.props.showCard
          ?
            <p>{' '}</p>
          :
          this.props.error
          ?
            <p>{this.props.errorMessage}</p>
          :
          <Card>
            <Card.Body>
              <Card.Title>{this.props.cityData.display_name}</Card.Title>
              <Card.Img variant="top" src={this.props.mapURL}/>
              <Card.Text></Card.Text>
            </Card.Body>
            <ListGroup>
              <ListGroup.Item>'Lat: {this.props.cityData.lat}'</ListGroup.Item>
              <ListGroup.Item>'Lon: {this.props.cityData.lon}'</ListGroup.Item>
            </ListGroup>
          </Card>
         }
      </>
    )
  }
}

export default Main;