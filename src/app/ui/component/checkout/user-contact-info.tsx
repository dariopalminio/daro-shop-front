
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { SelectOptions, TextField } from "oaky-ui-kit";

interface Props {
  profile: any;
  onChange: (profile: any, isVaslid: boolean) => void;
  style?: any;
  expresionsRegular?: any;
}

const expresionsRegularByDefault = {
  firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
  lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  docType: /\s*/g, //always true
  document: /\s*/g, //always true
  telephone: /^\d{7,14}$/ // 7 to 14 numbers.
};

/**
 * UserContactInfoForm
 * 
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
const UserContactInfo: React.FC<Props> = ({ profile, onChange, style }) => {
  const docTypeOptions = ["RUT", "DNI", "PASSPORT", "OTHER", "None"];
  const { t, i18n } = useTranslation();
  const [expresionsRegular] = useState(expresionsRegularByDefault);

  const areFieldsValid = (): boolean => {
    return (isValidFirstName() && isValidLastName() && isValidEmail());
  }

  const handleFirstNameChange = async (firstNameValue: string) => {
    onChange({
      ...profile,
      firstName: firstNameValue
    }, areFieldsValid());
  };

  const isValidFirstName = (): boolean => {
    return expresionsRegular.firstName.test(profile.firstName);
  };
  
  const handleLastNameChange = async (lastNameValue: string) => {
    onChange({
      ...profile,
      lastName: lastNameValue
    }, areFieldsValid());

  };

  const isValidLastName = (): boolean => {
    return expresionsRegular.lastName.test(profile.lastName);
  };

  const handleDocTypeChange = async (docTypeValue: string) => {
    onChange({
      ...profile,
      docType: docTypeValue
    }, areFieldsValid())
  };

  const handleDocumentChange = async (documentValue: string) => {
    onChange({
      ...profile,
      document: documentValue
    }, areFieldsValid())
  };

  const handleTelephoneChange = async (telephoneValue: string) => {
    onChange({
      ...profile,
      telephone: telephoneValue
    }, areFieldsValid())
  };

  const handleEmailChange = async (value: string) => {
    onChange({
      ...profile,
      email: value
    }, areFieldsValid())
  };

  const isValidEmail = (): boolean => {
    return expresionsRegular.email.test(profile.email);
  };

  return (
    <div>
      <h1>
        {t('information.contact.title')}
      </h1>

      <TextField
        id="UserContactInfo.profile.firstName"
        label={t('profile.label.firstname') + " *"}
        placeholder=""
        onChange={(e) => handleFirstNameChange(e.target.value)}
        value={profile.firstName}
        {...(!isValidFirstName() && {
          error: true,
          helperText: t('register.info.helper.text.required')
        })}
      />

      <TextField
        id="UserContactInfo.profile.lastName"
        label={t('profile.label.lastname') + " *"}
        placeholder=""
        onChange={(e) => handleLastNameChange(e.target.value)}
        value={profile.lastName}
        {...(!isValidLastName() && {
          error: true,
          helperText: t('register.info.helper.text.required'),
        })}
      />

      <TextField
        id="UserContactInfo.profile.email"
        label={t('profile.label.email') + " *"}
        placeholder="you@email.com"
        onChange={(e) => handleEmailChange(e.target.value)}
        value={profile.email}
        {...(!isValidEmail() && {
          error: true,
          helperText: t('register.info.helper.text.required'),
        })}
      />

      <SelectOptions
        label={t('profile.docType')}
        list={docTypeOptions}
        selectedOption={profile.docType}
        setSelectedOption={(selectedOption) => handleDocTypeChange(selectedOption)}
        placeholder={t('selection.choose.option')} />

      <TextField
        id="UserContactInfo.profile.document"
        label={t('profile.document')}
        onChange={(e) => handleDocumentChange(e.target.value)}
        value={profile.document}
      />

      <TextField
        id="UserContactInfo.profile.telephone"
        label={t('profile.telephone')}
        onChange={(e) => handleTelephoneChange(e.target.value)}
        value={profile.telephone}
      />

    </div>
  );
};

export default UserContactInfo;
