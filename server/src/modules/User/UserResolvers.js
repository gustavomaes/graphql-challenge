import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AuthenticationError, UserInputError } from "apollo-server"
import User from "./UserModel"

const secret = "d41d8cd98f00b204e9800998ecf8427e"

const createToken = async user => {
  const { id, email, name } = user
  return await jwt.sign({ id, email, name }, secret)
}

const validatePassword = async (password, comparePassword) => {
  return await bcrypt.compare(password, comparePassword)
}

export const signIn = async (parent, { email, password }) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new UserInputError("No user found with this login credentials.")
  }

  const isValid = await validatePassword(password, user.password)

  if (!isValid) {
    throw new AuthenticationError("Invalid password.")
  }

  return { token: createToken(user) }
}

export const signUp = async (parent, { name, email, password }) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    name,
    email,
    password: passwordHash
  })

  user.save()

  return { token: createToken(user) }
}
