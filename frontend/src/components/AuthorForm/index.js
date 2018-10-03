import React from "react"

import { StyleSheet, View, TextInput, Button } from "react-native"

import { colors } from "../../styles/base"

const AuthorForm = ({ addAuthor, name, age, onChange }) => {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        onSubmitEditing={() => this.ageInput.focus()}
        returnKeyType="next"
        placeholder="Name"
        value={name}
        onChangeText={name => onChange("name", name)}
      />

      <TextInput
        style={styles.input}
        ref={input => (this.ageInput = input)}
        onSubmitEditing={() => this.passwordInput.focus()}
        keyboardType="number-pad"
        returnKeyType="next"
        placeholder="Age"
        value={age}
        onChangeText={age => onChange("age", age)}
      />

      <View style={styles.constainerButton}>
        <Button
          style={styles.buttonRegister}
          title="Add Author"
          color={colors.primary}
          onPress={() => addAuthor()}
        />
      </View>
    </View>
  )
}

export default AuthorForm

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    marginBottom: 10,
    padding: 10
  },
  constainerButton: {
    alignSelf: "center",
    width: "80%",
    margin: 10
  }
})
