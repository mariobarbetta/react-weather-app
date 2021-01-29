import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./bootstrap.min.css";
import ShowCurrentWeather from "./components/ShowCurrentWeather";

class App extends Component {
  state = {
    currentWeather: [],
    isLoaded: false,
    cityName: "Seattle",
    dailyData: [],
  };

  componentDidMount() {
    this.getCurrentWeather();
  }

  getCurrentWeather = () => {
    let cityName = this.state.cityName;
    let apiKey = process.env.REACT_APP_API_KEY;

    console.log(process.env);

    if (cityName === "") {
      return;
    }

    let currentWeatherData = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},us&appid=${process.env.REACT_APP_API_KEY}&units=imperial`;

    axios.get(currentWeatherData).then((res) => {
      this.setState({
        isLoaded: true,
        currentWeather: res.data,
      });
    });

    this.setState({ cityName: "" });
  };

  render() {
    let { isLoaded } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="app-style">
          <ShowCurrentWeather
            currentWeather={this.state.currentWeather}
            cityName={this.state.cityName}
          />
        </div>
      );
    }
  }
}

export default App;
