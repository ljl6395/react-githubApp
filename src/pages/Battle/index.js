import React, { Component } from 'react';
import BatDesc from './BatDesc';
import BatFinal from './BatFinal';

class Battle extends Component {
  state = {
    page: 'desc',
  }

  showFinal = (one, two) => {
    this.setState({
      page: 'final',
      dataOne: one,
      dataTwo: two,
    });
  }

  handleReset = () => {
    this.setState({
      page: 'desc',
    });
  }

  render() {
    const { page, dataOne, dataTwo } = this.state;

    return (
      <>
        {page === 'desc'
          ? <BatDesc showFinal={(one, two) => this.showFinal(one, two)} />
          : <BatFinal dataOne={dataOne} dataTwo={dataTwo} reset={this.handleReset} />}
      </>
    );
  }
}

export default Battle;
