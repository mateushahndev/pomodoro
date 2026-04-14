import { useState, useRef, useEffect } from 'react';
import './styles/Timer.css';

type pomodoro = "pomodoro" | "short" | "long";

export default function Timer() {
    const [option, setOption] = useState<pomodoro>("pomodoro");
    const [seconds, setSeconds] = useState<number>(1500);
    const [timerProgress, setTimerProgress] = useState<boolean>(false);
    
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [audio] = useState<HTMLAudioElement>(new Audio('/assets/alarm.mp3'));

    useEffect(() => {
        stopStopwatch();
        if (option === "pomodoro") setSeconds(1500);
        else if (option === "short") setSeconds(300);
        else setSeconds(900);
    }, [option]);

    function stopwatchFormat(totalSeconds: number): string {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

// 1. Função de Transição: Agora ela APENAS muda a opção.
    // O useEffect se encarregará de todo o resto (resetar tempo e parar timer).
// 1. Centralize a troca. Não use "changeStopwatch" e "handleStageTransition" separadas.
    // Use APENAS esta:
    function nextStage():void {
        if(option == "pomodoro") {

            setOption("short");
        } else {

            setOption("pomodoro");
        }
    }

    function initStopwatch():void {
        if (timerProgress) return;
        setTimerProgress(true);

        // O segredo está aqui:
        const id = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    // MATAR o intervalo antes de qualquer outra ação
                    clearInterval(id); 
                    intervalRef.current = null;
                    setTimerProgress(false);
                    
                    // Chamar a transição SÓ DEPOIS de limpar o motor
                    nextStage();
                    alarm();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        intervalRef.current = id;
    }

    function stopStopwatch() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTimerProgress(false);
    }

    function alarm(): void {
        audio.play().catch(e => console.log("Erro ao tocar áudio:", e));
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, 5000);
    }

    return (
        <section className="pomodoro">
            <div className={`pomodoro-container ${timerProgress ? "background-progress" : ""}`}>
                <div className="pomodoro-options">
                    <ul>
                        <li className={option === "pomodoro" ? "selected" : ""} onClick={() => setOption("pomodoro")}>Pomodoro</li>
                        <li className={option === "short" ? "selected" : ""} onClick={() => setOption("short")}>Pausa Curta</li>
                        <li className={option === "long" ? "selected" : ""} onClick={() => setOption("long")}>Pausa Longa</li>
                    </ul>
                </div>
                <div className="pomodoro-timer">
                    <div className="timer">
                        <p>{stopwatchFormat(seconds)}</p>
                    </div>
                    <div className='timer-btn'>
                        <button 
                            className={timerProgress ? "pause-btn" : ""} 
                            onClick={timerProgress ? stopStopwatch : initStopwatch} 
                            type="button"
                        >
                            {timerProgress ? "PAUSAR" : "INICIAR"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}