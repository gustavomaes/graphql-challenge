import { combineReducers } from "redux"

import user from "./user.js"
import books from "./books"
import authors from "./authors"

const rootReducer = combineReducers({ user, books, authors })

export default rootReducer
