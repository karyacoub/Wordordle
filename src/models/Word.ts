import { LetterStatus } from "./Enums";

export class Word {
    letters: LetterObj[];
    isSubmitted: boolean;
    
    public constructor(
        letters: LetterObj[] = [],
        isSubmitted = false,
    ) {
        this.letters = letters;
        this.isSubmitted = isSubmitted;
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

    public submit() {
        this.isSubmitted = true;
    }

    public validate(word: Word) {
        word.letters.forEach((letter: LetterObj, idx: number) => {
            if (this.letters[idx].equals(letter)) {
                this.letters[idx].status = LetterStatus.CORRECT;
            } else if (word.includes(this.letters[idx])) {
                this.letters[idx].status = LetterStatus.SEMICORRECT;
            } else {
                this.letters[idx].status = LetterStatus.INCORRECT;
            }
        });
    }

    public toString() {
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