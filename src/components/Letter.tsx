import React from "react";
import { LetterStatus } from "../models/Enums";

interface ILetterProps {
    char?: string;
    letterStatus: LetterStatus;
}

export const Letter: React.FunctionComponent<ILetterProps> = (props) => {

    function getCurrentLetter() {
        return props.char ? props.char.toUpperCase() : " ";
    }

    return <div className={`letter-container ${props.letterStatus}`}>
        {getCurrentLetter()}
    </div>;
}