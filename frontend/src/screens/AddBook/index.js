import React, { Component } from "react"
import { View, Text } from "react-native"

import styles from "./style"
import header from "../../styles/header"
import BookForm from "../../components/BookForm"

//Redux
import { connect } from "react-redux"
import ActionCreators from "../../redux/actionCreators"

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

  componentDidMount() {
    this.props.allAuthors()
  }

  onChange = (input, value) => {
    let change = {}
    change[input] = value
    this.setState(change)
  }

  addBook = () => {
    this.props.addBook({
      name: this.state.name,
      genre: this.state.genre,
      authorId: this.state.author
    })
    this.props.navigation.goBack()
  }

  render() {
    const { name, genre, author } = this.state

    return (
      <View style={styles.container}>
        {this.props.authors.data && (
          <BookForm
            name={name}
            genre={genre}
            author={author}
            authorList={this.props.authors.data}
            onChange={this.onChange}
            addBook={this.addBook}
          />
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    authors: state.authors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    allAuthors: () => dispatch(ActionCreators.allAuthorsRequest()),
    addBook: body => dispatch(ActionCreators.addBookRequest(body))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBook)
