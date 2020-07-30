import React, { Component } from "react";
import { Link } from "react-router-dom";
import BatCard from "./components/BatCard";

class BatFinal extends Component {
  state = {
    dataOne: {},
    dataTwo: {},
  };

  componentDidMount() {
    if (this.props.location.query) {
      const { dataOne, dataTwo } = this.props.location.query;

      this.setState({
        dataOne,
        dataTwo,
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
