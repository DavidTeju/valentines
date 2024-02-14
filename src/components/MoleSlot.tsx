"use client";

import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {useScore} from "../data/ScoreContext";

const imageLinks = Array.from({length: 7}, (_, i) => i).map((i) => `/david/${i + 1}.png`);

const MoleSlotContainer = styled.div<{ $width: number }>`
    width: ${({$width}) => $width}px;
    height: ${({$width}) => $width}px;
    //border: 1px solid #000;
    position: relative;
    background: url("/MoleSlotContainerBorder.png") no-repeat;
    background-size: contain;
    padding: ${({$width}) => $width / 5}px;

    //left: 50%;
    //transform: translate(-50%, 50%);
    border-radius: 50%;

    &:after {
        content: "";
        display: inline-block;
        background-color: #000;
        opacity: .9;
        width: 100%;
        height: 30%;
        position: absolute;
        top: 70%;
        left: 0;
        border-radius: 15px;
    }
`;

const SquareCircleImage = styled.img<{ $animation: string }>`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    animation: ${({$animation}) => $animation} .5s forwards;
`;

function Mole({shouldDie, onClick}: { shouldDie: boolean, onClick: () => void }) {
    const imageLink = useRef(imageLinks[Math.floor(Math.random() * imageLinks.length)]);

    return <SquareCircleImage onClick={onClick} $animation={shouldDie ? 'die-out' : 'expand-out'}
                              alt={"image of my face"} src={imageLink.current} height={200}
                              width={200} draggable={false}/>;
}

function MoleSlotHole() {
    const [shouldDie, makeDie] = useState(true);
    const [id, setId] = useState(0);
    const {score, increaseScore} = useScore();

    useEffect(() => {
        setTimeout(() => {
            setId(0);
            makeDie(false);
        }, Math.random() * 5000 + 100);

    }, []);

    return <Mole key={id} shouldDie={shouldDie} onClick={() => {
        if (shouldDie) return;
        makeDie(true);
        increaseScore();

        setTimeout(() => {
            setId(id + 1);
            makeDie(false);
        }, Math.random() * 5000 + 500);
    }}/>;
}

export default function MoleSlot({width}: { width: number }) {

    return <MoleSlotContainer $width={width}>
        <MoleSlotHole/>
    </MoleSlotContainer>;
}
