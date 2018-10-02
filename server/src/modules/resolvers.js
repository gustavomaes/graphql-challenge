import {
  AuthenticationError,
  UserInputError,
  ForbiddenError
} from "apollo-server"
import { skip, combineResolvers } from "graphql-resolvers"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "./models/user"
import Book from "./models/book"
import Author from "./models/author"

const secret = "d41d8cd98f00b204e9800998ecf8427e"

const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user.")

const createToken = async user => {
  const { id, email, name } = user
  return await jwt.sign({ id, email, name }, secret)
}

const validatePassword = async (password, comparePassword) => {
  return await bcrypt.compare(password, comparePassword)
}

export default {
  Query: {
    books: combineResolvers(isAuthenticated, (root, args, context) => {
      return Book.find({})
        .limit(args.size)
        .skip(args.size * args.page)
    }),
    book: combineResolvers(isAuthenticated, (root, args, context) => {
      return Book.findById(args.id)
    }),
    authors: combineResolvers(isAuthenticated, (root, args, context) => {
      return Author.find({})
    }),
    author: combineResolvers(isAuthenticated, (root, args, context) => {
      return Author.findById(args.id)
    })
  },

  Mutation: {
    signIn: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw new UserInputError("No user found with this login credentials.")
      }

      const isValid = await validatePassword(password, user.password)

      if (!isValid) {
        throw new AuthenticationError("Invalid password.")
      }

      return { token: createToken(user) }
    },
    signUp: async (parent, { name, email, password }) => {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({
        name,
        email,
        password: passwordHash
      })

      user.save()

      return { token: createToken(user) }
    },
    addAuthor: combineResolvers(isAuthenticated, (parent, { name, age }) => {
      const author = new Author({
        name,
        age
      })
      return author.save()
    }),
    addBook: combineResolvers(
      isAuthenticated,
      (parent, { name, genre, authorId }) => {
        const book = new Book({
          name,
          genre,
          authorId
        })
        return book.save()
      }
    )
  },

  Book: {
    authorId: (book, args) => {
      return Author.findById(book.authorId)
    }
  },

  Author: {
    books: (author, args) => {
      return Book.find({ authorId: author.id })
    }
  }
}
