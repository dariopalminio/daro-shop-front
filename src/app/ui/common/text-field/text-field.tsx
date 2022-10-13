import React from "react";
import styled from "styled-components";
//import "./text-field.css";

export const StylesTextField = styled.div`
    .input-text-field-group {
        color: #333;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 13px;
        line-height: 20px;
        margin: 0px;
        display: block;
    }
    
    .label-text-field {
        display: block;
        margin-bottom: 2px;
    }
    
    .input-text-field {
        width: 100%;
        border: 1px solid #999;
    }
    
    .input-text-field[type=text] {
        background: #fff;
        float: left;
        font-size: 13px;
        height: 33px;
        margin: 0;
        padding: 0;
    }
    
    .input-text-field[type=password] {
        background: rgb(245, 245, 245);
        float: left;
        font-size: 13px;
        height: 33px;
        margin: 0;
        padding: 0;
    }
    
    .error-message {
        color: #cc0033;
        display: inline-block;
        font-size: 12px;
        line-height: 15px;
        margin: 5px 0 0;
    }
    
    .input-text-field .error-message {
        display: none;
    }
    
    .error-text-field label {
        color: #cc0033;
    }
    
    .error-text-field input[type=text] {
        background-color: #fce4e4;
        border: 1px solid #cc0033;
        outline: none;
    }

    .error-text-field input[type=password] {
        background-color: #fce4e4;
        border: 1px solid #cc0033;
        outline: none;
    }
    
    .error-text-field .error-message {
        display: inline-block;
    }
`;

interface IMyProps {
    id: string;
    label: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    type?: "password" | "text" | undefined;
    error?: boolean;
    helperText?: string;
    multiline?: boolean;
    style?: any;
    readonly?: boolean;
}

/**
 * TextField "password" | "text"
 * Stateless components, extensible Style and controlled component
 */
const TextField: React.FC<IMyProps> = (props: IMyProps) => {

    const getType = () => {
        return  props.type ?  props.type : "text";
    }

    const getClassName = () => {
        return props.error ? "input-text-field-group error-text-field" : "input-text-field-group";
    }

    return (
        <StylesTextField>
            <div className={getClassName()}>
                <label className='label-text-field'>{ props.label}</label>

                {! props.multiline && (
                    <input className='input-text-field' id={ props.id} name={ props.id}
                        type={getType()}
                        placeholder={ props.placeholder ?  props.placeholder : ''}
                        defaultValue={ props.value}
                        onChange={(e) =>  props.onChange(e)}
                        style={ props.style ?  props.style : {}}
                        readOnly={ props.readonly} />)}
                { props.multiline && (
                    <textarea className='input-text-field' id={ props.id} name={ props.id}
                        style={ props.style ?  props.style : { width: "98%", height: "100px" }}
                        defaultValue={ props.value}
                        onChange={(e) =>  props.onChange(e)} />)}

                <div className="error-message">{ props.helperText}</div>
            </div>
        </StylesTextField>
    );
};

export default TextField;