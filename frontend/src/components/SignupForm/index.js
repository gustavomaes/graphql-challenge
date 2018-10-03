import React from "react"

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native"
import { colors } from "../../styles/base"

const SigninForm = ({ signUp, name, email, password, onChange }) => {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        onSubmitEditing={() => this.nameInput.focus()}
        returnKeyType="next"
        placeholder="Name"
        value={name}
        onChangeText={name => onChange("name", name)}
      />

      <TextInput
        style={styles.input}
        ref={input => (this.nameInput = input)}
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
        style={styles.buttonRegisterContainer}
        onPress={() => signUp()}
      >
        <Text style={styles.buttonText}>Register</Text>
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
  buttonRegisterContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 15
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "700"
  }
})
