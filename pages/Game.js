import React, { useEffect } from 'react';
import { ModalTemp, BoardTemp, Time } from '../components';
import { View, ScrollView, StyleSheet, Button, Text, ActivityIndicator, TextInput } from 'react-native';
import { setTime, setValidate, setAutoSolveStat,
    setModalStat, setSolveBoard, setBoardDifficulty, resetBoard, resetStat } from '../store/actions/sudokuAction';
import { useSelector, useDispatch } from 'react-redux';

const Game = ({route: {params}, navigation}) => {
    const { boardDifficulty, solveStat, board, autoSolveStat } = useSelector((state) => state.sudokuReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        let validateBoard = JSON.parse(JSON.stringify(board))
        dispatch(setValidate(validateBoard))
        // console.log(solveStat, `ini di effect`)
        if (solveStat === 'solved') {
            dispatch(setTime(false))
            dispatch(setModalStat(false))
            navigation.navigate('Finish', {
                player: params.player,
            })
        }
    }, [solveStat, dispatch])

    useEffect(() => {
        dispatch(setTime(true))
        dispatch(setAutoSolveStat(false))
    }, [])

    const handleGenerate = () => {
        dispatch(resetBoard())
        dispatch(resetStat(''))
        dispatch(setAutoSolveStat(false))
        dispatch(setBoardDifficulty(params.mode))
    }

    const handleValidate = () => {
        let validateBoard = JSON.parse(JSON.stringify(board))
        dispatch(setValidate(validateBoard))
        // console.log(solveStat, `ini di solvehandle`)
        if (solveStat === 'solved') {
            dispatch(setTime(false))
            dispatch(setModalStat(false))
            navigation.navigate('Finish', {
                player: params.player,
                time: 0,
            })
        } else if (solveStat === 'unsolved' || solveStat === 'broken') {
            dispatch(setModalStat(true))
        } 
    }

    const handleSurrender = () => {
        dispatch(resetStat(''))
        dispatch(resetBoard())
        navigation.navigate('Home')
    }

    const handleSolve = () => {
        alert(`You can see the answer, yet you must admit your defeat.\n\nKindly reload or be true, surrender. :)`)
        let solveBoard = JSON.parse(JSON.stringify(boardDifficulty))
        dispatch(setSolveBoard(solveBoard))
    }
    
    return (
        <>
        <ScrollView contentContainerStyle={[styles.container]}>
            {
                boardDifficulty.length < 1 ? (
                    <ActivityIndicator size="large" color="green" />
                ) : (
                    <View>
                        <Text style={styles.text}>Good luck, {params.player}!</Text>
                        <View style={{alignSelf: 'center'}}>
                            <Text>Watch the time!</Text>
                            <Time />
                        </View>
                            <BoardTemp />
                        <View style={styles.buttonOrganizer}>
                            <View style={styles.buttonGame}>
                                <Button 
                                    title="Validate"
                                    color="forestgreen"
                                    disabled={autoSolveStat}
                                    onPress={() => handleValidate()}
                                />
                            </View>
                            <View style={styles.buttonGame}>
                                <Button 
                                    title="Auto-solve"
                                    color="darkblue"
                                    onPress={() => handleSolve()}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonOrganizer}>
                            <View style={styles.buttonGame}>
                                <Button 
                                    title="Reload"
                                    color="darkslategrey"
                                    onPress={() => handleGenerate()}
                                />
                            </View>
                            <View style={styles.buttonGame}>
                                <Button 
                                    title="Surrender"
                                    color="firebrick"
                                    onPress={() => handleSurrender()}
                                />
                            </View>
                        </View>
                    </View>
                )
            }
        </ScrollView>
        <ModalTemp />
        </>
    )
}

// const widthHeight = (Dimensions.get('window').width - 40) / 9
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonGame: {
        marginTop: 20,
        width: 120,
    },
    buttonOrganizer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold'
    },
    rowButton: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    boardDirection: {
        flexDirection: 'row',
    },
    board: {
        borderLeftColor: 'black',
        borderRightColor: 'black',
        borderTopColor: 'black',
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderTopWidth: 3,
    },
    boardeless: {
        borderRightColor: 'black',
        borderLeftColor: 'black',
        borderLeftWidth: 3,
        borderRightWidth: 3,
    },
    boardBottom: {
        borderBottomColor: 'black',
        borderRightColor: 'black',
        borderLeftColor: 'black',
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderBottomWidth: 3,
    },
    input: {
        borderColor: 'black',
        borderWidth: 0.5,
        width: 35,
        height: 35,
        fontSize: 25,
        textAlign: 'center',
        flexDirection: 'column'
    },
    inputBorder: {
        borderRightColor: 'black',
        borderRightWidth: 3,
    },
  });

export default Game