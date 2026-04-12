import './styles/Timer.css';
import { useState } from 'react';

type pomodoro = "pomodoro" | "short" | "long";

export default function Timer() {
    const [option, setOption] = useState<pomodoro>("pomodoro");
    const [timer, setTimer] = useState<number | null>(null);
    const [audio] = useState<HTMLAudioElement>(new Audio('../../public/assets/alarm.mp3'));
    const [timerProgress, setTimeProgress] = useState<boolean>(false);

    function timerSelected():number {

        if(option == "pomodoro") {

            //1500
            return 1500;
        } else if(option == "short") {

            // 300
            return 300;
        } else {

            //900
            return 900;
        }
    }

    function stopwatchFormat(seconds:number):string {
        const minutes = Math.floor(seconds / 60);
        
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

function initStopwatch(): void {
    setTimeProgress(true);
    let seconds = timerSelected() - 1;
    
    const intervalId = setInterval(() => {
        if (seconds > -1) {
            setTimer(seconds);
            seconds--;
        } else {

            clearInterval(intervalId); 
            setTimeProgress(false);
            alarm();
            setTimer(null);
            changeStopwatch();
        }
    }, 1000);
}

    function alarm(): void {
        audio.play();
        
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, 5000);
    }

    function changeStopwatch():void {

        if(option == "pomodoro") {

            setOption("short");
        } else {

            setOption("pomodoro");
        }
    }

    return (
        <section className="pomodoro">
            <div className={`pomodoro-container ${timerProgress && "background-progress"}`}>
                <div className="pomodoro-options">
                    <ul>
                        <li className={option == "pomodoro" && "selected"} onClick={() => setOption("pomodoro")}>Pomodoro</li>
                        <li className={option == "short" && "selected"} onClick={() => setOption("short")}>Pausa Curta</li>
                        <li className={option == "long" && "selected"} onClick={() => setOption("long")}>Pausa Longa</li>
                    </ul>
                </div>
                <div className="pomodoro-timer">
                    <div className="timer">
                        <p>{timer == null ? stopwatchFormat(timerSelected()) : stopwatchFormat(timer)}</p>
                    </div>
                    <div className='timer-btn'>
                        <button className={timerProgress && "pause-btn"} onClick={initStopwatch} type="button">{timerProgress ? "PAUSAR" : "INICIAR"}</button>
                    </div>
                </div>
            </div>
        </section>
    );
}