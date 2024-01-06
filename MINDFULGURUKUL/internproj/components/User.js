import { React, useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useSafeArea } from "react-native-safe-area-context";
const User = ({ route, navigation }) => {
  const [ID, setID] = useState("");
  const [loading, setLoading] = useState(true);
  const insets = useSafeArea();
  const { val } = route.params;
  const [isEditing, setIsEditing] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dataMain, setData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChangeText = (fieldName, text) => {
    setFormData({
      ...formData,
      [fieldName]: text,
    });
  };
  const fetcher = async () => {
    const rep = fetch(
      `https://usermanager-w8ex.onrender.com/api/findNested/${val}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const Edit = async () => {
    const rep = fetch(
      `https://usermanager-w8ex.onrender.com/api/editProps/${ID}/${val}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate("dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    AsyncStorage.getItem("id")
      .then((value) => setID(value))
      .catch((error) => console.error("Error retrieving value:", error));

    console.log(`idddddd: ${ID}`);

    fetcher();
  }, [ID]);
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
                value={formData.name}
                keyboardType="defualt"
                onChangeText={(text) => {
                  handleChangeText("name", text);
                  console.log(formData);
                }}
                placeholder="Username"
              />
              <Text>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => {
                  handleChangeText("email", text);
                  console.log(formData);
                }}
                placeholder="Username"
                keyboardType="email-address"
              />
              <Text>Phone</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => {
                  handleChangeText("phone", text);
                  console.log(formData);
                }}
                placeholder="Username"
                keyboardType="numeric"
              />

              <TouchableOpacity style={styles.buttonSave} onPress={Edit}>
                <Text style={styles.buttonTextSave}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.title}>User Information</Text>
              {dataMain ? (
                <View>
                  <Text
                    style={styles.detail}
                  >{`Username:${dataMain.name}`}</Text>
                  <Text style={styles.detail}>{`Email:${dataMain.email}`}</Text>
                  <Text style={styles.detail}>{`Phone:${dataMain.phone}`}</Text>
                </View>
              ) : (
                " "
              )}

              {/* ... other details with styles */}
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => {
                  setIsEditing(true);
                  setFormData({
                    name: dataMain.name,
                    email: dataMain.email,
                    phone: dataMain.phone,
                  });
                  console.log("Inside EDIT", formData);
                }}
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
