import React, { Component } from "react"
import { View, ActivityIndicator } from "react-native"

import styles from "./style"
import header from "../../styles/header"
import AuthorForm from "../../components/AuthorForm"

//GraphQl
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"
import { colors } from "../../styles/base"

class AddAuthor extends Component {
  static navigationOptions = {
    title: "Add Author",
    headerStyle: header.headerStyle,
    headerTintColor: header.headerTintColor,
    headerTitleStyle: header.headerTitleStyle
  }

  state = {
    name: "",
    age: 0
  }

  onChange = (input, value) => {
    let change = {}
    change[input] = value
    this.setState(change)
  }

  render() {
    const { name, age } = this.state

    return (
      <View style={styles.container}>
        <Mutation mutation={addAuthorQuery}>
          {(addauthor, { data, loading }) => {
            if (data) {
              this.props.navigation.goBack()
            }
            return (
              <View>
                <AuthorForm
                  addAuthor={() =>
                    addauthor({
                      variables: {
                        name: name,
                        age: parseInt(age)
                      }
                    })
                  }
                  name={name}
                  age={age}
                  onChange={this.onChange}
                />
                {loading && (
                  <ActivityIndicator size="large" color={colors.primary} />
                )}
              </View>
            )
          }}
        </Mutation>
      </View>
    )
  }
}

export default AddAuthor

const addAuthorQuery = gql`
  mutation($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      name
    }
  }
`
