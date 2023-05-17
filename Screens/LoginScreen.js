import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth } from "../firebase";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        if (route.name === "Home") {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    navigation.navigate("Home");
                }
            });

            return unsubscribe; // Unsubscribe the listener when leaving the home page
        }
    }, [navigation, route]);

    const redirectToRegistration = () => {
        navigation.navigate("Registration");
    };

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Logged in:", user.email);
                console.log("Logged in:", user.displayName);
                // Update the user's display name

                navigation.navigate("Home");
            })
            .catch((error) => alert(error.message));
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={styles.headings}>
                <Text style={styles.headingText}> OLYMPUS </Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    placeholderTextColor='#E6C466'
                    color='#E6C466'
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    placeholderTextColor='#E6C466'
                    color='#E6C466'
                    secureTextEntry
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}> Log In </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={redirectToRegistration}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#19191C",
    },
    inputContainer: {
        width: "78%",
    },
    input: {
        backgroundColor: "black",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: "15%",
    },
    button: {
        backgroundColor: "black",
        width: "100%",
        padding: 15,
        marginTop: 5,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 10,
        borderColor: "#0782F9",
        borderWidth: 0,
    },
    buttonText: {
        color: "#E6C466",
        fontSize: 25,
        fontWeight: "700",
    },
    headings: {
        paddingBottom: 50,
    },
    headingText: {
        color: "#E6C466",
        fontSize: 50,
        fontWeight: "600",
    },
});
