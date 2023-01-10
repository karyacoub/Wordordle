import { makeAutoObservable, configure } from "mobx";
import { Guess } from "../models/Guess";
import React from "react";
import { LetterCount } from "../models/LetterCount";

configure({
    enforceActions: "never",
})

class RootStore {

    maxGuessLength: number = LetterCount.FIVE;
    currentGuessNum: number = 0;
    guesses: Guess[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setMaxGuessLength(maxGuessLength: number) {
        this.maxGuessLength = maxGuessLength;
    }

    setCurrentGuessNum(currentGuessNum: number) {
        this.currentGuessNum = currentGuessNum;
    }

    backspace() {
        const newGuesses = [...this.guesses];

        if (newGuesses.length > 0) {
            newGuesses[newGuesses.length - 1].popCharFromGuess();
        }

        this.guesses = newGuesses;
    }

    addToCurrentGuess(char: string) {
        const newGuesses = [...this.guesses];

        if (newGuesses.length <= 0) {
            newGuesses.push(new Guess(char));
        } else if (newGuesses[newGuesses.length - 1].guess.length < this.maxGuessLength) {
            newGuesses[newGuesses.length - 1].addCharToGuess(char);
        }

        this.guesses = newGuesses;
    }
}

const RootStoreContext = React.createContext(new RootStore());

export const useStore = () => React.useContext(RootStoreContext);