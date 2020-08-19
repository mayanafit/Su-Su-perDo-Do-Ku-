
const initState = {
    board: [],
    boardDifficulty: [],
    solveStat: '',
    modalStat: false,
    time: 0,
    timeStart: false,
    autoSolveStat: false,
}

const sudokuReducer = (state = initState, action) => {
    switch(action.type) {
        case "SET_BOARD_DIFFICULTY":
            return {
                ...state, boardDifficulty: action.payload.boardDifficulty, 
                board: JSON.parse(JSON.stringify(action.payload.boardDifficulty))
            }
        case "SET_SOLVE_STAT":
            return {
                ...state, solveStat: action.payload.stat
            }
        case "RESET_BOARD":
            return {
                ...state, board: action.payload.boardReset
            }
        case "SET_MODAL_STAT":
            return {
                ...state, modalStat: action.payload.modalStat
            }
        case "SET_TIME_START":
            return {
                ...state, timeStart: action.payload.start
            }
        case "SET_TIME_RESULT":
            return {
                ...state, time: action.payload.result
            }
        case "SET_AUTOSOLVE_STAT":
            return {
                ...state, autoSolveStat: action.payload.statSolve
            }
        default:
            return state
    }
}

export default sudokuReducer