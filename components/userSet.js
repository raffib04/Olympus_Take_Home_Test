import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Dropdown from "./DropDown";
import Swipeable from "react-native-swipeable";

const UserSet = (props) => {
    const [selectedTag, setSelectedTag] = useState(null);
    const data = [
        { label: "Warmup", value: "tag1" },
        { label: "Working Set", value: "tag2" },
        { label: "Drop Set", value: "tag3" },
        { label: "Burnout", value: "tag4" },
        { label: "Max Attempt", value: "tag5" },
        { label: "Assisted", value: "tag6" },
        { label: "Negatives", value: "tag7" },
    ];

    const handleTagSelect = (item) => {
        setSelectedTag(item);
    };

    return (
        <View style={styles.item}>
            <View style={styles.row}>
                <View style={styles.weight}>
                    <TextInput
                        style={[
                            styles.weightText,
                            { color: "#8D8D9C", textAlign: "center" },
                        ]}
                        placeholderTextColor='#8D8D9C'
                        maxLength={4}
                    >
                        {props.text}
                    </TextInput>
                </View>
                <View style={styles.reps}>
                    <TextInput
                        style={[
                            styles.weightReps,
                            { color: "#8D8D9C", textAlign: "center" },
                        ]}
                        placeholderTextColor='#8D8D9C'
                        maxLength={3}
                    >
                        {props.text}
                    </TextInput>
                </View>
                <View style={styles.rpe}>
                    <TextInput
                        style={[
                            styles.weightRPE,
                            { color: "#8D8D9C", textAlign: "center" },
                        ]}
                        placeholderTextColor='#8D8D9C'
                        maxLength={2}
                    >
                        {props.text}
                    </TextInput>
                </View>
            </View>
            <View style={styles.tag}>
                <Dropdown
                    label={"Tag"}
                    data={data}
                    onSelect={handleTagSelect}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    row: {
        flexDirection: "row",
    },
    weight: {
        marginRight: 10,
        backgroundColor: "#232329",
        borderRadius: 5,
        paddingBottom: 3,
    },
    weightText: {
        borderColor: "#ccc",
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 14,
        width: 60,
        height: 40,
        justifyContent: "center",
        borderBottomWidth: 1,
    },
    reps: {
        marginRight: 10,
    },
    weightReps: {
        borderRadius: 5,
        fontSize: 14,
        width: 45,
        height: 40,
        backgroundColor: "#232329",
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },
    rpe: {},
    weightRPE: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 14,
        width: 35,
        height: 40,
        backgroundColor: "#232329",
        borderRadius: 5,
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },
    tag: {
        width: "40%",
    },
});

export default UserSet;
