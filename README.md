# Pomodoro

Aplicação de timer Pomodoro com gerenciamento de tarefas, desenvolvida em React com TypeScript. Combina o ciclo de foco e pausas da técnica Pomodoro com uma lista de tarefas persistida no navegador.

Site: https://pomodoro-fawn-mu.vercel.app/

## Funcionalidades

### Timer
- Três modos de temporizador: Pomodoro (25 min), Pausa Curta (5 min) e Pausa Longa (15 min)
- Alternância automática entre Pomodoro e Pausa Curta ao fim de cada ciclo
- Indicação visual de progresso com mudança de fundo do container durante a contagem
- Alarme sonoro ao fim de cada ciclo
- Notificações nativas do navegador ao fim de cada ciclo (com solicitação de permissão)
- Atalhos de teclado: `Espaço` para iniciar/pausar, `R` para resetar, `P` para Pomodoro, `S` para Pausa Curta e `L` para Pausa Longa

### Tarefas
- Adição de tarefas via modal com foco automático no input
- Confirmação de tarefa com `Enter` ou botão de salvar
- Marcação de tarefa como concluída com indicação visual (riscado e opacidade reduzida)
- Exclusão de tarefas individuais
- Persistência das tarefas no `localStorage` — as tarefas são mantidas entre sessões

### Header
- Modal de dicas sobre a técnica Pomodoro (por que 25 minutos, monotarefa, importância das pausas e ciclos longos)
- Modal de atalhos de teclado disponíveis

## Tecnologias

- **React** — componentização e gerenciamento de estado com `useState`, `useEffect` e `useRef`
- **TypeScript** — tipagem estática de props, estados e eventos
- **reactjs-popup** — modais de dicas, atalhos e adição de tarefas
- **lucide-react** — ícones de check e lixeira nas tarefas
- **CSS3** — estilização por componente com variáveis CSS e media queries para responsividade mobile
- **Web Notifications API** — notificações nativas do navegador
- **localStorage** — persistência das tarefas entre sessões

## Estrutura do Projeto

```
/
└── src/
    ├── App.tsx
    ├── index.css
    └── components/
        ├── Header.tsx
        ├── Main.tsx
        ├── Timer.tsx
        ├── Tasks.tsx
        └── styles/
            ├── Header.css
            ├── Main.css
            ├── Timer.css
            └── Tasks.css
```

## Autor

Mateus Hahn — mateushahn333@gmail.com

- GitHub: [github.com/mateushahndev](https://github.com/mateushahndev)
- LinkedIn: [linkedin.com/in/mateushahndev](https://www.linkedin.com/in/mateushahndev)