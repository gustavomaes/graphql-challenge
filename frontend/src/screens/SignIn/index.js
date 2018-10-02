import React, { Component } from "react"
import { StackActions, NavigationActions } from "react-navigation"

import { Image, View, Text, AsyncStorage } from "react-native"

import styles from "./style"
import SigninForm from "../../components/SigninForm"
import CustomBar from "../../components/CustomBar"

//Redux
import { connect } from "react-redux"
import ActionCreators from "../../redux/actionCreators"

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

  signIn = () => {
    this.props.signIn({
      email: this.state.email,
      password: this.state.password
    })
  }

  onChange = (input, value) => {
    let change = {}
    change[input] = value
    this.setState(change)
  }

  render() {
    const { email, password } = this.state
    const { user } = this.props
    const { navigate } = this.props.navigation

    if (user.token != "") {
      AsyncStorage.setItem("@root:token", user.token).then(() => {
        this.goHome()
      })
    }

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
          <SigninForm
            navigate={navigate}
            signIn={this.signIn}
            email={email}
            password={password}
            onChange={this.onChange}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch(ActionCreators.signInRequest(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
