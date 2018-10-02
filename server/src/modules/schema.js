import { gql } from "apollo-server-express"

export default gql`
  type Query {
    books(size: Int!, page: Int!): [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    addAuthor(name: String!, age: Int!): Author!
    addBook(name: String!, genre: String!, authorId: ID!): Author!
    signUp(name: String!, email: String!, password: String!): Token!
    signIn(email: String!, password: String!): Token!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    email: String!
  }

  type Author {
    id: ID!
    name: String
    age: Int
    books: [Book]
  }

  type Book {
    id: ID!
    name: String
    genre: String
    authorId: Author
  }
`
