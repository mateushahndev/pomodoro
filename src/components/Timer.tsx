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
        if (option === "pomodoro") setSeconds(15);
        else if (option === "short") setSeconds(3);
        else setSeconds(9);
    }, [option]);

    // --- BLOCO DOS ATALHOS ---
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase(); // Pegamos a tecla em minúsculo pra facilitar

            // 1. Iniciar / Pausar (Espaço)
            if (e.code === "Space") {
                e.preventDefault(); 
                if (timerProgress) {
                    stopStopwatch();
                } else {
                    initStopwatch();
                }
            }

            // 2. Resetar (R) - Apenas para o tempo atual da opção selecionada
            if (key === "r") {
                stopStopwatch();
                if (option === "pomodoro") setSeconds(15);
                else if (option === "short") setSeconds(3);
                else setSeconds(9);
            }

            // 3. Mudar para Pomodoro (P)
            if (key === "p") {
                setOption("pomodoro");
            }

            // 4. Mudar para Pausa Curta (S)
            if (key === "s") {
                setOption("short");
            }

            // 5. Mudar para Pausa Longa (L)
            if (key === "l") {
                setOption("long");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [timerProgress, option]); // Adicionamos 'option' aqui para o reset (R) saber qual tempo colocar
    // -------------------------

    function stopwatchFormat(totalSeconds: number): string {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

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

        const id = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(id); 
                    intervalRef.current = null;
                    setTimerProgress(false);
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

    // Você pode remover a função timerKey antiga se quiser, 
    // pois o useEffect acima já resolve tudo de forma global.

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
                            // Removi o onKeyDown daqui para não dar conflito com o global
                        >
                            {timerProgress ? "PAUSAR" : "INICIAR"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}