// ScoreContext.js
import {createContext, ReactNode, useContext, useState} from 'react';

const ScoreContext = createContext({
    increaseScore: () => {
    },
    setWinAction: (_: () => void) => {
    }
});

const useScore = () => useContext(ScoreContext);

const ScoreProvider = ({children}: { children: ReactNode }) => {
    const [score, setScore] = useState(0);
    const [winAction, setWinAction] = useState(() => () => {
    });

    const increaseScore = () => {
        const newScore = score + 1;
        if (newScore >= 15) {
            winAction();
        }
        setScore(_ => newScore);
    };

    return (
        <ScoreContext.Provider value={{increaseScore, setWinAction}}>
            {children}
        </ScoreContext.Provider>
    );
};

export {useScore, ScoreProvider};
