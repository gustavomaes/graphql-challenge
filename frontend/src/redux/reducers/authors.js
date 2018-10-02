import { createReducer } from "reduxsauce"
import { Types } from "../actionCreators"

export const INITIAL_STATE = {
  isLoading: false,
  data: [],
  singleData: {},
  error: false,
  errorMessage: ""
}

//AUTHORS
export const allAuthorsRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    error: false,
    errorMessage: ""
  }
}

export const allAuthorsSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: false,
    data: action.authors
  }
}

export const allAuthorsFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: true,
    errorMessage: action.error
  }
}

//ADD AUTHOR
export const addAuthorRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    error: false,
    errorMessage: ""
  }
}

export const addAuthorSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: false
  }
}

export const addAuthorFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: true,
    errorMessage: action.error
  }
}

export const HANDLERS = {
  [Types.ALL_AUTHORS_REQUEST]: allAuthorsRequest,
  [Types.ALL_AUTHORS_SUCCESS]: allAuthorsSuccess,
  [Types.ALL_AUTHORS_FAILURE]: allAuthorsFailure,

  [Types.ADD_AUTHOR_REQUEST]: addAuthorRequest,
  [Types.ADD_AUTHOR_SUCCESS]: addAuthorSuccess,
  [Types.ADD_AUTHOR_FAILURE]: addAuthorFailure
}

export default createReducer(INITIAL_STATE, HANDLERS)
