import {ReactNode, useEffect, useRef, useState} from "react";
import MoleSlot from "./MoleSlot";

// const Fake = styled.div`
//     width: 100px;
//     height: 100px;
//     background-color: black;
//     //position: absolute;
//     //top: 50%;
//     //left: 50%;
//     //transform: translate(-50%, -50%);
// `;

export default function GameSurface({children}: { children?: ReactNode }) {
    const [childWidth, setWidth] = useState(0);
    const surfaceRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const {width} = entry.contentRect;
                const padding = 10;
                const gap = 10;
                const numChildrenInRow = 3;
                const childWidth = (width - padding * 2 - gap * (numChildrenInRow - 1)) / numChildrenInRow;
                setWidth(childWidth);
            }
        });

        if (surfaceRef.current) {
            resizeObserver.observe(surfaceRef.current);
        }


        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return <div className={'surface'} ref={surfaceRef}
                style={{background: 'url("/sarah.png")', backgroundSize: 'contain', borderRadius: '1rem'}}>
        {Array.from({length: 6}).map(() => <MoleSlot width={childWidth}/>)}
    </div>;

}
