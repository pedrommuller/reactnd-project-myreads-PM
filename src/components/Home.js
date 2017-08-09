import React from 'react'
import {Link} from 'react-router-dom'
import Bookshelf from './Bookshelf.js'

const Home = () => 
   (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads - Pedro Muller | Aug - 2017</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
          Add a book
          </Link>
        </div>
      </div>
    )

export default Home;
