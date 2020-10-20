import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from './components/header';
import StartGameScreen from './screens/startGameScreen';
import GameScreen from './screens/gameScreen';

export default function App() {
    const [userNumber, setUserNumber] = useState();

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
    };

    let content = <StartGameScreen onStartGame={startGameHandler} />;

    if (userNumber) {
        content = <GameScreen userChoice={userNumber}/>
    }

    return (
        <View style={styles.screen}>
            <Header title='Guess a Number'/>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
