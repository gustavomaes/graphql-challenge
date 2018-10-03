import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import gql from "graphql-tag"
import { AsyncStorage } from "react-native"

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
})

export const getToken = async () => {
  const token = await AsyncStorage.getItem("@root:token")
  return token
}

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  headers: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjE2MTE5MTRiOGJhMmQ3NDljMGNkNyIsImVtYWlsIjoiZ3VzdGF2b0BnbWFpbC5jb20iLCJuYW1lIjoiR3VzdGF2byIsImlhdCI6MTUzODUwMDA5NX0.It4_yObOlajxkiNu4P7tlTAVLN3SAFhjZWRbMpbYMSA"
  }
})

export const addAuthor = (name, age, token) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation {
        addAuthor(name: "${name}", age: ${age}) {
          name
        }
      }
    `,
    context: {
      headers: {
        token: token
      }
    }
  })
}
