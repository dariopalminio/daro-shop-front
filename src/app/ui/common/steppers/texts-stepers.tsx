import React from "react";
import styled from "styled-components";

const StepsContainer = styled.div`
    display: flex;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2px;
    padding: 5px;
`;


//Custom props for attaching additional props to Styled-components
interface CheckedProps {
    readonly isChecked?: boolean;
}

const StepLink = styled.a<CheckedProps>`
    color: ${(props) => (props.isChecked ? "#70D58F" : "grey")};
    text-decoration:none;
    border-radius: 4px;
    font-weight: normal;
    &:hover {
        background: #DDF6FF;
        font-weight: bold;
      }
`;

const StepLinkConnector = styled.label<CheckedProps>`
    color: ${(props) => (props.isChecked ? "#70D58F" : "grey")};
`;



interface Props {
    list: Array<any>;
    onClick: (index: number) => void;
}

export const exampleStepLinkList = [
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
const TextsStepper: React.FC<Props> = ({ list, onClick }) => {

    const isNotFirst = (index: number) => {
        return ((list.length > 1) && (index > 0));
    }

    return (
        <>
            <StepsContainer>
                {list.map((element: any, index: number) => {
                    return (
                        <>
                            {isNotFirst(index) && <StepLinkConnector isChecked={(element?.checked)}>&nbsp;{">"}&nbsp;</StepLinkConnector>}

                            <StepLink href="#" isChecked={(element?.checked)} onClick={()=>onClick(index)}>
                                {element?.name}
                            </StepLink>
                        </>
                    )
                }
                )}
            </StepsContainer>
        </>
    );
};

export default TextsStepper;