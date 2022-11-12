
import { FunctionComponent } from "react";
import { ContactType } from "domain/model/notification/contact.type";
import useContact from "domain/hook/contact.hook";
import { useTranslation } from 'react-i18next';
import ContactForm from "app/ui/component/contact/contact-form";
import { CircularProgress, Alert } from "daro-ui-kit";

/**
 * Contact Page
 * 
 * Pattern: Container Component, Conditional Rendering and Custom Hooks
 */
const ContactPage: FunctionComponent = () => {
  const { isProcessing, hasError, msg, isSuccess, sendContactEmail } =
  useContact(); // Custom Hooks
  const { t } = useTranslation();

  /**
   * send Submit
   */
  const handleSendSubmit = (contact: ContactType) => {
    sendContactEmail(contact);
  };

  return (
    <div className="page_container"  data-testid="page_container_home"> 
      <br />

      {(!isProcessing && !isSuccess) &&
        <ContactForm onSubmit={(contact: ContactType) => handleSendSubmit(contact)} 
          style={{width: "300px", margin: "34px auto auto auto"}}/>
      }

      {
        isProcessing && (
          <div className="box">
            <strong>
              {t('contact.info.sending.email')}
            </strong>
            <CircularProgress />
          </div>
        )
      }

      {hasError && <Alert severity="error">{t(msg)} </Alert>}

      {isSuccess && <Alert severity="success">{t('contact.success.sent.email')}</Alert>}

    </div >
  );
};

export default ContactPage;