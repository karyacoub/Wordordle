import React, { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import { Keyboard } from "./Keyboard";
import { LetterBoard } from "./LetterBoard";
import { NavBar } from "./NavBar";
import { useStore } from "../mobx/RootStore";

export const Root: React.FunctionComponent = () => {
    const store = useStore();

    useEffect(() => {
        store.setWordOfTheDay();
    }, []);

    return <CookiesProvider>
        <div id="root__container">
            <NavBar />
            <LetterBoard />
            <Keyboard />
        </div>
    </CookiesProvider>;
};