import { LetterStatus } from "./Enums";

export class Guess {
    guess: LetterObj[];
    isSubmitted: boolean;
    
    public constructor(
        guess: LetterObj[] = [],
        isSubmitted = false,
    ) {
        this.guess = guess;
        this.isSubmitted = isSubmitted;
    }

    public addCharToGuess(char: string): Guess {
        this.guess = [...this.guess, new LetterObj(char, LetterStatus.NONE)];
        return this;
    }

    public popCharFromGuess(): Guess {
        const newLetters: LetterObj[] = [...this.guess];
        newLetters.pop();
        this.guess = newLetters;
        return this;
    }

    public includes(letter: LetterObj): boolean {
        return this.guess.map((letter: LetterObj) => letter.char).join().includes(letter.char);
    }

    public charAt(idx: number): LetterObj {
        return idx < this.guess.length
            ? this.guess[idx]
            : new LetterObj();
    }

    public submit() {
        this.isSubmitted = true;
    }

    public validate(word: Guess) {
        word.guess.forEach((letter: LetterObj, idx: number) => {
            if (this.guess[idx].equals(letter)) {
                this.guess[idx].status = LetterStatus.CORRECT;
            } else if (word.includes(this.guess[idx])) {
                this.guess[idx].status = LetterStatus.SEMICORRECT;
            } else {
                this.guess[idx].status = LetterStatus.INCORRECT;
            }
        });
    }

    public toString() {
        return this.guess.map((letter: LetterObj) => letter.char).join();
    }
}

export class Word {
    letters: LetterObj[];

    public constructor(letters: LetterObj[] = []) {
        this.letters = letters;
    }

    public length(): number {
        return this.letters.length;
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