import React from "react";
import styled from "styled-components";
import { CenteringContainer } from "../elements/centering-container";

const OptionsLinksWrapper = styled.div`
    display: block;
    margin: 0px 0px 15px 0px;
    height: 3em;
    border: none;
    padding: 5px 5px 5px 5px;
`;

const OptionCategoryLink = styled.a`
    padding: 5px 5px 5px 5px;
`;

export const exampleOptionsList = [
    {
        "name": "Option 1",
    },
    {
        "name": "Option 2",
    },
    {
        "name": "Option 3",
    }
];

interface Props {
    list: Array<any>; //this must have a field called name
    currentIndex: number;
    onClick: (index: number) => void;
}

/**
 * Links Stepper or category selector
 * Stateless components and controlled component
 */
const LinksStepper: React.FC<Props> = ({ list, currentIndex, onClick }) => {

    const getLinkColor = (el: any) => {
        if (el.name === list[currentIndex]?.name) return 'red';
        return 'blue';
    }

    return (
        <>
            <OptionsLinksWrapper>
                <CenteringContainer>
                    {list.map((element: any, index: number) => {
                        return (
                            <>
                                <OptionCategoryLink href="#"
                                    style={{ color: getLinkColor(element) }}
                                    onClick={() => onClick(index)}>
                                    {element.name}
                                </OptionCategoryLink>
                            </>
                        )
                    }
                    )}
                </CenteringContainer>
            </OptionsLinksWrapper>
        </>
    );
};

export default LinksStepper;