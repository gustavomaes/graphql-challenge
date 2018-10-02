import React, { Component } from "react"
import { Text, View } from "react-native"

import styles from "./style"
import header from "../../styles/header"
import FloatButton from "../../components/FloatButton"

//Redux
import { connect } from "react-redux"
import ActionCreators from "../../redux/actionCreators"

class BookDetail extends Component {
  static navigationOptions = {
    title: "Book Detail",
    headerStyle: header.headerStyle,
    headerTintColor: header.headerTintColor,
    headerTitleStyle: header.headerTitleStyle
  }

  componentDidMount() {
    id = this.props.navigation.getParam("id", {})

    this.props.oneBook(id)
  }

  render() {
    const { books } = this.props

    return (
      <View style={styles.container}>
        {!books.isLoading &&
          books.singleData.authorId && (
            <View>
              <Text style={styles.title}>Name</Text>
              <Text style={styles.description}>{books.singleData.name}</Text>
              <Text style={styles.title}>Genre</Text>
              <Text style={styles.description}>{books.singleData.genre}</Text>
              <Text style={styles.title}>Author Name</Text>
              {/* <Text style={styles.description}>{authorId.name}</Text> */}
              <Text style={styles.description}>
                {books.singleData.authorId.name}
              </Text>
              <Text style={styles.title}>Author Age</Text>
              <Text style={styles.description}>
                {books.singleData.authorId.age}
              </Text>
            </View>
          )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  }
}

const mapDispatchToProps = dispatch => {
  return {
    oneBook: id => dispatch(ActionCreators.oneBookRequest(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetail)
