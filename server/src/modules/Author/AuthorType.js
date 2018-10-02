import * as AuthorResolvers from "./AuthorResolvers"

export const typeDefs = `
  type Author {
    id: ID!
    name: String
    age: Int
    books: [Book]
  }
`

export const resolvers = {
  authors: (root, args, context) =>
    AuthorResolvers.authors(root, args, context),
  author: (root, args, context) => AuthorResolvers.author(root, args, context)
}

export const mutations = {
  addAuthor: (root, args, context) =>
    AuthorResolvers.addAuthor(root, args, context)
}

export const Author = {
  books: author => AuthorResolvers.books(author)
}
