import './styles/Header.css';
import Popup from 'reactjs-popup';

export default function Header() {
    return (
        <header>
            <div className="header-logotipo">
                <h1>Pomodoro App</h1>
            </div>
            <nav className="header-nav">
                <ul>
                    <li>
                        <Popup
                            trigger={<button className="nav-btn"> Dicas </button>}
                            modal
                            nested
                        >
                            {/* @ts-ignore */}
                            {(close: () => void) => (
                                <div className="modal-container">
                                    <div className="modal-header">
                                        <h2>Como usar o Pomodoro? </h2>
                                        <button className="close-btn" onClick={close}>&times;</button>
                                    </div>
                                    <div className="modal-body">
                                        <section className="tip-section">
                                            <h3>Por que 25 minutos? </h3>
                                            <p>Esse tempo é o "ponto doce" da concentração. É curto o suficiente para não te exaurir, mas longo o suficiente para entrar em estado de <strong>flow</strong>.</p>
                                        </section>

                                        <section className="tip-section">
                                            <h3>A regra de ouro: Monotarefa</h3>
                                            <p>O Pomodoro falha se você tentar fazer duas coisas. Escolha <strong>uma</strong> tarefa da sua lista e ignore o resto do mundo até o alarme tocar.</p>
                                        </section>

                                        <section className="tip-section">
                                            <h3>A importância das pausas</h3>
                                            <p>Não pule os 5 minutos! Seu cérebro precisa "limpar o cache". Use esse tempo para levantar, alongar ou olhar para longe da tela.</p>
                                        </section>

                                        <section className="tip-section">
                                            <h3>Ciclos Longos</h3>
                                            <p>Após 4 blocos de foco, seu cérebro entra em fadiga. A <strong>Pausa Longa (15-30 min)</strong> serve para recarregar totalmente sua energia criativa.</p>
                                        </section>
                                    </div>
                                    <button className="confirm-btn" onClick={close}>Entendi!</button>
                                </div>

                                
                            )}
                        </Popup>
                    </li>
                    <li><button className="nav-btn">Atalhos</button></li>
                </ul>
            </nav>
        </header>
    );
}