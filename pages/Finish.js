import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetStat } from '../store/actions/sudokuAction';

const formatNumber = number => `0${number}`.slice(-2);
const timeResult = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

const Finish = ({route: {params}, navigation}) => {
    const dispatch = useDispatch()
    const { time } = useSelector((state) => state.sudokuReducer)
    // console.log(time, `ini timenya`)
    const { mins, secs } = timeResult(time);
    const handleHome = () => {
        dispatch(resetStat(``))        
        navigation.navigate(`Home`)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>You made it, {params.player}!</Text>
            <Text style={{...styles.text, marginBottom: 20}}>Your time: {`${mins}:${secs}`}</Text>
            <Button 
                title="Return to Home"
                color="black"
                onPress={() => handleHome()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold'
    }
  });

export default Finish