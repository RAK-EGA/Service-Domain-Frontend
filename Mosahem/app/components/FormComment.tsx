import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"

export interface FormCommentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Comment text to be displayed.
   */
  comment?: string
}

/**
 * Describe your component here
 */
export const FormComment = observer(function FormComment(props: FormCommentProps) {
  const { style, comment } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      {comment && <Text style={$text}>{comment}</Text>}
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  marginLeft: 10,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
