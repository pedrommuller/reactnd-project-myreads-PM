import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  render() {
    const book = this.props.book;
    if(!book.authors){
      book.authors = ['Unknown']
    }
    return (
          <div className="book">
            <div className="book-top">
              <div className="book-cover"
              style={{ width: 128, height: 193, backgroundImage:
                `url(${book.imageLinks.thumbnail})` }}>
              </div>
              <div className="book-shelf-changer">
                <select onChange={(e)=>{this.props.handleShelfChange(e, book)}}>
                  <option value="none">Move to...</option>
                  <option value="currentlyReading" disabled={book.shelf==='currentlyReading'}>Currently Reading</option>
                  <option value="wantToRead" disabled={book.shelf==='wantToRead'}>Want to Read</option>
                  <option value="read" disabled={book.shelf==='read'}>Read</option>
                  <option value="none" disabled={book.shelf==='none'}>None</option>
                </select>
              </div>
            </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors.join(', ')}</div>
          </div>
    )
  }
}

Book.propTypes ={
  book:PropTypes.object,
  handleShelfChange:PropTypes.func
}

export default Book;
