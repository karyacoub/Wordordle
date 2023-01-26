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
        const newLetters = [...this.letters];

        newLetters.forEach((letter: LetterObj, idx: number) => {
            newLetters[idx].status = word.validateLetter(letter, idx);
        });

        // newLetters.forEach((letter: LetterObj, idx: number) => {
        //     if (word.charAt(idx).equals(letter)) {
        //         newLetters[idx].status = LetterStatus.CORRECT;
        //     } else if (word.includes(letter)) {
        //         newLetters[idx].status = LetterStatus.SEMICORRECT;
        //     } else {
        //         newLetters[idx].status = LetterStatus.INCORRECT;
        //     }
        // });

        this.letters = newLetters;

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
    letterMap: Map<string, number[]>;

    constructor(word: string) {
        this.letterMap = Map();

        word.toLowerCase().split("").forEach((char: string, idx: number) => {
            this.letterMap = this.letterMap.has(char)
                ? this.letterMap.set(char, [...(this.letterMap.get(char)!), idx])
                : this.letterMap.set(char, [idx]);
        });
    }

    public validateLetter(letter: LetterObj, letterIdx: number): LetterStatus {
        const letterIndexes = this.letterMap.get(letter.char);

        if (letterIndexes && letterIndexes.length > 0) {
            // TODO: Find all instances of letter and compare against THAT list
            const letterIndexesIdx = letterIndexes.findIndex((val: number) => val === letterIdx);

            if (letterIndexesIdx >= 0) {
                letterIndexes.splice(letterIndexesIdx, 1);
                this.letterMap = this.letterMap.set(letter.char, letterIndexes);
                return LetterStatus.CORRECT;
            } else {
                return LetterStatus.SEMICORRECT;
            }
        }

        return LetterStatus.INCORRECT;
    }
}