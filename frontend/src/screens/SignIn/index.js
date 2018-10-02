import React, { Component } from "react"
import { StackActions, NavigationActions } from "react-navigation"

import {
  Image,
  View,
  Text,
  ActivityIndicator,
  AsyncStorage
} from "react-native"

import styles from "./style"
import SigninForm from "../../components/SigninForm"
import CustomBar from "../../components/CustomBar"
import { colors } from "../../styles/base"

//GraphQl
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

class SignIn extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    email: "gustavo@gmail.com",
    password: "123456"
  }

  goHome = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  onChange = (input, value) => {
    let change = {}
    change[input] = value
    this.setState(change)
  }

  setToken = token => {
    AsyncStorage.setItem("@root:token", token).then(() => {
      this.goHome()
    })
  }

  render() {
    const { email, password } = this.state
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <CustomBar />
        <View style={styles.loginContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../../resources/logo.png")}
          />
        </View>

        <View style={styles.formContainer}>
          <Mutation mutation={signInQuery}>
            {(signin, { data, loading }) => {
              console.disableYellowBox = true
              if (data) {
                this.setToken(data.signIn.token)
              }
              return (
                <View>
                  {loading && (
                    <ActivityIndicator size="large" color={colors.primary} />
                  )}
                  <SigninForm
                    navigate={navigate}
                    signIn={() =>
                      signin({
                        variables: {
                          email: this.state.email,
                          password: this.state.password
                        }
                      })
                    }
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

export default SignIn

const signInQuery = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`
