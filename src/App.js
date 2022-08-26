import React from 'react';
import axios from 'axios';
import Footer from './Footer';
import Header from './Header.js';
import Main from './Main.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    city: '',
    cityData: {},
    error: false,
    errorMesage: '',
    map: '',
    showCard: true,
    showForecast: true,
    weatherData: [],
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
    this.helpMap();
    await this.helpWeather()
  };

  helpMap = async () => {
    try {
    
      //This is the form that will catch the cityData object array
      let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`)
      this.setState({
        cityData: response.data[0],
        error: false,
        mapURL: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${response.data[0].lat},${response.data[0].lon}&zoom=12`,
        showCard: false,
      });
    }
    catch(error) {
      this.setState({
        error: true,
        errorMessage: `Oh oh! It seems like an error has occured: ${error.response.status}`,
      });
    }
  }

  helpWeather = async () => {
    try {
      // I am now creating a request to the Back End Server to the Front End Server (this current code).
      let urlWeather = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.city}&format=json`;
      let weather = await axios.get(urlWeather);
      if(!weather) {
        weather = []
      }
      this.setState({
        error:false,
        showForecast:false,
        weatherData: weather.data
    });
    } catch (error) {
      this.setState({
        error: true,
        errorMessge: `Huston, we have a problem: ${error.response.status}`,
      });
    }
  }

  render() {
    return (
      <>
        <Header/>
        <Main
        city = {this.state.city}
        cityData = {this.state.cityData}
        error = {this.state.error}
        errorMesage = {this.state.errorMesage}
        handleCity = {this.handleCity}
        handleCitySubmit = {this.handleCitySubmit}
        mapURL = {this.state.mapURL}
        showCard = {this.state.showCard}
        weatherData = {this.state.weatherData}
        />
        <Footer/>
      </>
    )
  }
}

export default App;
