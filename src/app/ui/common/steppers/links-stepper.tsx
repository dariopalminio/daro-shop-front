import React from "react";
import styled from "styled-components";
import { CenteringContainer } from "../elements/centering-container";

const CategoriesWrapper = styled.div`
    display: block;
    margin: 0px 0px 15px 0px;
    height: 3em;
    border: none;
    padding: 5px 5px 5px 5px;
`;

const CategoryLink = styled.a`
    padding: 5px 5px 5px 5px;
`;

interface Props {
    list: Array<any>;
    currentIndex: number;
    onClick: (index: number) => void;
}

/**
 * Links Stepper
 * Stateless components and controlled component
 */
const LinksStepper: React.FC<Props> = ({list, currentIndex, onClick }) => {

    const getLinkColor = (el: any) => {
        if (el.name===list[currentIndex]?.name) return 'red';
        return 'blue';
      }

    return (
        <>
        <CategoriesWrapper>
            <CenteringContainer>
            {list.map((element: any, index: number) => {
                    return (
                        <>
                           <CategoryLink href="#" style={{color: getLinkColor(element)}} onClick={()=>onClick(index)}>{element.name}</CategoryLink>
                        </>
                    )
                }
                )}
            </CenteringContainer>
        </CategoriesWrapper>
        </>
    );
};

export default LinksStepper;