import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      name
      id
      genre
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorid: ID!) {
    addBook(name: $name, genre: $genre, authorid: $authorid) {
      name
      genre
      id
    }
  }
`;

const updateBookMutation = gql`
  mutation($id: ID!, $name: String!, $genre: String!) {
    updateBook(id: $id, name: $name, genre: $genre) {
      id
      name
      genre
    }
  }
`;
const createBookSub = gql`
  subscription {
    create {
      name
      id
    }
  }
`;
const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
  getBookQuery,
  updateBookMutation,
  createBookSub
};
