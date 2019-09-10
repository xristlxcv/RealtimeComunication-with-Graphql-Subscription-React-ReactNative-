import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { Query, Subscription } from "react-apollo";
import gql from "graphql-tag";
//mport { getBooksQuery } from "../queries/queries";

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

  render() {
    return (
      <View>
        <Query query={GET_BOOKS}>
          {({ loading, data, subscribeToMore }) => {
            if (loading) return <Text>"LOADING..."</Text>;

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
            return books.map(book => <Text>{book.name}</Text>);
          }}
        </Query>
      </View>
    );
  }
}

export default BookList;
