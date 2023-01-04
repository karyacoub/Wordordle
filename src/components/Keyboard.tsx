import React from "react";
import { GuessUtils } from "../utils/guessUtils";

enum KeyType {
    LETTER,
    BACKSPACE,
    ENTER,
}

export const Keyboard: React.FunctionComponent = () => {

    function onClick(e: any, keyType: KeyType) {
        if (keyType === KeyType.BACKSPACE) {
            GuessUtils.popChar();
        } else if (keyType === KeyType.ENTER) {

        } else {
            GuessUtils.addCharToGuess(e.target.innerHTML);
        }
    }

    function renderKey(char: string, keyType: KeyType) {
        return <div className="keyboard__key" onClick={(e: any) => onClick(e, keyType)}>{char}</div>;
    }

    return <div id="keyboard__container">
        <div className="keyboard__row">
            {renderKey("Q", KeyType.LETTER)}
            {renderKey("W", KeyType.LETTER)}
            {renderKey("E", KeyType.LETTER)}
            {renderKey("R", KeyType.LETTER)}
            {renderKey("T", KeyType.LETTER)}
            {renderKey("Y", KeyType.LETTER)}
            {renderKey("U", KeyType.LETTER)}
            {renderKey("I", KeyType.LETTER)}
            {renderKey("O", KeyType.LETTER)}
            {renderKey("P", KeyType.LETTER)}
        </div>
        <div className="keyboard__row">
            {renderKey("A", KeyType.LETTER)}
            {renderKey("S", KeyType.LETTER)}
            {renderKey("D", KeyType.LETTER)}
            {renderKey("F", KeyType.LETTER)}
            {renderKey("G", KeyType.LETTER)}
            {renderKey("H", KeyType.LETTER)}
            {renderKey("J", KeyType.LETTER)}
            {renderKey("K", KeyType.LETTER)}
            {renderKey("L", KeyType.LETTER)}
        </div>
        <div className="keyboard__row">
            {renderKey("ENTER", KeyType.ENTER)}
            {renderKey("Z", KeyType.LETTER)}
            {renderKey("X", KeyType.LETTER)}
            {renderKey("C", KeyType.LETTER)}
            {renderKey("V", KeyType.LETTER)}
            {renderKey("B", KeyType.LETTER)}
            {renderKey("N", KeyType.LETTER)}
            {renderKey("M", KeyType.LETTER)}
            {renderKey("BKSPC", KeyType.BACKSPACE)}
        </div>
    </div>
}