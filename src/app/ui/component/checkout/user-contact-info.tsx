
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Button from "app/ui/common/button/button";
import TextField from "app/ui/common/text-field/text-field";
import { SelectOpts } from "app/ui/common/select-opts";
import MyAddresses from "../address/my-addresses";
import SelectAddress from "../address/select-address";

const validationFlagInit: any = {
  userName: true,
  firstName: false,
  lastName: false,
  email: false,
  docType: true,
  document: true,
  telephone: true,
  language: true,
  addresses: true,
};

interface Props {
  profile: any;
  onChange: (profile: any, isVaslid: boolean) => void;
  style?: any;
}

const expresionsRegular = {
  firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
  lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
  telephone: /^\d{7,14}$/, // 7 to 14 numbers.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

/**
 * UserContactInfoForm
 * 
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
const UserContactInfo: React.FC<Props> = ({ profile, onChange, style }) => {
  const docTypeOptions = ["RUT", "DNI", "PASSPORT", "OTHER", "None"];
  const [validationFlag, setValidationFlag] = useState(validationFlagInit);
  const { t, i18n } = useTranslation();

  useEffect(() => {

    const validation: any = {
      userName: true,
      firstName: expresionsRegular.firstName.test(profile.firstName),
      lastName: expresionsRegular.lastName.test(profile.lastName),
      email: expresionsRegular.email.test(profile.email),
      docType: true,
      document: true,
      telephone: true,
      language: true,
      addresses: true,
    };

    setValidationFlag(validation);
  }, []);

  const areFieldsValid = (): boolean => {
    return (validationFlag.email && validationFlag.firstName && validationFlag.lastName);
  }

  const handleFirstNameChange = async (firstNameValue: string) => {
    setValidationFlag({
      ...validationFlag,
      firstName: expresionsRegular.firstName.test(firstNameValue)
    });
    onChange({
      ...profile,
      firstName: firstNameValue
    }, areFieldsValid());
  };

  const handleLastNameChange = async (lastNameValue: string) => {
    setValidationFlag({
      ...validationFlag,
      lastName: expresionsRegular.lastName.test(lastNameValue)
    });
    onChange({
      ...profile,
      lastName: lastNameValue
    }, areFieldsValid());

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
    setValidationFlag({
      ...validationFlag,
      email: expresionsRegular.email.test(value)
    });
    onChange({
      ...profile,
      email: value
    }, areFieldsValid())
  };

  return (
    <div>
      <h1>
        {t('information.contact.title')}
      </h1>

      <TextField
        id="standard-basic-1"
        label={t('profile.label.firstname') + " *"}
        placeholder=""
        onChange={(e) => handleFirstNameChange(e.target.value)}
        value={profile.firstName}
        {...(!validationFlag.firstName && {
          error: true,
          helperText: t('register.info.helper.text.required')
        })}
      />

      <TextField
        id="standard-basic-2"
        label={t('profile.label.lastname') + " *"}
        placeholder=""
        onChange={(e) => handleLastNameChange(e.target.value)}
        value={profile.lastName}
        {...(!validationFlag.lastName && {
          error: true,
          helperText: t('register.info.helper.text.required'),
        })}
      />

      <TextField
        id="standard-basic-3"
        label={t('profile.label.email') + " *"}
        placeholder="you@email.com"
        onChange={(e) => handleEmailChange(e.target.value)}
        value={profile.email}
        {...(!validationFlag.email && {
          error: true,
          helperText: t('register.info.helper.text.required'),
        })}
      />

      <SelectOpts
        label={t('profile.docType')}
        list={docTypeOptions}
        selectedOption={profile.docType}
        setSelectedOption={(selectedOption) => handleDocTypeChange(selectedOption)}
        placeholder={t('selection.choose.option')} />

      <TextField
        id="standard-basic-5"
        label={t('profile.document')}
        onChange={(e) => handleDocumentChange(e.target.value)}
        value={profile.document}
      />

      <TextField
        id="standard-basic-5"
        label={t('profile.telephone')}
        onChange={(e) => handleTelephoneChange(e.target.value)}
        value={profile.telephone}
      />
    </div>
  );
};

export default UserContactInfo;
