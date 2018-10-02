import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import gql from "graphql-tag"
import { AsyncStorage } from "react-native"

const httpLink = new HttpLink({
  uri: "https://95b7794a.ngrok.io/graphql"
})

export const getToken = async () => {
  const token = await AsyncStorage.getItem("@root:token")
  return token
}

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

//USER
export const signIn = (email, password) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation {
        signIn(email: "${email}", password: "${password}") {
          token
        }
      }
    `
  })
}

export const signUp = (name, email, password) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation {
        signUp(
          name: "${name}"
          email: "${email}"
          password: "${password}"
        ) {
          token
        }
      }
    `
  })
}

//BOOKS
export const allBooks = async (size, page, token) => {
  return apolloClient.query({
    query: gql`
      {
        books(size:${size}, page:${page}) {
          name
          id
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

export const oneBook = async (id, token) => {
  return apolloClient.query({
    query: gql`
      {
        book(id: "${id}") {
          name
          genre
          authorId {
            name
            age
          }
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

export const addBook = (name, genre, authorId, token) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation {
        addBook(
          name: "${name}"
          genre: "${genre}"
          authorId: "${authorId}"
        ) {
          name
          id
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

//Authors
export const allAuthors = async token => {
  return apolloClient.query({
    query: gql`
      {
        authors {
          name
          id
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
