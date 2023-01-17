import { makeAutoObservable, configure } from "mobx";
import { Guess, LetterObj } from "../models/Guess";
import React from "react";
import { LetterCount } from "../models/Enums";

configure({
    enforceActions: "never",
})

class RootStore {

    maxGuessLength: number = LetterCount.FIVE;
    currentGuessNum: number = 0;
    guesses: Guess[] = [];
    todaysWord: string = "irate".toLowerCase();

    constructor() {
        makeAutoObservable(this);
    }

    setMaxGuessLength(maxGuessLength: number) {
        this.maxGuessLength = maxGuessLength;
    }

    setCurrentGuessNum(currentGuessNum: number) {
        this.currentGuessNum = currentGuessNum;
    }

    setGuesses(guesses: Guess[]) {
        this.guesses = guesses;
    }

    backspace() {
        const newGuesses = [...this.guesses];

        if (newGuesses.length > 0) {
            newGuesses[this.currentGuessNum].popCharFromGuess();
        }

        this.setGuesses(newGuesses);
    }

    enter() {
        if (this.guesses[this.currentGuessNum].guess.length === this.maxGuessLength && this.currentGuessNum < this.maxGuessLength + 1) {
            const letters: LetterObj[] = this.todaysWord.split("").map((letter: string) => new LetterObj(letter));
            const word = new Guess(letters);

            this.guesses[this.currentGuessNum].submit();
            this.guesses[this.currentGuessNum].validate(word);
            this.setCurrentGuessNum(this.currentGuessNum + 1);
        }
    }

    addToCurrentGuess(char: string) {
        const newGuesses = [...this.guesses];

        if (newGuesses.length <= this.currentGuessNum) {
            newGuesses.push(new Guess([new LetterObj(char)]));
        } else if (newGuesses[this.currentGuessNum].guess.length < this.maxGuessLength) {
            newGuesses[this.currentGuessNum].addCharToGuess(char);
        }

        this.setGuesses(newGuesses);
    }
}

const RootStoreContext = React.createContext(new RootStore());

export const useStore = () => React.useContext(RootStoreContext);