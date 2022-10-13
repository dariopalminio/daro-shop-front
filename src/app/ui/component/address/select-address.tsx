import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddressType } from "domain/model/user/address.type";
import Button from "app/ui/common/button/button";
import useModalDialog from "app/ui/common/dialog/use-modal-dialog";
import SelectList from "app/ui/common/select-list/select-list";
import NewAddressDialog from "app/ui/component/address/new-address-dialog";
import useAddress from "domain/hook/address.hook";
import RadioButtonList from "app/ui/common/select-list-radio-button/radio-button-list";
import { CenteringContainer } from "app/ui/common/elements/centering-container";
import TextField from "app/ui/common/text-field/text-field";


interface IMyProps {
    country: string;
    title?: string;
    currentSelected?: number;
    addresses: Array<AddressType>;
    onChange: (newAddresses: Array<any>) => void;
    onClickSelect?: (item: string, index: number) => void;
}

/**
 * My Address component
 * 
 * Pattern: Presentation Component, Controled Component 
 */
const SelectAddress: React.FC<IMyProps> = (props: IMyProps) => {

    const { getInitialAddress } = useAddress();
    const { addresses, onChange } = props;
    const { t } = useTranslation();
    const [myAddresses, setMyAddresses] = useState<Array<AddressType>>(addresses);
    const { isDialogOpen, toggle } = useModalDialog();
    const [newAddress, setNewAddress] = React.useState(getInitialAddress(props.country));
 
    const convertAddressOneLine = (address: any) => {
        return address?.street + " " + address?.department + " " + address?.city;
    };

    const getStrinArrayAddresses = () => {
        const stringArray: string[] = myAddresses.map((address: any, index: number) => convertAddressOneLine(address));
        return stringArray;
    }

    const handleClickOpen = () => {
        toggle();
    };


    const handleSelectAddress = async (item: string, index: number) => {
        props?.onClickSelect && props.onClickSelect(item, index);
    };

    const handleAddNewAddressAndClose = () => {
        const arrayOfAddresses: Array<AddressType> = myAddresses;
        arrayOfAddresses.push(newAddress);
        setMyAddresses(arrayOfAddresses);
        toggle();
        onChange(myAddresses); //set addresses array in parent
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

    return (
        <div style={{ ...{ display: "block" } }}>
            <h1>
                {getTitle()}
            </h1>

            <div style={{ textAlign: "left" }}>
                <RadioButtonList
                    id="mySelectListAddress"
                    label={t("address.label.selection")+" *"}
                    currentSelected={props.currentSelected}
                    list={getStrinArrayAddresses()}
                    onClickSelect={(item: string, index: number) => handleSelectAddress(item, index)}
                />
            </div>

            <div>
                <Button type="button" onClick={handleClickOpen}
                    style={{ marginTop: "15px" }}
                >
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

        </div>
    );
};

export default SelectAddress;