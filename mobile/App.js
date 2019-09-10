import React, { Component } from "react";
import { View, Button, Text } from "react-native";
import BookList from "./components/BookList";

//apollo client
// const client = new ApolloClient({
//   uri: "http://192.168.2.6:4000/graphql"
// });
// const createBookSub = gql`
//   subscription {
//     create {
//       name
//       id
//     }
//   }
// `;

class App extends Component {
  render() {
    return (
      <View>
        <BookList />
      </View>
    );
  }
}

export default App;
