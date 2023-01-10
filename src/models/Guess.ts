export class Guess {
    guess: string;
    
    public constructor(
        guess: string = "",
    ) {
        this.guess = guess;
    }

    public addCharToGuess(char: string): Guess {
        const newGuess = this.guess + char;
        this.guess = newGuess;
        return this;
    }

    public popCharFromGuess(): Guess {
        this.guess = this.guess.substring(0, this.guess.length - 1);
        return this;
    }
}