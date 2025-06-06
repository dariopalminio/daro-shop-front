import "./profile-form.css";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import MyAddresses from "../../address/my-addresses";
import { Button, TextField, SelectOptions } from "oaky-ui-kit";

const validationFlagInit = {
  userName: true,
  firstName: true,
  lastName: true,
  email: true,
  docType: true,
  document: true,
  telephone: true,
  language: true,
  addresses: true,
};

interface IProps {
  currentCountry: string;
  initialized: boolean;
  profile: any;
  onChange: (profile: any) => void;
  onSubmit: () => void;
  style?: any;
}

/**
 * LoginForm
 * 
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
const ProfileForm: React.FC<IProps> = ( props: IProps ) => {
  const docTypeOptions = ["RUT", "DNI", "PASSPORT", "OTHER", "None"];
  const [validationFlag, setValidationFlag] = useState(validationFlagInit);
  const { t, i18n } = useTranslation();

  const expresionsRegular = {
    firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
    lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
    telephone: /^\d{7,14}$/ // 7 to 14 numbers.
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit();
  };

  const handleFirstNameChange = async (firstNameValue: string) => {
    props.onChange({
      ...props.profile,
      firstName: firstNameValue
    });

    if (expresionsRegular.firstName.test(firstNameValue)) {
      setValidationFlag({
        ...validationFlag,
        firstName: true
      });
    } else {
      setValidationFlag({
        ...validationFlag,
        firstName: false
      });
    }
  };

  const handleLastNameChange = async (lastNameValue: string) => {
    props.onChange({
      ...props.profile,
      lastName: lastNameValue
    });
    if (expresionsRegular.lastName.test(lastNameValue)) {
      setValidationFlag({
        ...validationFlag,
        lastName: true
      });
    } else {
      setValidationFlag({
        ...validationFlag,
        lastName: false
      });
    }
  };

  const handleDocTypeChange = async (docTypeValue: string) => {
    props.onChange({
      ...props.profile,
      docType: docTypeValue
    })
  };

  const handleDocumentChange = async (documentValue: string) => {
    props.onChange({
      ...props.profile,
      document: documentValue
    })
  };

  const handleTelephoneChange = async (telephoneValue: string) => {
    props.onChange({
      ...props.profile,
      telephone: telephoneValue
    })
  };

  const fieldsAreValid = () => {
    if (validationFlag.firstName && validationFlag.lastName) return true;
    return false;
  };

  const handleAddClose = (newAddresses: Array<any>): void => {
    props.onChange({
      ...props.profile,
      addresses: newAddresses
    })
  };

  return (
    <div style={props.style? props.style : {}}>
      <form
        id="RegisterForm"
        data-testid="RegisterForm"
        action="#"
        onSubmit={handleUpdateSubmit}
      >
        <div className="wrapper-user-profile">
          <div className="wrapper-user-data">

            <h1>
              {t('profile.title')}
            </h1>

              <TextField
                id="ProfileForm.profile.firstName"
                label={t('profile.label.firstname')}
                placeholder=""
                onChange={(e) => handleFirstNameChange(e.target.value)}
                value={props.profile.firstName}
                {...(!validationFlag.firstName && {
                  error: true,
                  helperText: t('register.info.helper.text.required')
                })}
              />
            
              <TextField
                id="ProfileForm.profile.firstName"
                label={t('profile.label.lastname')}
                placeholder=""
                onChange={(e) => handleLastNameChange(e.target.value)}
                value={props.profile.lastName}
                {...(!validationFlag.lastName && {
                  error: true,
                  helperText: t('register.info.helper.text.required'),
                })}
              />
      
              <TextField
                id="ProfileForm.profile.email"
                label={t('profile.label.email')}
                placeholder="you@email.com"
                onChange={(e) => { }}
                value={props.profile.email}
              />
        
              <SelectOptions 
                label={t('profile.docType')}
                list={docTypeOptions}
                selectedOption={props.profile.docType}
                setSelectedOption={(selectedOption) => handleDocTypeChange(selectedOption)} />

              <TextField
                id="ProfileForm.profile.document"
                label={t('profile.document')}
                onChange={(e) => handleDocumentChange(e.target.value)}
                value={props.profile.document}
              />
           
              <TextField
                id="ProfileForm.profile.telephone"
                label={t('profile.telephone')}
                onChange={(e) => handleTelephoneChange(e.target.value)}
                value={props.profile.telephone}

              />

          </div>

          <div className="wrapper-user-address">
            {props.initialized &&
              <MyAddresses country={props.currentCountry} addresses={props.profile.addresses}
                onChange={(newAddresses: Array<any>) => handleAddClose(newAddresses)} />

            }

          </div>

        </div>

        <div className="wrapper-user-action">
          {fieldsAreValid() &&
            <Button
              type="submit"
              style={{ marginTop: "5px" }}
            >
              {t('profile.command.submit')}
            </Button>
          }
          {!fieldsAreValid() &&
            <Button
              style={{ marginTop: "5px" }}
              disabled
            >
              {t('profile.command.submit')}
            </Button>
          }
        </div>

      </form>
    </div>
  );
};

export default ProfileForm;
