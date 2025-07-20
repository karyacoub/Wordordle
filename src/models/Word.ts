import { LetterStatus } from "./Enums";
import { Map } from "immutable";
import { Letter } from "../components/Letter";
import { useStore } from "../mobx/RootStore";

export class Word {
    letters: LetterObj[];
    
    public constructor(letters: LetterObj[] = []) {
        this.letters = letters;
    }

    public push(char: string): Word {
        this.letters = [...this.letters, new LetterObj(char, LetterStatus.NONE)];
        return this;
    }

    public pop(): Word {
        const newLetters: LetterObj[] = [...this.letters];
        newLetters.pop();
        this.letters = newLetters;
        return this;
    }

    public includes(letter: LetterObj): boolean {
        return this.letters.map((letter: LetterObj) => letter.char).join().includes(letter.char);
    }

    public charAt(idx: number): LetterObj {
        return idx < this.letters.length
            ? this.letters[idx]
            : new LetterObj();
    }

    public validate(word: WordOfTheDay) {
        this.letters = word.validate(this.letters);

        return this;
    }

    public toString(): string {
        return this.letters.map((letter: LetterObj) => letter.char).join();
    }
}

export class LetterObj {
    char: string = "";
    status: LetterStatus = LetterStatus.NONE;

    public constructor(
        char: string = "",
        status: LetterStatus = LetterStatus.NONE,
    ) {
        this.char = char.toLowerCase();
        this.status = status;
    }

    public equals(letter: LetterObj): boolean {
        return this.char === letter.char;
    }
}

export class WordOfTheDay {
    letterIndexes: Map<string, number[]>;
    word: string;

    constructor(word: string) {
        this.word = word;
        this.letterIndexes = this.getLetterIndexes(word);
    }

    private getLetterIndexes(word: string) {
        let letterIndexes = Map<string, number[]>();

        word.toLowerCase().split("").forEach((char: string, idx: number) => {
            letterIndexes = letterIndexes.has(char)
                ? letterIndexes.set(char, [...(letterIndexes.get(char)!), idx])
                : letterIndexes.set(char, [idx]);
        });

        return letterIndexes;
    }

    public validate(letters: LetterObj[]) {
        const guessLetters: LetterObj[] = [...letters];
        const guessLetterIndexes = this.getLetterIndexes(guessLetters.map((letter: LetterObj) => letter.char).join(""))

        guessLetterIndexes.forEach((currentIdxs: number[], letter: string) => {
            const correctIdxs: number[] | undefined = this.letterIndexes.get(letter);

            if (correctIdxs) {
                const correctGuessLetterIdxs = currentIdxs.filter((idx: number) => {
                    return correctIdxs.findIndex((idx2: number) => idx === idx2) >= 0
                });

                // set all correct statuses
                correctGuessLetterIdxs.forEach((idx: number) => guessLetters[idx].status = LetterStatus.CORRECT);

                // set semicorrect statuses
                if (correctGuessLetterIdxs.length > 0 && currentIdxs.length > correctGuessLetterIdxs.length) {
                    currentIdxs.forEach((idx: number, current: number) => {
                        if (guessLetters[idx].status !== LetterStatus.CORRECT && current < correctIdxs.length) {
                            guessLetters[idx].status = LetterStatus.SEMICORRECT;
                        }
                    });
                }
                else if (correctGuessLetterIdxs.length <= 0) {
                    currentIdxs.forEach((idx, current) => {
                        if (current < correctIdxs.length) {
                            guessLetters[idx].status = LetterStatus.SEMICORRECT;
                        }
                    });
                }
            }
        });

        // set incorrect statuses
        guessLetters.forEach((letter: LetterObj) => {
            if (letter.status === LetterStatus.NONE) {
                letter.status = LetterStatus.INCORRECT;
            }
        });
        
        return guessLetters;
    }
}