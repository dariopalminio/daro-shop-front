import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AddressType } from "domain/model/user/address.type";
import { Button, ModalDialog, CenteringContainer, TextField } from "oaky-ui-kit";

interface IMyProps {
    address: AddressType;
    isOpen: boolean;
    onClose: () => void;
    onChange: (newAddress: any) => void;
    onAccept: () => void;
    children: React.ReactNode;
}

/**
 * NewAddressDialog
 * 
 * Pattern: Presentation Component, Controled Component 
 */
const NewAddressDialogGeneral: React.FC<IMyProps> = (props: IMyProps) => {

    const { t } = useTranslation();
    const [streetValid, setStreetValid] = useState(false);
    const [departmentValid, setDepartmentValid] = useState(false);
    const expresions = {
        street: /^[0-9a-zA-Z\s]*$/, // String Contains Only Letters, Spaces, numbers and is not Empty 
        department: /^[0-9a-zA-Z\s]*$/, // String Contains Only Letters, Spaces, numbers and is not Empty 
    };

    const handleStreetChange = async (value: string) => {
        props.onChange({
            ...props.address,
            street: value
        });

        if (value &&
            (value.trim().length > 0) && expresions.street.test(value)) {
            setStreetValid(true);
        } else {
            setStreetValid(false);
        }
    };

    const handleDepartmentChange = async (value: string) => {
        props.onChange({
            ...props.address,
            department: value
        });
        if (value &&
            value.trim().length > 0 && expresions.department.test(value)) {
            setDepartmentValid(true);
        } else {
            setDepartmentValid(false);
        }
    };

    const handleNeighborhoodChange = async (value: string) => {
        props.onChange({
            ...props.address,
            neighborhood: value
        })
    };

    const handleCityChange = async (value: string) => {
        props.onChange({
            ...props.address,
            city: value
        })
    };

    const handleStateChange = async (value: string) => {
        props.onChange({
            ...props.address,
            state: value
        })
    };

    const handleCountryChange = async (value: string) => {
        props.onChange({
            ...props.address,
            country: value
        })
    };

    const ifFieldsAreInvalid = (): boolean => {
        return streetValid && departmentValid;
    };

    const handleAddClose = () => {
        props.onAccept();
    };

    return (

        <ModalDialog
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <TextField
                id="country"
                label={t('my.addresses.country')}
                value={props.address.country}
                onChange={(e) => handleCountryChange(e.target.value)}

            />
            <TextField
                id="state"
                label={t('my.addresses.state')}
                value={props.address.state}
                onChange={(e) => handleStateChange(e.target.value)}

            />
            <TextField
                id="city"
                label={t('my.addresses.city')}
                value={props.address.city}
                onChange={(e) => handleCityChange(e.target.value)}

            />
            <TextField
                id="neighborhood"
                label={t('my.addresses.neighborhood')}
                value={props.address.neighborhood}
                onChange={(e) => handleNeighborhoodChange(e.target.value)}

            />
            <TextField
                id="street"
                label={t('my.addresses.street')}
                value={props.address.street}
                onChange={(e) => handleStreetChange(e.target.value)}
                {...(!streetValid && {
                    error: true,
                    helperText: t('register.info.helper.text.required')
                })}
            />
            <TextField
                id="department"
                label={t('my.addresses.department')}
                value={props.address.department}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                {...(!departmentValid && {
                    error: true,
                    helperText: t('register.info.helper.text.required')
                })}
            />
            <br />
            <CenteringContainer>

                {ifFieldsAreInvalid() &&
                    <Button
                        type="button" 
                        style={{ marginTop: "15px" }}
                        onClick={handleAddClose}>
                        {t('button.command.add')}
                    </Button>
                }

                {!ifFieldsAreInvalid() &&
                    <Button
                        type="button" 
                        style={{ marginTop: "15px" }}
                        disabled>
                        {t('button.command.add')}
                    </Button>
                }
            </CenteringContainer>
        </ModalDialog>

    );
};

export default NewAddressDialogGeneral;