import React, { FC, useRef } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, TextStyle, ViewStyle, Image, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { colors } from "app/theme/colors"
import { DropdownMenu, FormComment, Card } from "../components" // Adjust the import path
import { spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"

const location = require("../../assets/icons/locationpicker.png")
const addImage = require("../../assets/icons/addimage.png")
const microphone = require("../../assets/icons/microphone.png")

interface TicketSubmessionScreenProps extends AppStackScreenProps<"TicketSubmession"> {}

export const TicketSubmessionScreen: FC<TicketSubmessionScreenProps> = observer(
  function TicketSubmessionScreen(_props) {
    const input = useRef<TextInput>(null)
    const categories = [
      { label: "Category 1", value: "category1" },
      { label: "Category 2", value: "category2" },
      { label: "Category 3", value: "category3" },
      { label: "Category 4", value: "category4" },
      { label: "Category 5", value: "category5" },
    ]

    const subcategories = [
      { label: "SubCategory 1", value: "sub category1" },
      { label: "SubCategory 2", value: "sub category2" },
      { label: "SubCategory 3", value: "sub category3" },
      { label: "SubCategory 4", value: "sub category4" },
      { label: "SubCategory 5", value: "sub category5" },
    ]

    const navigation = useNavigation()

    return (
      <Screen
        preset="scroll"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
        <Text preset="heading" text="Submit your ticket" style={$title1} />

        <DropdownMenu
          items={categories}
          defaultValue="Select category"
          onSelect={(selectedItem) => {
            console.log("Selected Item:", selectedItem.value)
          }}
        />

        <FormComment comment="" />

        <DropdownMenu
          items={subcategories}
          defaultValue="Select sub category"
          onSelect={(selectedItem) => {
            console.log("Selected Item:", selectedItem.value)
          }}
        />

        <FormComment comment="" />

        <Card
          preset="default"
          content="Select location"
          LeftComponent={<Image source={location} />}
          style={$cardStyle}
          contentStyle={$cardText}
          onPress={() => navigation.navigate("Map" as never)}
        />

        <FormComment comment="" />

        <TextInput
          ref={input}
          underlineColorAndroid={colors.transparent}
          textAlignVertical="top"
          placeholder={"Description of your ticket"}
          placeholderTextColor={"#757171"}
          editable={true}
          multiline={true}
          numberOfLines={5}
          style={$inputStyles}
        />
        <FormComment comment="" />
        <View style={$rowContainer}>
          <Button
            preset="filled"
            style={$buttonIconStyle}
            onPress={() => {
              console.log("Image added!")
            }}
            LeftAccessory={() => <Image source={addImage} />}
          />

          <Button
            preset="filled"
            style={$buttonIconStyle}
            onPress={() => {
              console.log("Recording started!")
            }}
            LeftAccessory={() => <Image source={microphone} />}
          />
        </View>

        <View style={$attachedImages}>
          <FormComment comment="" />
        </View>

        <Button
          text="Submit"
          onPress={() => {
            console.log("Form submitted!")
          }}
          style={$buttonStyle} // Add your button style here
          textStyle={$buttonTextStyle} // Add your button text style here
        />
      </Screen>
    )
  },
)
const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  flex: 1,
  backgroundColor: "white",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}

const $title1: TextStyle = {
  textAlign: "center",
  marginTop: 10,
  marginBottom: 10,
  color: "#907A55",
  fontWeight: "bold",
}

const $inputStyles: TextStyle = {
  justifyContent: "center",
  alignItems: "center",
  color: colors.text,
  fontSize: 16,
  height: 100,
  paddingHorizontal: 10,
  paddingVertical: 10,
  textAlignVertical: "center",
  textAlign: "left",
  borderRadius: 10,
  overflow: "hidden",
  width: "90%",
  backgroundColor: "#F5F5F5",
  marginLeft: 10,
  marginTop: 20,
}

const $cardStyle: ViewStyle = {
  width: "90%",
  minHeight: 50,
  borderRadius: 10,
  backgroundColor: "#F5F5F5",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  marginLeft: 10,
  marginTop: 20,
  borderWidth: 0,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  elevation: 0,
}

const $cardText: TextStyle = {
  color: "#757171",
  fontSize: 16,
  textAlign: "left",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 10,
  paddingVertical: 5,
  flex: 1,
}

const $buttonStyle: ViewStyle = {
  backgroundColor: "#907A55",
  borderRadius: 10,
  width: "90%",
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 10,
  marginTop: 20,
}

const $buttonTextStyle: TextStyle = {
  color: "#FFFFFF",
  fontSize: 16,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
}

const $buttonIconStyle: ViewStyle = {
  backgroundColor: "#F5F5F5",
  borderRadius: 10,
  width: 50,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
}

const $rowContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "90%",
  marginLeft: 10,
  marginTop: 20,
}

const $attachedImages: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "90%",
  height: 100,
  marginLeft: 10,
  marginTop: 20,
}
