import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import Popular from "./Popular";
import Battle from "./Battle";

class App extends Component {
  state = {
    page: "pop",
  };

  changePage = (page) => {
    this.setState({
      page,
    });
  };

  render() {
    const { page } = this.state;

    return (
      <>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            marginTop: "50px",
            fontSize: "18px",
          }}
        >
          <span
            style={{ background: page === "pop" && "#ebebeb" }}
            className="pbButton"
            onClick={() => this.changePage("pop")}
          >
            Popular
          </span>
          <span
            style={{ background: page === "bat" && "#ebebeb" }}
            className="pbButton"
            onClick={() => this.changePage("bat")}
          >
            Battle
          </span>
        </div>
        <div>
          {page === "pop" && <Popular />}
          {page === "bat" && <Battle />}
        </div>
      </>
    );
  }
}

export default hot(App);
