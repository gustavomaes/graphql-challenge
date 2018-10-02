import { skip, combineResolvers } from "graphql-resolvers"
import { ForbiddenError } from "apollo-server"
import AuthorModel from "../Author/AuthorModel"
import BookModel from "./BookModel"

const isAuthenticated = (parent, args, { me }) => {
  me ? skip : new ForbiddenError("Not authenticated as user.")
}

export const books = combineResolvers(
  isAuthenticated,
  (root, args, context) => {
    return BookModel.find({})
      .limit(args.size)
      .skip(args.size * args.page)
  }
)
export const book = combineResolvers(isAuthenticated, (root, args, context) => {
  return BookModel.findById(args.id)
})

export const addBook = combineResolvers(
  isAuthenticated,
  (parent, { name, genre, authorId }) => {
    const book = new BookModel({
      name,
      genre,
      authorId
    })
    return book.save()
  }
)

export const authorId = book => {
  return AuthorModel.findById(book.authorId)
}
