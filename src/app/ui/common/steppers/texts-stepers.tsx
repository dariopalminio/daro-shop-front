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
    readonly isCurrent?: boolean;
}

const StepLink = styled.div<StepLinkProps>`
    display: inline-block;
    cursor: pointer;
    color: grey;
    border-radius: 4px;
    text-decoration: ${(props) => (props.isCurrent ? "underline" : "none")};
    font-weight: ${(props) => (props.isCurrent ? "bold" : "normal")};
    &:hover {
        background: #DDF6FF;
      }
`;



const StepLinkConnector = styled.label`
    color: grey;
`;

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
                                <StepLinkConnector>&nbsp;{">"}&nbsp;</StepLinkConnector>}

                            <StepLink
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