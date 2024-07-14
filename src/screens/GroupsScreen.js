/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../utils/colors";
import GroupCard from "../components/GroupCard";
import AddGroupModal from "../components/AddGroupModal";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { loadGroups } from "../redux/groupsSlice";

const GroupsScreen = ({ navigation }) => {
  const { groups, status } = useSelector((state) => state.groups);
  const { user } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(loadGroups());
    } else {
      navigation.navigate("Home");
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && groups.length > 0) {
      console.log("User:", user);
      setFilteredGroups(
        groups.filter((group) => group.members.includes(user.id)),
      );
    } else if (groups.length > 0) {
      setFilteredGroups([]);
    } else {
      navigation.navigate("Home");
    }
  }, [groups, user]);

  if (status === "loading") {
    return (
      <SafeAreaView style={styles.loading_container}>
        <ActivityIndicator size="large" color={colors.primary_color} />
      </SafeAreaView>
    );
  }

  const onModalOpen = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    //navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Groups</Text>
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.groupsContainer}>
        {filteredGroups.length === 0 ? (
          <Text style={styles.noGroupsText}>
            You have no groups! Tap on the button below to create one.
          </Text>
        ) : (
          <FlatList
            data={filteredGroups}
            renderItem={({ item }) => <GroupCard group={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            style={styles.flatlist}
          />
        )}
      </View>
      <View style={styles.addGroupContainer}>
        <Pressable style={styles.addButton} onPress={onModalOpen}>
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>

      <AddGroupModal
        isVisible={isModalVisible}
        onClose={onModalClose}
        user={user}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background_color,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background_color,
  },
  header: {
    width: "100%",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text_color,
    textShadowOffset: { width: 1, height: 1.5 },
    textShadowRadius: 0.5,
    textShadowColor: colors.black,
  },
  logoutBtn: {
    backgroundColor: colors.primary_color,
    padding: 10,
    borderRadius: 5,
    marginRight: 20,
  },
  logoutText: {
    fontSize: 16,
    color: colors.background_color,
    textAlign: "center",
  },
  noGroupsText: {
    fontSize: 16,
    color: colors.black,
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: "red",
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
  groupsContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  flatlist: {
    width: "100%",
  },
  flatListContent: {
    paddingHorizontal: 15, // Padding para el primer elemento
  },
  addGroupContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
  addButton: {
    backgroundColor: colors.primary_color,
    width: 70,
    height: 70,
    borderRadius: 35, // Cambiar a 35 para que sea un círculo
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnText: {
    fontSize: 24,
    color: colors.background_color,
  },
});

export default GroupsScreen;
