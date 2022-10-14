import styled from "styled-components";

//Styled-components
const QtyContainer = styled.div`
    display: flex;
    border: 1px solid rgb(235, 235, 235);
    text-align: center;
    margin: 2%;
    justify-content: center;
    `;

const InputQtyPlus = styled.input`
    width: 30px;
    height: 30px;
    background-color: rgb(235, 235, 235);
    border: 0px;
    cursor: pointer;
    &:hover {
      background-color: rgb(140, 195, 231);
    }
  `;

const InputQtyMinus = styled.input`
    width: 30px;
    height: 30px;
    background-color: rgb(235, 235, 235);
    border: 0px;
    cursor: pointer;
    &:hover {
      background-color: rgb(140, 195, 231);
    }
  `;

const InputQty = styled.input`
    width: 40px;
    height: 30px;
    border: 0px;
    text-align: center;

  `;

interface Props {
  value: number;
  onChange: (newQuantityValue: number) => void;
}

/**
 * Customized button for quantity number selection
 * Stateless components and controlled component
 */
const ButtonQuantity: React.FC<Props> = ({ value, onChange }) => {

  const handlerQtyminus = () => {
    let newValue: number = value;
    if (value>0) newValue = (value - 1);
    onChange(newValue);
  };

  const handlerQtyplus = () => {
    const newValue = (value + 1);
    onChange(newValue);
  };

  return (
    <QtyContainer>
      <InputQtyMinus type='button' value='-' onClick={() => handlerQtyminus()} />
      <InputQty 
      type='text' 
      name='quantity' 
      value={value} onChange={()=>{}}/>
      <InputQtyPlus type='button' value='+' onClick={() => handlerQtyplus()} />
    </QtyContainer>
  );
};

export default ButtonQuantity;