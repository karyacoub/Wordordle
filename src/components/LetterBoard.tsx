import React from "react";
import { Letter } from "./Letter";
import { LETTER_COUNT } from "../models/Constants";
import { useStore } from "../mobx/RootStore";
import { observer } from "mobx-react-lite";

export const LetterBoard: React.FunctionComponent = observer(() => {
    const {guesses} = useStore();

    function renderLetterRow(rowNum: number) {
        return Array(LETTER_COUNT).fill(0).map((_, idx) => 
            <Letter 
                key={`letter-${idx}`} 
                letterObj={guesses[rowNum]?.charAt(idx)}
            />
        );
    }

    function renderLetterBoard() {
        return Array(LETTER_COUNT + 1).fill(0).map((_, idx) => {
            return <div className="letter-board__row" key={`row-${idx}`}>
                {renderLetterRow(idx)}
            </div>;
        });
    }

    return <div id="letter-board__container">
        <div id="letter-board__board">
            {renderLetterBoard()}
        </div>
    </div>;
});