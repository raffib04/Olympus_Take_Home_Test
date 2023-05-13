import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth } from "../firebase";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Hi, {auth.currentUser?.displayName}</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Signout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "black",
        width: "50%",
        padding: 15,
        marginTop: 5,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#E6C466",
        fontSize: 25,
        fontWeight: "700",
    },
});
