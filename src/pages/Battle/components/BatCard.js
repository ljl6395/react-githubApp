import React from 'react';

class BatCard extends React.Component {
  render() {
    const boxStyle = {
      width: 290,
      background: '#ebebeb',
      marginBottom: 15,
      paddingTop: 35,
      paddingBottom: 15,
      borderRadius: 5,
      margin: 20,
    };

    const { final, item } = this.props;

    return (
      <li style={boxStyle}>
        <p style={{ textAlign: 'center', fontSize: 28 }}>{final ? 'Winner' : 'Loser'}</p>
        <div
          style={{
            width: 150,
            height: 150,
            margin: '0 auto',
            marginTop: 25,
          }}
        >
          <img
            style={{ width: 150, height: 150 }}
            src={item.avatar_url}
            alt=""
          />
        </div>
        <p style={{ textAlign: 'center', marginTop: 15 }}>
          Score {item.public_repos}
        </p>
        <h3 style={{ textAlign: 'center', marginTop: 10 }}>
          <a href={item.html_url} style={{ color: '#bd3251' }}>
            {item.name}
          </a>
        </h3>
        <ul style={{ marginLeft: '20px', marginTop: '15px' }}>
          <li style={{ marginBottom: '5px' }}>
            <i className="fa fa-user" aria-hidden="true" style={{ color: '#fec077', width: '18px' }} /> {item.name}
          </li>
          <li style={{ marginBottom: '5px' }}>
            <i className="fa fa-globe" aria-hidden="true" style={{ color: '#91918c', width: '18px' }} /> {item.location}
          </li>
          <li style={{ marginBottom: '5px' }}>
            <i className="fa fa-users" aria-hidden="true" style={{ color: '#86c5f4', width: '18px' }} /> {item.followers} followers
          </li>
          <li style={{ marginBottom: '5px' }}>
            <i className="fa fa-star" aria-hidden="true" style={{ color: '#ffeb3b', width: '18px' }} /> {item.following} following
          </li>
          <li style={{ marginBottom: '5px' }}>
            <i className="fa fa-code-fork fa-lg" aria-hidden="true" style={{ color: '#ffd700', width: '18px' }} /> {item.public_repos} repositories
          </li>
        </ul>
      </li>
    );
  }
}

export default BatCard;
