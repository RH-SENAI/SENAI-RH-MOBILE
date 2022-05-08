import react from "react";
import { View, StyleSheet } from 'react-native';
import { PieChart, LineChart, YAxis, Grid } from 'react-native-svg-charts';
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


    const data3 = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    const contentInset = { top: 20, bottom: 20 }

    return (
        <View style={styles.container}>
            <PieChart style={styles.pieChart} data={pieData}>
                <Label />
            </PieChart>
            <PieChart style={styles.pieChart} data={pieData2}>
                <Label />
            </PieChart>
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={data3}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}ºC`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={data3}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={contentInset}
                >
                    <Grid />
                </LineChart>
            </View>
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