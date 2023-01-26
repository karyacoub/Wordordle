import { makeAutoObservable } from "mobx";
import { Word, LetterObj, WordOfTheDay } from "../models/Word";
import React from "react";
import { LetterCount } from "../models/Enums";

class RootStore {

    maxGuessLength: number = LetterCount.FIVE;
    currentGuessNum: number = 0;
    guesses: Word[] = [];
    todaysWord: WordOfTheDay = new WordOfTheDay("irate");

    constructor() {
        makeAutoObservable(this);
    }

    setMaxGuessLength(maxGuessLength: number) {
        this.maxGuessLength = maxGuessLength;
    }

    setCurrentGuessNum(currentGuessNum: number) {
        this.currentGuessNum = currentGuessNum;
    }

    setGuesses(guesses: Word[]) {
        this.guesses = guesses;
    }

    backspace() {
        const newGuesses = [...this.guesses];

        if (newGuesses.length > 0) {
            newGuesses[this.currentGuessNum].pop();
        }

        this.setGuesses(newGuesses);
    }

    enter() {
        const newGuesses = [...this.guesses];

        if (newGuesses[this.currentGuessNum].letters.length === this.maxGuessLength && this.currentGuessNum < this.maxGuessLength + 1) {
            // const todaysWordLetters: LetterObj[] = this.todaysWord.split("").map((letter: string) => new LetterObj(letter));
            // const todaysWordCasted = new Word(todaysWordLetters);

            newGuesses[this.currentGuessNum].validate(this.todaysWord);

            this.setCurrentGuessNum(this.currentGuessNum + 1);
        }

        this.setGuesses(newGuesses);
    }

    addToCurrentGuess(char: string) {
        const newGuesses = [...this.guesses];

        if (newGuesses.length <= this.currentGuessNum) {
            newGuesses.push(new Word([new LetterObj(char)]));
        } else if (newGuesses[this.currentGuessNum].letters.length < this.maxGuessLength) {
            newGuesses[this.currentGuessNum].push(char);
        }

        this.setGuesses(newGuesses);
    }
}

const RootStoreContext = React.createContext(new RootStore());

export const useStore = () => React.useContext(RootStoreContext);