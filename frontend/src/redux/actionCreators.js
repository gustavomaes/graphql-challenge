import { createActions } from "reduxsauce"

export const { Types, Creators } = createActions({
  //User
  signInRequest: ["body"],
  signInSuccess: ["token"],
  signInFailure: ["error"],

  signUpRequest: ["body"],
  signUpSuccess: ["token"],
  signUpFailure: ["error"],

  //Books
  allBooksRequest: ["size", "page"],
  allBooksSuccess: ["books"],
  allBooksFailure: ["error"],

  oneBookRequest: ["id"],
  oneBookSuccess: ["book"],
  oneBookFailure: ["error"],

  addBookRequest: ["body"],
  addBookSuccess: ["book"],
  addBookFailure: ["error"],

  //Authors
  allAuthorsRequest: [null],
  allAuthorsSuccess: ["authors"],
  allAuthorsFailure: ["error"],

  addAuthorRequest: ["body"],
  addAuthorSuccess: ["author"],
  addAuthorFailure: ["error"]
})

export default Creators
