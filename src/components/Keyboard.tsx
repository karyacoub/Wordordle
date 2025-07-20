import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../mobx/RootStore";

enum KeyType {
    LETTER,
    BACKSPACE,
    ENTER,
}

export const Keyboard: React.FunctionComponent = observer(() => {

    const store = useStore();

    function onClick(e: any, keyType: KeyType) {
        if (!store.keyboardEnabled) {
            return;
        }
        
        if (keyType === KeyType.BACKSPACE) {
            store.backspace();
        } else if (keyType === KeyType.ENTER) {
            store.enter();
        } else {
            store.addToCurrentGuess(e.target.innerHTML);
        }
    }

    function getDisabledClass() {
        return store.keyboardEnabled ? "" : "disabled";
    }

    function renderKey(char: string, keyType: KeyType) {
        return <div className={`keyboard__key ${getDisabledClass()}`} onClick={(e: any) => onClick(e, keyType)}>{char}</div>;
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
})