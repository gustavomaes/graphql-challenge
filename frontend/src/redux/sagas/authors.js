import { put } from "redux-saga/effects"
import * as api from "../../services/apollo"

import ActionCreators from "../actionCreators"

export const allAuthors = () =>
  function*() {
    try {
      const token = yield api.getToken()
      const data = yield api.allAuthors(token)
      yield put(ActionCreators.allAuthorsSuccess(data.data.authors))
    } catch (error) {
      yield put(
        ActionCreators.allAuthorsFailure("Erro ao realizar requisição!")
      )
    }
  }

export const addAuthor = () =>
  function*(action) {
    try {
      const token = yield api.getToken()
      const data = yield api.addAuthor(action.body.name, action.body.age, token)
      yield put(ActionCreators.addAuthorSuccess(data.data.books))
    } catch (error) {
      yield put(ActionCreators.addAuthorFailure("Erro ao realizar requisição!"))
    }
  }
