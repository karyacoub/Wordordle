import React from "react";
import { Letter } from "./Letter";
import { LETTER_COUNT } from "../models/Constants";
import { GuessUtils } from "../utils/guessUtils";

export const LetterBoard: React.FunctionComponent = () => {

    React.useEffect(() => {
        console.log("useEffect");
    }, [GuessUtils.getCurrentGuess()])

    function renderLetterRow() {
        return Array(LETTER_COUNT).fill(0).map((_, idx) => <Letter />);
    }

    function renderLetterBoard() {
        return Array(LETTER_COUNT + 1).fill(0).map(() => {
            return <div className="letter-board__row">
                {renderLetterRow()}
            </div>;
        });
    }

    return <div id="letter-board__container">
        <div id="letter-board__board">
            {renderLetterBoard()}
        </div>
    </div>;
}