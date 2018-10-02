import React, { Component } from "react"
import { View, ActivityIndicator } from "react-native"

import styles from "./style"
import header from "../../styles/header"
import BookForm from "../../components/BookForm"

//GraphQl
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"
import { colors } from "../../styles/base"

class AddBook extends Component {
  static navigationOptions = {
    title: "Add Book",
    headerStyle: header.headerStyle,
    headerTintColor: header.headerTintColor,
    headerTitleStyle: header.headerTitleStyle
  }

  state = {
    name: "",
    genre: "",
    author: ""
  }

  onChange = (input, value) => {
    let change = {}
    change[input] = value
    this.setState(change)
  }

  render() {
    const { name, genre, author } = this.state

    return (
      <View style={styles.container}>
        <Query query={allAuthors}>
          {({ data, loading }) => {
            const { authors } = data
            if (loading) {
              return <ActivityIndicator size="large" color={colors.primary} />
            }

            return (
              <Mutation mutation={addBookQuery}>
                {(addbook, { data, loading }) => {
                  if (data) {
                    console.log(("data.book> ", data.addBook))
                    this.props.navigation.state.params.newBook(data.addBook)
                    this.props.navigation.goBack()
                  }

                  return (
                    <View>
                      <BookForm
                        name={name}
                        genre={genre}
                        author={author}
                        authorList={authors}
                        onChange={this.onChange}
                        addBook={() =>
                          addbook({
                            variables: {
                              name: this.state.name,
                              genre: this.state.genre,
                              authorId: this.state.author
                            }
                          })
                        }
                      />
                      {loading && (
                        <ActivityIndicator
                          size="large"
                          color={colors.primary}
                        />
                      )}
                    </View>
                  )
                }}
              </Mutation>
            )
          }}
        </Query>
      </View>
    )
  }
}

export default AddBook

const addBookQuery = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`

const allAuthors = gql`
  {
    authors {
      name
      id
    }
  }
`
