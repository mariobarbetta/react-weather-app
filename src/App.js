import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./bootstrap.min.css";
import ShowCurrentWeather from "./components/ShowCurrentWeather";
import ShowForecastWeather from "./components/ShowForecastWeather";
import UpdateCityName from "./components/UpdateCityName";

class App extends Component {
  state = {
    currentWeather: [],
    isLoaded: false,
    cityName: "Seattle",
    dailyData: [],
    cityList: [],
  };

  componentDidMount() {
    this.getCurrentWeather();
  }

  getCurrentWeather = () => {
    let cityName = this.state.cityName;

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

    this.getForecastWeather();

    this.setState({ cityName: "" });
  };

  getForecastWeather = () => {
    const forecastWeatherData = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`;

    axios.get(forecastWeatherData).then((res) => {
      const dailyData = res.data.list.filter((reading) =>
        reading.dt_txt.includes("18:00:00")
      );
      this.setState({
        dailyData: dailyData,
      });
    });
  };

  cityNameChanged = (cityNameInput) => {
    this.setState({ cityName: cityNameInput });
  };

  removeCityListItem = (id) => {
    this.setState((state) => ({
      cityList: state.cityList.filter((city) => city.id !== id),
    }));
  };

  render() {
    let { isLoaded } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="app-style">
          <UpdateCityName
            cityList={this.state.cityList}
            cityName={this.state.cityName}
            onSubmit={this.getCurrentWeather}
            onCityNameChange={this.cityNameChanged}
            onRemoveCityListItem={this.removeCityListItem}
          />
          <ShowCurrentWeather
            currentWeather={this.state.currentWeather}
            cityName={this.state.cityName}
          />
          <ShowForecastWeather dailyData={this.state.dailyData} />
        </div>
      );
    }
  }
}

export default App;
