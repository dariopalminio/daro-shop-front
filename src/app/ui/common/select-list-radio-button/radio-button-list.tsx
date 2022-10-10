import React from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import styled from "styled-components";
import "./radio-button-list.css";

const SelectListGroup = styled.div`
    color: #333;
    float: left;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 13px;
    line-height: 20px;
    width: 100%;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
`;

const RadioButtonsWrapper = styled.div`
    display: block;
    align-items: left;
    justify-content: left;
    margin-left: 0px;
    left: 0px;
`;

const LabelSelectList = styled.label`
    display: block;
    margin-bottom: 2px;
`;


interface Props {
    id: string;
    label?: string;
    onClickSelect?: (item: string, index: number) => void;
    style?: any;
    list: string[];
}

/**
 * Select List with Radio Buttons component is used for collecting one data user provided information from a list of options.
 * Stateless components, extensible Style and controlled component
 */
const RadioButtonList: React.FC<Props> = ({ id, label, list, onClickSelect, style }) => {


    const selectItem = (item: string, index: number) => {
        onClickSelect && onClickSelect(item, index);
    }

    return (
        <SelectListGroup>
            {label && <LabelSelectList>{label}</LabelSelectList>}
            <RadioButtonsWrapper>
                {list.map((item: string, index: number) => {
                    return (
                        <label key={index} className="radio_item_label">
                            <input key={'inputRadioButtons'+id+index.toString()}
                            className="input_radio_button" type="radio" id="html" name="radio" onClick={()=>selectItem(item,index)}/>
                            <span className="span_radio">{item}</span>
                        </label>
                    )
                }
                )}
            </RadioButtonsWrapper>
        </SelectListGroup>
    );
};

export default RadioButtonList;