import { put } from "redux-saga/effects"
import * as api from "../../services/apollo"

import ActionCreators from "../actionCreators"

export const signIn = () =>
  function*(action) {
    try {
      const token = yield api.signIn(action.body.email, action.body.password)
      yield put(ActionCreators.signInSuccess(token.data.signIn.token))
    } catch (error) {
      yield put(ActionCreators.signInFailure("Erro ao realizar requisição!"))
    }
  }

export const signUp = () =>
  function*(action) {
    try {
      const token = yield api.signUp(
        action.body.name,
        action.body.email,
        action.body.password
      )
      yield put(ActionCreators.signUpSuccess(token.data.signUp.token))
    } catch (error) {
      yield put(ActionCreators.signUpFailure("Erro ao realizar requisição!"))
    }
  }
