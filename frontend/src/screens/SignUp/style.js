import { StyleSheet } from "react-native"
import { colors } from "../../styles/base"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logo: {
    position: "absolute",
    width: 100
  },
  text: {
    fontSize: 25,
    color: colors.primaryText,
    alignSelf: "center",
    marginTop: 20
  }
})

export default styles
