
import React from "react";
import { useTranslation } from 'react-i18next';
import { RiHome4Line, RiShieldUserFill, RiUserLine } from "react-icons/ri";
import styled from "styled-components";

const PaymentMethodsContainer = styled.div`
    flex-direction: row-wrap;
    align-items: center;
     justify-content: space-between;
`;

const MethodType = styled.div`
    width: 200px;
    position: relative;
    display: inline-block;
    background: #f2f4f7;
    border: 2px solid #e8ebed;
    padding: 25px;
    box-sizing: border-box;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    transition: all .5s ease;
    &:hover {
        border-color: #28333b;
    }
    .logo, p {
        color: #28333b;
    }
`;

const MethodTypeSelected = styled.div`
width: 200px;
position: relative;
display: inline-block;
background: rgba(64, 179, 255, .1);
border: 2px solid #40b3ff;
padding: 25px;
box-sizing: border-box;
border-radius: 6px;
cursor: pointer;
text-align: center;
transition: all .5s ease;
.logo {
    color: #40b3ff;
}
p{
    color: #28333b;
}
`;

/**
    &.selected
                        border-color #40b3ff
                        background rgba(64, 179, 255, .1)
                        .logo
                            color #40b3ff
                        p
                            color #28333b
                        	
                        &::after
                            content '\f00c'
                            font-family 'Font Awesome 5 Free'
                            font-weight 900
                            position absolute
                            height 40px
                            width 40px
                            top -21px
                            right -21px
                            background #fff
                            border 2px solid #40b3ff
                            border-radius 50%
                            display flex 
                            align-items center
                            justify-content center
 */
interface IProps {
}

/**
 * ShippingData
 * 
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
const PaymentMethods: React.FC<IProps> = (props: IProps) => {

    const { t, i18n } = useTranslation();


    return (
        <>
            <h4>Choose payment method below:</h4>

            <PaymentMethodsContainer>

                <MethodTypeSelected>
                    <div className="logo">
                        <i className="far fa-credit-card"></i>
                    </div>
                    <div className="text">
                        <p>Manual Payment</p>
                    </div>
                </MethodTypeSelected>

                <MethodType>
                    <div className="logo">
                        <i className="fab fa-paypal"></i>
                    </div>
                    <div className="text">
                        <p>Pay with Other</p>
                    </div>
                </MethodType>

                <MethodType>
                    <div className="logo">
                        <i className="fab fa-amazon"></i>
                    </div>
                    <div className="text">
                        <p>Pay with Other</p>
                    </div>
                </MethodType>
            </PaymentMethodsContainer>
        </>
    );
};

export default PaymentMethods;
