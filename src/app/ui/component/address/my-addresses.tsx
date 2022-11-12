import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddressType } from "domain/model/user/address.type";
import NewAddressDialog from "app/ui/component/address/new-address-dialog";
import useAddress from "domain/hook/address.hook";
import { Button, useModalDialog, SelectList } from "daro-ui-kit";


interface IMyProps {
    country: string;
    addresses: Array<AddressType>,
    onChange: (newAddresses: Array<any>) => void //is used as: onChange={(newAddresses: Array<any>) => handleAddClose(newAddresses)}
}

/**
 * My Address component
 * 
 * Pattern: Presentation Component, Controled Component 
 */
const MyAddresses: React.FC<IMyProps> = (props: IMyProps) => {

    const { getInitialAddress } = useAddress(); //Custom hook
    const { addresses, onChange } = props;
    const { t } = useTranslation();
    const [myAddresses, setMyAddresses] = useState<Array<AddressType>>(addresses);
    const { isDialogOpen, toggle } = useModalDialog();
    const [newAddress, setNewAddress] = React.useState(getInitialAddress(props.country));

    useEffect(() => {
        //console.log("MyAddresses->useEffect->props?.addresses:", props?.addresses);
    }, []);
    
    const convertAddressOneLine = (address: any) => {
        return address?.street + " " + address?.department;
    };

    const getStrinArrayAddresses = () => {
        const stringArray: string[] = myAddresses.map((address: any, index: number) => convertAddressOneLine(address));
        return stringArray;
    }

    const handleClickOpen = () => {
        toggle();
    };

    const handleDeleteAddress = async (index: number) => {
        const arrayOfAddresses: Array<AddressType> = myAddresses;
        arrayOfAddresses.splice(index, 1); //delete element of index
        setMyAddresses(arrayOfAddresses);
        onChange(myAddresses); //set addresses array in parent
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

    return (
        <div>
            <h1>
                {t('my.addresses.title')}
            </h1>
            <div style={{textAlign: "left"}}>
                <SelectList
                    id="mySelectList"
                    label="Tus direcciones:"
                    list={getStrinArrayAddresses()}
                    onClickDelete={(item, index) => handleDeleteAddress(index)} />
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

export default MyAddresses;