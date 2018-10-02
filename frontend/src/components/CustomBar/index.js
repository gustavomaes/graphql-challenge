import React from "react"
import { StatusBar } from "react-native"
import { colors } from "../../styles/base"

const CustomBar = () => (
  <StatusBar barStyle="light-content" backgroundColor={colors.darkPrimary} />
)

export default CustomBar
