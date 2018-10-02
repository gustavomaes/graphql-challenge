import * as UserResolvers from "./UserResolvers"

export const typeDefs = `
  type Token {
    token: String!
  }

  type User {
    id: ID!
    email: String!
  }
`

export const mutations = {
  signIn: (root, args, context) => UserResolvers.signIn(root, args, context),
  signUp: (root, args, context) => UserResolvers.signUp(root, args, context)
}
