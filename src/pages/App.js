import React, { Component } from 'react'
import Popular from './Popular'
import Battle from './Battle'

export default class App extends Component {
  state = {
    page: 'pop',
  }

  changePage = page => {
    this.setState({
      page,
    })
  }

  render() {
    const { page } = this.state

    const buttonStyle = {
      cursor: "pointer",
      padding: '0 5px',
      borderRadius: '3px',
    }

    return (
      <>
        <div style={{ maxWidth: "1200px", margin: "0 auto", marginTop: "50px", fontSize: "18px" }} >
          <span style={{ ...buttonStyle, background: page === 'pop' && '#ebebeb' }} onClick={() => this.changePage('pop')} >
            Popular
          </span>
          <span style={{ ...buttonStyle, background: page === 'bat' && '#ebebeb' }} onClick={() => this.changePage('bat')} >
            Battle
          </span>
        </div>
        <div>
          {page === 'pop' && <Popular />}
          {page === 'bat' && <Battle />}
        </div>
      </>
    )
  }
}