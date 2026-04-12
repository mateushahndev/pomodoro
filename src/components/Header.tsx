import './styles/Header.css';

export default function Header() {

    return (
        <header>
            <div className="header-logotipo">
                <h1>Pomodoro App</h1>
            </div>
            <nav className="header-nav">
                <ul>
                    <li><a href="">Dicas</a></li>
                    <li><a href="">Atalhos</a></li>
                </ul>
            </nav>
        </header>
    );
}