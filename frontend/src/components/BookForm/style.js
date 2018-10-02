import { StyleSheet, Platform } from "react-native"

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

export default styles
