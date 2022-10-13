import styled from "styled-components";
import Button from "./button";

//Styled-components
const ButtonsWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-left: 0px;
    padding: 10px;
    `;

interface Props {
    labelPrevious: string;
    labelNext: string;
    handlePrevious: () => void;
    handleNext: () => void;
}

/**
 * Previous and Next buttons
 * Stateless components and controlled component
 */
const PreviousNextButtons: React.FC<Props> = ({ labelPrevious, labelNext, handlePrevious, handleNext }) => {

    return (
        <ButtonsWrapper>

            <Button
                type="button"
                style={{ top: "0", right: "0" }}
                onClick={() => handlePrevious()}
            >
                &#8249; {labelPrevious}
            </Button>

            <Button
                type="button"
                style={{ top: "0", right: "0" }}
                onClick={() => handleNext()}
            >
                {labelNext} &#8250;
            </Button>

        </ButtonsWrapper>
    );
};

export default PreviousNextButtons;