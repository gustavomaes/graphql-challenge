import React, { Component } from "react"

import { View, Text, TextInput, TouchableOpacity } from "react-native"

import styles from "./style"

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
