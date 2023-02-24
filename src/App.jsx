import { useState } from 'react'
import Square from './Components/Square'
import './App.css'

// 1. Lo primero será declarar los turnos
const TURNS = {
  X: 'x',
  O: 'o'
}
/* Creamos las combinaciones de posibles victorias*/
const WINNER_COMBOS = [
  /* HORIZONTAL*/
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  /* VERTICAL */
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  /* DIAGONAL */
  [0, 4, 8], [2, 4, 6]

]
// 2. Creamos el tablero fuera del app
// const board = Array(9).fill(null)


function App() {

  /*  5. Muevo el board dentro de la app y lo paso como un estado porque cuando 
  se haga un click en el tablero se tendrá que actualizar (estado) */
  const [board, setBoard] = useState(Array(9).fill(null))


  /*  6. Creamos un estado para ver de quien es el turno (siempre las X) */
  const [turn, setTurn] = useState(TURNS.X)
  /* 17. Creamos un estado para saber si hay ganador: null= no hay ganador, false= empate */
  const [winner, setWinner] = useState(null)


  /* 18. Comprobar si hay ganador */
  const checkWinner = (boardToCheck) => {
    /* 18.1 Para cada combinación de WINNER_COMBOS chequea lo siguiente: */
    for (const combo of WINNER_COMBOS) {

      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // Si no hay ganador
    return null

  }

  const updateBoard = (index) => {
    /* 16. Para evitar sobreescribir una posición: si ya hay algo en el 'board' en una posición 'index'
            pues no actualiza */
    if (board[index] || winner) return


    /* 12. Cambiar de turno */
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    /* 13. Actualizamos el estado con 'setTurn' */
    setTurn(newTurn)
    /* 14. Hay que guardar el estado actual para registrar los turnos de los jugadores 
    en una copia del array porque el estado es INMUTABLE */
    const newBoard = [...board]
    /* 15. Como recibe como argumento el 'index===posición' el 'newBoard' pasa a ser el turno actual */
    newBoard[index] = turn
    setBoard(newBoard)

    /* 19. Revisar si hay un ganador*/
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  return (
    // 3.Pintamos el tablero
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className='game'>
        {
          // 5.Pintamos las casillas
          board.map((_, index) => (
            <Square key={index}
              index={index}

              /* 10. Le pasamos el 'updateBoard' como prop para que lo reciba 
               el hijo y pueda actualizar el estado del hijo y se ejecute  */
              updateBoard={updateBoard}>

              {board[index]}
            </Square>
          ))
        }
      </section>

      <section className='turn'>
        {/* 7.  Creamos esta sección para pintar los turnos
            7.1 creamos una prop para saber a quien le toca */}
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        winner != null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {winner === false ?
                  'Empate' : 'Ganó:'
                }
              </h2>
              <header className='win'>
                {winner &&
                  <Square> {winner} </Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
