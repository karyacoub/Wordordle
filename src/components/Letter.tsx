import React from "react";

interface ILetterProps {
    char?: string;
}

export const Letter: React.FunctionComponent<ILetterProps> = (props) => {
    function getCurrentLetter() {
        return props.char ? props.char : " ";
    }

    return <div className="letter-container">
        {getCurrentLetter()}
    </div>;
}