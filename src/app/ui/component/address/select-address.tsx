import React from "react";
import { useTranslation } from "react-i18next";
import { AddressType } from "domain/model/user/address.type";
import NewAddressDialog from "app/ui/component/address/new-address-dialog";
import useAddress from "domain/hook/address.hook";
import { Button, useModalDialog, RadioButtonList } from "daro-ui-kit";


interface IMyProps {
    country: string;
    title?: string;
    currentSelected: number;
    setCurrentSelected: (index: number) => void;
    addresses: Array<AddressType>;
    setAddresses: (newAddresses: Array<any>) => void;
}

/**
 * My Address component
 * 
 * Pattern: Presentation Component, Controled Component 
 */
const SelectAddress: React.FC<IMyProps> = (props: IMyProps) => {

    const { getInitialAddress } = useAddress(); //Custom hook
    const { t } = useTranslation();
    const { isDialogOpen, toggle } = useModalDialog();
    const [newAddress, setNewAddress] = React.useState(getInitialAddress(props.country));

    const convertAddressOneLine = (address: any) => {
        return address?.street + " " + address?.department + " " + address?.city;
    };

    const getStrinArrayAddresses = () => {
        const stringArray: string[] = props.addresses.map((address: any, index: number) => convertAddressOneLine(address));
        return stringArray;
    }

    const handleSelectAddress = async (item: string, index: number) => {
        props?.setCurrentSelected && props.setCurrentSelected(index);
    };

    const handleAddNewAddressAndClose = () => {
        const arrayOfAddresses: Array<AddressType> = props.addresses;
        arrayOfAddresses.push(newAddress);
        props.setAddresses(arrayOfAddresses);
        toggle();
        setNewAddress(getInitialAddress(props.country));
    };

    const handleNewAddressChange = (newAddress: any) => {
        setNewAddress(newAddress);
    };

    const handleCloseNewAddressDialog = () => {
        toggle();
        setNewAddress(getInitialAddress(props.country));
    };

    const getTitle = () => {
        return props.title ? props.title : t('my.addresses.title');
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toggle();
    }

    return (
        <div style={{ ...{ display: "block" } }}>
            {props.title && <h1>{getTitle()}</h1>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div style={{ textAlign: "left" }}>
                    <RadioButtonList
                        id="mySelectListAddress"
                        label={t("address.label.selection") + " *"}
                        currentSelected={props.currentSelected}
                        list={getStrinArrayAddresses()}
                        onClickSelect={(item: string, index: number) => handleSelectAddress(item, index)}
                    />
                </div>

                <div>
                    <Button type="submit" style={{ marginTop: "15px" }}>
                        {t('my.addresses.add')}
                    </Button>
                </div>

                <NewAddressDialog
                    address={newAddress}
                    isOpen={isDialogOpen}
                    onClose={handleCloseNewAddressDialog}
                    onChange={(newAddress: any) => handleNewAddressChange(newAddress)}
                    onAccept={() => handleAddNewAddressAndClose()}
                >
                </NewAddressDialog>
            </form>
        </div>
    );
};

export default SelectAddress;