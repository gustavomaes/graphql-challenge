import { takeLatest, all } from "redux-saga/effects"

import { Types } from "../actionCreators"

import { signIn, signUp } from "./user"
import { allBooks, oneBook, addBook } from "./books"
import { allAuthors, addAuthor } from "./authors"

export default function* rootSaga() {
  yield all([
    //User
    takeLatest(Types.SIGN_IN_REQUEST, signIn()),
    takeLatest(Types.SIGN_UP_REQUEST, signUp()),
    //Books
    takeLatest(Types.ALL_BOOKS_REQUEST, allBooks()),
    takeLatest(Types.ONE_BOOK_REQUEST, oneBook()),
    takeLatest(Types.ADD_BOOK_REQUEST, addBook()),
    //Authors
    takeLatest(Types.ALL_AUTHORS_REQUEST, allAuthors()),
    takeLatest(Types.ADD_AUTHOR_REQUEST, addAuthor())
  ])
}
