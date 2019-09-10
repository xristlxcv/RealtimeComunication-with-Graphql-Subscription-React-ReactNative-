import React, { Component } from "react";
//import { graphql, compose } from "react-apollo";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

// import {
//   getAuthorsQuery,
//   addBookMutation,
//   getBooksQuery,
//   createBookSub
// } from "../queries/queries";
const ADD_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorid: ID!) {
    addBook(name: $name, genre: $genre, authorid: $authorid) {
      name
      genre
      id
    }
  }
`;
const GET_BOOKS = gql`
  query {
    books {
      name
      id
      genre
    }
  }
`;

const GET_AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;
class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorid: ""
  };
  displayAuthors = () => {
    return (
      <Query query={GET_AUTHORS}>
        {({ loading, data }) => {
          if (loading) return <option disabled>"LOADING..."</option>;
          const { authors } = data;
          return authors.map(author => {
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          });
        }}
      </Query>
    );
  };

  // submitForm = e => {
  //   e.preventDefault();
  //   this.props.addBookMutation({
  //     variables: {
  //       name: this.state.name,
  //       genre: this.state.genre,
  //       authorid: this.state.authorid
  //     },
  //     refetchQueries: [{ query: getBooksQuery }]
  //   });
  // };

  render() {
    const { name, genre, authorid } = this.state;
    return (
      <Mutation mutation={ADD_BOOK} variables={{ name, genre, authorid }}>
        {addBook => (
          <div>
            <form
              id="add-book"
              onSubmit={e => {
                e.preventDefault();
                addBook({
                  variables: {
                    name: this.state.name,
                    genre: this.state.genre,
                    authorid: this.state.authorid
                  },
                  refetchQueries: [{ query: GET_BOOKS }]
                });
              }}
            >
              <div className="field">
                <label>Book name:</label>
                <input
                  type="text"
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Genre:</label>
                <input
                  type="text"
                  onChange={e => this.setState({ genre: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Author:</label>
                <select
                  onChange={e => this.setState({ authorid: e.target.value })}
                >
                  <option>select author</option>
                  {this.displayAuthors()}
                </select>
              </div>
              <button>+</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default AddBook;
