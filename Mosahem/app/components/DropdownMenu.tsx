import React, { FC, useState } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle, Image, ImageStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
const arrowdown = require('../../assets/icons/down.png');
const category = require('../../assets/icons/category.png');
const arrowup = require('../../assets/icons/up.png');

interface DropdownMenuProps {
  style?: StyleProp<ViewStyle>;
  items: { label: string; value: string }[];
  defaultValue?: string;
  onSelect: (item: { label: string; value: string }) => void;
}

export const DropdownMenu: FC<DropdownMenuProps> = observer(function DropdownMenu(props: DropdownMenuProps) {
  const { style, items, defaultValue, onSelect } = props;
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ label: string; value: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown open/closed

  const toggleDropdown = () => {
    setVisible(!visible);
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown state
  };

  const handleSelect = (item: { label: string; value: string }) => {
    setSelectedItem(item);
    onSelect(item);
    toggleDropdown();
  };

  return (
    <View style={[$container, style]}>
      <TouchableOpacity style={$buttonContainer} onPress={toggleDropdown}>
        <Text style={$buttonText}>{selectedItem ? selectedItem.label : defaultValue || 'Select an option'}</Text>
        <Image source={isDropdownOpen ? arrowup : arrowdown} style={$IconStyle as StyleProp<ImageStyle>} />
      </TouchableOpacity>
      {visible && (
        <View style={$dropdown}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={$dropdownItem}
              onPress={() => handleSelect(item)}
            >
              <Image source={category} style={$IconStyle as StyleProp<ImageStyle>} />
              <Text style={$dropdownItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
});

const $container: ViewStyle = {
  margin: 10,
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: "#F5F5F5",
  width: '90%',
  zIndex: 1,
  borderRadius: 10,
  justifyContent: 'center',
  padding: 10,
  marginBottom: 20,
};

const $buttonContainer: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  paddingHorizontal: 15,
  backgroundColor: "#F5F5F5",
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  height: 35,
};

const $buttonText: TextStyle = {
  flex: 1,
  textAlign: 'center',
  color: "#757171",
  fontSize: 16,
};

const $dropdown: ViewStyle = {
  width: '100%',
  backgroundColor: "#F5F5F5",
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
};

const $dropdownItem: ViewStyle = {
  borderBottomWidth: 2,
  borderBottomColor: "#FFFFFF",
  paddingHorizontal: 15,
  paddingVertical: 10,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  flexDirection: 'row', // Add flexDirection to align icon and text horizontally
};

const $dropdownItemText: TextStyle = {
  color: '#8E9295', // Set the color for the text
  fontSize: 16, // Set the font size for the text
};

const $IconStyle: ViewStyle = {
  width: 35,
  height: 35,
  marginRight: 10,
};