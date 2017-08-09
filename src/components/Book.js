import React from 'react'
import PropTypes from 'prop-types'

function getAuthors(list){
  if(!list){
    list = ['Unknown']
  }
  return list.join(', ')
}

const Book =({book,handleShelfChange})=>
   (
          <div className="book">
            <div className="book-top">
              <div className="book-cover"
              style={{ width: 128, height: 193, backgroundImage:
                `url(${book.imageLinks.thumbnail})` }}>
              </div>
              <div className="book-shelf-changer">
                <select onChange={(e)=>{handleShelfChange(e, book)}}>
                  <option value="none">Move to...</option>
                  <option value="currentlyReading" disabled={book.shelf==='currentlyReading'}>Currently Reading</option>
                  <option value="wantToRead" disabled={book.shelf==='wantToRead'}>Want to Read</option>
                  <option value="read" disabled={book.shelf==='read'}>Read</option>
                  <option value="none" disabled={book.shelf==='none'}>None</option>
                </select>
              </div>
            </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{getAuthors(book.authors)}</div>
          </div>
    )

Book.propTypes ={
  book:PropTypes.object,
  handleShelfChange:PropTypes.func
}

export default Book;
