import { StyleSheet } from "react-native"
import { colors } from "../../styles/base"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: colors.white
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  description: {
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 10
  }
})

export default styles
