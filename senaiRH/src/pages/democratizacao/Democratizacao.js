import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function Democratizacao() {

    const baseUrl = 'https://api.github.com';
    const perPage = 10;

    const [data, setData] = useState([
    ]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadApi();
    }, []);

    async function loadApi() {
        if (loading) return;

        setLoading(true);

        const response = await axios.get(`${baseUrl}/search/repositories?q=react&per_page=${perPage}&page=${page}`);

        setData([...data, ...response.data.items]);
        setPage(page + 1);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <FlatList style={{ marginTop: 35 }}
                contentContainerStyle={{ marginHorizontal: 20 }}
                data={data}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <ListItem data={item} />}
                onEndReached={loadApi}
                onEndReachedThreshold={0.15}
                ListFooterComponent={<FooterList load={loading} />} />
        </View>
    );
}

function ListItem({ data }) {
    return (
        <View style={styles.listItem}>
            <Text style={styles.listText}>{data.full_name}</Text>
        </View>
    )
}

function FooterList({ load }) {
    if ( ! load) return null; 
    return (
        <View style={styles.loading}>
            <ActivityIndicator size={25} color='#121212'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listItem: {
        // backgroundColor: '#C20004',
        padding: 25,
        marginTop: 20,
        borderRadius: 10,
        borderColor: '#C20004',
        borderWidth: 2,
    },
    listText: {
        fontSize: 16,
        color: 'black'
    },
    loading: {
        padding: 10,
        marginBottom: 15
    }
});