import React from "react"
import { StyleSheet } from "react-native"
import ActionButton from "react-native-action-button"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../../styles/base"

const FloatButton = ({ navigate, newBook }) => {
  return (
    <ActionButton buttonColor={colors.primary}>
      <ActionButton.Item
        buttonColor={colors.accentColor}
        title="Add Author"
        onPress={() => navigate("AddAuthor")}
      >
        <Icon name="ios-person" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor={colors.accentColor}
        title="Add Book"
        onPress={() => navigate("AddBook", { newBook: newBook() })}
      >
        <Icon name="md-book" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  )
}

export default FloatButton

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
})
