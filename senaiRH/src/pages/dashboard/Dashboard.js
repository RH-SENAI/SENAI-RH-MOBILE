import react from "react";
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg'

export default function Dashboard() {

    const data = [7, 3, 4, 6];
    const pieData = data.map((value, index) => ({
        value,
        key: `${index}-${value}`,
        svg: {
            //fill: '#FF0000'
            fill: (
                '#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000'
            ).slice(0, 7)
        }
    }));


    const data2 = [7, 3];
    const pieData2 = data2.map((value, index) => ({
        value,
        key: `${index}-${value}`,
        svg: {
            //fill: '#FF0000'
            fill: (
                '#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000'
            ).slice(0, 7)
        }
    }));

    const Label = ({ slices }) => {
        return slices.map((slice, index) => {
            const { pieCentroid, data } = slice;
            return (
                <Text
                    key={`label -${index}`}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill="black"
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={22}
                >
                    {data.value}
                </Text>
            )
        })
    }
    return (
        <View style={styles.container}>
            <PieChart style={styles.pieChart} data={pieData}>
                <Label />
            </PieChart>
            <PieChart style={styles.pieChart} data={pieData2}>
                <Label />
            </PieChart>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    pieChart: {
        //backgroundColor: 'green',
        height: 200,
        justifyContent: 'center',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});