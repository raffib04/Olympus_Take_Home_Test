import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import UserSet from "../components/userSet";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [sets, setSets] = useState([<UserSet key={0} />]);

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                console.log("User signed out");
                navigation.navigate("Login");
            })
            .catch((error) => alert(error.message));
    };

    const handleAddSet = () => {
        setSets([...sets, <UserSet key={sets.length} />]);
    };

    const handleRemoveSet = () => {
        const newSets = [...sets];
        newSets.pop();
        setSets(newSets);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text
                style={[
                    styles.exerciseHeader,
                    { left: "8%" },
                    { bottom: "85%" },
                    { color: "#8D8D9C" },
                    { fontWeight: "500" },
                ]}
            >
                Exercise Name
            </Text>
            <Text style={[styles.exerciseHeader, { left: "13.5%" }]}>
                WEIGHT
            </Text>
            <Text style={[styles.exerciseHeader, { left: "31.5%" }]}>REPS</Text>
            <Text style={[styles.exerciseHeader, { left: "46%" }]}>RPE</Text>
            <Text style={[styles.exerciseHeader, { left: "65%" }]}>TAG</Text>

            <Text style={styles.greetingText}>
                Hi, {auth.currentUser?.displayName}
            </Text>
            <TextInput
                placeholder='Exercise'
                placeholderTextColor='#E6C466'
                color='#E6C466'
                style={styles.exerciseInput}
            />
            <View style={styles.userSet}>{sets}</View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddSet}>
                <Text style={styles.addButtonText}>+ Add Set</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={handleRemoveSet}
            >
                <Text style={styles.removeButtonText}>- Remove Set</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Signout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#19191C",
    },
    button: {
        backgroundColor: "#232329",
        width: "30%",
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        position: "absolute",
        bottom: "88.9%",
        right: "5%",
    },
    buttonText: {
        color: "#E6C466",
        fontSize: 15,
        fontWeight: "700",
    },
    greetingText: {
        fontSize: 25,
        fontWeight: "800",
        marginTop: "15%",
        marginLeft: "8%",
        color: "white",
    },
    exerciseInput: {
        backgroundColor: "#19191C",
        position: "absolute",
        bottom: "80%",
        left: "6%",
        width: "80%",
        height: "4%",
        marginLeft: "2.5%",
        borderBottomColor: "#8D8D9C",
        borderBottomWidth: 2,
        fontSize: 17,
        fontWeight: "400",
    },
    exerciseHeader: {
        position: "absolute",
        bottom: "76.8%",
        left: "10.7%",
        color: "white",
        zIndex: 1,
        fontWeight: "800",
        fontSize: 12,
    },

    userSet: {
        marginTop: "28%",
        marginLeft: "10%",
    },
    addButton: {
        backgroundColor: "#E6C466",
        width: "80%",
        padding: "1%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1%",
        marginLeft: "10%",
    },
    addButtonText: {
        color: "black",
        fontSize: 15,
        fontWeight: "700",
    },
    removeButton: {
        backgroundColor: "#FF6B6B",
        width: "80%",
        padding: "1%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1%",
        marginLeft: "10%",
    },
    removeButtonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "700",
    },
});
