import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router'
import {debounce} from 'lodash/function'
import Bookshelf from './Bookshelf.js'

class Searchbar extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleShelfChange = this.handleShelfChange.bind(this);
    this.debouncedSearch =  debounce(this.debouncedSearch.bind(this), 400);
    this.state = {
      redirect:false,
      query:''
    }
  }

  handleShelfChange(){
    this.setState({
        redirect:true
      });
  }

  handleChange(e){
    e.persist();
    this.debouncedSearch(e);
  }

  debouncedSearch(event){
    this.setState(
      {
        query:event.target.value
      }
    )
  }

  render() {
    const redirect = this.state.redirect;
    const query = this.state.query;
    if(redirect){
      return(
        <Redirect to="/" />
      );
    }
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search" >Close</Link>
            <div className="search-books-input-wrapper">
              <input onChange={this.handleChange} type="text" placeholder="Search by title or author"/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
        <Bookshelf handleShelfChange={this.handleShelfChange} query={query} />
      </div>
    );
  }
}

export default Searchbar;
