import React, { Component } from "react"

import { Image, View, AsyncStorage } from "react-native"

import styles from "./style"
import header from "../../styles/header"
import SignupForm from "../../components/SignupForm"

//Redux
import { connect } from "react-redux"
import ActionCreators from "../../redux/actionCreators"

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

  signUp = () => {
    this.props.signUp({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    const { name, email, password } = this.state
    const { user } = this.props

    if (user.token != "") {
      AsyncStorage.setItem("@root:token", user.token).then(() => {
        this.goHome()
      })
    }

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
          <SignupForm
            signUp={this.signUp}
            name={name}
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
    signUp: user => dispatch(ActionCreators.signUpRequest(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
