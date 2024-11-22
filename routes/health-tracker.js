import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, FlatList, Button } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const foodItems = [
    { label: "Avocado", calories: 263, brand: 'Trader Joes, 1' },
    { label: "Meat Lovers Pizza", calories: 75, brand: 'Dominos, 1 slice' },
    { label: "Piece of Toast", calories: 60, brand: 'Wonder, 1' }
];

const FoodItem = ({ item }) => {
    return (
        <View style={styles.foodItem}>
            <View style={styles.foodDetails}>
                <Text style={styles.foodTitle}>{item.label}</Text>
                <Text style={styles.foodSubtitle}>{item.calories} cal, {item.brand}</Text>
            </View>
            <AntDesign name="plussquare" size={40} color="midnightblue" />
        </View>
    )
}

const HealthTracker = () => {
    const [search, setSearch] = useState('');

    const performSearch = () => {
        // setSearch(''); // Clears the search input after the search is performed
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search Food Item..."
                style={styles.input}
            />
            {/* <Button title="Search" onPress={performSearch} /> */}
            <FlatList
                data={foodItems}
                renderItem={({ item }) => {
                    if (search == ""|| item["label"].includes(search)) {
                        return <FoodItem item={item} />
                    }
                }}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

export default HealthTracker;

// Styles
const styles = StyleSheet.create({
    input: {
        backgroundColor: 'lavender',
        padding: 10,
        borderRadius: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#whitesmoke',
        paddingTop: 70,
        paddingHorizontal: 10,
    },
    flatListContent: {
        alignItems: 'center',
    },
    foodItem: {
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: '90%',
    },
    foodTitle: {
        color: 'midnightblue',
        fontWeight: 'bold',
        fontSize: 20,
    },
    foodSubtitle: {
        color: 'darkgray',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
