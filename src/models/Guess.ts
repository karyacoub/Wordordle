import { LetterStatus } from "./Enums";

export class Guess {
    guess: Word;
    isSubmitted: boolean;
    
    public constructor(
        guess: Word = new Word(),
        isSubmitted = false,
    ) {
        this.guess = guess;
        this.isSubmitted = isSubmitted;
    }

    public addCharToGuess(char: string): Guess {
        this.guess = this.guess.push(char);
        return this;
    }

    public popCharFromGuess(): Guess {
        this.guess = this.guess.pop();
        return this;
    }

    public submit() {
        this.isSubmitted = true;
    }

    public toString() {
        return this.guess.toString();
    }
}

export class Word {
    letters: LetterObj[];

    public constructor(letters: LetterObj[] = []) {
        this.letters = letters;
    }

    public includes(letter: LetterObj): boolean {
        return this.letters.map((letter: LetterObj) => letter.char).join().includes(letter.char);
    }

    public push(char: string): Word {
        const newLetters: LetterObj[] = [...this.letters, new LetterObj(char, LetterStatus.NONE)];
        return new Word(newLetters);
    }

    public pop(): Word {
        const newLetters: LetterObj[] = [...this.letters];
        newLetters.pop();
        return new Word(newLetters);
    }

    public length(): number {
        return this.letters.length;
    }

    public charAt(idx: number): LetterObj {
        return idx < this.length()
            ? this.letters[idx]
            : new LetterObj();
    }

    public toString(): string {
        return this.letters.map((letter: LetterObj) => letter.char).join();
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