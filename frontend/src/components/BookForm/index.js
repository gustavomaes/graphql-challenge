import React from "react"

import {
  Platform,
  StyleSheet,
  View,
  Picker,
  TextInput,
  Button
} from "react-native"

import { colors } from "../../styles/base"

const BookForm = ({ name, genre, author, authorList, onChange, addBook }) => {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        onSubmitEditing={() => this.genreInput.focus()}
        returnKeyType="next"
        placeholder="Name"
        value={name}
        onChangeText={name => onChange("name", name)}
      />

      <TextInput
        style={styles.input}
        ref={input => (this.genreInput = input)}
        onSubmitEditing={() => this.authorInput.focus()}
        returnKeyType="next"
        placeholder="Genre"
        value={genre}
        onChangeText={genre => onChange("genre", genre)}
      />

      <Picker
        style={styles.input}
        selectedValue={author}
        onValueChange={author => onChange("author", author)}
        // value={author}
        // onChangeText={author => onChange("author", author)}
      >
        <Picker.Item label="Choose an Author" value="" />
        {authorList.map(authorItem => {
          return <Picker.Item label={authorItem.name} value={authorItem.id} />
        })}
      </Picker>
      <View style={styles.constainerButton}>
        <Button
          style={styles.buttonRegister}
          title="Add Book"
          color={colors.primary}
          onPress={() => addBook()}
        />
      </View>
    </View>
  )
}

export default BookForm

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
    margin: 10,
    marginTop: Platform.OS === "ios" ? 150 : 100
  }
})
