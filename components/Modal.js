import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { resetStat, setModalStat } from '../store/actions/sudokuAction';
import { useDispatch } from 'react-redux';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

const ModalTemp = () => {
    const { solveStat, modalStat } = useSelector((state) => state.sudokuReducer)
    const dispatch = useDispatch()
    const modalVisibleStat = () => {
        dispatch(setModalStat(false))
        dispatch(resetStat(''))
    }

    return (
        <View>
            <Modal
                animationType="slide"
                visible={modalStat}
                onRequestClose={() => modalVisibleStat()}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {
                        solveStat === 'unsolved' ? (
                            <>
                            <View>
                                <Text style={{...styles.modalText, marginBottom: 20}}>Your movements seems right.</Text>
                                <Text style={styles.modalText}>Keep up the good work!</Text>
                            </View>
                            </>
                        ) : solveStat === 'broken' && (
                            <>
                            <View>
                                <Text style={{...styles.modalText, marginBottom: 20}}>It's broken! You place the same number!</Text>
                                <Text style={styles.modalText}>Keep fighting! \^0^/</Text>
                            </View>
                            </>
                        ) 
                    }
                    <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: solveStat === 'broken' ? 'grey' : 'firebrick' }}
                                onPress={() =>  modalVisibleStat()}
                                >
                                <Text style={styles.textStyle}>Close</Text>
                    </TouchableHighlight>
                </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        width: 100,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default ModalTemp;
