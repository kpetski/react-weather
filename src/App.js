import React, { Component } from 'react'
import Header from './components/Header'
import axios from 'axios'
import WeatherTable from './components/WeatherTable'

const corsAnywhere = "https://cors-anywhere.herokuapp.com/"
const appID = "6ea35fbcd51d5e917b7d8309292bc51c"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      spinner: 0,
      isError: false,
      cityName: '',
      units: 'imperial',
    }
  }

  getWeather = () => {
    this.setState({
      data: undefined,
      spinner: 1,
      isError: false,
    });
    axios.get(`${corsAnywhere}http://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName},us&units=${this.state.units}&mode=json&&appid=${appID}`).then((response) => {
      this.setState({
        data: response.data,
        spinner: 0,
        isError: false
      });
    }).catch(err => {
      let errorMessage = ''
      if (err.response && err.response.statusText === 'Not Found') {
        errorMessage = 'Please enter a valid city'
      }
      else {
        errorMessage = err.response ? err.response.statusText : err.toString()
      }
      console.log(errorMessage)
      this.setState({
        data: errorMessage,
        spinner: 0,
        isError: true
      })
    })
  }

  handleSubmit = (event) => {
    console.log(`in handle submit with ${this.state.cityName}`)
    event.preventDefault()
    this.getWeather()

  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="large-12 columns md-text-field with-floating-label">
              <input type="text" id="input_city" required
                value={this.state.cityName}
                onChange={(event) => this.setState({ cityName: event.target.value })} />
              <label htmlFor="input_city">City</label>
              <button type="submit" className="button btn-cta right">Submit</button>
            </div>
          </div>
        </form>
        <br />

        {(this.state.spinner === 0 && this.state.isError === false && this.state.data) &&
          <WeatherTable data={this.state.data} />
        }
        {this.state.spinner > 0 &&
          <div className="text-center">
            <span className="loading-indicator xlarge"></span>
          </div>
        }
        {(this.state.spinner === 0 && this.state.isError === true) &&
          <div className="notification-box alert">{this.state.data}</div>
        }

      </div>

    );
  }
}

export default App;
