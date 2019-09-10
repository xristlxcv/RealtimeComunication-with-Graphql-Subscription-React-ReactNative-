import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import BookDetails from "./BookDetails";

const GET_BOOKS = gql`
  {
    books {
      name
      id
      genre
    }
  }
`;
const BOOK_SUB = gql`
  subscription {
    create {
      name
      genre
      id
    }
  }
`;

let unsubscribe = null;

class BookList extends Component {
  state = {
    selected: null
  };

  _subscribeToNewBooks = subscribeToMore => {
    subscribeToMore({
      document: BOOK_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const create = subscriptionData.data.create;

        return Object.assign({}, prev, {
          books: {
            name: [create, ...prev.books.name]
          }
        });
      }
    });
  };

  displayBooks = () => {
    return (
      <Query query={GET_BOOKS}>
        {({ loading, data, subscribeToMore }) => {
          console.log(data);
          if (loading) return <div>"LOADING..."</div>;
          const { books } = data;
          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
              document: BOOK_SUB,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { create } = subscriptionData.data;
                console.log(create);
                return {
                  ...prev,
                  books: [...prev.books, create]
                };
              }
            });
          }
          return books.map(book => (
            <li
              key={book.id}
              onClick={e => {
                this.setState({ selected: book.id });
              }}
            >
              <p> {book.name}</p>
            </li>
          ));
        }}
      </Query>
    );
  };
  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookid={this.state.selected} />
      </div>
    );
  }
}

export default BookList;
