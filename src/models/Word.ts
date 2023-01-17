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
        const newLetters = [...this.letters];

        newLetters.forEach((letter: LetterObj, idx: number) => {
            if (word.charAt(idx).equals(letter)) {
                newLetters[idx].status = LetterStatus.CORRECT;
            } else if (word.includes(letter)) {
                newLetters[idx].status = LetterStatus.SEMICORRECT;
            } else {
                newLetters[idx].status = LetterStatus.INCORRECT;
            }
        });

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