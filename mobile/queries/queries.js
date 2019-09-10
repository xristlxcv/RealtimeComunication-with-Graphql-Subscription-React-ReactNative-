import { gql } from "gql-tag";

const getBooksQuery = gql`
  {
    books {
      name
      id
      genre
    }
  }
`;

export { getBooksQuery };
