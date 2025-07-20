import { makeAutoObservable } from "mobx";
import { Word, LetterObj, WordOfTheDay } from "../models/Word";
import React from "react";
import { LetterCount, LetterStatus } from "../models/Enums";
import wordsJson from "../resources/5-letter-words.json"

class RootStore {

    maxGuessLength: number = LetterCount.FIVE;
    currentGuessNum: number = 0;
    guesses: Word[] = [];
    todaysWord?: WordOfTheDay = undefined;
    keyboardEnabled: boolean = true;

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

    setKeyboardEnabled(keyboardEnabled: boolean) {
        this.keyboardEnabled = keyboardEnabled;
    }

    setWordOfTheDay() {
        const randomIndex = Math.floor(Math.random() * wordsJson.words.length);
        const todaysWord = wordsJson.words[randomIndex].toUpperCase();
        this.todaysWord = new WordOfTheDay(todaysWord);
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
            newGuesses[this.currentGuessNum].validate(this.todaysWord!);

            const currentGuess: Word = newGuesses[this.currentGuessNum];

            // disable keyboard if all letters are correct
            if (currentGuess.letters.every((letter: LetterObj) => letter.status === LetterStatus.CORRECT)) {
                this.setKeyboardEnabled(false);
            }

            this.setCurrentGuessNum(this.currentGuessNum + 1);

            // disable keyboard if current guess number exceeds max guess length
            if (this.currentGuessNum > this.maxGuessLength) {
                this.setKeyboardEnabled(false);
            }
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