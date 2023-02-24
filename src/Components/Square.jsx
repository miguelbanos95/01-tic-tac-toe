
// 4. Creamos las casillas (componente)
const Square = ({ children, isSelected, updateBoard, index }) => {
    /* 8. Genero un buleano de estilos para pintar las 'X' o las 'O' */
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    /* 11.  Creo el 'handleclick' para cuando pinche el jugador actualice el estado */
    const handleClick = () => {
        updateBoard(index)
    }

    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    )
  }
  export default Square