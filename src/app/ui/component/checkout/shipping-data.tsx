
import React from "react";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

const ShippingDataContainer = styled.div`
    diplay: block;
    border: 1px solid #d7d7d7;
    border-radius: 5px;
    margin: 5px 5px 20px 5px;
    padding: 10px;
    text-align: left;
`;

const ItemWrapper = styled.div`
    diplay: flex;
    text-align: left;
`;

const Label = styled.label`
    display: inline-block;
    text-align: left;
    width: 20%;
`;

const Text = styled.p`
    display: inline;
    text-align: left;
    margin-left: 10px;
    color: grey;
`;

interface IProps {
    contactTo: string;
    shippingTo: string;
}

/**
 * ShippingData
 * 
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
const ShippingData: React.FC<IProps> = (props: IProps) => {

    const { t, i18n } = useTranslation();


    return (
        <ShippingDataContainer>
            <ItemWrapper>
                <Label>{t('checkout.contact')}:</Label>
                <Text>{props.contactTo}</Text>
            </ItemWrapper>
            <ItemWrapper>
                <Label>{t('checkout.shipping.to')}:</Label>
                <Text>{props.shippingTo}</Text>
            </ItemWrapper>
        </ShippingDataContainer>
    );
};

export default ShippingData;
