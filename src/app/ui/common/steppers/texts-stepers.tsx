import React from "react";
import styled from "styled-components";

const StepsContainer = styled.div`
    display: flex;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2px;
    padding: 5px;
`;


//Custom props for attaching additional props to Styled-components
interface StepLinkProps {
    readonly isChecked?: boolean;
    readonly isCurrent?: boolean;
}

const StepLink = styled.a<StepLinkProps>`
    color: ${(props) => (props.isChecked ? "#70D58F" : "grey")};
    border-radius: 4px;
    text-decoration: ${(props) => (props.isCurrent ? "underline" : "none")};
    font-weight: ${(props) => (props.isCurrent ? "bold" : "normal")};
    &:hover {
        background: #DDF6FF;
      }
`;

interface CheckedProps {
    readonly isChecked?: boolean;
}

const StepLinkConnector = styled.label<CheckedProps>`
    color: ${(props) => (props.isChecked ? "#70D58F" : "grey")};
`;

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

interface Props {
    list: Array<any> | undefined;
    onClick: (index: number) => void;
}

/**
 * Bullets Stepper
 * Stateless components and controlled component
 */
const TextsStepper: React.FC<Props> = ({ list, onClick }) => {

    const isNotFirst = (index: number) => {
        return (list && ((list.length > 1) && (index > 0)));
    }

    return (
        <>
            <StepsContainer>
                {list && list.map((element: any, index: number) => {
                    return (
                        <div key={index}>
                            {isNotFirst(index) &&
                                <StepLinkConnector
                                    isChecked={(element?.checked)}>&nbsp;{">"}&nbsp;</StepLinkConnector>}

                            <StepLink
                                href="#"
                                isChecked={(element?.checked)}
                                isCurrent={(element?.current)}
                                onClick={() => onClick(index)}>
                                {element?.name}
                            </StepLink>
                        </div>
                    )
                }
                )}
            </StepsContainer>
        </>
    );
};

export default TextsStepper;