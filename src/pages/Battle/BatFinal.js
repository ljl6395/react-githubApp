import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BatCard from "./components/BatCard";

class BatFinal extends Component {
  state = {
    dataOne: {},
    dataTwo: {},
  };

  async componentDidMount() {
    const { location } = this.props;

    if (location.query) {
      const { dataOne, dataTwo } = location.query;

      this.setState({
        dataOne,
        dataTwo,
      });
    } else {
      const { search } = location;

      const player1 = search.split("player1=")[1].split("&")[0];
      const player2 = search.split("player2=")[1];

      const res1 = await axios.get(
        `https://api.github.com/users/${player1}?client_id=YOUR_CLIENT_ID&client_secret=YOUR_SECRET_ID`
      );
      const res2 = await axios.get(
        `https://api.github.com/users/${player2}?client_id=YOUR_CLIENT_ID&client_secret=YOUR_SECRET_ID`
      );

      this.setState({
        dataOne: res1.data,
        dataTwo: res2.data,
      });
    }
  }

  render() {
    const { dataOne, dataTwo } = this.state;
    const final = dataOne.public_repos - dataTwo.public_repos > 0;

    const batBtnStyle = {
      width: 180,
      textAlign: "center",
      margin: "0 auto",
      background: "black",
      color: "white",
      fontSize: 20,
      cursor: "pointer",
      padding: 5,
      borderRadius: 5,
      marginTop: 30,
    };

    return (
      <>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 60,
          }}
        >
          <BatCard final={final} item={dataOne} />
          <BatCard final={!final} item={dataTwo} />
        </ul>
        <div style={batBtnStyle}>
          <Link to="/battle" style={{ color: "white" }}>
            RESET
          </Link>
        </div>
      </>
    );
  }
}

export default BatFinal;
