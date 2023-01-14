import React from "react";
import { LetterStatus } from "../models/Enums";
import { LetterObj } from "../models/Guess";

interface ILetterProps {
    letterObj?: LetterObj;
}

export const Letter: React.FunctionComponent<ILetterProps> = (props) => {

    function getCurrentLetter() {
        return props.letterObj ? props.letterObj.char.toUpperCase() : " ";
    }

    function getLetterStatus() {
        return props.letterObj
            ? props.letterObj.status
            : LetterStatus.NONE;
    }

    return <div className={`letter-container ${getLetterStatus()}`}>
        {getCurrentLetter()}
    </div>;
}