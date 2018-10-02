import { put } from "redux-saga/effects"
import * as api from "../../services/apollo"

import ActionCreators from "../actionCreators"

export const allBooks = () =>
  function*(action) {
    try {
      const token = yield api.getToken()
      const data = yield api.allBooks(action.size, action.page, token)
      yield put(ActionCreators.allBooksSuccess(data.data.books))
    } catch (error) {
      yield put(ActionCreators.allBooksFailure("Erro ao realizar requisição!"))
    }
  }

export const oneBook = () =>
  function*(action) {
    try {
      const token = yield api.getToken()
      const data = yield api.oneBook(action.id, token)
      yield put(ActionCreators.oneBookSuccess(data.data.book))
    } catch (error) {
      yield put(ActionCreators.oneBookFailure("Erro ao realizar requisição!"))
    }
  }

export const addBook = () =>
  function*(action) {
    try {
      const token = yield api.getToken()
      const data = yield api.addBook(
        action.body.name,
        action.body.genre,
        action.body.authorId,
        token
      )
      yield put(ActionCreators.addBookSuccess(data.data.addBook))
    } catch (error) {
      yield put(ActionCreators.addBookFailure("Erro ao realizar requisição!"))
    }
  }
