import styled from "styled-components";

export const InfoContainer = styled.div`
    diplay: block;
    border: 1px solid #C6DDED;
    border-radius: 5px;
    margin: 5px 5px 20px 5px;
    padding: 10px;
    text-align: left;
`;

export const ItemInfoWrapper = styled.div`
    diplay: flex;
    text-align: left;
`;

export const LineDivider = styled.div`
    diplay: block;
    width: 100%;
    height: 2px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #C6DDED;
`;

export const LabelInfo = styled.label`
    display: inline-block;
    text-align: left;
    width: 30%;
`;

export const TextInfo = styled.p`
    display: inline;
    text-align: left;
    margin-left: 10px;
    color: grey;
`;