import React, { Component } from "react"

import {
  Image,
  View,
  Text,
  ActivityIndicator,
  AsyncStorage
} from "react-native"

import { StackActions, NavigationActions } from "react-navigation"

import styles from "./style"
import header from "../../styles/header"
import { colors } from "../../styles/base"
import SignupForm from "../../components/SignupForm"

//GraphQl
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

class SignUp extends Component {
  static navigationOptions = {
    title: "Sign Up",
    headerStyle: header.headerStyle,
    headerTintColor: header.headerTintColor,
    headerTitleStyle: header.headerTitleStyle
  }

  state = {
    name: "",
    email: "",
    password: ""
  }

  onChange = (input, value) => {
    let change = {}
    change[input] = value
    this.setState(change)
  }

  goHome = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  setToken = token => {
    AsyncStorage.setItem("@root:token", token).then(() => {
      this.goHome()
    })
  }

  render() {
    const { name, email, password } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../../resources/logo.png")}
          />
        </View>

        <View style={styles.formContainer}>
          <Mutation mutation={signUpQuery}>
            {(signup, { data, loading }) => {
              if (data) {
                this.setToken(data.signUp.token)
              }
              return (
                <View>
                  {loading && (
                    <ActivityIndicator size="large" color={colors.primary} />
                  )}
                  <SignupForm
                    signUp={() =>
                      signup({
                        variables: {
                          name: this.state.name,
                          email: this.state.email,
                          password: this.state.password
                        }
                      })
                    }
                    name={name}
                    email={email}
                    password={password}
                    onChange={this.onChange}
                  />
                </View>
              )
            }}
          </Mutation>
        </View>
      </View>
    )
  }
}

export default SignUp

const signUpQuery = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      token
    }
  }
`
