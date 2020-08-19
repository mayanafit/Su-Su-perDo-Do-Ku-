import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBoardDifficulty, resetBoard, setTime } from '../store/actions/sudokuAction';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import Constant from 'expo-constants';

const Home = ({navigation}) => {
    const widthApp = {
        width: window.width
    }
    const [statDifButton, setStatDifButton] = useState({
        easy: false, medium: false, hard: false, random: false
    })
    const [statDif, setStatDif] = useState(``)
    const [playerName, setPlayerName] = useState(``)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTime(false))
    }, []) 
    
    const buttonData = [
        {
            title: 'easy',
            color: 'green',
            disabled: statDifButton.easy
        },
        {
            title: 'medium',
            color: 'darkgrey',
            disabled: statDifButton.medium
        },
        {
            title: 'hard',
            color: 'maroon',
            disabled: statDifButton.hard
        },
        {
            title: 'random',
            color: 'darkblue',
            disabled: statDifButton.random
        },
    ]
    const handleDifficulty = (difficulty) => {
        setStatDif(difficulty)
        if (difficulty === `easy`) {
            setStatDifButton({
                easy: true, medium: false, hard: false, random: false
            })
        } else if (difficulty === `medium`) {
            setStatDifButton({
                easy: false, medium: true, hard: false, random: false
            })
        } else if (difficulty === 'hard') {
            setStatDifButton({
                easy: false, medium: false, hard: true, random: false
            })
        } else {
            setStatDifButton({
                easy: false, medium: false, hard: false, random: true
            })
        }
    }
    const handlePlay = () => {
        if (!playerName) {
            return alert(`Please fill your name first!`)
        }
        else if (!statDif) {
            return alert(`Choose difficulty to start the game!`)
        }
        else {
            dispatch(resetBoard())
            dispatch(setBoardDifficulty(statDif))
            navigation.navigate('Game', {
                player: playerName,
                mode: statDif
            })
            setPlayerName(``)
            setStatDifButton({
                easy: false, medium: false, hard: false, random: false
            })
        }
    }
    return (
        <View style={[styles.container, widthApp]}>
            <Text style={styles.titleGame}>Super(Su)Do(Do)(Ku)</Text>
            <Text style={styles.labelName}>Lets Begin!</Text>
            <TextInput style={styles.inputStyle} onChangeText={name => setPlayerName(name)}
            placeholder="Your name.." value={playerName}
            />
            <View style={styles.buttonColumn}>
                <Text style={styles.text}>Select Difficulty</Text>
                <View style={styles.rowButton}>
                    {
                        buttonData.map((button, index) => (
                            <Button key={index}
                                title={button.title}
                                disabled={button.disabled}
                                color={button.color}
                                onPress={() => handleDifficulty(button.title)}
                            />
                        ))
                    }
                </View>
            </View>
            <View style={styles.buttonPlay}>
                <Button 
                    style={styles.buttonFont}
                    title="PLAY!"
                    color="black"
                    onPress={() => handlePlay()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constant.statusBarHeight
    },
    titleGame: {
        fontSize: 30,
        marginVertical: 10,
        fontWeight: 'bold'
    },
    labelName: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 30,
        fontWeight: 'bold'
    },
    inputStyle: {
        fontSize: 20,
        alignSelf: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        textAlign: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    rowButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
        marginVertical: 20,
    },
    buttonColumn: {
        marginTop: 50,
        marginBottom: 30,
        alignItems: 'center',
    },
    buttonPlay: {
        marginBottom: 20,
        alignSelf: "center",
        width: 100,
    },
    buttonFont: {
        fontSize: 100,
    }
})

export default Home