import React, { Component } from "react";
import { Link } from "react-router-dom";
import BatInput from "./components/BatInput";
import styles from "./BatDesc.less";

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
          <ul className={styles.instrUlStyle}>
            {instrList.map((item) => (
              <li key={item.title} style={{ width: 260 }}>
                <p style={{ textAlign: "center", fontSize: 24 }}>
                  {item.title}
                </p>
                <div className={styles.instrLiStyle}>
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

        <section style={{ marginTop: 60 }}>
          <p style={{ textAlign: "center", fontSize: 30 }}>Player</p>
          <ul className={styles.playerStyle}>
            <BatInput
              player="One"
              savePlayer={(data) => this.handleSave("One", data)}
            />
            {/* <div className={styles.playerDiv} /> */}
            <BatInput
              player="Two"
              savePlayer={(data) => this.handleSave("Two", data)}
            />
          </ul>
          {dataOne.login && dataTwo.login && (
            <div className={styles.batBtnStyle}>
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
