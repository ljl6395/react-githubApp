import React, { Component } from 'react';

class PopCard extends Component {
  render() {
    const { item, index } = this.props
    const boxStyle = {
      height: '460px',
      width: '292px',
      background: '#ebebeb',
      marginBottom: '15px',
      borderRadius: "5px"
    }

    return (
      <li style={boxStyle}>
        <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '36px' }}>#{index + 1}</p>
        <div style={{ width: '160px', height: '160px', margin: '0 auto', marginTop: '30px' }}><img style={{ width: '160px', height: '160px' }} src={item.owner.avatar_url}></img></div>
        <h3 style={{ textAlign: 'center', marginTop: '15px' }}><a style={{ color: '#bd3251' }}>{item.name}</a></h3>
        <ul style={{ marginTop: '15px', marginLeft: '20px' }}>
          <li style={{ marginBottom: '5px' }}><i className="fa fa-user" aria-hidden="true" style={{ color: '#fec077', width: '15px' }} /> {item.name}</li>
          <li style={{ marginBottom: '5px' }}><i className="fa fa-code-fork fa-lg" aria-hidden="true" style={{ color: '#ffd700', width: '15px' }} /> {item.forks_count}</li>
          <li style={{ marginBottom: '5px' }}><i className="fa fa-star" aria-hidden="true" style={{ color: '#86c5f4', width: '15px' }} /> {item.stargazers_count}</li>
          <li style={{ marginBottom: '5px' }}><i className="fa fa-exclamation-triangle" aria-hidden="true" style={{ color: '#f09fa6', width: '15px' }} /> {item.open_issues_count}</li>
        </ul>
      </li>
    )
  }
}

export default PopCard;