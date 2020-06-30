import React, { Component } from 'react';
import axios from 'axios';

class BatInput extends Component {
  state = {
    value: '',
    data: {},
    errorMsg: null,
  }

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({
      value,
    });
  }

  handleSubmit = async () => {
    const { value } = this.state;

    try {
      const res = await axios.get(`https://api.github.com/users/${value}?client_id=YOUR_CLIENT_ID&client_secret=YOUR_SECRET_ID`);

      this.setState({
        data: res.data,
        errorMsg: null,
      });

      this.props.savePlayer(res.data);
    } catch (error) {
      const { message } = error.response.data;

      this.setState({
        errorMsg: message,
      });
    }
  }

  handleDelete = () => {
    this.setState({
      value: '',
      data: {},
    });

    this.props.savePlayer({});
  }

  render() {
    const { player } = this.props;
    const { value, errorMsg, data } = this.state;
    const imgSrc = `https://github.com/${value}.png?size=200`;

    const deleteStyle = {
      height: 25,
      width: 25,
      borderRadius: 'calc(50%)',
      background: '#e80000',
      color: 'white',
      position: 'absolute',
      right: 10,
      top: 18,
      textAlign: 'center',
      lineHeight: '25px',
      cursor: 'pointer',
    };

    return (
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 24 }}>Player {player}</p>
        {data.login
          ? (
            <div style={{
              height: 60, background: '#ebebeb', marginTop: 15, position: 'relative', borderRadius: 5,
            }}
            >
              <img
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  marginTop: 10,
                  marginLeft: 10,
                }}
                src={imgSrc}
                alt=""
              />
              <span
                style={{
                  color: '#e80000',
                  fontSize: 22,
                  display: 'inline-block',
                  position: 'absolute',
                  top: 15,
                  left: 60,
                }}
              >
                {data.login}
              </span>
              <div style={deleteStyle} onClick={this.handleDelete}>
                <strong>X</strong>
              </div>
            </div>
          )
          : (
            <div style={{
              display: 'flex', marginTop: 15, display: 'flex', justifyContent: 'space-between',
            }}
            >
              <input
                style={{
                  height: 36, flex: '4 1 auto', fontSize: 18, paddingLeft: 5,
                }}
                placeholder="github username"
                onChange={this.handleChange}
                value={value}
              />
              <button
                style={{
                  height: 40, flex: '1 1 auto', marginLeft: 10, fontSize: 18,
                }}
                disabled={!value.length}
                onClick={this.handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          )}
        <p style={{ marginTop: 5, fontSize: 18, color: 'red' }}>{errorMsg}</p>
      </div>
    );
  }
}

export default BatInput;
