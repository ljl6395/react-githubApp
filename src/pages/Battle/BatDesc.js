import React, { Component } from "react";
import { Link } from "react-router-dom";
import BatInput from "./components/BatInput";

class BatDesc extends Component {
  state = {
    dataOne: {},
    dataTwo: {},
  };

  handleSave = (player, data) => {
    if (player === "One") {
      this.setState({
        dataOne: data,
      });
    } else {
      this.setState({
        dataTwo: data,
      });
    }
  };

  render() {
    const { dataOne, dataTwo } = this.state;

    const instrUlStyle = {
      maxWidth: 1000,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      margin: "0 auto",
      marginTop: 30,
    };
    const instrLiStyle = {
      height: 250,
      width: 250,
      background: "#ebebeb",
      margin: "0 auto",
      margin: "15px 0",
      borderRadius: 5,
      textAlign: "center",
    };
    const playerStyle = {
      maxWidth: 1000,
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      marginTop: 30,
    };
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
      marginTop: 15,
    };

    const instrList = [
      {
        title: "Enter two github users",
        icon: "fa fa-users fa-5x",
        color: "#ffbf74",
      },
      {
        title: "Battle",
        icon: "fa fa-fighter-jet fa-5x",
        color: "#727272",
      },
      {
        title: "See the winner",
        icon: "fa fa-trophy fa-5x",
        color: "#ffd700",
      },
    ];

    return (
      <>
        <section style={{ marginTop: 60 }}>
          <p style={{ textAlign: "center", fontSize: 30 }}>Instructions</p>
          <ul style={instrUlStyle}>
            {instrList.map((item) => (
              <li key={item.title} style={{ width: 260 }}>
                <p style={{ textAlign: "center", fontSize: 24 }}>
                  {item.title}
                </p>
                <div style={instrLiStyle}>
                  <i
                    className={item.icon}
                    aria-hidden="true"
                    style={{ marginTop: 75, color: item.color }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ margin: "60px 0" }}>
          <p style={{ textAlign: "center", fontSize: 30 }}>Player</p>
          <ul style={playerStyle}>
            <BatInput
              player="One"
              savePlayer={(data) => this.handleSave("One", data)}
            />
            <div style={{ width: 20, height: 40 }} />
            <BatInput
              player="Two"
              savePlayer={(data) => this.handleSave("Two", data)}
            />
          </ul>
          {dataOne.login && dataTwo.login && (
            <div style={batBtnStyle}>
              <Link
                style={{ color: "white" }}
                to={{
                  pathname: "/battle/result",
                  query: { dataOne: dataOne, dataTwo: dataTwo },
                }}
              >
                BATTLE
              </Link>
            </div>
          )}
        </section>
      </>
    );
  }
}

export default BatDesc;
