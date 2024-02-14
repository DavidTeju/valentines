// ScoreContext.js
import {createContext, ReactNode, useContext, useState} from 'react';

const ScoreContext = createContext({
    score: 0, increaseScore: () => {
    }
});

const useScore = () => useContext(ScoreContext);

const ScoreProvider = ({children}: { children: ReactNode }) => {
    const [score, setScore] = useState(0);

    const increaseScore = () => {
        setScore(prevScore => prevScore + 1);
    };

    return (
        <ScoreContext.Provider value={{score, increaseScore}}>
            {children}
        </ScoreContext.Provider>
    );
};

export {useScore, ScoreProvider};
