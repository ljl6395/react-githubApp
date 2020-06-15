import React, { Component } from 'react'
import Header from './components/Header'
import Popular from './components/Popular'

export default class App extends Component {
  state = {
    page: 'pop'
  }

  changePage = page => {
    this.setState({
      page,
    })
  }

  render() {
    const { page } = this.state

    return (
      <>
        <div>
          <Header changePage={page => this.changePage(page)} />
        </div>
        <div>
          {page === 'pop' && <Popular />}
        </div>
      </>
    )
  }
}