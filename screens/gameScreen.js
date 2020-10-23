import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView, Text } from "react-native";
import NumberContainer from '../components/numberContainer';
import Card from '../components/card';
import MainButton from '../components/mainButton';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import BodyText from '../components/bodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, index) => {
    return (
        <View key={index} style={styles.listItem}>
            <BodyText>#{index}</BodyText>
            <BodyText>
                {value}
            </BodyText>
        </View>
    )
};

const GameScreen = (props) => {
    const {userChoice, onGameOver} = props;
    const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPathGuesses] = useState([initialGuess]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < userChoice) || 
            (direction === 'greater' && currentGuess > userChoice)
        ) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomBetween(
            currentLow.current, 
            currentHigh.current, 
            currentGuess
        )
        setCurrentGuess(nextNumber);
        setPathGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    }

    return (
        <View style={styles.screen}>
            <BodyText style={styles.text}>Opponent's Guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton style={styles.button} onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name='md-remove' size={24} color='#fff'/>
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name='md-add' size={24} color='#fff'/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '90%'
    },
    button: {
        backgroundColor: colors.accent
    },
    text: {
        fontSize: 18
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        margin: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    },
    listContainer: {
        flex: 1,
        width: '80%',
        marginTop: 15
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

export default GameScreen;
