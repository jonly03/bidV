import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

import { _FILTERS_TYPES } from "../utils/constants";

export default function Stock({
  name,
  projectedFantasyPoints,
  actualFantasyPoints,
  lastTradePrice,
  image_url,
  activeFilter,
}) {
  return (
    <View style={styles.stock}>
      <Image style={styles.photo} source={{ uri: image_url }} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.statsContainer}>
        <Text>{`Last Trade Price: `}</Text>
        <Text
          style={{
            textDecorationLine:
              activeFilter === _FILTERS_TYPES.last_price ? "underline" : "none",
          }}
        >{`$${lastTradePrice}`}</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text>{`Project Fantasy Points: `}</Text>
        <Text
          style={{
            textDecorationLine:
              activeFilter === _FILTERS_TYPES.fantasy_points_projected
                ? "underline"
                : "none",
          }}
        >
          {projectedFantasyPoints}
        </Text>
      </View>
      <View style={styles.statsContainer}>
        <Text>{`Actual Fantasy Points: `}</Text>
        <Text
          style={{
            textDecorationLine:
              activeFilter === _FILTERS_TYPES.fantasy_points_scored
                ? "underline"
                : "none",
          }}
        >
          {actualFantasyPoints}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stock: {
    flex: 1,
    alignItems: "center",
    borderColor: "#666",
    margin: 2,
  },
  photo: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  name: {
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
  },
});
