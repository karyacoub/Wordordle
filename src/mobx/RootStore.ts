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
            newGuesses[this.currentGuessNum].popCharFromGuess();
        }

        this.guesses = newGuesses;
    }

    enter() {
        if (this.guesses[this.currentGuessNum].guess.length === this.maxGuessLength && this.currentGuessNum < this.maxGuessLength + 1) {
            console.log("ayy");
            this.setCurrentGuessNum(this.currentGuessNum + 1);
        }
    }

    addToCurrentGuess(char: string) {
        const newGuesses = [...this.guesses];

        if (newGuesses.length <= this.currentGuessNum) {
            newGuesses.push(new Guess(char));
        } else if (newGuesses[this.currentGuessNum].guess.length < this.maxGuessLength) {
            newGuesses[this.currentGuessNum].addCharToGuess(char);
        }

        this.guesses = newGuesses;
    }
}

const RootStoreContext = React.createContext(new RootStore());

export const useStore = () => React.useContext(RootStoreContext);