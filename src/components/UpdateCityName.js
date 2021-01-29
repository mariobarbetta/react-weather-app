import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import "../App.css";

class UpdateCityName extends Component {
  state = {
    showCityInput: false,
    // hamburgerActive: false,
  };

  handleChange = (e) => {
    this.props.onCityNameChange(e.target.value);
    if (e.target.name === "cityListInput") {
      e.preventDefault();
      this.setState({ showCityInput: false });

      this.props.onSubmit();
    }
  };

  handleCityListInputClick = (e) => {
    this.cityListItemClicked(e).then(this.props.onSubmit);
  };

  cityListItemClicked = (e) => {
    return new Promise((resolve, reject) => {
      this.props.onCityNameChange(e.target.value);
      this.setState({
        showCityInput: !this.state.showCityInput,
        hamburgerActive: !this.state.hamburgerActive,
      });
      resolve();
    });
  };

  handleRemove = (id) => {
    this.props.onRemoveCityListItem(id);
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit();
    this.setState({
      showCityInput: !this.state.showCityInput,
      hamburgerActive: !this.state.hamburgerActive,
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState((prevState) => ({
              showCityInput: !prevState.showCityInput,
            }));
          }}
        >
          X
        </button>

        <Fade left when={this.state.showCityInput}>
          <div
            style={{
              position: "absolute",
              backgroundColor: "rgb(220, 220, 220)",
              borderRadius: "0 9px 9px 0",
            }}
          >
            <form onSubmit={this.onSubmit}>
              <input
                ref={(input) => input && input.focus()}
                className="city-input"
                size="10"
                type="text"
                name="cityNameInput"
                placeholder="City"
                value={this.props.cityName}
                onChange={this.handleChange}
              />
              <input className="button" type="submit" value="+" />
              <div className="city-list">
                {this.props.cityList.map((city) => (
                  <p key={city.id}>
                    <input
                      name="cityListInput"
                      type="button"
                      value={city.cityListItem}
                      //   onClick={this.handleChange}
                      onClick={this.handleCityListInputClick}
                    />
                    <input
                      className="button"
                      type="button"
                      value="-"
                      onClick={() => {
                        this.handleRemove(city.id);
                      }}
                    />
                  </p>
                ))}
              </div>
            </form>
          </div>
        </Fade>
      </div>
    );
  }
}

export default UpdateCityName;
