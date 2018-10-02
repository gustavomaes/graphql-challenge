import { skip, combineResolvers } from "graphql-resolvers"
import { ForbiddenError } from "apollo-server"
import AuthorModel from "./AuthorModel"
import BookModel from "../Book/BookModel"

const isAuthenticated = (parent, args, { me }) => {
  // console.log(me)
  me ? skip : new ForbiddenError("Not authenticated as user.")
}

export const authors = combineResolvers(
  isAuthenticated,
  (root, args, context) => {
    return AuthorModel.find({})
  }
)

export const author = combineResolvers(
  isAuthenticated,
  (root, args, context) => {
    return AuthorModel.findById(args.id)
  }
)

export const addAuthor = combineResolvers(
  isAuthenticated,
  (parent, { name, age }) => {
    const author = new AuthorModel({
      name,
      age
    })
    return author.save()
  }
)

export const books = author => {
  return BookModel.find({ authorId: author.id })
}
