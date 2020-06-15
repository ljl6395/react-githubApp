import React, { Component } from 'react'

export default class Header extends Component {
  state = {
    active: 'pop',
  }
  
  handleClick = type => {
    this.setState({
      active: type,
    })

    this.props.changePage(type)
  }
  render() {
    const { active } = this.state

    const buttonStyle = {
      cursor: "pointer",
      padding: '0 5px',
      borderRadius: '3px',
    }
    
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", marginTop: "50px", fontSize: "18px" }} >
        <span style={{ ...buttonStyle, background: active === 'pop' && '#ccc' }} onClick={() => this.handleClick('pop')} >
          Popular
        </span>
        <span style={{ ...buttonStyle, background: active === 'bat' && '#ccc' }} onClick={() => this.handleClick('bat')} >
          Battle
        </span>
      </div>
    )
  }
}