import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CenteringContainer } from "../elements/centering-container";

const OptionsLinksWrapper = styled.div`
    display: block;
    margin: 0px 0px 15px 0px;
    height: 3em;
    border: none;
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
    list: Array<any> | undefined; //this must have a field called name
    currentIndex: number;
    onClick: (index: number) => void;
}

/**
 * Links Stepper or category selector
 * Stateless components and controlled component
 */
const LinksStepper: React.FC<Props> = ({ list, currentIndex, onClick }) => {

    const getLinkColor = (el: any) => {
        if (list && (el.name === list[currentIndex]?.name)) return 'red';
        return 'blue';
    }

    return (
        <>
            <OptionsLinksWrapper>
                <CenteringContainer>
                    {list && list.map((element: any, index: number) => {
                        return (
                                <Link key={index.toString()}
                                    to="#"
                                    style={{ color: getLinkColor(element), padding: "5px" }}
                                    onClick={() => onClick(index)}>
                                    {element.name}
                                </Link>
                        )
                    }
                    )}
                </CenteringContainer>
            </OptionsLinksWrapper>
        </>
    );
};

export default LinksStepper;