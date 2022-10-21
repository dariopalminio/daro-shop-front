
import { InfoContainer, ItemInfoWrapper, LabelInfo, LineDivider, TextInfo } from "app/ui/common/elements/info-elements";
import React from "react";
import { useTranslation } from 'react-i18next';
import { RiHome4Line, RiUserLine } from "react-icons/ri";
import styled from "styled-components";

interface IProps {
    list: Array<any>;
}

/**
 * PaymentManualInfo
 * 
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
const PaymentManualInfo: React.FC<IProps> = (props: IProps) => {

    return (
        <InfoContainer>
            {props.list.map((item: any, index: number) => {
                return (
                    <ItemInfoWrapper key={index}>
                        <LabelInfo>{item.label}:</LabelInfo>
                        <TextInfo>{item.value}</TextInfo>
                        {(index < props.list.length - 1) && <LineDivider />}
                    </ItemInfoWrapper>
                )
            }
            )}
        </InfoContainer>

    );
};

export default PaymentManualInfo;