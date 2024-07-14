import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import colors from "../utils/colors";
import { createGroup } from "../redux/groupsSlice";
import { useDispatch } from "react-redux";

export default function AddGroupModal({ isVisible, onClose, user }) {
  const dispatch = useDispatch();
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
    members: null,
    imageUrl: null,
  });

  const [imageUri, setImageUri] = useState(null);

  // Función para seleccionar una imagen de la galería
  const pickImageAsync = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setImageUri(result.assets[0].uri);
      } else {
        alert("Image selection cancelled");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick an image. Please try again.");
    }
  };

  const handleAddGroup = async () => {
    try {
      let newGroup = { ...newGroupData };
      if (user) {
        newGroup = { ...newGroupData, members: [user.id] };
      }
      if (imageUri) {
        newGroup = { ...newGroupData, imageUrl: imageUri };
      }

      dispatch(createGroup(newGroup));
      setImageUri(null);
      onClose();
    } catch (error) {
      console.error("Error adding group:", error);
      Alert.alert("Error", "Failed to add group. Please try again.");
    }
  };

  const handleCloseButton = () => {
    setImageUri(null);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Add a new group</Text>
            <Pressable style={styles.closeBtn} onPress={handleCloseButton}>
              <Text style={styles.closeBtnText}>x</Text>
            </Pressable>
          </View>
          <View style={styles.modalForm}>
            <View style={styles.imageContainer}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
              ) : (
                <Image
                  source={require("../assets/default_image.png")}
                  style={styles.image}
                />
              )}
              <View style={styles.imageButton}>
                <Pressable
                  style={styles.imagePickerBtn}
                  onPress={pickImageAsync}
                >
                  <Image
                    source={require("../assets/add_image.png")}
                    style={styles.imagePickerBtnImage}
                  />
                </Pressable>
              </View>
            </View>

            <View style={styles.inputLabel}>
              <Text>Name</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Group Name"
                placeholderTextColor={colors.gray}
                onChangeText={(text) =>
                  setNewGroupData((prevState) => ({
                    ...prevState,
                    name: text,
                  }))
                }
              />
            </View>
            <View style={styles.inputLabel}>
              <Text>Description</Text>
            </View>
            <View style={styles.inputTextarea}>
              <TextInput
                style={styles.inputText}
                placeholder="Group Description"
                placeholderTextColor={colors.gray}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) =>
                  setNewGroupData((prevState) => ({
                    ...prevState,
                    description: text,
                  }))
                }
              />
            </View>

            <View style={styles.addGroupBtnContainer}>
              <Pressable style={styles.addGroupBtn} onPress={handleAddGroup}>
                <Text style={styles.addGroupBtnText}>Add Group</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: colors.primary_color,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold",
  },
  closeBtn: {
    backgroundColor: colors.background_color,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    color: colors.primary_color,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalForm: {
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    height: 190,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: "60%",
    height: "90%",
    borderRadius: 10,
    marginBottom: 5,
  },
  imageButton: {
    width: "25%",
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.ghost_white,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  imagePickerBtnImage: {
    width: 20,
    height: 20,
  },
  inputLabel: {
    marginBottom: 10,
    paddingLeft: 10,
    width: "100%",
    textAlign: "left",
  },
  inputView: {
    width: "100%",
    backgroundColor: colors.ghost_white,
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 15,
  },
  inputTextarea: {
    width: "100%",
    backgroundColor: colors.ghost_white,
    borderRadius: 10,
    height: 100,
    marginBottom: 20,
    justifyContent: "flex-start",
    padding: 15,
  },
  inputText: {
    height: 50,
    color: colors.black,
  },
  addGroupBtnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  addGroupBtn: {
    backgroundColor: colors.background_color,
    width: "50%",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  addGroupBtnText: {
    color: colors.primary_color,
    fontSize: 16,
    fontWeight: "bold",
  },
});
