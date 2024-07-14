// services/groupsService.js
/*
import { db } from "./firebase";
import { Group } from "../models/Group";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const fetchGroups = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "groups"));

    const groups = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const group = new Group(data.name, data.description, data.members);
      groups.push(group.toObject());
    });

    return groups;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
};

export const addGroup = async (groupData, user) => {
  try {
    if (!user) {
      throw new Error("User not logged in");
    }
    const members = [user.id];
    const newGroup = new Group(groupData.name, groupData.description, members);
    // Guardar el nuevo grupo en Firestore
    const groupRef = await addDoc(collection(db, "groups"), {
      name: newGroup.name,
      description: newGroup.description,
      members: newGroup.members,
    });
    console.log("Group added with ID:", groupRef.id);
    return newGroup.toObject();
  } catch (error) {
    console.error("Error adding group:", error);
    throw error;
  }
};
*/
