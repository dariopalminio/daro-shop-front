
import React from "react";
import { useTranslation } from 'react-i18next';
import { RiHome4Line, RiShieldUserFill, RiUserLine } from "react-icons/ri";
import styled from "styled-components";

const ShippingDataContainer = styled.div`
    diplay: block;
    border: 1px solid #C6DDED;
    border-radius: 5px;
    margin: 5px 5px 20px 5px;
    padding: 10px;
    text-align: left;
`;

const ItemWrapper = styled.div`
    diplay: flex;
    text-align: left;
`;

const LineDivider = styled.div`
    diplay: block;
    width: 100%;
    height: 2px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #C6DDED;
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
                <RiUserLine color="grey" style={{marginRight: "3px"}}/>
                <Label>{t('checkout.contact')}:</Label>
                <Text>{props.contactTo}</Text>
            </ItemWrapper>
            <ItemWrapper>
            <LineDivider/>
            </ItemWrapper>
            <ItemWrapper>
                <RiHome4Line color="grey" style={{marginRight: "3px"}}/>
                <Label>{t('checkout.shipping.to')}:</Label>
                <Text>{props.shippingTo}</Text>
            </ItemWrapper>
        </ShippingDataContainer>
    );
};

export default ShippingData;
