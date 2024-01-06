import { React, useState, useRef, useEffect } from "react";

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeArea } from "react-native-safe-area-context";
import { AlertDialog, Button, Center, NativeBaseProvider } from "native-base";
const AddUser = ({ navigation }) => {
  const [ID, setID] = useState("");
  const insets = useSafeArea();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    navigation.navigate("dashboard");
  };
  useEffect(() => {
    AsyncStorage.getItem("id")
      .then((value) => setID(value))
      .catch((error) => console.error("Error retrieving value:", error));

    console.log(`iddddnewnew: ${ID}`);
  }, [ID]);
  const cancelRef = useRef(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const handleChangeText = (fieldName, text) => {
    setFormData({
      ...formData,
      [fieldName]: text,
    });
  };
  const Adder = async () => {
    const rep = fetch(
      `https://usermanager-w8ex.onrender.com/api/addUser/${ID}`,
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
        if (data.ok) {
          console.log("added");
          setIsOpen(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View
      style={{ width: "90%", alignSelf: "center", paddingTop: insets.top + 40 }}
    >
      <Text style={styles.title}>Add User</Text>
      <Text style={styles.head}>Name</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        keyboardType="defualt"
        onChangeText={(text) => handleChangeText("name", text)}
        placeholder="name"
      />
      <Text style={styles.head}>Email</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => handleChangeText("email", text)}
        placeholder="email"
        keyboardType="email-address"
      />
      <Text style={styles.head}>Phone</Text>
      <TextInput
        style={styles.input}
        value={formData.phone}
        onChangeText={(text) => handleChangeText("phone", text)}
        placeholder="phone number"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.buttonSave} onPress={Adder}>
        <Text style={styles.buttonTextSave}>Save</Text>
      </TouchableOpacity>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Success</AlertDialog.Header>
              <AlertDialog.Body>
                {`User: ${formData.name} added successfully.`}
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button colorScheme="success" onPress={onClose}>
                  Done
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Center>
      </NativeBaseProvider>
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
