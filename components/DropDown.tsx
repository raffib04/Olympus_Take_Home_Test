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

    const toggleDropdown = (): void => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = (): void => {
        DropdownButton.current?.measureInWindow((x, y, width, height) => {
            setDropdownTop(y + height);
        });
        setVisible(true);
    };
    const onItemPress = (item): void => {
        setSelected(item);
        setVisible(false); // close the dropdown
        onSelect(item);
    };

    const renderItem = ({ item }): ReactElement<any, any> => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <Text>{item.label}</Text>
        </TouchableOpacity>
    );

    const renderDropdown = (): ReactElement<any, any> => {
        return (
            <Modal visible={visible} transparent animationType='none'>
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setVisible(false)} // fix here
                >
                    <View style={[styles.dropdown, { top: dropdownTop }]}>
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
                <Text style={styles.buttonText}>
                    {(selected && selected.label) || label}
                </Text>
                <Icon
                    style={styles.icon}
                    type='font-awesome'
                    name='chevron-down'
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
        backgroundColor: "#efefef",
        height: 50,
        zIndex: 1,
    },
    buttonText: {
        flex: 1,
        textAlign: "center",
    },
    icon: {
        marginRight: 10,
    },
    dropdown: {
        position: "absolute",
        backgroundColor: "#fff",
        width: "30%",
        shadowColor: "#000000",
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
    },
    overlay: {
        width: "100%",
        height: "100%",
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
});

export default Dropdown;
