import React from 'react'
import {Route} from 'react-router-dom'
import './App.css'

import Home from './components/Home.js'
import Searchbar from './components/Searchbar.js'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Searchbar} />
      </div>
    )
  }
}

export default BooksApp
