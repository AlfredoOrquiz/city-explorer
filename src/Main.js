import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    city: '',
    cityData: {},
    error: false,
    errorMesage: ''
  };
  }

  // Get data from some API's
  handleCity = (e) => {
    let city = e.target.value
    this.setState({
      city: city
    });
  };

  handleCitySubmit = async (e) => {
    e.preventDefault();


    //This is the form that will catch the cityData object array
    let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`)
    this.setState({
      cityData: response.data[0],
      mapURL: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${response.data[0].lat},${response.data[0].lon}&zoom=12`,
    });
    console.log(response.data[0]);
  }
  render() {
    return (
      <>
        <Form onSubmit={this.handleCitySubmit}>
          <Form.Group>
            <Form.Label>Enter a city name</Form.Label>
            <Form.Control 
              name='city'
              onInput={this.handleCity}
              placeholder='"Seattle", "San Francisco"'
              type='text'>
            </Form.Control>
            <Button type="submit" variant="primary">Explore!</Button>{' '}
          </Form.Group>
        </Form>

        <Card>
          <Card.Body>
            <Card.Title>{this.state.cityData.display_name}</Card.Title>
            <Card.Img variant="top" src={this.state.mapURL}/>
            <Card.Text></Card.Text>
          </Card.Body>
          <ListGroup>
            <ListGroup.Item>'Lat: {this.state.cityData.lat}'</ListGroup.Item>
            <ListGroup.Item>'Lon: {this.state.cityData.lon}'</ListGroup.Item>
          </ListGroup>
        </Card>
      </>
    )
  }
}

export default Main;