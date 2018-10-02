import { StyleSheet } from "react-native"
import { colors } from "../../styles/base"

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

export default styles
