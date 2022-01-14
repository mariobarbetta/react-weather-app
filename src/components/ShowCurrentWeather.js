import React, { Component } from "react";

class ShowCurrentWeather extends Component {
  render() {
    let imgIcon = this.props.currentWeather.weather[0].icon;
    let imgURL = `https://openweathermap.org/img/wn/${imgIcon}@2x.png`;

    return (
      <div className="current-weather-container">
        <p className="larger-text">{this.props.currentWeather.name}</p>
        <p
          className="current-weather-container__temp"
          style={{ letterSpacing: "-5px" }}
        >
          &nbsp;{Math.round(this.props.currentWeather.main.temp)}&#176;
        </p>
        <img
          src={imgURL}
          alt={this.props.currentWeather.weather[0].description}
        />
        <p>{this.props.currentWeather.weather[0].description}</p>
        <p className="smaller-text">
          humidity {this.props.currentWeather.main.humidity}%
        </p>
        <p className="smaller-text">
          feels like {Math.round(this.props.currentWeather.main.feels_like)}
          &#176;
        </p>
      </div>
    );
  }
}

export default ShowCurrentWeather;
