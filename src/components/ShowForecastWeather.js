import React, { Component } from "react";
import "../App.css";
import DayCard from "./DayCard";

class ShowForecastWeather extends Component {
  formatDayCards = () => {
    return this.props.dailyData.map((reading, index) => (
      <DayCard reading={reading} key={index} />
    ));
  };

  render() {
    return (
      <div className="day-card-container">
        {/* <div> */}
        {this.formatDayCards()}
        {/* </div> */}
      </div>
    );
  }
}

export default ShowForecastWeather;
