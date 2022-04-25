import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

export default function TesteModal() {
  const modalRef = useRef(null);
  const Tab = createBottomTabNavigator();

  // function ButtonNew({ size, color }) {
    const RGNH = gestureHandlerRootHOC(() => (
      <View style={StyleSheet.container}>
        <TouchableOpacity>
          <Entypo name="plus" color={color} size={size} />
        </TouchableOpacity>

        <Modalize ref={modalRef} snapPoint={180}>
          <View
            style={{
              flex: 1,
              height: 100,
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <TouchableOpacity>
              <Text>editar</Text>
            </TouchableOpacity>
          </View>
        </Modalize>
      </View>
    ));
  // }

  return (
    <View style={StyleSheet.container}>
      <TouchableOpacity>
        <Entypo name="plus" color={color} size={size} />
      </TouchableOpacity>

      <Modalize ref={modalRef} snapPoint={180}>
        <RGNH />
        <View
          style={{
            flex: 1,
            height: 100,
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <TouchableOpacity>
            <Text>editar</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
}
