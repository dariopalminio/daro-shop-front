import React from "react";
import { RiCheckFill } from "react-icons/ri";
import styled from "styled-components";
import { CenteringContainer } from "../elements/centering-container";

const StepsContainer = styled.div`
    display: flex;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2px;
    padding: 5px;
`;

const StepWrapper = styled.div`
    display: inline-block;
    width: 200px;
`;

//Custom props for attaching additional props to Styled-components
interface CheckedProps {
    readonly isChecked?: boolean;
}

const Step = styled.div<CheckedProps>`
    display: block;
    position: relative;
    margin: 0 auto;
    width: 24px;
    height: 24px;
    background: ${(props) => (props.isChecked ? "#70D58F" : "grey")};
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background: #BEF3CE;
      }
`;

const StepConnector = styled.div<CheckedProps>`
    background: ${(props) => (props.isChecked ? "#70D58F" : "grey")};
    margin-top: 12px;
    margin-left: -30px;
    margin-right: -30px;
    width: 100%;
    height: 2px;
`;

const StepLabel = styled.p<CheckedProps>`
    position: relative;
    display: inline-block;
    font-size: small;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    color: ${(props) => (props.isChecked ? "green" : "grey")};
    width: 100%;
`;


interface Props {
    list: Array<any> | undefined;
    onClick: (index: number) => void;
}

export const exampleStepList = [
    {
        "name": "Step 1",
        "checked": true
    },
    {
        "name": "Step 2",
        "checked": true
    },
    {
        "name": "Step 3",
        "checked": true
    },
    {
        "name": "Step 4",
        "checked": false
    },
    {
        "name": "Step 5",
        "checked": false
    }
];

/**
 * Bullets Stepper
 * Stateless components and controlled component
 */
const BulletsStepper: React.FC<Props> = ({ list, onClick }) => {

    const isNotFirst = (index: number) => {
        return (list && ((list.length > 1) && (index > 0)));
    }

    return (
        <>
            <StepsContainer>

                {list && list.map((element: any, index: number) => {
                    return (
                        <>
                            {isNotFirst(index) &&
                                <StepConnector isChecked={(element?.checked)}></StepConnector>}
                            <StepWrapper key={'StepWrapper' + index.toString()}
                                onClick={() => onClick(index)}>
                                <Step key={'Step' + index.toString()}
                                    isChecked={(element?.checked)}>
                                    {(element?.checked) &&
                                        <RiCheckFill style={{ marginTop: "3px" }} color="white" />}

                                </Step>
                                <StepLabel key={'StepLabel' + index.toString()}
                                isChecked={(element?.checked)}>{element?.name}</StepLabel>
                            </StepWrapper>
                        </>
                    )
                }
                )}

            </StepsContainer>
        </>
    );
};

export default BulletsStepper;