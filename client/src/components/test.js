import React, { Component } from "react";

class Test extends Component {
  state = {
    value: "Some text here",
    isEditMode: false
  };

  updateComponentValue = () => {
    this.setState({ isEditMode: false, value: this.refs.theTextInput.value });
  };
  changeEditMode = () => {
    this.setState({ isEditMode: !this.state.isEditMode });
  };
  renderEditView = () => {
    return (
      <div>
        <input type="text" defaultValue={this.state.value} ref="theTextInput" />
        <button onClick={this.changeEditMode}>X</button>
        <button onClick={this.updateComponentValue}>OK</button>
      </div>
    );
  };
  renderDefaultView = () => {
    return <div onDoubleClick={this.changeEditMode}>{this.state.value}</div>;
  };
  render() {
    console.log(this.state.value);
    return this.state.isEditMode
      ? this.renderEditView()
      : this.renderDefaultView();
  }
}

export default Test;

displayBookDetail = () => {
  const { book } = this.props.data;
  if (book) {
    return (
      <div>
        <h2 onDoubleClick={this.changeEditMode}>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books</p>
        <ul>
          {book.author.books.map(item => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <div>No book selected</div>;
  }
};
///////////////////////////////
import React, { Component } from "react";
import {
  Animated,
  Button,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";

import io from "socket.io-client";

class BookList extends Component {
  state = {
    mess: [],
    name: "Christoforos Lelekellis",
    color: "blue"
  };

  componentDidMount = () => {
    this.socket = io("http://192.168.2.5:9000");
    this.socket.on("chat", msg => {
      this.setState({ mess: msg });
      this.setState({ name: this.state.mess[0], color: this.state.mess[1] });
    });
  };

  render() {
    console.log(this.state.mess);
    return (
      <View style={{ backgroundColor: this.state.color }}>
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}
