import React, { Component } from "react";
import BookList from "./components/Booklist";
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "react-apollo";
import AddBook from "./components/AddBook";
//apollo client
// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql"
// });

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Hello</h1>
        <BookList />
        <AddBook />
      </div>
    );
  }
}

export default App;
