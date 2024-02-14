import Button from 'react-bootstrap/Button';


export default function Landing({startGame}: { startGame: () => void }) {
    const handleClick = () => {
        const audio: HTMLAudioElement | null = document.querySelector('audio#theme');
        if (audio) {
            audio.play();
        }
        startGame();
    }

    return <div className={'landing'}>
        <p>Hello :)</p>
        <Button variant="primary" onClick={handleClick} style={{width: '15rem', height: '5rem', fontSize: '3rem'}}>Hey
            Femi</Button>
    </div>
}
