import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'
import Loader from '../UI/Loader.js'
import _lang from 'lodash/lang'
import _collection from 'lodash/collection'
import _array from 'lodash/array'
import * as booksAPI from '../BooksAPI.js'

class Bookshelf extends Component {

  constructor(props){
    super(props);
    this.handleShelfChange = this.handleShelfChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.doQuery = this.doQuery.bind(this);
    this.state = {
      shelves: {},
      loading:true
    }
  }

  toFriendlyName(name){
      return name.replace(/([A-Z])/g,' $1')
      .replace(/\b[a-z](?=[a-z]{2})/g,
      letter=>letter.toUpperCase()).trim();
  }

  handleShelfChange(e,book){
    if(!this.props.handleShelfChange)
      this.setState({loading:true});
    booksAPI.update(book,e.target.value).then(()=>{
      if(this.props.handleShelfChange){
        this.props.handleShelfChange();
      }else{
        this.fetchData();
      }
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.query!==nextProps.query){
      this.setState({
        loading:true
      });
      this.doQuery(nextProps.query);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  doQuery(query){
    if(_lang.isEmpty(query)){
      this.setState({
        shelves:{},
        loading:false
      });
      return;
    }

    booksAPI.search(query,10).then(data=>{
      if(data.hasOwnProperty('error')){
        this.setState(
          {
            shelves:{},
            loading:false
          }
        );
      }else{
        let promises =[]
        let unique = _array.uniqBy(data,e=>e.id);
        unique.forEach(e=>{
          if(!e.hasOwnProperty('shelf')){
            e.shelf = 'none';
            promises.push(booksAPI.get(e.id))
          }
          /*
          I tried to manage a scoped variable but I lost it on each refresh
          so I decided to move to a fetch to sync the search and user data

          Object.keys(localDataStore).forEach(key=>{
            var book = _collection.find(localDataStore[key],(f)=>f.id===e.id);
            if(!_lang.isEmpty(book)){
              e.shelf = book.shelf;
            }
          });
          */
        });

        Promise.all(promises).then(responses=>{
          unique.forEach(e=>{
            let book =_collection.find(responses,(f)=>f.id===e.id)
            if(!_lang.isEmpty(book)){
              e.shelf = book.shelf;
            }
          });

          this.setState({
            shelves: _collection.groupBy(unique,(o)=>o.shelf),
            loading:false
          });
        })


      }
    });
  }

  fetchData(){
    if(this.props.hasOwnProperty('query')){
      this.doQuery(this.props.query);
      return;
    }
    booksAPI.getAll().then(data=>{
      this.setState({
        shelves:_collection.groupBy(data,(o)=>o.shelf),
        loading:false
      });

    });
  }

  render() {
    const shelves = this.state.shelves;
    const loading = this.state.loading;
    if(loading){
      return (
        <Loader />
      );
    }else{
      if(_lang.isEmpty(shelves)){
        return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">
              Books not found
            </h2>
          </div>
        );
      }

        return (
          <div>
          {
            Object.keys(shelves).map(element=>
              <div key={element} className="bookshelf">
                <h2 className="bookshelf-title">{this.toFriendlyName(element)}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {
                    shelves[element].map(b =>
                      <li key={b.id}>
                        <Book handleShelfChange={this.handleShelfChange} book={b} />
                      </li>
                    )
                  }
                  </ol>
                </div>
              </div>
            )
          }
          </div>
        );

    }
  }
}

Bookshelf.propTypes = {
  handleShelfChange: PropTypes.func,
  query:PropTypes.string
};

export default Bookshelf;
