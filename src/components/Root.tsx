import React from "react";
import { CookiesProvider } from "react-cookie";
import { useStore } from "../mobx/RootStore";
import { Keyboard } from "./Keyboard";
import { LetterBoard } from "./LetterBoard";
import { NavBar } from "./NavBar";

export const Root: React.FunctionComponent = () => {

    const store = useStore();

    React.useEffect(() => {
        store.guesses = [];
    }, [store.maxGuessLength]);

    return <CookiesProvider>
        <div id="root__container">
            <NavBar />
            <LetterBoard />
            <Keyboard />
        </div>
    </CookiesProvider>;
};