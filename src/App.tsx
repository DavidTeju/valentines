import React, {useState} from 'react';
import './App.scss';
import GameSurface from "./components/GameSurface";
import Landing from "./components/Landing";
import Hammer from "./components/Hammer";


function App() {
    const [gameStarted, startGame] = useState(false);

    return (<>
        <Hammer/>
        <audio src="/Theme.mp3" id="theme" loop/>
        <audio src="/Hammer.mp3" id="hammer"/>
        <p id={'portrait-warning'}>Put your phone in lanscape mode!!</p>
        {gameStarted ? <GameSurface/> : <Landing startGame={() => startGame(true)}/>}
    </>);
}

export default App;
