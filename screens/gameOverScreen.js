import React from "react";
import { View, Image, StyleSheet, Button, Text } from "react-native";
import BodyText from "../components/bodyText";
import colors from '../constants/colors';
import MainButtom from '../components/mainButton';

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <BodyText style={styles.title}>The Game is Over!</BodyText>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image} 
                    source={require("../assets/success.png")} 
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the 
                    number <Text style={styles.highlight}>{props.userNumber}</Text>.
                </BodyText>
            </View>
            <MainButtom onPress={props.onRestart}>
                NEW GAME
            </MainButtom>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
    },
    imageContainer: {
        width: "80%",
        height: 300,
        borderRadius: 150,
        borderColor: '#000',
        borderWidth: 3,
        overflow: 'hidden',
        marginVertical: 20
    },
    image: {
        width: "100%",
        height: "100%",
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 10
    },
    highlight: {
        color: colors.primary
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    }
});

export default GameOverScreen;
