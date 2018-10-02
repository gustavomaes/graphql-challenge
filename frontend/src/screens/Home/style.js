import { StyleSheet } from "react-native"
import { colors } from "../../styles/base"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  load: {
    color: colors.primary,
    fontSize: 20,
    padding: 3,
    alignSelf: "center"
  },
  search: {
    height: 40
  }
})

export default styles
