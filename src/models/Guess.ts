export class Guess {
    guess: string;
    isSubmitted: boolean;
    
    public constructor(
        guess: string = "",
        isSubmitted = false,
    ) {
        this.guess = guess.toLowerCase();
        this.isSubmitted = isSubmitted;
    }

    public addCharToGuess(char: string): Guess {
        this.guess = (this.guess + char).toLowerCase();
        return this;
    }

    public popCharFromGuess(): Guess {
        this.guess = (this.guess.substring(0, this.guess.length - 1)).toLowerCase();
        return this;
    }

    public submit() {
        this.isSubmitted = true;
    }
}