import React, { Component } from "react"
import { View } from "react-native"

import styles from "./style"
import header from "../../styles/header"
import AuthorForm from "../../components/AuthorForm"

//Redux
import { connect } from "react-redux"
import ActionCreators from "../../redux/actionCreators"

class AddAuthor extends Component {
  static navigationOptions = {
    title: "Add Author",
    headerStyle: header.headerStyle,
    headerTintColor: header.headerTintColor,
    headerTitleStyle: header.headerTitleStyle
  }

  state = {
    name: "",
    age: ""
  }

  onChange = (input, value) => {
    let change = {}
    change[input] = value
    this.setState(change)
  }

  addAuthor = () => {
    this.props.addAuthor({
      name: this.state.name,
      age: this.state.age
    })
    this.props.navigation.goBack()
  }

  render() {
    const { name, age } = this.state

    return (
      <View style={styles.container}>
        <AuthorForm
          addAuthor={this.addAuthor}
          name={name}
          age={age}
          onChange={this.onChange}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAuthor: body => dispatch(ActionCreators.addAuthorRequest(body))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AddAuthor)
