import React, { FC, ReactElement, useRef, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    View,
} from "react-native";
import { Icon } from "react-native-elements";

interface Props {
    label: string;
    data: Array<{ label: string; value: string }>;
    onSelect: (item: { label: string; value: string }) => void;
}

const Dropdown: FC<Props> = ({ label, data, onSelect }) => {
    const DropdownButton = useRef<TouchableOpacity>(null);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<{
        label: string;
        value: string;
    } | null>(null);
    const [dropdownTop, setDropdownTop] = useState(0);
    const [dropdownLeft, setDropdownLeft] = useState(0);

    const toggleDropdown = (): void => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = (): void => {
        DropdownButton.current?.measureInWindow((x, y, width, height) => {
            setDropdownTop(y + height - 6);
            setDropdownLeft(x + 7);
        });
        setTimeout(() => {
            setVisible(true);
        }, 1);
    };

    const closeDropdown = (): void => {
        setVisible(false);
    };

    const onItemPress = (item): void => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item, index }): ReactElement<any, any> => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <View
                style={[
                    styles.colorLine,
                    {
                        backgroundColor: COLORS[index],
                        marginLeft: 10,
                        width: 2,
                        height: "80%",
                        marginTop: "4%",
                        borderRadius: 10,
                    },
                ]}
            />
            <Text style={{ color: "#8D8D9C", textAlign: "center" }}>
                {item.label}
            </Text>
        </TouchableOpacity>
    );

    const COLORS = [
        "#FF6565",
        "#FFA34E",
        "#B5E191",
        "#54BE98",
        "#4180CA",
        "#9B61E4",
        "#D05ECC",
    ];

    const renderDropdown = (): ReactElement<any, any> => {
        return (
            <Modal visible={visible} transparent animationType='none'>
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => closeDropdown()}
                >
                    <View
                        style={[
                            styles.dropdown,
                            { top: dropdownTop, left: dropdownLeft },
                        ]}
                    >
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <>
            <TouchableOpacity
                ref={DropdownButton}
                style={styles.button}
                onPress={toggleDropdown}
            >
                <View style={styles.buttonLine} />
                <Text style={styles.buttonText}>
                    {(selected && selected.label) || label}
                </Text>
                <Icon
                    style={styles.icon}
                    type='font-awesome'
                    name={visible ? "chevron-down" : "chevron-left"}
                    size={12}
                    color='#8D8D9C'
                />
            </TouchableOpacity>
            {renderDropdown()}
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#232329",
        height: 38,
        zIndex: 1,
        borderRadius: 5,
        right: 10,
    },
    buttonText: {
        flex: 1,
        textAlign: "center",
        color: "#8D8D9C",
    },
    buttonLine: {
        backgroundColor: "#8D8D9C",
        height: 1.3,
        position: "absolute",
        bottom: 1,
        width: "90%",
        marginBottom: 6,
        marginLeft: "6%",
    },

    icon: {
        marginRight: 10,
        color: "#8D8D9C",
    },

    dropdown: {
        position: "absolute",
        backgroundColor: "#232329",
        width: "28%",
        shadowColor: "#000000",
        shadowRadius: 4,
        shadowOffset: { height: 4, width: -4 },
        shadowOpacity: 0.5,
        paddingBottom: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    overlay: {
        width: "100%",
        height: "80%",
    },
    item: {
        paddingHorizontal: 2,
        paddingLeft: 14,
        paddingVertical: 3.5,
    },
    colorLine: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 100,
    },
});

export default Dropdown;
