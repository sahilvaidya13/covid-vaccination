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
const User = () => {
  const insets = useSafeArea();
  const [isEditing, setIsEditing] = useState(1);
  const [username, setUsername] = useState("user.username");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <View style={{ paddingTop: insets.top + 20 }}>
      <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}>
        User Page
      </Text>
      <View style={{ marginTop: 30 }}>
        <View style={styles.card}>
          {isEditing ? (
            <View>
              <Text style={styles.title}>Edit Profile</Text>
              <Text>Name</Text>
              <TextInput
                style={styles.input}
                value={username}
                keyboardType="defualt"
                onChangeText={setUsername}
                placeholder="Username"
              />
              <Text>Email</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                keyboardType="email-address"
              />
              <Text>Phone</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={styles.buttonSave}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.buttonTextSave}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.title}>User Information</Text>
              <Text style={styles.detail}>Username: Sahil Vaidya</Text>
              <Text style={styles.detail}>Email: sahil.vaidya13@gmail.com</Text>
              <Text style={styles.detail}>Phone Number: +91 9926703403</Text>

              {/* ... other details with styles */}
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.buttonTextSave}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: "90%",
    alignSelf: "center",
  },
  buttonSave: {
    width: "40%",
    padding: 10, // Apply desired padding here
    backgroundColor: "#28d78b",
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 15,
  },
  buttonEdit: {
    width: "40%",
    padding: 10, // Apply desired padding here
    backgroundColor: "#E55771",
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
    marginTop: 15,
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
  button: {
    marginTop: 10,
  },
});

export default User;
