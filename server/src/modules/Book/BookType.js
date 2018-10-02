import * as BookResolvers from "./BookResolvers"

export const typeDefs = `
    type Book {
        id: ID!
        name: String
        genre: String
        authorId: Author
    }
`

export const resolvers = {
  books: (root, args, context) => BookResolvers.books(root, args, context),
  book: (root, args, context) => BookResolvers.book(root, args, context)
  // authorId: (root, args, context) => BookResolvers.authorId(root, args, context)
}

export const mutations = {
  addBook: (root, args, context) => BookResolvers.addBook(root, args, context)
}

export const Book = {
  authorId: book => BookResolvers.authorId(book)
}

export const BookResolve = {}
