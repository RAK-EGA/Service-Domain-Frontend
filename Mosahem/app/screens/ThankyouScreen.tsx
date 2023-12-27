import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import {Image, TextStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

const thankyou = require("../../assets/images/formsubmitted.png")

interface ThankyouScreenProps extends AppStackScreenProps<"Thankyou"> {}

export const ThankyouScreen: FC<ThankyouScreenProps> = observer(function ThankyouScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen
        preset="scroll"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
      <Image source={thankyou}  />
      <Text preset="heading" text="Form submitted successfully" style={$title}/>
      <Text text="Work is currently under progress" style={$subtitle} />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  flex: 1,
  backgroundColor: "white",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}

const $title: TextStyle = {
  textAlign: "center",
  marginTop: 100,
  marginBottom: 10,
  color: "#907A55",
  fontWeight: "bold",
}

const $subtitle: TextStyle = {
  marginTop: 10,
  marginBottom: 10,
  color: "#C9D4E7",
  fontWeight: "bold",
}