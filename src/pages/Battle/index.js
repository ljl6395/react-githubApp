import React, { Component } from 'react';
import BatDesc from './BatDesc';
import BatFinal from './BatFinal';

class Battle extends Component {
  state = {
    page: 'desc'
  }

  showFinal = (dataOne, dataTwo) => {
    this.setState({
      page: 'final',
      dataOne,
      dataTwo,
    })
  }

  handleReset = () => {
    this.setState({
      page: 'desc'
    })
  }

  render() {
    const { page, dataOne, dataTwo } = this.state

    return (
      <>
        {page === 'desc' ?
          <BatDesc showFinal={(dataOne, dataTwo) => this.showFinal(dataOne, dataTwo)} /> :
          <BatFinal dataOne={dataOne} dataTwo={dataTwo} reset={this.handleReset} />}
      </>
    );
  }
}

export default Battle;