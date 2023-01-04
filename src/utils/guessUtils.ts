import { LETTER_COUNT } from "../models/Constants";

export class GuessUtils {
    private static currentGuess: string = "";

    public static getCurrentGuess(): string {
        return this.currentGuess;
    }

    public static addCharToGuess(char: string): void {
        if (this.currentGuess.length < LETTER_COUNT) {
            this.currentGuess = this.currentGuess + char;
        }
    }

    public static popChar(): void {
        if (this.currentGuess.length >= 1) {
            this.currentGuess = this.currentGuess.substring(0, this.currentGuess.length - 1);
        }
    }
}