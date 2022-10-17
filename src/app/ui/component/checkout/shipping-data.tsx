
import { InfoContainer, ItemInfoWrapper, LabelInfo, LineDivider, TextInfo } from "app/ui/common/elements/info-elements";
import React from "react";
import { useTranslation } from 'react-i18next';
import { RiHome4Line, RiUserLine } from "react-icons/ri";
import styled from "styled-components";

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
        <InfoContainer>
            <ItemInfoWrapper>
                <RiUserLine color="grey" style={{marginRight: "3px"}}/>
                <LabelInfo>{t('checkout.contact')}:</LabelInfo>
                <TextInfo>{props.contactTo}</TextInfo>
            </ItemInfoWrapper>
            <ItemInfoWrapper>
            <LineDivider/>
            </ItemInfoWrapper>
            <ItemInfoWrapper>
                <RiHome4Line color="grey" style={{marginRight: "3px"}}/>
                <LabelInfo>{t('checkout.shipping.to')}:</LabelInfo>
                <TextInfo>{props.shippingTo}</TextInfo>
            </ItemInfoWrapper>
        </InfoContainer>
    );
};

export default ShippingData;
