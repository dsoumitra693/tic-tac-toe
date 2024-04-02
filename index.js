let turn = 'X'
let isGameOver = false
let cellsRef = [...document.getElementsByTagName('td')]
let restartBtn = document.querySelector('#restart')
let msgBox = document.querySelector('#msg')

let board = Array(9).fill("e")

const handleClick = (evt, index) => {
    if (!isGameOver && (board[index] == "e")) {
        evt.target.innerHTML = turn
        board[index] = turn
        checkWin()
        changeTurn()
    }
}

const changeTurn = () => turn = turn == 'O' ? 'X' : 'O'
const checkWin = () => {
    let win = horizontalWin() ||
        verictalWin() ||
        diagonalWin()

    let boardUnique = [...new Set(board)]
    isGameOver = win || (boardUnique.length == 2 && boardUnique.indexOf('e') == -1)

    if (win) {
        msgBox.innerHTML = `Hurrah! ${turn} won the match.`
        return
    }

    if (isGameOver) {
        msgBox.innerHTML = "Sorry game is over."
    }
}

const horizontalWin = () => {
    let r1 = hasUniqueElem(board.slice(0, 3))
    let r2 = hasUniqueElem(board.slice(3, 6))
    let r3 = hasUniqueElem(board.slice(6, 9))

    return r1 || r2 || r3
}
const verictalWin = () => {
    let c1 = hasUniqueElem([board[0], board[3], board[6]])
    let c2 = hasUniqueElem([board[1], board[4], board[7]])
    let c3 = hasUniqueElem([board[2], board[5], board[8]])

    return c1 || c2 || c3
}
const diagonalWin = () => {
    let d1 = hasUniqueElem([board[0], board[4], board[8]])
    let d2 = hasUniqueElem([board[2], board[4], board[6]])

    return d1 || d2
}

const hasUniqueElem = (args) => {
    let s = [...new Set(args)]

    return (s.length == 1 && s[0] != "e")
}
cellsRef.forEach((cell, index) => cell.addEventListener('click', (evt) => handleClick(evt, index)))

restartBtn.addEventListener('click', () => {
    window.location = './'
})
