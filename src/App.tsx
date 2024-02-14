import React, {useEffect, useState} from 'react';
import './App.scss';
import GameSurface from "./components/GameSurface";
import Landing from "./components/Landing";
import Hammer from "./components/Hammer";
import {useScore} from "./data/ScoreContext";
import styled from "styled-components";

const WinScreen = styled.div<{ $isGameWon: boolean }>`
    position: absolute;
    z-index: 1000;
    
    top: ${({$isGameWon}) => $isGameWon ? '0' : '-100vh'};
    transition: top 2s;
    
    padding: 3rem;
    width: 100vw;
    height: 100vh;
    background-color: rgba(25 25 20 / 60%);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);


    div {
        width: 80vw;
        height: 80vh;
        margin: auto;


        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        p {
            position: absolute;
            top: 70%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2rem;
            color: white;
            text-shadow: 2px 2px 2px black;
            padding: .5rem;
            background-color: rgba(25, 25, 20, .5);

        }
    }
`;

function App() {
    const [gameStarted, startGame] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    const {setWinAction} = useScore();
    useEffect(() => {
        setWinAction(() => () => {
            setGameWon(true);
        });
    }, [setWinAction])


    return (<>
        <Hammer/>
        <audio src="/Theme.mp3" id="theme" loop/>
        <audio src="/Hammer.mp3" id="hammer"/>
        <p id={'portrait-warning'}>Put your phone in lanscape mode!!</p>
        <WinScreen $isGameWon={gameWon} className={'win-screen'}>
                <div>
                    <img src="/final.png" alt="You win"/>
                    <p>Will you be my valentine?</p>
                </div>
            </WinScreen>
        {gameStarted
                ? <GameSurface/>
                : <Landing startGame={() => startGame(true)}/>}
    </>);
}

export default App;
