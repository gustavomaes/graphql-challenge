import { createReducer } from "reduxsauce"
import { Types } from "../actionCreators"

export const INITIAL_STATE = {
  isLoading: false,
  data: [],
  singleData: {},
  error: false,
  errorMessage: ""
}

//BOOKS
export const allBooksRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    error: false,
    errorMessage: ""
  }
}

export const allBooksSuccess = (state = INITIAL_STATE, action) => {
  const newData = [...state.data, ...action.books]
  return {
    ...state,
    isLoading: false,
    error: false,
    data: newData
  }
}

export const allBooksFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: true,
    errorMessage: action.error,
    token: ""
  }
}

//ONE BOOK
export const oneBookRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    error: false,
    errorMessage: ""
  }
}

export const oneBookSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: false,
    singleData: action.book
  }
}

export const oneBookFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: true,
    errorMessage: action.error
  }
}

//ADD BOOK
export const addBookRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    error: false,
    errorMessage: ""
  }
}

export const addBookSuccess = (state = INITIAL_STATE, action) => {
  let newData = state.data
  newData.push(action.book)
  return {
    ...state,
    isLoading: false,
    data: newData,
    error: false
  }
}

export const addBookFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: true,
    errorMessage: action.error
  }
}

export const HANDLERS = {
  [Types.ALL_BOOKS_REQUEST]: allBooksRequest,
  [Types.ALL_BOOKS_SUCCESS]: allBooksSuccess,
  [Types.ALL_BOOKS_FAILURE]: allBooksFailure,

  [Types.ONE_BOOK_REQUEST]: oneBookRequest,
  [Types.ONE_BOOK_SUCCESS]: oneBookSuccess,
  [Types.ONE_BOOK_FAILURE]: oneBookFailure,

  [Types.ADD_BOOK_REQUEST]: addBookRequest,
  [Types.ADD_BOOK_SUCCESS]: addBookSuccess,
  [Types.ADD_BOOK_FAILURE]: addBookFailure
}

export default createReducer(INITIAL_STATE, HANDLERS)
