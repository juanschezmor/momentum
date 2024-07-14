import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import colors from "../utils/colors";

const { width } = Dimensions.get("window");

const GroupCard = ({ group }) => {
  return (
    <View key={group.id} style={styles.groupContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: group.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupDescription}>{group.description}</Text>
      </View>
    </View>
  );
};

export default GroupCard;

const styles = StyleSheet.create({
  groupContainer: {
    width: width * 0.8, // 80% del ancho de la pantalla
    height: 450,
    padding: 15,
    flexDirection: "column",
    backgroundColor: colors.primary_color,
    borderRadius: 15,
    marginVertical: 10,
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.silver,
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    padding: 10,
  },
  groupName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.charcoal,
  },
  groupDescription: {
    fontSize: 16,
    color: colors.dark_gray,
  },
});
