"use client"

import styled, {css, keyframes} from "styled-components";
import {MutableRefObject, useEffect, useRef, useState} from "react";

const slamHammerKeyframes = keyframes`
    0% {
        transform: rotate(0deg);
    }
    30% {
        transform: rotate(-120deg);
    }
    100% {
        transform: rotate(0deg);
    }

`;

const slamHammer = css`
    ${slamHammerKeyframes} 0.3s linear;
`;


const StyledHammer = styled.img<{ $shouldSlam: boolean }>`
    position: absolute;
    height: 100px;
    z-index: 100;
    pointer-events: none;

    display: none;

    animation: ${({$shouldSlam}) => $shouldSlam ? slamHammer : 'none'} forwards;
}
`

export default function Hammer() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const hammerRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
    const [shouldSlam, makeSlam] = useState(false);


    useEffect(() => {
        const hammerSound = document.querySelector('audio#hammer') as HTMLAudioElement | null;

        const animateMouse = (_: number) => {
            if (!hammerRef.current) {
                return;
            }
            hammerRef.current.style.left = `${x}px`;
            hammerRef.current.style.top = `${y}px`;
        }
        const moveHandler = (e: MouseEvent) => {
            if (!hammerRef.current) {
                return;
            }

            hammerRef.current.style.display = 'block';

            const hammerHeight = hammerRef.current.clientHeight;
            const hammerWidth = hammerRef.current.clientWidth;

            setX(e.clientX - hammerWidth / 2);
            setY(e.clientY - hammerHeight / 2);
            animateMouse(0);
        };

        const clickHandler = () => {
            if (hammerSound) {
                hammerSound.currentTime = 0;
                hammerSound.play();
            }

            makeSlam(true);
        }

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('click', clickHandler);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousemove', moveHandler);
            document.addEventListener('click', () => makeSlam(true));
        };
    });

    return <StyledHammer onAnimationEnd={() => makeSlam(false)} $shouldSlam={shouldSlam} ref={hammerRef}
                         src="/Hammer.PNG" alt="hammer"/>;
}
