import React, { Component } from 'react';
import BatCard from './components/BatCard';

class BatFinal extends Component {

  render() {
    const { dataOne, dataTwo } = this.props
    const final = dataOne.public_repos - dataTwo.public_repos > 0

    const batBtnStyle = {
      width: 180,
      textAlign: 'center',
      margin: '0 auto',
      background: 'black',
      color: 'white',
      fontSize: 20,
      cursor: 'pointer',
      padding: 5,
      borderRadius: 5,
      marginTop: 30
    }

    return (
      <>
        <ul style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: 60 }}>
          <BatCard final={final} item={dataOne} />
          <BatCard final={!final} item={dataTwo} />
        </ul>
        <div style={batBtnStyle} onClick={this.props.reset}>RESET</div>
      </>
    );
  }
}

export default BatFinal;