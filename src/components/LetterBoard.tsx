import React from "react";
import { Letter } from "./Letter";
import { LETTER_COUNT } from "../models/Constants";
import { useStore } from "../mobx/RootStore";
import { observer } from "mobx-react-lite";
import { stopCoverage } from "v8";
import { LetterStatus } from "../models/Enums";

export const LetterBoard: React.FunctionComponent = observer(() => {
    const store = useStore();

    function getLetterStatus(rowNum: number, idx: number): LetterStatus {
        let letterStatus = LetterStatus.NONE;
        const guess = store.guesses[rowNum];

        if (guess && guess.isSubmitted) {
            if (guess.guess.charAt(idx) === store.todaysWord.charAt(idx)) {
                letterStatus = LetterStatus.CORRECT;
            } else if (store.todaysWord.includes(guess.guess.charAt(idx))) {
                letterStatus = LetterStatus.SEMICORRECT;
            } else {
                letterStatus = LetterStatus.INCORRECT;
            }
        }

        return letterStatus;
    }

    function renderLetterRow(rowNum: number) {
        return Array(LETTER_COUNT).fill(0).map((_, idx) => 
            <Letter 
                key={`letter-${idx}`} 
                char={store.guesses[rowNum]?.guess.charAt(idx)}
                letterStatus={getLetterStatus(rowNum, idx)}
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