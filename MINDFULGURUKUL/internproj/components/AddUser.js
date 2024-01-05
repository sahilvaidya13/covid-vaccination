import { React, useState } from "react";

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
const AddUser = () => {
  const insets = useSafeArea();

  const [username, setUsername] = useState("user.username");
  return (
    <View
      style={{ width: "90%", alignSelf: "center", paddingTop: insets.top + 40 }}
    >
      <Text style={styles.title}>Add User</Text>
      <Text style={styles.head}>Name</Text>
      <TextInput
        style={styles.input}
        value={username}
        keyboardType="defualt"
        onChangeText={setUsername}
        placeholder="name"
      />
      <Text style={styles.head}>Email</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="email"
        keyboardType="email-address"
      />
      <Text style={styles.head}>Phone</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="phone number"
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.buttonSave}
        onPress={() => setIsEditing(false)}
      >
        <Text style={styles.buttonTextSave}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSave: {
    width: "40%",
    padding: 10, // Apply desired padding here
    backgroundColor: "#28d78b",
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 15,
  },
  buttonTextSave: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  head: {
    marginLeft: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  detail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  input: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,

    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 12,
    fontSize: 12,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
});
export default AddUser;
