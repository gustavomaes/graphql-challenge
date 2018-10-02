import express from "express"
import { ApolloServer, AuthenticationError } from "apollo-server-express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

// import schema from "./src/modules/schema"
// import resolvers from "./src/modules/resolvers"
import { makeExecutableSchema } from "graphql-tools"

import * as BookType from "./src/modules/Book/BookType"
import * as AuthorType from "./src/modules/Author/AuthorType"
import * as UserType from "./src/modules/User/UserType"

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
  
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
`

const typeDefs = [BookType.typeDefs, AuthorType.typeDefs, UserType.typeDefs]

const resolvers = {
  Query: {
    ...BookType.resolvers,
    ...AuthorType.resolvers
  },
  Mutation: {
    ...BookType.mutations,
    ...AuthorType.mutations,
    ...UserType.mutations
  },
  Book: {
    ...BookType.Book
  },
  Author: {
    ...AuthorType.Author
  }
}

const server = new ApolloServer({
  typeDefs: [SchemaDefinition, ...typeDefs],
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req)
    return me
  }
})

mongoose.connect("mongodb://admin:abc123@ds119523.mlab.com:19523/gql")
mongoose.connection.once("open", () => {
  console.log("conneted to database")
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)

const getMe = async req => {
  const token = req.headers["token"]

  if (token) {
    try {
      return await jwt.verify(token, "d41d8cd98f00b204e9800998ecf8427e")
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.")
    }
  }
}
