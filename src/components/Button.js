import { StyleSheet, View, Pressable, Text } from "react-native";
import colors from "../utils/colors";

export default function Button({ label, onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 250,
    height: 68,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    backgroundColor: colors.primary_color,
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: colors.background_color,
    fontSize: 16,
    fontWeight: "bold",
  },
});
