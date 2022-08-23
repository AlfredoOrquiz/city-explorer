import React from 'react';
import './App.css'
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    city: ''
  }
  }

  handleCity = (e) => {
    this.setState({
      city: e.target.city.value
    });
    console.log(this.state.city);
    // Get data from some API's
  }

  submitForm = (e) => {
    e.preventDefault();

    console.log(this.state.city);
    // Get data from API's
  }
  render() {
    return (
      <>
        <form onSubmit={this.submitForm}>
          <label>Pick a City
            <input 
            type='text' 
            name='city' 
            onInput={this.handleCity}/>
            <button>Submit</button>
          </label>
        </form>
        <Header/>
        <Main/>
        <Footer/>
      </>
    )
  }
}

export default App;
