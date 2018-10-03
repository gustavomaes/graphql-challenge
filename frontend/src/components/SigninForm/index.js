import React from "react"

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native"
import { colors } from "../../styles/base"

const SigninForm = ({ signIn, navigate, email, password, onChange }) => {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        onSubmitEditing={() => this.passwordInput.focus()}
        keyboardType="email-address"
        returnKeyType="next"
        placeholder="E-mail"
        value={email}
        onChangeText={email => onChange("email", email)}
      />

      <TextInput
        style={styles.input}
        returnKeyType="go"
        ref={input => (this.passwordInput = input)}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={password => onChange("password", password)}
      />

      <TouchableOpacity
        style={styles.buttonSigninContainer}
        onPress={() => signIn()}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSignupContainer}
        onPress={() => navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SigninForm

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    marginBottom: 10,
    padding: 10
  },
  buttonSigninContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 15
  },
  buttonSignupContainer: {
    backgroundColor: colors.accentColor,
    paddingVertical: 15
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "700"
  }
})
