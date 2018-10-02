import { createReducer } from "reduxsauce"
import { Types } from "../actionCreators"

export const INITIAL_STATE = {
  isLoading: false,
  token: "",
  error: false,
  errorMessage: ""
}

//SIGNIN
export const signInRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    error: false,
    errorMessage: ""
  }
}

export const signInSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: false,
    token: action.token
  }
}

export const signInFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: true,
    errorMessage: action.error,
    token: ""
  }
}

//SIGNUP
export const signUpRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    error: false,
    errorMessage: ""
  }
}

export const signUpSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: false,
    token: action.token
  }
}

export const signUpFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: true,
    errorMessage: action.error,
    token: ""
  }
}

export const HANDLERS = {
  [Types.SIGN_IN_REQUEST]: signInRequest,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILURE]: signInFailure,

  [Types.SIGN_UP_REQUEST]: signUpRequest,
  [Types.SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.SIGN_UP_FAILURE]: signUpFailure
}

export default createReducer(INITIAL_STATE, HANDLERS)
