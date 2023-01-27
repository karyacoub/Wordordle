import { LetterStatus } from "./Enums";
import { Map } from "immutable";

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

        // const newLetters = [...this.letters];

        // newLetters.forEach((letter: LetterObj, idx: number) => {
        //     newLetters[idx].status = word.validateLetter(letter, idx);
        // });

        // newLetters.forEach((letter: LetterObj, idx: number) => {
        //     if (word.charAt(idx).equals(letter)) {
        //         newLetters[idx].status = LetterStatus.CORRECT;
        //     } else if (word.includes(letter)) {
        //         newLetters[idx].status = LetterStatus.SEMICORRECT;
        //     } else {
        //         newLetters[idx].status = LetterStatus.INCORRECT;
        //     }
        // });

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

    constructor(word: string) {
        this.letterIndexes = Map();

        word.toLowerCase().split("").forEach((char: string, idx: number) => {
            this.letterIndexes = this.letterIndexes.has(char)
                ? this.letterIndexes.set(char, [...(this.letterIndexes.get(char)!), idx])
                : this.letterIndexes.set(char, [idx]);
        });
    }

    public validate(letters: LetterObj[]) {
        const newLetters = [...letters];
        let letterEncounters: Map<string, number> = Map();

        newLetters.forEach((letter: LetterObj, idx: number) => {
            const letterLocations: number[] | undefined = this.letterIndexes.get(letter.char);

            letterEncounters = letterEncounters.get(letter.char) !== undefined
                ? letterEncounters.set(letter.char, letterEncounters.get(letter.char)! + 1)
                : letterEncounters.set(letter.char, 0);
        
            if (letterLocations && letterLocations.length > 0) {
                const isCorrectLocation = letterLocations.findIndex((val: number) => val === idx) >= 0;
                const previousEncounters: number = letterEncounters.get(letter.char) !== undefined
                    ? letterEncounters.get(letter.char)!
                    : 0;

                // Letter is part of the word and is in the correct spot
                if (isCorrectLocation) {
                    letter.status = LetterStatus.CORRECT;
                } 

                // Letter is part of the word, is in the incorrect spot, only appears once, and hasn't been encountered before
                else if (letterLocations.length === 1 && previousEncounters === 0) {
                    letter.status = LetterStatus.SEMICORRECT;
                } 

                // letter is part of the word, is in the incorrect spot, only appears once, and has been encountered before
                else if (letterLocations.length === 1 && previousEncounters > 0) {
                    letter.status = LetterStatus.INCORRECT;
                } 

                // letter is part of the word, is in the incorrect spot, appears more than once, and has been encountered that number of times
                else if (letterLocations.length > 1 && letterLocations.length === previousEncounters) {
                    letter.status = LetterStatus.INCORRECT;
                } 

                else {
                    letter.status = LetterStatus.SEMICORRECT;
                }
            } else {
                letter.status = LetterStatus.INCORRECT;
            }
        });
        
        return newLetters;
    }
}