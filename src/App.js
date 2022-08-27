import React from 'react';
import axios from 'axios';
import Footer from './Footer';
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
    movieData: [],
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
    let cityObj = await this.helpMap();
    this.helpWeather(cityObj);
    this.helpMovies(this.state.city);
  };
  
  helpMap = async () => {
    try {    
      //This is the form that will catch the cityData object array
      let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`)
      let map_Url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${response.data[0].lat},${response.data[0].lon}&zoom=12`;
      this.setState({
        cityData: response.data[0],
        error: false,
        map: map_Url,
        showCard: false,
      });
      return response.data[0];
    }
    catch(error) {
      this.setState({
        error: true,
        errorMessage: `Oh oh! It seems like an error has occured: ${error.response.status}`,
      });
    }
  }

  helpMovies = async (input) => {
    console.log('Im alive')
    try {
      let urlMovie = `${process.env.REACT_APP_SERVER}/movies?title=${input}`
      let movies = await axios.get(urlMovie);
      console.log(movies);
      if(!movies) {
        movies = []
      }
      this.setState({
        error:false,
        movieData: movies.data
      })
    } catch (error) {
      console.log('Try was not alive. Lets try catch')
      this.setState({
        error: true,
        errorMessage: `You are killing me smalls!`,
      })
    }
    console.log('Try and Catch failed.')
  }

  helpWeather = async (input) => {
    try {
      // I am now creating a request to the Back End Server to the Front End Server (this current code).
      let urlWeather = `${process.env.REACT_APP_SERVER}/weather?lat=${input.lat}&lon=${input.lon}&format=json`;
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
        <Main
        city = {this.state.city}
        cityData = {this.state.cityData}
        error = {this.state.error}
        errorMesage = {this.state.errorMesage}
        handleCity = {this.handleCity}
        handleCitySubmit = {this.handleCitySubmit}
        map = {this.state.map}
        movieData = {this.state.movieData}
        showCard = {this.state.showCard}
        weatherData = {this.state.weatherData}
        />
        <Footer/>
      </>
    )
  }
}

export default App;
