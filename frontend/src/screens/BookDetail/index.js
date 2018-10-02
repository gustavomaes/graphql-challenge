import React, { Component } from "react"
import { Text, View, ActivityIndicator } from "react-native"

import styles from "./style"
import header from "../../styles/header"

//GraphQl
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { colors } from "../../styles/base"

class BookDetail extends Component {
  static navigationOptions = {
    title: "Book Detail",
    headerStyle: header.headerStyle,
    headerTintColor: header.headerTintColor,
    headerTitleStyle: header.headerTitleStyle
  }

  state = {
    id: ""
  }

  componentDidMount() {
    id = this.props.navigation.getParam("id", {})
    this.setState({ id })
  }

  render() {
    return (
      <View style={styles.container}>
        <Query query={oneBook} variables={{ id: this.state.id }}>
          {({ data, loading }) => {
            const { book } = data
            if (loading) {
              return <ActivityIndicator size="large" color={colors.primary} />
            }
            console.log(book)
            return (
              <View>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.description}>{book.name}</Text>
                <Text style={styles.title}>Genre</Text>
                <Text style={styles.description}>{book.genre}</Text>
                <Text style={styles.title}>Author Name</Text>
                <Text style={styles.description}>{book.authorId.name}</Text>
                <Text style={styles.title}>Author Age</Text>
                <Text style={styles.description}>{book.authorId.age}</Text>
              </View>
            )
          }}
        </Query>
      </View>
    )
  }
}

export default BookDetail

const oneBook = gql`
  query oneBook($id: ID!) {
    book(id: $id) {
      name
      genre
      authorId {
        name
        age
      }
    }
  }
`
