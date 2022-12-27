import React from "react";
import { Keyboard } from "./Keyboard";
import { LetterBoard } from "./LetterBoard";
import { NavBar } from "./NavBar";

export const Root: React.FunctionComponent = () => {
    return <div id="root__container">
        <NavBar />
        <LetterBoard />
        <Keyboard />
    </div>
};