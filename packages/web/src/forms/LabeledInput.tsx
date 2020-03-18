import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ErrorMessage } from 'src/forms/ErrorMessage'
import { colors, fonts, standardStyles, textStyles } from 'src/styles'
import { TextInput } from './FormComponents'

interface LabelProps {
  name: string
  multiline?: boolean
  allErrors: string[]
  value: string
  label: string
  onInput: (x?: unknown) => void
  isDarkMode?: boolean
}

export function LabeledInput({
  name,
  multiline,
  allErrors,
  value,
  onInput,
  label,
  isDarkMode,
}: LabelProps) {
  const hasError = allErrors.includes(name)

  return (
    <View style={styles.container}>
      <View style={styles.labelBox}>
        <Text accessibilityRole={'label'} style={[fonts.a, textStyles.medium, styles.label]}>
          {label}
        </Text>
      </View>
      <TextInput
        accessibilityLabel={label}
        multiline={multiline}
        numberOfLines={3}
        style={[
          standardStyles.input,
          fonts.p,
          styles.input,
          isDarkMode && standardStyles.inputDarkMode,
          hasError && styles.errorBorder,
        ]}
        focusStyle={isDarkMode ? standardStyles.inputDarkFocused : standardStyles.inputFocused}
        name={name}
        value={value}
        onChange={onInput}
      />
      <ErrorMessage allErrors={allErrors} field={name} />
    </View>
  )
}

export const styles = StyleSheet.create({
  errorBorder: {
    borderColor: colors.error,
  },
  container: {
    marginBottom: 10,
  },
  input: {
    marginVertical: 0,
  },
  label: {
    color: colors.secondary,
    lineHeight: 20,
  },
  labelBox: {
    marginBottom: 5,
  },
})
