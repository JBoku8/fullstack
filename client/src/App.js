import React from 'react';

import './App.css';

// http://localhost:4000/api/books/
class App extends React.Component {
  state = {
    books:[]
  }
  async componentDidMount(){
    const response = await fetch("api/books/");
    const books = await response.json();
    this.setState({books})

  }
  render(){
    return (
      <div className="App">
       <ul>
         {this.state.books.map( book => {
           return (
            <li key={book._id}>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <p>{book.genre}</p>
            </li>
           )
         })}
       </ul>
      </div>
    );
  }
}

export default App;
