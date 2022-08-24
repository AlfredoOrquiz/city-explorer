import React from 'react';
import axios from 'axios';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';
import './App.css'

class App extends React.Component {
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
        <Header/>
        <Main
        city = {this.state.city}
        cityData = {this.state.cityData}
        handleCity = {this.handleCity}
        handleCitySubmit = {this.handleCitySubmit}
        error = {this.state.error}
        errorMesage = {this.state.errorMesage}
        mapURL = {this.state.mapURL}
        />
        <Footer/>
      </>
    )
  }
}

export default App;
