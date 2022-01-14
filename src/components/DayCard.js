import React from "react";
var moment = require("moment");

const DayCard = ({ reading }) => {
  let newDate = new Date();
  const weekday = reading.dt * 1000;
  newDate.setTime(weekday);

  let imgIcon = reading.weather[0].icon;
  let imgURL = `https://openweathermap.org/img/wn/${imgIcon}@2x.png`;

  return (
    // <div className="center-forecast">
    <div className="day-card">
      <div>
        <p>{moment(newDate).format("dddd")}</p>
      </div>
      <div>
        <img src={imgURL} alt={reading.weather[0].description} />
        <p className="day-card__temp" style={{ display: "inline" }}>
          {Math.round(reading.main.temp)}°
        </p>
      </div>
    </div>
    // </div>
  );
};

export default DayCard;
