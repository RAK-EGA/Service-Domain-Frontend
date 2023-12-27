import React, { FC, useRef, useState } from "react"
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

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [subcategoryList, setSubcategoryList] = useState<Array<{ label: string; value: string }>>([]);
    const [description, setDescription] = useState<string>("");

    const categories = [
      { label: "Electricity", value: "ELECTRICITY" },
      { label: "Water", value: "WATER" },
      { label: "Sewage", value: "SEWAGE" },
      { label: "Garbage", value: "GARBAGE" },
    ]

    const ElectricitySubcategories = [
      { label: "Power outage", value: "POWER_OUTAGES" },
      { label: "Street light malfunction", value: "STREETLIGHT_MALFUNCTION" },
      { label: "Damaged power llines", value: "DAMAGED_POWER_LINES" },
      { label: "Elictrical hazards", value: "ELECTRICAL_HAZARDS" },
      { label: "Voltage fluctuations", value: "VOLTAGE_FLUCTUATIONS" },
    ]

    const WaterSubCategories = [
      { label: "Leaks", value: "LEAKS" },
      { label: "Low water pressure", value: "LOW_WATER_PRESSURE" },
      { label: "Water contamination", value: "WATER_CONTAMINATION" },
      { label: "Broken pipes", value: "BROKEN_PIPES" },
      { label: "Water quality issues", value: "WATER_QUALITY_ISSUES" },
    ]

    const SewageSubCategories = [
      { label: "Sewer blockage", value: "SEWER_BLOCKAGE" },
      { label: "Foul odors", value: "FOUL_ODORS" },
      { label: "Sanitary sewer overflows", value: "SANITARY_SEWER_OVERFLOWS" },
      { label: "Sewer pipe damage", value: "SEWER_PIPE_DAMAGE" },
      { label: "Backup issues", value: "BACKUP_ISSUES" },
    ]

    const GarbageSubCategories = [
      { label: "Illegal dumping", value: "ILLEGAL_DUMPING" },
      { label: "Overflowing bins", value: "OVERFLOWING_BINS" },
      { label: "Missed collection", value: "MISSED_COLLECTION" },
      { label: "Littering", value: "LITTERING" },
      { label: "Broken waste containers", value: "BROKEN_WASTE_CONTAINERS" },
    ]

    const navigation = useNavigation()

    const postData = {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      description,
      location:"location"
    };

    const handleSubmitClick = () => {
      fetch("http://localhost:5000/api/complaint/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle the success response
          console.log("Success:", data);
    
          // Navigate to ThankyouScreen on success
          navigation.navigate("Thankyou" as never)
        })
        .catch((error) => {
          // Handle errors during the fetch
          console.error("Error during fetch:", error);
        });
    };

    const handleCategorySelect = (selectedItem: { label: string; value: string }) => {
      setSelectedCategory(selectedItem.value);
      // Set the corresponding subcategory list based on the selected category
      switch (selectedItem.value) {
        case "ELECTRICITY":
          setSubcategoryList(ElectricitySubcategories);
          break;
        case "WATER":
          setSubcategoryList(WaterSubCategories);
          break;
        case "SEWAGE":
          setSubcategoryList(SewageSubCategories);
          break;
        case "GARBAGE":
          setSubcategoryList(GarbageSubCategories);
          break;
        default:
          setSubcategoryList([]);
      }
      // Reset selected subcategory when a new category is selected
      setSelectedSubcategory(null);
    };

    const handleSubcategorySelect = (selectedItem: { label: string; value: string }) => {
      setSelectedSubcategory(selectedItem.value);
    };

    const handleDescriptionChange = (text: string) => {
      setDescription(text);
    };

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
          onSelect={handleCategorySelect}
        />

        <FormComment comment="" />

        <DropdownMenu
          items={subcategoryList}
          defaultValue="Select sub category"
          onSelect={handleSubcategorySelect}
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
          onChangeText={handleDescriptionChange}
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
          onPress={handleSubmitClick}
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
  width: "100%",
  backgroundColor: "#F5F5F5",
  marginTop: 20,
}

const $cardStyle: ViewStyle = {
  width: "100%",
  minHeight: 50,
  borderRadius: 10,
  backgroundColor: "#F5F5F5",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
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
  width: "100%",
  height: 50,
  justifyContent: "center",
  alignItems: "center",
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
  width: "100%",
  marginTop: 20,
}

const $attachedImages: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  height: 100,
  marginTop: 20,
}
