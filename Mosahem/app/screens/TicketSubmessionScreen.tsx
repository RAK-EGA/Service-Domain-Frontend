import React, { FC, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, Image, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { colors } from "app/theme/colors"
import { DropdownMenu, Card } from "../components" // Adjust the import path
import { spacing } from "app/theme"
import * as DocumentPicker from 'expo-document-picker';
const location = require("../../assets/icons/locationpicker.png")
const addImage = require("../../assets/icons/addimage.png")
const microphone = require("../../assets/icons/microphone.png")

interface TicketScreenProps extends AppStackScreenProps<"TicketSubmession"> {}

export const TicketSubmessionScreen: FC<TicketScreenProps> = ({ navigation }) => {
  const input = useRef<TextInput>(null)

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [subcategoryList, setSubcategoryList] = useState<Array<{ label: string; value: string }>>([]);
  const [description, setDescription] = useState<string>("");
  const [documentName, setDocumentName] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
  const [URI, setURI] = useState<string | null>(null);
  

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

  // const navigation = useNavigation()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const postData = {
    category: selectedCategory,
    subcategory: selectedSubcategory,
    description,
    location:"location"
  };


  const getImagedata = async () => {
    console.log("Fetching image data...");
    try {
      const response = await fetch('http://15.185.96.195:3338/documents/document/generate-presigned-url', {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setDocumentName(data.documentName);
      setURI(data.url);
  
      // Now you can use documentName and URI as needed
      console.log('Document name:', documentName);
      console.log('URL:', URI);
  
      pickImage();
  
    } catch (error) {
      console.error('Error fetching image data:', error as Error);
    }
  };

  const pickImage = () => {
    console.log("Picking image...");
    pickFile();
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
  
    if (!result.canceled) {
      // Extract necessary information from the result
      const fileUri = result.assets[0]?.uri || '';
      const fileName = result.assets[0]?.name || '';
      const fileType = result.assets[0]?.mimeType || '';

      setSelectedImageName(fileName);
  
      // Log the extracted information
      console.log('File URI:', fileUri);
      console.log('File Name:', fileName);
      console.log('File Type:', fileType);
  
      try {
        // Convert the file to blob
  
        // Check if URI is not null before making the fetch request
        if (URI) {
          // Now you can use fetch or axios to send the blob to your server
          fetch(URI, {
            method: 'PUT',
            body: fileUri,
            headers: {
              'Content-Type': fileType,
            },
          })
            .then(response => {
              // Log the status code and headers
              console.log('Server Response (Status):', response.status);
              console.log('Server Response (Headers):', response.headers);
  
              // Check if the response status is 200 OK
              if (response.ok) {
                // No need to parse the response since there's no expected body
                console.log('Server Response: OK');
              } else {
                throw new Error(`Server returned status: ${response.status}`);
              }
            })
            .catch(error => {
              console.error('Error handling server response:', error);
            });
        } else {
          console.error('URI is null. Unable to make the fetch request.');
          // Handle the case where URI is null (e.g., show an error message)
        }
      } catch (error) {
        console.error('Error converting file to blob or uploading:', error);
      }
    }
  };
  
  
  
  
  

  const handleSubmitClick = () => {
    navigation.navigate("Thankyou" as never)
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
  console.log("beeeee5")
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

        <DropdownMenu
          items={subcategoryList}
          defaultValue="Select sub category"
          onSelect={handleSubcategorySelect}
        />

        <Card
          preset="default"
          content="Select location"
          LeftComponent={<Image source={location} />}
          style={$cardStyle}
          contentStyle={$cardText}
          onPress={() => navigation.navigate("Map" as never)}
        />

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
    
        <View style={$rowContainer}>
          <Button
            preset="filled"
            style={$buttonIconStyle}
            onPress= {getImagedata}
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
        <Text text={`${selectedImageName || ''}`} />
      </View>

        

        <Button
          text="Submit"
          onPress={handleSubmitClick}
          style={$buttonStyle} // Add your button style here
          textStyle={$buttonTextStyle} // Add your button text style here
        />
      </Screen>
    )

}

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  flex: 1,
  backgroundColor: "white",
}

const $title1: TextStyle = {
  textAlign: "center",
  marginTop: 10,
  marginBottom: 10,
  color: colors.primary,
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
  backgroundColor: "#F5F5F5",
  marginTop: 20,
}

const $cardStyle: ViewStyle = {
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
  shadowRadius: 12.81,
  elevation: 0,
}

const $cardText: TextStyle = {
  color: colors.secondary,
  fontSize: 16,
  textAlign: "left",
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 5,
  flex: 1,
}

const $buttonStyle: ViewStyle = {
  backgroundColor: colors.primary,
  borderRadius: 10,
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
  marginTop: 20,
}

const $attachedImages: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  height: 100,
  marginTop: 20,
}