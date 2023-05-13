import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                console.log("User signed out");
                navigation.navigate("Login");
            })
            .catch((error) => alert(error.message));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.greetingText}>
                Hi, {auth.currentUser?.displayName}
            </Text>
            <Text style={styles.exerciseHeader}> Exercise Name </Text>
            <TextInput
                placeholder='Exercise'
                placeholderTextColor='#E6C466'
                color='#E6C466'
                style={styles.exerciseInput}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Signout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        margin: 20,
    },
    button: {
        backgroundColor: "black",
        width: "40%",
        padding: 15,
        borderRadius: 20,
        alignItems: "center",
        position: "absolute", // Add position absolute to allow bottom and left position
        bottom: "2%", // Set bottom position
        left: "60%", // Set left position
    },
    buttonText: {
        color: "#E6C466",
        fontSize: 15,
        fontWeight: "700",
    },
    greetingText: {
        fontSize: 20, // Add font size to make it more readable
        fontWeight: "700",
        marginTop: 40,
        marginLeft: 10, // Add margin to give some space between the text and the button
    },
    exerciseInput: {
        backgroundColor: "black",
        position: "absolute", // Add position absolute to allow bottom and left position
        bottom: "84%", // Set bottom position
        left: "6%", // Set left position
        width: "80%",
        height: "5%",
    },
    exerciseHeader: {
        position: "absolute", // Add position absolute to allow bottom and left position
        bottom: "5%", // Set bottom position
        left: "60%", // Set left position
    },
});
