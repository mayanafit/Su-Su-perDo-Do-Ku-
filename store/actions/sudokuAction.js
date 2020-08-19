export const resetBoard = () => {
    return {
        type: 'SET_BOARD_DIFFICULTY',
        payload: {
            boardDifficulty: []
        }
    }
}

export const setBoardDifficulty = (params) => {
    return (dispatch) => {
        fetch(`https://sugoku.pinokio.xyz/board?difficulty=${params}`,{
            method: 'GET',
        })
        .then((resp) => resp.json())
        .then((data) => {
            dispatch({
                type: 'SET_BOARD_DIFFICULTY',
                payload: {
                    boardDifficulty: data.board
                }
            })
        })
    }
}

export const setValidate = (data) => {
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
        Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');
    return (dispatch) => {
        fetch(`https://sugoku.pinokio.xyz/validate`,{
            method: 'POST',
            body: encodeParams({
                board: data
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then((resp) => resp.json())
        .then((data) => {
            dispatch({
                type: 'SET_SOLVE_STAT',
                payload: {
                    stat: data.status
                }
            })
        })
    }
}

export const setSolveBoard = (data) => {
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
        Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');
    return (dispatch) => {
        fetch(`https://sugoku.pinokio.xyz/solve`,{
            method: 'POST',
            body: encodeParams({
                board: data
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then((resp) => resp.json())
        .then((data) => {
            // console.log(data, `ini solved`)
            dispatch({
                type: 'SET_BOARD_DIFFICULTY',
                payload: {
                    boardDifficulty: data.solution
                }
            })
            dispatch({
                type: 'SET_AUTOSOLVE_STAT',
                payload: {
                    statSolve: true
                }
            })
        })
    }
}

export const setAutoSolveStat = (stat) => {
    return {
        type: 'SET_AUTOSOLVE_STAT',
        payload: {
            statSolve: stat
        }
    }
}

export const resetStat = (stat) => {
    return {
        type: 'SET_SOLVE_STAT',
        payload: {
            stat,
        }
    }
}

export const setModalStat = (stat) => {
    return {
        type: 'SET_MODAL_STAT',
        payload: {
            modalStat: stat
        }
    }
}

export const setTime = (start) => {
    return {
        type: 'SET_TIME_START',
        payload: {
            start,
        }
    }
}

export const setTimeResult = (result) => {
    return {
        type: 'SET_TIME_RESULT',
        payload: {
            result,
        }
    }
}