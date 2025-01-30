// components/TopicList.js
import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TopicList = ({ topics, onTopicPress }) => {
    return (
        <FlatList
            data={topics}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.topicItem}
                    onPress={() => onTopicPress(item.id, item.name)}
                >
                    <Text style={styles.topicText}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    topicItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#f9f9f9',
    },
    topicText: {
        fontSize: 16,
    },
});

export default TopicList;