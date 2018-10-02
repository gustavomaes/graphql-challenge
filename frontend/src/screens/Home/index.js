import React, { Component } from "react"
import {
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity
} from "react-native"

import styles from "./style"
import header from "../../styles/header"
import FloatButton from "../../components/FloatButton"
import CustomBar from "../../components/CustomBar"

//GraphQl
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { colors } from "../../styles/base"

class Home extends Component {
  static navigationOptions = {
    title: "Books",
    headerStyle: header.headerStyle,
    headerTintColor: header.headerTintColor,
    headerTitleStyle: header.headerTitleStyle
  }

  state = {
    data: [],
    searchData: [],
    size: 15,
    page: 0,
    term: "",
    newBook: null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.books.data) {
      this.setState({
        data: nextProps.books.data,
        searchData: nextProps.books.data
      })
    }
  }

  searchFilter = (data, text) => {
    const newData = data.filter(function(item) {
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })

    return newData
  }

  newBook = book => {
    console.log("book> ", book)
    this.setState({ newBook: book })
  }

  render() {
    const { navigate } = this.props.navigation
    const { size, page } = this.state
    return (
      <Query query={allBooks(size, page)}>
        {({ data, loading, fetchMore, updateQuery }) => {
          const { books } = data
          if (loading) {
            return <ActivityIndicator size="large" color={colors.primary} />
          }

          if (this.state.newBook) {
            this.setState({ newBook: null })
            updateQuery(prev => {
              const previousData = prev.books
              previousData.push(this.state.newBook)
              return Object.assign({}, prev, {
                books: previousData
              })
            })
          }

          books.reverse()
          return (
            <View style={styles.container}>
              <CustomBar />
              <TextInput
                style={styles.search}
                onChangeText={text => {
                  updateQuery(prev => {
                    const newData = this.searchFilter(prev.books, text)
                    this.setState({ term: text })

                    return Object.assign({}, prev, {
                      books: newData
                    })
                  })
                }}
                value={this.state.term}
                placeholder="Search Here"
              />

              <FlatList
                data={books}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    kye={index}
                    onPress={() =>
                      navigate("BookDetail", {
                        id: item.id
                      })
                    }
                  >
                    <Text style={styles.item}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                ListFooterComponent={() => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        fetchMore({
                          // note this is a different query than the one used in the
                          // Query component
                          query: allBooks(size + 1, page + 1),
                          updateQuery: (prev, { fetchMoreResult }) => {
                            const previousData = prev.books
                            const newData = fetchMoreResult.books
                            console.log("previousData> ", previousData)
                            console.log("newData> ", newData)
                            console.log("data> ", [...previousData, ...newData])

                            return Object.assign({}, prev, {
                              books: [...newData, ...previousData]
                            })
                          }
                        })
                      }}
                    >
                      <Text style={styles.load}>Load more</Text>
                    </TouchableOpacity>
                  )
                }}
              />

              <FloatButton navigate={navigate} newBook={() => this.newBook} />
            </View>
          )
        }}
      </Query>
    )
  }
}

export default Home

const allBooks = (size, page) => gql`
  {
    books(size:${size}, page:${page}) {
      name
      id
    }
  }
`
