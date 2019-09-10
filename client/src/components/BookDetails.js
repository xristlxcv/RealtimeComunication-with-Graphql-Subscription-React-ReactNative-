import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getBookQuery,
  updateBookMutation,
  getBooksQuery
} from "../queries/queries";

class BookDetails extends Component {
  state = {
    isEditMode: false,
    name: "",
    id: "",
    genre: ""
  };

  changeEditMode = () => {
    console.log("sda");
    this.setState({ isEditMode: !this.state.isEditMode });
  };

  updateComponentValue = () => {
    console.log(this.props.updateBookMutation);
    this.props.updateBookMutation({
      variables: {
        id: this.state.id,
        name: this.state.name,
        genre: this.state.genre
      },

      refetchQueries: [{ query: getBooksQuery }]
    });
    this.socket.emit("chat message", [
      { id: this.state.id, name: this.state.name, genre: this.state.genre }
    ]);
    this.setState({ isEditMode: false });
  };
  displayBookDetail = () => {
    const { book } = this.props.data;
    if (book) {
      return this.state.isEditMode ? (
        <div>
          <div>
            <input
              type="text"
              defaultValue={book.name}
              onChange={e =>
                this.setState({
                  name: e.target.value,
                  id: book.id
                })
              }
            />

            <button onClick={this.changeEditMode}>X</button>
            <button onClick={this.updateComponentValue}>OK</button>
          </div>
          <div>
            <input
              type="text"
              defaultValue={book.genre}
              onChange={e =>
                this.setState({
                  genre: e.target.value,
                  id: book.id
                })
              }
            />

            <button onClick={this.changeEditMode}>X</button>
            <button onClick={this.updateComponentValue}>OK</button>
          </div>
        </div>
      ) : (
        <div>
          <h2 onDoubleClick={this.changeEditMode}>{book.name}</h2>
          <p onDoubleClick={this.changeEditMode}>{book.genre}</p>
        </div>
      );
    } else {
      return <div>No book selected</div>;
    }
  };
  render() {
    console.log(this.state.name);

    return <div id="bookdetails">{this.displayBookDetail()}</div>;
  }
}

export default compose(
  graphql(getBookQuery, {
    options: props => {
      return {
        variables: {
          id: props.bookid
        }
      };
    }
  }),
  graphql(updateBookMutation, { name: "updateBookMutation" })
)(BookDetails);
