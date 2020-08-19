import React from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const BoardTemp = () => {
    const { boardDifficulty, board } = useSelector((state) => state.sudokuReducer)

    const handleChange = (text, index, col) => {
        board[index][col] = Number(text)
    }

    return (
        <>
            {
                boardDifficulty.map((array, index) => (
                    <View key={index} style={[
                        styles.boardDirection, 
                        (index % 3 === 0 ? styles.board : styles.boardeless),
                        (index === array.length-1 && styles.boardBottom)
                        ]}>
                        {
                        array.map((board, col) => (
                            <TextInput 
                            keyboardType='number-pad'
                            editable={!board && true}
                            key={col} 
                            maxLength={1}
                            style={[styles.input, 
                                col === 2 && styles.inputBorder, 
                                col === 5 && styles.inputBorder,
                                board && {...styles.input, backgroundColor: 'burlywood'}
                            ]} 
                            defaultValue={!board ? '':board.toString()}
                            onChangeText={text => handleChange(text, index, col)} />
                        ))
                        }
                    </View>
                ))
            }
        </>
    )
}

const widthHeight = (Dimensions.get('window').width - 40) / 9
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
        width: widthHeight,
        height: widthHeight,
        fontSize: 25,
        textAlign: 'center',
        flexDirection: 'column'
    },
    inputBorder: {
        borderRightColor: 'black',
        borderRightWidth: 3,
    },
  });

export default BoardTemp