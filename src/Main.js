import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    city: '',
    cityData: {},
    error: false,
    errorMesage: ''
  }
  }

  handleCity = (e) => {
    let city = e.target.value
    this.setState({
      city: city
    });
    // Get data from some API's
  };

  handleCitySubmit = async (e) => {
    e.preventDefault();

    // Get data from API's
    let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`)

  }
  render() {
    return (
      <>
        <form onSubmit={this.handleCitySubmit}>
          <label>Pick a City
            <input 
            type='text' 
            name='city' 
            onInput={this.handleCity}/>
            <button>Explore!</button>
          </label>
        </form>
      </>
    )
  }
}

export default Main;