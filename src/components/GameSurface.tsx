import {ReactNode, useEffect, useRef, useState} from "react";
import MoleSlot from "./MoleSlot";

// Preload the background image
const sarahBackgroundURL = '/sarah.png';
const sarahBackgroundImage = new Image();
sarahBackgroundImage.src = sarahBackgroundURL;
sarahBackgroundImage.decode();


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
                style={{background: `url(${sarahBackgroundURL})`, backgroundSize: 'contain', borderRadius: '1rem'}}>
        {Array.from({length: 6}).map(() => <MoleSlot width={childWidth}/>)}
    </div>;

}
