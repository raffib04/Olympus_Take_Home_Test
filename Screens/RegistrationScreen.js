import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from "firebase/auth";

const RegistrationScreen = () => {
    const navigation = useNavigation(); // for use in navigating pages

    const redirectToLogin = () => {
        navigation.navigate("Login");
    };

    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");

    const validatePassword = () => {
        if (password.length < 8) {
            return "Password must be at least 8 characters";
        }
        if (password !== passwordConfirm) {
            return "Passwords do not match";
        }
        return "";
    };

    const register = async (e) => {
        //check if password is valid
        e.preventDefault();
        const passwordError = validatePassword();
        if (passwordError) {
            setError(passwordError);
            return;
        }
        setError("");
        console.log("Attempting to register user");

        // Create a new user with email and password using firebase
        const auth = getAuth();
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Update user profile with name
            await updateProfile(user, {
                displayName: name,
            });

            console.log(
                "User registered successfully:",
                user.displayName,
                user
            );
        } catch (error) {
            console.log("Error registering user:", error.message);
            if (error.message.includes("already in use")) {
                setError("Email is already in use");
                setEmail("");
                return;
            } else {
                setError("");
            }
        }

        setPassword("");
        setPasswordConfirm("");
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={styles.headings}>
                <Text style={styles.headingText}> OLYMPUS </Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Name'
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                    placeholderTextColor='#E6C466'
                />
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    placeholderTextColor='#E6C466'
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    placeholderTextColor='#E6C466'
                    secureTextEntry
                />
                <TextInput
                    placeholder='Password Confirmation'
                    value={passwordConfirm}
                    onChangeText={(text) => setPasswordConfirm(text)}
                    style={styles.input}
                    placeholderTextColor='#E6C466'
                    secureTextEntry
                />

                {error !== "" && <Text style={styles.errorText}>{error}</Text>}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={register} style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonReturnSignUp}
                        onPress={redirectToLogin}
                    >
                        <Text style={styles.buttonText}>
                            Already Have an Account? Log In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#19191C",
    },
    headings: {
        width: "70%",
        backgroundColor: "grey",
    },
    headingText: {
        color: "#E6C466",
        fontSize: 50,
        fontWeight: "600",
        backgroundColor: "#19191C",
    },
    inputContainer: {
        paddingVertical: "15%",
        width: "78%",
    },
    input: {
        backgroundColor: "black",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 5,
        color: "#E6C466",
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: "10%",
    },
    button: {
        backgroundColor: "black",
        width: "100%",
        padding: 15,
        marginTop: 5,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonReturnSignUp: {
        backgroundColor: "black",
        width: "150%",
        padding: 15,
        marginTop: 5,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#E6C466",
    },
    errorText: {
        color: "red",
        fontSize: 15,
        marginTop: 10,
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
});
