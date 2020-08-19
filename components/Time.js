import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTimeResult } from '../store/actions/sudokuAction';
import { StyleSheet, Text, View } from 'react-native';


const formatNumber = number => `0${number}`.slice(-2);
const timeResult = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

const Time = () => {
    const dispatch = useDispatch()
    const { timeStart } = useSelector((state) => state.sudokuReducer)
    const [timeSeconds, setTimeSeconds] = useState(0);
    const { mins, secs } = timeResult(timeSeconds);
    //console.log(timeSeconds, `ini menitnya`)
    // console.log(mins, secs, `ini minutes seconds`)
    useEffect(() => {
        let interval = null;
        if (timeStart) {
            interval = setInterval(() => {
                setTimeSeconds(timeSeconds => timeSeconds + 1);
            }, 1000);
        } else if (!timeStart && timeSeconds !== 0) {
            clearInterval(interval);
            dispatch(setTimeResult(timeSeconds))
        }
        return () => clearInterval(interval);
    }, [timeSeconds, timeStart]);

    return (
        <View style={{alignSelf: 'center'}}>
            <Text style={styles.timer}>{`${mins}:${secs}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  timer: {
      color: 'black',
      fontSize: 20,
      marginBottom: 20
  },
});

export default Time
