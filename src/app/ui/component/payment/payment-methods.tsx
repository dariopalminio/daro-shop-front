
import { CenteringContainer } from "app/ui/common/elements/centering-container";
import React from "react";
import { useTranslation } from 'react-i18next';
import { RiCheckFill } from "react-icons/ri";
import styled from "styled-components";
import manualBankTransferImg from "app/ui/image/payment/manual_bank_transfer.png";
import otherPaymentMethodImg from "app/ui/image/payment/other_payment_method.png";
import bitcoinMethodTypeImg from "app/ui/image/payment/aceptamos-bitcoin.png";
import { PaymentMethodType } from "app/ui/page/checkout/payment.page";


const PaymentMethodsContainer = styled.div`
    display: block;
    flex-direction: row-wrap;
    align-items: center;
    justify-content: space-between;
`;

interface ICheckedProps {
    readonly checked?: boolean;
}

const MethodType = styled.button<ICheckedProps>`
    width: 200px;
    height: 200px;
    margin: 5px;
    position: relative;
    display: inline-block;
    background: #f2f4f7;
    border: 2px solid ${(props) => (props.checked ? "#40b3ff" : "#e8ebed")};
    padding: 25px;
    box-sizing: border-box;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    transition: all .5s ease;
    &:hover {
        border-color: ${(props) => (props.checked ? "#40b3ff" : "#28333b")};
    }
    .logo, p {
        color: #28333b;
    }
`;

const SelectedCheck = styled.div<ICheckedProps>`
    position: absolute;
    width: 30px;
    height: 30px;
    top -15px;
    right 42%;
    background: #40b3ff;
    border-radius: 50%;
    display: ${(props) => (props.checked ? "flex" : "none")};
    align-items: center;
    padding-left: 3px;
`;

interface IProps {
    select: string;
    onChange: (value: string) => void;
}

/**
 * PaymentMethods
 */
const PaymentMethods: React.FC<IProps> = (props: IProps) => {
    const { t } = useTranslation()
    //const [select, setSelect] = useState("");

    const handleClick = (selectedName: string) => {
        props.onChange(selectedName); //setSelect
    }

    return (
        <>
            <p style={{marginLeft: "5px", color: "grey"}}>{t("checkout.payment.choose")}:</p>
            <CenteringContainer>
                <PaymentMethodsContainer>

                    <MethodType checked={props.select === PaymentMethodType.BANK_TRANSFER} onClick={() => handleClick(PaymentMethodType.BANK_TRANSFER)}>
                        <SelectedCheck checked={props.select === props.select}><RiCheckFill size={24} color="white" /></SelectedCheck>
                        <div>
                            <img src={String(manualBankTransferImg)} height="60" width="100"/>
                        </div>
                        <div>
                            <p>{t("checkout.payment.manual")}</p>
                        </div>
                    </MethodType>

                    <MethodType checked={props.select === "none"} onClick={() => handleClick(PaymentMethodType.BANK_TRANSFER)}>
                        <div className="logo">
                        <img src={String(bitcoinMethodTypeImg)} height="60" width="100"/>
                        </div>
                        <div className="text">
                            <p>Próximamente otros medios de pago ...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        </div>
                    </MethodType>

                    <MethodType checked={props.select === "none"} onClick={() => handleClick(PaymentMethodType.BANK_TRANSFER)}>
                        <div className="logo">
                        <img src={String(otherPaymentMethodImg)} height="60" width="100"/>
                        </div>
                        <div className="text">
                            <p>Próximamente otros medios de pago ...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        </div>
                    </MethodType>

                
                </PaymentMethodsContainer>
            </CenteringContainer>
        </>
    );
};

export default PaymentMethods;
