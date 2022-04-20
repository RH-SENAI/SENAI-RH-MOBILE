import react from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function NovoFeedback() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Novo Feedback</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});