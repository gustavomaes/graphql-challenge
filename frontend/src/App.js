import React from "react"
import { createStackNavigator } from "react-navigation"

//GraphQL
import { ApolloProvider } from "react-apollo"
import { apolloClient } from "./services/apollo"

//Screens
import SignIn from "./screens/SignIn"
import SignUp from "./screens/SignUp"
import Home from "./screens/Home"
import AddAuthor from "./screens/AddAuthor"
import AddBook from "./screens/AddBook"
import BookDetail from "./screens/BookDetail"

const RootStack = createStackNavigator(
  {
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
    Home: { screen: Home },
    AddAuthor: { screen: AddAuthor },
    AddBook: { screen: AddBook },
    BookDetail: { screen: BookDetail }
  },
  {
    initialRouteName: "SignIn"
  }
)

const App = () => (
  <ApolloProvider client={apolloClient}>
    <RootStack />
  </ApolloProvider>
)

export default App
