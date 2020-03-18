import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { NewMember } from 'src/alliance/AllianceMember'
import FormContainer, { emailIsValid, hasField } from 'src/forms/Form'
import { CheckboxWithLabel, Form } from 'src/forms/FormComponents'
import { LabeledInput } from 'src/forms/LabeledInput'
import { NameSpaces, useTranslation } from 'src/i18n'
import Checkmark from 'src/icons/Checkmark'
import { useScreenSize } from 'src/layout/ScreenSize'
import Button, { BTN, SIZE } from 'src/shared/Button.3'
import { colors, standardStyles } from 'src/styles'

const BLANK_FORM: NewMember = {
  name: '',
  email: '',
  contribution: '',
  subscribe: false,
}

function validateWith(fields: NewMember) {
  return Object.keys(fields).filter((key) => {
    if (key === 'email') {
      return !emailIsValid(fields[key])
    } else if (key === 'subscribe' || key === 'contribution') {
      return false
    } else {
      return !hasField(fields[key])
    }
  })
}

export default function SignupForm() {
  const { t } = useTranslation(NameSpaces.alliance)
  const { isMobile, isDesktop } = useScreenSize()
  return (
    <FormContainer route="/api/alliance" blankForm={BLANK_FORM} validateWith={validateWith}>
      {({ formState, onInput, onCheck, onAltSubmit }) => (
        <Form>
          <View style={styles.container}>
            <View style={isDesktop && standardStyles.row}>
              <View style={styles.inputContainer}>
                <LabeledInput
                  isDarkMode={true}
                  label={t('form.name')}
                  onInput={onInput}
                  allErrors={formState.errors}
                  name="name"
                  value={formState.form.name}
                />
              </View>
              <View style={styles.inputContainer}>
                <LabeledInput
                  isDarkMode={true}
                  label={t('form.email')}
                  onInput={onInput}
                  allErrors={formState.errors}
                  name="email"
                  value={formState.form.email}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <LabeledInput
                isDarkMode={true}
                label={t('form.contribution')}
                onInput={onInput}
                allErrors={formState.errors}
                name="contribution"
                value={formState.form.contribution}
              />
            </View>
            <View style={styles.inputContainer}>
              <CheckboxWithLabel
                name={'subscribe'}
                checked={!!formState.form.subscribe}
                onPress={onCheck}
                label={t('form.subscribe')}
              />
            </View>
          </View>
          <View
            style={[standardStyles.centered, styles.buttonContainer, isMobile && styles.stretch]}
          >
            <Button
              text={t('form.btn')}
              onDarkBackground={true}
              onPress={onAltSubmit}
              kind={BTN.PRIMARY}
              style={styles.buttonText}
              iconRight={formState.isComplete && <Checkmark color={colors.white} size={18} />}
              size={isMobile ? SIZE.fullWidth : SIZE.big}
            />
          </View>
        </Form>
      )}
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonContainer: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  stretch: {
    alignItems: 'stretch',
  },
  buttonText: {
    fontSize: 20,
  },
  container: { margin: 20 },
})
