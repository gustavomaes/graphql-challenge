import express from "express"
import { ApolloServer, AuthenticationError } from "apollo-server-express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

import schema from "./src/modules/schema"
import resolvers from "./src/modules/resolvers"

mongoose.connect("mongodb://admin:abc123@ds119523.mlab.com:19523/gql")
mongoose.connection.once("open", () => {
  console.log("conneted to database")
})

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req)

    return { me }
  }
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
