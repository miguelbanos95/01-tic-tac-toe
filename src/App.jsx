import { useState } from 'react'
import './App.css'

// 1. Lo primero será declarar los turnos
const TURNS = {
  X: 'x',
  O: 'o'
}
// 2. Creamos el tablero fuera del app
// const board = Array(9).fill(null)

// 4. Creamos las casillas (componente)
const Square = ({ children, updateBoard, index }) => {
  return (
    <div className='square'>
      {children}
    </div>
  )
}
function App() {

  /*  5. Muevo el board dentro de la app y lo paso como un estado porque cuando 
  se haga un click en el tablero se tendrá que actualizar (estado) */
  const [board, setBoard] = useState(Array(9).fill(null))

  /* 6. Creamos un estado para ver de quien es el turno (siempre las X) */
  const [turn, setTurn] = useState(TURNS.X)

  return (
    // 3.Pintamos el tablero
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          // 5.Pintamos las casillas
          board.map((_, index) => (
            <Square key={index} index={index}>
              {board[index]}
            </Square>
          ))
        }
      </section>

      <section className='turn'>
        {/* 7.  Creamos esta sección para pintar los turnos
            7.1 creamos una prop para saber a quien le toca */}
        <Square isSelected={''}>{TURNS.X}</Square>
        <Square>{TURNS.O}</Square>
      </section>
    </main>
  )
}

export default App
